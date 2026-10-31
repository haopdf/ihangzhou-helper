import { chromium } from 'playwright';
const browser = await chromium.launch();

// Fresh page per test to avoid hash-nav issues
const tests = [
  // ====== Channel inner items (real data IDs per channel) ======
  ['guzhen.html?id=wuzhen', 'guzhen wuzhen'],
  ['guzhen.html?id=tangqi', 'guzhen tangqi'],
  ['temple.html?id=lingyin', 'temple lingyin'],
  ['temple.html?id=faxi', 'temple faxi'],
  ['temple.html?id=jingci', 'temple jingci'],
  ['chaguan.html?id=chayaun', 'chaguan chayaun'],
  ['chaguan.html?id=longjing-teahouse', 'chaguan longjing'],
  ['coffee.html?id=hu-pan', 'coffee hupan'],
  ['coffee.html?id=xiezilou', 'coffee xiezilou'],
  ['coffee.html?id=qingzhiwu', 'coffee qingzhiwu'],
  ['scenic.html?id=hu-pan-jing', 'scenic hupan'],
  ['scenic.html?id=ling-yin', 'scenic lingyin'],
  ['scenic.html?id=san-tan-yin-yue', 'scenic santan'],
  ['scenic.html?id=qu-yuan-he-feng', 'sceny quyuan'],
  ['scenic.html?id=gushan', 'scenic gushan'],
  ['tea.html?id=shifeng', 'tea shifeng'],
  ['tea.html?id=anji', 'tea anji'],
  ['dessert.html?id=dingshenggao', 'dessert dingsheng'],
  ['dessert.html?id=guihuatangou', 'dessert guihua'],
  ['night-market.html?id=hefang', 'night hefang'],
  ['night-market.html?id=wulin', 'night wulin'],
  ['laozihao.html?id=kuiyuanguan', 'laozihao kuiyuan'],
  ['laozihao.html?id=huqingyutang', 'laozihao huqing'],
  ['laozihao.html?id=wangxingji', 'laozihao wangxing'],
  ['life.html?id=xiaofei', 'life xiaofei'],
  ['life.html?id=chuzufang', 'life chuzufang'],
  ['life.html?id=zhaopin', 'life zhaopin'],
  ['zhoumo.html?id=qinzi', 'zhoumo qinzi'],
  ['zhoumo.html?id=chayuan', 'zhoumo chayuan'],
  ['route.html?id=yiriyou', 'route yiriyou'],
  ['route.html?id=chuantan', 'route chuantan'],
  ['food.html?id=housixi', 'food housixi'],
  ['food.html?id=songxiaoyu', 'food songxiaoyu'],
  ['food.html?id=xihucuyu', 'food xihucuyu'],
  ['traffic.html?id=chuzuche', 'traffic chuzuche'],
  ['traffic.html?id=niuche', 'traffic niuche'],
  ['celebrity.html?id=bai-juyi', 'celebrity baijuyi'],
  ['celebrity.html?id=sushi', 'celebrity sushi'],
  ['story.html?id=baishe', 'story baishe'],
  ['story.html?id=nanbei', 'story nanbei'],
  ['museum.html?id=zhemo', 'museum zhemo'],
  ['gujian.html?id=hu-garden', 'gujian hu-garden'],
  ['gujian.html?id=huaiyuan', 'gujian huaiyuan'],
  ['intangible.html?id=hanghua', 'intangible hanghua'],
  ['intangible.html?id=hangxiu', 'intangible hangxiu'],
  ['intangible.html?id=zhangxiaoquan', 'intangible zhangxiaoquan'],
  ['intangible.html?id=wangxingji', 'intangible wangxingji'],
  ['intangible.html?id=yueyao', 'intangible yueyao'],
  ['tushuguan.html?id=zhejiang-tushuguan', 'tushuguan zjlib'],
  ['xiangxiang.html?id=xiaoxi', 'xiangxiang xiaoxi'],
  ['breakfast.html?id=banmian', 'breakfast banmian'],
  ['hangbang.html?id=xihu-cuyu', 'hangbang xihucuyu'],
  ['district.html?id=xihu', 'district xihu'],
  ['around.html?id=wuzhen', 'around wuzhen'],
  ['banshi.html?id=hukou', 'banshi hukou'],
  ['channel.html#banshi', 'channel banshi'],
  ['channel.html#food', 'channel food'],
  ['channel.html#weekend', 'channel weekend'],
  // ====== Article list + samples ======
  ['articles.html', 'artilces list (一级文章列表页)'],
  ['articles/series-01-杭州一日游路线推荐.html', 'article series-01'],
  ['articles/三潭印月-我的前世是根木葫芦.html', 'article 三潭印月'],
  ['articles/丝绸博物馆里的织女.html', 'article 丝绸'],
  ['articles/南宋-西湖文化.html', 'article 南宋'],
];

let ok = 0, fail = 0;
for (const [path, label] of tests) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const logs = [];
  page.on('pageerror', e => logs.push(e.message.slice(0,80)));
  try {
    const r = await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
    await page.waitForTimeout(2500);
    const body = await page.evaluate(() => document.body.innerText.replace(/\s+/g,' ').trim());
    const status = r ? r.status() : 0;
    const is404 = body.includes('Cannot GET') || body.includes('404') || status === 404;
    const isShort = body.length < 80;
    const hasError = logs.length > 0;
    if (is404 || isShort || hasError) {
      console.log(`FAIL ${label.padEnd(32)} st=${status} body=${body.length}c "${body.slice(0,60)}" ${logs.join(';')}`);
      fail++;
    } else {
      console.log(`OK   ${label.padEnd(32)} st=${status} body=${body.length}c`);
      ok++;
    }
  } catch (e) {
    console.log(`ERR  ${label.padEnd(32)} ${e.message.slice(0,60)}`);
    fail++;
  }
  await page.close();
}

await browser.close();
console.log(`\n==== ${ok} PASS / ${fail} FAIL / ${tests.length} total ====`);
