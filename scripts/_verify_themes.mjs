import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = ['/banshi.html', '/night-market.html?id=yeshi', '/food.html', '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0'];
const THEMES = ['default', 'ink', 'snow', 'cyan', 'gold'];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
for (const p of PAGES) {
  for (const t of THEMES) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 15000 });
      if (t !== 'default') await page.evaluate(theme => document.documentElement.setAttribute('data-theme', theme), t);
      await page.waitForTimeout(600);
      const r = await page.evaluate(() => {
        const h = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        const bg = getComputedStyle(document.body).backgroundColor;
        const hero = document.querySelector('.cat-hero,.ch-hero,.p-hero');
        const hc = hero ? getComputedStyle(hero) : null;
        return { primary: h, bodyBg: bg, heroBg: hc ? hc.backgroundImage.slice(0, 60) : 'none', theme: document.documentElement.getAttribute('data-theme')||'n/a' };
      });
      console.log(p.slice(0, 30).padEnd(32), 'theme=' + r.theme.padEnd(7), 'primary=' + r.primary.padEnd(12), 'heroBg=' + r.heroBg);
    } catch(e) { console.log(p.slice(0,30).padEnd(32), t, 'ERR', e.message.slice(0,25)); }
    await page.close();
  }
}
await b.close();
