/* 站点核心文件 FFFD 修复：emoji 槽位按语义还原 + 文字修复
 * 每条 [文件, find, replace]，find 含足够上下文保证唯一；全部命中才算数 */
const fs = require('fs');
const ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper';
const F = '\uFFFD', V = '\uFE0F';
const R = [
  // ── articles.html ──
  ['articles.html', `</span><span>${F} ' + Math.round`, `</span><span>📖 ' + Math.round`],
  // ── js/app.js ──
  ['js/app.js', `rel="noopener">${F}${V} 查看更多杭州景点`, `rel="noopener">🗺️ 查看更多杭州景点`],
  // ── chaguan.html ──
  ['chaguan.html', `window.IHZ_PAGE={title:'茶馆',icon:'${F}'}`, `window.IHZ_PAGE={title:'茶馆',icon:'🍵'}`],
  ['chaguan.html', `<div class="p-hero-icon">${F}</div><h2>加载中...`, `<div class="p-hero-icon">🍵</div><h2>加载中...`],
  ['chaguan.html', `if(ht)ht.textContent='${F} 茶馆';`, `if(ht)ht.textContent='🍵 茶馆';`],
  ['chaguan.html', `if(ht)ht.textContent='${F} '+data.name;`, `if(ht)ht.textContent='🍵 '+data.name;`],
  ['chaguan.html', `<h3>${F} 更多茶馆</h3>`, `<h3>🍵 更多茶馆</h3>`],
  // ── dessert.html ──
  ['dessert.html', `window.IHZ_PAGE={title:'甜品糕点',icon:'${F}'}`, `window.IHZ_PAGE={title:'甜品糕点',icon:'🍰'}`],
  ['dessert.html', `<div class="p-hero-icon">${F}</div><h2>未找到该甜品`, `<div class="p-hero-icon">🍰</div><h2>未找到该甜品`],
  ['dessert.html', `if(ht)ht.textContent='${F} '+data.name;`, `if(ht)ht.textContent='🍰 '+data.name;`],
  ['dessert.html', `<span class="p-ik">${F}${V}</span>`, `<span class="p-ik">🍽️</span>`],
  // ── night-market.html ──
  ['night-market.html', `<div class="p-hero-icon">${F}</div><h2>未找到`, `<div class="p-hero-icon">🌃</div><h2>未找到`],
  ['night-market.html', `<span class="gk">${F}</span><span class="gv">'+data.time`, `<span class="gk">🕐</span><span class="gv">'+data.time`],
  // ── route.html ──
  ['route.html', `window.IHZ_PAGE={title:'路线攻略',icon:'${F}${V}'}`, `window.IHZ_PAGE={title:'路线攻略',icon:'🗺️'}`],
  ['route.html', `<div class="p-hero-icon">${F}</div><h2>加载中...`, `<div class="p-hero-icon">🗺️</div><h2>加载中...`],
  ['route.html', `<div class="p-hero-icon">${F}${V}</div><h2>未找到该路线`, `<div class="p-hero-icon">🗺️</div><h2>未找到该路线`],
  ['route.html', `<h3>${F} 贴士</h3>`, `<h3>💡 贴士</h3>`],
  // ── temple.html ──
  ['temple.html', `<div class="p-hero-icon">${F}${V}</div><h2>加载中...`, `<div class="p-hero-icon">⛩️</div><h2>加载中...`],
  ['temple.html', `<h3>${F}${V} 更多寺庙</h3>`, `<h3>⛩️ 更多寺庙</h3>`],
  // ── tide.html ──
  ['tide.html', `<div class="ei-big">${F}</div><h2>加载中...`, `<div class="ei-big">🌊</div><h2>加载中...`],
  ['tide.html', `<div class="ei-big">${F}</div><h2>未找到该观潮点`, `<div class="ei-big">🌊</div><h2>未找到该观潮点`],
  ['tide.html', `<div class="td-hist"><p>${F} '+data.history`, `<div class="td-hist"><p>📜 '+data.history`],
  ['tide.html', `<h3>${F} 贴士</h3>`, `<h3>💡 贴士</h3>`],
  ['tide.html', `<span class="td-sic">${F}</span>`, `<span class="td-sic">📍</span>`],
  // ── zhoubian.html ──
  ['zhoubian.html', `window.IHZ_PAGE={title:'周边游',icon:'${F}'}`, `window.IHZ_PAGE={title:'周边游',icon:'🚗'}`],
  ['zhoubian.html', `<div class="ei-big">${F}</div><h2>加载中...`, `<div class="ei-big">🚗</div><h2>加载中...`],
  ['zhoubian.html', `if(ht)ht.textContent='${F} 周边游';`, `if(ht)ht.textContent='🚗 周边游';`],
  // ── weekend.html ──
  ['weekend.html', `赏花 · ${F}${F}亲子 ·`, `赏花 · 👨‍👩‍👧 亲子 ·`],
  ['weekend.html', `(data.badge || '${F}')`, `(data.badge || '🎉')`],
  // ── js/lishi-data.js / js/zhoubian-data.js ──
  ['js/lishi-data.js', `name: '${F}隐文人'`, `name: '隐逸文人'`],
  ['js/zhoubian-data.js', `'芦茨+石舍+${F}坪'`, `'芦茨+石舍+茆坪'`],
  // ── js/bf-modules.js（37 处）──
  ['js/bf-modules.js', `icon: '${F}', color: '#8b5cf6', desc: '杭州人才分类认定'`, `icon: '🎓', color: '#8b5cf6', desc: '杭州人才分类认定'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#3b82f6', desc: '浙江省居住证办理'`, `icon: '🪪', color: '#3b82f6', desc: '浙江省居住证办理'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#10b981', desc: '杭州落户政策与办理'`, `icon: '🏠', color: '#10b981', desc: '杭州落户政策与办理'`],
  ['js/bf-modules.js', `<h4>${F} 官方入口</h4>`, `<h4>🔗 官方入口</h4>`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ef4444', desc: '杭州错峰限行查询'`, `icon: '🚗', color: '#ef4444', desc: '杭州错峰限行查询'`],
  ['js/bf-modules.js', `<h4>${F} 办事指南</h4>`, `<h4>📋 办事指南</h4>`],
  ['js/bf-modules.js', `<h4>${F} 办理地点</h4>`, `<h4>📍 办理地点</h4>`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ef4444', desc: '2026浙江省公务员考`, `icon: '📝', color: '#ef4444', desc: '2026浙江省公务员考`],
  ['js/bf-modules.js', `icon: '${F}', color: '#dc2626', desc: '2026国家公务员考试`, `icon: '📝', color: '#dc2626', desc: '2026国家公务员考试`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ef4444', desc: '杭州消费券领取'`, `icon: '🎫', color: '#ef4444', desc: '杭州消费券领取'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#f59e0b', desc: '杭州开学季全攻略'`, `icon: '🎒', color: '#f59e0b', desc: '杭州开学季全攻略'`],
  ['js/bf-modules.js', `<h4>${F} 获取最新信息</h4>`, `<h4>📢 获取最新信息</h4>`],
  ['js/bf-modules.js', `icon: '${F}${V}', color: '#06b6d4', desc: '灵隐寺飞来峰预约'`, `icon: '🛕', color: '#06b6d4', desc: '灵隐寺飞来峰预约'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#3b82f6', desc: '杭州每日招聘信息'`, `icon: '💼', color: '#3b82f6', desc: '杭州每日招聘信息'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#10b981', desc: '杭州大厂（阿里/网易等`, `icon: '🏢', color: '#10b981', desc: '杭州大厂（阿里/网易等`],
  ['js/bf-modules.js', `icon: '${F}', color: '#92400e', desc: '简历Word模板下载'`, `icon: '📄', color: '#92400e', desc: '简历Word模板下载'`],
  ['js/bf-modules.js', `icon: '${F}${V}', color: '#10b981', desc: '人才驿站免费住7天'`, `icon: '🛏️', color: '#10b981', desc: '人才驿站免费住7天'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#10b981', desc: '杭州体育赛事报名'`, `icon: '🏃', color: '#10b981', desc: '杭州体育赛事报名'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#f59e0b', desc: '杭州一日游经典路线'`, `icon: '🗺️', color: '#f59e0b', desc: '杭州一日游经典路线'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ec4899', desc: '杭州七夕约会攻略'`, `icon: '💕', color: '#ec4899', desc: '杭州七夕约会攻略'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#f97316', desc: '杭帮菜+网红餐厅'`, `icon: '🍜', color: '#f97316', desc: '杭帮菜+网红餐厅'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ef4444', desc: '2026春运购票指南'`, `icon: '🚄', color: '#ef4444', desc: '2026春运购票指南'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#f59e0b', desc: '杭州公車车免限行申请'`, `icon: '🚌', color: '#f59e0b', desc: '杭州公車车免限行申请'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#06b6d4', desc: '杭州地铁线路图'`, `icon: '🚇', color: '#06b6d4', desc: '杭州地铁线路图'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#3b82f6', desc: 'ETC线上办理入口'`, `icon: '🛣️', color: '#3b82f6', desc: 'ETC线上办理入口'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ef4444', desc: '浙A车牌竞价/摇号'`, `icon: '🚗', color: '#ef4444', desc: '浙A车牌竞价/摇号'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ef4444', desc: '交通违法查询/处理'`, `icon: '🚨', color: '#ef4444', desc: '交通违法查询/处理'`],
  ['js/bf-modules.js', `icon: '${F}${V}', color: '#8b5cf6', desc: '浙M新能源/摩托车牌'`, `icon: '🛵', color: '#8b5cf6', desc: '浙M新能源/摩托车牌'`],
  ['js/bf-modules.js', `icon: '${F}${V}', color: '#06b6d4', desc: '道路停车包月申请'`, `icon: '🅿️', color: '#06b6d4', desc: '道路停车包月申请'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#f59e0b', desc: '学法减分/审验教育'`, `icon: '📚', color: '#f59e0b', desc: '学法减分/审验教育'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#8b5cf6', desc: '浙江专升本考试政策'`, `icon: '🎓', color: '#8b5cf6', desc: '浙江专升本考试政策'`],
  ['js/bf-modules.js', `icon: '${F}', color: '#ef4444', desc: '浙江省2026高考指南`, `icon: '✏️', color: '#ef4444', desc: '浙江省2026高考指南`],
  ['js/bf-modules.js', `icon: '${F}${V}', color: '#3b82f6', desc: '杭州中小学学区划分查`, `icon: '🏫', color: '#3b82f6', desc: '杭州中小学学区划分查`],
  ['js/bf-modules.js', `<h4>${F} 热点学区（2025年预警）</h4>`, `<h4>🏫 热点学区（2025年预警）</h4>`],
  ['js/bf-modules.js', `window.openModal('${F} 公考信息'`, `window.openModal('📢 公考信息'`],
  // ── js/cat-data.js（47 处）──
  ['js/cat-data.js', `['${F}', '南宋御街', 'xiangxiang.html?id=zhedong']`, `['🏮', '南宋御街', 'xiangxiang.html?id=zhedong']`],
  ['js/cat-data.js', `'消费券·${F}羊毛·以旧换新'`, `'消费券·薅羊毛·以旧换新'`],
  ['js/cat-data.js', `['${F}', '消费券', 'life.html?id=xiaofei']`, `['🎫', '消费券', 'life.html?id=xiaofei']`],
  ['js/cat-data.js', `['${F}${V}', '薅羊毛', 'life.html?id=xiaofei']`, `['✂️', '薅羊毛', 'life.html?id=xiaofei']`],
  ['js/cat-data.js', `['${F}', '支付宝', 'life.html?id=xiaofei']`, `['💳', '支付宝', 'life.html?id=xiaofei']`],
  ['js/cat-data.js', `['${F}${V}', '优惠券', 'life.html?id=xiaofei']`, `['🎟️', '优惠券', 'life.html?id=xiaofei']`],
  ['js/cat-data.js', `['${F}', '福利活动', 'life.html?id=xiaofei']`, `['🎁', '福利活动', 'life.html?id=xiaofei']`],
  ['js/cat-data.js', `['${F}', '杭州消费券领取', '文旅/商超/支付宝搜索「杭州消费券」'`, `['🎫', '杭州消费券领取', '文旅/商超/支付宝搜索「杭州消费券」'`],
  ['js/cat-data.js', `['${F}', '以旧换新补贴', '家电/汽车置换最高补 15%'`, `['🔁', '以旧换新补贴', '家电/汽车置换最高补 15%'`],
  ['js/cat-data.js', `['${F}${V}', '各区租金', 'life.html?id=zufang']`, `['🏘️', '各区租金', 'life.html?id=zufang']`],
  ['js/cat-data.js', `['${F}', '租房合同', 'life.html?id=zufang']`, `['📝', '租房合同', 'life.html?id=zufang']`],
  ['js/cat-data.js', `['${F}', '合租', 'life.html?id=zufang']`, `['👥', '合租', 'life.html?id=zufang']`],
  ['js/cat-data.js', `['${F}', '人才公寓', 'life.html?id=zufang']`, `['🏠', '人才公寓', 'life.html?id=zufang']`],
  ['js/cat-data.js', `['${F}', '租房避坑', 'life.html?id=zufang']`, `['⚠️', '租房避坑', 'life.html?id=zufang']`],
  ['js/cat-data.js', `['${F}${V}', '二手房', 'life.html?id=fangchan']`, `['🏠', '二手房', 'life.html?id=fangchan']`],
  ['js/cat-data.js', `['${F}', '房贷计算', 'life.html?id=fangchan']`, `['🧮', '房贷计算', 'life.html?id=fangchan']`],
  ['js/cat-data.js', `['${F}', '税费', 'life.html?id=fangchan']`, `['💰', '税费', 'life.html?id=fangchan']`],
  ['js/cat-data.js', `['${F}${V}', '满二唯一', 'life.html?id=fangchan']`, `['📜', '满二唯一', 'life.html?id=fangchan']`],
  ['js/cat-data.js', `['${F}${V}', '限购政策', 'life.html?id=fangchan']`, `['🚫', '限购政策', 'life.html?id=fangchan']`],
  ['js/cat-data.js', `['${F}${V}', '钱江新城', 'life.html?id=shangquan']`, `['🏙️', '钱江新城', 'life.html?id=shangquan']`],
  ['js/cat-data.js', `['${F}', '下沙商圈', 'life.html?id=shangquan']`, `['🏬', '下沙商圈', 'life.html?id=shangquan']`],
  ['js/cat-data.js', `['${F}', '购物中心', 'life.html?id=shangquan']`, `['🛍️', '购物中心', 'life.html?id=shangquan']`],
  ['js/cat-data.js', `['${F}${V}', '美食街区', 'life.html?id=shangquan']`, `['🍜', '美食街区', 'life.html?id=shangquan']`],
  ['js/cat-data.js', `['${F}${V}', '停车信息', 'life.html?id=shangquan']`, `['🅿️', '停车信息', 'life.html?id=shangquan']`],
  ['js/cat-data.js', `['${F}', '娱乐休闲', 'life.html?id=shangquan']`, `['🎮', '娱乐休闲', 'life.html?id=shangquan']`],
  ['js/cat-data.js', `['${F}${V}', '钱江新城', '万象城/来福士/高德置地'`, `['🏙️', '钱江新城', '万象城/来福士/高德置地'`],
  ['js/cat-data.js', `['${F}', '家电', 'life.html?id=jiazhuang']`, `['📺', '家电', 'life.html?id=jiazhuang']`],
  ['js/cat-data.js', `['${F}', '灯具', 'life.html?id=jiazhuang']`, `['💡', '灯具', 'life.html?id=jiazhuang']`],
  ['js/cat-data.js', `['${F}', '建材市场', 'life.html?id=jiazhuang']`, `['🧱', '建材市场', 'life.html?id=jiazhuang']`],
  ['js/cat-data.js', `['${F}', '设计公司', 'life.html?id=jiazhuang']`, `['📐', '设计公司', 'life.html?id=jiazhuang']`],
  ['js/cat-data.js', `['${F}', '装修日记', 'life.html?id=jiazhuang']`, `['📓', '装修日记', 'life.html?id=jiazhuang']`],
  ['js/cat-data.js', `['${F}', '电费', 'life.html?id=shenghuo']`, `['⚡', '电费', 'life.html?id=shenghuo']`],
  ['js/cat-data.js', `['${F}', '水费', 'life.html?id=shenghuo']`, `['💧', '水费', 'life.html?id=shenghuo']`],
  ['js/cat-data.js', `['${F}${V}', '供暖', 'life.html?id=shenghuo']`, `['🔥', '供暖', 'life.html?id=shenghuo']`],
  ['js/cat-data.js', `['${F}', '电费缴纳', '国家电网杭州客服'`, `['⚡', '电费缴纳', '国家电网杭州客服'`],
  ['js/cat-data.js', `['${F}', '水费缴纳', '杭州水务在线缴费'`, `['💧', '水费缴纳', '杭州水务在线缴费'`],
  ['js/cat-data.js', `k: 'xiangqin', n: '相亲交友', ic: '${F}'`, `k: 'xiangqin', n: '相亲交友', ic: '💘'`],
  ['js/cat-data.js', `['${F}', '万松书院', 'life.html?id=xiangqin']`, `['🌲', '万松书院', 'life.html?id=xiangqin']`],
  ['js/cat-data.js', `['${F}', '相亲技巧', 'life.html?id=xiangqin']`, `['💡', '相亲技巧', 'life.html?id=xiangqin']`],
  ['js/cat-data.js', `['${F}', '形象改造', 'life.html?id=xiangqin']`, `['👔', '形象改造', 'life.html?id=xiangqin']`],
  ['js/cat-data.js', `['${F}', '同城活动', 'life.html?id=xiangqin']`, `['🎉', '同城活动', 'life.html?id=xiangqin']`],
  ['js/cat-data.js', `['${F}', '万松书院相亲角', '每周六上午父母把关'`, `['🌲', '万松书院相亲角', '每周六上午父母把关'`],
  ['js/cat-data.js', `['${F}', '同城活动', '豆瓣同城/贴吧聚会'`, `['🎉', '同城活动', '豆瓣同城/贴吧聚会'`],
  ['js/cat-data.js', `['${F}', '游泳', 'life.html?id=jianshen']`, `['🏊', '游泳', 'life.html?id=jianshen']`],
  ['js/cat-data.js', `['${F}', '武术', 'life.html?id=jianshen']`, `['🥋', '武术', 'life.html?id=jianshen']`],
  ['js/cat-data.js', `['${F}', '杭州马拉松', '每年 11 月报名'`, `['🏃', '杭州马拉松', '每年 11 月报名'`],
];
let ok = 0, miss = [];
const cache = {};
for (const [file, find, rep] of R) {
  const p = ROOT + '/' + file;
  if (!cache[file]) cache[file] = fs.readFileSync(p, 'utf8');
  let txt = cache[file];
  const n = txt.split(find).length - 1;
  if (n === 0) { miss.push(file + ' :: ' + JSON.stringify(find.slice(0, 50))); continue; }
  txt = txt.split(find).join(rep);
  cache[file] = txt;
  ok += n;
}
for (const [file, txt] of Object.entries(cache)) fs.writeFileSync(ROOT + '/' + file, txt, 'utf8');
console.log('REPLACED=' + ok + ' MISSED=' + miss.length);
miss.forEach(m => console.log('  MISS ' + m));
