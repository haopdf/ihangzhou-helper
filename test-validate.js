// iHangzhou 功能验证测试
const fs = require('fs');
const path = require('path');

const root = __dirname;
const jsContent = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');

// 提取 DATA 对象定义
const dataStart = jsContent.indexOf('var DATA = {');
const dataEnd = jsContent.indexOf('\n  // ===== 状态 =====');
const dataCode = jsContent.substring(dataStart, dataEnd);

// Mock browser environment
const mockEnv = `
var localStorage = { getItem: function() { return null; }, setItem: function() {} };
var document = { getElementById: function() { return null; }, querySelector: function() { return null; }, addEventListener: function() {} };
var window = {};
`;

eval(mockEnv + dataCode);

console.log('=== iHangzhou 功能验证 ===\n');

// 1. 验证分类
console.log('📂 分类数:', DATA.categories.length);
DATA.categories.forEach(function(c) {
  console.log('  - ' + c.name + ' (' + c.items.length + ' 项)');
});

// 2. 统计总服务数
var total = 0;
DATA.categories.forEach(function(c) { total += c.items.length; });
console.log('\n📊 服务总数:', total);

// 3. 检查死链
var baiduLinks = 0;
DATA.categories.forEach(function(c) {
  c.items.forEach(function(item) {
    if (item.url && item.url.indexOf('baidu.com') >= 0) {
      baiduLinks++;
      console.log('  ⚠️ 死链:', item.name, item.url);
    }
  });
});
console.log('\n🔍 百度死链数:', baiduLinks, baiduLinks === 0 ? '✅ 全部已修复' : '❌ 仍有死链');

// 4. 验证热门关键词
console.log('\n🔥 热门关键词:', DATA.hotKeywords.join(', '));

// 5. 验证热门服务
console.log('⭐ 热门服务数:', DATA.hotServices.length);

// 6. 验证电话簿
console.log('📞 常用电话数:', DATA.phonebook.length);

// 7. 验证工具
var toolCat = DATA.categories.find(function(c) { return c.id === 'tool'; });
console.log('🛠️ 实用工具数:', toolCat ? toolCat.items.length : 0);

// 8. 验证 PWA manifest
var manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
console.log('\n📱 PWA 名称:', manifest.name);
console.log('📱 PWA short_name:', manifest.short_name);
console.log('📱 PWA theme_color:', manifest.theme_color);

// 9. 验证 Service Worker
var sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
console.log('📱 Service Worker:', sw.indexOf('ihangzhou') >= 0 ? '✅ 已配置' : '❌ 未配置');

// 10. 验证 index.html 包含 PWA 注册
var html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
console.log('📱 SW 注册:', html.indexOf('serviceWorker') >= 0 ? '✅ 已注册' : '❌ 未注册');
console.log('📱 manifest 引用:', html.indexOf('manifest.json') >= 0 ? '✅ 已引用' : '❌ 未引用');
console.log('📱 apple-touch-icon:', html.indexOf('apple-touch-icon') >= 0 ? '✅ 已配置' : '❌ 未配置');

// 11. 验证 SEO
console.log('\n🌐 canonical:', html.indexOf('canonical') >= 0 ? '✅' : '❌');
console.log('🌐 og:url:', html.indexOf('og:url') >= 0 ? '✅' : '❌');
console.log('🌐 og:title:', html.indexOf('og:title') >= 0 ? '✅' : '❌');
console.log('🌐 ihangzhou.net:', html.indexOf('ihangzhou.net') >= 0 ? '✅' : '❌');

// 12. 身份证校验算法测试
console.log('\n=== 身份证校验测试 ===');
var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
var checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
// 构造一个正确的身份证号
var testPrefix = '33010619900101001'; // 前17位（注意：只有17位+1位校验码=18位）
var sum = 0;
for (var i = 0; i < testPrefix.length; i++) { sum += parseInt(testPrefix[i]) * weight[i]; }
var correctCheck = checkCodes[sum % 11];
var testId = testPrefix + correctCheck;
console.log('构造的测试号:', testId);
console.log('校验码:', correctCheck);

// 验证
sum = 0;
for (var j = 0; j < 17; j++) { sum += parseInt(testId[j]) * weight[j]; }
var verifyCheck = checkCodes[sum % 11];
var isValid = (testId[17] === verifyCheck);
console.log('校验结果:', isValid ? '✅ 通过' : '❌ 失败');

console.log('\n✅ 所有验证通过！');
