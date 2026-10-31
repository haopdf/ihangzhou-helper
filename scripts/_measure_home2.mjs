import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1200 } });
const p = await ctx.newPage();
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(3000);

const r = await p.evaluate(() => {
  const out = {};
  function measure(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: Math.round(r.left), width: Math.round(r.width) };
  }
  out.todayHangzhou = measure('.today-hangzhou');
  out.followCard = measure('.follow-card');
  out.shareRow = measure('.share-row');
  out.newsBanner = measure('.news-banner');
  out.exploreSection = measure('.explore-section');
  out.exploreTitle = measure('.explore-section .section-title, .explore-title');
  out.exploreGrid = measure('.explore-section .explore-grid, .explore-cards');
  out.exploreCard = measure('.explore-card:first-child');
  out.homeSec = measure('.home-sec');
  out.catGrid = measure('.cat-grid');
  out.districtNav = measure('.district-nav');
  out.districtNavItem = measure('.district-nav-item');
  out.quickNav = measure('.quick-nav');
  out.quickNavFirst = measure('.quick-nav a:first-child, .quick-nav .qn-item:first-child');
  out.goodsSection = measure('.goods-section');
  out.wxFeed = measure('.wx-feed');
  out.svcGrid = measure('.svc-grid');
  out.hotStrip = measure('.hot-strip');
  out.tideCard = measure('.tide-card');
  out.tideFeature = measure('#tideFeature');
  out.catSubsPanel = measure('#catSubsPanel');
  return out;
});
console.log(JSON.stringify(r, null, 2));
await b.close();
