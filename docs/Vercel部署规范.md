# iHangzhou Vercel 部署规范（Deployment Standards）

> 配套文档：[docs/API.md](API.md)（接口清单）、[docs/architecture-v2.md](architecture-v2.md)
> 本文件管**部署侧硬约束**：① 用哪个 Vercel 项目 ② Serverless Function 数量上限 ③ build 命令 ④ 新增 API 前的检查清单 ⑤ API 函数代码规范。
> 定位：部署出问题先读本文件。**2026-10-19 因连续两次部署失败 + 部署错项目而立；2026-10-24 因全站 API 500 事故扩充，属踩坑后的强制规范。**
> 版本：2026-10-24 修订

---

## 0. 一句话铁律（最重要）

> **这个仓库只 `git push` 到 GitHub，正主 Vercel 项目 `ihangzhou` 会自动部署。禁止手动 `vercel deploy`，禁止新建 Vercel 项目。**

- 正主项目：**`ihangzhou`**（GitHub 自动部署），域名 = `ihangzhou.vercel.app` + `ihz.inanyang.com` + `www.ihangzhou.net`。
- 本地 `.vercel/project.json` 必须链到 `ihangzhou`（projectId `prj_uZqng97JG4GmY4YC90Nn601I9v0F`）。若发现链到别的名字（如历史遗留的 `ihangzhou-helper`，已删），用 `vercel link --yes --project ihangzhou` 改回。
- **"Vercel 没更新" 99% 是 build 挂了导致 Git 自动部署失败**，去 Vercel 后台看 `ihangzhou` 项目最新一次部署的 build 日志，别急着手动部署或新建项目。

---

## 1. ⚠️ Hobby 套餐 Serverless Function 上限 = 12（硬约束）

**Vercel 把 `api/` 目录下每一个 `.js` 文件（含子目录嵌套）都计为一个 Serverless Function。免费 Hobby 套餐单次部署最多 12 个，第 13 个直接让部署失败：**

```
Error: No more than 12 Serverless Functions can be added to a Deployment on the Hobby plan.
```

计数规则：
- `api/foo.js` → 1 个函数（路由 `/api/foo`）
- `api/bar/baz.js` → 1 个函数（嵌套也算）
- `api/_templates/xxx.js`、`api/.hidden.js` → **不计入**（Vercel 忽略 `_` 和 `.` 前缀的目录/文件）
- 非 `.js` 文件（README.md、json 等）→ 不计入

**当前状态（2026-10-24）**：`api/` 下 **11 个函数**（留 1 个余量），已归档 8 个孤儿到 `api-archive/`（见 §4）。

---

## 2. 新增 / 改动 API 端点前的检查清单（必做）

加任何一个新的 `api/*.js` 之前，先跑：

```bash
# 1. 数当前函数个数（排除 _templates）
find api -name '*.js' -not -path '*/_templates/*' | wc -l
```

- **结果 ≥ 12**：不能再加独立文件。必须二选一：
  1. **合并**：把新逻辑并进某个现有函数（用 `?action=xxx` 或请求路径分流，参考 `api/tools.js` 一个文件扛十几个 action 的做法）；
  2. **归档僵尸函数**：把确认零调用的旧函数移到 `api-archive/`（见 §4）腾出名额。
- **结果 < 12**：可以加，但加完再数一次，别顶到 12（留余量给以后）。
- 加完后 `npm run build` 本地验证 + §6 的三条 import 自测，再 push（push 即触发正主自动部署）。

---

## 3. build 命令（改 package.json 前先看）

- 部署时 Vercel 跑 `npm run build`，**唯一正确命令**是：

  ```json
  "build": "node scripts/build-search-index.js"
  ```

- 生成搜索索引 `articles/search-index.json`（约 2731 条）。脚本自包含 ESM（`package.json` 有 `"type": "module"`），只 import 标准库、无参数、无本地依赖。
- **历史坑**：曾写成 `node scripts/build search-index`，而 `scripts/build` 这个文件从不存在 → Vercel 报 `Cannot find module '/vercel/path0/scripts/build'`（MODULE_NOT_FOUND）→ 自动部署一直失败。改脚本名/路径后务必本地 `npm run build` 跑通再 push。

---

## 4. api-archive/：僵尸函数归档区

- 位置：`api-archive/`（用 `git mv` 移入，保留 git 历史；代码**不删**）。已加进 `.vercelignore`，不会部署、不计入函数数。
- 什么函数该归档：**全仓库（*.html/*.js/*.json）grep 不到任何 `/api/<名字>` 真实调用点**的（只有自身注释 / `api/health.js` 端点清单里出现的，算孤儿）。
- 已归档 8 个（2026-10-19）：`districts`、`places`、`wechat-topics`、`wx-jsapi`、`keywords/index`、`keywords/add`、`setup/db`、`articles/create`。
- **保留的读接口**：`articles/index.js`、`articles/[slug].js` —— 仓库内无调用，但可能服务外部站点，保守留着，**别当僵尸删**。
- 当前 `api/` 保留 11 个：`chat`、`content`、`health`、`hospital`、`metro`、`news`、`tools`、`wechat`、`wechat-cron`、`articles/index`、`articles/[slug]`。

---

## 5. 踩坑记录（持续追加，勿再犯）

| # | 现象 | 根因 | 教训 |
|---|---|---|---|
| 1 | Vercel 一直不更新 | 正主 `ihangzhou` 的 build 报 MODULE_NOT_FOUND，Git 自动部署卡在失败 | "没更新"先查 build 日志，别手动部署 |
| 2 | `Cannot find module scripts/build` | `package.json` build 命令指向不存在的 `scripts/build` | 见 §3，改构建脚本必须本地验证 |
| 3 | `No more than 12 Serverless Functions` | Vercel 把 `api/**/*.js` 每个都计为函数，当时约 19 个，超 Hobby 上限 | 见 §1/§2，加 API 前先数数 |
| 4 | 部署出了一个多余的 `ihangzhou-helper.vercel.app` | 我手动 `vercel deploy`，而本地 `.vercel` 当时链的是 `ihangzhou-helper`（非正主） | 见 §0，禁手动部署；已删该项目并改回链接 |
| 5 | **全站 API 全 500**（tools/news/content/articles/health…无一幸免） | `package.json` 是 `type:module`，但 api/ 下 8 个函数自 API 架构 V2 起仍是 CommonJS，云端按 ESM 解析，模块加载即崩 | 见 §6.1，ESM 一致性，部署前 `node import` 秒测 |
| 6 | health/articles 仍 500 / 超时 000 | 这三个函数是 Web 风格（`return new Response` + `handler(req,{params})`），Node runtime 不采纳；且 `../../../lib/`、`../../lib/` 相对路径互相抄反，解析到仓库外 | 见 §6.2/§6.3，Express 风格 + 路径按深度数 |

**CLI 备忘**：
- 删项目：`echo y \| vercel project remove <name>`（不是 `rm --yes`，`rm` 不认 `--yes`；删除要交互确认，`--non-interactive` 会被 SIGKILL）。
- 本地部署仅供临时预览，**不代表线上**；线上永远以 GitHub push 触发的 `ihangzhou` 自动部署为准。

---

## 6. API 函数代码规范（三条硬约束，2026-10-24 全站 API 500 事故后立）

vercel.json 未指定 runtime → Vercel 默认 **Node.js runtime（Express 风格）**。所有 `api/**/*.js` 必须同时满足：

### 6.1 模块语法 = ESM（与 package.json `"type": "module"` 一致）

- `require('@vercel/blob')` → `import { get, put } from '@vercel/blob'`；`require('crypto')` → `import crypto from 'node:crypto'`
- `module.exports = async (req, res) => {...}` → `export default async (req, res) {...}`
- JSON 文件读取（如 `data/cms.json`）用 `createRequire` 封装并兜底：

  ```js
  import { createRequire } from 'node:module';
  const __require = createRequire(import.meta.url);
  function reqJson(rel) { try { return __require(rel); } catch (e) { return null; } }
  const DEFAULT_CMS = reqJson('../data/cms.json') || {};
  ```

- **验证方法**（本地秒测，不用等部署）：
  ```bash
  node --input-type=module -e "import('./api/xxx.js').then(()=>console.log('OK')).catch(e=>console.log('FAIL:',e.message))"
  ```

### 6.2 handler 签名与响应 = Express 风格

- `export default async function handler(req, res)`，响应用 `res.status(200).json({...})`。
- **禁止 Web 风格**：`return new Response(...)` 不被 Node runtime 采纳（函数无响应、超时 000）；`handler(req, { params })` 解构第二参数直接 TypeError（FUNCTION_INVOCATION_FAILED）。动态路由（如 `/api/articles/:slug`）的 slug 从 `req.url` 末段自己解析。
- `new URL(req.url)` **必须带 base**（`new URL(req.url, 'https://www.ihangzhou.net')`）——Node runtime 的 `req.url` 只是路径，无 base 会抛 Invalid URL。

### 6.3 相对路径按实际目录深度数（最易错）

- `api/foo.js`（深度1）：到仓库根 = `../`，到 `lib/` = `../lib/`
- `api/articles/foo.js`、`api/_templates/foo.js`（深度2）：到根 = `../../`，到 `lib/` = `../../lib/`
- 读 `articles/index.json` 等同级大文件：`api/articles/*.js` 用 `new URL('../../articles/index.json', import.meta.url)`
- **教训**：2026-10-24 前 `api/articles/*.js` 写 `../../../lib/`（多一级）、`api/health.js` 写 `../../lib/`（少一级），两拨文件互相抄反，模块解析到仓库外 `/Users/asind/PycharmProjects/lib/` → 500。**路径错在本地 `node import` 立刻现形，部署前必测。**
