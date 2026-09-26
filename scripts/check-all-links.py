#!/usr/bin/env python3
"""
全面死链检查：cms.json 外链 + 内部频道页链接 + 文章 slug 存在性
输出: 死链清单 + 可修复建议
"""
import json, os, re, sys
import urllib.request, urllib.error, ssl

# === 配置 ===
BASE_URL = "https://www.ihangzhou.net"
HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"}
TIMEOUT = 8

# === SSL ===
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# === 当前仓库所有 html 页面 ===
pages_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html_files = set()
for root, dirs, files in os.walk(pages_dir):
    # 跳过隐藏目录和 node_modules
    dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules' and d != 'edge-profile']
    for f in files:
        if f.endswith('.html'):
            rel = os.path.relpath(os.path.join(root, f), pages_dir)
            html_files.add(rel)

print(f"📂 本地 HTML 文件: {len(html_files)} 个")
for h in sorted(html_files):
    print(f"   - {h}")

# === 1. 检查 cms.json 外部链接 ===
print("\n" + "="*60)
print("🔍 检查 cms.json 中的外部链接")
print("="*60)

dead_links = []
ok_links = []
cms_path = os.path.join(pages_dir, 'data', 'cms.json')
if not os.path.exists(cms_path):
    print("❌ cms.json 不存在，跳过")
else:
    with open(cms_path, 'r', encoding='utf-8') as f:
        cms = json.load(f)

    external_urls = []
    def extract_urls(obj, path=""):
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == 'url' and isinstance(v, str) and v.startswith('http'):
                    external_urls.append((path, v))
                elif isinstance(v, (dict, list)):
                    extract_urls(v, f"{path}.{k}")
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                if isinstance(item, dict) and 'url' in item and isinstance(item['url'], str) and item['url'].startswith('http'):
                    name = item.get('name', f'item[{i}]')
                    external_urls.append((path + f".{name}", item['url']))
                elif isinstance(item, (dict, list)):
                    extract_urls(item, f"{path}[{i}]")

    # 提取 hot services 链接
    for svc in cms.get('hotServices', []):
        if 'url' in svc and svc['url'].startswith('http'):
            external_urls.append((f"hotServices.{svc.get('name','?')}", svc['url']))

    # 提取分类 items 链接
    for cat in cms.get('categories', []):
        for item in cat.get('items', []):
            if 'url' in item and item['url'].startswith('http'):
                external_urls.append((f"categories.{cat.get('id','?')}.{item.get('name','?')}", item['url']))

    # 去重
    seen = set()
    unique_urls = []
    for path, url in external_urls:
        if url not in seen:
            seen.add(url)
            unique_urls.append((path, url))

    print(f"\n🔗 共 {len(unique_urls)} 个外部链接需要检查\n")

    for i, (path, url) in enumerate(unique_urls, 1):
        domain = re.match(r'https?://([^/]+)', url)
        domain = domain.group(1) if domain else '?'
        sys.stdout.write(f"  [{i}/{len(unique_urls)}] {domain:<35} ... ")
        sys.stdout.flush()
        try:
            # URL 可能已经编码过(%xx)，无需再 encode
            req = urllib.request.Request(url, headers=HEADERS, method='HEAD')
            resp = urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx)
            code = resp.getcode()
            if code < 400:
                print(f"✓ {code}")
                ok_links.append(url)
            else:
                print(f"⚠️  {code}")
                dead_links.append((path, url, str(code)))
        except urllib.error.HTTPError as e:
            # 405 Method Not Allowed: HEAD 被拒但 GET 可能可用(如 search.zj.gov.cn)
            if e.code == 405:
                print(f"~ 405 (HEAD blocked, GET likely works)")
                ok_links.append(url)  # 不算死链
            else:
                print(f"✗ {e.code}")
                dead_links.append((path, url, str(e.code)))
        except UnicodeEncodeError:
            # URL 本已编码，忽略编解码问题
            print(f"~ (URL encoded, skip)")
            ok_links.append(url)
        except Exception as e:
            print(f"✗ {str(e)[:40]}")
            dead_links.append((path, url, str(e)[:50]))

# === 2. 检查内部频道链接 ===
print("\n" + "="*60)
print("🔍 检查内部频道/页面链接")
print("="*60)

# 从 cms.json 提取 action 并检查是否已实现
known_actions = set()
app_js_path = os.path.join(pages_dir, 'js', 'app.js')
if os.path.exists(app_js_path):
    with open(app_js_path, 'r', encoding='utf-8') as f:
        app_code = f.read()
    # 提取 case 'xxx': 模式
    actions = re.findall(r"case\s+['\"]([\w_]+)['\"]\s*:", app_code)
    known_actions = set(actions)
    print(f"\n📋 app.js 中已定义 action: {len(known_actions)} 个")
    for a in sorted(known_actions):
        print(f"   - {a}")

# 提取 cms.json 中所有 action
cms_actions = set()
for cat in cms.get('categories', []):
    for item in cat.get('items', []):
        if 'action' in item and item['action']:
            cms_actions.add(item['action'])

orphan_actions = cms_actions - known_actions
if orphan_actions:
    print(f"\n⚠️  有 {len(orphan_actions)} 个 action 在 cms.json 中存在但 app.js 未实现:")
    for a in sorted(orphan_actions):
        print(f"   ✗ {a}")
else:
    print(f"\n✅ 所有 cms.json action 在 app.js 中都有对应实现")

# === 3. 检查文章 slug 是否存在 ===
print("\n" + "="*60)
print("🔍 检查文章 slug 文件是否存在")
print("="*60)

articles_dir = os.path.join(pages_dir, 'articles')
index_path = os.path.join(articles_dir, 'index.json')
if os.path.exists(index_path):
    with open(index_path, 'r', encoding='utf-8') as f:
        article_index = json.load(f)
    
    existing_slugs = set()
    for f in os.listdir(articles_dir):
        if f.endswith('.html'):
            existing_slugs.add(f.replace('.html', ''))
    
    missing_articles = []
    for art in article_index:
        slug = art.get('slug', '')
        if slug and slug not in existing_slugs:
            missing_articles.append(art)
    
    if missing_articles:
        print(f"\n⚠️  文章索引中有 {len(missing_articles)} 篇 slug 对应的文件不存在:")
        for a in missing_articles[:20]:
            print(f"   ✗ {a.get('title','?')} → articles/{a.get('slug','')}.html")
        if len(missing_articles) > 20:
            print(f"   ... 还有 {len(missing_articles)-20} 篇")
    else:
        print(f"\n✅ 所有 {len(article_index)} 篇文章 slug 文件都存在")
else:
    print("❌ articles/index.json 不存在")

# === 4. 检查频道入口链接是否都指向存在的页面 ===
print("\n" + "="*60)
print("🔍 检查频道入口映射")
print("="*60)

# cms.json categories 中 id 与独立频道页的映射
channel_pages = {
    'food': 'food.html',
    'coffee': 'coffee.html', 
    'history': 'history.html',
    'street': 'street.html',
    'weekend': 'weekend.html',
    'traffic': 'traffic.html',
    'zhaopin': 'zhaopin.html',
    'internet': 'internet.html',
    'banshi': 'banshi.html',
    'celebrity': 'celebrity.html',
    'laozihao': 'laozihao.html',
    'museum': 'museum.html',
    'travel': 'travel.html',
    'district': 'district.html',
    'place': 'place.html',
}

for cat in cms.get('categories', []):
    cat_id = cat.get('id', '')
    if cat_id in channel_pages:
        page_file = channel_pages[cat_id]
        if page_file in html_files:
            print(f"   ✓ {cat_id} → {page_file} ({len(cat.get('items',[]))} 项)")
        else:
            print(f"   ✗ {cat_id} → {page_file} 文件不存在！({len(cat.get('items',[]))} 项)")
            dead_links.append((f"category.{cat_id}", page_file, "FILE_NOT_FOUND"))
    else:
        print(f"   - {cat_id}: 无独立频道页")

# === 5. 检查 sitemap.xml 是否列出所有主要页面 ===
print("\n" + "="*60)
print("🔍 检查 sitemap.xml 完整性")
print("="*60)

sitemap_path = os.path.join(pages_dir, 'sitemap.xml')
if os.path.exists(sitemap_path):
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        sitemap_content = f.read()
    
    sitemap_urls = re.findall(r'<loc>(.*?)</loc>', sitemap_content)
    print(f"\n📋 sitemap 中当前有 {len(sitemap_urls)} 个 URL")
    
    main_pages = ['index.html', 'district.html', 'place.html', 'channel.html', 'articles.html', 'celebrity.html']
    main_pages += list(channel_pages.values())
    
    missing_in_sitemap = []
    for page in main_pages:
        full_url = f"{BASE_URL}/{page}"
        if full_url not in sitemap_urls:
            missing_in_sitemap.append(page)
    
    if missing_in_sitemap:
        print(f"\n⚠️  {len(missing_in_sitemap)} 个主要页面不在 sitemap 中:")
        for p in missing_in_sitemap:
            print(f"   ✗ {p}")
    else:
        print("\n✅ 所有主要页面都在 sitemap 中")
else:
    print("❌ sitemap.xml 不存在")

# === 汇总 ===
print("\n" + "="*60)
print("📊 汇总")
print("="*60)

if dead_links:
    print(f"\n✗ 发现 {len(dead_links)} 个问题:")
    for path, url, err in dead_links:
        print(f"   [{err}] {path}")
        print(f"      → {url}")
else:
    print("\n✅ 所有链接正常")

print(f"\n✓ 正常链接: {len(ok_links)}")
print(f"✗ 死链/问题: {len(dead_links)}")
print(f"⚠️  未实现 action: {len(orphan_actions)}")

sys.exit(1 if dead_links or orphan_actions else 0)
