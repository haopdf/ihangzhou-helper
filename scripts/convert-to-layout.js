#!/usr/bin/env node
/**
 * 批量改造子页面：去掉内联顶栏/底栏/设置面板，接入统一 layout.js
 * 用法：node scripts/convert-to-layout.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const pages = [
  'food.html', 'laozihao.html', 'traffic.html', 'street.html',
  'museum.html', 'coffee.html', 'celebrity.html', 'history.html',
  'internet.html', 'zhaopin.html', 'weekend.html', 'channel.html'
];

let ok = 0, fail = 0;
pages.forEach(file => {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) { console.log('⊘ 跳过（不存在）', file); return; }
  let html = fs.readFileSync(fp, 'utf8');
  const original = html;

  // 1. 提取 CHANNEL_ID / CHANNEL_NAME / CHANNEL_ICON
  const idMatch = html.match(/var\s+CHANNEL_ID\s*=\s*['"]([^'"]+)['"]/);
  const nameMatch = html.match(/var\s+CHANNEL_NAME\s*=\s*['"]([^'"]+)['"]/);
  const iconMatch = html.match(/var\s+CHANNEL_ICON\s*=\s*['"]([^'"]+)['"]/);
  const id = idMatch ? idMatch[1] : '';
  const name = nameMatch ? nameMatch[1] : '杭州';
  const icon = iconMatch ? iconMatch[1] : '';

  if (!idMatch) {
    console.log('⊘ 跳过（无 CHANNEL_ID）', file);
    fail++;
    return;
  }

  // 2. 在 <head> 的 <link rel="stylesheet"> 之后插入 layout.js
  if (html.indexOf('js/layout.js') === -1) {
    html = html.replace(
      /(<link\s+rel="stylesheet"[^>]*>)/,
      '$1\n  <script src="js/layout.js"></script>'
    );
  }

  // 3. 在 <body> 之后插入 IHZ_PAGE 变量定义
  if (html.indexOf('IHZ_PAGE') === -1) {
    html = html.replace(
      /(<body[^>]*>)\n?/,
      '$1\n  <script>\n    window.IHZ_PAGE = { title: ' + JSON.stringify(name) + ', icon: ' + JSON.stringify(icon) + ', channelId: ' + JSON.stringify(id) + ' };\n    window.IZ_SKIP_APP_THEME = true;\n  </script>\n'
    );
  }

  // 4. 删除内联顶栏 <!-- 顶部栏 --> ... </header>
  html = html.replace(
    /\s*<!--\s*顶部栏\s*-->\s*<header[^>]*class="topbar"[\s\S]*?<\/header>\s*/,
    '\n'
  );

  // 5. 删除内联设置面板 <!-- 设置面板 --> ... </div>（到 settings-panel 的 div 结束）
  html = html.replace(
    /\s*<!--\s*设置面板\s*-->\s*<div[^>]*class="settings-overlay"[\s\S]*?<\/div>\s*<div[^>]*class="settings-panel"[\s\S]*?<\/div>\s*/,
    '\n'
  );

  // 6. 删除旧的内联主题/老人模式 script 块
  html = html.replace(
    /\s*<script>\s*\n?\s*\/\/\s*主题[\s\S]*?\(\)\s*;\s*\n?\s*<\/script>\s*/,
    '\n'
  );

  // 7. 删除旧底栏 <nav class="bottom-nav" ... </nav>（如果有）
  html = html.replace(
    /\s*<nav\s+class="bottom-nav"[\s\S]*?<\/nav>\s*/,
    '\n'
  );

  // 8. 在 </body> 之前注入布局初始化脚本（仅在未引入 layout.js 初始化时追加）
  if (html.indexOf('IZ.layout.init') === -1) {
    html = html.replace(
      /(\s*<\/body>)/,
      '\n  <script>\n    if (window.IZ && IZ.layout) {\n      document.addEventListener("DOMContentLoaded", IZ.layout.init);\n    }\n  </script>\n$1'
    );
  }

  if (html !== original) {
    fs.writeFileSync(fp, html, 'utf8');
    console.log('✔ 已转换', file, `(${name} ${icon})`);
    ok++;
  } else {
    console.log('○ 未修改', file);
  }
});

console.log(`\n完成：${ok} 成功 / ${fail} 跳过`);
