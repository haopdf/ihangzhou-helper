/**
 * 更新 cat.data.js 中 news/banshi 三级条目 URL
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataFile = path.join(rootDir, 'js/cat-data.js');
let content = fs.readFileSync(dataFile, 'utf8');

const BANSHI_NAMES = {
  shebao: '社保查询', gjj: '公积金', luohu: '落户', jiaotong: '出行交通',
  quxian: '区县导航', cheliang: '车辆服务', dianhua: '常用电话', gongju: '实用工具'
};
const BANSHI_PAGES = {
  shebao: 'sub/banshi-shebao.html', gjj: 'sub/banshi-gjj.html',
  luohu: 'sub/banshi-luohu.html', jiaotong: 'sub/banshi-jiaotong.html',
  quxian: 'sub/banshi-quxian.html', cheliang: 'sub/banshi-cheliang.html',
  dianhua: 'sub/banshi-dianhua.html', gongju: 'sub/banshi-gongju.html',
};

const NEWS_NAMES = {
  zhengce: '民生政策', butie: '消费补贴', huodong: '活动汇总',
  xianxing: '今日限行', tianqi: '天气预警', youjia: '油价查询',
  wxfeed: '公众号精选', all: '全部文章'
};
const NEWS_PAGES = {
  zhengce: 'sub/news-zhengce.html', butie: 'sub/news-butie.html',
  huodong: 'sub/news-huodong.html', xianxing: 'sub/news-xianxing.html',
  tianqi: 'sub/news-tianqi.html', youjia: 'sub/news-youjia.html',
  wxfeed: 'sub/news-wxfeed.html', all: 'articles.html',
};

const GENERIC_PAGES = ['articles.html','life.html','zhoumo.html','food.html','traffic.html','around.html','weekend.html','internet.html'];

let totalReplaced = 0;

// 找到一级栏目下 subs 数组的内容
function extractSubsBlock(text, catKey) {
  const headerRe = new RegExp("k:\\s*'" + catKey + "'[\\s\\S]*?subs:\\s*\\[\\n");
  const m = text.match(headerRe);
  if (!m) return null;
  
  const start = m.index + m[0].length;
  // 跟踪 [ ] 和 { } 的嵌套来找到匹配 ];
  let bdepth = 1; // bracket depth
  let cdepth = 0; // curly depth
  let i = start;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '[') bdepth++;
    else if (ch === ']') {
      bdepth--;
      if (bdepth === 0) {
        // 确保这是 subs 的结束（后面跟 ; 或 ,\n）
        // 实际上只需要返回位置即可
        return { start, end: i + 1 };
      }
    }
    else if (ch === '{') cdepth++;
    else if (ch === '}') cdepth--;
    i++;
  }
  return null;
}

// 获取所有 sub 名在 text 中出现的位置
function getSubPositions(text, nameMap) {
  const positions = [];
  Object.keys(nameMap).forEach(function(key) {
    const re = new RegExp("n:\\s*'" + nameMap[key] + "'");
    const m = text.match(re);
    if (m) positions.push({ key: key, name: nameMap[key], pos: m.index });
  });
  positions.sort(function(a, b) { return a.pos - b.pos; });
  return positions;
}

// -- 处理 banshi --
const banshiBlock = extractSubsBlock(content, 'banshi');
if (banshiBlock) {
  const subsText = content.substring(banshiBlock.start, banshiBlock.end);
  const positions = getSubPositions(subsText, BANSHI_NAMES);
  let newSubsText = subsText;
  
  for (let i = positions.length - 1; i >= 0; i--) {
    const p = positions[i];
    const subStart = p.pos;
    const subEnd = i + 1 < positions.length ? positions[i + 1].pos : newSubsText.length;
    let subBlock = newSubsText.substring(subStart, subEnd);
    
    const oldLink = "'banshi.html'";
    if (subBlock.indexOf(oldLink) >= 0) {
      const count = (subBlock.split(oldLink).length - 1);
      totalReplaced += count;
      subBlock = subBlock.split(oldLink).join("'" + BANSHI_PAGES[p.key] + "'");
    }
    
    newSubsText = newSubsText.substring(0, subStart) + subBlock + newSubsText.substring(subEnd);
  }
  
  content = content.substring(0, banshiBlock.start) + newSubsText + content.substring(banshiBlock.end);
}

// -- 处理 news --
const newsBlock = extractSubsBlock(content, 'news');
if (newsBlock) {
  const subsText = content.substring(newsBlock.start, newsBlock.end);
  const positions = getSubPositions(subsText, NEWS_NAMES);
  let newSubsText = subsText;
  
  for (let i = positions.length - 1; i >= 0; i--) {
    const p = positions[i];
    const subStart = p.pos;
    const subEnd = i + 1 < positions.length ? positions[i + 1].pos : newSubsText.length;
    let subBlock = newSubsText.substring(subStart, subEnd);
    
    GENERIC_PAGES.forEach(function(gpage) {
      const target = "'" + gpage + "'";
      if (subBlock.indexOf(target) >= 0) {
        const count = (subBlock.split(target).length - 1);
        totalReplaced += count;
        subBlock = subBlock.split(target).join("'" + NEWS_PAGES[p.key] + "'");
      }
    });
    
    newSubsText = newSubsText.substring(0, subStart) + subBlock + newSubsText.substring(subEnd);
  }
  
  content = content.substring(0, newsBlock.start) + newSubsText + content.substring(newsBlock.end);
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log('共替换 ' + totalReplaced + ' 个链接');
console.log('已更新: js/cat-data.js');
