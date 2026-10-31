import { chromium } from 'playwright';
const BASE = 'http://localhost:8090';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1200 } });
const p = await ctx.newPage();
await p.goto(BASE + '/district.html?id=gongshu', { waitUntil: 'networkidle', timeout: 20000 });
await p.waitForTimeout(4000);

// Use detailView-scoped selectors
const r = await p.evaluate(() => {
  const dv = document.getElementById('detailView');
  if (!dv) return { error: 'no detailView' };
  const out = {};
  function measure(sel, root) {
    const el = (root || dv).querySelector(sel);
    if (!el) return { found: false };
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { found: true, left: Math.round(r.left), width: Math.round(r.width), top: Math.round(r.top), height: Math.round(r.height), br: cs.borderRadius, display: cs.display, flexDir: cs.flexDirection, gridTmp: cs.gridTemplateColumns };
  }
  out.pHero = measure('.p-hero');
  out.pInfogrid = measure('.p-infogrid');
  const infogrid = dv.querySelector('.p-infogrid');
  out.inforow = measure('.p-inforow', infogrid);
  out.sections = dv.querySelectorAll('.p-section').length;
  out.featList = measure('.p-feat-list');
  out.featLinks = dv.querySelectorAll('.p-feat-list .p-feat-link').length;
  out.firstFeatLink = measure('.p-feat-link');
  // find landmark cards
  const landmarkSection = Array.from(dv.querySelectorAll('.p-section')).find(s => s.textContent.includes('重要地标'));
  if (landmarkSection) {
    out.landmarkCards = landmarkSection.querySelectorAll('.p-card').length;
    out.landmarkCardsContainer = measure('.p-cards', landmarkSection);
    out.firstLandmark = measure('.p-card', landmarkSection);
  } else {
    out.landmarkSection = 'not found';
  }
  // find scenic
  const scenicSection = Array.from(dv.querySelectorAll('.p-section')).find(s => s.textContent.includes('在地景点'));
  if (scenicSection) {
    out.cardsList = measure('.p-cards-list', scenicSection);
    out.firstCardsItem = measure('.p-cards-item', scenicSection);
  }
  return out;
});
console.log(JSON.stringify(r, null, 2));
await b.close();
