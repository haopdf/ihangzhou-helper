// 生成 place-*.html 静态文件到 articles/ 目录
// 用法: node gen-places.js
const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, 'data', 'places.json'), 'utf8');
const data = JSON.parse(raw);
const places = data.places || [];

function genPlaceArticle(p) {
  // 转义单引号用于 onclick
  var safeName = p.name.replace(/'/g, '\\\'');
  var tagsHtml = (p.tags || []).map(function (t) {
    return '<span class="place-tag">' + t + '</span>';
  }).join('');

  var metaHtml = '';
  if (p.district_name) metaHtml += '<div class="pa-meta-row"><span class="mi">📍</span><span>区县：<strong>' + p.district_name + '</strong></span></div>';
  if (p.address) metaHtml += '<div class="pa-meta-row"><span class="mi">🗺️</span><span>' + p.address + '</span></div>';
  if (p.open_time) metaHtml += '<div class="pa-meta-row"><span class="mi">🕐</span><span>开放：<strong>' + p.open_time + '</strong></span></div>';
  if (p.ticket) metaHtml += '<div class="pa-meta-row"><span class="mi">🎫</span><span>门票：<strong>' + p.ticket + '</strong></span></div>';
  if (p.best_season) metaHtml += '<div class="pa-meta-row"><span class="mi">🌸</span><span>最佳季节：<strong>' + p.best_season + '</strong></span></div>';
  if (p.recommend_level) {
    var stars = '⭐'.repeat(p.recommend_level);
    metaHtml += '<div class="pa-meta-row"><span class="mi">👍</span><span>推荐指数：<strong>' + stars + '</strong></span></div>';
  }

  var contentParas = (p.content || '').split(/\n\n+/);
  var contentHtml = contentParas.map(function (para) {
    return '<p>' + para + '</p>';
  }).join('');

  var tipsHtml = p.tips ? '<div class="pa-tips"><h3>💡 实用贴士</h3><p>' + p.tips + '</p></div>' : '';

  var seoTitle = p.seo_title || (p.name + ' · iHangzhou 杭州生活助手');
  var seoDesc = p.seo_desc || p.summary;

  return '<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">\n' +
    '  <title>' + escapeHtml(seoTitle) + '</title>\n' +
    '  <meta name="description" content="' + escapeHtml(seoDesc) + '">\n' +
    '  <meta name="keywords" content="杭州,' + escapeHtml(p.name) + ',' + escapeHtml(p.district_name) + ',' + (p.tags || []).join(',') + ',iHangzhou">\n' +
    '  <meta name="theme-color" content="#0ea5e9">\n' +
    '  <meta property="og:title" content="' + escapeHtml(seoTitle) + '">\n' +
    '  <meta property="og:description" content="' + escapeHtml(seoDesc) + '">\n' +
    '  <meta property="og:type" content="article">\n' +
    '  <meta property="og:site_name" content="iHangzhou 杭州生活助手">\n' +
    '  <meta property="og:image" content="' + p.cover + '">\n' +
    '  <link rel="canonical" href="https://www.ihangzhou.net/place/' + p.id + '.html">\n' +
    '  <link rel="manifest" href="../manifest.json">\n' +
    '  <link rel="stylesheet" href="../css/style.css?v=20260927a">\n' +
    '  <link rel="icon" href="data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><text y=\'.9em\' font-size=\'90\'>🏔️</text></svg>">\n' +
    '  <style>\n' +
    '    .pa-hero { position: relative; height: 220px; overflow: hidden; background: #0ea5e9; }\n' +
    '    .pa-hero img { width: 100%; height: 100%; object-fit: cover; display: block; }\n' +
    '    .pa-hero-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(transparent, rgba(0,0,0,0.75)); color: #fff; }\n' +
    '    .pa-hero-overlay h1 { font-size: 22px; font-weight: 700; margin: 0 0 4px; }\n' +
    '    .pa-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }\n' +
    '    .pa-tag { font-size: 11px; background: rgba(255,255,255,0.25); padding: 3px 10px; border-radius: 12px; font-weight: 500; }\n' +
    '    .pa-meta { padding: 14px 16px; background: var(--bg-card); border-bottom: 1px solid var(--border); }\n' +
    '    .pa-meta-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 13px; color: var(--text-secondary); }\n' +
    '    .pa-meta-row .mi { font-size: 16px; width: 20px; text-align: center; }\n' +
    '    .pa-meta-row strong { color: var(--text); font-weight: 600; }\n' +
    '    .pa-summary { padding: 16px; background: var(--primary); color: #fff; }\n' +
    '    .pa-summary p { font-size: 14px; line-height: 1.7; margin: 0; }\n' +
    '    .pa-content { padding: 16px; }\n' +
    '    .pa-content h2 { font-size: 17px; font-weight: 700; margin: 16px 0 10px; color: var(--text); border-left: 3px solid var(--primary); padding-left: 8px; }\n' +
    '    .pa-content p { font-size: 14px; line-height: 1.85; color: var(--text-secondary); margin-bottom: 12px; }\n' +
    '    .pa-tips { margin: 16px; padding: 14px; background: var(--bg-alt); border-radius: 10px; border-left: 3px solid var(--primary); }\n' +
    '    .pa-tips h3 { font-size: 14px; font-weight: 600; color: var(--primary); margin: 0 0 6px; }\n' +
    '    .pa-tips p { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin: 0; }\n' +
    '    .pa-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 16px; }\n' +
    '    .pa-action { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; color: var(--text); text-decoration: none; font-size: 13px; font-weight: 500; }\n' +
    '    .pa-action.primary { background: var(--primary); color: #fff; border-color: var(--primary); }\n' +
    '  </style>\n</head>\n<body>\n' +
    '  <header class="topbar">\n' +
    '    <a href="../index.html" class="topbar-back" style="color:#fff;text-decoration:none;font-size:20px;padding: 4px 16px;">‹</a>\n' +
    '    <div class="topbar-city"><span>杭州地点</span><span class="city-arrow">▼</span></div>\n' +
    '    <button class="topbar-elderly" onclick="toggleElderlyMode()" title="老人模式">👵 老人</button>\n' +
    '    <button class="theme-btn" id="themeBtn" title="切换主题">🌙</button>\n' +
    '  </header>\n\n' +
    '  <script>\n' +
    '    (function () {\n' +
    '      try {\n' +
    '        var t = localStorage.getItem("ihz-theme") || "light";\n' +
    '        document.documentElement.setAttribute("data-theme", t);\n' +
    '        var b = document.getElementById("themeBtn");\n' +
    '        if (b) b.textContent = t === "dark" ? "☀️" : "🌙";\n' +
    '      } catch (e) {}\n' +
    '      try {\n' +
    '        var el = localStorage.getItem("ihz_elderly") === "true";\n' +
    '        document.documentElement.setAttribute("data-elderly", el ? "true" : "false");\n' +
    '      } catch (e) {}\n' +
    '    })();\n' +
    '  </script>\n\n' +
    '  <article>\n' +
    '    <div class="pa-hero">\n' +
    '      <img src="' + p.cover + '" alt="' + escapeHtml(p.name) + '" onerror="this.style.display=\'none\'">\n' +
    '      <div class="pa-hero-overlay">\n' +
    '        <h1>' + escapeHtml(p.name) + '</h1>\n' +
    '        <div class="pa-tags">' + tagsHtml + '</div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '    <div class="pa-meta">' + metaHtml + '</div>\n' +
    '    <div class="pa-summary"><p>' + escapeHtml(p.summary || '') + '</p></div>\n' +
    '    <div class="pa-content">\n' +
    '      <h2>详细介绍</h2>\n' +
    '      ' + contentHtml + '\n' +
    '    </div>\n' +
    '    ' + tipsHtml + '\n' +
    '    <div class="pa-actions">\n' +
    '      <a class="pa-action primary" href="javascript:void(0)" onclick="toggleFavoritePlace(\'' + p.id + '\',\'' + safeName + '\')">❤️ 收藏地点</a>\n' +
    '      <a class="pa-action" href="../index.html#discover">← 返回发现</a>\n' +
    '    </div>\n' +
    '  </article>\n\n' +
    '  <script src="../js/app.js?v=20260927a"></script>\n' +
    '  <script>\n' +
    '    window.toggleFavoritePlace = function (id, name) {\n' +
    '      try {\n' +
    '        var favs = JSON.parse(localStorage.getItem("ihz_place_favs") || "[]");\n' +
    '        var idx = favs.indexOf(id);\n' +
    '        if (idx >= 0) { favs.splice(idx, 1); showToast("已取消收藏"); }\n' +
    '        else { favs.push(id); showToast("已收藏：" + name); }\n' +
    '        localStorage.setItem("ihz_place_favs", JSON.stringify(favs));\n' +
    '      } catch (e) {}\n' +
    '    };\n' +
    '  </script>\n\n' +
    '  <nav class="bottom-nav">\n' +
    '    <a class="bnav-item" href="../index.html"><span class="bicon">🏠</span><span>首页</span></a>\n' +
    '    <a class="bnav-item" href="../index.html#discover"><span class="bicon">🧭</span><span>发现</span></a>\n' +
    '    <a class="bnav-item" href="../index.html#tools"><span class="bicon">🛠️</span><span>工具</span></a>\n' +
    '    <a class="bnav-item" href="../district.html"><span class="bicon">🗺️</span><span>地图</span></a>\n' +
    '    <a class="bnav-item" href="../index.html#me"><span class="bicon">👤</span><span>我的</span></a>\n' +
    '  </nav>\n' +
    '</body>\n</html>\n';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

places.forEach(function (p) {
  var filePath = path.join(__dirname, 'articles', 'place-' + p.id + '.html');
  fs.writeFileSync(filePath, genPlaceArticle(p), 'utf8');
  console.log('Generated: articles/place-' + p.id + '.html');
});

console.log('\nDone! Generated ' + places.length + ' place articles.');
