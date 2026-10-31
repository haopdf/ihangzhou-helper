#!/usr/bin/env python3
"""第二批：美食细化+文化+办事  articles.html -> 独立页"""
import re

with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

count_before = sum(1 for l in lines if 'articles.html' in l)
print(f'Before: {count_before} lines with articles.html')

# Map of unique text fragments -> replacement URL
# key: unique substring (name-ish), value: new url
url_map = {
    '莫干山': 'zhoubian.html?id=mogan',
    '建德': 'zhoubian.html?id=jiande',
    # 茶馆
    '湖畔茶馆': 'chaguan.html?id=hu-pan-teahouse',
    '巷里茶馆': 'chaguan.html?id=hefang-yumin',
    '青砖茶室': 'chaguan.html?id=longjing-teahouse',
    '老茶馆记忆': 'chaguan.html?id=chaguan-zongguan',
    '茶空间': 'chaguan.html?id=si-chaguan',
    '宋式点茶': 'chaguan.html?id=chaguan-zongguan',
    '径山茶宴': 'chaguan.html?id=chayaun',
    '茶馆文化': 'chaguan.html?id=qianjiang-chaguan',
    '茶馆文化深度体验攻略': 'chaguan.html?id=chaguan-zongguan',
    '杭州茶馆文化体验': 'chaguan.html?id=chaguan-zongguan',
    '一条街的茶事': 'chaguan.html?id=chaguan-zongguan',
    '浙江茶文化传承': 'chaguan.html?id=chaguan-zongguan',
    # 老字号
    '奎元馆': 'laozihao.html?id=kuiyuanguan',
    '楼外楼': 'laozihao.html?id=louwailou',
    '王润兴': 'laozihao.html?id=wang-runxing',
    '胡庆余堂': 'laozihao.html?id=zhuo-ji-lao-zhao',
    '方回春堂': 'laozihao.html?id=zhuo-ji-lao-zhao',
    # 夜市
    '夜宵地图': 'night-market.html?id=yeshi',
    '街头美食地图': 'night-market.html?id=night-street-map',
    '现代夜经济': 'night-market.html?id=yesji-jingji',
    # 早餐
    '早餐江湖': 'breakfast.html?id=zaocan-jianghu',
    '小笼包地图': 'breakfast.html?id=xiaolongbao',
    # 甜品
    '江南甜糯点心': 'dessert.html?id=tianpin-jiangnan',
    '中秋与桂花': 'dessert.html?id=zhongqiu',
    '龙井茶食': 'dessert.html?id=longjing-chashi',
    # 龙井茶
    '龙井茶文化': 'tea.html?id=longjing-wenhua',
    '龙井茶园': 'tea.html?id=longjing-chayuan',
    '浙江传统茶文化': 'tea.html?id=longjing-chayi',
    # 博物馆
    '丝绸博物馆': 'museum.html?id=china-silk',
    '茶叶博物馆': 'museum.html?id=china-tea',
    '刀剪剑博物馆': 'museum.html?id=zhemo',
    '湿地博物馆': 'museum.html?id=zhejiang-art',
    '运河博物馆': 'museum.html?id=zhemo',
    '浙江省博物馆深度游': 'museum.html?id=zhemo',
    # 历史人文
    '大运河': 'history.html?id=dayun-he',
    '西湖申遗': 'history.html?id=liang-zhu-civil',
    '钱塘江': 'history.html?id=liang-zhu-civil',
    '古城墙': 'history.html?id=hang-zhou-arc',
    '运河两千年': 'history.html?id=dayun-he',
    '从运河记忆到新经济': 'history.html?id=zhejiang-modern',
    # 名人
    '白居易': 'celebrity.html?id=bai-juyi',
    '苏轼': 'celebrity.html?id=sushi',
    '秋瑾': 'celebrity.html?id=yulin-torng',
    '章太炎': 'celebrity.html?id=gen-shi',
    '林徽因': 'celebrity.html?id=linhe-jing',
    '郁达夫': 'celebrity.html?id=linhe-jing',
    '戴望舒': 'celebrity.html?id=hong-xue-yan',
    '宗庆后': 'celebrity.html?id=feng-meng-zhen',
    '西湖边的文人塑像': 'celebrity.html?id=sushi',
    '鲁迅与杭州': 'celebrity.html?id=gen-shi',
    # 故事
    '老底子杭州符号': 'story.html?id=hz-fuhao',
    '口头文化': 'story.html?id=koushou',
    '市井菜与街头小吃': 'story.html?id=shijing',
    # 古建
    '古桥': 'gujian.html?id=six-he-six-go',
    '古塔': 'gujian.html?id=liu-he-six-go',
    '古宅': 'gujian.html?id=hu-garden',
    '牌坊': 'gujian.html?id=liang-zhu-civil',
    '祠堂': 'gujian.html?id=tian-ning-temple',
    '书院': 'gujian.html?id=sixi-yin-cheng',
    '戏台': 'gujian.html?id=jinjiang-hotel',
    '牌楼': 'gujian.html?id=jinjiang-hotel',
    '古建筑打卡路线': 'gujian.html?id=liu-he-six-go',
    '拱宸桥': 'gujian.html?id=hu-garden',
    '六和塔': 'gujian.html?id=liu-he-six-go',
    # 非遗
    '西湖伞制作技艺': 'intangible.html?id=xihu-san',
    '越窑青瓷的复兴': 'intangible.html?id=yueyao',
    '杭州剪纸': 'intangible.html?id=hang-zhou-jianzhi',
    # 寺庙
    '径山寺与茶宴': 'temple.html?id=jingshan',
    # 图书馆
    '杭州图书馆': 'tushuguan.html?id=hz-tushuguan',
    '城市书房': 'tushuguan.html?id=xihu-shuguan',
    '动漫图书馆': 'tushuguan.html?id=zhejiang-tushuguan',
    '版本馆': 'tushuguan.html?id=zhejiang-sanguan',
    '24 小时': 'tushuguan.html?id=zhejiang-tushuguan',
    '农家书屋': 'tushuguan.html?id=zhejiang-adult',
    '数字图书馆': 'tushuguan.html?id=wuzhen-shuguan',
    '阅读空间': 'tushuguan.html?id=shufang-hangzhou',
    # 办事
    '社保转移': 'banshi.html?id=shebao',
    '社保缴费': 'banshi.html?id=shebao',
    '医保报销': 'banshi.html?id=shebao-yibao',
    '养老待遇': 'banshi.html?id=shebao-laoyang',
    '失业金': 'banshi.html?id=shebao-shiye',
    '工伤认定': 'banshi.html?id=shebao-gongshang',
    '灵活就业': 'banshi.html?id=shebao-linghuo',
    '租房提取': 'banshi.html?id=gjj',
    '购房提取': 'banshi.html?id=gjj-goufang',
    '还贷提取': 'banshi.html?id=gjj-huandai',
    '转移接续': 'banshi.html?id=gjj-zhuanyi',
    '贷款测算': 'banshi.html?id=gjj-daikuan',
    '退休提取': 'banshi.html?id=gjj-tuixiu',
    '缴存证明': 'banshi.html?id=gij-cunzheng',
    '积分落户': 'banshi.html?id=luohu-jifen',
    '投靠落户': 'banshi.html?id=luohu-toukao',
    '学历落户': 'banshi.html?id=luohu-xueli',
    '购房落户': 'banshi.html?id=luohu-goufang-luohu',
    '就业落户': 'banshi.html?id=luohu-jiuye',
    '居住证': 'banshi.html?id=luohu-juzhuzheng',
    '身份证': 'banshi.html?id=luohu-shenfenzheng',
    '地铁线路': 'banshi.html?id=jiaotong-ditie',
    '实时公交': 'banshi.html?id=jiaotong-gongjiao',
    '火车票': 'banshi.html?id=jiaotong-huoche',
}

# For ft items (4-elements), also define by description text
ft_url_map = {
    '杭州早餐江湖': 'breakfast.html?id=zaocan-jianghu',
    '片儿川': 'breakfast.html?id=pianer-chuan',
    '小笼包地图': 'breakfast.html?id=xiaolongbao',
    '江南甜糯点心': 'dessert.html?id=tianpin-jiangnan',
    '中秋与桂花': 'dessert.html?id=zhongqiu',
    '龙井茶食': 'dessert.html?id=longjing-chashi',
    '龙井茶文化': 'tea.html?id=longjing-wenhua',
    '龙井茶园': 'tea.html?id=longjing-chayuan',
    '浙江传统茶文化': 'tea.html?id=longjing-chayi',
    '医药龙头的商业帝国': 'laozihao.html?id=zhuo-ji-lao-zhao',
    '老药堂的消失': 'laozihao.html?id=zhuo-ji-lao-zhao',
    '杭州夜宵地图': 'night-market.html?id=yeshi',
    '街头美食地图': 'night-market.html?id=night-street-map',
    '现代夜经济': 'night-market.html?id=yesji-jingji',
    '浙江省博物馆深度游': 'museum.html?id=zhemo',
    '西湖边的文人塑像': 'celebrity.html?id=sushi',
    '鲁迅与杭州': 'celebrity.html?id=gen-shi',
    '老底子杭州符号': 'story.html?id=hz-fuhao',
    '口头文化': 'story.html?id=koushou',
    '市井菜与街头小吃': 'story.html?id=shijing',
    '古建筑打卡路线': 'gujian.html?id=liu-he-six-go',
    '拱宸桥': 'gujian.html?id=hu-garden',
    '六和塔': 'gujian.html?id=liu-he-six-go',
    '西湖伞制作技艺': 'intangible.html?id=xihu-san',
    '越窑青瓷的复兴': 'intangible.html?id=yueyao',
    '杭州剪纸': 'intangible.html?id=hang-zhou-jianzhi',
    '径山寺与茶宴': 'temple.html?id=jingshan',
    '城市书房的温情': 'tushuguan.html?id=xihu-shuguan',
    '杭州教育资源': 'tushuguan.html?id=zhejiang-sanguan',
    '阅读空': 'tushuguan.html?id=shufang-hangzhou',
    '杭州医保门诊报销': 'banshi.html?id=shebao-yibao',
    '杭州购房全攻略': 'banshi.html?id=luohu-goufang',
    '教育资源与公平': 'banshi.html?id=luohu-jiaoyu',
    '消失的老茶馆记忆': 'chaguan.html?id=chaguan-zongguan',
    '浙江茶文化传承': 'chaguan.html?id=chaguan-zongguan',
}

# Process each line
new_lines = []
changed = 0
for line in lines:
    if 'articles.html' not in line:
        new_lines.append(line)
        continue
    
    # Try to find the item name in the line for matching
    new_line = line
    
    # Priority: check ft_map first (more specific), then url_map
    found = False
    
    # ft items have 4 elements: ['emoji', 'name', 'desc', 'url']
    # th items have 3 elements: ['emoji', 'name', 'url']
    
    # Try ft_map keys (more specific, match desc text)
    for key in sorted(ft_url_map.keys(), key=len, reverse=True):
        if key in new_line and 'articles.html' in new_line:
            # Replace the URL part
            new_line = re.sub(r"'articles\.html\?q=[^']*'", "'" + ft_url_map[key] + "'", new_line, count=1)
            found = True
            changed += 1
            break
    
    if not found:
        # Try url_map keys
        for key in sorted(url_map.keys(), key=len, reverse=True):
            if key in new_line and 'articles.html' in new_line:
                new_line = re.sub(r"'articles\.html\?q=[^']*'", "'" + url_map[key] + "'", new_line, count=1)
                changed += 1
                break
    
    new_lines.append(new_line)

count_after = sum(1 for l in new_lines if 'articles.html' in l)
print(f'After batch 2: {count_after} articles.html lines remaining (was {count_before})')
print(f'Changed: {changed} lines')

with open('js/cat-data.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('File saved.')
