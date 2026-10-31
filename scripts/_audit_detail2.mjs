import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  '/laozihao.html?id=louwailou',
  '/museum.html?id=zhemo',
  '/coffee.html?id=qinzhaizi',
  '/chaguan.html?id=hechaguan',
  '/dessert.html?id=zhiguan',
  '/tea.html?id=longjing',
  '/temple.html?id=lingyin',
  '/night-market.html?id=wulin',
  '/guzhen.html?id=tangqi',
  '/tushuguan.html?id=hzlib',
  '/street.html?id=hefang',
  '/history.html?id=nansong',
  '/gujian.html?id=xiling',
  '/xiangxiang.html?id=bai',
  "/intangible.html?id=xilingyinshe",
  '/story.html?id=baishe',
  '/hangbang.html?id=longjing',
  '/breakfast.html?id=xinfeng',
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0;
for (const url of PAGES) {
  const pg = await ctx.newPage();
  await pg.goto(BASE + url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(2000);
  const r = await pg.evaluate(() => {
    // 找所有可能的 hero 标题元素
    const dc = document.getElementById('detailContent');
    if (!dc) return { err: 'no dc' };
    const h1 = dc.querySelector('h1');
    const phist = dc.querySelector('.p-hist');
    const pnh = dc.querySelector('.p-name-h');
    const h2 = dc.querySelector('h2');
    const mucr = dc.querySelector('.mu-cr');
    const titleEl = h1 || phist || pnh || mucr || h2;
    const ps = dc.querySelector('.p-section');
    const card = dc.querySelector('.card');
    return {
      hx: titleEl ? Math.round(titleEl.getBoundingClientRect().left) : null,
      hxTag: titleEl ? titleEl.tagName : null,
      hxClass: titleEl ? titleEl.className : null,
      cx: ps ? Math.round(ps.getBoundingClientRect().left) : (card ? Math.round(card.getBoundingClientRect().left) : null),
      cxTag: ps ? 'p-section' : (card ? 'card' : null),
      dcX: Math.round(dc.getBoundingClientRect().left),
      dcW: Math.round(dc.getBoundingClientRect().width),
      dcPad: getComputedStyle(dc).padding,
      psW: ps ? Math.round(ps.getBoundingClientRect().width) : null,
    };
  });
  const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
  let status;
  if (diff === null) status = '(n/a)';
  else if (diff < 3) { pass++; status = '✅'; }
  else { fail++; status = '❌ D' + diff; }
  console.log(url.padEnd(40), 'hx=' + (r.hx ?? '-'), 'tag=' + (r.hxTag ?? '-'), 'cx=' + (r.cx ?? '-'), status);
  await pg.close();
}
await b.close();
console.log(`\n=== DETAIL PAGES: PASS=${pass} FAIL=${fail} ===`);
