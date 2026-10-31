import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();
await p.goto(BASE + '/district.html?id=shangcheng', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(3000);

// Check state
const state = await p.evaluate(() => ({
  btn: !!document.getElementById('citySwitcherBtn'),
  dd: !!document.getElementById('cityDropdown'),
  items: document.querySelectorAll('#cityDropdown .city-dropdown-item').length,
  cityNameFromApp: (window.DISTRICTS||[]).length,
  ihzCity: localStorage.getItem('ihz_city')
}));
console.log('Initial state:', JSON.stringify(state));

// Click button
await p.evaluate(() => {
  const btn = document.getElementById('citySwitcherBtn');
  if (btn) btn.click();
});
await p.waitForTimeout(500);

const afterClick = await p.evaluate(() => {
  const dd = document.getElementById('cityDropdown');
  return { hasShow: dd.classList.contains('show'), items: dd.querySelectorAll('.city-dropdown-item').length };
});
console.log('After click:', JSON.stringify(afterClick));

// Try clicking second item (gongshu)
await p.evaluate(() => {
  const items = document.querySelectorAll('#cityDropdown .city-dropdown-item');
  for (const it of items) {
    if (it.dataset.id === 'gongshu') { it.click(); return 'clicked gongshu'; }
  }
  return 'not found (' + items.length + ' items)';
});
await p.waitForTimeout(1500);
console.log('After select gongshu:', p.url());

await b.close();
