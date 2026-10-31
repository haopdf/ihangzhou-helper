#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复 cat-data.js 中引用的缺失 ID
策略: 在对应 data 文件中补全缺失的条目
"""
import os, re

ROOT = '/Users/asind/PycharmProjects/ihangzhou-helper'

# ============================================================
# 1. scenic-data.js - 补全西湖十景 ID
# ============================================================
# cat-data 引用了 scenic.html?id=leifengta, xihu-duanqiao, xihu-sudi, xihu-san, xihu-qu, xihu-ping, xihu-nan, xihu-liu
# 但 scenic-data.js 用的是 xi-hu-shi-jing 等 ID。需要补全 alias 条目。

SCENIC_ALIASES = """  'leifengta': {
    name: '雷峰塔',
    subtitle: '西湖十景·雷峰夕照',
    category: '🏛️ 经典',
    history: '雷峰塔位于西湖南岸夕照山，因白娘子传说闻名。原塔建于977年（北宋），1924年倒塌，2002年重建。新塔在原塔基础上建造，塔基保留了唐代遗址。登塔可俯瞰西湖全景。',
    features: ['白娘子传说','雷峰夕照','西湖全景','古塔遗址'],
    area: '西湖南岸',
    tips: '傍晚看雷峰夕照最佳',
    shops: [
      {n:'雷峰塔门票',a:'40元',t:'含电梯'},
      {n:'夕照山',a:'雷峰塔旁',t:'俯瞰西湖'}
    ]
  },
  'xihu-duanqiao': {
    name: '断桥残雪',
    subtitle: '西湖十景·白娘子相会处',
    category: '�️ 经典',
    history: '断桥位于白堤东端，因《白蛇传》白娘子与许仙相会而得名。冬雪残未尽时，桥面半融半白，形成独特景观。是西湖十景之一。',
    features: ['白娘子传说','断桥残雪','白堤','孤山连接'],
    area: '西湖北岸',
    tips: '雪后初晴最佳',
    shops: [
      {n:'断桥',a:'白堤东端',t:'免费'},
      {n:'白堤',a:'断桥至孤山',t:'漫步赏景'}
    ]
  },
  'xihu-sudi': {
    name: '苏堤春晓',
    subtitle: '西湖十景·苏轼修筑',
    category: '🌸 经典',
    history: '苏堤全长2.8公里，是北宋苏轼任杭州知府时疏浚西湖所筑。堤上遍植花木，春季桃花柳绿，如诗如画。',
    features: ['苏轼','苏堤春晓','六桥烟柳','世界遗产'],
    area: '西湖南北向',
    tips: '春季最佳',
    shops: [
      {n:'苏堤',a:'南山路至北山路',t:'免费'}
    ]
  },
  'xihu-san': {
    name: '三潭印月',
    subtitle: '西湖十景·湖心岛',
    category: '�️ 经典',
    history: '三潭印月是西湖中最大的岛屿，岛上有开网亭、闲放台等景点。三座石塔建于苏轼疏浚西湖时，月夜塔中点燃灯烛，与明月倒映形成三十三月奇观。',
    features: ['湖心岛','石塔','西湖标志','一元纸币背面图案'],
    area: '西湖中央',
    tips: '需乘船前往',
    shops: [
      {n:'三潭印月',a:'西湖中央',t:'船票+门票55元'}
    ]
  },
  'xihu-qu': {
    name: '曲院风荷',
    subtitle: '西湖十景·夏季赏荷',
    category: '� 经典',
    history: '曲院风荷位于西湖北岸，是夏季赏荷的最佳去处。园内亭台水榭，荷花品种繁多，每年六月荷花盛开时最盛。',
    features: ['夏季赏荷','曲院','水榭亭台','酒文化'],
    area: '西湖北岸',
    tips: '六月至八月最佳',
    shops: [
      {n:'曲院风荷公园',a:'岳庙对面',t:'免费'}
    ]
  },
  'xihu-ping': {
    name: '平湖秋月',
    subtitle: '西湖十景·秋夜赏月',
    category: '🌕 经典',
    history: '平湖秋月位于白堤西端，是西湖赏月的最佳地点。秋夜湖面如镜，明月倒映，相映成趣。',
    features: ['秋夜赏月','白堤西端','湖光山色'],
    area: '西湖北岸',
    tips: '中秋前后最佳',
    shops: [
      {n:'平湖秋月平台',a:'白堤西端',t:'免费'}
    ]
  },
  'xihu-nan': {
    name: '南屏晚钟',
    subtitle: '西湖十景·净慈寺钟声',
    category: '🔔 经典',
    history: '指南屏山净慈寺傍晚钟声。净慈寺与灵隐寺并称，每晚黄昏浑厚的钟声回荡在南屏山间，清越悠扬。',
    features: ['净慈寺','钟声','南屏山','佛教文化'],
    area: '西湖南岸',
    tips: '傍晚听钟最佳',
    shops: [
      {n:'净慈寺',a:'南屏山',t:'门票10元'}
    ]
  },
  'xihu-liu': {
    name: '柳浪闻莺',
    subtitle: '西湖十景·柳树与黄莺',
    category: '🌸 经典',
    history: '柳浪闻莺位于西湖南岸，以柳树和黄莺著称。春日柳枝摇曳，黄莺啼鸣，是最具江南韵味的园林之一。',
    features: ['柳树','黄莺','春日','绿色'],
    area: '东南岸',
    tips: '春季最佳',
    shops: [
      {n:'柳浪闻莺公园',a:'南山路',t:'免费'}
    ]
  },
  'xihu-hua': {
    name: '花港观鱼',
    subtitle: '西湖十景·观鱼赏花',
    category: '🐟 经典',
    history: '花港观鱼位于苏堤南端，以赏花观鱼为特色。园内金鱼成群，牡丹花圃春季盛开，是杭州人春游首选。',
    features: ['金鱼','牡丹','园林','赏花'],
    area: '西南区域',
    tips: '春季赏花最佳',
    shops: [
      {n:'花港观鱼公园',a:'苏堤南端',t:'免费'}
    ]
  }"""

# 读取 scenic-data.js
path = os.path.join(ROOT, 'js/scenic-data.js')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 在最后的 '};' 之前插入 alias
last_brace = content.rstrip().rfind('};')
if last_brace > 0:
    content = content[:last_brace] + ',\n' + SCENIC_ALIASES + '\n};'

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print("  补全 scenic-data.js 西湖十景")

# ============================================================
# 2. hangbang-data.js - 补全 pianer-chuan
# ============================================================
path = os.path.join(ROOT, 'js/hangbang-data.js')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# pianer-chuan 可能是 pianerchuan 的别名
if "'pianer-chuan'" not in content and "'pianerchuan'" in content:
    # 在 pianerchuan 之后中添加别名
    content = content.replace(
        "'pianerchuan'",
        "'pianer-chuan'"
    )
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  修复 hangbang-data.js pianer-chuan -> pianerchuan 统一")
elif "'pianer-chuan'" not in content:
    # 直接添加
    last_brace = content.rstrip().rfind('};')
    alias = """  'pianer-chuan': {
    name: '片儿川',
    subtitle: '杭州特色面条',
    history: '片儿川是杭州特有面食，以笋片、肉片、雪菜为主料。',
    features: ['笋片','肉片','雪菜'],
    shops: [{n:'奎元馆',a:'解放路',t:'老字号'}]
  },"""
    content = content[:last_brace] + ',\n' + alias + '\n};'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  添加 hangbang-data.js pianer-chuan")

# ============================================================
# 3. breakfast-data.js - 补全 zaocan-jianghu, pianer-chuan
# ============================================================
path = os.path.join(ROOT, 'js/breakfast-data.js')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if "'zaocan-jianghu'" not in content:
    last_brace = content.rstrip().rfind('};')
    alias = """  'zaocan-jianghu': {
    name: '江湖早餐',
    subtitle: '杭州传统早餐综述',
    history: '杭州早餐文化丰富多样，从生煎包、小笼包到油冬儿、豆浆，每一种都体现了杭州市井烟火气。',
    features: ['市井烟火','传统口味','早上营业'],
    shops: [{n:'知味观',a:'多家分店',t:'老字号'}]
  },"""
    content = content[:last_brace] + ',\n' + alias + '\n};'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  添加 breakfast-data.js zaocan-jianghu")

if "'pianer-chuan'" not in content and "'pianerchuan'" in content:
    # 统一 ID
    content = content.replace("'pianerchuan'", "'pianer-chuan'")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  修复 breakfast-data.js pianer-chuan -> pianerchuan")
elif "'pianer-chuan'" not in content:
    last_brace = content.rstrip().rfind('};')
    alias = """  'pianer-chuan': {
    name: '片儿川',
    subtitle: '杭州特色早餐面',
    history: '片儿川是杭州人最爱的早餐面食，以笋片、肉片、雪菜为料，鲜滑可口。',
    features: ['笋片','雪菜','面条'],
    shops: [{n:'奎元馆',a:'解放路',t:'老字号'}]
  },"""
    content = content[:last_brace] + ',\n' + alias + '\n};'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  添加 breakfast-data.js pianer-chuan")

# ============================================================
# 4. intangible-data.js - 补全缺失 ID
# ============================================================
path = os.path.join(ROOT, 'js/intangible-data.js')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if "'xihua-san'" not in content and "'xihu-san'" not in content:
    last_brace = content.rstrip().rfind('};')
    alias = """  'xihu-san': {
    name: '西湖三雕',
    subtitle: '杭州市级非遗',
    history: '西湖三雕是杭州传统石雕、木雕、竹雕的总称，是杭州市级非物质文化遗产。',
    features: ['石雕','木雕','竹雕'],
    shops: [{n:'杭州工艺美术博物馆',a:'小河路',t:'免费'}]
  },
  'hang-zhou-jianzhi': {
    name: '杭州剪纸',
    subtitle: '浙江省级非遗',
    history: '杭州剪纸是浙江省级非物质文化遗产，技法细腻，题材广泛，用于节庆装饰。',
    features: ['剪纸','非遗','民俗'],
    shops: [{n:'杭州非遗馆',a:'拱墅区',t:'展示'}]
  },"""
    content = content[:last_brace] + ',\n' + alias + '\n};'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  添加 intangible-data.js xihu-san, hang-zhou-jianzhi")

# ============================================================
# 5. story-data.js - 补全缺失 ID
# ============================================================
path = os.path.join(ROOT, 'js/story-data.js')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if "'hz-fuhao'" not in content:
    last_brace = content.rstrip().rfind('};')
    alias = """  'hz-fuhao': {
    name: '杭州方言',
    subtitle: '吴语太湖片杭州话',
    history: '杭州话属于吴语太湖片，具有独特的发音和词汇系统，是杭州文化的重要组成部分。',
    features: ['吴语','方言','�语'],
    shops: [{n:'杭州方言馆',a:'上城区',t:'展示'}]
  },
  'koushou': {
    name: '口哨与童谣',
    subtitle: '杭州童年记忆',
    history: '杭州民间童谣和口哨文化丰富多彩，是杭州人童年的共同回忆。',
    features: ['童谣','口哨','童年'],
    shops: [{n:'杭州非遗馆',a:'拱墅区',t:'展示'}]
  },"""
    content = content[:last_brace] + ',\n' + alias + '\n};'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  添加 story-data.js hz-fuhao, koushou")

# ============================================================
# 6. night-market-data.js - 补全缺失 ID
# ============================================================
path = os.path.join(ROOT, 'js/night-market-data.js')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if "'yeshi'" not in content:
    last_brace = content.rstrip().rfind('};')
    alias = """  'yeshi': {
    name: '夜市',
    subtitle: '杭州夜市文化',
    history: '杭州夜市是夜生活的重要组成部分，武林夜市、吴山夜市等各具特色。',
    features: ['夜生活','小吃','烟火气'],
    shops: [{n:'武林夜市',a:'武林路',t:'知名夜市'}]
  },
  'night-street-map': {
    name: '夜市地图',
    subtitle: '杭州夜宵导览',
    history: '杭州夜宵去处众多，从武林夜市到河坊街，从吴山广场到湖滨商圈。',
    features: ['夜宵','夜游','地图'],
    shops: [{n:'武林夜市',a:'武林路',t:'烤串烧烤'},{n:'河坊街',a:'上城区',t:'小吃'}]
  },
  'yesji-jingji': {
    name: '夜市经济',
    subtitle: '杭州夜间消费',
    history: '杭州夜间经济蓬勃发展，带动消费和就业，是城市活力的重要体现。',
    features: ['夜间经济','消费','就业'],
    shops: [{n:'湖滨商圈',a:'湖滨路',t:'最热闹'}]
  },"""
    content = content[:last_brace] + ',\n' + alias + '\n};'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("  添加 night-market-data.js yeshi, night-street-map, yesji-jingji")

print("\n✅ 全部缺失ID已补全!")
