/* 三级页内嵌渲染验证 v2：真实条目名 */
const { chromium } = require('playwright');
const BASE = 'http://localhost:8899/';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));

  async function test(name, url, checks) {
    await page.goto(BASE + url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    const r = await page.evaluate(() => {
      const box = document.getElementById('catDestBlock');
      const hero = document.getElementById('catHero');
      const crumb = document.getElementById('catCrumb');
      return {
        destText: box ? box.textContent.replace(/\s+/g, ' ').slice(0, 100) : '(no box)',
        destLen: box ? box.textContent.replace(/\s+/g, '').length : 0,
        destHasImg: box ? !!box.querySelector('img') : false,
        destHasH1: box ? !!box.querySelector('h1') : false,
        destHtml: box ? box.innerHTML.slice(0, 150) : '',
        heroHidden: hero ? hero.style.display === 'none' : null,
        crumb: crumb ? crumb.textContent.replace(/\s+/g, ' ') : '',
        title: document.title,
        hasZhida: document.body.textContent.indexOf('直达「') >= 0,
        iframes: document.querySelectorAll('iframe').length,
        stylesCopied: !!document.querySelector('style:not([data-cat])') && document.head.querySelectorAll('style').length,
      };
    });
    console.log('=== ' + name + ' ===');
    console.log('  crumb: ' + r.crumb + ' | title: ' + r.title);
    console.log('  destLen=' + r.destLen + ' img=' + r.destHasImg + ' h1=' + r.destHasH1 + ' heroHidden=' + r.heroHidden + ' iframes=' + r.iframes + ' zhida=' + r.hasZhida);
    console.log('  text: ' + r.destText);
    let ok = true;
    checks.forEach(([desc, fn]) => {
      if (!fn(r)) { ok = false; console.log('  FAIL: ' + desc); }
    });
    console.log(ok ? '  >> PASS' : '  >> FAIL');
    return ok;
  }

  const R = [];
  // 1. 西湖十景 → place.html?id=westlake
  R.push(await test('西湖十景(place)',
    'cat.html?c=travel&s=' + encodeURIComponent('景点门票') + '&t=' + encodeURIComponent('西湖十景'),
    [['无直达', r => !r.hasZhida], ['内容>200', r => r.destLen > 200], ['hero收起', r => r.heroHidden === true],
     ['crumb完整', r => /首页\s*\/\s*旅游出行\s*\/\s*景点门票\s*\/\s*西湖十景/.test(r.crumb)], ['iframe清理', r => r.iframes === 0]]));
  // 2. banshi 医保报销 → banshi.html?id=shebao-yibao
  R.push(await test('医保报销(banshi?id=)',
    'cat.html?c=banshi&s=' + encodeURIComponent('社保查询') + '&t=' + encodeURIComponent('医保报销'),
    [['无直达', r => !r.hasZhida], ['内容>100', r => r.destLen > 100], ['iframe清理', r => r.iframes === 0]]));
  // 3. life 消费券 → life.html?id=xiaofei
  R.push(await test('消费券(life?id=)',
    'cat.html?c=life&s=' + encodeURIComponent('消费优惠') + '&t=' + encodeURIComponent('消费券'),
    [['无直达', r => !r.hasZhida], ['内容>100', r => r.destLen > 100], ['iframe清理', r => r.iframes === 0]]));
  // 4. #act: 个税计算 → #act:tax
  R.push(await test('个税计算(#act)',
    'cat.html?c=banshi&s=' + encodeURIComponent('实用工具') + '&t=' + encodeURIComponent('个税计算'),
    [['无直达字样', r => r.destText.indexOf('直达') < 0], ['有入口按钮', r => /cat-home-btn/.test(r.destHtml)],
     ['href=#act:tax', r => /#act:tax/.test(r.destHtml)]]));
  // 5. 外链：shopping/餐饮团购/美食外卖
  R.push(await test('美食外卖(外链)',
    'cat.html?c=shopping&s=' + encodeURIComponent('餐饮团购') + '&t=' + encodeURIComponent('美食外卖'),
    [['外链新窗口', r => /target="_blank"/.test(r.destHtml)], ['含meituan', r => /meituan/.test(r.destHtml)]]));
  // 6. 今日潮时 → #act:tide
  R.push(await test('今日潮时(#act:tide)',
    'cat.html?c=travel&s=' + encodeURIComponent('钱塘江观潮') + '&t=' + encodeURIComponent('今日潮时'),
    [['href=#act:tide', r => /#act:tide/.test(r.destHtml)]]));
  // 7. scenic 详情（频道页 #pageChannel 默认选择器）苏堤春晓
  R.push(await test('苏堤春晓(scenic)',
    'cat.html?c=travel&s=' + encodeURIComponent('景点门票') + '&t=' + encodeURIComponent('苏堤春晓'),
    [['无直达', r => !r.hasZhida], ['内容>100', r => r.destLen > 100]]));

  console.log('\n######## 汇总: ' + R.filter(Boolean).length + '/' + R.length + ' ########');
  if (errors.length) console.log('页面错误:', errors.slice(0, 5));
  await browser.close();
  process.exit(R.every(Boolean) ? 0 : 1);
})().catch(e => { console.error('ERR', e); process.exit(1); });
