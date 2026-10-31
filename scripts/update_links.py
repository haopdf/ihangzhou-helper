#!/usr/bin/env python3
"""批量更新 cat-data.js 中的 articles.html?q= 链接到独立页面"""
import re

with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

count_before = content.count('articles.html')
print(f'Before: {count_before} articles.html links')

# Strategy: find all "articles?q=XXX" URLs and replace based on the keyword
# Each mapping: (search_fragment, replacement)
# Fragments include unique context to identify the exact link

replacements = [
    # === 周边游 ===
    ("'莫干山', 'articles.html?q=%E8%8E%AB%E5%B9%B2%E5%B1%B1'",
     "'莫干山', 'zhoubian.html?id=mogan'"),
    ("'千岛湖', 'tea.html?id=qian'",
     "'千岛湖', 'zhoubian.html?id=qiandao'"),
    ("'安吉', 'articles.html?q=%E5%AE%89%E5%90%89'",
     "'安吉', 'zhoubian.html?id=anji'"),
    ("'天目山', 'articles.html?q=%E5%A4%A9%E7%9B%AE%E5%B1%B1'",
     "'天目山', 'zhoubian.html?id=tianmu'"),
    ("'桐庐', 'articles.html?q=%E6%A1%90%E5%BA%90'",
     "'桐庐', 'zhoubian.html?id=tonglu'"),
    ("'淳安', 'articles.html?q=%E6%B7%B3%E5%AE%89'",
     "'淳安', 'zhoubian.html?id=chunan'"),
    ("'千岛湖国庆攻略', '烟花秀、露营与交通指南', 'articles.html?q=%E5%8D%83%E5%B2%9B%E6%B9%96'",
     "'千岛湖国庆攻略', '烟花秀、露营与交通指南', 'zhoubian.html?id=qiandao'"),
    ("'安吉竹海民宿', '竹林深处怎么选怎么订', 'articles.html?q=%E5%AE%89%E5%90%89'",
     "'安吉竹海民宿', '竹林深处怎么选怎么订', 'zhoubian.html?id=anji'"),

    # === 周末去哪 th ===
    ("'亲子', 'articles.html?q=%E4%BA%B2%E5%AD%90'",
     "'亲子', 'weekend.html?id=qinzi'"),
    ("'展览', 'articles.html?q=%E5%B1%95%E8%A7%88'",
     "'展览', 'weekend.html?id=zhanluan'"),
    ("'演出', 'articles.html?q=%E6%BC%94%E5%87%BA'",
     "'演出', 'weekend.html?id=yanchang'"),
    ("'市集', 'articles.html?q=%E5%B8%82%E9%9B%86'",
     "'市集', 'weekend.html?id=shiji'"),
    ("'露营', 'articles.html?q=%E9%9C%B2%E8%90%A5'",
     "'露营', 'weekend.html?id=luying'"),
    ("'骑行', 'articles.html?q=%E9%AA%91%E8%A1%8C'",
     "'骑行', 'weekend.html?id=qihang-weekend'"),
    ("'徒步', 'articles.html?q=%E5%BE%92%E6%AD%A5'",
     "'徒步', 'weekend.html?id=tube'"),
    ("'赏花', 'articles.html?q=%E8%B5%8F%E8%8A%B1'",
     "'赏花', 'weekend.html?id=shanghua'"),
    # 周末 ft
    ("'国庆免费玩 10 个地方', '不花钱也能玩好的杭州清单', 'articles.html?q=%E5%9B%BD%E5%BA%86%E5%85%8D%E8%B4%B9'",
     "'国庆免费玩 10 个地方', '不花钱也能玩好的杭州清单', 'weekend.html?id=qinzi'"),
    ("'天目山音乐节', '时间阵容购票交通全指南', 'articles.html?q=%E9%9F%B3%E4%B9%90%E8%8A%82'",
     "'天目山音乐节', '时间阵容购票交通全指南', 'weekend.html?id=yanchang'"),

    # === 街巷漫步 th ===
    ("['🏠', '小河直街', 'street.html']",
     "['🏠', '小河直街', 'xiangxiang.html?id=xiaoxi']"),
    ("'大兜路', 'articles.html?q=%E5%A4%A7%E5%85%9C%E8%B7%AF'",
     "'大兜路', 'xiangxiang.html?id=dadou'"),
    ("'馒头山', 'articles.html?q=%E9%A6%92%E5%A4%B4%E5%B1%B1'",
     "'馒头山', 'xiangxiang.html?id=mantou'"),
    ("'河坊街', 'articles.html?q=%E6%B2%B3%E5%9D%8A%E8%A1%97'",
     "'河坊街', 'xiangxiang.html?id=hefang-street'"),
    ("['�', '五柳巷', 'history.html'",
     "['�', '五柳巷', 'xiangxiang.html?id=wuliu'"),
    ("['🏯', '南宋御街', 'history.html'",
     "['�', '南宋御街', 'xiangxiang.html?id=zhedong'"),
    ("'北山街', 'articles.html?q=%E5%8C%97%E5%B1%B1%E8%A1%97'",
     "'北山街', 'xiangxiang.html?id=beishan'"),
    ("'南山路', 'articles.html?q=%E5%8D%97%E5%B1%B1%E8%B7%AF'",
     "'南山路', 'xiangxiang.html?id=nanshan'"),
    # 街巷 ft
    ("'河坊街千年古巷', '一条街读尽杭州市井', 'articles.html?q=%E6%B2%B3%E5%9D%8A%E8%A1%97'",
     "'河坊街千年古巷', '一条街读尽杭州市井', 'xiangxiang.html?id=hefang-street'"),
    ("'运河边的老街', '从开通到复兴的 2000 年', 'articles.html?q=%E8%BF%90%E6%B2%B3'",
     "'运河边的老街', '从开通到复兴的 2000 年', 'xiangxiang.html?id=zhedong'"),

    # === 路线 ft ===
    ("'环西湖骑行线', '十景怎么串最顺', 'articles.html?q=%E9%AA%91%E8%A1%8C'",
     "'环西湖骑行线', '十景怎么串最顺', 'route.html?id=qihang'"),
    ("'杭黄高铁沿线', '千岛湖、黄山一线玩', 'articles.html?q=%E9%AB%98%E9%93%81'",
     "'杭黄高铁沿线', '千岛湖、黄山一线玩', 'route.html?id=gaotie'"),

    # === 西湖十景 ===
    ("'三潭印月', 'articles.html?q=%E4%B8%89%E6%BD%AD%E5%8D%B0%E6%9C%88'",
     "'三潭印月', 'scenic.html?id=xihu-san'"),
    ("'曲院风荷', 'articles.html?q=%E6%9B%B2%E9%99%A2%E9%A3%8E%E8%8D%B7'",
     "'曲院风荷', 'scenic.html?id=xihu-qu'"),
    ("'平湖秋月', 'articles.html?q=%E5%B9%B3%E6%B9%96%E7%A7%8B%E6%9C%88'",
     "'平湖秋月', 'scenic.html?id=xihu-ping'"),
    ("'南屏晚钟', 'articles.html?q=%E5%8D%97%E5%B1%8F%E6%99%9A%E9%92%9F'",
     "'南屏晚钟', 'scenic.html?id=xihu-nan'"),
    ("'柳浪闻莺', 'articles.html?q=%E6%9F%B3%E6%B5%AA%E9%97%BB%E8%8E%BA'",
     "'柳浪闻莺', 'scenic.html?id=xihu-liu'"),
    ("'花港观鱼', '鱼游花间的闲情雅致', 'articles.html?q=%E8%8A%B1%E6%B8%AF%E8%A7%82%E9%B1%BC'",
     "'花港观鱼', '鱼游花间的闲情雅致', 'scenic.html?id=xihu-hua'"),

    # === 杭帮菜 ft ===
    ("'西湖醋鱼与东坡肉', '两道招牌菜的文化密码', 'articles.html?q=%E8%A5%BF%E6%B9%96%E9%86%8B%E9%B1%BC'",
     "'西湖醋鱼与东坡肉', '两道招牌菜的文化密码', 'hangbang.html?id=xihu-cuyu'"),
    ("'片儿川', '杭州小吃的清新美学', 'articles.html?q=%E7%89%87%E5%84%BF%E5%B7%9D'",
     "'片儿川', '杭州小吃的清新美学', 'hangbang.html?id=pianer-chuan'"),

    # === 咖啡 th ===
    ("'西湖边', 'coffee.html']",
     "'西湖边', 'coffee.html?id=hu-pan']"),
    ("'写字楼', 'articles.html?q=%E5%86%99%E5%AD%97%E6%A5%BC'",
     "'写字楼', 'coffee.html?id=xiezilou'"),
    ("'青芝坞', 'articles.html?q=%E9%9D%92%E8%8A%9D%E5%9D%9E'",
     "'青芝坞', 'coffee.html?id=qinzhaizi'"),
    ("'馒头山', 'articles.html?q=%E9%A6%92%E5%A4%B4%E5%B1%B1'",
     "'馒头山', 'coffee.html?id=mantou-shan'"),
    ("'四眼井', 'articles.html?q=%E5%9B%9B%E7%9C%BC%E4%BA%95'",
     "'四眼井', 'coffee.html?id=siyanku'"),
    ("'满觉陇', 'articles.html?q=%E6%BB%A1%E8%A7%89%E9%99%87'",
     "'满觉陇', 'coffee.html?id=manjue-cafe'"),
    ("'天目里', 'articles.html?q=%E5%A4%A9%E7%9B%AE%E9%87%8C'",
     "'天目里', 'coffee.html?id=tianmuli'"),
    ("'东信和创', 'articles.html?q=%E4%B8%9C%E4%BF%A1%E5%92%8C%E5%88%9B'",
     "'东信和创', 'coffee.html?id=dongxin'"),
    ("'亲子咖啡馆攻略', '周末溜娃好去处', 'articles.html?q=%E5%92%AA%E5%92%95%E5%92%95'",
     "'亲子咖啡馆攻略', '周末溜娃好去处', 'coffee.html?id=hu-pan'"),
]

# Apply each replacement
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f'  ✓ Replaced: {old[:50]}...')
    else:
        print(f'  ✗ NOT FOUND: {old[:50]}...')

count_after = content.count('articles.html')
print(f'\nAfter first batch: {count_after} articles.html links remaining (was {count_before})')

with open('js/cat-data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('File saved.')
