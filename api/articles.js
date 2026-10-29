// Vercel Serverless Function - 文章发布 / 清单管理 API
// 用途：让外部 AI / 脚本把写好的文章投到本平台（网站 + 可被 Google 收录）
// 持久化：Vercel Blob（有 BLOB_READ_WRITE_TOKEN 时）；本地文件兜底（dev / 无 token）
//
// 存储结构：
//   manifest : articles-manifest.json  -> [{ slug,title,cat,summary,cover,tags,topics,status,publishedAt,updatedAt }]
//   body    : article:<slug>.json       -> 完整文章（含 html / markdown 正文）
//   reserve : article-reservations.json -> 选题锁（防多 AI 并发写同主题）
// 公开阅读页：/p/<slug>  ->  api/article.js 服务端渲染（SEO 友好）
//
// 鉴权：写操作需 Authorization: Bearer {CMS_ADMIN_PASSWORD}
// 防重复：POST 时 body.action = 'check'（公开查重）| 'reserve'（占坑锁）| 省略即正式发布

import { put, get, del } from '@vercel/blob';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'ihangzhou2024';
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://www.ihangzhou.net';

const MANIFEST_KEY = 'articles-manifest.json';
const RESERVE_KEY = 'article-reservations.json';
const RESERVE_TTL_MS = 30 * 60 * 1000; // 选题锁默认 30 分钟
const DUP_THRESHOLD = 0.5; // 相似度 >= 0.5 判为「同主题已覆盖」
const bodyKey = (slug) => `article:${slug}.json`;

// 本地兜底目录（无 Blob token 时，写到仓库 data/.articles/ 便于本地调试）
const LOCAL_DIR = path.join(__dirname, '..', 'data', '.articles');

const hasBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;

function checkAuth(req) {
  const h = req.headers && req.headers.authorization;
  if (!h) return false;
  const [type, token] = h.split(' ');
  return type === 'Bearer' && token === ADMIN_PASSWORD;
}

function safeSlug(slug) {
  if (typeof slug !== 'string') return null;
  const s = slug.trim();
  // 仅允许中文、字母、数字、下划线、连字符；拒绝路径穿越与特殊字符
  if (!/^[一-龥A-Za-z0-9_\-]{1,120}$/.test(s)) return null;
  return s;
}

function nowISO() { return new Date().toISOString(); }

// ---------- 存储：manifest ----------
async function readManifest() {
  if (hasBlob()) {
    try {
      const r = await get(MANIFEST_KEY, { access: 'private', useCache: false });
      if (r) {
        const text = await r.text();
        return JSON.parse(text);
      }
    } catch (e) { /* 不存在或读取失败 */ }
    return [];
  }
  try {
    const p = path.join(LOCAL_DIR, 'manifest.json');
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {}
  return [];
}

async function writeManifest(arr) {
  if (hasBlob()) {
    await put(MANIFEST_KEY, JSON.stringify(arr), {
      contentType: 'application/json', access: 'private', allowOverwrite: true
    });
    return;
  }
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  fs.writeFileSync(path.join(LOCAL_DIR, 'manifest.json'), JSON.stringify(arr, null, 2));
}

// ---------- 存储：body ----------
async function readBody(slug) {
  if (hasBlob()) {
    try {
      const r = await get(bodyKey(slug), { access: 'private', useCache: false });
      if (r) return JSON.parse(await r.text());
    } catch (e) {}
    return null;
  }
  try {
    const p = path.join(LOCAL_DIR, `${slug}.json`);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {}
  return null;
}

async function writeBody(slug, obj) {
  if (hasBlob()) {
    await put(bodyKey(slug), JSON.stringify(obj), {
      contentType: 'application/json', access: 'private', allowOverwrite: true
    });
    return;
  }
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  fs.writeFileSync(path.join(LOCAL_DIR, `${slug}.json`), JSON.stringify(obj, null, 2));
}

async function deleteBody(slug) {
  if (hasBlob()) {
    try { await del(bodyKey(slug), { access: 'private' }); } catch (e) { /* 可能不存在 */ }
    return;
  }
  try { fs.unlinkSync(path.join(LOCAL_DIR, `${slug}.json`)); } catch (e) {}
}

// ---------- 业务：UPSERT ----------
async function upsertArticle(input) {
  const slug = safeSlug(input.slug);
  if (!slug) throw new Error('slug 非法：仅允许中文/字母/数字/下划线/连字符，长度 1-120');
  if (!input.title || !String(input.title).trim()) throw new Error('title 为必填');

  const manifest = await readManifest();
  const existing = manifest.find(m => m.slug === slug);
  const ts = nowISO();

  const meta = {
    slug,
    title: String(input.title).trim(),
    cat: input.cat || (existing && existing.cat) || '未分类',
    summary: input.summary || (existing && existing.summary) || '',
    cover: input.cover || (existing && existing.cover) || '',
    tags: Array.isArray(input.tags) ? input.tags : (existing && existing.tags) || [],
    topics: Array.isArray(input.topics) ? input.topics.map(String) : (existing && existing.topics) || [],
    status: input.status === 'draft' ? 'draft' : 'published',
    author: input.author || (existing && existing.author) || '',
    publishedAt: (existing && existing.publishedAt) || ts,
    updatedAt: ts
  };

  const body = {
    ...meta,
    html: input.html || (existing && existing.html) || '',
    markdown: input.markdown || (existing && existing.markdown) || ''
  };

  // 至少要有正文
  if (!body.html && !body.markdown) throw new Error('html 或 markdown 至少提供一项');

  await writeBody(slug, body);

  const idx = manifest.findIndex(m => m.slug === slug);
  if (idx >= 0) manifest[idx] = meta; else manifest.push(meta);
  // 按 updatedAt 倒序，最新在前
  manifest.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  await writeManifest(manifest);

  return meta;
}

async function removeArticle(slug) {
  const s = safeSlug(slug);
  if (!s) throw new Error('slug 非法');
  const manifest = await readManifest();
  const next = manifest.filter(m => m.slug !== s);
  if (next.length === manifest.length) return { removed: false };
  await writeManifest(next);
  await deleteBody(s);
  return { removed: true };
}

// ---------- 存储：选题锁（reservations）----------
async function readReservations() {
  if (hasBlob()) {
    try {
      const r = await get(RESERVE_KEY, { access: 'private', useCache: false });
      if (r) return JSON.parse(await r.text());
    } catch (e) {}
    return [];
  }
  try {
    const p = path.join(LOCAL_DIR, 'reservations.json');
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch (e) {}
  return [];
}

async function writeReservations(arr) {
  if (hasBlob()) {
    await put(RESERVE_KEY, JSON.stringify(arr), {
      contentType: 'application/json', access: 'private', allowOverwrite: true
    });
    return;
  }
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  fs.writeFileSync(path.join(LOCAL_DIR, 'reservations.json'), JSON.stringify(arr, null, 2));
}

// 清掉过期锁
function purgeExpired(reservations, now = Date.now()) {
  return reservations.filter(r => new Date(r.expiresAt).getTime() > now);
}

// ---------- 主题相似度（中文友好）----------
function bigrams(s) {
  const t = String(s || '').trim().replace(/\s+/g, '').toLowerCase();
  const out = new Set();
  if (t.length <= 1) { if (t) out.add(t); return out; }
  for (let i = 0; i < t.length - 1; i++) out.add(t.slice(i, i + 2));
  return out;
}

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

// 计算「传入主题」与「已发布文章」的相似度（0-1）
function similarity(incoming, article) {
  let score = 0;
  const incTopics = (incoming.topics || []).map(t => String(t).trim()).filter(Boolean);
  const artTopics = (article.topics || []).map(t => String(t).trim()).filter(Boolean);
  const artSet = new Set(artTopics);
  let inter = 0;
  for (const t of incTopics) if (artSet.has(t)) inter++;
  if (inter && incTopics.length) score += 0.6 * (inter / incTopics.length);
  if (incoming.cat && article.cat && incoming.cat === article.cat) score += 0.25;
  const j = jaccard(bigrams(incoming.title), bigrams(article.title));
  score += 0.4 * j;
  return Math.min(score, 1);
}

// 在已发布文章中查重，返回命中列表（按相似度降序，最多 5 条）
async function checkDuplicate(input) {
  const manifest = await readManifest();
  const published = manifest.filter(m => m.status !== 'draft');
  const scored = published
    .map(a => ({ article: a, score: similarity(input, a) }))
    .filter(x => x.score >= DUP_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  return {
    duplicate: scored.length > 0,
    matches: scored.map(x => ({
      slug: x.article.slug,
      title: x.article.title,
      cat: x.article.cat,
      url: `${SITE_ORIGIN}/p/${encodeURIComponent(x.article.slug)}`,
      score: Number(x.score.toFixed(2))
    }))
  };
}

// 选题锁 key：分类 :: 核心主题词（topics[0] 或标题前若干字）
function normalizeKey(input) {
  const cat = (input.cat || '').trim();
  const base = (input.topics && input.topics[0])
    ? String(input.topics[0]).trim()
    : (input.title ? String(input.title).trim().slice(0, 8) : (cat || 'topic'));
  return `${cat}::${base}`.toLowerCase();
}

// 占坑：先查已发布（撞则 409），再查现有锁（被占则 409），否则写锁
async function reserveTopic(input, ttlMs = RESERVE_TTL_MS) {
  const dup = await checkDuplicate(input);
  if (dup.duplicate) {
    const e = new Error('该主题已有已发布文章，请勿重复撰写');
    e.code = 'DUP_PUBLISHED';
    e.matches = dup.matches;
    throw e;
  }
  let reservations = purgeExpired(await readReservations());
  const topicKey = normalizeKey(input);
  const conflict = reservations.find(r => r.topicKey === topicKey);
  if (conflict) {
    const e = new Error('该主题已被其他 AI 占坑（选题锁），请换题或稍后重试');
    e.code = 'DUP_RESERVED';
    e.conflict = { reservationId: conflict.id, title: conflict.title, expiresAt: conflict.expiresAt };
    throw e;
  }
  const id = 'rsv_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const now = Date.now();
  const rec = {
    id, topicKey,
    title: input.title,
    cat: input.cat || '',
    topics: input.topics || [],
    reservedBy: input.reservedBy || 'ai',
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttlMs).toISOString()
  };
  reservations.push(rec);
  await writeReservations(reservations);
  return rec;
}

// 消费选题锁：校验存在且未过期后删除（返回 rec）；否则抛错
async function consumeReservation(id) {
  const reservations = purgeExpired(await readReservations());
  const rec = reservations.find(r => r.id === id);
  if (!rec) {
    const e = new Error('选题锁已过期或不存在，请重新 check + reserve 后再发');
    e.code = 'RESERVE_EXPIRED';
    throw e;
  }
  await writeReservations(reservations.filter(r => r.id !== id));
  return rec;
}

// ---------- 入口 ----------
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // GET：?slug=xxx 读全文；否则列清单
    if (req.method === 'GET') {
      const slug = req.query && req.query.slug;
      if (slug) {
        const s = safeSlug(slug);
        if (!s) return res.status(400).json({ success: false, error: 'slug 非法' });
        const body = await readBody(s);
        if (!body || body.deleted) return res.status(404).json({ success: false, error: '文章不存在' });
        return res.status(200).json({ success: true, data: body });
      }
      let manifest = await readManifest();
      // 可选过滤：?status=published
      if (req.query && req.query.status) {
        manifest = manifest.filter(m => m.status === req.query.status);
      }
      return res.status(200).json({ success: true, count: manifest.length, data: manifest });
    }

    // 写操作鉴权
    if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });

    if (req.method === 'POST') {
      const body = req.body || {};
      const action = body.action;

      // ① 查重（公开，无需鉴权）：写全文之前先调，撞了就换题
      if (action === 'check') {
        const r = await checkDuplicate(body);
        return res.status(200).json({ success: true, ...r });
      }

      if (!checkAuth(req)) return res.status(401).json({ success: false, error: '需要认证' });

      // ② 占坑锁（需鉴权）：定题后调，30 分钟内独占该主题，防并发撞车
      if (action === 'reserve') {
        try {
          const rec = await reserveTopic(body);
          return res.status(200).json({
            success: true,
            reservationId: rec.id,
            expiresAt: rec.expiresAt,
            ttlMinutes: RESERVE_TTL_MS / 60000
          });
        } catch (e) {
          return res.status(409).json({
            success: false, code: e.code, error: e.message,
            matches: e.matches || undefined, conflict: e.conflict || undefined
          });
        }
      }

      // ③ 正式发布
      // 带 reservationId：校验锁有效后释放并发布
      if (body.reservationId) {
        try {
          await consumeReservation(body.reservationId);
        } catch (e) {
          return res.status(409).json({ success: false, code: e.code, error: e.message });
        }
      } else {
        // 未带锁：软拦——若撞已发布文章（且不是复用同一 slug 更新）则拒绝，避免浪费
        const dup = await checkDuplicate(body);
        const sameSlug = dup.matches.some(m => m.slug === safeSlug(body.slug));
        if (dup.duplicate && !sameSlug) {
          return res.status(409).json({
            success: false, code: 'DUP_PUBLISHED',
            error: '检测到同主题已发布文章，建议换题；或复用同一 slug 以更新该文',
            matches: dup.matches
          });
        }
      }

      const meta = await upsertArticle(body);
      return res.status(200).json({
        success: true,
        data: meta,
        url: `${SITE_ORIGIN}/p/${encodeURIComponent(meta.slug)}`
      });
    }

    if (req.method === 'DELETE') {
      const slug = (req.query && req.query.slug) || (req.body && req.body.slug);
      const r = await removeArticle(slug);
      return res.status(200).json({ success: true, ...r });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (e) {
    return res.status(400).json({ success: false, error: e.message });
  }
}

export const _test = {
  safeSlug, upsertArticle, readManifest, readBody, removeArticle,
  checkDuplicate, reserveTopic, readReservations, consumeReservation,
  purgeExpired, normalizeKey, similarity
};
