/* not-found 分支补通栏面包屑 + weekend crumb 修正 + emoji 统一 */
const fs = require('fs');
const ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper';
const R = [
  // ── 单行内联型（;return;} 结尾）──
  ['breakfast.html', `if(ht)ht.textContent='🥟 早餐';return;}`, `if(ht)ht.textContent='🥟 早餐';if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'早餐','未找到');return;}`],
  ['dessert.html', `if(ht)ht.textContent='🍰 甜品';return;}`, `if(ht)ht.textContent='🍰 甜品';if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'甜品糕点','未找到');return;}`],
  ['night-market.html', `if(ht)ht.textContent='🌃 夜市';return;}`, `if(ht)ht.textContent='🌃 夜市';if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'夜市','未找到');return;}`],
  // ── 多行型（ht.textContent;\n return;）──
  ['tide.html', `if(ht)ht.textContent='🌊 钱塘江观潮';\n        return;`, `if(ht)ht.textContent='🌊 钱塘江观潮';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'钱塘江观潮','未找到');\n        return;`],
  ['temple.html', `if(ht)ht.textContent='⛩️ 寺庙';\n        return;`, `if(ht)ht.textContent='⛩️ 寺庙';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'寺庙','未找到');\n        return;`],
  ['route.html', `if(ht)ht.textContent='🗺️ 路线攻略';\n        return;`, `if(ht)ht.textContent='🗺️ 路线攻略';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'路线攻略','未找到');\n        return;`],
  ['xiangxiang.html', `if(ht)ht.textContent='🛤️ 街巷漫步';\n        return;`, `if(ht)ht.textContent='🛤️ 街巷漫步';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'街巷漫步','未找到');\n        return;`],
  ['tushuguan.html', `if(ht)ht.textContent='📚 图书馆';\n        return;`, `if(ht)ht.textContent='📚 图书馆';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'图书馆','未找到');\n        return;`],
  ['chaguan.html', `if(ht)ht.textContent='🍵 茶馆';\n        return;`, `if(ht)ht.textContent='🍵 茶馆';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'茶馆','未找到');\n        return;`],
  // zhoubian：顺手把 🚗 统一为 🚙（与 ei-big/详情页一致）
  ['zhoubian.html', `window.IHZ_PAGE={title:'周边游',icon:'🚗'}`, `window.IHZ_PAGE={title:'周边游',icon:'🚙'}`],
  ['zhoubian.html', `if(ht)ht.textContent='🚗 周边游';\n        return;`, `if(ht)ht.textContent='🚙 周边游';\n        if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'周边游','未找到');\n        return;`],
  // chaguan：not-found 图标 🫖 统一为 🍵
  ['chaguan.html', `<div class="p-hero-icon">🫖</div><h2>未找到该茶馆</h2>`, `<div class="p-hero-icon">🍵</div><h2>未找到该茶馆</h2>`],
  // ── 转义unicode 源文件型 ──
  ['hangbang.html', `if (headerTitle) headerTitle.textContent = '\\ud83e\\udd62 \\u676d\\u5e72\\u83dc';\n        return;`, `if (headerTitle) headerTitle.textContent = '\\ud83e\\udd62 \\u676d\\u5e72\\u83dc';\n        if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '\\u676d\\u5e72\\u83dc', '\\u672a\\u627e\\u5230');\n        return;`],
  ['story.html', `if (headerTitle) headerTitle.textContent = '\\ud83d\\udcd6 \\u676d\\u5dde\\u6545\\u4e8b';\n        return;`, `if (headerTitle) headerTitle.textContent = '\\ud83d\\udcd6 \\u676d\\u5dde\\u6545\\u4e8b';\n        if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '\\u676d\\u5dde\\u6545\\u4e8b', '\\u672a\\u627e\\u5230');\n        return;`],
  ['guzhen.html', `if (headerTitle) headerTitle.textContent = '\\ud83c\\udfd9\\ufe0f \\u53e4\\u9547\\u53e4\\u6751';\n        return;`, `if (headerTitle) headerTitle.textContent = '\\ud83c\\udfd9\\ufe0f \\u53e4\\u9547\\u53e1\\u6751';\n        if (window.IHZW && IHZW.prependCrumb) IHZW.prependCrumb(document.body, '\\u53e4\\u9547\\u53e4\\u6751', '\\u672a\\u627e\\u5230');\n        return;`],
  // ── weekend.html：详情 crumb 移 body 级 + 列表补 crumb ──
  ['weekend.html', `if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(grid,(window.IHZ_PAGE&&window.IHZ_PAGE.title)||'杭州',(data&&(data.name||data.title))||'详情');`, `if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'周末休闲',(data&&(data.name||data.title))||'详情');`],
  ['weekend.html', `      }\n      function renderDetail(data, id) {`, `      }\n      if(window.IHZW&&IHZW.prependCrumb)IHZW.prependCrumb(document.body,'周末休闲','全部推荐');\n      function renderDetail(data, id) {`],
];
let ok = 0; const miss = [];
const cache = {};
for (const [file, find, rep] of R) {
  const p = ROOT + '/' + file;
  if (!cache[file]) cache[file] = fs.readFileSync(p, 'utf8');
  const n = cache[file].split(find).length - 1;
  if (n === 0) { miss.push(file + ' :: ' + JSON.stringify(find.slice(0, 60))); continue; }
  cache[file] = cache[file].split(find).join(rep);
  ok += n;
}
for (const [file, txt] of Object.entries(cache)) fs.writeFileSync(ROOT + '/' + file, txt, 'utf8');
console.log('REPLACED=' + ok + ' MISSED=' + miss.length);
miss.forEach(m => console.log('  MISS ' + m));
