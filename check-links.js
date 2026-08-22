var fs = require('fs');
var js = fs.readFileSync('js/app.js', 'utf8');
var mock = 'var localStorage={getItem:function(){return null},setItem:function(){}};var document={getElementById:function(){return null},querySelector:function(){return null},addEventListener:function(){}};var window={};';
var dataStart = js.indexOf('var DATA = {');
var dataEnd = js.indexOf('\n  // ===== 状态 =====');
var dataCode = js.substring(dataStart, dataEnd);
eval(mock + dataCode);

var links = [];
DATA.categories.forEach(function(c) {
  c.items.forEach(function(item) {
    if (item.url) links.push(item.name + ':' + item.url);
  });
});
var unique = [...new Set(links)];
console.log('总外链数:', unique.length);
unique.forEach(function(u) { console.log(u); });
