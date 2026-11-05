// 构建脚本：从 js/cat-data.js 提取一级/二级栏目，生成 js/home-cats.js（window.HOME_CATS）。
// 目的：消除 index.html 内联 HOME_CATS 与 js/cat-data.js 之间的双份维护，
//       频道数据只改 cat-data.js 一处，构建时自动同步到首页卡片数据。
// 用法：由 package.json 的 build 命令调用（位于 build-assets.mjs 之前）。
// 产物 js/home-cats.js 为生成物，已加入 .gitignore，部署时由构建生成。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ROOT, 'js', 'cat-data.js');
const OUT = path.join(ROOT, 'js', 'home-cats.js');

if (!fs.existsSync(SRC)) {
  console.error('  [build-home-cats] 找不到 js/cat-data.js，跳过');
  process.exit(0);
}

// 特殊入口保留映射（与历史内联 HOME_CATS 行为一致）：
//   a = 触发页面动作（runAct，调用全局函数）
//   p = 切换 SPA 页签（data-page）
//   u = 外链跳转（window.openUrl）
const SPECIAL = {
  '钱塘江观潮': { a: 'tide' },
  '常用电话': { p: 'phone' },
  '实用工具': { p: 'tools' },
  '今日限行': { a: 'xianxing' },
  '天气预警': { a: 'weather' },
  '油价查询': { a: 'youjia' },
  '杭州好物': { a: 'goods' },
  '餐饮团购': { u: 'https://i.meituan.com/ahangzhou?channel=485720' },
  '酒店预订': { u: 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool' },
  '我的收藏': { a: 'fav' },
  '浏览历史': { a: 'hist' },
  '每日签到': { a: 'checkin' },
  '意见反馈': { a: 'feedback' },
  '字体大小': { a: 'fontsize' },
  '分享给朋友': { a: 'share' },
  '关于我们': { a: 'about' },
  '设置': { a: 'settings' }
};

// cat-data.js 是 JS 对象字面量（单引号），用 Function 沙箱求值提取，避免手写解析器
const content = fs.readFileSync(SRC, 'utf8');
let data;
try {
  const fn = new Function('window', content + '\n;return window.CAT_DATA;');
  data = fn({ window: {} });
} catch (e) {
  console.error('  [build-home-cats] 解析 js/cat-data.js 失败：', e.message);
  process.exit(1);
}
if (!Array.isArray(data) || !data.length) {
  console.error('  [build-home-cats] CAT_DATA 为空，跳过');
  process.exit(0);
}

const homeCats = data.map(function (c) {
  return {
    key: c.k,
    name: c.n,
    icon: c.ic,
    desc: c.d,
    color: c.c,
    href: 'cat.html?c=' + c.k,
    intro: c.i,
    subs: (c.subs || []).map(function (s) {
      const sub = { n: s.n, ic: s.ic, d: s.d };
      const sp = SPECIAL[s.n];
      if (sp) {
        if (sp.a) sub.a = sp.a;
        if (sp.p) sub.p = sp.p;
        if (sp.u) sub.u = sp.u;
      } else {
        sub.h = 'cat.html?c=' + c.k + '&s=' + encodeURIComponent(s.n);
      }
      return sub;
    })
  };
});

const payload = JSON.stringify(homeCats, null, 2);
fs.writeFileSync(
  OUT,
  '// 由 build-home-cats.mjs 在构建时生成，请勿手改（改 js/cat-data.js 后自动重建）\n' +
  'window.HOME_CATS = ' + payload + ';\n'
);

console.log(`  home-cats.js : ${(payload.length / 1024).toFixed(1)} KB（${homeCats.length} 个一级栏目 × ${homeCats[0].subs.length} 个二级入口）`);
