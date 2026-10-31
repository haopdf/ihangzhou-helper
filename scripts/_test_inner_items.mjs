import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

// Test inner items: multiple real IDs per channel + articles.html + individual articles
const tests = [
  // Multiple IDs per channel
  ['guzhen.html?id=tangqi', 'guzhen tangqi'],
  ['guzhen.html?id=wuzhen', 'guzhen wuzhen'],
  ['temple.html?id=lingyin', 'temple lingyin'],
  ['temple.html?id=faxi', 'temple faxi'],
  ['temple.html?id=jingci', 'temple jingci'],
  ['chaguan.html?id=chayaun', 'chaguan chayaun'],
  ['chaguan.html?id=longjing-teahouse', 'chaguan longjing-teahouse'],
  ['chaguan.html?id=si-chaguan', 'chaguan si-chaguan'],
  ['coffee.html?id=hu-pan', 'coffee hu-pan'],
  ['coffee.html?id=xiezilou', 'coffee xiezilou'],
  ['coffee.html?id=qingzhiwu', 'coffee qingzhiwu'],
  ['scenic.html?id=hu-pan-jing', 'scenic hu-pan-jing'],
  ['scenic.html?id=ling-yin', 'scenic ling-yin'],
  ['scenic.html?id=san-tan-yin-yue', 'scenic san-tan-yin-yue'],
  ['scenic.html?id=qu-yuan-he-feng', 'scenic qu-yuan-he-feng'],
  ['tea.html?id=shifeng', 'tea shifeng'],
  ['tea.html?id=anji', 'tea anji'],
  ['tea.html?id=puer', 'tea puer'],
  ['dessert.html?id=dingshenggao', 'dessert dingshenggao'],
  ['dessert.html?id=tiaotougao', 'dessert tiaotougao'],
  ['dessert.html?id=guihuatangou', 'dessert guihuatangou'],
  ['night-market.html?id=hefang', 'night-market hefang'],
  ['night-market.html?id=wulin', 'night-market wulin'],
  ['laozihao.html?id=kuiyuanguan', 'laozihao kuiyuanguan'],
  ['laozihao.html?id=huqingyutang', 'laozihao huqingyutang'],
  ['laozihao.html?id=wangxingji', 'laozihao wangxingji'],
  ['life.html?id=xiaofei', 'life xiaofei'],
  ['life.html?id=chuzufang', 'life chuzufang'],
  ['life.html?id=zhaopin', 'life zhaopin'],
  ['zhoumo.html?id=qinzi', 'zhoumo qinzi'],
  ['zhoumo.html?id=chayuan', 'zhoumo chayuan'],
  ['route.html?id=yiriyou', 'route yiriyou'],
  ['route.html?id=chuantan', 'route chuantan'],
  ['food.html?id=housixi', 'food housixi'],
  ['food.html?id=songxiaoyu', 'food songxiaoyu'],
  ['traffic.html?id=chuzuche', 'traffic chuzuche'],
  ['traffic.html?id=niuche', 'traffic niuche'],
  ['celebrity.html?id=bai-juyi', 'celebrity bai-juyi'],
  ['celebrity.html?id=sushi', 'celebrity sushi'],
  ['story.html?id=baishe', 'story baishe'],
  ['story.html?id=nanbei', 'story nanbei'],
  ['museum.html?id=zhemo', 'museum zhemo'],
  ['museum.html?id=sichou', 'museum sichou'],
  ['gujian.html?id=hu-garden', 'gujian hu-garden'],
  ['gujian.html?id=sandapi', 'gujian sandapi'],
  ['intangible.html?id=hanghua', 'intangible hanghua'],
  ['intangible.html?id=silk', 'intangible silk'],
  ['tushuguan.html?id=zhejiang-tushuguan', 'tushuguan zhejiang'],
  ['xiangxiang.html?id=xiaoxi', 'xiangxiang xiaoxi'],
  ['xiangxiang.html?id=zhuantou', 'xiangxiang zhuantou'],
  ['breakfast.html?id=banmian', 'breakfast banmian'],
  ['breakfast.html?id=miantiao', 'breakfast miantiao'],
  ['hangbang.html?id=xihu-cuyu', 'hangbang xihu-cuyu'],
  ['hangbang.html?id=songbao', 'hangbang songbao'],
  ['district.html?id=xihu', 'district xihu'],
  ['district.html?id=binjiang', 'district binjiang'],
  ['around.html?id=wuzhen', 'around wuzhen'],
  ['banshi.html?id=hukou', 'banshi hukou'],
  ['banshi.html?id=butie', 'banshi butie'],
  ['channel.html#banshi', 'channel banshi'],
  ['channel.html#food', 'channel food'],
  ['channel.html#weekend', 'channel weekend'],
  // Articles listing
  ['articles.html', 'ARTICLES list page'],
  // Individual articles
  ['articles/series-01-杭州一日游路线推荐.html', 'ARTICLE series-01'],
  ['articles/三潭印月-我的前世是根木葫芦.html', 'ARTICLE 三潭印月'],
  ['articles/南宋-西湖文化.html', 'ARTICLE 南宋西湖'],
  ['articles/丝绸博物馆里的织女.html', 'ARTICLE 丝绸博物馆'],
  ['articles/优化版-吴山天风-登高望远-城市天际线.html', 'ARTICLE 吴山天风'],
  ['articles/余华-活着-中传统文化的现代转化.html', 'ARTICLE 余华'],
];

let ok = 0, chk = 0;
for (const [path, label] of tests) {
  try {
    const resp = await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'networkidle', timeout: 12000 });
    await page.waitForTimeout(1500);
    const status = resp.status();
    const body = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
    const hasContent = body.length > 80;
    const hasError = body.includes('Cannot GET') || body.includes('404') || status === 404;
    const symbol = hasError ? 'FAIL' : (hasContent ? 'OK ' : '?? ');
    console.log(`${symbol} ${label.padEnd(28)} ${path.padEnd(45)} ${status} body=${body.length}c "${body.slice(0, 50)}"`);
    if (!hasError && hasContent) ok++; else chk++;
  } catch (e) {
    console.log(`ERR ${label.padEnd(28)} ${path.padEnd(45)} ${e.message.slice(0, 50)}`);
    chk++;
  }
}

await browser.close();
console.log(`\n${ok} PASS / ${chk} FAIL-CHECK / ${tests.length} total`);
