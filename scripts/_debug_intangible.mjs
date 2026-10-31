import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const logs = [];
page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', e => logs.push(`[PAGEERROR] ${e.message}`));

await page.goto('http://localhost:8765/intangible.html?id=hanghua', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(4000);

const container = await page.evaluate(() => {
  const c = document.getElementById('intangibleContainer');
  return { exists: !!c, html: c ? c.innerHTML.slice(0, 300) : null, text: c ? c.innerText : null };
});

const data = await page.evaluate(() => ({
  hasItems: typeof window.INTANGIBLE_ITEMS,
  keys: window.INTANGIBLE_ITEMS ? Object.keys(window.INTANGIBLE_ITEMS).slice(0, 5) : null,
}));

console.log('Container:', JSON.stringify(container));
console.log('Data:', JSON.stringify(data));
console.log('Logs:');
logs.forEach(l => console.log('  ' + l));

await browser.close();
