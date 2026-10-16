/**
 * 构建轻量搜索索引（ESM 版）
 * 从 articles/index.json 提取 {slug, title, cat, short}
 * 输出 articles/search-index.json（移动端用，只带80字符摘要）
 *
 * 用法：node scripts/build-search-index.js  或  npm run build
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INDEX_PATH = path.join(__dirname, '..', 'articles', 'index.json');
const OUT_PATH   = path.join(__dirname, '..', 'articles', 'search-index.json');

const full = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));

const compact = full.map(a => ({
  s: a.slug,
  t: a.title,
  c: a.cat,
  d: (a.summary || '').slice(0, 80).replace(/["\\]/g, ' ')
}));

fs.writeFileSync(OUT_PATH, JSON.stringify(compact));

const origSize = fs.statSync(INDEX_PATH).size;
const newSize  = fs.statSync(OUT_PATH).size;
console.log(`OK: ${full.length} entries`);
console.log(`  index.json       : ${(origSize/1024).toFixed(0)} KB`);
console.log(`  search-index.json: ${(newSize/1024).toFixed(0)} KB`);
console.log(`  saving           : ${((1-newSize/origSize)*100).toFixed(1)}%`);
