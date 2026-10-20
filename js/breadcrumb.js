/*
 * 全站详情页面包屑（统一标准）
 * 用法：
 *   IHZW.breadcrumbHTML(channelTitle, currentTitle[, bleed][, channelHref])
 *      -> 返回面包屑 HTML 字符串（首页 › 栏目 › 当前）
 *   IHZW.breadcrumbHTML4(primaryTitle, channelTitle, currentTitle[, bleed][, primaryHref][, channelHref])
 *      -> 4 级面包屑（首页 › 一级 › 二级 › 当前）
 *   IHZW.prependCrumb(container, channelTitle, currentTitle[, bleed][, channelHref])
 *      -> 把 3 级面包屑插到 container 的第一个子节点之前
 *   IHZW.prependCrumb4(container, primaryTitle, channelTitle, currentTitle[, bleed][, primaryHref][, channelHref])
 *      -> 把 4 级面包屑插到 container 的第一个子节点之前
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
  /* 栏目级链接：默认链回当前页（本站详情页与频道页同文件，去掉 ?id= 即频道列表） */
  function defaultChannelHref() {
    var p = (location.pathname || '').split('/').pop() || '';
    return p || 'index.html';
  }
  function buildCrumb(levels, bleed) {
    // levels: [{title, href}] 从首页之后开始
    var m = bleed ? ' style="margin:-16px -16px 0"' : '';
    var out = '<nav class="site-breadcrumb"' + m + '><a href="index.html">首页</a>';
    for (var i = 0; i < levels.length; i++) {
      out += '<span class="sb-sep">›</span>';
      if (levels[i].href === null || levels[i].href === undefined) {
        out += '<b>' + esc(levels[i].title) + '</b>';
      } else if (levels[i].href === '') {
        out += '<span>' + esc(levels[i].title) + '</span>';
      } else {
        out += '<a href="' + esc(levels[i].href) + '">' + esc(levels[i].title) + '</a>';
      }
    }
    return out + '</nav>';
  }
  function html3(channelTitle, currentTitle, bleed, channelHref) {
    var href = (channelHref === undefined || channelHref === null) ? defaultChannelHref() : channelHref;
    return buildCrumb([
      { title: channelTitle, href: href },
      { title: currentTitle, href: null }
    ], bleed);
  }
  function html4(primaryTitle, channelTitle, currentTitle, bleed, primaryHref, channelHref) {
    var pHref = (primaryHref === undefined || primaryHref === null) ? defaultChannelHref() : primaryHref;
    var cHref = (channelHref === undefined || channelHref === null) ? defaultChannelHref() : channelHref;
    return buildCrumb([
      { title: primaryTitle, href: pHref },
      { title: channelTitle, href: cHref },
      { title: currentTitle, href: null }
    ], bleed);
  }
  function doPrepend(container, html) {
    if (!container) return;
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    container.insertBefore(wrap.firstChild, container.firstChild);
  }
  window.IHZW = window.IHZW || {};
  window.IHZW.breadcrumbHTML = html3;
  window.IHZW.breadcrumbHTML4 = html4;
  window.IHZW.prependCrumb = function (container, channelTitle, currentTitle, bleed, channelHref) {
    doPrepend(container, html3(channelTitle, currentTitle, bleed, channelHref));
  };
  window.IHZW.prependCrumb4 = function (container, primaryTitle, channelTitle, currentTitle, bleed, primaryHref, channelHref) {
    doPrepend(container, html4(primaryTitle, channelTitle, currentTitle, bleed, primaryHref, channelHref));
  };
})();
