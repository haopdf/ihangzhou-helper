import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    # 交通
    ('https://www.hzcy.com.cn/', 'https://www.8684.cn/hz'),
    # 车辆
    ('https://www.hzparking.com/', 'https://www.hangzhou.gov.cn/'),
    ('https://www.zjtg.cn/', 'https://www.hangzhou.gov.cn/'),
    # 民生-工具
    ('https://theater.mtime.com/China_Zhejiang_Province_Hangzhou/', 'https://www.mtime.com/'),
    # 找工作
    ('https://www.zjgwy.gov.cn/', 'https://gwyty.jxpta.com/'),
    # 住房
    ('https://hangzhou.lianjia.com/', 'https://hz.lianjia.com/'),
    # 旅游-景点
    ('https://www.toxihu.com/', 'https://www.hangzhou.gov.cn/'),
    ('https://www.lingyin.org/', 'https://www.hangzhou.gov.cn/'),
    ('https://www.hzqtj.com/', 'https://www.hangzhou.gov.cn/'),
    ('https://www.1000islandlake.com/', 'https://www.hangzhou.gov.cn/'),
    ('https://www.hzmuseum.com/', 'https://www.hangzhou.gov.cn/'),
    ('https://www.damai.cn/hz/', 'https://www.damai.cn/'),
    ('https://tyj.hangzhou.gov.cn/', 'https://www.hangzhou.gov.cn/'),
    ('https://www.hzmarathon.com/', 'https://www.hangzhou.gov.cn/'),
    # go.hangzhou.com 全部是假的
    ('https://go.hangzhou.com/flower', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/picking', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/oneday', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/lantern', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/qixi', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/camping', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/hiking', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/family', 'https://www.hangzhou.gov.cn/'),
    ('https://go.hangzhou.com/free', 'https://www.hangzhou.gov.cn/'),
    # 龙井茶
    ('https://www.longjing.com/', 'https://www.hangzhou.gov.cn/'),
    # 杭州市政府链接统一到主站
    ('https://www.hangzhou.gov.cn//', 'https://www.hangzhou.gov.cn/'),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f'替换: {old} -> {new}')
        count += 1
    else:
        print(f'未找到: {old}')

# 清理重复斜杠
content = re.sub(r'https://www\.hangzhou\.gov\.cn//', 'https://www.hangzhou.gov.cn/', content)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f'\n共替换 {count} 处')
