import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

// Real URLs with valid IDs from each data file
const pages = [
  // 古镇
  ['guzhen.html?id=wuzhen', '01-guzhen-wuzhen'],
  ['guzhen.html?id=xitang', '02-guzhen-xitang'],
  // 寺庙
  ['temple.html?id=lingyin', '03-temple-lingyin'],
  ['temple.html?id=faxi', '04-temple-faxi'],
  // 茶馆
  ['chaguan.html?id=chayaun', '05-chaguan-chayaun'],
  ['chaguan.html?id=hu-pan-teahouse', '06-chaguan-hupan'],
  // 咖啡
  ['coffee.html?id=hu-pan', '07-coffee-hupan'],
  ['coffee.html?id=xiezilou', '08-coffee-xiezilou'],
  // 夜市
  ['night-market.html?id=hehuai', '09-nightmarket-hehuai'],
  ['night-market.html?id=gongchenqiao', '10-nightmarket-gongchen'],
  // 景区
  ['scenic.html?id=qiandao', '11-scenic-qiandao'],
  ['scenic.html?id=lingqi', '12-scenic-lingqi'],
  // 龙井茶
  ['tea.html?id=anji', '13-tea-anji'],
  ['tea.html?id=puer', '14-tea-puer'],
  // 甜品
  ['dessert.html?id=xihujian', '15-dessert-xihujian'],
  ['dessert.html?id=pianchuan', '16-dessert-pianchuan'],
  // 老字号
  ['laozihao.html?id=zhizhi', '17-laozihao-zhizhi'],
  ['laozihao.html?id=huqingyutang', '18-laozihao-huqing'],
  ['laozihao.html?id=wangxingji', '19-laozihao-wangxing'],
  // 生活办事
  ['life.html?id=banshi', '20-life-banshi'],
  ['life.html?id=chuzufang', '21-life-chuzufang'],
  // 周末
  ['zhoumo.html?id=l列斯', '22-zhoumo-l列斯'],
  ['zhoumo.html?id=qinzi', '23-zhoumo-qinzi'],
  // 路线
  ['route.html?id=xihu', '24-route-xihu'],
  ['route.html?id=chuantan', '25-route-chuantan'],
  // 乡巷
  ['xiangxiang.html?id=tangxi', '26-xiangxiang-tangxi'],
  ['xiangxiang.html?id=zhuantou', '27-xiangxiang-zhuantou'],
  // 杭帮菜
  ['hangbang.html?id=dajiang', '28-hangbang-dajiang'],
  ['hangbang.html?id=songbao', '29-hangbang-songbao'],
  // 早餐
  ['breakfast.html?id=xiaolongbao', '30-breakfast-xiaolongbao'],
  ['breakfast.html?id=miantiao', '31-breakfast-miantiao'],
  // 历史
  ['history.html?id=nantang', '32-history-nantang'],
  ['history.html?id=mingtang', '33-history-mingtang'],
  // 街巷
  ['street.html?id=hefang', '34-street-hefang'],
  ['street.html?id=nanshan', '35-street-nanshan'],
  // 博物馆
  ['museum.html?id=zhejiang', '36-museum-zhejiang'],
  ['museum.html?id=sichou', '37-museum-sichou'],
  // 古今
  ['gujian.html?id=liangchu', '38-gujian-liangchu'],
  ['gujian.html?id=sandapi', '39-gujian-sandapi'],
  // 非遗
  ['intangible.html?id=jingtai', '40-intangible-jingtai'],
  ['intangible.html?id=silk', '41-intangible-silk'],
  // 名人
  ['celebrity.html?id=dongpo', '42-celebrity-dongpo'],
  ['celebrity.html?id=baijuyi', '43-celebrity-baijuyi'],
  // 故事
  ['story.html?id=qiantang', '44-story-qiantang'],
  ['story.html?id=nanbei', '45-story-nanbei'],
  // 图书馆
  ['tushuguan.html?id=zhejiang', '46-tushuguan-zhejiang'],
  ['tushuguan.html?id=shanghai', '47-tushuguan-shanghai'],
  // 区政
  ['district.html?id=xihu', '48-district-xihu'],
  ['district.html?id=binjiang', '49-district-binjiang'],
  // 周边
  ['around.html?id=chunan', '50-around-chunan'],
  ['around.html?id=yuhang', '51-around-yuhang'],
  // 美食
  ['food.html?id=housixi', '52-food-housixi'],
  ['food.html?id=songxiaoyu', '53-food-songxiaoyu'],
  // 交通
  ['traffic.html?id=chuzuche', '54-traffic-chuzuche'],
  ['traffic.html?id=niuche', '55-traffic-niuche'],
  // 办事
  ['banshi.html?id=hukou', '56-banshi-hukou'],
  ['banshi.html?id=butie', '57-banshi-butie'],
  // 频道
  ['channel.html#banshi', '58-channel-banshi'],
  ['channel.html#food', '59-channel-food'],
  ['channel.html#weekend', '60-channel-weekend'],
  // 首页
  ['index.html', '61-index'],
];

const outdir = '/Users/asind/PycharmProjects/ihangzhou-helper/scripts/_test_shots';
fs.mkdirSync(outdir, { recursive: true });

let pass = 0, fail = 0;
for (const [path, label] of pages) {
  try {
    await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    const outfile = `${outdir}/${label}.png`;
    await page.screenshot({ path: outfile, fullPage: false });
    const sz = fs.statSync(outfile).size;
    if (sz < 5000) {
      console.log(`MAYBE-EMPTY ${label}  ${(sz/1024).toFixed(0)}KB  ${path}`);
      fail++;
    } else {
      console.log(`OK  ${label}  ${(sz/1024).toFixed(0)}KB  ${path}`);
      pass++;
    }
  } catch (e) {
    console.log(`ERR ${label}  ${e.message.slice(0, 80)}`);
    fail++;
  }
}

await browser.close();
console.log(`\n----- ${pass} OK / ${fail} FAIL / ${pages.length} total -----`);
