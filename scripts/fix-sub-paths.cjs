/**
 * 修复 sub/ 目录下所有 HTML 文件的相对路径
 * 
 * 问题：
 * 1. href="sub/banshi-xxx.html" → 应为 href="banshi-xxx.html"（已处于 sub/ 目录内）
 * 2. href="index.html" → 应为 href="../index.html"（根目录文件需../）
 * 3. href="banshi.html" → 应为 href="../banshi.html"
 * 4. href="traffic.html" → 应为 href="../traffic.html"
 * 5. href="food.html" → 应为 href="../food.html"
 * 6. css/style.css → 应为 ../css/style.css
 * 7. js/layout.js → 应为 ../js/layout.js
 * 8. images/ → 应为 ../images/
 * 9. manifest.json → 应为 ../manifest.json
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const subDir = path.join(rootDir, 'sub');
const files = fs.readdirSync(subDir).filter(function(f) { return f.endsWith('.html'); });

let totalFixed = 0;

// 根页面列表（从 sub/ 访问需要 ../）
const ROOT_PAGES = [
  'index.html', 'banshi.html', 'articles.html', 'cat.html',
  'food.html', 'life.html', 'traffic.html', 'district.html',
  'museum.html', 'weekend.html', 'zhoumo.html', 'travel.html',
  'scenic.html', 'story.html', 'place.html', 'channel.html',
  'internet.html', 'coffee.html', 'temple.html', 'guzhen.html',
  'laozihao.html', 'scenic.html', 'tide.html', 'history.html',
  'celebrity.html', 'intangible.html', 'tushuguan.html',
  'route.html', 'xiangxiang.html', 'breakfast.html', 'dessert.html',
  'tea.html', 'chaguan.html', 'night-market.html', 'around.html',
  'zhoubian.html', 'zhangsan.html', 'gujian.html', 'hangbang.html',
  'my.html', 'shopping.html', 'news.html'
];

files.forEach(function(file) {
  const filePath = path.join(subDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const orig = content;
  
  // 1. 删除 sub/ 前缀（从 sub/ 页面引用其他 sub/页面不应有 sub/ 前缀）
  //    匹配 href="sub/xxx.html" 或 href="sub/xxx.html?q=..."
  content = content.replace(/href="sub\/([^"]+)"/g, 'href="$1"');
  
  // 2. 根页面需要 ../ 前缀（含带 ?query 的情况）
  ROOT_PAGES.forEach(function(page) {
    // href="page" 或 href="page?q=..." → href="../page" 或 href="../page?q=..."
    const escaped = page.replace('.', '\\.');
    const re = new RegExp('href="' + escaped + '((?:\\?[^"]*)?)"', 'g');
    content = content.replace(re, 'href="../' + page + '$1"');
  });
  
  // 3. 修复 CSS/JS/images/manifest 路径（非链接的 src/href）
  content = content.replace(/(src|href)="(css\/)/g, '$1="../$2');
  content = content.replace(/(src|href)="(js\/)/g, '$1="../$2');
  content = content.replace(/(src|href)="(images\/)/g, '$1="../$2');
  content = content.replace(/(src|href)="(manifest\.json)/g, '$1="../$2');
  
  if (content !== orig) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixed++;
  }
});

console.log('修复 ' + totalFixed + '/' + files.length + ' 个 sub/ HTML 文件的相对路径');
