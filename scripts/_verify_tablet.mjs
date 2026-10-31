import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/temple.html?id=lingyin',
  '/life.html?id=xiaofei',
  '/food.html',
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/zhaopin.html?id=guoqi-shi',
];
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1024, height: 768 } });
for (const p of pages) {
  const pg = await c.newPage();
  try {
    await pg.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
    await pg.waitForTimeout(800);
    const r = await pg.evaluate(() => {
      const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero');
      const h = hero ? hero.querySelector('.ch-badge,.p-hero-title,h1,h2') : null;
      const hb = h ? h.getBoundingClientRect() : null;
      const card = document.querySelector('.cat-home-btn,.sitem,.p-card,.cat-third-card,.p-neighbor-grid');
      const cb = card ? card.getBoundingClientRect() : null;
      return { hx: hb ? Math.round(hb.left) : null, cx: cb ? Math.round(cb.left) : null, t: document.title.slice(0, 30) };
    });
    const d = (r.hx && r.cx) ? Math.abs(r.cx - r.hx) : null;
    console.log(r.t.padEnd(31), 'hero.x=' + (r.hx||'-').toString().padEnd(4), 'card.x=' + (r.cx||'-').toString().padEnd(4), d===null ? '(nocard)' : d < 3 ? '✅' : d < 25 ? '⚠️'+d : '❌'+d);
  } catch(e) { console.log(p.slice(0,28).padEnd(30),'ERR',e.message.slice(0,20)); }
  await pg.close();
}
await b.close();
