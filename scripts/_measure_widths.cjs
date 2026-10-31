const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const pages = [
    ['index', 'index.html'],
    ['food', 'food.html'],
    ['travel', 'travel.html'],
    ['gujian', 'gujian.html?id=gongchen-bridge'],
    ['district', 'district.html?id=yuhang'],
    ['museum', 'museum.html'],
  ];
  for (const [name, url] of pages) {
    await page.goto('http://localhost:8080/' + url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const info = await page.evaluate(() => {
      function box(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), w: Math.round(r.width), top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY) };
      }
      const out = {};
      out.crumb = box('.site-breadcrumb');
      out.hero = box('.ch-hero, .travel-hero, .p-hero, .district-hero');
      out.body = box('.p-body, #pageHome .content, .content');
      out.section = box('.p-section, .travel-section');
      out.header = box('.app-header, .topbar, header');
      return out;
    });
    console.log(name, JSON.stringify(info));
  }
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
