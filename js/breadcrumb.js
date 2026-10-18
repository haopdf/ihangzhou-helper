/*
 * 全站详情页面包屑（统一标准）
 * 用法：
 *   IHZW.breadcrumbHTML(channelTitle, currentTitle[, bleed])
 *      -> 返回面包屑 HTML 字符串（首页 › 栏目 › 当前）
 *   IHZW.prependCrumb(container, channelTitle, currentTitle[, bleed])
 *      -> 把面包屑插到 container 的第一个子节点之前（详情渲染后调用）
 *   bleed=true 时面包屑向左右/上出血 16px，用于容器自身带 padding:16px 的页面
 *     （museum / coffee / laozihao / scenic 等 .p-* 详情页）
 */
(function () {
  'use strict';
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function html(channelTitle, currentTitle, bleed) {
    var m = bleed ? ' style="margin:-16px -16px 0"' : '';
    return '<nav class="site-breadcrumb"' + m + '>' +
      '<a href="index.html">首页</a>' +
      '<span class="sb-sep">›</span>' +
      '<span>' + esc(channelTitle) + '</span>' +
      '<span class="sb-sep">›</span>' +
      '<b>' + esc(currentTitle) + '</b></nav>';
  }
  window.IHZW = window.IHZW || {};
  window.IHZW.breadcrumbHTML = html;
  window.IHZW.prependCrumb = function (container, channelTitle, currentTitle, bleed) {
    if (!container) return;
    var wrap = document.createElement('div');
    wrap.innerHTML = html(channelTitle, currentTitle, bleed);
    container.insertBefore(wrap.firstChild, container.firstChild);
  };
})();
