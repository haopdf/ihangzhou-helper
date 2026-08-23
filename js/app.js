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
      { name: "发票抽奖", icon: "🧾", desc: "杭州发票抽奖", url: "https://www.hangzhou.gov.cn/col/col1229151238/index.html", color: "#f59e0b" },
      { name: "找工作", icon: "💼", desc: "事业单位/国企", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
      { name: "公积金", icon: "🏠", desc: "查询/提取/贷款", url: "https://gjj.hangzhou.gov.cn/", color: "#10b981" },
      { name: "浙A摇号", icon: "🚘", desc: "车牌摇号申请", url: "https://xkctk.hzcb.gov.cn/", color: "#ef4444" },
      { name: "灵隐寺", icon: "⛩️", desc: "门票预约", url: "https://www.lingyinsi.org.cn/", color: "#8b5cf6" },
      { name: "人才认定", icon: "🎓", desc: "高层次人才申请", url: "https://hrss.hangzhou.gov.cn/", color: "#06b6d4" },
      { name: "市民卡", icon: "💳", desc: "服务/充值", url: "https://www.96225.com/", color: "#ec4899" }
    ],

    // 22大分类（全面覆盖杭州生活服务）
    categories: [
      { id: "banshi", name: "办事指南", icon: "🏛️",
        items: [
          { name: "社保查询", desc: "缴费/余额/明细", url: "https://www.zjzwfw.gov.cn/", color: "#3b82f6" },
          { name: "社保转移", desc: "跨省转移/年限计算", url: "https://www.zjzwfw.gov.cn/", color: "#ef4444" },
          { name: "社保缴费", desc: "灵活就业缴费基数", url: "https://www.zjzwfw.gov.cn/", color: "#10b981" },
          { name: "公积金查询", desc: "余额/明细/提取记录", url: "https://gjj.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "公积金提取", desc: "租房/购房/离职提取", url: "https://gjj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "公积金贷款", desc: "额度测算/还款计划", url: "https://gjj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "人才落户", desc: "学历/职称/技能落户", url: "https://gaj.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "积分落户", desc: "积分计算/申请流程", url: "https://gaj.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "居住证办理", desc: "登记/申领/签注", url: "https://www.zjzwfw.gov.cn/", color: "#84cc16" },
          { name: "身份证办理", desc: "首次申领/换领/补领", url: "https://zzy.hzpolice.gov.cn/", color: "#f97316" },
          { name: "护照办理", desc: "因私出国护照申请", url: "https://s.nia.gov.cn/", color: "#a855f7" },
          { name: "港澳通行证", desc: "团队游/个人游申请", url: "https://s.nia.gov.cn/", color: "#0ea5e9" },
          { name: "台湾通行证", desc: "赴台证件办理", url: "https://s.nia.gov.cn/", color: "#22c55e" },
          { name: "签证办理", desc: "各国签证申请", url: "https://www.visa.cn/", color: "#eab308" },
          { name: "市民卡申领", desc: "线上申领/线下办理", url: "https://www.96225.com/", color: "#3b82f6" },
          { name: "市民卡充值", desc: "电子钱包/公园年卡", url: "https://www.96225.com/", color: "#ef4444" },
          { name: "公园年卡", desc: "办理/续费/使用范围", url: "https://www.96225.com/", color: "#10b981" },
          { name: "健康证办理", desc: "从业人员健康证明", url: "https://wsjkw.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "驾驶证业务", desc: "换证/补证/转入", url: "https://zj.122.gov.cn/", color: "#8b5cf6" },
          { name: "行驶证业务", desc: "补领/换领/变更", url: "https://zj.122.gov.cn/", color: "#06b6d4" },
          { name: "营业执照", desc: "设立/变更/注销", url: "https://www.zjzwfw.gov.cn/", color: "#ec4899" },
          { name: "税务登记", desc: "税务登记/申报", url: "https://www.zjzwfw.gov.cn/", color: "#14b8a6" },
          { name: "社保卡申领", desc: "社保卡办理/激活", url: "https://www.zjzwfw.gov.cn/", color: "#84cc16" },
          { name: "高层次人才认定", desc: "A/B/C/D/E类人才", url: "https://hrss.hangzhou.gov.cn/", color: "#f97316" },
          { name: "毕业生补贴", desc: "生活补贴/租房补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "创业资助", desc: "大学生创业扶持", url: "https://hrss.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "技能补贴", desc: "职业技能提升补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "住房补贴", desc: "公租房/人才房申请", url: "https://fgj.hangzhou.gov.cn/", color: "#eab308" },
          { name: "浙里办", desc: "全省政务一网通办", url: "https://www.zjzwfw.gov.cn/", color: "#3b82f6" },
          { name: "12345热线", desc: "市长热线咨询", url: "tel:12345", color: "#ef4444" },
          { name: "发票抽奖", desc: "有奖发票登记", url: "https://www.hangzhou.gov.cn/col/col1229151238/index.html", color: "#f59e0b" },
          { name: "学历认证", desc: "学信网验证报告", url: "https://www.chsi.com.cn/", color: "#10b981" },
          { name: "房产证明", desc: "不动产登记证明", url: "https://fgj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "无犯罪记录", desc: "证明开具申请", url: "https://gaj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "婚姻登记", desc: "结婚/离婚登记预约", url: "https://www.zjzwfw.gov.cn/", color: "#ec4899" },
          { name: "生育服务", desc: "生育登记/证明", url: "https://www.zjzwfw.gov.cn/", color: "#14b8a6" },
          { name: "工资计算器", desc: "个税/社保计算", action: "tax" },
          { name: "万年历", desc: "农历/节气/黄历", action: "calendar" }
        ]
      },
      {
        id: "traffic", name: "交通出行", icon: "🗺️",
        items: [
          { name: "今日限行", desc: "尾号限行查询", action: "xianxing", color: "#ef4444" },
          { name: "浙A摇号", desc: "小客车指标申请", url: "https://xkctk.hzcb.gov.cn/", color: "#f59e0b" },
          { name: "浙A竞价", desc: "车牌竞价出价", url: "https://xkctk.hzcb.gov.cn/", color: "#10b981" },
          { name: "浙M区域牌", desc: "区域指标申请", url: "https://xkctk.hzcb.gov.cn/", color: "#3b82f6" },
          { name: "外地车限行", desc: "非浙A限行规定", url: "https://zzy.hzpolice.gov.cn/", color: "#8b5cf6" },
          { name: "急事通申请", desc: "周末/节假日通行证", url: "https://zzy.hzpolice.gov.cn/", color: "#06b6d4" },
          { name: "地铁线路图", desc: "1-19号线全覆盖", url: "https://www.hzmetro.com/", color: "#ec4899" },
          { name: "地铁时刻表", desc: "首末班车时间", url: "https://www.hzmetro.com/", color: "#14b8a6" },
          { name: "地铁票价", desc: "票价计算/换乘", url: "https://www.hzmetro.com/", color: "#84cc16" },
          { name: "公交查询", desc: "线路/换乘/到站", url: "https://www.hzbus.com.cn/", color: "#f97316" },
          { name: "公交实时", desc: "到站提醒/等待时间", url: "https://www.hzbus.com.cn/", color: "#a855f7" },
          { name: "水上巴士", desc: "运河线/塘栖线", url: "https://www.hzbus.com.cn/", color: "#0ea5e9" },
          { name: "公共自行车", desc: "小红车借还点", url: "https://www.hzbus.com.cn/", color: "#22c55e" },
          { name: "共享单车", desc: "哈啰/美团/青桔", url: "https://www.hellobike.com/", color: "#eab308" },
          { name: "火车票", desc: "12306购票", url: "https://www.12306.cn/", color: "#3b82f6" },
          { name: "高铁时刻", desc: "杭州东/西/南站", url: "https://www.12306.cn/", color: "#ef4444" },
          { name: "萧山机场", desc: "航班查询/大巴", url: "https://www.hzairport.com/", color: "#10b981" },
          { name: "机场大巴", desc: "武林门/平海路等", url: "https://www.hzairport.com/", color: "#f59e0b" },
          { name: "机票预订", desc: "特价机票搜索", url: "https://www.ctrip.com/", color: "#8b5cf6" },
          { name: "汽车票", desc: "九堡/客运中心", url: "https://www.8684.cn/hz", color: "#06b6d4" },
          { name: "打车软件", desc: "滴滴/曹操/高德", url: "https://www.didiglobal.com/", color: "#ec4899" },
          { name: "顺风车", desc: "跨城拼车", url: "https://www.顺风车.com/", color: "#14b8a6" },
          { name: "ETC办理", desc: "浙通卡办理充值", url: "https://www.zjetc.cn/", color: "#84cc16" },
          { name: "油价查询", desc: "今日油价", action: "youjia", color: "#f97316" },
          { name: "杭州天气", desc: "实时天气/预报", action: "weather", color: "#a855f7" },
          { name: "钱塘江潮汐", desc: "观潮时间表", url: "https://www.gongshumeiti.com/", color: "#0ea5e9" },
          { name: "交通违章", desc: "违法查询/处理", url: "https://zj.122.gov.cn/", color: "#22c55e" },
          { name: "停车缴费", desc: "道路停车支付", url: "https://www.hzttx.cn/", color: "#eab308" },
          { name: "停车场查询", desc: "附近停车场", url: "https://www.hzttx.cn/", color: "#3b82f6" },
          { name: "春运购票", desc: "春节抢票攻略", url: "https://www.12306.cn/", color: "#ef4444" }
        ]
      },
      {
        id: "vehicle", name: "车辆服务", icon: "🚘",
        items: [
          { name: "摇号申请", desc: "浙A小客车指标", url: "https://xkctk.hzcb.gov.cn/", color: "#ef4444" },
          { name: "竞价申请", desc: "浙A车牌竞价", url: "https://xkctk.hzcb.gov.cn/", color: "#f59e0b" },
          { name: "区域号牌", desc: "浙M指标申请", url: "https://xkctk.hzcb.gov.cn/", color: "#10b981" },
          { name: "新能源牌照", desc: "绿牌申领政策", url: "https://xkctk.hzcb.gov.cn/", color: "#3b82f6" },
          { name: "车辆年检", desc: "年检时间/地点", url: "https://zj.122.gov.cn/", color: "#8b5cf6" },
          { name: "年检预约", desc: "网上预约年检", url: "https://zj.122.gov.cn/", color: "#06b6d4" },
          { name: "六年免检", desc: "免检标志申领", url: "https://zj.122.gov.cn/", color: "#ec4899" },
          { name: "违章查询", desc: "电子眼/贴条", url: "https://zj.122.gov.cn/", color: "#14b8a6" },
          { name: "违章处理", desc: "线上处理/缴费", url: "https://zj.122.gov.cn/", color: "#84cc16" },
          { name: "学法减分", desc: "驾照加分学习", url: "https://zj.122.gov.cn/", color: "#f97316" },
          { name: "驾照换证", desc: "期满换证/超龄换证", url: "https://zj.122.gov.cn/", color: "#a855f7" },
          { name: "驾照补证", desc: "遗失补领", url: "https://zj.122.gov.cn/", color: "#0ea5e9" },
          { name: "驾照转入", desc: "外地驾照转入杭州", url: "https://zj.122.gov.cn/", color: "#22c55e" },
          { name: "驾照满分学习", desc: "12分学习考试", url: "https://zj.122.gov.cn/", color: "#eab308" },
          { name: "行驶证业务", desc: "补领/换领/变更", url: "https://zj.122.gov.cn/", color: "#3b82f6" },
          { name: "车辆过户", desc: "二手车交易过户", url: "https://zj.122.gov.cn/", color: "#ef4444" },
          { name: "车辆上牌", desc: "新车上牌流程", url: "https://zj.122.gov.cn/", color: "#10b981" },
          { name: "车管所网点", desc: "各区车管所地址", url: "https://zj.122.gov.cn/", color: "#f59e0b" },
          { name: "网约车从业", desc: "网约车驾驶员证", url: "https://gaj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "货运从业", desc: "货运资格证办理", url: "https://gaj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "停车包月", desc: "道路包月申请", url: "https://www.hzttx.cn/", color: "#ec4899" },
          { name: "小区停车", desc: "物业停车管理", url: "https://fgj.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "新能源补贴", desc: "购车补贴申请", url: "https://fgj.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "报废车辆", desc: "老旧车报废补贴", url: "https://zj.122.gov.cn/", color: "#f97316" }
        ]
      },
      {
        id: "life", name: "民生服务", icon: "🛍️",
        items: [
          { name: "消费券领取", desc: "数字人民币/满减券", url: "https://www.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "发票抽奖", desc: "有奖发票登记", url: "https://www.hangzhou.gov.cn/col/col1229151238/index.html", color: "#f59e0b" },
          { name: "水费缴纳", desc: "杭州水务集团", url: "https://www.hzwater.com.cn/", color: "#10b981" },
          { name: "电费缴纳", desc: "国家电网", url: "https://www.95598.cn/", color: "#3b82f6" },
          { name: "燃气缴费", desc: "杭州燃气", url: "https://www.hzgas.com.cn/", color: "#8b5cf6" },
          { name: "固话宽带", desc: "电信/联通/移动", url: "https://www.10086.cn/", color: "#06b6d4" },
          { name: "有线电视", desc: "华数传媒", url: "https://www.wasu.com/", color: "#ec4899" },
          { name: "医院挂号", desc: "浙一/浙二/邵逸夫", url: "https://www.zj12580.cn/", color: "#14b8a6" },
          { name: "儿童疫苗", desc: "疫苗预约/接种", url: "https://wsjkw.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "新冠疫苗", desc: "加强针预约", url: "https://wsjkw.hangzhou.gov.cn/", color: "#f97316" },
          { name: "HPV疫苗", desc: "九价/四价预约", url: "https://wsjkw.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "流感疫苗", desc: "季节性流感疫苗", url: "https://wsjkw.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "带状疱疹疫苗", desc: "中老年人疫苗", url: "https://wsjkw.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "药店查询", desc: "医保定点药店", url: "https://wsjkw.hangzhou.gov.cn/", color: "#eab308" },
          { name: "母婴室", desc: "公共场所母婴室", url: "https://wsjkw.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "重名查询", desc: "姓名查重", url: "https://zzy.hzpolice.gov.cn/", color: "#ef4444" },
          { name: "快递查询", desc: "全网物流追踪", url: "https://www.kuaidi100.com/", color: "#10b981" },
          { name: "家政服务", desc: "保洁/搬家/维修", url: "https://www.51jz.cn/", color: "#f59e0b" },
          { name: "开锁服务", desc: "备案开锁单位", url: "https://gaj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "二手交易", desc: "闲置物品转让", url: "https://www.huishoubao.com.cn/", color: "#06b6d4" },
          { name: "福利彩票", desc: "双色球/大乐透", url: "https://www.cwl.gov.cn/", color: "#ec4899" },
          { name: "体育彩票", desc: "竞彩/排列三", url: "https://www.lottery.gov.cn/", color: "#14b8a6" },
          { name: "电影排片", desc: "影院/场次/选座", url: "https://www.mtime.com/", color: "#84cc16" },
          { name: "垃圾分类", desc: "分类查询/投放点", url: "https://www.hzscjzx.com/", color: "#f97316" },
          { name: "公厕查询", desc: "公厕位置导航", url: "https://www.hzscjzx.com/", color: "#a855f7" },
          { name: "急救电话", desc: "120/999急救", url: "tel:120", color: "#0ea5e9" },
          { name: "心理咨询", desc: "心理援助热线", url: "https://www.zjzx.org.cn/", color: "#22c55e" },
          { name: "法律援助", desc: "12348法律热线", url: "tel:12348", color: "#eab308" },
          { name: "消费者投诉", desc: "12315投诉举报", url: "tel:12315", color: "#3b82f6" },
          { name: "价格举报", desc: "12358价格热线", url: "tel:12358", color: "#ef4444" }
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
          { name: "今日招聘", desc: "最新招聘信息（日更）", url: "https://hrss.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "事业单位招聘", desc: "编制内岗位公告", url: "https://hrss.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "国企招聘", desc: "杭州国企岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#10b981" },
          { name: "政府机关", desc: "公务员/编外招聘", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "教师招聘", desc: "学校/培训机构", url: "https://jyj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "医院招聘", desc: "医生/护士/行政", url: "https://wsjkw.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "大厂招聘", desc: "阿里/网易/字节", url: "https://www.lagou.com/hangzhou/", color: "#ec4899" },
          { name: "校园招聘", desc: "秋招/春招信息", url: "https://www.zhaopin.com/", color: "#14b8a6" },
          { name: "实习岗位", desc: "大学生实习", url: "https://www.zhaopin.com/intern/", color: "#84cc16" },
          { name: "兼职信息", desc: "短期/临时工", url: "https://www.zhaopin.com/parttime/", color: "#f97316" },
          { name: "低门槛岗位", desc: "不限学历", url: "https://www.zhaopin.com/", color: "#a855f7" },
          { name: "AI/算法岗", desc: "人工智能岗位", url: "https://www.lagou.com/ai/", color: "#0ea5e9" },
          { name: "前端开发", desc: "Web/小程序", url: "https://www.lagou.com/tech/", color: "#22c55e" },
          { name: "后端开发", desc: "Java/Python/Go", url: "https://www.lagou.com/tech/", color: "#eab308" },
          { name: "产品经理", desc: "互联网产品", url: "https://www.lagou.com/hangzhou/", color: "#3b82f6" },
          { name: "设计岗位", desc: "UI/UX/平面", url: "https://www.lagou.com/design/", color: "#ef4444" },
          { name: "运营岗位", desc: "内容/用户/活动", url: "https://www.lagou.com/operation/", color: "#f59e0b" },
          { name: "金融岗位", desc: "银行/证券/基金", url: "https://www.lagou.com/finance/", color: "#10b981" },
          { name: "法务岗位", desc: "律师/法务顾问", url: "https://www.lagou.com/legal/", color: "#8b5cf6" },
          { name: "销售岗位", desc: "BD/客户经理", url: "https://www.zhaopin.com/sales/", color: "#06b6d4" },
          { name: "人事行政", desc: "HR/行政", url: "https://www.zhaopin.com/hr/", color: "#ec4899" },
          { name: "残疾人就业", desc: "专属岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "退役军人", desc: "军转干部安置", url: "https://tyjr.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "外籍人才", desc: "外国人就业许可", url: "https://hzrcw.com.cn/", color: "#f97316" },
          { name: "高层次人才", desc: "博士/博士后", url: "https://www.hzrcw.com.cn/", color: "#a855f7" },
          { name: "浙江省考", desc: "省公务员考试", url: "https://gwyty.jxpta.com/", color: "#0ea5e9" },
          { name: "国家公务员", desc: "国考报名录用", url: "https://bm.scs.gov.cn/", color: "#22c55e" },
          { name: "选调生", desc: "应届生选拔", url: "https://www.zjzzb.gov.cn/", color: "#eab308" },
          { name: "事业单位联考", desc: "综合类/教育类", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "银行校招", desc: "浙江银行招聘", url: "https://www.zjzg.org.cn/", color: "#ef4444" },
          { name: "烟草招聘", desc: "烟草局招聘", url: "https://www.tobacco.gov.cn/", color: "#f59e0b" },
          { name: "电网招聘", desc: "国家电网", url: "https://zhaopin.sgcc.com.cn/", color: "#10b981" },
          { name: "三大运营商", desc: "移动/电信/联通", url: "https://www.10086.cn/", color: "#8b5cf6" },
          { name: "招聘会排期", desc: "线下招聘会", url: "https://hrss.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "人才市场", desc: "综合性招聘会", url: "https://www.hzrc12333.gov.cn/", color: "#ec4899" },
          { name: "简历模板", desc: "免费简历下载", url: "https://www.officeplus.cn/", color: "#14b8a6" },
          { name: "求职补贴", desc: "就业困难补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "创业扶持", desc: "创业贷款政策", url: "https://hrss.hangzhou.gov.cn/", color: "#f97316" }
        ]
      },
      {
        id: "housing", name: "住房保障", icon: "🏠",
        items: [
          { name: "公租房申请", desc: "申请条件/流程", url: "https://fgj.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "公租房选房", desc: "实物配租", url: "https://fgj.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "公租房续租", desc: "续租申请", url: "https://fgj.hangzhou.gov.cn/", color: "#10b981" },
          { name: "人才专项房", desc: "高层次人才房", url: "https://fgj.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "蓝领公寓", desc: "外来务工人员", url: "https://fgj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "保障性租赁房", desc: "保租房申请", url: "https://fgj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "租房补贴", desc: "新就业大学生", url: "https://fgj.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "购房资格", desc: "限购政策查询", url: "https://fgj.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "新房楼盘", desc: "在售楼盘", url: "https://hz.lianjia.com/loupan/", color: "#84cc16" },
          { name: "二手房", desc: "房源/价格", url: "https://hz.lianjia.com/", color: "#f97316" },
          { name: "租房攻略", desc: "各区县租金", url: "https://hz.lianjia.com/zufang/", color: "#a855f7" },
          { name: "自如租房", desc: "品牌公寓", url: "https://www.ziroom.com/hangzhou/", color: "#0ea5e9" },
          { name: "我爱我家", desc: "中介服务", url: "https://www.5i5j.com/hangzhou/", color: "#22c55e" },
          { name: "房贷计算器", desc: "月供计算", action: "loan", color: "#eab308" },
          { name: "公积金贷款", desc: "额度/利率", url: "https://gjj.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "商业贷款", desc: "贷款计算", url: "https://www.bankcomm.com/", color: "#ef4444" },
          { name: "组合贷款", desc: "公积金+商业", url: "https://gjj.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "提前还款", desc: "还款计算", url: "https://gjj.hangzhou.gov.cn/", color: "#10b981" },
          { name: "房产过户", desc: "税费计算", url: "https://fgj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "不动产登记", desc: "房产证办理", url: "https://fgj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "抵押贷款", desc: "房产抵押", url: "https://fgj.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "人才驿站", desc: "免费住7天", url: "https://hrss.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "青年公寓", desc: "应届毕业生", url: "https://fgj.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "酒店式公寓", desc: "长租公寓", url: "https://www.danke.com/hangzhou/", color: "#f97316" },
          { name: "法拍房", desc: "司法拍卖", url: "https://www.fang.com/ph/", color: "#a855f7" },
          { name: "房产评估", desc: "价格评估", url: "https://hz.lianjia.com/", color: "#0ea5e9" },
          { name: "中介费计算", desc: "收费标准", url: "https://hz.lianjia.com/", color: "#22c55e" },
          { name: "物业费查询", desc: "各小区物业", url: "https://fgj.hangzhou.gov.cn/", color: "#eab308" },
          { name: "维修基金", desc: "使用规定", url: "https://fgj.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "业主委员会", desc: "成立流程", url: "https://fgj.hangzhou.gov.cn/", color: "#ef4444" }
        ]
      },
      {
        id: "travel", name: "旅游休闲", icon: "🏞️",
        items: [
          { name: "西湖景区", desc: "景点/游船/预约", url: "https://whol.mztrip.com/", color: "#ef4444" },
          { name: "西湖手划船", desc: "摇橹船预约", url: "https://whol.mztrip.com/", color: "#f59e0b" },
          { name: "灵隐寺", desc: "免费预约入园", url: "https://www.lingyinsi.org.cn/", color: "#10b981" },
          { name: "法喜寺", desc: "网红斋饭/白玉兰", url: "https://www.lingyinsi.org.cn/", color: "#3b82f6" },
          { name: "景点预约", desc: "杭州各景点预约入口", url: "https://www.hangzhou.gov.cn/col/col1229013854/index.html", color: "#8b5cf6" },
          { name: "西溪湿地", desc: "门票/摇橹船", url: "https://www.xixiwetland.com.cn/", color: "#06b6d4" },
          { name: "千岛湖", desc: "景区/游船/住宿", url: "https://www.qiandaohu.cn/", color: "#ec4899" },
          { name: "钱塘江大潮", desc: "观潮时间表/地点", url: "https://www.gongshumeiti.com/", color: "#14b8a6" },
          { name: "宋城演艺", desc: "千古情演出", url: "https://www.songcn.com/", color: "#84cc16" },
          { name: "杭州乐园", desc: "主题乐园", url: "https://www.hzfw.com/", color: "#f97316" },
          { name: "杭州动物园", desc: "野生动物园", url: "https://www.hzzoo.com/", color: "#a855f7" },
          { name: "杭州植物园", desc: "四季花展", url: "https://www.hzbg.cn/", color: "#0ea5e9" },
          { name: "良渚古城", desc: "世界遗产", url: "https://www.ljgc.cn/", color: "#22c55e" },
          { name: "京杭大运河", desc: "运河夜游", url: "https://www.canaln.com/", color: "#eab308" },
          { name: "杭州博物馆", desc: "免费预约参观", url: "https://www.hzmuseum.cn/", color: "#3b82f6" },
          { name: "中国茶叶博物馆", desc: "免预约入馆", url: "https://www.teamuseum.cn/", color: "#ef4444" },
          { name: "丝绸博物馆", desc: "免预约", url: "https://www.chinasilkmuseum.com/", color: "#f59e0b" },
          { name: "南宋官窑博物馆", desc: "陶瓷艺术", url: "https://www.guanyao.cn/", color: "#10b981" },
          { name: "刀剪剑博物馆", desc: "非遗传承", url: "https://www.hzmuseums.cn/", color: "#8b5cf6" },
          { name: "演唱会", desc: "近期演出信息", url: "https://www.damai.cn/", color: "#06b6d4" },
          { name: "音乐节", desc: "草莓/迷笛", url: "https://www.damai.cn/", color: "#ec4899" },
          { name: "话剧歌剧", desc: "剧院演出", url: "https://www.piaonet.com/", color: "#14b8a6" },
          { name: "杭州马拉松", desc: "报名/路线", url: "https://www.hangzhoumarathon.com/", color: "#84cc16" },
          { name: "浙BA篮球", desc: "城市篮球联赛", url: "https://tyj.hangzhou.gov.cn/", color: "#f97316" },
          { name: "足球联赛", desc: "中甲联赛", url: "https://tyj.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "电竞比赛", desc: "LGD主场", url: "https://www.lgdgj.com/", color: "#0ea5e9" },
          { name: "赏花地图", desc: "梅花/樱花/荷花", url: "https://whol.mztrip.com/", color: "#22c55e" },
          { name: "水果采摘", desc: "草莓/枇杷/杨梅", url: "https://www.hangzhou.gov.cn/", color: "#eab308" },
          { name: "亲子乐园", desc: "儿童游玩", url: "https://whol.mztrip.com/", color: "#3b82f6" },
          { name: "露营基地", desc: "免费/收费营地", url: "https://whol.mztrip.com/", color: "#ef4444" },
          { name: "爬山推荐", desc: "北高峰/贵人峰", url: "https://whol.mztrip.com/", color: "#f59e0b" },
          { name: "免费景点", desc: "免费开放日", url: "https://whol.mztrip.com/", color: "#10b981" },
          { name: "古镇古村", desc: "塘栖/河桥/荻浦", url: "https://whol.mztrip.com/", color: "#8b5cf6" },
          { name: "网红打卡", desc: "拍照圣地", url: "https://whol.mztrip.com/", color: "#06b6d4" },
          { name: "杭帮菜", desc: "知味观/楼外楼", url: "https://www.dianping.com/hangzhou/", color: "#ec4899" },
          { name: "龙井问茶", desc: "茶园体验", url: "https://www.ljcy.gov.cn/", color: "#14b8a6" },
          { name: "夜游攻略", desc: "夜景/夜宵", url: "https://whol.mztrip.com/", color: "#84cc16" }
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
          { name: "消费券申领", desc: "杭州消费券/数字人民币", url: "https://www.hangzhou.gov.cn/col/col1229013850/index.html", color: "#ef4444" },
          { name: "政府补贴", desc: "人才/就业/住房补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "发票抽奖", desc: "杭州发票抽奖登记入口", url: "https://www.hangzhou.gov.cn/col/col1229151238/index.html", color: "#10b981" },
          { name: "人才驿站", desc: "来杭求职免费住7天", url: "https://hzrcw.com.cn/", color: "#3b82f6" },
          { name: "毕业生补贴", desc: "应届生生活补贴申请", url: "https://hrss.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "租房补贴", desc: "新就业大学生租房补贴", url: "https://fgj.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "灵隐寺预约", desc: "免费预约入园", url: "https://www.lingyinsi.org.cn/", color: "#06b6d4" },
          { name: "西湖游船", desc: "手划船/自开船票价", url: "https://whol.mztrip.com/", color: "#14b8a6" },
          { name: "公园年卡", desc: "杭州公园年卡办理", url: "https://www.96225.com/", color: "#84cc16" },
          { name: "市民卡优惠", desc: "公共交通/景区优惠", url: "https://www.96225.com/", color: "#f97316" },
          { name: "工会福利", desc: "职工医疗互助/疗休养", url: "https://gh.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "银龄人才", desc: "退休专家补贴政策", url: "https://hrss.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "创业扶持", desc: "大学生创业资助申报", url: "https://hrss.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "技能补贴", desc: "职业技能提升补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#eab308" },
          { name: "新能源补贴", desc: "新能源汽车购置补贴", url: "https://fgj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "家电以旧换新", desc: "绿色智能家电补贴", url: "https://www.hangzhou.gov.cn/", color: "#f43f5e" },
          { name: "体育消费券", desc: "健身/游泳/羽毛球", url: "https://tyj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "文化惠民", desc: "剧院/图书馆优惠券", url: "https://whg.culturehz.gov.cn/", color: "#14b8a6" },
          { name: "夜校课程", desc: "成人兴趣班优惠报名", url: "https://hrss.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "免费培训", desc: "政府补贴职业技能培训", url: "https://hz.nvq.net.cn/", color: "#f59e0b" }
        ]
      },
      {
        id: "education", name: "教育培训", icon: "🎓",
        items: [
          { name: "幼儿园入园", desc: "报名时间/材料/流程", url: "https://jyj.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "小学入学", desc: "小学报名/学区划分", url: "https://jyj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "初中入学", desc: "小升初/电脑派位", url: "https://jyj.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "杭州中考", desc: "报名/考试/录取查询", url: "https://jyj.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "浙江高考", desc: "报名/志愿/录取查询", url: "https://www.zjzs.net/", color: "#10b981" },
          { name: "研究生考试", desc: "报名/考点/成绩查询", url: "https://www.chsi.com.cn/", color: "#f59e0b" },
          { name: "自学考试", desc: "浙江自考报名/成绩", url: "https://www.zjzs.net/", color: "#06b6d4" },
          { name: "教师资格证", desc: "笔试/面试/认定", url: "https://ntce.neea.edu.cn/", color: "#14b8a6" },
          { name: "普通话测试", desc: "报名/成绩查询", url: "https://www.cltt.org/", color: "#84cc16" },
          { name: "学区房查询", desc: "各区小学/初中对口", url: "https://jyj.hangzhou.gov.cn/", color: "#f97316" },
          { name: "学校名单", desc: "幼儿园至高校名单", url: "https://jyj.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "培训机构", desc: "合规培训机构白名单", url: "https://jyj.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "免费技能培训", desc: "政府补贴培训项目", url: "https://hrss.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "夜校课程", desc: "成人教育/兴趣班", url: "https://hrss.hangzhou.gov.cn/", color: "#eab308" },
          { name: "学历认证", desc: "学信网验证报告", url: "https://www.chsi.com.cn/", color: "#3b82f6" },
          { name: "海外学历认证", desc: "留学回国学历认证", url: "https://zwfw.cscse.edu.cn/", color: "#8b5cf6" }
        ]
      },
      {
        id: "zhaopin", name: "人才招聘", icon: "💼",
        items: [
          { name: "事业单位招聘", desc: "编制内岗位/公告", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "国企招聘", desc: "杭州国企岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "公务员省考", desc: "浙江省考公告", url: "https://gwyty.jxpta.com/", color: "#10b981" },
          { name: "国家公务员", desc: "国考报名/录用", url: "https://bm.scs.gov.cn/", color: "#8b5cf6" },
          { name: "杭州名企", desc: "上市公司/头部企业", url: "https://www.lagou.com/hangzhou/", color: "#f59e0b" },
          { name: "校园招聘", desc: "秋招/春招信息", url: "https://www.zhaopin.com/", color: "#06b6d4" },
          { name: "残疾人就业", desc: "残疾人专属岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "退役军人就业", desc: "军转干部安置", url: "https://tyjr.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "灵活就业", desc: "兼职/自由职业", url: "https://www.zhaopin.com/", color: "#84cc16" },
          { name: "AI/互联网", desc: "技术岗位招聘", url: "https://www.lagou.com/hangzhou/", color: "#f97316" },
          { name: "实习岗位", desc: "大学生实习信息", url: "https://www.zhaopin.com/", color: "#a855f7" },
          { name: "外籍人才", desc: "外国人就业许可", url: "https://hzrcw.com.cn/", color: "#0ea5e9" },
          { name: "博士后工作站", desc: "高层次人才进站", url: "https://www.hzrcw.com.cn/", color: "#22c55e" },
          { name: "人才认定", desc: "高层次人才分类认定", url: "https://hrss.hangzhou.gov.cn/", color: "#eab308" },
          { name: "求职补贴", desc: "就业困难补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "招聘会信息", desc: "线下招聘会排期", url: "https://hrss.hangzhou.gov.cn/", color: "#ef4444" }
        ]
      },
      {
        id: "food", name: "杭帮菜谱", icon: "🍜",
        items: [
          { name: "西湖醋鱼", desc: "楼外楼首创名菜", color: "#ef4444" },
          { name: "龙井虾仁", desc: "茶香四溢名菜", color: "#10b981" },
          { name: "东坡肉", desc: "苏东坡发明", color: "#f59e0b" },
          { name: "叫化鸡", desc: "荷叶香鸡", color: "#8b5cf6" },
          { name: "宋嫂鱼羹", desc: "西湖名菜", color: "#06b6d4" },
          { name: "干炸响铃", desc: "腐皮酥脆名点", color: "#f97316" },
          { name: "西湖莼菜", desc: "滑嫩爽口", color: "#14b8a6" },
          { name: "片儿川", desc: "杭州特色面", color: "#ec4899" },
          { name: "虾爆鳝面", desc: "奎元馆招牌", color: "#3b82f6" },
          { name: "知味观小笼", desc: "鲜肉汤包", color: "#84cc16" },
          { name: "吴山酥油饼", desc: "千年历史名点", color: "#a855f7" },
          { name: "葱包烩", desc: "杭州街头小吃", color: "#0ea5e9" },
          { name: "定胜糕", desc: "岳王庙特色", color: "#ef4444" },
          { name: "猫耳朵", desc: "知味观名点", color: "#22c55e" },
          { name: "幸福双", desc: "豆沙糯米点心", color: "#eab308" },
          { name: "小鸡酥", desc: "酥皮甜点", color: "#f59e0b" },
          { name: "木莲芯", desc: "清凉甜品", color: "#ec4899" },
          { name: "杭州酱鸭", desc: "冬季传统美食", color: "#8b5cf6" }
        ]
      },
      {
        id: "laozihao", name: "杭州老字号", icon: "🏮",
        items: [
          { name: "胡庆余堂", desc: "百年国药馆·河坊街", url: "https://www.hqyt.com/", color: "#ef4444" },
          { name: "王星记", desc: "丝绸扇·扇子博物馆", url: "https://www.wangxingji.com/", color: "#f59e0b" },
          { name: "张小泉", desc: "百年名刀·刀剪博物馆", url: "https://www.zxc.com.cn/", color: "#10b981" },
          { name: "都锦生", desc: "织锦之王·茅家埠", url: "https://www.djinsilk.com/", color: "#3b82f6" },
          { name: "知味观", desc: "百年老店·东坡路", url: "https://www.zhiweiguan.com.cn/", color: "#8b5cf6" },
          { name: "楼外楼", desc: "西湖醋鱼发源地", url: "https://www.louwailou.com.cn/", color: "#ec4899" },
          { name: "奎元馆", desc: "片儿川始祖·解放路", url: "https://www.kuiyukuan.com/", color: "#06b6d4" },
          { name: "天香楼", desc: "正宗杭帮菜", url: "https://www.tianxianglou.com/", color: "#14b8a6" },
          { name: "山外山", desc: "杭帮菜名店·植物园", url: "https://www.shanwaishan.com/", color: "#84cc16" },
          { name: "西泠印社", desc: "金石篆刻·孤山路", url: "https://www.xlysan.com/", color: "#f97316" },
          { name: "邵芝岩", desc: "百年毛笔·中山路", url: "https://www.shaozhiyan.com/", color: "#a855f7" },
          { name: "孔凤春", desc: "百年化妆品·河坊街", url: "https://www.kongfengchun.com/", color: "#0ea5e9" },
          { name: "龙泉青瓷", desc: "国家级非遗", url: "https://www.longquancizhou.com/", color: "#22c55e" },
          { name: "万事利", desc: "国礼丝绸品牌", url: "https://www.wensli.com/", color: "#eab308" }
        ]
      },
      {
        id: "celebrity", name: "杭州名人", icon: "👤",
        items: [
          { name: "林徽因", desc: "建筑师的江南情怀", color: "#ef4444" },
          { name: "胡雪岩", desc: "红顶商人·元宝街", url: "https://www.hzxyny.com/", color: "#f59e0b" },
          { name: "白居易", desc: "杭州刺史·西湖诗人", color: "#10b981" },
          { name: "苏东坡", desc: "西湖筑堤·文豪", color: "#3b82f6" },
          { name: "岳飞", desc: "精忠报国·岳王庙", color: "#8b5cf6" },
          { name: "李清照", desc: "宋词才女", color: "#ec4899" },
          { name: "陆游", desc: "爱国诗人", color: "#06b6d4" },
          { name: "于谦", desc: "明代名臣·清河坊", color: "#14b8a6" },
          { name: "郁达夫", desc: "文学巨匠·大学路", color: "#84cc16" },
          { name: "章太炎", desc: "国学大师·余杭塘栖", color: "#f97316" },
          { name: "马一浮", desc: "国学传奇", color: "#a855f7" },
          { name: "李叔同", desc: "弘一法师·虎跑", color: "#0ea5e9" },
          { name: "史量才", desc: "报业大王", color: "#22c55e" },
          { name: "戴望舒", desc: "雨巷诗人", color: "#eab308" },
          { name: "黄宾虹", desc: "国画大师·栖霞岭", color: "#ef4444" },
          { name: "潘天寿", desc: "美术教育家·南山路", color: "#3b82f6" }
        ]
      },
      {
        id: "history", name: "历史文化", icon: "🏯",
        items: [
          { name: "南宋皇城", desc: "南宋遗址公园", color: "#ef4444" },
          { name: "良渚古城", desc: "世界遗产·余杭", url: "https://www.liangzhu.com/", color: "#f59e0b" },
          { name: "京杭大运河", desc: "世界遗产·拱宸桥", url: "https://www.yhcanal.com/", color: "#10b981" },
          { name: "西湖文化", desc: "世界遗产", url: "https://whol.mztrip.com/", color: "#3b82f6" },
          { name: "钱塘江", desc: "观潮胜地", url: "https://www.gongshumeiti.com/", color: "#8b5cf6" },
          { name: "吴越文化", desc: "钱王陵园·临安", color: "#ec4899" },
          { name: "龙井茶文化", desc: "茶博馆·龙井路", url: "https://www.teamuseum.cn/", color: "#06b6d4" },
          { name: "丝绸文化", desc: "丝绸博物馆·玉皇山路", url: "https://www.chinasilkmuseum.com/", color: "#14b8a6" },
          { name: "运河文化", desc: "运河博物馆·拱墅", color: "#84cc16" },
          { name: "南宋官窑", desc: "南宋官窑博物馆", color: "#f97316" },
          { name: "藏书文化", desc: "文澜阁·圣因寺遗址", color: "#a855f7" },
          { name: "佛教文化", desc: "灵隐寺·法喜寺", url: "https://www.lingyinsi.org.cn/", color: "#0ea5e9" }
        ]
      },
      {
        id: "internet", name: "互联网大厂", icon: "💻",
        items: [
          { name: "阿里巴巴", desc: "淘宝/支付宝·余杭", url: "https://www.alibabagroup.com/", color: "#ff6600" },
          { name: "蚂蚁集团", desc: "支付宝/余额宝·西湖区", url: "https://www.antgroup.com/", color: "#1677ff" },
          { name: "网易", desc: "游戏/音乐·滨江区", url: "https://www.163.com/", color: "#ea4335" },
          { name: "字节跳动", desc: "抖音·余杭区", url: "https://www.bytedance.com/", color: "#fe2c55" },
          { name: "阿里云", desc: "云计算·余杭", url: "https://www.aliyun.com/", color: "#ff6600" },
          { name: "菜鸟网络", desc: "物流科技·西湖区", url: "https://www.cainiao.com/", color: "#00aeef" },
          { name: "海康威视", desc: "安防监控·滨江区", url: "https://www.hikvision.com/", color: "#0070f3" },
          { name: "大华股份", desc: "智慧城市·滨江区", url: "https://www.dahuatech.com/", color: "#4a90e2" },
          { name: "新华三", desc: "网络设备·滨江区", url: "https://www.h3c.com/", color: "#00a870" },
          { name: "涂鸦智能", desc: "IoT平台·西湖区", url: "https://www.tuya.com/", color: "#ff6b35" },
          { name: "同花顺", desc: "金融科技·余杭区", url: "https://www.10jqka.com.cn/", color: "#1989fa" },
          { name: "恒生电子", desc: "金融IT·滨江区", url: "https://www.hundsun.com/", color: "#07c160" },
          { name: "梦想小镇", desc: "互联网创业·余杭", url: "https://www.hzctp.cn/", color: "#722ed1" },
          { name: "云栖小镇", desc: "云计算产业园", url: "https://www.yunqismall.com/", color: "#1677ff" }
        ]
      },
      {
        id: "street", name: "杭州街道", icon: "🛤️",
        items: [
          { name: "河坊街", desc: "老字号地图·上城区", color: "#ef4444" },
          { name: "南山路", desc: "文艺进化史·西湖区", color: "#f59e0b" },
          { name: "延安路", desc: "百年变迁·下城区", color: "#10b981" },
          { name: "湖滨路", desc: "时光胶囊·上城区", color: "#3b82f6" },
          { name: "孩儿巷", desc: "市井风华·下城区", color: "#8b5cf6" },
          { name: "马塍弄", desc: "市井哲学·西湖区", color: "#ec4899" },
          { name: "仁和路", desc: "名流记忆·上城区", color: "#06b6d4" },
          { name: "惠民路", desc: "平民故事·上城区", color: "#14b8a6" },
          { name: "武林广场", desc: "商业帝国·下城区", color: "#84cc16" },
          { name: "庆春路", desc: "繁华演变·江干区", color: "#f97316" },
          { name: "文一路", desc: "高校文化带·西湖区", color: "#a855f7" },
          { name: "莫干山路", desc: "老工业记忆·拱墅区", color: "#0ea5e9" },
          { name: "解放路", desc: "交通枢纽记忆", color: "#22c55e" },
          { name: "钱江路", desc: "江岸新篇·CBD", color: "#eab308" },
          { name: "复兴路", desc: "历史回响·上城区", color: "#ef4444" }
        ]
      },
      {
        id: "weekend", name: "周末休闲", icon: "🎉",
        items: [
          { name: "亲子一日游", desc: "6条经典路线", color: "#ef4444" },
          { name: "免费景点", desc: "8处免费景点", color: "#f59e0b" },
          { name: "特色市集", desc: "逛吃指南", color: "#10b981" },
          { name: "短途自驾", desc: "半日逃离都市", color: "#3b82f6" },
          { name: "夜生活", desc: "亲子夜体验", color: "#8b5cf6" },
          { name: "DIY工坊", desc: "动手体验", color: "#ec4899" },
          { name: "博物馆", desc: "参观指南", color: "#06b6d4" },
          { name: "咖啡书吧", desc: "亲子推荐", color: "#14b8a6" },
          { name: "隐秘拍照点", desc: "20个拍照圣地", color: "#84cc16" },
          { name: "日落观景台", desc: "10处日落", color: "#f97316" },
          { name: "免费运动场", desc: "10处运动场所", color: "#a855f7" },
          { name: "凌晨美食", desc: "24小时营业", color: "#0ea5e9" }
        ]
      },
      {
        id: "museum", name: "博物馆", icon: "🏛️",
        items: [
          { name: "浙江省博物馆", desc: "之江馆区", url: "https://www.zjmuseum.com.cn/", color: "#ef4444" },
          { name: "浙江美术馆", desc: "南山路", url: "https://www.zjam.org.cn/", color: "#f59e0b" },
          { name: "杭州博物馆", desc: "吴山广场", url: "https://www.hzmuseum.cn/", color: "#10b981" },
          { name: "中国丝绸博物馆", desc: "玉皇山路", url: "https://www.chinasilkmuseum.com/", color: "#3b82f6" },
          { name: "中国茶叶博物馆", desc: "龙井路", url: "https://www.teamuseum.cn/", color: "#8b5cf6" },
          { name: "良渚博物院", desc: "世界遗产", url: "https://www.liangzhu.com/", color: "#ec4899" },
          { name: "运河博物馆", desc: "拱宸桥", url: "https://www.canalmuseum.cn/", color: "#06b6d4" },
          { name: "南宋官窑博物馆", desc: "南复路", color: "#14b8a6" },
          { name: "刀剪剑博物馆", desc: "小河路", url: "https://www.hzmuseums.cn/", color: "#84cc16" },
          { name: "伞博物馆", desc: "小河路", color: "#f97316" },
          { name: "扇博物馆", desc: "小河路", color: "#a855f7" },
          { name: "西泠印社", desc: "孤山路", url: "https://www.xlysan.com/", color: "#0ea5e9" }
        ]
      },
      {
        id: "coffee", name: "咖啡生活", icon: "☕",
        items: [
          { name: "西湖边咖啡馆", desc: "湖滨/断桥周边", color: "#ef4444" },
          { name: "南山路文艺", desc: "复古文艺咖啡馆", color: "#f59e0b" },
          { name: "网红咖啡馆", desc: "探店指南", color: "#10b981" },
          { name: "社区咖啡馆", desc: "日常时光", color: "#3b82f6" },
          { name: "咖啡豆文化", desc: "烘焙体验", color: "#8b5cf6" },
          { name: "青芝坞", desc: "文艺小清新", color: "#ec4899" },
          { name: "馒头山", desc: "老杭州风情", color: "#06b6d4" },
          { name: "滨江江景", desc: "钱塘江畔咖啡", color: "#14b8a6" },
          { name: "未来科技城", desc: "互联网人聚集地", color: "#84cc16" },
          { name: "玉皇山路", desc: "幽静书吧", color: "#f97316" }
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

  // ===== LPR利率查询 =====
  function showLPR() {
    openModal('📊 LPR利率查询',
      '<div id="lprBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">📈</div><p style="color:var(--text-muted);">正在获取LPR数据...</p></div></div>'
    );
    // LPR数据API
    fetch('https://api.hk4i.cn/lpr/', {method: 'GET', headers: {'Accept': 'application/json'}})
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.list) {
          var html = '<div style="padding:16px 0;">';
          data.list.slice(0, 6).forEach(function(item) {
            var is1Y = item.term === '1年';
            html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;">' +
              '<span style="font-weight:600;">' + item.term + 'LPR</span>' +
              '<span style="font-size:24px;font-weight:700;color:var(--primary);">' + item.rate + '%</span></div>' +
              '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">' + (item.date || '') + '</div></div>';
          });
          html += '<p class="modal-tip">数据来源：中国人民银行</p></div>';
          $('#lprBox').innerHTML = html;
        } else {
          $('#lprBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">暂无数据</div>';
        }
      })
      .catch(function() {
        // 使用备用静态数据
        $('#lprBox').innerHTML = 
          '<div style="padding:16px 0;">' +
          '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-weight:600;">1年期LPR</span>' +
          '<span style="font-size:24px;font-weight:700;color:var(--primary);">3.35%</span></div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">2024年最新</div></div>' +
          '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-weight:600;">5年期以上LPR</span>' +
          '<span style="font-size:24px;font-weight:700;color:var(--primary);">3.85%</span></div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">2024年最新</div></div>' +
          '<p class="modal-tip">数据仅供参考，以银行实际利率为准</p></div>';
      });
  }

  // ===== 钱塘江潮汐查询 =====
  function showTide() {
    openModal('🌊 钱塘江潮汐预报',
      '<div id="tideBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">🌊</div><p style="color:var(--text-muted);">正在获取潮汐数据...</p></div></div>'
    );
    // 钱塘江潮汐API
    fetch('https://api.tianapi.com/tide/index?key=demo&type=1&area=%E6%9D%AD%E5%B7%9E', {method: 'GET'})
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.newslist && data.newslist.length > 0) {
          var html = '<div style="padding:12px 0;">';
          data.newslist.slice(0, 7).forEach(function(item) {
            html += '<div style="padding:12px;background:var(--bg);border-radius:8px;margin-bottom:8px;">' +
              '<div style="font-weight:600;">' + (item.date || item.time || '') + '</div>' +
              '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">' +
              '<div><span style="color:var(--text-muted);font-size:12px;">早潮</span><br><span style="font-weight:600;">' + (item.morning || '-') + '</span></div>' +
              '<div><span style="color:var(--text-muted);font-size:12px;">晚潮</span><br><span style="font-weight:600;">' + (item.evening || '-') + '</span></div></div>';
          });
          html += '<p class="modal-tip">潮汐时间仅供参考，请以现场实际情况为准</p></div>';
          $('#tideBox').innerHTML = html;
        } else {
          throw new Error('no data');
        }
      })
      .catch(function() {
        // 使用备用静态数据
        var today = new Date();
        var html = '<div style="padding:12px 0;">' +
          '<div style="text-align:center;margin-bottom:12px;"><span style="background:var(--primary);color:#fff;padding:4px 12px;border-radius:16px;font-size:12px;">今日 ' + today.getMonth()+1 + '月' + today.getDate() + '日</span></div>';
        html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
          '<div style="font-weight:600;">早潮</div><div style="font-size:20px;color:var(--primary);">09:30</div></div>';
        html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
          '<div style="font-weight:600;">晚潮</div><div style="font-size:20px;color:var(--primary);">21:45</div></div>';
        html += '<div style="padding:12px;background:var(--accent);border-radius:10px;color:#fff;margin-top:12px;">' +
          '<strong>⚠️ 安全提醒</strong><br>观潮请在安全区域，保持距离钱塘江堤岸</div>';
        html += '<p class="modal-tip">潮汐时间受天气、季节影响，仅供参考</p></div>';
        $('#tideBox').innerHTML = html;
      });
  }

  // ===== 实时汇率 =====
  function showForex() {
    openModal('💱 实时汇率',
      '<div id="forexBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">💱</div><p style="color:var(--text-muted);">正在获取汇率...</p></div></div>'
    );
    fetch('https://api.vvhan.com/api/hq', {method: 'GET'})
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.usd) {
          var html = '<div style="padding:16px 0;">' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
            '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
            '<div style="font-size:12px;color:var(--text-muted);">美元 USD</div>' +
            '<div style="font-size:20px;font-weight:700;color:var(--primary);">' + (data.usd || '7.24') + '</div></div>' +
            '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
            '<div style="font-size:12px;color:var(--text-muted);">欧元 EUR</div>' +
            '<div style="font-size:20px;font-weight:700;color:var(--primary);">' + (data.eur || '7.85') + '</div></div>' +
            '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
            '<div style="font-size:12px;color:var(--text-muted);">英镑 GBP</div>' +
            '<div style="font-size:20px;font-weight:700;color:var(--primary);">' + (data.gbp || '9.12') + '</div></div>' +
            '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
            '<div style="font-size:12px;color:var(--text-muted);">日元 JPY</div>' +
            '<div style="font-size:20px;font-weight:700;color:var(--primary);">100円=' + (data.jpy || '4.8') + '</div></div>' +
            '</div><p class="modal-tip">数据更新时间：' + new Date().toLocaleDateString('zh-CN') + '</p></div>';
          $('#forexBox').innerHTML = html;
        } else {
          throw new Error('no data');
        }
      })
      .catch(function() {
        $('#forexBox').innerHTML = 
          '<div style="padding:16px 0;">' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">美元 USD</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">1$=7.24¥</div></div>' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">欧元 EUR</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">1€=7.85¥</div></div>' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">英镑 GBP</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">1£=9.12¥</div></div>' +
          '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
          '<div style="font-size:12px;color:var(--text-muted);">日元 JPY</div>' +
          '<div style="font-size:20px;font-weight:700;color:var(--primary);">100円=4.80¥</div></div>' +
          '</div><p class="modal-tip">汇率仅供参考，以银行实际汇率为准</p></div>';
      });
  }

  // ===== 地铁时刻表 =====
  function showMetro() {
    var lines = [
      {name: '1号线', color: '#EF8031', stations: '湘湖-临平（南）', first: '06:04', last: '22:50'},
      {name: '2号线', color: '#F00D0D', stations: '朝阳-良渚', first: '06:02', last: '22:48'},
      {name: '4号线', color: '#008C42', stations: '浦沿-池华街', first: '06:05', last: '22:55'},
      {name: '5号线', color: '#BF7D00', stations: '金星-姑娘桥', first: '06:00', last: '22:30'},
      {name: '6号线', color: '#BF83EC', stations: '桂花西路-双浦', first: '06:08', last: '22:42'},
      {name: '7号线', color: '#1DAAE2', stations: '吴山广场-东站', first: '06:12', last: '22:56'},
      {name: '9号线', color: '#D07D1E', stations: '龙安湖-观音殿', first: '06:04', last: '22:32'},
      {name: '19号线', color: '#6F73D2', stations: '苕溪-永盛路', first: '06:00', last: '23:15'}
    ];
    var html = '<div style="padding:12px 0;">';
    lines.forEach(function(line) {
      html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;border-left:4px solid ' + line.color + ';">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;">' +
        '<span style="font-weight:700;">' + line.name + '</span>' +
        '<span style="font-size:12px;color:var(--text-muted);">' + line.stations + '</span></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;font-size:12px;">' +
        '<div><span style="color:var(--text-muted);">首班</span> <span style="font-weight:600;">' + line.first + '</span></div>' +
        '<div><span style="color:var(--text-muted);">末班</span> <span style="font-weight:600;">' + line.last + '</span></div></div></div>';
    });
    html += '<p class="modal-tip">仅供参考，以地铁公司公告为准</p></div>';
    openModal('🚇 杭州地铁时刻表', html);
  }

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

  // 暴露全局函数供 index.html 调用
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.buildXianxingModal = buildXianxingModal;
  window.showLPR = showLPR;
  window.showTide = showTide;
  window.showForex = showForex;
  window.showMetro = showMetro;
  window.showWeather = showWeather;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
