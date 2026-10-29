// Vercel Serverless Function - 文章公开阅读页（服务端渲染，SEO 友好）
// 访问：/p/<slug>  ->  vercel.json 重写到 /api/article?id=<slug>
// 数据来源：与 api/articles.js 相同的 Vercel Blob / 本地兜底存储
//
// 渲染完整 HTML，带 <title> / meta description / canonical / og / JSON-LD，
// 让 Google 能正常抓取并收录通过 API 发布的文章。

import { get } from '@vercel/blob';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://www.ihangzhou.net';
const LOCAL_DIR = path.join(__dirname, '..', 'data', '.articles');
const hasBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;
const bodyKey = (slug) => `article:${slug}.json`;

const SLUG_RE = /^[一-龥A-Za-z0-9_\-]{1,120}$/;

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

// 极简 Markdown -> HTML（仅覆盖常见语法，足够文章排版）
function md2html(md) {
  if (!md) return '';
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '', inCode = false, para = [];
  const flush = () => {
    if (para.length) { html += '<p>' + inline(para.join(' ')) + '</p>\n'; para = []; }
  };
  for (let raw of lines) {
    const line = raw.trimEnd();
    if (/^```/.test(line)) { flush(); inCode = !inCode; if (inCode) html += '<pre><code>'; else html += '</code></pre>\n'; continue; }
    if (inCode) { html += escapeHtml(line) + '\n'; continue; }
    if (!line.trim()) { flush(); continue; }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) { flush(); const lv = h[1].length; html += `<h${lv}>${inline(h[2])}</h${lv}>\n`; continue; }
    const li = line.match(/^[-*]\s+(.*)$/);
    if (li) { flush(); html += '<ul><li>' + inline(li[1]) + '</li></ul>\n'; continue; }
    const bq = line.match(/^>\s?(.*)$/);
    if (bq) { flush(); html += '<blockquote>' + inline(bq[1]) + '</blockquote>\n'; continue; }
    para.push(line);
  }
  flush();
  // 合并相邻 ul
  html = html.replace(/<\/ul>\n<ul>/g, '\n');
  return html;
}
function inline(s) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderHtml(article, slug) {
  const title = article.title || 'iHangzhou 文章';
  const summary = (article.summary || '').slice(0, 160);
  const cover = article.cover || 'https://www.ihangzhou.net/images/logo-mark-192.png';
  const url = `${SITE_ORIGIN}/p/${encodeURIComponent(slug)}`;
  const body = article.html ? article.html : md2html(article.markdown || '');
  const cat = article.cat || '未分类';
  const published = (article.publishedAt || '').slice(0, 10);

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: summary,
    image: [cover],
    datePublished: article.publishedAt || null,
    dateModified: article.updatedAt || article.publishedAt || null,
    author: { '@type': 'Organization', name: article.author || 'iHangzhou' },
    publisher: { '@type': 'Organization', name: 'iHangzhou', logo: { '@type': 'ImageObject', url: 'https://www.ihangzhou.net/images/logo-mark-192.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url }
  };

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)} - iHangzhou 杭州生活助手</title>
<meta name="description" content="${escapeHtml(summary)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(summary)}">
<meta property="og:image" content="${escapeHtml(cover)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<link rel="stylesheet" href="/css/style.css">
<style>
.wrap{max-width:760px;margin:0 auto;padding:24px 16px 64px;line-height:1.8;color:#1f2937}
.wrap h1{font-size:28px;line-height:1.3;margin:.4em 0}
.wrap h2{font-size:22px;margin:1.4em 0 .6em}
.wrap h3{font-size:18px;margin:1.2em 0 .5em}
.wrap p{margin:.8em 0}
.wrap img{max-width:100%;border-radius:10px;margin:12px 0}
.wrap blockquote{border-left:4px solid #ff6b6b;background:#fff7f7;margin:1em 0;padding:10px 16px;color:#555}
.wrap pre{background:#0f172a;color:#e2e8f0;padding:14px;border-radius:10px;overflow:auto}
.wrap a{color:#e0533d}
.meta{color:#8a94a6;font-size:13px;margin-bottom:18px}
.cover{width:100%;border-radius:14px;margin:14px 0 22px}
.back{display:inline-block;margin-top:30px;color:#e0533d;text-decoration:none}
</style>
</head>
<body>
<main class="wrap">
<a href="/articles.html" class="back">← 返回文章列表</a>
<h1>${escapeHtml(title)}</h1>
<div class="meta">${escapeHtml(cat)}${published ? ' · ' + published : ''}</div>
${cover ? `<img class="cover" src="${escapeHtml(cover)}" alt="${escapeHtml(title)}">` : ''}
${body}
<a href="/articles.html" class="back">← 返回文章列表</a>
</main>
</body>
</html>`;
}

export default async function handler(req, res) {
  const slug = (req.query && req.query.id) || '';
  if (!SLUG_RE.test(slug)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send('<h1>404</h1><p>文章不存在</p><p><a href="/articles.html">返回列表</a></p>');
  }
  const article = await readBody(slug);
  if (!article) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send('<h1>404</h1><p>文章不存在或已删除</p><p><a href="/articles.html">返回列表</a></p>');
  }
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=600');
  return res.status(200).send(renderHtml(article, slug));
}

export const _test = { md2html, renderHtml };
