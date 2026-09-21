/**
 * iHangzhou 统一布局系统 v2
 * 
 * 页面使用方法（2 步）：
 *   1. <head> 中引入 <script src="js/layout.js"></script>
 *   2. <body> 中：
 *        <script>
 *          IHZ_PAGE = { title: '杭州美食', icon: '🍜' };
 *        </script>
 *        ...
 *        <script>IHZ.layout.init();</script>
 *
 * 注入点：脚本自动 append 到 <body> 首（header）和末（footer）
 */
(function (global) {
  'use strict';

  var LOADED = { header: false, footer: false };

  /**
   * Toast 提示（页面级反馈）
   */
  function showToast(msg, duration) {
    if (!msg) return;
    var dur = duration || 1800;
    var el = document.getElementById('ihzToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ihzToast';
      el.className = 'ihz-toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove('show'); }, dur);
  }
  global.ihzShowToast = showToast;

  /**
   * 加载模板并注入
   */
  function loadTemplate(url, target) {
    return fetch(url + '?v=20260928')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var wrap = document.createElement('div');
        wrap.innerHTML = html.trim();
        var frag = document.createDocumentFragment();
        while (wrap.firstChild) frag.appendChild(wrap.firstChild);
        if (target === 'prepend') {
          document.body.insertBefore(frag, document.body.firstChild);
        } else {
          document.body.appendChild(frag);
        }
        return true;
      })
      .catch(function (err) {
        console.warn('[IHZ layout] 模板加载失败', url, err);
        return false;
      });
  }

  /**
   * 深色 / 大字模式
   */
  function initTheme() {
    var T = global.localStorage.getItem('ihz-theme') || 'light';
    var F = global.localStorage.getItem('ihz_large_font') === 'true';
    var C = global.localStorage.getItem('ihz_color') || 'sky';

    applyTheme(T);
    applyLargeFont(F);
    applyColor(C);

    var dark = document.getElementById('darkModeToggle');
    var large = document.getElementById('largeFontToggle');
    if (dark) dark.checked = T === 'dark';
    if (large) large.checked = F;

    if (dark) dark.addEventListener('change', function () {
      applyTheme(dark.checked ? 'dark' : 'light');
      showToast(dark.checked ? '🌙 已切换到深色模式' : '☀️ 已切换到浅色模式');
    });
    if (large) large.addEventListener('change', function () { applyLargeFont(large.checked); });

    // 主题色点选
    var dots = document.querySelectorAll('.theme-dot');
    dots.forEach(function (dot) {
      if (dot.dataset.color === C) dot.classList.add('active');
      dot.addEventListener('click', function () {
        applyColor(dot.dataset.color);
        dots.forEach(function (d) { d.classList.remove('active'); });
        dot.classList.add('active');
      });
    });
  }

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { global.localStorage.setItem('ihz-theme', t); } catch (e) {}
  }
  function applyLargeFont(on) {
    document.documentElement.setAttribute('data-large-font', on ? 'true' : 'false');
    try { global.localStorage.setItem('ihz_large_font', on ? 'true' : 'false'); } catch (e) {}
  }
  function applyColor(c) {
    var map = {
      sky: '#0ea5e9', emerald: '#10b981', violet: '#8b5cf6',
      rose: '#f43f5e', amber: '#f59e0b'
    };
    if (map[c]) {
      document.documentElement.style.setProperty('--primary', map[c]);
      document.documentElement.style.setProperty('--primary-dark', shiftDark(map[c]));
      document.documentElement.style.setProperty('--primary-light', shiftLight(map[c]));
      try { global.localStorage.setItem('ihz_color', c); } catch (e) {}
    }
  }
  function shiftDark(hex) {
    var r = parseInt(hex.slice(1, 3), 16) * 0.85 | 0;
    var g = parseInt(hex.slice(3, 5), 16) * 0.85 | 0;
    var b = parseInt(hex.slice(5, 7), 16) * 0.85 | 0;
    return '#' + [r, g, b].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
  }
  function shiftLight(hex) {
    var r = Math.min(255, parseInt(hex.slice(1, 3), 16) * 1.2 | 0);
    var g = Math.min(255, parseInt(hex.slice(3, 5), 16) * 1.2 | 0);
    var b = Math.min(255, parseInt(hex.slice(5, 7), 16) * 1.2 | 0);
    return '#' + [r, g, b].map(function (v) { return v.toString(16).padStart(2, '0'); }).join('');
  }

  /**
   * 设置面板开关 + 分享
   */
  function bindSettings() {
    var btn = document.getElementById('settingsBtn');
    var overlay = document.getElementById('settingsOverlay');
    var panel = document.getElementById('settingsPanel');
    var close = document.getElementById('settingsCloseBtn');

    function open() { overlay.classList.add('active'); panel.classList.add('active'); }
    function close_() { overlay.classList.remove('active'); panel.classList.remove('active'); }

    if (btn) btn.addEventListener('click', function () {
      panel.classList.contains('active') ? close_() : open();
    });
    if (overlay) overlay.addEventListener('click', close_);
    if (close) close.addEventListener('click', close_);

    // ===== 分享按钮 =====
    var shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', function () {
        var shareData = {
          title: document.title || 'iHangzhou 杭州生活助手',
          text: document.querySelector('meta[name="description"]')?.content || '杭州生活助手 - 发现杭州美好',
          url: global.location.href
        };
        if (global.navigator.share) {
          global.navigator.share(shareData).catch(function () {});
        } else if (global.navigator.clipboard) {
          global.navigator.clipboard.writeText(shareData.url).then(function () {
            showToast('🔗 链接已复制到剪贴板');
          }).catch(function () {
            showToast('请手动复制地址栏链接分享');
          });
        } else {
          showToast('请手动复制地址栏链接分享');
        }
      });
    }
  }

  /**
   * 底栏当前项高亮
   */
  function highlightNav() {
    var path = global.location.pathname;
    var target = 'home';
    if (path.indexOf('travel') >= 0) target = 'travel';
    else if (path.indexOf('banshi') >= 0) target = 'banshi';
    else if (path.indexOf('articles') >= 0) target = 'articles';
    else if (path.indexOf('me') >= 0) target = 'me';

    var items = document.querySelectorAll('.nav-item');
    items.forEach(function (item) {
      if (item.dataset.target === target) item.classList.add('active');
    });
  }

  /**
   * 更新顶栏标题
   */
  function initTitle() {
    var page = global.IZ_PAGE || global.IHZ_PAGE || {};
    var titleEl = document.getElementById('headerTitle');
    if (titleEl && page.title) {
      titleEl.textContent = (page.icon ? page.icon + ' ' : '') + page.title;
    }
    // 暴露搜索输入框给页面用
    if (window.IZ_PAGE) window.IHZ_SEARCH_INPUT = document.getElementById('headerSearchInput');
  }

  function init() {
    var p1 = window.IZ_HEADER === false ? Promise.resolve(true) : loadTemplate('templates/header.html', 'prepend');
    var p2 = window.IZ_FOOTER === false ? Promise.resolve(true) : loadTemplate('templates/footer.html', 'append');

    Promise.all([p1, p2]).then(function () {
      initTheme();
      bindSettings();
      highlightNav();
      initTitle();
      // 通知页面布局就绪
      if (typeof global.onIHZLayoutReady === 'function') {
        global.onIHZLayoutReady();
      }
    });
  }

  global.IZ = global.IZ || {};
  global.IZ.layout = { init: init };
  // 向后兼容
  global.ihzLayout = { init: init };
})(window);
