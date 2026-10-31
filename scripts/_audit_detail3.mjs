import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  '/coffee.html?id=xiezilou',
  '/chaguan.html?id=chayaun',
  '/dessert.html?id=dingshenggao',
  '/tea.html?id=need_manual',
  '/temple.html?id=need_manual',
  '/night-market.html?id=need_manual',
  '/guzhen.html?id=tangqi',
  '/tushuguan.html?id=need_manual',
  '/story.html?id=need_check',
  "/intangible.html?id=xilingyinshe",
  '/hangbang.html?id=need_manual',
  '/breakfast.html?id=banmian',
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0, na = 0;
for (const url of PAGES) {
  if (url.includes('need_manual') || url.includes('need_check')) { console.log(url.padEnd(40), '(skip - unknown id)'); continue; }
  const pg = await ctx.newPage();
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(2500);
  const r = await pg.evaluate(() => {
    const dc = document.getElementById('detailContent');
    if (!dc) return { err: 'no dc' };
    const h1 = dc.querySelector('h1');
    const phist = dc.querySelector('.p-hist');
    const pnh = dc.querySelector('.p-name-h');
    const pnh2 = dc.querySelector('.p-name-h2');
    const h2 = dc.querySelector('h2');
    const mucr = dc.querySelector('.mu-cr');
    const titleEl = h1 || phist || pnh || pnh2 || mucr || h2;
    const ps = dc.querySelector('.p-section');
    return {
      hx: titleEl ? Math.round(titleEl.getBoundingClientRect().left) : null,
      hxText: titleEl ? titleEl.textContent.trim().slice(0, 10) : null,
      cx: ps ? Math.round(ps.getBoundingClientRect().left) : null,
      dcX: Math.round(dc.getBoundingClientRect().left),
      dcPad: getComputedStyle(dc).padding,
    };
  });
  const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
  let status;
  if (diff === null) { na++; status = '(n/a)'; }
  else if (diff < 3) { pass++; status = '✅'; }
  else { fail++; status = '❌ D' + diff; }
  console.log(url.padEnd(40), 'hx=' + (r.hx ?? '-'), 'cx=' + (r.cx ?? '-'), status, 'dcX=' + (r.dcX ?? '-'));
  await pg.close();
}
await b.close();
console.log(`\n=== DETAIL PAGES: PASS=${pass} FAIL=${fail} N/A=${na} ===`);
