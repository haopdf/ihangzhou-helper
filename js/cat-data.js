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
          ['🏘️', '乌镇', 'articles.html?q=%E4%B9%8C%E9%95%87'], ['🏔️', '莫干山', 'articles.html?q=%E8%8E%AB%E5%B9%B2%E5%B1%B1'],
          ['🏝️', '千岛湖', 'articles.html?q=%E5%8D%83%E5%B2%9B%E6%B9%96'], ['🎋', '安吉', 'articles.html?q=%E5%AE%89%E5%90%89'],
          ['🌲', '天目山', 'articles.html?q=%E5%A4%A9%E7%9B%AE%E5%B1%B1'], ['🏞️', '桐庐', 'articles.html?q=%E6%A1%90%E5%BA%90'],
          ['🌊', '淳安', 'articles.html?q=%E6%B7%B3%E5%AE%89'], ['🍑', '建德', 'articles.html?q=%E5%BB%BA%E5%BE%B7']
        ],
        ft: [
          ['🚙', '周边游频道', '杭州出发 1-3 小时圈全部好去处', 'around.html'],
          ['🏝️', '千岛湖国庆攻略', '烟花秀、露营与交通指南', 'articles.html?q=%E5%8D%83%E5%B2%9B%E6%B9%96'],
          ['🎋', '安吉竹海民宿', '竹林深处怎么选怎么订', 'articles.html?q=%E5%AE%89%E5%90%89']
        ],
        kw: ['周边游', '千岛湖', '莫干山', '乌镇', '安吉']
      },
      {
        k: 'zhoumo', n: '周末去哪', ic: '🗓️',
        d: '亲子·展览·演出 杭州周末不无聊',
        i: '周末带娃、看展、听演出？亲子好去处、近期展览与演出日历实时更新。',
        th: [
          ['👨‍👩‍👧', '亲子', 'articles.html?q=%E4%BA%B2%E5%AD%90'], ['🖼️', '展览', 'articles.html?q=%E5%B1%95%E8%A7%88'],
          ['🎵', '演出', 'articles.html?q=%E6%BC%94%E5%87%BA'], ['🎪', '市集', 'articles.html?q=%E5%B8%82%E9%9B%86'],
          ['🏕️', '露营', 'articles.html?q=%E9%9C%B2%E8%90%A5'], ['🚴', '骑行', 'articles.html?q=%E9%AA%91%E8%A1%8C'],
          ['🥾', '徒步', 'articles.html?q=%E5%BE%92%E6%AD%A5'], ['🌸', '赏花', 'articles.html?q=%E8%B5%8F%E8%8A%B1']
        ],
        ft: [
          ['🗓️', '周末去哪频道', '亲子、免费景点、市集与短途自驾', 'weekend.html'],
          ['🎆', '国庆免费玩 10 个地方', '不花钱也能玩好的杭州清单', 'articles.html?q=%E5%9B%BD%E5%BA%86%E5%85%8D%E8%B4%B9'],
          ['🎵', '天目山音乐节', '时间阵容购票交通全指南', 'articles.html?q=%E9%9F%B3%E4%B9%90%E8%8A%82']
        ],
        kw: ['周末', '亲子', '展览', '市集', '免费']
      },
      {
        k: 'xiangxiang', n: '街巷漫步', ic: '🛤️',
        d: '小河直街·大兜路·馒头山 老城慢游',
        i: '避开人潮，钻进小河直街、大兜路、馒头山这些有故事的街巷，感受老杭州的烟火气。',
        th: [
          ['🏠', '小河直街', 'street.html'], ['🛤️', '大兜路', 'articles.html?q=%E5%A4%A7%E5%85%9C%E8%B7%AF'],
          ['⛰️', '馒头山', 'articles.html?q=%E9%A6%92%E5%A4%B4%E5%B1%B1'], ['🏮', '河坊街', 'articles.html?q=%E6%B2%B3%E5%9D%8A%E8%A1%97'],
          ['🌳', '五柳巷', 'history.html'], ['🏯', '南宋御街', 'history.html'],
          ['🌅', '北山街', 'articles.html?q=%E5%8C%97%E5%B1%B1%E8%A1%97'], ['🌊', '南山路', 'articles.html?q=%E5%8D%97%E5%B1%B1%E8%B7%AF']
        ],
        ft: [
          ['🛍️', '逛街购物频道', '商圈、街道与城市记忆', 'street.html'],
          ['🏮', '河坊街千年古巷', '一条街读尽杭州市井', 'articles.html?q=%E6%B2%B3%E5%9D%8A%E8%A1%97'],
          ['🚢', '运河边的老街', '从开通到复兴的 2000 年', 'articles.html?q=%E8%BF%90%E6%B2%B3']
        ],
        kw: ['街巷', '河坊街', '运河', '老街', '街道']
      },
      {
        k: 'luxian', n: '路线攻略', ic: '🧭',
        d: '一日游·两日游·自驾 经典路线',
        i: '西湖一日游、环湖骑行、杭黄高铁沿线、千岛湖自驾——经典路线一次收藏。',
        th: [
          ['📅', '一日游', 'articles.html?q=%E4%B8%80%E6%97%A5%E6%B8%B8'], ['📆', '两日游', 'articles.html?q=%E4%B8%A4%E6%97%A5%E6%B8%B8'],
          ['🚗', '自驾', 'articles.html?q=%E8%87%AA%E9%A9%BE'], ['🚴', '环湖骑行', 'articles.html?q=%E9%AA%91%E8%A1%8C'],
          ['🚄', '高铁沿线', 'articles.html?q=%E9%AB%98%E9%93%81'], ['🥾', '徒步线', 'articles.html?q=%E5%BE%92%E6%AD%A5'],
          ['📷', '摄影机位', 'articles.html?q=%E6%8B%8D%E6%90%9C'], ['🗺️', '全景地图', 'travel.html']
        ],
        ft: [
          ['🧭', '旅游出行频道', '景点、周边、周末全部入口', 'travel.html'],
          ['🚴', '环西湖骑行线', '十景怎么串最顺', 'articles.html?q=%E9%AA%91%E8%A1%8C'],
          ['🚄', '杭黄高铁沿线', '千岛湖、黄山一线玩', 'articles.html?q=%E9%AB%98%E9%93%81']
        ],
        kw: ['路线', '一日游', '攻略', '自驾']
      },
      {
        k: 'guanchao', n: '钱塘江观潮', ic: '🌊',
        d: '潮时预报与最佳观赏点',
        i: '农历八月十八前后钱塘江大潮最盛。盐官、美女坝、城市阳台观赏点与时间预报一站查。',
        th: [
          ['🌊', '今日潮时', '#act:tide'], ['📍', '海宁盐官', 'articles.html?q=%E7%9B%90%E5%AE%98'],
          ['🔁', '老盐仓', 'articles.html?q=%E7%9B%90%E5%AE%98'], ['👩', '萧山美女坝', 'articles.html?q=%E7%BE%8E%E5%A5%B3%E5%9D%9D'],
          ['💥', '下沙七格', 'articles.html?q=%E8%A7%82%E6%BD%AE'], ['🏙️', '城市阳台', 'articles.html?q=%E5%9F%8E%E5%B8%82%E9%98%B3%E5%8F%B0'],
          ['📜', '观潮传统', 'articles.html?q=%E8%A7%82%E6%BD%AE'], ['⚠️', '安全提示', 'articles.html?q=%E8%A7%82%E6%BD%AE']
        ],
        ft: [
          ['🌊', '钱塘江潮汐预报', '点此查询各观潮点逐日潮时', '#act:tide'],
          ['🎋', '六和听涛', '钱塘江潮观潮胜地详解', 'articles.html?q=%E5%85%AD%E5%92%8C%E5%90%AC%E6%B6%9C'],
          ['📜', '观潮两千年', '始于汉魏、盛于唐宋的习俗', 'articles.html?q=%E8%A7%82%E6%BD%AE']
        ],
        kw: ['观潮', '钱塘江', '潮汐', '六和听涛']
      },
      {
        k: 'xihu', n: '西湖十景', ic: '⛲',
        d: '苏堤春晓·断桥残雪 十景全解',
        i: '苏堤春晓、断桥残雪、三潭印月——西湖十景怎么玩最顺，附最佳时间与机位。',
        th: [
          ['🌿', '苏堤春晓', 'scenic.html?id=xihu-sudi'], ['🌉', '断桥残雪', 'scenic.html?id=xihu-duanqiao'],
          ['🌙', '三潭印月', 'articles.html?q=%E4%B8%89%E6%BD%AD%E5%8D%B0%E6%9C%88'], ['🪷', '曲院风荷', 'articles.html?q=%E6%9B%B2%E9%99%A2%E9%A3%8E%E8%8D%B7'],
          ['🗼', '雷峰夕照', 'scenic.html?id=leifengta'], ['🌕', '平湖秋月', 'articles.html?q=%E5%B9%B3%E6%B9%96%E7%A7%8B%E6%9C%88'],
          ['🔔', '南屏晚钟', 'articles.html?q=%E5%8D%97%E5%B1%8F%E6%99%9A%E9%92%9F'], ['🌾', '柳浪闻莺', 'articles.html?q=%E6%9F%B3%E6%B5%AA%E9%97%BB%E8%8E%BA']
        ],
        ft: [
          ['⛲', '西湖十景全攻略', '十景串联路线与最佳时段', 'place.html?id=westlake'],
          ['🪷', '花港观鱼', '鱼游花间的闲情雅致', 'articles.html?q=%E8%8A%B1%E6%B8%AF%E8%A7%82%E9%B1%BC'],
          ['🌉', '断桥残雪', '白堤起点与最佳机位', 'scenic.html?id=xihu-duanqiao']
        ],
        kw: ['西湖十景', '苏堤', '断桥', '三潭印月']
      },
      {
        k: 'guzhen', n: '古镇古村', ic: '🏚️',
        d: '塘栖·龙门·深澳 江南古韵',
        i: '塘栖古镇、龙门古镇、深澳古村，离杭州不过一小时，适合半日慢游的江南古韵。',
        th: [
          ['🏮', '塘栖', 'articles.html?q=%E5%A1%BE%E6%97%8C'], ['🏯', '龙门', 'articles.html?q=%E9%BE%99%E9%97%A8'],
          ['🏘️', '深澳', 'articles.html?q=%E6%B7%B1%E6%BE%B3'], ['🌳', '新叶', 'articles.html?q=%E6%96%B0%E5%8F%B6'],
          ['🍵', '芹川', 'articles.html?q=%E8%8A%B9%E5%B7%9D'], ['🍁', '指南村', 'articles.html?q=%E6%8C%87%E5%8D%97%E6%9D%91'],
          ['🏞️', '株川', 'articles.html?q=%E6%A0%AA%E5%B7%9D'], ['🌾', '下姜', 'articles.html?q=%E4%B8%8B%E5%A7%9C']
        ],
        ft: [
          ['🏚️', '古镇古村合集', '杭州周边一小时车程古韵地图', 'articles.html?q=%E5%8F%A4%E9%95%87'],
          ['🏮', '塘栖古镇', '运河第一庄的桥与枇杷', 'articles.html?q=%E5%A1%BE%E6%97%8C'],
          ['🏯', '龙门古镇', '孙权故里的迷宫街巷', 'articles.html?q=%E9%BE%99%E9%97%A8']
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
          ['🐟', '西湖醋鱼', 'articles.html?q=%E8%A5%BF%E6%B9%96%E9%86%8B%E9%B1%BC'], ['🦐', '龙井虾仁', 'articles.html?q=%E9%BE%99%E4%BA%95%E8%99%BE%E4%BB%81'],
          ['🥩', '东坡肉', 'articles.html?q=%E4%B8%9C%E5%9D%A1%E8%82%89'], ['🍲', '宋嫂鱼羹', 'articles.html?q=%E5%AE%8B%E5%AB%82%E9%B1%BC%E7%BE%B9'],
          ['🐔', '叫花鸡', 'articles.html?q=%E5%8F%AB%E8%8A%B1%E9%B8%A1'], ['🥟', '干炸响铃', 'articles.html?q=%E5%B9%B2%E7%82%B8%E5%93%8D%E9%93%83'],
          ['🍵', '杭三鲜', 'articles.html?q=%E6%9D%AD%E4%B8%89%E9%B2%9C'], ['🍯', '蜜汁火方', 'articles.html?q=%E8%9C%9C%E6%B1%81%E7%81%AB%E6%96%B9']
        ],
        ft: [
          ['🥢', '杭州美食频道', '杭帮菜、小吃、甜品全入口', 'food.html'],
          ['🐟', '西湖醋鱼与东坡肉', '两道招牌菜的文化密码', 'articles.html?q=%E8%A5%BF%E6%B9%96%E9%86%8B%E9%B1%BC'],
          ['🍜', '片儿川', '杭州小吃的清新美学', 'articles.html?q=%E7%89%87%E5%84%BF%E5%B7%9D']
        ],
        kw: ['杭帮菜', '西湖醋鱼', '东坡肉', '美食']
      },
      {
        k: 'coffee', n: '咖啡', ic: '☕',
        d: '西湖边·写字楼·独立咖啡',
        i: '西湖边景观咖啡、写字楼平价咖啡、小众独立咖啡馆，一份杭州咖啡地图。',
        th: [
          ['🌅', '西湖边', 'coffee.html'], ['🏙️', '写字楼', 'articles.html?q=%E5%86%99%E5%AD%97%E6%A5%BC'],
          ['🏡', '青芝坞', 'articles.html?q=%E9%9D%92%E8%8A%9D%E5%9D%9E'], ['⛰️', '馒头山', 'articles.html?q=%E9%A6%92%E5%A4%B4%E5%B1%B1'],
          ['🍵', '四眼井', 'articles.html?q=%E5%9B%9B%E7%9C%BC%E4%BA%95'], ['🌿', '满觉陇', 'articles.html?q=%E6%BB%A1%E8%A7%89%E9%99%87'],
          ['🏭', '天目里', 'articles.html?q=%E5%A4%A9%E7%9B%AE%E9%87%8C'], ['💡', '东信和创', 'articles.html?q=%E4%B8%9C%E4%BF%A1%E5%92%8C%E5%88%9B']
        ],
        ft: [
          ['☕', '咖啡馆指南', '景观、平价与独立咖啡地图', 'coffee.html'],
          ['👨‍👩‍👧', '亲子咖啡馆攻略', '周末溜娃好去处', 'articles.html?q=%E5%92%AA%E5%92%95%E5%92%95'],
          ['🫖', '20 个茶空间', '茶馆文化深度体验攻略', 'articles.html?q=%E8%8C%B6%E9%A6%86']
        ],
        kw: ['咖啡', '咖啡馆', '茶空间']
      },
      {
        k: 'laozihao', n: '老字号', ic: '🏮',
        d: '知味观·奎元馆 百年老店',
        i: '知味观、奎元馆、王润兴——这些百年老字号的必点与避坑指南。',
        th: [
          ['🥟', '知味观', 'laozihao.html'], ['🍜', '奎元馆', 'articles.html?q=%E5%A5%8E%E5%85%83%E9%A6%86'],
          ['🐟', '楼外楼', 'articles.html?q=%E6%A5%BC%E5%A4%96%E6%A5%BC'], ['🍲', '王润兴', 'articles.html?q=%E7%8E%8B%E6%B6%A6%E5%85%B4'],
          ['🌿', '胡庆余堂', 'articles.html?q=%E8%83%A1%E5%BA%86%E4%BD%99%E5%A0%82'], ['🪭', '王星记', 'articles.html?q=%E7%8E%8B%E6%98%9F%E8%AE%B0'],
          ['✂️', '张小泉', 'articles.html?q=%E5%BC%A0%E5%B0%8F%E6%B3%89'], ['🏥', '方回春堂', 'articles.html?q=%E6%96%B9%E5%9B%9E%E6%98%A5%E5%A0%82']
        ],
        ft: [
          ['🏮', '百年老店频道', '杭州老字号品牌全集', 'laozihao.html'],
          ['🌿', '胡庆余堂', '医药龙头的商业帝国', 'articles.html?q=%E8%83%A1%E5%BA%86%E4%BD%99%E5%A0%82'],
          ['🏥', '老药堂的消失', '一条街的医药记忆', 'articles.html?q=%E8%80%81%E8%8D%AF%E5%A0%82']
        ],
        kw: ['老字号', '知味观', '胡庆余堂', '张小泉']
      },
      {
        k: 'yeshi', n: '夜市', ic: '🌃',
        d: '河坊街·武林·滨江 夜宵地图',
        i: '河坊街、武林夜市、滨江星光夜市，杭州夜宵地图与必吃摊位。',
        th: [
          ['🏮', '河坊街', 'articles.html?q=%E5%A4%9C%E5%B8%82'], ['🌃', '武林夜市', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['✨', '滨江星光', 'articles.html?q=%E5%A4%9C%E5%B8%82'], ['💧', '下沙', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['🏞️', '金沙湖', 'articles.html?q=%E5%A4%9C%E5%B8%82'], ['🌊', '新安江', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['🏝️', '千岛湖', 'articles.html?q=%E5%A4%9C%E5%B8%82'], ['🍢', '烧烤', 'articles.html?q=%E7%83%A7%E7%83%A7']
        ],
        ft: [
          ['🌃', '杭州夜宵地图', '从西湖周边到夜市的三角地带', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['🍜', '街头美食地图', '街巷美食与速食之趣', 'articles.html?q=%E8%A1%97%E5%A4%B4%E7%BE%8E%E9%A3%9F'],
          ['🌙', '现代夜经济', '从市井夜市到都市夜生活', 'articles.html?q=%E5%A4%9C%E7%BB%8F%E6%B5%8E']
        ],
        kw: ['夜市', '夜宵', '小吃', '街头美食']
      },
      {
        k: 'zaocan', n: '早餐', ic: '🥟',
        d: '拌面·生煎·小笼 唤醒杭州',
        i: '一碗拌面、一笼小笼、一份生煎，杭州人的早餐江湖与老店清单。',
        th: [
          ['🍜', '拌面', 'articles.html?q=%E6%8B%8C%E9%9D%A2'], ['🥟', '生煎', 'articles.html?q=%E7%94%9F%E7%85%8E'],
          ['🍲', '小笼', 'articles.html?q=%E5%B0%8F%E7%AC%BC'], ['🥣', '馄饨', 'articles.html?q=%E9%A6%84%E9%A5%A8'],
          ['🥮', '葱包桧', 'articles.html?q=%E8%91%B1%E5%8C%85%E6%A1%A7'], ['🍩', '油冬儿', 'articles.html?q=%E6%B2%B9%E5%86%AC%E5%84%BF'],
          ['🍜', '片儿川', 'articles.html?q=%E7%89%87%E5%84%BF%E5%B7%9D'], ['🥛', '豆浆', 'articles.html?q=%E8%B1%86%E6%B5%86']
        ],
        ft: [
          ['🥟', '杭州早餐江湖', '老店清单与营业时间', 'articles.html?q=%E6%97%A9%E9%A4%90'],
          ['🍜', '片儿川', '一碗面的清新美学', 'articles.html?q=%E7%89%87%E5%84%BF%E5%B7%9D'],
          ['🍲', '小笼包地图', '杭州人排队的老店', 'articles.html?q=%E5%B0%8F%E7%AC%BC%E5%8C%85']
        ],
        kw: ['早餐', '片儿川', '小笼', '拌面']
      },
      {
        k: 'tianpin', n: '甜品', ic: '🍰',
        d: '定胜糕·条头糕 江南甜糯',
        i: '定胜糕、条头糕、桂花糖藕，杭州传统甜糯点心去哪买最正宗。',
        th: [
          ['🍰', '定胜糕', 'articles.html?q=%E7%94%9C%E5%93%81'], ['🍡', '条头糕', 'articles.html?q=%E7%94%9C%E5%93%81'],
          ['🪷', '桂花糖藕', 'articles.html?q=%E6%A1%82%E8%8A%B1'], ['🍵', '龙井酥', 'articles.html?q=%E9%BE%99%E4%BA%95'],
          ['🥣', '藕粉', 'articles.html?q=%E8%97%95%E7%B2%89'], ['🍡', '麻团', 'articles.html?q=%E9%BA%BB%E5%9B%A2'],
          ['🌿', '青团', 'articles.html?q=%E9%9D%92%E5%9B%A2'], ['🍘', '桂花糕', 'articles.html?q=%E6%A1%82%E8%8A%B1']
        ],
        ft: [
          ['🍰', '江南甜糯点心', '传统糕点去哪买最正宗', 'articles.html?q=%E7%94%9C%E5%93%81'],
          ['🌿', '中秋与桂花', '赏月和桂花的故事', 'articles.html?q=%E4%B8%AD%E7%A7%8B'],
          ['🍵', '龙井茶食', '茶点搭配指南', 'articles.html?q=%E9%BE%99%E4%BA%95']
        ],
        kw: ['甜品', '糕点', '桂花', '定胜糕']
      },
      {
        k: 'longjing', n: '龙井茶', ic: '🍵',
        d: '狮峰·龙坞 买茶不踩坑',
        i: '狮峰龙井、龙坞茶村，明前雨前怎么分、去哪买不被坑。',
        th: [
          ['⛰️', '狮峰', 'articles.html?q=%E9%BE%99%E4%BA%95'], ['🏘️', '龙坞', 'articles.html?q=%E9%BE%99%E4%BA%95'],
          ['🍃', '梅家坞', 'articles.html?q=%E6%A2%85%E5%AE%B6%E5%9D%9E'], ['🌳', '翁家山', 'articles.html?q=%E9%BE%99%E4%BA%95'],
          ['🌿', '满觉陇', 'articles.html?q=%E6%BA%A1%E8%A7%89%E5%9D%97'], ['🎋', '云栖', 'articles.html?q=%E4%BA%91%E6%A0%96'],
          ['🍵', '径山', 'articles.html?q=%E5%BE%84%E5%B1%B1'], ['🏝️', '千岛湖', 'articles.html?q=%E5%8D%83%E5%B2%9B%E6%B9%96']
        ],
        ft: [
          ['🍵', '龙井茶文化', '前世今生与推荐泡茶体验', 'articles.html?q=%E9%BE%99%E4%BA%95%E8%8C%B6'],
          ['🍃', '龙井茶园', '千年传统与现代技艺融合', 'articles.html?q=%E9%BE%99%E4%BA%95%E8%8C%B6%E5%9B%AD'],
          ['📜', '浙江传统茶文化', '茶文化的历史内涵与传承', 'articles.html?q=%E8%8C%B6%E6%96%87%E5%8C%96']
        ],
        kw: ['龙井', '茶文化', '茶园', '径山']
      },
      {
        k: 'chaguan', n: '茶馆', ic: '🫖',
        d: '湖畔·巷里 泡一壶下午',
        i: '西湖边景观茶馆、巷子里老茶馆，杭州喝茶的好去处与人均参考。',
        th: [
          ['🌅', '湖畔茶馆', 'articles.html?q=%E8%8C%B6%E9%A6%86'], ['🏮', '巷里茶馆', 'articles.html?q=%E8%8C%B6%E9%A6%86'],
          ['🧱', '青砖茶室', 'articles.html?q=%E8%8C%B6%E9%A6%86'], ['🫖', '老茶馆记忆', 'articles.html?q=%E8%8C%B6%E9%A6%86'],
          ['🍵', '茶空间', 'articles.html?q=%E8%8C%B6%E7%A9%BA%E9%97%B4'], ['🎎', '宋式点茶', 'articles.html?q=%E7%82%B9%E8%8C%B6'],
          ['🍜', '径山茶宴', 'articles.html?q=%E5%BE%84%E5%B1%B1'], ['📖', '茶馆文化', 'articles.html?q=%E8%8C%B6%E9%A6%86']
        ],
        ft: [
          ['🫖', '20 个茶空间深度攻略', '杭州茶馆文化体验', 'articles.html?q=%E8%8C%B6%E9%A6%86'],
          ['📖', '消失的老茶馆记忆', '一条街的茶事', 'articles.html?q=%E8%80%81%E8%8C%B6%E9%A6%86'],
          ['🍵', '浙江茶文化传承', '从历史内涵到当代', 'articles.html?q=%E8%8C%B6%E6%96%87%E5%8C%96']
        ],
        kw: ['茶馆', '茶空间', '老茶馆', '点茶']
      }
    ]
  },
  {
    k: 'culture', n: '文博人文', ic: '🏛️', c: '#8a6fd6', home: 'museum.html',
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
          ['⛲', '西湖博物馆', 'museum.html'], ['🧵', '丝绸博物馆', 'articles.html?q=%E4%B8%9D%E7%BB%92%E5%8D%9A%E7%89%A9%E9%A6%86'],
          ['🍵', '茶叶博物馆', 'articles.html?q=%E8%8C%B6%E5%8F%B6%E5%8D%9A%E7%89%A9%E9%A6%86'], ['✂️', '刀剪剑博物馆', 'articles.html?q=%E5%8D%9A%E7%89%A9%E9%A6%86'],
          ['🛶', '湿地博物馆', 'articles.html?q=%E6%B9%BF%E5%9C%B0'], ['🚢', '运河博物馆', 'articles.html?q=%E8%BF%90%E6%B2%B3']
        ],
        ft: [
          ['🏛️', '杭州博物馆地图', '免费文化之旅全入口', 'museum.html'],
          ['🏺', '良渚古城', '5000 年文明实证', 'place.html?id=liangzhu'],
          ['🏛️', '浙江省博物馆深度游', '镇馆之宝怎么看', 'articles.html?q=%E5%8D%9A%E7%89%A9%E9%A6%86']
        ],
        kw: ['博物馆', '良渚', '浙江省博物馆', '美术馆']
      },
      {
        k: 'lishi', n: '历史人文', ic: '📜',
        d: '大运河·南宋·世界遗产',
        i: '京杭大运河、南宋临安城、西湖世界遗产，读懂杭州的来龙去脉。',
        th: [
          ['🚢', '大运河', 'articles.html?q=%E8%BF%90%E6%B2%B3'], ['🏯', '南宋皇城', 'history.html'],
          ['⛲', '西湖申遗', 'articles.html?q=%E8%A5%BF%E6%B9%96'], ['🏺', '良渚', 'place.html?id=liangzhu'],
          ['🌊', '钱塘江', 'articles.html?q=%E9%92%B1%E5%A1%98%E6%B1%9F'], ['🧱', '古城墙', 'articles.html?q=%E5%9F%8E%E5%A2%99'],
          ['🛤️', '御街', 'history.html'], ['🏘️', '市井', 'articles.html?q=%E5%B8%82%E4%BA%95']
        ],
        ft: [
          ['📜', '杭州历史文化', '从起源繁荣到文化高峰', 'history.html'],
          ['🚢', '运河两千年', '从开通到断航再到复兴', 'articles.html?q=%E8%BF%90%E6%B2%B3'],
          ['🏙️', '从运河记忆到新经济', '杭州的转型跃迁', 'articles.html?q=%E8%BF%90%E6%B2%B3']
        ],
        kw: ['历史', '运河', '南宋', '皇城']
      },
      {
        k: 'mingren', n: '杭州名人', ic: '👤',
        d: '白居易·苏轼·秋瑾',
        i: '白居易、苏轼、秋瑾——他们与杭州的故事，附打卡地点。',
        th: [
          ['✍️', '白居易', 'articles.html?q=%E7%99%BD%E5%B1%85%E6%98%93'], ['📜', '苏轼', 'articles.html?q=%E8%8B%8F%E8%BD%BC'],
          ['⚔️', '秋瑾', 'articles.html?q=%E7%A7%8B%E7%91%BE'], ['📚', '章太炎', 'articles.html?q=%E7%AB%A0%E5%A4%AA%E7%82%8E'],
          ['🏛️', '林徽因', 'articles.html?q=%E6%9E%97%E5%BE%BD%E5%9B%A0'], ['🖊️', '郁达夫', 'articles.html?q=%E9%83%81%E8%BE%BE%E5%A4%AB'],
          ['🌧️', '戴望舒', 'articles.html?q=%E6%88%B4%E6%9C%9B%E8%88%92'], ['🥤', '宗庆后', 'articles.html?q=%E5%AE%97%E5%BA%86%E5%90%8E']
        ],
        ft: [
          ['👤', '杭州名人录', '历史与当代名人全集', 'celebrity.html'],
          ['🗿', '西湖边的文人塑像', '白居易与苏轼的守望', 'articles.html?q=%E5%A1%91%E5%83%8F'],
          ['🖊️', '鲁迅与杭州', '从桐乡到杭州的文化斗士', 'articles.html?q=%E9%B2%81%E8%BF%85']
        ],
        kw: ['名人', '白居易', '苏轼', '秋瑾', '鲁迅']
      },
      {
        k: 'gushi', n: '杭州故事', ic: '📖',
        d: '老地名·传说·民俗',
        i: '白蛇传与断桥、老地名由来、西湖龙井传说，杭州的市井与传说。',
        th: [
          ['🐍', '白蛇传', 'articles.html?q=%E7%A5%9E%E8%AF%9D'], ['🦋', '梁祝', 'articles.html?q=%E6%A2%81%E7%A5%9D'],
          ['⛲', '西湖传说', 'articles.html?q=%E4%BC%A0%E8%AF%B4'], ['🏮', '老地名', 'articles.html?q=%E8%80%81%E5%9C%B0%E5%90%8D'],
          ['🎎', '民俗', 'articles.html?q=%E6%B0%91%E4%BF%97'], ['🏘️', '市井', 'articles.html?q=%E5%B8%82%E4%BA%95'],
          ['🗣️', '方言', 'articles.html?q=%E6%96%B9%E8%A8%80'], ['📖', '民间故事', 'articles.html?q=%E6%B0%91%E9%97%B4%E6%95%85%E4%BA%8B']
        ],
        ft: [
          ['📖', '老底子杭州符号', '从文化符号到城市标志', 'articles.html?q=%E7%AC%A6%E5%8F%B7'],
          ['🗣️', '口头文化', '从民间故事到现代传播', 'articles.html?q=%E5%8F%A3%E5%A4%B4%E6%96%87%E5%8C%96'],
          ['🏘️', '市井菜与街头小吃', '城市的烟火气', 'articles.html?q=%E7%83%9F%E7%81%AB%E6%B0%94']
        ],
        kw: ['故事', '传说', '民俗', '老地名']
      },
      {
        k: 'gujian', n: '古镇古建', ic: '🏯',
        d: '古桥·古塔·古宅',
        i: '古桥、古塔、古宅，杭州散落各处的古建筑与打卡路线。',
        th: [
          ['🌉', '古桥', 'articles.html?q=%E5%8F%A4%E6%A1%A5'], ['🗼', '古塔', 'articles.html?q=%E5%8F%A4%E5%A1%94'],
          ['🏠', '古宅', 'articles.html?q=%E5%8F%A4%E5%AE%85'], ['⛩️', '牌坊', 'articles.html?q=%E7%89%8C%E5%9D%8A'],
          ['🏛️', '祠堂', 'articles.html?q=%E7%A5%A0%E5%A0%82'], ['📚', '书院', 'articles.html?q=%E4%B9%A6%E9%99%A2'],
          ['🎭', '戏台', 'articles.html?q=%E6%88%8F%E5%8F%B0'], ['🏮', '牌楼', 'articles.html?q=%E7%89%8C%E6%A5%BC']
        ],
        ft: [
          ['🏯', '古建筑打卡路线', '散落各处的国保与省保', 'articles.html?q=%E5%8F%A4%E5%BB%BA%E7%AF%91'],
          ['🌉', '拱宸桥', '运河终点的百年石拱', 'articles.html?q=%E6%8B%B1%E5%AE%B8%E6%A1%A5'],
          ['🗼', '六和塔', '钱塘江边的北宋巨塔', 'articles.html?q=%E5%85%AD%E5%92%8C%E5%A1%94']
        ],
        kw: ['古建', '古桥', '古塔', '拱宸桥', '六和塔']
      },
      {
        k: 'feiyi', n: '非遗', ic: '🎭',
        d: '评弹·杭绣·张小泉',
        i: '杭州评话、杭绣、张小泉锻剪，杭州非遗项目与体验地。',
        th: [
          ['🎭', '杭州评话', 'articles.html?q=%E9%9D%9E%E9%81%97'], ['🧵', '杭绣', 'articles.html?q=%E6%9D%AD%E7%BB%A3'],
          ['✂️', '张小泉', 'articles.html?q=%E5%BC%A0%E5%B0%8F%E6%B3%89'], ['🪭', '王星记', 'articles.html?q=%E7%8E%8B%E6%98%9F%E8%AE%B0'],
          ['☂️', '西湖绸伞', 'articles.html?q=%E8%A5%BF%E6%B9%96%E4%BC%9E%E4%BC%9E'], ['🏺', '越窑青瓷', 'articles.html?q=%E8%B6%8A%E7%AA%91'],
          ['✂️', '剪纸', 'articles.html?q=%E5%89%AA%E7%BA%B8'], ['🌕', '中秋节', 'articles.html?q=%E4%B8%AD%E7%A7%8B%E8%8A%82']
        ],
        ft: [
          ['☂️', '西湖伞制作技艺', '传统手工艺的诗意表达', 'articles.html?q=%E8%A5%BF%E6%B9%96%E4%BC%9E'],
          ['🏺', '越窑青瓷的复兴', '杭州瓷器的千年窑火', 'articles.html?q=%E8%B6%8A%E7%AA%91'],
          ['✂️', '杭州剪纸', '为什么这么喜庆', 'articles.html?q=%E5%89%AA%E7%BA%B8']
        ],
        kw: ['非遗', '杭绣', '剪纸', '西湖伞', '青瓷']
      },
      {
        k: 'simiao', n: '寺庙', ic: '⛩️',
        d: '灵隐·净慈·径山',
        i: '灵隐寺、净慈寺、径山寺，杭州寺庙祈福与游玩指南。',
        th: [
          ['⛩️', '灵隐寺', 'place.html?id=lingyin'], ['🔔', '净慈寺', 'articles.html?q=%E5%87%80%E6%85%88%E5%AF%BA'],
          ['🍵', '径山寺', 'articles.html?q=%E5%BE%84%E5%B1%B1'], ['🌸', '法喜寺', 'place.html?id=faxi'],
          ['🌿', '永福禅寺', 'articles.html?q=%E6%B0%B8%E7%A6%8F'], ['⛰️', '韬光寺', 'articles.html?q=%E9%9F%AC%E5%85%89'],
          ['🏮', '香积寺', 'articles.html?q=%E9%A6%99%E7%A7%AF%E5%AF%BA'], ['🌲', '理安寺', 'articles.html?q=%E7%90%86%E5%AE%89%E5%AF%BA']
        ],
        ft: [
          ['⛩️', '灵隐寺全攻略', '门票、交通与半日全日线', 'place.html?id=lingyin'],
          ['🌸', '法喜寺', '求姻缘与 5 元斋饭', 'place.html?id=faxi'],
          ['🍵', '径山寺与茶宴', '日本茶道源头之地', 'articles.html?q=%E5%BE%84%E5%B1%B1']
        ],
        kw: ['寺庙', '灵隐', '径山', '法喜寺', '净慈寺']
      },
      {
        k: 'tushuguan', n: '图书馆', ic: '📚',
        d: '杭州图书馆·城市书房',
        i: '杭州图书馆、各区城市书房，免费自习与借阅指南。',
        th: [
          ['📚', '杭州图书馆', 'articles.html?q=%E5%9B%BE%E4%B9%A6%E9%A6%86'], ['🏠', '城市书房', 'articles.html?q=%E5%9F%8E%E5%B8%82%E4%B9%A6%E6%88%BF'],
          ['🎨', '动漫图书馆', 'articles.html?q=%E5%9B%BE%E4%B9%A6%E9%A6%86'], ['📜', '版本馆', 'articles.html?q=%E5%9B%BE%E4%B9%A6%E9%A6%86'],
          ['🕐', '24 小时', 'articles.html?q=%E5%9B%BE%E4%B9%A6%E9%A6%86'], ['🌾', '农家书屋', 'articles.html?q=%E5%9B%BE%E4%B9%A6%E9%A6%86'],
          ['💻', '数字图书馆', 'articles.html?q=%E5%9B%BE%E4%B9%A6%E9%A6%86'], ['📖', '阅读空间', 'articles.html?q=%E9%98%85%E8%AF%BB']
        ],
        ft: [
          ['📚', '城市书房的温情', '从传统阅读到智慧阅读', 'articles.html?q=%E5%9F%8E%E5%B8%82%E4%B9%A6%E6%88%BF'],
          ['🏛️', '杭州教育资源', '从学区房到机会公平', 'articles.html?q=%E6%95%99%E8%82%B2'],
          ['📖', '阅读空间盘点', '免费自习好去处', 'articles.html?q=%E9%98%85%E8%AF%BB']
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
          ['💳', '社保查询', 'banshi.html'], ['🔁', '社保转移', 'articles.html?q=%E7%A4%BE%E4%BF%9D%E8%BD%AC%E7%A7%BB'],
          ['💰', '社保缴费', 'articles.html?q=%E7%A4%BE%E4%BF%9D%E7%BC%B4%E8%B4%B9'], ['🏥', '医保报销', 'articles.html?q=%E5%8C%BB%E4%BF%9D%E6%8A%A5%E9%94%80'],
          ['👴', '养老待遇', 'articles.html?q=%E5%85%BB%E8%80%81%E5%BE%85%E9%81%87'], ['💼', '失业金', 'articles.html?q=%E5%A4%B1%E4%B8%9A%E9%87%91'],
          ['🏭', '工伤认定', 'articles.html?q=%E5%B7%A5%E4%BC%A4%E8%AE%A4%E5%AE%9A'], ['📋', '灵活就业', 'articles.html?q=%E7%81%B5%E6%B4%BB%E5%B0%B1%E4%B8%9A']
        ],
        ft: [
          ['🧰', '办事大厅频道', '社保公积金落户全入口', 'banshi.html'],
          ['💳', '社保查询指南', '浙里办与电子社保卡流程', 'banshi.html'],
          ['📋', '杭州医保门诊报销', '报销比例与流程', 'articles.html?q=%E5%8C%BB%E4%BF%9D']
        ],
        kw: ['社保', '医保', '缴费', '报销']
      },
      {
        k: 'gjj', n: '公积金', ic: '🏦',
        d: '查询/提取/贷款',
        i: '杭州住房公积金查询覆盖余额、缴存明细、提取记录与贷款额度测算，已开通线上全流程。',
        th: [
          ['🏦', '余额查询', 'banshi.html'], ['💸', '租房提取', 'articles.html?q=%E7%A7%9F%E6%88%BF%E6%8F%90%E5%8F%96'],
          ['🏠', '购房提取', 'articles.html?q=%E8%B4%AD%E6%88%BF%E6%8F%90%E5%8F%96'], ['🔁', '还贷提取', 'articles.html?q=%E8%BF%98%E8%B4%B7%E6%8F%90%E5%8F%96'],
          ['📄', '转移接续', 'articles.html?q=%E8%BD%AC%E7%A7%BB%E6%8E%A5%E7%BB%AD'], ['🏗️', '贷款测算', 'articles.html?q=%E8%B4%B7%E6%AC%BE%E6%B5%8B%E7%AE%97'],
          ['👴', '退休提取', 'articles.html?q=%E9%80%80%E4%BC%91%E6%8F%90%E5%8F%96'], ['📊', '缴存证明', 'articles.html?q=%E7%BC%B4%E5%AD%98%E8%AF%81%E6%98%8E']
        ],
        ft: [
          ['🧰', '办事大厅频道', '全部办事入口', 'banshi.html'],
          ['🏦', '公积金提取指南', '租房秒到账，购房 3 个工作日', 'banshi.html'],
          ['🏠', '杭州购房全攻略', '从看房到过户', 'articles.html?q=%E8%B4%AD%E6%88%BF']
        ],
        kw: ['公积金', '提取', '贷款', '购房']
      },
      {
        k: 'luohu', n: '落户', ic: '📋',
        d: '人才引进·积分落户',
        i: '杭州落户含人才引进、积分落户、投靠落户等渠道，附条件对照与办理入口。',
        th: [
          ['📋', '人才引进', 'banshi.html'], ['🧮', '积分落户', 'articles.html?q=%E7%A7%AF%E5%88%86%E8%90%BD%E6%88%B7'],
          ['👨‍👩‍👧', '投靠落户', 'articles.html?q=%E6%8A%95%E9%9D%A0%E8%90%BD%E6%88%B7'], ['🎓', '学历落户', 'articles.html?q=%E5%AD%A6%E5%8E%86%E8%90%BD%E6%88%B7'],
          ['🏠', '购房落户', 'articles.html?q=%E8%B4%AD%E6%88%BF%E8%90%BD%E6%88%B7'], ['💼', '就业落户', 'articles.html?q=%E5%B0%B1%E4%B8%9A%E8%90%BD%E6%88%B7'],
          ['📄', '居住证', 'articles.html?q=%E5%B1%85%E4%BD%8F%E8%AF%81'], ['🆔', '身份证', 'articles.html?q=%E8%BA%AB%E4%BB%BD%E8%AF%81']
        ],
        ft: [
          ['🧰', '办事大厅频道', '落户与证件办理入口', 'banshi.html'],
          ['🎓', '人才认定申请', '高层次人才分类认定', 'banshi.html'],
          ['🏫', '教育资源与公平', '学区房到机会公平', 'articles.html?q=%E6%95%99%E8%82%B2']
        ],
        kw: ['落户', '人才引进', '积分', '居住证']
      },
      {
        k: 'jiaotong', n: '出行交通', ic: '🚌',
        d: '公交·地铁·限行',
        i: '限行查询、地铁公交、火车机票、打车租车、停车缴费、违章处理，出行无忧。',
        th: [
          ['🚗', '尾号限行', 'banshi.html'], ['🚇', '地铁线路', 'articles.html?q=%E5%9C%B0%E9%93%81%E7%BA%BF%E8%B7%AF'],
          ['🚌', '实时公交', 'articles.html?q=%E5%AE%9E%E6%97%B6%E5%85%AC%E4%BA%A4'], ['🚄', '火车票', 'articles.html?q=%E7%81%AB%E8%BD%A6%E7%A5%A8'],
          ['✈️', '机票', 'articles.html?q=%E6%9C%BA%E7%A5%A8'], ['🅿️', '停车缴费', 'articles.html?q=%E5%81%9C%E8%BD%A6%E7%BC%B4%E8%B4%B9'],
          ['🚕', '打车租车', 'articles.html?q=%E6%89%93%E8%BD%A6%E7%A7%9F%E8%BD%A6'], ['⚠️', '违章处理', 'articles.html?q=%E8%BF%9D%E7%AB%A0%E5%A4%84%E7%90%86']
        ],
        ft: [
          ['🚌', '出行交通频道', '限行地铁公交全入口', 'traffic.html'],
          ['🚗', '今日尾号限行', '浙A 与外地车规则', 'banshi.html'],
          ['🚇', '杭州地铁指南', '线路与换乘', 'articles.html?q=%E5%9C%B0%E9%93%81']
        ],
        kw: ['交通', '地铁', '公交', '限行', '停车']
      },
      {
        k: 'quxian', n: '区县导航', ic: '🏙️',
        d: '杭州 13 区县',
        i: '上城、拱墅、西湖、滨江、萧山、余杭、临平、钱塘、富阳、临安、桐庐、淳安、建德——13 区县特色一站查。',
        th: [
          ['🏙️', '上城区', 'district.html'], ['🌳', '拱墅区', 'articles.html?q=%E6%8B%B1%E5%A2%85%E5%8C%BA'],
          ['⛲', '西湖区', 'articles.html?q=%E8%A5%BF%E6%B9%96%E5%8C%BA'], ['💻', '滨江区', 'articles.html?q=%E6%BB%A8%E6%B1%9F%E5%8C%BA'],
          ['✈️', '萧山区', 'articles.html?q=%E8%90%A7%E5%B1%B1%E5%8C%BA'], ['🏞️', '余杭区', 'articles.html?q=%E4%BD%99%E6%9D%AD%E5%8C%BA'],
          ['🏭', '临平区', 'articles.html?q=%E4%B8%B4%E5%B9%B3%E5%8C%BA'], ['🌊', '钱塘区', 'articles.html?q=%E9%92%B1%E5%A1%98%E5%8C%BA'],
        ],
        ft: [
          ['🏙️', '杭州 13 区县', '区县特色与办事入口', 'district.html'],
          ['🏞️', '富阳与桐庐', '杭州后花园的山水', 'articles.html?q=%E5%AF%8C%E9%98%B3'],
          ['🍵', '临安与建德', '浙西山水与土产', 'articles.html?q=%E4%B8%B4%E5%AE%89']
        ],
        kw: ['区县', '上城', '萧山', '余杭', '富阳', '临安']
      },
      {
        k: 'cheliang', n: '车辆服务', ic: '🚗',
        d: '摇号·年检·违章',
        i: '浙A摇号、年检、违章处理、驾驶证换证——车主高频事项一次办。',
        th: [
          ['🚘', '浙A摇号', 'banshi.html'], ['🔧', '车辆年检', 'articles.html?q=%E8%BD%A6%E8%BE%86%E5%B9%B4%E6%A3%80'],
          ['⚠️', '违章查询', 'articles.html?q=%E8%BF%9D%E7%AB%A0%E6%9F%A5%E8%AF%A2'], ['🪪', '驾驶证', 'articles.html?q=%E9%A9%BE%E9%A9%B6%E8%AF%81'],
          ['🅿️', '停车位', 'articles.html?q=%E5%81%9C%E8%BD%A6%E4%BD%8D'], ['⛽', '加油充电', 'articles.html?q=%E5%8A%A0%E6%B2%B9%E5%85%85%E7%94%B5'],
          ['🚧', '道路施工', 'articles.html?q=%E9%81%93%E8%B7%AF%E6%96%BD%E5%B7%A5'], ['🧾', '高速收费', 'articles.html?q=%E9%AB%98%E9%80%9F%E6%94%B6%E8%B4%B9']
        ],
        ft: [
          ['🚘', '浙A摇号申请', '指标申请与结果查询', 'banshi.html'],
          ['🅿️', '杭州停车攻略', '停车现状与省钱办法', 'articles.html?q=%E5%81%9C%E8%BD%A6'],
          ['🚗', '驾考全流程', 'C1/C2 从报名到拿证', 'articles.html?q=%E9%A7%95%E8%80%83']
        ],
        kw: ['摇号', '年检', '违章', '停车', '驾考']
      },
      {
        k: 'dianhua', n: '常用电话', ic: '📞',
        d: '21 个一键复制',
        i: '政务热线、投诉举报、急难救助、公共服务——杭州常用电话一键复制。',
        th: [
          ['📞', '12345 热线', 'banshi.html'], ['🚨', '报警 110', 'articles.html?q=%E6%8A%A5%E8%AD%A6%20110'],
          ['🚑', '急救 120', 'articles.html?q=%E6%80%A5%E6%95%91%20120'], ['🔥', '火警 119', 'articles.html?q=%E7%81%AB%E8%AD%A6%20119'],
          ['💧', '水电燃气', 'articles.html?q=%E6%B0%B4%E7%94%B5%E7%87%83%E6%B0%94'], ['🏥', '卫生热线', 'articles.html?q=%E5%8D%AB%E7%94%9F%E7%83%AD%E7%BA%BF'],
          ['🚌', '公交服务', 'articles.html?q=%E5%85%AC%E4%BA%A4%E6%9C%8D%E5%8A%A1'], ['📮', '邮政客服', 'articles.html?q=%E9%82%AE%E6%94%BF%E5%AE%A2%E6%9C%8D']
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
          ['🏢', '央企在杭', 'zhaopin.html'], ['🏙️', '市属国企', 'articles.html?q=%E5%B8%82%E5%B1%9E%E5%9B%BD%E4%BC%81'],
          ['💼', '区县城投', 'articles.html?q=%E5%8C%BA%E5%8E%BF%E5%9F%8E%E6%8A%95'], ['🏭', '制造业国企', 'articles.html?q=%E5%88%B6%E9%80%A0%E4%B8%9A%E5%9B%BD%E4%BC%81'],
          ['⚡', '能源电力', 'articles.html?q=%E8%83%BD%E6%BA%90%E7%94%B5%E5%8A%9B'], ['🚇', '轨道交通', 'articles.html?q=%E8%BD%A8%E9%81%93%E4%BA%A4%E9%80%9A'],
          ['🏥', '医疗卫生', 'articles.html?q=%E5%8C%BB%E7%96%97%E5%8D%AB%E7%94%9F'], ['🎓', '校招通道', 'articles.html?q=%E6%A0%A1%E6%8B%9B%E9%80%9A%E9%81%93']
        ],
        ft: [
          ['💼', '求职招聘频道', '国企事业名企全入口', 'zhaopin.html'],
          ['🏢', '国企招聘公告', '最新公告与报名入口', 'zhaopin.html'],
          ['📋', '劳动合同与维权', '签约前必读', 'articles.html?q=%E5%8A%B3%E5%8A%A8']
        ],
        kw: ['国企', '招聘', '央企', '城投']
      },
      {
        k: 'shiye', n: '事业单位', ic: '🎓',
        d: '教师·医护·科研',
        i: '杭州事业单位统一公开招聘，教师、医护、科研岗位公告与考试安排。',
        th: [
          ['🎓', '教师招聘', 'zhaopin.html'], ['🏥', '医护招聘', 'articles.html?q=%E5%8C%BB%E6%8A%A4%E6%8B%9B%E8%81%98'],
          ['🔬', '科研岗位', 'articles.html?q=%E7%A7%91%E7%A0%94%E5%B2%97%E4%BD%8D'], ['📚', '高校教辅', 'articles.html?q=%E9%AB%98%E6%A0%A1%E6%95%99%E8%BE%85'],
          ['🏛️', '文化场馆', 'articles.html?q=%E6%96%87%E5%8C%96%E5%9C%BA%E9%A6%86'], ['🌳', '园林环卫', 'articles.html?q=%E5%9B%AD%E6%9E%97%E7%8E%AF%E5%8D%AB'],
          ['📋', '报名流程', 'articles.html?q=%E6%8A%A5%E5%90%8D%E6%B5%81%E7%A8%8B'], ['📝', '考试大纲', 'articles.html?q=%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B2']
        ],
        ft: [
          ['🎓', '事业单位招聘', '统一招聘公告与入口', 'zhaopin.html'],
          ['📚', '教师岗位指南', '报考条件与时间线', 'articles.html?q=%E6%95%99%E5%B8%88'],
          ['🏥', '医护招聘信息', '杭州医院岗位汇总', 'articles.html?q=%E5%8C%BB%E9%99%A2']
        ],
        kw: ['事业单位', '教师', '招聘', '考试']
      },
      {
        k: 'mingqi', n: '名企招聘', ic: '🏙️',
        d: '阿里·网易·海康',
        i: '阿里巴巴、网易、海康威视、蚂蚁集团——杭州名企招聘入口与内推渠道。',
        th: [
          ['🏙️', '阿里巴巴', 'zhaopin.html'], ['📧', '网易', 'articles.html?q=%E7%BD%91%E6%98%93'],
          ['📹', '海康威视', 'articles.html?q=%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86'], ['🐜', '蚂蚁集团', 'articles.html?q=%E8%9A%82%E8%9A%81%E9%9B%86%E5%9B%A2'],
          ['💻', '字节跳动', 'articles.html?q=%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8'], ['🛒', '电商零售', 'articles.html?q=%E7%94%B5%E5%95%86%E9%9B%B6%E5%94%AE'],
          ['🤖', 'AI 人工智能', 'articles.html?q=AI%20%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD'], ['🚗', '智能驾驶', 'articles.html?q=%E6%99%BA%E8%83%BD%E9%A9%BE%E9%A9%B6']
        ],
        ft: [
          ['💻', '杭州互联网业', '大厂地图与产业分布', 'internet.html'],
          ['🏙️', '名企招聘入口', '官网与内推渠道', 'zhaopin.html'],
          ['📝', '简历与面试技巧', '杭州求职实战', 'articles.html?q=%E7%AE%80%E5%8E%86']
        ],
        kw: ['名企', '互联网', '阿里巴巴', '网易', '招聘']
      },
      {
        k: 'jianzhi', n: '兼职实习', ic: '💡',
        d: '学生兼职·实习',
        i: '大学生兼职、暑期实习、转正机会——杭州学生党赚钱与攒经验指南。',
        th: [
          ['💡', '学生兼职', 'zhaopin.html'], ['🎒', '暑期实习', 'articles.html?q=%E6%9A%91%E6%9C%9F%E5%AE%9E%E4%B9%A0'],
          ['🔄', '转正机会', 'articles.html?q=%E8%BD%AC%E6%AD%A3%E6%9C%BA%E4%BC%9A'], ['🏫', '校园大使', 'articles.html?q=%E6%A0%A1%E5%9B%AD%E5%A4%A7%E4%BD%BF'],
          ['🎨', '设计接单', 'articles.html?q=%E8%AE%BE%E8%AE%A1%E6%8E%A5%E5%8D%95'], ['✍️', '文案写作', 'articles.html?q=%E6%96%87%E6%A1%88%E5%86%99%E4%BD%9C'],
          ['📹', '视频剪辑', 'articles.html?q=%E8%A7%86%E9%A2%91%E5%89%AA%E8%BE%91'], ['🎤', '主持礼仪', 'articles.html?q=%E4%B8%BB%E6%8C%81%E7%A4%BC%E4%BB%AA']
        ],
        ft: [
          ['💰', '杭州搞钱副业指南', '众包、探店、摆摊、AI 副业', 'articles.html?q=%E5%81%9A%E9%92%B1%E5%89%AF%E4%B8%9A'],
          ['🐑', '薅羊毛省钱攻略', '消费券奶茶积分学生福利', 'articles.html?q=%E8%96%85%E7%BE%8A%E6%AF%9B'],
          ['💼', '实习求职入口', '杭州实习岗位', 'zhaopin.html']
        ],
        kw: ['兼职', '实习', '副业', '学生']
      },
      {
        k: 'rencai', n: '人才认定', ic: '🏅',
        d: '高层次人才申请',
        i: '杭州高层次人才分类认定（A-E 类），附条件对照、申请材料与补贴政策。',
        th: [
          ['🏅', 'A 类人才', 'banshi.html'], ['🏆', 'B 类人才', 'articles.html?q=B%20%E7%B1%BB%E4%BA%BA%E6%89%8D'],
          ['🥇', 'C 类人才', 'articles.html?q=C%20%E7%B1%BB%E4%BA%BA%E6%89%8D'], ['🎖️', 'D 类人才', 'articles.html?q=D%20%E7%B1%BB%E4%BA%BA%E6%89%8D'],
          ['📜', 'E 类人才', 'articles.html?q=E%20%E7%B1%BB%E4%BA%BA%E6%89%8D'], ['💰', '购房补贴', 'articles.html?q=%E8%B4%AD%E6%88%BF%E8%A1%A5%E8%B4%B4'],
          ['🎓', '生活补贴', 'articles.html?q=%E7%94%9F%E6%B4%BB%E8%A1%A5%E8%B4%B4'], ['🏥', '医疗待遇', 'articles.html?q=%E5%8C%BB%E7%96%97%E5%BE%85%E9%81%87']
        ],
        ft: [
          ['🎓', '人才认定申请', '高层次人才分类认定入口', 'banshi.html'],
          ['🏫', '教育资源与公平', '人才子女入学', 'articles.html?q=%E6%95%99%E8%82%B2'],
          ['🏠', '人才购房指南', '杭州购房时机与预算', 'articles.html?q=%E8%B4%AD%E6%88%BF']
        ],
        kw: ['人才', '认定', '补贴', '高层次']
      },
      {
        k: 'hulianwang', n: '互联网业', ic: '💻',
        d: '杭州互联网地图',
        i: '未来科技城、滨江高新区、云栖小镇——杭州互联网产业地图与迁徙史。',
        th: [
          ['💻', '未来科技城', 'internet.html'], ['🏙️', '滨江高新区', 'articles.html?q=%E6%BB%A8%E6%B1%9F%E9%AB%98%E6%96%B0%E5%8C%BA'],
          ['☁️', '云栖小镇', 'articles.html?q=%E4%BA%91%E6%A0%96%E5%B0%8F%E9%95%87'], ['🎮', '游戏电竞', 'articles.html?q=%E6%B8%B8%E6%88%8F%E7%94%B5%E7%AB%9E'],
          ['🤖', 'AI 六小龙', 'articles.html?q=AI%20%E5%85%AD%E5%B0%8F%E9%BE%99'], ['🛒', '电商直播', 'articles.html?q=%E7%94%B5%E5%95%86%E7%9B%B4%E6%92%AD'],
          ['🚗', '智能网联车', 'articles.html?q=%E6%99%BA%E8%83%BD%E7%BD%91%E8%81%94%E8%BD%A6'], ['💾', '云计算大数据', 'articles.html?q=%E4%BA%91%E8%AE%A1%E7%AE%97%E5%A4%A7%E6%95%B0%E6%8D%AE']
        ],
        ft: [
          ['💻', '杭州互联网业', '大厂聚集地与数字经济高地', 'internet.html'],
          ['🏙️', '从运河记忆到新经济', '杭州的转型跃迁', 'articles.html?q=%E4%BA%92%E8%81%94%E7%BD%91'],
          ['🏘️', '新杭州人的城市融入', '身份认同与安居', 'articles.html?q=%E6%96%B0%E6%9D%AD%E5%B7%9E%E4%BA%BA']
        ],
        kw: ['互联网', '数字经济', '未来科技城', '滨江']
      },
      {
        k: 'jianli', n: '简历面试', ic: '📝',
        d: '模板·技巧',
        i: '杭州求职简历模板、面试常见问题、薪资谈判与谈薪参考。',
        th: [
          ['📝', '简历模板', 'articles.html?q=%E7%AE%80%E5%8E%86'], ['🎯', '面试技巧', 'articles.html?q=%E9%9D%A2%E8%AF%95'],
          ['💰', '薪资谈判', 'articles.html?q=%E8%96%AA%E8%B5%84'], ['📊', '职业规划', 'articles.html?q=%E8%81%8C%E4%B8%9A%E8%A7%84%E5%88%92'],
          ['🔄', '转行指南', 'articles.html?q=%E8%BD%AC%E8%A1%8C'], ['🏠', '租房建议', 'articles.html?q=%E7%A7%9F%E6%88%BF'],
          ['📄', '劳动合同', 'articles.html?q=%E5%8A%B3%E5%8A%A8'], ['⚖️', '维权渠道', 'articles.html?q=%E5%8A%B3%E5%8A%A8']
        ],
        ft: [
          ['📝', '简历面试实战', '模板与常见问题', 'articles.html?q=%E9%9D%A2%E8%AF%95'],
          ['🏠', '杭州租房指南', '区域、租金与避坑', 'articles.html?q=%E7%A7%9F%E6%88%BF'],
          ['💰', '杭州生活成本', '消费与价位参考', 'articles.html?q=%E7%94%9F%E6%B4%BB%E6%88%90%E6%9C%AC']
        ],
        kw: ['简历', '面试', '薪资', '租房', '职业']
      },
      {
        k: 'laodong', n: '劳动维权', ic: '⚖️',
        d: '劳动合同·仲裁',
        i: '劳动合同签订、加班费、辞退赔偿、劳动仲裁——杭州劳动者维权指引。',
        th: [
          ['📄', '劳动合同', 'articles.html?q=%E5%8A%B3%E5%8A%A8'], ['⏰', '加班费', 'articles.html?q=%E5%8A%B3%E5%8A%A8'],
          ['💰', '经济补偿', 'articles.html?q=%E5%8A%B3%E5%8A%A8'], ['⚖️', '劳动仲裁', 'articles.html?q=%E5%8A%B3%E5%8A%A8'],
          ['🏥', '工伤保险', 'articles.html?q=%E5%B7%A5%E4%BC%A4'], ['🤰', '孕期权益', 'articles.html?q=%E5%8A%B3%E5%8A%A8'],
          ['📞', '投诉渠道', 'articles.html?q=%E5%8A%B3%E5%8A%A8'], ['🧾', '证据保留', 'articles.html?q=%E5%8A%B3%E5%8A%A8']
        ],
        ft: [
          ['⚖️', '劳动维权指引', '仲裁流程与材料', 'articles.html?q=%E5%8A%B3%E5%8A%A8'],
          ['📄', '劳动合同要点', '签约前必读条款', 'articles.html?q=%E5%8A%B3%E5%8A%A8'],
          ['🏥', '工伤保险指南', '认定与待遇', 'articles.html?q=%E5%B7%A5%E4%BC%A4']
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
          ['💳', '社保新政', 'articles.html?q=%E6%94%BF%E7%AD%96'], ['🏦', '公积金调整', 'articles.html?q=%E6%94%BF%E7%AD%96'],
          ['🏠', '住房政策', 'articles.html?q=%E6%88%BF%E4%BA%A7'], ['🎓', '教育新政', 'articles.html?q=%E6%95%99%E8%82%B2'],
          ['🏥', '医保变化', 'articles.html?q=%E5%8C%BB%E4%BF%9D'], ['👴', '养老待遇', 'articles.html?q=%E5%85%BB%E8%80%81'],
          ['💼', '就业补贴', 'articles.html?q=%E8%A1%8C%E4%B8%9A'], ['🧾', '税费调整', 'articles.html?q=%E7%A8%8E%E8%B4%B9']
        ],
        ft: [
          ['📰', '资讯热点频道', '全部文章与热点', 'articles.html'],
          ['💳', '社保政策解读', '缴费基数与待遇变化', 'articles.html?q=%E7%A4%BE%E4%BF%9D'],
          ['🏠', '杭州房产政策', '限购、贷款与以旧换新', 'articles.html?q=%E6%88%BF%E4%BA%A7']
        ],
        kw: ['政策', '社保', '公积金', '房产']
      },
      {
        k: 'butie', n: '消费补贴', ic: '🎫',
        d: '消费券·以旧换新',
        i: '杭州消费券发放时间、领取入口与使用规则，家电以旧换新补贴全流程。',
        th: [
          ['🎫', '消费券', 'articles.html?q=%E6%B6%88%E8%B4%B9%E5%88%B8'], ['🛋️', '家电换新', 'articles.html?q=%E4%BB%A5%E6%97%A7%E6%8D%A2%E6%96%B0'],
          ['🚗', '汽车补贴', 'articles.html?q=%E6%B1%BD%E8%BD%A6'], ['🏠', '家装补贴', 'articles.html?q=%E5%AE%B6%E8%A3%85'],
          ['🧾', '发票抽奖', 'articles.html?q=%E5%8F%91%E7%A5%A8'], ['🎫', '文旅消费券', 'articles.html?q=%E6%97%85%E6%B8%B8'],
          ['🍚', '餐饮消费券', 'articles.html?q=%E6%B6%88%E8%B4%B9%E5%88%B8'], ['📱', '数字人民币', 'articles.html?q=%E6%95%B0%E5%AD%97%E8%B4%A7%E5%B8%81']
        ],
        ft: [
          ['💰', '薅羊毛省钱攻略', '消费券奶茶积分学生福利', 'articles.html?q=%E8%96%85%E7%BE%8A%E6%AF%9B'],
          ['🎫', '消费券领取指南', '时间、入口与使用规则', 'articles.html?q=%E6%B6%88%E8%B4%B9%E5%88%B8'],
          ['🛋️', '以旧换新补贴', '家电汽车全流程', 'articles.html?q=%E4%BB%A5%E6%97%A7%E6%8D%A2%E6%96%B0']
        ],
        kw: ['消费券', '补贴', '以旧换新', '薅羊毛']
      },
      {
        k: 'huodong', n: '活动汇总', ic: '🎉',
        d: '国庆·灯光秀·音乐节',
        i: '国庆活动、灯光秀、音乐节、展览市集——杭州近期活动全整理。',
        th: [
          ['🎆', '国庆活动', 'articles.html?q=%E5%9B%BD%E5%BA%86'], ['🌃', '灯光秀', 'articles.html?q=%E7%81%AF%E5%85%89%E7%A7%80'],
          ['🎵', '音乐节', 'articles.html?q=%E9%9F%B3%E4%B9%90%E8%8A%82'], ['🖼️', '展览', 'articles.html?q=%E5%B1%95%E8%A7%88'],
          ['🎪', '市集', 'articles.html?q=%E5%B8%82%E9%9B%86'], ['🏮', '灯会', 'articles.html?q=%E7%81%AF%E4%BC%9A'],
          ['🎭', '演出', 'articles.html?q=%E6%BC%94%E5%87%BA'], ['🌸', '赏花季', 'articles.html?q=%E8%B5%8F%E8%8A%B1']
        ],
        ft: [
          ['🎆', '2026 国庆活动全整理', '烟花灯会音乐节一网打尽', 'articles.html?q=%E5%9B%BD%E5%BA%86'],
          ['🌃', '钱江新城灯光秀', '时间、机位与交通', 'articles.html?q=%E7%81%AF%E5%85%89%E7%A7%80'],
          ['🎵', '天目山音乐节', '阵容购票交通指南', 'articles.html?q=%E9%9F%B3%E4%B9%90%E8%8A%82']
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
          ['🅿️', '停车攻略', 'articles.html?q=%E5%81%9C%E8%BD%A6'], ['⚠️', '违章处理', '#act:xianxing'],
          ['🚧', '施工路段', '#act:xianxing'], ['🚕', '打车出行', '#act:xianxing']
        ],
        ft: [
          ['🚗', '尾号限行查询', '今日限行号码与规则', '#act:xianxing'],
          ['🅿️', '杭州停车攻略', '停车现状与省钱办法', 'articles.html?q=%E5%81%9C%E8%BD%A6'],
          ['🚇', '地铁公交指南', '绿色出行更省心', 'articles.html?q=%E5%9C%B0%E9%93%81']
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
          ['⛈️', '梅雨与台风', '杭州的雨季怎么过', 'articles.html?q=%E6%A2%85%E9%9B%A8'],
          ['🌸', '四季赏花日历', '跟着花期游杭州', 'articles.html?q=%E8%B5%8F%E8%8A%B1']
        ],
        kw: ['天气', '梅雨', '台风', '季节']
      },
      {
        k: 'youjia', n: '油价查询', ic: '⛽',
        d: '今日成品油价格',
        i: '今日 92/95/98 号汽油与柴油价格，含调价周期与加油省钱技巧。',
        th: [
          ['⛽', '今日油价', '#act:youjia'], ['📈', '调价窗口', '#act:youjia'],
          ['🚗', '加油省钱', 'articles.html?q=%E6%B2%B9%E8%80%97'], ['⚡', '充电桩', 'articles.html?q=%E5%85%85%E7%94%B5'],
          ['🚙', '油耗对比', 'articles.html?q=%E6%B2%B9%E8%80%97'], ['🛣️', '高速免费', 'articles.html?q=%E9%AB%98%E9%80%9F'],
          ['🧾', '电子发票', '#act:youjia'], ['💳', '加油优惠', 'articles.html?q=%E6%B2%B9%E8%80%97']
        ],
        ft: [
          ['⛽', '今日油价查询', '92/95/98 号汽油柴油', '#act:youjia'],
          ['🚗', '杭州用车成本', '油耗、停车与保险', 'articles.html?q=%E6%B2%B9%E8%80%97'],
          ['⚡', '新能源充电指南', '充电桩分布与电价', 'articles.html?q=%E5%85%85%E7%94%B5']
        ],
        kw: ['油价', '加油', '充电', '油耗']
      },
      {
        k: 'wxfeed', n: '公众号精选', ic: '📱',
        d: '每日推送精选',
        i: 'iHangzhou 公众号每日推送——限行、油价、政策解读与生活攻略精选。',
        th: [
          ['📅', '今日杭州', 'articles.html?q=%E6%97%A5%E5%B8%B8'], ['🚗', '限行提醒', 'articles.html?q=%E9%99%90%E8%A1%8C'],
          ['⛽', '油价速报', 'articles.html?q=%E6%B2%B9%E4%BB%B7'], ['💳', '政策解读', 'articles.html?q=%E6%94%BF%E7%AD%96'],
          ['🎉', '活动推荐', 'articles.html?q=%E6%B4%BB%E5%8A%A8'], ['🍜', '美食攻略', 'articles.html?q=%E7%BE%8E%E9%A3%9F'],
          ['🏞️', '周末去哪', 'articles.html?q=%E5%91%A8%E6%9C%AB'], ['📚', '全部文章', 'articles.html']
        ],
        ft: [
          ['🎆', '国庆去哪玩', '2026 国庆活动全整理', 'articles.html?q=%E5%9B%BD%E5%BA%86'],
          ['💕', '相亲脱单攻略', '三大相亲角与亲青恋', 'articles.html?q=%E7%9B%B8%E4%BA%B2'],
          ['🏃', '免费健身指南', '骑行跑步登山公园', 'articles.html?q=%E5%81%A5%E8%BA%AB']
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
          ['🏬', '湖滨商圈', 'street.html'], ['🛍️', '武林商圈', 'articles.html?q=%E6%AD%A6%E6%9E%97%E5%95%86%E5%9C%88'],
          ['🏙️', '钱江新城', 'articles.html?q=%E9%92%B1%E6%B1%9F%E6%96%B0%E5%9F%8E'], ['🏭', '天目里', 'articles.html?q=%E5%A4%A9%E7%9B%AE%E9%87%8C'],
          ['💻', '滨江商圈', 'articles.html?q=%E6%BB%A8%E6%B1%9F%E5%95%86%E5%9C%88'], ['✈️', '萧山商圈', 'articles.html?q=%E8%90%A7%E5%B1%B1%E5%95%86%E5%9C%88'],
          ['🏞️', '余杭商圈', 'articles.html?q=%E4%BD%99%E6%9D%AD%E5%95%86%E5%9C%88'], ['🌊', '下沙商圈', 'articles.html?q=%E4%B8%8B%E6%B2%99%E5%95%86%E5%9C%88']
        ],
        ft: [
          ['🛍️', '逛街购物频道', '商圈与街道故事', 'street.html'],
          ['🏮', '河坊街千年古巷', '一条街读尽市井', 'articles.html?q=%E6%B2%B3%E5%9D%8A%E8%A1%97'],
          ['🏙️', '武林夜市', '夜宵与夜购', 'articles.html?q=%E5%A4%9C%E5%B8%82']
        ],
        kw: ['商圈', '逛街', '购物', '商场']
      },
      {
        k: 'techan', n: '杭州特产', ic: '🎁',
        d: '王星记·知味观',
        i: '王星记折扇、知味观糕点、张小泉剪刀、塘栖枇杷——杭州特产送礼指南。',
        th: [
          ['🪭', '王星记扇子', 'laozihao.html'], ['🥮', '知味观糕点', 'laozihao.html'],
          ['✂️', '张小泉剪刀', 'laozihao.html'], ['🍵', '西湖龙井', 'articles.html?q=%E9%BE%99%E4%BA%95'],
          ['🪷', '西湖藕粉', 'articles.html?q=%E8%97%95%E7%B2%89'], ['🍶', '塘栖枇杷', 'articles.html?q=%E5%A1%BE%E6%97%8C'],
          ['🧵', '杭绣丝绸', 'articles.html?q=%E7%BA%A2%E7%BB%A3'], ['☂️', '西湖绸伞', 'articles.html?q=%E8%A5%BF%E6%B9%96%E4%BC%9E']
        ],
        ft: [
          ['🏮', '百年老店频道', '杭州老字号品牌全集', 'laozihao.html'],
          ['🎁', '特产送礼清单', '本地人认可的手信', 'articles.html?q=%E7%89%B9%E4%BA%A7'],
          ['🍵', '狮峰龙井礼盒', '明前特级怎么挑', 'articles.html?q=%E9%BE%99%E4%BA%95']
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
          ['🎁', '特产送礼指南', '不踩坑的手信清单', 'articles.html?q=%E7%89%B9%E4%BA%A7']
        ],
        kw: ['好物', '推荐', '送礼', '手信']
      },
      {
        k: 'laodian', n: '百年老店', ic: '🏮',
        d: '知味观·奎元馆',
        i: '知味观、奎元馆、王润兴、胡庆余堂——百年老字号的必点与避坑。',
        th: [
          ['🥟', '知味观', 'laozihao.html'], ['🍜', '奎元馆', 'articles.html?q=%E5%A5%8E%E5%85%83%E9%A6%86'],
          ['🐟', '楼外楼', 'articles.html?q=%E6%A5%BC%E5%A4%96%E6%A5%BC'], ['🍲', '王润兴', 'articles.html?q=%E7%8E%8B%E6%B6%A6%E5%85%B4'],
          ['🌿', '胡庆余堂', 'articles.html?q=%E8%83%A1%E5%BA%86%E4%BD%99%E5%A0%82'], ['🪭', '王星记', 'articles.html?q=%E7%8E%8B%E6%98%9F%E8%AE%B0'],
          ['✂️', '张小泉', 'articles.html?q=%E5%BC%A0%E5%B0%8F%E6%B3%89'], ['🏥', '方回春堂', 'articles.html?q=%E6%96%B9%E5%9B%9E%E6%98%A5%E5%A0%82']
        ],
        ft: [
          ['🏮', '百年老店频道', '杭州老字号全集', 'laozihao.html'],
          ['🌿', '胡庆余堂', '医药龙头的商业帝国', 'articles.html?q=%E8%83%A1%E5%BA%86%E4%BD%99%E5%A0%82'],
          ['🏥', '老药堂的消失', '一条街的医药记忆', 'articles.html?q=%E8%80%81%E8%8D%AF%E5%A0%82']
        ],
        kw: ['老字号', '知味观', '奎元馆', '胡庆余堂']
      },
      {
        k: 'kafei', n: '咖啡地图', ic: '☕',
        d: '景观·独立咖啡',
        i: '西湖边景观咖啡、小众独立咖啡馆、写字楼平价咖啡——杭州咖啡地图。',
        th: [
          ['🌅', '西湖边', 'coffee.html'], ['🏙️', '写字楼', 'articles.html?q=%E5%86%99%E5%AD%97%E6%A5%BC'],
          ['🏡', '青芝坞', 'articles.html?q=%E9%9D%92%E8%8A%9D%E5%9D%9E'], ['⛰️', '馒头山', 'articles.html?q=%E9%A6%92%E5%A4%B4%E5%B1%B1'],
          ['🍵', '四眼井', 'articles.html?q=%E5%9B%9B%E7%9C%BC%E4%BA%95'], ['🌿', '满觉陇', 'articles.html?q=%E6%BB%A1%E8%A7%89%E9%99%87'],
          ['🏭', '天目里', 'articles.html?q=%E5%A4%A9%E7%9B%AE%E9%87%8C'], ['💡', '东信和创', 'articles.html?q=%E4%B8%9C%E4%BF%A1%E5%92%8C%E5%88%9B']
        ],
        ft: [
          ['☕', '咖啡馆指南', '杭州咖啡地图', 'coffee.html'],
          ['👨‍👩‍👧', '亲子咖啡馆攻略', '周末溜娃好去处', 'articles.html?q=%E5%92%AA%E5%92%95%E5%92%95'],
          ['🫖', '20 个茶空间', '茶馆文化深度体验', 'articles.html?q=%E8%8C%B6%E9%A6%86']
        ],
        kw: ['咖啡', '咖啡馆', '茶空间']
      },
      {
        k: 'yexiao', n: '夜宵夜市', ic: '🌃',
        d: '河坊街·武林',
        i: '河坊街、武林夜市、滨江星光——杭州夜宵地图与必吃摊位。',
        th: [
          ['🏮', '河坊街', 'articles.html?q=%E5%A4%9C%E5%B8%82'], ['🌃', '武林夜市', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['✨', '滨江星光', 'articles.html?q=%E5%A4%9C%E5%B8%82'], ['💧', '下沙', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['🏞️', '金沙湖', 'articles.html?q=%E5%A4%9C%E5%B8%82'], ['🌊', '新安江', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['🍢', '烧烤', 'articles.html?q=%E7%83%A7%E7%83%A7'], ['🍜', '夜宵面', 'articles.html?q=%E5%A4%9C%E5%B8%82']
        ],
        ft: [
          ['🌃', '杭州夜宵地图', '从西湖周边到夜市', 'articles.html?q=%E5%A4%9C%E5%B8%82'],
          ['🍜', '街头美食地图', '街巷美食与速食之趣', 'articles.html?q=%E8%A1%97%E5%A4%B4%E7%BE%8E%E9%A3%9F'],
          ['🌙', '现代夜经济', '从市井夜市到都市夜生活', 'articles.html?q=%E5%A4%9C%E7%BB%8F%E6%B5%8E']
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
          ['🛏️', '西湖精品酒店', '高端住宿体验', 'articles.html?q=%E9%85%92%E5%BA%97'],
          ['🏝️', '千岛湖度假', '烟花秀露营交通', 'articles.html?q=%E5%8D%83%E5%B2%9B%E6%B9%96']
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
];
