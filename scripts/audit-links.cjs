/**
 * 审计 cat-data.js：真正的"通用聚合页"只指没有 query 参数的根页面
 * 在 news/banshi 子栏目上下文中，这些链接会"点了还在本页"
 * 
 * 排除：根级独立页面（traffic.html/food.html/articles.html 等）作为合理目标
 */
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'js/cat-data.js');
const content = fs.readFileSync(dataFile, 'utf8');

const m = content.match(/window\.CAT_DATA\s*=\s*([\s\S]*?);\s*(?:\n\s*\n|$)/);
if (!m) { console.error('FAIL: cannot parse'); process.exit(1); }
const CAT_DATA = eval('(' + m[1] + ')');

// 真正的问题链接：在 news/banshi 子栏目中，无 query 的 life.html/zhoumo.html/banshi.html
// 注：articles.html/food.html/traffic.html 是根级独立频道页，允许作为目标
const PROBLEM_GENERIC = ['life.html', 'zhoumo.html', 'banshi.html'];

let issues = [];
let totalTh = 0;

CAT_DATA.forEach(function(cat) {
  if (cat.k !== 'news' && cat.k !== 'banshi') return;
  if (!cat.subs) return;
  
  cat.subs.forEach(function(sub) {
    if (sub.th) {
      sub.th.forEach(function(t) {
        totalTh++;
        const url = t[2] || '';
        if (PROBLEM_GENERIC.includes(url)) {
          issues.push(`[${cat.k}/${sub.n}] "${t[1]}" → ${url} ❌ 无差别通用页`);
        }
      });
    }
  });
});

console.log(`共检查 ${totalTh} 个三级条目 (news+banshi)`);

if (issues.length) {
  console.log(`\n发现 ${issues.length} 个问题:`);
  issues.forEach(function(i) { console.log('  ' + i); });
  process.exit(1);
} else {
  console.log('✅ news/banshi 所有三级条目均无"点了还在本页"问题');
  process.exit(0);
}
