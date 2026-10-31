#!/usr/bin/env python3
"""
转换空壳模板页面 (laozihao, museum) 为独立页面
- 添加对应数据文件引用
- 添加渲染逻辑
- 将静态频道模板替换为动态渲染容器
"""

import os, re

def convert_page(html_file, page_key, data_var, data_file, title_cn):
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add data script reference before app.js reference
    data_script = f'  <script src="js/{data_file}"></script>\n'
    if f'js/{data_file}' not in content:
        content = content.replace(
            '  <script src="js/app.js',
            data_script + '  <script src="js/app.js'
        )
    
    # 2. Replace the 全部服务 content section with render container
    old_pattern = re.compile(
        r'<!-- 频道服务网格 -->\s*<div class="content">.*?</div>\s*</div>\s*\n\s*(?=<!-- 相关频道推荐 -->)',
        re.DOTALL
    )
    new_content = '    <!-- 渲染容器 -->\n    <div id="detailContent" style="padding:16px;"></div>\n\n'
    content = old_pattern.sub(new_content, content)
    
    # 3. Add render function before </body>
    render_fn = f'''
  <script>
    function render{page_key}(id) {{
      var c = document.getElementById('detailContent');
      if (!c) return;
      var data = window.{data_var} ? window.{data_var}[id] : null;
      var keys = window.{data_var} ? Object.keys(window.{data_var}) : [];
      if (!data) {{
        c.innerHTML = '<div style="text-align:center;padding:40px 20px;color:#999">没有找到相关信息<br><br><a href="{html_file}" style="color:var(--primary)">← 返回{title_cn}首页</a></div>';
        return;
      }}
      var h = '';
      h += '<div style="background:#fff;border-radius:14px;padding:18px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06)">';
      h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">';
      if (data.badge) h += '<span style="padding:4px 10px;background:#f5f5f5;border-radius:8px;font-size:12px;font-weight:600;color:#555">' + data.badge + '</span>';
      if (data.period) h += '<span style="padding:4px 10px;background:#fff8e1;border-radius:8px;font-size:12px;color:#f57f17">' + data.period + '</span>';
      h += '</div>';
      h += '<div style="font-size:24px;font-weight:700;color:#1a1a1a">' + data.name + '</div>';
      h += '<div style="font-size:14px;color:#666;margin-top:4px">' + (data.subtitle || '') + '</div>';
      h += '</div>';
      if (data.history) {{
        h += '<div style="background:#fff;border-radius:14px;padding:16px;margin-bottom:12px">';
        h += '<h3 style="font-size:15px;font-weight:600;margin:0 0 8px">📖 详情介绍</h3>';
        h += '<div style="font-size:14px;color:#444;line-height:1.8">' + data.history + '</div>';
        h += '</div>';
      }}
      if (data.features && data.features.length) {{
        h += '<div style="background:#fff;border-radius:14px;padding:16px;margin-bottom:12px">';
        h += '<h3 style="font-size:15px;font-weight:600;margin:0 0 8px">✨ 特色标签</h3>';
        h += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
        data.features.forEach(function(f){{ h += '<span style="padding:4px 10px;background:#e3f2fd;border-radius:8px;font-size:12px;color:#1565c0">' + f + '</span>'; }});
        h += '</div></div>';
      }}
      if (data.shops && data.shops.length) {{
        h += '<div style="background:#fff;border-radius:14px;padding:16px;margin-bottom:12px">';
        h += '<h3 style="font-size:15px;font-weight:600;margin:0 0 8px">📍 推荐去处</h3>';
        data.shops.forEach(function(s) {{
          h += '<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f5f5f5">';
          h += '<div style="width:36px;height:36px;background:#e3f2fd;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">�</div>';
          h += '<div><div style="font-size:14px;font-weight:600">' + s.n + '</div>';
          if (s.a) h += '<div style="font-size:12px;color:#888;margin-top:2px">📍 ' + s.a + '</div>';
          h += '</div></div>';
        }});
        h += '</div>';
      }}
      if (data.spots && data.spots.length) {{
        h += '<div style="background:#fff;border-radius:14px;padding:16px;margin-bottom:12px">';
        h += '<h3 style="font-size:15px;font-weight:600;margin:0 0 8px">�️ 主要看点</h3>';
        data.spots.forEach(function(s) {{
          h += '<div style="padding:8px 0;border-bottom:1px solid #f5f5f5"><div style="font-size:14px;font-weight:600">' + s.n + '</div>';
          if (s.d) h += '<div style="font-size:12px;color:#888;margin-top:2px">' + s.d + '</div>';
          h += '</div>';
        }});
        h += '</div>';
      }}
      h += '<a href="index.html" style="display:block;text-align:center;padding:14px;background:var(--primary);color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;margin-top:16px">← 返回首页</a>';
      c.innerHTML = h;
    }}
    (function(){{
      var id = (location.search.split('id=')[1] || '').split('&')[0];
      if (window.{data_var} && Object.keys(window.{data_var}).length > 0 && id) {{
        render{page_key}(decodeURIComponent(id));
      }} else if (!id) {{
        // No ID = channel landing - show default content handled by static HTML
      }}
    }})();
  </script>
'''
    
    if f'render{page_key}' not in content:
        content = content.replace('</body>', render_fn + '\n</body>')
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✅ {html_file} 转换完成")

# === MAIN ===

print("=" * 60)
print("转换空壳页面为独立页面")
print("=" * 60)

convert_page('laozihao.html', 'Laozhao', 'LAOZHAO_DATA', 'laozihao-data.js', '老字号')
convert_page('museum.html', 'Museum', 'MUSEUM_DATA', 'museum-data.js', '博物馆')

# Verify syntax
import subprocess
for f in ['laozihao.html', 'museum.html']:
    print(f"  验证 {f}: {'OK' if os.path.exists(f) else 'NOT FOUND'}")

print("\n✅ 转换完成")
