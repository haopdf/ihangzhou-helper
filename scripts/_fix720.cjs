/* 一次性批处理：把各页内联 720px 桌面列宽统一为 1180（与首页/channel.css 标准一致） */
const fs = require('fs');
const path = require('path');
const root = '/Users/asind/PycharmProjects/ihangzhou-helper';

const jobs = [
  ['tea.html', '.p-body{max-width:720px;margin:0 auto}', '.p-body{max-width:1180px;margin:0 auto}'],
  ['tushuguan.html', '.p-body{max-width:720px;margin:0 auto}', '.p-body{max-width:1180px;margin:0 auto}'],
  ['xiangxiang.html', '.p-body{max-width:720px;margin:0 auto}', '.p-body{max-width:1180px;margin:0 auto}'],
  ['chaguan.html', '.p-body{max-width:720px;margin:0 auto}', '.p-body{max-width:1180px;margin:0 auto}'],
  ['gujian.html', '.p-body{max-width:720px;margin:0 auto}', '.p-body{max-width:1180px;margin:0 auto}'],
  ['breakfast.html', '.p-body{max-width:720px;margin:0 auto}', '.p-body{max-width:1180px;margin:0 auto}'],
  ['dessert.html', '.p-body{max-width:720px;margin:0 auto}', '.p-body{max-width:1180px;margin:0 auto}'],
  ['story.html', '.p-body { max-width: 720px; margin: 0 auto; }', '.p-body { max-width: 1180px; margin: 0 auto; }'],
  ['intangible.html', '.p-body { max-width: 720px; margin: 0 auto; }', '.p-body { max-width: 1180px; margin: 0 auto; }'],
  ['hangbang.html', '.p-body { max-width: 720px; margin: 0 auto; }', '.p-body { max-width: 1180px; margin: 0 auto; }'],
  ['guzhen.html', 'p-body { max-width: 720px; margin: 0 auto; }', '.p-body { max-width: 1180px; margin: 0 auto; }'],
  ['zhoubian.html', '.zb-body{max-width:720px;margin:0 auto}', '.zb-body{max-width:1180px;margin:0 auto}'],
  ['tide.html', '.td-body{max-width:720px;margin:0 auto}', '.td-body{max-width:1180px;margin:0 auto}'],
];

let fail = 0;
for (const [file, from, to] of jobs) {
  const p = path.join(root, file);
  const src = fs.readFileSync(p, 'utf8');
  const n = src.split(from).length - 1;
  if (n !== 1) { console.log('SKIP(出现' + n + '次):', file); fail++; continue; }
  fs.writeFileSync(p, src.split(from).join(to));
  console.log('OK:', file);
}
process.exit(fail ? 1 : 0);
