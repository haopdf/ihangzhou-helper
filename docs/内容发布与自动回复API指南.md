# iHangzhou 内容发布与自动回复 API 指南

> 目标：让**别的 AI / 脚本**把写好的文章投到 iHangzhou 平台（网站 + 可被 Google 收录），
> 并维护「已写文章清单」；同时支持在**公众号后台**配置关键词 → 自动回复
> （含链接、图文卡片、小程序卡片）。
>
> 基础地址：`https://www.ihangzhou.net`

---

## 0. 鉴权（写操作必看）

所有**写操作**（发布/删除文章、批量加关键词）都需要在请求头带管理员密码：

```
Authorization: Bearer {CMS_ADMIN_PASSWORD}
```

- 默认值：`ihangzhou2024`
- **生产环境务必在 Vercel → Settings → Environment Variables 修改 `CMS_ADMIN_PASSWORD`**，否则任何人都能发文。
- 读操作（列清单、读文章、读关键词）**不需要**鉴权，公开可访问。

---

## 1. 让别的 AI 把文章发到平台

### 1.1 接口

```
POST /api/articles
Authorization: Bearer {password}
Content-Type: application/json
```

### 1.2 请求字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `slug` | string | ✅ | 文章唯一 ID，决定访问地址 `/p/<slug>`。仅允许中文/字母/数字/下划线/连字符，长度 1-120。**重复提交=更新该文**。 |
| `title` | string | ✅ | 标题 |
| `cat` | string | ❌ | 分类，默认 `未分类` |
| `topics` | string[] | 建议✅ | **主题词**（如 `["西湖","赏枫"]`）。用于多 AI 查重与选题锁。**强烈建议填写核心实体名**（景点/美食/活动专有名词），可大幅降低重复率 |
| `summary` | string | ❌ | 摘要（同时用于 meta description / 列表展示） |
| `cover` | string | ❌ | 封面图 URL（建议 900×383） |
| `tags` | string[] | ❌ | 标签 |
| `author` | string | ❌ | 作者，默认 `iHangzhou` |
| `status` | string | ❌ | `published`（默认）或 `draft`（草稿不公开） |
| `html` | string | 二选一 | 正文 HTML（优先使用，可带样式） |
| `markdown` | string | 二选一 | 正文 Markdown（无 html 时自动转 HTML） |

> 至少提供 `html` 或 `markdown` 之一。

### 1.3 调用示例

#### curl

```bash
curl -X POST 'https://www.ihangzhou.net/api/articles' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ihangzhou2024' \
  -d '{
    "slug": "xihu-autumn-2026",
    "title": "西湖秋色完全攻略：3 条赏枫路线",
    "cat": "旅游",
    "summary": "断桥、孤山、北山街三条经典赏枫路线，附交通与拍照机位。",
    "cover": "https://www.ihangzhou.net/images/xxx.jpg",
    "tags": ["西湖","赏枫","秋天"],
    "markdown": "# 西湖秋色\n\n秋天是西湖最美的季节……\n\n## 路线一：断桥—孤山\n……"
  }'
```

#### JavaScript / Node

```js
const resp = await fetch('https://www.ihangzhou.net/api/articles', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ihangzhou2024'
  },
  body: JSON.stringify({
    slug: 'xihu-autumn-2026',
    title: '西湖秋色完全攻略',
    cat: '旅游',
    markdown: '# 西湖秋色\n\n……'
  })
});
const r = await resp.json();
console.log('文章地址:', r.url);   // https://www.ihangzhou.net/p/xihu-autumn-2026
```

#### Python

```python
import requests
r = requests.post('https://www.ihangzhou.net/api/articles',
    headers={'Authorization': 'Bearer ihangzhou2024'},
    json={
        'slug': 'xihu-autumn-2026',
        'title': '西湖秋色完全攻略',
        'cat': '旅游',
        'markdown': '# 西湖秋色\n\n……'
    })
print(r.json()['url'])
```

### 1.4 成功响应

```json
{
  "success": true,
  "data": { "slug": "xihu-autumn-2026", "title": "…", "status": "published", "publishedAt": "…", "updatedAt": "…" },
  "url": "https://www.ihangzhou.net/p/xihu-autumn-2026"
}
```

发布后，文章立即可通过 `/p/<slug>` 公开访问（服务端渲染，带 SEO 元信息，**会被 Google 收录**）。

---

## 1.5 防重复选题（多 AI 协作必看）⚠️

**痛点**：你是杭州本地生活号，可能让**多个 AI 同时**帮你撰稿。如果它们都挑中「西湖秋色」这类热门主题，就会产出重复内容——既浪费生成额度，又造成站内重复收录。

本平台提供**两步防撞机制**：

```
定题(title + topics + cat)
   │
   ├─① check   查重（公开·轻量·不传正文）→ 已覆盖？换题
   │
   ├─② reserve 占坑锁（需鉴权·30 分钟独占）→ 被占？换题
   │
   ├─③ 生成全文 + POST 带 reservationId 发布 → 锁自动释放
```

- **`check`** 在「动手写之前」调，只读主题，**不传正文**，撞了就换题，零浪费。
- **`reserve`** 在 check 通过后立即调，拿 30 分钟选题锁，**独占该主题**，防止另一个 AI 在同一窗口并发写同题（这是 check 单独做不到的）。
- **正式 `POST`** 必须带 `reservationId`，否则若撞已发布文章（且不是复用同 slug 更新）会被 `409` 软拦。

> 最佳实践：**check → reserve 都在生成全文之前完成**。这样即便两个 AI 同时盯上「西湖」，第二个在 reserve 阶段就被拦下，不会浪费它已经写好的全文。

### 1.5.1 查重 `check`（公开，无需鉴权）

```
POST /api/articles
Content-Type: application/json
{ "action": "check", "title": "西湖秋色攻略", "cat": "旅游", "topics": ["西湖","赏枫"] }
```

响应：

```json
{
  "success": true,
  "duplicate": false,
  "matches": []
}
```
或撞车时：
```json
{
  "success": true,
  "duplicate": true,
  "matches": [
    { "slug": "xihu-qiu", "title": "西湖秋色完全攻略", "cat": "旅游",
      "url": "https://www.ihangzhou.net/p/xihu-qiu", "score": 0.85 }
  ]
}
```
> `score` 为相似度（0-1），`>= 0.5` 判为同主题。判定依据：`topics` 交集 + 同分类加权 + 标题字符重叠。

### 1.5.2 占坑锁 `reserve`（需鉴权）

```
POST /api/articles
Authorization: Bearer {password}
Content-Type: application/json
{ "action": "reserve", "title": "西湖秋色攻略", "cat": "旅游", "topics": ["西湖","赏枫"] }
```

成功：
```json
{ "success": true, "reservationId": "rsv_labcde123", "expiresAt": "2026-10-29T12:30:00.000Z", "ttlMinutes": 30 }
```

被占 / 已发布（409）：
```json
{ "success": false, "code": "DUP_RESERVED",
  "error": "该主题已被其他 AI 占坑（选题锁），请换题或稍后重试",
  "conflict": { "reservationId": "rsv_xxx", "title": "西湖秋色攻略", "expiresAt": "…" } }
```
```json
{ "success": false, "code": "DUP_PUBLISHED",
  "error": "该主题已有已发布文章，请勿重复撰写",
  "matches": [ { "slug": "xihu-qiu", "title": "…", "url": "…", "score": 0.9 } ] }
```

> 锁 30 分钟过期自动释放；发布成功后也立即释放。

### 1.5.3 带锁发布

在正常 `POST`（无 `action`）的 body 里加 `reservationId`：

```bash
curl -X POST 'https://www.ihangzhou.net/api/articles' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ihangzhou2024' \
  -d '{
    "reservationId": "rsv_labcde123",
    "slug": "xihu-qiu-2026",
    "title": "西湖秋色完全攻略",
    "cat": "旅游",
    "topics": ["西湖","赏枫"],
    "markdown": "# 西湖秋色\n\n……"
  }'
```

> 发布时**不传 `action` 字段**（action 仅用于 `check` / `reserve` 子操作，省略即正式发布）。不带 `reservationId` 也能发，但会触发软拦：若检测到的同主题已发布文章**且 slug 不同**，返回 `409 DUP_PUBLISHED`。想更新自己已有的文章请用**同一个 slug**（upsert 语义，不判重）。

### 1.5.4 推荐完整工作流（Python 示例）

```python
import requests, time

BASE = 'https://www.ihangzhou.net/api/articles'
HEADERS = {'Authorization': 'Bearer ihangzhou2024'}

def plan_and_publish(title, cat, topics, markdown):
    # ① 查重
    r = requests.post(BASE, json={'action':'check','title':title,'cat':cat,'topics':topics})
    if r.json().get('duplicate'):
        print('撞题，换一个：', r.json()['matches'])
        return False
    # ② 占坑
    r = requests.post(BASE, headers=HEADERS,
                      json={'action':'reserve','title':title,'cat':cat,'topics':topics})
    if not r.json().get('success'):
        print('被别人占了：', r.json())
        return False
    rid = r.json()['reservationId']
    # ③ 生成 + 发布（带锁；不传 action 即正式发布）
    r = requests.post(BASE, headers=HEADERS,
                      json={'reservationId':rid,'title':title,
                            'cat':cat,'topics':topics,'markdown':markdown})
    print('发布结果：', r.json())
    return r.json().get('success')

# 调用方在“生成 markdown 之前”先 plan；只有拿到锁才去花 token 写全文
```

### 1.5.5 `topics` 命名约定（关键）

查重靠 `topics` 精确匹配 + 标题字符重叠。**不同 AI 对同一景点用了不同表述，就拦不住**。约定：

- `topics[0]` 必须填**核心实体专有名词**（景点/美食/活动的标准名），例如写西湖就统一填 `"西湖"`，别写成「西子湖」「杭州西湖景区」之类。
- 可追加角度词：`["西湖","赏枫"]`、`["西湖","骑行"]` 视为不同角度（交集只有「西湖」，占比 1/2 → 0.3 分，不判重），允许并存；但 `["西湖","赏枫"]` 与 `["西湖","秋色"]` 也只交「西湖」→ 不判重（避免误伤不同角度）。真正想拦的是**完全相同的主题**。
- 若你希望「只要撞核心实体就拦」，可在自己的 AI 端逻辑里把相似度阈值调高，或在 `topics` 里只放核心实体、不放角度词。

---

## 2. 维护「已写文章清单」

### 2.1 获取全部文章清单（公开，无需鉴权）

```
GET /api/articles
```

返回 manifest（不含正文，轻量）：

```json
{
  "success": true,
  "count": 12,
  "data": [
    { "slug": "xihu-autumn-2026", "title": "…", "cat": "旅游", "summary": "…", "cover": "…", "status": "published", "publishedAt": "…", "updatedAt": "…" },
    …
  ]
}
```

可按状态过滤：`GET /api/articles?status=published`。

> 这就是「已写文章清单」——别的 AI 发完之后，随时来这个接口对账、查重、续写。

### 2.2 读取单篇全文

```
GET /api/articles?slug=xihu-autumn-2026
```

### 2.3 删除文章（需鉴权）

```
DELETE /api/articles?slug=xihu-autumn-2026
Authorization: Bearer {password}
```

### 2.4 公开阅读页

| 地址 | 说明 |
|------|------|
| `https://www.ihangzhou.net/p/<slug>` | 服务端渲染的文章页，含 title/meta/og/JSON-LD，**SEO 友好** |
| `https://www.ihangzhou.net/articles.html` | 站内 2700+ 篇历史文章搜索入口 |

---

## 3. 公众号关键词 → 自动回复（链接 / 图文 / 小程序）

关键词数据由公众号回调接口 `api/wechat.js` 消费。通过 `api/content` 的
`wechatKeywordsBatch` 批量写入（**已存在的主关键词自动跳过**）。

```
POST /api/content
Authorization: Bearer {password}
Content-Type: application/json
```

```json
{
  "type": "wechatKeywordsBatch",
  "data": {
    "keywords": [ /* 见下方三类示例 */ ]
  }
}
```

### 3.1 三种回复类型

#### ① 纯文本 + 链接（`type: "text"`）

```json
{
  "keyword": "社保",
  "aliases": ["查社保", "社保余额"],
  "type": "text",
  "reply": "🏥 杭州社保查询入口：",
  "url": "https://search.zj.gov.cn/jpaas-jsearch-web-server/search?q=社保"
}
```

`url` 字段会在文本末尾自动追加 `🔗 链接`。

#### ② 图文卡片（`type: "news"`）—— 点击跳外链/小程序页都行

```json
{
  "keyword": "西湖",
  "aliases": ["游西湖", "西湖攻略"],
  "type": "news",
  "title": "🏞️ 西湖十景全攻略",
  "desc": "断桥残雪/苏堤春晓/三潭印月",
  "picUrl": "https://www.ihangzhou.net/images/logo-mark-192.png",
  "url": "https://www.ihangzhou.net/p/xihu-autumn-2026"
}
```

> 想引导到本站文章，把 `url` 填成 `/p/<slug>` 的完整个站地址即可。

#### ③ 小程序卡片（`type: "miniprogram"`）—— 点开直接进小程序

```json
{
  "keyword": "预约挂号",
  "aliases": ["挂号", "医院挂号"],
  "type": "miniprogram",
  "title": "杭州预约挂号小程序",
  "appid": "wx1234567890abcdef",
  "pagepath": "pages/index/index?from=ihz",
  "thumburl": "https://www.ihangzhou.net/images/logo-mark-192.png"
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 卡片标题 |
| `appid` | ✅ | 小程序 AppId |
| `pagepath` | ✅ | 小程序页面路径（可带参数） |
| `thumburl` | ✅ | 卡片缩略图（建议 1080×1080 或 800×800） |

> 小程序卡片**仅在微信内**有效；网页/其他环境点不开属正常。

### 3.2 关键词对象公共字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `keyword` | string | ✅ | 主关键词（精确匹配优先级最高） |
| `aliases` | string[] | ❌ | 别名，命中任一即触发 |
| `type` | string | ✅ | `text` / `news` / `miniprogram` / `share`（网盘资料） |
| `reply` | string | text 用 | 文本正文 |
| `title` | string | news/miniprogram 用 | 标题 |
| `desc` | string | news 用 | 图文描述 |
| `picUrl` | string | news 用 | 封面图 |
| `url` | string | ❌ | 跳转链接（news 点击跳转；text 末尾追加） |
| `appid` / `pagepath` / `thumburl` | string | miniprogram 用 | 小程序参数 |

### 3.3 匹配优先级（来自 api/wechat.js）

1. **精确匹配** `keyword`
2. **同义词精确匹配** `aliases`
3. **包含匹配**（单字关键词不参与，避免误触；如数字快捷键 1-5）

未匹配的消息转接微信 AI（`transfer_biz_ai_ivr`）。

---

## 4. Sitemap 与 SEO（为什么之前 Google 没收录）

**根因**：旧 `sitemap.xml` 只列了约 30 个页面、日期停在 2026-09-26，**2731 篇历史文章一个 URL 都没进 sitemap**，Google 自然抓不全。

**修复**：新增 `scripts/gen-sitemap.js`，已接入 `npm run build`，**每次 `git push` 部署自动重新生成**，覆盖：
- 站点全部顶层页面
- `articles/` 下 2700+ 篇静态文章页
- 通过 API 发布的文章（`/p/<slug>`）

部署后请在 Google Search Console 重新提交：`https://www.ihangzhou.net/sitemap.xml`
（首次建议用「站点地图 → 添加」并主动「请求编入索引」若干重点页）。

---

## 5. 部署与安全

- 提交即部署：`git push` → Vercel 自动构建（先 `build-search-index` 再 `gen-sitemap`）。
- 环境变量（Vercel 配置）：`CMS_ADMIN_PASSWORD`（**务必修改**）、`BLOB_READ_WRITE_TOKEN`（文章/关键词持久化）、`WECHAT_TOKEN` 等。
- 文章与关键词数据存于 Vercel Blob，与代码仓库分离，写操作需密码。
- 本地无 Blob token 时，文章 API 会写到 `data/.articles/`（已被 .gitignore 忽略），仅用于本地联调。
