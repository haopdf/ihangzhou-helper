/* 复测 tushuguan 页面：fffd / scrollW / crumb */
const { chromium } = require('playwright');

const PAGES = [
  { url: 'http://localhost:8080/tushuguan.html', name: 'tushuguan-list' },
  { url: 'http://localhost:8080/tushuguan.html?id=zhejiang-tushuguan', name: 'tushuguan-d1' },
  { url: 'http://localhost:8080/tushuguan.html?id=hz-tushuguan', name: 'tushuguan-d2' },
  { url: 'http://localhost:8080/tushuguan.html?id=xihu-shuguan', name: 'tushuguan-d3' },
  { url: 'http://localhost:8080/tushuguan.html?id=wuzhen-shuguan', name: 'tushuguan-d4' },
  { url: 'http://localhost:8080/tushuguan.html?id=university-tushuguan', name: 'tushuguan-d5' },
  { url: 'http://localhost:8080/tushuguan.html?id=zhejiang-adult', name: 'tushuguan-d6' },
  { url: 'http://localhost:8080/tushuguan.html?id=shufang-hangzhou', name: 'tushuguan-d7' },
  { url: 'http://localhost:8080/tushuguan.html?id=zhejiang-sanguan', name: 'tushuguan-d8' },
  { url: 'http://localhost:8080/tushuguan.html?id=not-exist', name: 'tushuguan-notfound' }
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  let fail = 0;
  for (const p of PAGES) {
    await page.goto(p.url, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const body = document.body.innerText;
      const fffd = (body.match(/\uFFFD/g) || []).length;
      const scrollW = document.documentElement.scrollWidth;
      const crumb = document.querySelector('nav.site-breadcrumb');
      let crumbRect = null;
      if (crumb) {
        const b = crumb.getBoundingClientRect();
        crumbRect = { x: Math.round(b.x), w: Math.round(b.width), top: Math.round(b.top) };
      }
      const hero = document.querySelector('.p-hero');
      let heroRect = null;
      if (hero) {
        const b = hero.getBoundingClientRect();
        heroRect = { x: Math.round(b.x), w: Math.round(b.width), top: Math.round(b.top) };
      }
      const cardGrid = document.querySelector('.p-card-grid');
      let gridInfo = null;
      if (cardGrid) {
        const b = cardGrid.getBoundingClientRect();
        gridInfo = { x: Math.round(b.x), w: Math.round(b.width) };
      }
      return { fffd, scrollW, crumbRect, heroRect, gridInfo, title: document.title };
    });
    const ok = r.fffd === 0 && r.scrollW <= 1280 && r.crumbRect && r.crumbRect.x === 0 && r.crumbRect.w === 1280;
    if (!ok) fail++;
    console.log((ok ? 'PASS' : 'FAIL') + ' ' + p.name +
      ' | fffd=' + r.fffd + ' scrollW=' + r.scrollW +
      ' crumb=' + (r.crumbRect ? r.crumbRect.x + ',' + r.crumbRect.w + ',top' + r.crumbRect.top : 'null') +
      ' hero=' + (r.heroRect ? r.heroRect.x + ',' + r.heroRect.w + ',top' + r.heroRect.top : 'null') +
      ' grid=' + (r.gridInfo ? r.gridInfo.x + ',' + r.gridInfo.w : '-') +
      ' | ' + r.title);
  }
  await browser.close();
  console.log(fail === 0 ? 'ALL PASS' : fail + ' FAILED');
})();
