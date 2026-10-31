#!/usr/bin/env python3
"""
统一 third-level 页面配色：
- 从 background: linear-gradient 或 --page-accent 中提取 accent color → --page-accent, --page-accent-dk
- 替换整页所有 <style> 块中的 hex 色值为 CSS 变量
- theme-color 统一为 #1f7a5a
"""
import re, glob, os, sys

ACCENT_MAP = {
    'guzhen':     ('#8b5cf6', '#6d28d9'),
    'temple':     ('#b45309', '#92400e'),
    'chaguan':    ('#a16207', '#854d0e'),
    'night-market': ('#7c2d12', '#451a03'),
    'scenic':     ('#1565c0', '#0d47a1'),
    'museum':     ('#4338ca', '#312e81'),
    'tushuguan':  ('#4338ca', '#312e81'),
    'laozihao':   ('#b71c1c', '#7f1d1d'),
    'breakfast':  ('#ea580c', '#c2410c'),
    'coffee':     ('#6f4e37', '#4e342e'),
    'dessert':    ('#ec4899', '#be185d'),
    'history':    ('#0ea5e9', '#0369a1'),
    'street':     ('#6b7280', '#374151'),
    'hangbang':   ('#d98324', '#b45309'),
    'xiangxiang': ('#059669', '#065f46'),
    'intangible': ('#059669', '#065f46'),
    'cat':        ('#1f7a5a', '#15603f'),
    'travel':     ('#0ea5e9', '#0369a1'),
    'food':       ('#dc2626', '#991b1b'),
    'tea':        ('#16a34a', '#15803d'),
    'zhoubian':   ('#0ea5e9', '#0369a1'),
    'zhoumo':     ('#7c3aed', '#5b21b6'),
    'route':      ('#7c3aed', '#5b21b6'),
    'district':   ('#0ea5e9', '#0369a1'),
    'banshi':     ('#0ea5e9', '#0369a1'),
    'life':       ('#0ea5e9', '#0369a1'),
    'internet':   ('#0891b2', '#0e7490'),
    'articles':   ('#0ea5e9', '#0369a1'),
    'around':     ('#0ea5e9', '#0369a1'),
    'traffic':    ('#0ea5e9', '#0369a1'),
    'celebrity':  ('#7c3aed', '#5b21b6'),
    'channel':    ('#0ea5e9', '#0369a1'),
    'gujian':     ('#0ea5e9', '#0369a1'),
    'celeb':      ('#0ea5e9', '#0369a1'),
    'story':      ('#8a6fd6', '#6d28d9'),
    'place':      ('#0ea5e9', '#0369a1'),
}

def process(fname):
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()

    name = os.path.basename(fname).replace('.html','').replace('-data','')
    accent = None
    for k, v in ACCENT_MAP.items():
        if name.startswith(k) or k in name:
            accent = v
            break

    if not accent:
        print(f'  SKIP {fname} (no accent)')
        return

    fg, dk = accent
    fg_lo, dk_lo = fg.lower(), dk.lower()

    # --- Fix theme-color ---
    html = re.sub(
        r'(<meta\s+name="theme-color"\s+content=")#[0-9a-fA-F]{3,8}(")',
        r'\1#1f7a5a\2',
        html
    )

    # --- Find and process <style> blocks inside <head> ---
    def replace_style(m):
        tag_open = m.group(1)
        content  = m.group(2)
        tag_close = m.group(3)

        # Add CSS var support: replace hardcoded accent hex values with vars
        # Replace both the light and dark accent shades
        for h in [fg, dk, fg_lo, dk_lo]:
            if h == fg_lo or h == fg:
                content = content.replace(h, 'var(--page-accent)')
            elif h == dk_lo or h == dk:
                content = content.replace(h, 'var(--page-accent-dk)')

        # Replace hard-coded badge/section border colors that match accent
        # (already handled above with the .replace calls)

        return tag_open + content + tag_close

    html = re.sub(
        r'(<style[^>]*>)(.*?)(</style>)',
        replace_style,
        html,
        flags=re.DOTALL
    )

    # Add --page-accent vars via a single-line inject in head after style.css link
    inject = (
        '<style>:root{--page-accent:' + fg + ';'
        '--page-accent-dk:' + dk + '}</style>'
    )
    if '--page-accent' not in html:
        html = html.replace('</head>', inject + '</head>', 1)

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'  OK {fname} → accent={fg}')

if __name__ == '__main__':
    targets = sys.argv[1:] or glob.glob('*.html', root_dir='/Users/asind/PycharmProjects/ihangzhou-helper')
    base = '/Users/asind/PycharmProjects/ihangzhou-helper'
    for t in targets:
        fp = os.path.join(base, t) if not os.path.isabs(t) else t
        if os.path.exists(fp):
            process(fp)
    print(f'\nDone. Modify theme-color to brand green + injected --page-accent vars.')
