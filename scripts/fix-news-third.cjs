/**
 * 修复 news/banshi 三级条目链接：让每个三级条目指向具体目标而非全部指向二级页
 * 
 * 对于 news 子栏目，三级条目应该：
 * - 有具体内部页面的 → 指向该页面
 * - 没有具体页面的 → 使用 articles.html?q=标题 搜索
 * - 外部链接 → 保持不变
 * - banshi.html?id= → 保持不变
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'js/cat-data.js');
let content = fs.readFileSync(dataFile, 'utf8');

// 为每个 news 子栏目的三级条目提供精确链接映射
// 格式: { '子栏目名': { '三级条目标题': '目标URL' } }
const NEWS_THIRD_LINKS = {
  '民生政策': {
    '社保新政': 'articles.html?q=社保+新政',
    '公积金调整': 'sub/banshi-gjj.html',
    '住房政策': 'articles.html?q=杭州+住房政策',
    '教育新政': 'articles.html?q=杭州+教育',
    '就业补贴': 'articles.html?q=就业补贴',
    '税费调整': 'articles.html?q=税费+政策',
  },
  '消费补贴': {
    '消费券': 'articles.html?q=杭州+消费券',
    '家电换新': 'articles.html?q=以旧换新+家电',
    '汽车补贴': 'articles.html?q=汽车+补贴',
    '家装补贴': 'articles.html?q=家装+补贴',
    '发票抽奖': 'articles.html?q=发票抽奖',
    '文旅消费券': 'articles.html?q=文旅+消费券',
    '餐饮消费券': 'articles.html?q=餐饮+消费券',
    '数字人民币': 'articles.html?q=数字人民币',
  },
  '活动汇总': {
    '国庆活动': 'articles.html?q=国庆+杭州',
    '灯光秀': 'articles.html?q=灯光秀+杭州',
    '音乐节': 'articles.html?q=音乐节+杭州',
    '展览': 'weekend.html?id=zhanluan',
    '市集': 'weekend.html?id=shiji',
    '灯会': 'articles.html?q=灯会+杭州',
    '演出': 'weekend.html?id=yanchang',
    '赏花季': 'zhoumo.html',
  },
  '今日限行': {
    '今日限行': '#act:xianxing',
    '限行日历': '#act:xianxing',
    '外地车牌': '#act:xianxing',
    '公交地铁': 'traffic.html',
    '停车攻略': 'banshi.html?id=cheliang-tingche',
    '违章处理': '#act:xianxing',
    '施工路段': '#act:xianxing',
    '打车出行': '#act:xianxing',
  },
  '天气预警': {
    '实时天气': '#act:weather',
    '7 日预报': '#act:weather',
    '暴雨预警': '#act:weather',
    '台风路径': '#act:weather',
    '高温预警': '#act:weather',
    '寒潮预警': '#act:weather',
    '穿衣指数': '#act:weather',
    '空气质量': '#act:weather',
  },
  '油价查询': {
    '今日油价': '#act:youjia',
    '调价窗口': '#act:youjia',
    '加油省钱': 'traffic.html',
    '充电桩': 'traffic.html',
    '油耗对比': 'traffic.html',
    '高速免费': 'banshi.html?id=cheliang-nianjian',
    '电子发票': '#act:youjia',
    '加油优惠': 'traffic.html',
  },
  '公众号精选': {
    '今日杭州': 'articles.html',
    '限行提醒': 'sub/news-xianxing.html',
    '油价速报': 'sub/news-youjia.html',
    '政策解读': 'sub/news-zhengce.html',
    '活动推荐': 'sub/news-huodong.html',
    '美食攻略': 'food.html',
    '周末去哪': 'zhoumo.html',
    '全部文章': 'articles.html',
  },
};

// bansi 三级条目精确链接（仅替换纯 banshi.html，保留有 ?id= 的）
const BANSHI_THIRD_LINKS = {
  '社保查询': {
    '社保查询': 'sub/banshi-shebao.html',
    '医保报销': 'banshi.html?id=shebao-yibao',
  },
  '公积金': {
    '余额查询': 'sub/banshi-gjj.html',
    '租房提取': 'banshi.html?id=gjj',
  },
  '落户': {
    '人才引进': 'sub/banshi-luohu.html',
  },
};

// 辅助函数：在指定文本中找到每个 news sub 并替换其 th 条目
function findSubsArray(text, catKey) {
  const re = new RegExp("k:\\s*'" + catKey + "'[\\s\\S]*?subs:\\s*\\[\\n");
  const m = text.match(re);
  if (!m) return null;
  const start = m.index + m[0].length;
  let depth = 1, i = start;
  while (i < text.length && depth > 0) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') depth--;
    i++;
  }
  return { start, end: i };
}

function findSubBlock(text, subName) {
  const re = new RegExp("n:\\s*'" + subName + "'");
  const m = text.match(re);
  return m ? m.index : -1;
}

let totalReplaced = 0;

// 处理 news
const newsBlock = findSubsArray(content, 'news');
if (newsBlock) {
  let subsText = content.substring(newsBlock.start, newsBlock.end);
  const origSubs = subsText;
  
  Object.keys(NEWS_THIRD_LINKS).forEach(function(subName) {
    const itemMap = NEWS_THIRD_LINKS[subName];
    const subIdx = findSubBlock(subsText, subName);
    if (subIdx < 0) return;
    
    // 找下一个 sub
    let nextSubIdx = subsText.length;
    Object.keys(NEWS_THIRD_LINKS).forEach(function(name) {
      if (name === subName) return;
      const idx = findSubBlock(subsText, name);
      if (idx > subIdx && idx < nextSubIdx) nextSubIdx = idx;
    });
    
    let subBlock = subsText.substring(subIdx, nextSubIdx);
    const origBlock = subBlock;
    
    Object.keys(itemMap).forEach(function(title) {
      // 在子块中找 "['xxx', '标题', '旧链接']" 并替换
      // 用更灵活的模式匹配
      const pattern = "('" + title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "',\\s*')[^']*?'";
      const re = new RegExp(pattern);
      if (re.test(subBlock)) {
        subBlock = subBlock.replace(re, "$1" + itemMap[title] + "'");
        totalReplaced++;
      }
    });
    
    subsText = subsText.substring(0, subIdx) + subBlock + subsText.substring(nextSubIdx);
  });
  
  content = content.replace(origSubs, subsText);
}

// 处理 banshi - 精确替换主要默认入口
const banshiBlock = findSubsArray(content, 'banshi');
if (banshiBlock) {
  let subsText = content.substring(banshiBlock.start, banshiBlock.end);
  const origSubs = subsText;
  
  Object.keys(BANSHI_THIRD_LINKS).forEach(function(subName) {
    const itemMap = BANSHI_THIRD_LINKS[subName];
    const subIdx = findSubBlock(subsText, subName);
    if (subIdx < 0) return;
    
    let nextSubIdx = subsText.length;
    Object.keys(BANSHI_THIRD_LINKS).forEach(function(name) {
      if (name === subName) return;
      const idx = findSubBlock(subsText, name);
      if (idx > subIdx && idx < nextSubIdx) nextSubIdx = idx;
    });
    
    let subBlock = subsText.substring(subIdx, nextSubIdx);
    const origBlock = subBlock;
    
    Object.keys(itemMap).forEach(function(title) {
      const pattern = "('" + title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "',\\s*')[^']*?'";
      const re = new RegExp(pattern);
      if (re.test(subBlock)) {
        subBlock = subBlock.replace(re, "$1" + itemMap[title] + "'");
        totalReplaced++;
      }
    });
    
    subsText = subsText.substring(0, subIdx) + subBlock + subsText.substring(nextSubIdx);
  });
  
  content = content.replace(origSubs, subsText);
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('精确替换 ' + totalReplaced + ' 个三级条目链接');
