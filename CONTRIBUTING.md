# iHangzhou 开发接手指南

> 写给后面接手本项目的人。本仓库是"独立网站 + 公众号自动回复后台"双重身份，跟一般纯静态站不一样，下面这些坑都踩过，避免重复踩。

## 1. 先读这几份

按顺序读：

1. [README.md](README.md) —— 项目总览
2. [docs/PRD.md](docs/PRD.md) —— 产品需求文档（v3.0 双重身份版）
3. 本文档 —— 开发接手指南
4. [memory/projects/.../project_memory.md](file:///c:\Users\asind\.trae-cn\memory\projects\-d-py-project-ihangzhou-helper--p2-9b9f1f08a823e702ac44\project_memory.md) —— 项目记忆（约束/惯例/踩坑）

## 2. 本地开发

```bash
# 静态预览（不带 API）
python -m http.server 8080
# 或
npx serve .

# 带 API 的完整本地开发需要 Vercel CLI
npm i -g vercel
vercel dev
```

> 静态预览时 `/api/*` 不可用，公众号回调、AI 对话、CMS 数据接口都跑不了。要看完整效果用 `vercel dev`。

## 3. 环境变量

复制 `.env.example` 为 `.env.local`，按需填值。Vercel 上在 Project Settings → Environment Variables 配置同名变量。

| 变量 | 必填 | 用途 |
|---|---|---|
| `WECHAT_TOKEN` | 公众号启用时必填 | 公众号签名验证 Token |
| `WX_APPID` | 菜单同步必填 | 公众号 AppID |
| `WX_SECRET` | 菜单同步必填 | 公众号 AppSecret |
| `DASHSCOPE_API_KEY` | AI 对话必填 | 阿里云 DashScope API Key |
| `BLOB_READ_WRITE_TOKEN` | 关键词/Blob 数据必填 | Vercel Blob 读写令牌 |
| `CMS_ADMIN_PASSWORD` | 管理后台必填 | 管理后台访问密码 |

## 4. 部署

### 推荐：git push 触发 GitHub Actions 自动部署

```bash
git add .
git commit -m "feat: ..."
git push origin main
```

推到 `main` 后 [.github/workflows/vercel.yml](.github/workflows/vercel.yml) 自动触发 Vercel 部署。

> **不要用 Vercel CLI 手动部署**。Windows 上 Vercel CLI 有 bug，会导致 2700+ HTML 文件部署不完整，CSS/JS 缺失。这是项目记忆里反复验证过的教训。

### GitHub Secrets 需配置

- `VERCEL_TOKEN` —— 从 https://vercel.com/account/tokens 获取
- `VERCEL_ORG_ID` —— `vercel teams list` 获取
- `VERCEL_PROJECT_ID` —— `vercel projects list` 获取

### Cloudflare DNS

主域名 `www.ihangzhou.net` 通过 Cloudflare 解析到 Vercel。Cloudflare 缓存可能导致改动不立即生效（CSS/JS 通常几分钟生效，HTML 因为 `max-age=0` 应该立即生效）。

## 5. 项目结构与关键文件

```
ihangzhou-helper/
├── index.html               # 首页（3 栏目导航 + 8 工具 + 5 次级 + 分类网格）
├── travel.html              # i杭州玩（6 个分区 tab + 博物馆入口）
├── food.html                # i杭州吃
├── articles.html            # i杭州人（160+ 文章搜索）
├── museum.html              # 博物馆专题
├── district.html            # 13 区县
├── channel.html             # 频道聚合页（?ch=chId）
├── place.html               # 地点详情（?id=placeId）
├── banshi.html              # 办事频道
├── traffic.html             # 出行频道
├── coffee.html              # 咖啡频道
├── food.html                # 美食频道
├── history.html            # 历史频道
├── internet.html            # 互联网频道
├── laozihao.html            # 老字号频道
├── museum.html              # 博物馆频道
├── street.html              # 街道频道
├── traffic.html             # 交通频道
├── weekend.html             # 周末频道
├── zhaopin.html             # 招聘频道
├── celebrity.html           # 名人频道
├── articles/                # 160+ 篇本地文章
│   └── index.json           # 文章索引
├── api/                     # Vercel Serverless Functions
│   ├── wechat.js             # 公众号回调（核心！）
│   ├── content.js            # CMS 内容
│   ├── chat.js               # AI 对话
│   ├── districts.js          # 区县数据
│   ├── places.js             # 地点数据
│   ├── tools.js              # 工具数据
│   ├── news.js               # 资讯
│   ├── hospital.js           # 医院查询
│   └── wx-jsapi.js           # 微信 JSAPI 签名
├── data/                    # 内容数据源
│   ├── cms.json              # 主 CMS（含 wechatKeywords/wechatMenu/channels/districts 等）
│   ├── places.json           # 景点数据
│   ├── services.json         # 服务数据
│   └── stats.json            # 统计
├── css/style.css            # 全局样式（暗色 + 老人模式 + 响应式）
├── js/app.js                # 前端交互
├── sw.js                    # Service Worker
├── gen-places.js             # 景点详情页生成脚本
├── gen-channels.js          # 频道页生成脚本
├── vercel.json              # Vercel 部署配置
├── manifest.json            # PWA 清单
├── sitemap.xml              # 站点地图
└── robots.txt               # 爬虫规则
```

## 6. 常见编辑任务

### 6.1 改公众号关键字
编辑 [data/cms.json](data/cms.json#L4686) 的 `wechatKeywords` 数组。type=`news` 用 title/desc/picUrl/url；type=`text` 用 reply。aliases 是同义词数组，会做精确 + 包含匹配。部署后立即生效。

### 6.2 改公众号菜单
编辑 [data/cms.json](data/cms.json) 的 `wechatMenu.button`。调用 `POST /api/wechat?action=syncMenu`（Header `Authorization: Bearer <CMS_ADMIN_PASSWORD>`）触发同步。

> ⚠️ 订阅号可能返回 48001 错误（无菜单 API 权限），这种情况只能在公众号后台手动配置。

### 6.3 加新文章
1. 在 `articles/` 对应系列目录创建 `slug.html`
2. 在 [articles/index.json](articles/index.json) 加索引项：`{ slug, title, cat, summary, words }`
3. articles.html 会自动加载

### 6.4 加新景点
1. 在 [data/places.json](data/places.json) 加 place 对象
2. 运行 `node gen-places.js` 重新生成 `place/{id}.html`

### 6.5 改首页布局
[index.html](index.html) 是手写 HTML，没有模板引擎。改完同步更新 `css/style.css?v=YYYYMMDDa` 和 `sw.js` 的 `CACHE_NAME = 'ihangzhou-vXX'` 版本号，否则 CDN/SW 缓存会卡住改动。

### 6.6 改暗色模式色值
在 [css/style.css](css/style.css) 搜索 `:root[data-theme="dark"]`。

## 7. 必读的踩坑记录

下面这些是项目记忆里反复验证过的坑，**不要重蹈覆辙**：

### 7.1 部署相关
- **不要用 Vercel CLI 在 Windows 上部署**，2700+ HTML 文件会部署不全。统一用 `git push`。
- **Vercel 文件系统只读**（除 /tmp）。反馈数据写 `/tmp/feedbacks.json` 兜底，正式数据入 Vercel Blob。
- **node:url.parse() 已废弃**，会触发安全告警。改用 WHATWG URL API（`new URL()`）。

### 7.2 公众号相关
- **微信 AI 优先级高于服务器回复**。强行改文本兜底无效。未匹配消息保留 `transfer_biz_ai_ivr` 转接 AI。
- **公众号菜单与消息推送互斥**。启用消息推送后，后台手动配置的菜单会失效，必须走 API 管理（`wechatMenu`）。
- **菜单 API 48001**：未认证订阅号无菜单 API 权限，无法通过 `syncMenu` 同步，只能后台手动配置。

### 7.3 前端相关
- **外链必须用原生 `<a href target="_blank">`**。`window.open` 或动态创建 `<a>` 在移动浏览器 / PWA 模式下会被拦截。
- **#cityDropdown 不能作为 #citySelect 的子元素**。会导致事件冒泡问题。必须是 `.city-wrap` 下的兄弟元素。
- **.city-dropdown 不要用 `left:12px; right:12px`**，宽度会塌到 30-40px 只显示一个区。改用 `min-width: 280px; width: max-content`。
- **双 padding 会撑爆反馈表单**。`.fb-form` 和 `.modal-body` 不要同时设 padding，否则布局变形。
- **顶层容器桌面端 max-width: 960px**（不是 720px，720 太窄）。`body > .topbar` 和 `body > .page` 都要设。

### 7.4 API Key 安全
- **泄露的 API Key 必须立即吊销并重新生成**。
- **API Key 只能存环境变量**，不能硬编码、不能提交到仓库。
- **环境变量改动后必须重新部署**才生效。

## 8. 调试技巧

### 8.1 公众号本地调试
1. 用 `vercel dev` 启动（端口 3000）
2. 用 ngrok / cpolar 暴露本地端口到公网
3. 公众号后台 → 服务器配置 → URL 填 ngrok 地址 `/api/wechat`
4. Token 与 `.env.local` 的 `WECHAT_TOKEN` 一致

### 8.2 看生产日志
Vercel Dashboard → 项目 → Logs。`api/wechat.js` 的 `console.error` 会出现在这里。

### 8.3 Service Worker 不更新
Chrome DevTools → Application → Service Workers → 勾选 "Update on reload"。或者直接 Unregister 后刷新。

### 8.4 文章搜索失效
检查 `articles/index.json` 是否合法 JSON（`node -e "require('./articles/index.json')"` 验证）。articles.html 的 fetch 路径是 `articles/index.json?t=时间戳`，CDN 不缓存。

## 9. 不动清单

下面这些不要乱动，动了会破坏现有功能：

- `articles/` 下偏离定位的文章文件（学习提升/驾考停车等）—— 保留做 SEO 长尾入口，只在 articles.html 不显眼
- travel.html 的 5 个 section 结构（lake/town/flower/temple/night）—— 对 SEO 有用，保留
- `transfer_biz_ai_ivr` 兜底逻辑 —— 微信 AI 优先级高，改文本无效
- `wechatMenu` 结构 —— 订阅号可能无 API 权限，保留现状
- `?v=` 版本号机制 —— 不要去掉，CDN/SW 缓存会卡住
- 顶层容器 `max-width: 960px` —— 不要改回 720px，太窄

## 10. 常用命令速查

```bash
# 部署
git push origin main

# 校验 JSON
node -e "require('./data/cms.json')"
node -e "require('./articles/index.json')"

# 重新生成景点详情页
node gen-places.js
node gen-channels.js

# 检查外链
node check-links.js
python check-urls.py

# 本地预览
python -m http.server 8080
vercel dev
```

## 11. 联系与交接

- 仓库：[haopdf/ihangzhou-helper](https://github.com/haopdf/ihangzhou-helper)
- 域名：www.ihangzhou.net
- 公众号：iHangzhou
- 部署：Vercel 项目（个人账号，非团队账号）
- DNS：Cloudflare
