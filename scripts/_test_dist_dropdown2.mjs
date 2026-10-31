import { chromium } from 'playwright';
const BASE = 'http://localhost:8090';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();
p.on('pageerror', e => console.log('PAGE ERROR:', e.message));
p.on('console', m => { if (m.type() === 'error') console.log('CONSOLE ERR:', m.text()); });
await p.goto(BASE + '/district.html?id=gongshu', { waitUntil: 'networkidle', timeout: 20000 });
await p.waitForTimeout(5000);

const state = await p.evaluate(() => ({
  btn: !!document.getElementById('citySwitcherBtn'),
  dd: !!document.getElementById('cityDropdown'),
  items: document.querySelectorAll('#cityDropdown .city-dropdown-item').length,
  onIHZLayoutReady: typeof window.onIHZLayoutReady,
  IZ: typeof window.IZ,
  IZlayout: window.IZ ? typeof window.IZ.layout : 'no IZ',
  IZinit: window.IZ && window.IZ.layout ? typeof window.IZ.layout.init : 'no init',
  ihzCity: localStorage.getItem('ihz_city'),
  ddInner: document.getElementById('cityDropdown') ? document.getElementById('cityDropdown').innerHTML.substring(0,200) : 'null'
}));
console.log('STATE:', JSON.stringify(state, null, 2));

// Click button
await p.evaluate(() => {
  const btn = document.getElementById('citySwitcherBtn');
  if (btn) btn.click();
});
await p.waitForTimeout(500);

const afterClick = await p.evaluate(() => {
  const dd = document.getElementById('cityDropdown');
  return { hasShow: dd.classList.contains('show'), items: dd.querySelectorAll('.city-dropdown-item').length, inner: dd.innerHTML.substring(0,100) };
});
console.log('AFTER CLICK:', JSON.stringify(afterClick, null, 2));

await b.close();
