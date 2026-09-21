// 文章页目录导航 + 返回顶部
// 功能：
// 1. 自动提取 article-content 内的 h2/h3 标题生成目录
// 2. 左侧 sticky 显示目录，跟随滚动高亮当前章节
// 3. 右下角返回顶部按钮
// 4. 移动端目录折叠为顶部"📂 目录"按钮
(function () {
  function init() {
    // 注入阅读进度条（固定于 body 顶端，紧贴 topbar 下方）
    var progressBar = document.createElement('div');
    progressBar.className = 'art-progress-bar';
    progressBar.innerHTML = '<div class="art-progress-fill"></div>';
    // 插到 body 最前面，CSS 用 top: var(--topbar-h) 跟随 topbar 高度
    document.body.prepend(progressBar);
    function syncTopbarH() {
      var tb = document.querySelector('.topbar');
      var h = tb ? tb.getBoundingClientRect().height : 44;
      document.documentElement.style.setProperty('--topbar-h', h + 'px');
    }
    syncTopbarH();
    window.addEventListener('resize', syncTopbarH);

    // 更新进度
    function updateProgress() {
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var scrolled = window.pageYOffset;
      var pct = scrollable > 0 ? Math.min(100, (scrolled / scrollable) * 100) : 0;
      var fill = document.querySelector('.art-progress-fill');
      if (fill) fill.style.width = pct + '%';
    }

    var content = document.querySelector('.article-content');
    if (!content) return;

    // === 注入搜索框和老人模式按钮到 topbar ===
    var topbar = document.querySelector('.topbar');
    if (topbar) {
      // 检查是否已有搜索框
      var existingSearch = topbar.querySelector('.topbar-search input');
      if (!existingSearch) {
        // 找到占位的 .topbar-search 或 themeBtn 前插入
        var searchDiv = topbar.querySelector('.topbar-search');
        if (searchDiv) {
          searchDiv.innerHTML = '<input type="text" id="articleSearchInput" placeholder="搜索文章内容..." autocomplete="off">';
        } else {
          // 直接在 themeBtn 前插入
          var themeBtn = topbar.querySelector('#themeBtn');
          if (themeBtn) {
            var newSearch = document.createElement('div');
            newSearch.className = 'topbar-search';
            newSearch.style.flex = '1';
            newSearch.innerHTML = '<input type="text" id="articleSearchInput" placeholder="搜索文章内容..." autocomplete="off">';
            topbar.insertBefore(newSearch, themeBtn);
          }
        }
      }

      // 插入老人模式按钮（在 themeBtn 前）
      var themeBtn = topbar.querySelector('#themeBtn');
      if (themeBtn && !topbar.querySelector('.topbar-elderly')) {
        var elderlyBtn = document.createElement('button');
        elderlyBtn.className = 'topbar-elderly';
        elderlyBtn.id = 'articleElderlyBtn';
        elderlyBtn.title = '老人模式';
        elderlyBtn.textContent = '👵 老人';
        topbar.insertBefore(elderlyBtn, themeBtn);

        // 老人模式：读取 localStorage 并应用
        try {
          var elderlyOn = localStorage.getItem('ihz_elderly') === 'true';
          document.documentElement.setAttribute('data-elderly', elderlyOn ? 'true' : 'false');
          if (elderlyOn) elderlyBtn.classList.add('active');
        } catch (e) {}

        elderlyBtn.addEventListener('click', function () {
          var cur = localStorage.getItem('ihz_elderly') === 'true';
          var next = !cur;
          localStorage.setItem('ihz_elderly', next ? 'true' : 'false');
          document.documentElement.setAttribute('data-elderly', next ? 'true' : 'false');
          if (next) {
            elderlyBtn.classList.add('active');
          } else {
            elderlyBtn.classList.remove('active');
          }
        });
      }

      // 搜索框：回车跳转到 articles.html 搜索
      var searchInput = topbar.querySelector('#articleSearchInput');
      if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            var q = this.value.trim();
            if (q) {
              location.href = '../articles.html?q=' + encodeURIComponent(q);
            }
          }
        });
      }
    }

    // === 老人模式样式（文章页独立实现，不依赖 app.js）===
    if (!document.getElementById('article-elderly-style')) {
      var style = document.createElement('style');
      style.id = 'article-elderly-style';
      style.textContent = `
        [data-elderly="true"] body { font-size: 18px; line-height: 1.8; }
        [data-elderly="true"] .article-content { font-size: 18px; line-height: 2; }
        [data-elderly="true"] .article-content h2 { font-size: 22px; }
        [data-elderly="true"] .article-content h3 { font-size: 20px; }
        [data-elderly="true"] .article-header h1 { font-size: 26px; }
        [data-elderly="true"] .topbar-elderly { font-weight: 700; border: 2px solid var(--primary); }
        [data-elderly="true"] .art-cat-link,
        [data-elderly="true"] .art-cat-all,
        [data-elderly="true"] .art-chip { font-size: 16px; padding: 8px 18px; }
        .topbar-elderly.active { background: var(--primary); color: #fff; border-color: var(--primary); }
      `;
      document.head.appendChild(style);
    }

    // === 注入分类导航条 ===
    // 从当前文件名提取分类前缀，生成"查看同系列文章"链接
    // 注意：location.pathname 是百分号编码的，必须先解码，否则中文分类显示为 %E6%9D%AD...
    var rawName = location.pathname.split('/').pop() || '';
    var path;
    try { path = decodeURIComponent(rawName); } catch (e) { path = rawName; }
    // 文件名格式：分类前缀-编号-标题.html （如 "杭州亲子教育-01-xxx.html"）
    var baseName = path.replace(/\.html$/, '');
    var catPrefix = '';
    // 提取第一段到第一个 "-数字-" 之前的部分作为分类
    var catMatch = baseName.match(/^([^\d\-]+(?:-[^\d\-]+)*?)-(\d+)-/);
    if (catMatch) {
      catPrefix = catMatch[1];
    }
    // 如果没匹配到，用文件名首段
    if (!catPrefix) {
      var firstDash = baseName.indexOf('-');
      if (firstDash > 0) {
        catPrefix = baseName.substring(0, firstDash);
      } else {
        catPrefix = baseName;
      }
    }
    // 在 breadcrumb 下方插入分类导航（顶部区域，不在正文里）
    var breadcrumb = document.querySelector('.article-breadcrumb');
    if (breadcrumb && catPrefix) {
      var navHtml = '<div class="art-cat-nav">' +
        '<a href="../articles.html?q=' + encodeURIComponent(catPrefix) + '" class="art-cat-link">' +
          '📂 ' + catPrefix + ' 系列' +
        '</a>' +
        '<a href="../articles.html" class="art-cat-all">📚 全部杭州故事</a>' +
      '</div>';
      breadcrumb.insertAdjacentHTML('afterend', navHtml);
    }

    // === 注入全站分类 chips（与文章首页一致：全部 / 美食 (5) / 记忆 (5)...）===
    if (breadcrumb) {
      fetch('index.json?t=' + Date.now())
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (list) {
          if (!Array.isArray(list) || !list.length) return;
          function cleanCat(c) {
            return (c || '').split(' / ')[0].replace(/^\d+[-_\s]+/, '').replace('系列', '').trim();
          }
          var cats = {};
          list.forEach(function (a) {
            var c = cleanCat(a.cat);
            if (c) cats[c] = (cats[c] || 0) + 1;
          });
          var sorted = Object.keys(cats).sort(function (a, b) { return cats[b] - cats[a]; });
          // 当前文章所属分类（用于高亮）
          var curCat = '';
          for (var i = 0; i < list.length; i++) {
            if (list[i].slug === baseName) { curCat = cleanCat(list[i].cat); break; }
          }
          var TOP_N = 10;
          var chips = '<div class="art-cat-chips">';
          chips += '<a href="../articles.html" class="art-chip' + (!curCat ? ' active' : '') + '">全部</a>';
          sorted.slice(0, TOP_N).forEach(function (c) {
            chips += '<a href="../articles.html?cat=' + encodeURIComponent(c) + '" class="art-chip' + (c === curCat ? ' active' : '') + '">' + c + ' (' + cats[c] + ')</a>';
          });
          chips += '</div>';
          var nav = breadcrumb.nextElementSibling;
          if (nav && nav.classList && nav.classList.contains('art-cat-nav')) {
            nav.insertAdjacentHTML('afterend', chips);
          } else {
            breadcrumb.insertAdjacentHTML('afterend', chips);
          }

          // === 注入相关文章推荐（同分类，最多3篇）===
          if (curCat && footer) {
            var related = list.filter(function (a) {
              return a.slug !== baseName && cleanCat(a.cat) === curCat;
            }).slice(0, 3);
            if (related.length) {
              var relHtml = '<div class="art-related">';
              relHtml += '<div class="art-related-title">📌 相关杭州故事</div>';
              relHtml += '<div class="art-related-list">';
              related.forEach(function (a) {
                relHtml += '<a href="' + a.slug + '.html" class="art-related-item">';
                relHtml += '<span class="art-related-cat">' + curCat + '</span>';
                relHtml += '<span class="art-related-name">' + (a.title || a.slug) + '</span>';
                relHtml += '</a>';
              });
              relHtml += '</div></div>';
              var kwCard = document.querySelector('.art-kw-card');
              if (kwCard) {
                kwCard.insertAdjacentHTML('afterend', relHtml);
              } else {
                footer.insertAdjacentHTML('beforebegin', relHtml);
              }
            }
          }
        })
        .catch(function () { /* 静默失败 */ });
    }

    var headings = content.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // 标题太少不生成目录

    // 给每个标题加 id（如果没有的话）
    headings.forEach(function (h, i) {
      if (!h.id) {
        h.id = 'art-heading-' + i;
      }
    });

    // 生成目录 HTML
    var tocHtml = '<div class="art-toc" id="artToc">' +
      '<div class="art-toc-header">' +
        '<span>📂 目录</span>' +
        '<button class="art-toc-close" id="artTocClose">✕</button>' +
      '</div>' +
      '<ul class="art-toc-list">';

    headings.forEach(function (h) {
      var level = h.tagName === 'H2' ? 2 : 3;
      var cls = level === 2 ? 'art-toc-item art-toc-h2' : 'art-toc-item art-toc-h3';
      tocHtml += '<li class="' + cls + '">' +
        '<a href="#' + h.id + '" data-target="' + h.id + '">' + h.textContent + '</a>' +
        '</li>';
    });

    tocHtml += '</ul></div>';

    // 插入到 article-body 内
    var body = document.querySelector('.article-body');
    if (!body) body = content.parentNode;
    body.insertAdjacentHTML('afterbegin', tocHtml);

    var toc = document.getElementById('artToc');

    // 移动端：默认隐藏，显示"目录"按钮
    var mobileBtn = document.createElement('button');
    mobileBtn.className = 'art-toc-mobile-btn';
    mobileBtn.id = 'artTocMobileBtn';
    mobileBtn.innerHTML = '📂';
    mobileBtn.title = '目录';
    document.body.appendChild(mobileBtn);

    // 返回顶部按钮
    var backTop = document.createElement('button');
    backTop.className = 'art-back-top';
    backTop.id = 'artBackTop';
    backTop.innerHTML = '↑';
    backTop.title = '返回顶部';
    document.body.appendChild(backTop);

    // 目录链接点击：平滑滚动
    toc.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('data-target'));
        if (target) {
          var offset = 60; // 顶部偏移
          var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
          // 移动端点击后收起目录
          if (window.innerWidth < 1024) toc.classList.remove('show');
        }
      });
    });

    // 移动端目录展开
    mobileBtn.addEventListener('click', function () {
      toc.classList.toggle('show');
    });

    // 关闭按钮
    var closeBtn = document.getElementById('artTocClose');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        toc.classList.remove('show');
      });
    }

    // 滚动：高亮当前章节 + 显示返回顶部
    var scrollTimer = null;
    function onScroll() {
      // 高亮当前章节
      var scrollY = window.pageYOffset;
      var current = null;
      headings.forEach(function (h) {
        var rect = h.getBoundingClientRect();
        var top = rect.top + window.pageYOffset - 80;
        if (scrollY >= top) {
          current = h.id;
        }
      });
      // 高亮对应链接
      toc.querySelectorAll('a').forEach(function (a) {
        if (a.getAttribute('data-target') === current) {
          a.classList.add('active');
        } else {
          a.classList.remove('active');
        }
      });

      // 返回顶部按钮
      if (window.pageYOffset > 400) {
        backTop.classList.add('show');
      } else {
        backTop.classList.remove('show');
      }

      // 更新阅读进度条
      updateProgress();
    }

    window.addEventListener('scroll', function () {
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(onScroll, 50);
    }, { passive: true });

    // 返回顶部
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === 注入关键词回复卡片（文末）===
    // 读取文章 meta keywords → 匹配 keywords.json → 渲染「发送xxx获取xxx」
    var footer = document.querySelector('.article-footer');
    if (footer) {
      var kwMeta = document.querySelector('meta[name="keywords"]');
      var articleKeywords = [];
      if (kwMeta && kwMeta.content) {
        articleKeywords = kwMeta.content.split(/[,，、]/).map(function(k){ return k.trim(); }).filter(Boolean);
      }
      if (articleKeywords.length) {
        fetch('keywords.json?t=' + Date.now())
          .then(function(r){ return r.ok ? r.json() : []; })
          .then(function(allKws){
            if (!Array.isArray(allKws) || !allKws.length) return;
            // 匹配：文章 meta keywords vs 公众号关键词 keyword + aliases
            // 支持精确匹配和包含匹配
            var matched = [];
            allKws.forEach(function(kw){
              var candidates = [kw.keyword].concat(kw.aliases || []).filter(Boolean);
              var hit = false;
              for (var i=0; i<candidates.length; i++){
                var cand = candidates[i].toLowerCase();
                // 精确匹配
                if (articleKeywords.indexOf(candidates[i]) >= 0) { hit = true; break; }
                // 包含匹配：文章关键词包含公众号关键词
                for (var j=0; j<articleKeywords.length; j++){
                  if (articleKeywords[j].toLowerCase().indexOf(cand) >= 0 && cand.length >= 2) { hit = true; break; }
                }
                if (hit) break;
              }
              if (hit && matched.length < 3) matched.push(kw);
            });
            if (!matched.length) return;
            // 渲染卡片
            var card = '<div class="art-kw-card">';
            card += '<div class="art-kw-title">💬 关注公众号，发送关键词获取更多</div>';
            matched.forEach(function(kw){
              var kwText = kw.keyword;
              var desc = kw.desc || kw.title || '';
              // 取 desc 中关键词后面的描述部分（去掉标题前缀）
              if (desc.indexOf(kwText) === 0) desc = desc.substring(kwText.length).replace(/^[：:、\s]+/, '');
              if (!desc) desc = kw.title || kw.keyword;
              card += '<div class="art-kw-item">';
              card += '<span class="art-kw-key">发送「' + kwText + '」</span>';
              card += '<span class="art-kw-desc">' + desc + '</span>';
              card += '</div>';
            });
            card += '<div class="art-kw-qr">长按识别二维码关注「爱杭州」</div>';
            card += '</div>';
            var relatedEl = document.querySelector('.art-related');
            if (relatedEl) {
              relatedEl.insertAdjacentHTML('beforebegin', card);
            } else {
              footer.insertAdjacentHTML('beforebegin', card);
            }
          })
          .catch(function(){});
      }
    }

    // 初始高亮
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
