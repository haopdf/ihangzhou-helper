#!/usr/bin/env python3
"""Quick screenshot verification for third-level channel pages."""
import subprocess, json, os, time, sys

base = 'http://localhost:8765'
pages = [
    ('guzhen.html?id=wuzhen', '古镇-乌镇'),
    ('temple.html?id=lingyin', '寺庙-灵隐'),
    ('chaguan.html?id=longjing', '茶馆-龙井'),
    ('night-market.html?id=wushan', '夜市-吴山'),
    ('coffee.html?id=westlake', '咖啡-西湖'),
    ('scenic.html?id=westlake', '景点-西湖'),
    ('tea.html?id=longjing', '龙井茶'),
    ('dessert.html?id=westlake', '甜品'),
    ('laozihao.html?id=huqingyutang', '老字号'),
    ('life.html?id=banshi', '生活办事'),
]

outdir = '/Users/asind/PycharmProjects/ihangzhou-helper/scripts/_screens'
os.makedirs(outdir, exist_ok=True)

for path, label in pages:
    url = f'{base}/{path}'
    safe = label.replace('/', '_').replace(' ', '_')
    outfile = f'{outdir}/{safe}.png'
    cmd = f'npx playwright screenshot --browser chromium --full-page --wait-for-timeout 3000 "{url}" "{outfile}" 2>&1'
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=30)
    if r.returncode == 0:
        size = os.path.getsize(outfile) if os.path.exists(outfile) else 0
        print(f'OK {label} ({size//1024}KB)')
    else:
        print(f'FAIL {label}: {r.stderr[:200]}')

print(f'\nScreenshots saved to {outdir}/')
