/**
 * channel-route.js — 为频道页（celebrity/traffic/banshi 等）添加 ?id= 直达筛选
 *
 * 用法：在 category 数据就绪后、渲染 serviceGrid 之前调用：
 *   applyChannelRoute(category, {
 *     titleEl: 'channelTitle',
 *     countEl: 'channelCount',
 *     descEl: 'channelDesc'
 *   });
 * 返回被筛选后的 category（若无 ?id= 匹配则原样返回）。
 */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.applyChannelRoute = function (category, opts) {
    opts = opts || {};
    if (!category || !category.items) return category;

    var params = new URLSearchParams(location.search);
    var routeId = (params.get('id') || '').trim();
    if (!routeId) return category;

    // 按 id 或 name 精确匹配
    var matched = category.items.filter(function (it) {
      if (!it) return false;
      var keys = [it.id, it.name, it.key];
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] != null && String(keys[i]).trim() === routeId) return true;
      }
      return false;
    });

    if (!matched.length) {
      return category; // 找不到匹配项，回退到完整列表
    }

    // 更新 DOM（标题 / 描述 / 隐藏多余区块）
    var tEl = document.getElementById(opts.titleEl || 'channelTitle');
    var cEl = document.getElementById(opts.countEl || 'channelCount');
    var dEl = document.getElementById(opts.descEl || 'channelDesc');
    if (tEl) tEl.textContent = matched[0].name || matched[0].title || routeId;
    if (cEl) cEl.textContent = matched.length + ' 项';
    if (dEl) dEl.style.display = 'none';

    return { id: category.id, name: category.name, icon: category.icon, items: matched };
  };
})();
