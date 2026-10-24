/**
 * ============================================
 * iHangzhou 栏目体系数据（v7 改版）
 * 8 个一级栏目 × 8 个二级栏目 = 64 个二级栏目页
 *
 * 每个二级栏目包含：
 *   th  三级入口（8 个，[图标, 名称, 链接]）
 *   ft  精选内容（3 个，[图标, 标题, 描述, 链接]）
 *   kw  文章匹配关键词（用于从 articles/index.json 拉取相关文章）
 *
 * 页面：cat.html?c=travel            一级栏目页
 *       cat.html?c=travel&s=景点门票  二级栏目页
 * ============================================
 */
window.CAT_DATA = [
  {
    k: 'travel', n: '旅游出行', ic: '🧭', c: '#1f7a5a', home: 'travel.html',
    d: '景点 · 周边 · 周末 · 街巷 · 观潮 一站玩转',
    i: '西湖十景、灵隐古刹、西溪湿地、钱塘江大潮——杭州的好玩之处，从门票预约到最佳路线，一站搞定。',
    kw: ['旅游', '景点', '西湖', '周边游'],
    subs: [
      {
        k: 'jingdian', n: '景点门票', ic: '🎫',
        d: '西湖·灵隐·西溪 杭州招牌玩法',
        i: '杭州景点密集，西湖十景、灵隐古刹、西溪湿地各有千秋。这里汇总门票、预约与最佳路线，省心玩转杭州。',
        th: [
          ['⛲', '西湖十景', 'place.html?id=westlake'], ['⛩️', '灵隐寺', 'place.html?id=lingyin'],
          ['🛶', '西溪湿地', 'place.html?id=xixi'], ['🗼', '雷峰塔', 'scenic.html?id=leifengta'],
          ['🎭', '宋城千古情', 'place.html?id=songcheng'], ['🏛️', '良渚古城', 'place.html?id=liangzhu'],
          ['🌸', '法喜寺', 'place.html?id=faxi'], ['🌉', '断桥残雪', 'scenic.html?id=xihu-duanqiao']
        ],
        ft: [
          ['🎫', '灵隐寺门票与路线', '飞来峰 45 + 灵隐寺 30，含交通与组合玩法', 'place.html?id=lingyin'],
          ['🌊', '西湖十景全攻略', '苏堤春晓到断桥残雪，附最佳时间与机位', 'place.html?id=westlake'],
          ['🛶', '西溪湿地摇橹船', '秋雪庵芦苇与渔家烟雨，购票与班次', 'place.html?id=xixi']
        ],
        kw: ['景点', '门票', '西湖', '灵隐', '预约']
      },
      {
        k: 'zhoubian', n: '周边游', ic: '🚙',
        d: '乌镇·莫干山·千岛湖 周末出城',
        i: '周末想出城透口气？乌镇、莫干山、千岛湖、安吉一日往返攻略与避坑指南都在这儿。',
        th: [
          ['🏘️', '乌镇', 'guzhen.html?id=wuzhen'], ['🏔️', '莫干山', 'zhoubian.html?id=mogan'],
          ['🏝️', '千岛湖', 'zhoubian.html?id=qiandao'], ['🎋', '安吉', 'zhoubian.html?id=anji'],
          ['🌲', '天目山', 'zhoubian.html?id=tianmu'], ['🏞️', '桐庐', 'zhoubian.html?id=tonglu'],
          ['🌊', '淳安', 'zhoubian.html?id=chunan'], ['🍑', '建德', 'zhoubian.html?id=jiande']
        ],
        ft: [
          ['🚙', '周边游频道', '杭州出发 1-3 小时圈全部好去处', 'around.html'],
          ['🏝️', '千岛湖国庆攻略', '烟花秀、露营与交通指南', 'zhoubian.html?id=qiandao'],
          ['🎋', '安吉竹海民宿', '竹林深处怎么选怎么订', 'zhoubian.html?id=anji']
        ],
        kw: ['周边游', '千岛湖', '莫干山', '乌镇', '安吉']
      },
      {
        k: 'zhoumo', n: '周末去哪', ic: '🗓️',
        d: '亲子·展览·演出 杭州周末不无聊',
        i: '周末带娃、看展、听演出？亲子好去处、近期展览与演出日历实时更新。',
        th: [
          ['👨‍👩‍👧', '亲子', 'weekend.html?id=qinzi'], ['🖼️', '展览', 'weekend.html?id=zhanluan'],
          ['🎵', '演出', 'weekend.html?id=yanchang'], ['🎪', '市集', 'weekend.html?id=shiji'],
          ['🏕️', '露营', 'weekend.html?id=luying'], ['🚴', '骑行', 'weekend.html?id=qihang-weekend'],
          ['🥾', '徒步', 'weekend.html?id=tube'], ['🌸', '赏花', 'weekend.html?id=shanghua']
        ],
        ft: [
          ['🗓️', '周末去哪频道', '亲子、免费景点、市集与短途自驾', 'weekend.html'],
          ['🎆', '国庆免费玩 10 个地方', '不花钱也能玩好的杭州清单', 'weekend.html?id=qinzi'],
          ['🎵', '天目山音乐节', '时间阵容购票交通全指南', 'weekend.html?id=yanchang']
        ],
        kw: ['周末', '亲子', '展览', '市集', '免费']
      },
      {
        k: 'xiangxiang', n: '街巷漫步', ic: '🛤️',
        d: '小河直街·大兜路·馒头山 老城慢游',
        i: '避开人潮，钻进小河直街、大兜路、馒头山这些有故事的街巷，感受老杭州的烟火气。',
        th: [
          ['🏠', '小河直街', 'xiangxiang.html?id=xiaoxi'], ['🛤️', '大兜路', 'xiangxiang.html?id=dadou'],
          ['⛰️', '馒头山', 'xiangxiang.html?id=mantou'], ['🏮', '河坊街', 'xiangxiang.html?id=hefang-street'],
          ['🌳', '五柳巷', 'history.html'], ['🏮', '南宋御街', 'xiangxiang.html?id=zhedong'],
          ['🌅', '北山街', 'xiangxiang.html?id=beishan'], ['🌊', '南山路', 'xiangxiang.html?id=nanshan']
        ],
        ft: [
          ['🛍️', '逛街购物频道', '商圈、街道与城市记忆', 'street.html'],
          ['🏮', '河坊街千年古巷', '一条街读尽杭州市井', 'xiangxiang.html?id=hefang-street'],
          ['🚢', '运河边的老街', '从开通到复兴的 2000 年', 'xiangxiang.html?id=zhedong']
        ],
        kw: ['街巷', '河坊街', '运河', '老街', '街道']
      },
      {
        k: 'luxian', n: '路线攻略', ic: '🧭',
        d: '一日游·两日游·自驾 经典路线',
        i: '西湖一日游、环湖骑行、杭黄高铁沿线、千岛湖自驾——经典路线一次收藏。',
        th: [
          ['📅', '一日游', 'route.html?id=yiriyou'], ['📆', '两日游', 'route.html?id=liangriyou'],
          ['🚗', '自驾', 'route.html?id=zijia'], ['🚴', '环湖骑行', 'route.html?id=qihang'],
          ['🚄', '高铁沿线', 'route.html?id=gaotie'], ['🥾', '徒步线', 'route.html?id=tiesen'],
          ['📷', '摄影机位', 'route.html?id=sheying'], ['🗺️', '全景地图', 'route.html?id=quantu']
        ],
        ft: [
          ['🧭', '旅游出行频道', '景点、周边、周末全部入口', 'travel.html'],
          ['🚴', '环西湖骑行线', '十景怎么串最顺', 'route.html?id=qihang'],
          ['🚄', '杭黄高铁沿线', '千岛湖、黄山一线玩', 'route.html?id=gaotie']
        ],
        kw: ['路线', '一日游', '攻略', '自驾']
      },
      {
        k: 'guanchao', n: '钱塘江观潮', ic: '🌊',
        d: '潮时预报与最佳观赏点',
        i: '农历八月十八前后钱塘江大潮最盛。盐官、美女坝、城市阳台观赏点与时间预报一站查。',
        th: [
          ['🌊', '今日潮时', '#act:tide'], ['📍', '海宁盐官', 'tide.html?id=yanguan'],
          ['🔁', '老盐仓', 'tide.html?id=shaoshao'], ['👩', '萧山美女坝', 'tide.html?id=meinvba'],
          ['💥', '下沙七格', 'tide.html?id=xiasha'], ['🏙️', '城市阳台', 'tide.html?id=yangtai'],
          ['📜', '观潮传统', 'tide.html?id=chuantong'], ['⚠️', '安全提示', 'tide.html?id=safe']
        ],
        ft: [
          ['🌊', '钱塘江潮汐预报', '点此查询各观潮点逐日潮时', '#act:tide'],
          ['🎋', '六和听涛', '钱塘江潮观潮胜地详解', 'tide.html?id=liuhe'],
          ['📜', '观潮两千年', '始于汉魏、盛于唐宋的习俗', 'tide.html?id=chuantong']
        ],
        kw: ['观潮', '钱塘江', '潮汐', '六和听涛']
      },
      {
        k: 'xihu', n: '西湖十景', ic: '⛲',
        d: '苏堤春晓·断桥残雪 十景全解',
        i: '苏堤春晓、断桥残雪、三潭印月——西湖十景怎么玩最顺，附最佳时间与机位。',
        th: [
          ['🌿', '苏堤春晓', 'scenic.html?id=xihu-sudi'], ['🌉', '断桥残雪', 'scenic.html?id=xihu-duanqiao'],
          ['🌙', '三潭印月', 'scenic.html?id=xihu-san'], ['🪷', '曲院风荷', 'scenic.html?id=xihu-qu'],
          ['🗼', '雷峰夕照', 'scenic.html?id=leifengta'], ['🌕', '平湖秋月', 'scenic.html?id=xihu-ping'],
          ['🔔', '南屏晚钟', 'scenic.html?id=xihu-nan'], ['🌾', '柳浪闻莺', 'scenic.html?id=xihu-liu']
        ],
        ft: [
          ['⛲', '西湖十景全攻略', '十景串联路线与最佳时段', 'place.html?id=westlake'],
          ['🪷', '花港观鱼', '鱼游花间的闲情雅致', 'scenic.html?id=xihu-hua'],
          ['🌉', '断桥残雪', '白堤起点与最佳机位', 'scenic.html?id=xihu-duanqiao']
        ],
        kw: ['西湖十景', '苏堤', '断桥', '三潭印月']
      },
      {
        k: 'guzhen', n: '古镇古村', ic: '🏚️',
        d: '塘栖·龙门·深澳 江南古韵',
        i: '塘栖古镇、龙门古镇、深澳古村，离杭州不过一小时，适合半日慢游的江南古韵。',
        th: [
          ['🏮', '塘栖', 'guzhen.html?id=tangqi'], ['🏯', '龙门', 'guzhen.html?id=longmen'],
          ['🏘️', '深澳', 'guzhen.html?id=shengao'], ['🌳', '新叶', 'guzhen.html?id=xinye'],
          ['🍵', '芹川', 'guzhen.html?id=qinchuan'], ['🍁', '指南村', 'guzhen.html?id=zhinan'],
          ['🏞️', '株川', 'guzhen.html?id=zhuchuan'], ['🌾', '下姜', 'guzhen.html?id=xiajiang']
        ],
        ft: [
          ['🏚️', '古镇古村合集', '杭州周边一小时车程古韵地图', 'cat.html?c=travel&s=%E5%8F%A4%E9%95%87%E5%8F%A4%E6%9D%91'],
          ['🏮', '塘栖古镇', '运河第一庄的桥与枇杷', 'guzhen.html?id=tangqi'],
          ['🏯', '龙门古镇', '孙权故里的迷宫街巷', 'guzhen.html?id=longmen']
        ],
        kw: ['古镇', '塘栖', '龙门', '古村', '深澳']
      }
    ]
  },
  {
    k: 'food', n: '美食餐饮', ic: '🍜', c: '#d98324', home: 'food.html',
    d: '杭帮菜 · 咖啡 · 老字号 · 夜市 吃透杭州',
    i: '从西湖醋鱼、龙井虾仁到东坡肉，杭帮菜必点清单与最正宗的老店都在这里。',
    kw: ['美食', '杭帮菜', '小吃', '餐厅'],
    subs: [
      {
        k: 'hangbang', n: '杭帮菜', ic: '🥢',
        d: '西湖醋鱼到东坡肉 老底子味道',
        i: '从西湖醋鱼、龙井虾仁到东坡肉，杭帮菜必点清单与最正宗老店都在这里。',
        th: [
          ['🐟', '西湖醋鱼', 'hangbang.html?id=xihu-cuyu'], ['🦐', '龙井虾仁', 'hangbang.html?id=longjing-xiaren'],
          ['🥩', '东坡肉', 'hangbang.html?id=dongporou'], ['🍲', '宋嫂鱼羹', 'hangbang.html?id=songsaoyugeng'],
          ['🐔', '叫花鸡', 'hangbang.html?id=jihuaji'], ['🥟', '干炸响铃', 'hangbang.html?id=ganzhaixiangling'],
          ['🍵', '杭三鲜', 'hangbang.html?id=hangsanxian'], ['🍯', '蜜汁火方', 'hangbang.html?id=mizhihuofang']
        ],
        ft: [
          ['🥢', '杭州美食频道', '杭帮菜、小吃、甜品全入口', 'food.html'],
          ['🐟', '西湖醋鱼与东坡肉', '两道招牌菜的文化密码', 'hangbang.html?id=xihu-cuyu'],
          ['🍜', '片儿川', '杭州小吃的清新美学', 'hangbang.html?id=pianer-chuan']
        ],
        kw: ['杭帮菜', '西湖醋鱼', '东坡肉', '美食']
      },
      {
        k: 'coffee', n: '咖啡', ic: '☕',
        d: '西湖边·写字楼·独立咖啡',
        i: '西湖边景观咖啡、写字楼平价咖啡、小众独立咖啡馆，一份杭州咖啡地图。',
        th: [
          ['🌅', '西湖边', 'coffee.html?id=hu-pan'], ['🏙️', '写字楼', 'coffee.html?id=xiezilou'],
          ['🏡', '青芝坞', 'coffee.html?id=qinzhaizi'], ['⛰️', '馒头山', 'xiangxiang.html?id=mantou'],
          ['🍵', '四眼井', 'coffee.html?id=siyanku'], ['🌿', '满觉陇', 'coffee.html?id=manjue-cafe'],
          ['🏭', '天目里', 'coffee.html?id=tianmuli'], ['💡', '东信和创', 'coffee.html?id=dongxin']
        ],
        ft: [
          ['☕', '咖啡馆指南', '景观、平价与独立咖啡地图', 'coffee.html'],
          ['👨‍👩‍👧', '亲子咖啡馆攻略', '周末溜娃好去处', 'coffee.html?id=hu-pan'],
          ['🫖', '20 个茶空间', '茶馆文化深度体验攻略', 'chaguan.html?id=chaguan-zongguan']
        ],
        kw: ['咖啡', '咖啡馆', '茶空间']
      },
      {
        k: 'laozihao', n: '老字号', ic: '🏮',
        d: '知味观·奎元馆 百年老店',
        i: '知味观、奎元馆、王润兴——这些百年老字号的必点与避坑指南。',
        th: [
          ['🥟', '知味观', 'laozihao.html'], ['🍜', '奎元馆', 'laozihao.html?id=kuiyuanguan'],
          ['🐟', '楼外楼', 'laozihao.html?id=louwailou'], ['🍲', '王润兴', 'laozihao.html?id=wang-runxing'],
          ['🌿', '胡庆余堂', 'laozihao.html?id=zhuo-ji-lao-zhao'], ['🪭', '王星记', 'intangible.html?id=wangxingji'],
          ['✂️', '张小泉', 'intangible.html?id=zhangxiaoquan'], ['🏥', '方回春堂', 'laozihao.html?id=zhuo-ji-lao-zhao']
        ],
        ft: [
          ['🏮', '百年老店频道', '杭州老字号品牌全集', 'laozihao.html'],
          ['🌿', '胡庆余堂', '医药龙头的商业帝国', 'laozihao.html?id=zhuo-ji-lao-zhao'],
          ['🏥', '老药堂的消失', '一条街的医药记忆', 'laozihao.html?id=zhuo-ji-lao-zhao']
        ],
        kw: ['老字号', '知味观', '胡庆余堂', '张小泉']
      },
      {
        k: 'yeshi', n: '夜市', ic: '🌃',
        d: '河坊街·武林·滨江 夜宵地图',
        i: '河坊街、武林夜市、滨江星光夜市，杭州夜宵地图与必吃摊位。',
        th: [
          ['🏮', '河坊街', 'night-market.html?id=hefang'], ['🌃', '武林夜市', 'night-market.html?id=wulin'],
          ['✨', '滨江星光', 'night-market.html?id=binjiang'], ['💧', '下沙', 'night-market.html?id=xiasha'],
          ['🏞️', '金沙湖', 'night-market.html?id=jinsha'], ['🌊', '新安江', 'night-market.html?id=xinan'],
          ['🏝️', '千岛湖', 'night-market.html?id=qiandao'], ['🍢', '烧烤', 'night-market.html?id=shaokao']
        ],
        ft: [
          ['🌃', '杭州夜宵地图', '从西湖周边到夜市的三角地带', 'night-market.html?id=yeshi'],
          ['🍜', '街头美食地图', '街巷美食与速食之趣', 'night-market.html?id=night-street-map'],
          ['🌙', '现代夜经济', '从市井夜市到都市夜生活', 'night-market.html?id=yesji-jingji']
        ],
        kw: ['夜市', '夜宵', '小吃', '街头美食']
      },
      {
        k: 'zaocan', n: '早餐', ic: '🥟',
        d: '拌面·生煎·小笼 唤醒杭州',
        i: '一碗拌面、一笼小笼、一份生煎，杭州人的早餐江湖与老店清单。',
        th: [
          ['🍜', '拌面', 'breakfast.html?id=banmian'], ['🥟', '生煎', 'breakfast.html?id=shengjian'],
          ['🍲', '小笼', 'breakfast.html?id=xiaolongbao'], ['🥣', '馄饨', 'breakfast.html?id=hundun'],
          ['🥮', '葱包桧', 'breakfast.html?id=congbao'], ['🍩', '油冬儿', 'breakfast.html?id=youdonger'],
          ['🍜', '片儿川', 'breakfast.html?id=pianerchuan'], ['🥛', '豆浆', 'breakfast.html?id=doujiang']
        ],
        ft: [
          ['🥟', '杭州早餐江湖', '老店清单与营业时间', 'breakfast.html?id=zaocan-jianghu'],
          ['🍜', '片儿川', '一碗面的清新美学', 'breakfast.html?id=pianer-chuan'],
          ['🍲', '小笼包地图', '杭州人排队的老店', 'breakfast.html?id=xiaolongbao']
        ],
        kw: ['早餐', '片儿川', '小笼', '拌面']
      },
      {
        k: 'tianpin', n: '甜品', ic: '🍰',
        d: '定胜糕·条头糕 江南甜糯',
        i: '定胜糕、条头糕、桂花糖藕，杭州传统甜糯点心去哪买最正宗。',
        th: [
          ['🍰', '定胜糕', 'dessert.html?id=dingshenggao'], ['🍡', '条头糕', 'dessert.html?id=tiaotougao'],
          ['🪷', '桂花糖藕', 'dessert.html?id=guihuatangou'], ['🍵', '龙井酥', 'dessert.html?id=longjingsu'],
          ['🥣', '藕粉', 'dessert.html?id=oufen'], ['🍡', '麻团', 'dessert.html?id=matuan'],
          ['🌿', '青团', 'dessert.html?id=qingtuan'], ['🍘', '桂花糕', 'dessert.html?id=guihuagao']
        ],
        ft: [
          ['🍰', '江南甜糯点心', '传统糕点去哪买最正宗', 'dessert.html?id=tianpin-jiangnan'],
          ['🌿', '中秋与桂花', '赏月和桂花的故事', 'dessert.html?id=zhongqiu'],
          ['🍵', '龙井茶食', '茶点搭配指南', 'dessert.html?id=longjing-chashi']
        ],
        kw: ['甜品', '糕点', '桂花', '定胜糕']
      },
      {
        k: 'longjing', n: '龙井茶', ic: '🍵',
        d: '狮峰·龙坞 买茶不踩坑',
        i: '狮峰龙井、龙坞茶村，明前雨前怎么分、去哪买不被坑。',
        th: [
          ['⛰️', '狮峰', 'tea.html?id=shifeng'], ['🏘️', '龙坞', 'tea.html?id=longwu'],
          ['🍃', '梅家坞', 'tea.html?id=meijia'], ['🌳', '翁家山', 'tea.html?id=wengjia'],
          ['🌿', '满觉陇', 'tea.html?id=manjue'], ['🎋', '云栖', 'tea.html?id=shifeng'],
          ['🍵', '径山', 'tea.html?id=jingshan-cha'], ['🏝️', '千岛湖', 'zhoubian.html?id=qiandao']
        ],
        ft: [
          ['🍵', '龙井茶文化', '前世今生与推荐泡茶体验', 'tea.html?id=jingshan-cha'],
          ['🍃', '龙井茶园', '千年传统与现代技艺融合', 'tea.html?id=wengjia'],
          ['📜', '浙江传统茶文化', '茶文化的历史内涵与传承', 'tea.html?id=shifeng']
        ],
        kw: ['龙井', '茶文化', '茶园', '径山']
      },
      {
        k: 'chaguan', n: '茶馆', ic: '🫖',
        d: '湖畔·巷里 泡一壶下午',
        i: '西湖边景观茶馆、巷子里老茶馆，杭州喝茶的好去处与人均参考。',
        th: [
          ['🌅', '湖畔茶馆', 'chaguan.html?id=hu-pan-teahouse'], ['🏮', '巷里茶馆', 'chaguan.html?id=chaguan-zongguan'],
          ['🧱', '青砖茶室', 'chaguan.html?id=chaguan-zongguan'], ['🫖', '老茶馆记忆', 'chaguan.html?id=chaguan-zongguan'],
          ['🍵', '茶空间', 'chaguan.html?id=chaguan-zongguan'], ['🎎', '宋式点茶', 'chaguan.html?id=chaguan-zongguan'],
          ['🍜', '径山茶宴', 'chaguan.html?id=chayaun'], ['📖', '茶馆文化', 'chaguan.html?id=chaguan-zongguan']
        ],
        ft: [
          ['🫖', '20 个茶空间深度攻略', '杭州茶馆文化体验', 'chaguan.html?id=chaguan-zongguan'],
          ['📖', '消失的老茶馆记忆', '一条街的茶事', 'chaguan.html?id=chaguan-zongguan'],
          ['🍵', '浙江茶文化传承', '从历史内涵到当代', 'chaguan.html?id=chaguan-zongguan']
        ],
        kw: ['茶馆', '茶空间', '老茶馆', '点茶']
      }
    ]
  },
  {
    k: 'culture', n: '文博人文', ic: '🏛️', c: '#8a6fd6',
    d: '博物馆 · 历史 · 名人 · 故事 读懂杭州',
    i: '浙江省博物馆、良渚古城、西湖博物馆——镇馆之宝与参观路线一站看。',
    kw: ['文化', '博物馆', '历史', '人文'],
    subs: [
      {
        k: 'museum', n: '博物馆', ic: '🏛️',
        d: '浙博·良渚·西湖馆',
        i: '浙江省博物馆、良渚古城、西湖博物馆——镇馆之宝与参观路线一站看。',
        th: [
          ['🏛️', '浙江省博', 'museum.html'], ['🏺', '良渚博物院', 'place.html?id=liangzhu'],
          ['⛲', '西湖博物馆', 'museum.html'], ['🧵', '丝绸博物馆', 'museum.html?id=china-silk'],
          ['🍵', '茶叶博物馆', 'museum.html?id=zhemo'], ['✂️', '刀剪剑博物馆', 'museum.html?id=zhemo'],
          ['🛶', '湿地博物馆', 'museum.html?id=zhejiang-art'], ['🚢', '运河博物馆', 'history.html']
        ],
        ft: [
          ['🏛️', '杭州博物馆地图', '免费文化之旅全入口', 'museum.html'],
          ['🏺', '良渚古城', '5000 年文明实证', 'place.html?id=liangzhu'],
          ['🏛️', '浙江省博物馆深度游', '镇馆之宝怎么看', 'museum.html?id=zhemo']
        ],
        kw: ['博物馆', '良渚', '浙江省博物馆', '美术馆']
      },
      {
        k: 'lishi', n: '历史人文', ic: '📜',
        d: '大运河·南宋·世界遗产',
        i: '京杭大运河、南宋临安城、西湖世界遗产，读懂杭州的来龙去脉。',
        th: [
          ['🚢', '大运河', 'history.html?id=dayun-he'], ['🏯', '南宋皇城', 'history.html'],
          ['⛲', '西湖申遗', 'history.html?id=liang-zhu-civil'], ['🏺', '良渚', 'place.html?id=liangzhu'],
          ['🌊', '钱塘江', 'history.html?id=liang-zhu-civil'], ['🧱', '古城墙', 'history.html?id=hang-zhou-arc'],
          ['🛤️', '御街', 'history.html'], ['🏘️', '市井', 'story.html?id=shijing']
        ],
        ft: [
          ['📜', '杭州历史文化', '从起源繁荣到文化高峰', 'history.html'],
          ['🚢', '运河两千年', '从开通到断航再到复兴', 'history.html?id=dayun-he'],
          ['🏙️', '从运河记忆到新经济', '杭州的转型跃迁', 'history.html?id=zhejiang-modern']
        ],
        kw: ['历史', '运河', '南宋', '皇城']
      },
      {
        k: 'mingren', n: '杭州名人', ic: '👤',
        d: '白居易·苏轼·秋瑾',
        i: '白居易、苏轼、秋瑾——他们与杭州的故事，附打卡地点。',
        th: [
          ['✍️', '白居易', 'celebrity.html?id=bai-juyi'], ['📜', '苏轼', 'celebrity.html?id=sushi'],
          ['⚔️', '秋瑾', 'celebrity.html?id=gen-shi'], ['📚', '章太炎', 'celebrity.html?id=gen-shi'],
          ['🏛️', '林徽因', 'celebrity.html?id=linhe-jing'], ['🖊️', '郁达夫', 'celebrity.html?id=linhe-jing'],
          ['🌧️', '戴望舒', 'celebrity.html?id=hong-xue-yan'], ['🥤', '宗庆后', 'celebrity.html?id=feng-meng-zhen']
        ],
        ft: [
          ['👤', '杭州名人录', '历史与当代名人全集', 'celebrity.html'],
          ['🗿', '西湖边的文人塑像', '白居易与苏轼的守望', 'celebrity.html?id=sushi'],
          ['🖊️', '鲁迅与杭州', '从桐乡到杭州的文化斗士', 'celebrity.html?id=gen-shi']
        ],
        kw: ['名人', '白居易', '苏轼', '秋瑾', '鲁迅']
      },
      {
        k: 'gushi', n: '杭州故事', ic: '📖',
        d: '老地名·传说·民俗',
        i: '白蛇传与断桥、老地名由来、西湖龙井传说，杭州的市井与传说。',
        th: [
          ['🐍', '白蛇传', 'story.html?id=baishe'], ['🦋', '梁祝', 'story.html?id=liangzhu'],
          ['⛲', '西湖传说', 'story.html?id=xihu-chuanqi'], ['🏮', '老地名', 'story.html?id=laodiming'],
          ['🎎', '民俗', 'story.html?id=minsu'], ['🏘️', '市井', 'story.html?id=shijing'],
          ['🗣️', '方言', 'story.html?id=fangyan'], ['📖', '民间故事', 'story.html?id=minjian']
        ],
        ft: [
          ['📖', '老底子杭州符号', '从文化符号到城市标志', 'story.html?id=hz-fuhao'],
          ['🗣️', '口头文化', '从民间故事到现代传播', 'story.html?id=koushou'],
          ['🏘️', '市井菜与街头小吃', '城市的烟火气', 'story.html?id=shijing']
        ],
        kw: ['故事', '传说', '民俗', '老地名']
      },
      {
        k: 'gujian', n: '古镇古建', ic: '🏯',
        d: '古桥·古塔·古宅',
        i: '古桥、古塔、古宅，杭州散落各处的古建筑与打卡路线。',
        th: [
          ['🌉', '古桥', 'gujian.html?id=gongchen-bridge'], ['🗼', '古塔', 'gujian.html?id=six-he-six-go'],
          ['🏠', '古宅', 'gujian.html?id=hu-garden'], ['⛩️', '牌坊', 'gujian.html?id=hu-garden'],
          ['🏛️', '祠堂', 'gujian.html?id=tian-ning-temple'], ['📚', '书院', 'gujian.html?id=sixi-yin-cheng'],
          ['🎭', '戏台', 'gujian.html?id=jinjiang-hotel'], ['🏮', '牌楼', 'gujian.html?id=jinjiang-hotel']
        ],
        ft: [
          ['🏯', '古建筑打卡路线', '散落各处的国保与省保', 'gujian.html?id=gongchen-bridge'],
          ['🌉', '拱宸桥', '运河终点的百年石拱', 'gujian.html?id=gongchen-bridge'],
          ['🗼', '六和塔', '钱塘江边的北宋巨塔', 'gujian.html?id=six-he-six-go']
        ],
        kw: ['古建', '古桥', '古塔', '拱宸桥', '六和塔']
      },
      {
        k: 'feiyi', n: '非遗', ic: '🎭',
        d: '评弹·杭绣·张小泉',
        i: '杭州评话、杭绣、张小泉锻剪，杭州非遗项目与体验地。',
        th: [
          ['🎭', '杭州评话', 'intangible.html?id=hanghua'], ['🧵', '杭绣', 'intangible.html?id=hangxiu'],
          ['✂️', '张小泉', 'intangible.html?id=zhangxiaoquan'], ['🪭', '王星记', 'intangible.html?id=wangxingji'],
          ['☂️', '西湖绸伞', 'intangible.html?id=xihua-san'], ['🏺', '越窑青瓷', 'intangible.html?id=yueyao'],
          ['✂️', '剪纸', 'intangible.html?id=jianzhi'], ['🌕', '中秋节', 'intangible.html?id=zhongqiu']
        ],
        ft: [
          ['☂️', '西湖伞制作技艺', '传统手工艺的诗意表达', 'intangible.html?id=xihu-san'],
          ['🏺', '越窑青瓷的复兴', '杭州瓷器的千年窑火', 'intangible.html?id=yueyao'],
          ['✂️', '杭州剪纸', '为什么这么喜庆', 'intangible.html?id=hang-zhou-jianzhi']
        ],
        kw: ['非遗', '杭绣', '剪纸', '西湖伞', '青瓷']
      },
      {
        k: 'simiao', n: '寺庙', ic: '⛩️',
        d: '灵隐·净慈·径山',
        i: '灵隐寺、净慈寺、径山寺，杭州寺庙祈福与游玩指南。',
        th: [
          ['⛩️', '灵隐寺', 'place.html?id=lingyin'], ['🔔', '净慈寺', 'temple.html?id=jingci'],
          ['🍵', '径山寺', 'temple.html?id=jingshan'], ['🌸', '法喜寺', 'place.html?id=faxi'],
          ['🌿', '永福禅寺', 'temple.html?id=yongfu'], ['⛰️', '韬光寺', 'temple.html?id=taoguang'],
          ['🏮', '香积寺', 'temple.html?id=xiangji'], ['🌲', '理安寺', 'temple.html?id=lianan']
        ],
        ft: [
          ['⛩️', '灵隐寺全攻略', '门票、交通与半日全日线', 'place.html?id=lingyin'],
          ['🌸', '法喜寺', '求姻缘与 5 元斋饭', 'place.html?id=faxi'],
          ['🍵', '径山寺与茶宴', '日本茶道源头之地', 'temple.html?id=jingshan']
        ],
        kw: ['寺庙', '灵隐', '径山', '法喜寺', '净慈寺']
      },
      {
        k: 'tushuguan', n: '图书馆', ic: '📚',
        d: '杭州图书馆·城市书房',
        i: '杭州图书馆、各区城市书房，免费自习与借阅指南。',
        th: [
          ['📚', '杭州图书馆', 'tushuguan.html?id=hz-tushuguan'], ['🏠', '城市书房', 'tushuguan.html?id=xihu-shuguan'],
          ['🎨', '动漫图书馆', 'tushuguan.html?id=zhejiang-tushuguan'], ['📜', '版本馆', 'tushuguan.html?id=zhejiang-tushuguan'],
          ['🕐', '24 小时', 'tushuguan.html?id=zhejiang-tushuguan'], ['🌾', '农家书屋', 'tushuguan.html?id=zhejiang-tushuguan'],
          ['💻', '数字图书馆', 'tushuguan.html?id=shufang-hangzhou'], ['📖', '阅读空间', 'tushuguan.html?id=shufang-hangzhou']
        ],
        ft: [
          ['📚', '城市书房的温情', '从传统阅读到智慧阅读', 'tushuguan.html?id=xihu-shuguan'],
          ['🏛️', '杭州教育资源', '从学区房到机会公平', 'tushuguan.html?id=zhejiang-sanguan'],
          ['📖', '阅读空间盘点', '免费自习好去处', 'tushuguan.html?id=shufang-hangzhou']
        ],
        kw: ['图书馆', '城市书房', '阅读', '书店']
      }
    ]
  },
  {
    k: 'banshi', n: '办事大厅', ic: '🧰', c: '#3a7bd5', home: 'banshi.html',
    d: '社保 · 公积金 · 落户 · 交通 · 区县 一次办妥',
    i: '社保、公积金、落户、交通、区县——杭州办事一次办妥，附官方入口与材料清单。',
    kw: ['办事', '社保', '公积金', '落户'],
    subs: [
      {
        k: 'shebao', n: '社保查询', ic: '💳',
        d: '缴费/余额/明细',
        i: '杭州社保查询包括五险缴费记录与个人账户余额，线上查询已对接浙里办与电子社保卡，无需到社保大厅。',
        th: [
          ['💳', '社保查询', 'banshi.html'], ['🔁', '社保转移', 'banshi.html?id=shebao'],
          ['💰', '社保缴费', 'banshi.html?id=shebao'], ['🏥', '医保报销', 'banshi.html?id=shebao-yibao'],
          ['👴', '养老待遇', 'banshi.html?id=shebao-laoyang'], ['💼', '失业金', 'banshi.html?id=shebao-shiye'],
          ['🏭', '工伤认定', 'banshi.html?id=shebao-gongshang'], ['📋', '灵活就业', 'banshi.html?id=shebao-linghuo']
        ],
        ft: [
          ['🧰', '办事大厅频道', '社保公积金落户全入口', 'banshi.html'],
          ['💳', '社保查询指南', '浙里办与电子社保卡流程', 'banshi.html'],
          ['📋', '杭州医保门诊报销', '报销比例与流程', 'banshi.html?id=shebao-yibao']
        ],
        kw: ['社保', '医保', '缴费', '报销']
      },
      {
        k: 'gjj', n: '公积金', ic: '🏦',
        d: '查询/提取/贷款',
        i: '杭州住房公积金查询覆盖余额、缴存明细、提取记录与贷款额度测算，已开通线上全流程。',
        th: [
          ['🏦', '余额查询', 'banshi.html'], ['💸', '租房提取', 'banshi.html?id=gjj'],
          ['🏠', '购房提取', 'banshi.html?id=gjj-goufang'], ['🔁', '还贷提取', 'banshi.html?id=gjj-huandai'],
          ['📄', '转移接续', 'banshi.html?id=gjj-zhuanyi'], ['🏗️', '贷款测算', 'banshi.html?id=gjj-daikuan'],
          ['👴', '退休提取', 'banshi.html?id=gjj-tuixiu'], ['📊', '缴存证明', 'banshi.html?id=gij-cunzheng']
        ],
        ft: [
          ['🧰', '办事大厅频道', '全部办事入口', 'banshi.html'],
          ['🏦', '公积金提取指南', '租房秒到账，购房 3 个工作日', 'banshi.html'],
          ['🏠', '杭州购房全攻略', '从看房到过户', 'banshi.html?id=luohu-goufang']
        ],
        kw: ['公积金', '提取', '贷款', '购房']
      },
      {
        k: 'luohu', n: '落户', ic: '📋',
        d: '人才引进·积分落户',
        i: '杭州落户含人才引进、积分落户、投靠落户等渠道，附条件对照与办理入口。',
        th: [
          ['📋', '人才引进', 'banshi.html'], ['🧮', '积分落户', 'banshi.html?id=luohu-jifen'],
          ['👨‍👩‍👧', '投靠落户', 'banshi.html?id=luohu-toukao'], ['🎓', '学历落户', 'banshi.html?id=luohu-xueli'],
          ['🏠', '购房落户', 'banshi.html?id=luohu-goufang-luohu'], ['💼', '就业落户', 'banshi.html?id=luohu-jiuye'],
          ['📄', '居住证', 'banshi.html?id=luohu-juzhuzheng'], ['🆔', '身份证', 'banshi.html?id=luohu-shenfenzheng']
        ],
        ft: [
          ['🧰', '办事大厅频道', '落户与证件办理入口', 'banshi.html'],
          ['🎓', '人才认定申请', '高层次人才分类认定', 'banshi.html'],
          ['🏫', '教育资源与公平', '学区房到机会公平', 'banshi.html?id=luohu-jiaoyu']
        ],
        kw: ['落户', '人才引进', '积分', '居住证']
      },
      {
        k: 'jiaotong', n: '出行交通', ic: '🚌',
        d: '公交·地铁·限行',
        i: '限行查询、地铁公交、火车机票、打车租车、停车缴费、违章处理，出行无忧。',
        th: [
          ['🚗', '尾号限行', 'banshi.html'], ['🚇', '地铁线路', 'banshi.html?id=jiaotong-ditie'],
          ['🚌', '实时公交', 'banshi.html?id=jiaotong-gongjiao'], ['🚄', '火车票', 'banshi.html?id=jiaotong-huoche'],
          ['✈️', '机票', 'banshi.html?id=jiaotong-jipiao'], ['🅿️', '停车缴费', 'banshi.html?id=jiaotong-tingche'],
          ['🚕', '打车租车', 'banshi.html?id=jiaotong-dache'], ['⚠️', '违章处理', 'banshi.html?id=jiaotong-weizhang']
        ],
        ft: [
          ['🚌', '出行交通频道', '限行地铁公交全入口', 'traffic.html'],
          ['🚗', '今日尾号限行', '浙A 与外地车规则', 'banshi.html'],
          ['🚇', '杭州地铁指南', '线路与换乘', 'banshi.html?id=jiaotong-ditie']
        ],
        kw: ['交通', '地铁', '公交', '限行', '停车']
      },
      {
        k: 'quxian', n: '区县导航', ic: '🏙️',
        d: '杭州 13 区县',
        i: '上城、拱墅、西湖、滨江、萧山、余杭、临平、钱塘、富阳、临安、桐庐、淳安、建德——13 区县特色一站查。',
        th: [
          ['🏙️', '上城区', 'district.html'], ['🌳', '拱墅区', 'district.html?id=gongshu'],
          ['⛲', '西湖区', 'district.html?id=xihu'], ['💻', '滨江区', 'district.html?id=binjiang'],
          ['✈️', '萧山区', 'district.html?id=xiaoshan'], ['🏞️', '余杭区', 'district.html?id=yuhang'],
          ['🏭', '临平区', 'district.html?id=linping'], ['🌊', '钱塘区', 'district.html?id=qiantang'],
        ],
        ft: [
          ['🏙️', '杭州 13 区县', '区县特色与办事入口', 'district.html'],
          ['🏞️', '富阳与桐庐', '杭州后花园的山水', 'district.html?id=fuyang'],
          ['🍵', '临安与建德', '浙西山水与土产', 'zhoubian.html?id=jiande']
        ],
        kw: ['区县', '上城', '萧山', '余杭', '富阳', '临安']
      },
      {
        k: 'cheliang', n: '车辆服务', ic: '🚗',
        d: '摇号·年检·违章',
        i: '浙A摇号、年检、违章处理、驾驶证换证——车主高频事项一次办。',
        th: [
          ['🚘', '浙A摇号', 'banshi.html'], ['🔧', '车辆年检', 'banshi.html?id=cheliang-nianjian'],
          ['⚠️', '违章查询', 'banshi.html?id=cheliang-weizhang'], ['🪪', '驾驶证', 'banshi.html'],
          ['🅿️', '停车位', 'banshi.html?id=cheliang-tingche'], ['⛽', '加油充电', 'banshi.html?id=cheliang-jiayou'],
          ['🚧', '道路施工', 'banshi.html?id=cheliang-shigong'], ['🧾', '高速收费', 'banshi.html?id=cheliang-gaosu']
        ],
        ft: [
          ['🚘', '浙A摇号申请', '指标申请与结果查询', 'banshi.html'],
          ['🅿️', '杭州停车攻略', '停车现状与省钱办法', 'banshi.html?id=cheliang-tingche'],
          ['🚗', '驾考全流程', 'C1/C2 从报名到拿证', 'banshi.html?id=cheliang-kaoshi']
        ],
        kw: ['摇号', '年检', '违章', '停车', '驾考']
      },
      {
        k: 'dianhua', n: '常用电话', ic: '📞',
        d: '21 个一键复制',
        i: '政务热线、投诉举报、急难救助、公共服务——杭州常用电话一键复制。',
        th: [
          ['📞', '12345 热线', 'banshi.html'], ['🚨', '报警 110', 'banshi.html?id=dianhua-baojing'],
          ['🚑', '急救 120', 'banshi.html?id=dianhua-jiuzhu'], ['🔥', '火警 119', 'banshi.html?id=dianhua-huojing'],
          ['💧', '水电燃气', 'banshi.html?id=dianhua-shuidian'], ['🏥', '卫生热线', 'banshi.html?id=dianhua-weisheng'],
          ['🚌', '公交服务', 'banshi.html?id=jiaotong-huoche'], ['📮', '邮政客服', 'banshi.html?id=dianhua-youzheng']
        ],
        ft: [
          ['📞', '常用电话本', '21 个号码一键复制', '#act:home'],
          ['🏛️', '杭州市政府官网', '政务公开与办事入口', 'https://www.hangzhou.gov.cn/'],
          ['📱', '浙里办', '浙江政务服务网', 'https://search.zj.gov.cn/']
        ],
        kw: ['电话', '热线', '投诉', '举报']
      },
      {
        k: 'gongju', n: '实用工具', ic: '🧰',
        d: '计算器·查询',
        i: '个税、房贷、五险一金、退休年龄、万年历、天气、油价——内置计算与查询工具。',
        th: [
          ['🧮', '个税计算', '#act:tax'], ['🏠', '房贷计算', '#act:loan'],
          ['🏦', '五险一金', '#act:sbcalc'], ['🎂', '退休年龄', '#act:retire'],
          ['📅', '万年历', '#act:calendar'], ['🌤️', '杭州天气', '#act:weather'],
          ['⛽', '油价查询', '#act:youjia'], ['📮', '邮编查询', '#act:postcode']
        ],
        ft: [
          ['🧰', '实用工具箱', '全部内置计算与查询', '#act:home'],
          ['🎂', '退休年龄计算器', '渐进式延迟退休测算', '#act:retire'],
          ['🏦', '五险一金计算器', '杭州 2024 基数参考', '#act:sbcalc']
        ],
        kw: ['计算器', '个税', '房贷', '工具']
      }
    ]
  },
  {
    k: 'zhaopin', n: '求职招聘', icon: '💼', ic: '💼', c: '#2bb0a3', home: 'zhaopin.html',
    d: '国企 · 事业 · 名企 · 兼职 机会全收录',
    i: '国企、事业单位、名企、兼职实习——杭州机会全收录，附官方报名入口。',
    kw: ['招聘', '求职', '工作', '事业'],
    subs: [
      {
        k: 'guoqi', n: '国企招聘', ic: '🏢',
        d: '央企·市属国企',
        i: '央企在杭机构、杭州市属国企招聘公告与报名入口汇总。',
        th: [
          ['🏢', '央企在杭', 'zhaopin.html'], ['🏙️', '市属国企', 'zhaopin.html?id=guoqi-shi'],
          ['💼', '区县城投', 'zhaopin.html?id=guoqi-quxian'], ['🏭', '制造业国企', 'zhaopin.html?id=guoqi-zhizao'],
          ['⚡', '能源电力', 'zhaopin.html?id=guoqi-nengyuan'], ['🚇', '轨道交通', 'zhaopin.html?id=guoqi-guidao'],
          ['🏥', '医疗卫生', 'zhaopin.html?id=guoqi-yiliao'], ['🎓', '校招通道', 'zhaopin.html?id=guoqi-xiaozhao']
        ],
        ft: [
          ['💼', '求职招聘频道', '国企事业名企全入口', 'zhaopin.html'],
          ['🏢', '国企招聘公告', '最新公告与报名入口', 'zhaopin.html'],
          ['📋', '劳动合同与维权', '签约前必读', 'zhaopin.html?id=laodong-weiquan']
        ],
        kw: ['国企', '招聘', '央企', '城投']
      },
      {
        k: 'shiye', n: '事业单位', ic: '🎓',
        d: '教师·医护·科研',
        i: '杭州事业单位统一公开招聘，教师、医护、科研岗位公告与考试安排。',
        th: [
          ['🎓', '教师招聘', 'zhaopin.html'], ['🏥', '医护招聘', 'zhaopin.html?id=shiye-hushi'],
          ['🔬', '科研岗位', 'zhaopin.html?id=shiye-keyan'], ['📚', '高校教辅', 'zhaopin.html?id=shiye-gaoxiao'],
          ['🏛️', '文化场馆', 'zhaopin.html?id=shiye-wenhua'], ['🌳', '园林环卫', 'zhaopin.html?id=shiye-yuanlin'],
          ['📋', '报名流程', 'zhaopin.html?id=shiye-baoming'], ['📝', '考试大纲', 'zhaopin.html?id=shiye-kaoshi']
        ],
        ft: [
          ['🎓', '事业单位招聘', '统一招聘公告与入口', 'zhaopin.html'],
          ['📚', '教师岗位指南', '报考条件与时间线', 'zhaopin.html?id=shiye-jiaoshi'],
          ['🏥', '医护招聘信息', '杭州医院岗位汇总', 'zhaopin.html?id=shiue-yiyuan']
        ],
        kw: ['事业单位', '教师', '招聘', '考试']
      },
      {
        k: 'mingqi', n: '名企招聘', ic: '🏙️',
        d: '阿里·网易·海康',
        i: '阿里巴巴、网易、海康威视、蚂蚁集团——杭州名企招聘入口与内推渠道。',
        th: [
          ['🏙️', '阿里巴巴', 'zhaopin.html'], ['📧', '网易', 'zhaopin.html?id=mingqi-wangyi'],
          ['📹', '海康威视', 'internet.html'], ['🐜', '蚂蚁集团', 'internet.html'],
          ['💻', '字节跳动', 'internet.html'], ['🛒', '电商零售', 'zhaopin.html?id=mingqi-wangyi'],
          ['🤖', 'AI 人工智能', 'internet.html'], ['🚗', '智能驾驶', 'internet.html']
        ],
        ft: [
          ['💻', '杭州互联网业', '大厂地图与产业分布', 'internet.html'],
          ['🏙️', '名企招聘入口', '官网与内推渠道', 'zhaopin.html'],
          ['📝', '简历与面试技巧', '杭州求职实战', 'zhaopin.html']
        ],
        kw: ['名企', '互联网', '阿里巴巴', '网易', '招聘']
      },
      {
        k: 'jianzhi', n: '兼职实习', ic: '💡',
        d: '学生兼职·实习',
        i: '大学生兼职、暑期实习、转正机会——杭州学生党赚钱与攒经验指南。',
        th: [
          ['💡', '学生兼职', 'zhaopin.html'], ['🎒', '暑期实习', 'zhaopin.html'],
          ['🔄', '转正机会', 'zhaopin.html'], ['🏫', '校园大使', 'zhaopin.html'],
          ['🎨', '设计接单', 'zhaopin.html'], ['✍️', '文案写作', 'zhaopin.html'],
          ['📹', '视频剪辑', 'zhaopin.html'], ['🎤', '主持礼仪', 'zhaopin.html']
        ],
        ft: [
          ['💰', '杭州搞钱副业指南', '众包、探店、摆摊、AI 副业', 'zhaopin.html'],
          ['🐑', '薅羊毛省钱攻略', '消费券奶茶积分学生福利', 'life.html'],
          ['💼', '实习求职入口', '杭州实习岗位', 'zhaopin.html']
        ],
        kw: ['兼职', '实习', '副业', '学生']
      },
      {
        k: 'rencai', n: '人才认定', ic: '🏅',
        d: '高层次人才申请',
        i: '杭州高层次人才分类认定（A-E 类），附条件对照、申请材料与补贴政策。',
        th: [
          ['🏅', 'A 类人才', 'banshi.html'], ['🏆', 'B 类人才', 'zhaopin.html'],
          ['🥇', 'C 类人才', 'zhaopin.html'], ['🎖️', 'D 类人才', 'zhaopin.html'],
          ['📜', 'E 类人才', 'zhaopin.html'], ['💰', '购房补贴', 'banshi.html'],
          ['🎓', '生活补贴', 'banshi.html'], ['🏥', '医疗待遇', 'banshi.html']
        ],
        ft: [
          ['🎓', '人才认定申请', '高层次人才分类认定入口', 'banshi.html'],
          ['🏫', '教育资源与公平', '人才子女入学', 'banshi.html?id=luohu-jiaoyu'],
          ['🏠', '人才购房指南', '杭州购房时机与预算', 'banshi.html']
        ],
        kw: ['人才', '认定', '补贴', '高层次']
      },
      {
        k: 'hulianwang', n: '互联网业', ic: '💻',
        d: '杭州互联网地图',
        i: '未来科技城、滨江高新区、云栖小镇——杭州互联网产业地图与迁徙史。',
        th: [
          ['💻', '未来科技城', 'internet.html'], ['🏙️', '滨江高新区', 'district.html?id=xihu'],
          ['☁️', '云栖小镇', 'zhaopin.html'], ['🎮', '游戏电竞', 'internet.html'],
          ['🤖', 'AI 六小龙', 'internet.html'], ['🛒', '电商直播', 'zhaopin.html?id=mingqi-wangyi'],
          ['🚗', '智能网联车', 'internet.html'], ['💾', '云计算大数据', 'internet.html']
        ],
        ft: [
          ['💻', '杭州互联网业', '大厂聚集地与数字经济高地', 'internet.html'],
          ['🏙️', '从运河记忆到新经济', '杭州的转型跃迁', 'history.html?id=zhejiang-modern'],
          ['🏘️', '新杭州人的城市融入', '身份认同与安居', 'zhaopin.html']
        ],
        kw: ['互联网', '数字经济', '未来科技城', '滨江']
      },
      {
        k: 'jianli', n: '简历面试', ic: '📝',
        d: '模板·技巧',
        i: '杭州求职简历模板、面试常见问题、薪资谈判与谈薪参考。',
        th: [
          ['📝', '简历模板', 'zhaopin.html'], ['🎯', '面试技巧', 'zhaopin.html'],
          ['💰', '薪资谈判', 'zhaopin.html'], ['📊', '职业规划', 'zhaopin.html'],
          ['🔄', '转行指南', 'zhaopin.html'], ['🏠', '租房建议', 'life.html'],
          ['📄', '劳动合同', 'zhaopin.html?id=laodong-weiquan'], ['⚖️', '维权渠道', 'zhaopin.html?id=laodong-weiquan']
        ],
        ft: [
          ['📝', '简历面试实战', '模板与常见问题', 'zhaopin.html'],
          ['🏠', '杭州租房指南', '区域、租金与避坑', 'life.html'],
          ['💰', '杭州生活成本', '消费与价位参考', 'life.html']
        ],
        kw: ['简历', '面试', '薪资', '租房', '职业']
      },
      {
        k: 'laodong', n: '劳动维权', ic: '⚖️',
        d: '劳动合同·仲裁',
        i: '劳动合同签订、加班费、辞退赔偿、劳动仲裁——杭州劳动者维权指引。',
        th: [
          ['📄', '劳动合同', 'zhaopin.html?id=laodong-weiquan'], ['⏰', '加班费', 'zhaopin.html?id=laodong-weiquan'],
          ['💰', '经济补偿', 'zhaopin.html?id=laodong-weiquan'], ['⚖️', '劳动仲裁', 'zhaopin.html?id=laodong-weiquan'],
          ['🏥', '工伤保险', 'banshi.html?id=shebao'], ['🤰', '孕期权益', 'zhaopin.html?id=laodong-weiquan'],
          ['📞', '投诉渠道', 'zhaopin.html?id=laodong-weiquan'], ['🧾', '证据保留', 'zhaopin.html?id=laodong-weiquan']
        ],
        ft: [
          ['⚖️', '劳动维权指引', '仲裁流程与材料', 'zhaopin.html?id=laodong-weiquan'],
          ['📄', '劳动合同要点', '签约前必读条款', 'zhaopin.html?id=laodong-weiquan'],
          ['🏥', '工伤保险指南', '认定与待遇', 'banshi.html?id=shebao']
        ],
        kw: ['劳动', '仲裁', '合同', '工伤', '维权']
      }
    ]
  },
  {
    k: 'news', n: '资讯热点', ic: '📰', c: '#e0584f', home: 'articles.html',
    d: '民生 · 新规 · 政策 · 活动 一手掌握',
    i: '民生政策、消费补贴、活动汇总、限行天气油价——杭州热点一手掌握。',
    kw: ['资讯', '政策', '活动', '民生'],
    subs: [
      {
        k: 'zhengce', n: '民生政策', ic: '📢',
        d: '社保·公积金新政',
        i: '社保、公积金、落户、教育、医疗——杭州民生新政解读与影响分析。',
        th: [
          ['💳', '社保新政', 'life.html'], ['🏦', '公积金调整', 'life.html'],
          ['🏠', '住房政策', 'life.html'], ['🎓', '教育新政', 'life.html'],
          ['🏥', '医保变化', 'banshi.html?id=shebao-laoyang'], ['👴', '养老待遇', 'banshi.html?id=shebao'],
          ['💼', '就业补贴', 'life.html'], ['🧾', '税费调整', 'life.html']
        ],
        ft: [
          ['📰', '资讯热点频道', '全部文章与热点', 'articles.html'],
          ['💳', '社保政策解读', '缴费基数与待遇变化', 'banshi.html?id=shebao'],
          ['🏠', '杭州房产政策', '限购、贷款与以旧换新', 'life.html']
        ],
        kw: ['政策', '社保', '公积金', '房产']
      },
      {
        k: 'butie', n: '消费补贴', ic: '🎫',
        d: '消费券·以旧换新',
        i: '杭州消费券发放时间、领取入口与使用规则，家电以旧换新补贴全流程。',
        th: [
          ['🎫', '消费券', 'life.html'], ['🛋️', '家电换新', 'life.html'],
          ['🚗', '汽车补贴', 'life.html'], ['🏠', '家装补贴', 'life.html'],
          ['🧾', '发票抽奖', 'life.html'], ['🎫', '文旅消费券', 'around.html'],
          ['🍚', '餐饮消费券', 'life.html'], ['📱', '数字人民币', 'internet.html']
        ],
        ft: [
          ['💰', '薅羊毛省钱攻略', '消费券奶茶积分学生福利', 'life.html'],
          ['🎫', '消费券领取指南', '时间、入口与使用规则', 'life.html'],
          ['🛋️', '以旧换新补贴', '家电汽车全流程', 'life.html']
        ],
        kw: ['消费券', '补贴', '以旧换新', '薅羊毛']
      },
      {
        k: 'huodong', n: '活动汇总', ic: '🎉',
        d: '国庆·灯光秀·音乐节',
        i: '国庆活动、灯光秀、音乐节、展览市集——杭州近期活动全整理。',
        th: [
          ['🎆', '国庆活动', 'zhoumo.html'], ['🌃', '灯光秀', 'zhoumo.html'],
          ['🎵', '音乐节', 'zhoumo.html'], ['🖼️', '展览', 'weekend.html?id=zhanluan'],
          ['🎪', '市集', 'weekend.html?id=shiji'], ['🏮', '灯会', 'zhoumo.html'],
          ['🎭', '演出', 'weekend.html?id=yanchang'], ['🌸', '赏花季', 'zhoumo.html']
        ],
        ft: [
          ['🎆', '2026 国庆活动全整理', '烟花灯会音乐节一网打尽', 'zhoumo.html'],
          ['🌃', '钱江新城灯光秀', '时间、机位与交通', 'zhoumo.html'],
          ['🎵', '天目山音乐节', '阵容购票交通指南', 'zhoumo.html']
        ],
        kw: ['国庆', '活动', '音乐节', '灯光秀']
      },
      {
        k: 'xianxing', n: '今日限行', ic: '🚗',
        d: '尾号限行查询',
        i: '杭州工作日高峰时段错峰限行，浙A 与外地号牌规则，含节假日调整提示。',
        th: [
          ['🚗', '今日限行', '#act:xianxing'], ['📅', '限行日历', '#act:xianxing'],
          ['🚙', '外地车牌', '#act:xianxing'], ['🚌', '公交地铁', '#act:xianxing'],
          ['🅿️', '停车攻略', 'banshi.html?id=cheliang-tingche'], ['⚠️', '违章处理', '#act:xianxing'],
          ['🚧', '施工路段', '#act:xianxing'], ['🚕', '打车出行', '#act:xianxing']
        ],
        ft: [
          ['🚗', '尾号限行查询', '今日限行号码与规则', '#act:xianxing'],
          ['🅿️', '杭州停车攻略', '停车现状与省钱办法', 'banshi.html?id=cheliang-tingche'],
          ['🚇', '地铁公交指南', '绿色出行更省心', 'banshi.html?id=jiaotong-ditie']
        ],
        kw: ['限行', '交通', '停车', '违章']
      },
      {
        k: 'tianqi', n: '天气预警', ic: '⛈️',
        d: '实时天气·预报',
        i: '杭州实时天气、7 日预报、暴雨台风预警与穿衣出行建议。',
        th: [
          ['🌤️', '实时天气', '#act:weather'], ['📅', '7 日预报', '#act:weather'],
          ['⛈️', '暴雨预警', '#act:weather'], ['🌀', '台风路径', '#act:weather'],
          ['🌡️', '高温预警', '#act:weather'], ['❄️', '寒潮预警', '#act:weather'],
          ['👕', '穿衣指数', '#act:weather'], ['🌫️', '空气质量', '#act:weather']
        ],
        ft: [
          ['🌤️', '杭州天气查询', '实时天气与预报', '#act:weather'],
          ['⛈️', '梅雨与台风', '杭州的雨季怎么过', 'life.html'],
          ['🌸', '四季赏花日历', '跟着花期游杭州', 'zhoumo.html']
        ],
        kw: ['天气', '梅雨', '台风', '季节']
      },
      {
        k: 'youjia', n: '油价查询', ic: '⛽',
        d: '今日成品油价格',
        i: '今日 92/95/98 号汽油与柴油价格，含调价周期与加油省钱技巧。',
        th: [
          ['⛽', '今日油价', '#act:youjia'], ['📈', '调价窗口', '#act:youjia'],
          ['🚗', '加油省钱', 'traffic.html'], ['⚡', '充电桩', 'traffic.html'],
          ['🚙', '油耗对比', 'traffic.html'], ['🛣️', '高速免费', 'banshi.html?id=cheliang-nianjian'],
          ['🧾', '电子发票', '#act:youjia'], ['💳', '加油优惠', 'traffic.html']
        ],
        ft: [
          ['⛽', '今日油价查询', '92/95/98 号汽油柴油', '#act:youjia'],
          ['🚗', '杭州用车成本', '油耗、停车与保险', 'traffic.html'],
          ['⚡', '新能源充电指南', '充电桩分布与电价', 'traffic.html']
        ],
        kw: ['油价', '加油', '充电', '油耗']
      },
      {
        k: 'wxfeed', n: '公众号精选', ic: '📱',
        d: '每日推送精选',
        i: 'iHangzhou 公众号每日推送——限行、油价、政策解读与生活攻略精选。',
        th: [
          ['📅', '今日杭州', 'traffic.html'], ['🚗', '限行提醒', 'traffic.html'],
          ['⛽', '油价速报', 'traffic.html'], ['💳', '政策解读', 'life.html'],
          ['🎉', '活动推荐', 'zhoumo.html'], ['🍜', '美食攻略', 'food.html'],
          ['🏞️', '周末去哪', 'zhoumo.html'], ['📚', '全部文章', 'articles.html']
        ],
        ft: [
          ['🎆', '国庆去哪玩', '2026 国庆活动全整理', 'zhoumo.html'],
          ['💕', '相亲脱单攻略', '三大相亲角与亲青恋', 'life.html'],
          ['🏃', '免费健身指南', '骑行跑步登山公园', 'life.html']
        ],
        kw: ['攻略', '指南', '生活', '杭州']
      },
      {
        k: 'all', n: '全部文章', ic: '📚',
        d: '2700+ 篇攻略',
        i: '从西湖文化到房产楼市，从南宋风云到现代杭州——2700+ 篇深度攻略全文检索。',
        th: [
          ['📚', '文章首页', 'articles.html'], ['🔍', '全文搜索', 'articles.html'],
          ['🏛️', '文化系列', 'articles.html?cat=06-%E6%9D%AD%E5%B7%9E%E6%96%87%E5%8C%96%E7%B3%BB%E5%88%97'], ['🎎', '民俗系列', 'articles.html?cat=07-%E6%B0%91%E4%BF%97%E6%96%87%E5%8C%96%E7%B3%BB%E5%88%97'],
          ['🏯', '历史系列', 'articles.html?cat=06-%E5%8E%86%E5%8F%B2%E6%96%87%E5%8C%96%E7%B3%BB%E5%88%97'], ['🏙️', '现代杭州', 'articles.html?cat=08-%E7%8E%B0%E4%BB%A3%E6%9D%AD%E5%B7%9E%E7%B3%BB%E5%88%97'],
          ['🏠', '房产楼市', 'articles.html?cat=10-%E6%88%BF%E4%BA%A7%E6%A5%BC%E5%B8%82%E7%B3%BB%E5%88%97'], ['🏃', '运动健身', 'articles.html?cat=13-%E8%BF%90%E5%8A%A8%E5%81%A5%E8%BA%AB%E7%B3%BB%E5%88%97']
        ],
        ft: [
          ['📚', '文章库首页', '分类检索与全文搜索', 'articles.html'],
          ['📖', '杭州文化系列', '548 篇深度长文', 'articles.html?cat=06-%E6%9D%AD%E5%B7%9E%E6%96%87%E5%8C%96%E7%B3%BB%E5%88%97'],
          ['🏙️', '现代杭州系列', '城市变迁与生活', 'articles.html?cat=08-%E7%8E%B0%E4%BB%A3%E6%9D%AD%E5%B7%9E%E7%B3%BB%E5%88%97']
        ],
        kw: ['杭州', '攻略', '系列', '深度']
      }
    ]
  },
  {
    k: 'shopping', n: '逛街好物', ic: '🛍️', c: '#bf6a8a', home: 'street.html',
    d: '商圈 · 特产 · 好物 · 团购 买得明白',
    i: '商圈逛街、杭州特产、本地人精挑细选的好物与团购，买得明白。',
    kw: ['购物', '特产', '商圈', '好物'],
    subs: [
      {
        k: 'shangquan', n: '商圈逛街', ic: '🏬',
        d: '湖滨·武林·万象城',
        i: '湖滨银泰、武林商圈、万象城、天目里——杭州商圈地图与逛街路线。',
        th: [
          ['🏬', '湖滨商圈', 'street.html'], ['🛍️', '武林商圈', 'life.html'],
          ['🏙️', '钱江新城', 'life.html'], ['🏭', '天目里', 'coffee.html?id=tianmuli'],
          ['💻', '滨江商圈', 'district.html?id=xihu'], ['✈️', '萧山商圈', 'district.html?id=xihu'],
          ['🏞️', '余杭商圈', 'district.html?id=xihu'], ['🌊', '下沙商圈', 'life.html']
        ],
        ft: [
          ['🛍️', '逛街购物频道', '商圈与街道故事', 'street.html'],
          ['🏮', '河坊街千年古巷', '一条街读尽市井', 'street.html'],
          ['🏙️', '武林夜市', '夜宵与夜购', 'food.html']
        ],
        kw: ['商圈', '逛街', '购物', '商场']
      },
      {
        k: 'techan', n: '杭州特产', ic: '🎁',
        d: '王星记·知味观',
        i: '王星记折扇、知味观糕点、张小泉剪刀、塘栖枇杷——杭州特产送礼指南。',
        th: [
          ['🪭', '王星记扇子', 'laozihao.html'], ['🥮', '知味观糕点', 'laozihao.html'],
          ['✂️', '张小泉剪刀', 'laozihao.html'], ['🍵', '西湖龙井', 'tea.html'],
          ['🪷', '西湖藕粉', 'food.html'], ['🍶', '塘栖枇杷', 'food.html'],
          ['🧵', '杭绣丝绸', 'food.html'], ['☂️', '西湖绸伞', 'district.html?id=xihu']
        ],
        ft: [
          ['🏮', '百年老店频道', '杭州老字号品牌全集', 'laozihao.html'],
          ['🎁', '特产送礼清单', '本地人认可的手信', 'food.html'],
          ['🍵', '狮峰龙井礼盒', '明前特级怎么挑', 'tea.html']
        ],
        kw: ['特产', '龙井', '丝绸', '老字号']
      },
      {
        k: 'haowu', n: '杭州好物', ic: '🛒',
        d: '本地人精挑细选',
        i: '首页「杭州好物推荐」——王星记折扇、知味观小笼、狮峰龙井、苏绣丝巾等本地好物。',
        th: [
          ['🛒', '首页好物位', '#act:goods'], ['🪭', '王星记折扇', '#act:goods'],
          ['🥟', '知味观小笼', '#act:goods'], ['🍵', '狮峰龙井', '#act:goods'],
          ['🧣', '苏绣丝巾', '#act:goods'], ['📦', '杭州特产京东', '#act:goods'],
          ['🍃', '西湖龙井京东', '#act:goods'], ['🎁', '送礼组合', '#act:goods']
        ],
        ft: [
          ['🛒', '杭州好物推荐', '本地人精挑细选', '#act:goods'],
          ['🏮', '百年老店频道', '非遗手信源头', 'laozihao.html'],
          ['🎁', '特产送礼指南', '不踩坑的手信清单', 'food.html']
        ],
        kw: ['好物', '推荐', '送礼', '手信']
      },
      {
        k: 'laodian', n: '百年老店', ic: '🏮',
        d: '知味观·奎元馆',
        i: '知味观、奎元馆、王润兴、胡庆余堂——百年老字号的必点与避坑。',
        th: [
          ['🥟', '知味观', 'laozihao.html'], ['🍜', '奎元馆', 'laozihao.html?id=kuiyuanguan'],
          ['🐟', '楼外楼', 'laozihao.html?id=louwailou'], ['🍲', '王润兴', 'laozihao.html?id=wang-runxing'],
          ['🌿', '胡庆余堂', 'laozihao.html?id=zhuo-ji-lao-zhao'], ['🪭', '王星记', 'intangible.html?id=wangxingji'],
          ['✂️', '张小泉', 'intangible.html?id=zhangxiaoquan'], ['🏥', '方回春堂', 'laozihao.html?id=zhuo-ji-lao-zhao']
        ],
        ft: [
          ['🏮', '百年老店频道', '杭州老字号全集', 'laozihao.html'],
          ['🌿', '胡庆余堂', '医药龙头的商业帝国', 'laozihao.html?id=zhuo-ji-lao-zhao'],
          ['🏥', '老药堂的消失', '一条街的医药记忆', 'laozihao.html?id=zhuo-ji-lao-zhao']
        ],
        kw: ['老字号', '知味观', '奎元馆', '胡庆余堂']
      },
      {
        k: 'kafei', n: '咖啡地图', ic: '☕',
        d: '景观·独立咖啡',
        i: '西湖边景观咖啡、小众独立咖啡馆、写字楼平价咖啡——杭州咖啡地图。',
        th: [
          ['🌅', '西湖边', 'coffee.html?id=hu-pan'], ['🏙️', '写字楼', 'coffee.html?id=xiezilou'],
          ['🏡', '青芝坞', 'coffee.html?id=qinzhaizi'], ['⛰️', '馒头山', 'xiangxiang.html?id=mantou'],
          ['🍵', '四眼井', 'coffee.html?id=siyanku'], ['🌿', '满觉陇', 'coffee.html?id=manjue-cafe'],
          ['🏭', '天目里', 'coffee.html?id=tianmuli'], ['💡', '东信和创', 'coffee.html?id=dongxin']
        ],
        ft: [
          ['☕', '咖啡馆指南', '杭州咖啡地图', 'coffee.html'],
          ['👨‍👩‍👧', '亲子咖啡馆攻略', '周末溜娃好去处', 'coffee.html?id=hu-pan'],
          ['🫖', '20 个茶空间', '茶馆文化深度体验', 'chaguan.html?id=qianjiang-chaguan']
        ],
        kw: ['咖啡', '咖啡馆', '茶空间']
      },
      {
        k: 'yexiao', n: '夜宵夜市', ic: '🌃',
        d: '河坊街·武林',
        i: '河坊街、武林夜市、滨江星光——杭州夜宵地图与必吃摊位。',
        th: [
          ['🏮', '河坊街', 'night-market.html?id=hefang'], ['🌃', '武林夜市', 'night-market.html?id=wulin'],
          ['✨', '滨江星光', 'night-market.html?id=binjiang'], ['💧', '下沙', 'night-market.html?id=xiasha'],
          ['🏞️', '金沙湖', 'night-market.html?id=jinsha'], ['🌊', '新安江', 'night-market.html?id=xinan'],
          ['🍢', '烧烤', 'night-market.html?id=shaokao'], ['🍜', '夜宵面', 'food.html']
        ],
        ft: [
          ['🌃', '杭州夜宵地图', '从西湖周边到夜市', 'night-market.html?id=yeshi'],
          ['🍜', '街头美食地图', '街巷美食与速食之趣', 'night-market.html?id=night-street-map'],
          ['🌙', '现代夜经济', '从市井夜市到都市夜生活', 'night-market.html?id=yesji-jingji']
        ],
        kw: ['夜市', '夜宵', '小吃', '夜经济']
      },
      {
        k: 'tuangou', n: '餐饮团购', ic: '🍲',
        d: '美团到店',
        i: '杭州餐饮团购、外卖、休闲娱乐——美团到店与外卖入口。',
        th: [
          ['🍲', '餐饮团购', 'https://i.meituan.com/ahangzhou?channel=485720'], ['🍜', '美食外卖', 'https://h5.waimai.meituan.com/waimai/mindex/home?channel=485720'],
          ['💪', '休闲娱乐', 'https://i.meituan.com/ahangzhou?channel=485720'], ['🏨', '酒店民宿', 'https://i.meituan.com/ahangzhou?channel=485720'],
          ['🎫', '景点门票', 'https://m.ctrip.com/xtangram/ticket?pageId=MjI3NTc4&ctm_ref=vactang_page_227578&isHideNavBar=YES&coords=1&allianceid=10511040&sid=330893571&ouid=kfptvxtool'], ['🛍️', '携程旅行', 'https://m.ctrip.com/html5/?allianceid=10511040&sid=330893571&ouid=kfptvxtool'],
          ['🏨', '携程酒店', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'], ['🚄', '火车机票', 'https://m.ctrip.com/html5/?allianceid=10511040&sid=330893571&ouid=kfptvxtool']
        ],
        ft: [
          ['🍲', '美团杭州站', '餐饮团购与休闲娱乐', 'https://i.meituan.com/ahangzhou?channel=485720'],
          ['🍜', '美团外卖', '美食外卖到家', 'https://h5.waimai.meituan.com/waimai/mindex/home?channel=485720'],
          ['🏨', '携程酒店预订', '杭州酒店与民宿', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool']
        ],
        kw: ['团购', '外卖', '美团', '携程']
      },
      {
        k: 'jiudian', n: '酒店预订', ic: '🏨',
        d: '携程酒店',
        i: '杭州酒店、民宿与周边度假——携程与美团入口，含西湖、滨江、未来科技城推荐。',
        th: [
          ['🏨', '西湖周边', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'], ['🏙️', '钱江新城', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'],
          ['💻', '未来科技城', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'], ['✈️', '萧山机场', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'],
          ['🏔️', '莫干山民宿', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'], ['🏝️', '千岛湖度假', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'],
          ['🍵', '龙坞茶村', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'], ['🏮', '古镇客栈', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool']
        ],
        ft: [
          ['🏨', '携程酒店预订', '杭州酒店搜索', 'https://m.ctrip.com/webapp/hotels/hotelsearch/search?allianceid=10511040&sid=330893571&ouid=kfptvxtool'],
          ['🛏️', '西湖精品酒店', '高端住宿体验', 'around.html'],
          ['🏝️', '千岛湖度假', '烟花秀露营交通', 'zhoubian.html?id=qiandao']
        ],
        kw: ['酒店', '民宿', '住宿', '度假']
      }
    ]
  },
  {
    k: 'my', n: '我的社区', ic: '👤', c: '#5b8c5a', home: '',
    d: '收藏 · 积分 · 反馈 你的杭州',
    i: '收藏、积分、反馈与设置——你的 iHangzhou 个人中心。',
    kw: ['我的', '收藏', '签到'],
    subs: [
      {
        k: 'fav', n: '我的收藏', ic: '⭐', d: '收藏的服务', i: '收藏的服务与攻略，随时一键直达。',
        th: [['⭐', '我的收藏', '#act:fav'], ['📌', '最近收藏', '#act:fav'], ['🗂️', '分类管理', '#act:fav'], ['🔖', '标签', '#act:fav'], ['📤', '导出', '#act:fav'], ['🗑️', '清空', '#act:fav'], ['🔍', '搜索收藏', '#act:fav'], ['📊', '使用统计', '#act:fav']],
        ft: [['⭐', '我的收藏', '收藏的服务与攻略', '#act:fav'], ['📜', '浏览历史', '最近看过的内容', '#act:hist'], ['📅', '每日签到', '连续签到领积分', '#act:checkin']],
        kw: ['收藏', '我的']
      },
      {
        k: 'hist', n: '浏览历史', ic: '🕘', d: '最近看过', i: '最近浏览过的服务与文章，方便回看。',
        th: [['🕘', '浏览历史', '#act:hist'], ['📜', '今天看过', '#act:hist'], ['📅', '本周', '#act:hist'], ['🗑️', '清空历史', '#act:hist'], ['🔍', '搜索历史', '#act:hist'], ['⭐', '转为收藏', '#act:fav'], ['📊', '访问统计', '#act:hist'], ['🔒', '隐私说明', '#act:hist']],
        ft: [['🕘', '浏览历史', '最近看过的内容', '#act:hist'], ['⭐', '我的收藏', '收藏的服务', '#act:fav'], ['ℹ️', '关于 iHangzhou', '平台介绍与声明', '#act:about']],
        kw: ['历史', '浏览']
      },
      {
        k: 'checkin', n: '每日签到', ic: '📅', d: '连续签到领积分', i: '每日签到领积分，连续签到有额外奖励。',
        th: [['📅', '每日签到', '#act:checkin'], ['🔥', '连续签到', '#act:checkin'], ['🎁', '积分兑换', '#act:checkin'], ['📊', '积分明细', '#act:checkin'], ['🏆', '排行榜', '#act:checkin'], ['📜', '签到规则', '#act:checkin'], ['⏰', '签到提醒', '#act:checkin'], ['💡', '赚积分', '#act:checkin']],
        ft: [['📅', '每日签到', '连续签到领积分', '#act:checkin'], ['🎁', '积分兑换', '积分能换什么', '#act:checkin'], ['🏆', '用户排行榜', '看看谁最勤', '#act:checkin']],
        kw: ['签到', '积分']
      },
      {
        k: 'feedback', n: '意见反馈', ic: '📨', d: '建议 · 吐槽', i: '告诉我们哪里不好用、缺什么内容，我们认真看每一条。',
        th: [['📨', '意见反馈', '#act:feedback'], ['🐛', '报错', '#act:feedback'], ['💡', '功能建议', '#act:feedback'], ['🔗', '死链反馈', '#act:feedback'], ['📝', '内容纠错', '#act:feedback'], ['🤝', '商家入驻', '#act:feedback'], ['💬', '联系我们', '#act:feedback'], ['📋', '反馈记录', '#act:feedback']],
        ft: [['📨', '意见反馈', '建议与吐槽都欢迎', '#act:about'], ['🤝', '本地商家入驻', '免费入驻与权益', '#act:feedback'], ['ℹ️', '关于 iHangzhou', '平台介绍', '#act:about']],
        kw: ['反馈', '建议', '入驻']
      },
      {
        k: 'fontsize', n: '字体大小', ic: '🔤', d: '大字模式调节', i: '调节字体大小，开启大字模式让长辈看得更清楚。',
        th: [['🔤', '字体大小', '#act:fontsize'], ['👵', '大字模式', '#act:fontsize'], ['🌙', '暗色模式', '#act:darkmode'], ['📍', '切换区县', '#act:settings'], ['⚙️', '更多设置', '#act:settings'], ['🔄', '恢复默认', '#act:settings'], ['💾', '本地存储', '#act:settings'], ['ℹ️', '使用说明', '#act:fav']],
        ft: [['🔤', '字体大小', '大字模式调节', '#act:fontsize'], ['🌙', '暗色模式', '夜间护眼', '#act:darkmode'], ['⚙️', '设置面板', '主题与城市', '#act:settings']],
        kw: ['字体', '大字', '设置']
      },
      {
        k: 'share', n: '分享给朋友', ic: '📤', d: '复制链接 + 二维码', i: '把 iHangzhou 推荐给朋友，复制链接或扫码关注公众号。',
        th: [['📤', '分享给朋友', '#act:share'], ['🔗', '复制链接', '#act:share'], ['📱', '公众号二维码', '#act:wechat'], ['🖼️', '保存二维码', '#act:share'], ['💬', '微信分享', '#act:share'], ['📮', '邮件分享', '#act:share'], ['📋', '复制文案', '#act:share'], ['ℹ️', '分享说明', '#act:about']],
        ft: [['📤', '分享给朋友', '复制链接 + 二维码', '#act:share'], ['📱', '关注公众号', '每天推送限行油价政策', '#act:wechat'], ['ℹ️', '关于 iHangzhou', '平台介绍', '#act:about']],
        kw: ['分享', '公众号', '二维码']
      },
      {
        k: 'about', n: '关于我们', ic: 'ℹ️', d: '平台介绍', i: 'iHangzhou 是杭州人的数字生活工具箱，公益导航平台，不存储用户数据。',
        th: [['ℹ️', '关于我们', '#act:about'], ['📜', '平台声明', '#act:about'], ['🔒', '隐私政策', '#act:about'], ['🤝', '商家入驻', '#act:feedback'], ['📮', '联系方式', '#act:feedback'], ['📊', '数据说明', '#act:settings'], ['🔗', '友情链接', '#act:about'], ['❤️', '致谢', '#act:about']],
        ft: [['ℹ️', '关于 iHangzhou', '平台介绍与功能清单', '#act:about'], ['🔒', '隐私政策', '不存储用户数据', '#act:about'], ['🤝', '本地商家入驻', '免费入驻', '#act:feedback']],
        kw: ['关于', '声明', '隐私']
      },
      {
        k: 'settings', n: '设置', ic: '⚙️', d: '主题 · 城市', i: '暗色模式、大字模式、当前区县——设置自动保存到本地。',
        th: [['⚙️', '设置面板', '#act:settings'], ['🌙', '暗色模式', '#act:darkmode'], ['🔤', '大字模式', '#act:fontsize'], ['📍', '当前城市', '#act:settings'], ['🏙️', '选择区县', '#act:settings'], ['🔄', '清除缓存', '#act:settings'], ['💾', '本地数据', '#act:settings'], ['ℹ️', '关于', '#act:about']],
        ft: [['⚙️', '设置面板', '主题、城市与字号', '#act:settings'], ['🌙', '暗色模式', '夜间护眼', '#act:darkmode'], ['📍', '切换区县', '限行与本地信息随之变化', '#act:settings']],
        kw: ['设置', '主题', '城市']
      }
    ]
  }
, {
    k: 'life', n: '杭州生活', ic: '🏠', c: '#0ea5e9', home: 'life.html',
    d: '消费·租房·房产·商圈·缴费 生活一站通',
    i: '杭州生活实用信息：消费券、租房、房产、商圈购物、生活缴费、家装、相亲交友、运动健身。',
    kw: ['生活', '消费', '租房', '房产', '商圈'],
    subs: [
      {
        k: 'xiaofei', n: '消费优惠', ic: '💰', d: '消费券·薅羊毛·以旧换新', i: '杭州定期发放消费券覆盖文旅商超餐饮，以旧换新补贴家电汽车。',
        th: [['🎫', '消费券', 'life.html?id=xiaofei'], ['✂️', '薅羊毛', 'life.html?id=xiaofei'], ['🔄', '以旧换新', 'life.html?id=xiaofei'], ['💴', '数字人民币', 'life.html?id=xiaofei'], ['💳', '支付宝', 'life.html?id=xiaofei'], ['🎟️', '优惠券', 'life.html?id=xiaofei'], ['🎁', '福利活动', 'life.html?id=xiaofei'], ['💳', '信用卡活动', 'life.html?id=xiaofei']],
        ft: [['🎫', '杭州消费券领取', '文旅/商超/支付宝搜索「杭州消费券」', 'life.html?id=xiaofei'], ['🔁', '以旧换新补贴', '家电/汽车置换最高补 15%', 'life.html?id=xiaofei']],
        kw: ['消费券', '优惠', '以旧换新', '数字人民币']
      },
      {
        k: 'zufang', n: '租房攻略', ic: '🏠', d: '租金·合同·权益', i: '各区租金对比、租房合同注意事项、租房公积金提取。',
        th: [['🏘️', '各区租金', 'life.html?id=zufang'], ['📝', '租房合同', 'life.html?id=zufang'], ['💰', '公积金提取', 'life.html?id=zufang'], ['👥', '合租', 'life.html?id=zufang'], ['🏠', '人才公寓', 'life.html?id=zufang'], ['⚠️', '租房避坑', 'life.html?id=zufang'], ['📊', '租金走势', 'life.html?id=zufang'], ['🔒', '权益保障', 'life.html?id=zufang']],
        ft: [['🏠', '杭州各区租金对比', '链家租金地图实时查询', 'life.html?id=zufang'], ['💰', '公积金租房提取', '每月最高 1500 元', 'life.html?id=zufang']],
        kw: ['租房', '租金', '合同', '公积金']
      },
      {
        k: 'fangchan', n: '房产楼市', ic: '🏙️', d: '买房·卖房·过户', i: '新房摇号、二手房交易、房贷计算、税费明细。',
        th: [['🏗️', '新房', 'life.html?id=fangchan'], ['🏠', '二手房', 'life.html?id=fangchan'], ['🧮', '房贷计算', 'life.html?id=fangchan'], ['💰', '税费', 'life.html?id=fangchan'], ['🔑', '过户', 'life.html?id=fangchan'], ['📈', '房价走势', 'life.html?id=fangchan'], ['📜', '满二唯一', 'life.html?id=fangchan'], ['🚫', '限购政策', 'life.html?id=fangchan']],
        ft: [['🏙️', '杭州新房楼盘', '在售与摇号查询', 'life.html?id=fangchan'], ['📊', '房贷计算器', '月供与利息试算', 'life.html?id=fangchan']],
        kw: ['房产', '买房', '房贷', '房价']
      },
      {
        k: 'shangquan', n: '商圈购物', ic: '🛒', d: '武林·钱江新城·下沙', i: '杭州主要商圈导览、购物优惠、停车信息。',
        th: [['🏛️', '武林商圈', 'life.html?id=shangquan'], ['🏙️', '钱江新城', 'life.html?id=shangquan'], ['🏬', '下沙商圈', 'life.html?id=shangquan'], ['🛍️', '购物中心', 'life.html?id=shangquan'], ['🍜', '美食街区', 'life.html?id=shangquan'], ['🅿️', '停车信息', 'life.html?id=shangquan'], ['🎬', '电影院', 'life.html?id=shangquan'], ['🎮', '娱乐休闲', 'life.html?id=shangquan']],
        ft: [['🛒', '武林商圈', '杭州大厦/银泰/国大', 'life.html?id=shangquan'], ['🏙️', '钱江新城', '万象城/来福士/高德置地', 'life.html?id=shangquan']],
        kw: ['商圈', '购物', '武林', '钱江']
      },
      {
        k: 'jiazhuang', n: '家装建材', ic: '🔨', d: '装修·家具·家电', i: '装修报价、家具家电购买、以旧换新。',
        th: [['🔨', '装修', 'life.html?id=jiazhuang'], ['🛋️', '家具', 'life.html?id=jiazhuang'], ['📺', '家电', 'life.html?id=jiazhuang'], ['💡', '灯具', 'life.html?id=jiazhuang'], ['🧱', '建材市场', 'life.html?id=jiazhuang'], ['📐', '设计公司', 'life.html?id=jiazhuang'], ['💰', '装修贷款', 'life.html?id=jiazhuang'], ['📓', '装修日记', 'life.html?id=jiazhuang']],
        ft: [['🔨', '装修报价', '土巴兔/齐家网对比', 'life.html?id=jiazhuang'], ['🛋️', '宜家家居', '杭宜家居(萧山)', 'life.html?id=jiazhuang']],
        kw: ['装修', '家装', '家具', '家电']
      },
      {
        k: 'shenghuo', n: '生活缴费', ic: '💡', d: '水电气暖', i: '水电气暖物业费缴纳，浙里办可查历史账单。',
        th: [['⚡', '电费', 'life.html?id=shenghuo'], ['💧', '水费', 'life.html?id=shenghuo'], ['🔥', '燃气', 'life.html?id=shenghuo'], ['🔥', '供暖', 'life.html?id=shenghuo'], ['🏠', '物业费', 'life.html?id=shenghuo'], ['📱', '手机充值', 'life.html?id=shenghuo'], ['⛽', '加油充电', 'life.html?id=shenghuo'], ['📊', '账单查询', 'life.html?id=shenghuo']],
        ft: [['⚡', '电费缴纳', '国家电网杭州客服', 'life.html?id=shenghuo'], ['💧', '水费缴纳', '杭州水务在线缴费', 'life.html?id=shenghuo']],
        kw: ['缴费', '电费', '水费', '燃气']
      },
      {
        k: 'xiangqin', n: '相亲交友', ic: '💘', d: '万松书院·本地圈子', i: '万松书院相亲角、本地豆瓣群、官方公益相亲活动。',
        th: [['🌲', '万松书院', 'life.html?id=xiangqin'], ['👥', '本地圈子', 'life.html?id=xiangqin'], ['💡', '相亲技巧', 'life.html?id=xiangqin'], ['🎯', '匹配活动', 'life.html?id=xiangqin'], ['👔', '形象改造', 'life.html?id=xiangqin'], ['💌', '情书指南', 'life.html?id=xiangqin'], ['🎉', '同城活动', 'life.html?id=xiangqin'], ['📞', '红娘热线', 'life.html?id=xiangqin']],
        ft: [['🌲', '万松书院相亲角', '每周六上午父母把关', 'life.html?id=xiangqin'], ['🎉', '同城活动', '豆瓣同城/贴吧聚会', 'life.html?id=xiangqin']],
        kw: ['相亲', '交友', '万松书院']
      },
      {
        k: 'jianshen', n: '运动健身', ic: '💪', d: '场馆·户外·赛事', i: '健身卡、户外运动、杭州马拉松、亚运场馆预约。',
        th: [['💪', '健身房', 'life.html?id=jianshen'], ['🏃', '杭州马拉松', 'life.html?id=jianshen'], ['🏸', '球类场馆', 'life.html?id=jianshen'], ['🏊', '游泳', 'life.html?id=jianshen'], ['🚴', '户外运动', 'life.html?id=jianshen'], ['🏟️', '亚运场馆', 'life.html?id=jianshen'], ['🥋', '武术', 'life.html?id=jianshen'], ['🧘', '瑜伽', 'life.html?id=jianshen']],
        ft: [['💪', '乐刻运动', '99 元/月全城通用', 'life.html?id=jianshen'], ['🏃', '杭州马拉松', '每年 11 月报名', 'life.html?id=jianshen']],
        kw: ['健身', '运动', '马拉松', '场馆']
      }
    ]
  }
];
