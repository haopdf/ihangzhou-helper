// 生成独立频道页面
// 用法: node gen-channels.js
const fs = require('fs');
const path = require('path');

const channels = [
  { id: 'banshi', name: '办事指南', icon: '🏛️', desc: '杭州政务办事一站导航，涵盖社保、公积金、落户、证件、人才、补贴等高频办事服务', kw: '杭州办事,社保查询,公积金,落户,杭州政务,ihangzhou' },
  { id: 'traffic', name: '交通出行', icon: '🗺️', desc: '杭州交通出行全攻略，限行查询、地铁公交、火车机票、打车租车、停车缴费、违章处理', kw: '杭州交通,限行查询,地铁,公交,火车,杭州出行,ihangzhou' },
  { id: 'food', name: '杭州美食', icon: '🍜', desc: '杭帮菜经典名菜与街头小吃，西湖醋鱼、龙井虾仁、东坡肉、片儿川，品味千年饮食文化', kw: '杭州美食,杭帮菜,西湖醋鱼,龙井虾仁,东坡肉,片儿川,ihangzhou' },
  { id: 'laozihao', name: '老字号', icon: '🏮', desc: '杭州百年老字号品牌，胡庆余堂、王星记、张小泉、知味观、楼外楼，传承匠心工艺', kw: '杭州老字号,胡庆余堂,王星记,张小泉,知味观,楼外楼,ihangzhou' },
  { id: 'celebrity', name: '杭州名人', icon: '👤', desc: '杭州历史与当代名人录，从白居易、苏东坡到林徽因、章太炎，见证城市人文脉络', kw: '杭州名人,白居易,苏东坡,林徽因,章太炎,杭州历史人物,ihangzhou' },
  { id: 'history', name: '历史文化', icon: '🏯', desc: '杭州历史文化探索，南宋皇城、良渚古城、京杭大运河、西湖文化，世界遗产巡礼', kw: '杭州历史,南宋皇城,良渚古城,京杭大运河,西湖,世界遗产,ihangzhou' },
  { id: 'internet', name: '互联网大厂', icon: '💻', desc: '杭州互联网大厂聚集地，阿里巴巴、网易、字节跳动、蚂蚁集团，数字经济高地', kw: '杭州互联网,阿里巴巴,网易,字节跳动,蚂蚁集团,数字经济,ihangzhou' },
  { id: 'zhaopin', name: '人才招聘', icon: '💼', desc: '杭州人才招聘导航，事业单位、国企、大厂、校招、实习，求职就业一站直达', kw: '杭州招聘,杭州求职,事业单位,国企,大厂校招,杭州人才,ihangzhou' },
  { id: 'street', name: '街道故事', icon: '🛤️', desc: '杭州街道故事，河坊街、南山路、延安路、湖滨路，每条街道都是城市记忆', kw: '杭州街道,河坊街,南山路,延安路,湖滨路,杭州老街,ihangzhou' },
  { id: 'weekend', name: '周末休闲', icon: '🎉', desc: '杭州周末休闲指南，亲子游、免费景点、特色市集、短途自驾、夜生活，周末不无聊', kw: '杭州周末,亲子游,免费景点,特色市集,短途自驾,夜生活,ihangzhou' },
  { id: 'museum', name: '博物馆游', icon: '🏛️', desc: '杭州博物馆地图，省博物馆、丝绸博物馆、茶叶博物馆、良渚博物院，免费文化之旅', kw: '杭州博物馆,省博物馆,丝绸博物馆,茶叶博物馆,良渚博物院,免费展览,ihangzhou' },
  { id: 'coffee', name: '咖啡馆指南', icon: '☕', desc: '杭州咖啡馆指南，西湖边、南山路、青芝坞、馒头山，寻找城市中的咖啡香气', kw: '杭州咖啡馆,西湖边咖啡,南山路咖啡,青芝坞,馒头山,杭州咖啡,ihangzhou' }
];

// 频道模板
function genChannelHtml(ch) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="${ch.desc}，所有链接指向官方渠道。">
  <meta name="keywords" content="${ch.kw}">
  <meta name="theme-color" content="#0ea5e9">
  <meta property="og:title" content="${ch.name} · iHangzhou">
  <meta property="og:description" content="${ch.desc}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="iHangzhou 杭州生活助手">
  <link rel="canonical" href="https://www.ihangzhou.net/${ch.id}.html">
  <link rel="manifest" href="manifest.json">
  <title>${ch.name} · iHangzhou 杭州生活助手</title>
  <link rel="stylesheet" href="css/style.css?v=20260927a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏔️</text></svg>">
</head>
<body>

  <!-- 顶部栏 -->
  <header class="topbar">
    <a href="index.html" class="topbar-back" style="color:#fff;text-decoration:none;font-size:20px;padding: 4px 16px;">‹</a>
    <div class="city-wrap">
      <div class="topbar-city" id="citySelect">
        <span id="cityName">杭州</span><span class="city-arrow">▼</span>
      </div>
      <div class="city-dropdown" id="cityDropdown">
        <div class="city-dropdown-title">选择区县</div>
      </div>
    </div>
    <div class="topbar-search">
      <input type="text" id="channelSearchInput" placeholder="在本频道搜索..." autocomplete="off">
    </div>
    <button class="topbar-elderly" onclick="toggleElderlyMode()" title="大字模式">🔤 大字</button>
    <button class="theme-btn" id="themeBtn" title="切换主题">🌙</button>
  </header>

  <script>
    // 主题 + 大字模式持久化
    (function () {
      try {
        var t = localStorage.getItem('ihz-theme') || 'light';
        document.documentElement.setAttribute('data-theme', t);
        var b = document.getElementById('themeBtn');
        if (b) b.textContent = t === 'dark' ? '☀️' : '🌙';
      } catch (e) {}
      try {
        var el = localStorage.getItem('ihz_elderly') === 'true';
        document.documentElement.setAttribute('data-elderly', el ? 'true' : 'false');
      } catch (e) {}
    })();
  </script>

  <!-- 当前区县特色卡片 -->
  <div class="district-info" id="districtInfo"></div>

  <!-- 频道内容 -->
  <div class="page active" id="pageChannel">
    <!-- 频道头部 -->
    <div class="channel-header" id="channelHeader"></div>

    <!-- 频道描述 -->
    <div class="channel-desc" id="channelDesc"></div>

    <!-- 频道服务网格 -->
    <div class="content">
      <div class="section-head">
        <h2 id="channelTitle">${ch.name} · 全部服务</h2>
        <span class="tip" id="channelCount"></span>
      </div>
      <div class="service-grid" id="serviceGrid"></div>
    </div>

    <!-- 相关频道推荐 -->
    <div class="related-channels">
      <div class="section-head">
        <h2>相关频道</h2>
        <span class="tip">探索更多</span>
      </div>
      <div class="channel-grid" id="relatedChannels"></div>

      <!-- 相关文章 -->
      <div id="relatedArticles"></div>
    </div>

    <!-- 返回首页 -->
    <div style="text-align:center;padding: 24px 16px 48px 16px;">
      <a href="index.html" style="display:inline-block;padding: 12px 16px;background:var(--primary);color:#fff;border-radius:24px;font-size:14px;text-decoration:none;">← 返回首页</a>
    </div>
  </div>

  <!-- 模态框 -->
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal">
      <div class="modal-header">
        <h3 id="modalTitle">标题</h3>
        <button class="modal-close" id="modalClose">✕</button>
      </div>
      <div class="modal-body" id="modalBody"></div>
    </div>
  </div>

  <script src="js/app.js?v=20260927a"></script>
  <script>
    // 频道专题页逻辑
    (function () {
      'use strict';

      var CHANNEL_ID = '${ch.id}';
      var CHANNEL_NAME = '${ch.name}';
      var CHANNEL_ICON = '${ch.icon}';
      var CHANNEL_DESC = '${ch.desc}，所有链接指向官方渠道。';

      // 相关频道推荐
      var RELATED = {
        'banshi': ['traffic', 'zhaopin', 'laozihao'],
        'traffic': ['banshi', 'weekend', 'museum'],
        'food': ['laozihao', 'street', 'coffee'],
        'laozihao': ['food', 'history', 'street'],
        'celebrity': ['history', 'street', 'museum'],
        'history': ['celebrity', 'museum', 'laozihao'],
        'internet': ['zhaopin', 'street', 'coffee'],
        'zhaopin': ['banshi', 'internet', 'weekend'],
        'street': ['food', 'coffee', 'history'],
        'weekend': ['museum', 'food', 'street'],
        'museum': ['history', 'weekend', 'celebrity'],
        'coffee': ['street', 'weekend', 'food']
      };

      // 根据频道关键词从 articles/index.json 匹配相关文章
      function fetchRelatedArticles(chips, categoryName) {
        var el = document.getElementById('relatedArticles');
        if (!el) return;
        var allChips = (chips || []).slice(0, 3);
        if (categoryName) allChips.unshift(categoryName);

        fetch('articles/index.json?t=' + Date.now())
          .then(function(r) { return r.json(); })
          .then(function(list) {
            var matched = [];
            list.forEach(function(a) {
              for (var i = 0; i < allChips.length; i++) {
                var kw = allChips[i];
                if (!kw) continue;
                if (a.title.indexOf(kw) >= 0 || a.summary.indexOf(kw) >= 0 || a.cat.indexOf(kw) >= 0) {
                  matched.push(a);
                  break;
                }
              }
            });
            matched = matched.slice(0, 5);
            if (!matched.length) { el.innerHTML = ''; return; }

            el.innerHTML =
              '<div class="section-head" style="margin-top:24px;padding:0 16px;">' +
              '<h2>📚 相关杭州故事</h2>' +
              '<span class="tip">共 ' + matched.length + ' 篇</span>' +
              '</div>' +
              '<div style="padding: 0 16px;">' +
              matched.map(function(a) {
                return '<a href="articles/' + a.slug + '.html" style="display:block;padding:12px 14px;background:var(--bg-card);border:1px solid var(--border-light);border-radius:10px;margin-bottom:8px;text-decoration:none;color:inherit;">' +
                  '<div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px;">' + a.title + '</div>' +
                  '<div style="font-size:12px;color:var(--text-muted);line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + a.summary + '</div>' +
                  '</a>';
              }).join('') +
              '<a href="articles.html" style="display:block;text-align:center;padding:12px;background:var(--bg-alt);border-radius:10px;color:var(--primary);font-size:13px;text-decoration:none;font-weight:500;margin-top:8px;">📖 查看全部杭州故事 →</a>' +
              '</div>';
          })
          .catch(function() { /* 静默失败 */ });
      }

      function getServiceIcon(name) {
        if (window.getServiceIcon) return window.getServiceIcon(name);
        return '📌';
      }

      function renderChannel() {
        if (!window._getData) {
          document.getElementById('channelHeader').innerHTML = '<div style="text-align:center;padding: 40px 16px;color:var(--text-muted);">数据加载失败，请刷新重试</div>';
          return;
        }

        var DATA = window._getData();
        var category = DATA.categories.find(function (c) { return c.id === CHANNEL_ID; });
        if (!category) {
          document.getElementById('channelHeader').innerHTML = '<div style="text-align:center;padding: 40px 16px;color:var(--text-muted);">频道「' + CHANNEL_NAME + '」数据未找到</div>';
          return;
        }

        // 渲染频道头部
        var header = document.getElementById('channelHeader');
        header.innerHTML =
          '<div class="ch-hero" style="background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;padding: 32px 16px 24px 16px;text-align:center;">' +
          '<div style="font-size:56px;line-height:1;margin-bottom:8px;">' + category.icon + '</div>' +
          '<h1 style="font-size:24px;font-weight:700;margin:0;">' + category.name + '</h1>' +
          '<div style="font-size:13px;opacity:0.9;margin-top:6px;">iHangzhou · 杭州生活助手</div>' +
          '</div>';

        // 渲染描述 + 提取关键词变成可点击 chip
        var descEl = document.getElementById('channelDesc');
        var descText = CHANNEL_DESC;
        var chips = [];
        var tokens = descText.split(/[、，,；。]/);
        tokens.forEach(function(t) {
          t = t.trim();
          if (t.length >= 2 && t.length <= 10 && !/^[a-z0-9]+$/i.test(t)) chips.push(t);
        });
        chips = chips.filter(function(v, i, a) { return a.indexOf(v) === i; }).slice(0, 8);

        var chipsHtml = chips.length ?
          '<div class="ch-chips" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">' +
          chips.map(function(c) {
            return '<a class="ch-chip" href="articles.html?q=' + encodeURIComponent(c) + '" style="display:inline-block;padding:4px 12px;background:var(--bg-alt);border:1px solid var(--border);border-radius:14px;font-size:12px;color:var(--text-secondary);text-decoration:none;font-weight:500;">' + c + '</a>';
          }).join('') + '</div>' : '';

        descEl.innerHTML =
          '<div style="padding:16px;background:var(--bg-card);border-radius:0 0 12px 12px;margin:0 16px;font-size:14px;line-height:1.7;color:var(--text-secondary);">' +
          descText + chipsHtml +
          '</div>';

        // 相关文章区域
        fetchRelatedArticles(chips, category.name);

        // 渲染标题与数量
        document.getElementById('channelTitle').textContent = category.name + ' · 全部服务';
        document.getElementById('channelCount').textContent = '共 ' + category.items.length + ' 项';

        // 渲染服务网格
        var grid = document.getElementById('serviceGrid');
        grid.innerHTML = category.items.map(function (item) {
          if (item.url) {
            return ('<a class="sitem" href="' + item.url + '"' + ( /^https?:\/\//i.test(item.url) ? ' target="_blank" rel="noopener noreferrer"' : '' ) + '>') +
              '<div class="sicon">' + (getServiceIcon(item.name) || '📌') + '</div>' +
              '<div class="sinfo">' +
              '<div class="sname">' + item.name + '</div>' +
              '<div class="sdesc">' + item.desc + '</div>' +
              '</div>' +
              '<div class="sarrow">›</div>' +
              '</a>';
          }
          return '<div class="sitem" data-action="' + (item.action || '') + '" data-url="">' +
            '<div class="sicon">' + (getServiceIcon(item.name) || '📌') + '</div>' +
            '<div class="sinfo">' +
            '<div class="sname">' + item.name + '</div>' +
            '<div class="sdesc">' + item.desc + '</div>' +
            '</div>' +
            '<div class="sarrow">›</div>' +
            '</div>';
        }).join('');

        // 渲染相关频道
        var related = RELATED[CHANNEL_ID] || [];
        var relEl = document.getElementById('relatedChannels');
        if (relEl && related.length) {
          relEl.innerHTML = related.map(function (rid) {
            var rcat = DATA.categories.find(function (c) { return c.id === rid; });
            if (!rcat) return '';
            return '<a class="channel-item" href="' + rid + '.html">' +
              '<span class="ch-icon">' + rcat.icon + '</span>' +
              '<span class="ch-name">' + rcat.name + '</span>' +
              '</a>';
          }).join('');
        }

        // 搜索（频道内搜索）
        var searchInput = document.getElementById('channelSearchInput');
        if (searchInput) {
          searchInput.addEventListener('input', function (e) {
            var q = e.target.value.trim().toLowerCase();
            if (!q) {
              grid.querySelectorAll('.sitem').forEach(function (el) { el.style.display = 'flex'; });
              return;
            }
            grid.querySelectorAll('.sitem').forEach(function (el) {
              var name = el.querySelector('.sname').textContent.toLowerCase();
              var desc = el.querySelector('.sdesc').textContent.toLowerCase();
              el.style.display = (name.indexOf(q) >= 0 || desc.indexOf(q) >= 0) ? 'flex' : 'none';
            });
          });
        }
      }

      // 初始化
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderChannel);
      } else {
        renderChannel();
      }
    })();
  </script>

  <nav class="bottom-nav">
    <a class="bnav-item" href="index.html">
      <span class="bicon">🏠</span><span>首页</span>
    </a>
    <a class="bnav-item" href="index.html#tools">
      <span class="bicon">🛠️</span><span>工具</span>
    </a>
    <a class="bnav-item" href="index.html#phone">
      <span class="bicon">📞</span><span>电话</span>
    </a>
    <a class="bnav-item" href="index.html#me">
      <span class="bicon">👤</span><span>我的</span>
    </a>
  </nav>
</body>
</html>
`;
}

// 生成所有频道页面
channels.forEach(function(ch) {
  var filePath = path.join(__dirname, ch.id + '.html');
  fs.writeFileSync(filePath, genChannelHtml(ch), 'utf8');
  console.log('Generated: ' + ch.id + '.html');
});

console.log('\\nDone! Generated ' + channels.length + ' channel pages.');
