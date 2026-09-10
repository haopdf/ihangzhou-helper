// 杭州 13 大区县数据 API (Vercel Serverless)
// 数据：概况 + 人口 + 面积 + 特色 + 景点 + 地标 + 办事处 + 政务入口
// 区划按 2021 年杭州市行政区划：10 区 + 1 县级市 + 2 县
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=1209600'); // 7 天缓存

  const districts = [
    {
      id: 'shangcheng',
      name: '上城区',
      type: '主城',
      area: '26 km²',
      population: '约 132 万',
      postcode: '310001',
      tag: '南宋皇城核心 · 老底子杭州',
      desc: '由原上城区和江干区合并，2021 年成立。涵盖南宋皇城遗址、钱江新城CBD，杭州政治、文化、金融中心。',
      highlights: ['南宋御街', '河坊街', '钱江新城', '市民中心', '西湖东岸'],
      scenic: [
        { name: '清河坊', type: '历史街区', desc: '杭州最知名步行街，老字号与非遗聚集' },
        { name: '南宋御街', type: '历史街区', desc: '南宋皇城的中轴大道，中山路一带' },
        { name: '钱江新城', type: 'CBD', desc: '日月同辉、城市阳台、灯光秀' },
        { name: '白塔公园', type: '公园', desc: '南宋地宫遗址、绿皮火车怀旧' },
        { name: '西湖东岸（湖滨）', type: '景区', desc: '湖滨步行街、音乐喷泉' }
      ],
      landmarks: ['市民中心', '杭州大剧院', '万松书院', '胡庆余堂', '邵逸夫医院'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527152/index.html',
      features: '政务办事核心区（市民中心）、金融街（庆春路）、老字号聚集地、CBD 经济引擎'
    },
    {
      id: 'gongshu',
      name: '拱墅区',
      type: '主城',
      area: '69 km²',
      population: '约 113 万',
      postcode: '310011',
      tag: '运河文化核心 · 工业遗存',
      desc: '由原拱墅区和下城区合并，2021 年成立。京杭大运河南端，杭州传统工业基地转型文创示范区。',
      highlights: ['京杭大运河', '拱宸桥', '小河直街', '武林广场', '杭州大厦'],
      scenic: [
        { name: '拱宸桥', type: '历史地标', desc: '京杭大运河南端标志，三孔石拱桥' },
        { name: '小河直街', type: '历史街区', desc: '运河边的市井人家，原汁原味老杭州' },
        { name: '桥西历史街区', type: '历史街区', desc: '运河边的历史文化保护区' },
        { name: '大兜路历史街区', type: '历史街区', desc: '运河边的禅意慢生活' },
        { name: '杭州工艺美术馆', type: '博物馆', desc: '免费，非遗工艺展示' }
      ],
      landmarks: ['武林广场', '杭州大厦', '浙江展览馆', '运河广场', '香积寺'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527153/index.html',
      features: '运河文化、工业遗存改造（LOFT49、丝联 166）、武林商圈、传统市井生活'
    },
    {
      id: 'xihu',
      name: '西湖区',
      type: '主城',
      area: '312 km²',
      population: '约 150 万',
      postcode: '310013',
      tag: '西湖名胜核心 · 文教区',
      desc: '因西湖而得名，涵盖西湖风景名胜区西岸、转塘、之江国家旅游度假区。是杭州文教区、文创区。',
      highlights: ['西湖', '灵隐寺', '龙井茶村', '中国美院', '云栖小镇'],
      scenic: [
        { name: '西湖', type: '世界遗产', desc: '5A 级，免费开放，断桥、苏堤、雷峰塔' },
        { name: '灵隐寺 + 飞来峰', type: '5A 景区', desc: '杭州最古寺院，飞来峰石窟造像' },
        { name: '龙井村 / 梅家坞', type: '茶村', desc: '西湖龙井茶原产地，茶文化体验' },
        { name: '中国美院象山校区', type: '建筑', desc: '王澍设计，普利兹克奖作品' },
        { name: '西溪湿地（部分）', type: '5A 景区', desc: '国家级湿地公园' }
      ],
      landmarks: ['浙大紫金港校区', '黄龙体育中心', '浙江图书馆', '杭州植物园', '宋城'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527154/index.html',
      features: '西湖风景名胜区、文教区（浙大、商大、美院）、龙井茶产地、云栖小镇（云计算）'
    },
    {
      id: 'binjiang',
      name: '滨江区',
      type: '主城',
      area: '73 km²',
      population: '约 50 万',
      postcode: '310051',
      tag: '杭州硅谷 · 高新区',
      desc: '杭州国家高新区，与萧山隔江相望。阿里巴巴、网易、海康威视总部所在地，杭州「互联网 +」核心。',
      highlights: ['阿里巴巴', '网易', '海康威视', '滨江公园', '星光大道'],
      scenic: [
        { name: '白马湖生态创意城', type: '景区', desc: '中国动漫节永久会址' },
        { name: '杭州乐园', type: '主题公园', desc: '过山车、水上乐园' },
        { name: '湘湖（部分）', type: '5A 景区', desc: '与西湖并称「姊妹湖」' },
        { name: '星光大道步行街', type: '商街', desc: '电影主题商业街' },
        { name: '钱塘江沿岸', type: '滨江公园', desc: '最美滨江跑道' }
      ],
      landmarks: ['阿里巴巴总部', '网易总部', '海康威视', '吉利总部', '杭州印'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527155/index.html',
      features: '高新区、互联网企业总部（阿里/网易/海康/大华）、动漫产业、物联网产业'
    },
    {
      id: 'xiaoshan',
      name: '萧山区',
      type: '副城',
      area: '803 km²',
      population: '约 158 万',
      postcode: '311200',
      tag: '机场门户 · 民企之乡',
      desc: '杭州面积第二大的区，萧山国际机场所在地，杭州富豪聚集地（民营企业之乡）。湘湖所在地。',
      highlights: ['萧山机场', '湘湖', '杭州乐园', '极乐寺', '跨湖桥遗址'],
      scenic: [
        { name: '湘湖', type: '5A 景区', desc: '跨湖桥遗址所在地，8000 年文明' },
        { name: '杭州乐园', type: '主题公园', desc: '长三角老牌主题公园' },
        { name: '极乐寺', type: '寺院', desc: '萧山最大寺院' },
        { name: '东方文化园', type: '文化园', desc: '儒释道三家合一' },
        { name: '观潮城（南阳）', type: '观潮点', desc: '钱塘江大潮最佳观赏点之一' }
      ],
      landmarks: ['萧山国际机场', '杭州南站', '宝盛中心', '万象汇', '旺角城'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527156/index.html',
      features: '萧山国际机场、民营企业之乡（恒逸、荣盛）、湘湖度假区、亚洲邮展中心'
    },
    {
      id: 'yuhang',
      name: '余杭区',
      type: '副城',
      area: '940 km²',
      population: '约 140 万',
      postcode: '311100',
      tag: '良渚文明 · 未来科技城',
      desc: '杭州面积最大的区。良渚古城遗址（世界遗产）所在地，未来科技城是杭州科创引擎，阿里巴巴发源地。',
      highlights: ['良渚古城', '未来科技城', '阿里巴巴西溪园区', '西溪湿地（部分）', '径山茶'],
      scenic: [
        { name: '良渚古城遗址公园', type: '世界遗产', desc: '5000 年中华文明实证，门票 50 元' },
        { name: '良渚博物院', type: '博物馆', desc: '免费，周一闭馆，建筑大师设计' },
        { name: '径山寺', type: '寺院', desc: '日本茶道祖庭，径山茶宴' },
        { name: '双溪漂流', type: '漂流', desc: '江南第一漂' },
        { name: '梦想小镇', type: '特色小镇', desc: '互联网创业小镇' }
      ],
      landmarks: ['阿里巴巴西溪园区', '未来科技城', '梦想小镇', '之江实验室', '湖畔大学'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527157/index.html',
      features: '良渚文明（世界遗产）、未来科技城、阿里巴巴总部、之江实验室、径山茶'
    },
    {
      id: 'linping',
      name: '临平区',
      type: '副城',
      area: '286 km²',
      population: '约 80 万',
      postcode: '311500',
      tag: '杭州东站 · 家纺之都',
      desc: '2021 年从原余杭区分出独立设区，杭州东部门户。中国家纺名都、工业制造强区。',
      highlights: ['临平山', '艺尚小镇', '超山梅花', '临平大剧院', '家纺市场'],
      scenic: [
        { name: '超山风景区', type: '景区', desc: '江南三大探梅胜地，2-3 月最佳' },
        { name: '临平山公园', type: '公园', desc: '城区绿肺，俯瞰临平全景' },
        { name: '塘栖古镇', type: '古镇', desc: '京杭运河沿岸，杭州唯一古镇' },
        { name: '艺尚小镇', type: '特色小镇', desc: '中国时尚产业高地' },
        { name: '临平大剧院', type: '文化地标', desc: '杭州第二大剧院' }
      ],
      landmarks: ['临平新城', '余杭大剧院', '工业互联网小镇', '布卉小镇', '杭州西站（临平南）'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527158/index.html',
      features: '杭州东站门户、家纺产业、时尚创意（艺尚小镇）、塘栖古镇、超山梅花'
    },
    {
      id: 'qiantang',
      name: '钱塘区',
      type: '副城',
      area: '434 km²',
      population: '约 78 万',
      postcode: '310018',
      tag: '下沙大学城 · 制造基地',
      desc: '2021 年由原大江东 + 下沙合并设立。下沙大学城（浙江省最大高教园）+ 大江东制造业基地。',
      highlights: ['下沙大学城', '大江东', '医药港', '钱塘江滨海湿地', '宝龙城市广场'],
      scenic: [
        { name: '下沙大学城', type: '高教区', desc: '14 所高校，15 万大学生' },
        { name: '金沙湖公园', type: '公园', desc: '下沙最大城市公园' },
        { name: '钱塘江生态湿地', type: '湿地', desc: '滨江生态走廊' },
        { name: '宝龙广场', type: '商圈', desc: '下沙商业中心' },
        { name: '沿江湿地公园', type: '湿地', desc: '观潮、骑行、烧烤' }
      ],
      landmarks: ['下沙高教园', '杭州电子科技大学', '浙江理工大学', '医药港小镇', '大江东产业区'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527159/index.html',
      features: '下沙大学城（高教）、大江东制造业基地、生物医药港、跨境电商'
    },
    {
      id: 'fuyang',
      name: '富阳区',
      type: '副城',
      area: '1821 km²',
      population: '约 73 万',
      postcode: '311400',
      tag: '《富春山居图》原乡 · 造纸之乡',
      desc: '2014 年撤市设区。元代黄公望《富春山居图》描绘之地，中国造纸之乡、运动休闲之城。',
      highlights: ['富春山居图', '富春江', '龙门古镇', '新登古城', '银湖科技城'],
      scenic: [
        { name: '龙门古镇', type: '古镇', desc: '孙权故里，三国孙氏后裔聚居' },
        { name: '富春桃源', type: '景区', desc: '溶洞 + 漂流 + 玻璃栈道' },
        { name: '黄公望隐居地', type: '文化地标', desc: '《富春山居图》创作地' },
        { name: '杭州野生动物世界', type: '景区', desc: '4A 级，亲子首选' },
        { name: '东梓关村', type: '网红村', desc: '中国最美安置房' }
      ],
      landmarks: ['富春江', '新登古城', '银湖科技城', '富阳高铁站', '春永线'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527160/index.html',
      features: '《富春山居图》原型地、造纸之乡、运动休闲之城、龙门古镇'
    },
    {
      id: 'linan',
      name: '临安区',
      type: '副城',
      area: '3124 km²',
      population: '约 54 万',
      postcode: '311300',
      tag: '吴越王故里 · 山核桃之都',
      desc: '2017 年撤市设区，杭州面积最大的区。吴越国发祥地，中国山核桃之乡、竹子之乡。',
      highlights: ['天目山', '清凉峰', '青山湖', '大明山', '白果之乡'],
      scenic: [
        { name: '天目山', type: '国家级自然保护区', desc: '大树华盖闻九洲，银杏祖树' },
        { name: '大明山', type: '景区', desc: '高山滑雪场（江南罕见）' },
        { name: '青山湖', type: '湖景', desc: '水上森林奇观' },
        { name: '太湖源', type: '景区', desc: '太湖发源地之一' },
        { name: '白果之乡 (白牛村)', type: '淘宝村', desc: '中国最早淘宝村' }
      ],
      landmarks: ['天目山', '清凉峰', '青山湖科技城', '临安博物馆', '钱王陵'],
      govUrl: 'https://www.hangzhou.gov.cn/col/col1229527161/index.html',
      features: '吴越文化（钱王故里）、山核桃、竹笋、生态旅游、青山湖科技城'
    },
    {
      id: 'tonglu',
      name: '桐庐县',
      type: '县',
      area: '1825 km²',
      population: '约 37 万',
      postcode: '311500',
      tag: '中国最美县城 · 瑶琳仙境',
      desc: '杭州西部郊县，连续多年获「中国最美县城」称号。瑶琳仙境、富春山居图（下游）所在地。',
      highlights: ['瑶琳仙境', '富春江（下游）', '芦茨村', '深澳古村', '桐庐米粿'],
      scenic: [
        { name: '瑶琳仙境', type: '溶洞', desc: '全国著名溶洞，地下迷宫' },
        { name: '富春江小三峡', type: '景区', desc: '严子陵钓台所在地' },
        { name: '芦茨村', type: '慢生活村', desc: '土屋、溪流、慢生活' },
        { name: '深澳古村', type: '古村', desc: '申屠氏家族聚居 1000 年' },
        { name: '合村竹筏漂流', type: '漂流', desc: '桐庐溪漂流代表' }
      ],
      landmarks: ['大奇山国家森林公园', '桐君山（中药鼻祖）', '桐庐博物馆', '桐庐银泰'],
      govUrl: 'https://www.tonglu.gov.cn/',
      features: '中国最美县城、瑶琳仙境、富春江下游、中药文化（桐君老人）、慢生活'
    },
    {
      id: 'chunan',
      name: '淳安县',
      type: '县',
      area: '4427 km²',
      population: '约 33 万',
      postcode: '311700',
      tag: '千岛湖 · 国家级饮用水源地',
      desc: '杭州面积最大的县。千岛湖（新安江水库）所在地，农夫山泉水源地，国家级风景名胜区。',
      highlights: ['千岛湖', '农夫山泉', '梅峰岛', '环湖骑行', '鱼头'],
      scenic: [
        { name: '千岛湖中心湖区', type: '5A 景区', desc: '梅峰岛、月光岛、龙山岛' },
        { name: '千岛湖东南湖区', type: '5A 景区', desc: '黄山尖、天池岛' },
        { name: '环湖骑行绿道', type: '骑行', desc: '120 公里最美环湖骑行道' },
        { name: '千岛湖水下古城', type: '潜水', desc: '原遂安县城，1959 年沉水' },
        { name: '文渊狮城', type: '复刻古城', desc: '水下古城的岸上复刻版' }
      ],
      landmarks: ['千岛湖', '农夫山泉水源地', '淳安博物馆', '千岛湖大桥', '梦姑塘'],
      govUrl: 'https://www.qdh.gov.cn/',
      features: '千岛湖 5A 景区、农夫山泉水源、环湖骑行、有机鱼头、水下古城'
    },
    {
      id: 'jiande',
      name: '建德市',
      type: '县级市',
      area: '2314 km²',
      population: '约 44 万',
      postcode: '311600',
      tag: '新安江 · 17 度清凉水',
      desc: '杭州代管的县级市。新安江水电站（中国第一座自己设计的水电站）所在地，江水常年 17°C。',
      highlights: ['新安江', '建德豆腐包', '大慈岩', '新叶古村', '建德人」「上山文化」'],
      scenic: [
        { name: '大慈岩', type: '景区', desc: '悬空寺、立佛、银杏王' },
        { name: '灵栖洞', type: '溶洞', desc: '《西游记》取景地' },
        { name: '新叶古村', type: '古村', desc: '《爸爸去哪儿》取景地' },
        { name: '新安江水电站', type: '工业旅游', desc: '中国水电事业里程碑' },
        { name: '七里扬帆', type: '景区', desc: '富春江下游最美一段' }
      ],
      landmarks: ['新安江', '建德博物馆', '严州古城（梅城）', '建德高铁东站'],
      govUrl: 'https://www.jiande.gov.cn/',
      features: '新安江 17°C 清凉水、严州古城（梅城）、大慈岩悬空寺、上山文化遗址'
    }
  ];

  // 支持单区查询：/api/districts?id=shangcheng
  const id = req.query && req.query.id;
  if (id) {
    const found = districts.find(d => d.id === id);
    if (!found) {
      return res.status(404).json({ error: 'District not found' });
    }
    return res.status(200).json({ updated: '2026-09-10', district: found });
  }

  res.status(200).json({
    updated: '2026-09-10',
    total: districts.length,
    type_breakdown: {
      '主城': districts.filter(d => d.type === '主城').length,
      '副城': districts.filter(d => d.type === '副城').length,
      '县级市': districts.filter(d => d.type === '县级市').length,
      '县': districts.filter(d => d.type === '县').length
    },
    districts: districts
  });
};
