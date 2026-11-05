// Vercel Serverless Function - 文章索引按需过滤（频道页 / 栏目页「相关文章」）
// GET /api/articles-index?q=关键词1,关键词2&cat=分类&limit=5&mode=index|score
//
// 背景：内页原本整包 fetch articles/index.json（2731 篇 / 1.3MB）再在客户端匹配关键词；
//       本接口在服务端完成匹配，只返回少量结果（通常 < 5KB），接口不可用时调用方回退全量 JSON。
//
// 模式 mode：
//   index（默认）— 命中任一关键词即入选，保持 index.json 原始顺序（各频道页原语义）
//   score        — 标题 +3 / 分类 +2 / 摘要 +1，按得分降序、字数降序（cat.html 原语义）
//
// 数据：构建期由 build-index-data.mjs 从 articles/index.json 生成 lib/articles-index.data.js，
//       随函数打包；本地 vercel dev 或该产物缺失时，回退直接 fs 读 articles/index.json。
// 返回：{ success, count(匹配总数), mode, limit, data:[{slug,title,cat,summary,words}] }
//      数据不可用时返回 404（success:false），调用方应回退到静态 articles/index.json 全量匹配。

let DATASET = null;
let loading = null;

async function getData() {
  if (DATASET) return DATASET;
  if (loading) return loading;
  loading = (async () => {
    try {
      const mod = await import('../lib/articles-index.data.js');
      if (Array.isArray(mod.default)) return mod.default;
    } catch (e) { /* 构建产物缺失 */ }
    try {
      const fs = await import('node:fs');
      const path = await import('node:path');
      const raw = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'articles', 'index.json'), 'utf8'));
      if (Array.isArray(raw)) return raw;
    } catch (e) { /* dev 兜底失败 */ }
    return null;
  })().then((v) => { DATASET = Array.isArray(v) ? v : null; return DATASET; });
  return loading;
}

function parseKws(q) {
  return String(q || '').split(',').map((s) => s.trim()).filter(Boolean).slice(0, 8);
}

function contains(a, kw) {
  return String(a.title || '').indexOf(kw) >= 0 ||
         String(a.summary || '').indexOf(kw) >= 0 ||
         String(a.cat || '').indexOf(kw) >= 0;
}

// 频道页语义：OR 命中，保持原始顺序
function matchIndex(list, kws) {
  const out = [];
  for (const a of list) {
    for (const kw of kws) {
      if (contains(a, kw)) { out.push(a); break; }
    }
  }
  return out;
}

// cat.html 语义：加权评分 + 字数 tiebreak
function matchScore(list, kws) {
  const scored = [];
  for (const a of list) {
    const title = String(a.title || ''), catg = String(a.cat || ''), sum = String(a.summary || '');
    let sc = 0;
    for (const k of kws) {
      if (title.indexOf(k) >= 0) sc += 3;
      else if (catg.indexOf(k) >= 0) sc += 2;
      else if (sum.indexOf(k) >= 0) sc += 1;
    }
    if (sc > 0) scored.push({ a: a, sc: sc });
  }
  scored.sort((x, y) => (y.sc - x.sc) || ((y.a.words || 0) - (x.a.words || 0)));
  return scored;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method Not Allowed' });

  const kws = parseKws(req.query && req.query.q);
  const cat = String((req.query && req.query.cat) || '').trim();
  const rawLimit = parseInt((req.query && req.query.limit) || '5', 10);
  const limit = Math.max(1, Math.min(50, isNaN(rawLimit) ? 5 : rawLimit));
  const mode = (req.query && req.query.mode) === 'score' ? 'score' : 'index';

  const list = await getData();
  if (!list) return res.status(404).json({ success: false, error: '文章索引不可用' });

  // 有关键词 → 匹配；无关键词 → 以全量列表承载（供 cat 等条件独立使用）
  let rows = kws.length
    ? (mode === 'score' ? matchScore(list, kws) : matchIndex(list, kws))
    : list.slice();
  if (cat) {
    const itemOf = (x) => (mode === 'score' ? x.a : x);
    rows = rows.filter((x) => String(itemOf(x).cat || '').indexOf(cat) >= 0);
  }
  const total = rows.length;
  const data = (mode === 'score' ? rows.map((x) => x.a) : rows).slice(0, limit);

  return res.status(200).json({ success: true, count: total, mode, limit, data });
}

export const _test = { parseKws, contains, matchIndex, matchScore, getData };
