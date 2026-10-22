const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const subDir = path.join(rootDir, 'sub');

/* ============================================
   1. 一级栏目映射
   ============================================ */
const CAT_HOME = {
  travel:   'travel.html',
  food:     'food.html',
  culture:  'bowuguan.html',
  banshi:   'banshi.html',
  zhaopin:  'zhaopin.html',
  news:     'articles.html',
  shopping: 'street.html',
  life:     'life.html',
  my:       'index.html',
  weekend:  'weekend.html',
  tea:      'tea.html'
};

/* ============================================
   2. 二级栏目映射（全量）
   ============================================ */
const SUB_MAP = {
  'travel|景点门票': 'scenic.html',
  'travel|周边游': 'zhoubian.html',
  'travel|周末去哪': 'weekend.html',
  'travel|街巷漫步': 'xiangxiang.html',
  'travel|路线攻略': 'route.html',
  'travel|钱塘江观潮': 'tide.html',
  'travel|西湖十景': 'sub/travel-xihu.html',
  'travel|古镇古村': 'sub/travel-guzhen.html',
  'food|杭帮菜': 'food.html',
  'food|咖啡': 'coffee.html',
  'food|老字号': 'laozihao.html',
  'food|夜市': 'night-market.html',
  'food|早餐': 'breakfast.html',
  'food|甜品': 'dessert.html',
  'food|龙井茶': 'tea.html',
  'food|茶馆': 'chaguan.html',
  'culture|博物馆': 'bowuguan.html',
  'culture|历史人文': 'history.html',
  'culture|杭州名人': 'celebrity.html',
  'culture|杭州故事': 'story.html',
  'culture|古镇古建': 'guzhen.html',
  'culture|非遗': 'intangible.html',
  'culture|寺庙': 'temple.html',
  'culture|图书馆': 'tushuguan.html',
  'banshi|社保查询': 'banshi.html',
  'banshi|公积金': 'banshi.html',
  'banshi|落户': 'banshi.html',
  'banshi|出行交通': 'traffic.html',
  'banshi|区县导航': 'district.html',
  'banshi|车辆服务': 'banshi.html',
  'banshi|常用电话': 'sub/banshi-dianhua.html',
  'banshi|实用工具': 'sub/banshi-gongju.html',
  'zhaopin|国企招聘': 'zhaopin.html',
  'zhaopin|事业单位': 'zhaopin.html',
  'zhaopin|名企招聘': 'zhaopin.html',
  'zhaopin|兼职实习': 'zhaopin.html',
  'zhaopin|人才认定': 'zhaopin.html',
  'zhaopin|互联网业': 'zhaopin.html',
  'zhaopin|简历面试': 'zhaopin.html',
  'zhaopin|劳动维权': 'zhaopin.html',
  'news|民生政策': 'articles.html',
  'news|消费补贴': 'articles.html',
  'news|活动汇总': 'weekend.html',
  'news|今日限行': 'sub/news-xianxing.html',
  'news|天气预警': 'sub/news-tianqi.html',
  'news|油价查询': 'sub/news-youjia.html',
  'news|公众号精选': 'articles.html',
  'news|全部文章': 'articles.html',
  'shopping|商圈逛街': 'street.html',
  'shopping|杭州特产': 'laozihao.html',
  'shopping|杭州好物': 'sub/shopping-haowu.html',
  'shopping|百年老店': 'laozihao.html',
  'shopping|咖啡地图': 'coffee.html',
  'shopping|夜宵夜市': 'night-market.html',
  'shopping|餐饮团购': 'sub/shopping-tuangou.html',
  'shopping|酒店预订': 'sub/shopping-jiudian.html',
  'my|我的收藏': 'index.html',
  'my|浏览历史': 'index.html',
  'my|每日签到': 'index.html',
  'my|意见反馈': 'index.html',
  'my|字体大小': 'index.html',
  'my|分享给朋友': 'index.html',
  'my|关于我们': 'index.html',
  'my|设置': 'index.html',
  'life|消费优惠': 'sub/life-xiaofei.html',
  'life|租房攻略': 'sub/life-zufang.html',
  'life|房产楼市': 'sub/life-fangchan.html',
  'life|商圈购物': 'sub/life-shangquan.html',
  'life|家装建材': 'sub/life-jiazhuang.html',
  'life|生活缴费': 'sub/life-shenghuo.html',
  'life|相亲交友': 'sub/life-xiangqin.html',
  'life|运动健身': 'sub/life-jianshen.html'
};

/* ============================================
   3. 构建完整替换表 [regex, replacement]
   ============================================ */
const replacements = [];

// 3a. 二级栏目链接 cat.html?c=X&s=Y（优先匹配长的）
Object.entries(SUB_MAP).forEach(([key, page]) => {
  const [catK, subN] = key.split('|');
  const encoded = encodeURIComponent(subN);
  // 两种参数顺序
  replacements.push([new RegExp('cat\\.html\\?c=' + catK + '&s=' + encoded, 'g'), page]);
  replacements.push([new RegExp('cat\\.html\\?s=' + encoded + '&c=' + catK, 'g'), page]);
});

// 3b. 一级栏目链接 cat.html?c=X
Object.entries(CAT_HOME).forEach(([k, page]) => {
  replacements.push([new RegExp('cat\\.html\\?c=' + k + '(?!&)', 'g'), page]);
});

// 3c. 纯 cat.html（不带参数）→ index.html
// 注意：cat.html 文件自身的 canonical 不替换（单独处理）
// 替换其他文件中的纯 cat.html 引用
replacements.push([new RegExp('["\']cat\\.html["\']', 'g'), '"index.html"']);
replacements.push([new RegExp('href=cat\\.html(?![?])', 'g'), 'href="index.html"']);

/* ============================================
   4. 处理每个文件
   ============================================ */
function processFile(filePath, isCatHtml) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = 0;

  if (isCatHtml) {
    // cat.html 本身：只替换 th 数组中指向自己的链接（精选内容等）
    // 一级二级链接保留（面包屑等内部导航）
    // 唯一的外部指向 cat.html 的是 featured content 链接
    for (const [key, page] of Object.entries(SUB_MAP)) {
      const [catK, subN] = key.split('|');
      const encoded = encodeURIComponent(subN);
      const re = new RegExp("(['\"])cat\\.html\\?c=" + catK + "&s=" + encoded + "\\1", 'g');
      if (re.test(html)) {
        html = html.replace(re, '$1' + page + '$1');
        changed++;
      }
    }
  } else {
    // 非 cat.html 文件：替换所有 cat.html 引用
    for (const [pattern, replacement] of replacements) {
      const before = html;
      html = html.replace(pattern, replacement);
      if (html !== before) changed++;
    }
  }

  if (changed > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
    return changed;
  }
  return 0;
}

// 处理根目录所有 HTML（排除 cat.html 自身）
const rootHtmls = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'cat.html');
let totalReplaced = 0;
let filesModified = 0;

rootHtmls.forEach(f => {
  const n = processFile(path.join(rootDir, f), false);
  if (n > 0) {
    console.log('  ' + f + ': ' + n + ' replacements');
    totalReplaced += n;
    filesModified++;
  }
});

// 处理 sub/ 目录所有 HTML
const subHtmls = fs.readdirSync(subDir).filter(f => f.endsWith('.html'));
subHtmls.forEach(f => {
  const n = processFile(path.join(subDir, f), false);
  if (n > 0) {
    console.log('  sub/' + f + ': ' + n + ' replacements');
    totalReplaced += n;
    filesModified++;
  }
});

// 处理 cat.html 自身（仅替换 featured 指向自己的链接）
const catN = processFile(path.join(rootDir, 'cat.html'), true);
if (catN > 0) {
  console.log('  cat.html (self-refs only): ' + catN + ' replacements');
  totalReplaced += catN;
  filesModified++;
}

// 处理 cat-data.js
let dataJs = fs.readFileSync(path.join(rootDir, 'js/cat-data.js'), 'utf8');
let dataChanged = 0;
for (const [key, page] of Object.entries(SUB_MAP)) {
  const [catK, subN] = key.split('|');
  const encoded = encodeURIComponent(subN);
  const re = new RegExp("(['\"])cat\\.html\\?c=" + catK + "&s=" + encoded + "\\1", 'g');
  if (re.test(dataJs)) {
    dataJs = dataJs.replace(re, '$1' + page + '$1');
    dataChanged++;
  }
}
if (dataChanged > 0) {
  fs.writeFileSync(path.join(rootDir, 'js/cat-data.js'), dataJs, 'utf8');
  console.log('  js/cat-data.js: ' + dataChanged + ' replacements');
  totalReplaced += dataChanged;
  filesModified++;
}

console.log('\n=== Summary ===');
console.log('Total replacements: ' + totalReplaced);
console.log('Files modified: ' + filesModified);

/* ============================================
   5. 最终检查：排除 cat.html 自身内部导航后，是否还有残留
   ============================================ */
console.log('\n=== Verification ===');
// 非 cat.html 文件中不应再有 cat.html 引用
let remaining = 0;
const allHtmls = [...rootHtmls, ...subHtmls.map(f => 'sub/' + f)];
allHtmls.forEach(f => {
  const filePath = path.join(rootDir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const re = /cat\.html\?/g;
  const matches = content.match(re);
  if (matches) {
    console.log('  REMAINING in ' + f + ': ' + matches.length + ' cat.html? links');
    remaining += matches.length;
  }
});
if (remaining === 0) {
  console.log('  All cat.html query links successfully removed from non-cat.html files!');
}
