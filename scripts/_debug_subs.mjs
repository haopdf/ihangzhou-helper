import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  '/dessert.html?id=dingshenggao',
  '/guzhen.html?id=tangqi',
  '/breakfast.html?id=banmian',
];
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
for (const url of PAGES) {
  const pg = await c.newPage();
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(1800);
  const r = await pg.evaluate(() => {
    const dc = document.getElementById('detailContent');
    const firstChild = dc ? dc.children[0] : null;
    const psection = dc ? dc.querySelector('.p-section') : null;
    return {
      url: location.href,
      firstChildTag: firstChild ? firstChild.tagName + '.' + (firstChild.className || '').slice(0, 30) : null,
      firstChildX: firstChild ? Math.round(firstChild.getBoundingClientRect().left) : null,
      firstChildW: firstChild ? Math.round(firstChild.getBoundingClientRect().width) : null,
      psectionX: psection ? Math.round(psection.getBoundingClientRect().left) : null,
      dcX: dc ? Math.round(dc.getBoundingClientRect().left) : null,
      dcW: dc ? Math.round(dc.getBoundingClientRect().width) : null,
      firstA: dc ? (() => { const a = dc.querySelector('a'); return a ? Math.round(a.getBoundingClientRect().left) : null; })() : null,
    };
  });
  console.log(url, JSON.stringify(r));
  await pg.close();
}
await b.close();
