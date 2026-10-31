/* 站点核心数据文件最后 30 处 FFFD 修复 */
const fs = require('fs');
const ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper';
const F = '\uFFFD', V = '\uFE0F';
const R = [
  // ── js/cat-data.js（1）──
  ['js/cat-data.js', `['${F}', '加油充电', 'life.html?id=shenghuo']`, `['⛽', '加油充电', 'life.html?id=shenghuo']`],
  // ── js/chaguan-data.js（12）──
  ['js/chaguan-data.js', `subtitle: '龙井${F}区·山边茶馆'`, `subtitle: '龙井茶区·山边茶馆'`],
  ['js/chaguan-data.js', `spots: [{n:'${F}家坞',d:'原产保护地'}]`, `spots: [{n:'梅家坞',d:'原产保护地'}]`],
  ['js/chaguan-data.js', `subtitle: '满${F}陇路·高海拔'`, `subtitle: '满觉陇路·高海拔'`],
  ['js/chaguan-data.js', `name: '思${F}茶馆'`, `name: '文艺茶馆'`],
  ['js/chaguan-data.js', `history: '思${F}茶馆等品牌走文艺路线，虽在龙井外环境雅致，做年轻茶客生意。'`, `history: '一批独立茶馆品牌走文艺路线，虽不在龙井核心产区，环境雅致，做年轻茶客生意。'`],
  ['js/chaguan-data.js', `spots: [{n:'${F}自品牌茶空间',d:'文艺茶室'}]`, `spots: [{n:'独立品牌茶空间',d:'文艺茶室'}]`],
  ['js/chaguan-data.js', `不少本地人从不${F}南山路。`, `不少本地人也爱来这儿。`],
  ['js/chaguan-data.js', `name: '河坊品${F}'`, `name: '河坊品茗'`],
  ['js/chaguan-data.js', `均有${F}山天风景致`, `均有吴山天风景致`],
  ['js/chaguan-data.js', `name: '运河茶${F}'`, `name: '运河茶馆'`],
  ['js/chaguan-data.js', `茶叶${F}藏、交流在此形成圈子`, `茶叶收藏、交流在此形成圈子`],
  ['js/chaguan-data.js', `features: ['茶叶${F}藏','茶文化','茶圈交流','鉴茶培训']`, `features: ['茶叶收藏','茶文化','茶圈交流','鉴茶培训']`],
  // ── js/dessert-data.js（8）──
  ['js/dessert-data.js', `name: '定胜糕',\n    subtitle: '南宋传统 · 粉红吉祥',\n    badge: '${F}',`, `name: '定胜糕',\n    subtitle: '南宋传统 · 粉红吉祥',\n    badge: '🍥',`],
  ['js/dessert-data.js', `因"定胜"谐音"${F}锤"，糕体以模具压成`, `糕体以模具压成`],
  ['js/dessert-data.js', `name: '麻团',\n    subtitle: '外酥内软 · 满口芝麻香',\n    badge: '${F}',`, `name: '麻团',\n    subtitle: '外酥内软 · 满口芝麻香',\n    badge: '🟤',`],
  ['js/dessert-data.js', `subtitle: '木${F}芬芳 · 软糯 Q 弹',\n    badge: '${F}',`, `subtitle: '木樨芬芳 · 软糯 Q 弹',\n    badge: '🌸',`],
  ['js/dessert-data.js', `name: '江南甜糯点心',\n    subtitle: '糯米控的天堂',\n    badge: '${F}',`, `name: '江南甜糯点心',\n    subtitle: '糯米控的天堂',\n    badge: '🍡',`],
  ['js/dessert-data.js', `name: '中秋食俗',\n    subtitle: '桂花几时有',\n    badge: '${F}',`, `name: '中秋食俗',\n    subtitle: '桂花几时有',\n    badge: '🌕',`],
  ['js/dessert-data.js', `name: '龙井茶食',\n    subtitle: '以茶入点 · 清香雅韵',\n    badge: '${F}',`, `name: '龙井茶食',\n    subtitle: '以茶入点 · 清香雅韵',\n    badge: '🍵',`],
  // ── js/intangible-data.js（4）──
  ['js/intangible-data.js', `badge: '${F}${V} 传统技艺'`, `badge: '☂️ 传统技艺'`],
  ['js/intangible-data.js', `喜花则剪字"${F}"与鸳鸯蝴蝶`, `喜花则剪字"囍"与鸳鸯蝴蝶`],
  ['js/intangible-data.js', `badge: '${F} 民俗节日'`, `badge: '🌕 民俗节日'`],
  ['js/intangible-data.js', `杭人以月饼、芋${F}、菱角佐酒`, `杭人以月饼、芋艿、菱角佐酒`],
  // ── js/temple-data.js（3）──
  ['js/temple-data.js', `name: '灵隐寺', subtitle: '江南禅宗五山', badge: '${F}${V}'`, `name: '灵隐寺', subtitle: '江南禅宗五山', badge: '⛩️'`],
  ['js/temple-data.js', `name: '径山寺', subtitle: '日本茶道源头', badge: '${F}'`, `name: '径山寺', subtitle: '日本茶道源头', badge: '🍵'`],
  ['js/temple-data.js', `name: '韬光寺', subtitle: '登高望湖', badge: '${F}${V}'`, `name: '韬光寺', subtitle: '登高望湖', badge: '🏔️'`],
  // ── js/tide-data.js（2）──
  ['js/tide-data.js', `name: '下沙七格', subtitle: '杭州城东 · 就近看潮', badge: '${F}${V}'`, `name: '下沙七格', subtitle: '杭州城东 · 就近看潮', badge: '🌊'`],
  ['js/tide-data.js', `name: '老盐仓', subtitle: '回头潮 · 冲天潮', badge: '${F}'`, `name: '老盐仓', subtitle: '回头潮 · 冲天潮', badge: '🌀'`],
];
let ok = 0; const miss = [];
const cache = {};
for (const [file, find, rep] of R) {
  const p = ROOT + '/' + file;
  if (!cache[file]) cache[file] = fs.readFileSync(p, 'utf8');
  const n = cache[file].split(find).length - 1;
  if (n === 0) { miss.push(file + ' :: ' + JSON.stringify(find.slice(0, 60))); continue; }
  cache[file] = cache[file].split(find).join(rep);
  ok += n;
}
for (const [file, txt] of Object.entries(cache)) fs.writeFileSync(ROOT + '/' + file, txt, 'utf8');
console.log('REPLACED=' + ok + ' MISSED=' + miss.length);
miss.forEach(m => console.log('  MISS ' + m));
