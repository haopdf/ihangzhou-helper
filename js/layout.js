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
    return fetch(url + '?v=20261018l')
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
   * 深色 / 大字模式（与首页 app.js 完全一致的存储键 + DOM 属性 + 行为）
   * 供设置面板内联 onchange="setDarkMode(...)" / onchange="setElderlyMode(...)" 调用
   */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { global.localStorage.setItem('ihz-theme', t); } catch (e) {}
  }
  function applyElderly(on) {
    document.documentElement.setAttribute('data-elderly', on ? 'true' : 'false');
    if (on) { try { global.localStorage.setItem('ihz_fontsize', 'xlarge'); } catch (e) {} }
    var et = document.getElementById('elderlyToggle');
    if (et) et.checked = on;
  }
  function initTheme() {
    var T = lsGet('ihz-theme', 'light');
    var E = lsGet('ihz_elderly', 'false') === 'true';
    applyTheme(T);
    applyElderly(E);
    var dt = document.getElementById('darkToggle');
    if (dt) dt.checked = T === 'dark';
    // elderlyToggle 已在 applyElderly 内同步
  }

  // ===== 全局设置函数（与首页 app.js 同名同行为；app.js 已定义则不覆盖，仅给纯模板页兜底）=====
  if (typeof global.toggleSettings !== 'function') {
    global.toggleSettings = function () {
      var overlay = document.getElementById('settingsOverlay');
      var panel = document.getElementById('settingsPanel');
      if (!overlay || !panel) return;
      var show = !panel.classList.contains('show');
      if (show) {
        overlay.classList.add('show');
        panel.classList.add('show');
        var dark = lsGet('ihz-theme', 'light') === 'dark';
        var elderly = lsGet('ihz_elderly', 'false') === 'true';
        var dt = document.getElementById('darkToggle');
        var et = document.getElementById('elderlyToggle');
        if (dt) dt.checked = dark;
        if (et) et.checked = elderly;
      } else {
        overlay.classList.remove('show');
        panel.classList.remove('show');
      }
    };
  }
  if (typeof global.setDarkMode !== 'function') {
    global.setDarkMode = function (on) {
      var theme = on ? 'dark' : 'light';
      lsSet('ihz-theme', theme);
      applyTheme(theme);
    };
  }
  // ESC 关闭设置面板（与 modal 的 ESC 行为一致；只绑一次）
  if (!global._izSettingsEscBound) {
    global._izSettingsEscBound = true;
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.getElementById('settingsPanel');
      var overlay = document.getElementById('settingsOverlay');
      if (panel && panel.classList.contains('show')) {
        panel.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
      }
    });
  }
  if (typeof global.setElderlyMode !== 'function') {
    global.setElderlyMode = function (on) {
      lsSet('ihz_elderly', on ? 'true' : 'false');
      applyElderly(on);
      showToast(on ? '已开启大字模式' : '已关闭大字模式');
    };
  }

  /**
   * 设置面板开关 + 分享
   */
  function bindSettings() {
    // 设置面板开关已由模板内联 onclick="toggleSettings()" 处理（与首页一致，使用 .show 类）
    // 此处仅绑定「分享」按钮

    // ===== 分享按钮：直接复制链接 =====
    var shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', function () {
        var url = global.location.href;
        var title = document.title || 'iHangzhou 杭州生活助手';
        var shareText = title + '\n' + url;
        if (global.navigator.clipboard) {
          global.navigator.clipboard.writeText(shareText).then(function () {
            showToast('🔗 链接已复制，粘贴给朋友吧');
          }).catch(function () {
            // 降级方案：用 textarea 选中复制
            var ta = document.createElement('textarea');
            ta.value = shareText;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); showToast('🔗 链接已复制'); }
            catch (e) { showToast('链接：' + url); }
            document.body.removeChild(ta);
          });
        } else {
          showToast('链接：' + url);
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
   * 搜索展开 / 取消（移动端全宽体验）
   */
  function bindSearch() {
    var input = document.getElementById('headerSearchInput');
    var header = document.getElementById('appHeader');
    if (!input || !header) return;

    // 动态创建取消按钮
    var cancel = document.createElement('button');
    cancel.className = 'header-search-cancel';
    cancel.textContent = '取消';
    cancel.style.display = 'none';
    header.appendChild(cancel);

    input.addEventListener('focus', function () {
      header.classList.add('searching');
      cancel.style.display = 'block';
    });
    function closeSearch() {
      header.classList.remove('searching');
      cancel.style.display = 'none';
      input.value = '';
      input.blur();
      // 触发 input 事件，让页面有机会恢复列表
      try { input.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
    }
    cancel.addEventListener('click', closeSearch);
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
    // 使用根路径（/开头），从任意子目录（如 /articles/）都能正确加载模板
    var hPath = '/templates/header.html';
    var fPath = '/templates/footer.html';
    // 本地 file:// 协议下根路径不可用，退回相对路径
    if (location.protocol === 'file:') {
      hPath = 'templates/header.html';
      fPath = 'templates/footer.html';
    }
    var p1 = window.IZ_HEADER === false ? Promise.resolve(true) : loadTemplate(hPath, 'prepend');
    var p2 = window.IZ_FOOTER === false ? Promise.resolve(true) : loadTemplate(fPath, 'append');

    Promise.all([p1, p2]).then(function () {
      bindSearch();
      initTheme();
      bindSettings();
      highlightNav();
      initTitle();
      // 区县下拉渲染（app.js 在 IZ_SKIP_APP_INIT 页面会提前 return，必须在此兜底调用）
      if (typeof global.initCityDropdown === 'function') global.initCityDropdown();
      // 绑定「当前城市 ▼」触发按钮（app.js 的 bindCityDropdown 在 skip 页未执行，这里兜底，幂等）
      bindCityTrigger();
    }).catch(function () {
      // 模板加载失败时仍继续，不应阻塞页面关键逻辑
    }).finally(function () {
      // 无论模板加载成功与否，都通知页面布局就绪
      if (typeof global.onIHZLayoutReady === 'function') {
        global.onIHZLayoutReady();
      }
    });
  }

  // ===== 区县切换（自带数据，确保不加载 app.js 的页也能用「设置」里的区县切换）=====
  function lsGet(k, d) { try { return localStorage.getItem(k) || d; } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var DISTRICTS = [
    { id: 'hangzhou', name: '杭州', full: '杭州市', desc: '全市通用' },
    { id: 'shangcheng', name: '上城', full: '上城区', desc: '湖滨/望江/清波' },
    { id: 'gongshu', name: '拱墅', full: '拱墅区', desc: '湖墅/小河/祥符' },
    { id: 'xihu', name: '西湖', full: '西湖区', desc: '灵隐/文新/留下' },
    { id: 'binjiang', name: '滨江', full: '滨江区', desc: '浦沿/长河/西兴' },
    { id: 'xiaoshan', name: '萧山', full: '萧山区', desc: '北干/蜀山/新塘' },
    { id: 'yuhang', name: '余杭', full: '余杭区', desc: '临平/仓前/良渚' },
    { id: 'linping', name: '临平', full: '临平区', desc: '南苑/东湖/运河' },
    { id: 'qiantang', name: '钱塘', full: '钱塘区', desc: '下沙/白杨/河庄' },
    { id: 'fuyang', name: '富阳', full: '富阳区', desc: '富春/银湖/东洲' },
    { id: 'linan', name: '临安', full: '临安区', desc: '锦城/锦南/青山湖' },
    { id: 'tonglu', name: '桐庐', full: '桐庐县', desc: '桐君/城南/富春江' },
    { id: 'chunan', name: '淳安', full: '淳安县', desc: '千岛湖/文昌/临岐' },
    { id: 'jiande', name: '建德', full: '建德市', desc: '新安江/梅城/寿昌' }
  ];

  function initCityDropdown() {
    var cur = lsGet('ihz_city', 'hangzhou');
    var nameEl = document.getElementById('cityName');
    if (nameEl) nameEl.textContent = (DISTRICTS.find(function (d) { return d.id === cur; }) || DISTRICTS[0]).full;
    var box = document.getElementById('cityDropdown');
    if (!box) return;
    var curId = lsGet('ihz_city', 'hangzhou');
    var html = '<div class="city-dropdown-title">选择区县</div>';
    DISTRICTS.forEach(function (d) {
      html += '<div class="city-dropdown-item' + (d.id === curId ? ' active' : '') + '" data-id="' + d.id + '">' +
        '<span>' + d.full + '</span><span class="cd-dist">' + d.desc + '</span></div>';
    });
    box.innerHTML = html;
    if (!box._delegateBound) {
      box._delegateBound = true;
      box.addEventListener('click', function (e) {
        var item = e.target.closest('.city-dropdown-item');
        if (!item) return;
        e.preventDefault();
        e.stopPropagation();
        var id = item.getAttribute('data-id');
        lsSet('ihz_city', id);
        var d = DISTRICTS.find(function (x) { return x.id === id; });
        var ne = document.getElementById('cityName');
        if (ne) ne.textContent = d.full;
        box.querySelectorAll('.city-dropdown-item').forEach(function (it) {
          it.classList.toggle('active', it.getAttribute('data-id') === id);
        });
        var overlay = document.getElementById('settingsOverlay');
        var settingsPanel = document.getElementById('settingsPanel');
        if (overlay) overlay.classList.remove('show');
        if (settingsPanel) settingsPanel.classList.remove('show');
        if (id === 'hangzhou') {
          var isIndex = location.pathname === '/' ||
            /\/index\.html?$/i.test(location.pathname) ||
            location.pathname.endsWith('/ihangzhou-helper/');
          if (isIndex) {
            if (typeof renderTodayHangzhou === 'function') renderTodayHangzhou();
            if (typeof renderDistrictInfo === 'function') renderDistrictInfo();
            showToast('已切换到 ' + d.full);
            return;
          }
          showToast('已切换到 ' + d.full);
          setTimeout(function () { location.href = 'index.html'; }, 400);
          return;
        }
        showToast('正在跳转 ' + d.full);
        setTimeout(function () { location.href = 'district.html?id=' + id; }, 400);
      });
    }
  }
  global.initCityDropdown = initCityDropdown;

  // 绑定「当前城市 ▼」触发按钮：点击展开/收起区县下拉（与首页 bindCityDropdown 一致）
  function bindCityTrigger() {
    var trigger = document.getElementById('citySelect');
    var box = document.getElementById('cityDropdown');
    if (!trigger || !box || trigger._bound) return;
    trigger._bound = true;
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      box.classList.toggle('show');
    });
    if (!box._docClickBound) {
      box._docClickBound = true;
      document.addEventListener('click', function (e) {
        var b = document.getElementById('citySelect');
        var bx = document.getElementById('cityDropdown');
        if (!b || !bx) return;
        if (!b.contains(e.target) && !bx.contains(e.target)) bx.classList.remove('show');
      });
    }
  }

  global.IZ = global.IZ || {};
  global.IZ.layout = { init: init };
  // 向后兼容
  global.ihzLayout = { init: init };
})(window);
