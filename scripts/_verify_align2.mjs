// 精确对齐：hero 文字左边缘 vs 内容块左边缘
import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/index.html',
];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(800);
  const r = await page.evaluate(() => {
    // hero 文字容器（优先用 inner/第一个 div）
    const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero');
    let heroText = null;
    if (hero) {
      const inner = hero.querySelector(':scope > div');
      heroText = inner ? inner.getBoundingClientRect() : null;
    }
    // 内容第一个可见卡片
    const card = document.querySelector('.cat-block .cat-home-btn,.service-grid .sitem,.p-cards .p-card,.cat-third-card');
    const cb = card ? card.getBoundingClientRect() : null;
    return {
      heroTextL: heroText ? Math.round(heroText.left) : null,
      heroTextR: heroText ? Math.round(heroText.right) : null,
      cardL: cb ? Math.round(cb.left) : null,
      cardR: cb ? Math.round(cb.right) : null,
      diff: (heroText && cb) ? Math.round(cb.left - heroText.left) : null,
    };
  });
  console.log(p.slice(0, 50).padEnd(52),
    'heroText.x=' + r.heroTextL + '-' + r.heroTextR,
    'card.x=' + r.cardL + '-' + r.cardR,
    r.diff === null ? '' : (Math.abs(r.diff) < 3 ? '✅' : '⚠️ DIFF=' + r.diff));
  await page.close();
}
await browser.close();
