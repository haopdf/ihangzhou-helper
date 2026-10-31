import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await c.newPage();
await p.goto('http://localhost:8765/laozihao.html?id=楼外楼', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  const dc = document.getElementById('detailContent');
  return {
    dcHTML: dc ? dc.innerHTML.slice(0, 200) : 'NO_DC',
    dcX: dc ? Math.round(dc.getBoundingClientRect().left) : null,
    dcW: dc ? Math.round(dc.getBoundingClientRect().width) : null,
    firstH1: (() => { const el = document.querySelector('h1'); return el ? Math.round(el.getBoundingClientRect().left) : null; })(),
    firstH2: (() => { const el = document.querySelector('h2'); return el ? Math.round(el.getBoundingClientRect().left) : null; })(),
    firstH3: (() => { const el = document.querySelector('h3'); return el ? Math.round(el.getBoundingClientRect().left) : null; })(),
    allH1s: [...document.querySelectorAll('h1')].map(e => ({ text: e.textContent.trim().slice(0, 20), left: Math.round(e.getBoundingClientRect().left) })),
    phist: (() => { const el = document.querySelector('.p-hist'); return el ? Math.round(el.getBoundingClientRect().left) : null; })(),
    pSection: (() => { const el = document.querySelector('.p-section'); return el ? Math.round(el.getBoundingClientRect().left) + ' w=' + Math.round(el.getBoundingClientRect().width) : null; })(),
    bodyChildren: [...document.querySelector('.page')?.children || []].map(e => ({ id: e.id, tag: e.tagName, class: e.className.slice(0, 40) })),
  };
});
console.log(JSON.stringify(r, null, 2));
await b.close();
