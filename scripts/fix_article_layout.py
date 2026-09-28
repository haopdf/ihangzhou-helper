#!/usr/bin/env python3
"""
批量修复文章页头尾布局不一致问题
- 移除旧 topbar + 设置面板 + bottom-nav
- 移除旧 app.js + theme-init 脚本
- 引入 layout.js 统一模板系统
- 添加 IHZ_PAGE 配置
"""
import os
import re
import glob
import sys

ARTICLES_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'articles')
SKIP_FILES = {'index.json', 'keywords.json', 'topics.json', 'index.html'}

def fix_article(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 跳过已使用 layout.js 的文件
    if 'js/layout.js' in content:
        return 'skip'
    
    original = content
    
    # 1. 移除旧 header (topbar + 设置面板 + 它们之间的空行)
    #    匹配从 <header class="topbar" 到 settings-panel 结束
    content = re.sub(
        r'\s*<header class="topbar" id="topbar">'
        r'.*?</header>'
        r'\s*<!-- 设置面板 -->'
        r'\s*<div class="settings-overlay" id="settingsOverlay"[^>]*></div>'
        r'\s*<div class="settings-panel" id="settingsPanel">'
        r'.*?</div>\s*</div>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 2. 移除旧 app.js + 主题初始化脚本
    content = re.sub(
        r'\s*<script src="\.\./js/app\.js"></script>'
        r'\s*<script>\s*// 主题 \+ 老人模式持久化'
        r'.*?</script>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 3. 移除旧底部导航
    content = re.sub(
        r'\s*<!-- 底部导航 -->'
        r'\s*<nav class="bottom-nav">'
        r'.*?</nav>',
        '',
        content,
        flags=re.DOTALL
    )
    
    # 4. 添加 layout.js 到 <head>（如果没有）
    if 'js/layout.js' not in content:
        content = content.replace('</head>', '  <script src="../js/layout.js"></script>\n</head>')
    
    # 5. 提取标题用于 IHZ_PAGE
    title_match = re.search(r'<title>(.*?) · iHangzhou', content)
    # 去掉 emoji（如 "⛩️ "），保留纯文字
    raw_title = title_match.group(1) if title_match else '文章'
    # 如果标题太长，截断
    if len(raw_title) > 30:
        page_title = raw_title[:30]
    else:
        page_title = raw_title
    
    # 6. 在 <body> 后插入 IHZ_PAGE 配置
    body_tag_match = re.search(r'<body>', content)
    if body_tag_match and 'IHZ_PAGE' not in content:
        insert_pos = body_tag_match.end()
        ihz_page = (
            "\n<script>\n"
            "  window.IHZ_PAGE = { title: '" + page_title.replace("'", "\\'") + "', icon: '📖', channelId: 'articles' };\n"
            "</script>"
        )
        content = content[:insert_pos] + ihz_page + content[insert_pos:]
    
    # 7. 在 </body> 前添加 IZ.layout.init()
    if 'IZ.layout.init' not in content:
        layout_init = (
            "\n<script>\n"
            "  if (window.IZ && IZ.layout) {\n"
            "    document.addEventListener('DOMContentLoaded', IZ.layout.init);\n"
            "  }\n"
            "</script>\n"
        )
        content = content.replace('</body>', layout_init + '</body>')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return 'fixed'
    return 'nochange'

def main():
    files = glob.glob(os.path.join(ARTICLES_DIR, '*.html'))
    files.sort()
    
    print(f"找到 {len(files)} 个文章文件")
    
    stats = {'fixed': 0, 'skip': 0, 'nochange': 0, 'error': 0}
    errors = []
    
    for i, filepath in enumerate(files):
        try:
            result = fix_article(filepath)
            stats[result] += 1
            if result == 'fixed' and (i < 5 or i % 200 == 0):
                print(f"  [{i+1}/{len(files)}] ✓ {os.path.basename(filepath)}")
        except Exception as e:
            stats['error'] += 1
            errors.append((os.path.basename(filepath), str(e)))
    
    print(f"\n{'='*50}")
    print(f"处理完成:")
    print(f"  已修复: {stats['fixed']}")
    print(f"  已跳过(已有layout): {stats['skip']}")
    print(f"  无变化: {stats['nochange']}")
    print(f"  出错:   {stats['error']}")
    
    if errors:
        print(f"\n出错文件:")
        for name, err in errors[:20]:
            print(f"  {name}: {err}")

if __name__ == '__main__':
    main()
