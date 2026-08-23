/* ============================================
   iHangzhou 杭州生活助手 - 参考杭州本地宝结构
   10大分类 · 100+办事条目 · 数据全内联
   ============================================ */
(function () {
  'use strict';

  // ===== 内联数据 =====
  var DATA = {
    // 热门搜索关键词（对标本地宝热门搜索）
    hotKeywords: ["限行", "社保", "公积金", "灵隐寺", "消费券", "人才认定", "钱塘江大潮", "找工作", "公租房", "摇号", "西湖", "疫苗"],

    // 热门办事（顶部快捷入口）
    hotServices: [
      { name: "今日限行", icon: "🚗", desc: "尾号限行查询", action: "xianxing", color: "#ef4444" },
      { name: "消费券", icon: "🎫", desc: "杭州消费券领取", url: "https://m.hz.bendibao.com/youhui/", color: "#f59e0b" },
      { name: "找工作", icon: "💼", desc: "事业单位/国企", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
      { name: "公积金", icon: "🏠", desc: "查询/提取/贷款", url: "https://gjj.hangzhou.gov.cn/", color: "#10b981" },
      { name: "浙A摇号", icon: "🚘", desc: "车牌摇号申请", url: "https://xkctk.hzcb.gov.cn/", color: "#ef4444" },
      { name: "发票抽奖", icon: "🧾", desc: "杭州发票抽奖", url: "https://www.hangzhou.gov.cn/col/col1229151238/index.html", color: "#8b5cf6" },
      { name: "人才认定", icon: "🎓", desc: "高层次人才申请", url: "https://hrss.hangzhou.gov.cn/", color: "#06b6d4" },
      { name: "景区门票", icon: "🎢", desc: "优惠门票预订", url: "https://m.hz.bendibao.com/youhui/jingdianmenpiao/", color: "#ec4899" }
    ],

    // 10大分类（模仿本地宝频道结构）
    categories: [
      {
        id: "banshi", name: "办事指南", icon: "🏛️",
        items: [
          { name: "杭州社保", desc: "查询/缴费/转移", url: "https://m.hz.bendibao.com/live/shebao/" },
          { name: "杭州公积金", desc: "查询/提取/贷款", url: "https://gjj.hangzhou.gov.cn/" },
          { name: "杭州户口", desc: "人才落户/积分落户", url: "https://m.hz.bendibao.com/live/hukou/" },
          { name: "居住证办理", desc: "居住登记/居住证申领", url: "https://www.zjzwfw.gov.cn/" },
          { name: "社保转移", desc: "跨省转移/年限计算", url: "https://www.zjzwfw.gov.cn/" },
          { name: "公积金提取", desc: "租房/购房/离职提取", url: "https://gjj.hangzhou.gov.cn/" },
          { name: "人才认定", desc: "高层次人才分类认定", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "出入境预约", desc: "护照/港澳通行证办理", url: "https://s.nia.gov.cn/" },
          { name: "市民卡服务", desc: "市民卡/公园年卡办理", url: "https://www.96225.com/" },
          { name: "健康证办理", desc: "从业人员健康证", url: "https://wsjkw.hangzhou.gov.cn/" },
          { name: "营业执照", desc: "企业开办/变更", url: "https://www.zjzwfw.gov.cn/" },
          { name: "工资计算", desc: "个税/工资计算器", action: "tax" },
          { name: "市长热线", desc: "12345政务服务热线", action: "phonebook" },
          { name: "浙里办", desc: "全省政务一网通办", url: "https://www.zjzwfw.gov.cn/" },
          { name: "发票抽奖", desc: "杭州发票抽奖登记", url: "https://www.hangzhou.gov.cn/col/col1229151238/index.html" },
          { name: "各类补贴", desc: "人才/就业/租房补贴申请", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "学历认证", desc: "学信网验证", url: "https://www.chsi.com.cn/" },
          { name: "保障房", desc: "公租房/人才房申请", url: "https://m.hz.bendibao.com/live/baozhangfang/" }
        ]
      },
      {
        id: "traffic", name: "交通出行", icon: "🗺️",
        items: [
          { name: "今日限行", desc: "工作日尾号限行", action: "xianxing" },
          { name: "外地车免限行", desc: "非浙A限行规定/豁免", url: "https://zzy.hzpolice.gov.cn/" },
          { name: "地铁线路", desc: "运营时间/票价/换乘", url: "https://www.hzmetro.com/" },
          { name: "公交查询", desc: "线路/实时到站", url: "https://www.hzbus.com.cn/" },
          { name: "水上巴士", desc: "时刻表+票价", url: "https://www.hzbus.com.cn/" },
          { name: "公共自行车", desc: "小红车租还点位", url: "https://www.hzbus.com.cn/" },
          { name: "火车高铁", desc: "12306购票/正晚点", url: "https://www.12306.cn/" },
          { name: "萧山机场", desc: "乘机攻略/航班", url: "https://www.hzairport.com/" },
          { name: "特价机票", desc: "折扣机票购买", url: "https://www.ctrip.com/" },
          { name: "客运汽车", desc: "长途汽车购票", url: "https://www.8684.cn/hz" },
          { name: "浙江ETC", desc: "ETC办理/充值", url: "https://www.zjetc.cn/" },
          { name: "打车顺风车", desc: "网约车/顺风车", url: "https://www.didiglobal.com/" },
          { name: "电动车租赁", desc: "共享电动车", url: "https://www.mobike.com/" },
          { name: "春运出行", desc: "春运购票/出行攻略", url: "https://www.12306.cn/" },
          { name: "油价查询", desc: "今日成品油价格", action: "youjia" },
          { name: "杭州天气", desc: "实时天气/预报", action: "weather" }
        ]
      },
      {
        id: "vehicle", name: "车辆服务", icon: "🚘",
        items: [
          { name: "浙A车牌摇号", desc: "小客车指标申请", url: "https://xkctk.hzcb.gov.cn/" },
          { name: "浙M号牌", desc: "区域指标申请", url: "https://xkctk.hzcb.gov.cn/" },
          { name: "违章查询", desc: "交通违法处理", url: "https://zj.122.gov.cn/" },
          { name: "车辆年检", desc: "年检时间/地点查询", url: "https://zj.122.gov.cn/" },
          { name: "驾驶证业务", desc: "换证/补证/审验", url: "https://zj.122.gov.cn/" },
          { name: "驾照学分", desc: "学法减分系统", url: "https://zj.122.gov.cn/" },
          { name: "停车包月", desc: "小区/道路停车包月", url: "https://www.hzttx.cn/", color: "#6b7280" },
          { name: "停车场查询", desc: "市区停车诱导", url: "https://www.hzttx.cn/", color: "#6b7280" },
          { name: "网约车", desc: "网约车从业资格", url: "https://gaj.hangzhou.gov.cn/" },
          { name: "车管所", desc: "车辆/驾驶证综合业务", url: "https://zj.122.gov.cn/" },
          { name: "新能源车牌", desc: "绿牌申请/政策", url: "https://xkctk.hzcb.gov.cn/" },
          { name: "二手车过户", desc: "二手车交易/过户", url: "https://zj.122.gov.cn/" }
        ]
      },
      {
        id: "life", name: "民生服务", icon: "🛍️",
        items: [
          { name: "杭州消费券", desc: "领取/使用指南", url: "https://www.hangzhou.gov.cn/col/col1229013850/index.html" },
          { name: "发票抽奖", desc: "消费发票抽奖登记", url: "https://fpjj.hangzhou.gov.cn/" },
          { name: "每日薅羊毛", desc: "优惠/折扣汇总", url: "https://www.hangzhou.gov.cn/col/col1229013850/index.html" },
          { name: "水费缴纳", desc: "杭州水务", url: "https://www.hzwater.com.cn/" },
          { name: "电费缴纳", desc: "国家电网", url: "https://www.95598.cn/" },
          { name: "燃气缴费", desc: "杭州燃气", url: "https://www.hzgas.com.cn/" },
          { name: "宽带办理", desc: "移动/联通/电信", url: "https://www.10086.cn/" },
          { name: "医院挂号", desc: "浙江预约挂号平台", url: "https://www.zj12580.cn/" },
          { name: "疫苗接种", desc: "疫苗预约/接种点", url: "https://wsjkw.hangzhou.gov.cn/" },
          { name: "带状疱疹疫苗", desc: "缠腰龙疫苗预约", url: "https://wsjkw.hangzhou.gov.cn/" },
          { name: "药店查询", desc: "定点零售药店", url: "https://wsjkw.hangzhou.gov.cn/" },
          { name: "公园年卡", desc: "市民卡公园年卡", url: "https://www.96225.com/" },
          { name: "金价查询", desc: "今日黄金价格", action: "youjia" },
          { name: "二手房查询", desc: "房源/价格查询", url: "https://hz.lianjia.com/" },
          { name: "母婴室查询", desc: "公共场所母婴室地图", url: "https://wsjkw.hangzhou.gov.cn/" },
          { name: "重名查询", desc: "同名同姓人数查询", url: "https://zzy.hzpolice.gov.cn/" },
          { name: "免费避孕药具", desc: "在线申领", url: "https://wsjkw.hangzhou.gov.cn/" },
          { name: "快递查询", desc: "全网物流追踪", url: "https://www.kuaidi100.com/" },
          { name: "家政服务", desc: "保洁/维修/搬家", url: "https://www.51jz.cn/" },
          { name: "电影查询", desc: "杭州影院/排片", url: "https://www.mtime.com/" },
          { name: "福利彩票", desc: "双色球/大乐透", url: "https://www.cwl.gov.cn/" },
          { name: "体育彩票", desc: "竞彩/排三排五", url: "https://www.lottery.gov.cn/" }
        ]
      },
      {
        id: "edu", name: "教育办事", icon: "📚",
        items: [
          { name: "开学攻略", desc: "中小学开学时间/准备", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "幼儿园入园", desc: "报名时间/材料/流程", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "小学入学", desc: "报名/学区划分", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "小升初", desc: "升学政策/流程", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "杭州中考", desc: "报名/考试/录取", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "浙江高考", desc: "报名/志愿/录取", url: "https://www.zjzs.net/" },
          { name: "浙江考研", desc: "报名/考试/成绩", url: "https://www.zjzs.net/" },
          { name: "浙江专升本", desc: "报名/考试/录取", url: "https://www.zjzs.net/" },
          { name: "学考成绩", desc: "学业水平考试查询", url: "https://www.zjzs.net/" },
          { name: "查学区划分", desc: "最新学区划分查询", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "学校名单", desc: "幼儿园至高校名单", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "普通话考试", desc: "报名/成绩查询", url: "https://www.cltt.org/" },
          { name: "夜校培训", desc: "课程报名/费用", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "免费培训考证", desc: "技能培训+补贴", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "成人学历", desc: "成人高考/自考", url: "https://www.zjzs.net/" }
        ]
      },
      {
        id: "job", name: "找工作", icon: "💼",
        items: [
          { name: "今日招聘", desc: "最新招聘信息（日更）", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "事业单位招聘", desc: "编制内岗位", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "国企招聘", desc: "国有企业岗位", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "政府机关招聘", desc: "公务员/编外", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "学校招聘", desc: "教师/教职工", url: "https://jyj.hangzhou.gov.cn/" },
          { name: "医院招聘", desc: "医生/护士/行政", url: "https://wsjkw.hangzhou.gov.cn/" },
          { name: "大厂招聘", desc: "互联网/科技企业", url: "https://www.lagou.com/hangzhou/" },
          { name: "校园招聘", desc: "校园招聘信息", url: "https://www.zhaopin.com/" },
          { name: "兼职信息", desc: "兼职/临时工", url: "https://www.zhaopin.com/" },
          { name: "低门槛岗位", desc: "学历要求低的岗位", url: "https://www.zhaopin.com/" },
          { name: "AI岗位", desc: "人工智能相关岗位", url: "https://www.lagou.com/ai/" },
          { name: "研发岗", desc: "技术研发岗位", url: "https://www.lagou.com/tech/" },
          { name: "残疾人招聘", desc: "残疾人专属岗位", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "招聘会", desc: "现场招聘会信息", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "求职补贴", desc: "求职/就业补贴", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "简历模板", desc: "免费简历模板", url: "https://www.officeplus.cn/" },
          { name: "浙江省考", desc: "公务员考试", url: "https://gwyty.jxpta.com/" },
          { name: "国家公务员", desc: "国考报名/成绩", url: "https://bm.scs.gov.cn/" }
        ]
      },
      {
        id: "housing", name: "住房保障", icon: "🏠",
        items: [
          { name: "公租房申请", desc: "申请条件/流程", url: "https://fgj.hangzhou.gov.cn/" },
          { name: "公租房选房", desc: "实物配租选房指南", url: "https://fgj.hangzhou.gov.cn/" },
          { name: "人才房", desc: "人才专项租赁住房", url: "https://fgj.hangzhou.gov.cn/" },
          { name: "保障性租赁住房", desc: "保租房申请", url: "https://fgj.hangzhou.gov.cn/" },
          { name: "租房攻略", desc: "各区县租房指南", url: "https://hz.lianjia.com/zufang/" },
          { name: "买房指南", desc: "购房资格/流程", url: "https://fgj.hangzhou.gov.cn/" },
          { name: "二手房", desc: "房源/价格/过户", url: "https://hz.lianjia.com/" },
          { name: "房贷计算", desc: "等额本息/本金", action: "loan" },
          { name: "公积金贷款", desc: "贷款额度/利率", url: "https://gjj.hangzhou.gov.cn/" },
          { name: "房产证办理", desc: "不动产登记", url: "https://fgj.hangzhou.gov.cn/" },
          { name: "杭州免费住", desc: "青年人才驿站", url: "https://hrss.hangzhou.gov.cn/" }
        ]
      },
      {
        id: "travel", name: "旅游休闲", icon: "🏞️",
        items: [
          { name: "西湖景区", desc: "景点/游船/预约", url: "https://whol.mztrip.com/", color: "#6b7280" },
          { name: "灵隐寺", desc: "门票免费预约", url: "https://www.lingyinsi.org.cn/" },
          { name: "景点预约", desc: "杭州各景点预约入口", url: "https://www.hangzhou.gov.cn/col/col1229013854/index.html" },
          { name: "钱塘江大潮", desc: "观潮时间表/地点", url: "https://www.gongshumeiti.com/" },
          { name: "西溪湿地", desc: "门票/游船", url: "https://www.xixiwetland.com.cn/" },
          { name: "千岛湖", desc: "景区/游船/住宿", url: "https://www.qiandaohu.cn/" },
          { name: "宋城演艺", desc: "千古情演出", url: "https://www.songcn.com/" },
          { name: "杭州博物馆", desc: "免费预约参观", url: "https://www.hzmuseum.cn/" },
          { name: "中国茶叶博物馆", desc: "免预约入馆", url: "https://www.teamuseum.cn/" },
          { name: "演唱会时间表", desc: "近期演唱会信息", url: "https://www.damai.cn/" },
          { name: "体育赛事", desc: "马拉松/篮球联赛等", url: "https://tyj.hangzhou.gov.cn/" },
          { name: "杭州马拉松", desc: "报名/路线/指南", url: "https://www.hangzhoumarathon.com/" },
          { name: "赏花攻略", desc: "四季赏花地点", url: "https://whol.mztrip.com/" },
          { name: "水果采摘", desc: "采摘园推荐", url: "https://www.hangzhou.gov.cn/col/col1229013854/index.html" },
          { name: "一日游攻略", desc: "杭州一日游路线", url: "https://whol.mztrip.com/" },
          { name: "杭州美食", desc: "杭帮菜/小吃推荐", url: "https://www.dianping.com/hangzhou/" },
          { name: "龙井茶", desc: "产地/购买/品鉴", url: "https://www.ljcy.gov.cn/" },
          { name: "元宵节攻略", desc: "灯会/活动/交通", url: "https://whol.mztrip.com/" },
          { name: "七夕攻略", desc: "约会/活动/礼物", url: "https://whol.mztrip.com/" },
          { name: "露营推荐", desc: "露营地点/装备", url: "https://whol.mztrip.com/" },
          { name: "爬山攻略", desc: "杭州登山路线", url: "https://whol.mztrip.com/" },
          { name: "亲子游", desc: "亲子游玩去处", url: "https://whol.mztrip.com/" },
          { name: "免费游", desc: "免费景点/开放日", url: "https://whol.mztrip.com/" },
          { name: "浙BA篮球联赛", desc: "城市篮球联赛", url: "https://tyj.hangzhou.gov.cn/" }
        ]
      },
      {
        id: "tool", name: "实用工具", icon: "🛠️",
        items: [
          { name: "限行查询", desc: "今日尾号限行", action: "xianxing" },
          { name: "个税计算", desc: "工资个税计算器", action: "tax" },
          { name: "房贷计算", desc: "月供/利息计算", action: "loan" },
          { name: "社保计算", desc: "缴费比例/金额", action: "sbcalc" },
          { name: "万年历", desc: "农历/节气/黄历", action: "calendar" },
          { name: "杭州天气", desc: "实时天气/预报", action: "weather" },
          { name: "油价查询", desc: "今日成品油价格", action: "youjia" },
          { name: "常用电话", desc: "应急/政务/服务热线", action: "phonebook" },
          { name: "邮政编码", desc: "杭州各区县邮编", action: "postcode" },
          { name: "行政区划", desc: "区县/街道信息", action: "district" },
          { name: "快递查询", desc: "全网物流追踪", url: "https://www.kuaidi100.com/" },
          { name: "医院挂号", desc: "浙江预约挂号", url: "https://www.zj12580.cn/" },
          { name: "电影查询", desc: "杭州影院/排片", url: "https://www.mtime.com/" },
          { name: "福利彩票", desc: "双色球/大乐透", url: "https://www.cwl.gov.cn/" },
          { name: "体育彩票", desc: "竞彩/排三排五", url: "https://www.lottery.gov.cn/" },
{ name: "身份证号码", desc: "身份证号校验", action: "idcheck" },
{ name: "车牌归属", desc: "车牌号归属地查询", action: "platecheck" },
{ name: "BMI计算", desc: "体质指数健康评估", action: "bmi" },
{ name: "日期计算", desc: "天数/工作日计算", action: "datecalc" },
{ name: "汇率换算", desc: "实时汇率转换", action: "exchange" },
{ name: "长度转换", desc: "米/厘米/英寸换算", action: "lengthconv" },
{ name: "重量转换", desc: "公斤/斤/磅换算", action: "weightconv" },
{ name: "面积转换", desc: "平方米/亩/公顷", action: "areaconv" },
{ name: "温度转换", desc: "摄氏度/华氏度", action: "tempconv" },
{ name: "时间转换", desc: "北京时间/UTC", action: "timezone" },
{ name: "密码生成", desc: "随机安全密码", action: "password" },
{ name: "UUID生成", desc: "唯一标识符生成", action: "uuidgen" },
{ name: "二维码", desc: "生成/解析二维码", action: "qrcode" },
{ name: "Base64", desc: "编码/解码工具", action: "base64" },
{ name: "JSON格式化", desc: "JSON美化/压缩", action: "jsonfmt" },
{ name: "文字统计", desc: "字数/字符统计", action: "textcount" },
{ name: "颜色转换", desc: "HEX/RGB/HSL互转", action: "colorconv" },
{ name: "房贷对比", desc: "等额本息/本金对比", action: "loancmp" },
{ name: "年龄计算", desc: "精确年龄/生肖", action: "agecalc" },
{ name: "倒计时", desc: "距离目标日期", action: "countdown" },
          { name: "数字金额", desc: "大写金额转换", action: "rmbconv" },
          { name: "色值选择", desc: "杭州主题配色", action: "colors" }
        ]
      },
      {
        id: "youhui", name: "优惠特惠", icon: "🎫",
        items: [
          { name: "消费券领取", desc: "杭州消费券/满减券", url: "https://m.hz.bendibao.com/youhui/" },
          { name: "饿了么红包", desc: "外卖红包最高减15元", url: "https://m.hz.bendibao.com/youhui/detail21957.htm" },
          { name: "美团红包", desc: "10-18元大额红包", url: "https://m.hz.bendibao.com/youhui/detail22212.htm" },
          { name: "景区门票", desc: "优惠门票预订", url: "https://m.hz.bendibao.com/youhui/jingdianmenpiao/" },
          { name: "餐饮团购", desc: "美食优惠券", url: "https://m.hz.bendibao.com/youhui/meishituangou/" },
          { name: "购物优惠", desc: "超市/商场折扣", url: "https://m.hz.bendibao.com/youhui/shangchanggouwu/" },
          { name: "出行优惠", desc: "交通出行优惠券", url: "https://m.hz.bendibao.com/youhui/chuxing/" },
          { name: "生活服务", desc: "家政/维修优惠券", url: "https://m.hz.bendibao.com/youhui/shenghuo/" },
          { name: "补贴申领", desc: "各类政府补贴", url: "https://m.hz.bendibao.com/youhui/butie/" },
          { name: "发票抽奖", desc: "杭州发票抽奖登记", url: "https://www.hangzhou.gov.cn/col/col1229151238/index.html" },
          { name: "梵高星空艺术馆", desc: "成人票29.9元", url: "https://m.hz.bendibao.com/youhui/detail20230.htm" },
          { name: "径山花海", desc: "成人票60元(原价98)", url: "https://m.hz.bendibao.com/youhui/detail9520.htm" },
          { name: "杭州虎跑公园", desc: "成人票15元", url: "https://m.hz.bendibao.com/youhui/detail5727.htm" },
          { name: "云栖竹径", desc: "票价8元", url: "https://m.hz.bendibao.com/youhui/detail7122.htm" },
          { name: "开元森泊", desc: "水乐园门票195元起", url: "https://m.hz.bendibao.com/youhui/detail18412.htm" },
          { name: "灵栖洞", desc: "门票75元(原价85)", url: "https://m.hz.bendibao.com/youhui/detail5432.htm" },
          { name: "胡雪岩故居", desc: "成人票10元起", url: "https://m.hz.bendibao.com/youhui/detail17782.htm" },
          { name: "杭州宋城", desc: "千古情演出118元", url: "https://m.hz.bendibao.com/youhui/detail20929.htm" },
          { name: "钱塘江夜游", desc: "游船票98元", url: "https://m.hz.bendibao.com/youhui/detail21671.htm" },
          { name: "野生动物世界", desc: "优待票140元", url: "https://m.hz.bendibao.com/youhui/detail17808.htm" },
          { name: "大明山景区", desc: "门票25元", url: "https://m.hz.bendibao.com/youhui/detail4489.htm" },
          { name: "京东优惠券", desc: "1元起产品券", url: "https://m.hz.bendibao.com/youhui/detail22601.htm" },
          { name: "美团酒店券", desc: "酒店满减券", url: "https://m.hz.bendibao.com/youhui/detail22598.htm" }
        ]
      }
    ],

    // 常用电话
    phonebook: [
      { name: "报警电话", number: "110", category: "应急" },
      { name: "火警电话", number: "119", category: "应急" },
      { name: "急救中心", number: "120", category: "应急" },
      { name: "交通事故", number: "122", category: "应急" },
      { name: "供电抢修", number: "95598", category: "公用事业" },
      { name: "燃气抢修", number: "967266", category: "公用事业" },
      { name: "水务热线", number: "96055", category: "公用事业" },
      { name: "市民卡服务", number: "96225", category: "政务服务" },
      { name: "社保咨询", number: "12333", category: "政务服务" },
      { name: "公积金热线", number: "12329", category: "政务服务" },
      { name: "政务热线", number: "12345", category: "政务服务" },
      { name: "公交热线", number: "85191122", category: "交通" },
      { name: "地铁服务", number: "26311111", category: "交通" },
      { name: "萧山机场", number: "96299", category: "交通" },
      { name: "出租车投诉", number: "12328", category: "交通" },
      { name: "消费投诉", number: "12315", category: "维权" },
      { name: "环保投诉", number: "12369", category: "维权" },
      { name: "城管热线", number: "12319", category: "维权" },
      { name: "杭州电视台", number: "89912345", category: "媒体" },
      { name: "杭州日报", number: "85051111", category: "媒体" }
    ],

    // 邮编
    postcodes: [
      { district: "上城区", code: "310000" },
      { district: "拱墅区", code: "310000" },
      { district: "西湖区", code: "310000" },
      { district: "滨江区", code: "310051" },
      { district: "萧山区", code: "311200" },
      { district: "余杭区", code: "311100" },
      { district: "临平区", code: "311100" },
      { district: "钱塘区", code: "310018" },
      { district: "富阳区", code: "311400" },
      { district: "临安区", code: "311300" },
      { district: "桐庐县", code: "311500" },
      { district: "淳安县", code: "311700" },
      { district: "建德市", code: "311600" }
    ],

    // 限行规则
    xianxingRule: {
      rules: [
        { day: "周一", tail: "1和9" },
        { day: "周二", tail: "2和8" },
        { day: "周三", tail: "3和7" },
        { day: "周四", tail: "4和6" },
        { day: "周五", tail: "5和0" },
        { day: "周六", tail: "不限行" },
        { day: "周日", tail: "不限行" }
      ],
      area: "留祥路—石祥路—石桥路—秋涛路—复兴路—老复兴路—虎跑路—满觉陇路—五老峰隧道—吉庆山隧道—梅灵北路—九里松隧道—灵溪南路—灵溪隧道—西溪路—紫金港路—文一西路—古墩路围合区域（含边界道路）"
    }
  };

  // ===== 状态 =====
  var state = {
    activeTab: 'gov',
    theme: localStorage.getItem('ihz-theme') || 'light',
    searchQuery: '',
    currentPage: 'home'
  };

  // ===== 工具函数 =====
  function $(s) { return document.querySelector(s); }
  function $$(s) { return document.querySelectorAll(s); }

  function showToast(msg) {
    var t = $('#toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.classList.remove('show'); }, 2000);
  }

  function copyText(text, name) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('已复制' + name + '：' + text);
      }).catch(function () { fallbackCopy(text, name); });
    } else {
      fallbackCopy(text, name);
    }
  }

  function fallbackCopy(text, name) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('已复制' + name + '：' + text); }
    catch (e) { showToast('复制失败，请长按号码复制'); }
    document.body.removeChild(ta);
  }

  window._copyPhone = function (num, name) { copyText(num, name); };

  // ===== 主题 =====
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = $('#themeBtn');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ihz-theme', state.theme);
    applyTheme(state.theme);
  }

  // ===== 渲染 =====
  function renderHotServices() {
    var grid = $('#hotGrid');
    if (!grid) return;
    grid.innerHTML = DATA.hotServices.map(function (s) {
      return '<div class="hot-card" data-action="' + (s.action || '') + '" data-url="' + (s.url || '') + '" style="--hc:' + s.color + '">' +
        '<div class="hot-icon">' + s.icon + '</div>' +
        '<div class="hot-name">' + s.name + '</div>' +
        '</div>';
    }).join('');
  }

  function renderHotKeywords() {
    var container = $('#hotKeywords');
    if (!container) return;
    container.innerHTML = DATA.hotKeywords.map(function (kw) {
      return '<span class="hk-tag" data-kw="' + kw + '">' + kw + '</span>';
    }).join('');
  }

  function renderTabs() {
    var tabs = $('#tabs');
    if (!tabs) return;
    tabs.innerHTML = DATA.categories.map(function (cat) {
      return '<div class="tab ' + (cat.id === state.activeTab ? 'active' : '') + '" data-tab="' + cat.id + '">' +
        cat.icon + ' ' + cat.name + '</div>';
    }).join('');
  }

  function renderServices(tabId) {
    var grid = $('#serviceGrid');
    if (!grid) return;
    var category = null;
    for (var i = 0; i < DATA.categories.length; i++) {
      if (DATA.categories[i].id === tabId) { category = DATA.categories[i]; break; }
    }
    if (!category) return;

    var items = category.items;
    if (state.searchQuery) {
      var q = state.searchQuery.toLowerCase();
      items = items.filter(function (item) {
        return item.name.toLowerCase().indexOf(q) >= 0 || item.desc.toLowerCase().indexOf(q) >= 0;
      });
    }

    if (items.length === 0) {
      grid.innerHTML = '<div class="empty"><div class="eicon">🔍</div><p>没有找到相关服务</p></div>';
      return;
    }

    grid.innerHTML = items.map(function (item) {
      return '<div class="sitem" data-action="' + (item.action || '') + '" data-url="' + (item.url || '') + '">' +
        '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
        '<div class="sinfo">' +
        '<div class="sname">' + item.name + '</div>' +
        '<div class="sdesc">' + item.desc + '</div>' +
        '</div>' +
        '<div class="sarrow">›</div>' +
        '</div>';
    }).join('');
  }

  function getServiceIcon(name) {
    if (name.indexOf('身份证') >= 0 || name.indexOf('居住') >= 0 || name.indexOf('落户') >= 0) return '🪪';
    if (name.indexOf('人才') >= 0) return '🎓';
    if (name.indexOf('社保') >= 0 || name.indexOf('医保') >= 0) return '🏥';
    if (name.indexOf('公积金') >= 0) return '🏠';
    if (name.indexOf('出入境') >= 0 || name.indexOf('护照') >= 0) return '🛂';
    if (name.indexOf('市民卡') >= 0) return '💳';
    if (name.indexOf('健康证') >= 0 || name.indexOf('疫苗') >= 0) return '💉';
    if (name.indexOf('营业') >= 0 || name.indexOf('企业') >= 0) return '📋';
    if (name.indexOf('结婚') >= 0 || name.indexOf('生育') >= 0) return '👶';
    if (name.indexOf('工资') >= 0 || name.indexOf('个税') >= 0) return '💰';
    if (name.indexOf('限行') >= 0 || name.indexOf('违章') >= 0) return '🚦';
    if (name.indexOf('地铁') >= 0) return '🚇';
    if (name.indexOf('公交') >= 0) return '🚌';
    if (name.indexOf('水上巴士') >= 0) return '⛴️';
    if (name.indexOf('自行车') >= 0) return '🚲';
    if (name.indexOf('火车') >= 0 || name.indexOf('高铁') >= 0) return '🚄';
    if (name.indexOf('机场') >= 0 || name.indexOf('机票') >= 0) return '✈️';
    if (name.indexOf('客运') >= 0) return '🚌';
    if (name.indexOf('ETC') >= 0) return '📡';
    if (name.indexOf('打车') >= 0 || name.indexOf('网约车') >= 0) return '🚕';
    if (name.indexOf('电动车') >= 0) return '🛵';
    if (name.indexOf('油价') >= 0 || name.indexOf('加油') >= 0) return '⛽';
    if (name.indexOf('天气') >= 0) return '🌤️';
    if (name.indexOf('浙A') >= 0 || name.indexOf('摇号') >= 0 || name.indexOf('车牌') >= 0) return '🚘';
    if (name.indexOf('浙M') >= 0 || name.indexOf('区域指标') >= 0) return '🚗';
    if (name.indexOf('年检') >= 0) return '🔍';
    if (name.indexOf('驾驶证') >= 0 || name.indexOf('驾照') >= 0) return '📄';
    if (name.indexOf('停车') >= 0) return '🅿️';
    if (name.indexOf('新能源') >= 0) return '🔋';
    if (name.indexOf('二手车') >= 0) return '🚙';
    if (name.indexOf('消费券') >= 0) return '🎫';
    if (name.indexOf('水费') >= 0 || name.indexOf('水务') >= 0) return '💧';
    if (name.indexOf('电费') >= 0 || name.indexOf('电网') >= 0) return '⚡';
    if (name.indexOf('燃气') >= 0) return '🔥';
    if (name.indexOf('宽带') >= 0) return '📶';
    if (name.indexOf('医院') >= 0 || name.indexOf('挂号') >= 0) return '🏥';
    if (name.indexOf('药店') >= 0) return '💊';
    if (name.indexOf('公园年卡') >= 0) return '🌳';
    if (name.indexOf('金价') >= 0) return '🥇';
    if (name.indexOf('母婴') >= 0) return '🍼';
    if (name.indexOf('重名') >= 0) return '👥';
    if (name.indexOf('快递') >= 0) return '📦';
    if (name.indexOf('开学') >= 0 || name.indexOf('入学') >= 0 || name.indexOf('升学') >= 0) return '🎒';
    if (name.indexOf('幼儿园') >= 0) return '🧒';
    if (name.indexOf('小学') >= 0 || name.indexOf('小升初') >= 0) return '📖';
    if (name.indexOf('中考') >= 0) return '📝';
    if (name.indexOf('高考') >= 0) return '🎓';
    if (name.indexOf('考研') >= 0 || name.indexOf('专升本') >= 0) return '📚';
    if (name.indexOf('学考') >= 0) return '📋';
    if (name.indexOf('学区') >= 0) return '🗺️';
    if (name.indexOf('学校名单') >= 0) return '🏫';
    if (name.indexOf('普通话') >= 0) return '🗣️';
    if (name.indexOf('夜校') >= 0 || name.indexOf('培训') >= 0 || name.indexOf('考证') >= 0) return '📖';
    if (name.indexOf('成人学历') >= 0) return '🎓';
    if (name.indexOf('招聘') >= 0 || name.indexOf('找工作') >= 0 || name.indexOf('岗位') >= 0) return '💼';
    if (name.indexOf('事业单位') >= 0) return '🏛️';
    if (name.indexOf('国企') >= 0) return '🏢';
    if (name.indexOf('政府') >= 0 || name.indexOf('公务员') >= 0 || name.indexOf('省考') >= 0 || name.indexOf('国考') >= 0) return '📋';
    if (name.indexOf('校招') >= 0) return '🎓';
    if (name.indexOf('兼职') >= 0) return '⏰';
    if (name.indexOf('AI') >= 0 || name.indexOf('研发') >= 0) return '💻';
    if (name.indexOf('残疾人') >= 0) return '♿';
    if (name.indexOf('招聘会') >= 0) return '👥';
    if (name.indexOf('简历') >= 0) return '📄';
    if (name.indexOf('公租房') >= 0 || name.indexOf('保障房') >= 0 || name.indexOf('人才房') >= 0) return '🏠';
    if (name.indexOf('租房') >= 0) return '🔑';
    if (name.indexOf('买房') >= 0 || name.indexOf('购房') >= 0) return '🏡';
    if (name.indexOf('房贷') >= 0) return '🏦';
    if (name.indexOf('房产证') >= 0 || name.indexOf('不动产') >= 0) return '📜';
    if (name.indexOf('免费住') >= 0 || name.indexOf('驿站') >= 0) return '🛏️';
    if (name.indexOf('西湖') >= 0 || name.indexOf('景区') >= 0 || name.indexOf('景点') >= 0) return '🏞️';
    if (name.indexOf('灵隐') >= 0 || name.indexOf('寺') >= 0) return '⛩️';
    if (name.indexOf('钱塘江') >= 0 || name.indexOf('大潮') >= 0 || name.indexOf('观潮') >= 0) return '🌊';
    if (name.indexOf('西溪') >= 0 || name.indexOf('湿地') >= 0) return '🌿';
    if (name.indexOf('千岛') >= 0) return '🏝️';
    if (name.indexOf('宋城') >= 0 || name.indexOf('演艺') >= 0) return '🎭';
    if (name.indexOf('博物馆') >= 0 || name.indexOf('茶叶') >= 0) return '🏛️';
    if (name.indexOf('演唱会') >= 0) return '🎤';
    if (name.indexOf('体育') >= 0 || name.indexOf('马拉松') >= 0 || name.indexOf('赛事') >= 0) return '🏃';
    if (name.indexOf('赏花') >= 0) return '🌸';
    if (name.indexOf('采摘') >= 0) return '🍎';
    if (name.indexOf('一日游') >= 0 || name.indexOf('旅游') >= 0) return '🧳';
    if (name.indexOf('美食') >= 0 || name.indexOf('杭帮') >= 0) return '🍜';
    if (name.indexOf('龙井') >= 0 || name.indexOf('茶') >= 0) return '🍵';
    if (name.indexOf('电话') >= 0) return '📞';
    if (name.indexOf('邮编') >= 0) return '📮';
    if (name.indexOf('行政') >= 0) return '🗺️';
    if (name.indexOf('万年历') >= 0 || name.indexOf('日历') >= 0) return '📅';
    if (name.indexOf('社保计算') >= 0) return '🧮';
    return '📌';
  }

  function globalSearch(query) {
    state.searchQuery = query.trim();
    if (!state.searchQuery) { renderServices(state.activeTab); return; }

    var q = state.searchQuery.toLowerCase();
    var results = [];
    DATA.categories.forEach(function (cat) {
      cat.items.forEach(function (item) {
        if (item.name.toLowerCase().indexOf(q) >= 0 || item.desc.toLowerCase().indexOf(q) >= 0) {
          results.push({ item: item, cat: cat.name });
        }
      });
    });

    var grid = $('#serviceGrid');
    if (results.length === 0) {
      grid.innerHTML = '<div class="empty"><div class="eicon">🔍</div><p>没有找到"' + state.searchQuery + '"相关服务</p></div>';
      return;
    }
    grid.innerHTML = results.map(function (r) {
      return '<div class="sitem" data-action="' + (r.item.action || '') + '" data-url="' + (r.item.url || '') + '">' +
        '<div class="sicon">' + getServiceIcon(r.item.name) + '</div>' +
        '<div class="sinfo">' +
        '<div class="sname">' + r.item.name + ' <span class="scat">[' + r.cat + ']</span></div>' +
        '<div class="sdesc">' + r.item.desc + '</div>' +
        '</div>' +
        '<div class="sarrow">›</div>' +
        '</div>';
    }).join('');
  }

  // ===== 事件绑定 =====
  function bindEvents() {
    $('#hotGrid').addEventListener('click', function (e) {
      var card = e.target.closest('.hot-card');
      if (!card) return;
      handleClick(card);
    });

    $('#tabs').addEventListener('click', function (e) {
      var tab = e.target.closest('.tab');
      if (!tab) return;
      state.activeTab = tab.dataset.tab;
      state.searchQuery = '';
      $('#searchInput').value = '';
      $$('.tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderServices(state.activeTab);
    });

    $('#serviceGrid').addEventListener('click', function (e) {
      var item = e.target.closest('.sitem');
      if (!item) return;
      handleClick(item);
    });

    $('#searchInput').addEventListener('input', function (e) {
      globalSearch(e.target.value);
    });

    $('#hotKeywords').addEventListener('click', function (e) {
      var tag = e.target.closest('.hk-tag');
      if (!tag) return;
      var kw = tag.dataset.kw;
      $('#searchInput').value = kw;
      globalSearch(kw);
    });

    $('#themeBtn').addEventListener('click', toggleTheme);

    // 频道入口点击事件
    $$('.channel-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var channel = this.dataset.channel;
var tabMap = {
'zixun': 'traffic',    // 资讯 -> 交通出行
'banshi': 'banshi',   // 办事 -> 办事指南
'kaoxue': 'edu',      // 考学 -> 教育办事
'zhaopin': 'job',     // 招聘 -> 找工作
'lvyou': 'travel',    // 旅游 -> 旅游休闲
'xiuxian': 'tool',    // 工具 -> 实用工具
'youhui': 'youhui'    // 优惠 -> 优惠特惠
};
        var tabId = tabMap[channel] || 'banshi';
        state.activeTab = tabId;
        $$('.tab').forEach(function (t) { t.classList.remove('active'); });
        var targetTab = document.querySelector('.tab[data-tab="' + tabId + '"]');
        if (targetTab) targetTab.classList.add('active');
        renderServices(tabId);
        window.scrollTo(0, 0);
      });
    });

    $('#modalClose').addEventListener('click', closeModal);
    $('#modalOverlay').addEventListener('click', function (e) {
      if (e.target.id === 'modalOverlay') closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    $$('.bnav-item').forEach(function (item) {
      item.addEventListener('click', function () {
        switchPage(this.dataset.page);
      });
    });
  }

  function handleClick(el) {
    var action = el.dataset.action;
    var url = el.dataset.url;
    if (action) { handleAction(action); }
    else if (url) { window.open(url, '_blank', 'noopener'); }
  }

  function switchPage(page) {
    state.currentPage = page;
    $$('.bnav-item').forEach(function (i) { i.classList.remove('active'); });
    document.querySelector('.bnav-item[data-page="' + page + '"]').classList.add('active');

    var pages = ['home', 'tools', 'phone', 'me'];
    pages.forEach(function (p) {
      var el = document.getElementById('page' + p.charAt(0).toUpperCase() + p.slice(1));
      if (el) el.style.display = (p === page) ? 'block' : 'none';
    });

    if (page === 'tools') renderToolsPage();
    if (page === 'phone') renderPhonePage();
    window.scrollTo(0, 0);
  }

  function renderToolsPage() {
    var container = $('#toolsPageContent');
    if (!container) return;
    var toolCat = DATA.categories.find(function (c) { return c.id === 'tool'; });
    if (!toolCat) return;
    container.innerHTML =
      toolCat.items.map(function (item) {
        return '<div class="tool-card" data-action="' + (item.action || '') + '" data-url="' + (item.url || '') + '">' +
          '<div class="tc-icon">' + getServiceIcon(item.name) + '</div>' +
          '<div class="tc-name">' + item.name + '</div>' +
          '<div class="tc-desc">' + item.desc + '</div>' +
          '</div>';
      }).join('');

    container.querySelectorAll('.tool-card').forEach(function (card) {
      card.addEventListener('click', function () { handleClick(this); });
    });
  }

  function renderPhonePage() {
    var container = $('#phonePageContent');
    if (!container) return;
    var cats = [];
    DATA.phonebook.forEach(function (p) {
      if (cats.indexOf(p.category) < 0) cats.push(p.category);
    });
    container.innerHTML = cats.map(function (cat) {
      return '<div class="phone-sec"><h4>' + cat + '</h4><div class="phone-list">' +
        DATA.phonebook.filter(function (p) { return p.category === cat; }).map(function (p) {
          return '<div class="phone-row" onclick="window._copyPhone(\'' + p.number + '\',\'' + p.name + '\')">' +
            '<span class="pr-name">' + p.name + '</span>' +
            '<span class="pr-num">' + p.number + '</span>' +
            '</div>';
        }).join('') +
        '</div></div>';
    }).join('');
  }

  // ===== 动作 =====
  function handleAction(action) {
    switch (action) {
      case 'xianxing': showXianxing(); break;
      case 'phonebook': showPhonebook(); break;
      case 'postcode': showPostcode(); break;
      case 'weather': showWeather(); break;
      case 'youjia': showYoujia(); break;
      case 'calendar': showCalendar(); break;
      case 'tax': showTaxCalc(); break;
      case 'loan': showLoanCalc(); break;
      case 'sbcalc': showSbCalc(); break;
      case 'district': showDistrict(); break;
case 'idcheck': showIdCheck(); break;
case 'platecheck': showPlateCheck(); break;
case 'bmi': showBmi(); break;
case 'datecalc': showDateCalc(); break;
case 'exchange': showExchange(); break;
case 'lengthconv': showLengthConv(); break;
case 'weightconv': showWeightConv(); break;
case 'areaconv': showAreaConv(); break;
case 'tempconv': showTempConv(); break;
case 'timezone': showTimezone(); break;
case 'password': showPassword(); break;
case 'uuidgen': showUuidGen(); break;
case 'qrcode': showQrCode(); break;
case 'base64': showBase64(); break;
case 'jsonfmt': showJsonFmt(); break;
case 'textcount': showTextCount(); break;
case 'colorconv': showColorConv(); break;
case 'loancmp': showLoanCmp(); break;
case 'agecalc': showAgeCalc(); break;
case 'countdown': showCountdown(); break;
case 'rmbconv': showRmbConv(); break;
case 'colors': showColors(); break;
default: showToast('功能开发中');
    }
  }

  function showXianxing() {
    var now = new Date();
    var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var today = dayNames[now.getDay()];
    var todayRule = DATA.xianxingRule.rules.find(function (r) { return r.day === today; });
    var isWeekend = now.getDay() === 0 || now.getDay() === 6;
    var dateStr = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + today;

    openModal('🚗 杭州限行查询',
      '<div class="xx-today" style="background:' + (isWeekend ? 'linear-gradient(135deg,#27ae60,#1e8449)' : '') + '">' +
      '<div class="xx-date">' + dateStr + '</div>' +
      '<div class="xx-tail">' + (todayRule ? todayRule.tail : '不限行') + '</div>' +
      '<div class="xx-label">' + (isWeekend ? '周末不限行' : '今日限行尾号') + '</div>' +
      '</div>' +
      '<table class="xx-table"><thead><tr><th>星期</th><th>限行尾号</th></tr></thead><tbody>' +
      DATA.xianxingRule.rules.map(function (r) {
        return '<tr class="' + (r.day === today ? 'today' : '') + '"><td>' + r.day + '</td><td>' + r.tail + '</td></tr>';
      }).join('') +
      '</tbody></table>' +
      '<div class="xx-note"><strong>⏰ 时间：</strong>工作日 7:00-9:00、16:30-18:30<br>' +
      '<strong>📍 区域：</strong>' + DATA.xianxingRule.area + '<br>' +
      '<strong>⚠️ 法定节假日不限行，以官方最新公告为准</strong></div>'
    );
  }

  // 用于 index.html 直接调用的限行弹窗
  function buildXianxingModal() {
    var now = new Date();
    var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var today = dayNames[now.getDay()];
    var todayRule = DATA.xianxingRule.rules.find(function (r) { return r.day === today; });
    var isWeekend = now.getDay() === 0 || now.getDay() === 6;
    var dateStr = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + today;

    return '<div class="xx-today" style="background:' + (isWeekend ? 'linear-gradient(135deg,#27ae60,#1e8449)' : '') + '">' +
      '<div class="xx-date">' + dateStr + '</div>' +
      '<div class="xx-tail">' + (todayRule ? todayRule.tail : '不限行') + '</div>' +
      '<div class="xx-label">' + (isWeekend ? '周末不限行' : '今日限行尾号') + '</div>' +
      '</div>' +
      '<table class="xx-table"><thead><tr><th>星期</th><th>限行尾号</th></tr></thead><tbody>' +
      DATA.xianxingRule.rules.map(function (r) {
        return '<tr class="' + (r.day === today ? 'today' : '') + '"><td>' + r.day + '</td><td>' + r.tail + '</td></tr>';
      }).join('') +
      '</tbody></table>' +
      '<div class="xx-note"><strong>⏰ 时间：</strong>工作日 7:00-9:00、16:30-18:30<br>' +
      '<strong>📍 区域：</strong>' + DATA.xianxingRule.area + '<br>' +
      '<strong>⚠️ 法定节假日不限行，以官方最新公告为准</strong></div>';
  }

  function showPhonebook() {
    var cats = [];
    DATA.phonebook.forEach(function (p) { if (cats.indexOf(p.category) < 0) cats.push(p.category); });
    var html = cats.map(function (cat) {
      return '<div class="pb-cat"><h4>' + cat + '</h4><div class="pb-grid">' +
        DATA.phonebook.filter(function (p) { return p.category === cat; }).map(function (p) {
          return '<div class="pb-item" onclick="window._copyPhone(\'' + p.number + '\',\'' + p.name + '\')">' +
            '<span class="pb-name">' + p.name + '</span><span class="pb-num">' + p.number + '</span></div>';
        }).join('') +
        '</div></div>';
    }).join('');
    openModal('📞 常用电话', html + '<p class="modal-tip">点击号码可复制</p>');
  }

  function showPostcode() {
    var html = '<div class="pc-grid">' +
      DATA.postcodes.map(function (c) {
        return '<div class="pc-item"><span>' + c.district + '</span><span class="pc-code">' + c.code + '</span></div>';
      }).join('') +
      '</div><p class="modal-tip">杭州市通用邮编 310000</p>';
    openModal('📮 邮政编码', html);
  }

  function showDistrict() {
    openModal('📍 行政区划',
      '<div style="line-height:2.2;font-size:14px;">' +
      '<h4 style="color:var(--primary);margin-bottom:8px;">杭州市（10区2县1县级市）</h4>' +
      '<p><strong>市辖区：</strong>上城区、拱墅区、西湖区、滨江区、萧山区、余杭区、临平区、钱塘区、富阳区、临安区</p>' +
      '<p><strong>县：</strong>桐庐县、淳安县</p>' +
      '<p><strong>县级市：</strong>建德市</p>' +
      '<p style="margin-top:12px;color:var(--text-muted);font-size:13px;">市政府驻地：上城区解放东路18号市民中心</p>' +
      '</div>'
    );
  }

  function showIdCheck() {
    openModal('🪪 身份证号校验',
      '<div class="calc-form">' +
      '<div class="fg"><label>输入身份证号码</label><input type="text" id="idInput" placeholder="18位身份证号码" maxlength="18" style="font-family:SF Mono,Menlo,monospace;letter-spacing:1px;"></div>' +
      '<button class="btn btn-primary" onclick="window._checkId()">校验</button>' +
      '<div id="idResult"></div>' +
      '</div>' +
      '<p class="modal-tip">本工具仅在本地校验号码格式，不会上传任何数据</p>'
    );
    window._checkId = function () {
      var input = document.getElementById('idInput');
      var result = document.getElementById('idResult');
      var id = input.value.trim().toUpperCase();
      if (!id) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">请输入身份证号码</p>'; return; }
      if (id.length !== 18) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">⚠️ 身份证号码必须为18位</p>'; return; }
      var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      var checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
      var sum = 0;
      for (var i = 0; i < 17; i++) { sum += parseInt(id[i]) * weight[i]; }
      var checkCode = checkCodes[sum % 11];
      var isValid = (id[17] === checkCode);
      var regionCode = id.substring(0, 6);
      var birthYear = id.substring(6, 10);
      var birthMonth = id.substring(10, 12);
      var birthDay = id.substring(12, 14);
      var genderNum = parseInt(id[16]);
      var gender = genderNum % 2 === 1 ? '男' : '女';
      if (isValid) {
        result.innerHTML = '<div class="calc-result">' +
          '<div class="cr-label">✅ 校验通过</div>' +
          '<div class="cr-detail">出生日期：' + birthYear + '年' + birthMonth + '月' + birthDay + '日<br>' +
          '性别：' + gender + '<br>' +
          '地区编码：' + regionCode + '</div></div>';
      } else {
        result.innerHTML = '<div class="calc-result" style="background:linear-gradient(135deg,#ef4444,#c0392b);">' +
          '<div class="cr-label">❌ 校验失败</div>' +
          '<div class="cr-detail">身份证号码格式不正确<br>校验码应为：' + checkCode + '（实际为：' + id[17] + '）</div></div>';
      }
    };
  }

  function showPlateCheck() {
    var plates = {
      '浙A': '杭州市', '浙B': '宁波市', '浙C': '温州市', '浙D': '绍兴市',
      '浙E': '湖州市', '浙F': '嘉兴市', '浙G': '金华市', '浙H': '衢州市',
      '浙J': '台州市', '浙K': '丽水市', '浙L': '舟山市',
      '京A': '北京市', '京B': '北京市（出租车）', '京C': '北京市', '京D': '北京市',
      '沪A': '上海市', '沪B': '上海市', '沪C': '上海市（远郊）',
      '粤A': '广州市', '粤B': '深圳市', '粤C': '珠海市', '粤D': '汕头市',
      '苏A': '南京市', '苏B': '无锡市', '苏E': '苏州市',
      '鲁A': '济南市', '鲁B': '青岛市'
    };
    openModal('🚗 车牌归属地查询',
      '<div class="calc-form">' +
      '<div class="fg"><label>输入车牌号前缀</label><input type="text" id="plateInput" placeholder="如 浙A" maxlength="3" style="text-transform:uppercase;font-family:SF Mono,Menlo,monospace;"></div>' +
      '<button class="btn btn-primary" onclick="window._checkPlate()">查询</button>' +
      '<div id="plateResult"></div>' +
      '</div>' +
      '<div style="margin-top:16px;"><h4 style="font-size:13px;color:var(--primary);margin-bottom:8px;">浙江车牌一览</h4>' +
      '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;">' +
      Object.keys(plates).filter(function (k) { return k.indexOf('浙') === 0; }).map(function (k) {
        return '<div class="pc-item"><span>' + k + '</span><span class="pc-code">' + plates[k] + '</span></div>';
      }).join('') +
      '</div></div>'
    );
    window._checkPlate = function () {
      var input = document.getElementById('plateInput');
      var result = document.getElementById('plateResult');
      var plate = input.value.trim().toUpperCase();
      if (!plate) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">请输入车牌前缀</p>'; return; }
      if (plate.length < 2) { result.innerHTML = '<p style="color:var(--danger);margin-top:8px;">请输入至少2个字符</p>'; return; }
      var prefix = plate.substring(0, 2);
      var city = plates[prefix];
      if (city) {
        result.innerHTML = '<div class="calc-result">' +
          '<div class="cr-label">查询结果</div>' +
          '<div class="cr-amount">' + city + '</div>' +
          '<div class="cr-detail">车牌前缀：' + prefix + '</div></div>';
      } else {
        result.innerHTML = '<div class="calc-result" style="background:linear-gradient(135deg,#eab308,#ca8a04);">' +
          '<div class="cr-label">⚠️ 未找到</div>' +
          '<div class="cr-detail">暂无「' + prefix + '」的归属地信息</div></div>';
      }
    };
  }

  function showWeather() {
    openModal('🌤️ 杭州天气',
      '<div id="weatherBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">⛅</div><p style="color:var(--text-muted);margin-top:8px;">正在获取天气...</p></div></div>' +
      '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
      '<strong>生活提示：</strong><br>杭州属亚热带季风气候，四季分明<br>梅雨季节（6月中-7月上）多雨潮湿<br>最佳旅游：3-5月、9-11月</div>'
    );
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://wttr.in/Hangzhou?format=j1&lang=zh', true);
      xhr.timeout = 8000;
      xhr.onload = function () {
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            var cur = data.current_condition[0];
            var desc = cur.lang_zh && cur.lang_zh[0] ? cur.lang_zh[0].value : cur.weatherDesc[0].value;
            var html = '<div style="text-align:center;padding:12px 0 16px;">' +
              '<div style="font-size:48px;font-weight:800;color:var(--primary);">' + cur.temp_C + '°C</div>' +
              '<div style="font-size:16px;margin:6px 0;">' + desc + '</div>' +
              '<div style="font-size:13px;color:var(--text-muted);">体感' + cur.FeelsLikeC + '°C · 湿度' + cur.humidity + '% · 风速' + cur.windspeedKmph + 'km/h</div>' +
              '</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px;">';
            for (var i = 0; i < 3 && i < data.weather.length; i++) {
              var d = data.weather[i];
              var label = i === 0 ? '今天' : i === 1 ? '明天' : '后天';
              var wd = d.hourly[4] && d.hourly[4].lang_zh && d.hourly[4].lang_zh[0] ? d.hourly[4].lang_zh[0].value : (d.hourly[4] ? d.hourly[4].weatherDesc[0].value : '');
              html += '<div style="text-align:center;padding:10px 4px;background:var(--bg);border-radius:8px;">' +
                '<div style="font-size:12px;color:var(--text-muted);">' + label + '</div>' +
                '<div style="font-size:16px;margin:4px 0;">' + wd + '</div>' +
                '<div style="font-size:12px;">' + d.mintempC + '°~' + d.maxtempC + '</div></div>';
            }
            html += '</div><p class="modal-tip">数据来源：wttr.in</p>';
            $('#weatherBox').innerHTML = html;
          } catch (e) { $('#weatherBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">天气数据解析失败</div>'; }
        }
      };
      xhr.onerror = function () { $('#weatherBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">天气获取失败</div>'; };
      xhr.ontimeout = function () { $('#weatherBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">天气获取超时</div>'; };
      xhr.send();
    } catch (e) { $('#weatherBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">天气功能不可用</div>'; }
  }

  function showBmi() {
    openModal('⚖️ BMI计算器', '<div class="calc-form"><div class="fg"><label>身高（cm）</label><input type="number" id="bmiH" value="170" min="100" max="250"></div><div class="fg"><label>体重（kg）</label><input type="number" id="bmiW" value="65" min="30" max="200"></div><button class="btn btn-primary" onclick="window._calcBmi()">计算BMI</button><div id="bmiResult"></div></div>');
    window._calcBmi = function () {
      var h = parseFloat($('#bmiH').value) / 100, w = parseFloat($('#bmiW').value);
      if (!h || !w || h <= 0) { showToast('请输入正确数值'); return; }
      var bmi = w / (h * h), level, color, tip;
      if (bmi < 18.5) { level = '偏瘦'; color = '#3b82f6'; tip = '建议适当增重'; }
      else if (bmi < 24) { level = '正常'; color = '#22c55e'; tip = '继续保持'; }
      else if (bmi < 28) { level = '偏胖'; color = '#f59e0b'; tip = '建议控制饮食'; }
      else { level = '肥胖'; color = '#ef4444'; tip = '建议咨询医生'; }
      $('#bmiResult').innerHTML = '<div class="calc-result" style="background:linear-gradient(135deg,' + color + ',' + color + 'dd);"><div class="cr-amount">' + bmi.toFixed(1) + '</div><div class="cr-label">' + level + '</div><div class="cr-detail">' + tip + '</div></div>';
    };
  }

  function showDateCalc() {
    openModal('📅 日期计算器', '<div class="calc-form"><div class="fg"><label>开始日期</label><input type="date" id="dateStart"></div><div class="fg"><label>结束日期</label><input type="date" id="dateEnd"></div><div style="display:flex;gap:8px;margin-bottom:12px;"><button class="btn btn-primary" onclick="window._calcDays()">计算天数</button><button class="btn" style="background:var(--bg);color:var(--text);border:1px solid var(--border);" onclick="window._addDays()">+N天</button></div><div id="dateResult"></div></div>');
    var today = new Date().toISOString().split('T')[0];
    $('#dateStart').value = today; $('#dateEnd').value = today;
    window._calcDays = function () {
      var s = new Date($('#dateStart').value), e = new Date($('#dateEnd').value);
      var days = Math.ceil((e - s) / 86400000), workdays = 0;
      for (var d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) { if (d.getDay() !== 0 && d.getDay() !== 6) workdays++; }
      $('#dateResult').innerHTML = '<div class="calc-result"><div class="cr-amount">' + Math.abs(days) + '</div><div class="cr-label">天</div><div class="cr-detail">含工作日：' + Math.abs(workdays) + '天</div></div>';
    };
    window._addDays = function () {
      var s = new Date($('#dateStart').value), days = parseInt(prompt('增加天数：') || '0');
      if (isNaN(days)) return;
      s.setDate(s.getDate() + days); $('#dateEnd').value = s.toISOString().split('T')[0];
    };
  }

  function showExchange() {
    openModal('💱 汇率换算', '<div class="calc-form"><div class="fg"><label>金额</label><input type="number" id="exAmt" value="100"></div><div class="fg"><label>从</label><select id="exFrom"><option value="CNY">人民币 CNY</option><option value="USD">美元 USD</option><option value="EUR">欧元 EUR</option><option value="JPY">日元 JPY</option><option value="HKD">港币 HKD</option><option value="GBP">英镑 GBP</option></select></div><div class="fg"><label>到</label><select id="exTo"><option value="USD">美元 USD</option><option value="CNY">人民币 CNY</option><option value="EUR">欧元 EUR</option><option value="JPY">日元 JPY</option><option value="HKD">港币 HKD</option><option value="GBP">英镑 GBP</option></select></div><button class="btn btn-primary" onclick="window._calcEx()">换算</button><div id="exResult"></div></div><p class="modal-tip">汇率仅供参考</p>');
    window._calcEx = function () {
      var rates = { CNY: 1, USD: 7.24, EUR: 7.85, JPY: 0.048, HKD: 0.93, GBP: 9.12 };
      var amt = parseFloat($('#exAmt').value) || 0, from = $('#exFrom').value, to = $('#exTo').value;
      var result = (amt / rates[from]) * rates[to];
      $('#exResult').innerHTML = '<div class="calc-result"><div class="cr-amount">' + result.toFixed(2) + ' ' + to + '</div><div class="cr-label">1 ' + from + ' = ' + (rates[to]/rates[from]).toFixed(4) + ' ' + to + '</div></div>';
    };
  }

  function showLengthConv() {
    openModal('📏 长度转换', '<div class="calc-form"><div class="fg"><label>输入数值</label><input type="number" id="lenVal" value="1"></div><div class="fg"><label>从</label><select id="lenFrom"><option value="m">米 m</option><option value="cm">厘米 cm</option><option value="km">千米 km</option><option value="inch">英寸 inch</option><option value="ft">英尺 ft</option><option value="yd">码 yd</option></select></div><button class="btn btn-primary" onclick="window._convLen()">转换</button><div id="lenResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;"></div></div>');
    window._convLen = function () {
      var val = parseFloat($('#lenVal').value) || 0, from = $('#lenFrom').value;
      var toM = { m: 1, cm: 0.01, km: 1000, inch: 0.0254, ft: 0.3048, yd: 0.9144 }, m = val * toM[from];
      var units = { m: '米', cm: '厘米', km: '千米', inch: '英寸', ft: '英尺', yd: '码' }, html = '';
      for (var k in toM) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + units[k] + '</div><div style="font-size:16px;font-weight:600;">' + (m / toM[k]).toFixed(4) + '</div></div>'; }
      $('#lenResult').innerHTML = html;
    };
  }

  function showWeightConv() {
    openModal('⚖️ 重量转换', '<div class="calc-form"><div class="fg"><label>输入数值</label><input type="number" id="wtVal" value="1"></div><div class="fg"><label>从</label><select id="wtFrom"><option value="kg">公斤 kg</option><option value="g">克 g</option><option value="lb">磅 lb</option><option value="oz">盎司 oz</option><option value="jin">斤 jin</option></select></div><button class="btn btn-primary" onclick="window._convWt()">转换</button><div id="wtResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;"></div></div>');
    window._convWt = function () {
      var val = parseFloat($('#wtVal').value) || 0, from = $('#wtFrom').value;
      var toKg = { kg: 1, g: 0.001, lb: 0.4536, oz: 0.02835, jin: 0.5 }, kg = val * toKg[from];
      var units = { kg: '公斤', g: '克', lb: '磅', oz: '盎司', jin: '斤' }, html = '';
      for (var k in toKg) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + units[k] + '</div><div style="font-size:16px;font-weight:600;">' + (kg / toKg[k]).toFixed(4) + '</div></div>'; }
      $('#wtResult').innerHTML = html;
    };
  }

  function showAreaConv() {
    openModal('📐 面积转换', '<div class="calc-form"><div class="fg"><label>输入数值</label><input type="number" id="arVal" value="1"></div><div class="fg"><label>从</label><select id="arFrom"><option value="m2">平方米 m²</option><option value="km2">平方千米 km²</option><option value="mu">亩 mu</option><option value="hm2">公顷 hm²</option><option value="ft2">平方英尺 ft²</option></select></div><button class="btn btn-primary" onclick="window._convAr()">转换</button><div id="arResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;"></div></div>');
    window._convAr = function () {
      var val = parseFloat($('#arVal').value) || 0, from = $('#arFrom').value;
      var toM2 = { m2: 1, km2: 1000000, mu: 666.67, hm2: 10000, ft2: 0.0929 }, m2 = val * toM2[from];
      var units = { m2: '平方米', km2: '平方千米', mu: '亩', hm2: '公顷', ft2: '平方英尺' }, html = '';
      for (var k in toM2) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + units[k] + '</div><div style="font-size:16px;font-weight:600;">' + (m2 / toM2[k]).toFixed(4) + '</div></div>'; }
      $('#arResult').innerHTML = html;
    };
  }

  function showTempConv() {
    openModal('🌡️ 温度转换', '<div class="calc-form"><div class="fg"><label>输入温度</label><input type="number" id="tmpVal" value="0"></div><div class="fg"><label>从</label><select id="tmpFrom"><option value="c">摄氏度 °C</option><option value="f">华氏度 °F</option><option value="k">开尔文 K</option></select></div><button class="btn btn-primary" onclick="window._convTmp()">转换</button><div id="tmpResult" style="margin-top:12px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;"></div></div>');
    window._convTmp = function () {
      var val = parseFloat($('#tmpVal').value) || 0, from = $('#tmpFrom').value, c = from === 'c' ? val : from === 'f' ? (val - 32) * 5 / 9 : val - 273.15;
      var units = [{ k: 'c', n: '摄氏度 °C', v: c }, { k: 'f', n: '华氏度 °F', v: c * 9 / 5 + 32 }, { k: 'k', n: '开尔文 K', v: c + 273.15 }], html = '';
      units.forEach(function (u) { html += '<div style="padding:10px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">' + u.n + '</div><div style="font-size:16px;font-weight:600;">' + u.v.toFixed(2) + '</div></div>'; });
      $('#tmpResult').innerHTML = html;
    };
  }

  function showTimezone() {
    var now = new Date();
    openModal('🕐 时区转换', '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">北京时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('zh-CN', {timeZone:'Asia/Shanghai'}) + '</div></div>' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">UTC时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('en-US', {timeZone:'UTC'}) + '</div></div>' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">东京时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('ja-JP', {timeZone:'Asia/Tokyo'}) + '</div></div>' +
      '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:12px;color:var(--text-muted);">纽约时间</div><div style="font-size:18px;font-weight:700;color:var(--primary);">' + now.toLocaleString('en-US', {timeZone:'America/New_York'}) + '</div></div>' +
      '</div>'
    );
  }

  function showPassword() {
    openModal('🔐 密码生成器', '<div class="calc-form"><div class="fg"><label>密码长度</label><input type="range" id="pwLen" min="8" max="32" value="16" oninput="$(\'#pwLenVal\').textContent=this.value"><span id="pwLenVal">16</span></div><div style="display:flex;gap:8px;margin:8px 0;flex-wrap:wrap;">' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwLow" checked> 小写</label>' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwUp" checked> 大写</label>' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwNum" checked> 数字</label>' +
      '<label style="display:flex;align-items:center;gap:4px;font-size:13px;"><input type="checkbox" id="pwSym" checked> 符号</label></div>' +
      '<button class="btn btn-primary" onclick="window._genPw()">生成密码</button><div id="pwResult" style="margin-top:12px;padding:16px;background:var(--bg);border-radius:10px;text-align:center;font-family:monospace;font-size:16px;letter-spacing:1px;word-break:break-all;"></div></div>'
    );
    window._genPw = function () {
      var len = parseInt($('#pwLen').value), chars = '';
      if ($('#pwLow').checked) chars += 'abcdefghijklmnopqrstuvwxyz';
      if ($('#pwUp').checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if ($('#pwNum').checked) chars += '0123456789';
      if ($('#pwSym').checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      if (!chars) { showToast('请至少选择一种字符'); return; }
      var pw = ''; for (var i = 0; i < len; i++) pw += chars[Math.floor(Math.random() * chars.length)];
      $('#pwResult').innerHTML = pw + '<div style="margin-top:8px;font-size:12px;color:var(--text-muted);">强度：' + (len >= 16 && chars.length >= 3 ? '强' : len >= 12 ? '中' : '弱') + '</div>';
    };
  }

  function showUuidGen() {
    openModal('🆔 UUID生成器', '<div class="calc-form"><div class="fg"><label>生成数量</label><input type="number" id="uuidCnt" value="5" min="1" max="20"></div><button class="btn btn-primary" onclick="window._genUuid()">生成</button><div id="uuidResult" style="margin-top:12px;"></div></div>');
    window._genUuid = function () {
      var cnt = parseInt($('#uuidCnt').value) || 1, html = '';
      for (var i = 0; i < cnt; i++) {
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); });
        html += '<div style="padding:10px;background:var(--bg);border-radius:8px;margin-bottom:6px;font-family:monospace;font-size:13px;cursor:pointer;" onclick="navigator.clipboard.writeText(this.textContent.trim());showToast(\'已复制\')">' + uuid + '</div>';
      }
      $('#uuidResult').innerHTML = html;
    };
  }

  function showQrCode() {
    openModal('📱 二维码生成', '<div class="calc-form"><div class="fg"><label>输入内容</label><textarea id="qrInput" style="width:100%;min-height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;" placeholder="输入文字、网址等"></textarea></div><button class="btn btn-primary" onclick="window._genQr()">生成二维码</button><div id="qrResult" style="margin-top:16px;text-align:center;"></div></div>');
    window._genQr = function () {
      var text = $('#qrInput').value.trim();
      if (!text) { showToast('请输入内容'); return; }
      $('#qrResult').innerHTML = '<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(text) + '" style="width:180px;height:180px;border-radius:12px;box-shadow:var(--shadow);" />';
    };
  }

  function showBase64() {
    openModal('🔤 Base64编解码', '<div class="calc-form"><div class="fg"><label>输入内容</label><textarea id="b64Input" style="width:100%;min-height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;"></textarea></div><div style="display:flex;gap:8px;margin-bottom:12px;">' +
      '<button class="btn btn-primary" onclick="window._b64Enc()">编码</button><button class="btn" style="background:var(--bg);color:var(--text);border:1px solid var(--border);" onclick="window._b64Dec()">解码</button></div>' +
      '<div class="fg"><label>结果</label><textarea id="b64Output" style="width:100%;min-height:80px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;background:var(--bg);" readonly></textarea></div></div>');
    window._b64Enc = function () { try { $('#b64Output').value = btoa(unescape(encodeURIComponent($('#b64Input').value))); } catch (e) { showToast('编码失败'); } };
    window._b64Dec = function () { try { $('#b64Output').value = decodeURIComponent(escape(atob($('#b64Input').value))); } catch (e) { showToast('解码失败'); } };
  }

  function showJsonFmt() {
    openModal('📋 JSON格式化', '<div class="calc-form"><div class="fg"><label>输入JSON</label><textarea id="jsonInput" style="width:100%;min-height:100px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;font-family:monospace;font-size:12px;"></textarea></div><div style="display:flex;gap:8px;margin-bottom:12px;">' +
      '<button class="btn btn-primary" onclick="window._jsonFmt()">美化</button><button class="btn" style="background:var(--bg);color:var(--text);border:1px solid var(--border);" onclick="window._jsonMin()">压缩</button></div>' +
      '<div class="fg"><label>结果</label><textarea id="jsonOutput" style="width:100%;min-height:100px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;font-family:monospace;font-size:12px;background:var(--bg);" readonly></textarea></div></div>');
    window._jsonFmt = function () { try { var obj = JSON.parse($('#jsonInput').value); $('#jsonOutput').value = JSON.stringify(obj, null, 2); } catch (e) { showToast('无效JSON'); } };
    window._jsonMin = function () { try { var obj = JSON.parse($('#jsonInput').value); $('#jsonOutput').value = JSON.stringify(obj); } catch (e) { showToast('无效JSON'); } };
  }

  function showTextCount() {
    openModal('✍️ 文字统计', '<div class="calc-form"><div class="fg"><label>输入文字</label><textarea id="tcInput" style="width:100%;min-height:120px;padding:10px;border:1px solid var(--border);border-radius:8px;resize:none;" oninput="window._countText()"></textarea></div><div id="tcResult" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;"></div></div>');
    window._countText = function () {
      var text = $('#tcInput').value, cn = (text.match(/[\u4e00-\u9fa5]/g) || []).length, words = text.trim().split(/\s+/).filter(Boolean).length;
      $('#tcResult').innerHTML = '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">' + text.length + '</div><div style="font-size:12px;color:var(--text-muted);">总字符</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">' + cn + '</div><div style="font-size:12px;color:var(--text-muted);">中文字符</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;"><div style="font-size:20px;font-weight:700;color:var(--primary);">' + words + '</div><div style="font-size:12px;color:var(--text-muted);">词数</div></div>';
    };
    window._countText();
  }

  function showColorConv() {
    openModal('🎨 颜色转换', '<div class="calc-form"><div class="fg"><label>输入颜色值</label><input type="text" id="colorInput" value="#0ea5e9" placeholder="#0ea5e9"></div><button class="btn btn-primary" onclick="window._convColor()">转换</button><div id="colorResult"></div></div>');
    window._convColor = function () {
      var input = $('#colorInput').value.trim(), r, g, b, hex;
      if (input.startsWith('#')) {
        hex = input; var m = input.match(/[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/);
        if (!m) { showToast('无效颜色'); return; }
        var c = m[0]; if (c.length === 3) c = c.split('').map(function (x) { return x + x; }).join('');
        r = parseInt(c.substr(0, 2), 16); g = parseInt(c.substr(2, 2), 16); b = parseInt(c.substr(4, 2), 16);
      } else {
        var m = input.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
        if (!m) { showToast('无效RGB'); return; }
        r = parseInt(m[1]); g = parseInt(m[2]); b = parseInt(m[3]); hex = '#' + [r, g, b].map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
      }
      var hsl = rgbToHsl(r, g, b);
      $('#colorResult').innerHTML = '<div style="width:100%;height:60px;background:' + hex + ';border-radius:12px;margin-bottom:12px;"></div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;cursor:pointer;" onclick="navigator.clipboard.writeText(\'' + hex + '\');showToast(\'已复制\')"><div style="font-size:11px;color:var(--text-muted);">HEX</div><div style="font-size:14px;font-weight:600;">' + hex.toUpperCase() + '</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;cursor:pointer;" onclick="navigator.clipboard.writeText(\'rgb(' + r + ',' + g + ',' + b + ')\');showToast(\'已复制\')"><div style="font-size:11px;color:var(--text-muted);">RGB</div><div style="font-size:14px;font-weight:600;">rgb(' + r + ',' + g + ',' + b + ')</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:8px;text-align:center;cursor:pointer;" onclick="navigator.clipboard.writeText(\'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)\');showToast(\'已复制\')"><div style="font-size:11px;color:var(--text-muted);">HSL</div><div style="font-size:14px;font-weight:600;">hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)</div></div>' +
        '</div>';
    };
    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, h = 0, s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
      if (max !== min) {
        var d = max - min;
        switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break; }
      }
      return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }
  }

  function showLoanCmp() {
    openModal('🏦 房贷对比', '<div class="calc-form"><div class="fg"><label>贷款金额（万元）</label><input type="number" id="lcAmt" value="100"></div><div class="fg"><label>贷款年限</label><select id="lcYears"><option value="10">10年</option><option value="20" selected>20年</option><option value="30">30年</option></select></div><div class="fg"><label>利率（%）</label><input type="number" id="lcRate" value="4.2" step="0.01"></div><button class="btn btn-primary" onclick="window._cmpLoan()">对比计算</button><div id="lcResult" style="margin-top:12px;"></div></div>');
    window._cmpLoan = function () {
      var P = parseFloat($('#lcAmt').value) * 10000, n = parseInt($('#lcYears').value) * 12, r = parseFloat($('#lcRate').value) / 100 / 12;
      var m1 = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1), t1 = m1 * n;
      var m2 = P / n + P * r, t2 = m2 * n;
      $('#lcResult').innerHTML = '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
        '<div style="padding:14px;background:var(--bg);border-radius:10px;"><div style="font-size:14px;font-weight:600;color:var(--primary);margin-bottom:8px;">等额本息</div><div style="font-size:13px;margin-bottom:4px;">月供：<strong>¥' + m1.toFixed(2) + '</strong></div><div style="font-size:13px;margin-bottom:4px;">总利息：<strong>¥' + (t1 - P).toFixed(2) + '</strong></div><div style="font-size:13px;">总还款：<strong>¥' + t1.toFixed(2) + '</strong></div></div>' +
        '<div style="padding:14px;background:var(--bg);border-radius:10px;"><div style="font-size:14px;font-weight:600;color:var(--primary);margin-bottom:8px;">等额本金</div><div style="font-size:13px;margin-bottom:4px;">月供：<strong>¥' + m2.toFixed(2) + '</strong></div><div style="font-size:13px;margin-bottom:4px;">总利息：<strong>¥' + (t2 - P).toFixed(2) + '</strong></div><div style="font-size:13px;">总还款：<strong>¥' + t2.toFixed(2) + '</strong></div></div>' +
        '</div>';
    };
  }

  function showAgeCalc() {
    openModal('🎂 年龄计算器', '<div class="calc-form"><div class="fg"><label>出生日期</label><input type="date" id="ageBirth"></div><button class="btn btn-primary" onclick="window._calcAge()">计算</button><div id="ageResult"></div></div>');
    window._calcAge = function () {
      var birth = new Date($('#ageBirth').value), now = new Date(), age = now.getFullYear() - birth.getFullYear();
      if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
      var zodiac = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
      var days = Math.floor((now - birth) / 86400000);
      var nextBirth = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBirth < now) nextBirth = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
      $('#ageResult').innerHTML = '<div class="calc-result"><div class="cr-amount">' + age + '岁</div><div class="cr-label">' + zodiac[(birth.getFullYear() - 1900) % 12] + '年生</div><div class="cr-detail">存活天数：' + days + '天<br>下一个生日：' + nextBirth.toLocaleDateString('zh-CN') + '</div></div>';
    };
  }

  function showCountdown() {
    openModal('⏰ 倒计时', '<div class="calc-form"><div class="fg"><label>目标日期</label><input type="date" id="cdDate" value="' + new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] + '"></div><div class="fg"><label>目标名称</label><input type="text" id="cdName" placeholder="如：春节"></div><button class="btn btn-primary" onclick="window._doCount()">开始倒计时</button><div id="cdResult" style="margin-top:16px;text-align:center;"></div></div>');
    window._doCount = function () {
      var target = new Date($('#cdDate').value), name = $('#cdName').value || '目标日', diff = target - new Date();
      if (diff <= 0) { $('#cdResult').innerHTML = '<div style="padding:20px;font-size:18px;color:var(--primary);">已到达！🎉</div>'; return; }
      var d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000), m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
      $('#cdResult').innerHTML = '<div style="font-size:16px;color:var(--text-muted);margin-bottom:12px;">距离 ' + name + '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + d + '</div><div style="font-size:11px;color:var(--text-muted);">天</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + h + '</div><div style="font-size:11px;color:var(--text-muted);">时</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + m + '</div><div style="font-size:11px;color:var(--text-muted);">分</div></div>' +
        '<div style="padding:12px;background:var(--bg);border-radius:10px;text-align:center;"><div style="font-size:24px;font-weight:700;color:var(--primary);">' + s + '</div><div style="font-size:11px;color:var(--text-muted);">秒</div></div>' +
        '</div>';
    };
  }

  function showRmbConv() {
    openModal('💰 数字金额转大写', '<div class="calc-form"><div class="fg"><label>输入金额</label><input type="number" id="rmbInput" placeholder="如 12345.67"></div><button class="btn btn-primary" onclick="window._toRmb()">转换</button><div id="rmbResult" style="margin-top:12px;padding:16px;background:var(--bg);border-radius:10px;font-size:16px;text-align:center;font-weight:600;"></div></div>');
    window._toRmb = function () {
      var num = parseFloat($('#rmbInput').value);
      if (isNaN(num)) { showToast('请输入有效金额'); return; }
      var units = '仟佰拾亿仟佰拾万仟佰拾圆角分', digits = '零壹贰叁肆伍陆柒捌玖', str = (num * 100).toFixed(0), result = '';
      for (var i = 0; i < str.length; i++) { result += digits[parseInt(str[i])] + units[str.length - i - 1]; }
      result = result.replace(/零角零分$/, '整').replace(/零角/g, '零').replace(/零(仟|佰|拾)/g, '零').replace(/零+/g, '零').replace(/零圆/g, '圆');
      $('#rmbResult').innerHTML = result;
    };
  }

  function showColors() {
    var colors = [{ name: '西湖蓝', hex: '#0ea5e9' }, { name: '龙井绿', hex: '#10b981' }, { name: '桂花黄', hex: '#f59e0b' }, { name: '夕阳红', hex: '#ef4444' }, { name: '烟雨灰', hex: '#64748b' }, { name: '玉兰白', hex: '#f8fafc' }, { name: '檀香紫', hex: '#8b5cf6' }, { name: '西湖夜', hex: '#0f172a' }];
    openModal('🎨 杭州主题色', '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
      colors.map(function (c) { return '<div style="padding:12px;background:var(--bg);border-radius:10px;cursor:pointer;" onclick="navigator.clipboard.writeText(\'' + c.hex + '\');showToast(\'已复制 ' + c.hex + '\')">' + '<div style="width:100%;height:50px;background:' + c.hex + ';border-radius:8px;margin-bottom:8px;"></div>' + '<div style="font-size:13px;font-weight:600;">' + c.name + '</div>' + '<div style="font-size:12px;color:var(--text-muted);">' + c.hex.toUpperCase() + '</div></div>'; }).join('') +
      '</div>'
    );
  }

  function showYoujia() {
    var prices = { '92号': '7.54', '95号': '8.03', '98号': '8.82', '0号柴油': '7.23' };
    var html = '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
      Object.keys(prices).map(function (k) {
        return '<div style="text-align:center;padding:16px;background:var(--bg);border-radius:10px;border:1px solid var(--border);">' +
          '<div style="font-size:13px;color:var(--text-muted);">' + k + '</div>' +
          '<div style="font-size:24px;font-weight:800;color:var(--accent);margin:4px 0;">¥' + prices[k] + '</div>' +
          '<div style="font-size:11px;color:var(--text-muted);">元/升</div></div>';
      }).join('') +
      '</div><p class="modal-tip">浙江省成品油参考价，以加油站实际标价为准</p>' +
      '<div style="margin-top:10px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
      '<strong>💡 省钱：</strong>油价每10个工作日调整一次，调价前加油更划算；民营油站通常便宜0.3-0.8元/升</div>';
    openModal('⛽ 浙江油价', html);
  }

  function showCalendar() {
    var now = new Date();
    var y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
    var firstDay = new Date(y, m, 1).getDay();
    var daysInMonth = new Date(y, m + 1, 0).getDate();
    var weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

    var cells = '';
    for (var i = 0; i < firstDay; i++) cells += '<div class="cal-cell empty"></div>';
    for (var day = 1; day <= daysInMonth; day++) {
      cells += '<div class="cal-cell ' + (day === d ? 'today' : '') + '">' + day + '</div>';
    }

    var lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
    var lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    var lunarStr = '农历' + lunarMonths[m] + '月' + lunarDays[Math.min(d - 1, 29)];

    openModal('📅 万年历',
      '<div style="text-align:center;margin-bottom:12px;">' +
      '<div style="font-size:20px;font-weight:700;">' + y + '年' + (m + 1) + '月</div>' +
      '<div style="font-size:13px;color:var(--text-muted);margin-top:2px;">' + lunarStr + '</div>' +
      '</div>' +
      '<div class="cal-week">' + weekDays.map(function (w) { return '<div>' + w + '</div>'; }).join('') + '</div>' +
      '<div class="cal-grid">' + cells + '</div>' +
      '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;line-height:1.8;">' +
      '<strong>今日：</strong>' + y + '年' + (m + 1) + '月' + d + '日 ' + dayNames[now.getDay()] + '<br>' +
      '<strong>农历：</strong>' + lunarStr + '</div>'
    );
  }

  function showTaxCalc() {
    openModal('💰 个税计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>税前月薪（元）</label><input type="number" id="taxSalary" value="15000"></div>' +
      '<div class="fg"><label>五险一金个人缴纳（元/月）</label><input type="number" id="taxInsurance" value="2500"></div>' +
      '<div class="fg"><label>专项附加扣除（元/月）</label><input type="number" id="taxDeduction" value="0"></div>' +
      '<button class="btn btn-primary" onclick="window._calcTax()">计算个税</button>' +
      '</div><div id="taxResult"></div>'
    );
  }

  window._calcTax = function () {
    var salary = parseFloat($('#taxSalary').value) || 0;
    var insurance = parseFloat($('#taxInsurance').value) || 0;
    var deduction = parseFloat($('#taxDeduction').value) || 0;
    var taxable = Math.max(0, salary - insurance - deduction - 5000);
    var brackets = [
      { limit: 3000, rate: 0.03, deduct: 0 },
      { limit: 12000, rate: 0.10, deduct: 210 },
      { limit: 25000, rate: 0.20, deduct: 1410 },
      { limit: 35000, rate: 0.25, deduct: 2660 },
      { limit: 55000, rate: 0.30, deduct: 4410 },
      { limit: 80000, rate: 0.35, deduct: 7160 },
      { limit: Infinity, rate: 0.45, deduct: 15160 }
    ];
    var tax = 0, rate = 0;
    for (var i = 0; i < brackets.length; i++) {
      if (taxable <= brackets[i].limit) { tax = taxable * brackets[i].rate - brackets[i].deduct; rate = brackets[i].rate; break; }
    }
    tax = Math.max(0, tax);
    var net = salary - insurance - tax;
    $('#taxResult').innerHTML =
      '<div class="calc-result"><div class="cr-amount">¥' + tax.toFixed(2) + '</div>' +
      '<div class="cr-label">每月应缴个税</div>' +
      '<div class="cr-detail">应纳税所得额：¥' + taxable.toFixed(2) + '（税率' + (rate * 100).toFixed(0) + '%）<br>' +
      '税后到手：<strong>¥' + net.toFixed(2) + '</strong><br>年薪税后：¥' + (net * 12).toFixed(2) + '</div></div>' +
      '<p class="modal-tip">仅供参考，以税务部门核算为准</p>';
  };

  function showLoanCalc() {
    openModal('🏦 房贷计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>贷款总额（万元）</label><input type="number" id="loanAmount" value="200"></div>' +
      '<div class="fg"><label>贷款年限（年）</label><input type="number" id="loanYears" value="30"></div>' +
      '<div class="fg"><label>年利率（%）</label><input type="number" id="loanRate" step="0.01" value="3.5"></div>' +
      '<div class="fg"><label>还款方式</label><select id="loanType"><option value="equal">等额本息</option><option value="principal">等额本金</option></select></div>' +
      '<button class="btn btn-primary" onclick="window._calcLoan()">计算房贷</button>' +
      '</div><div id="loanResult"></div>'
    );
  }

  window._calcLoan = function () {
    var amount = (parseFloat($('#loanAmount').value) || 0) * 10000;
    var years = parseFloat($('#loanYears').value) || 0;
    var rate = (parseFloat($('#loanRate').value) || 0) / 100;
    var type = $('#loanType').value;
    var months = years * 12;
    var mr = rate / 12;

    if (type === 'equal') {
      var monthly = amount * mr * Math.pow(1 + mr, months) / (Math.pow(1 + mr, months) - 1);
      var total = monthly * months;
      var interest = total - amount;
      $('#loanResult').innerHTML =
        '<div class="calc-result"><div class="cr-amount">¥' + monthly.toFixed(2) + '</div>' +
        '<div class="cr-label">每月还款</div>' +
        '<div class="cr-detail">还款总额：¥' + total.toFixed(2) + '<br>支付利息：<strong>¥' + interest.toFixed(2) + '</strong><br>还款期数：' + months + '期</div></div>';
    } else {
      var ppm = amount / months;
      var first = ppm + amount * mr;
      var last = ppm + ppm * mr;
      var interest2 = (months + 1) * amount * mr / 2;
      $('#loanResult').innerHTML =
        '<div class="calc-result"><div class="cr-amount">¥' + first.toFixed(2) + '</div>' +
        '<div class="cr-label">首月还款（逐月递减¥' + (ppm * mr).toFixed(2) + '）</div>' +
        '<div class="cr-detail">末月还款：¥' + last.toFixed(2) + '<br>支付利息：<strong>¥' + interest2.toFixed(2) + '</strong><br>还款总额：¥' + (amount + interest2).toFixed(2) + '</div></div>';
    }
  };

  function showSbCalc() {
    openModal('🏥 社保计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>缴费基数（元/月）</label><input type="number" id="sbBase" value="8000"></div>' +
      '<div style="padding:12px;background:var(--bg);border-radius:8px;font-size:13px;line-height:1.8;">' +
      '<strong>杭州社保比例（参考）：</strong><br>个人：养老8%+医疗2%+失业0.5%=10.5%<br>单位：养老14%+医疗9.9%+失业0.5%+工伤0.5%+生育0.8%≈25.7%</div>' +
      '<button class="btn btn-primary" onclick="window._calcSb()">计算社保</button>' +
      '</div><div id="sbResult"></div>'
    );
  }

  window._calcSb = function () {
    var base = parseFloat($('#sbBase').value) || 0;
    var p = { '养老': base * 0.08, '医疗': base * 0.02, '失业': base * 0.005 };
    var c = { '养老': base * 0.14, '医疗': base * 0.099, '失业': base * 0.005, '工伤': base * 0.005, '生育': base * 0.008 };
    var pt = p.养老 + p.医疗 + p.失业;
    var ct = c.养老 + c.医疗 + c.失业 + c.工伤 + c.生育;
    $('#sbResult').innerHTML =
      '<div class="calc-result"><div class="cr-amount">¥' + pt.toFixed(2) + '</div>' +
      '<div class="cr-label">个人每月缴纳</div>' +
      '<div class="cr-detail">单位每月：¥' + ct.toFixed(2) + '<br>社保总费用：¥' + (pt + ct).toFixed(2) + '<br>进入个人账户：¥' + (p.养老 + p.医疗).toFixed(2) + '</div></div>' +
      '<div style="margin-top:10px;font-size:13px;line-height:1.8;">' +
      '<strong>个人：</strong>养老¥' + p.养老.toFixed(2) + ' · 医疗¥' + p.医疗.toFixed(2) + ' · 失业¥' + p.失业.toFixed(2) + '<br>' +
      '<strong>单位：</strong>养老¥' + c.养老.toFixed(2) + ' · 医疗¥' + c.医疗.toFixed(2) + ' · 失业¥' + c.失业.toFixed(2) + ' · 工伤¥' + c.工伤.toFixed(2) + ' · 生育¥' + c.生育.toFixed(2) + '</div>' +
      '<p class="modal-tip">比例为参考值，以社保局为准</p>';
  };

  // ===== 模态框 =====
  function openModal(title, content) {
    $('#modalTitle').innerHTML = title;
    $('#modalBody').innerHTML = content;
    $('#modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    $('#modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  // ===== 初始化 =====
  function init() {
      applyTheme(state.theme);
      renderHotServices();
      renderHotKeywords();
      renderTabs();
      renderServices('banshi');
    bindEvents();
    var now = new Date();
    var dateEl = $('#heroDate');
    if (dateEl) {
      var days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      dateEl.textContent = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + days[now.getDay()];
    }
    // 更新统计
    var totalItems = DATA.categories.reduce(function (sum, c) { return sum + c.items.length; }, 0);
    var totalCats = DATA.categories.length;
    var statEl = $('#heroStats');
    if (statEl) {
      statEl.innerHTML =
        '<div class="hero-stat"><div class="num">' + totalItems + '</div><div class="label">办事条目</div></div>' +
        '<div class="hero-stat"><div class="num">' + totalCats + '</div><div class="label">服务分类</div></div>' +
        '<div class="hero-stat"><div class="num">' + DATA.phonebook.length + '</div><div class="label">常用电话</div></div>' +
        '<div class="hero-stat"><div class="num">13</div><div class="label">区县市</div></div>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
