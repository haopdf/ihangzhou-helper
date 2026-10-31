import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await c.newPage();
await p.goto('http://localhost:8765/traffic.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(2000);
const r = await p.evaluate(() => {
  const hero = document.querySelector('.ch-hero');
  const h1 = hero ? hero.querySelector('h1') : null;
  const sg = document.querySelector('#serviceGrid');
  const firstCard = sg ? sg.querySelector('a,.sitem') : null;
  return {
    hx: h1 ? Math.round(h1.getBoundingClientRect().left) : null,
    sgX: sg ? Math.round(sg.getBoundingClientRect().left) : null,
    sgW: sg ? Math.round(sg.getBoundingClientRect().left + sg.getBoundingClientRect().width) : null,
    cardX: firstCard ? Math.round(firstCard.getBoundingClientRect().left) : null,
    cardText: firstCard ? firstCard.textContent.trim().slice(0, 10) : null,
    sgStyleW: sg ? getComputedStyle(sg).width : null,
    sgStyleMx: sg ? getComputedStyle(sg).maxWidth : null,
  };
});
console.log(JSON.stringify(r, null, 2));
await b.close();
