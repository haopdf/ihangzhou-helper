/* 一次性批处理：修复 5 个数据文件中的 U+FFFD 乱码（依据条目自身上下文还原，不猜的内容用安全通用表述） */
const fs = require('fs');
const path = require('path');
const root = '/Users/asind/PycharmProjects/ihangzhou-helper';
const FFFD = '\uFFFD';

const jobs = [
  // coffee：类目emoji按同级条目风格补齐；蔦屋→茑屋（天目里TSUTAYA官方中文名）；\%→%转义残留
  ['js/coffee-data.js', [
    ["category: '" + FFFD + " 景观'", "category: '\uD83C\uDFDE️ 景观'"],
    ["category: '" + FFFD + " 校园'", "category: '\uD83C\uDF93 校园'"],
    ["category: '" + FFFD + "️ 山景'", "category: '\u26F0️ 山景'"],
    ["category: '" + FFFD + "️ 新地标'", "category: '\uD83C\uDFD9️ 新地标'"],
    [FFFD + '屋书店、\\% Arabica', '茑屋书店、% Arabica'],
    ["'" + FFFD + "屋书店'", "'茑屋书店'"],
  ]],
  // laozihao：杭帮菜；孙大生（key+history印证）；朱府铜（history印证）；副标题用安全表述
  ['js/laozihao-data.js', [
    ["badge: '[" + FFFD + "帮菜]'", "badge: '[杭帮菜]'"],
    ["'西湖边 · " + FFFD + "帮菜殿堂'", "'西湖边 · 杭帮菜殿堂'"],
    ["name: '" + FFFD + "大" + FFFD + "生'", "name: '孙大生'"],
    ["'" + FFFD + "剪刀 · " + FFFD + "人生'", "'手工剪刀 · 匠心人生'"],
    ["name: '" + FFFD + "府铜'", "name: '朱府铜'"],
    ["'丝织像 · " + FFFD + "艺品'", "'丝织像 · 工艺品'"],
  ]],
  // scenic：类目emoji按同级多数条目补齐
  ['js/scenic-data.js', [
    ["category: '" + FFFD + " 经典'", "category: '\uD83C\uDFDB️ 经典'"],
    ["category: '" + FFFD + " 西湖十景'", "category: '\uD83C\uDF38 西湖十景'"],
    ["category: '" + FFFD + "️ 经典'", "category: '\uD83C\uDFDB️ 经典'"],
  ]],
  // tea：上城埭（龙坞真实村名）；千岛湖badge；径山茶为绿茶
  ['js/tea-data.js', [
    ["{n:'上城" + FFFD + "'", "{n:'上城埭'"],
    ["badge: '" + FFFD + "️', area: '淳安县千岛湖'", "badge: '\uD83C\uDFDD️', area: '淳安县千岛湖'"],
    ["badge: '[" + FFFD + "茶]'", "badge: '[绿茶]'"],
  ]],
  // zhoumo：十里琅珰（同行history文本印证）
  ['js/zhoumo-data.js', [
    ["'十里琅" + FFFD + "'", "'十里琅珰'"],
  ]],
];

let fail = 0;
for (const [file, pairs] of jobs) {
  const p = path.join(root, file);
  let src = fs.readFileSync(p, 'utf8');
  for (const [from, to] of pairs) {
    const n = src.split(from).length - 1;
    if (n < 1) { console.log('MISS(0次):', file, JSON.stringify(from)); fail++; continue; }
    src = src.split(from).join(to);
    console.log('OK x' + n + ':', file, JSON.stringify(from.slice(0, 24)));
  }
  fs.writeFileSync(p, src);
}
// 复查：不允许再有 U+FFFD
for (const [file] of jobs) {
  const src = fs.readFileSync(path.join(root, file), 'utf8');
  const left = src.split(FFFD).length - 1;
  if (left) { console.log('STILL-CORRUPT:', file, left); fail++; }
}
console.log(fail ? 'FAILED' : 'ALL-DONE');
process.exit(fail ? 1 : 0);
