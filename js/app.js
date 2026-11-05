/* ============================================
   iHangzhou 杭州生活助手 - 参考杭州本地宝结构
   10大分类 · 100+办事条目 · 数据全内联
   ============================================ */
(function () {
'use strict';

// ===== PWA：Service Worker 注册 + 网络状态提示 =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var newWorker = reg.installing;
        newWorker.addEventListener('statechange', function () {
          if (newWorker.state === 'activated') {
            // 新版本已激活，提示刷新
            var tip = document.createElement('div');
            tip.id = 'sw-update-tip';
            tip.textContent = '发现新版本，刷新获得最新体验 ✦';
            tip.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#0ea5e9;color:#fff;text-align:center;padding:10px 14px;font-size:13px;z-index:99999;cursor:pointer;';
            tip.onclick = function () {
              if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
              }
              window.location.reload();
            };
            document.body.appendChild(tip);
          }
        });
      });
    }).catch(function () {
      // SW 注册失败，静默忽略
    });
  });
}

// 离线 / 在线状态提示
window.addEventListener('online', function () {
  var el = document.getElementById('network-status');
  if (el) el.textContent = '已恢复网络连接';
  if (el) el.className = 'network-status online';
});
window.addEventListener('offline', function () {
  var el = document.getElementById('network-status');
  if (!el) {
    el = document.createElement('div');
    el.id = 'network-status';
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#ef4444;color:#fff;text-align:center;padding:8px 12px;font-size:13px;z-index:99999;transition:all .3s;';
    document.body.appendChild(el);
  }
  el.textContent = '网络已断开，部分功能受限';
  el.className = 'network-status offline';
});

// ===== 内联兜底数据（CMS API 失败时使用，保证离线/PWA 可用）=====
  var DATA_FALLBACK = {
    // 热门搜索关键词（对标本地宝热门搜索）
    hotKeywords: ["钱塘江观潮", "今日限行", "社保查询", "公积金", "灵隐寺", "消费券", "人才认定", "找工作", "公租房", "浙A摇号", "西湖十景", "地铁线路"],

    // 热门办事（顶部快捷入口）
    hotServices: [
      { name: "今日限行", icon: "🚗", desc: "尾号限行查询", action: "xianxing", color: "#ef4444" },
      { name: "发票抽奖", icon: "🧾", desc: "支付宝/云闪付搜索消费有奖", color: "#f59e0b" },
      { name: "找工作", icon: "💼", desc: "事业单位/国企", url: "https://search.zj.gov.cn/api-gateway/jpaas-jsearch-web-server/search?serviceId=YcTOd1ftgC5dxzJ8RhCBN&websiteid=330000000000000&cateid=ShhDNU0SGB3DPrgh3GxyA&p=1&q=%E6%9C%AC%E4%BA%BA%E6%8B%9B%E8%81%98", color: "#3b82f6" },
      { name: "公积金", icon: "🏠", desc: "查询/提取/贷款", url: "https://gjj.hangzhou.gov.cn/", color: "#10b981" },
      { name: "浙A摇号", icon: "🚘", desc: "车牌摇号申请", url: "https://hzxkctk.cn/", color: "#ef4444" },
      { name: "灵隐寺", icon: "⛩️", desc: "门票预约", url: "https://www.lingyinsi.com/", color: "#8b5cf6", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">灵隐寺始建于东晋（326 年），距今 1700 年，是杭州最早的名刹，中国禅宗十刹之一。背靠北高峰，面朝飞来峰，含大雄宝殿（中国最大木雕佛）、飞来峰石窟（470 余尊造像）、永福禅寺、韬光寺。</p><div class=\"guide-block\"><h4>🎫 门票</h4><p>• 飞来峰 45 元 + 灵隐寺 30 元 = 共 75 元<br>• 无需预约，现场购票<br>• 杭州市民卡/公园卡免飞来峰门票<br>• 开放时间：7:00-18:00</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>• 公交：7 路、游 1 线「灵隐」站<br>• 地铁：3 号线 黄龙体育中心站换公交<br>• 自驾：节假日不建议，停车位极度紧张</p></div><div class=\"guide-block\"><h4>💡 推荐组合</h4><p>• 半日线：灵隐寺 + 永福禅寺 + 北高峰索道<br>• 全日线：上午灵隐寺 → 中午法喜寺 5 元斋饭 → 下午龙井村<br>• 天竺三寺串联：下天竺 → 中天竺 → 上天竺（法喜寺）" },
      { name: "人才认定", icon: "🎓", desc: "高层次人才申请", url: "https://search.zj.gov.cn/api-gateway/jpaas-jsearch-web-server/search?serviceId=YcTOd1ftgC5dxzJ8RhCBN&websiteid=330000000000000&cateid=ShhDNU0SGB3DPrgh3GxyA&p=1&q=%E4%BA%BA%E6%89%8D%E8%AE%A4%E5%AE%9A", color: "#06b6d4" },
      { name: "市民卡", icon: "💳", desc: "服务/充值", url: "https://www.96225.com/", color: "#ec4899" }
    ],

    // 栏目（categories）数据按需异步加载：首次搜索 / 工具页 / 栏目点击时注入 js/data-categories.js
    // categoriesTotal 仅作为离线兜底计数（统计展示），完整数据以 CMS/API 下发为准
    categoriesTotal: 769,

    // 常用电话
    phonebook: [
      { name: "报警电话", number: "110", category: "应急" },
      { name: "火警电话", number: "119", category: "应急" },
      { name: "急救中心", number: "120", category: "应急" },
      { name: "交通事故", number: "122", category: "应急" },
      { name: "供电抢修", number: "95598", category: "公用事业" },
      { name: "燃气抢修", number: "967266", category: "公用事业" },
      { name: "水务热线", number: "96055", category: "公用事业" },
      { name: "市民卡服务", number: "96225", category: "政务服务" },
      { name: "社保咨询", number: "12333", category: "政务服务" },
      { name: "公积金热线", number: "12329", category: "政务服务" },
      { name: "政务热线", number: "12345", category: "政务服务" },
      { name: "公交热线", number: "85191122", category: "交通" },
      { name: "地铁服务", number: "26311111", category: "交通" },
      { name: "萧山机场", number: "96299", category: "交通" },
      { name: "出租车投诉", number: "12328", category: "交通" },
      { name: "消费投诉", number: "12315", category: "维权" },
      { name: "环保投诉", number: "12369", category: "维权" },
      { name: "城管热线", number: "12319", category: "维权" },
      { name: "杭州电视台", number: "89912345", category: "媒体" },
      { name: "杭州日报", number: "85051111", category: "媒体" }
    ],

    // 邮编
    postcodes: [
      { district: "上城区", code: "310000" },
      { district: "拱墅区", code: "310000" },
      { district: "西湖区", code: "310000" },
      { district: "滨江区", code: "310051" },
      { district: "萧山区", code: "311200" },
      { district: "余杭区", code: "311100" },
      { district: "临平区", code: "311100" },
      { district: "钱塘区", code: "310018" },
      { district: "富阳区", code: "311400" },
      { district: "临安区", code: "311300" },
      { district: "桐庐县", code: "311500" },
      { district: "淳安县", code: "311700" },
      { district: "建德市", code: "311600" }
    ],

    // 限行规则
    xianxingRule: {
      rules: [
        { day: "周一", tail: "1和9" },
        { day: "周二", tail: "2和8" },
        { day: "周三", tail: "3和7" },
        { day: "周四", tail: "4和6" },
        { day: "周五", tail: "5和0" },
        { day: "周六", tail: "不限行" },
        { day: "周日", tail: "不限行" }
      ],
      area: "留祥路—石祥路—石桥路—秋涛路—复兴路—老复兴路—虎跑路—满觉陇路—五老峰隧道—吉庆山隧道—梅灵北路—九里松隧道—灵溪南路—灵溪隧道—西溪路—紫金港路—文一西路—古墩路围合区域（含边界道路）"
    }
  };
  // 默认让 DATA 指向兜底数据；init() 后异步从 CMS 拉取覆盖
  var DATA = DATA_FALLBACK;

  // ===== 兜底 categories 按需加载（体量约 230KB，仅首次需要时异步注入）=====
  // categories 从 js/data-categories.js 按需注入；CMS/API 数据可用时优先使用服务端数据。
  var catLoadPromise = null;
  function ensureCategories() {
    var cats = window.IHZ_DATA_CATEGORIES;
    if (Array.isArray(cats) && cats.length && !(DATA.categories && DATA.categories.length)) {
      DATA.categories = cats;
      if (typeof rerenderDynamic === 'function') rerenderDynamic();
    }
    if (DATA.categories && DATA.categories.length) return Promise.resolve(DATA.categories);
    if (catLoadPromise) return catLoadPromise;
    catLoadPromise = new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = 'js/data-categories.min.js?v=50599ed0f3';
      s.async = true;
      s.onload = function () {
        var list = window.IHZ_DATA_CATEGORIES;
        if (Array.isArray(list) && list.length && !(DATA.categories && DATA.categories.length)) {
          DATA.categories = list;
          if (typeof rerenderDynamic === 'function') rerenderDynamic();
        }
        resolve(Array.isArray(list) ? list : []);
      };
      s.onerror = function () { resolve([]); };
      document.head.appendChild(s);
    });
    return catLoadPromise;
  }

  // ===== 状态 =====
  var state = {
    activeTab: 'banshi',
    theme: localStorage.getItem('ihz-theme') || 'light',
    searchQuery: '',
    currentPage: 'home'
  };

  // ===== 工具函数 =====
  function $(s) { return document.querySelector(s); }
  function $$(s) { return document.querySelectorAll(s); }

  // HTML 转义：所有来自用户输入 / 外部 API / CMS 的动态文本在拼接 innerHTML 前必须转义
  function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 链接安全化：仅允许 http(s)/tel/mailto 与站内路径，拒绝 javascript:/data: 等可执行 scheme
  function normalizeLinkUrl(u) {
    if (!u) return null;
    u = String(u).trim();
    if (!u) return null;
    if (/^(javascript|data|vbscript|file):/i.test(u)) return null;
    if (/^(https?:|tel:|mailto:)/i.test(u)) {
      return /^http:\/\//i.test(u) ? ('https://' + u.slice(7)) : u;
    }
    return u; // 站内路径（/xxx、xxx.html）
  }

  function showToast(msg) {
    var t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
  t._timer = setTimeout(function () { t.classList.remove('show'); }, 2000);
}

// 暴露全局 Toast 函数，供 analytics.js 等其他脚本调用
window.ihzShowToast = showToast;

function copyText(text, name) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('已复制' + name + '：' + text);
      }).catch(function () { fallbackCopy(text, name); });
    } else {
      fallbackCopy(text, name);
    }
  }

  function fallbackCopy(text, name) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('已复制' + name + '：' + text); }
    catch (e) { showToast('复制失败，请长按号码复制'); }
    document.body.removeChild(ta);
  }

  window._copyPhone = function (num, name) { copyText(num, name); };

  // ===== 主题 =====
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = $('#themeBtn');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    // 同步设置面板暗色模式开关
    var dt = document.getElementById('darkToggle');
    if (dt) dt.checked = (theme === 'dark');
    // 同步切换搜一搜推广物料图（JS 主题切换不响应 prefers-color-scheme）
    var promoImg = $('.search-promo-img');
    if (promoImg) {
      promoImg.src = theme === 'dark'
        ? 'images/promo/search-box-green.jpg'
        : 'images/promo/search-box-white.jpg';
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ihz-theme', state.theme);
    applyTheme(state.theme);
  }

  // ===== 渲染 =====
  function renderHotServices() {
    var grid = $('#hotGrid');
    if (!grid) return; // quick-nav 使用 inline onclick，无 #hotGrid 容器，直接跳过
    grid.innerHTML = DATA.hotServices.map(function (s) {
      return '<div class="hot-card" data-action="' + (s.action || '') + '" data-url="' + (s.url || '') + '" style="--hc:' + s.color + '">' +
        '<div class="hot-icon">' + s.icon + '</div>' +
        '<div class="hot-name">' + s.name + '</div>' +
        '</div>';
    }).join('');
  }

  function renderHotKeywords() {
    var container = $('#hotKeywords');
    if (!container) return;
    container.innerHTML = DATA.hotKeywords.map(function (kw) {
      return '<span class="hk-tag" data-kw="' + kw + '">' + kw + '</span>';
    }).join('');
  }

  // 首页只显示 8 个高频刚需分类Tab；其他分类（美食/老字号/名人/夜市/赏花/民宿等）
  // 都有独立专题页（travel.html/food.html/articles.html/museum.html），用户可通过搜索访问
  var HOME_TAB_WHITELIST = ['banshi','traffic','vehicle','life','edu','job','housing','tool'];

  function renderTabs() {
    var tabs = $('#tabs');
    if (!tabs) return;
    if (!DATA.categories || !DATA.categories.length) return;
    var visibleCats = DATA.categories.filter(function (cat) {
      return HOME_TAB_WHITELIST.indexOf(cat.id) >= 0;
    });
    tabs.innerHTML = visibleCats.map(function (cat) {
      return '<div class="tab ' + (cat.id === state.activeTab ? 'active' : '') + '" data-tab="' + cat.id + '">' +
        cat.icon + ' ' + cat.name + '</div>';
    }).join('');
  }

  function renderServices(tabId) {
    var grid = $('#serviceGrid');
    if (!grid) return;
    if (!DATA.categories || !DATA.categories.length) return;
    var category = null;
    for (var i = 0; i < DATA.categories.length; i++) {
      if (DATA.categories[i].id === tabId) { category = DATA.categories[i]; break; }
    }
    if (!category) return;

    var items = category.items;
    if (state.searchQuery) {
      var scoredItems = [];
      items.forEach(function (item) {
        var score = searchScore(state.searchQuery, item.name) + searchScore(state.searchQuery, item.desc) * 0.5;
        if (score > 0) scoredItems.push({ item: item, score: score });
      });
      scoredItems.sort(function (a, b) { return b.score - a.score; });
      items = scoredItems.map(function (s) { return s.item; });
    }

    if (items.length === 0) {
      grid.innerHTML = '<div class="empty"><div class="eicon">🔍</div><p>没有找到相关服务</p></div>';
      return;
    }

    grid.innerHTML = items.map(function (item) {
      // 有URL的用<a>标签，浏览器原生处理跳转，不会被弹窗拦截
      if (item.url) {
        var safeUrl = item.url.indexOf('http://') === 0 ? 'https://' + item.url.substring(7) : item.url;
        return '<a class="sitem" data-name="' + item.name + '" href="' + safeUrl + '" rel="noopener noreferrer" target="_blank">' +
          '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
          '<div class="sinfo">' +
          '<div class="sname">' + item.name + '</div>' +
          '<div class="sdesc">' + item.desc + '</div>' +
          '</div>' +
          '<div class="sarrow">›</div>' +
          '</a>';
      }
      // 无URL的用<div>，交给handleClick处理action或detail弹窗
      return '<div class="sitem" data-name="' + item.name + '" data-action="' + (item.action || '') + '" data-url="">' +
        '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
        '<div class="sinfo">' +
        '<div class="sname">' + item.name + '</div>' +
        '<div class="sdesc">' + item.desc + '</div>' +
        '</div>' +
        '<div class="sarrow">›</div>' +
        '</div>';
    }).join('');
  }

  function getServiceIcon(name) {
    if (name.indexOf('身份证') >= 0 || name.indexOf('居住') >= 0 || name.indexOf('落户') >= 0) return '🪪';
    if (name.indexOf('人才') >= 0) return '🎓';
    if (name.indexOf('社保') >= 0 || name.indexOf('医保') >= 0) return '🏥';
    if (name.indexOf('公积金') >= 0) return '🏠';
    if (name.indexOf('出入境') >= 0 || name.indexOf('护照') >= 0) return '🛂';
    if (name.indexOf('市民卡') >= 0) return '💳';
    if (name.indexOf('健康证') >= 0 || name.indexOf('疫苗') >= 0) return '💉';
    if (name.indexOf('营业') >= 0 || name.indexOf('企业') >= 0) return '📋';
    if (name.indexOf('结婚') >= 0 || name.indexOf('生育') >= 0) return '👶';
    if (name.indexOf('工资') >= 0 || name.indexOf('个税') >= 0) return '💰';
    if (name.indexOf('限行') >= 0 || name.indexOf('违章') >= 0) return '🚦';
    if (name.indexOf('地铁') >= 0) return '🚇';
    if (name.indexOf('公交') >= 0) return '🚌';
    if (name.indexOf('水上巴士') >= 0) return '⛴️';
    if (name.indexOf('自行车') >= 0) return '🚲';
    if (name.indexOf('火车') >= 0 || name.indexOf('高铁') >= 0) return '🚄';
    if (name.indexOf('机场') >= 0 || name.indexOf('机票') >= 0) return '✈️';
    if (name.indexOf('客运') >= 0) return '🚌';
    if (name.indexOf('ETC') >= 0) return '📡';
    if (name.indexOf('打车') >= 0 || name.indexOf('网约车') >= 0) return '🚕';
    if (name.indexOf('电动车') >= 0) return '🛵';
    if (name.indexOf('油价') >= 0 || name.indexOf('加油') >= 0) return '⛽';
    if (name.indexOf('天气') >= 0) return '🌤️';
    if (name.indexOf('浙A') >= 0 || name.indexOf('摇号') >= 0 || name.indexOf('车牌') >= 0) return '🚘';
    if (name.indexOf('浙M') >= 0 || name.indexOf('区域指标') >= 0) return '🚗';
    if (name.indexOf('年检') >= 0) return '🔍';
    if (name.indexOf('驾驶证') >= 0 || name.indexOf('驾照') >= 0) return '📄';
    if (name.indexOf('停车') >= 0) return '🅿️';
    if (name.indexOf('新能源') >= 0) return '🔋';
    if (name.indexOf('二手车') >= 0) return '🚙';
    if (name.indexOf('消费券') >= 0) return '🎫';
    if (name.indexOf('水费') >= 0 || name.indexOf('水务') >= 0) return '💧';
    if (name.indexOf('电费') >= 0 || name.indexOf('电网') >= 0) return '⚡';
    if (name.indexOf('燃气') >= 0) return '🔥';
    if (name.indexOf('宽带') >= 0) return '📶';
    if (name.indexOf('医院') >= 0 || name.indexOf('挂号') >= 0) return '🏥';
    if (name.indexOf('药店') >= 0) return '💊';
    if (name.indexOf('公园年卡') >= 0) return '🌳';
    if (name.indexOf('金价') >= 0) return '🥇';
    if (name.indexOf('母婴') >= 0) return '🍼';
    if (name.indexOf('重名') >= 0) return '👥';
    if (name.indexOf('快递') >= 0) return '📦';
    if (name.indexOf('开学') >= 0 || name.indexOf('入学') >= 0 || name.indexOf('升学') >= 0) return '🎒';
    if (name.indexOf('幼儿园') >= 0) return '🧒';
    if (name.indexOf('小学') >= 0 || name.indexOf('小升初') >= 0) return '📖';
    if (name.indexOf('中考') >= 0) return '📝';
    if (name.indexOf('高考') >= 0) return '🎓';
    if (name.indexOf('考研') >= 0 || name.indexOf('专升本') >= 0) return '📚';
    if (name.indexOf('学考') >= 0) return '📋';
    if (name.indexOf('学区') >= 0) return '🗺️';
    if (name.indexOf('学校名单') >= 0) return '🏫';
    if (name.indexOf('普通话') >= 0) return '🗣️';
    if (name.indexOf('夜校') >= 0 || name.indexOf('培训') >= 0 || name.indexOf('考证') >= 0) return '📖';
    if (name.indexOf('成人学历') >= 0) return '🎓';
    if (name.indexOf('招聘') >= 0 || name.indexOf('找工作') >= 0 || name.indexOf('岗位') >= 0) return '💼';
    if (name.indexOf('事业单位') >= 0) return '🏛️';
    if (name.indexOf('国企') >= 0) return '🏢';
    if (name.indexOf('政府') >= 0 || name.indexOf('公务员') >= 0 || name.indexOf('省考') >= 0 || name.indexOf('国考') >= 0) return '📋';
    if (name.indexOf('校招') >= 0) return '🎓';
    if (name.indexOf('兼职') >= 0) return '⏰';
    if (name.indexOf('AI') >= 0 || name.indexOf('研发') >= 0) return '💻';
    if (name.indexOf('残疾人') >= 0) return '♿';
    if (name.indexOf('招聘会') >= 0) return '👥';
    if (name.indexOf('简历') >= 0) return '📄';
    if (name.indexOf('公租房') >= 0 || name.indexOf('保障房') >= 0 || name.indexOf('人才房') >= 0) return '🏠';
    if (name.indexOf('租房') >= 0) return '🔑';
    if (name.indexOf('买房') >= 0 || name.indexOf('购房') >= 0) return '🏡';
    if (name.indexOf('房贷') >= 0) return '🏦';
    if (name.indexOf('房产证') >= 0 || name.indexOf('不动产') >= 0) return '📜';
    if (name.indexOf('免费住') >= 0 || name.indexOf('驿站') >= 0) return '🛏️';
    if (name.indexOf('西湖') >= 0 || name.indexOf('景区') >= 0 || name.indexOf('景点') >= 0) return '🏞️';
    if (name.indexOf('灵隐') >= 0 || name.indexOf('寺') >= 0) return '⛩️';
    if (name.indexOf('钱塘江') >= 0 || name.indexOf('大潮') >= 0 || name.indexOf('观潮') >= 0) return '🌊';
    if (name.indexOf('西溪') >= 0 || name.indexOf('湿地') >= 0) return '🌿';
    if (name.indexOf('千岛') >= 0) return '🏝️';
    if (name.indexOf('宋城') >= 0 || name.indexOf('演艺') >= 0) return '🎭';
    if (name.indexOf('博物馆') >= 0 || name.indexOf('茶叶') >= 0) return '🏛️';
    if (name.indexOf('演唱会') >= 0) return '🎤';
    if (name.indexOf('体育') >= 0 || name.indexOf('马拉松') >= 0 || name.indexOf('赛事') >= 0) return '🏃';
    if (name.indexOf('赏花') >= 0) return '🌸';
    if (name.indexOf('采摘') >= 0) return '🍎';
    if (name.indexOf('一日游') >= 0 || name.indexOf('旅游') >= 0) return '🧳';
    if (name.indexOf('美食') >= 0 || name.indexOf('杭帮') >= 0) return '🍜';
    if (name.indexOf('龙井') >= 0 || name.indexOf('茶') >= 0) return '🍵';
    if (name.indexOf('电话') >= 0) return '📞';
    if (name.indexOf('邮编') >= 0) return '📮';
    if (name.indexOf('行政') >= 0) return '🗺️';
    if (name.indexOf('万年历') >= 0 || name.indexOf('日历') >= 0) return '📅';
    if (name.indexOf('社保计算') >= 0) return '🧮';
    return '📌';
  }

  // ========== 拼音首字母索引（轻量，覆盖常用政务关键词）==========
  var PINYIN_FIRST = {
    '社保':'sb','公积金':'gjj','落户':'lx','身份证':'sfz','护照':'hz','签证':'qz',
    '驾照':'jz','行驶证':'xsz','车辆':'cl','交通':'jt','地铁':'dt','公交':'gj',
    '小学':'cx','中学':'zx','大学':'dx','教育':'jy','学校':'xx','老师':'ls',
    '医院':'yy','医生':'ys','健康':'jk','医保':'yb','养老保险':'ylbx','生育':'sy',
    '婚姻':'hm','结婚':'jh','离婚':'lh','户口':'hk','居住证':'jzz','暂住证':'zzz',
    '房产':'fc','房子':'zf','租房':'zf','买房':'mf','建房':'jf','土地':'td',
    '工商':'gs','企业':'qy','营业执照':'yyzz','税务':'sw','发票':'fp',
    '12345':'12345','热线':'rx','投诉':'tz','举报':'jb','信访':'xf',
    '公证':'gz','法律援助':'fljz','法院':'fy','律师':'ls',
    '贷款':'dk','水费':'sf','电费':'df','燃气':'rq',
    '人才':'rc','补贴':'bt','创业':'cy','失业':'sy','退休':'tx',
    '博物馆':'bwg','旅游':'ly','景点':'jd','美食':'ms','酒店':'jd'
  };
  // 构建反向映射：首字母→中文关键词
  var FIRST_TO_CN = {};
  Object.keys(PINYIN_FIRST).forEach(function(cn){
    var py = PINYIN_FIRST[cn];
    if (!FIRST_TO_CN[py]) FIRST_TO_CN[py] = [];
    FIRST_TO_CN[py].push(cn);
  });

  // ===== 景点详情页 URL 映射（name → scenic.html?id=xxx）=====
  var NAME_TO_SCENIC_ID = (function(){
    // 景区数据加载后构建反向索引
    var map = {};
    if (window.SCENIC_SPOTS) {
      Object.keys(window.SCENIC_SPOTS).forEach(function(id){
        var spot = window.SCENIC_SPOTS[id];
        if (spot && spot.name) map[spot.name] = id;
      });
    }
    return map;
  })();

  function getScenicPageUrl(itemName) {
    if (!itemName) return null;
    var id = NAME_TO_SCENIC_ID[itemName];
    return id ? 'scenic.html?id=' + encodeURIComponent(id) : null;
  }

  function stripTags(html) {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  // 搜索匹配得分：name + desc + detail文本
  function searchScore(query, text) {
    if (!query || !text) return 0;
    text = text.toLowerCase();
    var q = query.toLowerCase().trim();
    // 1. 完整子串匹配 → 最高分
    if (text.indexOf(q) >= 0) return 100;
    // 2. 逐字符匹配：计算查询中有多少字符出现在文本中
    var chars = q.split('').filter(function(c) { return c.trim().length > 0; });
    if (chars.length === 0) return 0;
    var matched = 0;
    for (var i = 0; i < chars.length; i++) {
      if (text.indexOf(chars[i]) >= 0) matched++;
    }
    if (matched === chars.length) return 50 + chars.length;
    return (matched / chars.length) * 30;
  }

  // 拼音首字母扩展：查询"rsb" → 社保
  function expandPinyin(query) {
    var q = query.toLowerCase().trim();
    if (FIRST_TO_CN[q]) return FIRST_TO_CN[q];
    // 尝试按2~3字母分段（如 sbcl → 社保+车辆）
    return null;
  }

  // 高亮匹配文本中的关键词
  function highlightText(text, query) {
    if (!text) return '';
    var safeText = escapeHtml(text);
    if (!query) return safeText;
    var safeQuery = escapeHtml(query.trim());
    if (!safeQuery) return safeText;
    var lowerText = safeText.toLowerCase();
    var lowerQ = safeQuery.toLowerCase();
    var idx = lowerText.indexOf(lowerQ);
    if (idx < 0) {
      // 高亮单个字符
      var result = '';
      for (var i = 0; i < safeText.length; i++) {
        if (lowerQ.indexOf(lowerText[i]) >= 0) {
          result += '<mark>' + safeText[i] + '</mark>';
        } else {
          result += safeText[i];
        }
      }
      return result;
    }
    return safeText.slice(0, idx) + '<mark>' + safeText.slice(idx, idx + lowerQ.length) + '</mark>' + safeText.slice(idx + lowerQ.length);
  }

  // 搜索入口：categories 未就绪时先按需加载（js/data-categories.js），再执行搜索
  function globalSearch(query) {
    var q = String(query === undefined || query === null ? '' : query).trim();
    if (!q) { doGlobalSearch(''); return; }
    ensureCategories().then(function () { doGlobalSearch(q); });
  }

  function doGlobalSearch(query) {
    state.searchQuery = query.trim();
    var searchResult = $('#searchResult');
    var grid = $('#serviceGrid');
    if (!grid) return;
    // 同步 tab 内搜索
    var tabSearchInput = $('#tabSearchInput');
    if (tabSearchInput && tabSearchInput.value !== state.searchQuery) {
      tabSearchInput.value = state.searchQuery;
    }

    if (!state.searchQuery) {
      if (searchResult) searchResult.style.display = 'none';
      return;
    }

    // 拼音首字母扩展
    var pyExpanded = expandPinyin(state.searchQuery);
    var pyExtraQuery = pyExpanded ? pyExpanded.join(' ') : '';

    var results = [];
    DATA.categories.forEach(function (cat) {
      cat.items.forEach(function (item) {
        // 仅显示有实际跳转或动作的结果（有 url 或 action），纯说明卡片（仅 detail）不打扰搜索
        if (!item.url && !item.action) return;
        var detailText = stripTags(item.detail);
        // name*1.0 + desc*0.5 + detail*0.3 + 拼音扩展*1.0
        var score = searchScore(state.searchQuery, item.name)
                  + searchScore(state.searchQuery, item.desc) * 0.5
                  + searchScore(state.searchQuery, detailText) * 0.3;
        if (pyExtraQuery) {
          score += searchScore(pyExtraQuery, item.name) * 1.0
                 + searchScore(pyExtraQuery, item.desc) * 0.5
                 + searchScore(pyExtraQuery, detailText) * 0.3;
        }
        // 拼音首字母直接在 name/desc 内也加分
        if (PINYIN_FIRST[item.name]) {
          var pyFull = PINYIN_FIRST[item.name];
          if (pyFull.indexOf(state.searchQuery.toLowerCase()) === 0) score += 60;
          if (state.searchQuery.toLowerCase().indexOf(pyFull) === 0) score += 40;
        }
        if (score > 0) {
          results.push({ item: item, cat: cat.name, catId: cat.id, score: score, py: !!pyExpanded });
        }
      });
    });

    results.sort(function (a, b) { return b.score - a.score; });

    // 分组显示：按分类聚合
    if (searchResult) {
      searchResult.style.display = 'block';
      var titleEl = $('#searchResultTitle');
      if (titleEl) {
        var tip = pyExpanded ? ' (含拼音: ' + pyExpanded.join('/') + ')' : '';
        titleEl.textContent = '🔍 搜索 "' + state.searchQuery + '" 找到 ' + results.length + ' 项' + tip;
      }
    }

    if (results.length === 0) {
      grid.innerHTML = '<div class="empty"><div class="eicon">🔍</div><p>没有找到"' + escapeHtml(state.searchQuery) + '"相关服务</p>' +
        '<p style="font-size:12px;color:var(--text-muted);margin-top:8px;">试试：社保 / 公积金 / 限行 / 落户 / 夜市 / rsb / gjj / lx</p></div>';
      return;
    }
    grid.innerHTML = results.map(function (r) {
      var item = r.item;
      var catBadge = ' <span class="scat">' + r.cat + '</span>';
      var hName = highlightText(item.name, state.searchQuery);
      var hDesc = highlightText(item.desc, state.searchQuery);
      // 优先外部链接 → scenic.html 内部详情页 → 弹窗
      var linkUrl = normalizeLinkUrl(item.url) || getScenicPageUrl(item.name);
      if (linkUrl) {
        var isExternal = /^https?:\/\//i.test(linkUrl);
        return '<a class="sitem" data-name="' + escapeHtml(item.name) + '" data-cat="' + escapeHtml(r.cat) + '" data-catid="' + escapeHtml(r.catId) + '" href="' + escapeHtml(linkUrl) + '"' + (isExternal ? ' rel="noopener noreferrer" target="_blank"' : '') + '>' +
          '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
          '<div class="sinfo">' +
          '<div class="sname">' + hName + catBadge + '</div>' +
          '<div class="sdesc">' + hDesc + '</div>' +
          '</div>' +
          '<div class="sarrow">›</div>' +
          '</a>';
      }
      return '<div class="sitem" data-name="' + escapeHtml(item.name) + '" data-cat="' + escapeHtml(r.cat) + '" data-catid="' + escapeHtml(r.catId) + '" data-action="' + escapeHtml(item.action || '') + '" data-url="">' +
        '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
        '<div class="sinfo">' +
        '<div class="sname">' + hName + catBadge + '</div>' +
        '<div class="sdesc">' + hDesc + '</div>' +
        '</div>' +
        '<div class="sarrow">›</div>' +
        '</div>';
    }).join('');
  }

  // 清空搜索：恢复首页内容、移除搜索状态
  window.clearSearch = function () {
    document.body.classList.remove('search-mode');
    var topbar = document.getElementById('topbar');
    if (topbar) topbar.classList.remove('searching');
    var si = $('#searchInput');
    if (si) {
      si.value = '';
      si.classList.remove('searching');
    }
    var sr = $('#searchResult');
    if (sr) sr.style.display = 'none';
  };

  // ===== 事件绑定 =====
  function bindOn(sel, evt, handler) {
    var el = $(sel);
    if (el) el.addEventListener(evt, handler);
  }

  function bindEvents() {
    // quick-nav 使用 inline onclick，无需绑定 #hotGrid（避免 null 错误中断后续绑定）
    bindOn('#tabs', 'click', function (e) {
      var tab = e.target.closest('.tab');
      if (!tab) return;
      state.activeTab = tab.dataset.tab;
      state.searchQuery = '';
      var searchInput = $('#searchInput');
      if (searchInput) searchInput.value = '';
      $$('.tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      ensureCategories().then(function () { renderServices(state.activeTab); });
    });

    bindOn('#serviceGrid', 'click', function (e) {
      var item = e.target.closest('.sitem');
      if (!item) return;
      // 先统计点击（<a> 和 <div> 都报）
      var btnName = item.dataset.name || '';
      var btnCat = item.dataset.cat || state.activeTab || '其他';
      if (!btnName) {
        var nmEl = item.querySelector('.sname');
        if (nmEl) btnName = nmEl.textContent.replace(/\s*\[.*?\]\s*$/, '').trim();
      }
      if (btnName && window.iHangzhouTrack) {
        window.iHangzhouTrack.click(btnCat, btnName, btnName, '');
      }
      // <a>标签由浏览器原生处理跳转，不拦截
      if (item.tagName === 'A') return;
      handleClick(item);
    });

    bindOn('#searchInput', 'input', function (e) {
      var val = e.target.value;
      var topbar = document.getElementById('topbar');
      if (val.trim()) {
        document.body.classList.add('search-mode');
        if (topbar) topbar.classList.add('searching');
        e.target.classList.add('searching');
      } else {
        clearSearch();
      }
      globalSearch(val);
    });

    bindOn('#searchInput', 'focus', function (e) {
      ensureCategories(); // 预热兜底栏目数据，首次输入即可秒出结果
      // 点击即展开搜索（覆盖其他元素），无需等输入
      document.body.classList.add('search-mode');
      var topbar = document.getElementById('topbar');
      if (topbar) topbar.classList.add('searching');
      e.target.classList.add('searching');
    });

    // 搜索结果区关闭按钮：清空搜索框 + 隐藏结果区
    bindOn('#searchResultClose', 'click', function () {
      clearSearch();
    });

    bindOn('#hotKeywords', 'click', function (e) {
      var tag = e.target.closest('.hk-tag');
      if (!tag) return;
      var kw = tag.dataset.kw;
      var searchInput = $('#searchInput');
      if (searchInput) searchInput.value = kw;
      globalSearch(kw);
    });

    bindOn('#themeBtn', 'click', toggleTheme);

    // 频道入口点击：跳转到独立频道页面
    $$('.channel-item').forEach(function (item) {
      item.addEventListener('click', function (e) {
        var channel = this.dataset.channel;
        var matchedCat = (DATA.categories || []).find(function (c) { return c.id === channel; });
        if (matchedCat) {
          // 跳转到独立频道页（如 history.html）
          location.href = channel + '.html';
        } else {
          showToast('「' + (this.querySelector('.ch-name') ? this.querySelector('.ch-name').textContent : channel) + '」专题页开发中');
        }
      });
    });

    bindOn('#modalClose', 'click', closeModal);
    bindOn('#modalOverlay', 'click', function (e) {
      if (e.target.id === 'modalOverlay') closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    // 只对带 data-page 的内部页签绑切换；<a href> 项由浏览器原生导航
    $$('.bnav-item[data-page]').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        switchPage(this.dataset.page);
      });
    });

    // 快捷导航中的栏目入口（电话/工具等内部页）
    $$('.quick-nav a[data-page]').forEach(function (item) {
      item.addEventListener('click', function () {
        switchPage(this.dataset.page);
      });
    });

    // 资讯 Banner 轮播
    initNewsBanner();
  }

  // ===== 资讯 Banner 轮播 =====
  function initNewsBanner() {
    var banner = $('#newsBanner');
    if (!banner) return;
    var items = banner.querySelectorAll('.news-item');
    if (items.length <= 1) return;
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % items.length;
      items.forEach(function (el, i) {
        el.style.display = i === idx ? 'flex' : 'none';
      });
    }, 4000);
  }

  function openUrl(url) {
    // 公众号/微信内嵌浏览器场景：当前页跳转，用户按"<"返回键回 iHangzhou
    // http 自动升级 https（微信强制https，否则打不开）
    if (url && url.indexOf('http://') === 0) {
      url = 'https://' + url.substring(7);
    }
    window.location.href = url;
  }

  function handleClick(el) {
    var action = el.dataset.action;
    var url = el.dataset.url;
    if (action) { handleAction(action); }
    else if (url) {
      // 有 URL 直接跳转，不再弹详情
      openUrl(url);
    } else {
      // 无 URL：弹详情（仅当有 detail 内容时）或忽略
      var nameEl = el.querySelector('.sname');
      var descEl = el.querySelector('.sdesc');
      if (nameEl) {
        var name = nameEl.textContent.replace(/\s*\[.*?\]\s*$/, '').trim();
        var desc = descEl ? descEl.textContent : '';
        var item = null;
        var catName = '';
        (DATA.categories || []).forEach(function(c){
          c.items.forEach(function(it){
            if(it.name === name) { item = it; catName = c.name; }
          });
        });
        renderItemModal({
          name: name, desc: desc, cat: catName, action: item ? item.action : '', url: item ? item.url : '', detail: item ? item.detail : ''
        });
      }
    }
  }

  function switchPage(page) {
    state.currentPage = page;
    $$('.bnav-item').forEach(function (i) { i.classList.remove('active'); });
    // tools/phone 等栏目已不在底栏，找不到对应 tab 时保持当前高亮
    var tab = document.querySelector('.bnav-item[data-page="' + page + '"]');
    if (tab) tab.classList.add('active');

    var pages = ['home', 'tools', 'phone', 'me'];
    pages.forEach(function (p) {
      var el = document.getElementById('page' + p.charAt(0).toUpperCase() + p.slice(1));
      if (el) el.style.display = (p === page) ? 'block' : 'none';
    });

    if (page === 'tools') ensureCategories().then(renderToolsPage);
    if (page === 'phone') renderPhonePage();
    window.scrollTo(0, 0);
  }

  function renderToolsPage() {
    var container = $('#toolsPageContent');
    if (!container) return;
    var toolCat = (DATA.categories || []).find(function (c) { return c.id === 'tool'; });
    if (!toolCat) return;
    container.innerHTML =
      toolCat.items.map(function (item) {
        return '<div class="tool-card" data-action="' + (item.action || '') + '" data-url="' + (item.url || '') + '">' +
          '<div class="tc-icon">' + getServiceIcon(item.name) + '</div>' +
          '<div class="tc-name">' + item.name + '</div>' +
          '<div class="tc-desc">' + item.desc + '</div>' +
          '</div>';
      }).join('');

    container.querySelectorAll('.tool-card').forEach(function (card) {
      card.addEventListener('click', function () {
        // 工具卡点击统计
        var nmEl = card.querySelector('.tc-name');
        if (nmEl && window.iHangzhouTrack) window.iHangzhouTrack.click('工具', nmEl.textContent.trim(), nmEl.textContent.trim(), '');
        handleClick(this);
      });
    });
  }

  function renderPhonePage() {
    var container = $('#phonePageContent');
    if (!container) return;
    var cats = [];
    DATA.phonebook.forEach(function (p) {
      if (cats.indexOf(p.category) < 0) cats.push(p.category);
    });
    container.innerHTML = cats.map(function (cat) {
      return '<div class="phone-sec"><h4>' + cat + '</h4><div class="phone-list">' +
        DATA.phonebook.filter(function (p) { return p.category === cat; }).map(function (p) {
          return '<div class="phone-row" onclick="window._copyPhone(\'' + p.number + '\',\'' + p.name + '\')">' +
            '<span class="pr-name">' + p.name + '</span>' +
            '<span class="pr-num">' + p.number + '</span>' +
            '</div>';
        }).join('') +
        '</div></div>';
    }).join('');
  }

  // ===== 动作 =====
  function handleAction(action) {
    switch (action) {
      case 'xianxing': showXianxing(); break;
      case 'phonebook': showPhonebook(); break;
      case 'postcode': showPostcode(); break;
      case 'weather': showWeather(); break;
      case 'youjia': showYoujia(); break;
      case 'calendar': showCalendar(); break;
      case 'tax': showTaxCalc(); break;
      case 'loan': showLoanCalc(); break;
      case 'sbcalc': showSbCalc(); break;
      case 'retire': showRetire(); break;
      case 'district': showDistrict(); break;
case 'idcheck': showIdCheck(); break;
case 'platecheck': showPlateCheck(); break;
case 'bmi': showBmi(); break;
case 'datecalc': showDateCalc(); break;
case 'exchange': showExchange(); break;
case 'lengthconv': showLengthConv(); break;
case 'weightconv': showWeightConv(); break;
case 'areaconv': showAreaConv(); break;
case 'tempconv': showTempConv(); break;
case 'timezone': showTimezone(); break;
case 'password': showPassword(); break;
case 'uuidgen': showUuidGen(); break;
case 'qrcode': showQrCode(); break;
case 'base64': showBase64(); break;
case 'jsonfmt': showJsonFmt(); break;
case 'textcount': showTextCount(); break;
case 'colorconv': showColorConv(); break;
case 'loancmp': showLoanCmp(); break;
case 'agecalc': showAgeCalc(); break;
case 'countdown': showCountdown(); break;
case 'rmbconv': showRmbConv(); break;
case 'colors': showColors(); break;
	case 'hospital': showHospital(); break;
	case 'metro': showMetro(); break;
      default: showToast('功能开发中');
    }
  }

  function showXianxing() {
    openModal('🚗 杭州限行查询', buildXianxingModal());
  }

  // 共享 getter：限行数据（同步）
  function getXianxingData() {
    var now = new Date();
    var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var today = dayNames[now.getDay()];
    var todayRule = DATA.xianxingRule.rules.find(function (r) { return r.day === today; });
    return {
      dateStr: now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + today,
      tail: todayRule ? todayRule.tail : '不限行',
      isWeekend: now.getDay() === 0 || now.getDay() === 6,
      area: DATA.xianxingRule.area,
      rules: DATA.xianxingRule.rules,
      today: today
    };
  }

  // 用于 index.html 直接调用的限行弹窗
  function buildXianxingModal() {
    var d = getXianxingData();
    return '<div class="xx-today" style="background:' + (d.isWeekend ? 'linear-gradient(135deg,#27ae60,#1e8449)' : '') + '">' +
      '<div class="xx-date">' + d.dateStr + '</div>' +
      '<div class="xx-tail">' + d.tail + '</div>' +
      '<div class="xx-label">' + (d.isWeekend ? '周末不限行' : '今日限行尾号') + '</div>' +
      '</div>' +
      '<table class="xx-table"><thead><tr><th>星期</th><th>限行尾号</th></tr></thead><tbody>' +
      d.rules.map(function (r) {
        return '<tr class="' + (r.day === d.today ? 'today' : '') + '"><td>' + r.day + '</td><td>' + r.tail + '</td></tr>';
      }).join('') +
      '</tbody></table>' +
      '<div class="xx-note"><strong>⏰ 时间：</strong>工作日 7:00-9:00、16:30-18:30<br>' +
      '<strong>📍 区域：</strong>' + d.area + '<br>' +
      '<strong>⚠️ 法定节假日不限行，以官方最新公告为准</strong></div>';
  }

  function showPhonebook() {
    var cats = [];
    DATA.phonebook.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });
    var html = cats.map(function (cat) {
      return '<div class="pb-cat"><h4>' + cat + '</h4><div class="pb-grid">' +
        DATA.phonebook.filter(function (p) { return p.category === cat; }).map(function (p) {
          return '<div class="pb-item" onclick="window._copyPhone(\'' + p.number + '\',\'' + p.name + '\')">' +
            '<span class="pb-name">' + p.name + '</span><span class="pb-num">' + p.number + '</span></div>';
        }).join('') +
        '</div></div>';
    }).join('');
    openModal('📞 常用电话', html + '<p class="modal-tip">点击号码可复制</p>');
  }

  function showPostcode() {
    var html = '<div class="pc-grid">' +
      DATA.postcodes.map(function (c) {
        return '<div class="pc-item"><span>' + c.district + '</span><span class="pc-code">' + c.code + '</span></div>';
      }).join('') +
      '</div><p class="modal-tip">杭州市通用邮编 310000</p>';
    openModal('📮 邮政编码', html);
  }

  function showDistrict() {
    openModal('📍 行政区划',
      '<div style="line-height:2.2;font-size:14px;">' +
      '<h4 style="color:var(--primary);margin-bottom:8px;">杭州市（10区2县1县级市）</h4>' +
      '<p><strong>市辖区：</strong>上城区、拱墅区、西湖区、滨江区、萧山区、余杭区、临平区、钱塘区、富阳区、临安区</p>' +
      '<p><strong>县：</strong>桐庐县、淳安县</p>' +
      '<p><strong>县级市：</strong>建德市</p>' +
      '<p style="margin-top:12px;color:var(--text-muted);font-size:13px;">市政府驻地：上城区解放东路18号市民中心</p>' +
      '</div>'
    );
  }

  function showIdCheck() {
    openModal('🪪 身份证号校验',
      '<div class="calc-form">' +
      '<div class="fg"><label>输入身份证号码</label><input type="text" id="idInput" placeholder="18位身份证号码" maxlength="18" style="font-family:SF Mono,Menlo,monospace;letter-spacing:1px;"></div>' +
      '<button class="btn btn-primary" onclick="window._checkId()">校验</button>' +
      '<div id="idResult"></div>' +
      '</div>' +
      '<p class="modal-tip">本工具仅在本地校验号码格式，不会上传任何数据</p>'
    );
    window._checkId = function () {
      var input = document.getElementById('idInput');
      var result = document.getElementById('idResult');
      var id = input.value.trim().toUpperCase();
      if (!id) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">请输入身份证号码</p>'; return; }
      if (id.length !== 18) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">⚠️ 身份证号码必须为18位</p>'; return; }
      var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      var sum = 0;
      for (var i = 0; i < 17; i++) { sum += parseInt(id[i]) * weight[i]; }
      var checkCode = checkCodes[sum % 11];
      var isValid = (id[17] === checkCode);
      var regionCode = id.substring(0, 6);
      var birthYear = id.substring(6, 10);
      var birthMonth = id.substring(10, 12);
      var birthDay = id.substring(12, 14);
      var genderNum = parseInt(id[16]);
      var gender = genderNum % 2 === 1 ? '男' : '女';
      if (isValid) {
        result.innerHTML = '<div class="calc-result">' +
          '<div class="cr-label">✅ 校验通过</div>' +
          '<div class="cr-detail">出生日期：' + birthYear + '年' + birthMonth + '月' + birthDay + '日<br>' +
          '性别：' + gender + '<br>' +
          '地区编码：' + regionCode + '</div></div>';
      } else {
        result.innerHTML = '<div class="calc-result" style="background:linear-gradient(135deg,#ef4444,#c0392b);">' +
          '<div class="cr-label">❌ 校验失败</div>' +
          '<div class="cr-detail">身份证号码格式不正确<br>校验码应为：' + checkCode + '（实际为：' + id[17] + '）</div></div>';
      }
    };
  }

  function showPlateCheck() {
    var plates = {
      '浙A': '杭州市', '浙B': '宁波市', '浙C': '温州市', '浙D': '绍兴市',
      '浙E': '湖州市', '浙F': '嘉兴市', '浙G': '金华市', '浙H': '衢州市',
      '浙J': '台州市', '浙K': '丽水市', '浙L': '舟山市',
      '京A': '北京市', '京B': '北京市（出租车）', '京C': '北京市', '京D': '北京市',
      '沪A': '上海市', '沪B': '上海市', '沪C': '上海市（远郊）',
      '粤A': '广州市', '粤B': '深圳市', '粤C': '珠海市', '粤D': '汕头市',
      '苏A': '南京市', '苏B': '无锡市', '苏E': '苏州市',
      '鲁A': '济南市', '鲁B': '青岛市'
    };
    openModal('🚗 车牌归属地查询',
      '<div class="calc-form">' +
      '<div class="fg"><label>输入车牌号前缀</label><input type="text" id="plateInput" placeholder="如 浙A" maxlength="3" style="text-transform:uppercase;font-family:SF Mono,Menlo,monospace;"></div>' +
      '<button class="btn btn-primary" onclick="window._checkPlate()">查询</button>' +
      '<div id="plateResult"></div>' +
      '</div>' +
      '<div style="margin-top:16px;"><h4 style="font-size:13px;color:var(--primary);margin-bottom:8px;">浙江车牌一览</h4>' +
      '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">' +
      Object.keys(plates).filter(function (k) { return k.indexOf('浙') === 0; }).map(function (k) {
        return '<div class="pc-item"><span>' + k + '</span><span class="pc-code">' + plates[k] + '</span></div>';
      }).join('') +
      '</div></div>'
    );
    window._checkPlate = function () {
      var input = document.getElementById('plateInput');
      var result = document.getElementById('plateResult');
      var plate = input.value.trim().toUpperCase();
      if (!plate) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">请输入车牌前缀</p>'; return; }
      if (plate.length < 2) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">请输入至少2个字符</p>'; return; }
      var prefix = plate.substring(0, 2);
      var city = plates[prefix];
      if (city) {
        result.innerHTML = '<div class="calc-result">' +
          '<div class="cr-label">查询结果</div>' +
          '<div class="cr-amount">' + city + '</div>' +
          '<div class="cr-detail">车牌前缀：' + prefix + '</div></div>';
      } else {
        result.innerHTML = '<div class="calc-result" style="background:linear-gradient(135deg,#eab308,#ca8a04);">' +
          '<div class="cr-label">⚠️ 未找到</div>' +
          '<div class="cr-detail">暂无「' + prefix + '」的归属地信息</div></div>';
      }
    };
  }

  // wttr.in 英文天气描述→中文映射表
  var WEATHER_ZH = {
    'Sunny': '☀️ 晴', 'Clear': '☀️ 晴', 'Clear ': '☀️ 晴',
    'Partly Cloudy': '⛅ 多云', 'Partly Cloudy ': '⛅ 多云',
    'Cloudy': '☁️ 多云', 'Cloudy ': '☁️ 多云',
    'Overcast': '☁️ 阴', 'Overcast ': '☁️ 阴',
    'Mist': '🌫️ 薄雾', 'Mist ': '🌫️ 薄雾',
    'Fog': '🌫️ 雾', 'Fog ': '🌫️ 雾', 'Foggy': '🌫️ 雾',
    'Light drizzle': '🌦️ 小毛雨', 'Light drizzle ': '🌦️ 小毛雨',
    'Patchy light rain': '🌦️ 局部小雨', 'Patchy light rain ': '🌦️ 局部小雨',
    'Patchy rain nearby': '🌦️ 局部小雨', 'Patchy rain nearby ': '🌦️ 局部小雨',
    'Light rain': '🌦️ 小雨', 'Light rain ': '🌦️ 小雨',
    'Light rain shower': '🌦️ 阵雨', 'Light rain shower ': '🌦️ 阵雨',
    'Moderate rain': '🌧️ 中雨', 'Moderate rain ': '🌧️ 中雨',
    'Moderate rain at times': '🌧️ 间歇中雨', 'Moderate rain at times ': '🌧️ 间歇中雨',
    'Heavy rain': '🌧️ 大雨', 'Heavy rain ': '🌧️ 大雨',
    'Heavy rain at times': '🌧️ 间歇大雨', 'Heavy rain at times ': '🌧️ 间歇大雨',
    'Torrential rain shower': '⛈️ 暴雨', 'Torrential rain shower ': '⛈️ 暴雨',
    'Patchy light snow': '🌨️ 局部小雪', 'Patchy light snow ': '🌨️ 局部小雪',
    'Patchy snow nearby': '🌨️ 局部小雪', 'Patchy snow nearby ': '🌨️ 局部小雪',
    'Light snow': '🌨️ 小雪', 'Light snow ': '🌨️ 小雪',
    'Light snow showers': '🌨️ 阵雪', 'Light snow showers ': '🌨️ 阵雪',
    'Moderate snow': '❄️ 中雪', 'Moderate snow ': '❄️ 中雪',
    'Heavy snow': '❄️ 大雪', 'Heavy snow ': '❄️ 大雪',
    'Blizzard': '🌨️ 暴风雪', 'Blizzard ': '🌨️ 暴风雪',
    'Patchy freezing rain nearby': '🌨️ 局部冻雨',
    'Thundery outbreaks nearby': '⛈️ 局部雷阵雨', 'Thundery outbreaks nearby ': '⛈️ 局部雷阵雨',
    'Thunder': '⛈️ 雷阵雨', 'Thunder ': '⛈️ 雷阵雨',
    'Thunderstorm': '⛈️ 雷暴',
    'Hail': '🌨️ 冰雹', 'Hail ': '🌨️ 冰雹',
    'Smoke': '🌫️ 烟雾', 'Smoke ': '🌫️ 烟雾', 'Smoky haze': '🌫️ 烟霾', 'Smoky haze ': '🌫️ 烟霾',
    'Haze': '🌫️ 霾', 'Haze ': '🌫️ 霾',
    'Sandstorm': '🌪️ 沙尘暴', 'Sandstorm ': '🌪️ 沙尘暴',
    'Duststorm': '🌪️ 扬沙', 'Duststorm ': '🌪️ 扬沙'
  };
  function weatherZh(desc) {
    if (!desc) return '—';
    var d = desc.trim();
    if (/[\u4e00-\u9fa5]/.test(d)) return d; // 已含中文
    return WEATHER_ZH[d] || (d.replace(/^Patchy\s+/i, '局部').replace(/^Light\s+/i, '小').replace(/^Moderate\s+/i, '中').replace(/^Heavy\s+/i, '大'));
  }

  function showWeather() {
    openModal('🌤️ 杭州天气',
      '<div id="weatherBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">⛅</div><p style="color:var(--text-muted);margin-top:8px;">正在获取天气...</p></div></div>' +
      '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
      '<strong>生活提示：</strong><br>杭州属亚热带季风气候，四季分明<br>梅雨季节（6月中-7月上）多雨潮湿<br>最佳旅游：3-5月、9-11月</div>'
    );
    getWeatherData().then(function (d) {
      if (!d) {
        $('#weatherBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">天气获取失败，请稍后重试</div>';
        return;
      }
      var html = '<div style="text-align:center;padding:12px 0 16px;">' +
        '<div style="font-size:48px;font-weight:800;color:var(--primary);">' + escapeHtml(d.temp) + '°C</div>' +
        '<div style="font-size:16px;margin:6px 0;">' + escapeHtml(d.desc) + '</div>' +
        '<div style="font-size:13px;color:var(--text-muted);">体感' + escapeHtml(d.feels) + '°C · 湿度' + escapeHtml(d.humidity) + '% · 风速' + escapeHtml(d.wind) + 'km/h</div>' +
        '</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px;">';
      d.forecast.forEach(function (f) {
        html += '<div style="text-align:center;padding:10px 4px;background:var(--bg);border-radius:8px;">' +
          '<div style="font-size:12px;color:var(--text-muted);">' + escapeHtml(f.label) + '</div>' +
          '<div style="font-size:16px;margin:4px 0;">' + escapeHtml(f.desc || '—') + '</div>' +
          '<div style="font-size:12px;">' + escapeHtml(f.min) + '°~' + escapeHtml(f.max) + '</div></div>';
      });
      html += '</div><p class="modal-tip">数据来源：wttr.in · 更新：' + escapeHtml(d.updated || '实时') + '</p>';
      $('#weatherBox').innerHTML = html;
    });
  }

  // 本地开发兜底天气数据
  var WEATHER_FALLBACK = {
    temp: 22, desc: '多云', feels: 21, humidity: 65, wind: 12,
    updated: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    forecast: [
      { label: '今天', min: 18, max: 26, desc: '多云' },
      { label: '明天', min: 17, max: 24, desc: '晴' },
      { label: '后天', min: 16, max: 23, desc: '小雨' }
    ]
  };

  // 共享 getter：天气数据（异步 Promise，失败 resolve 兜底数据）
  function getWeatherData() {
    return new Promise(function (resolve) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://wttr.in/Hangzhou?format=j1&lang=zh', true);
        xhr.timeout = 8000;
        xhr.onload = function () {
          if (xhr.status === 200) {
            try {
              var data = JSON.parse(xhr.responseText);
              var cur = data.current_condition[0];
              var forecast = [];
              for (var i = 0; i < 3 && i < data.weather.length; i++) {
                var d = data.weather[i];
                forecast.push({
                  label: i === 0 ? '今天' : i === 1 ? '明天' : '后天',
                  min: d.mintempC, max: d.maxtempC,
                  desc: d.hourly[4] ? weatherZh(d.hourly[4].weatherDesc[0].value) : ''
                });
              }
              resolve({
                temp: cur.temp_C,
                desc: weatherZh(cur.weatherDesc[0].value),
                feels: cur.FeelsLikeC,
                humidity: cur.humidity,
                wind: cur.windspeedKmph,
                updated: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
                forecast: forecast
              });
            } catch (e) { resolve(WEATHER_FALLBACK); }
          } else { resolve(WEATHER_FALLBACK); }
        };
        xhr.onerror = function () { resolve(WEATHER_FALLBACK); };
        xhr.ontimeout = function () { resolve(WEATHER_FALLBACK); };
        xhr.send();
      } catch (e) { resolve(WEATHER_FALLBACK); }
    });
  }

  function showBmi() {
    openModal('⚖️ BMI计算器', '<div class="calc-form"><div class="fg"><label>身高（cm）</label><input type="number" id="bmiH" value="170" min="100" max="250"></div><div class="fg"><label>体重（kg）</label><input type="number" id="bmiW" value="65" min="30" max="200"></div><button class="btn btn-primary" onclick="window._calcBmi()">计算BMI</button><div id="bmiResult"></div></div>');
    window._calcBmi = function () {
      var h = parseFloat($('#bmiH').value) / 100, w = parseFloat($('#bmiW').value);
      if (!h || !w || h <= 0) { showToast('请输入正确数值'); return; }
      var bmi = w / (h * h), level, color, tip;
      if (bmi < 18.5) { level = '偏瘦'; color = '#3b82f6'; tip = '建议适当增重'; }
      else if (bmi < 24) { level = '正常'; color = '#22c55e'; tip = '继续保持'; }
      else if (bmi < 28) { level = '偏胖'; color = '#f59e0b'; tip = '建议控制饮食'; }
      else { level = '肥胖'; color = '#ef4444'; tip = '建议咨询医生'; }
      $('#bmiResult').innerHTML = '<div class="calc-result" style="background:linear-gradient(135deg,' + color + ',' + color + 'dd);"><div class="cr-amount">' + bmi.toFixed(1) + '</div><div class="cr-label">' + level + '</div><div class="cr-detail">' + tip + '</div></div>';
    };
  }

  function showDateCalc() {
    openModal('📅 日期计算器', '<div class="calc-form"><div class="fg"><label>开始日期</label><input type="date" id="dateStart"></div><div class="fg"><label>结束日期</label><input type="date" id="dateEnd"></div><div style="display:flex;gap:8px;margin-bottom:12px;"><button class="btn btn-primary" onclick="window._calcDays()">计算天数</button><button class="btn" style="background:var(--bg);color:var(--text);border:1px solid var(--border);" onclick="window._addDays()">+N天</button></div><div id="dateResult"></div></div>');
    var today = new Date().toISOString().split('T')[0];
    $('#dateStart').value = today; $('#dateEnd').value = today;
    window._calcDays = function () {
      var s = new Date($('#dateStart').value), e = new Date($('#dateEnd').value);
      var days = Math.ceil((e - s) / 86400000), workdays = 0;
      for (var d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) { if (d.getDay() !== 0 && d.getDay() !== 6) workdays++; }
      $('#dateResult').innerHTML = '<div class="calc-result"><div class="cr-amount">' + Math.abs(days) + '</div><div class="cr-label">天</div><div class="cr-detail">含工作日：' + Math.abs(workdays) + '天</div></div>';
    };
    window._addDays = function () {
      var s = new Date($('#dateStart').value), days = parseInt(prompt('增加天数：') || '0');
      if (isNaN(days)) return;
      s.setDate(s.getDate() + days); $('#dateEnd').value = s.toISOString().split('T')[0];
    };
  }

  function showExchange() {
    openModal('💱 汇率换算', '<div class="calc-form"><div class="fg"><label>金额</label><input type="number" id="exAmt" value="100"></div><div class="fg"><label>从</label><select id="exFrom"><option value="CNY">人民币 CNY</option><option value="USD">美元 USD</option><option value="EUR">欧元 EUR</option><option value="JPY">日元 JPY</option><option value="HKD">港币 HKD</option><option value="GBP">英镑 GBP</option></select></div><div class="fg"><label>到</label><select id="exTo"><option value="USD">美元 USD</option><option value="CNY">人民币 CNY</option><option value="EUR">欧元 EUR</option><option value="JPY">日元 JPY</option><option value="HKD">港币 HKD</option><option value="GBP">英镑 GBP</option></select></div><button class="btn btn-primary" onclick="window._calcEx()">换算</button><div id="exResult"></div></div><p class="modal-tip">汇率仅供参考</p>');
    window._calcEx = function () {
      var rates = { CNY: 1, USD: 7.24, EUR: 7.85, JPY: 0.048, HKD: 0.93, GBP: 9.12 };
      var amt = parseFloat($('#exAmt').value) || 0, from = $('#exFrom').value, to = $('#exTo').value;
      var result = (amt / rates[from]) * rates[to];
      $('#exResult').innerHTML = '<div class="calc-result"><div class="cr-amount">' + result.toFixed(2) + ' ' + to + '</div><div class="cr-label">1 ' + from + ' = ' + (rates[to]/rates[from]).toFixed(4) + ' ' + to + '</div></div>';
    };
  }

  function showLengthConv() {
    openModal('📏 长度转换', '<div class="calc-form"><div class="fg"><label>输入数值</label><input type="number" id="lenVal" value="1"></div><div class="fg"><label>从</label><select id="lenFrom"><option value="m">米 m</option><option value="cm">厘米 cm</option><option value="km">千米 km</option><option value="inch">英寸 inch</option><option value="ft">英尺 ft</option><option value="yd">码 yd</option></select></div><button class="btn btn-primary" onclick="window._convLen()">转换</button><div id="lenResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;"></div></div>');
    window._convLen = function () {
      var val = parseFloat($('#lenVal').value) || 0, from = $('#lenFrom').value;
      var toM = { m: 1, cm: 0.01, km: 1000, inch: 0.0254, ft: 0.3048, yd: 0.9144 }, m = val * toM[from];
      var units = { m: '米', cm: '厘米', km: '千米', inch: '英寸', ft: '英尺', yd: '码' }, html = '';
      for (var k in toM) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + units[k] + '</div><div style="font-size:16px;font-weight:600;">' + (m / toM[k]).toFixed(4) + '</div></div>'; }
      $('#lenResult').innerHTML = html;
    };
  }

  function showWeightConv() {
    openModal('⚖️ 重量转换', '<div class="calc-form"><div class="fg"><label>输入数值</label><input type="number" id="wtVal" value="1"></div><div class="fg"><label>从</label><select id="wtFrom"><option value="kg">公斤 kg</option><option value="g">克 g</option><option value="lb">磅 lb</option><option value="oz">盎司 oz</option><option value="jin">斤 jin</option></select></div><button class="btn btn-primary" onclick="window._convWt()">转换</button><div id="wtResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;"></div></div>');
    window._convWt = function () {
      var val = parseFloat($('#wtVal').value) || 0, from = $('#wtFrom').value;
      var toKg = { kg: 1, g: 0.001, lb: 0.4536, oz: 0.02835, jin: 0.5 }, kg = val * toKg[from];
      var units = { kg: '公斤', g: '克', lb: '磅', oz: '盎司', jin: '斤' }, html = '';
      for (var k in toKg) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + units[k] + '</div><div style="font-size:16px;font-weight:600;">' + (kg / toKg[k]).toFixed(4) + '</div></div>'; }
      $('#wtResult').innerHTML = html;
    };
  }

  function showAreaConv() {
    openModal('📐 面积转换', '<div class="calc-form"><div class="fg"><label>输入数值</label><input type="number" id="arVal" value="1"></div><div class="fg"><label>从</label><select id="arFrom"><option value="m2">平方米 m²</option><option value="km2">平方千米 km²</option><option value="mu">亩 mu</option><option value="hm2">公顷 hm²</option><option value="ft2">平方英尺 ft²</option></select></div><button class="btn btn-primary" onclick="window._convAr()">转换</button><div id="arResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;"></div></div>');
    window._convAr = function () {
      var val = parseFloat($('#arVal').value) || 0, from = $('#arFrom').value;
      var toM2 = { m2: 1, km2: 1000000, mu: 666.67, hm2: 10000, ft2: 0.0929 }, m2 = val * toM2[from];
      var units = { m2: '平方米', km2: '平方千米', mu: '亩', hm2: '公顷', ft2: '平方英尺' }, html = '';
      for (var k in toM2) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + units[k] + '</div><div style="font-size:16px;font-weight:600;">' + (m2 / toM2[k]).toFixed(4) + '</div></div>'; }
      $('#arResult').innerHTML = html;
    };
  }

  function showTempConv() {
    openModal('🌡️ 温度转换', '<div class="calc-form"><div class="fg"><label>输入温度</label><input type="number" id="tmpVal" value="0"></div><div class="fg"><label>从</label><select id="tmpFrom"><option value="c">摄氏度 °C</option><option value="f">华氏度 °F</option><option value="k">开尔文 K</option></select></div><button class="btn btn-primary" onclick="window._convTmp()">转换</button><div id="tmpResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;"></div></div>');
    window._convTmp = function () {
      var val = parseFloat($('#tmpVal').value) || 0, from = $('#tmpFrom').value, c = from === 'c' ? val : from === 'f' ? (val - 32) * 5 / 9 : val - 273.15;
      var units = [{ k: 'c', n: '摄氏度 °C', v: c }, { k: 'f', n: '华氏度 °F', v: c * 9 / 5 + 32 }, { k: 'k', n: '开尔文 K', v: c + 273.15 }], html = '';
      units.forEach(function (u) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + u.n + '</div><div style="font-size:16px;font-weight:600;">' + u.v.toFixed(2) + '</div></div>'; });
      $('#tmpResult').innerHTML = html;
    };
  }

  // ===== 工资计算器（打工人必备） =====
  function showSalaryCalc() {
    openModal('💰 工资计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>税前月薪（元）</label><input type="number" id="salaryInput" value="15000" min="0"></div>' +
      '<div class="fg"><label>公积金缴存比例</label><select id="gjjRate"><option value="0.12">12%（最高）</option><option value="0.10">10%</option><option value="0.08" selected>8%（最低）</option></select></div>' +
      '<div class="fg"><label>社保个人比例</label><select id="sbRate"><option value="0.105">10.5%（标准）</option><option value="0.115">11.5%</option></select></div>' +
      '<button class="btn btn-primary" onclick="window._calcSalary()">计算</button>' +
      '<div id="salaryResult"></div></div>' +
      '<div style="margin-top:12px;padding:12px;background:var(--bg-alt);border-radius:8px;font-size:12px;color:var(--text-secondary);">' +
      '<strong>💡 说明：</strong>杭州社保基数范围：3957-22584元<br>' +
      '公积金基数范围：2280-34470元<br>' +
      '个税起征点：5000元/月</div>'
    );
    window._calcSalary = function() {
      var salary = parseFloat($('#salaryInput').value) || 0;
      var gjjRate = parseFloat($('#gjjRate').value);
      var sbRate = parseFloat($('#sbRate').value);
      
      if (salary <= 0) { showToast('请输入正确工资'); return; }
      
      // 社保计算（简化版）
      var sbBase = Math.min(Math.max(salary, 3957), 22584);
      var sbPersonal = sbBase * sbRate;
      
      // 公积金计算
      var gjjBase = Math.min(Math.max(salary, 2280), 34470);
      var gjjPersonal = gjjBase * gjjRate;
      
      // 个税计算
      var taxable = salary - 5000 - sbPersonal - gjjPersonal;
      var tax = 0;
      if (taxable > 0) {
        if (taxable <= 3000) tax = taxable * 0.03;
        else if (taxable <= 12000) tax = taxable * 0.10 - 210;
        else if (taxable <= 25000) tax = taxable * 0.20 - 1410;
        else if (taxable <= 35000) tax = taxable * 0.25 - 2660;
        else if (taxable <= 55000) tax = taxable * 0.30 - 4410;
        else if (taxable <= 80000) tax = taxable * 0.35 - 7160;
        else tax = taxable * 0.45 - 15160;
      }
      
      var netSalary = salary - sbPersonal - gjjPersonal - tax;
      
      $('#salaryResult').innerHTML = 
        '<div class="calc-result" style="background:linear-gradient(135deg,#10b981,#059669);">' +
        '<div class="cr-amount">¥' + netSalary.toFixed(2) + '</div>' +
        '<div class="cr-label">税后月薪</div></div>' +
        '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;">' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">' +
        '<span>税前工资</span><span style="font-weight:600;">¥' + salary.toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>养老保险 (8%)</span><span>-¥' + (sbBase * 0.08).toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>医疗保险 (2%)</span><span>-¥' + (sbBase * 0.02).toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>失业保险 (0.5%)</span><span>-¥' + (sbBase * 0.005).toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#10b981;">' +
        '<span>公积金 (' + (gjjRate*100) + '%)</span><span>-¥' + gjjPersonal.toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>个税</span><span>-¥' + tax.toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;color:#10b981;font-weight:700;">' +
        '<span>税后到手</span><span>¥' + netSalary.toFixed(2) + '</span></div></div>' +
        '<div style="margin-top:12px;padding:12px;background:var(--accent);border-radius:8px;color:#fff;font-size:13px;">' +
        '<strong>📊 年收入估算：</strong><br>' +
        '税后年薪约 ¥' + (netSalary * 12).toFixed(0) + '（不含年终奖）<br>' +
        '公积金年缴 ¥' + (gjjPersonal * 12).toFixed(0) + '（可提取！）</div>';
    };
  }

  function showTimezone() {
    var now = new Date();
    openModal('🕐 时区转换', '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">北京时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('zh-CN', {timeZone:'Asia/Shanghai'}) + '</div></div>' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">UTC时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('en-US', {timeZone:'UTC'}) + '</div></div>' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">东京时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'}) + '</div></div>' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">纽约时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('en-US', {timeZone:'America/New_York'}) + '</div></div>' +
      '</div>'
    );
  }

  function showPassword() {
    openModal('🔐 密码生成器', '<div class="calc-form"><div class="fg"><label>密码长度</label><input type="range" id="pwLen" min="8" max="32" value="16" oninput="$(\'#pwLenVal\').textContent=this.value"><span id="pwLenVal">16</span></div><div style="display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;">' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwLow" checked> 小写</label>' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwUp" checked> 大写</label>' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwNum" checked> 数字</label>' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwSym" checked> 符号</label></div>' +
      '<button class="btn btn-primary" onclick="window._genPw()">生成密码</button><div id="pwResult" style="margin-top:12px;padding:16px;background:var(--bg);border-radius:10px;text-align:center;font-family:monospace;font-size:16px;letter-spacing:1px;word-break:break-all;"></div></div>'
    );
    window._genPw = function () {
      var len = parseInt($('#pwLen').value), chars = '';
      if ($('#pwLow').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
      if ($('#pwUp').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if ($('#pwNum').checked) chars += '0123456789';
      if ($('#pwSym').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      if (!chars) { showToast('请至少选择一种字符'); return; }
      var pw = ''; for (var i = 0; i < len; i++) pw += chars[Math.floor(Math.random() * chars.length)];
      $('#pwResult').innerHTML = pw + '<div style="margin-top:8px;font-size:12px;color:var(--text-muted);">强度：' + (len >= 16 && chars.length >= 3 ? '强' : len >= 12 ? '中' : '弱') + '</div>';
    };
  }

  function showUuidGen() {
    openModal('🆔 UUID生成器', '<div class="calc-form"><div class="fg"><label>生成数量</label><input type="number" id="uuidCnt" value="5" min="1" max="20"></div><button class="btn btn-primary" onclick="window._genUuid()">生成</button><div id="uuidResult" style="margin-top:12px;"></div></div>');
    window._genUuid = function () {
      var cnt = parseInt($('#uuidCnt').value) || 1, html = '';
      for (var i = 0; i < cnt; i++) {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); });
        html += '<div style="padding:10px;background:var(--bg);border-radius:8px;margin-bottom:6px;font-family:monospace;font-size:13px;cursor:pointer;" onclick="navigator.clipboard.writeText(this.textContent.trim());showToast(\'已复制\')">' + uuid + '</div>';
      }
      $('#uuidResult').innerHTML = html;
    };
  }

  function showQrCode() {
    openModal('📱 二维码生成', '<div class="calc-form"><div class="fg"><label>输入内容</label><textarea id="qrInput" style="width:100%;min-height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;" placeholder="输入文字、网址等"></textarea></div><button class="btn btn-primary" onclick="window._genQr()">生成二维码</button><div id="qrResult" style="margin-top:16px;text-align:center;"></div></div>');
    window._genQr = function () {
      var text = $('#qrInput').value.trim();
      if (!text) { showToast('请输入内容'); return; }
      $('#qrResult').innerHTML = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(text) + '" style="width:180px;height:180px;border-radius:12px;box-shadow:var(--shadow);" />';
    };
  }

  function showBase64() {
    openModal('🔤 Base64编解码', '<div class="calc-form"><div class="fg"><label>输入内容</label><textarea id="b64Input" style="width:100%;min-height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;"></textarea></div><div style="display:flex;gap:8px;margin-bottom:12px;">' +
      '<button class="btn btn-primary" onclick="window._b64Enc()">编码</button><button class="btn" style="background:var(--bg);color:var(--text);border:1px solid var(--border);" onclick="window._b64Dec()">解码</button></div>' +
      '<div class="fg"><label>结果</label><textarea id="b64Output" style="width:100%;min-height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;background:var(--bg);" readonly></textarea></div></div>');
    window._b64Enc = function () { try { $('#b64Output').value = btoa(unescape(encodeURIComponent($('#b64Input').value))); } catch (e) { showToast('编码失败'); } };
    window._b64Dec = function () { try { $('#b64Output').value = decodeURIComponent(escape(atob($('#b64Input').value))); } catch (e) { showToast('解码失败'); } };
  }

  function showJsonFmt() {
    openModal('📋 JSON格式化', '<div class="calc-form"><div class="fg"><label>输入JSON</label><textarea id="jsonInput" style="width:100%;min-height:100px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;font-family:monospace;font-size:12px;"></textarea></div><div style="display:flex;gap:8px;margin-bottom:12px;">' +
      '<button class="btn btn-primary" onclick="window._jsonFmt()">美化</button><button class="btn" style="background:var(--bg);color:var(--text);border:1px solid var(--border);" onclick="window._jsonMin()">压缩</button></div>' +
      '<div class="fg"><label>结果</label><textarea id="jsonOutput" style="width:100%;min-height:100px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;font-family:monospace;font-size:12px;background:var(--bg);" readonly></textarea></div></div>');
    window._jsonFmt = function () { try { var obj = JSON.parse($('#jsonInput').value); $('#jsonOutput').value = JSON.stringify(obj, null, 2); } catch (e) { showToast('无效JSON'); } };
    window._jsonMin = function () { try { var obj = JSON.parse($('#jsonInput').value); $('#jsonOutput').value = JSON.stringify(obj); } catch (e) { showToast('无效JSON'); } };
  }

  function showTextCount() {
    openModal('✍️ 文字统计', '<div class="calc-form"><div class="fg"><label>输入文字</label><textarea id="tcInput" style="width:100%;min-height:120px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;" oninput="window._countText()"></textarea></div><div id="tcResult" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;"></div></div>');
    window._countText = function () {
      var text = $('#tcInput').value, cn = (text.match(/[\u4e00-\u9fa5]/g) || []).length, words = text.trim().split(/\s+/).filter(Boolean).length;
      $('#tcResult').innerHTML = '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">' + text.length + '</div><div style="font-size:12px;color:var(--text-muted);">总字符</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">' + cn + '</div><div style="font-size:12px;color:var(--text-muted);">中文字符</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">' + words + '</div><div style="font-size:12px;color:var(--text-muted);">词数</div></div>';
    };
    window._countText();
  }

  function showColorConv() {
    openModal('🎨 颜色转换', '<div class="calc-form"><div class="fg"><label>输入颜色值</label><input type="text" id="colorInput" value="#0ea5e9" placeholder="#0ea5e9"></div><button class="btn btn-primary" onclick="window._convColor()">转换</button><div id="colorResult"></div></div>');
    window._convColor = function () {
      var input = $('#colorInput').value.trim(), r, g, b, hex;
      if (input.startsWith('#')) {
        hex = input; var m = input.match(/[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/);
        if (!m) { showToast('无效颜色'); return; }
        var c = m[0]; if (c.length === 3) c = c.split('').map(function (x) { return x + x; }).join('');
        r = parseInt(c.substr(0, 2), 16); g = parseInt(c.substr(2, 2), 16); b = parseInt(c.substr(4, 2), 16);
      } else {
        var m = input.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (!m) { showToast('无效RGB'); return; }
        r = parseInt(m[1]); g = parseInt(m[2]); b = parseInt(m[3]); hex = '#' + [r, g, b].map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
      }
      var hsl = rgbToHsl(r, g, b);
      $('#colorResult').innerHTML = '<div style="width:100%;height:60px;background:' + hex + ';border-radius:12px;margin-bottom:12px;"></div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;cursor:pointer;" onclick="navigator.clipboard.writeText(\'' + hex + '\');showToast(\'已复制\')"><div style="font-size:11px;color:var(--text-muted);">HEX</div><div style="font-size:14px;font-weight:600;">' + hex.toUpperCase() + '</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;cursor:pointer;" onclick="navigator.clipboard.writeText(\'rgb(' + r + ',' + g + ',' + b + ')\');showToast(\'已复制\')"><div style="font-size:11px;color:var(--text-muted);">RGB</div><div style="font-size:14px;font-weight:600;">rgb(' + r + ',' + g + ',' + b + ')</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;cursor:pointer;" onclick="navigator.clipboard.writeText(\'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)\');showToast(\'已复制\')"><div style="font-size:11px;color:var(--text-muted);">HSL</div><div style="font-size:14px;font-weight:600;">hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)</div></div>' +
        '</div>';
    };
    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, h = 0, s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
      if (max !== min) {
        var d = max - min;
        switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; }
      }
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }
  }

  function showLoanCmp() {
    openModal('🏦 房贷对比', '<div class="calc-form"><div class="fg"><label>贷款金额（万元）</label><input type="number" id="lcAmt" value="100"></div><div class="fg"><label>贷款年限</label><select id="lcYears"><option value="10">10年</option><option value="20" selected>20年</option><option value="30">30年</option></select></div><div class="fg"><label>利率（%）</label><input type="number" id="lcRate" value="4.2" step="0.01"></div><button class="btn btn-primary" onclick="window._cmpLoan()">对比计算</button><div id="lcResult" style="margin-top:12px;"></div></div>');
    window._cmpLoan = function () {
      var P = parseFloat($('#lcAmt').value) * 10000, n = parseInt($('#lcYears').value) * 12, r = parseFloat($('#lcRate').value) / 100 / 12;
      var m1 = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1), t1 = m1 * n;
      var m2 = P / n + P * r, t2 = m2 * n;
      $('#lcResult').innerHTML = '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
        '<div style="padding:14px;background:var(--bg);border-radius:10px;"><div style="font-size:14px;font-weight:600;color:var(--primary);margin-bottom:8px;">等额本息</div><div style="font-size:13px;margin-bottom:4px;">月供：<strong>¥' + m1.toFixed(2) + '</strong></div><div style="font-size:13px;margin-bottom:4px;">总利息：<strong>¥' + (t1 - P).toFixed(2) + '</strong></div><div style="font-size:13px;">总还款：<strong>¥' + t1.toFixed(2) + '</strong></div></div>' +
        '<div style="padding:14px;background:var(--bg);border-radius:10px;"><div style="font-size:14px;font-weight:600;color:var(--primary);margin-bottom:8px;">等额本金</div><div style="font-size:13px;margin-bottom:4px;">月供：<strong>¥' + m2.toFixed(2) + '</strong></div><div style="font-size:13px;margin-bottom:4px;">总利息：<strong>¥' + (t2 - P).toFixed(2) + '</strong></div><div style="font-size:13px;">总还款：<strong>¥' + t2.toFixed(2) + '</strong></div></div>' +
        '</div>';
    };
  }

  function showAgeCalc() {
    openModal('🎂 年龄计算器', '<div class="calc-form"><div class="fg"><label>出生日期</label><input type="date" id="ageBirth"></div><button class="btn btn-primary" onclick="window._calcAge()">计算</button><div id="ageResult"></div></div>');
    window._calcAge = function () {
      var birth = new Date($('#ageBirth').value), now = new Date(), age = now.getFullYear() - birth.getFullYear();
      if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
      var zodiac = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
      var days = Math.floor((now - birth) / 86400000);
      var nextBirth = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBirth < now) nextBirth = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
      $('#ageResult').innerHTML = '<div class="calc-result"><div class="cr-amount">' + age + '岁</div><div class="cr-label">' + zodiac[(birth.getFullYear() - 1900) % 12] + '年生</div><div class="cr-detail">存活天数：' + days + '天<br>下一个生日：' + nextBirth.toLocaleDateString('zh-CN') + '</div></div>';
    };
  }

  function showCountdown() {
    openModal('⏰ 倒计时', '<div class="calc-form"><div class="fg"><label>目标日期</label><input type="date" id="cdDate" value="' + new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] + '"></div><div class="fg"><label>目标名称</label><input type="text" id="cdName" placeholder="如：春节"></div><button class="btn btn-primary" onclick="window._doCount()">开始倒计时</button><div id="cdResult" style="margin-top:16px;text-align:center;"></div></div>');
    window._doCount = function () {
      var target = new Date($('#cdDate').value), name = $('#cdName').value || '目标日', diff = target - new Date();
      if (diff <= 0) { $('#cdResult').innerHTML = '<div style="padding:20px;font-size:18px;color:var(--primary);">已到达！🎉</div>'; return; }
      var d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
      $('#cdResult').innerHTML = '<div style="font-size:16px;color:var(--text-muted);margin-bottom:12px;">距离 ' + escapeHtml(name) + '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + d + '</div><div style="font-size:11px;color:var(--text-muted);">天</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + h + '</div><div style="font-size:11px;color:var(--text-muted);">时</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + m + '</div><div style="font-size:11px;color:var(--text-muted);">分</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + s + '</div><div style="font-size:11px;color:var(--text-muted);">秒</div></div>' +
        '</div>';
    };
  }

  function showRmbConv() {
    openModal('💰 数字金额转大写', '<div class="calc-form"><div class="fg"><label>输入金额</label><input type="number" id="rmbInput" placeholder="如 12345.67"></div><button class="btn btn-primary" onclick="window._toRmb()">转换</button><div id="rmbResult" style="margin-top:12px;padding:16px;background:var(--bg);border-radius:10px;font-size:16px;text-align:center;font-weight:600;"></div></div>');
    window._toRmb = function () {
      var num = parseFloat($('#rmbInput').value);
      if (isNaN(num)) { showToast('请输入有效金额'); return; }
      var units = '仟佰拾亿仟佰拾万仟佰拾圆角分', digits = '零壹贰叁肆伍陆柒捌玖', str = (num * 100).toFixed(0), result = '';
      for (var i = 0; i < str.length; i++) { result += digits[parseInt(str[i])] + units[str.length - i - 1]; }
      result = result.replace(/零角零分$/, '整').replace(/零角/g, '零').replace(/零(仟|佰|拾)/g, '零').replace(/零+/g, '零').replace(/零圆/g, '圆');
      $('#rmbResult').innerHTML = result;
    };
  }

  function showColors() {
    var colors = [{ name: '西湖蓝', hex: '#0ea5e9' }, { name: '龙井绿', hex: '#10b981' }, { name: '桂花黄', hex: '#f59e0b' }, { name: '夕阳红', hex: '#ef4444' }, { name: '烟雨灰', hex: '#64748b' }, { name: '玉兰白', hex: '#f8fafc' }, { name: '檀香紫', hex: '#8b5cf6' }, { name: '西湖夜', hex: '#0f172a' }];
    openModal('🎨 杭州主题色', '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
      colors.map(function (c) { return '<div style="padding:12px;background:var(--bg);border-radius:10px;cursor:pointer;" onclick="navigator.clipboard.writeText(\'' + c.hex + '\');showToast(\'已复制 ' + c.hex + '\')">' + '<div style="width:100%;height:50px;background:' + c.hex + ';border-radius:8px;margin-bottom:8px;"></div>' + '<div style="font-size:13px;font-weight:600;">' + c.name + '</div>' + '<div style="font-size:12px;color:var(--text-muted);">' + c.hex.toUpperCase() + '</div></div>'; }).join('') +
      '</div>'
    );
  }

  function showYoujia() {
    var prices = getYoujiaData();
    var html = '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
      Object.keys(prices).filter(function(k){return k!=='updated';}).map(function (k) {
        return '<div style="text-align:center;padding:16px;background:var(--bg);border-radius:10px;border:1px solid var(--border);">' +
          '<div style="font-size:13px;color:var(--text-muted);">' + k + '</div>' +
          '<div style="font-size:24px;font-weight:800;color:var(--accent);margin:4px 0;">¥' + prices[k] + '</div>' +
          '<div style="font-size:11px;color:var(--text-muted);">元/升</div></div>';
      }).join('') +
      '</div><p class="modal-tip">' + prices.updated + ' · 浙江省成品油参考价，以加油站实际标价为准</p>' +
      '<div style="margin-top:10px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
      '<strong>💡 省钱：</strong>油价每10个工作日调整一次，调价前加油更划算；民营油站通常便宜0.3-0.8元/升</div>';
    openModal('⛽ 浙江油价', html);
  }

  // 共享 getter：油价数据（同步静态参考价）
  function getYoujiaData() {
    return { '92号': '7.54', '95号': '8.03', '98号': '8.82', '0号柴油': '7.23', updated: '参考价' };
  }

  function showCalendar() {
    var now = new Date();
    var y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
    var firstDay = new Date(y, m, 1).getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    var cells = '';
    for (var i = 0; i < firstDay; i++) cells += '<div class="cal-cell empty"></div>';
    for (var day = 1; day <= daysInMonth; day++) {
      cells += '<div class="cal-cell ' + (day === d ? 'today' : '') + '">' + day + '</div>';
    }

    var lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    var lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    var lunarStr = '农历' + lunarMonths[m] + '月' + lunarDays[Math.min(d - 1, 29)];

    openModal('📅 万年历',
      '<div style="text-align:center;margin-bottom:12px;">' +
      '<div style="font-size:20px;font-weight:700;">' + y + '年' + (m + 1) + '月</div>' +
      '<div style="font-size:13px;color:var(--text-muted);margin-top:2px;">' + lunarStr + '</div>' +
      '</div>' +
      '<div class="cal-week">' + weekDays.map(function (w) { return '<div>' + w + '</div>'; }).join('') + '</div>' +
      '<div class="cal-grid">' + cells + '</div>' +
      '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;line-height:1.8;">' +
      '<strong>今日：</strong>' + y + '年' + (m + 1) + '月' + d + '日 ' + dayNames[now.getDay()] + '<br>' +
      '<strong>农历：</strong>' + lunarStr + '</div>'
    );
  }

  function showTaxCalc() {
    openModal('💰 个税计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>税前月薪（元）</label><input type="number" id="taxSalary" value="15000"></div>' +
      '<div class="fg"><label>五险一金个人缴纳（元/月）</label><input type="number" id="taxInsurance" value="2500"></div>' +
      '<div class="fg"><label>专项附加扣除（元/月）</label><input type="number" id="taxDeduction" value="0"></div>' +
      '<button class="btn btn-primary" onclick="window._calcTax()">计算个税</button>' +
      '</div><div id="taxResult"></div>'
    );
  }

  window._calcTax = function () {
    var salary = parseFloat($('#taxSalary').value) || 0;
    var insurance = parseFloat($('#taxInsurance').value) || 0;
    var deduction = parseFloat($('#taxDeduction').value) || 0;
    var taxable = Math.max(0, salary - insurance - deduction - 5000);
    var brackets = [
      { limit: 3000, rate: 0.03, deduct: 0 },
      { limit: 12000, rate: 0.10, deduct: 210 },
      { limit: 25000, rate: 0.20, deduct: 1410 },
      { limit: 35000, rate: 0.25, deduct: 2660 },
      { limit: 55000, rate: 0.30, deduct: 4410 },
      { limit: 80000, rate: 0.35, deduct: 7160 },
      { limit: Infinity, rate: 0.45, deduct: 15160 }
    ];
    var tax = 0, rate = 0;
    for (var i = 0; i < brackets.length; i++) {
      if (taxable <= brackets[i].limit) { tax = taxable * brackets[i].rate - brackets[i].deduct; rate = brackets[i].rate; break; }
    }
    tax = Math.max(0, tax);
    var net = salary - insurance - tax;
    $('#taxResult').innerHTML =
      '<div class="calc-result"><div class="cr-amount">¥' + tax.toFixed(2) + '</div>' +
      '<div class="cr-label">每月应缴个税</div>' +
      '<div class="cr-detail">应纳税所得额：¥' + taxable.toFixed(2) + '（税率' + (rate * 100).toFixed(0) + '%）<br>' +
      '税后到手：<strong>¥' + net.toFixed(2) + '</strong><br>年薪税后：¥' + (net * 12).toFixed(2) + '</div></div>' +
      '<p class="modal-tip">仅供参考，以税务部门核算为准</p>';
  };

  function showLoanCalc() {
    openModal('🏦 房贷计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>贷款总额（万元）</label><input type="number" id="loanAmount" value="200"></div>' +
      '<div class="fg"><label>贷款年限（年）</label><input type="number" id="loanYears" value="30"></div>' +
      '<div class="fg"><label>年利率（%）</label><input type="number" id="loanRate" step="0.01" value="3.5"></div>' +
      '<div class="fg"><label>还款方式</label><select id="loanType"><option value="equal">等额本息</option><option value="principal">等额本金</option></select></div>' +
      '<button class="btn btn-primary" onclick="window._calcLoan()">计算房贷</button>' +
      '</div><div id="loanResult"></div>'
    );
  }

  window._calcLoan = function () {
    var amount = (parseFloat($('#loanAmount').value) || 0) * 10000;
    var years = parseFloat($('#loanYears').value) || 0;
    var rate = (parseFloat($('#loanRate').value) || 0) / 100;
    var type = $('#loanType').value;
    var months = years * 12;
    var mr = rate / 12;

    if (type === 'equal') {
      var monthly = amount * mr * Math.pow(1 + mr, months) / (Math.pow(1 + mr, months) - 1);
      var total = monthly * months;
      var interest = total - amount;
      $('#loanResult').innerHTML =
        '<div class="calc-result"><div class="cr-amount">¥' + monthly.toFixed(2) + '</div>' +
        '<div class="cr-label">每月还款</div>' +
        '<div class="cr-detail">还款总额：¥' + total.toFixed(2) + '<br>支付利息：<strong>¥' + interest.toFixed(2) + '</strong><br>还款期数：' + months + '期</div></div>';
    } else {
      var ppm = amount / months;
      var first = ppm + amount * mr;
      var last = ppm + ppm * mr;
      var interest2 = (months + 1) * amount * mr / 2;
      $('#loanResult').innerHTML =
        '<div class="calc-result"><div class="cr-amount">¥' + first.toFixed(2) + '</div>' +
        '<div class="cr-label">首月还款（逐月递减¥' + (ppm * mr).toFixed(2) + '）</div>' +
        '<div class="cr-detail">末月还款：¥' + last.toFixed(2) + '<br>支付利息：<strong>¥' + interest2.toFixed(2) + '</strong><br>还款总额：¥' + (amount + interest2).toFixed(2) + '</div></div>';
    }
  };

  function showSbCalc() {
    openModal('🏦 五险一金计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>社保缴费基数（元/月）</label><input type="number" id="sbBase" value="8000" min="4812" max="24060"></div>' +
      '<div class="fg"><label>公积金缴存基数（元/月）</label><input type="number" id="gjjBase" value="8000" min="2490" max="39530"></div>' +
      '<div class="fg"><label>公积金缴存比例（个人 = 单位，5%~12%）</label><select id="gjjRate">' +
        '<option value="0.05">5%</option><option value="0.06">6%</option><option value="0.07">7%</option>' +
        '<option value="0.08">8%</option><option value="0.09">9%</option><option value="0.10">10%</option>' +
        '<option value="0.11">11%</option><option value="0.12" selected>12%</option></select></div>' +
      '<div style="padding:12px;background:var(--bg);border-radius:8px;font-size:12px;line-height:1.9;color:var(--text-secondary);">' +
      '<strong>杭州 2024 年度基数</strong>：社保下限 4812 / 上限 24060；公积金下限 2490 / 上限 39530。<br>' +
      '<strong>比例</strong>　个人：养老8%·医疗2%·失业0.5%　单位：养老14%·医疗9.9%·失业0.5%·工伤0.5%·生育0.8%</div>' +
      '<button class="btn btn-primary" onclick="window._calcSb()">计算五险一金</button>' +
      '</div><div id="sbResult"></div>'
    );
    // 社保基数变动时同步公积金基数（用户未手动改过的前提下）
    var sbEl = $('#sbBase');
    if (sbEl) sbEl.addEventListener('input', function () {
      var g = $('#gjjBase'); if (g && !g.dataset.touched) g.value = sbEl.value;
    });
    var gEl = $('#gjjBase');
    if (gEl) gEl.addEventListener('input', function () { gEl.dataset.touched = '1'; });
  }

  window._calcSb = function () {
    var base = parseFloat($('#sbBase').value) || 0;
    var gjjBase = parseFloat($('#gjjBase').value) || base;
    var rate = parseFloat($('#gjjRate').value) || 0.12;
    if (base <= 0) { showToast('请输入正确缴费基数'); return; }
    // 五险
    var p = { '养老': base * 0.08, '医疗': base * 0.02, '失业': base * 0.005 };
    var c = { '养老': base * 0.14, '医疗': base * 0.099, '失业': base * 0.005, '工伤': base * 0.005, '生育': base * 0.008 };
    var pSb = p.养老 + p.医疗 + p.失业;
    var cSb = c.养老 + c.医疗 + c.失业 + c.工伤 + c.生育;
    // 公积金
    var pG = gjjBase * rate, cG = gjjBase * rate;
    var pTotal = pSb + pG, cTotal = cSb + cG;
    var fmt = function (n) { return '¥' + n.toFixed(2); };
    $('#sbResult').innerHTML =
      '<div class="calc-result"><div class="cr-amount">' + fmt(pTotal) + '</div>' +
      '<div class="cr-label">个人每月合计（五险一金）</div>' +
      '<div class="cr-detail">单位每月合计：' + fmt(cTotal) + '<br>双方每月总计：' + fmt(pTotal + cTotal) + '<br>进入个人账户：' + fmt(p.养老 + p.医疗 + pG) + '</div></div>' +
      '<div style="margin-top:10px;font-size:13px;line-height:1.9;">' +
      '<strong>个人</strong>｜养老' + fmt(p.养老) + ' 医疗' + fmt(p.医疗) + ' 失业' + fmt(p.失业) + ' 公积金' + fmt(pG) + '<br>' +
      '<strong>单位</strong>｜养老' + fmt(c.养老) + ' 医疗' + fmt(c.医疗) + ' 失业' + fmt(c.失业) + ' 工伤' + fmt(c.工伤) + ' 生育' + fmt(c.生育) + ' 公积金' + fmt(cG) +
      '</div><p class="modal-tip">比例为杭州参考值，以社保 / 公积金中心最新公布为准</p>';
  };

  // ===== 退休年龄计算器（渐进式延迟退休，2025-01-01 起施行） =====
  function showRetire() {
    openModal('🎂 退休年龄计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>人员类别</label><select id="rtType">' +
        '<option value="m">男职工（原 60 周岁）</option>' +
        '<option value="f55">女职工 · 管理 / 技术岗（原 55 周岁）</option>' +
        '<option value="f50">女职工 · 工人岗（原 50 周岁）</option>' +
      '</select></div>' +
      '<div class="fg"><label>出生年月</label><input type="month" id="rtBirth" value="1975-06"></div>' +
      '<button class="btn btn-primary" onclick="window._calcRetire()">测算法定退休年龄</button>' +
      '<div id="rtResult"></div>' +
      '<p class="modal-tip">依据《关于实施渐进式延迟法定退休年龄的决定》（2025-01-01 起施行）</p>' +
      '</div>'
    );
  }

  // 渐进式延迟月数：自 startY-startM 起，每 step 个月出生延迟 1 个月，上限 cap 个月
  function retireDelay(y, m, sy, sm, step, cap) {
    var monthsSince = (y - sy) * 12 + (m - sm);
    if (monthsSince < 0) return 0;
    return Math.min(Math.floor(monthsSince / step) + 1, cap);
  }

  window._calcRetire = function () {
    var type = $('#rtType').value;
    var birth = $('#rtBirth').value;
    if (!birth || birth.indexOf('-') < 0) { showToast('请选择出生年月'); return; }
    var parts = birth.split('-');
    var y = parseInt(parts[0], 10), m = parseInt(parts[1], 10);
    var baseAge, delay;
    if (type === 'm') { baseAge = 60; delay = retireDelay(y, m, 1965, 1, 4, 36); }
    else if (type === 'f55') { baseAge = 55; delay = retireDelay(y, m, 1970, 1, 4, 36); }
    else { baseAge = 50; delay = retireDelay(y, m, 1975, 1, 2, 60); }
    // 原退休年月 + 延迟月数 → 实际退休年月
    var baseY = y + baseAge, baseM = m;
    var total = (baseM - 1) + delay;
    var ry = baseY + Math.floor(total / 12);
    var rm = total % 12 + 1;
    // 最低缴费年限：2030 起每年提高 6 个月，至 20 年封顶
    var minY = 15;
    if (ry >= 2030) minY = Math.min(20, 15 + (ry - 2030) * 0.5);
    var minStr = (minY % 1 === 0) ? minY + ' 年' : minY.toFixed(1) + ' 年';
    var dy = Math.floor(delay / 12), dm = delay % 12;
    var delayStr = delay > 0 ? ('已渐进延迟 ' + (dy ? dy + ' 年' : '') + (dm ? dm + ' 个月' : '') + (dy && dm ? '' : '')) : '未延迟（按原法定年龄）';
    $('#rtResult').innerHTML =
      '<div class="calc-result"><div class="cr-amount">' + baseAge + ' 岁' + (delay > 0 ? ' <span style="font-size:16px;">+' + delay + ' 月</span>' : '') + '</div>' +
      '<div class="cr-label">法定退休年龄' + (delay > 0 ? '（' + delayStr + '）' : '') + '</div>' +
      '<div class="cr-detail">预计退休时间：' + ry + ' 年 ' + rm + ' 月<br>' +
      '最低缴费年限：' + minStr + '（2030 起逐年提高至 20 年）<br>' +
      '弹性退休：可在 ±3 年内自愿选择</div></div>' +
      '<p class="modal-tip">测算仅供参考；特殊工种、病退等政策以人社部门认定为准</p>';
  };

  // ===== 金价查询 =====
  function showGold() {
    openModal('💰 实时金价',
      '<div id="goldBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">💰</div><p style="color:var(--text-muted);">正在获取金价...</p></div></div>'
    );
    getGoldData().then(function (result) {
      if (!result) {
        $('#goldBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">金价获取失败，请稍后重试</div>';
        return;
      }
      var g = result.gold;
      var html = '<div style="padding:16px 0;">' +
        '<div style="text-align:center;padding:16px;background:var(--bg);border-radius:12px;margin-bottom:12px;">' +
        '<div style="font-size:12px;color:var(--text-muted);">国际金价（XAU）</div>' +
        '<div style="font-size:32px;font-weight:800;color:var(--accent);margin:6px 0;">$' + g.usdPerOz + '/oz</div>' +
        '<div style="font-size:14px;color:var(--text-secondary);">≈ ¥' + g.cnyPerOz + '/盎司</div></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
        '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
        '<div style="font-size:12px;color:var(--text-muted);">人民币/克</div>' +
        '<div style="font-size:22px;font-weight:700;color:var(--primary);margin:4px 0;">¥' + g.cnyPerGram + '</div></div>' +
        '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
        '<div style="font-size:12px;color:var(--text-muted);">人民币/盎司</div>' +
        '<div style="font-size:22px;font-weight:700;color:var(--primary);margin:4px 0;">¥' + g.cnyPerOz + '</div></div>' +
        '</div>' +
        '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
        '<strong>💡 说明：</strong>1金衡盎司=31.1035克；金价实时波动，以金店/银行实际挂牌价为准</div>' +
        '<p class="modal-tip">更新时间：' + (result.updated || new Date().toUTCString()) + '</p></div>';
      $('#goldBox').innerHTML = html;
    });
  }

  // 本地开发兜底金价数据（与 Vercel 端点降级数据一致）
  var GOLD_FALLBACK = { gold: { usdPerOz: 2658, cnyPerOz: 19270, cnyPerGram: 619.5 }, unit: '元/克', updated: new Date().toLocaleString('zh-CN') };

  // 共享 getter：金价数据（异步 Promise，失败 resolve 兜底数据）
  function getGoldData() {
    return fetch('/api/tools?action=gold')
      .then(function (r) { return r.json(); })
      .then(function (data) { return (data && data.gold) ? data : GOLD_FALLBACK; })
      .catch(function () { return GOLD_FALLBACK; });
  }

  // ===== 杭州医院目录查询 =====
  function showHospital() {
    openModal('🏥 杭州医院目录',
      '<div id="hospitalBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">🏥</div><p style="color:var(--text-muted);">正在加载医院目录...</p></div></div>'
    );
    fetch('/api/hospital')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.hospitals) throw new Error('no data');
        var regUrl = data.regPlatform || 'https://zyygh.com/';
        var html = '<div style="padding:8px 0 12px;">' +
          '<a href="' + regUrl + '" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,var(--primary),#0284c7);color:#fff;border-radius:12px;text-align:center;text-decoration:none;font-weight:600;font-size:14px;margin-bottom:12px;">🏥 浙江预约挂号平台 →</a>';
        data.hospitals.forEach(function (h) {
          html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;border-left:4px solid var(--primary);">' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">' +
              '<div style="flex:1;">' +
                '<div style="font-weight:700;font-size:14px;color:var(--text);">' + h.name + '</div>' +
                '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">' + h.alias + ' · ' + h.level + ' · ' + h.area + '</div>' +
              '</div>' +
              '<span style="padding:2px 8px;background:var(--bg-alt);border-radius:6px;font-size:11px;color:var(--primary);white-space:nowrap;">' + (h.key ? h.key[0] : '') + '</span>' +
            '</div>' +
            '<div style="font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.6;">' +
              '<strong>📍 地址：</strong>' + h.address + '<br>' +
              '<strong>☎️ 电话：</strong><a href="tel:' + h.phone + '" style="color:inherit;text-decoration:none;">' + h.phone + '</a>' +
            '</div>' +
            '<a href="' + (h.regUrl || regUrl) + '" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;padding:6px 12px;background:var(--bg-alt);color:var(--primary);border-radius:6px;text-decoration:none;font-size:12px;font-weight:600;">预约挂号 →</a>' +
          '</div>';
        });
        html += '<p class="modal-tip">数据更新：' + (data.updated || '近期') + ' · 共 ' + data.hospitals.length + ' 家</p></div>';
        $('#hospitalBox').innerHTML = html;
      })
      .catch(function () {
        $('#hospitalBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">医院目录加载失败，<a href="https://zyygh.com/" target="_blank" rel="noopener" style="color:var(--primary);">点此直接访问挂号平台</a></div>';
      });
  }

  // ===== 杭州小客车摇号/竞价结果查询 =====
  function showYaohao() {
    openModal('🚗 杭州小客车摇号',
      '<div id="yaohaoBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">🚗</div><p style="color:var(--text-muted);">正在获取最新公告...</p></div></div>'
    );
    fetch('/api/tools?action=yaohao')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.notices) {
          var html = '<div style="padding:12px 0;">';
          html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
            '<a href="' + (data.officialSite || 'https://hzxkctk.cn/') + '" rel="noopener" style="padding:14px;background:var(--bg);border-radius:10px;text-align:center;text-decoration:none;color:inherit;">' +
            '<div style="font-size:24px;">🏛️</div><div style="font-size:14px;font-weight:600;margin-top:4px;">官方网站</div></a>' +
            '<a href="' + (data.applySite || 'https://apply.hzxkctk.cn/') + '" rel="noopener" style="padding:14px;background:var(--bg);border-radius:10px;text-align:center;text-decoration:none;color:inherit;">' +
            '<div style="font-size:24px;">📝</div><div style="font-size:14px;font-weight:600;margin-top:4px;">申请/查询</div></a>' +
            '</div>';
          html += '<div style="font-size:14px;font-weight:600;margin-bottom:8px;">📢 最新公告</div>';
          data.notices.forEach(function (n) {
            var nSafe = n.url && n.url.indexOf('http://') === 0 ? 'https://' + n.url.substring(7) : n.url;
            html += '<a href="' + nSafe + '" rel="noopener" style="display:block;padding:12px;background:var(--bg);border-radius:8px;margin-bottom:6px;text-decoration:none;color:inherit;">' +
              '<div style="font-size:14px;font-weight:500;">' + n.title + '</div>' +
              '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">点击查看详情 →</div></a>';
          });
          html += '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
            '<strong>💡 提醒：</strong>每月25日公开摇号，每月26日组织竞价；指标配置每月1次</div>' +
            '<p class="modal-tip">数据来源：hzxkctk.cn</p></div>';
          $('#yaohaoBox').innerHTML = html;
        } else { throw new Error('no data'); }
      })
      .catch(function () {
        $('#yaohaoBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">数据获取失败，<a href="https://hzxkctk.cn/" rel="noopener" style="color:var(--primary);">点此直接访问官网</a></div>';
      });
  }

  // ===== LPR利率查询 =====
  function showLPR() {
    openModal('📊 LPR利率查询',
      '<div id="lprBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">📈</div><p style="color:var(--text-muted);">正在获取LPR数据...</p></div></div>'
    );
    // LPR数据API
    fetch('https://api.hk4i.cn/lpr/', {method: 'GET', headers: {'Accept': 'application/json'}})
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.list) {
          var html = '<div style="padding:16px 0;">';
          data.list.slice(0, 6).forEach(function(item) {
            var is1Y = item.term === '1年';
            html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;">' +
              '<span style="font-weight:600;">' + item.term + 'LPR</span>' +
              '<span style="font-size:24px;font-weight:700;color:var(--primary);">' + item.rate + '%</span></div>' +
              '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + (item.date || '') + '</div></div>';
          });
          html += '<p class="modal-tip">数据来源：中国人民银行</p></div>';
          $('#lprBox').innerHTML = html;
        } else {
          $('#lprBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">暂无数据</div>';
        }
      })
      .catch(function() {
        // 使用备用静态数据
        $('#lprBox').innerHTML = 
          '<div style="padding:16px 0;">' +
          '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-weight:600;">1年期LPR</span>' +
          '<span style="font-size:24px;font-weight:700;color:var(--primary);">3.0%</span></div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">2026年8月20日</div></div>' +
          '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-weight:600;">5年期以上LPR</span>' +
          '<span style="font-size:24px;font-weight:700;color:var(--primary);">3.5%</span></div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">2026年8月20日</div></div>' +
          '<p class="modal-tip">数据来源：中国人民银行，仅供参考</p></div>';
      });
  }

  // ===== 农历转换（1900-2100）=====
  var LUNAR_INFO = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
    0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
    0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
    0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
    0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
    0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
    0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
    0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
    0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
    0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
    0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
    0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
    0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
    0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
    0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
    0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
    0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
    0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
    0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
    0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
    0x0d520];
  function lunarYearDays(y) {
    var sum = 348;
    for (var i = 0x8000; i > 0x8; i >>= 1) sum += (LUNAR_INFO[y - 1900] & i) ? 1 : 0;
    return sum + leapDays(y);
  }
  function leapMonth(y) { return LUNAR_INFO[y - 1900] & 0xf; }
  function leapDays(y) {
    if (leapMonth(y)) return (LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29;
    return 0;
  }
  function monthDays(y, m) { return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29; }
  function getLunar(date) {
    var offset = Math.floor((date - new Date(1900, 0, 31)) / 86400000);
    var y, temp = 0;
    for (y = 1900; y < 2101 && offset > 0; y++) { temp = lunarYearDays(y); offset -= temp; }
    if (offset < 0) { offset += temp; y--; }
    var leap = leapMonth(y), isLeap = false;
    var m;
    for (m = 1; m < 13 && offset > 0; m++) {
      if (leap > 0 && m === leap + 1 && !isLeap) { --m; isLeap = true; temp = leapDays(y); }
      else { temp = monthDays(y, m); }
      if (isLeap && m === leap + 1) isLeap = false;
      offset -= temp;
    }
    if (offset === 0 && leap > 0 && m === leap + 1) {
      if (isLeap) isLeap = false; else { isLeap = true; --m; }
    }
    if (offset < 0) { offset += temp; --m; }
    return { year: y, month: m, day: offset + 1, isLeap: isLeap };
  }

  // ===== 钱塘江观潮点（下游→上游，offset为相对盐官的分钟延迟）=====
  var TIDE_POINTS = [
    { name: '海宁盐官', desc: '一线潮·最佳观赏点', offset: 0 },
    { name: '老盐仓', desc: '回头潮', offset: 6 },
    { name: '萧山美女坝', desc: '美女二回头', offset: 20 },
    { name: '下沙七格', desc: '冲天潮', offset: 30 },
    { name: '三堡船闸', desc: '', offset: 38 },
    { name: '钱江新城城市阳台', desc: '', offset: 42 },
    { name: '九溪', desc: '', offset: 52 },
    { name: '珊瑚沙', desc: '', offset: 56 },
    { name: '闻堰', desc: '', offset: 62 },
    { name: '袁浦', desc: '', offset: 70 }
  ];

  // 根据农历日计算盐官站两次高潮时间（分钟），并返回大潮等级
  function calcTideTimes(lunarDay) {
    // 民间算法：农历初一盐官约12:00高潮，每天推迟约48分钟
    var t1 = (720 + (lunarDay - 1) * 48) % 1440;
    var t2 = (t1 + 744) % 1440; // 间隔12h24m
    // 区分日潮(6:00-18:00)和夜潮
    var dayTide, nightTide;
    if (t1 >= 360 && t1 < 1080) { dayTide = t1; nightTide = t2; }
    else { dayTide = t2; nightTide = t1; }
    // 大潮等级：距朔(初一)望(十五)越近潮越大
    var distToShuo = Math.min(lunarDay - 1, 30 - lunarDay + 1);
    var distToWang = Math.abs(lunarDay - 15);
    var dist = Math.min(distToShuo, distToWang);
    var level;
    if (dist <= 3) level = { label: '大潮', color: '#ef4444' };
    else if (dist <= 6) level = { label: '中潮', color: '#f59e0b' };
    else level = { label: '小潮', color: '#10b981' };
    return { day: dayTide, night: nightTide, level: level };
  }
  function fmtTime(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  // ===== 钱塘江潮汐查询 =====
  function showTide(dateStr) {
    var date = dateStr ? new Date(dateStr + 'T00:00:00') : new Date();
    var lunar = getLunar(date);
    var tide = calcTideTimes(lunar.day);
    var lunarMonths = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
    var lunarDays = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
    var lunarStr = '农历' + lunarMonths[lunar.month - 1] + '月' + lunarDays[lunar.day - 1];

    var html = '<div style="padding:12px 0;">';
    html += '<div style="text-align:center;margin-bottom:12px;">' +
      '<div style="font-size:18px;font-weight:700;">' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日</div>' +
      '<div style="font-size:13px;color:var(--text-muted);margin-top:2px;">' + lunarStr +
      ' · <span style="color:' + tide.level.color + ';font-weight:600;">' + tide.level.label + '</span></div></div>';
    html += '<div style="margin-bottom:12px;"><input type="date" id="tideDate" value="' + date.toISOString().split('T')[0] + '" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);" onchange="window.showTide(this.value)"></div>';

    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;font-size:12px;color:var(--text-muted);padding:0 8px;margin-bottom:4px;">' +
      '<div>观潮点</div><div style="text-align:center;">日潮</div><div style="text-align:center;">夜潮</div></div>';
    TIDE_POINTS.forEach(function(p) {
      var m = (tide.day + p.offset) % 1440;
      var e = (tide.night + p.offset) % 1440;
      html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;align-items:center;padding:10px 8px;background:var(--bg);border-radius:8px;margin-bottom:6px;">' +
        '<div><div style="font-weight:600;font-size:13px;">' + p.name + '</div>' +
        (p.desc ? '<div style="font-size:11px;color:var(--text-muted);">' + p.desc + '</div>' : '') + '</div>' +
        '<div style="text-align:center;font-weight:700;color:var(--primary);">' + fmtTime(m) + '</div>' +
        '<div style="text-align:center;font-weight:700;color:#8b5cf6;">' + fmtTime(e) + '</div></div>';
    });

    html += '<div style="padding:12px;background:var(--accent);border-radius:10px;color:#fff;margin-top:12px;font-size:13px;">' +
      '<strong>⚠️ 安全提醒</strong><br>观潮请在安全区域，切勿下堤。潮水凶猛，生命第一。</div>';
    html += '<p class="modal-tip">时间基于农历推算，受天气、风力、江道变化影响，仅供参考，请以现场实际情况为准</p></div>';

    if ($('#tideBox')) {
      $('#tideBox').innerHTML = html;
    } else {
      openModal('🌊 钱塘江潮汐预报', '<div id="tideBox">' + html + '</div>');
    }
  }

  // ===== 实时汇率 =====
  function showForex() {
    openModal('💱 实时汇率',
      '<div id="forexBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">💱</div><p style="color:var(--text-muted);">正在获取汇率...</p></div></div>'
    );
    // 优先调用本地 Vercel Serverless API，失败回退到公开 API，再失败用静态数据
    fetch('/api/tools?action=forex')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.list && data.list.length) {
          var html = '<div style="padding:16px 0;">' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
          data.list.forEach(function(c) {
            var val = c.unit ? (c.rate * c.unit).toFixed(2) : (1 / c.rate).toFixed(4);
            var label = c.unit ? (c.unit + c.symbol + '=') : ('1' + c.symbol + '=');
            html += '<div style="padding:14px 10px;background:var(--bg);border-radius:10px;text-align:center;">' +
              '<div style="font-size:12px;color:var(--text-muted);">' + c.name + ' ' + c.code + '</div>' +
              '<div style="font-size:18px;font-weight:700;color:var(--primary);margin-top:4px;">' + label + val + '¥</div></div>';
          });
          html += '</div><p class="modal-tip">更新时间：' + (data.updated || new Date().toUTCString()) + '</p></div>';
          $('#forexBox').innerHTML = html;
        } else {
          throw new Error('no data');
        }
      })
      .catch(function() {
        // 备用静态数据（2026年9月参考）
        $('#forexBox').innerHTML =
          '<div style="padding:16px 0;">' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">美元 USD</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">1$=7.24¥</div></div>' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">欧元 EUR</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">1€=7.85¥</div></div>' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">英镑 GBP</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">1£=9.12¥</div></div>' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">日元 JPY</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">100円=4.80¥</div></div>' +
          '</div><p class="modal-tip">汇率仅供参考，以银行实际汇率为准</p></div>';
      });
  }

// ===== 杭州怎么玩精选攻略 =====
function showGuide(key) {
  var guides = {
    lingyin: {
      title: '⛩️ 灵隐寺 · 千年古刹祈福攻略',
      body: '<p style="color:var(--text-secondary);line-height:1.8;">灵隐寺始建于东晋咸和元年（326 年），距今 1700 年，是杭州最早名刹，中国禅宗十刹之一。背靠北高峰，面朝飞来峰，济公和尚在此出家。建议配合飞来峰景区 + 北高峰索道一日游。</p><div class="guide-block"><h4>🎯 主要看点</h4><p>• <strong>大雄宝殿</strong>：中国最大木雕坐佛释迦牟尼（19.6 米高）<br>• <strong>飞来峰石窟</strong>：470 余尊五代至宋元造像，含著名大肚弥勒<br>• <strong>永福禅寺</strong>：灵隐旁小众秘境，无需额外门票<br>• <strong>韬光寺</strong>：北高峰半山腰，可俯瞰西湖全景<br>• <strong>药师殿/五百罗汉堂</strong>：清代文物，神态各异</p></div><div class="guide-block"><h4>🚇 交通</h4><p>• 公交：7 路、游 1 线「灵隐」站<br>• 地铁：3 号线黄龙体育中心站 → 换乘公交 7 路<br>• 自驾：节假日极度堵，强烈不推荐</p></div><div class="guide-block"><h4>🎫 门票</h4><p>• <strong>飞来峰 45 元</strong>（必购，含造像区）+ <strong>灵隐寺 30 元</strong>（含三支清香）<br>• 杭州市民卡 / 公园卡免飞来峰门票<br>• 开放时间：7:00-18:00，无需预约，现场购票</p></div><div class="guide-block"><h4>📅 推荐玩法</h4><p>• <strong>半日线</strong>：灵隐寺 → 永福禅寺 → 北高峰索道（索道 40 元）<br>• <strong>全日线</strong>：灵隐寺 → 中午法喜寺 5 元斋饭 → 下午龙井村<br>• <strong>最佳季节</strong>：秋季 10-11 月，桂花香满山<br>• <strong>避开人流</strong>：工作日早 7 点开门即入</p></div><p style="margin-top:8px;"><a href="https://www.lingyinsi.com/" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">灵隐寺官网 →</a></p>'
    },
    westlake: {
      title: '🌊 西湖十景 · 世界遗产游览攻略',
      body: '<p style="color:var(--text-secondary);line-height:1.8;">西湖是世界文化遗产，三面环山一面临城，面积 6.39 平方公里。自古以来「欲把西湖比西子，淡妆浓抹总相宜」。景区免费开放，无需门票，可步行/骑行/游船三选一。</p><div class="guide-block"><h4>🎯 西湖十景（按季节）</h4><p>• <strong>春</strong>：苏堤春晓、柳浪闻莺、花港观鱼<br>• <strong>夏</strong>：曲院风荷（6-8 月荷花盛开）<br>• <strong>秋</strong>：平湖秋月、三潭印月（中秋最佳）<br>• <strong>冬</strong>：断桥残雪（杭州雪少，雪后断桥热）</p></div><div class="guide-block"><h4>🚇 经典步行路线</h4><p>• <strong>半日线（2-3h）</strong>：断桥 → 白堤 → 孤山 → 浙江省博物馆 → 苏堤南口<br>• <strong>全日线（5-6h）</strong>：断桥 → 白堤 → 孤山 → 曲院风荷 → 苏堤 → 花港观鱼 → 雷峰塔<br>• <strong>骑行</strong>：景区共享单车很多，沿苏堤骑行（全长 2.8km，约 15 分钟）</p></div><div class="guide-block"><h4>🎫 费用</h4><p>• <strong>西湖景区</strong>：免费开放<br>• <strong>雷峰塔</strong>：40 元<br>• <strong>三潭印月船票</strong>：55 元（含登岛）<br>• <strong>手划船</strong>：150-180 元/小时</p></div><div class="guide-block"><h4>📅 推荐时间</h4><p>• 全年开放，最佳 3-5 月（春花）和 9-11 月（秋桂）<br>• 清晨 6-8 时人最少，日出时分最美<br>• 周末及节假日人流密集，建议工作日</p></div>'
    },
    xixi: {
      title: '🛶 西溪湿地 · 摇橹船生态游攻略',
      body: '<p style="color:var(--text-secondary);line-height:1.8;">西溪国家湿地公园位于西湖区与余杭区交界，距西湖约 5 公里，是国内首个国家级湿地公园，面积 11.5 平方公里。电影《非诚勿扰》取景地，与西湖、西泠并称「三西」。</p><div class="guide-block"><h4>🎯 必玩体验</h4><p>• <strong>摇橹船</strong>：100 元/船（6 人），1 小时穿越芦苇荡，最诗意<br>• <strong>深潭口</strong>：《非诚勿扰》取景地，古樟树 + 河渚街<br>• <strong>秋芦飞雪</strong>：秋季芦苇荡如雪，西溪最美季节<br>• <strong>河渚街</strong>：传统街巷、湿地博物馆、戏曲表演</p></div><div class="guide-block"><h4>🚇 交通</h4><p>• 地铁：3 号线 西溪湿地南站，步行 800 米到周家村入口<br>• 公交：193 路、290 路、B 支 7 至周家村<br>• 自驾：周家村、北门、东门均有停车场（10 元/小时）</p></div><div class="guide-block"><h4>🎫 门票</h4><p>• <strong>公园门票</strong>：80 元<br>• <strong>电瓶船套票</strong>：150 元（含门票+船票）<br>• <strong>摇橹船</strong>：100 元/船（6 人平摊）<br>• 杭州市民卡：40 元/年无限次入园<br>• 开放时间：7:00-18:30（夏）/ 7:30-17:30（冬）</p></div><div class="guide-block"><h4>📅 推荐时间</h4><p>• <strong>秋季最佳</strong>：9-11 月芦苇飞雪<br>• 春季：3-4 月探梅<br>• 建议安排：半天（上午湿地 + 下午河渚街喝茶）</p></div><p style="margin-top:8px;"><a href="https://www.xixiwetland.com.cn/" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">西溪湿地官网 →</a></p>'
    },
    songcheng: {
      title: '🎭 宋城千古情 · 杭州必看的演出',
      body: '<p style="color:var(--text-secondary);line-height:1.8;">杭州宋城位于之江路 148 号，是一座以南宋文化为主题的大型人造乐园，年接待超 1000 万人次。「宋城千古情」被誉为「世界三大名秀」之一（拉斯维加斯 O 秀、巴黎红磨坊并列），是杭州夜游的标志性项目。</p><div class="guide-block"><h4>🎭 演出亮点</h4><p>• 全剧 60 分钟，分「良渚之光」「宋宫宴舞」「金戈铁马」「西子传说」「魅力杭州」五幕<br>• 声光电 + 机械舞台 + 特技表演，视觉冲击强<br>• 观众席会「动」，水幕从天而降</p></div><div class="guide-block"><h4>🎫 门票</h4><p>• <strong>贵宾席</strong>：320 元（含千古情演出）<br>• <strong>豪华席</strong>：480 元（含千古情，视野更佳）<br>• <strong>尊宾席</strong>：580 元（含千古情，含茶点）<br>• 单买公园票（不含演出）：100 元</p></div><div class="guide-block"><h4>🚇 交通</h4><p>• 公交：4 路、39 路、202 路「宋城」站<br>• 地铁：6 号线 之江路站，步行约 1 公里<br>• 自驾：宋城停车场 5 元/小时，节假日早到</p></div><div class="guide-block"><h4>📅 观演攻略</h4><p>• 演出每日 4 场：14:00、16:00、19:00、20:30（节假日加场）<br>• 建议选 19:00 或 20:30 夜场，景区夜景更美<br>• 提前 30 分钟入场选座（座位不指定号，先到先占）<br>• 一票难求日期：国庆、春节、五一等长假提前 3 天抢购</p></div><p style="margin-top:8px;"><a href="https://www.songcn.com/" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">宋城千古情官网 →</a></p>'
    },
    liangzhu: {
      title: '🏛️ 良渚古城 · 五千年文明世界遗产',
      body: '<p style="color:var(--text-secondary);line-height:1.8;">良渚古城遗址位于余杭区瓶窑镇，距今约 5300-4300 年，是中华五千年文明的实证。2019 年列入《世界遗产名录》，中国第 55 处世界遗产。良渚文化以精美玉器闻名，「玉琮王」为代表性器物。</p><div class="guide-block"><h4>🎯 主要看点</h4><p>• <strong>莫角山宫殿区</strong》：5000 年前的大型宫殿地基<br>• <strong>反山王陵</strong>：出土玉琮王、玉钺王（王权象征）<br>• <strong>老虎岭水坝</strong>：世界最早大型水利工程，比大禹治水早 1000 年<br>• <strong>良渚博物院</strong>：免费，展示 5000 年稻作文明与玉器精品<br>• <strong>20 万斤碳化稻谷</strong>：证明当时已有大规模稻作农业</p></div><div class="guide-block"><h4>🚇 交通</h4><p>• 地铁：2 号线 良渚站 → 换乘公交 428/781 路<br>• 自驾：杭州市区驾车约 1 小时，遗址公园停车 10 元<br>• 博物院与遗址公园相距约 3 公里，建议一日游同访</p></div><div class="guide-block"><h4>🎫 门票</h4><p>• <strong>良渚古城遗址公园</strong>：50 元（观光车另购 20 元）<br>• <strong>良渚博物院</strong>：免费，需提前在公众号预约<br>• 遗址公园开放时间：9:00-17:00（16:00 停止入场）<br>• 博物院开放时间：9:00-16:30（周一闭馆）</p></div><div class="guide-block"><h4>📅 推荐时间</h4><p>• 春秋：户外遗址区凉爽，植被最美<br>• 夏季注意防晒，公园较大建议乘观光车<br>• 最佳行程：上午博物院（室内）+ 下午遗址公园</p></div><p style="margin-top:8px;"><a href="https://www.lzsite.cn/" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">良渚古城官网 →</a></p>'
    },
    faxi: {
      title: '🌸 法喜寺 · 杭州最网红的祈福地',
      body: '<p style="color:var(--text-secondary);line-height:1.8;">法喜寺（上天竺寺）位于西湖区天竺路，始建于后晋天福元年（936 年），与灵隐寺、中天竺、下天竺并称「天竺三寺」。因网红 5 元斋饭、白玉兰花期、年轻化禅意御守走红，是杭州年轻人最爱的寺庙。</p><div class="guide-block"><h4>🎯 为什么火？</h4><p>• <strong>5 元斋饭</strong>：两菜一饭一汤，平日限量，售完即止<br>• <strong>求姻缘最灵</strong>：寺内观音据说灵验，年轻女性最爱打卡<br>• <strong>黄墙拍照</strong>：黄墙黛瓦配汉服，出片率极高<br>• <strong>御守/明信片</strong>：御守（护身符）可爱，有姻缘/学业/平安三种<br>• <strong>白玉兰</strong>：2 月底-3 月初，满寺白玉兰盛开</p></div><div class="guide-block"><h4>🚇 交通</h4><p>• 公交：7 路、103 路、324 路「上天竺」站<br>• 地铁：3 号线 黄龙体育中心站 → 换乘 7 路至「上天竺」<br>• 步行天竺路串联：下天竺 → 中天竺 → 上天竺，约 1.5 公里</p></div><div class="guide-block"><h4>🎫 门票</h4><p>• <strong>10 元/人</strong>（含三支清香）<br>• 开放时间：6:30-18:00<br>• 斋饭供应：11:00-13:00（售完即止，节假日排队长）</p></div><div class="guide-block"><h4>📅 攻略</h4><p>• 最佳季节：2-3 月玉兰期<br>• 最佳时间：平日早 8 点前到，人少清幽<br>• 路线串联：灵隐寺 → 法喜寺一日联游（相距 3km）<br>• 注意着装：勿穿背心/短裙入寺</p></div>'
    }
  };
  var g = guides[key];
  if (g) openModal(g.title, g.body);
}

// ===== 地铁时刻表 =====
function showMetro() {
    openModal('🚇 杭州地铁时刻表',
      '<div id="metroBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">🚇</div><p style="color:var(--text-muted);">正在加载地铁时刻表...</p></div></div>'
    );
    // 备用静态数据（fetch 失败时回退）
    var fallbackLines = [
      {name: '1号线', color: '#EF8031', stations: '湘湖-萧山国际机场', first: '06:04', last: '22:50'},
      {name: '2号线', color: '#F00D0D', stations: '朝阳-良渚', first: '06:02', last: '22:48'},
      {name: '3号线', color: '#FFB81C', stations: '吴山前村-星桥', first: '06:03', last: '22:30'},
      {name: '4号线', color: '#008C42', stations: '浦沿-池华街', first: '06:05', last: '22:55'},
      {name: '5号线', color: '#BF7D00', stations: '金星-姑娘桥', first: '06:00', last: '22:30'},
      {name: '6号线', color: '#BF83EC', stations: '桂花西路-双浦', first: '06:08', last: '22:42'},
      {name: '7号线', color: '#1DAAE2', stations: '吴山广场-江东二路', first: '06:12', last: '22:56'},
      {name: '8号线', color: '#8E54ED', stations: '文海南路-南阳', first: '06:08', last: '22:32'},
      {name: '9号线', color: '#D07D1E', stations: '观音塘-龙安', first: '06:04', last: '22:32'},
      {name: '10号线', color: '#00B2A9', stations: '黄龙体育中心-逸盛路', first: '06:05', last: '22:35'},
      {name: '16号线', color: '#FF6B6B', stations: '九州街-临安广场', first: '06:10', last: '22:33'},
      {name: '19号线', color: '#6F73D2', stations: '苕溪-永盛路', first: '06:00', last: '23:15'}
    ];
    var renderMetro = function (lines, fare, source) {
      var html = '<div style="padding:12px 0;">';
      if (fare) {
        html += '<div style="padding:12px;background:linear-gradient(135deg,var(--primary),#0284c7);color:#fff;border-radius:10px;margin-bottom:12px;">' +
          '<div style="font-size:13px;opacity:0.9;">🚇 杭州地铁票价</div>' +
          '<div style="font-size:18px;font-weight:700;margin-top:4px;">起步 ' + fare.base + ' 元 · 最高 ' + fare.max + ' 元</div>' +
          '<div style="font-size:11px;opacity:0.85;margin-top:4px;line-height:1.5;">' + fare.rule + '</div></div>';
      }
      lines.forEach(function (line) {
        html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;border-left:4px solid ' + line.color + ';">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">' +
          '<span style="font-weight:700;font-size:14px;">' + line.name + '</span>' +
          '<span style="font-size:11px;color:var(--text-muted);flex:1;text-align:right;">' + line.stations + '</span></div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;font-size:12px;">' +
          '<div><span style="color:var(--text-muted);">首班</span> <span style="font-weight:600;">' + line.first + '</span></div>' +
          '<div><span style="color:var(--text-muted);">末班</span> <span style="font-weight:600;">' + line.last + '</span></div></div>' +
          (line.transfer ? '<div style="margin-top:6px;font-size:11px;color:var(--text-muted);">换乘：' + (line.transfer.join ? line.transfer.join(' / ') : line.transfer) + '</div>' : '') +
          '</div>';
      });
      html += '<p class="modal-tip">数据来源：' + (source || 'hzmetro.com') + '，以地铁公司公告为准</p></div>';
      $('#metroBox').innerHTML = html;
    };
    fetch('/api/metro')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.lines) renderMetro(data.lines, data.fare, 'hzmetro.com');
        else renderMetro(fallbackLines, null, '本地回退数据');
      })
      .catch(function () {
        renderMetro(fallbackLines, null, '本地回退数据');
      });
  }

  // ===== 模态框 =====
  function openModal(title, content) {
    $('#modalTitle').innerHTML = title;
    $('#modalBody').innerHTML = content;
    $('#modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('#modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== 今日杭州实时信息流卡片 =====
  function renderTodayHangzhou() {
    var box = $('#todayHangzhou');
    if (!box) return;
    // 渲染骨架
    box.innerHTML =
      '<div class="th-card" id="thXianxing" onclick="openModal(\'🚗 今日限行\', buildXianxingModal())">' +
        '<div class="th-icon">🚗</div><div class="th-title">今日限行</div>' +
        '<div class="th-value">—</div><div class="th-sub">加载中</div></div>' +
      '<div class="th-card" id="thWeather" onclick="showWeather()">' +
        '<div class="th-icon">⛅</div><div class="th-title">今日天气</div>' +
        '<div class="th-value">—</div><div class="th-sub">加载中</div></div>' +
      '<div class="th-card" id="thYoujia" onclick="showYoujia()">' +
        '<div class="th-icon">⛽</div><div class="th-title">今日油价</div>' +
        '<div class="th-value">—</div><div class="th-sub">92/95/98</div></div>' +
      '<div class="th-card" id="thGold" onclick="showGold()">' +
        '<div class="th-icon">💰</div><div class="th-title">今日金价</div>' +
        '<div class="th-value">—</div><div class="th-sub">元/克</div></div>';

    // 1. 限行（同步）
    var xx = getXianxingData();
    var thX = $('#thXianxing');
    if (thX) {
      thX.querySelector('.th-value').textContent = xx.tail;
      thX.querySelector('.th-sub').textContent = xx.isWeekend ? '周末不限行' : '非浙A全限';
    }

    // 2. 油价（同步）
    var yj = getYoujiaData();
    var thY = $('#thYoujia');
    if (thY) {
      thY.querySelector('.th-value').textContent = '¥' + yj['92号'];
      thY.querySelector('.th-sub').textContent = '92号油 · 元/升';
    }

    // 3. 天气（异步，失败使用兜底数据）
    getWeatherData().then(function (w) {
      var thW = $('#thWeather');
      if (!thW) return;
      thW.querySelector('.th-value').textContent = w.temp + '°';
      thW.querySelector('.th-sub').textContent = w.desc + ' 明' + w.forecast[1].min + '~' + w.forecast[1].max + '°';
    });

    // 4. 金价（异步，失败使用兜底数据）
    getGoldData().then(function (result) {
      var thG = $('#thGold');
      if (!thG) return;
      thG.querySelector('.th-value').textContent = '¥' + result.gold.cnyPerGram;
      thG.querySelector('.th-sub').textContent = '黄金人民币/克';
    });
  }

  // ===== 资讯流：拉取 /api/news 渲染到首页 banner =====
  function renderNewsBanner() {
    var box = $('#newsBanner');
    if (!box) return;
    box.innerHTML = '<div class="news-item"><div class="news-tag">加载中</div><div class="news-title">正在获取杭州资讯...</div></div>';
    // 事件委托打开外链（避免把外部 URL 拼进 onclick 属性，防 XSS）
    box.onclick = function (e) {
      var item = e.target && e.target.closest ? e.target.closest('.news-item') : null;
      if (item && item.getAttribute('data-url')) openUrl(item.getAttribute('data-url'));
    };
    fetch('/api/news')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        // 兼容旧版 items / 新版 headlines
        var items = (data && (data.headlines || data.items)) || [];
        if (!items.length) throw new Error('no data');
        box.innerHTML = items.map(function (n, i) {
          var tagClass = n.tag === '政策' ? '' : (n.tag === '便民' ? 'news-tag-new' : 'news-tag');
          return '<div class="news-item" data-url="' + escapeHtml(n.url || '') + '" style="cursor:pointer' + (i > 0 ? ';display:none' : '') + '">' +
            '<div class="news-tag ' + tagClass + '">' + escapeHtml(n.tag || '资讯') + '</div>' +
            '<div class="news-title">' + escapeHtml(n.title || '') + '</div>' +
            '</div>';
        }).join('');

        // 新版：插入「明日预告」横条作为回访钩子
        if (data.tomorrow) {
          var existingHint = document.getElementById('tomorrowHint');
          if (existingHint) existingHint.remove();
          var hint = document.createElement('div');
          hint.id = 'tomorrowHint';
          hint.className = 'tomorrow-hint';
          var xxBadge = data.tomorrow.xianxing.type === 'weekend' ? '🎉 不限行' : ('限行 ' + data.tomorrow.xianxing.tail);
          hint.innerHTML =
            '<div class="th-label">明日 ' + data.tomorrow.week + '</div>' +
            '<div class="th-badge ' + (data.tomorrow.xianxing.type === 'weekend' ? 'is-free' : '') + '">' + xxBadge + '</div>' +
            '<div class="th-action">' + data.tomorrow.hint + '</div>';
          box.parentNode.insertBefore(hint, box.nextSibling);
        }

        // 时令提醒
        if (data.today && data.today.seasonalTip) {
          var existingSeasonal = document.getElementById('seasonalTip');
          if (existingSeasonal) existingSeasonal.remove();
          var seasonal = document.createElement('div');
          seasonal.id = 'seasonalTip';
          seasonal.className = 'seasonal-tip';
          seasonal.innerHTML = data.today.seasonalTip;
          box.parentNode.insertBefore(seasonal, box.nextSibling);
        }

        // 轮播：每 5s 滚动一条
        if (box._timer) { clearInterval(box._timer); box._timer = null; }
        var carouselIdx = 0;
        var newsItems = box.querySelectorAll('.news-item');
        if (newsItems.length > 1) {
          box._timer = setInterval(function () {
            newsItems.forEach(function (el) { el.style.display = 'none'; });
            carouselIdx = (carouselIdx + 1) % newsItems.length;
            newsItems[carouselIdx].style.display = 'flex';
          }, 5000);
        }
      })
      .catch(function () {
        box.innerHTML = '<div class="news-item" data-url="https://www.hangzhou.gov.cn/">' +
          '<div class="news-tag">热门</div>' +
          '<div class="news-title">点击访问杭州市政府官网 →</div></div>';
      });
  }

  // ===== 杭州 13 区县数据 =====
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

  // ===== 区县详细信息（景点/地标/政务入口）=====
  var DISTRICT_DETAILS = {
    'hangzhou': {
      tag: '全市通用 · 杭州生活助手',
      desc: '杭州，浙江省省会，长三角南翼中心城市。13 区县市，常住人口约 1200 万。',
      highlights: ['西湖', '京杭大运河', '良渚古城', '钱塘江', '灵隐寺'],
      govUrl: 'https://www.hangzhou.gov.cn/',
      features: '数字经济、文化旅游、创新中心'
    },
    'shangcheng': {
      tag: '南宋皇城核心 · 老底子杭州',
      desc: '由原上城区和江干区合并，涵盖南宋皇城遗址、钱江新城 CBD，杭州政治、文化、金融中心。',
      highlights: ['南宋御街', '河坊街', '钱江新城', '市民中心', '西湖东岸'],
      scenic: [
        { name: '清河坊', desc: '杭州最知名步行街，老字号与非遗聚集' },
        { name: '南宋御街', desc: '南宋皇城的中轴大道，中山路一带' },
        { name: '钱江新城', desc: '日月同辉、城市阳台、灯光秀' },
        { name: '白塔公园', desc: '南宋地宫遗址、绿皮火车怀旧' },
        { name: '湖滨步行街', desc: '西湖东岸，音乐喷泉' }
      ],
      landmarks: ['市民中心', '杭州大剧院', '万松书院', '胡庆余堂', '邵逸夫医院'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527152/index.html',
      features: '政务办事核心区（市民中心）、金融街（庆春路）、老字号聚集地、CBD 经济引擎'
    },
    'gongshu': {
      tag: '运河文化核心 · 工业遗存',
      desc: '由原拱墅区和下城区合并，京杭大运河南端，杭州传统工业基地转型文创示范区。',
      highlights: ['京杭大运河', '拱宸桥', '小河直街', '武林广场', '杭州大厦'],
      scenic: [
        { name: '拱宸桥', desc: '京杭大运河南端标志，三孔石拱桥' },
        { name: '小河直街', desc: '运河边的市井人家，原汁原味老杭州' },
        { name: '桥西历史街区', desc: '运河边的历史文化保护区' },
        { name: '大兜路历史街区', desc: '运河边的禅意慢生活' },
        { name: '杭州工艺美术馆', desc: '免费，非遗工艺展示' }
      ],
      landmarks: ['武林广场', '杭州大厦', '浙江展览馆', '运河广场', '香积寺'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527153/index.html',
      features: '运河文化、工业遗存改造（LOFT49、丝联 166）、武林商圈、传统市井生活'
    },
    'xihu': {
      tag: '西湖名胜核心 · 文教区',
      desc: '因西湖而得名，涵盖西湖风景名胜区西岸、转塘、之江国家旅游度假区。杭州文教区、文创区。',
      highlights: ['西湖', '灵隐寺', '龙井茶村', '中国美院', '云栖小镇'],
      scenic: [
        { name: '西湖', desc: '5A 级，免费开放，断桥、苏堤、雷峰塔' },
        { name: '灵隐寺 + 飞来峰', desc: '杭州最古寺院，飞来峰石窟造像' },
        { name: '龙井村 / 梅家坞', desc: '西湖龙井茶原产地，茶文化体验' },
        { name: '中国美院象山校区', desc: '王澍设计，普利兹克奖作品' },
        { name: '西溪湿地（部分）', desc: '国家级湿地公园' }
      ],
      landmarks: ['浙大紫金港校区', '黄龙体育中心', '浙江图书馆', '杭州植物园', '宋城'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527154/index.html',
      features: '西湖风景名胜区、文教区（浙大、商大、美院）、龙井茶产地、云栖小镇（云计算）'
    },
    'binjiang': {
      tag: '杭州硅谷 · 高新区',
      desc: '杭州国家高新区，与萧山隔江相望。阿里巴巴、网易、海康威视总部所在地。',
      highlights: ['网易', '阿里巴巴', '海康威视', '白马湖', '星光大道'],
      scenic: [
        { name: '白马湖生态创意城', desc: '中国动漫节永久会址' },
        { name: '杭州乐园', desc: '过山车、水上乐园' },
        { name: '湘湖（部分）', desc: '与西湖并称「姊妹湖」' },
        { name: '星光大道步行街', desc: '电影主题商业街' },
        { name: '钱塘江沿岸', desc: '最美滨江跑道' }
      ],
      landmarks: ['阿里巴巴总部', '网易总部', '海康威视', '杭二中', '滨江区行政中心'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527155/index.html',
      features: '高新区、互联网企业总部（阿里/网易/海康/大华）、动漫产业、物联网产业'
    },
    'xiaoshan': {
      tag: '机场门户 · 民企之乡',
      desc: '萧山国际机场所在地，杭州民营企业之乡，湘湖度假区。',
      highlights: ['萧山机场', '湘湖', '杭州乐园', '观潮城', '东方文化园'],
      scenic: [
        { name: '湘湖', desc: '跨湖桥遗址所在地，8000 年文明' },
        { name: '杭州乐园', desc: '长三角老牌主题公园' },
        { name: '极乐寺', desc: '萧山最大寺院' },
        { name: '东方文化园', desc: '儒释道三家合一' },
        { name: '观潮城（南阳）', desc: '钱塘江大潮最佳观赏点之一' }
      ],
      landmarks: ['萧山机场', '湘湖', '杭州南站', '萧山剧院', '恒逸集团'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527156/index.html',
      features: '萧山国际机场、民营企业之乡（恒逸、荣盛）、湘湖度假区、亚洲邮展中心'
    },
    'yuhang': {
      tag: '良渚文明 · 未来科技城',
      desc: '良渚古城遗址（世界遗产）所在地，未来科技城、阿里巴巴总部、之江实验室。',
      highlights: ['良渚古城', '未来科技城', '阿里巴巴', '径山寺', '梦想小镇'],
      scenic: [
        { name: '良渚古城遗址公园', desc: '5000 年中华文明实证，门票 50 元' },
        { name: '良渚博物院', desc: '免费，周一闭馆，建筑大师设计' },
        { name: '径山寺', desc: '日本茶道祖庭，径山茶宴' },
        { name: '双溪漂流', desc: '江南第一漂' },
        { name: '梦想小镇', desc: '互联网创业小镇' }
      ],
      landmarks: ['良渚古城', '未来科技城', '阿里巴巴总部', '之江实验室', '径山'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527157/index.html',
      features: '良渚文明（世界遗产）、未来科技城、阿里巴巴总部、之江实验室、径山茶'
    },
    'linping': {
      tag: '杭州东站 · 家纺之都',
      desc: '杭州东站门户，家纺产业基地，塘栖古镇、超山梅花、艺尚小镇。',
      highlights: ['杭州东站', '塘栖古镇', '超山梅花', '艺尚小镇', '临平大剧院'],
      scenic: [
        { name: '超山风景区', desc: '江南三大探梅胜地，2-3 月最佳' },
        { name: '临平山公园', desc: '城区绿肺，俯瞰临平全景' },
        { name: '塘栖古镇', desc: '京杭运河沿岸，杭州唯一古镇' },
        { name: '艺尚小镇', desc: '中国时尚产业高地' },
        { name: '临平大剧院', desc: '杭州第二大剧院' }
      ],
      landmarks: ['杭州东站', '塘栖古镇', '超山', '临平大剧院', '艺尚小镇'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527158/index.html',
      features: '杭州东站门户、家纺产业、时尚创意（艺尚小镇）、塘栖古镇、超山梅花'
    },
    'qiantang': {
      tag: '下沙大学城 · 制造基地',
      desc: '下沙大学城（14 所高校）、大江东制造业基地、生物医药港。',
      highlights: ['下沙大学城', '金沙湖', '钱塘江湿地', '宝龙广场', '医药港'],
      scenic: [
        { name: '下沙大学城', desc: '14 所高校，15 万大学生' },
        { name: '金沙湖公园', desc: '下沙最大城市公园' },
        { name: '钱塘江生态湿地', desc: '滨江生态走廊' },
        { name: '宝龙广场', desc: '下沙商业中心' },
        { name: '沿江湿地公园', desc: '观潮、骑行、烧烤' }
      ],
      landmarks: ['下沙高教园', '杭州电子科技大学', '浙江理工大学', '医药港小镇', '大江东产业区'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527159/index.html',
      features: '下沙大学城（高教）、大江东制造业基地、生物医药港、跨境电商'
    },
    'fuyang': {
      tag: '《富春山居图》原乡 · 造纸之乡',
      desc: '《富春山居图》创作地，造纸之乡，龙门古镇、富春桃源。',
      highlights: ['富春山居图', '富春江', '龙门古镇', '新登古城', '银湖科技城'],
      scenic: [
        { name: '龙门古镇', desc: '孙权故里，三国孙氏后裔聚居' },
        { name: '富春桃源', desc: '溶洞 + 漂流 + 玻璃栈道' },
        { name: '黄公望隐居地', desc: '《富春山居图》创作地' },
        { name: '杭州野生动物世界', desc: '4A 级，亲子首选' },
        { name: '东梓关村', desc: '中国最美安置房' }
      ],
      landmarks: ['富春江', '新登古城', '银湖科技城', '富阳高铁站', '春永线'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527160/index.html',
      features: '《富春山居图》原型地、造纸之乡、运动休闲之城、龙门古镇'
    },
    'linan': {
      tag: '吴越王故里 · 山核桃之都',
      desc: '吴越国钱王故里，天目山、青山湖、山核桃。',
      highlights: ['天目山', '清凉峰', '青山湖', '大明山', '白果之乡'],
      scenic: [
        { name: '天目山', desc: '大树华盖闻九洲，银杏祖树' },
        { name: '大明山', desc: '高山滑雪场（江南罕见）' },
        { name: '青山湖', desc: '水上森林奇观' },
        { name: '太湖源', desc: '太湖发源地之一' },
        { name: '白果之乡 (白牛村)', desc: '中国最早淘宝村' }
      ],
      landmarks: ['天目山', '清凉峰', '青山湖科技城', '临安博物馆', '钱王陵'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527161/index.html',
      features: '吴越文化（钱王故里）、山核桃、竹笋、生态旅游、青山湖科技城'
    },
    'tonglu': {
      tag: '中国最美县城 · 瑶琳仙境',
      desc: '中国最美县城，瑶琳仙境、富春江下游、慢生活。',
      highlights: ['瑶琳仙境', '富春江', '芦茨村', '深澳古村', '桐庐米粿'],
      scenic: [
        { name: '瑶琳仙境', desc: '全国著名溶洞，地下迷宫' },
        { name: '富春江小三峡', desc: '严子陵钓台所在地' },
        { name: '芦茨村', desc: '土屋、溪流、慢生活' },
        { name: '深澳古村', desc: '申屠氏家族聚居 1000 年' },
        { name: '合村竹筏漂流', desc: '桐庐溪漂流代表' }
      ],
      landmarks: ['大奇山国家森林公园', '桐君山', '桐庐博物馆', '桐庐银泰'],
      govUrl: 'https://www.tonglu.gov.cn/',
      features: '中国最美县城、瑶琳仙境、富春江下游、中药文化（桐君老人）、慢生活'
    },
    'chunan': {
      tag: '千岛湖 · 国家级饮用水源地',
      desc: '千岛湖 5A 景区，农夫山泉水源地，环湖骑行、有机鱼头。',
      highlights: ['千岛湖', '农夫山泉', '梅峰岛', '环湖骑行', '鱼头'],
      scenic: [
        { name: '千岛湖中心湖区', desc: '梅峰岛、月光岛、龙山岛' },
        { name: '千岛湖东南湖区', desc: '黄山尖、天池岛' },
        { name: '环湖骑行绿道', desc: '120 公里最美环湖骑行道' },
        { name: '千岛湖水下古城', desc: '原遂安县城，1959 年沉水' },
        { name: '文渊狮城', desc: '水下古城的岸上复刻版' }
      ],
      landmarks: ['千岛湖', '农夫山泉水源地', '淳安博物馆', '千岛湖大桥'],
      govUrl: 'https://www.qdh.gov.cn/',
      features: '千岛湖 5A 景区、农夫山泉水源、环湖骑行、有机鱼头、水下古城'
    },
    'jiande': {
      tag: '新安江 · 17 度清凉水',
      desc: '新安江 17°C 清凉水，严州古城（梅城）、大慈岩悬空寺。',
      highlights: ['新安江', '建德豆腐包', '大慈岩', '新叶古村', '严州古城'],
      scenic: [
        { name: '大慈岩', desc: '悬空寺、立佛、银杏王' },
        { name: '灵栖洞', desc: '《西游记》取景地' },
        { name: '新叶古村', desc: '《爸爸去哪儿》取景地' },
        { name: '新安江水电站', desc: '中国水电事业里程碑' },
        { name: '七里扬帆', desc: '富春江下游最美一段' }
      ],
      landmarks: ['新安江', '建德博物馆', '严州古城（梅城）', '建德高铁东站'],
      govUrl: 'https://www.jiande.gov.cn/',
      features: '新安江 17°C 清凉水、严州古城（梅城）、大慈岩悬空寺、上山文化遗址'
    }
  };
  // 暴露给专题页（travel/food/museum 等按区县过滤内容用）
  window.DISTRICTS = DISTRICTS;
  window.DISTRICT_DETAILS = DISTRICT_DETAILS;
  window.initCityDropdown = initCityDropdown;

  function initCityDropdown() {
    var cur = lsGet('ihz_city', 'hangzhou');
    var name = (DISTRICTS.find(function(d){return d.id===cur;}) || DISTRICTS[0]).full;
    var el = document.getElementById('cityName');
    if (el) el.textContent = name;
    var box = document.getElementById('cityDropdown');
    if (!box) return;
    var curId = lsGet('ihz_city', 'hangzhou');
    var html = '<div class="city-dropdown-title">选择区县</div>';
    DISTRICTS.forEach(function(d) {
      html += '<div class="city-dropdown-item' + (d.id===curId?' active':'') + '" data-id="' + d.id + '">' +
        '<span>' + d.full + '</span><span class="cd-dist">' + d.desc + '</span></div>';
    });
    box.innerHTML = html;
    // 事件委托：避免 header 模板异步加载后 onclick 丢失
    if (!box._delegateBound) {
      box._delegateBound = true;
      box.addEventListener('click', function(e) {
        var item = e.target.closest('.city-dropdown-item');
        if (!item) return;
        e.preventDefault();
        e.stopPropagation();
        var id = item.getAttribute('data-id');
        lsSet('ihz_city', id);
        var d = DISTRICTS.find(function(x){return x.id===id;});
        var nameEl = document.getElementById('cityName');
        if (nameEl) nameEl.textContent = d.full;
        box.classList.remove('show');
        // 更新选中态
        box.querySelectorAll('.city-dropdown-item').forEach(function(it) {
          it.classList.toggle('active', it.getAttribute('data-id') === id);
        });
        // 关闭设置面板，确保能看到页面更新
        var overlay = document.getElementById('settingsOverlay');
        var settingsPanel = document.getElementById('settingsPanel');
        if (overlay) overlay.classList.remove('active');
        if (settingsPanel) settingsPanel.classList.remove('active');
        // 切换到"杭州"：先重置首页区县卡片，再判断是否在首页
        if (id === 'hangzhou') {
          if (typeof renderDistrictInfo === 'function') renderDistrictInfo();
          if (typeof renderTodayHangzhou === 'function') renderTodayHangzhou();
          var isIndex = location.pathname === '/' ||
            /\/index\.html?$/i.test(location.pathname) ||
            location.pathname.endsWith('/ihangzhou-helper/');
          if (isIndex) {
            showToast('已切换到 ' + d.full);
            return;
          }
          showToast('已切换到 ' + d.full);
          setTimeout(function () { location.href = 'index.html'; }, 400);
          return;
        }
        // 切到具体区县 → 跳转区县详情页
        showToast('正在跳转 ' + d.full);
        setTimeout(function() {
          location.href = 'district.html?id=' + id;
        }, 400);
      });
    }
  }

  // ===== 区县特色卡片渲染 =====
  function renderDistrictInfo() {
    var box = $('#districtInfo');
    if (!box) return;
    var curId = lsGet('ihz_city', 'hangzhou');
    // 全市状态默认不显示城市介绍卡片（避免首页堆砌冗余信息）
    if (curId === 'hangzhou') { box.innerHTML = ''; box.style.display = 'none'; return; }
    box.style.display = '';
    var info = DISTRICT_DETAILS[curId];
    if (!info) { box.innerHTML = ''; return; }
    var d = DISTRICTS.find(function(x){return x.id===curId;}) || DISTRICTS[0];

    var scenicHtml = '';
    if (info.scenic && info.scenic.length) {
      var EMOJI_MAP = [
        ['西湖','🪷'],['断桥','🌉'],['雷峰','🗼'],['苏堤','🌿'],['三潭','🌙'],
        ['灵隐','⛩️'],['飞来峰','⛰️'],['龙井','🍵'],['梅家坞','🍃'],['西溪','🛶'],
        ['运河','🚢'],['拱宸','🌉'],['小河','🏠'],['大兜','🏮'],['武林','🏙️'],
        ['钱江','🌃'],['清河','🏮'],['南宋','🏯'],['河坊','🏮'],['白塔','🗼'],
        ['湖滨','🌅'],['湘湖','🌊'],['白马','🐎'],['乐园','🎢'],['星光','🌟'],
        ['极乐','🙏'],['东方','🏛️'],['观潮','🌊'],['良渚','🏺'],
        ['径山','🍵'],['双溪','🛶'],['梦想','💡'],['超山','🌸'],['塘栖','🌉'],
        ['艺尚','👗'],['临平','🏙️'],['金沙','💦'],['宝龙','🛍️'],['沿江','🚵'],
        ['龙门','🏯'],['富春','🏞️'],['桃源','🍑'],['黄公','🖼️'],['野生','🦌'],
        ['东梓','🛖'],['天目','🌲'],['大明','🏔️'],['青山','🌳'],['太湖','🌊'],
        ['白果','🌰'],['瑶琳','🕳️'],['芦茨','🏡'],['深澳','🏘️'],['合村','⛺'],
        ['千岛','🏝️'],['文渊','🏛️'],['大慈','🙏'],['灵栖','🕳️'],['新叶','🏘️'],
        ['新安','🌊'],['七里','🚤'],['万松','🌲'],['胡庆','🏥'],['邵逸夫','🏥'],
        ['市民','🏛️'],['杭大','🎓'],['植物园','🌺'],['宋城','🎭'],['博物馆','🏛️']
      ];
      function getEmoji(name) {
        for (var i = 0; i < EMOJI_MAP.length; i++) {
          if (name.indexOf(EMOJI_MAP[i][0]) >= 0) return EMOJI_MAP[i][1];
        }
        return '🏞️';
      }
      scenicHtml = '<div class="di-scenic">' +
        '<div class="di-section-title">📍 特色景点</div>' +
        '<div class="di-scenic-grid">' +
        info.scenic.map(function(s) {
          var imgHtml = s.image
            ? '<img class="di-scenic-img" src="' + s.image + '" alt="' + s.name + '" loading="lazy">'
            : '<div class="di-scenic-img di-scenic-img--placeholder">' + getEmoji(s.name) + '</div>';
          // 景点卡片可点击：弹出详情 modal
          var clickAttr = ' onclick="window._ihzOpenDistrictScenic && window._ihzOpenDistrictScenic(\'' + s.name.replace(/'/g, "\\'") + '\',\'' + s.desc.replace(/'/g, "\\'") + '\')"';
          return '<div class="di-scenic-item"' + clickAttr + '>' +
            imgHtml +
            '<div class="di-scenic-name">' + s.name + '</div>' +
            '<div class="di-scenic-desc">' + s.desc + '</div>' +
          '</div>';
        }).join('') +
        '</div></div>';
    }

    var landmarksHtml = '';
    if (info.landmarks && info.landmarks.length) {
      landmarksHtml = '<div class="di-landmarks">' +
        '<div class="di-section-title">🏛️ 地标</div>' +
        '<div class="di-landmark-list">' +
        info.landmarks.map(function(l) {
          return '<span class="di-landmark" onclick="window._ihzOpenDistrictLandmark && window._ihzOpenDistrictLandmark(\'' + l.replace(/'/g, "\\'") + '\')">' + l + '</span>';
        }).join('') +
        '</div></div>';
    }

    var highlightsHtml = '';
    if (info.highlights && info.highlights.length) {
      highlightsHtml = '<div class="di-highlights">' +
        info.highlights.map(function(h) {
          return '<span class="di-highlight">' + h + '</span>';
        }).join('') +
        '</div>';
    }

    var govHtml = info.govUrl ?
      '<a class="di-gov-link" href="' + info.govUrl + '" target="_blank" rel="noopener noreferrer">🏛️ ' + d.full + '政务网 →</a>' : '';

    box.innerHTML =
      '<div class="district-info-card">' +
        '<div class="di-header">' +
          '<div class="di-title">' + d.full + '</div>' +
          '<div class="di-tag">' + info.tag + '</div>' +
        '</div>' +
        '<div class="di-desc">' + info.desc + '</div>' +
        highlightsHtml +
        scenicHtml +
        landmarksHtml +
        '<div class="di-features">' + info.features + '</div>' +
        govHtml +
        '<a class="di-more" href="district.html?id=' + curId + '">查看 ' + d.full + ' 详情 →</a>' +
      '</div>';
  }

  // 区县景点点击弹窗：使用页面已有的 modal 组件
  window._ihzOpenDistrictScenic = function (name, desc) {
    var modal = document.getElementById('modalOverlay');
    var mTitle = document.getElementById('modalTitle');
    var mBody = document.getElementById('modalBody');
    if (!modal || !mTitle || !mBody) return;
    mTitle.textContent = '📍 ' + name;
    mBody.innerHTML =
      '<div style="background:var(--bg-alt);border-left:3px solid var(--primary);padding:12px 16px;border-radius:8px;margin-bottom:16px;font-size:14px;color:var(--text-secondary);line-height:1.8;">' + desc + '</div>' +
      '<a class="di-gov-link" style="display:block;text-align:center;margin-bottom:10px;" href="https://uri.amap.com/search?keyword=' + encodeURIComponent('杭州' + name) + '&city=330100" target="_blank" rel="noopener">🧭 高德地图导航</a>' +
      '<a class="di-gov-link" style="display:block;text-align:center;margin-bottom:10px;background:var(--bg-alt);color:var(--text);border:1px solid var(--border);" href="https://www.baidu.com/s?wd=' + encodeURIComponent('杭州' + name + ' 游玩攻略') + '" target="_blank" rel="noopener">🔍 百度搜索攻略</a>' +
      '<a class="di-gov-link" style="display:block;text-align:center;" href="travel.html" target="_blank" rel="noopener">🗺️ 查看更多杭州景点</a>';
    modal.classList.add('active');
  };

  // 区县地标点击弹窗（与景点一致，使用 .active 弹窗）
  window._ihzOpenDistrictLandmark = function (name) {
    var modal = document.getElementById('modalOverlay');
    var mTitle = document.getElementById('modalTitle');
    var mBody = document.getElementById('modalBody');
    if (!modal || !mTitle || !mBody) return;
    mTitle.textContent = '🏛️ ' + name;
    mBody.innerHTML =
      '<a class="di-gov-link" style="display:block;text-align:center;margin-bottom:10px;" href="https://uri.amap.com/search?keyword=' + encodeURIComponent('杭州' + name) + '&city=330100" target="_blank" rel="noopener">🧭 高德地图导航</a>' +
      '<a class="di-gov-link" style="display:block;text-align:center;background:var(--bg-alt);color:var(--text);border:1px solid var(--border);" href="https://www.baidu.com/s?wd=' + encodeURIComponent('杭州' + name + ' 介绍') + '" target="_blank" rel="noopener">🔍 百度搜索介绍</a>';
    modal.classList.add('active');
  };

  function bindCityDropdown() {
    var btn = document.getElementById('citySwitcherBtn') || document.getElementById('citySelect');
    var box = document.getElementById('cityDropdown');
    if (!btn || !box) return;
    // 点击按钮展开/收起
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      box.classList.toggle('show');
    });
    // 点击外部关闭（document 级委托，不需要每个元素单独绑定）
    if (!box._docClickBound) {
      box._docClickBound = true;
      document.addEventListener('click', function(e) {
        var b = document.getElementById('citySwitcherBtn') || document.getElementById('citySelect');
        var bx = document.getElementById('cityDropdown');
        if (!b || !bx) return;
        if (!b.contains(e.target) && !bx.contains(e.target)) {
          bx.classList.remove('show');
        }
      });
      // ESC 键关闭
      document.addEventListener('keydown', function(e) {
        var bx = document.getElementById('cityDropdown');
        if (e.key === 'Escape' && bx) bx.classList.remove('show');
      });
    }
  }

  // ===== 大字模式 =====
  function toggleElderlyMode() {
    var cur = lsGet('ihz_elderly', 'false') === 'true';
    lsSet('ihz_elderly', cur ? 'false' : 'true');
    applyElderlyMode();
    showToast(cur ? '已关闭大字模式' : '已开启大字模式');
  }
  window.toggleElderlyMode = toggleElderlyMode;

  function applyElderlyMode() {
    var on = lsGet('ihz_elderly', 'false') === 'true';
    document.documentElement.setAttribute('data-elderly', on ? 'true' : 'false');
    var btn = document.getElementById('elderlyBtn');
    if (btn) {
      if (on) { btn.classList.add('active'); btn.title = '关闭大字模式'; }
      else { btn.classList.remove('active'); btn.title = '大字模式'; }
    }
    var st = document.getElementById('elderlyStatus');
    if (st) st.textContent = on ? '已开启' : '关闭';
    // 同步设置面板开关
    var elTog = document.getElementById('elderlyToggle');
    if (elTog) elTog.checked = on;
    // 大字模式自动切到大号字体
    if (on) { lsSet('ihz_fontsize', 'xlarge'); setFontSize('xlarge'); }
  }

  // ===== 设置面板 =====
  window.toggleSettings = function () {
    var overlay = document.getElementById('settingsOverlay');
    var panel = document.getElementById('settingsPanel');
    if (!overlay || !panel) return;
    var show = !panel.classList.contains('show');
    if (show) {
      overlay.classList.add('show');
      panel.classList.add('show');
      // 同步当前状态到开关
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

  window.setDarkMode = function (on) {
    var theme = on ? 'dark' : 'light';
    lsSet('ihz-theme', theme);
    applyTheme(theme);
  };

  // ESC 关闭设置面板（与 modal 的 ESC 行为一致；只绑一次）
  if (!window._izSettingsEscBound) {
    window._izSettingsEscBound = true;
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

  window.setElderlyMode = function (on) {
    lsSet('ihz_elderly', on ? 'true' : 'false');
    applyElderlyMode();
    showToast(on ? '已开启老人模式' : '已关闭老人模式');
  };

// ===== 初始化 =====
function init() {
  // 独立栏目页（cat.html）不需要 app.js 的完整初始化（会篡改置顶栏目/服务列表）
  if (window.IZ_SKIP_APP_INIT) {
    applyTheme(state.theme);
    applyFontSize();
    applyElderlyMode();
    return;
  }
  applyTheme(state.theme);
  applyFontSize();
  applyElderlyMode();
  initCityDropdown();
  bindCityDropdown();
  // URL hash 支持：从其他页面底部导航点击"我的"跳转时自动切换到 #pageMe
  if (location.hash === '#me') { state.currentPage = 'me'; }
  renderTodayHangzhou();
  renderDistrictInfo();
  renderNewsBanner();
  renderHotServices();
  renderHotKeywords();
  // 首页不再默认渲染 tabs 和 serviceGrid，搜索时才显示结果区
  bindEvents();
  aiLoadHistory();
  bindAIEvents();
  updateMeCounters();
    var now = new Date();
    var dateEl = $('#heroDate');
    if (dateEl) {
      var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      dateEl.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + days[now.getDay()];
    }
    // 更新统计：办事条目含全部可搜索服务（不止首页 8 个 tab），强调"搜索为主"
    var catList = DATA.categories || [];
    var totalItems = catList.length ? catList.reduce(function (sum, c) { return sum + c.items.length; }, 0) : (DATA.categoriesTotal || 0);
    var statEl = $('#heroStats');
    if (statEl) {
      statEl.innerHTML =
        '<div class="hero-stat"><div class="num">' + totalItems + '</div><div class="label">可搜服务</div></div>' +
        '<div class="hero-stat"><div class="num">' + (DATA.phonebook ? DATA.phonebook.length : 0) + '</div><div class="label">常用电话</div></div>' +
        '<div class="hero-stat"><div class="num">13</div><div class="label">区县市</div></div>' +
        '<div class="hero-stat"><div class="num">2700+</div><div class="label">本地文章</div></div>';
    }
    // 异步从 CMS 拉取最新内容（失败时静默使用兜底数据）
    loadCMSData();
    // 页面从后台切回前台时自动刷新 CMS 数据
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) loadCMSData();
    });
    // 初始化页面显示状态：隐藏非当前页，确保页面刷新后状态一致
    switchPage(state.currentPage);
  }

  // ===== CMS 数据异步加载（覆盖兜底）=====
  function hasDiff(a, b) {
    try {
      var keys = ['hotKeywords', 'hotServices', 'categories', 'channels', 'phonebook'];
      for (var i = 0; i < keys.length; i++) {
        if (JSON.stringify(a[keys[i]]) !== JSON.stringify(b[keys[i]])) return true;
      }
      return false;
    } catch (e) { return true; }
  }

  function rerenderDynamic() {
    try {
      renderHotServices();
      renderHotKeywords();
      // CMS 数据更新后，同步刷新首页 tabs 和服务网格（让用户立即看到后台改动）
      renderTabs();
      renderServices(state.activeTab);
      // 更新统计：办事条目含全部可搜索服务（不止首页 8 个 tab），强调"搜索为主"
      var catList = DATA.categories || [];
      var totalItems = catList.length ? catList.reduce(function (sum, c) { return sum + c.items.length; }, 0) : (DATA.categoriesTotal || 0);
      var statEl = $('#heroStats');
      if (statEl) {
        statEl.innerHTML =
          '<div class="hero-stat"><div class="num">' + totalItems + '</div><div class="label">可搜服务</div></div>' +
          '<div class="hero-stat"><div class="num">' + (DATA.phonebook ? DATA.phonebook.length : 0) + '</div><div class="label">常用电话</div></div>' +
          '<div class="hero-stat"><div class="num">13</div><div class="label">区县市</div></div>' +
          '<div class="hero-stat"><div class="num">2700+</div><div class="label">本地文章</div></div>';
      }
    } catch (e) { console.warn('rerenderDynamic failed:', e); }
  }

  function loadCMSData() {
    fetch('/api/content').then(function (r) { return r.json(); }).then(function (res) {
      if (res && res.success && res.data && hasDiff(DATA, res.data)) {
        DATA = res.data;
        rerenderDynamic();
        console.log('[CMS] 数据已更新:', new Date().toLocaleTimeString(), '物品总数:', DATA.categories.reduce(function(s,c){return s+c.items.length;},0));
      }
    }).catch(function () { /* 静默失败，继续使用兜底数据 */ });
  }

  // ============================================
  // 每日签到 + 积分
  // ============================================
  function getCheckinData() {
    return lsGet('ihz_checkin', { last: 0, total: 0, points: 0, streak: 0, history: [] });
  }

  function isSameDay(t1, t2) {
    var d1 = new Date(t1), d2 = new Date(t2);
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }

  function isYesterday(t1, t2) {
    var d1 = new Date(t1); d1.setHours(0,0,0,0);
    var d2 = new Date(t2); d2.setHours(0,0,0,0);
    var diff = (d2 - d1) / 86400000;
    return diff === 1;
  }

  function doCheckin() {
    var data = getCheckinData();
    var now = Date.now();
    if (isSameDay(data.last, now)) {
      showToast('今日已签到，明天再来吧！');
      return;
    }
    // 连续签到
    var streak = isYesterday(data.last, now) ? data.streak + 1 : 1;
    // 积分奖励：基础 5 + 连续加成
    var reward = 5 + Math.min(streak - 1, 6); // 最多 +6
    data.last = now;
    data.streak = streak;
    data.total += 1;
    data.points += reward;
    data.history.unshift({ ts: now, reward: reward, streak: streak });
    if (data.history.length > 30) data.history = data.history.slice(0, 30);
    lsSet('ihz_checkin', data);
    showToast('✅ 签到成功！获得 ' + reward + ' 积分，已连续签到 ' + streak + ' 天');
    // 重新渲染签到弹窗
    showCheckin();
  }

  function showCheckin() {
    var data = getCheckinData();
    var now = Date.now();
    var checkedToday = isSameDay(data.last, now);
    var body = '<div style="padding:16px;text-align:center;">';
    // 积分卡
    body += '<div style="background:linear-gradient(135deg, var(--primary), var(--primary-dark));color:#fff;padding:20px;border-radius:14px;margin-bottom:14px;">' +
      '<div style="font-size:12px;opacity:0.9;margin-bottom:4px;">我的积分</div>' +
      '<div style="font-size:36px;font-weight:700;line-height:1;">' + data.points + '</div>' +
      '<div style="font-size:12px;opacity:0.9;margin-top:6px;">累计签到 ' + data.total + ' 天 · 连续 ' + data.streak + ' 天</div>' +
      '</div>';
    // 签到按钮
    body += '<button onclick="window._doCheckin()" style="width:100%;padding:14px;background:' + (checkedToday ? 'var(--bg-alt)' : 'var(--primary)') + ';color:' + (checkedToday ? 'var(--text-muted)' : '#fff') + ';border:none;border-radius:24px;font-size:15px;font-weight:500;cursor:' + (checkedToday ? 'default' : 'pointer') + ';" ' + (checkedToday ? 'disabled' : '') + '>' +
      (checkedToday ? '✅ 今日已签到' : '📅 立即签到（+' + (5 + Math.min(data.streak, 6)) + ' 积分）') +
      '</button>';
    // 规则
    body += '<div style="margin-top:14px;padding:12px;background:var(--bg);border-radius:10px;text-align:left;">' +
      '<div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text);">📊 积分规则</div>' +
      '<div style="font-size:12px;color:var(--text-secondary);line-height:1.8;">' +
      '• 每日签到基础 5 积分<br>' +
      '• 连续签到第 N 天加 N 积分（最多 +6）<br>' +
      '• 第 1 天：5 积分<br>' +
      '• 第 7 天：11 积分<br>' +
      '• 断签清零，重新计算<br>' +
      '• 积分未来可兑换 iHangzhou 周边福利' +
      '</div></div>';
    // 最近记录
    if (data.history.length) {
      body += '<div style="margin-top:14px;">' +
        '<div style="font-size:13px;font-weight:600;margin-bottom:8px;color:var(--text);">📜 最近签到</div>';
      data.history.slice(0, 5).forEach(function (h) {
        body += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px;">' +
          '<span style="color:var(--text-secondary);">' + fmtTime(h.ts) + '</span>' +
          '<span style="color:var(--primary);font-weight:500;">+' + h.reward + ' 积分（连续 ' + h.streak + ' 天）</span>' +
          '</div>';
      });
      body += '</div>';
    }
    body += '</div>';
    openModal('📅 每日签到', body);
  }

  // ============================================
  // 收藏夹 / 浏览历史 / 反馈 / 字号
  // ============================================
  function lsGet(key, def) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch (e) { return def; }
  }
  function lsSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  function getFavs() { return lsGet('ihz_favs', []); }
  function getHistory() { return lsGet('ihz_hist', []); }

  function isFav(name) {
    return getFavs().some(function (f) { return f.name === name; });
  }

  function toggleFav(name, desc, cat, action, url, detail) {
    var favs = getFavs();
    var idx = favs.findIndex(function (f) { return f.name === name; });
    if (idx >= 0) {
      favs.splice(idx, 1);
    } else {
      favs.unshift({ name: name, desc: desc || '', cat: cat || '', action: action || '', url: url || '', detail: detail || '', ts: Date.now() });
      if (favs.length > 50) favs.length = 50;
    }
    lsSet('ihz_favs', favs);
    updateMeCounters();
    showToast(idx >= 0 ? '已取消收藏' : '⭐ 已收藏');
  }

  function addHistory(name, desc, cat, action, url, detail) {
    var hist = getHistory();
    // 去重
    hist = hist.filter(function (h) { return h.name !== name; });
    hist.unshift({ name: name, desc: desc || '', cat: cat || '', action: action || '', url: url || '', detail: detail || '', ts: Date.now() });
    if (hist.length > 30) hist = hist.slice(0, 30);
    lsSet('ihz_hist', hist);
    updateMeCounters();
  }

  function updateMeCounters() {
    var fc = $('#favCount'); if (fc) fc.textContent = '(' + getFavs().length + ')';
    var hc = $('#histCount'); if (hc) hc.textContent = '(' + getHistory().length + ')';
  }

  function fmtTime(ts) {
    var d = new Date(ts);
    var now = new Date();
    var diff = (now - d) / 1000;
    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + ' 分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + ' 小时前';
    if (diff < 604800) return Math.floor(diff / 86400) + ' 天前';
    return (d.getMonth() + 1) + '月' + d.getDate() + '日';
  }

  function renderItemModal(item, opts) {
    opts = opts || {};
    var name = item.name;
    var desc = item.desc || '';
    var cat = item.cat || '';
    var action = item.action || '';
    var url = item.url || '';
    var detail = item.detail || '';
    var fav = isFav(name);

    // 加入浏览历史
    addHistory(name, desc, cat, action, url, detail);

    var body = '<div style="padding:16px;line-height:1.8;font-size:14px;">';
    if (detail) {
      body += detail;
    } else {
      body += '<p style="color:var(--text-secondary);">' + desc + '</p>';
    }
    body += '</div>';
    // 仅"办事攻略"分类显示政务入口；其他分类（名人/旅游/美食等）不显示
    if (cat && cat.indexOf('办事') >= 0) {
      body += '<div style="margin-top:16px;padding:12px;background:var(--bg);border-radius:10px;">' +
        '<div style="font-size:13px;font-weight:600;margin-bottom:10px;color:var(--text);">🏛️ 官方办理入口</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
        '<a href="https://search.zj.gov.cn/api-gateway/jpaas-jsearch-web-server/search?serviceId=YcTOd1ftgC5dxzJ8RhCBN&websiteid=330000000000000&cateid=ShhDNU0SGB3DPrgh3GxyA&p=1&q=%E6%B5%99%E9%87%8C%E5%8A%9E" rel="noopener" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">浙里办<br><span style="font-size:11px;color:var(--text-muted);">Web</span></a>' +
        '<a href="https://app.gjzwfw.gov.cn/zhejiang-app/" rel="noopener" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">支付宝<br><span style="font-size:11px;color:var(--text-muted);">小程序</span></a>' +
        '<a href="tel:12345" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">12345<br><span style="font-size:11px;color:var(--text-muted);">市长热线</span></a>' +
        '<a href="https://www.hangzhou.gov.cn/" rel="noopener" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">杭州政务<br><span style="font-size:11px;color:var(--text-muted);">官网</span></a>' +
        '</div></div>';
    }

    // 相关推荐
    if (cat) {
      var related = [];
      (DATA.categories || []).forEach(function (c) {
        if (c.name === cat) {
          c.items.forEach(function (it) {
            if (it.name !== name && related.length < 4) related.push(it);
          });
        }
      });
      if (related.length) {
        body += '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:10px;">' +
          '<div style="font-size:13px;font-weight:600;margin-bottom:10px;color:var(--text);">🔗 相关推荐</div>';
        related.forEach(function (r) {
          var rSafe = r.url && r.url.indexOf('http://') === 0 ? 'https://' + r.url.substring(7) : r.url;
          body += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">' +
            '<span style="font-size:13px;">' + r.name + '</span>' +
            (r.url ? '<a href="' + rSafe + '" rel="noopener" style="color:var(--primary);font-size:12px;text-decoration:none;">前往 →</a>' : '<span style="font-size:12px;color:var(--text-muted);">详情</span>') +
            '</div>';
        });
        body += '</div>';
      }
    }

    // 收藏按钮 + 前往链接
    body += '<div style="margin-top:16px;display:flex;gap:10px;">' +
      '<button onclick="window._toggleFav(\'' + name.replace(/'/g, "\\'") + '\',\'' + (desc || '').replace(/'/g, "\\'") + '\',\'' + (cat || '').replace(/'/g, "\\'") + '\',\'' + (action || '') + '\',\'' + (url || '') + '\')" style="flex:1;padding:12px 16px;background:' + (fav ? 'var(--accent)' : 'var(--primary)') + ';color:#fff;border:none;border-radius:24px;font-size:14px;cursor:pointer;">' +
      (fav ? '⭐ 已收藏' : '⭐ 收藏') +
      '</button>' +
      (url ? '<a href="' + (url.indexOf('http://') === 0 ? 'https://' + url.substring(7) : url) + '" rel="noopener" style="flex:1;padding:12px 16px;background:var(--bg-alt);color:var(--text);border:none;border-radius:24px;font-size:14px;text-decoration:none;text-align:center;">前往 →</a>' : '') +
      '</div>';

    openModal('📌 ' + escapeHtml(name) + (cat ? ' <span style="font-size:12px;color:var(--text-muted);">[' + escapeHtml(cat) + ']</span>' : ''), body, { showFav: false });
  }

  function showFavorites() {
    var favs = getFavs();
    var body = '<div style="padding:14px;">';
    if (favs.length === 0) {
      body += '<div style="text-align:center;padding:40px 0;color:var(--text-muted);">' +
        '<div style="font-size:48px;">⭐</div>' +
        '<p style="margin-top:12px;">还没有收藏任何服务</p>' +
        '<p style="font-size:12px;margin-top:6px;">浏览服务时点击「⭐ 收藏」即可加入</p>' +
        '</div>';
    } else {
      body += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<span style="font-size:13px;color:var(--text-secondary);">共 ' + favs.length + ' 条收藏</span>' +
        '<button onclick="window._clearFavs()" style="padding:6px 12px;background:var(--bg);border:1px solid var(--border);border-radius:14px;font-size:12px;color:var(--text-secondary);cursor:pointer;">清空</button>' +
        '</div>';
      favs.forEach(function (f) {
        body += '<div class="fav-item" onclick="window._openFavItem(\'' + f.name.replace(/'/g, "\\'") + '\')" style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;cursor:pointer;">' +
          '<div style="flex:1;min-width:0;">' +
          '<div style="font-size:14px;font-weight:500;">' + f.name + '</div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">' + (f.cat ? '[' + f.cat + '] ' : '') + fmtTime(f.ts) + '</div>' +
          '</div>' +
          '<span style="color:var(--text-muted);font-size:18px;">›</span>' +
          '</div>';
      });
    }
    body += '</div>';
    openModal('⭐ 我的收藏', body);
  }

  function showHistory() {
    var hist = getHistory();
    var body = '<div style="padding:14px;">';
    if (hist.length === 0) {
      body += '<div style="text-align:center;padding:40px 0;color:var(--text-muted);">' +
        '<div style="font-size:48px;">📜</div>' +
        '<p style="margin-top:12px;">还没有浏览记录</p>' +
        '</div>';
    } else {
      body += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
        '<span style="font-size:13px;color:var(--text-secondary);">最近浏览 ' + hist.length + ' 条</span>' +
        '<button onclick="window._clearHist()" style="padding:6px 12px;background:var(--bg);border:1px solid var(--border);border-radius:14px;font-size:12px;color:var(--text-secondary);cursor:pointer;">清空</button>' +
        '</div>';
      hist.forEach(function (h) {
        body += '<div class="hist-item" onclick="window._openHistItem(\'' + h.name.replace(/'/g, "\\'") + '\')" style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;cursor:pointer;">' +
          '<div style="flex:1;min-width:0;">' +
          '<div style="font-size:14px;font-weight:500;">' + h.name + '</div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">' + (h.cat ? '[' + h.cat + '] ' : '') + fmtTime(h.ts) + '</div>' +
          '</div>' +
          '<span style="color:var(--text-muted);font-size:18px;">›</span>' +
          '</div>';
      });
    }
    body += '</div>';
    openModal('📜 浏览历史', body);
  }

  function openItemByName(name) {
    var found = null;
    (DATA.categories || []).forEach(function (c) {
      c.items.forEach(function (it) {
        if (it.name === name) {
          found = { item: it, cat: c.name };
        }
      });
    });
    if (found) {
      var it = found.item;
      if (it.url) {
        openUrl(it.url);
      } else if (it.action) {
          handleAction(it.action);
        } else {
          renderItemModal({
            name: it.name, desc: it.desc, cat: found.cat, action: it.action, url: it.url, detail: it.detail
          });
        }
    } else {
      showToast('未找到该项');
    }
  }

  // showFeedback / submitFeedback 完全由 analytics.js 提供（加载顺序在 app.js 之后）

  function showFontSize() {
    var cur = lsGet('ihz_fontsize', 'normal');
    var body = '<div style="padding:14px;">' +
      '<p style="color:var(--text-secondary);font-size:13px;line-height:1.8;margin-bottom:12px;">选择适合你的字体大小，设置后立即生效，下次访问也会记住。</p>';
    var sizes = [
      { v: 'small', label: '小号', sample: '14px' },
      { v: 'normal', label: '标准', sample: '16px' },
      { v: 'large', label: '大号', sample: '18px' },
      { v: 'xlarge', label: '超大号', sample: '20px' }
    ];
    sizes.forEach(function (s) {
      body += '<div onclick="window._setFontSize(\'' + s.v + '\')" style="display:flex;justify-content:space-between;align-items:center;padding:14px;background:var(--bg);border-radius:10px;margin-bottom:8px;cursor:pointer;' + (cur === s.v ? 'border:2px solid var(--primary);' : '') + '">' +
        '<div>' +
          '<div style="font-size:' + s.sample + ';">' + s.label + '</div>' +
          '<div style="font-size:11px;color:var(--text-muted);margin-top:2px;">' + s.sample + '</div>' +
        '</div>' +
        (cur === s.v ? '<span style="color:var(--primary);">✓</span>' : '') +
        '</div>';
    });
    body += '</div>';
    openModal('📏 字体大小', body);
  }

  function setFontSize(size) {
    lsSet('ihz_fontsize', size);
    var root = document.documentElement;
    var map = { small: '14px', normal: '16px', large: '18px', xlarge: '20px' };
    root.style.fontSize = map[size] || '16px';
    showToast('已设置字号：' + ({ small: '小号', normal: '标准', large: '大号', xlarge: '超大号' })[size]);
    closeModal();
  }

  function applyFontSize() {
    var size = lsGet('ihz_fontsize', 'normal');
    var map = { small: '14px', normal: '16px', large: '18px', xlarge: '20px' };
    document.documentElement.style.fontSize = map[size] || '16px';
  }

  function clearFavs() {
    if (!confirm('确定清空所有收藏？此操作不可恢复。')) return;
    lsSet('ihz_favs', []);
    updateMeCounters();
    closeModal();
    showToast('已清空收藏');
  }

  function clearHist() {
    if (!confirm('确定清空所有浏览历史？')) return;
    lsSet('ihz_hist', []);
    updateMeCounters();
    closeModal();
    showToast('已清空浏览历史');
  }

  // ============================================
  // AI 杭州助手
  // ============================================
  var aiState = {
    open: false,
    sending: false,
    history: [],          // [{role, content}]
    abortCtrl: null
  };

  // 恢复历史（localStorage）
  function aiLoadHistory() {
    try {
      var saved = localStorage.getItem('ihz_ai_history');
      if (saved) aiState.history = JSON.parse(saved).slice(-16) || [];
    } catch (e) { aiState.history = []; }
  }
  function aiSaveHistory() {
    try {
      localStorage.setItem('ihz_ai_history', JSON.stringify(aiState.history.slice(-16)));
    } catch (e) {}
  }

  // 转义 HTML，防 XSS
  function aiEscape(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 简易 Markdown 渲染（**粗体**、\n、`code`、- 列表）
  function aiRender(s) {
    var html = aiEscape(s);
    // 代码块
    html = html.replace(/```([\s\S]*?)```/g, function (_, c) {
      return '<pre><code>' + c.replace(/^\n/, '') + '</code></pre>';
    });
    // 行内代码
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    // 粗体
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // 标题
    html = html.replace(/^### (.+)$/gm, '<p style="font-weight:600;margin-top:6px;">$1</p>');
    // 无序列表
    html = html.replace(/(^|\n)([-•][\s\S]*?)(?=\n[-•]|\n\n|$)/g, function (m, pre, list) {
      var items = list.split(/\n[-•]/).map(function (t) {
        return '<li>' + t.replace(/^[-•]\s*/, '').trim() + '</li>';
      }).join('');
      return pre + '<ul style="margin:4px 0 8px 18px;">' + items + '</ul>';
    });
    // 段落
    html = html.split(/\n{2,}/).map(function (p) {
      p = p.trim();
      if (!p) return '';
      if (/^<(ul|pre|p)/.test(p)) return p;
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    }).join('');
    return html;
  }

  // 渲染消息列表
  function aiRenderMessages() {
    var box = $('#aiMessages');
    if (!box) return;
    var html = '';
    if (aiState.history.length === 0) {
      html =
        '<div class="ai-msg assistant">' +
          '<div class="ai-msg-avatar">🏔️</div>' +
          '<div class="ai-msg-bubble">' +
            '<p>你好！我是 <strong>iHangzhou 杭州助手</strong> 🏔️</p>' +
            '<p>问我任何杭州生活问题，比如：</p>' +
            '<p>• 社保怎么查 / 公积金怎么提<br>• 今天限行吗 / 地铁末班车几点<br>• 西湖一日游 / 灵隐寺怎么去<br>• 杭州医保门诊怎么报销</p>' +
            '<p style="margin-top:6px;color:var(--text-muted);font-size:12px;">由通义千问驱动，回答仅供参考。</p>' +
          '</div>' +
        '</div>';
    } else {
      aiState.history.forEach(function (msg) {
        var isUser = msg.role === 'user';
        html +=
          '<div class="ai-msg ' + (isUser ? 'user' : 'assistant') + '">' +
            '<div class="ai-msg-avatar">' + (isUser ? '🧑' : '🏔️') + '</div>' +
            '<div class="ai-msg-bubble">' + (isUser ? aiEscape(msg.content).replace(/\n/g, '<br>') : aiRender(msg.content)) + '</div>' +
          '</div>';
      });
    }
    box.innerHTML = html;
    // 滚到底
    box.scrollTop = box.scrollHeight;
  }

  // 追加一条「正在思考」占位
  function aiAppendThinking() {
    var box = $('#aiMessages');
    if (!box) return;
    var div = document.createElement('div');
    div.className = 'ai-msg assistant thinking-placeholder';
    div.id = 'aiThinking';
    div.innerHTML =
      '<div class="ai-msg-avatar">🏔️</div>' +
      '<div class="ai-msg-bubble"><span class="ai-typing"><span></span><span></span><span></span></span></div>';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }
  function aiRemoveThinking() {
    var t = $('#aiThinking');
    if (t) t.remove();
  }

  // 流式追加助手消息
  function aiAppendStream() {
    var box = $('#aiMessages');
    if (!box) return null;
    var div = document.createElement('div');
    div.className = 'ai-msg assistant streaming';
    div.innerHTML =
      '<div class="ai-msg-avatar">🏔️</div>' +
      '<div class="ai-msg-bubble" id="aiStreamBubble"></div>';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div.querySelector('.ai-msg-bubble');
  }

  // 切换浮窗
  function toggleAIChat() {
    var chat = $('#aiChat');
    var fab = $('#aiFab');
    if (!chat) return;
    aiState.open = !aiState.open;
    if (aiState.open) {
      chat.classList.add('active');
      if (fab) fab.classList.add('hidden');
      aiRenderMessages();
      // 自动 focus 输入框（移动端可能弹键盘，延后）
      setTimeout(function () {
        var inp = $('#aiInput');
        if (inp) inp.focus();
      }, 250);
    } else {
      chat.classList.remove('active');
      if (fab) fab.classList.remove('hidden');
    }
  }
  function closeAIChat() {
    aiState.open = false;
    var chat = $('#aiChat');
    var fab = $('#aiFab');
    if (chat) chat.classList.remove('active');
    if (fab) fab.classList.remove('hidden');
  }
  function clearAIChat() {
    if (!confirm('清空对话历史？')) return;
    aiState.history = [];
    aiSaveHistory();
    aiRenderMessages();
  }

  // 发送消息（流式）
  async function sendAIMessage(text) {
    text = (text || '').trim();
    if (!text || aiState.sending) return;
    var input = $('#aiInput');
    if (input) input.value = '';
    aiAutoGrow();  // 重置高度

    // 加入用户消息
    aiState.history.push({ role: 'user', content: text });
    aiSaveHistory();
    aiRenderMessages();
    aiAppendThinking();

    aiState.sending = true;
    var sendBtn = $('#aiSendBtn');
    if (sendBtn) sendBtn.disabled = true;
    var status = $('#aiStatus');
    if (status) { status.classList.add('thinking'); status.textContent = '思考中…'; }

    var fullReply = '';
    var bubble = null;

    try {
      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: aiState.history.slice(0, -1)  // 不含当前刚发的这条
        })
      });

      if (!res.ok) {
        var errData = {};
        try { errData = await res.json(); } catch (e) {}
        throw new Error(errData.reply || ('HTTP ' + res.status));
      }

      // 处理 SSE 流
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });

        var lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (!line || !line.startsWith('data:')) continue;
          var dataStr = line.slice(5).trim();
          if (dataStr === '[DONE]') continue;
          try {
            var obj = JSON.parse(dataStr);
            if (obj.content) {
              if (!bubble) {
                aiRemoveThinking();
                bubble = aiAppendStream();
              }
              fullReply += obj.content;
              bubble.innerHTML = aiRender(fullReply);
              var box = $('#aiMessages');
              if (box) box.scrollTop = box.scrollHeight;
            } else if (obj.reply) {
              // 服务端降级为整段回复
              if (!bubble) {
                aiRemoveThinking();
                bubble = aiAppendStream();
              }
              fullReply = obj.reply;
              bubble.innerHTML = aiRender(fullReply);
            } else if (obj.error) {
              throw new Error(obj.reply || obj.error);
            }
          } catch (e) {
            // 解析分片错误，忽略
          }
        }
      }
      if (!fullReply) {
        throw new Error('回复为空，请重试');
      }
      aiState.history.push({ role: 'assistant', content: fullReply });
      aiSaveHistory();
    } catch (err) {
      aiRemoveThinking();
      var box = $('#aiMessages');
      if (box) {
        var errDiv = document.createElement('div');
        errDiv.className = 'ai-msg assistant error';
        errDiv.innerHTML =
          '<div class="ai-msg-avatar">⚠️</div>' +
          '<div class="ai-msg-bubble">' + aiEscape(err.message || '出错了') + '</div>';
        box.appendChild(errDiv);
        box.scrollTop = box.scrollHeight;
      }
    } finally {
      aiState.sending = false;
      if (sendBtn) sendBtn.disabled = false;
      if (status) { status.classList.remove('thinking'); status.textContent = '在线 · 杭州万事通'; }
      var thinkEl = $('#aiThinking');
      if (thinkEl) thinkEl.remove();
    }
  }

  // 输入框自动增高
  function aiAutoGrow() {
    var inp = $('#aiInput');
    if (!inp) return;
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight, 100) + 'px';
  }

  // 绑定 AI 助手事件
  function bindAIEvents() {
    var sendBtn = $('#aiSendBtn');
    var input = $('#aiInput');
    var closeBtn = $('#aiCloseBtn');
    var clearBtn = $('#aiClearBtn');
    var quick = $('#aiQuickAsk');

    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        sendAIMessage(input ? input.value : '');
      });
    }
    if (input) {
      input.addEventListener('input', aiAutoGrow);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
          e.preventDefault();
          sendAIMessage(input.value);
        }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeAIChat);
    if (clearBtn) clearBtn.addEventListener('click', clearAIChat);
    if (quick) {
      quick.addEventListener('click', function (e) {
        var btn = e.target.closest('.ai-quick-btn');
        if (!btn) return;
        var q = btn.getAttribute('data-q');
        if (q) sendAIMessage(q);
      });
    }
  }

  // 暴露全局函数供 index.html / channel.html 调用
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.buildXianxingModal = buildXianxingModal;
  window.showLPR = showLPR;
  window.showTide = showTide;
  window.showGuide = showGuide;
  window.showForex = showForex;
  window.showMetro = showMetro;
  window.showWeather = showWeather;
  window.showSalaryCalc = showSalaryCalc;
  window.getServiceIcon = getServiceIcon;
  window._getData = function () { return DATA; };
  window._ensureCategories = ensureCategories;
  window._handleAction = handleAction;

  // 频道专题页（banshi/food/history/street 等设置 IZ_SKIP_APP_INIT 的页面）专用初始化：
  // 这些页面不执行完整 init()，bindEvents() 不会跑，导致两个问题：
  //   ① #serviceGrid 无点击委托，无 url 的 <div class="sitem"> 点击完全无反应；
  //   ② modal 打开后关闭按钮/遮罩/ESC 均无绑定，弹窗关不掉。
  // 页面初始化时显式调用本函数一次性补上。行为与 bindEvents() 内一致：
  // <a> 不拦截（原生跳转），<div> 走 handleClick（action/url/详情弹窗）。
  window.IZ_INIT_CHANNEL_PAGE = function () {
    // ① 服务网格点击委托
    var grid = document.getElementById('serviceGrid');
    if (grid && !grid._izBound) {
      grid._izBound = true;
      grid.addEventListener('click', function (e) {
        var item = e.target.closest('.sitem');
        if (!item) return;
        // 点击统计（与首页行为一致）
        var btnName = item.dataset.name || '';
        var btnCat = item.dataset.cat || '';
        if (!btnName) {
          var nmEl = item.querySelector('.sname');
          if (nmEl) btnName = nmEl.textContent.replace(/\s*\[.*?\]\s*$/, '').trim();
        }
        if (btnName && window.iHangzhouTrack) {
          window.iHangzhouTrack.click(btnCat || '频道', btnName, btnName, '');
        }
        // <a>标签由浏览器原生处理跳转，不拦截
        if (item.tagName === 'A') return;
        handleClick(item);
      });
    }
    // ② modal 关闭三途径（按钮 / 点遮罩 / ESC）
    var closeBtn = document.getElementById('modalClose');
    if (closeBtn && !closeBtn._izBound) {
      closeBtn._izBound = true;
      closeBtn.addEventListener('click', closeModal);
    }
    var overlay = document.getElementById('modalOverlay');
    if (overlay && !overlay._izBound) {
      overlay._izBound = true;
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
      });
    }
    if (!document._izEscBound) {
      document._izEscBound = true;
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
      });
    }
  };
  window.openUrl = openUrl;
  window.showGold = showGold;
  window.showYaohao = showYaohao;
  window.showYoujia = showYoujia;
  window.showSbCalc = showSbCalc;
  window.showHospital = showHospital;
  window.showTaxCalc = showTaxCalc;
  window.showCalendar = showCalendar;
  window.showLoanCalc = showLoanCalc;
  window.showCountdown = showCountdown;
  window.showBmi = showBmi;
  window.showPostcode = showPostcode;
  window.showIdCheck = showIdCheck;
  window.showDistrict = showDistrict;
  window.showPlateCheck = showPlateCheck;
  window.toggleAIChat = toggleAIChat;
  window.closeAIChat = closeAIChat;
  window.clearAIChat = clearAIChat;
  // ===== 首页观潮专题自动显示（国庆后一周 ≈ 10月8日结束） =====
  (function initTideFeature() {
    var el = document.getElementById('tideFeature');
    if (!el) return;
    var now = new Date();
    var m = now.getMonth() + 1; // 1-12
    var d = now.getDate();
    // 观潮季：8月15日 — 10月8日
    if (m < 8 || m > 10) return;
    if (m === 8 && d < 15) return;
    if (m === 10 && d > 8) return;
    el.style.display = '';
    // 填充今日潮汐信息
    try {
      var lunar = getLunar(now);
      var tide = calcTideTimes(lunar.day);
      var lunarMonths = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
      var lunarDays = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','二十九','三十'];
      var lunarStr = '农历' + lunarMonths[lunar.month - 1] + '月' + lunarDays[lunar.day - 1];
      var levelClass = tide.level.label === '大潮' ? 'big' : (tide.level.label === '中潮' ? 'mid' : 'small');
      var bar = document.getElementById('tideTodayBar');
      if (bar) {
        bar.innerHTML = '<span class="tide-lunar">' + lunarStr + '</span>' +
          '<span class="tide-level-tag ' + levelClass + '">' + tide.level.label + '</span>' +
          '<span>日潮 ' + fmtTime(tide.day) + '</span>' +
          '<span>夜潮 ' + fmtTime(tide.night) + '</span>';
      }
      // mini spots bar
      var spots = document.getElementById('tideSpotsMini');
      if (spots && typeof TIDE_POINTS !== 'undefined') {
        spots.innerHTML = TIDE_POINTS.map(function(p) {
          return '<span class="tsm-item" data-spot="' + p.name + '">' + p.name + '</span>';
        }).join('');
      }
      // tideFeature footer click -> showTide
      var footer = document.getElementById('tideFeatureFooter');
      if (footer) footer.onclick = function () { showTide(); };
    } catch (e) { /* 静默降级 */ }
  })();

  window.sendAIMessage = sendAIMessage;
  window.showFavorites = showFavorites;
  window.showHistory = showHistory;
  // showFeedback / submitFeedback 由 analytics.js 提供
  window.showFontSize = showFontSize;
  window._toggleFav = toggleFav;
  window._clearFavs = clearFavs;
  window._clearHist = clearHist;
  window._openFavItem = openItemByName;
  window._openHistItem = openItemByName;
  window._setFontSize = setFontSize;
  window.showCheckin = showCheckin;
  window._doCheckin = doCheckin;

  // bfcache 回退（浏览器前进/后退）时重新渲染首页区县卡片与实时信息，
  // 避免从 district.html 返回首页后 #districtInfo 仍显示旧区县内容
  window.addEventListener('pageshow', function (e) {
    if (e.persisted !== true) return;
    if (typeof renderDistrictInfo === 'function') renderDistrictInfo();
    if (typeof renderTodayHangzhou === 'function') renderTodayHangzhou();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
