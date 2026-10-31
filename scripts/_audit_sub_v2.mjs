import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  '/coffee.html?id=xiezilou', '/museum.html?id=zhemo', '/laozihao.html?id=louwailou',
  '/chaguan.html?id=chayaun', '/guzhen.html?id=tangqi', '/breakfast.html?id=banmian',
  '/dessert.html?id=dessert_01', '/tushuguan.html?id=zhejiang-tushuguan',
  '/xiangxiang.html?id=xiaoxi', '/story.html?id=baishezhuan',
  '/intangible.html?id=xilingyinsh', '/hangbang.html?id=xihu-cuyu',
  '/night-market.html?id=wulin', '/temple.html?id=lingyin', '/tea.html?id=longjing',
  '/gujian.html?id=xiling', '/zhoubian.html?id=xixi',
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0, na = 0;
const fails = [];
for (const url of PAGES) {
  const pg = await ctx.newPage();
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(2200);
  const r = await pg.evaluate(() => {
    // 找 hero h1/p-hero-title 的左边界
    const hero = document.querySelector('.ch-hero,.p-hero,.cat-hero,.p-hero-inner');
    let hx = null;
    if (hero) {
      const t = hero.querySelector('h1,.p-hero-title,.ch-badge,.ch-hero h2,.p-hist,.p-hero-inner .p-hist,h2');
      if (t) hx = Math.round(t.getBoundingClientRect().left);
    }
    if (!hx) {
      const dc = document.querySelector('#detailContent,.p-body');
      if (dc) {
        const h = dc.querySelector('h1,.p-name,.p-name-h,.p-hist,.p-name-h2');
        if (h) hx = Math.round(h.getBoundingClientRect().left);
      }
    }
    // 找容器内第一个实质性内容
    const containers = ['#detailContent','#coffeeContent','#scenicContent','#breakfastContainer','#dessertContainer','#guzhenContainer','#tushuguanContainer','#nightMarketContainer','#placeContainer','#routeContainer','#storyContainer','#teaContainer','#templeContainer','#intangibleContainer','#hangbangContainer','#xxContainer','#gjContainer','#tideContainer','#zmContainer'];
    let cx = null;
    for (const cid of containers) {
      const c = document.querySelector(cid);
      if (!c) continue;
      // 跳过 data-card 底部链接，优选 p-section/.p-name 等有具体内容元素
      const a = c.querySelector('.p-section .p-card:first-child a, .p-section:first-child, .p-name:first-of-type, .p-name:first-child, .p-hist, .p-name-h, .p-name-h2, .p-inforow:first-child, a:first-of-type');
      if (a) { cx = Math.round(a.getBoundingClientRect().left); break; }
    }
    return { hx, cx };
  });
  const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
  let status;
  if (diff === null) { na++; status = `(no data, hx=${r.hx}, cx=${r.cx})`; }
  else if (diff <= 16) { pass++; status = '✅ D' + diff; }
  else { fail++; status = '❌ D' + diff; fails.push(url + ' D' + diff); }
  console.log(url.padEnd(40), 'hx=' + (r.hx ?? '-'), 'cx=' + (r.cx ?? '-'), status);
  await pg.close();
}
await b.close();
console.log(`\nPASS=${pass} FAIL=${fail} N/A=${na}`);
if (fails.length) console.log('FAILS:', fails);
