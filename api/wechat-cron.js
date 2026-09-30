// Vercel Cron Function - 每日自动拉取公众号草稿箱选题
// 触发方式：vercel.json 中配置 crons，或手动 GET /api/wechat-cron
// 功能：获取草稿箱标题列表 → 存储到 Vercel Blob（wechat-topics.json）
// 注意：只拉取标题和摘要，不拉取全文，用于选题参考

const { get, put } = require('@vercel/blob');

const WX_APPID = process.env.WX_APPID;
const WX_SECRET = process.env.WX_SECRET;

// 获取 access_token
async function getAccessToken() {
  if (!WX_APPID || !WX_SECRET) {
    throw new Error('缺少 WX_APPID 或 WX_SECRET 环境变量');
  }
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WX_APPID}&secret=${WX_SECRET}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.errcode) {
    throw new Error(`access_token 获取失败: ${data.errcode} ${data.errmsg}`);
  }
  return data.access_token;
}

// 获取草稿列表（只取标题和摘要，不取全文）
async function getDraftList(token) {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/batchget?access_token=${token}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ offset: 0, count: 20, no_content: 1 })
  });
  const data = await res.json();
  if (data.errcode) {
    throw new Error(`草稿列表获取失败: ${data.errcode} ${data.errmsg}`);
  }
  return data;
}

// 获取当前周字符串（如 2026-W40）
function getWeekStr() {
  const d = new Date();
  const onejan = new Date(d.getFullYear(), 0, 1);
  const w = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  return d.getFullYear() + '-W' + String(w).padStart(2, '0');
}

// 提取选题信息
function extractTopics(drafts) {
  if (!drafts.item) return [];
  return drafts.item.map(item => {
    const ni = item.content && item.content.news_item ? item.content.news_item[0] : {};
    return {
      mediaId: item.media_id,
      title: ni.title || '未知标题',
      digest: ni.digest || '',
      updateTime: item.update_time,
      updateTimeStr: new Date(item.update_time * 1000).toISOString().split('T')[0]
    };
  });
}

module.exports = async (req, res) => {
  // 只允许 GET 请求和 Vercel Cron 调用
  // Vercel Cron 会带 CRON_SECRET header
  const cronSecret = process.env.CRON_SECRET;
  if (req.method === 'GET' && cronSecret) {
    // 手动调用需要验证
    const authHeader = req.headers['authorization'];
    if (authHeader !== `Bearer ${cronSecret}` && !req.headers['x-vercel-cron']) {
      return res.status(401).json({ error: '未授权' });
    }
  }

  try {
    console.log('开始同步公众号草稿选题...');
    const token = await getAccessToken();
    const drafts = await getDraftList(token);
    const topics = extractTopics(drafts);

    // 读取已有选题（用于标记已处理的）
    let existing = [];
    try {
      const result = await get('wechat-topics.json', { access: 'private', useCache: false });
      if (result) {
        const reader = result.stream.getReader();
        const chunks = [];
        let done = false;
        while (!done) {
          const r = await reader.read();
          done = r.done;
          if (r.value) chunks.push(r.value);
        }
        existing = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
      }
    } catch (e) { /* 首次运行，无历史数据 */ }

    // 标记新选题
    const existingIds = existing.map(t => t.mediaId);
    topics.forEach(t => {
      t.isNew = !existingIds.includes(t.mediaId);
      t.synced = existingIds.includes(t.mediaId);
    });

    // 合并：保留已处理选题 + 新选题
    const merged = [...existing];
    topics.forEach(t => {
      if (!existingIds.includes(t.mediaId)) {
        merged.push(t);
      } else {
        // 更新已有选题的信息
        const idx = merged.findIndex(e => e.mediaId === t.mediaId);
        if (idx >= 0) {
          merged[idx].title = t.title;
          merged[idx].digest = t.digest;
          merged[idx].updateTime = t.updateTime;
          merged[idx].updateTimeStr = t.updateTimeStr;
        }
      }
    });

    const newCount = topics.filter(t => t.isNew).length;
    console.log(`同步完成：${topics.length} 篇草稿，${newCount} 篇新选题`);

    // ===== 热力周报草稿生成（每周一执行，或强制触发） =====
    const DOW = new Date().getDay(); // 0=周日,1=周一
    if (DOW === 1 || req.query.forceHeatmap) {
      try {
        const origin = process.env.SITE_ORIGIN || 'https://www.ihangzhou.net';
        const hmRes = await fetch(origin + '/api/tools?action=heatmap').then(function(r){return r.json();}).catch(function(){return null;});
        if (hmRes && hmRes.success && hmRes.topAll && hmRes.topAll.length > 0) {
          const week = getWeekStr();
          const topList = hmRes.topAll.slice(0, 8).map(function(it, i) {
            return (i+1) + '. **' + it.name + '**（' + it.count + ' 次点击）';
          }).join('\n');
          const article = {
            mediaId: 'heatmap-weekly-' + week,
            title: '🔥 iHangzhou 杭州办事热力榜（' + week + '）',
            digest: '本周用户点击量前 ' + Math.min(8, hmRes.topAll.length) + ' 的服务',
            updateTime: Math.floor(Date.now() / 1000),
            updateTimeStr: new Date().toISOString().split('T')[0],
            isNew: true, isHeatmap: true,
            summary: '🔥 本周热门服务 Top 8\n\n' + topList + '\n\n总计 ' + hmRes.totalClicks + ' 次点击',
            heatmap: hmRes.topAll.slice(0, 8)
          };
          merged.push(article);
          console.log('热力周报已生成:', article.title);
        }
      } catch (e) { console.warn('热力周报生成失败:', e.message); }
    }

    // 写入 Blob
    const token2 = process.env.BLOB_READ_WRITE_TOKEN;
    if (token2) {
      await put('wechat-topics.json', JSON.stringify(merged, null, 2), {
        access: 'private',
        contentType: 'application/json',
        allowOverwrite: true
      });
    }

    res.status(200).json({
      success: true,
      totalDrafts: drafts.total_count,
      newTopics: newCount,
      topics: topics
    });
  } catch (e) {
    console.error('同步失败:', e.message);
    res.status(500).json({ error: e.message });
  }
};
