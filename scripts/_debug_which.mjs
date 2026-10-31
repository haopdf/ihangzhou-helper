import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  '/dessert.html?id=dingshenggao',
  '/guzhen.html?id=tangqi',
  '/breakfast.html?id=banmian',
  '/tushuguan.html?id=hangzhoushilib',
  '/xiangxiang.html?id=bai',
  '/story.html?id=baishezhuan',
  '/intangible.html?id=xilingyinsh',
  '/hangbang.html?id=hol',
];
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
for (const url of PAGES) {
  const pg = await c.newPage();
  const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(2500);
  const r = await pg.evaluate(() => {
    return {
      url: location.href,
      dataKeys: (window.DESSERT_DATA ? Object.keys(window.DESSERT_DATA).slice(0, 3) : window.GUZHEN_DATA ? Object.keys(window.GUZHEN_DATA).slice(0, 3) : window.BREAKFAST_DATA ? Object.keys(window.BREAKFAST_DATA).slice(0, 3) : 'NO_DATA'),
      hasDC: !!document.getElementById('detailContent'),
      hasTushu: !!document.getElementById('tushuContent') || !!document.getElementById('tushuguanContent'),
      containerIds: [...document.querySelectorAll('[id]')].filter(el => el.id.toLowerCase().includes('content') || el.id.toLowerCase().includes('detail')).map(e => e.id + '=' + e.innerHTML.length),
    };
  });
  console.log(url, JSON.stringify(r), errs.length ? 'ERRS:' + errs.join('|') : '');
  await pg.close();
}
await b.close();
