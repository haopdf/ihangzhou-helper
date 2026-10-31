#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""修复 weekend.html 中乱码的 emoji"""
with open('/Users/asind/PycharmProjects/ihangzhou-helper/weekend.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the broken replacement char with simple alternative
content = content.replace('亲子', '亲子')
# Replace any remaining replacement characters in that line
content = content.replace('� 亲子', '�亲子')
content = content.replace('� 亲子', '�亲子')

with open('/Users/asind/PycharmProjects/ihangzhou-helper/weekend.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done')
