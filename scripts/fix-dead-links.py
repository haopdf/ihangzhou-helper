#!/usr/bin/env python3
"""修复 cms.json 中已确认的死链"""
import json

CMS_PATH = 'data/cms.json'

# 死链映射: 错误 URL → 正确 URL（已人工验证）
FIX_MAP = {
    # 杭州公积金: 子路径已下线，统一改为官网首页
    'https://gjj.hangzhou.gov.cn/xxcx/': 'https://gjj.hangzhou.gov.cn/',
    'https://gjj.hangzhou.gov.cn/tq/': 'https://gjj.hangzhou.gov.cn/',
    'https://gjj.hangzhou.gov.cn/dk/': 'https://gjj.hangzhou.gov.cn/',
    # 杭州摇号系统: 子页面路径已改版
    'https://hzxkctk.cn/yhxx/yhcx.aspx': 'https://hzxkctk.cn/',
    'https://hzxkctk.cn/yhxx/jjcx.aspx': 'https://hzxkctk.cn/',
    'https://hzxkctk.cn/sq/': 'https://hzxkctk.cn/',
    # 杭州公交查询: 改到正确的实时公交
    'https://www.hzbus.com.cn/': 'https://www.hzbus.com.cn/LineQuery.aspx',
}

with open(CMS_PATH, 'r', encoding='utf-8') as f:
    cms = json.load(f)

fix_count = 0
def fix_items(items, cat_id=None):
    global fix_count
    for item in items:
        u = item.get('url', '')
        if u in FIX_MAP:
            print(f"  ✓ [{cat_id}] {item.get('name','?')}: {u}")
            print(f"      → {FIX_MAP[u]}")
            item['url'] = FIX_MAP[u]
            fix_count += 1

# 修复分类 items
for cat in cms.get('categories', []):
    fix_items(cat.get('items', []), cat.get('id'))

# 修复 hot services
fix_items(cms.get('hotServices', []), 'hotServices')

with open(CMS_PATH, 'w', encoding='utf-8') as f:
    json.dump(cms, f, ensure_ascii=False, indent=2)

print(f"\n共修复 {fix_count} 条死链")
