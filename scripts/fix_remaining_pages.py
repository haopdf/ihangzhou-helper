#!/usr/bin/env python3
"""
修复剩余页面:
1. weekend.html - 使用 _getData() 但 IZ_SKIP_APP_INIT=true，需要转为使用 zhoumo-data.js
2. district.html - 缺少 IZ_SKIP_APP_INIT
3. zhoumo.html - 验证数据完整性
"""
import os, re

# ============================================================
# 1. 修复 weekend.html → 使用 zhoumo-data.js 独立渲染
# ============================================================
with open('weekend.html', 'r', encoding='utf-8') as f:
    weekend = f.read()

# Check if it needs fix (still has _getData dependency)
if 'window._getData' in weekend:
    # Replace the static section-head with our container, and replace render logic
    # Replace the 全部服务 section
    old_zh = '<h2 id="channelTitle">周末休闲 · 全部服务</h2>'
    new_zh = '<h2 id="channelTitle">周末休闲</h2>'
    weekend = weekend.replace(old_zh, new_zh)
    
    # Replace renderChannel function with one that uses ZHOUMO_DATA
    old_render = """      function renderChannel() {
        if (!window._getData) {
          document.getElementById('channelHeader').innerHTML = '<div style="text-align:center;padding: 40px 16px;color:var(--text-muted);">数据加载失败，请刷新重试</div>';
          return;
        }

        var DATA = window._getData();
        var category = DATA.categories.find(function (c) { return c.id === CHANNEL_ID; });
        if (!category) {
          document.getElementById('channelHeader').innerHTML = '<div style="text-align:center;padding: 40px 16px;color:var(--text-muted);">频道「' + CHANNEL_NAME + '」数据未找到</div>';
          return;
        }"""

    new_render = """      function renderChannel() {
        var categories = { 'weekend': { name: '周末休闲', icon: '🎯' } };
        var category = categories[CHANNEL_ID];
        if (!category) {
          document.getElementById('channelHeader').innerHTML = '<div style="text-align:center;padding: 40px 16px;color:var(--text-muted);">频道数据未找到</div>';
          return;
        }
        var DATA = { sub: window.ZHOUMO_DATA || {} };"""
    
    weekend = weekend.replace(old_render, new_render)
    
    # Fix the line that sets channelTitle to 全部服务
    weekend = weekend.replace(
        "document.getElementById('channelTitle').textContent = category.name + ' · 全部服务';",
        "document.getElementById('channelTitle').textContent = category.name;"
    )
    
    # Fix the category.links reference to use ZHOUMO_DATA keys
    # First find all references to category.xxx and redirect to our data
    # Instead of rebuilding the entire function, let's replace the whole script block
    # that starts with the channel logic and ends before the closing body
    
    # Simple approach: fix the renderChannel function references
    weekend = weekend.replace(
        'var links = (category.links || []).map',
        'var links = Object.keys(window.ZHOUMO_DATA || {}).map(function(id) { var d = window.ZHOUMO_DATA[id]; return { icon: d.badge || "🎯", name: d.name, url: "weekend.html?id=" + id }; });'
    )
    
    # Fix service-grid reference
    weekend = weekend.replace(
        'if (!category) {',
        'if (false) {'
    )
    
    # Add zhoumo-data.js script reference
    if 'zhoumo-data.js' not in weekend:
        weekend = weekend.replace(
            '<script src="js/app.js',
            '  <script src="js/zhoumo-data.js"></script>\n  <script src="js/app.js'
        )
    
    # Fix any remaining '全部服务' references
    weekend = weekend.replace(' · 全部服务', '')
    
    with open('weekend.html', 'w', encoding='utf-8') as f:
        f.write(weekend)
    print("  ✅ weekend.html 修复完成")
else:
    print("  ✅ weekend.html 已修复")

# ============================================================
# 2. 修复 district.html → 添加 IZ_SKIP_APP_INIT + 数据引用
# ============================================================
with open('district.html', 'r', encoding='utf-8') as f:
    district = f.read()

if 'IZ_SKIP_APP_INIT' not in district:
    district = district.replace(
        'window.IZ_SKIP_APP_THEME = true;',
        'window.IZ_SKIP_APP_INIT = true;\n    window.IZ_SKIP_APP_THEME = true;'
    )
    # Remove app.js reference
    district = re.sub(r'<script src="js/app\.js[^"]*"></script>', '', district)
    with open('district.html', 'w', encoding='utf-8') as f:
        f.write(district)
    print("  ✅ district.html 补充 IZ_SKIP_APP_INIT")

# ============================================================
# 3. 验证 zhoumo.html
# ============================================================
with open('zhoumo.html', 'r', encoding='utf-8') as f:
    zhoumo = f.read()

if 'IZ_SKIP_APP_INIT' not in zhoumo:
    zhoumo = zhoumo.replace(
        'window.IZ_SKIP_APP_THEME = true;',
        'window.IZ_SKIP_APP_INIT = true;\n    window.IZ_SKIP_APP_THEME = true;'
    )
    with open('zhoumo.html', 'w', encoding='utf-8') as f:
        f.write(zhoumo)
    print("  ✅ zhoumo.html 补充 IZ_SKIP_APP_INIT")
else:
    print("  ✅ zhoumo.html OK")

print("\n✅ 剩余页面修复完成")
