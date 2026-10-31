import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const logs = [];
page.on('pageerror', e => logs.push(e.message));

await page.goto('http://localhost:8765/intangible.html?id=hanghua', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
const r = await page.evaluate(() => ({
  hero: !!document.querySelector('.p-hero-title'),
  badges: document.querySelectorAll('.p-badge').length,
  neighbors: document.querySelectorAll('.p-neighbors-card').length,
  empty: !!document.querySelector('.p-empty'),
  text: document.body.innerText.replace(/\s+/g,' ').trim().slice(0, 100)
}));
console.log(JSON.stringify(r, null, 2));
console.log('Errors:', logs);
await browser.close();
