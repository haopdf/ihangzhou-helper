/**
 * 修复所有 sub/ 页面的 layout.init() 调用
 * IHZ.layout.init() → IZ.layout.init()
 */
const fs = require('fs');
const path = require('path');

const subDir = path.join(__dirname, '..', 'sub');
const files = fs.readdirSync(subDir).filter(function(f) { return f.endsWith('.html'); });

let fixed = 0;

files.forEach(function(file) {
  const filePath = path.join(subDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.indexOf('IHZ.layout.init()') >= 0) {
    content = content.replace(/IHZ\.layout\.init\(\)/g, 'IZ.layout.init()');
    fs.writeFileSync(filePath, content, 'utf8');
    fixed++;
    console.log('  ✅ ' + file);
  }
});

console.log('\n共修复 ' + fixed + ' 个文件的 layout.init() 调用');
