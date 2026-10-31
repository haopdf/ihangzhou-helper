import { chromium } from 'playwright';
const BASE = 'http://localhost:8090';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1200 } });
const p = await ctx.newPage();
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE ERROR:', m.text()); });
await p.goto(BASE + '/district.html?id=gongshu', { waitUntil: 'networkidle', timeout: 20000 });
await p.waitForTimeout(4000);

const state = await p.evaluate(() => {
  const lv = document.getElementById('listView');
  const dv = document.getElementById('detailView');
  return {
    url: location.href,
    listViewDisplay: lv ? getComputedStyle(lv).display : 'none',
    detailViewDisplay: dv ? getComputedStyle(dv).display : 'none',
    detailViewHTML: dv ? dv.innerHTML.substring(0, 200) : 'null',
    detailViewChildCount: dv ? dv.children.length : 0,
    bodyInner: document.body.innerHTML.substring(0, 100)
  };
});
console.log('STATE:', JSON.stringify(state, null, 2));

const r = await p.evaluate(() => {
  const out = {};
  function measure(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { left: Math.round(r.left), width: Math.round(r.width), top: Math.round(r.top), height: Math.round(r.height), br: cs.borderRadius, display: cs.display, flexDir: cs.flexDirection, padding: cs.padding, margin: cs.margin };
  }
  out.pHero = measure('.p-hero');
  out.pHeroTitle = measure('.p-hero-title');
  out.pInfogrid = measure('.p-infogrid');
  out.pInforow = measure('.p-inforow');
  out.firstPSection = measure('.p-section');
  out.firstPSectionH2 = measure('.p-section h2');
  out.pFeatGroup = measure('.p-feat-group');
  out.pFeatList = measure('.p-feat-list');
  out.pFeatLink = measure('.p-feat-link');
  out.pCards = measure('.p-cards');
  out.pCard = measure('.p-card');
  out.pCardsList = measure('.p-cards-list');
  out.pCardsItem = measure('.p-cards-item');
  return out;
});
console.log('\nMEASURE:', JSON.stringify(r, null, 2));

await b.close();
