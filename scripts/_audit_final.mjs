import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  '/banshi.html', '/traffic.html', '/food.html', '/laozihao.html', '/celebrity.html',
  '/history.html', '/internet.html', '/zhaopin.html', '/street.html', '/weekend.html',
  '/museum.html', '/coffee.html',
  '/zhoumo.html', '/travel.html', '/cat.html',
  // detail sub-pages
  '/laozihao.html?id=louwailou', '/museum.html?id=zhemo', '/coffee.html?id=xiezilou',
  '/chaguan.html?id=chayaun', '/dessert.html?id=dingshenggao', '/guzhen.html?id=tangqi',
  '/breakfast.html?id=banmian',
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0;
const fails = [];
for (const url of PAGES) {
  const pg = await ctx.newPage();
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(1800);
  const r = await pg.evaluate(() => {
    const hero = document.querySelector('.ch-hero,.p-hero,.cat-hero,.travel-hero,.place-hero,.td-hero,.zb-hero,.art-hero');
    let hx = null;
    if (hero) {
      const t = hero.querySelector('h1,.p-hero-title,.ch-badge,.ch-hero h2');
      if (t) hx = Math.round(t.getBoundingClientRect().left);
    }
    // 内容取所有常用容器
    const sg = document.querySelector('#serviceGrid,.p-cards,.bf-modules,#zmContainer,#detailContent');
    let cx = null;
    if (sg) {
      const c = sg.querySelector('a,.sitem,.p-card,.p-hist,.p-name-h,.p-name-h2,.p-section,.mu-cr,.card');
      if (c) cx = Math.round(c.getBoundingClientRect().left);
    }
    const dc = document.getElementById('detailContent');
    if (!cx && dc) { const h1 = dc.querySelector('h1,.p-hist,.p-name-h'); if (h1) cx = Math.round(h1.getBoundingClientRect().left); }
    return { hx, cx };
  });
  const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
  let status;
  if (diff === null) status = '(skip)';
  else if (diff <= 3) { pass++; status = '✅'; }
  else { fail++; status = '❌ D' + diff; fails.push(url); }
  console.log(url.padEnd(42), 'hx=' + (r.hx ?? '-'), 'cx=' + (r.cx ?? '-'), status);
  await pg.close();
}
await b.close();
console.log(`\n=== FINAL AUDIT: PASS=${pass} FAIL=${fail} ===`);
if (fails.length) console.log('FAIL:', fails);
