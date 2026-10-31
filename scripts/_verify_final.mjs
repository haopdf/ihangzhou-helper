import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/temple.html?id=lingyin',
  '/life.html?id=xiaofei',
  '/food.html?id=tangyuan',
];
const browser = await chromium.launch();
for (const vp of [{ w: 1440, h: 900, l: '1440' }, { w: 1024, h: 768, l: '1024' }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1 });
  console.log(`\n=== Viewport ${vp.l} ===`);
  for (const p of pages) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(800);
      const r = await page.evaluate(() => {
        const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero,.travel-hero,.place-hero,.td-hero,.zb-hero');
        const h1 = hero ? hero.querySelector('h1,h2') : null;
        const hb = h1 ? h1.getBoundingClientRect() : null;
        const cb = document.querySelector('.content,.p-body,.p-cards,.bf-modules,.service-grid,.travel-detail');
        const cr = cb ? cb.getBoundingClientRect() : null;
        const section = document.querySelector('.content section,.p-infogrid,.p-section,.service-grid');
        const sr = section ? section.getBoundingClientRect() : null;
        return {
          heroClass: hero ? hero.className.split(' ')[0] : null,
          h1X: hb ? Math.round(hb.left) : null,
          bodyX: sr ? Math.round(sr.left) : (cr ? Math.round(cr.left) : null),
          bodyW: cr ? Math.round(cr.width) : null,
          pageStr: document.title.slice(0, 40),
        };
      });
      const diff = (r.h1X && r.bodyX) ? r.bodyX - r.h1X : null;
      console.log(p.slice(0, 45).padEnd(46),
        'title=' + r.pageStr.padEnd(40),
        'h1.x=' + (r.h1X || '-').toString().padEnd(4),
        'body.x=' + (r.bodyX || '-').toString().padEnd(4),
        'body.w=' + (r.bodyW || '-'),
        diff === null ? '' : (Math.abs(diff) < 3 ? '✅' : '⚠️ D=' + diff));
    } catch (e) { console.log(p.slice(0,40).padEnd(42), 'ERROR', e.message.slice(0,30)); }
    await page.close();
  }
  await browser.close();
}
