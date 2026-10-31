#!/usr/bin/env python3
"""
全面修复独立页面:
1. coffee.html / scenic.html 缺少 IZ_SKIP_APP_INIT 处填补
2. cat-data.js 中三级链接 ID 在数据文件中不存在的 处补数据
3. 西湖系列空文章 处删除
"""
import re, os, subprocess

def get_keys(data_file):
    """Extract all entry keys from data file"""
    if not os.path.exists(data_file):
        return set()
    with open(data_file, 'r', encoding='utf-8') as f:
        content = f.read()
    return set(re.findall(r"'([^']+)':\s*\{", content))

def format_entry(key, fields):
    """Format a single JS object entry with proper indentation"""
    lines = []
    for k, v in fields.items():
        if isinstance(v, str):
            escaped = v.replace('\\', '\\\\').replace("'", "\\'")
            lines.append(f"    {k}: '{escaped}'")
        elif isinstance(v, (bool, int, float)):
            lines.append(f"    {k}: {str(v).lower() if isinstance(v, bool) else v}")
        elif isinstance(v, list):
            items = []
            for item in v:
                if isinstance(item, dict):
                    pairs = []
                    for dk, dv in item.items():
                        if isinstance(dv, (int, float)):
                            pairs.append(f"{dk}: {dv}")
                        else:
                            pairs.append(f"{dk}: '{str(dv).replace(chr(39), chr(92)+chr(39))}'")
                    items.append("{" + ", ".join(pairs) + "}")
                elif isinstance(item, (int, float)):
                    items.append(str(item))
                else:
                    items.append(f"'{str(item).replace(chr(39), chr(92)+chr(39))}'")
            lines.append(f"    {k}: [{', '.join(items)}]")
    return f"  '{key}': {{\n{',\n'.join(lines)}\n  }},\n"

def add_entries(data_file, entries_dict):
    """Append new entries before the final }; closure, fixing trailing commas"""
    with open(data_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    insert_pos = content.rfind('};')
    if insert_pos <= 0:
        return False
    
    # Check if the character before insert_pos needs a comma
    # Look backwards to find the real end of the last entry
    before = content[:insert_pos].rstrip()
    
    # Ensure there's a comma before our insertion
    if before.endswith('}'):
        before = before + ','
    elif not before.endswith(','):
        # Find the last } and ensure it's followed by a comma
        last_brace = before.rfind('}')
        if last_brace >= 0:
            before = before[:last_brace+1] + ',' + before[last_brace+1:]
    
    new_entries = ""
    for key in entries_dict:
        # Skip if key already exists
        if f"'{key}':" in content:
            continue
        new_entries += format_entry(key, entries_dict[key])
    
    if not new_entries:
        return False
    
    content = before + "\n" + new_entries + content[insert_pos:]
    
    with open(data_file, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

def fix_page(html_file):
    """Ensure HTML page has IZ_SKIP_APP_INIT and doesn't load app.js"""
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
    changed = False
    if 'IZ_SKIP_APP_INIT' not in html:
        html = html.replace('window.IZ_SKIP_APP_THEME = true;',
                            'window.IZ_SKIP_APP_INIT = true;\n    window.IZ_SKIP_APP_THEME = true;')
        html = re.sub(r'<script src="js/app\.js[^"]*"></script>\s*\n?', '', html)
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html)
        changed = True
    return changed

# === MAIN ===
print("=" * 60)
print("STEP 1: 补漏 IZ_SKIP_APP_INIT")
print("=" * 60)

for page in ['coffee.html', 'scenic.html']:
    if os.path.exists(page) and fix_page(page):
        print("  ✅ " + page)

print("\n" + "=" * 60)
print("STEP 2: 删除西湖系列空文章")
print("=" * 60)

deleted = 0
if os.path.exists('articles'):
    for f in sorted(os.listdir('articles')):
        if f.startswith('西湖系列-') and f.endswith('.html'):
            path = os.path.join('articles', f)
            size = os.path.getsize(path)
            if size < 800:
                os.remove(path)
                print(f"  删除 {f} ({size}b)")
                deleted += 1
print(f"  共删除 {deleted} 个")

print("\n" + "=" * 60)
print("STEP 3: 补全缺失数据 ID")
print("=" * 60)

with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    cat_data = f.read()

# --- dessert ---
links = set(re.findall(r"dessert\.html\?id=([^']+)'", cat_data))
missing = links - get_keys('js/dessert-data.js')
if missing:
    entries = {
        'tianpin-jiangnan': {
            'name': '江南甜糯点心', 'subtitle': '糯米控的天堂', 'badge': '�',
            'period': '传统',
            'history': '江南一带以糯米为主角的点心统称，条头糕、定胜糕、桂花糕皆入此列。软糯香甜，是杭州人从小吃到大的味道。',
            'features': ['糯米为主', '软糯香甜', '种类丰富', '传统街头'],
            'shops': [{'n': '知味观', 'a': '仁和路83号'}, {'n': '街边老店', 'a': '河坊街'}]
        },
        'zhongqiu': {
            'name': '中秋食俗', 'subtitle': '桂花几时有', 'badge': '�',
            'period': '南宋',
            'history': '南宋时杭州中秋赏月已成习俗。月饼、桂花糖藕、芋头、菱角是传统佳品，满城桂香伴圆月。',
            'features': ['中秋赏月', '桂花糖藕', '月饼芋头', '满城桂香'],
            'shops': [{'n': '知味观', 'a': '各门店'}, {'n': '五味和', 'a': '商业圈'}]
        },
        'longjing-chashi': {
            'name': '龙井茶食', 'subtitle': '以茶入点清香雅韵', 'badge': '�',
            'period': '自创',
            'history': '将龙井茶粉融入糕点、冰淇淋、巧克力，创新食茶方式。茶香与甜味平衡，是杭州茶文化的现代演绎。',
            'features': ['龙井粉入食', '茶香清苦', '创新茶点', '伴手礼首选'],
            'shops': [{'n': '茶叶博物馆餐厅', 'a': '龙井路88号'}, {'n': '茶庄茶室', 'a': '西湖周边'}]
        }
    }
    valid = {k: v for k, v in entries.items() if k in missing}
    if valid and add_entries('js/dessert-data.js', valid):
        print(f"  ✅ dessert-data.js +{len(valid)} 条目")

# --- tea ---
links = set(re.findall(r"tea\.html\?id=([^']+)'", cat_data))
missing = links - get_keys('js/tea-data.js')
if missing:
    entries = {
        'jingcha': {
            'name': '径山茶', 'subtitle': '日本茶乡之源', 'badge': '�',
            'history': '产于余杭区径山，唐代僧人法钦开山种茶，日本僧人南浦昭明来此学习茶礼，后传至日本成为茶道之源。',
            'features': ['千年茶乡', '茶宴文化', '日本茶道源头', '绿茶精品'],
            'origin': '余杭区径山', 'altitude': '海拔1000米'
        },
        'longjing-chayi': {
            'name': '龙井茶意', 'subtitle': '色绿香郁味甘形美', 'badge': '🍃',
            'history': '龙井茶是中国十大名茶之首，产于西湖群山。以色绿、香郁、味甘、形美四绝著称，乾隆皇帝曾四访龙井。',
            'features': ['西湖产区', '四绝品质', '手工炒制', '贡茶历史'],
            'origin': '西湖风景名胜区'
        },
        'longjing-chayuan': {
            'name': '龙井茶园', 'subtitle': '云雾缭绕的茶山风光', 'badge': '�️',
            'history': '分布在西湖风景名胜区周边山坡，春季茶山翠绿，采茶女忙碌其间，是杭州最美的春日风景。',
            'features': ['茶山风光', '春茶最佳', '亲子体验'],
            'best_season': '春季'
        },
        'longjing-wenhua': {
            'name': '龙井茶文化', 'subtitle': '一杯龙井的千年传承', 'badge': '�',
            'history': '始于唐代，兴于宋代，盛于明清。从品种选育、采摘炒制到冲泡品饮，每一个环节蕴含深厚的文化内涵。',
            'features': ['千年传承', '非遗技艺', '泡茶艺术', '杭州城市名片'],
            'brew_temp': '80-85C'
        }
    }
    valid = {k: v for k, v in entries.items() if k in missing}
    if valid and add_entries('js/tea-data.js', valid):
        print(f"  ✅ tea-data.js +{len(valid)} 条目")

# --- laozihao ---
links = set(re.findall(r"laozihao\.html\?id=([^']+)'", cat_data))
missing = links - get_keys('js/laozihao-data.js')
if missing:
    entries = {
        'louwailou': {
            'name': '楼外楼', 'subtitle': '百年名店西湖孤山', 'badge': '🏮',
            'period': '清道光',
            'history': '始创于1848年，坐落在西湖孤山，以西湖醋鱼、龙井虾仁、叫化童鸡等杭帮名菜闻名。鲁迅、周恩来曾莅临。',
            'features': ['1848年始创', '西湖醋鱼发源地', '龙井虾仁', '国宴名店'],
            'shops': [{'n': '总店', 'a': '孤山路30-1号'}, {'n': '分店', 'a': '多家'}]
        },
        'wang-runxing': {
            'name': '王润兴', 'subtitle': '乾隆御赐招牌', 'badge': '🏮',
            'period': '清道光',
            'history': '始创于1844年，相传乾隆皇帝品尝后御赐招牌。以鱼头豆腐、盐件儿等传统杭帮菜闻名。',
            'features': ['乾隆御赐', '鱼头豆腐', '盐件儿', '百年老店'],
            'shops': [{'n': '门店', 'a': '河坊街周边'}]
        },
        'zhuo-ji-lao-zhao': {
            'name': '胡庆余堂', 'subtitle': '江南药王百年国药', 'badge': '🏮',
            'period': '清同治',
            'history': '胡雪岩于1874年创办，戒欺为堂训。生产中成药数百种，是现存最完整的晚清药铺建筑，国家级文保。',
            'features': ['戒欺文化', '晚清建筑', '中成药', '国家级文保'],
            'shops': [{'n': '大井巷总店', 'a': '大井巷95号'}]
        },
        'laozihao-zongguan': {
            'name': '老字号总览', 'subtitle': '杭州百家老字号一览', 'badge': '🏮',
            'history': '杭州拥有百家以上老字号，涵盖餐饮、药业、茶庄、百货等领域，是杭州商业文明的活化石。',
            'features': ['百家以上', '非遗传承', '商业名片', '文旅融合'],
            'shops': []
        }
    }
    valid = {k: v for k, v in entries.items() if k in missing}
    if valid and add_entries('js/laozihao-data.js', valid):
        print(f"  ✅ laozihao-data.js +{len(valid)} 条目")

# --- museum ---
links = set(re.findall(r"museum\.html\?id=([^']+)'", cat_data))
missing = links - get_keys('js/museum-data.js')
if missing:
    entries = {
        'zhemo': {
            'name': '浙江省博物馆', 'subtitle': '之江新馆万年浙江', 'badge': '�️',
            'history': '始建于1929年，之江新馆2023年开放，馆藏10万余件。跨湖桥独木舟、良渚玉琮王是镇馆之宝。',
            'features': ['之江新馆', '10万件藏品', '跨湖桥文化', '良渚文明'],
            'shops': [{'n': '之江馆', 'a': '碧波路'}, {'n': '孤山馆', 'a': '孤山路'}]
        },
        'silkmuseum': {
            'name': '中国丝绸博物馆', 'subtitle': '国丝世界蚕桑文化', 'badge': '�',
            'history': '1992年开放，世界最大丝绸专业博物馆。展示中国五千年蚕桑丝绸文化，包括古代织机复原展示。',
            'features': ['国丝品牌', '蚕桑文化', '纺织技艺', '免费开放'],
            'shops': [{'n': '总馆', 'a': '玉皇山路73-1号'}]
        },
        'teamuseum': {
            'name': '中国茶博', 'subtitle': '茶史茶器茶俗', 'badge': '�',
            'history': '分双峰、龙井两大馆区，全面展示中华五千年茶文化。含茶史、茶器、茶俗、茶贸易等主题。',
            'features': ['双馆区', '免费开放', '互动体验'],
            'shops': [{'n': '龙井馆区', 'a': '龙井路88号'}, {'n': '双峰馆区', 'a': '翁家山268号'}]
        },
        'artmuseum': {
            'name': '浙江美术馆', 'subtitle': '艺术殿堂免费开放', 'badge': '�️',
            'history': '2009年开放，建筑面积3万平方米，中国最具现代感的美术馆之一。定期举办国际重量级展览。',
            'features': ['免费开放', '规模最大', '现代建筑', '国际展览'],
            'shops': [{'n': '南山路馆', 'a': '南山路138号'}]
        }
    }
    valid = {k: v for k, v in entries.items() if k in missing}
    if valid and add_entries('js/museum-data.js', valid):
        print(f"  ✅ museum-data.js +{len(valid)} 条目")

# --- mingren ---
links = set(re.findall(r"celebrity\.html\?id=([^']+)'", cat_data))
missing = links - get_keys('js/mingren-data.js')
if missing:
    entries = {
        'sushi': {
            'name': '苏轼', 'subtitle': '东坡居士两度杭州', 'badge': '�',
            'history': '两度在杭州为官：通判(1069)和知州(1089)。兴修水利留下苏堤，写下欲把西湖比西子千古名句。苏堤春晓为西湖十景之首。',
            'features': ['苏堤', '东坡肉', '文人诗词', '治理西湖'],
            'workplace': '杭州', 'influence': '西湖文化奠基者'
        },
        'yulin-torng': {
            'name': '秋瑾', 'subtitle': '鉴湖女侠辛亥英烈', 'badge': '�️',
            'history': '近代民主革命志士，号鉴湖女侠，秋风秋雨愁煞人名句流传至今。墓在西泠桥畔。',
            'features': ['民主革命', '鉴湖女侠', '诗文传世', '西湖有墓'],
            'temple': '西泠桥畔秋瑾墓'
        },
        'gen-shi': {
            'name': '章太炎', 'subtitle': '国学大师反清斗士', 'badge': '�',
            'history': '近代著名学者，余杭人，中国语言文字学奠基人。鲁迅是其学生。',
            'features': ['国学大师', '文字学', '革命思想', '杭州余杭人'],
            'temple': '章太炎故居在余杭'
        },
        'linhe-jing': {
            'name': '林徽因', 'subtitle': '一代才女杭州情缘', 'badge': '🌸',
            'history': '中国第一位女性建筑学家，生于杭州马家大院。参与国徽和人民英雄纪念碑设计。',
            'features': ['第一位女建筑师', '建筑保护', '诗文才情', '杭州出生'],
            'workplace': '参与多项建筑设计'
        },
        'hong-xue-yan': {
            'name': '戴望舒', 'subtitle': '雨巷诗人现代诗', 'badge': '�',
            'history': '现代派诗人、象征主义诗人，代表作雨巷名扬天下。曾在杭州中学任教。',
            'features': ['现代诗', '象征主义', '雨巷名篇', '杭州任教'],
            'workplace': '杭州任教'
        },
        'feng-meng-zhen': {
            'name': '宗庆后', 'subtitle': '娃哈哈创始人', 'badge': '�',
            'history': '娃哈哈集团创始人，从校办企业起步走向世界，三次问魁中国首富。',
            'features': ['娃哈哈', '校办企业', '三次首富', '杭州代表'],
            'workplace': '娃哈哈集团'
        }
    }
    valid = {k: v for k, v in entries.items() if k in missing}
    if valid and add_entries('js/mingren-data.js', valid):
        print(f"  ✅ mingren-data.js +{len(valid)} 条目")

# --- lishi ---
links = set(re.findall(r"history\.html\?id=([^']+)'", cat_data))
missing = links - get_keys('js/lishi-data.js')
if missing:
    entries = {
        'dayun-he': {
            'name': '大运河杭州段', 'subtitle': '活态遗产千年运河', 'badge': '�',
            'features_str': '世界文化遗产', 'length': '39公里',
            'history': '京杭大运河杭州段，拱宸桥、富义仓保存完好。流经拱墅、上城、临平三区，杭州是运河南端城市。',
            'spots': [
                {'n': '拱宸桥', 'd': '运河南端标志'},
                {'n': '富义仓', 'd': '古代粮仓遗址'},
                {'n': '小河直街', 'd': '运河历史街区'},
                {'n': '塘栖古镇', 'd': '运河名镇'}
            ]
        },
        'hang-zhou-arc': {
            'name': '杭州城垣', 'subtitle': '南宋城墙千年守护', 'badge': '�',
            'history': '南宋杭州城墙周长约70公里，设多座城门。现存凤山门遗址等。',
            'spots': [
                {'n': '凤山门遗址', 'd': '南城墙唯一留存'},
                {'n': '良渚古城墙', 'd': '五千年城垣遗址'},
                {'n': '武林门旧址', 'd': '古城北大门位置'}
            ]
        }
    }
    valid = {k: v for k, v in entries.items() if k in missing}
    if valid and add_entries('js/lishi-data.js', valid):
        print(f"  ✅ lishi-data.js +{len(valid)} 条目")

print("\n" + "=" * 60)
print("STEP 4: 语法校验")
print("=" * 60)

all_ok = True
for df in ['js/dessert-data.js','js/tea-data.js','js/laozihao-data.js','js/guzhen-data.js','js/museum-data.js','js/mingren-data.js','js/lishi-data.js','js/cat-data.js']:
    if os.path.exists(df):
        r = subprocess.run(['node','-c',df], capture_output=True, text=True)
        ok = r.returncode == 0
        all_ok = all_ok and ok
        status = "✅" if ok else "ERROR " + r.stderr[:60]
        print(f"  {status} {df}")

if all_ok:
    print("\n✅ 全部修复完成，所有语法通过！")
else:
    print("\n⚠️ 部分文件未通过语法校验，请检查上方输出。")
