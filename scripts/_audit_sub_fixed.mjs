import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  '/coffee.html?id=xiezilou',
  '/museum.html?id=zhemo',
  '/laozihao.html?id=louwailou',
  '/chaguan.html?id=chayaun',
  '/guzhen.html?id=tangqi',
  '/guzhen.html?id=wuzhen',
  '/breakfast.html?id=banmian',
  '/breakfast.html?id=shengjian',
  '/dessert.html?id=dingshenggao',
  '/tushuguan.html?id=zhejiang-tushuguan',
  '/xiangxiang.html?id=xiaoxi',
  '/story.html?id=baishezhuan',
  "/intangible.html?id=xilingyinsh",
  '/hangbang.html?id=xihu-cuyu',
  '/night-market.html?id=wulin',
  '/temple.html?id=lingyin',
  '/tea.html?id=longjing',
  '/gujian.html?id=xiling',
  '/zhoubian.html?id=xixi',
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0, na = 0;
for (const url of PAGES) {
  const pg = await ctx.newPage();
  const errs = [];
  pg.on('pageerror', e => errs.push(e.message.slice(0, 30)));
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(2200);
  const r = await pg.evaluate(() => {
    // hero - look for p-hero-title, or top heading inside #detailContent etc.
    const hero = document.querySelector('.ch-hero,.p-hero,.cat-hero,.p-hero-inner');
    let hx = null;
    if (hero) {
      const t = hero.querySelector('h1,.p-hero-title,.ch-badge,.ch-hero h2,.p-hist');
      if (t) hx = Math.round(t.getBoundingClientRect().left);
    }
    // fallback: if no hero, look for first heading in any container
    const containers = ['#detailContent','#coffeeContent','#scenicContent','#breakfastContainer','#dessertContainer','#guzhenContainer','#tushuguanContainer','#nightMarketContainer','#placeContainer','#routeContainer','#storyContainer','#teaContainer','#templeContainer','#intangibleContainer','#hangbangContainer','#xxContainer','#gjContainer','#tideContainer','#zmContainer'];
    let cx = null;
    for (const cid of containers) {
      const c = document.querySelector(cid);
      if (!c) continue;
      const a = c.querySelector('a,.p-section,.p-name,.p-name-h,.p-hist,.p-name-h2,.p-badge,.card,.p-inforow');
      if (a) { cx = Math.round(a.getBoundingClientRect().left); break; }
    }
    return { hx, cx };
  });
  const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
  let status;
  if (diff === null) { na++; status = errs.length ? `(err: ${errs[0]})` : `(${r.cx ? 'cx=' + r.cx : 'no data'})`; }
  else if (diff <= 3) { pass++; status = '✅'; }
  else { fail++; status = '❌ D' + diff; }
  console.log(url.padEnd(40), 'hx=' + (r.hx ?? '-'), 'cx=' + (r.cx ?? '-'), status);
  await pg.close();
}
await b.close();
console.log(`\nPASS=${pass} FAIL=${fail} N/A=${na}`);
