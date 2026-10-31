// 精确对齐验证：hero 文字左边缘 vs cat-block 文字左边缘在像素上是否重合
import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/cat.html?c=travel',
  '/banshi.html',
  '/night-market.html?id=yeshi',
];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 800 }, deviceScaleFactor: 1 });
for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(500);
  const r = await page.evaluate(() => {
    const hero = document.querySelector('.cat-hero, .p-hero, .ch-hero');
    const firstCard = document.querySelector('.cat-block h1, .cat-block h2, .p-card, .sitem');
    if (!hero || !firstCard) return { hero: !!hero, firstCard: !!firstCard };
    const hb = hero.getBoundingClientRect();
    const fb = firstCard.getBoundingClientRect();
    return { heroLeft: hb.left, heroRight: hb.right, cardLeft: fb.left, cardRight: fb.right, diff: fb.left - hb.left };
  });
  const aligned = r.diff !== undefined && Math.abs(r.diff) < 2;
  console.log(p.slice(0, 55).padEnd(56),
    'heroLeft=' + (r.heroLeft | 0), 'cardLeft=' + (r.cardLeft | 0),
    aligned ? '✅' : '⚠️ DIFF=' + r.diff);
  await page.close();
}
await browser.close();
