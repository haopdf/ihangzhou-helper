# CMS 数据链路打通计划

## Context（为什么做这个改造）

当前 iHangzhou 网站存在一个**核心问题**：CMS 后台是"孤岛"。

- 前端真正用的数据全部硬编码在 [js/app.js](file:///d:\py-project\ihangzhou-helper\js\app.js) 里（22 大分类、370+ 条目，约 455KB）
- CMS 后台用的 [data/cms.json](file:///d:\py-project\ihangzhou-helper\data\cms.json) 只有 6 个分类约 10 条示例数据
- 前端从不调用 `/api/content`，所以 CMS 后台改了内容前端完全不会变
- 这就是用户感觉"有个后台会更好一点"的根本原因——后台其实没起作用

**目标**：让 CMS 真正能管理前端内容，CMS 改动后用户下次访问即可看到。同时保持离线/PWA 可用性。

## 总体策略

采用**"内联兜底 + 异步覆盖"**模式（参考 app.js L2732 已有的 `fetch('/api/news')` 模式）：

1. `app.js` 顶部保留原有 `DATA` 作为兜底（改名 `DATA_FALLBACK`）
2. 立即用兜底数据 `init()` 渲染（保证离线/首屏可用）
3. 异步 `fetch('/api/content')`，成功且数据有变化时，重新渲染动态部分
4. CMS 后台增加"从 app.js 一键导入"按钮，把现有 370+ 条目迁移到 `cms.json`

## 实施步骤

### Step 1: 数据迁移脚本（一次性）

**新建** [scripts/migrate-to-cms.js](file:///d:\py-project\ihangzhou-helper\scripts\migrate-to-cms.js)

- 用 Node 读取 `js/app.js`
- 用正则提取 `var DATA = {...};` 块（IIFE 内的对象字面量）
- 通过 `new Function('return ' + dataStr)()` 安全求值得到 DATA 对象
- 输出完整 `data/cms.json`，保留原 `version`、合并 `lastModified`
- 同时在 CMS 后台提供"一键导入"按钮，调用同一个迁移逻辑（API 端实现）

### Step 2: 改造 `js/app.js`

**修改** [js/app.js](file:///d:\py-project\ihangzhou-helper\js\app.js)

- L9 `var DATA = {...}` → 重命名为 `var DATA_FALLBACK = {...}`，并在末尾加 `var DATA = DATA_FALLBACK;`（默认用兜底）
- 在 `init()` 末尾（L2828 附近）追加 `loadCMSData();` 调用
- 新增 `loadCMSData()` 函数（参考 L2732 `renderNewsBanner` 的 fetch 模式）：
  ```js
  function loadCMSData() {
    fetch('/api/content').then(function(r){return r.json();}).then(function(res){
      if (res.success && res.data && hasDiff(DATA, res.data)) {
        DATA = res.data;
        rerenderDynamic();
      }
    }).catch(function(){ /* 静默失败，用兜底 */ });
  }
  ```
- 新增 `hasDiff(a, b)`：用 JSON.stringify 简单对比关键字段
- 新增 `rerenderDynamic()`：调用 `renderHotServices()` / `renderHotKeywords()` / `renderTabs()` / `renderServices(state.currentTab)` / 更新 `#heroStats` 统计
- `renderServices` 需支持重入：重新渲染前清空 `#serviceGrid` 容器

### Step 3: 升级 `sw.js`

**修改** [sw.js](file:///d:\py-project\ihangzhou-helper\sw.js)

- `CACHE_NAME` v32 → v33（触发旧缓存清理）
- 在 fetch 拦截分支加一条：`/api/*` 路径始终走网络，不读缓存（确保 CMS 改动立即生效）
  ```js
  if (url.pathname.indexOf('/api/') === 0) {
    event.respondWith(fetch(event.request));
    return;
  }
  ```
- 放在现有 isHtml/isJs 判断之前

### Step 4: CMS 后台功能增强

**修改** [admin/index.html](file:///d:\py-project\ihangzhou-helper\admin\index.html)

最小必要增强（不做拖拽等复杂功能）：

1. **顶部搜索框**：在 `.header-bar` 中加 `<input id="searchBox">`，输入时过滤当前视图的条目（按 name/desc 模糊匹配）
2. **"从 app.js 导入"按钮**（数据概览页）：调用新 API `POST /api/content {type:'importFromApp'}`，服务端读取 app.js 提取 DATA 写入 cms.json
3. **"导出 JSON 备份"按钮**：GET `/api/content` 后触发下载 `cms-backup-YYYYMMDD.json`
4. **detail 富文本编辑**：条目编辑 modal 中，detail 字段用 `<textarea>` + "预览"按钮（点击弹窗 innerHTML 预览）
5. **上移/下移排序**：每个 item-card 加 ↑↓ 按钮，调用 `PUT {type:'moveItem', categoryId, itemIndex, direction}`
6. **"刷新前端缓存"按钮**：postMessage 给所有 client，或提示用户刷新即可（实际靠 SW v33 升级自动生效）

### Step 5: API 端补充

**修改** [api/content.js](file:///d:\py-project\ihangzhou-helper\api\content.js)

- POST 增加 `case 'importFromApp'`：读取 `js/app.js`，提取 DATA，整体替换 cms.json（带备份）
- PUT 增加 `case 'moveItem'`：在 `cms.categories[...].items` 数组内 splice 移动
- PUT 增加 `case 'moveCategory'`：分类排序

### Step 6: Vercel 缓存配置

**修改** [vercel.json](file:///d:\py-project\ihangzhou-helper\vercel.json)

- 增加 `/api/(.*)` 路径的 `Cache-Control: no-store`（确保 API 永不缓存）

## 范围说明

**本次不做**：
- 专题页 food.html / museum.html / travel.html 的 CMS 化（它们独立运作，结构不同，留作下一阶段）
- 拖拽排序（用上移/下移按钮替代，简单可靠）
- 多用户/角色/密码 hash（当前是单管理员，安全收益低）
- 文件上传（图标用 emoji，无需图片）

## 验证方法

1. 本地启动：在项目根目录 `vercel dev` 或 `npx http-server`，访问 `http://localhost:3000`
2. **迁移验证**：访问 `/admin/`，点"从 app.js 导入"，应看到 22 个分类、370+ 条目；`data/cms.json` 文件被更新
3. **前端加载验证**：访问 `/`，打开 DevTools Network，应看到对 `/api/content` 的请求；首页内容（22 分类）正常显示
4. **改后生效验证**：在 CMS 后台改一个条目名称（如把"社保查询"改成"社保查询-测试"），刷新首页，应看到新名称（说明 CMS → 前端链路打通）
5. **离线兜底验证**：DevTools → Application → Offline，刷新首页，仍能显示（说明兜底数据生效）
6. **SW 升级验证**：DevTools → Application → Service Workers，应看到 v33 激活，旧 v32 被清理
