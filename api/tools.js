// Vercel Serverless Function - 工具类接口合集
// 通过 ?action=xxx 区分不同功能

import { createRequire } from 'node:module';
const __require = createRequire(import.meta.url);
function reqJson(rel) { try { return __require(rel); } catch (e) { return null; } }
import { get, put } from '@vercel/blob';
import { checkAdminAuth, getClientIp } from '../lib/auth.js';
const FEEDBACK_BLOB = 'feedbacks.json';

async function readFeedbacks() {
  try {
    const result = await get(FEEDBACK_BLOB, { access: 'private', useCache: false });
    if (!result) return [];
    const reader = result.stream.getReader();
    var chunks = [];
    var done = false;
    while (!done) { var r = await reader.read(); done = r.done; if (r.value) chunks.push(r.value); }
    var text = Buffer.concat(chunks).toString('utf-8');
    return JSON.parse(text);
  } catch (e) { return []; }
}

async function writeFeedbacks(list) {
  try {
    await put(FEEDBACK_BLOB, JSON.stringify(list, null, 2), {
      contentType: 'application/json', access: 'private', allowOverwrite: true
    });
    return true;
  } catch (e) { return false; }
}

function checkAuth(req) {
  return checkAdminAuth(req);
}

// ===== 简易限流（Serverless 实例内存计数；全局最强限制请配合 Vercel Rate Limit / WAF）=====
const rateBuckets = new Map();

/** 返回 true 表示允许通过；false 表示超限 */
function checkRateLimit(key, limit, windowMs) {
  const now = Date.now();
  const b = rateBuckets.get(key);
  if (!b || now - b.start > windowMs) {
    rateBuckets.set(key, { start: now, count: 1 });
    return true;
  }
  b.count++;
  return b.count <= limit;
}

// 定期清理过期桶，避免内存膨胀
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rateBuckets) {
    if (now - v.start > 2 * 60 * 60 * 1000) rateBuckets.delete(k);
  }
}, 10 * 60 * 1000);

function clampStr(v, max) {
  return typeof v === 'string' ? v.slice(0, max) : v;
}

// ===== 统计事件归一化 & 聚合（单条 / 批量共用）=====
function normalizeTrackEvent(raw) {
  return {
    action: clampStr(raw && raw.action, 20) || 'click',
    category: clampStr(raw && raw.category, 64),
    item: clampStr(raw && raw.item, 200),
    tab: clampStr(raw && raw.tab, 64),
    search: clampStr(raw && raw.search, 200),
    uuid: clampStr(raw && raw.uuid, 64),
    fp: clampStr(raw && raw.fp, 64),
    page: clampStr(raw && raw.page, 200),
    ref: clampStr(raw && raw.ref, 200),
    day: clampStr(raw && raw.day, 10) || new Date().toISOString().slice(0, 10),
    t: Date.now()
  };
}

function ensureStatsShape(stats) {
  if (!stats.events) stats.events = [];
  if (!stats.daily) stats.daily = {};
  if (!stats.uvs) stats.uvs = {};
  return stats;
}

function applyTrackEvent(stats, evt) {
  stats.events.push(evt);
  stats.events = stats.events.slice(-10000);

  const d = evt.day;
  if (!stats.daily[d]) stats.daily[d] = { pv: 0, click: 0, uuids: {}, pages: {}, searches: {} };
  const dayStat = stats.daily[d];
  if (evt.action === 'pv') {
    dayStat.pv++;
    if (evt.page) dayStat.pages[evt.page] = (dayStat.pages[evt.page] || 0) + 1;
    if (evt.uuid) dayStat.uuids[evt.uuid] = (dayStat.uuids[evt.uuid] || 0) + 1;
  } else {
    dayStat.click++;
    if (evt.item) dayStat.searches[evt.item] = (dayStat.searches[evt.item] || 0) + 1;
  }

  if (evt.uuid) {
    if (!stats.uvs[evt.uuid]) stats.uvs[evt.uuid] = { firstDay: d, lastDay: d, count: 0, pages: {} };
    stats.uvs[evt.uuid].count++;
    stats.uvs[evt.uuid].lastDay = d;
    if (evt.page) stats.uvs[evt.uuid].pages[evt.page] = (stats.uvs[evt.uuid].pages[evt.page] || 0) + 1;
    // 保持 uvs 大小可控
    const uvsKeys = Object.keys(stats.uvs);
    if (uvsKeys.length > 5000) {
      const sorted = uvsKeys.sort((a, b) => (stats.uvs[a].lastDay < stats.uvs[b].lastDay ? -1 : 1));
      sorted.slice(0, 1000).forEach(k => delete stats.uvs[k]);
    }
  }
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
    // 尝试从实时 API 获取金价
    const res = await fetch('https://api.metals.live/v1/spot/gold', { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const prices = await res.json();
      // metals.live 返回 [{timestamp, price}] 数组，price 是美元/盎司
      const latest = prices[prices.length - 1];
      if (latest && latest.price) {
        const usdPerOz = Math.round(latest.price * 100) / 100;
        // 获取美元兑人民币汇率
        let usdCny = 7.25;
        try {
          const fxRes = await fetch('https://open.er-api.com/v6/latest/USD', { signal: AbortSignal.timeout(4000) });
          if (fxRes.ok) { const fx = await fxRes.json(); usdCny = fx.rates?.CNY || 7.25; }
        } catch (e) {}
        const cnyPerOz = Math.round(usdPerOz * usdCny);
        const cnyPerGram = Math.round(cnyPerOz / 31.1035 * 100) / 100;
        return { success: true, data: { gold: { usdPerOz, cnyPerOz, cnyPerGram }, unit: '元/克', updated: new Date().toLocaleString('zh-CN') } };
      }
    }
  } catch (e) { /* 降级到模拟数据 */ }
  // 降级：模拟金价
  return { success: true, data: { gold: { usdPerOz: 2658, cnyPerOz: 19270, cnyPerGram: 619.5 }, unit: '元/克', updated: new Date().toLocaleString('zh-CN') } };
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

// ===== 访问统计（UV / PV / 时序 / 来源） =====
const STATS_BLOB = 'stats.json';

async function readStats() {
  try {
    const result = await get(STATS_BLOB, { access: 'private', useCache: false });
    if (!result) return { events: [], daily: {}, uvs: {} };
    const reader = result.stream.getReader();
    var chunks = [];
    var done = false;
    while (!done) { var r = await reader.read(); done = r.done; if (r.value) chunks.push(r.value); }
    var text = Buffer.concat(chunks).toString('utf-8');
    var data = JSON.parse(text);
    data.daily = data.daily || {};
    data.uvs = data.uvs || {};
    return data;
  } catch (e) { return { events: [], daily: {}, uvs: {} }; }
}

async function writeStats(data) {
  try {
    await put(STATS_BLOB, JSON.stringify(data), { contentType: 'application/json', access: 'private', allowOverwrite: true });
    return true;
  } catch (e) { return false; }
}

async function handleHeatmap(req, res) {
  // 公开接口：Top 10 点击热力榜（含历史累计）
  try {
    const stats = await readStats();
    const daily = stats.daily || {};
    const allClicks = {};
    const clickCategories = {};
    Object.keys(daily).forEach(function (d) {
      Object.entries(daily[d].searches || {}).forEach(function (kv) {
        allClicks[kv[0]] = (allClicks[kv[0]] || 0) + kv[1];
      });
    });
    const topAll = Object.entries(allClicks).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 10).map(function (kv) { return { name: kv[0], count: kv[1] }; });
    // 今日热力
    var today = new Date().toISOString().slice(0, 10);
    var todayClicks = (daily[today] && daily[today].searches) || {};
    var topToday = Object.entries(todayClicks).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5).map(function (kv) { return { name: kv[0], count: kv[1] }; });
    return res.status(200).json({ success: true, topAll: topAll, topToday: topToday, totalClicks: Object.values(allClicks).reduce(function (s, n) { return s + n; }, 0) });
  } catch (e) { return res.status(200).json({ success: false, error: e.message }); }
}

async function handleTrack(req, res) {
  // GET 查看统计（需认证）
  if (req.method === 'GET' && req.query.stats === '1') {
    if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });
    const stats = await readStats();
    return res.status(200).json({ success: true, data: buildDashboard(stats) });
  }
  // GET 查看原始事件（调试用，需认证）
  if (req.method === 'GET' && req.query.raw === '1') {
    if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });
    const stats = await readStats();
    const rawLimit = Math.min(parseInt(req.query.limit) || 500, 2000);
    return res.status(200).json({ success: true, total: (stats.events || []).length, events: (stats.events || []).slice(-rawLimit) });
  }
  // POST 上报事件
  if (req.method === 'POST') {
    try {
      // 限流：单 IP 300 次/分钟（正常浏览远低于此）
      if (!checkRateLimit('track:' + getClientIp(req), 300, 60 * 1000)) {
        return res.status(429).json({ success: false, error: '请求过于频繁，请稍后再试' });
      }
      const body = req.body || {};
      let stats = ensureStatsShape(await readStats());
      applyTrackEvent(stats, normalizeTrackEvent(body));
      await writeStats(stats);
      return res.status(200).json({ success: true });
    } catch (e) { return res.status(200).json({ success: true, error: e.message }); }
  }
  res.status(400).json({ error: 'Invalid request' });
}

// 批量上报（analytics.js 的缓冲队列调用）：一次请求写入多条事件，
// 相比逐条 POST 显著降低 Blob 读-改-写次数
async function handleTrackBatch(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });
  const rawEvents = req.body && Array.isArray(req.body.events) ? req.body.events : null;
  if (!rawEvents) return res.status(400).json({ success: false, error: '缺少 events 数组' });
  if (rawEvents.length > 100) return res.status(400).json({ success: false, error: '单次最多 100 条事件' });
  // 限流：单 IP 300 次/分钟（与单条上报共用计数）
  if (!checkRateLimit('track:' + getClientIp(req), 300, 60 * 1000)) {
    return res.status(429).json({ success: false, error: '请求过于频繁，请稍后再试' });
  }
  try {
    let stats = ensureStatsShape(await readStats());
    let applied = 0;
    rawEvents.forEach(function (raw) {
      if (!raw || typeof raw !== 'object') return;
      applyTrackEvent(stats, normalizeTrackEvent(raw));
      applied++;
    });
    await writeStats(stats);
    return res.status(200).json({ success: true, received: applied });
  } catch (e) { return res.status(200).json({ success: true, error: e.message }); }
}

function buildDashboard(stats) {
  const daily = stats.daily || {};
  const uvs = stats.uvs || {};
  const today = new Date().toISOString().slice(0, 10);
  const days = Object.keys(daily).sort().slice(-30);
  const last7 = days.slice(-7);
  const prev7 = days.slice(-14, -7);

  // 今日数据
  const todayStat = daily[today] || { pv: 0, click: 0, pages: {}, searches: {}, uuids: {} };
  const todayUV = Object.keys(todayStat.uuids || {}).length;
  const prevDay = daily[days[days.length - 2]] || { pv: 0, click: 0, uuids: {} };
  const prevUV = Object.keys(prevDay.uuids || {}).length;

  // 近 7 天趋势
  const trend = days.map(d => ({ date: d, pv: daily[d].pv || 0, clicks: daily[d].click || 0, uv: Object.keys(daily[d].uids || {}).length }));

  // 热门页面 top 10
  const allPages = {};
  days.forEach(d => { Object.entries(daily[d].pages || {}).forEach(([p, c]) => { allPages[p] = (allPages[p] || 0) + c; }); });
  const topPages = Object.entries(allPages).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, count]) => ({ name, count }));

  // 热门点击 top 10
  const allClicks = {};
  days.forEach(d => { Object.entries(daily[d].searches || {}).forEach(([k, c]) => { allClicks[k] = (allClicks[k] || 0) + c; }); });
  const topClicks = Object.entries(allClicks).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, count]) => ({ name, count }));

  // 总 UV（所有时间）
  const totalUV = Object.keys(uvs).length;
  const activeUV7 = Object.keys(uvs).filter(u => uvs[u].lastDay >= last7[0]).length;

  // 7 日环比
  const cur7PV = last7.reduce((s, d) => s + (daily[d]?.pv || 0), 0);
  const prev7PV = prev7.reduce((s, d) => s + (daily[d]?.pv || 0), 0);
  const cur7UV = new Set(last7.flatMap(d => Object.keys(daily[d]?.uuids || {}))).size;
  const prev7UV = new Set(prev7.flatMap(d => Object.keys(daily[d]?.uuids || {}))).size;

  return {
    today: { pv: todayStat.pv || 0, clicks: todayStat.click || 0, uv: todayUV, uvDelta: prevUV > 0 ? Math.round((todayUV - prevUV) / prevUV * 100) : 0 },
    total: { pv: days.reduce((s, d) => s + (daily[d]?.pv || 0), 0), uv: totalUV, uv7: activeUV7 },
    trend7: { pv: cur7PV, pvDelta: prev7PV > 0 ? Math.round((cur7PV - prev7PV) / prev7PV * 100) : 0, uv: cur7UV, uvDelta: prev7UV > 0 ? Math.round((cur7UV - prev7UV) / prev7UV * 100) : 0 },
    days: trend,
    topPages,
    topClicks
  };
}

// ===== 用户反馈（Blob 持久化） =====
async function handleFeedback(req, res) {
  if (req.method === 'GET') {
    if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });
    try {
      const feedbacks = await readFeedbacks();
      feedbacks.sort((a, b) => new Date(b.time) - new Date(a.time));
      const stats = { total: feedbacks.length, byType: {}, pending: 0 };
      feedbacks.forEach(f => { stats.byType[f.type] = (stats.byType[f.type] || 0) + 1; if (f.status === 'pending') stats.pending++; });
      return res.status(200).json({ success: true, data: feedbacks, stats });
    } catch (e) { return res.status(200).json({ success: true, data: [] }); }
  }

  if (req.method === 'POST') {
    try {
      // 限流：单 IP 10 次/小时，防恶意灌库
      if (!checkRateLimit('feedback:' + getClientIp(req), 10, 60 * 60 * 1000)) {
        return res.status(429).json({ success: false, error: '提交过于频繁，请稍后再试' });
      }
      const body = req.body || {};
      const content = clampStr(body.content, 2000);
      const contact = clampStr(body.contact, 200);
      const url = clampStr(body.url, 300);
      const ua = clampStr(body.ua, 300);
      if (!content || content.trim().length < 2) return res.status(400).json({ success: false, error: '内容太短' });
      if (content.length > 2000 || contact.length > 200) return res.status(400).json({ success: false, error: '内容超出长度限制' });
      const feedback = { id: Date.now().toString(36) + Math.random().toString(36).substr(2), type: clampStr(body.type, 20) || 'suggest', content: content.trim(), contact: contact.trim(), url: url, ua: ua, time: new Date().toISOString(), status: 'pending' };
      let feedbacks = await readFeedbacks();
      feedbacks.push(feedback);
      // 条数上限：只保留最近 5000 条，防止 Blob 无限膨胀
      if (feedbacks.length > 5000) feedbacks = feedbacks.slice(-5000);
      await writeFeedbacks(feedbacks);
      return res.status(200).json({ success: true, id: feedback.id });
    } catch (error) { return res.status(500).json({ success: false, error: '提交失败: ' + error.message }); }
  }
  res.status(400).json({ error: 'Invalid request' });
}

// ===== 关键词回复批量管理 =====
const KEYWORDS_BLOB = 'wechat-keywords.json';

async function readKeywordsBlob() {
  try {
    const result = await get(KEYWORDS_BLOB, { access: 'private', useCache: false });
    if (!result) return null;
    const reader = result.stream.getReader();
    var chunks = [];
    var done = false;
    while (!done) { var r = await reader.read(); done = r.done; if (r.value) chunks.push(r.value); }
    return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
  } catch (e) { return null; }
}

async function writeKeywordsBlob(data) {
  try {
    await put(KEYWORDS_BLOB, JSON.stringify(data), { contentType: 'application/json', access: 'private', allowOverwrite: true });
    return true;
  } catch (e) { return false; }
}

async function handleKeywords(req, res) {
  // 认证
  if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });

  // GET - 读取所有关键词
  if (req.method === 'GET') {
    let kws = await readKeywordsBlob();
    if (!kws) {
      // 从本地文件兜底
      try { kws = reqJson('../articles/keywords.json'); } catch (e) { kws = []; }
    }
    return res.status(200).json({ success: true, data: kws, total: kws.length });
  }

  // POST - 批量更新（增删改）
  if (req.method === 'POST') {
    try {
      const { action, keywords, add, update, remove } = req.body;
      let kws = await readKeywordsBlob() || [];
      if (!Array.isArray(kws)) kws = [];
      const errors = [];

      // action: 'replace' 全量替换
      if (action === 'replace') {
        if (!Array.isArray(keywords)) return res.status(400).json({ success: false, error: '需要 keywords 数组' });
        kws = keywords;
      }

      // action: 'add' 或 add 数组（新增）
      if (add && Array.isArray(add)) {
        add.forEach(function(item, idx) {
          if (!item.keyword || (!item.reply && !item.title)) { errors.push('第' + (idx+1) + '项缺失 keyword 或回复内容'); return; }
          if (kws.find(function(k) { return k.keyword === item.keyword; })) { errors.push('关键词「' + item.keyword + '」已存在'); return; }
          kws.push({
            keyword: item.keyword,
            aliases: item.aliases || [],
            type: item.type || (item.title ? 'news' : 'text'),
            reply: item.reply || '',
            title: item.title || '',
            desc: item.desc || '',
            picUrl: item.picUrl || '',
            url: item.url || ''
          });
        });
      }

      // action: 'update' 或 update 数组（按 keyword 更新）
      if (update && Array.isArray(update)) {
        update.forEach(function(item, idx) {
          if (!item.keyword) { errors.push('第' + (idx+1) + '项缺失 keyword'); return; }
          const idx2 = kws.findIndex(function(k) { return k.keyword === item.keyword; });
          if (idx2 < 0) { errors.push('关键词「' + item.keyword + '」不存在'); return; }
          // 合并字段
          Object.keys(item).forEach(function(key) {
            if (key === 'keyword' || key === 'aliases') return;
            kws[idx2][key] = item[key];
          });
          if (item.aliases) { kws[idx2].aliases = item.aliases; }
        });
      }

      // action: 'remove' 或 remove 数组（删除指定 keyword）
      if (remove && Array.isArray(remove)) {
        kws = kws.filter(function(k) { return remove.indexOf(k.keyword) === -1; });
      }

      // 保存
      const ok = await writeKeywordsBlob(kws);
      if (!ok) return res.status(500).json({ success: false, error: '保存失败' });

      return res.status(200).json({
        success: true,
        total: kws.length,
        errors: errors.length ? errors : undefined,
        action: action || (add ? 'add' : update ? 'update' : remove ? 'remove' : 'unknown')
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
  res.status(400).json({ error: 'Invalid request' });
}

// ===== 主入口 =====
export default async (req, res) => {
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
      case 'trackBatch':
        return await handleTrackBatch(req, res);
      case 'feedback':
        return await handleFeedback(req, res);
      case 'heatmap':
        return await handleHeatmap(req, res);
      case 'keywords':
      case 'keywords_batch':
        return await handleKeywords(req, res);
      default:
        return res.json({ success: false, error: '未知动作', available: ['forex', 'gold', 'metro', 'yaohao', 'track', 'trackBatch', 'feedback', 'keywords', 'keywords_batch'] });
    }
  } catch (e) {
    return res.status(500).json({ success: false, error: e.message });
  }
};
