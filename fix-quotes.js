// 第二轮修复 places.json 中 content 字段里的英文双引号
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'places.json');
let raw = fs.readFileSync(filePath, 'utf8');

// 反复替换，直到 JSON 能解析
function fixQuotes(s) {
  // 替换 故名"x" 为 故名「x」
  s = s.replace(/故"([^"]{1,30})"([。，])/g, '故「$1」$2');
  s = s.replace(/名"([^"]{1,30})"([。，])/g, '名「$1」$2');
  s = s.replace(/称"([^"]{1,30})"([。，])/g, '称「$1」$2');
  s = s.replace(/为"([^"]{1,30})"([。，])/g, '为「$1」$2');
  s = s.replace(/题"([^"]{1,30})"([。，])/g, '题「$1」$2');
  s = s.replace(/构"([^"]{1,30})"([。，])/g, '构「$1」$2');
  s = s.replace(/。"([^"]{1,30})"([。，])/g, '。「$1」$2');
  s = s.replace(/，"([^"]{1,30})"([。，])/g, '，「$1」$2');
  s = s.replace(/："([^"]{1,30})"([。，])/g, '：「$1」$2');
  // 通配：任意中文字符紧邻的 "x" 替换为「x」
  s = s.replace(/([\u4e00-\u9fa5])"([^"]{1,20})"([\u4e00-\u9fa5。，])/g, '$1「$2」$3');
  s = s.replace(/([\u4e00-\u9fa5])"([^"]{1,20})"([\u4e00-\u9fa5。，])/g, '$1「$2」$3');
  s = s.replace(/([\u4e00-\u9fa5])"([^"]{1,20})"([\u4e00-\u9fa5。，])/g, '$1「$2」$3');
  return s;
}

// 多轮处理
for (var i = 0; i < 10; i++) {
  var before = raw;
  raw = fixQuotes(raw);
  if (raw === before) {
    console.log('第 ' + (i + 1) + ' 轮无变化');
    break;
  }
}

// 尝试解析
var ok = false;
try {
  JSON.parse(raw);
  ok = true;
  console.log('JSON 解析成功');
} catch (e) {
  console.log('解析失败：', e.message);
  var posMatch = e.message.match(/position (\d+)/);
  if (posMatch) {
    var pos = parseInt(posMatch[1], 10);
    console.log('位置附近内容：');
    console.log(raw.substring(Math.max(0, pos - 80), pos + 80));
  }
}

fs.writeFileSync(filePath, raw, 'utf8');
console.log('已写入');
