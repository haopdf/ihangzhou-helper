// iHangzhou AI 杭州本地助手 - Vercel Serverless
// 调用阿里云百炼（DashScope）OpenAI 兼容模式
// 环境变量：DASHSCOPE_API_KEY (在 Vercel Dashboard 配置)
module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'AI 未配置',
      reply: '管理员尚未配置 AI 服务（DASHSCOPE_API_KEY 环境变量缺失），请联系管理员或稍后再试。'
    });
  }

  // 解析请求体（Vercel node runtime 已自动解析 JSON，但兼容手动读取）
  let body = req.body;
  if (!body || typeof body !== 'object') {
    try {
      const raw = await new Promise((resolve) => {
        let data = '';
        req.on('data', (c) => (data += c));
        req.on('end', () => resolve(data));
      });
      body = JSON.parse(raw);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  const userMessage = (body.message || '').toString().trim();
  const history = Array.isArray(body.history) ? body.history : [];

  if (!userMessage) {
    return res.status(400).json({ error: 'Empty message' });
  }

  // 长度限制：防止单次问询过大
  if (userMessage.length > 800) {
    return res.status(400).json({ error: '消息过长（限 800 字）' });
  }
  // 历史消息限制：只保留最近 8 轮，避免 token 爆炸
  const recentHistory = history.slice(-8);

  // 系统 prompt：定义助手人格与能力边界
  const systemPrompt = `你是「iHangzhou 杭州生活助手」，一个专注于杭州本地的 AI 助手。
你的能力：
1. 杭州政务办事指南（社保/公积金/户籍/医保/入学/驾照/结婚/护照等）
2. 杭州交通出行（地铁、公交、限行、共享单车、打车、机场/高铁）
3. 杭州民生服务（医院挂号、12345 投诉、垃圾分类、水电气缴费）
4. 杭州特色指南（西湖十景、灵隐寺、法喜寺、西溪湿地、宋城、良渚古城、钱塘江大潮等）
5. 杭州生活常识（天气、油价、摇号、个税、房贷计算）

回答原则：
- 简洁友好，用中文，必要时用 emoji 增加亲和力
- 直接给出可操作的建议（带步骤、电话、网址、票价等具体信息）
- 不知道就说不知道，不编造
- 涉及政策/票价/时间等时效信息时，提示用户"以官方最新公告为准"
- 不回答与杭州本地生活无关的问题（如政治、军事、其他城市细节），礼貌引导回杭州主题
- 如果用户问的是办事流程，给出"材料 + 步骤 + 办理地点 + 官方链接"四要素

知识库摘要（你可以基于这些信息回答，但不是全部知识）：
- 杭州地铁：1-19 号线（含杭海/杭富/杭绍城际），票价 2 元起步，0-4 公里 2 元，每加 4 公里加 1 元，最高 14 元
- 杭州限行：工作日早晚高峰（7:00-9:00, 16:30-18:30），浙 A 牌按尾号限行（周一 1/9, 周二 2/8, 周三 3/7, 周四 4/6, 周五 5/0），周末不限行
- 灵隐寺：飞来峰 45 元 + 寺庙 30 元，地铁 3 号线黄龙体育中心站换公交 7 路
- 法喜寺：5 元斋饭（11:00-13:00 售完即止），门票 10 元，2-3 月白玉兰最佳
- 西溪湿地：80 元门票，摇橹船 100 元/船（6 人 1 小时），9-11 月芦苇飞雪最美
- 宋城：320 元起含《宋城千古情》，地铁 6 号线之江路站
- 良渚古城：世界遗产，遗址公园 50 元 + 博物院免费（周一闭馆）
- 钱塘江大潮：农历八月十八最佳，海宁盐官一线潮，切勿翻堤
- 社保查询：浙里办 APP 或 zjzwfw.gov.cn
- 公积金：gjj.hangzhou.gov.cn 或杭州公积金 APP
- 违章查询：zj.122.gov.cn（交管 12123 APP）
- 12345：市长公开电话，可投诉市政/民生问题`;

  // 构造 messages
  const messages = [
    { role: 'system', content: systemPrompt },
    ...recentHistory.map((h) => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content || '').slice(0, 2000)
    })),
    { role: 'user', content: userMessage }
  ];

  // 流式响应（SSE）
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.status(200);

  const upstreamUrl = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

  try {
    const upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo',        // 高性价比、响应快，适合本地问答
        messages: messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error('Upstream error:', upstream.status, errText);
      res.write(`data: ${JSON.stringify({ error: 'AI 服务异常: ' + upstream.status, reply: 'AI 服务暂时不可用，请稍后再试。' })}\n\n`);
      res.write('data: [DONE]\n\n');
      return res.end();
    }

    // 透传上游 SSE 流
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      // 按 \n 分行处理上游 SSE
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // 保留最后一行不完整的
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') {
          res.write('data: [DONE]\n\n');
          return res.end();
        }
        // 透传增量内容（只保留 content）
        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices && parsed.choices[0] && parsed.choices[0].delta;
          if (delta && delta.content) {
            res.write(`data: ${JSON.stringify({ content: delta.content })}\n\n`);
          }
        } catch (e) {
          // 忽略解析错误的分片
        }
      }
    }
    res.write('data: [DONE]\n\n');
    return res.end();
  } catch (err) {
    console.error('Chat API error:', err);
    res.write(`data: ${JSON.stringify({ error: 'internal', reply: '助手走神了，请重试一下。' })}\n\n`);
    res.write('data: [DONE]\n\n');
    return res.end();
  }
};
