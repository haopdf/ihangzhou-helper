#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""验证 cat-data.js 中所有ID在data文件中存在 (v2 - 修复 places.json 解析)"""
import os, re, json

ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper'
os.chdir(ROOT)

with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    cat_content = f.read()

links = re.findall(r"([\w-]+\.html)\?id=([\w-]+)", cat_content)
# 去重
links = list(dict.fromkeys(links))
print(f"共找到 {len(links)} 个唯一ID链接")

def get_js_keys(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    return set(re.findall(r"'([\w-]+)'\s*:\s*\{", content))

def get_places_keys():
    with open('data/places.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return set(p['id'] for p in data.get('places', []))

# 已知的 data 文件映射
DATA_MAP = {
    'food': 'js/food-data.js',
    'dessert': 'js/dessert-data.js',
    'breakfast': 'js/breakfast-data.js',
    'tea': 'js/tea-data.js',
    'hangbang': 'js/hangbang-data.js',
    'coffee': 'js/coffee-data.js',
    'night-market': 'js/night-market-data.js',
    'museum': 'js/museum-data.js',
    'laozihao': 'js/laozihao-data.js',
    'history': 'js/lishi-data.js',
    'celebrity': 'js/mingren-data.js',
    'intangible': 'js/intangible-data.js',
    'scenic': 'js/scenic-data.js',
    'guzhen': 'js/guzhen-data.js',
    'temple': 'js/temple-data.js',
    'tide': 'js/tide-data.js',
    'route': 'js/route-data.js',
    'zhoubian': 'js/zhoubian-data.js',
    'weekend': 'js/zhoumo-data.js',
    'zhoumo': 'js/zhoumo-data.js',
    'xiangxiang': 'js/xiangxiang-data.js',
    'chaguan': 'js/chaguan-data.js',
    'gujian': 'js/gujian-data.js',
    'tushuguan': 'js/tushuguan-data.js',
    'story': 'js/story-data.js',
}

missing = []
ok_count = 0
unknown_pages = set()

for html_name, id_val in links:
    key = html_name.replace('.html', '')
    
    if key == 'place':
        keys = get_places_keys()
    elif key == 'district':
        ok_count += 1  # 静态页面
        continue
    elif key in DATA_MAP:
        keys = get_js_keys(DATA_MAP[key])
    else:
        unknown_pages.add(key)
        continue
    
    if id_val in keys:
        ok_count += 1
    else:
        missing.append((html_name, id_val))

print(f"\n✅ 验证通过: {ok_count}/{len(links)}")
if unknown_pages:
    print(f"⚠️ 未知页面(不在map中): {unknown_pages}")
if missing:
    # 按页面分组
    by_page = {}
    for h, i in missing:
        by_page.setdefault(h, []).append(i)
    print(f"\n❌ 缺少ID ({len(missing)}个):")
    for page, ids in by_page.items():
        print(f"  {page}: {', '.join(ids[:8])}{'...' if len(ids)>8 else ''}")
else:
    print("\n🎉 所有 ID 都有对应数据!")
