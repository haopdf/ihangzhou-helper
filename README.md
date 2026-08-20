# iHangzhou · 杭州生活助手

> 杭州人的数字生活工具箱 —— 政务办事、交通出行、民生服务一站导航
>
> 🌐 官方域名：**ihangzhou.net**

纯静态站点，零后端依赖，支持 PWA 离线访问，可直接部署到任意静态托管平台。

## ✨ 功能特性

### 核心功能
- **快捷工具**：限行查询、社保、公积金、公交地铁、天气、油价、快递、医院挂号
- **政务办事**：身份证、居住证、落户、出入境、社保、公积金、市民卡、健康证、发票抽奖、补贴汇总
- **交通出行**：限行、违章、公交、地铁、公共自行车、火车票、机票、停车、春运攻略
- **民生服务**：水电燃气缴费、宽带、医院挂号、疫苗、药店、快递、家政、电影、彩票
- **教育就业**：中考高考、学区查询、学历认证、招聘信息、求职补贴、公考
- **旅游休闲**：西湖、钱塘江大潮、灵隐寺、宋城、西溪湿地、千岛湖、龙井茶、露营、马拉松
- **便民工具**：常用电话簿（一键复制）、邮政编码、个税/房贷/社保计算器、万年历、身份证校验、车牌归属查询

### 用户体验
- **热门搜索**：对标本地宝，提供热门关键词快捷标签
- **全局搜索**：输入关键词快速定位服务
- **PWA 支持**：可安装到手机桌面，支持离线访问
- **暗色模式**：支持明暗主题切换，偏好本地存储
- **响应式设计**：移动端优先，完美适配手机/平板/桌面

## 📁 项目结构

```
ihangzhou-helper/
├── index.html          # 主页面（含 PWA 注册、SEO meta）
├── manifest.json       # PWA 应用清单
├── sw.js               # Service Worker（离线缓存）
├── css/
│   └── style.css       # 样式表（含暗色模式、响应式）
├── js/
│   └── app.js          # 交互逻辑（搜索、Tab、计算器、模态框等）
├── data/
│   └── services.json   # 服务数据配置（所有内容集中管理）
├── assets/
│   └── icons/          # 图标资源目录
└── README.md           # 项目说明
```

## 🚀 本地预览

### 方式一：直接打开

双击 `index.html` 即可在浏览器中打开。

> 注意：PWA Service Worker 需要 HTTP 环境，直接打开时 SW 不会注册，但其他功能正常。

### 方式二：本地 HTTP 服务器（推荐）

```bash
# Python 3
cd ~/PycharmProjects/ihangzhou-helper
python3 -m http.server 8080

# 或 Node.js
npx serve .

# 或 PHP
php -S localhost:8080
```

然后访问 http://localhost:8080

## 🌐 部署到 ihangzhou.net

### 方案一：Vercel + 自定义域名（推荐）

**最适合国内访问，免费且支持 HTTPS**

1. 登录 [vercel.com](https://vercel.com)，用 GitHub 账号授权
2. 点击「New Project」→ 导入仓库
3. Framework Preset 选 `Other`，Build Command 留空，Output Directory 填 `.`
4. 点击「Deploy」，获得 `https://ihangzhou-xxx.vercel.app`
5. **绑定 ihangzhou.net 域名**：
   - Vercel 控制台 → Settings → Domains
   - 输入 `ihangzhou.net`，点击 Add
   - 再添加 `www.ihangzhou.net`，设置为重定向到 `ihangzhou.net`
   - 在域名服务商将 DNS 解析指向 Vercel：
     ```
     A    @     76.76.21.21
     CNAME www   cname.vercel-dns.com
     ```
   - 等待 DNS 生效（通常几分钟到几小时），Vercel 自动签发 SSL 证书

### 方案二：Cloudflare Pages + 自定义域名

1. 登录 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 「Create a project」→ 「Connect to Git」→ 选择仓库
3. Build command 留空，Build output directory 填 `/`
4. 部署后获得 `https://ihangzhou.pages.dev`
5. **绑定 ihangzhou.net 域名**：
   - Cloudflare Pages 控制台 → Custom domains
   - 点击「Set up a custom domain」
   - 输入 `ihangzhou.net`
   - 如果域名已在 Cloudflare 管理，自动配置 DNS
   - 如果不在 Cloudflare，添加 CNAME 记录：`CNAME @ ihangzhou.pages.dev`

### 方案三：GitHub Pages + 自定义域名

1. 登录 [GitHub](https://github.com)，新建仓库
2. 上传代码：
   ```bash
   cd ~/PycharmProjects/ihangzhou-helper
   git init
   git add .
   git commit -m "init: iHangzhou 杭州生活助手"
   git remote add origin https://github.com/你的用户名/ihangzhou.git
   git branch -M main
   git push -u origin main
   ```
3. 进入仓库 → 「Settings」→ 「Pages」
4. Source 选择 `Deploy from a branch`，Branch 选择 `main` / `(root)`
5. **绑定 ihangzhou.net 域名**：
   - 在仓库根目录创建 `CNAME` 文件（无扩展名），内容为 `ihangzhou.net`
   - Settings → Pages → Custom domain 填入 `ihangzhou.net`
   - 勾选「Enforce HTTPS」
   - 在域名服务商添加解析：
     ```
     A    @     185.199.108.153
     A    @     185.199.109.153
     A    @     185.199.110.153
     A    @     185.199.111.153
     CNAME www   你的用户名.github.io
     ```

### 方案四：Gitee Pages + 自定义域名

1. 登录 [Gitee](https://gitee.com)，新建仓库
2. 上传代码：
   ```bash
   git remote add origin https://gitee.com/你的用户名/ihangzhou.git
   git push -u origin master
   ```
3. 仓库 → 「服务」→ 「Gitee Pages」→ 启动
4. **绑定 ihangzhou.net 域名**（需 Gitee Pages Pro）：
   - Gitee Pages 设置页 → 自定义域名
   - 填入 `ihangzhou.net`
   - 在域名服务商添加 CNAME：`CNAME @ 你的用户名.gitee.io`

### 方案五：对象存储 + CDN（适合高流量）

**阿里云 OSS + CDN 部署**

1. 创建 OSS Bucket，读写权限设为「公共读」
2. 上传所有静态文件到 Bucket 根目录
3. Bucket → 基础设置 → 静态页面 → 默认首页设为 `index.html`
4. 绑定自定义域名 `ihangzhou.net`：
   - OSS → 传输管理 → 域名管理 → 绑定域名
   - 开启 CDN 加速
   - 在域名服务商添加 CNAME：`CNAME @ 你的Bucket的CDN域名`
5. 配置 HTTPS：在 CDN 控制台申请免费 SSL 证书

## 📱 PWA 安装

iHangzhou 支持作为 PWA 应用安装到手机桌面：

1. 用手机浏览器访问 `https://ihangzhou.net`
2. **iOS Safari**：点击分享按钮 → 「添加到主屏幕」
3. **Android Chrome**：点击菜单 → 「添加到主屏幕」或「安装应用」
4. 安装后可像原生 App 一样全屏运行，支持离线访问核心页面

### PWA 技术细节

- `manifest.json`：应用名称、图标、主题色等元数据
- `sw.js`：Service Worker，负责静态资源缓存和离线访问
- 首次访问时自动缓存核心资源（HTML/CSS/JS）
- 再次访问时优先使用缓存，后台静默更新
- 离线状态下仍可浏览已缓存的页面

## 🔧 内容修改

所有服务数据集中在 `js/app.js` 的 `DATA` 对象中，修改后重新部署即可生效。

### 添加新服务

在 `js/app.js` 中对应分类的 `items` 数组添加：

```javascript
{ name: "服务名称", desc: "简短描述", url: "https://官方网址" }
```

### 添加内置工具

1. 在分类 `items` 中设置 `"action": "工具标识"`
2. 在 `handleAction` 函数中添加对应 case
3. 实现对应的展示函数（如 `showXxx()`）

### 修改热门搜索词

编辑 `js/app.js` 中 `DATA.hotKeywords` 数组。

## 📱 公众号集成

将 `https://ihangzhou.net` 配置到公众号菜单：

1. 登录 [微信公众平台](https://mp.weixin.qq.com)
2. 「内容与互动」→ 「自定义菜单」
3. 添加菜单，菜单内容选「跳转网页」，填入 `https://ihangzhou.net`
4. 手机端微信打开即可使用（页面已做移动端适配）

> 建议在公众号文章中嵌入网址链接，引导用户「在浏览器中打开」以获得最佳体验（含 PWA 安装功能）。

## 📊 访问统计（可选）

添加免费统计代码：

- [百度统计](https://tongji.baidu.com)：国内访问数据准确
- [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)：免费、无cookie、隐私友好
- [Umami](https://umami.is/)：可自部署的开源统计

在 `index.html` 的 `</head>` 前插入统计代码即可。

## 🔄 更新部署

代码推送到 Git 仓库后：
- **Vercel / Cloudflare Pages**：自动触发部署，无需操作
- **GitHub Pages**：自动部署，1-2 分钟生效
- **Gitee Pages**：需手动点击「更新」
- **对象存储**：需手动上传更新后的文件

> 更新部署后，PWA 会在用户下次访问时自动更新缓存（Service Worker 版本号递增触发更新）。

## ⚠️ 免责声明

- 本项目为公益导航平台，所有外部服务链接均指向官方渠道
- 限行规则、油价、天气等数据仅供参考，实际以官方最新公告为准
- 个税、房贷、社保计算器结果为估算值，不构成专业建议
- 身份证号校验仅在本地进行格式验证，不会上传任何数据
- 本项目不存储任何用户数据

## 📄 License

MIT License - 可自由使用、修改、分发。
