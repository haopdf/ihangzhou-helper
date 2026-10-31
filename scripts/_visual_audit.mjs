import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const outdir = '/Users/asind/PycharmProjects/ihangzhou-helper/scripts/_audit_shots';
fs.mkdirSync(outdir, { recursive: true });

const targets = [
  'index.html',
  'food.html',
  'food.html?id=housixi',
  'travel.html',
  'cat.html?c=food',
  'guzhen.html?id=wuzhen',
  'temple.html?id=lingyin',
  'coffee.html?id=hu-pan',
  'place.html?id=westlake',
  'articles.html',
];

for (const path of targets) {
  try {
    await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(3000);
    const safe = path.replace(/[?#&=]/g, '_').replace(/__/g, '_').replace(/_%E.*/, '_name');
    await page.screenshot({ path: `${outdir}/${safe}.png`, fullPage: false });
    // Capture body width info
    const widths = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        bodyW: body.offsetWidth,
        htmlW: html.offsetWidth,
        viewW: window.innerWidth,
        scrollW: document.documentElement.scrollWidth,
        hasHorzScroll: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    console.log(`${path.padEnd(25)} ${JSON.stringify(widths)}`);
  } catch (e) {
    console.log(`${path.padEnd(25)} ERR ${e.message.slice(0, 50)}`);
  }
}

await browser.close();
console.log('\nScreenshots saved to scripts/_audit_shots/');
