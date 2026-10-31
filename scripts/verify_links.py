#!/usr/bin/env python3
"""验证 cat-data.js 中所有外部链接是否指向存在的页面和 ID"""
import re
import os

with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all local HTML links (not starting with http, not '#')
links = re.findall(r"'((?:[a-z-]+\.html)(?:\?id=[^']*)?)'", content)
links = [l for l in links if not l.startswith('http')]

# Group by page
page_ids = {}
for link in links:
    parts = link.split('?id=')
    page = parts[0]
    id_val = parts[1] if len(parts) > 1 else None
    if page not in page_ids:
        page_ids[page] = set()
    if id_val:
        page_ids[page].add(id_val)

# Check each page exists
print("=== 页面存在性检查 ===")
missing_pages = []
for page in sorted(page_ids.keys()):
    exists = os.path.exists(page)
    status = "✅" if exists else "❌ 缺失"
    if not exists:
        missing_pages.append(page)
    count = len(page_ids[page])
    has_ids = "有ID" if page_ids[page] else "无ID(频道页)"
    print(f"  {status} {page} ({has_ids}, {count} 引用)")

# Check IDs for pages that have data files
print("\n=== ID 有效性检查（抽样）===")
data_files = {
    'zhoubian.html': 'js/zhoubian-data.js',
    'chaguan.html': 'js/chaguan-data.js',
    'gujian.html': 'js/gujian-data.js',
    'tushuguan.html': 'js/tushuguan-data.js',
    'laozihao.html': 'js/laozihao-data.js',
    'tea.html': 'js/tea-data.js',
    'xiangxiang.html': 'js/xiangxiang-data.js',
    'zhoumo.html': 'js/zhoumo-data.js',
    'life.html': 'js/life-data.js',
}

for page, data_file in data_files.items():
    if page not in page_ids or not page_ids[page]:
        continue
    if not os.path.exists(data_file):
        print(f"  ⚠️ {page}: 数据文件 {data_file} 不存在，无法校验 ID")
        continue
    with open(data_file, 'r', encoding='utf-8') as f:
        data_content = f.read()
    # Extract keys from the data object
    data_keys = set(re.findall(r"'([^']+)':\s*\{", data_content))
    link_ids = page_ids[page]
    missing_ids = link_ids - data_keys
    if missing_ids:
        print(f"  ⚠️ {page}: {len(missing_ids)} 个 ID 在数据文件中缺失:")
        for mid in sorted(missing_ids):
            print(f"      - {mid}")
    else:
        print(f"  ✅ {page}: 全部 {len(link_ids)} 个 ID 均匹配")

# Summary of articles.html
print("\n=== 残留 articles.html 链接 ===")
art_links = re.findall(r"'articles\.html(\?[^']*)?'", content)
if art_links:
    from collections import Counter
    c = Counter(art_links)
    for pattern, count in c.most_common():
        print(f"  articles.html{pattern}: {count} 次")
else:
    print("  无残留")
