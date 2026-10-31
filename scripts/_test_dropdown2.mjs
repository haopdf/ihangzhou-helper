import { chromium } from 'playwright';
const BASE = 'http://localhost:8765';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
const p = await ctx.newPage();
p.on('console', m => { if (m.type() === 'error') console.log('PAGE ERROR:', m.text()); });

// Test 1: index.html dropdown round-trip
console.log('=== Test 1: index.html 切换上城区 ===');
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(2000);
await p.evaluate(() => window.toggleSettings && window.toggleSettings());
await p.waitForTimeout(500);
await p.evaluate(() => {
  const btn = document.getElementById('citySelect');
  if (btn) btn.click();
});
await p.waitForTimeout(500);
const beforeNav = await p.evaluate(() => {
  const dd = document.getElementById('cityDropdown');
  return { hasShow: dd.classList.contains('show'), items: document.querySelectorAll('#cityDropdown .city-dropdown-item').length };
});
console.log('index dropdown open:', JSON.stringify(beforeNav));

// Select shangcheng
await p.evaluate(() => {
  const items = document.querySelectorAll('#cityDropdown .city-dropdown-item');
  for (const it of items) {
    if (it.dataset.id === 'shangcheng') { it.click(); return 'clicked'; }
  }
  return 'not found';
});
await p.waitForTimeout(1500);
const url1 = p.url();
console.log('After select shangcheng:', url1);

// Test 2: On check if dropdown button exists and works
console.log('\n=== Test 2: district.html 下拉按钮 ===');
const btn2 = await p.evaluate(() => ({
  citySwitcherBtn: !!document.getElementById('citySwitcherBtn'),
  citySelect: !!document.getElementById('citySelect'),
  cityDropdown: !!document.getElementById('cityDropdown')
}));
console.log('Buttons on district.html:', JSON.stringify(btn2));

await p.evaluate(() => {
  const btn = document.getElementById('citySwitcherBtn') || document.getElementById('citySelect');
  if (btn) btn.click();
});
await p.waitForTimeout(500);
const distDrop = await p.evaluate(() => {
  const dd = document.getElementById('cityDropdown');
  if (!dd) return { exists: false };
  return { hasShow: dd.classList.contains('show'), display: getComputedStyle(dd).display, items: dd.querySelectorAll('.city-dropdown-item').length };
});
console.log('District dropdown open:', JSON.stringify(distDrop));

// Test 3: Navigate back to index
console.log('\n=== Test 3: 回到首页 ===');
await p.goto(BASE + '/index.html', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(1500);
await p.evaluate(() => window.toggleSettings && window.toggleSettings());
await p.waitForTimeout(500);
await p.evaluate(() => {
  const btn = document.getElementById('citySelect');
  if (btn) btn.click();
});
await p.waitForTimeout(500);
const idxDrop = await p.evaluate(() => {
  const dd = document.getElementById('cityDropdown');
  if (!dd) return { exists: false };
  return { hasShow: dd.classList.contains('show'), display: getComputedStyle(dd).display, items: dd.querySelectorAll('.city-dropdown-item').length };
});
console.log('Index dropdown after return:', JSON.stringify(idxDrop));

await b.close();
