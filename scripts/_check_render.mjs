import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const pages = [
  'guzhen.html?id=wuzhen',
  'temple.html?id=lingyin',
  'chaguan.html?id=longjing',
  'night-market.html?id=wushan',
  'coffee.html?id=westlake',
  'dessert.html?id=westlake',
  'laozihao.html?id=huqingyutang',
  'scenic.html?id=westlake',
  'tea.html?id=longjing',
  'life.html?id=banshi',
  'zhoumo.html?id=around',
  'route.html?id=xihu',
];

for (const p of pages) {
  try {
    await page.goto(`http://localhost:8765/${p}`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(1500);
    const info = await page.evaluate(() => {
      const hero = document.querySelector('.p-hero');
      const heroTitle = document.querySelector('.p-hero-title, .p-hero-inner');
      const body = document.querySelector('.p-body');
      const toolbar = document.querySelector('.toolbar, header.toolbar, #toolbar');
      const footer = document.querySelector('.footer-nav, footer, #footerNav');
      const headerOk = !!document.querySelector('header.toolbar, .toolbar');
      return {
        hero: !!hero,
        heroH: hero ? hero.offsetHeight : 0,
        heroChild: hero ? hero.innerHTML.slice(0, 80) : '',
        heroTitle: heroTitle ? heroTitle.textContent.trim().slice(0, 40) : 'NO_TITLE',
        body: !!body,
        headerOk: headerOk,
        footerOk: !!footer,
        bodyText: document.body.innerText.slice(0, 200),
      };
    });
    console.log(`${p}:`, JSON.stringify(info));
  } catch (e) {
    console.log(`FAIL ${p}: ${e.message.slice(0, 80)}`);
  }
}

await browser.close();
