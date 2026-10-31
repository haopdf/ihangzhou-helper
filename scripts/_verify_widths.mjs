// 宽度一致性验证：对每个页面截图测量 hero 与下方第一个 cat-block / content-block 的实际渲染宽度
import { chromium } from 'playwright';

const BASE = 'http://localhost:8765';
const pages = [
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/cat.html?c=travel',
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/life.html?q=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/zhaopin.html?id=guoqi-shi',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });

for (const p of pages) {
  const page = await ctx.newPage();
  await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(600);
  // 收集关键元素渲染宽度
  const info = await page.evaluate(() => {
    const out = {};
    const hero = document.querySelector('.cat-hero, .p-hero, .ch-hero');
    const firstBlock = document.querySelector('.cat-block, .p-cards, .bf-modules, .service-grid');
    if (hero) out.heroW = hero.getBoundingClientRect().width;
    if (firstBlock) out.firstBlockW = firstBlock.getBoundingClientRect().width;
    out.vw = window.innerWidth;
    out.heroPadL = hero ? getComputedStyle(hero).paddingLeft : null;
    out.heroPadR = hero ? getComputedStyle(hero).paddingRight : null;
    return out;
  });
  const aligned = info.heroW && info.firstBlockW && Math.abs(info.heroW - info.firstBlockW) < 2;
  console.log(p.slice(0, 50).padEnd(52),
    'vw=' + info.vw,
    'heroW=' + (info.heroW | 0),
    'firstBlockW=' + (info.firstBlockW | 0),
    aligned ? '✅' : '⚠️ DIFF=' + ((info.heroW || 0) - (info.firstBlockW || 0)).toFixed(0));
  await page.close();
}
await browser.close();
