// Vercel Serverless Function - 访问统计 API
const ADMIN_PASSWORD = process.env.TRACK_ADMIN_PASSWORD || 'ihangzhou2024';

function checkAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return false;
  return token === ADMIN_PASSWORD;
}

const LOCAL_STATS_FILE = './data/stats.json';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET' && req.query.action === 'stats') {
    if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });
    try {
      const fs = require('fs');
      if (fs.existsSync(LOCAL_STATS_FILE)) {
        const data = JSON.parse(fs.readFileSync(LOCAL_STATS_FILE, 'utf8'));
        return res.status(200).json({ success: true, data: aggregateStats(data.events || []) });
      }
    } catch (e) { console.error(e); }
    return res.status(200).json({ success: true, data: { topItems: [], totalClicks: 0 } });
  }

  if (req.method === 'POST') {
    try {
      const { category, item, action, tab, search } = req.body;
      const fs = require('fs');
      let stats = { events: [] };
      if (fs.existsSync(LOCAL_STATS_FILE)) {
        try { stats = JSON.parse(fs.readFileSync(LOCAL_STATS_FILE, 'utf8')); } catch (e) {}
      }
      stats.events.push({
        category: category || 'unknown', item: item || '', action: action || 'click',
        tab: tab || '', search: search || '', created_at: new Date().toISOString()
      });
      stats.events = stats.events.slice(-10000);
      fs.writeFileSync(LOCAL_STATS_FILE, JSON.stringify(stats, null, 2));
      return res.status(200).json({ success: true });
    } catch (e) { return res.status(200).json({ success: true }); }
  }

  res.status(400).json({ error: 'Invalid request' });
};

function aggregateStats(events) {
  const itemCounts = {};
  let totalClicks = events.length;
  events.forEach(e => { if (e.item) itemCounts[e.item] = (itemCounts[e.item] || 0) + 1; });
  const topItems = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]).slice(0, 20).map(([name, count]) => ({ name, count }));
  return { topItems, totalClicks };
}
