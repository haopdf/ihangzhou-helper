import { chromium } from 'playwright';
const browser = await chromium.launch();

// COMPREHENSIVE: Every root HTML page + real parameters
const tests = [
  // ====== 首页 / 基础 ======
  ['index.html', 'HOME index'],
  ['404.html', '404页'],
  ['offline.html', 'offline页'],

  // ====== cat.html 一级+二级栏目 (?c=&s=) ======
  ['cat.html', 'cat 全部栏目'],
  ['cat.html?c=travel', 'cat 旅游一级'],
  ['cat.html?c=travel&s=景点门票', 'cat 景点门票二级'],
  ['cat.html?c=travel&s=周边游', 'cat 周边游二级'],
  ['cat.html?c=food', 'cat 美食一级'],
  ['cat.html?c=food&s=杭帮菜', 'cat 杭帮菜二级'],
  ['cat.html?c=banshi', 'cat 办事一级'],
  ['cat.html?c=culture', 'cat 文化一级'],
  ['cat.html?c=culture&s=博物馆', 'cat 博物馆二级'],
  ['cat.html?c=shopping', 'cat 购物一级'],
  ['cat.html?c=zhaopin', 'cat 招聘一级'],
  ['cat.html?c=utf', 'cat UTF一级'],

  // ====== place.html 景点大全（列表页+详情） ======
  ['place.html', 'PLACE 全部列表'],
  ['place.html?id=westlake', 'PLACE 西湖'],
  ['place.html?id=lingyin', 'PLACE 灵隐'],
  ['place.html?id=xixi', 'PLACE 西溪'],
  ['place.html?id=leifengta', 'PLACE 雷峰塔'],
  ['place.html?id=songcheng', 'PLACE 宋城'],
  ['place.html?id=liangzhu', 'PLACE 良渚'],
  ['place.html?id=faxi', 'PLACE 法喜寺'],

  // ====== 内容/静态页（无 param） ======
  ['history.html', 'HISTORY 静态内容页'],
  ['internet.html', 'INTERNET 静态内容页'],
  ['street.html', 'STREET 静态内容页'],
  ['zhaopin.html', 'ZHAOPIN 静态内容页'],
  ['travel.html', 'TRAVEL 旅游首页'],
  ['travel.html#tab=jingdian', 'TRAVEL tab=jingdian'],
  ['travel.html#tab=meishi', 'TRAVEL tab=meishi'],

  // ====== tide 观潮 ======
  ['tide.html', 'TIDE 列表页'],
  ['tide.html?id=yanguan', 'TIDE 盐官'],
  ['tide.html?id=meinvba', 'TIDE 美女坝'],
  ['tide.html?id=xiasha', 'TIDE 下沙'],
  ['tide.html?id=liuhe', 'TIDE 六和塔'],
  ['tide.html?id=yangtai', 'TIDE 阳台'],

  // ====== zhoubian 周边游 ======
  ['zhoubian.html', 'ZHOUBIAN 列表页'],
  ['zhoubian.html?id=wuzhen', 'ZHOUBIAN 乌镇'],
  ['zhoubian.html?id=mogan', 'ZHOUBIAN 莫干山'],
  ['zhoubian.html?id=qiandao', 'ZHOUBIAN 千岛湖'],
  ['zhoubian.html?id=anji', 'ZHOUBIAN 安吉'],
  ['zhoubian.html?id=tianmu', 'ZHOUBIAN 天目山'],
  ['zhoubian.html?id=tonglu', 'ZHOUBIAN 桐庐'],

  // ====== 第一阶段已验证的频道（回归确认） ======
  ['guzhen.html?id=wuzhen', 'REGRESS guzhen'],
  ['temple.html?id=lingyin', 'REGRESS temple'],
  ['coffee.html?id=hu-pan', 'REGRESS coffee'],
  ['scenic.html?id=san-tan-yin-yue', 'REGRESS scenic'],
  ['tea.html?id=shifeng', 'REGRESS tea'],
  ['dessert.html?id=dingshenggao', 'REGRESS dessert'],
  ['night-market.html?id=hefang', 'REGRESS night-market'],
  ['laozihao.html?id=kuiyuanguan', 'REGRESS laozihao'],
  ['food.html?id=housixi', 'REGRESS food'],
  ['museum.html?id=zhemo', 'REGRESS museum'],
  ['gujian.html?id=hu-garden', 'REGRESS gujian'],
  ['intangible.html?id=hanghua', 'REGRESS intangible'],
  ['breakfast.html?id=banmian', 'REGRESS breakfast'],
  ['district.html?id=xihu', 'REGRESS district'],
  ['banshi.html?id=hukou', 'REGRESS banshi'],
  ['channel.html#banshi', 'REGRESS channel#banshi'],
];

let ok = 0, fail = 0, errors = [];
for (const [path, label] of tests) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const logs = [];
  page.on('pageerror', e => logs.push(e.message.slice(0,80)));
  try {
    const r = await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
    await page.waitForTimeout(2000);
    const body = await page.evaluate(() => document.body.innerText.replace(/\s+/g,' ').trim());
    const status = r ? r.status() : 0;
    const is404 = body.includes('Cannot GET') || body.includes('404') || status === 404;
    const isShort = body.length < 60;
    const hasError = logs.length > 0;
    if (is404 || isShort || hasError) {
      console.log(`FAIL ${label.padEnd(32)} st=${status} body=${body.length}c ${logs.length>0?'ERR:'+logs[0]:''}`);
      fail++;
      errors.push(`${label}: ${logs[0]||'short/404'}`);
    } else {
      console.log(`OK   ${label.padEnd(32)} st=${status} body=${body.length}c`);
      ok++;
    }
  } catch (e) {
    console.log(`ERR  ${label.padEnd(32)} ${e.message.slice(0,60)}`);
    fail++;
    errors.push(`${label}: ${e.message.slice(0,60)}`);
  }
  await page.close();
}

await browser.close();
console.log(`\n═══════════════════════════════════════`);
console.log(`  ${ok} PASS / ${fail} FAIL / ${tests.length} total`);
console.log(`═══════════════════════════════════════`);
if (errors.length) {
  console.log('\n失败详情:');
  errors.forEach(e => console.log('  � ' + e));
}
