/**
 * 为 sub/ 页面添加站点头部：
 * 1. 移除 IZ_SKIP_APP_INIT 和 IZ_SKIP_APP_THEME（阻止 layout.js 初始化）
 * 2. 在 </body> 前调用 IHZ.layout.init() 加载 header/footer 模板
 */
const fs = require('fs');
const path = require('path');

const subDir = path.join(__dirname, '..', 'sub');
const files = fs.readdirSync(subDir).filter(function(f) { return f.endsWith('.html'); });

let fixed = 0;

files.forEach(function(file) {
  const filePath = path.join(subDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const orig = content;
  
  // 1. 移除 IZ_SKIP_APP_INIT 和 IZ_SKIP_APP_THEME
  content = content.replace(/\s*window\.IZ_SKIP_APP_INIT\s*=\s*true;\s*/g, '\n');
  content = content.replace(/\s*window\.IZ_SKIP_APP_THEME\s*=\s*true;\s*/g, '\n');
  
  // 2. 在 </body> 前添加 IHZ.layout.init()
  if (content.indexOf('IHZ.layout.init()') < 0) {
    content = content.replace('</body>', '  <script>IHZ.layout.init();</script>\n</body>');
  }
  
  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixed++;
    console.log('  ✅ ' + file);
  }
});

console.log('\n共修复 ' + fixed + ' 个文件的头部初始化');
