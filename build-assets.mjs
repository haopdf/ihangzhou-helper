// 构建脚本：压缩核心静态资源（JS/CSS）并自动生成全局资源版本号。
// 产物：js/app.min.js、js/data-categories.min.js、js/cat-data.min.js、css/style.min.css
//   （源文件保留，便于调试；生成物已加入 .gitignore，部署时由构建产出）
// 版本号：对所有产物内容取 sha256 前 10 位，统一替换仓库内所有 `?v=<旧版本>` 引用，
//   使资源更新后客户端自动刷新缓存（含 articles/ 下 2750+ 文章页）。
// 用法：由 package.json 的 build 命令调用。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const FALLBACK_VERSION = '20261018l';

// 当前线上/仓库内使用的版本号（动态检测，保证重复构建幂等）
function detectCurrentVersion() {
  for (const f of ['index.html', 'js/app.js', 'sw.js']) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) continue;
    const m = fs.readFileSync(p, 'utf8').match(/\?v=([A-Za-z0-9_.-]+)/);
    if (m) return m[1];
  }
  return FALLBACK_VERSION;
}
const CURRENT_VERSION = detectCurrentVersion();

// [源文件, 产物]（源文件保留；产物为 gitignore 的生成物）
// 覆盖仓库内所有带 ?v= 引用的资源（含 2747 篇文章页引用的 article-toc / article-table-fix）
const TARGETS = [
  ['js/app.js', 'js/app.min.js'],
  ['js/analytics.js', 'js/analytics.min.js'],
  ['js/data-categories.js', 'js/data-categories.min.js'],
  ['js/cat-data.js', 'js/cat-data.min.js'],
  ['js/home-cats.js', 'js/home-cats.min.js'],
  ['js/article-toc.js', 'js/article-toc.min.js'],
  ['js/article-table-fix.js', 'js/article-table-fix.min.js'],
  ['js/layout.js', 'js/layout.min.js'],
  ['js/breadcrumb.js', 'js/breadcrumb.min.js'],
  ['js/channel-route.js', 'js/channel-route.min.js'],
  ['js/tushuguan-data.js', 'js/tushuguan-data.min.js'],
  ['css/style.css', 'css/style.min.css'],
  ['css/channel.css', 'css/channel.min.css']
];

// ---------- 1) 压缩 ----------
let esbuild;
try {
  esbuild = await import('esbuild');
} catch (e) {
  console.error('  [build-assets] 缺少 esbuild，请先执行 npm install（devDependencies 已声明）');
  process.exit(1);
}

const outputs = [];
for (const [src, out] of TARGETS) {
  const srcPath = path.join(ROOT, src);
  const outPath = path.join(ROOT, out);
  if (!fs.existsSync(srcPath)) {
    console.warn(`  [build-assets] 跳过（不存在）：${src}`);
    continue;
  }
  const before = fs.statSync(srcPath).size;
  await esbuild.build({
    entryPoints: [srcPath],
    outfile: outPath,
    minify: true,
    charset: 'utf8', // 保留中文/emoji 原样，避免被转义成 \uXXXX 导致产物膨胀
    logLevel: 'warning',
    target: ['es2018', 'chrome80', 'safari14', 'firefox80']
  });
  const after = fs.statSync(outPath).size;
  outputs.push({ out: outPath, bytes: fs.readFileSync(outPath) });
  console.log(`  ${out.padEnd(28)} ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB（${((1 - after / before) * 100).toFixed(0)}% 压缩）`);
}

if (!outputs.length) {
  console.error('  [build-assets] 没有可压缩的产物，终止');
  process.exit(1);
}

// ---------- 2) 版本号 = 产物内容 hash ----------
// 产物（如 app.min.js）内嵌动态注入的 ?v= 引用，计算 hash 前先把版本号规范化掉，
// 否则每次构建版本号都会参与 hash 造成漂移（同一内容重复构建版本号不稳定）。
const VERSIONED_REF_RE = /((?:js|css)\/[A-Za-z0-9_-]+)(?:\.min)?\.(js|css)\?v=[A-Za-z0-9_.-]+/g;
const h = crypto.createHash('sha256');
for (const o of outputs) {
  const normalized = o.bytes.toString('utf8').replace(VERSIONED_REF_RE, '$1.min.$2?v=');
  h.update(path.basename(o.out));
  h.update(normalized);
}
const VERSION = h.digest('hex').slice(0, 10);
console.log(`  资源版本号：${CURRENT_VERSION} -> ${VERSION}`);

// ---------- 3) 统一替换引用 ----------
// 归一化：所有相关静态资源引用（含动态注入段、文章页 2757 处引用）一律指向
// .min 产物并统一为本次 hash；即使仓库中残留任意旧版本号（如 20261018l）
// 或已是 .min 引用，也会被收敛，保证幂等。
const RESOURCE_NAMES = 'app|analytics|data-categories|cat-data|home-cats|article-toc|article-table-fix|layout|breadcrumb|channel-route|tushuguan-data';
const CSS_NAMES = 'style|channel';
const RES_SRC_RE = `(?:js\\/(?:${RESOURCE_NAMES})|css\\/(?:${CSS_NAMES}))`;
const RENAME_RE = new RegExp(`((?:\\.\\.\\/)?${RES_SRC_RE})(?:\\.min)?\\.(js|css)\\?v=[A-Za-z0-9_.-]+`, 'g');
const HAS_RES_REF_RE = new RegExp(`${RES_SRC_RE}(?:\\.min)?\\.(?:js|css)\\?v=`);

function patchContent(c) {
  return c.replace(RENAME_RE, (m, p, ext) => `${p}.min.${ext}?v=${VERSION}`);
}

// 同步回写压缩产物：产物内嵌的 ?v= 引用（如 app.min.js 中的动态注入段）
// 写入本次版本号，否则会残留构建前的旧 hash
for (const o of outputs) {
  const text = o.bytes.toString('utf8');
  if (!HAS_RES_REF_RE.test(text)) continue;
  const next = patchContent(text);
  if (next !== text) fs.writeFileSync(o.out, next);
}

// 部署范围内的静态资源/代码目录（docs/、scripts/ 为内部文档与开发脚本，不部署，跳过）
const SCAN_DIRS = [ROOT, path.join(ROOT, 'articles'), path.join(ROOT, 'admin'), path.join(ROOT, 'tools'), path.join(ROOT, 'js')];
let patched = 0;
const touched = [];
for (const dir of SCAN_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!/\.(html|js)$/i.test(name)) continue;
    if (name.endsWith('.min.js')) continue;
    const p = path.join(dir, name);
    if (!fs.statSync(p).isFile()) continue;
    const original = fs.readFileSync(p, 'utf8');
    if (!HAS_RES_REF_RE.test(original)) continue;
    const next = patchContent(original);
    if (next !== original) {
      fs.writeFileSync(p, next);
      patched++;
      touched.push(path.relative(ROOT, p));
    }
  }
}
console.log(`  改写引用：${patched} 个文件`);

// ---------- 4) SW 预缓存指向 .min 产物（仅在预缓存变化时升级缓存名）----------
const swPath = path.join(ROOT, 'sw.js');
const swBefore = fs.readFileSync(swPath, 'utf8');
const swAfter = swBefore
  .replace("'/js/app.js'", "'/js/app.min.js'")
  .replace("'/css/style.css'", "'/css/style.min.css'");
if (swAfter !== swBefore) {
  const bumped = swAfter.replace(/var CACHE_NAME = 'ihangzhou-v(\d+)';/, (m, n) => `var CACHE_NAME = 'ihangzhou-v${Number(n) + 1}';`);
  fs.writeFileSync(swPath, bumped);
  console.log('  sw.js：预缓存指向 .min 产物，CACHE_NAME 升级');
}

// ---------- 5) 校验：不应残留对 .min 产物的旧引用 ----------
const leftovers = [];
for (const dir of SCAN_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (!/\.(html|js)$/i.test(name) || name.endsWith('.min.js')) continue;
    const p = path.join(dir, name);
    if (!fs.statSync(p).isFile()) continue;
    const c = fs.readFileSync(p, 'utf8');
    // 校验未压缩引用残留：.min.js?v= 合法；xxx.js?v=（无 .min）为残留
    if (new RegExp(`${RES_SRC_RE}\\.(?:js|css)\\?v=`).test(c)) leftovers.push(path.relative(ROOT, p));
  }
}
if (leftovers.length) {
  console.error(`  [build-assets] 校验失败：仍有文件引用未压缩版本（${leftovers.slice(0, 10).join(', ')}）`);
  process.exit(1);
}
console.log('  校验通过：所有带版本号的引用均已指向压缩产物');
