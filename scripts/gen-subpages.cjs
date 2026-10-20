/**
 * 批量生成二级栏目独立页面
 * 为 cat-data.js 中每个没有直达页面的二级栏目创建独立 HTML
 */
const fs = require('fs');
const path = require('path');

// 独立页映射：已有的直达页面（一级栏目 home 可直接映射的就直接用）
const EXISTING_PAGES = {
  travel: 'travel.html',
  food: 'food.html',
  culture: 'museum.html',
  banshi: 'banshi.html',
  zhaopin: 'zhaopin.html',
  news: 'articles.html',
  shopping: 'street.html',
  life: 'life.html'
};

// 已有的二级栏目直达页面（在 cat-data.js 三级入口或一级 home 中已引用）
const EXISTING_SUB_PAGES = {
  '景点门票': 'scenic.html',
  '周边游': 'zhoubian.html',
  '周末去哪': 'weekend.html',
  '街巷漫步': 'xiangxiang.html',
  '路线攻略': 'route.html',
  '杭帮菜': 'food.html',
  '咖啡': 'coffee.html',
  '茶馆': 'chaguan.html',
  '老字号': 'laozihao.html',
  '夜市': 'night-market.html',
  '早餐': 'breakfast.html',
  '甜品': 'dessert.html',
  '龙井茶': 'tea.html',
  '博物馆': 'museum.html',
  '历史人文': 'history.html',
  '杭州名人': 'celebrity.html',
  '杭州故事': 'story.html',
  '古镇古建': 'guzhen.html',
  '非遗': 'intangible.html',
  '寺庙': 'temple.html',
  '图书馆': 'tushuguan.html',
  '社保查询': 'sub/banshi-shebao.html',
  '公积金': 'sub/banshi-gjj.html',
  '落户': 'sub/banshi-luohu.html',
  '出行交通': 'traffic.html',
  '区县导航': 'district.html',
  '车辆服务': 'sub/banshi-cheliang.html',
  '常用电话': 'sub/banshi-dianhua.html',
  '实用工具': 'sub/banshi-gongju.html',
  '国企招聘': 'zhaopin.html',
  '事业单位': 'zhaopin.html',
  '名企招聘': 'zhaopin.html',
  '兼职实习': 'zhaopin.html',
  '人才认定': 'zhaopin.html',
  '互联网业': 'zhaopin.html',
  '简历面试': 'zhaopin.html',
  '劳动维权': 'zhaopin.html',
  '民生政策': 'sub/news-zhengce.html',
  '消费补贴': 'sub/news-butie.html',
  '活动汇总': 'sub/news-huodong.html',
  '今日限行': 'sub/news-xianxing.html',
  '天气预警': 'sub/news-tianqi.html',
  '油价查询': 'sub/news-youjia.html',
  '公众号精选': 'sub/news-wxfeed.html',
  '全部文章': 'articles.html',
  '商圈逛街': 'street.html',
  '杭州特产': 'laozihao.html',
  '百年老店': 'laozihao.html',
  '咖啡地图': 'coffee.html',
  '夜宵夜市': 'night-market.html',
  '钱塘江观潮': 'tide.html',
};

// 去重构建一个二级页面文件名的映射
const rootDir = path.resolve(__dirname, '..');
const dataFile = fs.readFileSync(path.join(rootDir, 'js/cat-data.js'), 'utf8');

// 提取 CAT_DATA（在浏览器端是 window.CAT_DATA）
const m = dataFile.match(/window\.CAT_DATA\s*=\s*([\s\S]*?);\s*(?:\n\s*\n|$)/);
if (!m) {
  console.error('ERROR: 无法解析 cat-data.js 中的 CAT_DATA');
  process.exit(1);
}

// 安全解析
const CAT_DATA = eval('(' + m[1] + ')');

// 创建输出目录
const outDir = path.join(rootDir, 'sub');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 统计
let totalSubs = 0, generated = 0, mapped = 0;

const linkMap = {}; // subName -> pagePath，用于后续替换 index.html 链接

CAT_DATA.forEach(function(cat) {
  if (!cat.subs) return;
  cat.subs.forEach(function(sub) {
    totalSubs++;
    const subName = sub.n;
    
    if (EXISTING_SUB_PAGES[subName]) {
      const mappedPage = EXISTING_SUB_PAGES[subName];
      linkMap[`${cat.k}|${subName}`] = mappedPage;
      
      // 如果目标是 sub/ 页面，需要生成；如果指向根目录已有页面，不生成
      if (mappedPage.startsWith('sub/')) {
        const filePath = path.join(rootDir, mappedPage);
        const html = generatePage(cat, sub, mappedPage);
        fs.writeFileSync(filePath, html, 'utf8');
        generated++;
        console.log('  生成: ' + mappedPage + ' (' + subName + ')');
      } else {
        mapped++;
      }
      return;
    }
    
    // 需要新建独立页面
    const fileName = 'sub/' + cat.k + '-' + sub.k + '.html';
    linkMap[`${cat.k}|${subName}`] = fileName;
    const filePath = path.join(rootDir, fileName);
    
    const html = generatePage(cat, sub, fileName);
    fs.writeFileSync(filePath, html, 'utf8');
    generated++;
    console.log('  生成: ' + fileName + ' (' + subName + ')');
  });
});

console.log('\n=== 汇总 ===');
console.log('总二级栏目数:', totalSubs);
console.log('映射到已有页面:', mapped);
console.log('新建独立页面:', generated);

// 写出映射 JSON 供后续替换使用
fs.writeFileSync(path.join(rootDir, 'scripts/subpage-map.json'), JSON.stringify(linkMap, null, 2), 'utf8');
console.log('\n映射表已写入 scripts/subpage-map.json');

/* ============================================= */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generatePage(cat, sub, pagePath) {
  const icon = esc(sub.ic || cat.ic);
  const name = esc(sub.n);
  const desc = esc(sub.d || '');
  const intro = esc(sub.i || '');
  const catName = esc(cat.n);
  const catIcon = esc(cat.ic);
  const color = cat.c || '#1f7a5a';

  // 三级入口 HTML
  let thirdHtml = '';
  if (sub.th && sub.th.length) {
    thirdHtml = '<div class="sub-block"><div class="sub-sec-ttl">📂 子栏目 <span class="sub-more">' + sub.th.length + ' 个</span></div><div class="sub-third">' +
      sub.th.map(function(t) {
        const tIcon = esc(t[0]);
        const tName = esc(t[1]);
        const tHref = t[2] || '#';
        const ext = /^https?:/.test(tHref);
        const attrs = ext ? ' href="' + tHref + '" target="_blank" rel="noopener"' : ' href="' + tHref + '"';
        return '<a class="sub-third-card"' + attrs + '><span class="sti">' + tIcon + '</span><span class="stn">' + tName + '</span></a>';
      }).join('') + '</div></div>';
  }

  // 精选内容 HTML
  let featHtml = '';
  if (sub.ft && sub.ft.length) {
    featHtml = '<div class="sub-block"><div class="sub-sec-ttl">⭐ 精选内容</div><div class="sub-feat">' +
      sub.ft.map(function(f) {
        const fIcon = esc(f[0]);
        const fTitle = esc(f[1]);
        const fDesc = esc(f[2] || '');
        const fHref = f[3] || '#';
        const ext = /^https?:/.test(fHref);
        const attrs = ext ? ' href="' + fHref + '" target="_blank" rel="noopener"' : ' href="' + fHref + '"';
        return '<a class="sub-feat-card"' + attrs + '><span class="sf-ic">' + fIcon + '</span><span class="sf-bd"><span class="sf-t">' + fTitle + '</span>' + (fDesc ? '<span class="sf-d">' + fDesc + '</span>' : '') + '</span><span class="sf-ar">›</span></a>';
      }).join('') + '</div></div>';
  }

  const kwList = JSON.stringify(sub.kw || []);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="theme-color" content="${color}">
  <meta name="description" content="iHangzhou · ${name} - ${desc}">
  <meta name="keywords" content="${(sub.kw || []).join(',')}">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${name} · ${catName} · iHangzhou">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="iHangzhou">
  <link rel="manifest" href="manifest.json">
  <title>${name} · ${catName} · iHangzhou</title>
  <link rel="stylesheet" href="css/style.css?v=20261018l">
  <link rel="icon" type="image/png" href="images/logo-mark-96.png">
  <link rel="apple-touch-icon" href="images/logo-mark-192.png">
  <script src="js/layout.js?v=20261018l"></script>
  <style>
    :root{--primary:${color};--primary-dark:${color}}
    .sub-page{max-width:720px;margin:0 auto;padding:0 0 40px}
    .sub-hero{background:linear-gradient(135deg,${color}dd,${color}99);padding:24px 16px 20px;color:#fff;text-align:center}
    .sub-hero-badge{display:inline-block;background:rgba(255,255,255,0.2);padding:4px 12px;border-radius:12px;font-size:12px;margin-bottom:8px;backdrop-filter:blur(4px)}
    .sub-hero h1{font-size:22px;font-weight:700;margin:6px 0 8px;display:flex;align-items:center;justify-content:center;gap:8px}
    .sub-hero h1 .hero-icon{font-size:32px}
    .sub-hero p{font-size:14px;opacity:0.9;line-height:1.6;max-width:480px;margin:0 auto}
    .sub-body{padding:12px 10px}
    .sub-block{margin-bottom:16px}
    .sub-sec-ttl{font-size:14px;font-weight:700;color:var(--text-primary);margin-bottom:8px;display:flex;align-items:center;gap:6px}
    .sub-more{margin-left:auto;font-size:11px;color:var(--text-secondary);font-weight:400;background:var(--bg-secondary);padding:2px 8px;border-radius:10px}
    .sub-third{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
    .sub-third-card{display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px;background:#fff;border-radius:12px;text-decoration:none;box-shadow:0 1px 4px rgba(0,0,0,0.06);transition:transform 0.15s}
    .sub-third-card:active{transform:scale(0.96)}
    .sti{font-size:24px}
    .stn{font-size:11px;color:var(--text-primary);font-weight:600;text-align:center;line-height:1.3}
    .sub-feat{display:flex;flex-direction:column;gap:8px}
    .sub-feat-card{display:flex;align-items:center;gap:12px;padding:12px;background:#fff;border-radius:12px;text-decoration:none;box-shadow:0 1px 4px rgba(0,0,0,0.06);transition:transform 0.15s}
    .sub-feat-card:active{transform:scale(0.98)}
    .sf-ic{font-size:28px;flex-shrink:0}
    .sf-bd{flex:1;min-width:0}
    .sf-t{font-size:13px;font-weight:700;color:var(--text-primary);display:block}
    .sf-d{font-size:11px;color:var(--text-secondary);display:block;margin-top:2px;line-height:1.4}
    .sf-ar{color:var(--text-secondary);font-size:18px;flex-shrink:0}
    .sub-arts{display:flex;flex-direction:column;gap:6px}
    .sub-art{display:flex;flex-direction:column;gap:2px;padding:10px 12px;background:#fff;border-radius:10px;text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,0.04)}
    .sub-art:active{background:var(--bg-secondary)}
    .sa-t{font-size:13px;font-weight:600;color:var(--text-primary);line-height:1.4}
    .sa-m{font-size:11px;color:var(--text-secondary)}
    .sub-empty{text-align:center;padding:24px 16px;color:var(--text-secondary);font-size:13px}
    .sub-back{display:block;text-align:center;padding:12px;background:var(--primary);color:#fff;border-radius:24px;font-size:14px;text-decoration:none;max-width:200px;margin:20px auto 0}
    .sub-crumb{padding:10px 14px;font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:4px;flex-wrap:wrap}
    .sub-crumb a{color:var(--primary);text-decoration:none}
    .sub-crumb .sep{opacity:0.4}
    @media(min-width:768px){
      .sub-third{grid-template-columns:repeat(4,1fr);gap:10px}
      .sub-third-card{padding:16px 8px}
      .sti{font-size:28px}
      .stn{font-size:12px}
    }
  </style>
</head>
<body>
  <script>
    window.IHZ_PAGE = { title: '${name}', icon: '${icon}' };
  </script>

  <div class="page active" id="pageSub">
    <!-- 面包屑 -->
    <div class="sub-crumb">
      <a href="index.html">首页</a>
      <span class="sep">/</span>
      <a href="${EXISTING_PAGES[cat.k] || 'index.html'}">${catIcon} ${catName}</a>
      <span class="sep">/</span>
      <b>${name}</b>
    </div>

    <!-- Hero -->
    <div class="sub-hero">
      <div class="sub-hero-badge">${catIcon} ${catName}</div>
      <h1><span class="hero-icon">${icon}</span> ${name}</h1>
      <p>${intro || desc}</p>
    </div>

    <!-- 内容区 -->
    <div class="sub-body">
      ${thirdHtml}
      ${featHtml}

      <!-- 相关文章 -->
      <div class="sub-block">
        <div class="sub-sec-ttl">📖 相关文章 <span class="sub-more" id="subArtCount"></span></div>
        <div class="sub-arts" id="subArts"><div class="sub-empty">正在加载相关文章…</div></div>
      </div>

      <!-- 同栏目其他二级 -->
      <div class="sub-block">
        <div class="sub-sec-ttl">🧭 同栏目其他版块</div>
        <div class="sub-third" style="grid-template-columns:repeat(4,1fr)">
          ${cat.subs.map(function(s) {
            if (s.n === sub.n) return '';
            const sHref = EXISTING_SUB_PAGES[s.n] || ('sub/' + cat.k + '-' + s.k + '.html');
            return '<a class="sub-third-card" href="' + sHref + '"><span class="sti">' + esc(s.ic) + '</span><span class="stn">' + esc(s.n) + '</span></a>';
          }).join('')}
        </div>
      </div>
    </div>

    <!-- 返回首页 -->
    <div style="padding:0 16px">
      <a href="index.html" class="sub-back">← 返回首页</a>
    </div>
  </div>

  <script src="js/app.js?v=20261018l"></script>
  <script>
    IZ.layout.init();
    (function() {
      var KW = ${kwList};
      var countEl = document.getElementById('subArtCount');
      var box = document.getElementById('subArts');
      fetch('../articles/index.json')
        .then(function(r){ if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
        .then(function(list) {
          var scored = [];
          list.forEach(function(a) {
            var title = a.title || '', catg = a.cat || '', sum = a.summary || '';
            var sc = 0;
            KW.forEach(function(k) {
              if (title.indexOf(k) >= 0) sc += 3;
              else if (catg.indexOf(k) >= 0) sc += 2;
              else if (sum.indexOf(k) >= 0) sc += 1;
            });
            if (sc > 0) scored.push({ a: a, sc: sc });
          });
          scored.sort(function(x, y) {
            if (y.sc !== x.sc) return y.sc - x.sc;
            return (y.a.words || 0) - (x.a.words || 0);
          });
          var top = scored.slice(0, 12);
          if (countEl) countEl.textContent = top.length ? '共 ' + scored.length + ' 篇匹配' : '';
          if (!top.length) {
            box.innerHTML = '<div class="sub-empty">暂无匹配文章，试试上方子栏目入口</div>';
            return;
          }
          box.innerHTML = top.map(function(o) {
            var a = o.a;
            return '<a class="sub-art" href="../articles/' + encodeURIComponent(a.slug) + '.html">' +
              '<span class="sa-t">' + (a.title || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</span>' +
              '<span class="sa-m">' + (a.cat || '') + ' · ' + (a.words || 0) + ' 字</span></a>';
          }).join('');
        })
        .catch(function() {
          if (box) box.innerHTML = '<div class="sub-empty">文章加载失败，请稍后重试</div>';
        });
    })();
  </script>
</body>
</html>`;
}
