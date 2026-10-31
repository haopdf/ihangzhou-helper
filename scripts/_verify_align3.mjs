import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/life.html?id=xiaofei',
  '/index.html',
];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    // Hero 内的 h1/p 等文字节点
    const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero');
    let heroH1 = null;
    if (hero) {
      const h = hero.querySelector('h1, h2, .ch-badge');
      heroH1 = h ? h.getBoundingClientRect() : null;
    }
    // 内容第一个卡片
    const card = document.querySelector('.cat-block .cat-home-btn,.service-grid .sitem,.p-cards .p-card,.cat-third-card,.p-neighbor');
    const cb = card ? card.getBoundingClientRect() : null;
    return {
      heroLeft: heroH1 ? Math.round(heroH1.left) : null,
      cardLeft: cb ? Math.round(cb.left) : null,
      diff: (heroH1 && cb) ? Math.round(cb.left - heroH1.left) : null,
    };
  });
  console.log(p.slice(0, 50).padEnd(52),
    'hero.h1=' + r.heroLeft, 'card=' + r.cardLeft,
    r.diff === null ? '(no card)' : (Math.abs(r.diff) < 3 ? '✅ ALIGNED' : '⚠️ DIFF=' + r.diff));
  await page.close();
}
await browser.close();
