const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const shots = [
    ['district-list', 'district.html'],
    ['gujian-list', 'gujian.html'],
    ['gujian-detail', 'gujian.html?id=gongchen-bridge'],
  ];
  for (const [name, url] of shots) {
    await page.goto('http://localhost:8080/' + url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    await page.screenshot({ path: '/tmp/shot-' + name + '.png' });
    const m = await page.evaluate(() => {
      function box(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: Math.round(r.x), w: Math.round(r.width), top: Math.round(r.top + scrollY) };
      }
      return {
        crumb: box('nav.site-breadcrumb'),
        hero: box('.p-hero, .district-hero'),
        grid: box('.p-card-grid, .p-cards'),
        firstCard: box('.p-card'),
        body: box('.p-body'),
        section: box('.p-section'),
      };
    });
    console.log(name, JSON.stringify(m));
  }
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
