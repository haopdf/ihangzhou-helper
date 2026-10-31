import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/temple.html?id=lingyin',
  '/life.html?id=xiaofei',
  '/food.html',
];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const p of pages) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
    const r = await page.evaluate(() => {
      // 找 hero h1
      const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero,.travel-hero,.place-hero');
      const h = hero ? hero.querySelector('h1,h2') : null;
      const hb = h ? h.getBoundingClientRect() : null;
      // 找第一个卡片（用于对齐比较）
      const selectors = ['.cat-block a', '.sitem', '.p-card', '.cat-third-card', '.p-neighbor a', '.service-grid a'];
      let card = null;
      for (const sel of selectors) { card = document.querySelector(sel); if (card) break; }
      const cb = card ? card.getBoundingClientRect() : null;
      return {
        heroL: hb ? Math.round(hb.left) : null,
        heroW: hb ? Math.round(hb.width) : null,
        cardL: cb ? Math.round(cb.left) : null,
        cardW: cb ? Math.round(cb.width) : null,
        title: document.title.slice(0, 32),
      };
    });
    const diff = (r.heroL && r.cardL) ? Math.abs(r.cardL - r.heroL) : null;
    console.log(r.title.padEnd(34), 'hero.x=' + (r.heroL||'-').toString().padEnd(4), 'card.x=' + (r.cardL||'-').toString().padEnd(4), diff===null?'(nocard)': diff<3?'✅': diff<20?'⚠️D'+diff:'❌D'+diff);
  } catch(e) { console.log(p.slice(0,30).padEnd(32),'ERR',e.message.slice(0,30)); }
  await page.close();
}
await browser.close();
