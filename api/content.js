// Vercel Serverless Function - CMS 内容管理 API（使用 Vercel Blob 持久化）
// 需要配置: BLOB_READ_WRITE_TOKEN（在 Vercel 创建 Blob Storage 后自动获得）

const { put, get, list, del, head } = require('@vercel/blob');

const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'ihangzhou2024';
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://www.ihangzhou.net';

function checkAuth(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') return false;
  return token === ADMIN_PASSWORD;
}

// 从 js/app.js 内容中提取 DATA 对象（括号计数法，避免正则无法匹配嵌套大括号）
function extractDataFromAppJs(content) {
  var startMatch = content.match(/var\s+DATA(?:_FALLBACK)?\s*=\s*\{/);
  if (!startMatch) return null;
  var start = startMatch.index + startMatch[0].length - 1; // 指向 {
  var depth = 0;
  var inString = false, stringChar = '', escape = false;
  for (var i = start; i < content.length; i++) {
    var ch = content[i];
    if (escape) { escape = false; continue; }
    if (inString) {
      if (ch === '\\') { escape = true; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue; }
    if (ch === '/' && content[i + 1] === '/') {
      while (i < content.length && content[i] !== '\n') i++;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        var dataStr = content.slice(start, i + 1);
        try { return new Function('return ' + dataStr)(); }
        catch (e) { return null; }
      }
    }
  }
  return null;
}

// 备用默认内容
const DEFAULT_CMS = require('../data/cms.json');

const BLOB_KEY = 'cms-data.json';

async function readCMS() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return DEFAULT_CMS;
  try {
    const result = await get(BLOB_KEY, { access: 'private', useCache: false });
    if (!result) return DEFAULT_CMS;
    // 消费 stream 并解析 JSON
    const reader = result.stream.getReader();
    var chunks = [];
    var done = false;
    while (!done) {
      var r = await reader.read();
      done = r.done;
      if (r.value) chunks.push(r.value);
    }
    var text = Buffer.concat(chunks).toString('utf-8');
    return JSON.parse(text);
  } catch (e) { console.error('Blob read error:', e.message); }
  return DEFAULT_CMS;
}

async function writeCMS(data) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) { console.error('No BLOB_READ_WRITE_TOKEN'); return false; }
  try {
    data.lastModified = new Date().toISOString();
    data.version = (data.version || 0) + 1;
    const blob = await put(BLOB_KEY, JSON.stringify(data), {
      contentType: 'application/json',
      access: 'private',
      allowOverwrite: true
    });
    return !!blob.url;
  } catch (e) { console.error('Blob write error:', e.message); return false; }
}

// 关键词独立 Blob key
const KW_BLOB_KEY = 'wechat-keywords.json';

// 同步关键词到独立 Blob（小文件，wechat.js 专用读取）
async function syncKeywords(keywords) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  try {
    const blob = await put(KW_BLOB_KEY, JSON.stringify(keywords || []), {
      contentType: 'application/json',
      access: 'private',
      allowOverwrite: true
    });
    return !!blob.url;
  } catch (e) { console.error('Keywords sync error:', e.message); return false; }
}

// 独立读取关键词（不走全量 CMS 数据）
async function readKeywords() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return DEFAULT_CMS.wechatKeywords || [];
  try {
    const result = await get(KW_BLOB_KEY, { access: 'private', useCache: false });
    if (!result) return DEFAULT_CMS.wechatKeywords || [];
    const reader = result.stream.getReader();
    var chunks = [];
    var done = false;
    while (!done) {
      var r = await reader.read();
      done = r.done;
      if (r.value) chunks.push(r.value);
    }
    var text = Buffer.concat(chunks).toString('utf-8');
    return JSON.parse(text);
  } catch (e) { console.error('Keywords read error:', e.message); }
  return DEFAULT_CMS.wechatKeywords || [];
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    // 独立关键词端点：/api/content?type=keywords
    if (req.query && req.query.type === 'keywords') {
      const keywords = await readKeywords();
      return res.status(200).json({ success: true, data: keywords });
    }
    const data = await readCMS();
    return res.status(200).json({ success: true, data });
  }

  if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });

  if (req.method === 'POST') {
    try {
      const { type, categoryId, item, data } = req.body;
      const cms = await readCMS();
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
        case 'channelSub':
          // 在频道中添加子分类
          if (!data || !data.channelId || !data.sub || !data.sub.id) return res.status(400).json({ success: false, error: '需要 channelId 和 sub{id,name}' });
          var chForAddSub = cms.channels.find(c => c.id === data.channelId);
          if (!chForAddSub) return res.status(404).json({ success: false, error: '频道不存在' });
          if (!chForAddSub.subs) chForAddSub.subs = [];
          if (chForAddSub.subs.find(s => s.id === data.sub.id)) return res.status(400).json({ success: false, error: '子分类ID已存在' });
          chForAddSub.subs.push({ id: data.sub.id, name: data.sub.name, icon: data.sub.icon || '📂', catId: data.sub.catId || '' });
          break;
        case 'wechatKeywordsBatch':
          // 批量添加微信关键词自动回复（跳过已存在的主关键词）
          if (!data || !Array.isArray(data.keywords)) return res.status(400).json({ success: false, error: '需要 keywords 数组' });
          if (!cms.wechatKeywords) cms.wechatKeywords = [];
          var existingKeys = cms.wechatKeywords.map(function(k) { return k.keyword; });
          var added = 0, skipped = 0;
          data.keywords.forEach(function(kw) {
            if (!kw.keyword) { skipped++; return; }
            if (existingKeys.indexOf(kw.keyword) >= 0) { skipped++; return; }
            cms.wechatKeywords.push(kw);
            existingKeys.push(kw.keyword);
            added++;
          });
          var batchResult = { added: added, skipped: skipped, total: cms.wechatKeywords.length };
          var saved = await writeCMS(cms);
          if (saved) {
            await syncKeywords(cms.wechatKeywords); // 同步到独立 Blob
            return res.status(200).json({ success: true, data: cms, batchResult: batchResult });
          }
          return res.status(500).json({ success: false, error: '保存失败' });
        case 'importFromApp':
          // 从部署的 js/app.js 远程拉取并提取 DATA，整体替换 cms 数据（保留 version 自增、备份旧数据）
          var appRes = await fetch(SITE_ORIGIN + '/js/app.js');
          if (!appRes.ok) return res.status(500).json({ success: false, error: '无法拉取 js/app.js: ' + appRes.status });
          var appContent = await appRes.text();
          var extracted = extractDataFromAppJs(appContent);
          if (!extracted) return res.status(500).json({ success: false, error: '无法从 app.js 提取 DATA' });
          // 备份当前 cms 数据
          cms._backup = { time: new Date().toISOString(), snapshot: JSON.parse(JSON.stringify(cms)) };
          cms.hotKeywords = extracted.hotKeywords || cms.hotKeywords;
          cms.hotServices = extracted.hotServices || cms.hotServices;
          cms.categories = extracted.categories || cms.categories;
          cms.channels = extracted.channels || cms.channels;
          if (extracted.phonebook) cms.phonebook = extracted.phonebook;
          break;
        default: return res.status(400).json({ success: false, error: '未知类型' });
      }
      if (await writeCMS(cms)) {
        await syncKeywords(cms.wechatKeywords);
        return res.status(200).json({ success: true, data: cms });
      }
      return res.status(500).json({ success: false, error: '保存失败' });
    } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
  }

  if (req.method === 'PUT') {
    try {
      const { type, categoryId, itemIndex, data } = req.body;
      const cms = await readCMS();
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
        case 'moveItem':
          // 在分类内移动条目顺序：direction = 'up' | 'down'
          if (!categoryId || itemIndex === undefined || !data || !data.direction) return res.status(400).json({ success: false, error: '需要 categoryId / itemIndex / direction' });
          var cMove = cms.categories.find(x => x.id === categoryId);
          if (!cMove || !cMove.items[itemIndex]) return res.status(404).json({ success: false, error: '条目不存在' });
          var dir = data.direction;
          var targetIdx = dir === 'up' ? itemIndex - 1 : (dir === 'down' ? itemIndex + 1 : -1);
          if (targetIdx < 0 || targetIdx >= cMove.items.length) return res.status(400).json({ success: false, error: '已到边界' });
          var tmp = cMove.items[itemIndex];
          cMove.items[itemIndex] = cMove.items[targetIdx];
          cMove.items[targetIdx] = tmp;
          break;
        case 'moveCategory':
          // 移动分类顺序
          if (itemIndex === undefined || !data || !data.direction) return res.status(400).json({ success: false, error: '需要 itemIndex / direction' });
          var catDir = data.direction;
          var catTarget = catDir === 'up' ? itemIndex - 1 : (catDir === 'down' ? itemIndex + 1 : -1);
          if (catTarget < 0 || catTarget >= cms.categories.length) return res.status(400).json({ success: false, error: '已到边界' });
          var catTmp = cms.categories[itemIndex];
          cms.categories[itemIndex] = cms.categories[catTarget];
          cms.categories[catTarget] = catTmp;
          break;
        case 'moveHotService':
          if (itemIndex === undefined || !data || !data.direction) return res.status(400).json({ success: false, error: '需要 itemIndex / direction' });
          var hsDir = data.direction;
          var hsTarget = hsDir === 'up' ? itemIndex - 1 : (hsDir === 'down' ? itemIndex + 1 : -1);
          if (hsTarget < 0 || hsTarget >= cms.hotServices.length) return res.status(400).json({ success: false, error: '已到边界' });
          var hsTmp = cms.hotServices[itemIndex];
          cms.hotServices[itemIndex] = cms.hotServices[hsTarget];
          cms.hotServices[hsTarget] = hsTmp;
          break;
        case 'moveHotKeyword':
          if (itemIndex === undefined || !data || !data.direction) return res.status(400).json({ success: false, error: '需要 itemIndex / direction' });
          var hkDir = data.direction;
          var hkTarget = hkDir === 'up' ? itemIndex - 1 : (hkDir === 'down' ? itemIndex + 1 : -1);
          if (hkTarget < 0 || hkTarget >= cms.hotKeywords.length) return res.status(400).json({ success: false, error: '已到边界' });
          var hkTmp = cms.hotKeywords[itemIndex];
          cms.hotKeywords[itemIndex] = cms.hotKeywords[hkTarget];
          cms.hotKeywords[hkTarget] = hkTmp;
          break;
        case 'moveChannel':
          if (itemIndex === undefined || !data || !data.direction) return res.status(400).json({ success: false, error: '需要 itemIndex / direction' });
          var chDir = data.direction;
          var chTarget = chDir === 'up' ? itemIndex - 1 : (chDir === 'down' ? itemIndex + 1 : -1);
          if (chTarget < 0 || chTarget >= cms.channels.length) return res.status(400).json({ success: false, error: '已到边界' });
          var chTmp = cms.channels[itemIndex];
          cms.channels[itemIndex] = cms.channels[chTarget];
          cms.channels[chTarget] = chTmp;
          break;
        case 'moveChannelSub':
          // 在频道内移动子分类：data.subIndex
          if (!categoryId || itemIndex === undefined || !data || !data.direction || data.subIndex === undefined) return res.status(400).json({ success: false, error: '需要 categoryId / itemIndex(channelIdx) / subIndex / direction' });
          var chForSub = cms.channels[itemIndex];
          if (!chForSub || !chForSub.subs) return res.status(404).json({ success: false, error: '频道或子分类不存在' });
          var subIdx = data.subIndex;
          var subDir = data.direction;
          var subTarget = subDir === 'up' ? subIdx - 1 : (subDir === 'down' ? subIdx + 1 : -1);
          if (subTarget < 0 || subTarget >= chForSub.subs.length) return res.status(400).json({ success: false, error: '已到边界' });
          var subTmp = chForSub.subs[subIdx];
          chForSub.subs[subIdx] = chForSub.subs[subTarget];
          chForSub.subs[subTarget] = subTmp;
          break;
        case 'channelSub':
          // 编辑子分类
          if (!categoryId || itemIndex === undefined || !data || !data.subIndex === undefined) return res.status(400).json({ success: false, error: '需要 categoryId / itemIndex(channelIdx) / data.subIndex' });
          var chForEditSub = cms.channels[itemIndex];
          if (!chForEditSub || !chForEditSub.subs || !chForEditSub.subs[data.subIndex]) return res.status(404).json({ success: false, error: '子分类不存在' });
          chForEditSub.subs[data.subIndex] = { ...chForEditSub.subs[data.subIndex], ...data.sub };
          break;
        default: return res.status(400).json({ success: false, error: '未知类型' });
      }
      if (await writeCMS(cms)) {
        await syncKeywords(cms.wechatKeywords);
        return res.status(200).json({ success: true, data: cms });
      }
      return res.status(500).json({ success: false, error: '保存失败' });
    } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
  }

  if (req.method === 'DELETE') {
    try {
      const { type, categoryId, itemIndex, keyword } = req.body;
      const cms = await readCMS();
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
        case 'channelSub':
          // 删除子分类：itemIndex=channelIdx, data={subIndex}
          if (itemIndex === undefined || !req.body.data || req.body.data.subIndex === undefined) return res.status(400).json({ success: false, error: '需要 itemIndex(channelIdx) / data.subIndex' });
          var chForDelSub = cms.channels[itemIndex];
          if (!chForDelSub || !chForDelSub.subs) return res.status(404).json({ success: false, error: '频道不存在' });
          chForDelSub.subs.splice(req.body.data.subIndex, 1);
          break;
        default: return res.status(400).json({ success: false, error: '未知类型' });
      }
      if (await writeCMS(cms)) {
        await syncKeywords(cms.wechatKeywords);
        return res.status(200).json({ success: true, data: cms });
      }
      return res.status(500).json({ success: false, error: '保存失败' });
    } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
  }

  res.status(400).json({ error: 'Invalid request' });
};
