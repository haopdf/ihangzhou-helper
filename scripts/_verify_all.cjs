/* 全频道三态回归 v2：列表(无id) / 详情(真实有效id) / not-found(无效id) */
const { chromium } = require('playwright');
const PAGES = [
  ['food.html', 'shuangru'],
  ['travel.html', 'xihu'],
  ['museum.html', 'zhejiang-bowuguan'],
  ['coffee.html', 'luyu'],
  ['laozihao.html', 'zhiweiguan'],
  ['scenic.html', 'ling-yin'],
  ['tea.html', 'longjing'],
  ['tushuguan.html', 'zhejiang-tushuguan'],
  ['chaguan.html', 'chayaun'],
  ['dessert.html', 'dingshenggao'],
  ['night-market.html', 'hefang'],
  ['route.html', 'yiriyou'],
  ['temple.html', 'lingyin'],
  ['tide.html', 'yanguan'],
  ['zhoubian.html', 'wuzhen'],
  ['weekend.html', ''],
  ['zhoumo.html', ''],
  ['xiangxiang.html', ''],
  ['breakfast.html', ''],
  ['gujian.html', ''],
  ['guzhen.html', ''],
  ['hangbang.html', ''],
  ['story.html', ''],
  ['intangible.html', 'hanghua'],
  ['district.html', 'yuhang'],
  ['channel.html', ''],
  ['life.html', ''],
];
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  let fail = 0, total = 0;
  for (const [file, id] of PAGES) {
    const states = [['list', file], ['detail', id ? file + '?id=' + id : null], ['notfound', file + '?id=__invalid__']];
    for (const [label, url] of states) {
      if (!url) continue;
      total++;
      await page.goto('http://localhost:8080/' + url, { waitUntil: 'networkidle' });
      const r = await page.evaluate(() => {
        const body = document.body.innerText;
        const fffd = (body.match(/\uFFFD/g) || []).length;
        const scrollW = document.documentElement.scrollWidth;
        const navs = [...document.querySelectorAll('nav.site-breadcrumb')];
        let visible = null;
        for (const n of navs) {
          const b = n.getBoundingClientRect();
          if (b.width > 100) { visible = { x: Math.round(b.x), w: Math.round(b.width), top: Math.round(b.top) }; break; }
        }
        const hero = document.querySelector('.p-hero, .ch-hero, .district-hero');
        let hr = null;
        if (hero) { const b = hero.getBoundingClientRect(); if (b.width > 0) hr = { x: Math.round(b.x), w: Math.round(b.width), top: Math.round(b.top) }; }
        return { fffd, scrollW, visible, hr, navCount: navs.length };
      });
      const needCrumb = label !== 'notfound' || !['weekend.html', 'zhoumo.html'].includes(file);
      const ok = r.fffd === 0 && r.scrollW <= 1280 && (!needCrumb || (r.visible && r.visible.x === 0 && r.visible.w === 1280));
      if (!ok) fail++;
      if (!ok) console.log('FAIL ' + file + ' [' + label + '] fffd=' + r.fffd + ' scrollW=' + r.scrollW + ' crumb=' + (r.visible ? JSON.stringify(r.visible) : 'null') + ' navs=' + r.navCount);
    }
  }
  await browser.close();
  console.log('TOTAL=' + total + ' FAIL=' + fail);
})();
