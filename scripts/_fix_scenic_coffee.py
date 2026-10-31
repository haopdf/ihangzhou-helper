#!/usr/bin/env python3
"""Fix scenic/coffee: rename .p-hero-sub → .p-card-desc to avoid conflict with channel.css .p-hero-sub"""
base = '/Users/asind/PycharmProjects/ihangzhou-helper'
for f in ['scenic.html', 'coffee.html']:
    p = f'{base}/{f}'
    with open(p, encoding='utf-8') as fh:
        html = fh.read()
    html = html.replace('.p-hero-sub', '.p-card-desc')
    with open(p, 'w', encoding='utf-8') as fh:
        fh.write(html)
    print(f'OK {f}')
