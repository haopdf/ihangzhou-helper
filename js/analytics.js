// iHangzhou 访问统计与反馈模块 v2
// 增强：UV 指纹 / PV 追踪 / 时序聚合
(function() {
  'use strict';

  var ANALYTICS_API = '/api/tools?action=track';
  var FEEDBACK_API = '/api/tools?action=feedback';

  // ===== UUID（持久访客标识） =====
  function getUuid() {
    try {
      var id = localStorage.getItem('ihz_uuid');
      if (!id) {
        id = 'u_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 6);
        localStorage.setItem('ihz_uuid', id);
      }
      return id;
    } catch (e) { return 'anon_' + Date.now(); }
  }

  // ===== 简易浏览器指纹 =====
  function getFingerprint() {
    try {
      var raw = navigator.userAgent + '|' + screen.width + 'x' + screen.height + '|' +
        (navigator.language || '') + '|' + (new Date().getTimezoneOffset()) + '|' +
        (navigator.hardwareConcurrency || 0);
      var hash = 0;
      for (var i = 0; i < raw.length; i++) {
        hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
      }
      return Math.abs(hash).toString(36);
    } catch (e) { return 'fp_unknown'; }
  }

  function todayStr() { return new Date().toISOString().slice(0, 10); }

  // ===== 数据发送 =====
  function send(data) {
    // 始终携带当前页面（含 hash）
    if (!data.page) data.page = location.pathname + (location.hash || '');
    fetch(ANALYTICS_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(function() {});
  }

  // ===== 获取当前页面标识（含独立频道页与 hash） =====
  function getPageName() {
    var p = location.pathname;
    var h = location.hash || '';
    // 独立频道页：food.html → /food, history.html → /history
    if (p.endsWith('.html')) p = p.replace(/\.html$/, '');
    if (p === '/' || p === '/index' || p === '') return h ? '/#' + h : '/index';
    return p + h;
  }

  // ===== PV 上报（每次页面加载/切换自动调用） =====
  // pageOverride 用于 SPA 内切换时明确指定页面（如首页 Tab → /index#tab-food）
  function trackPageView(pageOverride) {
    var pg = pageOverride || getPageName();
    send({ action: 'pv', uuid: getUuid(), fp: getFingerprint(), page: pg, ref: document.referrer || '', day: todayStr(), t: Date.now() });
  }

  // ===== 点击事件 =====
  function trackClick(category, item, tabId, searchQuery) {
    send({ action: 'click', category: category, item: item, tab: tabId || '', search: searchQuery || '', uuid: getUuid(), day: todayStr(), t: Date.now() });
  }

  function trackSearch(query) { trackClick('search', query, 'search', query); }
  function trackTab(tabId) { trackClick('tab', tabId, tabId, ''); }

  // ===== 反馈模块 =====
  window.showFeedback = function() {
    var html = '<div class="feedback-form">' +
      '<div class="fb-type"><label>反馈类型</label><div class="fb-types">' +
      '<button class="fb-type-btn active" data-type="suggest">💡 建议</button>' +
      '<button class="fb-type-btn" data-type="bug">🐛 报错</button>' +
      '<button class="fb-type-btn" data-type="fix">✏️ 纠错</button>' +
      '<button class="fb-type-btn" data-type="praise">👍 好评</button>' +
      '</div></div>' +
      '<div class="fb-field"><label>反馈内容</label><textarea id="fbContent" placeholder="请详细描述您的建议、问题或纠错内容..."></textarea></div>' +
      '<div class="fb-field"><label>联系方式（选填）</label><input type="text" id="fbContact" placeholder="微信号/手机/邮箱，便于我们回复您"></div>' +
      '<button class="btn btn-primary" onclick="submitFeedback()">提交反馈</button>' +
      '<p class="fb-tip">感谢您的反馈！我们会认真处理每一条意见</p>' +
    '</div>';
    openModal('💬 意见反馈', html);
    document.querySelectorAll('.fb-type-btn').forEach(function(btn) {
      btn.onclick = function() {
        document.querySelectorAll('.fb-type-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
      };
    });
  };

  window.submitFeedback = function() {
    var type = document.querySelector('.fb-type-btn.active') ? document.querySelector('.fb-type-btn.active').dataset.type : 'suggest';
    var content = document.getElementById('fbContent') ? document.getElementById('fbContent').value.trim() : '';
    var contact = document.getElementById('fbContact') ? document.getElementById('fbContact').value.trim() : '';
    var toast = window.ihzShowToast || function(msg) { try { alert(msg); } catch(e) {} };
    if (!content) { toast('请输入反馈内容'); return; }
    if (content.length < 5) { toast('反馈内容太短，请详细描述'); return; }
    var feedback = { type: type, content: content, contact: contact, url: window.location.href, ua: navigator.userAgent, time: new Date().toISOString() };
    try {
      var feedbacks = JSON.parse(localStorage.getItem('ihangzhou_feedbacks') || '[]');
      feedbacks.push(feedback);
      localStorage.setItem('ihangzhou_feedbacks', JSON.stringify(feedbacks));
    } catch (e) {}
    var overlay = document.getElementById('modalOverlay');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
    toast('✅ 感谢您的反馈！');
    fetch(FEEDBACK_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(feedback) })
      .then(function(res) { return res.json(); })
      .then(function(data) { if (!data.success) console.warn('反馈提交异常:', data); })
      .catch(function() {});
  };

  // ===== 初始化 =====
  function init() {
    // 自动 PV
    trackPageView();
    // 监听 hash 变化（SPA 路由切换 → 上报 PV）
    window.addEventListener('hashchange', function() {
      setTimeout(trackPageView, 200);
    });
    // 反馈按钮
    if (!document.getElementById('feedbackBtn')) {
      var btn = document.createElement('div');
      btn.id = 'feedbackBtn';
      btn.innerHTML = '💬';
      btn.title = '意见反馈';
      btn.onclick = function() { window.showFeedback(); };
      document.body.appendChild(btn);
    }
    var tabs = document.getElementById('tabs');
    if (tabs) {
      tabs.addEventListener('click', function(e) {
        var tab = e.target.closest('.tab');
        if (tab && tab.dataset.tab) {
          // Tab 切换：用 page 参数区分首页不同 Tab（美食/旅游/生活…）
          trackTab(tab.dataset.tab);
          setTimeout(function() { trackPageView('/index#tab-' + tab.dataset.tab); }, 200);
        }
      });
    }
    // 服务详情弹窗 → 也上报一次 PV（页面= /detail?item=名称）
    document.addEventListener('click', function(e) {
      var sitem = e.target.closest('.sitem');
      if (sitem && sitem.dataset.detail === 'modal') {
        var nm = sitem.querySelector('.sname');
        if (nm) trackPageView('/detail?item=' + encodeURIComponent(nm.textContent.trim()));
      }
    });
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim()) trackSearch(this.value.trim());
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  window.iHangzhouTrack = { click: trackClick, search: trackSearch, tab: trackTab, pv: trackPageView };
})();
