import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const pages = [
  'guzhen.html?id=wuzhen',
  'temple.html?id=lingyin',
  'chaguan.html?id=chayaun',
  'coffee.html?id=hu-pan',
  'night-market.html?id=hefang',
  'scenic.html?id=hu-pan-jing',
  'tea.html?id=shifeng',
  'dessert.html?id=dingshenggao',
  'laozihao.html?id=kuiyuanguan',
  'life.html?id=xiaofei',
  'zhoumo.html?id=qinzi',
  'route.html?id=yiriyou',
  'hangbang.html?id=xihu-cuyu',
  'breakfast.html?id=banmian',
  'museum.html?id=zhemo',
  'gujian.html?id=hu-garden',
  'intangible.html?id=hanghua',
  'celebrity.html?id=bai-juyi',
  'story.html?id=baishe',
  'tushuguan.html?id=zhejiang-tushuguan',
  'district.html?id=xihu',
  'around.html?id=wuzhen',
  'food.html?id=housixi',
  'traffic.html?id=chuzuche',
  'banshi.html?id=hukou',
  'channel.html#banshi',
  'index.html',
];

const results = [];
for (const path of pages) {
  try {
    await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    const r = await page.evaluate(() => {
      const hero = document.querySelector('.p-hero');
      const heroStyle = hero ? window.getComputedStyle(hero) : null;
      const body = document.querySelector('.p-body, .p-hero ~ *');
      const header = document.querySelector('header.toolbar');
      const footer = document.querySelector('.footer-nav');
      return {
        hero: !!hero,
        heroBg: heroStyle ? heroStyle.backgroundImage.substring(0, 80) : 'NO_HERO',
        heroH: hero ? hero.offsetHeight : 0,
        heroDisplay: heroStyle ? heroStyle.display : 'NO_HERO',
        title: hero ? hero.querySelector('.p-hero-title')?.textContent.trim().slice(0, 20) : '',
        bodyLen: document.body.innerText.length,
        headerOk: !!header,
        footerOk: !!footer || !!document.querySelector('footer'),
      };
    });
    results.push(`${path.padEnd(35)} hero=${r.heroH}px title="${r.title}" body=${r.bodyLen}c head=${r.headerOk}`);
  } catch (e) {
    results.push(`${path.padEnd(35)} ERR ${e.message.slice(0, 50)}`);
  }
}

await browser.close();
console.log('\n' + results.join('\n'));
