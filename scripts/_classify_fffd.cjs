/* FFFD 分类器：emoji 尾字符（安全删除）vs 正文损坏（需人工重写） */
const fs = require('fs');
const path = require('path');
const ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper';
const SKIP = new Set(['edge-profile', 'node_modules', '.git', '.workbuddy', 'scripts']);
const emojiLike = cp => {
  if (cp == null) return false;
  return cp >= 0x1F000 || (cp >= 0x2190 && cp <= 0x2BFF) || (cp >= 0x2600 && cp <= 0x27BF) || (cp >= 0xFE00 && cp <= 0xFE0F) || cp === 0x3030 || (cp >= 0x00A9 && cp <= 0x00AE) || (cp >= 0xDC00 && cp <= 0xDFFF && false);
};
/* 取 FFFD 前一个完整码点（正确处理代理对） */
function prevCP(l, idx) {
  if (idx <= 0) return null;
  const cu = l.charCodeAt(idx - 1);
  if (cu >= 0xDC00 && cu <= 0xDFFF && idx >= 2) {
    const lead = l.charCodeAt(idx - 2);
    if (lead >= 0xD800 && lead <= 0xDBFF) return l.codePointAt(idx - 2);
  }
  return cu;
}
const rows = [];
let emojiCnt = 0, proseCnt = 0, emojiFiles = new Set(), proseFiles = new Set();
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(html?|js|json)$/i.test(e.name)) continue;
    const txt = fs.readFileSync(p, 'utf8');
    if (!txt.includes('\uFFFD')) continue;
    const rel = path.relative(ROOT, p);
    let em = 0, pr = 0;
    const lines = txt.split('\n');
    lines.forEach((l, i) => {
      let idx = -1;
      while ((idx = l.indexOf('\uFFFD', idx + 1)) >= 0) {
        const prev = prevCP(l, idx);
        const next = idx + 1 < l.length ? l.codePointAt(idx + 1) : null;
        // FFFD 紧跟 emoji/变体选择符之后 → emoji 尾字符（安全删除）
        if (emojiLike(prev)) em++;
        else pr++;
      }
    });
    emojiCnt += em; proseCnt += pr;
    if (em > 0) emojiFiles.add(rel);
    if (pr > 0) proseFiles.add(rel);
    rows.push({ rel, em, pr });
  }
}
walk(ROOT);
rows.sort((a, b) => (b.pr - a.pr) || (b.em - a.em));
console.log('=== 正文损坏（需人工重写）按严重度排序 ===');
rows.filter(r => r.pr > 0).forEach(r => console.log(r.pr + '\t' + r.rel));
console.log('emoji-slot total=' + emojiCnt + ' files=' + emojiFiles.size);
console.log('prose total=' + proseCnt + ' files=' + proseFiles.size);
