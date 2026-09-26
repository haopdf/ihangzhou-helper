#!/usr/bin/env python3
"""修复所有频道页面的链接：内部链接不加 target="_blank"，外部链接加 target="_blank" """
import re
import glob
import os

def fix_channel_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 找到链接渲染的正则模式:
    # '<a class="sitem" href="' + item.url + '" target="_blank" rel="noopener noreferrer">'
    # 需要改为条件判断是否为外部链接
    
    # 匹配 if (item.url) 代码块
    pattern = r"(if \(item\.url\) \{\s*return '<a class=\"sitem\" href=\"' \+ item\.url \+ '\" target=\"_blank\" rel=\"noopener noreferrer\">)"
    
    replacement = """if (item.url) {
            var isExt = /^https?:\\/\\//i.test(item.url);
            var extAttr = isExt ? ' target="_blank" rel="noopener noreferrer"' : '';
            return '<a class="sitem" href="' + item.url + '"' + extAttr + '>'"""
    
    content = re.sub(pattern, replacement, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

# 修复所有已存在的频道文件
channel_files = [
    'banshi.html', 'traffic.html', 'food.html', 'laozihao.html',
    'celebrity.html', 'history.html', 'internet.html', 'zhaopin.html',
    'street.html', 'weekend.html', 'museum.html', 'coffee.html'
]

fixed = []
for f in channel_files:
    if os.path.exists(f):
        if fix_channel_file(f):
            fixed.append(f)
            print(f'✅ 已修复: {f}')
        else:
            print(f'⏭️  无需修复或已修复: {f}')

# 也修复生成器脚本
if os.path.exists('gen-channels.js'):
    with open('gen-channels.js', 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    
    pattern = r"('<a class=\"sitem\" href=\"' \+ item\.url \+ '\" target=\"_blank\" rel=\"noopener noreferrer\">')"
    replacement = """('<a class="sitem" href="' + item.url + '"' + ( /^https?:\\/\\//i.test(item.url) ? ' target="_blank" rel="noopener noreferrer"' : '' ) + '>')"""
    
    content = re.sub(pattern, replacement, content)
    
    if content != original:
        with open('gen-channels.js', 'w', encoding='utf-8') as f:
            f.write(content)
        fixed.append('gen-channels.js')
        print(f'✅ 已修复: gen-channels.js')

print(f'\n共修复 {len(fixed)} 个文件')
