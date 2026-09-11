// Vercel Serverless Function - 用户反馈 API
const ADMIN_PASSWORD = process.env.FEEDBACK_ADMIN_PASSWORD || 'ihangzhou2024';

function checkAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return false;
  return token === ADMIN_PASSWORD;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

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
        feedbacks.forEach(f => {
          stats.byType[f.type] = (stats.byType[f.type] || 0) + 1;
          if (f.status === 'pending') stats.pending++;
        });
        return res.status(200).json({ success: true, data: feedbacks, stats });
      }
      return res.status(200).json({ success: true, data: [], stats: { total: 0, byType: {}, pending: 0 } });
    } catch (e) { return res.status(200).json({ success: true, data: [] }); }
  }

  if (req.method === 'POST') {
    try {
      const { type, content, contact, url, ua } = req.body;
      if (!content || content.trim().length < 5) return res.status(400).json({ success: false, error: '内容太短' });

      const feedback = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        type: type || 'suggest', content: content.trim(), contact: contact || '',
        url: url || '', ua: ua || '', time: new Date().toISOString(), status: 'pending'
      };

      const dir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      let feedbacks = [];
      if (fs.existsSync(filePath)) {
        try { feedbacks = JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch (e) {}
      }
      feedbacks.push(feedback);
      fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2));
      return res.status(200).json({ success: true, id: feedback.id });
    } catch (error) { return res.status(500).json({ success: false, error: '提交失败' }); }
  }

  res.status(400).json({ error: 'Invalid request' });
};
