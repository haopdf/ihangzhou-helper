#!/usr/bin/env python3
"""Batch replace --page-accent with --primary across all HTML files."""
import os, re, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIR = ['node_modules', '.git', 'obsolete', 'tmp', '__pycache__']
COUNT = 0
TOTAL = 0

def walk_html():
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in SKIP_DIR]
        for f in fn:
            if f.endswith('.html'):
                yield os.path.join(dp, f)

for path in walk_html():
    with open(path, 'r', encoding='utf-8', errors='ignore') as fh:
        src = fh.read()
    new = src
    # Replace --page-accent and --page-accent-dk with --primary / --primary-dark
    new = re.sub(r'--page-accent-dk\b', '--primary-dark', new)
    new = re.sub(r'--page-accent-bg\b', '--primary-100', new)
    new = re.sub(r'--page-accent\b', '--primary', new)
    if new != src:
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(new)
        TOTAL += 1
        COUNT += src.count('--page-accent') + src.count('--page-accent-dk') + src.count('--page-accent-bg')
        print(os.path.relpath(path, ROOT), '-> replaced')

print(f'\nDone: {TOTAL} files updated, ~{COUNT} occurrences replaced')
