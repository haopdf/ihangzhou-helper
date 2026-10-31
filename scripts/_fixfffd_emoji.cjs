/* 1a: 批量删除 emoji 尾字符 FFFD（紧跟 emoji/VS 之后的替换字符，删除安全） */
const fs = require('fs');
const path = require('path');
const ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper';
const SKIP = new Set(['edge-profile', 'node_modules', '.git', '.workbuddy', 'scripts']);
function prevCP(l, idx) {
  if (idx <= 0) return null;
  const cu = l.charCodeAt(idx - 1);
  if (cu >= 0xDC00 && cu <= 0xDFFF && idx >= 2) {
    const lead = l.charCodeAt(idx - 2);
    if (lead >= 0xD800 && lead <= 0xDBFF) return l.codePointAt(idx - 2);
  }
  return cu;
}
const emojiLike = cp => cp != null && (cp >= 0x1F000 || (cp >= 0x2190 && cp <= 0x2BFF) || (cp >= 0x2600 && cp <= 0x27BF) || (cp >= 0xFE00 && cp <= 0xFE0F));
let fixed = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.(html?|js|json)$/i.test(e.name)) continue;
    let txt = fs.readFileSync(p, 'utf8');
    if (!txt.includes('\uFFFD')) continue;
    let out = '', n = 0;
    const lines = txt.split('\n');
    for (const l of lines) {
      let res = '';
      for (let i = 0; i < l.length; i++) {
        if (l[i] === '\uFFFD' && emojiLike(prevCP(l, i))) { n++; continue; }
        res += l[i];
      }
      out += (out ? '\n' : '') + res;
    }
    if (n > 0) {
      fs.writeFileSync(p, out, 'utf8');
      fixed += n;
      console.log('fixed ' + n + ' → ' + path.relative(ROOT, p));
    }
  }
}
walk(ROOT);
console.log('TOTAL-FIXED=' + fixed);
