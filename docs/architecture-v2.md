# iHangzhou 架构 V2 — 从散弹式到 API 驱动

> 创建：2026-10-16
> 域名：www.ihangzhou.net

---

## 1. 问题诊断（V1 痛点）

| 问题 | 具体表现 |
|------|---------|
| 散弹式页面 | 41 个根 HTML + 25 个 `*-data.js`，新增栏目需同时改 4+ 文件 |
| 模板不同步 | `index.html` 内联 header 与 `templates/header.html` 脱节 |
| 临时脚本堆积 | `scripts/` 36 文件，30+ 个 `fix_/update_/rebuild_` 前缀 |
| 内容污染 | `articles/` 含 9+ 工作流文件、20+ 优化版草稿、10+ 占位空壳 |
| 索引过大 | `articles/index.json` 1.3MB，首屏 fetch 负担重 |
| API 缺失 | 第三方无法投稿，每次内容更新靠手动导入 |

---

## 2. V2 架构全景

```
┌─────────────────────────────────────────────────────────┐
│                    内容消费者                              │
│  浏览器 ← CDN(Edge) ← Vercel Static                     │
│  第三方 ← HTTPS POST ← Vercel Serverless Functions       │
└────────────�──────────────────────────┬──────────────────┘
             │                          │
             ▼                          ▼
┌────────────────────────┐  ┌──────────────────────────────┐
│   前端静态页面           │  │   API 层 (Serverless)         │
│   41 个 HTML 页面       │  │   /api/articles/*             │
│   CSS/JS 共享           │  │   /api/keywords/*             │
│   公共 template         │  │   /api/health                 │
└────────�───────────────┘  └──────────┬───────────────────┘
         │                             │
         ▼                             ▼
┌─────────────────────────────────────────────────────────┐
│  内容层                                                  │
│  ┌─────────────────�  �──────────────┐  ┌────────────� │
│  │ Supabase (主)    │  │ Vercel Blob  │  │ JSON(降级) │ │
│  │ articles 表     │  │ 图片/附件     │  │ index.json  │ │
│  │ keywords 表     │  └──────────────┘  │ search-     │ │
│  │ api_keys 表     │                    │ index.json  │ │
│  └─────────────────┘                    └────────────� │
└─────────────────────────────────────────────────────────┘
```

---

## 3. 文件结构（新增部分高亮）

```
ihangzhou-helper/
├── api/                            ← ★ 新增：Serverless API 入口
│   ├── README.md                   ← 第三方调用文档
│   ├── _templates/boilerplate.js   ← 新建接口模板
│   ├── health.js                   ← 健康检查
│   ├── articles/
│   │   ├── index.js                ← GET 列表/搜索/分页
│   │   ├── [slug].js              ← GET 单篇详情
│   │   └── create.js              ← POST 投稿（需鉴权）
│   └── keywords/
│       ├── index.js               ← GET 关键词列表
│       └── add.js                 ← POST 新增关键词（需鉴权）
│
├── lib/                            ← ★ 新增：共享库
│   ├── db.js                       ← Supabase 客户端 + 查询封装
│   ├── auth.js                     ← API Key 鉴权 + 限流
│   └── validate.js                 ← 入参校验工具
│
├── scripts/
│   ├── migrate.js                  ← ★ 新增：JSON → Supabase 迁移
│   ├── build-search-index.js       ← ★ 新增：轻量搜索索引生成
│   ├── supabase-schema.sql         ← ★ 新增：表结构定义
│   └── [临时脚本]...               ← TODO: 逐步清理至 ≤5 个
│
├── articles/
│   ├── index.json                  ← 完整索引（后台/迁移用）
│   ├── search-index.json           ← ★ 新增：轻量索引（前端用, ~24% size）
│   └── *.html                      ← 2757 篇文章
│
├── data/
│   └── keywords.json               ← ★ 新增：关键词降级文件
│
├── vercel.json                     ← ★ 新增：Vercel 部署 + CORS 配置
├── package.json                    ← ★ 更新：ESM + Supabase 依赖
├── .env.local                      ← ★ 新增：本地 env 模板
└── docs/
    └── architecture-v2.md          ← 本文档
```

---

## 4. API 接口规范

### 4.1 公开接口

| Method | Path | 说明 |
|--------|------|------|
| GET | `/api/health` | 健康检查 + 接口目录 |
| GET | `/api/articles?q=&cat=&page=&limit=` | 文章列表，带搜索/筛选/分页 |
| GET | `/api/articles/:slug` | 文章详情 |
| GET | `/api/keywords?cat=&q=` | 关键词列表 |

### 4.2 需鉴权接口（`Authorization: Bearer <api_key>`）

| Method | Path | 说明 |
|--------|------|------|
| POST | `/api/articles/create` | 新增文章，statusCode=201 |
| POST | `/api/keywords/add` | 新增关键词 |
| POST | `/api/articles/update-status` | 改状态（发布/下架） |

### 4.3 错误码

```json
{ "ok": false, "error": "reason" }
```

- `400` 参数缺失
- `401` 认证失败
- `409` 资源冲突（ slug / 关键词已存在）
- `500` 服务端错误

### 4.4 第三方调用示例

```bash
# 投稿
curl -X POST https://www.ihangzhou.net/api/articles/create \
  -H "Authorization: Bearer $IHZ_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"xxx","content":"markdown","cat":"美食"}'

# 搜索
curl "https://www.ihangzhou.net/api/articles?q=西湖&cat=美食&limit=10"

# 增加关键词
curl -X POST https://www.ihangzhou.net/api/keywords/add \
  -H "Authorization: Bearer $IHZ_KEY" \
  -d '{"word":"西湖醋鱼","cat":"美食"}'
```

---

## 5. Supabase 表结构

```sql
-- 文章表
CREATE TABLE articles (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  summary     TEXT,
  content     TEXT,
  cat         TEXT,
  word_count  INTEGER DEFAULT 0,
  status      TEXT DEFAULT 'published',
  source      TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 关键词表
CREATE TABLE keywords (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  word        TEXT NOT NULL,
  cat         TEXT,
  source      TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE UNIQUE INDEX idx_keywords_uc ON keywords(word, cat);

-- API Key 表
CREATE TABLE api_keys (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key         TEXT UNIQUE NOT NULL,
  name        TEXT,
  role        TEXT DEFAULT 'writer',
  rate_limit  INTEGER DEFAULT 60,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

---

## 6. 部署流程（V2）

```bash
# 1. 本地开发
npm install
vercel dev                    # 本地预览

# 2. 首次部署前：在 Vercel Dashboard 集成 Supabase
#    Storage → Create → Supabase → 一键 Done

# 3. 迁移数据（一次性）
cp .env.local .env            # 填入 SUPABASE_URL / SERVICE_ROLE_KEY
node scripts/migrate.js       # 把 JSON → Supabase

# 4. 日常构建
npm run build                 # 生成 search-index.json

# 5. Vercel 自动部署
git push                      # Vercel auto-build 
```

---

## 7. 渐进式迁移计划

| Phase | 内容 | 状态 |
|-------|------|------|
| 1 | Supabase 建表 + API 骨架 | ✅ 完成 (2026-10-16) |
| 2 | search-index.json 轻量索引 | ✅ 完成 (2026-10-16) |
| 3 | articles.html 改用 search-index.json | 待实施 |
| 4 | 清理 scripts/ 临时脚本至 ≤5 个 | 待实施 |
| 5 | 移除非内容文件出 articles/ | 待实施 |
| 6 | index.html 内联 header → 模板引入 | 待实施 |
| 7 | Supabase 数据迁移 | 待首次上线执行 |
| 8 | RLS 安全策略上线 | 待首次上线执行 |
| 9 | API 全链路测试 + API Key 发放 | 待首次上线执行 |

---

## 8. 关键决策记录

| 决策 | 选择 | 理由 |
|------|------|------|
| 数据库 | **Supabase** 而非 Neon | 自带 Auth / REST API / 实时 / Dashboard UI |
| 前端 | **保持当前 41 个静态 HTML** | 迁移成本过高，API 只负责内容增删改 |
| 索引优化 | `search-index.json`（~24% size） | 移动端首屏减负 |
| 鉴权 | **API Key**（存 DB） | 简单可控，后续可加 JWT |
| 降级策略 | **JSON fallback** | Supabase 不可用时自动回退，不中断服务 |
| 数据迁移 | **幂等脚本**（slug 唯一约束去重） | 多次运行安全 |
