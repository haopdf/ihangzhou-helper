#!/usr/bin/env python3
"""
在每个含 <style> 的 HTML 的 <style> 块顶部插入 :root { --page-accent: ...; --page-accent-dk: ... }
让那 28 个页面都能用 CSS var，无需逐个改 class 名
"""
import re, os, sys, glob

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
    'story':      ('#8a6fd6', '#6d28d9'),
}

def find_accent(fname):
    name = os.path.basename(fname).replace('.html','')
    for k, v in ACCENT_MAP.items():
        if name.startswith(k) or k in name:
            return v
    return None

def process(fname):
    with open(fname, 'r', encoding='utf-8') as f:
        html = f.read()

    if '<style' not in html:
        return

    accent = find_accent(fname)
    if not accent:
        return

    fg, dk = accent
    inject = f':root{{--page-accent:{fg};--page-accent-dk:{dk};}}\n'

    # Inject at top of each <style> block
    def inject_into_style(m):
        tag = m.group(1)
        body = m.group(2)
        # Only inject once per block
        if '--page-accent' not in body:
            return tag + inject + body
        return m.group(0)

    new_html = re.sub(r'(<style[^>]*>)(.*?)(</style>)', inject_into_style, html, flags=re.DOTALL)

    if new_html != html:
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(new_html)
        print(f'  OK {os.path.basename(fname)}')
    else:
        print(f'  SKIP {os.path.basename(fname)} (already injected)')

base = '/Users/asind/PycharmProjects/ihangzhou-helper'
for g in sorted(glob.glob(os.path.join(base, '*.html'))):
    process(g)

print('\nDone: --page-accent injected into all inline <style> blocks.')
