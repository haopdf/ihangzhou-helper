#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""验证 cat-data.js 中所有ID在data文件中存在"""
import os, re, json

ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper'
os.chdir(ROOT)

# 读取 cat-data.js 中的链接
with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    cat_content = f.read()

# 提取所有 html?id= 形式的链接
links = re.findall(r"([\w-]+\.html)\?id=([\w-]+)", cat_content)
print(f"共找到 {len(links)} 个ID链接")

# Data 文件映射
DATA_FILES = {
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
    'weekend': 'js/zhoumo-data.js',  # weekend 频道共用 zhoumo data
    'place': 'data/places.json',
    'district': None,  # district.html 硬编码，无独立 data 文件
    'xiangxiang': 'js/xiangxiang-data.js',
    'chaguan': 'js/chaguan-data.js',
    'gujian': 'js/gujian-data.js',
    'tushuguan': 'js/tushuguan-data.js',
    'zhoumo': 'js/zhoumo-data.js',
    'story': 'js/story-data.js',
}

# 读取每个 data 文件中的 key
def get_keys_from_data_file(path):
    """从 JS data 文件中提取第一层 key"""
    if not path:
        return set()
    full_path = os.path.join(ROOT, path)
    if not os.path.exists(full_path):
        return set()
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # 匹配 'key': {
    keys = set(re.findall(r"'([\w-]+)'\s*:\s*\{", content))
    return keys

def get_keys_from_places_json():
    """从 places.json 中获取 key"""
    try:
        path = os.path.join(ROOT, 'data/places.json')
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return set(data.keys())
    except:
        return set()

missing = []
ok_count = 0

for html_name, id_val in links:
    # 确定 data 文件
    key = html_name.replace('.html', '')
    
    if key == 'place':
        keys = get_keys_from_places_json()
    elif key == 'district':
        # district.html 是静态页面，所有 ID 都硬编码在 HTML 中
        ok_count += 1
        continue
    else:
        data_path = DATA_FILES.get(key)
        if not data_path:
            missing.append((html_name, id_val, f"未知页面: {key}"))
            continue
        keys = get_keys_from_data_file(data_path)
    
    if id_val in keys:
        ok_count += 1
    else:
        missing.append((html_name, id_val, f"ID '{id_val}' 不在 data 文件中"))

print(f"\n✅ 验证通过: {ok_count}/{len(links)}")
if missing:
    print(f"\n❌ 缺少ID: {len(missing)}")
    for html_name, id_val, reason in missing[:15]:
        print(f"  ?？ {html_name}?id={id_val} -> {reason}")
    if len(missing) > 15:
        print(f"  ... 还有 {len(missing)-15} 个")
else:
    print("\n🎉 所有 ID 都有对应数据!")
