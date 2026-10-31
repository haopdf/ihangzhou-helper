import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

// Pages that matter — mix of detail and channel views
const cases = [
  ['guzhen.html?id=wuzhen', 'hero', 'p-hero'],
  ['temple.html?id=lingyin', 'hero', 'p-hero'],
  ['coffee.html?id=hu-pan', 'name', 'p-name'],  // coffee uses p-name for title
  ['scenic.html?id=hu-pan-jing', 'name', 'p-name'],  // scenic uses p-name
  ['chaguan.html?id=chayaun', 'hero', 'p-hero'],
  ['dessert.html?id=dingshenggao', 'hero', 'p-hero'],
  ['laozihao.html?id=kuiyuanguan', 'any', '*'],
  ['life.html?id=xiaofei', 'hero', 'p-hero'],
  ['food.html?id=housixi', 'hero', 'p-hero'],
  ['traffic.html?id=chuzuche', 'any', '*'],
  ['banshi.html?id=hukou', 'any', '*'],
  ['celebrity.html?id=bai-juyi', 'hero', 'p-hero'],
];

for (const [path, kind, sel] of cases) {
  try {
    await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    const r = await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (!el) return { found: false };
      const cs = window.getComputedStyle(el);
      return {
        found: true,
        w: el.offsetWidth, h: el.offsetHeight,
        bg: cs.backgroundImage.substring(0, 60),
        color: cs.color,
        fontSize: cs.fontSize,
        padding: cs.padding,
        overflow: cs.display,
        text: el.textContent.trim().slice(0, 40),
        textLen: el.innerHTML.length,
        visible: cs.display !== 'none' && cs.visibility !== 'hidden',
      };
    }, sel);
    console.log(`${path.padEnd(35)} ${sel.padEnd(10)} h=${r.h || 'NA'}px w=${r.w || 'NA'}px txt="${r.text}" vis=${r.visible}`);
  } catch (e) {
    console.log(`${path.padEnd(35)} ERR ${e.message.slice(0, 40)}`);
  }
}

await browser.close();
