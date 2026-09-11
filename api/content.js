// Vercel Serverless Function - CMS 内容管理 API
const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'ihangzhou2024';
const CMS_FILE = './data/cms.json';

function checkAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return false;
  return token === ADMIN_PASSWORD;
}

function readCMS() {
  try {
    const fs = require('fs');
    if (fs.existsSync(CMS_FILE)) {
      return JSON.parse(fs.readFileSync(CMS_FILE, 'utf8'));
    }
  } catch (e) { console.error('Read CMS error:', e); }
  return { categories: [], hotServices: [], hotKeywords: [], channels: [] };
}

function writeCMS(data) {
  try {
    const fs = require('fs');
    data.lastModified = new Date().toISOString();
    data.version = (data.version || 0) + 1;
    fs.writeFileSync(CMS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (e) { console.error('Write CMS error:', e); return false; }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET - 公开读取
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, data: readCMS() });
  }

  if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });

  // POST - 新增
  if (req.method === 'POST') {
    try {
      const { type, categoryId, item, data } = req.body;
      const cms = readCMS();
      switch (type) {
        case 'category':
          if (!data || !data.id || !data.name) return res.status(400).json({ success: false, error: '分类需要 id 和 name' });
          if (cms.categories.find(c => c.id === data.id)) return res.status(400).json({ success: false, error: 'ID 已存在' });
          cms.categories.push({ id: data.id, name: data.name, icon: data.icon || '📁', items: [] });
          break;
        case 'item':
          if (!categoryId || !item) return res.status(400).json({ success: false, error: '需要 categoryId 和 item' });
          const cat = cms.categories.find(c => c.id === categoryId);
          if (!cat) return res.status(404).json({ success: false, error: '分类不存在' });
          cat.items.push(item);
          break;
        case 'hotService':
          if (!item) return res.status(400).json({ success: false, error: '需要 item' });
          cms.hotServices.push(item);
          break;
        case 'hotKeyword':
          if (!data || !data.keyword) return res.status(400).json({ success: false, error: '需要 keyword' });
          if (!cms.hotKeywords.includes(data.keyword)) cms.hotKeywords.push(data.keyword);
          break;
        case 'channel':
          if (!data || !data.id || !data.name) return res.status(400).json({ success: false, error: '需要 id 和 name' });
          if (cms.channels.find(c => c.id === data.id)) return res.status(400).json({ success: false, error: 'ID 已存在' });
          cms.channels.push({ id: data.id, name: data.name, icon: data.icon || '📁', subs: data.subs || [] });
          break;
        default: return res.status(400).json({ success: false, error: '未知类型' });
      }
      if (writeCMS(cms)) return res.status(200).json({ success: true, data: cms });
      return res.status(500).json({ success: false, error: '保存失败' });
    } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
  }

  // PUT - 更新
  if (req.method === 'PUT') {
    try {
      const { type, categoryId, itemIndex, data } = req.body;
      const cms = readCMS();
      switch (type) {
        case 'category':
          if (!categoryId || !data) return res.status(400).json({ success: false, error: '参数不全' });
          const ci = cms.categories.findIndex(c => c.id === categoryId);
          if (ci === -1) return res.status(404).json({ success: false, error: '分类不存在' });
          cms.categories[ci] = { ...cms.categories[ci], ...data };
          break;
        case 'item':
          if (!categoryId || itemIndex === undefined || !data) return res.status(400).json({ success: false, error: '参数不全' });
          const c = cms.categories.find(x => x.id === categoryId);
          if (!c || !c.items[itemIndex]) return res.status(404).json({ success: false, error: '条目不存在' });
          c.items[itemIndex] = { ...c.items[itemIndex], ...data };
          break;
        case 'hotService':
          if (itemIndex === undefined || !data) return res.status(400).json({ success: false, error: '参数不全' });
          if (!cms.hotServices[itemIndex]) return res.status(404).json({ success: false, error: '不存在' });
          cms.hotServices[itemIndex] = { ...cms.hotServices[itemIndex], ...data };
          break;
        case 'hotKeyword':
          if (itemIndex === undefined || !data || !data.keyword) return res.status(400).json({ success: false, error: '参数不全' });
          if (itemIndex >= cms.hotKeywords.length) return res.status(404).json({ success: false, error: '不存在' });
          cms.hotKeywords[itemIndex] = data.keyword;
          break;
        case 'channel':
          if (!categoryId || !data) return res.status(400).json({ success: false, error: '参数不全' });
          const chi = cms.channels.findIndex(x => x.id === categoryId);
          if (chi === -1) return res.status(404).json({ success: false, error: '频道不存在' });
          cms.channels[chi] = { ...cms.channels[chi], ...data };
          break;
        case 'full':
          if (!data) return res.status(400).json({ success: false, error: '需要 data' });
          Object.keys(data).forEach(key => { if (key !== 'version') cms[key] = data[key]; });
          break;
        default: return res.status(400).json({ success: false, error: '未知类型' });
      }
      if (writeCMS(cms)) return res.status(200).json({ success: true, data: cms });
      return res.status(500).json({ success: false, error: '保存失败' });
    } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
  }

  // DELETE - 删除
  if (req.method === 'DELETE') {
    try {
      const { type, categoryId, itemIndex, keyword } = req.body;
      const cms = readCMS();
      switch (type) {
        case 'category':
          if (!categoryId) return res.status(400).json({ success: false, error: '需要 categoryId' });
          const ci2 = cms.categories.findIndex(c => c.id === categoryId);
          if (ci2 === -1) return res.status(404).json({ success: false, error: '分类不存在' });
          cms.categories.splice(ci2, 1);
          break;
        case 'item':
          if (!categoryId || itemIndex === undefined) return res.status(400).json({ success: false, error: '参数不全' });
          const c2 = cms.categories.find(x => x.id === categoryId);
          if (!c2 || itemIndex >= c2.items.length) return res.status(404).json({ success: false, error: '不存在' });
          c2.items.splice(itemIndex, 1);
          break;
        case 'hotService':
          if (itemIndex === undefined || itemIndex >= cms.hotServices.length) return res.status(404).json({ success: false, error: '不存在' });
          cms.hotServices.splice(itemIndex, 1);
          break;
        case 'hotKeyword':
          if (!keyword) return res.status(400).json({ success: false, error: '需要 keyword' });
          const kwi = cms.hotKeywords.indexOf(keyword);
          if (kwi === -1) return res.status(404).json({ success: false, error: '不存在' });
          cms.hotKeywords.splice(kwi, 1);
          break;
        case 'channel':
          if (!categoryId) return res.status(400).json({ success: false, error: '需要 categoryId' });
          const chi2 = cms.channels.findIndex(x => x.id === categoryId);
          if (chi2 === -1) return res.status(404).json({ success: false, error: '频道不存在' });
          cms.channels.splice(chi2, 1);
          break;
        default: return res.status(400).json({ success: false, error: '未知类型' });
      }
      if (writeCMS(cms)) return res.status(200).json({ success: true, data: cms });
      return res.status(500).json({ success: false, error: '保存失败' });
    } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
  }

  res.status(400).json({ error: 'Invalid request' });
};
