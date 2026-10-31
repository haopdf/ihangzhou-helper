import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await c.newPage();
const errs = [];
p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
await p.goto('http://localhost:8765/coffee.html?id=xiezilou', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  const cc = document.getElementById('coffeeContent');
  const dc = document.getElementById('detailContent');
  return {
    coffeeData: window.COFFEE_DATA ? Object.keys(window.COFFEE_DATA) : 'NO_DATA',
    ccHTML: cc ? cc.innerHTML.slice(0, 200) : 'NO_coffeeContent',
    dcHTML: dc ? dc.innerHTML.slice(0, 200) : 'NO_detailContent',
    url: location.href,
    search: location.search,
  };
});
console.log(JSON.stringify(r, null, 2));
console.log('ERRORS:', errs);
await b.close();
