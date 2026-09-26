# iHangzhou API 接口文档

> 基础 URL：`https://www.ihangzhou.net`

所有写操作（POST/PUT/DELETE）均需在请求头携带管理员密码：

```
Authorization: Bearer {CMS_ADMIN_PASSWORD}
```

默认密码：`ihangzhou2024`（生产环境请通过 Vercel 环境变量 `CMS_ADMIN_PASSWORD` 修改）

---

## 📡 微信关键词批量管理

### 批量新增关键词自动回复

快速一次性添加多个关键词，已存在的主关键词自动跳过。

```
POST /api/content
Content-Type: application/json
Authorization: Bearer {password}
```

**请求体**：

```json
{
  "type": "wechatKeywordsBatch",
  "data": {
    "keywords": [
      {
        "keyword": "西湖",
        "aliases": ["西湖十景", "游西湖", "西湖景点"],
        "type": "news",
        "title": "🏞️ 西湖十景全攻略",
        "desc": "断桥残雪/苏堤春晓/三潭印月/曲院风荷/雷峰夕照",
        "picUrl": "https://www.ihangzhou.net/images/og-cover.jpg",
        "url": "https://www.ihangzhou.net/travel.html#sec-lake"
      },
      {
        "keyword": "社保查询",
        "aliases": ["查社保", "社保余额"],
        "type": "text",
        "reply": "🏥 杭州社保查询入口\n\nhttps://search.zj.gov.cn/jpaas-jsearch-web-server/search?q=社保"
      }
    ]
  }
}
```

**关键词对象字段**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `keyword` | string | ✅ | 主关键词（匹配优先级最高） |
| `aliases` | string[] | ❌ | 别名数组，命中任一即触发回复 |
| `type` | string | ✅ | `text`（纯文字回复）或 `news`（图文消息） |
| `reply` | string | text 必填 | 纯文字回复内容（支持换行 `\n`） |
| `title` | string | news 必填 | 图文消息标题 |
| `desc` | string | news 必填 | 图文消息描述 |
| `picUrl` | string | news 必填 | 封面图片 URL（建议 900×383） |
| `url` | string | ❌ | 点击图文跳转链接 |

**成功响应**（200）：

```json
{
  "success": true,
  "data": { /* 完整 CMS 数据 */ },
  "batchResult": {
    "added": 2,
    "skipped": 0,
    "total": 30
  }
}
```

**失败响应**（400/401/500）：

```json
{
  "success": false,
  "error": "错误描述"
}
```

---

### 💡 调用示例

#### curl

```bash
curl -X POST 'https://www.ihangzhou.net/api/content' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer ihangzhou2024' \
  -d '{
    "type": "wechatKeywordsBatch",
    "data": {
      "keywords": [
        {
          "keyword": "test",
          "aliases": ["测试"],
          "type": "text",
          "reply": "测试成功！"
        }
      ]
    }
  }'
```

#### JavaScript / 浏览器

```javascript
const resp = await fetch('/api/content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ihangzhou2024'
  },
  body: JSON.stringify({
    type: 'wechatKeywordsBatch',
    data: {
      keywords: [
        { keyword: '美食', aliases: ['吃'], type: 'text', reply: '推荐阅读...' }
      ]
    }
  })
});
const result = await resp.json();
console.log(`新增 ${result.batchResult.added} 个，跳过 ${result.batchResult.skipped} 个`);
```

#### Python

```python
import requests

resp = requests.post('https://www.ihangzhou.net/api/content',
    headers={'Authorization': 'Bearer ihangzhou2024'},
    json={
        'type': 'wechatKeywordsBatch',
        'data': {
            'keywords': [
                {'keyword': '美食', 'type': 'text', 'reply': '推荐阅读...'}
            ]
        }
    }
)
result = resp.json()
print(f"新增 {result['batchResult']['added']} 个")
```

---

### 批量管理面板

除了 API 调用，还可通过可视化管理后台操作：

```
https://www.ihangzhou.net/admin/
```

在「关键词管理」面板中可以直接编辑、批量导入关键词，所见即所得。

---

## 🔧 其他 CMS 接口

### 获取完整内容数据（公开）

```
GET /api/content
```

### 独立获取关键词（公开，10s 缓存）

```
GET /api/content?type=keywords
```

### 从 app.js 同步分类数据

```
POST /api/content
Authorization: Bearer {password}

{
  "type": "importFromApp"
}
```

自动从线上 js/app.js 提取 `DATA` 对象的 categories、hotServices、hotKeywords 同步到 CMS。

### 单条关键词操作

| 操作 | type 值 |
|------|---------|
| 修改关键词（按索引） | `PUT` `wechatKeywords` + `itemIndex` |
| 删除关键词 | `DELETE` `wechatKeywords` + `keyword` |
| 移动关键词顺序 | `PUT` `wechatKeywords` + `moveHotKeyword` |

完整字段参考微信官方文档或查看 [api/content.js](../api/content.js) 源码。
