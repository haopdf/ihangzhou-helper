import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const CONTAINERS = ['#detailContent','#coffeeContent','#scenicContent','#breakfastContainer','#cgContainer','#dessertContainer','#guzhenContainer','#tushuguanContainer','#nightMarketContainer','#placeContainer','#routeContainer','#storyContainer','#teaContainer','#templeContainer','#intangibleContainer','#hangbangContainer','#xxContainer','#gjContainer','#tideContainer','#zmContainer'];
const PAGES = [
  '/coffee.html?id=xiezilou',
  '/museum.html?id=zhemo',
  '/laozihao.html?id=louwailou',
  '/chaguan.html?id=chayaun',
  '/chaguan.html?id=longjing-teahouse',
  '/dessert.html?id=dingshenggao',
  '/dessert.html?id=tiaotougao',
  '/tushuguan.html?id=zhejiang-tushuguan',
  '/xiangxiang.html?id=xiaoxi',
  '/xiangxiang.html?id=dadou',
  '/xiangxiang.html?id=mantou',
  '/story.html?id=baishe',
  '/story.html?id=liangzhu',
  '/story.html?id=xihu-chuanqi',
  '/intangible.html?id=hanghua',
  '/intangible.html?id=hangxiu',
  '/intangible.html?id=zhangxiaoquan',
  '/hangbang.html?id=xihu-cuyu',
  '/hangbang.html?id=dongporou',
  '/hangbang.html?id=longjing-xiaren',
  '/night-market.html?id=hefang',
  '/temple.html?id=lingyin',
  '/tea.html?id=longjing',
  '/gujian.html?id=xiling',
  '/zhoubian.html?id=xixi',
  '/guzhen.html?id=tangqi',
  '/guzhen.html?id=wuzhen',
  '/breakfast.html?id=banmian',
  '/breakfast.html?id=shengjian',
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0, na = 0;
const fails = [];
for (const url of PAGES) {
  const pg = await ctx.newPage();
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(2200);
  const r = await pg.evaluate((containers) => {
    // HERO: look in p-hero-inner, ch-hero, etc.
    const hero = document.querySelector('.ch-hero,.p-hero,.cat-hero,.p-hero-inner');
    let hx = null;
    if (hero) {
      const t = hero.querySelector('h1,.p-hero-title,.ch-badge,.ch-hero h2,.p-hist');
      if (t) hx = Math.round(t.getBoundingClientRect().left);
    }
    // CONTENT: look in all sub-containers
    let cx = null;
    for (const cid of containers) {
      const c = document.querySelector(cid);
      if (!c || c.innerHTML.length < 40) continue;
      const a = c.querySelector('.p-section:first-child, .p-name, .p-name-h, .p-hist:first-child, .p-name-h2, .p-inforow:first-child, a:first-of-type');
      if (a) { cx = Math.round(a.getBoundingClientRect().left); break; }
    }
    return { hx, cx };
  }, CONTAINERS);
  const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
  let status;
  if (diff === null) { na++; status = `(no pair)`; }
  else if (diff <= 16) { pass++; status = '✅ D' + diff; }
  else { fail++; status = '❌ D' + diff; fails.push(url); }
  console.log(url.padEnd(42), 'hx=' + (r.hx ?? '-'), 'cx=' + (r.cx ?? '-'), status);
  await pg.close();
}
await b.close();
console.log(`\nPASS=${pass} FAIL=${fail} N/A=${na} (共 ${PAGES.length})`);
if (fails.length) console.log('FAILS:', fails);
