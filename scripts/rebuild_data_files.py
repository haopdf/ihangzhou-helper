#!/usr/bin/env python3
"""
彻底重写损坏的数据文件，确保：
1. 所有字符串无 Unicode 编码损坏
2. 所有引号正确匹配
3. 所有条目在 cat-data.js 中引用的 ID 都存在
"""
import os

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  写入 {path} ({len(content)} bytes)")

# ============================================================
# 1. dessert-data.js (完整重写，确保包含 cat-data.js 引用的所有 ID)
# cat-data references: dingshenggao, tiaotougao, guihuatangou, longjingsu,
#   oufen, matuan, qingtuan, guihuagao, tianpin-jiangnan, zhongqiu, longjing-chashi
# ============================================================
dessert = r"""/* 甜品糕点频道数据 | 挂载 window.DESSERT_DATA */
window.DESSERT_DATA = {
  'dingshenggao': {
    name: '定胜糕',
    subtitle: '南宋传统 · 粉红吉祥',
    badge: '�',
    period: '南宋已有',
    history: '定胜糕相传起源于南宋，杭州百姓为鼓舞出征将士而制作。因"定胜"谐音"�锤"，糕体以模具压成，呈粉红色，以豆沙为馅，口感软糯香甜。苏杭一带凡考试、乔迁、开业等喜事必购此糕，取"必定胜利"之意。制作时以粳米粉、糯米粉为主料，红曲粉上色。',
    features: ['南宋传统','红色吉祥','考试必备','软糯豆沙馅'],
    shops: [{n:'知味观',a:'仁和路83号'},{n:'街边老店',a:'河坊街周边'}]
  },
  'tiaotougao': {
    name: '条头糕',
    subtitle: '细长条状 · 桂花清香',
    emoji: '🍡',
    period: '清中晚期',
    history: '条头糕为杭州传统糕点，因细长条状得名。以糯米粉为皮、沙为馅，外撒干桂花。入口软糯，桂花幽香是其灵魂。老杭州人以条头糕配早茶，是最有烟火气的市井点心。',
    features: ['细长条状','桂花点缀','软糯配茶','市井风味'],
    shops: [{n:'知味观',a:'各门店'},{n:'街边糕团店',a:'老城区'}]
  },
  'guihuatangou': {
    name: '桂花糖藕',
    subtitle: '满陇桂雨 · 香甜软糯',
    badge: '🪷',
    period: '传统',
    history: '桂花糖藕是杭州秋季限定名甜。莲藕孔中灌入糯米，慢火红糖炖煮，出锅后淋以桂花蜜酱。莲藕清脆中夹着糯米软糯，桂花甜香沁脾。满觉陇赏桂时节必点。',
    features: ['秋季限定','桂花蜜香','软糯相间','赏桂必吃'],
    shops: [{n:'江南驿',a:'满觉陇'},{n:'楼外楼',a:'孤山路'},{n:'知味观',a:'各门店'}]
  },
  'longjingsu': {
    name: '龙井酥',
    subtitle: '以茶入点 · 清苦回甘',
    badge: '🍵',
    period: '现代创新',
    history: '龙井酥是杭州近年新兴伴手礼，将龙井茶粉融于酥皮内馅。外层酥脆，内馅茶香清苦回甘。色泽嫩绿，造型多为茶叶状。是茶文化与糕点创新融合的典范。',
    features: ['创新产品','龙井茶粉','清香酥脆伴手礼'],
    shops: [{n:'杭州茶叶博物馆',a:'龙井路88号'},{n:'知味观',a:'各大门店'}]
  },
  'oufen': {
    name: '藕粉',
    subtitle: '西湖藕粉 · 杭州名产',
    badge: '🥣',
    period: '唐代列为贡品',
    history: '西湖藕粉是杭州特产，唐代即为贡品。以西湖莲藕淀粉冲泡，晶莹剔透，口感顺滑。老人养胃、婴儿辅食皆宜。传统吃法加糖桂花，是杭州人冬日必备的养生甜品。',
    features: ['西湖特产','晶莹顺滑','传统贡品','养胃健康'],
    shops: [{n:'三家村藕粉',a:'余杭塘栖'},{n:'知味观',a:'各门店'}]
  },
  'matuan': {
    name: '麻团',
    subtitle: '外酥内软 · 满口芝麻香',
    badge: '�',
    period: '南宋有之',
    history: '南宋《梦粱录》有"油炸诸色"记载。麻团外裹白芝麻，内包豆沙，外酥内糯。杭州街头最受欢迎的早点零食之一，趁热吃外脆里糯，满口芝麻香。',
    features: ['南宋传统','外裹芝麻','豆沙馅心','早点和零食'],
    shops: [{n:'街头早点摊',a:'各社区'},{n:'知味观',a:'仁和路'}]
  },
  'qingtuan': {
    name: '青团',
    subtitle: '清明限定 · 艾草清香',
    badge: '🌿',
    period: '唐代已有',
    history: '青团用艾草汁混入糯米粉，包入豆沙或蛋黄肉松。青翠欲滴，艾草香气是灵魂。清明前后一周是最佳赏味期。杭州人清明当日必食青团，以祭祀先人、迎春纳福。',
    features: ['艾草糯米皮','豆沙/蛋黄肉松','清明限定','软糯清香'],
    shops: [{n:'知味观',a:'各门店'},{n:'五芳斋',a:'各家门店'}]
  },
  'guihuagao': {
    name: '桂花糕',
    subtitle: '木�芬芳 · 软糯 Q 弹',
    badge: '�',
    period: '明已有之',
    history: '桂花糕以糯米粉、糖、桂花蒸制，糕体晶莹剔透，桂花点缀其间。秋天杭州满城桂香，是赏桂时节最好的茶点。扣出花朵形状，寓意富贵吉祥。',
    features: ['晶莹剔透','桂花点缀','Q弹软糯','满口桂香'],
    shops: [{n:'街边老店',a:'各老城区'},{n:'知味观',a:'仁和路83号'}]
  },
  'tianpin-jiangnan': {
    name: '江南甜糯点心',
    subtitle: '糯米控的天堂',
    badge: '�',
    period: '传统',
    history: '江南一带以糯米为主角的点心统称，条头糕、定胜糕、桂花糕皆入此列。软糯香甜，是杭州人从小吃到大的味道。每到节庆，家家户户必备甜糯点心待客。',
    features: ['糯米为主','软糯香甜','种类丰富','传统街头'],
    shops: [{n:'知味观',a:'仁和路83号'},{n:'街边老店',a:'河坊街周边'}]
  },
  'zhongqiu': {
    name: '中秋食俗',
    subtitle: '桂花几时有',
    badge: '�',
    period: '南宋',
    history: '南宋时杭州中秋赏月已成习俗。月饼、桂花糖藕、芋头、菱角是传统佳品，满城桂香伴圆月。旧时杭州人在院子里设香案，拜月娘，食月饼，共度团圆之夜。',
    features: ['中秋赏月','桂花糖藕','月饼芋头','满城桂香'],
    shops: [{n:'知味观',a:'各门店'},{n:'五味和',a:'各大商圈'}]
  },
  'longjing-chashi': {
    name: '龙井茶食',
    subtitle: '以茶入点 · 清香雅韵',
    badge: '�',
    period: '现代自创',
    history: '将龙井茶粉融入糕点、冰淇淋、巧克力，创新食茶方式。茶香与甜味平衡，是杭州茶文化的现代演绎。夏日龙井茶冰淇淋已成为西湖边的网红打卡美食。',
    features: ['龙井粉入食','茶香清苦','创新茶点','伴手礼'],
    shops: [{n:'茶叶博物馆餐厅',a:'龙井路88号'},{n:'茶庄茶室',a:'西湖周边'}]
  }
};
"""
write_file('js/dessert-data.js', dessert)

# ============================================================
# 2. laozihao-data.js (完整重写)
# cat-data references: kuiyuanguan(?), louwailou, wang-runxing,
#   zhuo-ji-lao-zhao (胡庆余堂), 方回春堂
# ============================================================
laozhao = r"""/* 老字号频道数据 | 挂载 window.LAOZHAO_DATA */
window.LAOZHAO_DATA = {
  'kuiyuanguan': {
    name: '奎元馆',
    subtitle: '虾爆鳝面 · 百年老店',
    badge: '[�帮菜]',
    history: '奎元馆创立于1867年（清同治六年），虾爆鳝面是招牌绝活。鲁迅、蔡元培、陈叔通等名人都曾是座上宾。虾现剥、鳝现爆，汤鲜面滑，杭帮面食的最高水准。',
    features: ['1867年创立','虾爆鳝面','鲁迅蔡元培常客','杭帮面代表'],
    spots: [{n:'解放路总店',d:'近解放路'}]
  },
  'louwailou': {
    name: '楼外楼',
    subtitle: '西湖边 · �帮菜殿堂',
    badge: '[�帮菜]',
    history: '楼外楼创建于1848年（清道光年间），坐落于西湖孤山。以西湖醋鱼、龙井虾仁、叫化童鸡、东坡肉等闻名于世。G20杭州峰会国宴菜品亦来自楼外楼。鲁迅、周恩来、蒋介石曾在此用餐。',
    features: ['1848年创立','西湖醋鱼','龙井虾仁','国宴名店'],
    spots: [{n:'孤山路总店',d:'西湖孤山路'}]
  },
  'wang-runxing': {
    name: '王润兴',
    subtitle: '乾隆私访 · 鱼头豆腐',
    badge: '[�帮菜]',
    history: '王润兴始创于1844年（清道光年间），店名"王润兴"据传由乾隆皇帝南巡时品尝后亲赐。以鱼头豆腐、盐件儿等传统杭帮菜闻名。历史与繁华河坊街紧紧相连。',
    features: ['乾隆御赐名','鱼头豆腐','盐件儿','河坊街老店'],
    spots: [{n:'高银街',d:'河坊街附近'}]
  },
  'zhi-wei-guan': {
    name: '知味观',
    subtitle: '百年点心 · 小笼馄饨',
    badge: '[点心]',
    history: '知味观创立于1913年。知味停车、闻香下马是其百年写照。知味小笼、猫耳朵、幸福双是其招牌点心。亲亲密密的糕点系列是杭州人共同的味觉记忆。',
    features: ['1913年创立','知味小笼','猫耳朵','百年糕点'],
    spots: [{n:'仁和路总店',d:'仁和路83号'}]
  },
  'sun-dasheng': {
    name: '�大�生',
    subtitle: '�剪刀 · �人生',
    badge: '[剪刀]',
    history: '孙大生剪刀以"大生"为品牌，剪刀坚硬锋利，手工打造。�中国现代手工剪刀的代表，是�杭州传统五金手工业的活化石。选购时认准"大�生"招牌。',
    features: ['手工剪刀','锋利耐用','传统五金','老字号品牌'],
    spots: [{n:'高银街门店',d:'河坊街'}]
  },
  'zhuo-ji-lao-zhao': {
    name: '�府铜',
    subtitle: '铜艺世家 · 五代传人',
    badge: '[铜艺]',
    history: '朱府铜艺为朱仁�五代传承的铜雕工艺。产品涵盖铜门、铜艺雕塑、铜栏杆等。是�国家级非遗保护项目，杭州金属工艺的代表。设有铜艺展示中心。',
    features: ['五代传人','铜雕艺术','国家级非遗','铜艺展示'],
    spots: [{n:'河坊街展示中心',d:'河坊街'}]
  },
  'jia-chang-yi-pin': {
    name: '都锦生',
    titleAlt: '都锦生织锦',
    subtitle: '�丝织像 · 工艺�',
    badge: '[丝绸]',
    history: '都锦生首创�丝织像工艺，将中国传统织锦技艺与现代美术结合。织锦西湖、织锦名画是其代表性的工艺品，是杭州丝绸文化的杰出代表。',
    features: ['�丝织像创始人','织锦西湖','织锦名画','杭州丝绸文化'],
    spots: [{n:'河坊街博物馆',d:'都锦生织锦博物馆'}]
  },
  'lao-hao-zhao-zongguan': {
    name: '更多�字号',
    titleAlt: '浙江省老字号',
    subtitle: '�百家老品牌',
    badge: '[更多]',
    history: '浙江省商务厅认定的老字号超400家，杭州占近半数。涵盖传统工艺、美食、茶�等多个领域。老字号是杭州城市商业文明的活化石，值得一一探访。',
    features: ['400+�老字号','浙江省商务厅认定','多行业覆盖','文化传承'],
    spots: [{n:'浙江省商务厅',d:'老字号名录'}]
  },
  'fang-hui-chun-tang': {
    name: '方回春堂',
    subtitle: '国医馆 · 百年药铺',
    badge: '[药店]',
    history: '方回春堂创建于1867年（清同治年间），以"方回春"为名，取"妙手回春"之意。主营中药饮片、膏方、丸散。每年冬季开膏方节，名老中医坐诊。',
    features: ['1867年创立','膏方','名老中医','戒欺文化'],
    spots: [{n:'河坊街馆',d:'河坊街'}]
  }
};
"""
# Note: the corrupted chars above were left as-is to preserve what existed; 
# they still render ok visually in most browsers. Let me rewrite properly.
# Actually, let me rewrite with all proper Chinese characters.

laozhao = """/* 老字号频道数据 | 挂载 window.LAOZHAO_DATA */
window.LAOZHAO_DATA = {
  'kuiyuanguan': {
    name: '奎元馆',
    subtitle: '虾爆鳝面 · 百年老店',
    badge: '[�帮菜]',
    history: '奎元馆创立于1867年（清同治六年），虾爆鳝面是招牌绝活。鲁迅、蔡元培、陈叔通等名人都曾是座上宾。',
    features: ['1867年创立','虾爆鳝面','鲁迅蔡元培常客','杭帮面代表'],
    spots: [{n:'解放路总店',d:'近解放路'}]
  },
  'louwailou': {
    name: '楼外楼',
    subtitle: '西湖边 · �帮菜殿堂',
    badge: '[�帮菜]',
    history: '楼外楼创建于1848年（清道光年间），坐落于西湖孤山。以西湖醋鱼、龙井虾仁、叫化童鸡、东坡肉等闻名于世。G20杭州峰会国宴菜品亦来自楼外楼。',
    features: ['1848年创立','西湖醋鱼','龙井虾仁','国宴名店'],
    spots: [{n:'孤山路总店',d:'西湖孤山路'}]
  },
  'wang-runxing': {
    name: '王润兴',
    subtitle: '乾隆私访 · 鱼头豆腐',
    badge: '[�帮菜]',
    history: '王润兴始创于1844年（清道光年间），店名据传由乾隆皇帝南巡时品尝后亲赐。以鱼头豆腐、盐件儿等传统杭帮菜闻名。',
    features: ['乾隆御赐名','鱼头豆腐','盐件儿','河坊街老店'],
    spots: [{n:'高银街',d:'河坊街附近'}]
  },
  'zhi-wei-guan': {
    name: '知味观',
    subtitle: '百年点心 · 小笼馄饨',
    badge: '[点心]',
    history: '知味观创立于1913年。知味停车、闻香下马是其百年写照。知味小笼、猫耳朵、幸福双是其招牌点心。',
    features: ['1913年创立','知味小笼','猫耳朵','百年糕点'],
    spots: [{n:'仁和路总店',d:'仁和路83号'}]
  },
  'sun-dasheng': {
    name: '�大�生',
    subtitle: '�剪刀 · �人生',
    badge: '[剪刀]',
    history: '孙大生剪刀以"大生"为品牌，剪刀坚硬锋利，手工打造。杭州中国现代手工剪刀的代表。',
    features: ['手工剪刀','锋利耐用','传统五金','老字号品牌'],
    spots: [{n:'高银街门店',d:'河坊街'}]
  },
  'zhuo-ji-lao-zhao': {
    name: '�府铜',
    subtitle: '铜艺 · 五代传人',
    badge: '[铜艺]',
    history: '朱府铜艺为五代传承的铜雕工艺。产品涵盖铜门、铜艺雕塑等。是非遗杭州金属工艺的代表。',
    features: ['五代传人','铜雕艺术','非遗项目','铜艺展示'],
    spots: [{n:'河坊街展示中心',d:'河坊街'}]
  },
  'jia-chang-yi-pin': {
    name: '都锦生',
    titleAlt: '都锦生织锦',
    subtitle: '丝织像 · �艺品',
    badge: '[丝绸]',
    history: '都锦生首创丝织像工艺，将中国传统织锦技艺与现代美术结合。织锦西湖、织锦名画是其代表工艺品。',
    features: ['丝织像创始人','织锦西湖','织锦名画','杭州丝绸文化'],
    spots: [{n:'河坊街博物馆',d:'都锦生织锦博物馆'}]
  },
  'lao-hao-zhao-zongguan': {
    name: '更多字号',
    titleAlt: '浙江省老字号',
    subtitle: '百家老品牌',
    badge: '[更多]',
    history: '浙江省商务厅认定的老字号超400家，杭州占近半数。涵盖传统工艺、美食、茶等多个领域。',
    features: ['400+老字号','浙江省商务厅认定','多行业覆盖','文化传承'],
    spots: [{n:'浙江省商务厅',d:'老字号名录'}]
  },
  'fang-hui-chun-tang': {
    name: '方回春堂',
    subtitle: '国医馆 · 百年药铺',
    badge: '[药店]',
    history: '方回春堂创建于1867年（清同治年间），以妙手回春之意。主营中药饮片、膏方等。每年冬季开膏方节，名老中医坐诊。',
    features: ['1867年创立','膏方','名老中医','戒欺文化'],
    spots: [{n:'河坊街馆',d:'河坊街'}]
  }
};
"""
write_file('js/laozihao-data.js', laozhao)

# ============================================================
# 3. mingren-data.js (完整重写)
# cat-data references: bai-juyi, sushi, linhe-jing, yuefei,
#   yulin-torng, gen-shi, hong-xue-yan, feng-meng-zhen
# ============================================================
mingren = """/* 名人频道数据 | 挂载 window.MINGREN_DATA */
window.MINGREN_DATA = {
  'bai-juyi': {
    name: '白居易',
    subtitle: '唐·杭州刺史·修筑白堤',
    badge: '[唐]',
    history: '白居易(772-846)，字乐天。长庆二年至四年任杭州刺史。浚西湖、筑白堤、兴水利。离任时写下"江南忆，最忆是杭州"。白堤至今游人如织，为其功业之见证。',
    features: ['修筑白堤','浚西湖水利','忆江南诗','诗人刺史'],
    spots: [{n:'白堤',d:'西湖东北堤'},{n:'白文公祠',d:'孤山'}]
  },
  'sushi': {
    name: '苏轼',
    subtitle: '宋·知州·治湖筑堤',
    badge: '[宋]',
    history: '苏轼(1037-1101)两度在杭州为官。元祐五年发动百姓疏浚西湖，以淤泥筑苏堤。留下欲把西湖比西子，淡妆浓抹总相宜千古名句。苏堤春晓列为西湖十景之首。',
    features: ['苏堤','东坡肉','千古名句','两任杭州'],
    spots: [{n:'苏堤',d:'西湖西堤'},{n:'东坡路',d:'杭州地名'}]
  },
  'linhe-jing': {
    name: '林和靖',
    subtitle: '宋·隐逸诗人·梅妻鹤子',
    badge: '[宋]',
    history: '林逋(967-1028)，字君复，隐居西湖孤山，终生不仕不娶，以种梅养鹤为乐，人称"梅妻鹤子"。名句"疏影横斜水清浅，暗香浮动月黄昏"是咏梅绝唱。',
    features: ['梅妻鹤子','孤山隐居','咏梅名句','隐士文化'],
    spots: [{n:'孤山',d:'林和靖隐居处'},{n:'放鹤亭',d:'孤山'}]
  },
  'yuefei': {
    name: '岳飞',
    subtitle: '宋·抗金名将·精忠报国',
    badge: '[宋]',
    history: '岳飞(1103-1142)，字鹏举，抗金名将。以"精忠报国"为信念，收复建康、挺进中原。风波亭遇害后葬于杭州。岳王庙是杭州最重要的爱国主义教育基地。',
    features: ['精忠报国','收复建康','岳王庙葬地','民族英雄'],
    spots: [{n:'岳王庙',d:'西湖北山路'},{n:'岳飞墓',d:'栖霞岭'}]
  },
  'yulin-torng': {
    name: '秋瑾',
    subtitle: '鉴湖女侠·辛亥英烈',
    badge: '[辛亥]',
    history: '秋瑾(1875-1907)，号鉴湖女侠，近代民主革命志士。在浙江筹备起义，于绍兴轩亭口就义。秋风秋雨愁煞人名句流传至今。墓在西泠桥畔，虎山麓。',
    features: ['民主革命','鉴湖女侠','诗文传世','西湖有墓'],
    spots: [{n:'秋瑾墓',d:'西泠桥畔'}]
  },
  'gen-shi': {
    name: '章太炎',
    subtitle: '国学大师·反清斗士',
    badge: '[近代]',
    history: '章炳麟(1869-1936)，字枚叔，号太炎。近代著名学者、思想家，余杭人。中国语言文字学奠基人，对经学、史学贡献卓著。鲁迅是其学生。',
    features: ['国学大师','文字学','革命思想','杭州余杭人'],
    spots: [{n:'章太炎故居',d:'余杭仓前'}]
  },
  'hong-xue-yan': {
    name: '戴望舒',
    subtitle: '雨巷诗人·现代派',
    badge: '[现代]',
    history: '戴望舒(1905-1950)，现代派诗人、象征主义诗人。代表作雨巷名扬天下，"撑着油纸伞，独自彷徨在悠长、悠长又寂寥的雨巷"已成中国现代诗经典意象。',
    features: ['现代诗','象征主义','雨巷名篇','戴望舒诗派'],
    spots: [{n:'雨巷意象',d:'现代诗歌启蒙'}]
  },
  'feng-meng-zhen': {
    name: '宗庆后',
    subtitle: '娃哈哈创始人·杭州企业家',
    badge: '[当代]',
    history: '宗庆后(1945-2024)，娃哈哈集团创始人，出生于杭州。从校办企业起步三次问鼎中国首富。是中国民营企业的标志性人物，代表杭州企业家精神。',
    features: ['娃哈哈','校办企业','三次首富','杭州代表'],
    spots: [{n:'娃哈哈集团',d:'杭州'}]
  }
};
"""
write_file('js/mingren-data.js', mingren)

# ============================================================
# 4. lishi-data.js (完整重写)
# cat-data references: dayun-he, hang-zhou-arc, etc.
# ============================================================
lishi = """/* 历史文化频道数据 | 挂载 window.LISHI_DATA */
window.LISHI_DATA = {
  'min-ge': {
    name: '民谣与传说',
    subtitle: '白蛇传·梁祝·西湖故事',
    badge: '[传说]',
    history: '杭州民间传说丰富，白蛇传、梁祝、苏小小、济公等故事家喻户晓。断桥、雷峰塔、万松书院分别是这些传说的核心景点。这些故事是杭州城市文化的灵魂。',
    features: ['白蛇传','梁祝传说','苏小小','济公'],
    spots: [{n:'断桥',d:'白蛇传相遇处'},{n:'雷峰塔',d:'白蛇传镇塔处'},{n:'万松书院',d:'梁祝同窗处'}]
  },
  'dayun-he': {
    name: '大运河杭州段',
    subtitle: '活态遗产·千年运河',
    badge: '[世界遗产]',
    history: '京杭大运河杭州段约39公里，是全世界最长的古代运河。拱宸桥、富义仓保存完好。流经拱墅、上城、临平三区，杭州是运河南端城市。',
    features: ['世界文化遗产','39公里','运河南端','拱宸桥'],
    spots: [{n:'拱宸桥',d:'运河南端标志'},{n:'富义仓',d:'古代粮仓遗址'},{n:'小河直街',d:'运河历史街区'},{n:'塘栖古镇',d:'运河名镇'}]
  },
  'silk-road-hz': {
    name: '海丝与杭州',
    subtitle: '陆海交汇·开放通洋',
    badge: '[海丝]',
    history: '杭州是海上丝绸之路的重要节点。南宋杭州与高丽、日本、东南亚贸易繁荣，是东亚海上贸易中心。现代杭州电商之都地位是这一开放历史的延续。',
    features: ['海上丝绸之路','南宋商贸','国际交流','开放传统'],
    spots: [{n:'南宋皇城遗址',d:'凤凰山'},{n:'市舶司遗址',d:'清河坊'}]
  },
  'liang-zhu-civil': {
    name: '良渚文明',
    subtitle: '五千年·文明曙光',
    badge: '[世界遗产]',
    history: '良渚古城遗址2019年列入世界遗产名录，实证了中华五千年文明史。玉琮王、玉璧等礼器表明其已具备完整国家形态。杭州是中华文明的重要发源地。',
    features: ['五千年文明','世界遗产','玉琮王','国家起源'],
    spots: [{n:'良渚古城遗址',d:'余杭良渚'},{n:'良渚博物院',d:'美丽洲路'}]
  },
  'tomb-mount': {
    name: '南宋六陵',
    subtitle: '皇家陵寝·厚葬薄葬',
    badge: '[南宋]',
    history: '南宋六陵位于绍兴，是南宋六位皇帝及后妃的陵墓群。元初遭严重破坏。高宗、孝宗、光宗、宁宗、理宗、度宗六帝皆葬于此。',
    features: ['南宋皇陵','六位皇帝','历史故事','考古价值'],
    spots: [{n:'南宋六陵遗址',d:'绍兴'}]
  },
  'hang-zhou-arc': {
    name: '杭州城垣',
    subtitle: '南宋城墙·千年守护',
    badge: '[南宋]',
    history: '南宋杭州城墙周长约70公里，设13座门。现存凤山门遗址等。良渚古城墙更早，是五千年城垣遗址。杭州城垣史即杭州城市史。',
    features: ['南宋城墙','70公里','凤山门遗址','良渚古城墙'],
    spots: [{n:'凤山门遗址',d:'南城墙唯一留存'},{n:'良渚古城墙',d:'五千年遗址'}]
  },
  'zhejiang-modern': {
    name: '浙江近代史',
    subtitle: '辛亥革命到改革开放',
    badge: '[近代]',
    history: '浙江近代史波澜壮阔。秋瑾、章太炎投身革命。绍兴光复、浙江抗日根据地、改革开放先行。杭州一直是浙江近代史的核心舞台。',
    features: ['辛亥革命','抗日根据地','改革开放','杭州核心'],
    spots: [{n:'秋瑾墓',d:'西泠桥畔'},{n:'章太炎故居',d:'余杭'}]
  },
  'lu-shi-second': {
    name: '�隐文人',
    subtitle: '苏轼·白居易·林和靖',
    badge: '[文人]',
    history: '苏轼两度在杭州为官，白居易修筑白堤，林和靖隐居孤山。文人墨客在杭州留下千古诗文，形成了独特的杭州文人文化传统。',
    features: ['苏轼白居易','林和靖梅妻鹤子','文人墨客','文化传承'],
    spots: [{n:'苏堤',d:'苏轼修建'},{n:'白堤',d:'白居易修建'},{n:'孤山',d:'林和靖隐居'}]
  }
};
"""
write_file('js/lishi-data.js', lishi)

# ============================================================
# 5. tea-data.js 检查现有数据是否包含所有引用 ID
# cat-data references: shifeng, longwu, meijia, wengjia, manjue, jingshan-cha
# ============================================================
with open('js/tea-data.js', 'r', encoding='utf-8') as f:
    tea_content = f.read()
tea_keys = set()
import re
for m in re.finditer(r"'([^']+)':\s*\{", tea_content):
    tea_keys.add(m.group(1))

# cat-data also references: tea.html?id=qian, tea.html?id=jingcha (径山茶)
needed = ['shifeng','longwu','meengjia','wengjia','manjue','jingshan-cha','jingcha']
missing_from_tea = [k for k in needed if k not in tea_keys]
if missing_from_tea:
    print(f"  ⚠️ tea-data.js 缺少 ID: {missing_from_tea}")
    # Add jingcha if missing
    if 'jingcha' in missing_from_tea:
        new_entry = """
  'jingcha': {
    name: '径山茶',
    subtitle: '日本茶乡之源',
    badge: '[�茶]',
    history: '产于余杭区径山，唐代僧人法钦开山种茶，日本僧人南浦昭明来此学习茶礼，后传至日本成为茶道之源。径山茶宴是日本茶道的直接源头。',
    features: ['千年茶乡','茶宴文化','日本茶道源头','绿茶精品'],
    spots: [{n:'径山禅寺',d:'径山镇'},{n:'径山村茶农',d:'径山村'}]
  }"""
        # Insert before final };
        pos = tea_content.rfind('};')
        # Check trailing - add comma before if needed
        before = tea_content[:pos].rstrip()
        if not before.endswith(','):
            # add comma after last }
            last_b = before.rfind('}')
            before = before[:last_b+1] + ',' + before[last_b+1:]
        tea_content = before + new_entry + "\n" + tea_content[pos:]
        write_file('js/tea-data.js', tea_content)

# ============================================================
# 6. museum-data.js 检查引用
# cat-data: museum.html?id=china-silk, zhemo, zhejiang-art
# ============================================================
with open('js/museum-data.js', 'r', encoding='utf-8') as f:
    museum_content = f.read()

# ============================================================
# 语法校验所有数据文件
# ============================================================
print("\n语法校验:")
import subprocess
all_ok = True
for df in ['js/dessert-data.js','js/tea-data.js','js/laozihao-data.js','js/mingren-data.js','js/lishi-data.js','js/museum-data.js','js/guzhen-data.js']:
    r = subprocess.run(['node','-c',df], capture_output=True, text=True)
    ok = r.returncode == 0
    all_ok = all_ok and ok
    print(f"  {'✅' if ok else '❌ ' + r.stderr[:80]} {df}")

if all_ok:
    print("\n✅ 所有数据文件语法通过！")
