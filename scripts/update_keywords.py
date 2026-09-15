#!/usr/bin/env python3
"""
iHangzhou 关键词回复内容一键更新脚本
功能：
  1. 读取 keyword_articles.json 里的关键词文章配置
  2. 生成HTML文章到 articles/ 目录
  3. 更新 data/cms.json 的 wechatKeywords
  4. 自动同步到 Vercel Blob（调用 sync-keywords-to-blob.js）
使用方式：
  cd ~/PycharmProjects/ihangzhou-helper
  python3 scripts/update_keywords.py
注意：
  - 需要设置 BLOB_READ_WRITE_TOKEN 环境变量，或在 .env 文件里配置
  - 新增关键词时，编辑 scripts/keyword_articles.json 即可
"""
import json
import re
import os
import subprocess
from pathlib import Path

# 项目根目录
PROJECT_DIR = Path.home() / "PycharmProjects" / "ihangzhou-helper"
ARTICLES_DIR = PROJECT_DIR / "articles"
CMS_FILE = PROJECT_DIR / "data" / "cms.json"
KEYWORD_CONFIG = Path(__file__).parent / "keyword_articles.json"
SYNC_SCRIPT = PROJECT_DIR / "scripts" / "sync-keywords-to-blob.js"


def markdown_to_html(md_text):
    """简单的Markdown到HTML转换"""
    lines = md_text.split('\n')
    html_lines = []
    in_list = False
    list_type = None
    in_code = False

    for line in lines:
        # 跳过front matter
        if line.strip() == '---':
            in_code = not in_code
            continue
        if in_code:
            continue

        # 空行
        if not line.strip():
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
                list_type = None
            continue

        # 标题
        if line.startswith('# '):
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
            html_lines.append(f'<h1>{line[2:].strip()}</h1>')
            continue
        if line.startswith('## '):
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
            html_lines.append(f'<h2>{line[3:].strip()}</h2>')
            continue
        if line.startswith('### '):
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
            html_lines.append(f'<h3>{line[4:].strip()}</h3>')
            continue

        # 引用块
        if line.startswith('> '):
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
            html_lines.append(f'<blockquote><p>{line[2:].strip()}</p></blockquote>')
            continue

        # 图片
        img_match = re.match(r'!\[([^\]]*)\]\(([^)]+)\)', line.strip())
        if img_match:
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
            alt = img_match.group(1)
            src = img_match.group(2)
            html_lines.append(f'<p><img src="{src}" alt="{alt}" style="max-width:100%;border-radius:8px;"></p>')
            continue

        # 无序列表
        if line.strip().startswith('- ') or line.strip().startswith('* '):
            if not in_list:
                html_lines.append('<ul>')
                in_list = True
                list_type = 'ul'
            elif list_type != 'ul':
                html_lines.append(f'</{list_type}>')
                html_lines.append('<ul>')
                list_type = 'ul'
            content = line.strip()[2:].strip()
            content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', content)
            html_lines.append(f'<li>{content}</li>')
            continue

        # 有序列表
        if re.match(r'^\d+\.\s', line.strip()):
            if not in_list:
                html_lines.append('<ol>')
                in_list = True
                list_type = 'ol'
            elif list_type != 'ol':
                html_lines.append(f'</{list_type}>')
                html_lines.append('<ol>')
                list_type = 'ol'
            content = re.sub(r'^\d+\.\s', '', line.strip())
            content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', content)
            html_lines.append(f'<li>{content}</li>')
            continue

        # 分隔线
        if line.strip() == '---' or line.strip() == '***':
            if in_list:
                html_lines.append(f'</{list_type}>')
                in_list = False
            html_lines.append('<hr>')
            continue

        # 普通段落
        if in_list:
            html_lines.append(f'</{list_type}>')
            in_list = False
            list_type = None
        content = line.strip()
        content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', content)
        content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', content)
        html_lines.append(f'<p>{content}</p>')

    if in_list:
        html_lines.append(f'</{list_type}>')

    return '\n'.join(html_lines)


def generate_html(title, description, keywords, content_html, filename):
    """生成完整的HTML文章"""
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>{title} · iHangzhou 杭州生活助手</title>
  <meta name="description" content="{description}">
  <meta name="keywords" content="{keywords}">
  <meta name="theme-color" content="#0ea5e9">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="iHangzhou 杭州生活助手">
  <link rel="canonical" href="https://www.ihangzhou.net/articles/{filename}">
  <link rel="stylesheet" href="../css/style.css?v=20260927a">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏔️</text></svg>">
  <style>
    .article-body {{ max-width: 720px; margin: 0 auto; padding: 16px; }}
    .article-breadcrumb {{ font-size: 12px; color: var(--text-muted); padding: 10px 16px; background: var(--bg-alt); }}
    .article-breadcrumb span {{ margin: 0 2px; }}
    .article-breadcrumb a {{ color: var(--primary); }}
    .article-header {{ padding: 20px 16px 16px; text-align: center; max-width: 720px; margin: 0 auto; }}
    .article-header h1 {{ font-size: 22px; font-weight: 700; line-height: 1.4; color: var(--text); margin: 0 0 8px; }}
    .article-meta {{ font-size: 12px; color: var(--text-muted); }}
    .article-meta span {{ margin: 0 6px; }}
    .article-content {{ font-size: 15px; line-height: 1.9; color: var(--text-secondary); padding: 8px 0 24px; }}
    .article-content h2 {{ font-size: 18px; font-weight: 700; color: var(--text); margin: 28px 0 12px; padding-left: 10px; border-left: 4px solid var(--primary); }}
    .article-content h3 {{ font-size: 16px; font-weight: 600; color: var(--text); margin: 20px 0 10px; }}
    .article-content p {{ margin: 0 0 14px; }}
    .article-content strong {{ color: var(--text); font-weight: 600; }}
    .article-content blockquote {{ border-left: 4px solid var(--primary); background: var(--bg-alt); margin: 14px 0; padding: 10px 14px; border-radius: 0 8px 8px 0; color: var(--text-secondary); }}
    .article-content blockquote p {{ margin: 0; }}
    .article-content hr {{ border: none; border-top: 1px dashed var(--border-light); margin: 24px 0; }}
    .article-content ul {{ padding-left: 20px; margin: 10px 0 14px; }}
    .article-content ol {{ padding-left: 20px; margin: 10px 0 14px; }}
    .article-content li {{ margin-bottom: 6px; }}
    .article-content a {{ color: var(--primary); text-decoration: underline; text-underline-offset: 2px; }}
    .article-footer {{ max-width: 720px; margin: 0 auto; padding: 16px; border-top: 1px solid var(--border-light); }}
    .article-footer a {{ display: block; text-align: center; padding: 12px; background: var(--primary); color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; }}
  </style>
</head>
<body>
  <header class="topbar">
    <a href="../index.html" class="topbar-back" style="color:#fff;text-decoration:none;font-size:20px;padding:4px 8px;">‹</a>
    <div class="topbar-city"><span>iHangzhou</span></div>
    <div class="topbar-search" style="flex:1;"></div>
  </header>
  <div class="article-breadcrumb">
    <a href="../index.html">首页</a> <span>›</span> <a href="../articles.html">文章合集</a> <span>›</span> <span>{title}</span>
  </div>
  <div class="article-body">
    <div class="article-header">
      <h1>{title}</h1>
      <div class="article-meta">
        <span>📅 2026-09-15</span>
        <span>✍️ iHangzhou</span>
        <span>👀 杭州本地生活</span>
      </div>
    </div>
    <div class="article-content">
{content_html}
    </div>
    <div class="article-footer">
      <a href="../index.html">🏔️ 回到 iHangzhou 首页，发现更多杭州本地生活指南</a>
    </div>
  </div>
</body>
</html>'''


def main():
    print("=" * 60)
    print("iHangzhou 关键词回复内容一键更新")
    print("=" * 60)

    # 1. 读取关键词配置
    if not KEYWORD_CONFIG.exists():
        print(f"❌ 找不到配置文件: {KEYWORD_CONFIG}")
        return
    with open(KEYWORD_CONFIG, 'r', encoding='utf-8') as f:
        articles = json.load(f)
    print(f"\n📋 读取到 {len(articles)} 个关键词配置")

    # 2. 生成HTML文章
    print("\n📝 生成HTML文章...")
    for art in articles:
        html_path = ARTICLES_DIR / art["filename"]
        content_html = markdown_to_html(art["content"])
        keywords = art["title"] + ",杭州," + ",".join(art["aliases"][:5])
        full_html = generate_html(art["title"], art["description"], keywords, content_html, art["filename"])
        html_path.write_text(full_html, encoding='utf-8')
        print(f"  ✅ {art['title']}")

    # 3. 更新cms.json
    print("\n📦 更新 data/cms.json ...")
    cms_data = json.loads(CMS_FILE.read_text(encoding='utf-8'))

    # 移除已存在的相同关键词
    new_keywords = [kw for kw in cms_data["wechatKeywords"]
                     if kw["keyword"] not in [art["keyword"] for art in articles]]

    # 添加新关键词
    for art in articles:
        kw_config = {
            "keyword": art["keyword"],
            "aliases": art["aliases"],
            "type": "news",
            "title": art["title"],
            "desc": art["description"][:100],
            "picUrl": "https://www.ihangzhou.net/images/og-cover.jpg",
            "url": f"https://www.ihangzhou.net/articles/{art['filename']}"
        }
        new_keywords.append(kw_config)

    cms_data["wechatKeywords"] = new_keywords
    from datetime import datetime
    cms_data["lastModified"] = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S.000Z")
    CMS_FILE.write_text(json.dumps(cms_data, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"  ✅ cms.json已更新，关键词总数: {len(new_keywords)}")

    # 4. 同步到Vercel Blob
    print("\n☁️ 同步到 Vercel Blob ...")
    token = os.environ.get("BLOB_READ_WRITE_TOKEN", "")
    if not token:
        # 尝试从.env文件读取
        env_file = PROJECT_DIR / ".env"
        if env_file.exists():
            with open(env_file, 'r') as f:
                for line in f:
                    if line.startswith("BLOB_READ_WRITE_TOKEN="):
                        token = line.split("=", 1)[1].strip().strip('"').strip("'")
                        break

    if not token:
        print("  ⚠️  未找到 BLOB_READ_WRITE_TOKEN，跳过同步")
        print("  💡 请设置环境变量或在 .env 文件里配置 BLOB_READ_WRITE_TOKEN")
    else:
        env = os.environ.copy()
        env["BLOB_READ_WRITE_TOKEN"] = token
        result = subprocess.run(
            ["node", str(SYNC_SCRIPT)],
            cwd=str(PROJECT_DIR),
            env=env,
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            print("  ✅ 同步成功！")
            # 只打印最后几行
            lines = result.stdout.strip().split('\n')
            for line in lines[-3:]:
                print(f"     {line}")
        else:
            print(f"  ❌ 同步失败: {result.stderr}")

    print("\n" + "=" * 60)
    print("🎉 全部完成！")
    print("=" * 60)


if __name__ == "__main__":
    main()
