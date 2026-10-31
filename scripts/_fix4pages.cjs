/* 批处理：guzhen / hangbang / story / life
   - 补 breadcrumb.js 引用
   - 无 id 列表视图（.p-card-grid，channel.css 已定义）
   - 面包屑通栏（body 级）
   - 修数据文件 FFFD
   - bump 版本号 */
const fs = require('fs');
const path = require('path');
const root = '/Users/asind/PycharmProjects/ihangzhou-helper';
const F = '\uFFFD';

function esc(s) { return JSON.stringify(s).slice(1, -1); }

const listFns = {
  guzhen: `
    /* 列表视图：无 id 时渲染（面包屑栏目级默认链回本页 = 列表） */
    function renderGuzhenList() {
      var container = document.getElementById('guzhenContainer');
      var headerTitle = document.getElementById('headerTitle');
      var keys = window.GUZHEN_VILLAGES ? Object.keys(window.GUZHEN_VILLAGES) : [];
      document.title = '古镇古村 · iHangzhou';
      if (headerTitle) headerTitle.textContent = '\uD83C\uDFD9️ 古镇古村';
      var cards = keys.map(function (k) {
        var v = window.GUZHEN_VILLAGES[k];
        var ic = (v.badge || '').split(' ')[0] || '\uD83C\uDFD9️';
        return '<a class="p-card" href="guzhen.html?id=' + k + '"><span class="p-card-ico">' + ic + '</span><div><div class="p-card-name">' + v.name + '</div><div class="p-card-desc">' + v.subtitle + '</div></div></a>';
      }).join('');
      container.innerHTML = '<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">古镇古村</div><div class="p-hero-sub">塘栖 · 南浔 · 乌镇 · 深澳…' + keys.length + ' 处一站看全</div></div></div><div class="p-card-grid">' + cards + '</div>';
      if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '古镇古村', '全部古镇古村');
    }
`,
  hangbang: `
    /* 列表视图：无 id 时渲染（面包屑栏目级默认链回本页 = 列表） */
    function renderHangbangList() {
      var container = document.getElementById('hangbangContainer');
      var headerTitle = document.getElementById('headerTitle');
      var keys = window.HANGBANG_DISHES ? Object.keys(window.HANGBANG_DISHES) : [];
      document.title = '杭帮菜 · iHangzhou';
      if (headerTitle) headerTitle.textContent = '\uD83E\uDD62 杭帮菜';
      var cards = keys.map(function (k) {
        var v = window.HANGBANG_DISHES[k];
        var ic = (v.badge || '').split(' ')[0] || '\uD83E\uDD62';
        return '<a class="p-card" href="hangbang.html?id=' + k + '"><span class="p-card-ico">' + ic + '</span><div><div class="p-card-name">' + v.name + '</div><div class="p-card-desc">' + v.subtitle + '</div></div></a>';
      }).join('');
      container.innerHTML = '<div class="p-hero"><div class="p-hero-inner-bar"><div class="p-hero-title">杭帮菜</div><div class="p-hero-sub">西湖醋鱼 · 龙井虾仁 · 东坡肉 · 叫化童鸡…' + keys.length + ' 道一站看全</div></div></div><div class="p-card-grid">' + cards + '</div>';
      if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '杭帮菜', '全部杭帮菜');
    }
`,
  story: `
    /* 列表视图：无 id 时渲染（面包屑栏目级默认链回本页 = 列表） */
    function renderStoryList() {
      var container = document.getElementById('storyContainer');
      var headerTitle = document.getElementById('headerTitle');
      var keys = window.STORY_ITEMS ? Object.keys(window.STORY_ITEMS) : [];
      document.title = '杭州故事 · iHangzhou';
      if (headerTitle) headerTitle.textContent = '\uD83D\uDCD6 杭州故事';
      var cards = keys.map(function (k) {
        var v = window.STORY_ITEMS[k];
        var ic = (v.badge || '').split(' ')[0] || '\uD83D\uDCD6';
        return '<a class="p-card" href="story.html?id=' + k + '"><span class="p-card-ico">' + ic + '</span><div><div class="p-card-name">' + v.name + '</div><div class="p-card-desc">' + v.subtitle + '</div></div></a>';
      }).join('');
      container.innerHTML = '<div class="p-hero"><div class="p-hero-inner-bar"><div class="p-hero-title">杭州故事</div><div class="p-hero-sub">白蛇传 · 断桥残雪 · 雷峰塔 · 钱王射潮…' + keys.length + ' 个一站看全</div></div></div><div class="p-card-grid">' + cards + '</div>';
      if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '杭州故事', '全部故事');
    }
`,
};

const jobs = [
  ['guzhen.html', [
    [`<script src="js/guzhen-data.js"></script>`, `<script src="js/breadcrumb.js?v=20261018k"></script>\n  <script src="js/guzhen-data.js"></script>`],
    [`    function renderGuzhen(id) {`, listFns.guzhen + `    function renderGuzhen(id) {`],
    [`      html += '</div>';\n      container.innerHTML = html;\n    }`, `      html += '</div>';\n      container.innerHTML = html;\n      if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '古镇古村', data.name);\n    }`],
    [`    (function () {\n      var id = location.search.split('id=')[1] || '';\n      id = id.split('&')[0];\n      renderGuzhen(decodeURIComponent(id));\n    })();`, `    (function () {\n      var id = location.search.split('id=')[1] || '';\n      id = id.split('&')[0];\n      if (!id) { renderGuzhenList(); } else { renderGuzhen(decodeURIComponent(id)); }\n    })();`],
    [`css/style.css?v=20261018k`, `css/style.css?v=20261018k`],
    [`js/layout.js?v=20261018k`, `js/layout.js?v=20261018k`],
    [`css/channel.css?v=20261018k`, `css/channel.css?v=20261018k`],
  ]],
  ['hangbang.html', [
    [`<script src="js/hangbang-data.js"></script>`, `<script src="js/breadcrumb.js?v=20261018k"></script>\n  <script src="js/hangbang-data.js"></script>`],
    [`    function renderHangbang(id) {`, listFns.hangbang + `    function renderHangbang(id) {`],
    [`      html += '</div>';\n      container.innerHTML = html;\n    }`, `      html += '</div>';\n      container.innerHTML = html;\n      if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '杭帮菜', data.name);\n    }`],
    [`    (function () {\n      var id = location.search.split('id=')[1] || '';\n      id = id.split('&')[0];\n      renderHangbang(decodeURIComponent(id));\n    })();`, `    (function () {\n      var id = location.search.split('id=')[1] || '';\n      id = id.split('&')[0];\n      if (!id) { renderHangbangList(); } else { renderHangbang(decodeURIComponent(id)); }\n    })();`],
    [`css/style.css?v=20261018k`, `css/style.css?v=20261018k`],
    [`js/layout.js?v=20261018k`, `js/layout.js?v=20261018k`],
    [`css/channel.css?v=20261018k`, `css/channel.css?v=20261018k`],
  ]],
  ['story.html', [
    [`<script src="js/story-data.js"></script>`, `<script src="js/breadcrumb.js?v=20261018k"></script>\n  <script src="js/story-data.js"></script>`],
    [`    function renderStory(id) {`, listFns.story + `    function renderStory(id) {`],
    [`      html += '</div>';\n      container.innerHTML = html;\n    }`, `      html += '</div>';\n      container.innerHTML = html;\n      if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '杭州故事', data.name);\n    }`],
    [`    (function() { var id = (location.search.split('id=')[1]||'').split('&')[0]; renderStory(decodeURIComponent(id)); })();`, `    (function() { var id = (location.search.split('id=')[1]||'').split('&')[0]; if (!id) { renderStoryList(); } else { renderStory(decodeURIComponent(id)); } })();`],
    [`css/style.css?v=20261018k`, `css/style.css?v=20261018k`],
    [`js/layout.js?v=20261018k`, `js/layout.js?v=20261018k`],
    [`css/channel.css?v=20261018k`, `css/channel.css?v=20261018k`],
  ]],
  ['life.html', [
    [`  <script src="js/layout.js?v=20261018k"></script>`, `  <script src="js/layout.js?v=20261018k"></script>\n  <script src="js/breadcrumb.js?v=20261018k"></script>`],
    [`          c.innerHTML='<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">'+matchedName+'</div><div class="p-hero-sub">由「'+q+'」筛选</div></div></div><div class="p-cards">'+grid2+'</div>';\n          return;`, `          c.innerHTML='<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">'+matchedName+'</div><div class="p-hero-sub">由「'+q+'」筛选</div></div></div><div class="p-cards">'+grid2+'</div>';\n          if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'杭州生活',matchedName);\n          return;`],
    [`        c.innerHTML=h;\n      } else {`, `        c.innerHTML=h;\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'杭州生活',data.name);\n      } else {`],
    [`        c.innerHTML='<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">杭州生活</div><div class="p-hero-sub">实用生活信息一站直达</div></div></div><div class="p-cards">'+gridHtml+'</div>';\n      }`, `        c.innerHTML='<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">杭州生活</div><div class="p-hero-sub">实用生活信息一站直达</div></div></div><div class="p-cards">'+gridHtml+'</div>';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'杭州生活','全部指南');\n      }`],
    [`css/style.css?v=20261018k`, `css/style.css?v=20261018k`],
    [`css/channel.css?v=20261018k`, `css/channel.css?v=20261018k`],
  ]],
  // 数据乱码修复
  ['js/guzhen-data.js', [
    [`badge: '${F}town 江南名镇'`, `badge: '\uD83C\uDFD9️ town 江南名镇'`],
    [`badge: '${F} 水乡经典'`, `badge: '\uD83D\uDCA7 水乡经典'`],
    [`badge: '${F} 水系奇观'`, `badge: '\uD83C\uDF0A 水系奇观'`],
    [`badge: '${F} 文化遗产'`, `badge: '\uD83C\uDFDB️ 文化遗产'`],
    [`badge: '${F} 徽派遗珠'`, `badge: '\uD83C\uDFE0 徽派遗珠'`],
    [`badge: '${F} 秋摄胜地'`, `badge: '\uD83C\uDF42 秋摄胜地'`],
    [`badge: '${F} 石头寨'`, `badge: '\uD83E\uDEA8 石头寨'`],
  ]],
  ['js/hangbang-data.js', [
    [`'茶${F}一绝 · 清明前最佳'`, `'茶中一绝 · 清明前最佳'`],
    [`badge: '${F} 历史名菜'`, `badge: '\uD83D\uDCDC 历史名菜'`],
    [`多用金华火腿入${F}。`, `多用金华火腿入味。`],
  ]],
  ['js/story-data.js', [
    [`'"${F}"——不要（合音字）'`, `'"覅"——不要（合音字）'`],
    [`钱${F}射潮保境安民`, `钱王射潮保境安民`],
    [`钱${F}射潮的安民壮举`, `钱王射潮的安民壮举`],
    [`['吴语','方言','${F}语']`, `['吴语','方言','杭州话']`],
  ]],
];

let fail = 0;
for (const [file, pairs] of jobs) {
  const p = path.join(root, file);
  let src = fs.readFileSync(p, 'utf8');
  for (const [from, to] of pairs) {
    const n = src.split(from).length - 1;
    if (n < 1) { console.log('MISS:', file, esc(from.slice(0, 60))); fail++; continue; }
    src = src.split(from).join(to);
  }
  fs.writeFileSync(p, src);
  console.log('OK:', file);
}
// 复查 FFFD
for (const f of ['js/guzhen-data.js', 'js/hangbang-data.js', 'js/story-data.js']) {
  const left = fs.readFileSync(path.join(root, f), 'utf8').split(F).length - 1;
  if (left) { console.log('STILL-CORRUPT:', f, left); fail++; }
}
console.log(fail ? 'FAILED(' + fail + ')' : 'ALL-DONE');
process.exit(fail ? 1 : 0);
