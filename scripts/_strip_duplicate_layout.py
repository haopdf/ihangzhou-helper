#!/usr/bin/env python3
"""
把 third-level 页面中的重复 hero/inline-header 剥离：
- 移除每个页面重复的 <style> 块中的 hero/header 相关 class
- 移除硬编码的 <div class="hero"> 内容
- 保留数据容器和 <script>
这些页面应该统一使用 /templates/header.html 注入的 header。

使用方式：python3 _strip_duplicate_layout.py <file.html> [file2.html, ...]
"""
import re, sys, os

PATTERNS = [
    r'\.guzhen-hero[^{]*\{[^}]*\}\s*',
    r'\.guzhen-hero::[^{]*\{[^}]*\}\s*',
    r'\.guzhen-title-bar[^{]*\{[^}]*\}\s*',
]

def process(fname):
    with open(fname) as f: html = f.read()
    original = html

    # 1. 移除 data-hero div 和内联内容
    # 匹配形如 <div id="guzhenHero" class="guzhen-hero"> ... </div>（含 style/script）
    html = re.sub(r'<div[^>]*id="\w*[Hh]ero"[^>]*>.*?</div>', '', html, flags=re.DOTALL, count=1)

    # 2. 删除 <style> 块中已知的重复 header hero 规则
    def strip_style_headrule(style_block):
        # 删除以这些 selector 开头的规则（含 hero / title-bar）
        cleaned = re.sub(r'\.(guzhen|temple|chaguan|nm|tp|cg|sc)-hero\b[^{]*\{[^}]*\}', '', style_block)
        cleaned = re.sub(r'\.(guzhen|temple|chaguan|nm|tp|cg|sc)-title-bar\b[^{]*\{[^}]*\}', '', cleaned)
        return cleaned

    html = re.sub(r'(<style[^>]*>)(.*?)(</style>)',
                  lambda m: m.group(1) + strip_style_headrule(m.group(2)) + m.group(3),
                  html, flags=re.DOTALL)

    if html != original:
        with open(fname, 'w') as f: f.write(html)
        print(f'  OK  {os.path.basename(fname)}')
    else:
        print(f'  --  {os.path.basename(fname)} unchanged')

for f in sys.argv[1:]:
    if os.path.exists(f): process(f)
print('Done.')
