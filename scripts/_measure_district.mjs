import { chromium } from 'playwright';
const BASE = 'http://localhost:8090';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();
await p.goto(BASE + '/district.html?id=gongshu', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(3000);

const r = await p.evaluate(() => {
  const out = {};
  function measure(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { left: Math.round(r.left), width: Math.round(r.width), br: cs.borderRadius, display: cs.display, flexDir: cs.flexDirection, padding: cs.padding };
  }
  out.pHero = measure('.p-hero');
  out.pHeroInner = measure('.p-hero-inner');
  out.districtStats = measure('.district-stats, .p-infogrid');
  out.statSpan = measure('.district-stats span, .p-infogrid span');
  out.pSection = measure('.p-section');
  out.diLandmarks = measure('.di-landmarks, [class*="landmark"]');
  out.diLandmarkList = measure('.di-landmark-list');
  out.detailContent = measure('#detailContent');
  out.pCards = measure('.p-cards');
  out.pHeroH1 = measure('.p-hero h1');
  return out;
});
console.log(JSON.stringify(r, null, 2));

// Get the HTML structure of detail view
const structure = await p.evaluate(() => {
  const dc = document.getElementById('detailContent');
  if (!dc) return 'no detailContent';
  return dc.innerHTML.substring(0, 3000);
});
console.log('\n--- DETAIL HTML ---\n', structure);

await b.close();
