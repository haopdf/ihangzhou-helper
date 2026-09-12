// Vercel Serverless Function - 工具类接口合集（合并 forex/gold/metro/yaohao/feedback/track）
// 通过 ?action=xxx 区分不同功能

const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'ihangzhou2024';

function checkAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const [type, token] = authHeader.split(' ');
  return type === 'Bearer' && token === ADMIN_PASSWORD;
}

// ===== 汇率 =====
async function handleForex() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/CNY');
    const data = await res.json();
    return { success: true, data: { usd: data.rates.USD, eur: data.rates.EUR, jpy: data.rates.JPY, hkd: data.rates.HKD, updated: data.date } };
  } catch (e) {
    return { success: false, error: '汇率获取失败' };
  }
}

// ===== 金价 =====
async function handleGold() {
  try {
    // 返回模拟金价数据（实际项目可接入真实 API）
    return { success: true, data: { gold: 618.5, silver: 7.82, platinum: 285.3, unit: '元/克', updated: new Date().toLocaleDateString('zh-CN') } };
  } catch (e) {
    return { success: false, error: '金价获取失败' };
  }
}

// ===== 地铁时刻 =====
async function handleMetro(req) {
  const line = req.query.line || '1';
  const data = {
    '1': { name: '1号线', stations: ['湘湖', '滨康路', '西兴', '滨和路', '江陵路', '滨江区', '近江', '婺江路', '城站', '龙翔桥', '凤起路', '武林广场', '西湖文化广场'], interval: '3-5分钟' },
    '2': { name: '2号线', stations: ['朝阳', '曹家桥', '潘水', '人民路站', '杭发厂', '人民广场', '建设三路', '建设一路', '振宁路', '飞虹路', '盈丰路', '钱江世纪城', '钱江路'], interval: '4-6分钟' },
    '5': { name: '5号线', stations: ['姑娘桥', '金星', '绿汀路', '葛巷', '杭师大仓前', '永福', '五常', '蒋村', '萍水街', '和睦', '大运河', '拱宸桥东', '善贤', '姑娘桥'], interval: '4-6分钟' }
  };
  return { success: true, data: data[line] || data['1'] };
}

// ===== 摇号结果 =====
async function handleYaohao(req) {
  const plate = req.query.plate || '';
  return { success: true, data: { plate: plate || '浙A·88888', status: '未中签', period: '2026年9期', message: '当月摇号未中签，已自动转入下期' } };
}

// ===== 访问统计 =====
async function handleTrack(req, res) {
  if (req.method === 'GET' && req.query.stats === '1') {
    if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });
    const fs = require('fs');
    const file = './data/stats.json';
    if (fs.existsSync(file)) {
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      return res.status(200).json({ success: true, data: aggregateStats(data.events || []) });
    }
    return res.status(200).json({ success: true, data: { topItems: [], totalClicks: 0 } });
  }
  if (req.method === 'POST') {
    try {
      const { category, item, action, tab, search } = req.body;
      const fs = require('fs');
      let stats = { events: [] };
      if (fs.existsSync('./data/stats.json')) {
        try { stats = JSON.parse(fs.readFileSync('./data/stats.json', 'utf8')); } catch (e) {}
      }
      stats.events.push({ category: category || 'unknown', item: item || '', action: action || 'click', tab: tab || '', search: search || '', created_at: new Date().toISOString() });
      stats.events = stats.events.slice(-10000);
      fs.writeFileSync('./data/stats.json', JSON.stringify(stats, null, 2));
      return res.status(200).json({ success: true });
    } catch (e) { return res.status(200).json({ success: true }); }
  }
  res.status(400).json({ error: 'Invalid request' });
}

function aggregateStats(events) {
  const itemCounts = {};
  let totalClicks = events.length;
  events.forEach(e => { if (e.item) itemCounts[e.item] = (itemCounts[e.item] || 0) + 1; });
  const topItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([name, count]) => ({ name, count }));
  return { topItems, totalClicks };
}

// ===== 用户反馈 =====
async function handleFeedback(req, res) {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(process.cwd(), 'data', 'feedbacks.json');

  if (req.method === 'GET') {
    if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });
    try {
      if (fs.existsSync(filePath)) {
        const feedbacks = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        feedbacks.sort((a, b) => new Date(b.time) - new Date(a.time));
        const stats = { total: feedbacks.length, byType: {}, pending: 0 };
        feedbacks.forEach(f => { stats.byType[f.type] = (stats.byType[f.type] || 0) + 1; if (f.status === 'pending') stats.pending++; });
        return res.status(200).json({ success: true, data: feedbacks, stats });
      }
      return res.status(200).json({ success: true, data: [], stats: { total: 0, byType: {}, pending: 0 } });
    } catch (e) { return res.status(200).json({ success: true, data: [] }); }
  }

  if (req.method === 'POST') {
    try {
      const { type, content, contact, url, ua } = req.body;
      if (!content || content.trim().length < 5) return res.status(400).json({ success: false, error: '内容太短' });
      const feedback = { id: Date.now().toString(36) + Math.random().toString(36).substr(2), type: type || 'suggest', content: content.trim(), contact: contact || '', url: url || '', ua: ua || '', time: new Date().toISOString(), status: 'pending' };
      const dir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      let feedbacks = [];
      if (fs.existsSync(filePath)) { try { feedbacks = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) {} }
      feedbacks.push(feedback);
      fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2));
      return res.status(200).json({ success: true, id: feedback.id });
    } catch (error) { return res.status(500).json({ success: false, error: '提交失败' }); }
  }
  res.status(400).json({ error: 'Invalid request' });
}

// ===== 主入口 =====
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const action = req.query.action || req.body?.action || '';

  try {
    switch (action) {
      case 'forex':
        return res.json(await handleForex());
      case 'gold':
        return res.json(await handleGold());
      case 'metro':
        return res.json(await handleMetro(req));
      case 'yaohao':
        return res.json(await handleYaohao(req));
      case 'track':
        return await handleTrack(req, res);
      case 'feedback':
        return await handleFeedback(req, res);
      default:
        return res.json({ success: false, error: '未知动作', available: ['forex', 'gold', 'metro', 'yaohao', 'track', 'feedback'] });
    }
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
};
