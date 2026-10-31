const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const pages = [
    ['index', 'index.html', '.cat-grid .cat-card, #pageHome .cat-grid > *', '#pageHome .content'],
    ['food', 'food.html', '.service-grid .service-card, .service-grid > *', '.content'],
    ['district', 'district.html?id=yuhang', '#detailView .p-section', '#detailView .p-body'],
    ['district-hero', 'district.html?id=yuhang', '#detailView .p-hero', '#detailView'],
  ];
  for (const [name, url, cardSel, wrapSel] of pages) {
    await page.goto('http://localhost:8080/' + url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const info = await page.evaluate(({ cardSel, wrapSel }) => {
      function box(sel) {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return { x: Math.round(r.x), w: Math.round(r.width), pad: cs.paddingLeft + '/' + cs.paddingRight };
      }
      return { wrap: box(wrapSel), card: box(cardSel) };
    }, { cardSel, wrapSel });
    console.log(name, JSON.stringify(info));
  }
  await browser.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
