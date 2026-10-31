#!/usr/bin/env python3
"""
强制在所有含 var(--page-accent) 的 HTML 的 <style> 块顶部注入
:root { --page-accent: #xxx; --page-accent-dk: #xxx; }
无脑注入，不检查 if-exists
"""
import re, os, glob

ACCENT_MAP = {
    'guzhen': ('#8b5cf6', '#6d28d9'),
    'temple': ('#b45309', '#92400e'),
    'chaguan': ('#a16207', '#854d0e'),
    'night-market': ('#7c2d12', '#451a03'),
    'scenic': ('#1565c0', '#0d47a1'),
    'museum': ('#4338ca', '#312e81'),
    'tushuguan': ('#4338ca', '#312e81'),
    'laozihao': ('#b71c1c', '#7f1d1d'),
    'breakfast': ('#ea580c', '#c2410c'),
    'coffee': ('#6f4e37', '#4e342e'),
    'dessert': ('#ec4899', '#be185d'),
    'history': ('#0ea5e9', '#0369a1'),
    'street': ('#6b7280', '#374151'),
    'hangbang': ('#d98324', '#b45309'),
    'xiangxiang': ('#059669', '#065f46'),
    'intangible': ('#059669', '#065f46'),
    'cat': ('#1f7a5a', '#15603f'),
    'travel': ('#0ea5e9', '#0369a1'),
    'food': ('#dc2626', '#991b1b'),
    'tea': ('#16a34a', '#15803d'),
    'zhoubian': ('#0ea5e9', '#0369a1'),
    'zhoumo': ('#7c3aed', '#5b21b6'),
    'route': ('#7c3aed', '#5b21b6'),
    'district': ('#0ea5e9', '#0369a1'),
    'banshi': ('#0ea5e9', '#0369a1'),
    'life': ('#0ea5e9', '#0369a1'),
    'internet': ('#0891b2', '#0e7490'),
    'articles': ('#0ea5e9', '#0369a1'),
    'around': ('#0ea5e9', '#0369a1'),
    'traffic': ('#0ea5e9', '#0369a1'),
    'celebrity': ('#7c3aed', '#5b21b6'),
    'channel': ('#0ea5e9', '#0369a1'),
    'gujian': ('#0ea5e9', '#0369a1'),
    'story': ('#8a6fd6', '#6d28d9'),
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

    if 'var(--page-accent' not in html:
        return

    accent = find_accent(fname)
    if not accent:
        return

    fg, dk = accent

    # Check if :root declarations already exist in the first <style> block
    m = re.search(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)
    if not m:
        return
    first_style = m.group(1)
    if re.search(r'--page-accent\s*:\s*#[0-9a-fA-F]', first_style):
        # Variable definition exists, skip
        return

    # Inject :root at top of the first <style> block
    inject = f':root{{--page-accent:{fg};--page-accent-dk:{dk};}}\n'
    new_html = re.sub(
        r'(<style[^>]*>)\n?',
        r'\1\n' + inject,
        html,
        count=1  # only first <style>
    )

    with open(fname, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f'  OK {os.path.basename(fname)} accent={fg}')

base = '/Users/asind/PycharmProjects/ihangzhou-helper'
for g in sorted(glob.glob(os.path.join(base, '*.html'))):
    process(g)

print('Done.')
