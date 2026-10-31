import { chromium } from 'playwright';
import { readdirSync } from 'fs';
const BASE = 'http://localhost:8765';
const htmls = readdirSync('/Users/asind/PycharmProjects/ihangzhou-helper')
  .filter(f => f.endsWith('.html') && !['404','offline'].includes(f.split('.')[0]));
const PAGES = htmls.map(f => '/' + f).sort();
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0, na = 0;
const fails = [];
for (const p of PAGES) {
  const pg = await ctx.newPage();
  try {
    await pg.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
    await pg.waitForTimeout(700);
    const r = await pg.evaluate(() => {
      const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero,.travel-hero,.place-hero,.td-hero,.zb-hero,.art-hero');
      let hx = null;
      if (hero) {
        const t = hero.querySelector('.ch-badge,.p-hero-title,.art-hero h1,h1,h2');
        if (t) hx = Math.round(t.getBoundingClientRect().left);
      }
      const sg = document.querySelector('#serviceGrid,.p-cards,.bf-modules,#zmContainer');
      const card = sg ? sg.querySelector('a,.sitem,.p-card') : null;
      const content = document.querySelector('.content,.p-body,.p-cards,.bf-modules,.service-grid,.travel-detail,.article-body,.art-list');
      let cx = null;
      if (content && (card?.getBoundingClientRect().left ?? 0) > 0) {
        cx = Math.round(card.getBoundingClientRect().left);
      } else if (content) {
        const c = content.querySelector('a,section,h2,.cat-block,.p-card,.sitem,.p-neighbor');
        if (c) cx = Math.round(c.getBoundingClientRect().left);
      }
      return { hx, cx };
    });
    const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
    let status;
    if (diff === null) { na++; status = '(n/a)'; }
    else if (diff < 3) { pass++; status = '✅'; }
    else { fail++; status = '❌ D' + diff; fails.push({ p, d: diff, hx: r.hx, cx: r.cx }); }
    console.log(p.padEnd(28), (r.hx||'-').toString().padEnd(4), (r.cx||'-').toString().padEnd(4), status);
  } catch(e) { na++; console.log(p.padEnd(28), 'ERR', e.message.slice(0,25)); }
  await pg.close();
}
await b.close();
console.log(`\n=== TOTAL: ${PAGES.length} | PASS: ${pass} | FAIL: ${fail} | N/A: ${na} ===`);
if (fails.length) {
  console.log('\n--- FAILURES ---');
  fails.forEach(f => console.log(f.p.padEnd(28), 'D=' + f.d, 'hx=' + f.hx, 'cx=' + f.cx));
}
