// Vercel Serverless Function - 文章发布 / 清单管理 API
// 用途：让外部 AI / 脚本把写好的文章投到本平台（网站 + 可被 Google 收录）
// 持久化：Vercel Blob（有 BLOB_READ_WRITE_TOKEN 时）；本地文件兜底（dev / 无 token）
//
// 存储结构：
//   manifest : articles-manifest.json  -> [{ slug,title,cat,summary,cover,tags,status,publishedAt,updatedAt }]
//   body    : article:<slug>.json       -> 完整文章（含 html / markdown 正文）
// 公开阅读页：/p/<slug>  ->  api/article.js 服务端渲染（SEO 友好）
//
// 鉴权：写操作需 Authorization: Bearer {CMS_ADMIN_PASSWORD}

import { put, get, del } from '@vercel/blob';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'ihangzhou2024';
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://www.ihangzhou.net';

const MANIFEST_KEY = 'articles-manifest.json';
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
      const meta = await upsertArticle(req.body || {});
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

export const _test = { safeSlug, upsertArticle, readManifest, readBody, removeArticle };
