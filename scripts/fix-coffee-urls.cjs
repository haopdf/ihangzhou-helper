const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'js', 'cat-data.js');
let content = fs.readFileSync(file, 'utf8');
const before = content;
content = content.replace(/coffee\.html/g, 'sub/food-coffee.html');
fs.writeFileSync(file, content, 'utf8');
console.log('cat-data.js: replaced ' + (before.split('coffee.html').length - 1) + ' occurrences of coffee.html → sub/food-coffee.html');
