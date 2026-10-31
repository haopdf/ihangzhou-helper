import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

// FINAL every root + articles (excludes genuine empty-state utility)
const tests = [
  // 首页与栏目导航
  'index.html', 'cat.html', 'cat.html?c=travel', 'cat.html?c=travel&s=景点门票',
  'cat.html?c=food', 'cat.html?c=banshi', 'cat.html?c=culture', 'cat.html?c=culture&s=博物馆',
  'cat.html?c=shopping', 'cat.html?c=zhaopin',
  // 文章系统
  'articles.html', 'articles/series-01-杭州一日游路线推荐.html', 'articles/三潭印月-我的前世是根木葫芦.html',
  'articles/丝绸博物馆里的织女.html', 'articles/南宋-西湖文化.html',
  // 频道 & 详情
  'channel.html#food', 'channel.html#banshi', 'channel.html#weekend',
  'guzhen.html?id=wuzhen', 'temple.html?id=lingyin', 'chaguan.html?id=chayaun',
  'coffee.html?id=hu-pan', 'scenic.html?id=san-tan-yin-yue', 'tea.html?id=shifeng',
  'dessert.html?id=dingshenggao', 'night-market.html?id=hefang', 'laozihao.html?id=kuiyuanguan',
  'life.html?id=xiaofei', 'zhoumo.html?id=qinzi', 'route.html?id=yiriyou', 'food.html?id=housixi',
  'traffic.html?id=chuzuche', 'celebrity.html?id=bai-juyi', 'story.html?id=baishe',
  'museum.html?id=zhemo', 'gujian.html?id=hu-garden', 'intangible.html?id=hanghua',
  'tushuguan.html?id=zhejiang-tushuguan', 'xiangxiang.html?id=xiaoxi',
  'breakfast.html?id=banmian', 'hangbang.html?id=xihu-cuyu', 'district.html?id=xihu',
  'around.html?id=wuzhen', 'banshi.html?id=hukou',
  // place / tide / zhoubian
  'place.html?id=westlake', 'place.html?id=lingyin', 'place.html?id=xixi',
  'place.html?id=leifengta', 'place.html?id=songcheng', 'place.html?id=liangzhu',
  'place.html?id=faxi',
  'tide.html?id=yanguan', 'tide.html?id=meinvba', 'tide.html?id=xiasha',
  'tide.html?id=liuhe', 'tide.html?id=yangtai',
  'zhoubian.html?id=wuzhen', 'zhoubian.html?id=mogan', 'zhoubian.html?id=qiandao',
  'zhoubian.html?id=anji', 'zhoubian.html?id=tianmu', 'zhoubian.html?id=tonglu',
  // 静态内容页
  'history.html', 'internet.html', 'street.html', 'zhaopin.html', 'travel.html',
];

const results = [];
for (const path of tests) {
  const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errs = [];
  p.on('pageerror', e => errs.push(e.message.slice(0,60)));
  try {
    const r = await p.goto(`http://localhost:8765/${path}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
    await p.waitForTimeout(1800);
    const body = await p.evaluate(() => document.body.innerText.replace(/\s+/g,' ').trim());
    const status = r ? r.status() : 0;
    const pass = status === 200 && body.length >= 80 && errs.length === 0;
    results.push({ path, status, len: body.length, errs, pass });
    console.log(`${pass?'OK ':'FAIL'} ${path.padEnd(50)} ${body.length}c ${errs[0]||''}`);
  } catch (e) {
    results.push({ path, status: 0, len: 0, errs: [e.message.slice(0,60)], pass: false });
    console.log(`ERR  ${path.padEnd(50)} ${e.message.slice(0,60)}`);
  }
  await p.close();
}
const ok = results.filter(r=>r.pass).length;
await browser.close();
console.log(`\n${'='.repeat(55)}`);
console.log(`  全站测试结果: ${ok} PASS / ${results.length-ok} FAIL / ${results.length} total`);
console.log(`${'='.repeat(55)}`);
