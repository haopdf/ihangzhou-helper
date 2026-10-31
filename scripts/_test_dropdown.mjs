import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(2000);

// Open settings
await p.evaluate(() => { window.toggleSettings && window.toggleSettings(); });
await p.waitForTimeout(500);

// Before click
const before = await p.evaluate(() => {
  const dd = document.getElementById('cityDropdown');
  return { display: dd ? getComputedStyle(dd).display : 'none' };
});
console.log('Before click:', JSON.stringify(before));

// Click citySelect button
await p.evaluate(() => {
  const btn = document.getElementById('citySelect');
  if (btn) btn.click();
});
await p.waitForTimeout(500);

// After click
const after = await p.evaluate(() => {
  const dd = document.getElementById('cityDropdown');
  const rect = dd.getBoundingClientRect();
  return { display: getComputedStyle(dd).display, hasShow: dd.classList.contains('show'), left: Math.round(rect.left), width: Math.round(rect.width) };
});
console.log('After click:', JSON.stringify(after));

// Check if district items visible
const itemCount = await p.evaluate(() => {
  return document.querySelectorAll('#cityDropdown .city-dropdown-item').length;
});
console.log('Dropdown items:', itemCount);

await b.close();
