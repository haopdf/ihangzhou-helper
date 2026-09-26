# iHangzhou · 杭州生活助手

> 🌐 官方域名：**www.ihangzhou.net**
>
> 📱 公众号：iHangzhou（本仓库同时作为公众号自动回复后台）

iHangzhou 是一个**双重身份**项目：

1. **独立网站** —— 杭州人的数字生活工具箱 + 本地内容合集
   - 工具入口：限行 / 天气 / 地铁 / 社保 / 公积金 / 摇号 / 油价 ……
   - 内容栏目：i杭州玩（旅游） / i杭州吃（美食） / i杭州人（杭州故事 2700+ 篇本地深度文章）

2. **微信公众号后台** —— 关键词自动回复
   - 28 个关键词覆盖：数字快捷 / 日常工具 / 场景推荐 / 资讯查询
   - 未匹配消息转接微信 AI（transfer_biz_ai_ivr）

## ✨ 核心功能

### 网站端
- **首页 3 栏目入口**：i杭州玩 / i杭州吃 / i杭州人（对齐"发现杭州美好生活"定位）
- **8 个刚需快捷工具**：今日限行、天气预报、地铁时刻、违章查询、社保、公积金、今日油价、浙A摇号
- **13 区县导航 + 区县特色卡片**
- **全站搜索**：[articles.html](articles.html) 输入关键词即可在 2700+ 篇文章中检索
- **PWA 支持**：可安装到手机桌面，Service Worker 离线缓存
- **暗色模式 + 老人模式**：明暗主题切换、老人模式（大字号高对比）
- **响应式设计**：移动端优先，桌面端 max-width: 960px

### 公众号端（[/api/wechat.js](api/wechat.js)）
- **URL 验证 + 消息回调**：XML 解析、签名验证
- **28 个关键字**（[/data/cms.json](data/cms.json) wechatKeywords）：
  - 数字快捷：1 限行 / 2 天气 / 3 地铁 / 4 公积金 / 5 社保
  - 日常工具：限行 / 天气 / 地铁 / 公积金 / 社保 / 摇号 / 居住证 / 消费券 / 落户
  - 场景推荐：周末 / 下雨 / 拍照 / 亲子 / 夜景 / 赏花 / 古镇 / 寺庙 / 西湖 / 美食 / 博物馆
  - 资讯查询：故事 / 区县 / 搜索
- **欢迎语分组列出全部指令**（[wechat.js DEFAULT_WELCOME](api/wechat.js#L10)）
- **帮助指令**：回复「帮助 / ? / ?」分组列出可用关键字
- **未匹配兜底**：转接微信 AI（transfer_biz_ai_ivr）
- **关键词数据**：Vercel Blob 独立存储 `wechat-keywords.json`，10s 缓存

## 📁 项目结构

```
ihangzhou-helper/
├── index.html              # 首页（工具入口 + 3 栏目导航）
├── travel.html             # i杭州玩（西湖/古镇/赏花/寺庙/夜景 + 博物馆）
├── food.html               # i杭州吃
├── articles.html           # i杭州人（2700+ 篇文章搜索 + 分类）
├── museum.html             # 博物馆专题（从 travel.html tab 进入）
├── district.html           # 13 区县
├── channel.html            # 频道页（按分类聚合工具）
├── banshi.html / traffic.html / coffee.html / ...  # 频道子页
├── place.html              # 地点详情页（动态生成）
├── articles/               # 2700+ 篇本地文章（按系列分目录）
│   └── index.json          # 文章索引（标题/分类/摘要/字数）
├── api/                    # Vercel Serverless Functions
│   ├── wechat.js           # 公众号回调 + 关键词匹配 + 菜单同步
│   ├── content.js          # CMS 内容接口
│   ├── chat.js             # AI 对话（DASHSCOPE_API_KEY）
│   ├── districts.js        # 区县数据
│   ├── places.js          # 地点数据
│   ├── tools.js            # 工具数据
│   ├── news.js             # 资讯
│   ├── hospital.js         # 医院查询
│   └── wx-jsapi.js         # 微信 JSAPI 签名
├── data/                   # 内容数据源
│   ├── cms.json            # 主 CMS（含 wechatKeywords/wechatMenu/channels 等）
│   ├── places.json         # 景点数据
│   ├── services.json       # 服务数据
│   └── stats.json
├── css/style.css
├── js/app.js
├── sw.js                   # Service Worker
├── vercel.json             # 部署配置
└── .env.local              # 环境变量（不入库）
```

## 🚀 本地预览

```bash
# Python 3
python -m http.server 8080

# 或 Node.js
npx serve .
```

访问 http://localhost:8080

## 🌐 部署到 www.ihangzhou.net

### Vercel + GitHub 自动部署（推荐）

1. Vercel 导入 GitHub 仓库 [haopdf/ihangzhou-helper](https://github.com/haopdf/ihangzhou-helper)
2. Framework Preset：`Other` / Build Command：空 / Output：`.`
3. 绑定自定义域名 `www.ihangzhou.net`（Cloudflare DNS）
4. 配置环境变量（Vercel Dashboard → Settings → Environment Variables）：
   - `WECHAT_TOKEN` —— 公众号签名 Token
   - `WX_APPID` / `WX_SECRET` —— 公众号 AppID/Secret（菜单同步用）
   - `DASHSCOPE_API_KEY` —— AI 对话 API Key
   - `BLOB_READ_WRITE_TOKEN` —— Vercel Blob 读写令牌
   - `CMS_ADMIN_PASSWORD` —— 管理后台密码
5. `git push` 即自动部署

> ⚠️ Vercel CLI 在 Windows 上可能存在部署不完整的 bug，建议统一用 `git push` 触发自动部署。

## 🔑 公众号配置要点

- **服务器配置**：URL 填 `https://www.ihangzhou.net/api/wechat`，Token 与环境变量 `WECHAT_TOKEN` 一致
- **消息推送**：启用后公众号后台自定义菜单失效，需走 API 管理（[wechatMenu](data/cms.json)）
- **菜单同步**：调用 `/api/wechat?action=syncMenu` 同步 `wechatMenu` 配置
- **关键词数据**：默认读 `cms.json#wechatKeywords`；若 Blob 有 `wechat-keywords.json` 则优先读 Blob
- **菜单接口 48001**：未认证订阅号无菜单 API 权限，需后台手动配置

## 📝 内容编辑

### 新增文章
1. 在 `articles/` 对应系列目录创建 `*.html`
2. 在 [articles/index.json](articles/index.json) 增加索引项：`{ slug, title, cat, summary, words }`

### 修改景点数据
直接编辑 [data/places.json](data/places.json)，运行 `node gen-places.js` 重新生成 place 详情页

### 修改公众号关键字
直接编辑 [data/cms.json](data/cms.json#L4686) 的 `wechatKeywords` 数组，部署后即生效

**批量新增关键词**（适合一次性添加多个）：
```bash
curl -X POST 'https://www.ihangzhou.net/api/content' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ihangzhou2024' \
  -d '{"type":"wechatKeywordsBatch","data":{"keywords":[...]}}'
```
详见 [API 文档](docs/API.md) | [可视化管理后台](/admin/)

## 🛠 开发约定

- **HTML/JS/CSS/SW** 文件 `Cache-Control: max-age=0, must-revalidate`，避免 CDN 缓存
- **静态资源版本号**：`?v=YYYYMMDDa` 形式，每次改动递增
- **Service Worker 版本**：静态资源更新时同步递增 sw.js 中的版本号
- **外链**：使用原生 `<a href="url" target="_blank">` 标签，避免移动浏览器弹窗拦截
- **主域名**：`www.ihangzhou.net`（canonical/og:url/al:web:url 同步）

## 📜 License

MIT
