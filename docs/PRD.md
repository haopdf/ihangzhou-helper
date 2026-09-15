# iHangzhou 杭州生活助手 · 产品需求文档（PRD）

> 版本：v3.0 · 双重身份版
> 日期：2026-09-14
> 域名：www.ihangzhou.net
> 公众号：iHangzhou（本仓库同时作为公众号自动回复后台）

---

## 一、产品定位

iHangzhou 是一个**双重身份**项目，同时承担两个角色：

### 角色 A：独立网站（www.ihangzhou.net）
杭州人的数字生活工具箱 + 本地内容合集。聚合政务办事、交通出行、民生服务等**高频刚需工具入口**，同时沉淀本地内容（旅游、美食、人物故事）。

### 角色 B：微信公众号自动回复后台
通过 `/api/wechat` 接收公众号消息，按 28 个关键字匹配场景化图文回复；未匹配消息转接微信 AI（`transfer_biz_ai_ivr`）。

### 核心价值
- **官方可信**：所有外链指向 .gov.cn / 官方品牌域
- **场景驱动**：内容按"周末去哪/下雨天/拍照/亲子"组织，而非"百科分类"
- **搜索为主**：34 个文章分类不强制浏览，默认折叠到搜索 + 8 高频 tab
- **离线可用**：PWA Service Worker 离线缓存核心静态资源

### 与同类产品的差异

| 维度 | 本地宝 | 19楼 | iHangzhou |
|---|---|---|---|
| 内容驱动 | 编辑团队日更资讯 | UGC 论坛 | 工具入口 + 长尾内容沉淀 |
| 商业模式 | 广告 + 导流分成 | 广告 + 商家 | 公益导航，无广告 |
| 后端依赖 | 重后端 CMS | 重后端 | Vercel Serverless + Blob |
| 公众号 | 独立内容团队运营 | 独立运营 | 同仓库即公众号后台 |

---

## 二、信息架构

### 2.1 顶层导航

```
iHangzhou
├── 首页（index.html）
│   ├── 顶部栏：区县切换 + 搜索 + 老人模式 + 主题
│   ├── 今日杭州（4 张实时卡：限行/天气/油价/金价）
│   ├── 当前区县特色卡片
│   ├── 杭州13区县入口
│   ├── 3 大栏目导航（i杭州玩/吃/人）
│   ├── 8 个刚需快捷工具
│   ├── 5 个常用次级工具
│   ├── 分类 Tab + 服务网格
│   └── 底部 Tab（首页/工具/电话/我的）
├── i杭州玩（travel.html）
│   ├── 西湖十景 / 古镇 / 赏花四季 / 寺庙古塔 / 夜景灯光 / 博物馆
├── i杭州吃（food.html）
├── i杭州人（articles.html，160+ 篇本地文章搜索）
├── 频道页（channel.html#chId）
├── 区县页（district.html）
├── 地点详情（place.html?id=）
└── 文章详情（articles/slug.html）
```

### 2.2 三大栏目定位

| 栏目 | 入口 | 内容形态 | 商业路径 |
|---|---|---|---|
| i杭州玩 | travel.html | 西湖十景 / 古镇 / 赏花 / 寺庙 / 夜景 / 博物馆 6 个分区 | 民宿 / 亲子 / 文旅合作 |
| i杭州吃 | food.html | 杭帮菜 / 老字号 / 地道小店 / 美食地图 | 餐饮探店 |
| i杭州人 | articles.html | 160+ 篇本地深度文章，按场景搜索 | 内容沉淀 / SEO 长尾 |

### 2.3 8 个刚需快捷工具（首页 quick-nav）

| 1 今日限行 | 2 天气预报 | 3 地铁时刻 | 4 违章查询 |
|---|---|---|---|
| 5 社保查询 | 6 公积金 | 7 今日油价 | 8 浙A摇号 |

### 2.4 5 个次级工具

个税计算 · 找工作 · 公租房 · 房贷计算 · 公积金提取

---

## 三、公众号后台

### 3.1 接口架构

```
微信用户 → 公众号 → POST https://www.ihangzhou.net/api/wechat
                                  ↓
                          [api/wechat.js]
                                  ↓
            ┌─────────────────┬──────────────────┐
            ↓                 ↓                  ↓
       签名验证          关键词匹配         菜单同步（POST ?action=syncMenu）
            ↓                 ↓                  ↓
       URL 验证         命中 → 图文/文本      调微信 OpenAPI
                          ↓
                    未命中 → transfer_biz_ai_ivr
```

### 3.2 关键词分组（共 28 个）

| 分组 | 关键字 |
|---|---|
| 数字快捷（5） | 1限行 / 2天气 / 3地铁 / 4公积金 / 5社保 |
| 日常工具（9） | 限行 / 天气 / 地铁 / 公积金 / 社保 / 摇号 / 居住证 / 消费券 / 落户 |
| 场景推荐（11） | 周末 / 下雨 / 拍照 / 亲子 / 夜景 / 赏花 / 古镇 / 寺庙 / 西湖 / 美食 / 博物馆 |
| 资讯查询（3） | 故事 / 区县 / 搜索 |

> 关键字数据：`data/cms.json#wechatKeywords`，运行时优先从 Vercel Blob 读 `wechat-keywords.json`（10s 缓存），无 Blob 时降级到本地 JSON。

### 3.3 帮助指令
回复「帮助 / ? / ?」分组列出全部 28 个关键字。

### 3.4 未匹配兜底
直接返回 `<MsgType>transfer_biz_ai_ivr</MsgType>`，由微信公众号 AI 接管。**不要改成纯文本兜底**——根据项目记忆，微信 AI 优先级高于服务器回复，强行改文本可能无效。

---

## 四、技术架构

### 4.1 技术栈

| 层 | 技术 |
|---|---|
| 前端 | 原生 HTML5 + CSS3（CSS Variables 暗色模式）+ 原生 JavaScript |
| 后端 | Vercel Serverless Functions（Node.js） |
| 存储 | Vercel Blob（关键词数据 + 反馈数据，读写 /tmp 兜底） |
| AI | 阿里云 DashScope（qwen-turbo） |
| PWA | manifest.json + sw.js（HTML/CSS/JS 网络优先，图片缓存优先） |
| 部署 | Vercel + GitHub Actions 自动部署 |
| CDN | Cloudflare（DNS 解析 + 缓存） |

### 4.2 Serverless API 列表（/api/）

| 端点 | 功能 |
|---|---|
| `/api/wechat` | 公众号回调（签名/消息/菜单同步） |
| `/api/content` | CMS 内容查询 |
| `/api/chat` | AI 对话（DashScope） |
| `/api/districts` | 区县数据 |
| `/api/places` | 地点数据 |
| `/api/tools` | 工具数据 |
| `/api/news` | 资讯 |
| `/api/hospital` | 医院查询 |
| `/api/wx-jsapi` | 微信 JSAPI 签名（用于页面调用微信 SDK） |

### 4.3 关键路由（vercel.json）

- `/api/*` → `Cache-Control: no-store`
- `*.html` / `sw.js` / `/js/*` / `/css/*` → `Cache-Control: max-age=0, must-revalidate`
- `/sitemap.xml` → `max-age=3600`

### 4.4 缓存策略

| 资源 | 策略 |
|---|---|
| HTML / JS / CSS / SW | 网络优先，每次请求都回源（CDN 不缓存） |
| 图片 | Service Worker 缓存优先 |
| API 响应 | 永不缓存（no-store） |
| 关键词数据 | 10s 内存缓存（减少 Blob 调用） |
| Access Token | 2h 内存缓存（微信 API 限频） |

---

## 五、视觉设计

### 5.1 主色
- 主色：杭州蓝 `#0ea5e9`（sky-500）
- 辅色：西湖绿 `#10b981`、运河红 `#ef4444`
- 字体：`-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`

### 5.2 响应式

| 断点 | 宽度 | 布局 |
|---|---|---|
| Mobile | < 768px | 单列，顶栏全宽 |
| Desktop | ≥ 768px | `.topbar` 和 `.page` 居中 `max-width: 960px` + 16px 侧边距 |

### 5.3 暗色模式

| 元素 | 浅色 | 深色 |
|---|---|---|
| 背景 | `#f8fafc` | `#0f172a` |
| 卡片 | `#fff` | `#1e293b` |
| 文字 | `#0f172a` / `#64748b` | `#f1f5f9` / `#94a3b8` |

### 5.4 老人模式
- 触发：localStorage `ihz_elderly=true`
- 效果：字号 +2px、对比度增强、按钮 padding 增大、加粗选中态
- 入口：顶栏 `👵 老人` 按钮（首页 + 5 个专题页 + 频道页）

---

## 六、内容治理

### 6.1 文章系统

- 目录：`articles/`（按系列编号子目录）
- 索引：`articles/index.json`，字段 `{ slug, title, cat, summary, words }`
- 分类：34 个系列，articles.html 默认只显前 8 个高频 + "更多分类"按钮
- 搜索：articles.html 顶部独立搜索框，支持 `?q=` URL 参数自动搜索
- 偏离定位的文章（学习提升/驾考停车/法律维权/科技发展）保留文件，仅在列表不显眼

### 6.2 景点数据（places.json）

字段：id / name / district_id / category / tags / address / lat / lng / cover / summary / content / open_time / ticket / recommend_level / best_season / tips / seo_title / seo_desc

通过 `node gen-places.js` 生成 `place/{id}.html` 详情页。

### 6.3 公众号关键字编辑

直接修改 `data/cms.json#wechatKeywords` 数组，部署后即生效。每项字段：

```json
{
  "keyword": "周末",
  "aliases": ["周末去哪", "周末玩什么"],
  "type": "news",
  "title": "🏞️ 杭州周末去哪",
  "desc": "...",
  "picUrl": "https://www.ihangzhou.net/images/og-cover.jpg",
  "url": "https://www.ihangzhou.net/travel.html"
}
```

type 取值：`news`（图文）/ `text`（纯文本，用 `reply` 字段）

---

## 七、SEO

- 主域名：`www.ihangzhou.net`（canonical / og:url / al:web:url 同步）
- sitemap.xml 提交百度 / Google / Bing 站长平台
- 每个专题页 / 文章页独立 meta description + OpenGraph
- 结构化数据：WebSite Schema + BreadcrumbList（channel.html）

---

## 八、路线图

### v3.0（当前 · 2026 Q3，已完成）
- ✅ 双重身份：网站 + 公众号后台同仓库
- ✅ 3 大栏目定位：i杭州玩 / 吃 / 人
- ✅ 28 个公众号关键字分组
- ✅ 13 区县 + 区县特色卡片
- ✅ PWA + 暗色模式 + 老人模式
- ✅ 160+ 篇本地文章 + 全站搜索

### v3.1（2026 Q4 规划）
- 🔜 places.json 加场景字段（rain_ok / photo_friendly / family_friendly）
- 🔜 travel.html 加场景快速入口 chip（下雨/拍照/亲子/夜晚/免费）
- 🔜 公众号导流：文章页底部加二维码

### v4.0（2027 规划）
- 🔜 公众号文章同步到网站
- 🔜 用户反馈数据后台化
- 🔜 推送通知（政策更新/限行提醒）

---

## 九、风险与约束

| 风险 | 影响 | 缓解 |
|---|---|---|
| Vercel CLI Windows bug | 部署不完整 | 统一用 `git push` 触发自动部署 |
| Vercel 文件系统只读 | 反馈数据无法写 | 写入 `/tmp/feedbacks.json` 兜底，正式数据入 Blob |
| 微信 AI 优先级高于服务器回复 | 关键词匹配不准时被 AI 接管 | 保持 28 个关键字匹配准确 |
| 订阅号无菜单 API 权限（48001） | 菜单无法 API 同步 | 后台手动配置 |
| CDN 缓存导致改动不生效 | 用户看不到最新版 | 静态资源 `?v=` 版本号 + `max-age=0` |
| 外链失效 | 用户点击 404 | `check-links.js` 季度巡检 |

---

## 附录

### A. 文件快速索引

| 想做的事 | 看哪里 |
|---|---|
| 改首页布局 | `index.html` |
| 改公众号关键字 | `data/cms.json#wechatKeywords` |
| 改公众号菜单 | `data/cms.json#wechatMenu` |
| 改欢迎语 | `api/wechat.js` DEFAULT_WELCOME 或 `data/cms.json#wechatWelcome` |
| 改帮助指令 | `api/wechat.js` genHelpReply |
| 改暗色模式色值 | `css/style.css` `:root[data-theme="dark"]` |
| 改 PWA 缓存 | `sw.js` CACHE_NAME + CACHE_URLS |
| 加新文章 | `articles/` + `articles/index.json` |
| 加新景点 | `data/places.json` + `node gen-places.js` |
| 加新工具 | `js/app.js` DATA + `handleAction` |

### B. 环境变量清单

| 变量 | 用途 |
|---|---|
| `WECHAT_TOKEN` | 公众号签名 Token |
| `WX_APPID` / `WX_SECRET` | 公众号 AppID/Secret（菜单同步用） |
| `DASHSCOPE_API_KEY` | AI 对话 API Key |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 读写令牌 |
| `CMS_ADMIN_PASSWORD` | 管理后台密码 |
