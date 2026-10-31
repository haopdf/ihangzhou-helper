import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const pages = [
  'guzhen.html?id=wuzhen',
  'temple.html?id=lingyin',
  'chaguan.html?id=chayaun',
  'coffee.html?id=hu-pan',
  'night-market.html?id=hefang',
  'scenic.html?id=san-tan-yin-yue',
  'tea.html?id=shifeng',
  'dessert.html?id=dingshenggao',
  'laozihao.html?id=kuiyuanguan',
  'life.html?id=xiaofei',
];

const outdir = '/Users/asind/PycharmProjects/ihangzhou-helper/scripts/_full_shots';
fs.mkdirSync(outdir, { recursive: true });

for (const path of pages) {
  try {
    await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(3000);
    const safe = path.replace(/[?=]/g, '_').replace(/&/g, '_');
    await page.screenshot({ path: `${outdir}/${safe}.png`, fullPage: true });
    const body = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim().slice(0, 500));
    console.log(`OK  ${path}\n    ${body}\n`);
  } catch (e) {
    console.log(`ERR ${path}: ${e.message.slice(0, 80)}`);
  }
}

await browser.close();
