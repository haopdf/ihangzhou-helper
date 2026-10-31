import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const PAGES = [
  { url: '/laozihao.html?id=楼外楼', hx: '.p-hist' },
  { url: '/museum.html?id=浙江省博物馆', hx: '.mu-cr' },
  { url: '/coffee.html?id=青芝坞咖啡', hx: '.p-name-h' },
  { url: '/breakfast.html?id=新丰小吃', hx: 'h1,.p-name-h2' },
  { url: '/dessert.html?id=知味观', hx: 'h1' },
  { url: '/tea.html?id=龙井', hx: 'h1' },
  { url: '/temple.html?id=灵隐寺', hx: 'h1' },
  { url: '/night-market.html?id=武林夜市', hx: '.p-name-h' },
  { url: '/chaguan.html?id=和茶馆', hx: '.p-name-h' },
  { url: '/guzhen.html?id=塘栖古镇', hx: '.p-name-h' },
  { url: '/tushuguan.html?id=杭州图书馆', hx: 'h1' },
  { url: '/street.html?id=河坊街', hx: 'h1' },
  { url: '/history.html?id=南宋皇城', hx: 'h1,.ch-hero h2' },
  { url: '/gujian.html?id=西泠印社', hx: 'h1' },
  { url: '/xiangxiang.html?id=白娘子', hx: 'h1' },
  { url: '/intangible.html?id=西泠印社金石篆刻', hx: 'h1' },
  { url: '/story.html?id=白蛇传', hx: 'h1' },
  { url: '/hangbang.html?id=龙井问茶', hx: 'h1' },
];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
let pass = 0, fail = 0;
for (const p of PAGES) {
  const pg = await ctx.newPage();
  await pg.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 15000 });
  await pg.waitForTimeout(1500);
  const r = await pg.evaluate((sel) => {
    const t = document.querySelector(sel);
    const dc = document.getElementById('detailContent');
    const firstS = dc ? dc.querySelector('.p-section,.card,.s,h2') : null;
    return { hx: t ? Math.round(t.getBoundingClientRect().left) : null, cx: firstS ? Math.round(firstS.getBoundingClientRect().left) : null };
  }, p.hx);
  const diff = (r.hx && r.cx) ? Math.abs(r.hx - r.cx) : null;
  let status = diff === null ? '(n/a)' : diff <= 3 ? '✅' : '❌ D' + diff;
  if (diff !== null && diff <= 3) pass++; else if (diff !== null) fail++;
  console.log((p.url).padEnd(40), 'hx=' + (r.hx ?? '-'), 'cx=' + (r.cx ?? '-'), status);
  await pg.close();
}
await b.close();
console.log(`\n=== DETAIL PAGES: PASS=${pass} FAIL=${fail} ===`);
