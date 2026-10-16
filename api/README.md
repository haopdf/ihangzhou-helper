# iHangzhou API 文档

> 域名: `https://www.ihangzhou.net`
> 认证: `Authorization: Bearer <api_key>`

---
## 公共接口（无需认证）

### 健康检查
```
GET /api/health
```

### 文章列表
```
GET /api/articles?q=西湖&cat=旅游攻略&page=1&limit=20
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `q` | string | 标题/摘要搜索词 |
| `cat` | string | 分类筛选 |
| `page` | number | 页码（默认 1） |
| `limit` | number | 每页条数（默认 20, max 50） |

响应：
```json
{
  "ok": true,
  "data": [{ "slug": "...", "title": "...", "summary": "...", "cat": "...", "created_at": "..." }],
  "page": 1, "limit": 20, "total": 150,
  "mode": "supabase"
}
```

### 文章详情
```
GET /api/articles/:slug
```

### 关键词列表
```
GET /api/keywords?cat=美食&q=西湖
```

---
## 需要认证的接口

> Header: `Authorization: Bearer <api_key>`

### 新增文章
```
POST /api/articles/create
Content-Type: application/json
```

```json
{
  "title": "苏堤春晓 全攻略",
  "summary": "春季游苏堤的最佳路线...",
  "content": "# 苏堤春晓\n\n正文内容...",
  "cat": "11-旅游攻略系列",
  "source": "your-app-name",
  "slug": "su-di-chun-xiao"   // 可选，自动生成
}
```

响应 `201`:
```json
{ "ok": true, "data": { "slug": "su-di-chun-xiao", "title": "...", "status": "pending" } }
```

> 状态为 `pending`，管理员审核后改为 `published`。

### 新增关键词
```
POST /api/keywords/add
Content-Type: application/json
```

```json
{
  "word": "西湖醋鱼",
  "cat": "01-美食系列",
  "source": "your-app-name"
}
```

### 审核/发布文章
```
POST /api/articles/update-status
```

```json
{
  "slug": "su-di-chun-xiao",
  "status": "published"
  // 或 "archived"
}
```

---
## 错误码

| HTTP | 含义 |
|------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 参数缺失或 JSON 解析失败 |
| 401 | 认证失败 |
| 405 | 不允许的 HTTP 方法 |
| 409 | 资源冲突（slug / keyword 已存在） |
| 500 | 服务端错误 |

错误响应格式：
```json
{ "ok": false, "error": "reason" }
```

---
## 调用示例

### cURL
```bash
# 投稿
curl -X POST https://www.ihangzhou.net/api/articles/create \
  -H "Authorization: Bearer ihz_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"title":"测试文章","content":"正文","cat":"测试"}'

# 搜索
curl "https://www.ihangzhou.net/api/articles?q=西湖&limit=5"

# 加关键词
curl -X POST https://www.ihangzhou.net/api/keywords/add \
  -H "Authorization: Bearer ihz_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"word":"龙井茶","cat":"美食"}'
```

### JavaScript
```js
const BASE = 'https://www.ihangzhou.net/api';

// 投稿
await fetch(`${BASE}/articles/create`, {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ihz_your_key_here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: '文章标题',
    content: 'Markdown 或纯文本',
    cat: '分类',
  }),
});

// 搜索
const r = await fetch(`${BASE}/articles?q=西湖&limit=5`);
const { data } = await r.json();
console.log(data);
```

### Python
```python
import requests

BASE = "https://www.ihangzhou.net/api"
HEADERS = {"Authorization": "Bearer ihz_your_key_here"}

# 投稿
requests.post(f"{BASE}/articles/create", json={
    "title": "标题",
    "content": "正文...",
    "cat": "分类",
}, headers=HEADERS)

# 搜索
r = requests.get(f"{BASE}/articles", params={"q": "西湖"})
print(r.json()["data"])
```

---
## 申请 API Key

联系管理员获取 `api_key`。每个 key 带以下属性：
- `name`: 调用方名称
- `role`: 权限角色（`admin` / `writer` / `readonly`）
- `rate_limit`: 每分钟请求数上限
