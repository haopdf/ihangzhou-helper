import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await c.newPage();
const logs = [];
p.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
p.on('pageerror', e => logs.push(`[pageerror] ${e.message}`));
await p.goto('http://localhost:8765/chaguan.html?id=chayaun', { waitUntil: 'networkidle' });
await p.waitForTimeout(2500);
const r = await p.evaluate(() => {
  return {
    hasChaguan: typeof window.CHAGUAN_DATA,
    keys: window.CHAGUAN_DATA ? Object.keys(window.CHAGUAN_DATA).slice(0, 3) : 'N/A',
    hasChayaun: window.CHAGUAN_DATA ? !!window.CHAGUAN_DATA['chayaun'] : false,
    locationId: (location.search.split('id=')[1] || '').split('&')[0],
    cgContainerHTML: (document.getElementById('cgContainer')?.innerHTML || '').slice(0, 150),
  };
});
console.log(JSON.stringify(r, null, 2));
console.log('LOGS:', logs);
await b.close();
