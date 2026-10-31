import { chromium } from 'playwright';
import { readFileSync } from 'fs';
const BASE = 'http://localhost:8765';
// 各动态路由页的首屏 id
const PAGES = [
  { url: '/channel.html?id=banshi' }, // fallback 默认 banshi
  { url: '/place.html?id=太子湾公园' },
  { url: '/route.html?id=千岛湖一日游' },
  { url: '/scenic.html?id=西湖' },
  { url: '/travel.html?id=苏堤春晓' },
  { url: '/district.html' },
  { url: '/cat.html' },
  { url: '/breakfast.html' },
  { url: '/coffee.html' },
  { url: '/tea.html' },
  { url: '/chaguan.html' },
  { url: '/night-market.html' },
  { url: '/museum.html' },
  { url: '/tushuguan.html' },
  { url: '/guzhen.html' },
  { url: '/gujian.html' },
  { url: '/laozihao.html' },
  { url: '/dessert.html' },
  { url: '/hangbang.html' },
  { url: '/temple.html' },
  { url: '/intangible.html' },
  { url: '/street.html' },
  { url: '/history.html' },
  { url: '/xiangxiang.html' },
  { url: '/zhoubian.html' },
  { url: '/tide.html' },
  { url: '/story.html' },
  { url: '/internet.html' },
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0;
for (const p of PAGES) {
  const pg = await ctx.newPage();
  try {
    await pg.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 15000 });
    await pg.waitForTimeout(1500);
    const r = await pg.evaluate(() => {
      // 所有 hero 选择器
      const hero = document.querySelector('.ch-hero,.p-hero,.cat-hero,.travel-hero,.place-hero,.td-hero,.zb-hero,.art-hero,.page-hero');
      let hx = null;
      if (hero) {
        const t = hero.querySelector('h1,.p-hero-title,.ch-badge');
        if (t) hx = Math.round(t.getBoundingClientRect().left);
      }
      // 所有容器
      const content = document.querySelector('.content,.p-body,.p-cards,.bf-modules,.service-grid,.travel-detail,.article-body,.art-list,.td-body,.lane-body,#main,.cat-block');
      let cx = null;
      if (content) {
        const c = content.querySelector('a,section,h2,.cat-block,.p-card,.sitem,.p-neighbor,.cat-item');
        if (c) cx = Math.round(c.getBoundingClientRect().left);
      }
      return { hx, cx };
    });
    const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
    let status;
    if (diff === null) status = '(n/a)';
    else if (diff < 3) { pass++; status = '✅'; }
    else { fail++; status = '❌ D' + diff; }
    console.log((p.url).padEnd(40), 'hx=' + (r.hx||'-'), 'cx=' + (r.cx||'-'), status);
  } catch(e) { console.log(p.url.padEnd(40), 'ERR', e.message.slice(0,30)); }
  await pg.close();
}
await b.close();
console.log(`\n=== DYNAMIC PAGES: PASS=${pass} FAIL=${fail} ===`);
