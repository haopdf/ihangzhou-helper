import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  const out = {};
  function measure(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: Math.round(r.left), width: Math.round(r.width) };
  }
  out.topbar = measure('header.topbar');
  out.todayHangzhou = measure('.today-hangzhou');
  out.todayHangzhouFirstCard = measure('.today-hangzhou .th-item:first-child, .today-hangzhou > div:first-child');
  out.tideCard = measure('.tide-card');
  out.followCard = measure('.follow-card');
  out.shareRow = measure('.share-row');
  out.heroSlogan = measure('.hero-slogan');
  out.hotKeywords = measure('.hot-keywords');
  out.newsBanner = measure('.news-banner');
  out.districtHero = measure('.district-hero');
  out.cityWrap = measure('.city-wrap');
  out.citySelect = measure('#citySelect');
  out.cityDropdown = measure('#cityDropdown');
  return out;
});
console.log(JSON.stringify(r, null, 2));

// measure in Shangcheng mode
await p.evaluate(() => {
  // trigger district filter to Shangcheng if the district selector exists
  setTimeout(() => {
    const shangcheng = document.querySelector('.district-hero');
    if (shangcheng) shangcheng.click();
  }, 500);
});
await p.waitForTimeout(1500);
const shangcheng = await p.evaluate(() => {
  const out = {};
  function measure(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: Math.round(r.left), width: Math.round(r.width) };
  }
  out.districtHero = measure('.district-hero');
  out.districtActiveCard = measure('.district-hero.active, .district-card.active, .district-hero-content');
  out.filterTab = measure('.district-tab.active');
  return out;
});
console.log('SHANGCHENG:', JSON.stringify(shangcheng, null, 2));
await b.close();
