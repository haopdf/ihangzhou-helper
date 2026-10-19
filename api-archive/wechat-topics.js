// 读取公众号选题列表
// GET /api/wechat-topics → 返回从 Vercel Blob 读取的选题列表
const { get } = require('@vercel/blob');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return res.status(200).json({ topics: [], error: 'Blob 未配置' });
    }

    const result = await get('wechat-topics.json', { access: 'private', useCache: false });
    if (!result) {
      return res.status(200).json({ topics: [] });
    }

    const reader = result.stream.getReader();
    const chunks = [];
    let done = false;
    while (!done) {
      const r = await reader.read();
      done = r.done;
      if (r.value) chunks.push(r.value);
    }
    const data = JSON.parse(Buffer.concat(chunks).toString('utf-8'));

    // 标记新选题（24小时内的）
    const now = Date.now();
    data.forEach(t => {
      if (t.updateTime) {
        const age = now - t.updateTime * 1000;
        t.isNew = age < 86400000; // 24小时内为新
      }
    });

    res.status(200).json({ topics: data });
  } catch (e) {
    res.status(200).json({ topics: [], error: e.message });
  }
};
