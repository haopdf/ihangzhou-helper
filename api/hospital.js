// 杭州三级医院目录 API (Vercel Serverless)
// 静态数据，包含杭州主要三甲及三级医院，含预约挂号入口
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800'); // 1天缓存
  res.status(200).json({
    updated: '2026-09-10',
    source: '杭州市卫健委 / 浙江预约挂号平台',
    regPlatform: 'https://zyygh.com/',
    hospitals: [
      {
        name: '浙江大学医学院附属第一医院',
        alias: '浙一 / 浙大一院',
        level: '三甲',
        area: '上城区',
        address: '庆春路79号（总部）+ 余杭院区（文一西路1367号）',
        phone: '0571-87236666',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['综合', '传染病', '肝胆胰']
      },
      {
        name: '浙江大学医学院附属第二医院',
        alias: '浙二 / 浙大二院',
        level: '三甲',
        area: '上城区',
        address: '解放路88号（解放路院区）+ 滨江区江虹路1511号（滨江院区）',
        phone: '0571-87783777',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['综合', '心脑血管', '急诊']
      },
      {
        name: '浙江大学医学院附属邵逸夫医院',
        alias: '邵逸夫医院',
        level: '三甲',
        area: '上城区',
        address: '庆春东路3号（庆春院区）+ 钱塘院区（下沙）',
        phone: '0571-86006666',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['综合', '微创', '腔镜']
      },
      {
        name: '浙江省人民医院',
        alias: '省人医',
        level: '三甲',
        area: '拱墅区',
        address: '上塘路158号（朝晖院区）+ 滨江区（望江山院区）',
        phone: '0571-87691888',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['综合', '器官移植']
      },
      {
        name: '杭州市第一人民医院',
        alias: '市一医院',
        level: '三甲',
        area: '上城区',
        address: '浣纱路261号',
        phone: '0571-87065701',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['综合', '产科', '儿科']
      },
      {
        name: '浙江大学医学院附属儿童医院',
        alias: '浙大儿保 / 省儿保',
        level: '三甲',
        area: '拱墅区',
        address: '竹竿巷57号（湖滨院区）+ 临安院区',
        phone: '0571-87062076',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['儿科', '新生儿']
      },
      {
        name: '浙江省中医院',
        alias: '省中',
        level: '三甲',
        area: '上城区',
        address: '邮电路54号（湖滨院区）+ 下沙院区',
        phone: '0571-87068000',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['中医', '中西医结合']
      },
      {
        name: '杭州市中医院',
        alias: '市中',
        level: '三甲',
        area: '拱墅区',
        address: '体育场路453号',
        phone: '0571-85827888',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['中医', '骨伤']
      },
      {
        name: '浙江省肿瘤医院',
        alias: '省肿瘤',
        level: '三甲',
        area: '临平区',
        address: '半山东路1号',
        phone: '0571-88122222',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['肿瘤', '放疗']
      },
      {
        name: '浙江大学医学院附属口腔医院',
        alias: '浙大口腔',
        level: '三甲',
        area: '上城区',
        address: '秋涛北路166号',
        phone: '0571-87217430',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['口腔']
      },
      {
        name: '杭州市妇产科医院',
        alias: '市妇产',
        level: '三级',
        area: '上城区',
        address: '鲲鹏路369号',
        phone: '0571-56005555',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['产科', '妇科']
      },
      {
        name: '杭州市儿童医院',
        alias: '市儿',
        level: '三级',
        area: '拱墅区',
        address: '文晖路195号',
        phone: '0571-85463337',
        regUrl: 'https://yygh.hz.zj.cn/',
        key: ['儿科']
      }
    ]
  });
};
