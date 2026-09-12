// iHangzhou 访问统计与反馈模块
(function() {
  'use strict';

  var ANALYTICS_API = '/api/tools?action=track';
  var FEEDBACK_API = '/api/tools?action=feedback';

  function trackClick(category, item, tabId, searchQuery) {
    var data = { category: category, item: item, tab: tabId || '', search: searchQuery || '', action: 'click', time: Date.now() };
    fetch(ANALYTICS_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(function() {});
    try {
      var key = 'ihangzhou_clicks';
      var clicks = JSON.parse(localStorage.getItem(key) || '[]');
      clicks.push(data);
      if (clicks.length > 1000) clicks = clicks.slice(-1000);
      localStorage.setItem(key, JSON.stringify(clicks));
    } catch (e) {}
  }

  function trackSearch(query) { trackClick('search', query, 'search', query); }
  function trackTab(tabId) { trackClick('tab', tabId, tabId, ''); }

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

    if (!content) { showToast('请输入反馈内容'); return; }
    if (content.length < 5) { showToast('反馈内容太短，请详细描述'); return; }

    var feedback = { type: type, content: content, contact: contact, url: window.location.href, ua: navigator.userAgent, time: new Date().toISOString() };

    try {
      var feedbacks = JSON.parse(localStorage.getItem('ihangzhou_feedbacks') || '[]');
      feedbacks.push(feedback);
      localStorage.setItem('ihangzhou_feedbacks', JSON.stringify(feedbacks));
    } catch (e) {}

    fetch(FEEDBACK_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(feedback) })
      .then(function(res) { return res.json(); })
      .then(function(data) { showToast(data.success ? '✅ 感谢您的反馈！' : '⚠️ 已暂存，待网络恢复后发送'); })
      .catch(function() { showToast('⚠️ 已暂存本地'); });

    var overlay = document.getElementById('modalOverlay');
    if (overlay) { overlay.classList.remove('active'); document.body.style.overflow = ''; }
  };

  function init() {
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
        if (tab && tab.dataset.tab) trackTab(tab.dataset.tab);
      });
    }
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

  window.iHangzhouTrack = { click: trackClick, search: trackSearch, trackTab: trackTab };
})();
