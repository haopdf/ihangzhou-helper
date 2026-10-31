import { chromium } from 'playwright';
const browser = await chromium.launch();
for (const path of ['place.html', 'tide.html', 'zhoubian.html', 'cat.html', 'cat.html?c=utf']) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'networkidle', timeout: 12000 });
  await page.waitForTimeout(3000);
  const txt = await page.evaluate(() => document.body.innerText.replace(/\s+/g,' ').trim());
  console.log(`${path.padEnd(25)} errs=${errs.length} "${txt.slice(0,70)}"`);
  await page.close();
}
await browser.close();
