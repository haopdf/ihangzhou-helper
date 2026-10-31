import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const pages = [
  '/banshi.html',
  '/night-market.html?id=yeshi',
  '/temple.html?id=lingyin',
  '/life.html?id=xiaofei',
  '/food.html',
  '/coffee.html',
  '/tea.html',
  '/dessert.html',
  '/chaguan.html',
  '/scenic.html?id=lingyisi',
  '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0',
  '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD',
  '/zhaopin.html?id=guoqi-shi',
];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
for (const p of pages) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);
    const r = await page.evaluate(() => {
      const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero,.travel-hero,.place-hero,.td-hero,.zb-hero');
      // 找标题文本：优先 ch-badge / p-hero-title / 第一个 h1,h2
      let title = null;
      if (hero) {
        const t = hero.querySelector('.ch-badge, .p-hero-title, h1, h2');
        if (t) title = t.getBoundingClientRect();
      }
      // 找第一个卡片或内容块
      const selectors = ['.cat-home-btn', '.sitem', '.p-card', '.cat-third-card', '.p-neighbor-grid', '.p-cards'];
      let card = null;
      for (const sel of selectors) { card = document.querySelector(sel); if (card) break; }
      const cb = card ? card.getBoundingClientRect() : null;
      return {
        heroClass: hero ? (hero.className||'').split(' ')[0] : null,
        titleX: title ? Math.round(title.left) : null,
        cardX: cb ? Math.round(cb.left) : null,
        title: document.title.slice(0, 35),
      };
    });
    const diff = (r.titleX && r.cardX) ? Math.abs(r.cardX - r.titleX) : null;
    console.log(r.title.padEnd(36), 'hc=' + (r.heroClass||'-').padEnd(8), 'title.x=' + (r.titleX||'-').toString().padEnd(4), 'card.x=' + (r.cardX||'-').toString().padEnd(4), diff===null?(r.cardX===null?'(fullpage)':'(no-title)'): diff<3?'✅':diff<25?'⚠️D'+diff:'❌D'+diff);
  } catch(e) { console.log(p.slice(0,30).padEnd(32),'ERR',e.message.slice(0,25)); }
  await page.close();
}
await browser.close();
