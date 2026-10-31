import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = ['banshi','traffic','food','laozihao','celebrity','history','internet','zhaopin','street','weekend','museum','coffee'];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0;
for (const p of PAGES) {
  const pg = await ctx.newPage();
  await pg.goto(BASE + '/' + p + '.html', { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(1500);
  const r = await pg.evaluate(() => {
    const hero = document.querySelector('.ch-hero');
    const h1 = hero ? hero.querySelector('h1') : null;
    const sg = document.querySelector('#serviceGrid,.p-cards');
    const card = sg ? sg.querySelector('a,.sitem') : null;
    return {
      hx: h1 ? Math.round(h1.getBoundingClientRect().left) : null,
      cx: card ? Math.round(card.getBoundingClientRect().left) : null
    };
  });
  const diff = (r.hx !== null && r.cx !== null) ? Math.abs(r.hx - r.cx) : null;
  if (diff !== null && diff < 3) pass++;
  console.log('/' + p + '.html'.padEnd(20), 'hx=' + (r.hx ?? '-'), 'cx=' + (r.cx ?? '-'),
    (diff === null ? '(n/a)' : diff < 3 ? '✅' : '❌ D' + diff));
  await pg.close();
}
await b.close();
console.log(`\n=== gen-channels pages PASS: ${pass} / ${PAGES.length} ===`);
