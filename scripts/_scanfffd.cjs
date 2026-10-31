/* 全站 U+FFFD 乱码扫描：文件 + 出现次数 + 行号（排除 edge-profile/node_modules/.git） */
const fs = require('fs');
const path = require('path');
const ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper';
const SKIP = new Set(['edge-profile', 'node_modules', '.git', '.workbuddy']);
let total = 0;
const rows = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(html?|js|json|css|md)$/i.test(e.name)) continue;
    const txt = fs.readFileSync(p, 'utf8');
    const lines = txt.split('\n');
    const hits = [];
    lines.forEach((l, i) => {
      let n = (l.match(/\uFFFD/g) || []).length;
      if (n > 0) hits.push((i + 1) + 'x' + n);
    });
    if (hits.length) {
      const count = hits.reduce((a, h) => a + parseInt(h.split('x')[1]), 0);
      total += count;
      rows.push({ f: path.relative(ROOT, p), count, lines: hits.join(',') });
    }
  }
}
walk(ROOT);
rows.sort((a, b) => b.count - a.count);
rows.forEach(r => console.log(r.count + '\t' + r.f + '\t[' + r.lines + ']'));
console.log('TOTAL=' + total + ' FILES=' + rows.length);
