import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  ['/coffee.html?id=xiezilou', '写字楼咖啡'],
  ['/museum.html?id=zhemo', ''],
  ['/laozihao.html?id=louwailou', '楼外楼'],
  ['/chaguan.html?id=chayaun', ''],
  ['/dessert.html?id=dessert_01', ''],
  ['/tushuguan.html?id=zhejiang-tushuguan', '浙江图书馆'],
  ['/xiangxiang.html?id=xiaoxi', '小河直街'],
  ['/story.html?id=baishezhuan', ''],
  ['/intangible.html?id=xilingyinsh', ''],
  ['/hangbang.html?id=xihu-cuyu', '西湖醋鱼'],
  ['/night-market.html?id=wulin', ''],
  ['/temple.html?id=lingyin', ''],
  ['/tea.html?id=longjing', ''],
  ['/gujian.html?id=xiling', ''],
  ['/zhoubian.html?id=xixi', '']
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
for (const [url, expected] of PAGES) {
  const pg = await ctx.newPage();
  const errs = [];
  pg.on('pageerror', e => errs.push(e.message.slice(0, 40)));
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(2500);
  const r = await pg.evaluate(() => {
    const body = document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 80);
    const dc = document.getElementById('detailContent');
    const dcTxt = dc ? dc.innerText.replace(/\s+/g, ' ').trim().slice(0, 60) : null;
    return { body, dcTxt, errsLen: 0 };
  });
  const isRender = r.dcTxt && r.dcTxt.length > 5;
  console.log(url.padEnd(42), isRender ? '✅ ' + r.dcTxt : '❌ 空白', errs.length ? 'ERR:' + errs[0] : '');
  await pg.close();
}
await b.close();
