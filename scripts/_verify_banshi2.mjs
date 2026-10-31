import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await c.newPage();
await p.goto('http://localhost:8765/banshi.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(2000);
const r = await p.evaluate(() => {
  const hero = document.querySelector('.ch-hero');
  const h1 = hero ? hero.querySelector('h1') : null;
  const sg = document.querySelector('#serviceGrid');
  const card = sg ? sg.querySelector('a,.sitem') : null;
  return {
    hx: h1 ? Math.round(h1.getBoundingClientRect().left) : null,
    h1w: h1 ? Math.round(h1.getBoundingClientRect().width) : null,
    cx: card ? Math.round(card.getBoundingClientRect().left) : null,
    cardText: card ? card.textContent.trim().slice(0, 12) : null,
    sgX: sg ? Math.round(sg.getBoundingClientRect().left) : null,
    sgStyle: sg ? getComputedStyle(sg).cssText.slice(0, 200) : null,
    heroPad: hero ? getComputedStyle(hero).padding : null,
    heroStyle: hero ? hero.getAttribute('style') : null,
  };
});
console.log(JSON.stringify(r, null, 2));
await b.close();
