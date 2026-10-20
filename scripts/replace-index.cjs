const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 读取映射表
const map = JSON.parse(fs.readFileSync(path.join(rootDir, 'scripts/subpage-map.json'), 'utf8'));

// 读取 index.html
const indexPath = path.join(rootDir, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 构建替换数组
const replacements = [];

for (const [key, newPage] of Object.entries(map)) {
  const [catK, subN] = key.split('|');
  const encoded = encodeURIComponent(subN);
  const pattern1 = `cat\\.html\\?c=${catK}&s=${encoded}`;
  const pattern2 = `cat\\.html\\?s=${encoded}&c=${catK}`;
  replacements.push({ pattern1, pattern2, newPage, subN, catK });
}

let replaced = 0;
for (const r of replacements) {
  const re1 = new RegExp(r.pattern1, 'g');
  const re2 = new RegExp(r.pattern2, 'g');
  if (re1.test(html)) {
    html = html.replace(re1, r.newPage);
    replaced++;
    console.log('  OK ' + r.subN + ' (' + r.catK + ') -> ' + r.newPage);
  } else if (re2.test(html)) {
    html = html.replace(re2, r.newPage);
    replaced++;
    console.log('  OK ' + r.subN + ' (' + r.catK + ') -> ' + r.newPage);
  } else {
    console.log('  MISS ' + r.subN + ' (' + r.catK + ') - pattern: cat.html?c=' + r.catK + '&s=' + encodeURIComponent(r.subN));
  }
}

const remaining = html.match(/cat\.html\?[^\s'"]+/g);
if (remaining) {
  console.log('\nRemaining cat.html links:');
  remaining.forEach(function(l) { console.log('  ', l.substring(0, 90)); });
} else {
  console.log('\nAll cat.html query params removed from index.html');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Done. Replaced ' + replaced + ' links.');
