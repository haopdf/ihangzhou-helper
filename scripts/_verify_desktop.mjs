// 桌面端验证：截 1440px 宽屏 + 1024px 窄屏
import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/life.html?id=xiaofei',
  '/scenic.html?id=lingyisi',
  '/temple.html?id=lingyin',
  '/food.html',
  '/index.html',
];
for (const vp of [{ w: 1440, h: 900, label: 'd1440' }, { w: 1024, h: 768, label: 'd1024' }]) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  for (const p of pages) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1200);
      const info = await page.evaluate(() => {
        const hero = document.querySelector('.cat-hero,.p-hero,.ch-hero,.travel-hero,.place-hero,.td-hero,.zb-hero');
        const content = document.querySelector('.cat-body,.p-body,.bf-modules,.service-grid,.travel-detail,.p-cards');
        return {
          heroW: hero ? Math.round(hero.getBoundingClientRect().width) : null,
          contentW: content ? Math.round(content.getBoundingClientRect().width) : null,
          heroClass: hero ? hero.className.slice(0, 60) : null,
        };
      });
      await page.screenshot({ path: `scripts/_dv_${vp.label}_${p.replace(/[\/\?=&#%]/g, '_').slice(0, 40)}.png` });
      console.log(`[${vp.label}] ${p.padEnd(50)} hero=${info.heroW} content=${info.contentW} hc=${info.heroClass}`);
    } catch (e) {
      console.log(`[${vp.label}] ${p} -> ERROR ${e.message.slice(0, 50)}`);
    }
    await page.close();
  }
  await browser.close();
}
