#!/usr/bin/env python3
"""
iHangzhou Helper — 一键发布脚本
用法:
  python scripts/publish.py article <title> <content_file> <cat> [source]
  python scripts/publish.py keyword <word> <cat>
  python scripts/publish.py approve <slug>

示例:
  python scripts/publish.py article "杭州春游路线" article.md "11-旅游攻略系列" "auto"
  python scripts/publish.py keyword "西湖醋鱼" "01-美食系列"
  python scripts/publish.py approve "杭州春游路线"

环境变量:
  IHZ_API_BASE    — API 基地址，默认 https://www.ihangzhou.net/api
  IHZ_API_KEY     — 从 Supabase api_keys 表获取的 Bearer Token
  IHZ_API_BASE    — 本地测试时设为 http://localhost:3000/api（vercel dev）
"""
import sys, os, json, urllib.request, urllib.error

BASE = os.environ.get("IHZ_API_BASE", "https://www.ihangzhou.net/api").rstrip("/")
KEY  = os.environ.get("IHZ_API_KEY", "")

if not KEY:
    print("错误: 请设置环境变量 IHZ_API_KEY")
    print("获取方法: 在 Supabase api_keys 表中创建的 key")
    sys.exit(1)


def api_post(path, body):
    url = f"{BASE}{path}"
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={
        "Authorization": f"Bearer {KEY}",
        "Content-Type": "application/json",
    }, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8")), resp.status
    except urllib.error.HTTPError as e:
        body_text = e.read().decode("utf-8", "replace")
        try:
            return json.loads(body_text), e.code
        except:
            return {"ok": False, "error": body_text}, e.code


def add_article(title, content, cat, source=""):
    body = {"title": title, "content": content, "cat": cat, "source": source}
    resp, status = api_post("/articles/create", body)
    if status == 201:
        print(f"✅ 文章已创建（pending 状态）: slug={resp['data'].get('slug')}")
        print(f"   待审核发布：python scripts/publish.py approve {resp['data'].get('slug')}")
    else:
        print(f"❌ 创建失败 [{status}]: {resp}")
        sys.exit(1)


def add_keyword(word, cat):
    body = {"word": word, "cat": cat}
    resp, status = api_post("/keywords/add", body)
    if status == 201:
        print(f"✅ 关键词已添加: {word}")
    elif status == 409:
        print(f"⚠️ 关键词已存在，跳过: {word}")
    else:
        print(f"❌ 添加失败 [{status}]: {resp}")
        sys.exit(1)


def approve_article(slug):
    body = {"slug": slug, "status": "published"}
    resp, status = api_post("/articles/update-status", body)
    if status == 200:
        print(f"✅ 文章已发布: {slug}")
    elif status == 403:
        print("❌ 权限不足：需要 admin 角色的 API Key")
        sys.exit(1)
    elif status == 404:
        print(f"❌ 文章不存在: {slug}")
        sys.exit(1)
    else:
        print(f"❌ 发布失败 [{status}]: {resp}")
        sys.exit(1)


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(0)

    cmd = args[0]

    if cmd == "article":
        if len(args) < 4:
            print("用法: python scripts/publish.py article <title> <content_file> <cat> [source]")
            sys.exit(1)
        title, content_file, cat = args[1], args[2], args[3]
        source = args[4] if len(args) > 4 else ""
        with open(content_file, "r", encoding="utf-8") as f:
            content = f.read()
        add_article(title, content, cat, source)

    elif cmd == "keyword":
        if len(args) < 3:
            print("用法: python scripts/publish.py keyword <word> <cat>")
            sys.exit(1)
        add_keyword(args[1], args[2])

    elif cmd == "approve":
        if len(args) < 2:
            print("用法: python scripts/publish.py approve <slug>")
            sys.exit(1)
        approve_article(args[1])

    else:
        print(f"未知命令: {cmd}")
        sys.exit(1)


if __name__ == "__main__":
    main()
