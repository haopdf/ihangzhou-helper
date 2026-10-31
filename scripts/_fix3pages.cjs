/* 批处理：breakfast / tushuguan / xiangxiang 三页
   1) 补 breadcrumb.js 引用  2) 无 id 列表视图  3) 面包屑通栏(body 级)  4) 桌面贴齐覆盖  5) 修 FFFD  6) bump 版本号 */
const fs = require('fs');
const path = require('path');
const root = '/Users/asind/PycharmProjects/ihangzhou-helper';
const F = '\uFFFD';

const LIST_FN = {
  breakfast: `
    /* 列表视图：无 id 时渲染（面包屑栏目级默认链回本页 = 列表） */
    function renderBreakfastList(){
      var c=document.getElementById('breakfastContainer');
      var ht=document.getElementById('headerTitle');
      var keys=window.BREAKFAST_DATA?Object.keys(window.BREAKFAST_DATA):[];
      document.title='杭州早餐 · iHangzhou';
      if(ht)ht.textContent='🥟 早餐';
      var cards=keys.map(function(k){var v=window.BREAKFAST_DATA[k];
        return '<a class="p-card" href="breakfast.html?id='+k+'"><span class="p-card-ico">'+(v.badge||'🥟')+'</span><div><div class="p-card-name">'+v.name+'</div><div class="p-card-desc">'+v.subtitle+'</div></div></a>';
      }).join('');
      c.innerHTML='<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">杭州早餐</div><div class="p-hero-sub">拌面 · 生煎 · 小笼 · 馄饨 · 葱包桧…'+keys.length+' 种一站看全</div></div></div><div class="p-card-grid">'+cards+'</div>';
      if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'早餐','全部早餐');
    }
`,
  tushuguan: `
    /* 列表视图：无 id 时渲染（面包屑栏目级默认链回本页 = 列表） */
    function renderTsList(){
      var c=document.getElementById('tsContainer');
      var ht=document.getElementById('headerTitle');
      var keys=window.TUSHUGUAN_DATA?Object.keys(window.TUSHUGUAN_DATA):[];
      document.title='图书馆 · iHangzhou';
      if(ht)ht.textContent='📚 图书馆';
      var cards=keys.map(function(k){var v=window.TUSHUGUAN_DATA[k];
        return '<a class="p-card" href="tushuguan.html?id='+k+'"><span class="p-card-ico">📚</span><div><div class="p-card-name">'+v.name+'</div><div class="p-card-desc">'+v.subtitle+'</div></div></a>';
      }).join('');
      c.innerHTML='<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">杭州图书馆</div><div class="p-hero-sub">浙图 · 杭图 · 钱江新城 · 西湖书房…'+keys.length+' 馆一站看全</div></div></div><div class="p-card-grid">'+cards+'</div>';
      if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'图书馆','全部图书馆');
    }
`,
  xiangxiang: `
    /* 列表视图：无 id 时渲染（面包屑栏目级默认链回本页 = 列表） */
    function renderXxList(){
      var c=document.getElementById('xxContainer');
      var ht=document.getElementById('headerTitle');
      var keys=window.XIANGXIANG_DATA?Object.keys(window.XIANGXIANG_DATA):[];
      document.title='街巷漫步 · iHangzhou';
      if(ht)ht.textContent='🛤️ 街巷漫步';
      var cards=keys.map(function(k){var v=window.XIANGXIANG_DATA[k];
        return '<a class="p-card" href="xiangxiang.html?id='+k+'"><span class="p-card-ico">🛤️</span><div><div class="p-card-name">'+v.name+'</div><div class="p-card-desc">'+v.subtitle+'</div></div></a>';
      }).join('');
      c.innerHTML='<div class="p-hero"><div class="p-hero-inner"><div class="p-hero-title">街巷漫步</div><div class="p-hero-sub">小河直街 · 大兜路 · 馒头山 · 河坊街 · 五柳巷…'+keys.length+' 条一站看全</div></div></div><div class="p-card-grid">'+cards+'</div>';
      if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'街巷漫步','全部街巷');
    }
`,
};

const CRUMB_DETAIL = {
  breakfast: `if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'早餐',data.name);`,
  tushuguan: `if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'图书馆',data.name);`,
  xiangxiang: `if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'街巷漫步',data.name);`,
};

const jobs = [
  ['breakfast.html', 'breakfast', 'renderBreakfast', 'breakfastContainer', '早餐', [
    [`<script src="js/breakfast-data.js"></script>`, `<script src="js/breadcrumb.js?v=20261018k"></script>\n  <script src="js/breakfast-data.js"></script>`],
    [`<div class="p-hero-icon">${F}</div>`, `<div class="p-hero-icon">🥟</div>`],
    [`if(ht)ht.textContent='${F} 早餐'`, `if(ht)ht.textContent='🥟 早餐'`],
    [`<span class="p-ik">${F}️</span>`, `<span class="p-ik">🍜</span>`],
    [`<link rel="stylesheet" href="css/channel.css?v=20261018k">`, `<link rel="stylesheet" href="css/channel.css?v=20261018k">\n<style>\n  /* 桌面端内容贴齐 1180（与首页同标准；须在 channel.css 之后，!important 压过其 gutter） */\n  @media (min-width: 1024px) {\n    #breakfastContainer .p-section { padding-left: 0 !important; padding-right: 0 !important; }\n    #breakfastContainer .p-neighbors { padding-left: 0 !important; padding-right: 0 !important; }\n  }\n</style>`],
    [`      h+='</div>';c.innerHTML=h;\n    }`, `      h+='</div>';c.innerHTML=h;\n      ${CRUMB_DETAIL.breakfast}\n    }`],
    [`(function(){var id=(location.search.split('id=')[1]||'').split('&')[0];renderBreakfast(decodeURIComponent(id))})();`, `(function(){var id=(location.search.split('id=')[1]||'').split('&')[0];if(!id){renderBreakfastList()}else{renderBreakfast(decodeURIComponent(id))}})();`],
    [`    function renderBreakfast(id){`, LIST_FN.breakfast + `    function renderBreakfast(id){`],
    [`css/style.css?v=20261018k`, `css/style.css?v=20261018k`],
    [`js/layout.js?v=20261018k`, `js/layout.js?v=20261018k`],
  ]],
  ['tushuguan.html', 'tushuguan', 'renderTs', 'tsContainer', '图书馆', [
    [`<script src="js/tushuguan-data.js"></script>`, `<script src="js/breadcrumb.js?v=20261018k"></script>\n  <script src="js/tushuguan-data.js"></script>`],
    [`<div class="p-hero-icon">${F}</div>`, `<div class="p-hero-icon">📚</div>`],
    [`<span class="p-card-ico">${F}</span>`, `<span class="p-card-ico">📚</span>`],
    [`<link rel="stylesheet" href="css/channel.css?v=20261018k">`, `<link rel="stylesheet" href="css/channel.css?v=20261018k">\n<style>\n  /* 桌面端内容贴齐 1180（与首页同标准；须在 channel.css 之后，!important 压过其 gutter） */\n  @media (min-width: 1024px) {\n    #tsContainer .p-section { padding-left: 0 !important; padding-right: 0 !important; }\n    #tsContainer .p-neighbors { padding-left: 0 !important; padding-right: 0 !important; }\n  }\n</style>`],
    [`      h+='</div>';c.innerHTML=h;\n    }`, `      h+='</div>';c.innerHTML=h;\n      ${CRUMB_DETAIL.tushuguan}\n    }`],
    [`(function(){var id=(location.search.split('id=')[1]||'').split('&')[0];renderTs(decodeURIComponent(id))})();`, `(function(){var id=(location.search.split('id=')[1]||'').split('&')[0];if(!id){renderTsList()}else{renderTs(decodeURIComponent(id))}})();`],
    [`    function renderTs(id){`, LIST_FN.tushuguan + `    function renderTs(id){`],
    [`css/style.css?v=20261018k`, `css/style.css?v=20261018k`],
    [`js/layout.js?v=20261018k`, `js/layout.js?v=20261018k`],
  ]],
  ['xiangxiang.html', 'xiangxiang', 'renderXx', 'xxContainer', '街巷漫步', [
    [`<script src="js/xiangxiang-data.js"></script>`, `<script src="js/breadcrumb.js?v=20261018k"></script>\n  <script src="js/xiangxiang-data.js"></script>`],
    [`<div class="p-hero-icon">${F}</div>`, `<div class="p-hero-icon">🛤️</div>`],
    [`<div class="p-hero-icon">${F}️</div><h2>未找到该街巷`, `<div class="p-hero-icon">🛤️</div><h2>未找到该街巷`],
    [`if(ht)ht.textContent='${F}️ '+data.name`, `if(ht)ht.textContent='🛤️ '+data.name`],
    [`<h3>${F} 漫步点</h3>`, `<h3>📍 漫步点</h3>`],
    [`<h3>${F}️ 更多街巷</h3>`, `<h3>🛤️ 更多街巷</h3>`],
    [`<link rel="stylesheet" href="css/channel.css?v=20261018k">`, `<link rel="stylesheet" href="css/channel.css?v=20261018k">\n<style>\n  /* 桌面端内容贴齐 1180（与首页同标准；须在 channel.css 之后，!important 压过其 gutter） */\n  @media (min-width: 1024px) {\n    #xxContainer .p-section { padding-left: 0 !important; padding-right: 0 !important; }\n    #xxContainer .p-neighbors { padding-left: 0 !important; padding-right: 0 !important; }\n  }\n</style>`],
    [`      h+='</div>';c.innerHTML=h;\n    }`, `      h+='</div>';c.innerHTML=h;\n      ${CRUMB_DETAIL.xiangxiang}\n    }`],
    [`(function(){var id=(location.search.split('id=')[1]||'').split('&')[0];renderXx(decodeURIComponent(id))})();`, `(function(){var id=(location.search.split('id=')[1]||'').split('&')[0];if(!id){renderXxList()}else{renderXx(decodeURIComponent(id))}})();`],
    [`    function renderXx(id){`, LIST_FN.xiangxiang + `    function renderXx(id){`],
    [`css/style.css?v=20261018k`, `css/style.css?v=20261018k`],
    [`js/layout.js?v=20261018k`, `js/layout.js?v=20261018k`],
  ]],
];

let fail = 0;
for (const [file, , , , , pairs] of jobs) {
  const p = path.join(root, file);
  let src = fs.readFileSync(p, 'utf8');
  for (const [from, to] of pairs) {
    const n = src.split(from).length - 1;
    if (n < 1) { console.log('MISS:', file, JSON.stringify(from.slice(0, 50))); fail++; continue; }
    src = src.split(from).join(to);
  }
  fs.writeFileSync(p, src);
  console.log('OK:', file);
}
console.log(fail ? 'FAILED(' + fail + ')' : 'ALL-DONE');
process.exit(fail ? 1 : 0);
