# iHangzhou 升级为真正的杭州地方门户实施计划

## Context（背景与目标）

**当前状态（P0 已完成）**：iHangzhou 已具备完整的导航骨架——22 大分类、100+ 办事条目、8+5 顶部工具、3 个 API（gold/forex/yaohao）、PWA + Service Worker、4 个底部页面（首页/工具/电话/我的）。

**痛点**：当前站点更像"链接导航枢纽"而非"地方门户"。差距：
1. 首页只有 2 条静态 news-banner，缺少"今日杭州"实时信息流（每天打开都该有新内容）
2. 高频办事条目（社保/公积金/落户/摇号）只链接到政府网站，没有指南内容
3. 杭州特色频道（西湖十景/灵隐禅宗/钱塘江大潮/良渚古城）只是入口链接，未呈现深度指南
4. 缺少医院/地铁等高频查询工具的 API 化升级

**目标**：升级为真正的杭州地方门户，让"导航 + 指南"名副其实。

---

## 实施方案（4 个 P1 工作流）

按"价值/工作量比"排序实施，每完成一个即可独立发布。

### Workstream D：新增便民 API 与工具（先做 · 价值高 · 风险低）

**新建文件**（3 个 Vercel Serverless，沿用 `api/gold.js` 模式）：

1. **`api/hospital.js`** — 杭州三级医院静态目录
   - 响应：`{ updated, hospitals: [{name, alias, level, area, address, phone, regUrl, key[]}] }`
   - 12 家：浙一/浙二/邵逸夫/省人医/市一/儿保/省中/市中/省肿瘤/省口腔/市妇产/市儿
   - 缓存 `s-maxage=86400`（1 天）

2. **`api/metro.js`** — 杭州地铁首末班车（替换 `showMetro` 内联数组）
   - 响应：`{ updated, lines: [{name, color, first, last, transfer[]}], fare: {base, max, rule} }`
   - 12 条线 1-19 号线 + 票价规则
   - 缓存 `s-maxage=604800`（1 周）

3. **`api/news.js`** — 杭州本地资讯聚合
   - 上游：`hangzhou.gov.cn` 政策栏目解析；失败时回退静态 5 条政策
   - 响应：`{ updated, source, items: [{title, summary, url, tag}] }`
   - 缓存 `s-maxage=1800`（30 分钟）

**`js/app.js` 修改**：
- 新增 `showHospital()`（沿用模式 A，`#hospitalBox` 占位 + fetch 回填）
- 改造 `showMetro()` 从内联数据改为 `fetch('/api/metro').then(...)`，失败回退原内联数组
- 新增 `window.showHospital` 全局暴露

### Workstream A：今日杭州实时信息流卡片（首页改造 · 视觉冲击最大）

**核心改造**：把现有 `showXianxing/showWeather/showYoujia/showGold` 中的"取数"层抽离为 getter 函数，让首页卡片和模态框共用同一份数据源。

**新增 getter（`js/app.js`）**：
```js
function getXianxingData() { /* 同步，返回 {dateStr, tail, isWeekend, area} */ }
function getYoujiaData()   { /* 同步，返回 { '92号':7.54, ... , updated } */ }
function getWeatherData()  { /* 异步 Promise，fetch wttr.in，失败返回 null */ }
function getGoldData()     { /* 异步 Promise，fetch /api/gold，失败返回 null */ }
```
原 `showXxx()` 改为 `var d = getXxxData(); openModal(...)`，签名与全局暴露不变。

**新增 `renderTodayHangzhou()`（`js/app.js`）**：渲染 4 张今日卡片到 `#todayHangzhou`：
- 限行卡（同步）：今日尾号 + 周末提示
- 天气卡（异步）：当前温度 + 描述 + 明日预报
- 油价卡（同步）：92 号油价
- 金价卡（异步）：黄金人民币/克

**`index.html` 修改**（L48-79）：
- 在 `.quick-nav` 之前插入 `<div class="today-hangzhou" id="todayHangzhou"></div>`
- 静态 news-banner（L70-79）改为 `<div class="news-banner" id="newsBanner" data-api="/api/news"></div>`，由新 `renderNewsBanner()` 异步拉取
- `app.js?v=20260910d` → `?v=20260914a`

**`css/style.css` 末尾追加**：
```css
.today-hangzhou { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; padding: 12px 14px; }
.th-card { background: var(--bg); border-radius: 12px; padding: 12px 10px; text-align: center; cursor: pointer; }
.th-card:active { transform: scale(.96); }
.th-icon { font-size: 22px; }
.th-title { font-size: 11px; color: var(--text-muted); }
.th-value { font-size: 18px; font-weight: 800; color: var(--primary); }
.th-sub { font-size: 11px; color: var(--text-secondary); }
@media (min-width: 768px) { .today-hangzhou { grid-template-columns: repeat(4, 1fr); } }
```

**`sw.js` 修改**：`ihangzhou-v13` → `ihangzhou-v14`（CSS 变更要 bump 版本）

### Workstream B：10 个高频办事攻略详情（内容填充）

**目标条目**（在 `js/app.js` DATA 中替换 `url:` 为 `detail:`）：

| # | 分类 | 条目 |
|---|---|---|
| 1 | banshi | 社保查询 |
| 2 | banshi | 公积金查询 |
| 3 | banshi | 公积金提取 |
| 4 | banshi | 人才落户 |
| 5 | banshi | 积分落户 |
| 6 | banshi | 居住证办理 |
| 7 | banshi | 身份证办理 |
| 8 | banshi | 护照办理 |
| 9 | housing | 公租房申请 |
| 10 | vehicle | 浙A摇号 |

**detail 模板**（统一结构）：
```html
<div class="guide-block">
  <h4>📋 办事指南</h4>
  <p>① 线上预约：浙里办 APP / 支付宝小程序<br>② 提交材料：扫描上传<br>③ 邮寄送达 / 现场领取</p>
</div>
<div class="guide-block"><h4>📑 所需材料</h4><p>• 身份证 • 居住证 • 申请表</p></div>
<div class="guide-block"><h4>🏢 办理地点</h4><p>具体地址</p></div>
<div class="guide-block"><h4>🌐 官方入口</h4>
  <a href="https://..." target="_blank" rel="noopener"
     style="display:inline-block;padding:10px 16px;background:var(--primary);
            color:#fff;border-radius:8px;text-decoration:none;font-size:13px;">前往办理 →</a>
</div>
<div class="guide-block"><h4>⏱ 时效 / 费用</h4><p>7 个工作日 / XX 元</p></div>
```

外链遵守项目硬约束：原生 `<a href target="_blank" rel="noopener">`，禁止 `window.open`。

### Workstream C：9 个杭州特色指南（内容填充）

**目标条目**（在 `js/app.js` DATA 中扩展 `detail:`）：
- 西湖十景（10 个景，重点做：断桥残雪/苏堤春晓/三潭印月/曲院风荷/雷峰夕照）
- 灵隐寺 / 法喜寺
- 钱塘江大潮（已有 detail，扩展每日潮时）
- 良渚古城（世界遗产）
- 阿里巴巴西溪园区
- 宋城千古情
- 西溪湿地

**detail 模板**：
```html
<p style="color:var(--text-secondary);line-height:1.8;">[200-400 字历史人文介绍]</p>
<div class="guide-block"><h4>🎯 主要看点</h4><p>• 看点1<br>• 看点2</p></div>
<div class="guide-block"><h4>🚇 交通</h4><p>地铁 X 号线 Y 站</p></div>
<div class="guide-block"><h4>🎫 门票</h4><p>成人 XX 元 / <a href="url" target="_blank">预约</a></p></div>
<div class="guide-block"><h4>📅 推荐时间</h4><p>X 月-Y 月，早/午/晚</p></div>
```

---

## 关键文件与改动范围

| 文件 | 改动 | 说明 |
|---|---|---|
| `api/hospital.js` | 新建 | 静态医院列表 |
| `api/metro.js` | 新建 | 静态地铁数据 |
| `api/news.js` | 新建 | 杭州资讯聚合（带回退） |
| `js/app.js` | 修改 | 新增 getter、`renderTodayHangzhou`、`renderNewsBanner`、`showHospital`；改造 4 个 `showXxx`；填充 19 条 `detail:` HTML |
| `index.html` | 修改 L48-79 | 插入 `#todayHangzhou`，news-banner 改为 API 驱动，bump JS 版本号 |
| `css/style.css` | 末尾追加 | `.today-hangzhou` `.th-card` 系列样式 |
| `sw.js` | 修改 L6 | `ihangzhou-v13` → `ihangzhou-v14` |

---

## 验证方法

1. **本地启动**：`cd d:\py-project\ihangzhou-helper && python -m http.server 8080`
2. **Workstream D**：`curl http://localhost:8080/api/hospital`、`/api/metro`、`/api/news` 检查 JSON 形状（Vercel Functions 需 `npx vercel dev`）；点击工具页"医院挂号"打开模态框，数据正确渲染
3. **Workstream A**：访问首页顶部出现 4 张今日卡片，限行/油价同步出值，天气/金价异步出值，超时有"—"回退；点击卡片打开对应模态框仍正常
4. **Workstream B/C**：点击服务卡片打开模态框，detail HTML 渲染正确，外链 `<a target="_blank">` 在微信内嵌打开为新页（与现有 `openUrl` 行为一致）
5. **SW 验证**：DevTools → Application → Service Workers，确认 v14 接管；硬重载后样式生效
6. **微信内嵌验证**：iOS/Android 微信打开站内任意外部链接，确认是当前页跳转而非被拦截

---

## 风险与对策

| 风险 | 对策 |
|---|---|
| SW 缓存旧 CSS 不刷新 | sw.js bump 到 v14 + index.html 版本号同步 |
| detail HTML 字符串中引号转义 | 外层用单引号 `'`，内部双引号转义 `\"` |
| `wttr.in` 在微信内嵌被拦 | `getWeatherData` 失败返回 null，卡片显示"—"，模态框仍可打开 |
| `api/news.js` 解析政府网失败 | 必须有 try/catch + 静态 5 条政策回退 |
| getter 重构破坏现有 showXxx | 保留原签名与全局暴露（`window.showXianxing` 等），只抽取数据层 |

---

## 实施顺序

1. **Workstream D**（API + showHospital，立即可见新功能）
2. **Workstream A**（今日杭州卡片，首页视觉冲击最大，getter 重构为后续铺路）
3. **Workstream B**（10 个办事攻略 detail，内容工作量大但模式复用）
4. **Workstream C**（9 个特色指南 detail，纯内容工作）

每完成一个 workstream 即可独立提交、推送、自动部署。
