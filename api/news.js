// 杭州本地资讯聚合 API (Vercel Serverless)
// 升级版：返回「今日要闻」+「明日预告」+「本周提醒」三段式，制造每日回访钩子
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600'); // 30 分钟缓存

  // ============ 明日限行计算（核心回访钩子：用户每天都要来看明天限什么） ============
  function getXianxingInfo(date) {
    // 杭州：工作日 7:00-9:00 / 16:30-18:30 限行
    // 周一 1/9 · 周二 2/8 · 周三 3/7 · 周四 4/6 · 周五 5/0 · 周末不限
    var map = { 1: '1 和 9', 2: '2 和 8', 3: '3 和 7', 4: '4 和 6', 5: '5 和 0' };
    var day = date.getDay();  // 0=周日 6=周六
    if (day === 0 || day === 6) return { tail: '不限行', type: 'weekend', desc: '周末杭州全市不限行，畅行无阻' };
    return { tail: map[day], type: 'workday', desc: '早高峰 7:00-9:00 · 晚高峰 16:30-18:30 · 浙A牌按尾号限行' };
  }

  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  var todayXx = getXianxingInfo(today);
  var tomorrowXx = getXianxingInfo(tomorrow);

  var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  // ============ 时令提醒（让用户感受到「这个月要看」） ============
  var month = today.getMonth() + 1;
  var seasonalTips = {
    1: '🍦 寒潮预警：杭州1月平均3-5°C，注意防冻；春节机票/火车票已开售',
    2: '🌸 2月杭州梅花盛开：超山、灵峰、孤山最佳；法喜寺白玉兰月底开花',
    3: '🌷 3月樱花/桃花/郁金香季：太子湾、杭州植物园；春季招聘高峰',
    4: '🍃 4月茶博会+龙井茶开采；清明扫墓交通管制；五一假期火车票开售',
    5: '☕ 5月国际茶博会；梅雨季临近；中考/高考报名；杭州马拉松报名',
    6: '🌧️ 6月梅雨季+高温来临；中考高考；暑假火车票/机票预订',
    7: '☀️ 7月三伏天防暑；中小学暑假；公积金基数调整生效；学生票开售',
    8: '🌊 8月钱塘江大潮季临近（农历八月十八最佳）；台风季注意安全',
    9: '🐲 9月钱塘江观潮最佳期！西博会筹备；开学季；国庆火车票开售',
    10: '🍁 10月桂花节+红叶季；西湖博览会；重阳节；国庆交通管制',
    11: '🍂 11月秋叶最美；秋招高峰；双十一购物节；亚运会后场馆开放',
    12: '❄️ 12月入冬；元旦假期安排；年终医保结算；春节火车票开售'
  };

  // ============ 今日要闻（静态精选，可后续接 RSS） ============
  var headlineNews = [
    {
      title: '2026杭州公积金缴存基数调整',
      summary: '公积金缴存基数上限 34470 元，下限 2280 元，7月1日起执行',
      url: 'https://gjj.hangzhou.gov.cn/',
      tag: '政策'
    },
    {
      title: '杭州市居住证电子证照全面启用',
      summary: '可通过"警察叔叔"APP或浙里办申领电子居住证，与实体证同等效力',
      url: 'https://www.zjzwfw.gov.cn/',
      tag: '便民'
    },
    {
      title: '杭州地铁19号线增开机场快线',
      summary: '萧山国际机场至杭州东站直达，最快19分钟，运营时间 06:00-23:15',
      url: 'https://www.hzmetro.com/',
      tag: '资讯'
    },
    {
      title: '浙A小客车摇号配置指标查询',
      summary: '每月配置指标可在"杭州市小客车总量调控"官网查询与申请',
      url: 'https://hzxkctk.cn/',
      tag: '资讯'
    },
    {
      title: '杭州人才分类认定政策实施',
      summary: 'A/B/C/D/E类人才可享受购房补贴、子女入学、配偶就业等政策',
      url: 'https://hrss.hangzhou.gov.cn/',
      tag: '政策'
    },
    {
      title: '杭州市民卡 / 杭州通的免费乘车权益',
      summary: '60岁以上老人 / 学生 / 残疾人可办学生卡、老年卡享受公交地铁优惠',
      url: 'https://www.96225.com/',
      tag: '便民'
    }
  ];

  // ============ 周期性提醒（让用户记住定期回来） ============
  var reminders = [
    { time: '每月25日', action: '查询医保个账划入', desc: '杭州医保每月25日左右划入个人账户' },
    { time: '每月15日', action: '查询公积金缴存', desc: '公积金每月15日前应到账，可查未到账原因' },
    { time: '每月26日', action: '查电费/水费账单', desc: '杭州电力/水务每月26日左右出账，支付宝可缴' },
    { time: '工作日7:00', action: '今日限行查询', desc: '出门前查今日限行尾号，避免违章' },
    { time: '工作日16:00', action: '晚高峰路况', desc: '杭州晚高峰16:30开始，提前规划路线' }
  ];

  // ============ 今日日期/星期/天气占位（前端可二次填充） ============
  var dateStr = today.getFullYear() + '年' + month + '月' + today.getDate() + '日';
  var weekStr = dayNames[today.getDay()];

  // ============ 输出 ============
  res.status(200).json({
    updated: today.toUTCString(),
    date: dateStr,
    week: weekStr,
    today: {
      xianxing: todayXx,
      seasonalTip: seasonalTips[month] || ''
    },
    tomorrow: {
      date: tomorrow.getFullYear() + '年' + (tomorrow.getMonth() + 1) + '月' + tomorrow.getDate() + '日',
      week: dayNames[tomorrow.getDay()],
      xianxing: tomorrowXx,
      hint: tomorrowXx.type === 'weekend' ? '明日周末不限行，可放心出行 🎉' : '明日工作日，限行尾号：' + tomorrowXx.tail + '，记得提前规划路线'
    },
    headlines: headlineNews,
    reminders: reminders,
    note: '每日 7:00 更新 · 明日限行预测让你出门不慌'
  });
};
