// 构建脚本：把 articles/index.json 生成一份可被 API 函数直接 import 的数据模块。
// 目的：频道页 / 栏目页的「相关文章」改由服务端按需过滤（GET /api/articles-index），
//       避免客户端整包下载 1.3MB 的 articles/index.json。
// 用法：由 package.json 的 build 命令调用（与 gen-sitemap.js / build-home-cats.mjs 并列）。
// 产物 lib/articles-index.data.js 为生成物，已加入 .gitignore，部署时由构建生成。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'articles', 'index.json');
const OUT = path.join(ROOT, 'lib', 'articles-index.data.js');

if (!fs.existsSync(SRC)) {
  console.error('  [build-index-data] 找不到 articles/index.json，跳过');
  process.exit(0);
}

const arr = JSON.parse(fs.readFileSync(SRC, 'utf8'));
if (!Array.isArray(arr)) {
  console.error('  [build-index-data] articles/index.json 不是数组，跳过');
  process.exit(0);
}

const payload = JSON.stringify(arr);
fs.writeFileSync(
  OUT,
  '// 由 build-index-data.mjs 在构建时生成，请勿手改（articles/index.json 变更后自动重建）\n' +
  'export default ' + payload + ';\n'
);

console.log(`  articles-index.data.js : ${(payload.length / 1024).toFixed(0)} KB（${arr.length} 篇）`);
