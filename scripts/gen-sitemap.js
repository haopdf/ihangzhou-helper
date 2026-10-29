/**
 * 生成 sitemap.xml —— 修复 Google 收录问题
 *
 * 覆盖：
 *   1) 站点顶层页面（index/travel/food/articles/cat/...）
 *   2) articles/ 下全部静态文章页（2731 篇，之前完全没收录）
 *   3) 通过 API 发布的文章（Blob 中的 articles-manifest.json -> /p/<slug>）
 *
 * 用法：node scripts/gen-sitemap.js   （已接入 npm run build，每次部署自动刷新）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BASE = process.env.SITE_ORIGIN || 'https://www.ihangzhou.net';
const OUT = path.join(ROOT, 'sitemap.xml');
const TODAY = new Date().toISOString().slice(0, 10);

// 不参与 sitemap 的目录 / 文件
const SKIP_DIRS = new Set(['node_modules', '.git', 'api', 'articles', 'admin', 'scripts', 'templates', 'assets', 'celeb', 'data', '_templates', '.playwright-cli', 'css', 'js', 'images', '.vercel']);
const SKIP_FILES = new Set(['sitemap.xml', 'robots.txt']);

function url(segments) {
  // segments 为相对站点根的路径数组，逐段编码中文
  const p = segments.map(s => encodeURI(s)).join('/');
  return BASE + '/' + p;
}

function loc(relPathWithoutLeadingSlash) {
  const segs = relPathWithoutLeadingSlash.split('/');
  return url(segs);
}

// ---------- 1) 顶层页面 ----------
function topLevelPages() {
  const out = [];
  for (const f of fs.readdirSync(ROOT)) {
    const fp = path.join(ROOT, f);
    if (!fs.statSync(fp).isFile()) continue;
    if (!f.endsWith('.html')) continue;
    if (SKIP_FILES.has(f)) continue;
    out.push(f);
  }
  return out;
}

// ---------- 2) 静态文章页（articles/ 递归） ----------
function walkArticles(dir, rel, acc) {
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    const st = fs.statSync(fp);
    const r = rel ? rel + '/' + f : f;
    if (st.isDirectory()) walkArticles(fp, r, acc);
    else if (f.endsWith('.html')) acc.push(r.replace(/\.html$/, ''));
  }
  return acc;
}

// ---------- 3) API 发布的文章 ----------
async function apiArticles() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { get } = await import('@vercel/blob');
    const r = await get('articles-manifest.json', { access: 'private', useCache: false });
    if (!r) return [];
    const arr = JSON.parse(await r.text());
    return (arr || []).filter(m => m.status !== 'draft').map(m => m.slug);
  } catch (e) {
    console.warn('  (跳过 API 文章清单读取：', e.message, ')');
    return [];
  }
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function item(locUrl, { lastmod = TODAY, changefreq = 'weekly', priority = '0.7' } = {}) {
  return `  <url>\n    <loc>${esc(locUrl)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function main() {
  const urls = [];

  // 顶层页面
  const top = topLevelPages();
  const highPages = new Set(['index.html', 'articles.html', 'cat.html', 'channel.html', 'travel.html', 'food.html']);
  for (const f of top) {
    const isHigh = highPages.has(f);
    urls.push(item(loc(f), {
      changefreq: isHigh ? 'daily' : 'weekly',
      priority: isHigh ? '0.9' : '0.7'
    }));
  }

  // 静态文章页
  const articleSlugs = walkArticles(path.join(ROOT, 'articles'), '', []);
  for (const s of articleSlugs) {
    urls.push(item(loc('articles/' + s + '.html'), { changefreq: 'monthly', priority: '0.6' }));
  }

  // API 文章页
  const apiSlugs = await apiArticles();
  for (const s of apiSlugs) {
    urls.push(item(loc('p/' + s), { changefreq: 'weekly', priority: '0.7' }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

  fs.writeFileSync(OUT, xml);
  console.log(`OK: sitemap.xml 生成完成`);
  console.log(`  顶层页面     : ${top.length}`);
  console.log(`  静态文章页   : ${articleSlugs.length}`);
  console.log(`  API 文章页   : ${apiSlugs.length}`);
  console.log(`  合计 URL     : ${urls.length}`);
  console.log(`  输出文件     : ${OUT}`);
  console.log(`  日期         : ${TODAY}`);
}

main().catch(e => { console.error('sitemap 生成失败:', e); process.exit(1); });
