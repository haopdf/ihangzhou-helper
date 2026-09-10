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
      { name: "发票抽奖", icon: "🧾", desc: "支付宝/云闪付搜索消费有奖", color: "#f59e0b" },
      { name: "找工作", icon: "💼", desc: "事业单位/国企", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
      { name: "公积金", icon: "🏠", desc: "查询/提取/贷款", url: "https://gjj.hangzhou.gov.cn/", color: "#10b981" },
      { name: "浙A摇号", icon: "🚘", desc: "车牌摇号申请", url: "https://hzxkctk.cn/", color: "#ef4444" },
      { name: "灵隐寺", icon: "⛩️", desc: "门票预约", url: "https://www.lingyinsi.com/", color: "#8b5cf6" },
      { name: "人才认定", icon: "🎓", desc: "高层次人才申请", url: "https://hrss.hangzhou.gov.cn/", color: "#06b6d4" },
      { name: "市民卡", icon: "💳", desc: "服务/充值", url: "https://www.96225.com/", color: "#ec4899" }
    ],

    // 22大分类（全面覆盖杭州生活服务）
    categories: [
      { id: "banshi", name: "办事指南", icon: "🏛️",
        items: [
          { name: "社保查询", desc: "缴费/余额/明细", url: "https://www.zjzwfw.gov.cn/", color: "#3b82f6", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州社保查询包括养老/医疗/失业/工伤/生育五险缴费记录与个人账户余额。线上查询已对接浙里办与电子社保卡，无需到社保大厅。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>线上查询</strong>：登录「浙里办」APP 或支付宝小程序「社保查询」<br>② <strong>实名认证</strong>：人脸识别后可查看缴费明细与余额<br>③ <strong>电子社保卡</strong>：在支付宝/微信搜索「电子社保卡」申领，与实体卡同等效力</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证原件<br>• 杭州社保卡（如已制卡）<br>• 手机号（接收验证码）</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>杭州市各区社保经办机构（市本级：上城区解放东路18号市民中心）<br>咨询电话：0571-12333</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"https://www.zjzwfw.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 浙里办 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>线上查询即时返回；单位缴费记录每月更新，可查近 24 个月明细；免费服务。</p></div>" },
          { name: "社保转移", desc: "跨省转移/年限计算", url: "https://www.zjzwfw.gov.cn/", color: "#ef4444" },
          { name: "社保缴费", desc: "灵活就业缴费基数", url: "https://www.zjzwfw.gov.cn/", color: "#10b981" },
          { name: "公积金查询", desc: "余额/明细/提取记录", url: "https://gjj.hangzhou.gov.cn/", color: "#f59e0b", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州住房公积金查询覆盖个人账户余额、月缴存基数、单位缴存比例、提取记录与贷款额度测算。已开通线上全流程，浙里办与支付宝均可办理。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① 登录「浙里办」或「杭州公积金」APP<br>② 人脸认证后查看个人账户余额、缴存明细<br>③ 可下载缴存证明、贷款结清证明等电子凭证</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证<br>• 公积金账号（如已开户）<br>• 手机号接收验证码</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>杭州住房公积金管理中心各网点<br>市中心网点：上城区延安路126号<br>电话：0571-12329</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"https://gjj.hangzhou.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 杭州公积金 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>线上查询即时返回；2026 年缴存基数上限 34470 元、下限 2280 元；免费服务。</p></div>" },
          { name: "公积金提取", desc: "租房/购房/离职提取", url: "https://gjj.hangzhou.gov.cn/", color: "#8b5cf6", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州公积金提取支持租房、购房、偿还贷款、离职、退休等多种情形。租房提取可线上秒办，资金秒到账；购房/偿还贷款提取需上传材料审核。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p><strong>租房提取</strong>（最常用，可线上办）：① 浙里办 APP 搜索「公积金提取」 ② 选择「租赁自住住房提取」 ③ 填写银行卡号，秒到账<br><strong>购房提取</strong>：上传购房合同/不动产权证/发票<br><strong>偿还贷款</strong>：上传贷款合同与还款明细</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证<br>• 银行卡（一类账户）<br>• 租房提取无需额外材料<br>• 购房提取需购房合同 + 发票 + 不动产权证</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>线上办理：浙里办/支付宝「杭州公积金」<br>线下网点：上城区延安路126号 等</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"https://gjj.hangzhou.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 杭州公积金 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>租房提取：每月可提 1500 元，年度上限 18000 元，秒到账；购房/贷款提取：3 个工作日审核；免费服务。</p></div>" },
          { name: "公积金贷款", desc: "额度测算/还款计划", url: "https://gjj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "人才落户", desc: "学历/职称/技能落户", url: "http://police.hangzhou.gov.cn/", color: "#ec4899", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州人才落户政策开放度高，本科及以上学历、中级及以上职称、高级技师等均可申请。全日制普通高校本科及研究生以上学历可「先落户后就业」。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>学历落户</strong>：全日制本科 45 周岁以下，可「先落户后就业」；研究生 50 周岁以下<br>② <strong>职称落户</strong>：中级职称 45 周岁以下；副高职称 50 周岁以下；正高职称 55 周岁以下<br>③ <strong>技能落户</strong>：高级技师 45 周岁以下；技师 40 周岁以下<br>④ 在「警察叔叔」APP 或浙里办线上申请，邮件送达</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证、户口簿<br>• 学历证书 + 学信网验证报告<br>• 职称证书（职称落户）<br>• 劳动合同或社保缴纳证明（部分情形）<br>• 房产证或社区集体户证明</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>线上：警察叔叔 APP、浙里办<br>线下：各公安户籍办理窗口<br>电话：0571-87280474</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"http://police.hangzhou.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 杭州公安 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>线上办理：1-3 个工作日审核；户口迁移证电子送达；免费。</p></div>" },
          { name: "积分落户", desc: "积分计算/申请流程", url: "http://police.hangzhou.gov.cn/", color: "#14b8a6", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州积分落户是面向非杭户籍人员的另一渠道，按年龄、学历、社保、房产、社会服务等累计积分，年度公布落户分值。适合学历较低但有稳定工作和居住的人员。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>积分申报</strong>：每年 3-6 月在浙里办提交<br>② <strong>积分核定</strong>：由公安、人社、住建等部门数据自动核定<br>③ <strong>落户分值</strong>：每年公布落户分值线，达到者可申请<br>④ <strong>户口迁移</strong>：取得落户资格后 30 日内办理迁移</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证、户口簿<br>• 居住证（在杭登记满 1 年）<br>• 社保缴纳证明（满 1 年）<br>• 房产证或租赁备案证明<br>• 学历/职称证书（加分项）</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>线上：浙里办 APP「积分落户」<br>线下：各公安户籍窗口</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"http://police.hangzhou.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 杭州公安 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>申报期：每年 3-6 月；结果公布：通常 9-10 月；免费服务。</p></div>" },
          { name: "居住证办理", desc: "登记/申领/签注", url: "https://www.zjzwfw.gov.cn/", color: "#84cc16", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州居住证是非杭户籍人员在杭享受公共服务（子女入学、医保、买车上牌、考驾照等）的凭证。已开通电子居住证，可通过「警察叔叔」APP 全程线上办理。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>居住登记</strong>：先在「警察叔叔」APP 或流动人口管理平台登记满 6 个月<br>② <strong>申领居住证</strong>：登记满 6 个月后在 APP 内申领<br>③ <strong>电子居住证</strong>：申领成功后自动生成电子证，与实体证同等效力<br>④ <strong>年度签注</strong>：每年签注 1 次，线上自助办理</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证<br>• 居住证明（房产证 / 租赁备案 / 居住证明）<br>• 就业或就读证明（劳动合同 / 社保 / 学生证）</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>线上：警察叔叔 APP、浙里办<br>线下：各派出所户籍窗口</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"https://www.zjzwfw.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 浙里办 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>登记满 6 个月后申领；线上申领 1-3 个工作日审核；免费。</p></div>" },
          { name: "身份证办理", desc: "首次申领/换领/补领", url: "http://police.hangzhou.gov.cn/", color: "#f97316", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州身份证业务支持跨省通办，外省户籍人员可在杭换领/补领身份证。首次申领仍需回户籍地（部分省份已开通跨省首次申领试点）。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>换证</strong>：到期前 3 个月内，派出所现场办或「警察叔叔」APP 预约<br>② <strong>补证</strong>：遗失后「警察叔叔」APP 申请挂失+补领<br>③ <strong>拍照</strong>：现场免费拍照（也可上传符合要求的数码照）<br>④ <strong>领取</strong>：可选择邮寄送达或现场领取</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 户口簿或旧身份证（换证）<br>• 居住证（外地户籍在杭办需）<br>• 现场采集指纹与人像</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>杭州各公安派出所户籍窗口<br>可在「警察叔叔」APP 查询附近网点<br>电话：0571-87280474</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"http://police.hangzhou.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 杭州公安 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>办理时限：30-60 日（省内通常 15-20 日）；换证 20 元/证，补证 40 元/证。</p></div>" },
          { name: "护照办理", desc: "因私出国护照申请", url: "https://s.nia.gov.cn/", color: "#a855f7", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州居民可在市内任一出入境接待大厅办理护照、港澳通行证、台湾通行证。已支持「全国通办」，外省户籍人员也可在杭办理。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>预约</strong>：在「国家移民管理局」APP 或微信小程序预约杭州接待大厅与时段<br>② <strong>到场</strong>：携带材料按预约时段到大厅，采集人像与指纹<br>③ <strong>缴费</strong>：现场扫码缴费 120 元/证<br>④ <strong>领取</strong>：选择邮寄送达或现场领取</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证原件<br>• 户口簿（首次申领，部分情形）<br>• 居住证（外地户籍在杭办需）<br>• 旧护照（换发）</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>杭州市公安局出入境管理局<br>上城区 Knox 路 1 号（出入境接待大厅）<br>各区也有分局受理点<br>电话：0571-87280770</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"https://s.nia.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 国家移民局 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>省内户籍：7 个工作日；外省户籍：20 日；护照 120 元/证。</p></div>" },
          { name: "港澳通行证", desc: "团队游/个人游申请", url: "https://s.nia.gov.cn/", color: "#0ea5e9" },
          { name: "台湾通行证", desc: "赴台证件办理", url: "https://s.nia.gov.cn/", color: "#22c55e" },
          { name: "签证办理", desc: "各国签证申请", url: "", detail: "<p><strong>签证办理指南</strong></p><p>杭州可办理各国签证，常见方式：</p><p>① <strong>自行办理</strong>：前往目的国驻华使领馆递交材料</p><p>② <strong>签证中心</strong>：如 VFS Global、BLS 等代办中心</p><p>③ <strong>旅行社代办</strong>：省时省力但需服务费</p><p style=\"margin-top:8px;\"><strong>杭州出入境接待大厅</strong>：香积寺路3号，可办理护照、港澳台通行证</p><p style=\"color:var(--text-muted);font-size:13px;\">建议提前1-3个月办理，签证费用因国家而异</p>", color: "#eab308" },
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
          { name: "发票抽奖", desc: "支付宝/云闪付搜索消费有奖", detail: "<p><strong>消费有奖（发票抽奖）</strong></p><p>杭州消费有奖活动参与方式：</p><p>① <strong>支付宝</strong>：搜索「消费有奖」或「发票管家」录入发票</p><p>② <strong>云闪付</strong>：搜索「发票抽奖」参与</p><p>③ <strong>浙里办</strong>：搜索「消费有奖」</p><p style=\"margin-top:8px;\">录入餐饮、零售等消费发票即可参与抽奖，奖金最高数万元</p><p style=\"color:var(--text-muted);font-size:13px;\">开奖周期通常为月度/季度，以官方公告为准</p>", color: "#f59e0b" },
          { name: "学历认证", desc: "学信网验证报告", url: "https://www.chsi.com.cn/", color: "#10b981" },
          { name: "房产证明", desc: "不动产登记证明", url: "https://fgj.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "无犯罪记录", desc: "证明开具申请", url: "http://police.hangzhou.gov.cn/", color: "#06b6d4" },
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
          { name: "浙A摇号", desc: "小客车指标申请", url: "https://hzxkctk.cn/", color: "#f59e0b", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州小客车指标通过摇号或竞价方式配置。摇号每月 1 次，免费参与，中签率较低但成本低；竞价每月 1 次，价高者得，适合急需上牌者。还有浙 M 区域指标（仅限杭州部分区域行驶）。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>申请资格</strong>：杭州户籍或持居住证满 2 年，连续缴纳社保满 2 年<br>② <strong>摇号申请</strong>：在 hzxkctk.cn 注册并提交申请，每月 25 日公开摇号<br>③ <strong>竞价</strong>：每月 25 日竞价，需缴 2000 元保证金<br>④ <strong>查询中签</strong>：官网或短信通知，中签后 6 个月内上牌</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证<br>• 居住证（非杭户籍）<br>• 社保缴纳证明<br>• 驾驶证（部分指标类型）</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>线上：杭州市小客车总量调控管理信息系统<br>线下：杭州市交警支队车管所</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"https://hzxkctk.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 杭州小客车调控 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>摇号：每月 1 次，免费；竞价：每月 1 次，保证金 2000 元，平均成交价约 3-5 万元。</p></div>" },
          { name: "浙A竞价", desc: "车牌竞价出价", url: "https://hzxkctk.cn/", color: "#10b981" },
          { name: "浙M区域牌", desc: "区域指标申请", url: "https://hzxkctk.cn/", color: "#3b82f6" },
          { name: "外地车限行", desc: "非浙A限行规定", url: "http://police.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "急事通申请", desc: "周末/节假日通行证", url: "http://police.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "地铁线路图", desc: "1-19号线全覆盖", url: "https://www.hzmetro.com/", color: "#ec4899" },
          { name: "地铁时刻表", desc: "首末班车时间", url: "https://www.hzmetro.com/", color: "#14b8a6" },
          { name: "地铁票价", desc: "票价计算/换乘", url: "https://www.hzmetro.com/", color: "#84cc16" },
          { name: "公交查询", desc: "线路/换乘/到站", url: "https://www.hzbus.com.cn/", color: "#f97316" },
          { name: "公交实时", desc: "到站提醒/等待时间", url: "https://www.hzbus.com.cn/", color: "#a855f7" },
          { name: "水上巴士", desc: "运河线/塘栖线", url: "https://www.hzbus.com.cn/", color: "#0ea5e9" },
          { name: "公共自行车", desc: "小红车借还点", url: "https://www.hzbus.com.cn/", color: "#22c55e" },
          { name: "共享单车", desc: "哈啰/美团/青桔", url: "https://www.hello-inc.com/", color: "#eab308" },
          { name: "电动车租赁", desc: "共享电单车/长租", detail: "<p><strong>杭州电动车租赁</strong></p><p>① <strong>共享电单车</strong>：哈啰、美团、青桔，扫码即骑，1.5元/15分钟起</p><p>② <strong>长租电动车</strong>：适合通勤，月租200-500元，含电池</p><p>③ <strong>新能源汽车租赁</strong>：微公交、Gofun 等，分时租赁</p><p style=\"margin-top:8px;\"><strong>注意</strong>：骑电动车需佩戴头盔，遵守交通规则</p>", color: "#22c55e" },
          { name: "火车票", desc: "12306购票", url: "https://www.12306.cn/", color: "#3b82f6" },
          { name: "高铁时刻", desc: "杭州东/西/南站", url: "https://www.12306.cn/", color: "#ef4444" },
          { name: "萧山机场", desc: "航班查询/大巴", url: "https://www.hzairport.com/", color: "#10b981" },
          { name: "机场大巴", desc: "武林门/平海路等", url: "https://www.hzairport.com/", color: "#f59e0b" },
          { name: "机票预订", desc: "特价机票搜索", url: "https://m.ctrip.com/html5/flight/swift/index?allianceid=10511040&sid=330893571&ouid=kfptvxtool", color: "#8b5cf6" },
          { name: "汽车票", desc: "九堡/客运中心", url: "https://hangzhou.8684.com.cn/", color: "#06b6d4" },
          { name: "打车软件", desc: "滴滴/曹操/高德", url: "https://www.didiglobal.com/", color: "#ec4899" },
          { name: "顺风车", desc: "跨城拼车", url: "https://www.didapinche.com/", color: "#14b8a6" },
          { name: "ETC办理", desc: "浙通卡办理充值", url: "https://www.zjetc.cn/", color: "#84cc16" },
          { name: "油价查询", desc: "今日油价", action: "youjia", color: "#f97316" },
          { name: "杭州天气", desc: "实时天气/预报", action: "weather", color: "#a855f7" },
          { name: "钱塘江潮汐", desc: "观潮时间表", url: "", detail: "<p><strong>钱塘江观潮指南</strong></p><p>钱塘江大潮是世界三大涌潮之一，最佳观赏期为农历八月十八前后。</p><p><strong>主要观潮点</strong>（下游→上游）：</p><p>• 海宁盐官 —— 一线潮，最佳观赏点</p><p>• 老盐仓 —— 回头潮</p><p>• 萧山美女坝 —— 美女二回头</p><p>• 下沙七格 —— 冲天潮</p><p>• 钱江新城城市阳台</p><p style=\"margin-top:8px;color:#ef4444;\"><strong>⚠️ 安全第一</strong>：观潮务必在安全区域，切勿下堤！潮水凶猛，每年都有伤亡事故。</p><p style=\"color:var(--text-muted);font-size:13px;\">点击首页「潮汐预报」可查看各点每日潮时</p>", color: "#0ea5e9" },
          { name: "交通违章", desc: "违法查询/处理", url: "https://zj.122.gov.cn/", color: "#22c55e" },
          { name: "停车缴费", desc: "道路停车支付", url: "https://www.zjtycp.cn/", color: "#eab308" },
          { name: "停车场查询", desc: "附近停车场", url: "https://www.zjtycp.cn/", color: "#3b82f6" },
          { name: "春运购票", desc: "春节抢票攻略", url: "https://www.12306.cn/", color: "#ef4444" }
        ]
      },
      {
        id: "vehicle", name: "车辆服务", icon: "🚘",
        items: [
          { name: "摇号申请", desc: "浙A小客车指标", url: "https://hzxkctk.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">浙A小客车增量指标按「阶梯中签」规则摇号，每月 26 日（遇节假日顺延）举行。个人/单位均可申请。</p><div class=\"guide-block\"><h4>📋 申请条件（个人）</h4><p>• 居住杭州（户籍 / 居住证 / 个税累计 2 年 / 社保 2 年）<br>• 持有效驾驶证<br>• 名下无浙A客车<br>• 未持有逾期未使用的指标</p></div><div class=\"guide-block\"><h4>📅 流程</h4><p>• 8 日 24:00 前申请当月摇号<br>• 26 日公开摇号<br>• 中签后 12 个月内必须上牌</p></div><div class=\"guide-block\"><h4>💡 阶梯中签</h4><p>• 累计参与 24 次（2 年）进入 2 倍率池<br>• 累计 48 次（4 年）进入 3 倍率池<br>• 累计 72 次（6 年）进入 4 倍率池</p></div><p style=\"margin-top:6px;\"><a href=\"https://hzxkctk.cn/\" target=\"_blank\" rel=\"noopener\">申请入口 →</a></p>", color: "#ef4444" },
          { name: "竞价申请", desc: "浙A车牌竞价", url: "https://hzxkctk.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">浙A小客车增量指标竞价，每月 25 日举行（遇节假日顺延）。个人/单位均需先申请资格并通过审核。</p><div class=\"guide-block\"><h4>💰 报价规则</h4><p>• 报价下限 1 万元，每次加价 1000 元<br>• 报价上限不限<br>• 同一报价按时间优先原则排序<br>• 取报价高者，至指标用完</p></div><div class=\"guide-block\"><h4>📅 流程</h4><p>• 8 日 24:00 前申请当月竞价<br>• 18 日前缴纳 2000 元保证金<br>• 25 日 9:00-15:00 报价（共两阶段）<br>• 成交后 5 个工作日内付清余款</p></div><div class=\"guide-block\"><h4>📊 历史参考价</h4><p>• 个人均价：1-3 万元（视月份）<br>• 单位均价：2-5 万元<br>• 具体以当月公布为准</p></div><p style=\"margin-top:6px;\"><a href=\"https://hzxkctk.cn/\" target=\"_blank\" rel=\"noopener\">申请入口 →</a></p>", color: "#f59e0b" },
          { name: "区域号牌", desc: "浙M指标申请", url: "https://hzxkctk.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">浙M为杭州区域号牌（限行比浙A略严，比浙A外牌宽松）。申请条件比浙A摇号宽松，社保/个税累计 1 年即可。</p><div class=\"guide-block\"><h4>📋 申请条件</h4><p>• 居住杭州（居住证 / 个税 1 年 / 社保 1 年）<br>• 持有效驾驶证<br>• 名下无浙A或浙M客车<br>• 已申请浙A指标未中签的可叠加</p></div><div class=\"guide-block\"><h4>🚦 与浙A限行差异</h4><p>• <strong>浙A</strong>：工作日早晚高峰限号（7:00-9:00 / 16:30-18:30）<br>• <strong>浙M</strong>：早晚高峰错峰限行（7:00-9:30 / 16:30-18:30）+ 部分核心路段全天限行</p></div><div class=\"guide-block\"><h4>📅 申请节奏</h4><p>• 每月 8 日前申请当月指标<br>• 摇号当月 26 日<br>• 竞价当月 25 日</p></div><p style=\"margin-top:6px;\"><a href=\"https://hzxkctk.cn/\" target=\"_blank\" rel=\"noopener\">申请入口 →</a></p>", color: "#10b981" },
          { name: "新能源牌照", desc: "绿牌申领政策", url: "https://hzxkctk.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">新能源汽车（纯电、插电混动、增程式）可直接申领浙A绿牌，无需摇号竞价。绿牌不限行。</p><div class=\"guide-block\"><h4>🔋 适用车型</h4><p>• 纯电动（BEV）<br>• 插电混动（PHEV）<br>• 增程式（EREV）<br>• 燃料电池（FCEV）</p></div><div class=\"guide-block\"><h4>📋 申请条件</h4><p>• 居住杭州（条件同浙A）<br>• 名下无浙A新能源车<br>• 凭购车发票和指标直接上牌</p></div><div class=\"guide-block\"><h4>🎁 杭州新能源补贴</h4><p>• 中央补贴按车型不同<br>• 杭州地方补贴：最高 1 万元/车<br>• 充电桩安装：可申请小区充电桩</p></div><div class=\"guide-block\"><h4>🚦 绿牌优势</h4><p>• <strong>不限行</strong>：早晚高峰、核心路段均可通行<br>• <strong>公交道</strong>：早晚高峰可走公交道<br>• <strong>停车</strong>：路边停车前 2 小时免费</p></div><p style=\"margin-top:6px;\"><a href=\"https://hzxkctk.cn/\" target=\"_blank\" rel=\"noopener\">申请入口 →</a></p>", color: "#3b82f6" },
          { name: "车辆年检", desc: "年检时间/地点", url: "https://zj.122.gov.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">车辆年检按「6 年免检 / 6-10 年一年一检 / 10 年以上半年一检」执行，需在行驶证登记日期对应月份内完成。</p><div class=\"guide-block\"><h4>📅 年检周期</h4><p>• <strong>新车 6 年内</strong>：免上线检测（每 2 年申领检验标志）<br>• <strong>6-10 年</strong>：每年 1 次上线检测（第 6 年、第 10 年必上线）<br>• <strong>10 年以上</strong>：每 6 个月 1 次</p></div><div class=\"guide-block\"><h4>🏢 杭州主要检测站</h4><p>• 杭州汽车综合性能检测站（西湖区留和路）<br>• 杭州华日检测站（拱墅区拱康路）<br>• 杭州萧山机动车辆检测站（萧山金城路）<br>• 各区县均有多个检测站，建议网上预约</p></div><div class=\"guide-block\"><h4>⚠️ 注意</h4><p>• 逾期未检会被电子眼抓拍（200 元 / 3 分）<br>• 检测前处理完所有违章<br>• 准备：行驶证、交强险、车主身份证</p></div><p style=\"margin-top:6px;\"><a href=\"https://zj.122.gov.cn/\" target=\"_blank\" rel=\"noopener\">预约入口 →</a></p>", color: "#8b5cf6" },
          { name: "年检预约", desc: "网上预约年检", url: "https://zj.122.gov.cn/", color: "#06b6d4" },
          { name: "六年免检", desc: "免检标志申领", url: "https://zj.122.gov.cn/", color: "#ec4899" },
          { name: "违章查询", desc: "电子眼/贴条", url: "https://zj.122.gov.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">通过交管 12123 APP 或浙江交通安全综合服务管理平台查询，需绑定车牌和驾驶证。</p><div class=\"guide-block\"><h4>🔍 查询渠道</h4><p>• <strong>交管 12123 APP</strong>（最常用）：下载后绑定车辆<br>• <strong>zj.122.gov.cn</strong>：网页版查询<br>• <strong>支付宝</strong>：市民中心 → 车主 → 违章查询</p></div><div class=\"guide-block\"><h4>⚠️ 常见违章扣分</h4><p>• <strong>闯红灯</strong>：200 元 / 6 分<br>• <strong>违停</strong>：50-200 元 / 0-3 分（视地点）<br>• <strong>不按导向</strong>：100 元 / 2 分<br>• <strong>超速</strong>：50-200 元 / 3-6 分<br>• <strong>压线</strong>：100 元 / 3 分</p></div><div class=\"guide-block\"><h4>⏰ 滞后时间</h4><p>• 电子眼违章：3-13 天可查<br>• 现场贴条：3-5 天可查<br>• 异地违章：可能 15 天以上</p></div><p style=\"margin-top:6px;\"><a href=\"https://zj.122.gov.cn/\" target=\"_blank\" rel=\"noopener\">查询入口 →</a></p>", color: "#14b8a6" },
          { name: "违章处理", desc: "线上处理/缴费", url: "https://zj.122.gov.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">违章处理分「线上 + 线下」两种。电子眼违章、单笔 200 元及以下且扣 6 分以内的，可线上处理。</p><div class=\"guide-block\"><h4>📱 线上处理</h4><p>• <strong>交管 12123 APP</strong>：处理 + 缴费一站完成<br>• <strong>需绑卡</strong>：本人银行卡 / 他人需授权<br>• 处理后 1-3 个工作日扣分生效</p></div><div class=\"guide-block\"><h4>🏢 线下处理</h4><p>• 各区交警大队违法处理窗口<br>• 需带：身份证、驾驶证、行驶证<br>• 取号排队，处理完去银行或扫码缴费</p></div><div class=\"guide-block\"><h4>⚠️ 注意</h4><p>• 单个记分周期（1 年）累计 12 分会被扣证<br>• 满分学习 7 天 + 科目一考试<br>• 累计 24 分还需加考科目三</p></div><div class=\"guide-block\"><h4>💳 缴费</h4><p>• 12123 APP 内缴费<br>• 工行 / 招行 / 杭银 APP<br>• 支付宝 / 微信扫罚单二维码</p></div><p style=\"margin-top:6px;\"><a href=\"https://zj.122.gov.cn/\" target=\"_blank\" rel=\"noopener\">处理入口 →</a></p>", color: "#84cc16" },
          { name: "学法减分", desc: "驾照加分学习", url: "https://zj.122.gov.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">通过交管 12123 APP 参加在线学习和考试，最高可减免 6 分/记分周期。学习内容包括交通安全法规、典型违章案例。</p><div class=\"guide-block\"><h4>📅 流程</h4><p>• <strong>申请</strong>：12123 APP → 更多 → 学法减分<br>• <strong>学习</strong>：连续 5 天，每天 30 分钟视频<br>• <strong>考试</strong>：20 题选择题，18 题以上答对减 1 分<br>• <strong>次数</strong>：1 个记分周期最多 6 次，最高减 6 分</p></div><div class=\"guide-block\"><h4>📋 申请条件</h4><p>• 已处理违章（未处理的不能减）<br>• 本记分周期未达 12 分<br>• 最近 1 个记分周期无二次满分记录</p></div><div class=\"guide-block\"><h4>💡 小贴士</h4><p>• 人脸识别需在光线充足处<br>• 学习期间不可切换 APP<br>• 考试不过可重学重考，无次数限制</p></div><p style=\"margin-top:6px;\"><a href=\"https://zj.122.gov.cn/\" target=\"_blank\" rel=\"noopener\">学习入口 →</a></p>", color: "#f97316" },
          { name: "驾照换证", desc: "期满换证/超龄换证", url: "https://zj.122.gov.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">C1 驾驶证有效期 6 年，需在到期前 90 天内换证。换证前必须处理完所有违章并完成体检。</p><div class=\"guide-block\"><h4>📅 换证时机</h4><p>• <strong>期满换证</strong>：6 年 / 10 年 / 长期，到期前 90 天<br>• <strong>超龄换证</strong>：60 岁降为 C1/C5，70 岁每年体检<br>• <strong>损毁换证</strong>：证破损/遗失可补换</p></div><div class=\"guide-block\"><h4>📋 准备材料</h4><p>• 身份证<br>• 原驾驶证<br>• 一寸白底彩照 2 张<br>• <strong>体检证明</strong>：区级以上医院体检（视力、色觉、四肢）<br>• <strong>违章清零</strong>：先处理所有违章</p></div><div class=\"guide-block\"><h4>💼 办理方式</h4><p>• <strong>线上</strong>：交管 12123 APP → 驾驶证补换领<br>• <strong>线下</strong>：车管所 / 行政服务中心<br>• <strong>自助机</strong>：部分网点 24h 自助机可办</p></div><div class=\"guide-block\"><h4>🏥 杭州体检医院</h4><p>• 浙一、浙二、邵逸夫等三甲医院<br>• 各区中心医院<br>• 部分社区医院也可办</p></div><p style=\"margin-top:6px;\"><a href=\"https://zj.122.gov.cn/\" target=\"_blank\" rel=\"noopener\">换证入口 →</a></p>", color: "#a855f7" },
          { name: "驾照补证", desc: "遗失补领", url: "https://zj.122.gov.cn/", color: "#0ea5e9" },
          { name: "驾照转入", desc: "外地驾照转入杭州", url: "https://zj.122.gov.cn/", color: "#22c55e" },
          { name: "驾照满分学习", desc: "12分学习考试", url: "https://zj.122.gov.cn/", color: "#eab308" },
          { name: "行驶证业务", desc: "补领/换领/变更", url: "https://zj.122.gov.cn/", color: "#3b82f6" },
          { name: "车辆过户", desc: "二手车交易过户", url: "https://zj.122.gov.cn/", color: "#ef4444" },
          { name: "车辆上牌", desc: "新车上牌流程", url: "https://zj.122.gov.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">新车上牌前需先摇到浙A指标 / 申领浙M指标 / 新能源绿牌指标。指标 12 个月有效，逾期作废。</p><div class=\"guide-block\"><h4>📋 准备材料</h4><p>• 车主身份证<br>• 车辆合格证<br>• 购车发票<br>• 交强险保单<br>• 车辆购置税完税证明<br>• 浙A/浙M/绿牌指标证明</p></div><div class=\"guide-block\"><h4>📅 办理流程</h4><p>• <strong>第 1 步</strong>：交购置税（4S 店可代办 / 工行 APP）<br>• <strong>第 2 步</strong>：交强险 + 商业险<br>• <strong>第 3 步</strong>：车管所验车（验外观、拓号、拍照）<br>• <strong>第 4 步</strong>：选号（50 选 1 / 自编自选）<br>• <strong>第 5 步</strong>：领行驶证、登记证书、车牌<br>• <strong>第 6 步</strong>：装牌（车管所或 4S 店）</p></div><div class=\"guide-block\"><h4>🏢 杭州车管所</h4><p>• 杭州市车管所（西湖区留和路）<br>• 滨江分所、萧山分所、余杭分所等<br>• 部分业务可在 4S 店「一站式」办完</p></div><div class=\"guide-block\"><h4>💡 选号规则</h4><p>• <strong>50 选 1</strong>：随机出 50 个号，1 分钟内选 1<br>• <strong>自编自选</strong>：自定义规则（浙A·XX123Y），3 次机会<br>• <strong>互联网选号</strong>：交管 12123 APP 预选</p></div><p style=\"margin-top:6px;\"><a href=\"https://zj.122.gov.cn/\" target=\"_blank\" rel=\"noopener\">办理入口 →</a></p>", color: "#10b981" },
          { name: "车管所网点", desc: "各区车管所地址", url: "https://zj.122.gov.cn/", color: "#f59e0b" },
          { name: "网约车从业", desc: "网约车驾驶员证", url: "http://police.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "货运从业", desc: "货运资格证办理", url: "http://police.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "停车包月", desc: "道路包月申请", url: "https://www.zjtycp.cn/", color: "#ec4899" },
          { name: "小区停车", desc: "物业停车管理", url: "https://fgj.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "新能源补贴", desc: "购车补贴申请", url: "https://fgj.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "报废车辆", desc: "老旧车报废补贴", url: "https://zj.122.gov.cn/", color: "#f97316" }
        ]
      },
      {
        id: "life", name: "民生服务", icon: "🛍️",
        items: [
          { name: "消费券领取", desc: "支付宝/浙里办领券", detail: "<p><strong>杭州消费券领取</strong></p><p>杭州消费券发放渠道：</p><p>① <strong>支付宝</strong>：搜索「杭州消费券」或在首页入口领取</p><p>② <strong>浙里办</strong>：搜索「消费券」</p><p>③ <strong>云闪付</strong>：搜索「杭州消费券」</p><p style=\"margin-top:8px;\">消费券通常为满减形式，如满30减10、满50减20等，限指定商户使用</p><p style=\"color:var(--text-muted);font-size:13px;\">发放时间不固定，关注「杭州发布」公众号获取最新消息</p>", color: "#ef4444" },
          { name: "发票抽奖", desc: "支付宝/云闪付搜索消费有奖", detail: "<p><strong>消费有奖（发票抽奖）</strong></p><p>杭州消费有奖活动参与方式：</p><p>① <strong>支付宝</strong>：搜索「消费有奖」或「发票管家」录入发票</p><p>② <strong>云闪付</strong>：搜索「发票抽奖」参与</p><p>③ <strong>浙里办</strong>：搜索「消费有奖」</p><p style=\"margin-top:8px;\">录入餐饮、零售等消费发票即可参与抽奖，奖金最高数万元</p><p style=\"color:var(--text-muted);font-size:13px;\">开奖周期通常为月度/季度，以官方公告为准</p>", color: "#f59e0b" },
          { name: "水费缴纳", desc: "杭州水务集团", url: "https://www.hzwgc.com/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州市区自来水由杭州水务集团供应，实行阶梯水价。一户一表用户年用水量分档计价。</p><div class=\"guide-block\"><h4>📊 杭州居民阶梯水价</h4><p>• <strong>第一阶梯</strong>（0-216 吨/年）：2.40 元/吨<br>• <strong>第二阶梯</strong>（217-300 吨/年）：3.60 元/吨<br>• <strong>第三阶梯</strong>（300 吨以上）：7.20 元/吨<br>• <strong>污水处理费</strong>：1.10 元/吨（随水费代收）</p></div><div class=\"guide-block\"><h4>💳 缴费方式</h4><p>• <strong>支付宝/微信</strong>：生活缴费 → 水费 → 杭州水务<br>• <strong>浙里办</strong>：搜索「水费」<br>• <strong>银行代扣</strong>：工行/招行/杭银等可签约代扣<br>• <strong>线下营业厅</strong>：杭州水务集团各网点</p></div><div class=\"guide-block\"><h4>📞 报修/咨询</h4><p>• 杭州水务 24 小时服务热线：<strong>0571-87879999</strong><br>• 漏水报修、水质投诉、水表故障</p><p style=\"margin-top:6px;\"><a href=\"https://www.hzwgc.com/\" target=\"_blank\" rel=\"noopener\">官网查询/缴费 →</a></p></div>", color: "#10b981" },
          { name: "电费缴纳", desc: "国家电网", url: "https://www.95598.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州居民用电执行浙江电网阶梯电价，按年累计电量分档。一户一表用户三档计价，合表用户略高。</p><div class=\"guide-block\"><h4>⚡ 浙江居民阶梯电价</h4><p>• <strong>第一档</strong>（0-2760 度/年）：0.538 元/度<br>• <strong>第二档</strong>（2761-4800 度/年）：0.588 元/度<br>• <strong>第三档</strong>（4800 度以上）：0.838 元/度<br>• <strong>峰谷电</strong>：峰 0.568 元/度，谷 0.298 元/度（需申请开通）</p></div><div class=\"guide-block\"><h4>💳 缴费方式</h4><p>• <strong>网上国网 APP</strong>：「网上国网」下载<br>• <strong>支付宝/微信</strong>：生活缴费 → 电费<br>• <strong>95598 客服</strong>：报修/咨询/业务办理</p></div><div class=\"guide-block\"><h4>📞 24h 报修热线</h4><p>• <strong>95598</strong>（全国统一）<br>• 停电报修、电表故障、电压异常</p><p style=\"margin-top:6px;\"><a href=\"https://www.95598.cn/\" target=\"_blank\" rel=\"noopener\">官网查询/缴费 →</a></p></div>", color: "#3b82f6" },
          { name: "燃气缴费", desc: "杭州燃气", url: "https://www.hzgas.com.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州市主城区管道天然气由杭州燃气集团供应，居民用气执行阶梯气价。点火/改装/过户需预约。</p><div class=\"guide-block\"><h4>🔥 杭州居民阶梯气价</h4><p>• <strong>第一档</strong>（0-480 方/年）：2.40 元/方<br>• <strong>第二档</strong>（481-960 方/年）：2.88 元/方<br>• <strong>第三档</strong>（960 方以上）：3.60 元/方<br>• <strong>IC 卡表</strong>：先充值后使用，余额不足自动关阀</p></div><div class=\"guide-block\"><h4>💳 缴费方式</h4><p>• <strong>支付宝/微信</strong>：生活缴费 → 燃气费<br>• <strong>杭州燃气 APP</strong>：在线缴费/报装/抢修<br>• <strong>银行代扣</strong>：工行/招行可签约<br>• <strong>IC 卡圈存</strong>：营业厅/24h 自助机</p></div><div class=\"guide-block\"><h4>📞 24h 抢修热线</h4><p>• 杭州燃气 24h 抢修：<strong>0571-87361119</strong><br>• 漏气/异味/熄火保护/气压低</p><p style=\"margin-top:6px;\"><a href=\"https://www.hzgas.com.cn/\" target=\"_blank\" rel=\"noopener\">官网查询/缴费 →</a></p></div>", color: "#8b5cf6" },
          { name: "固话宽带", desc: "电信/联通/移动", url: "https://www.10086.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州家庭宽带三大运营商可选，电信稳定性最佳，移动价格最低，联通介于其间。千兆宽带已覆盖主城区。</p><div class=\"guide-block\"><h4>🌐 三大运营商对比</h4><p>• <strong>中国电信</strong>：1000M 199元/月（含 1 手机号流量）<br>• <strong>中国移动</strong>：1000M 128元/月（需手机号绑定）<br>• <strong>中国联通</strong>：1000M 159元/月（融合套餐）</p></div><div class=\"guide-block\"><h4>💳 缴费方式</h4><p>• 支付宝/微信/银行 APP → 宽带/固话<br>• 各运营商 APP 在线缴费<br>• 营业厅签约银行代扣</p></div><div class=\"guide-block\"><h4>📞 客服</h4><p>• 电信：<strong>10000</strong><br>• 联通：<strong>10010</strong><br>• 移动：<strong>10086</strong></p></div>", color: "#06b6d4" },
          { name: "有线电视", desc: "华数传媒", url: "https://www.wasu.com/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州有线电视由华数传媒运营，提供数字电视、互动点播、宽带电视等服务。新装/移机/报修可线上预约。</p><div class=\"guide-block\"><h4>📺 主城区数字电视套餐</h4><p>• <strong>基本包</strong>：26 元/月（含 60+ 标清频道）<br>• <strong>互动增强包</strong>：35 元/月（含回看/点播）<br>• <strong>高清包</strong>：加 15 元/月（30+ 高清频道）<br>• <strong>4K 超清</strong>：需 4K 机顶盒</p></div><div class=\"guide-block\"><h4>💳 缴费方式</h4><p>• 支付宝/微信生活缴费<br>• 华数营业厅<br>• 银行代扣（工行/招行）</p></div><div class=\"guide-block\"><h4>📞 服务热线</h4><p>• 华数 24h 客服：<strong>96371</strong><br>• 故障报修/移机/新装/咨询</p></div>", color: "#ec4899" },
          { name: "医院挂号", desc: "浙一/浙二/邵逸夫", url: "https://zyygh.com/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">浙江省预约挂号统一平台 zyygh.com，覆盖省内三级以上医院，支持 7 天内预约，部分医院提前 14 天。也可通过浙里办、12580 电话挂号。</p><div class=\"guide-block\"><h4>🏥 杭州三甲医院</h4><p>• <strong>浙大一院</strong>（庆春/总部/之江）：综合实力顶尖<br>• <strong>浙大二院</strong>（滨江/解放路）：急诊烧伤科突出<br>• <strong>邵逸夫医院</strong>（庆春/下沙）：服务佳、胃肠/泌尿强<br>• <strong>省人民医院</strong>（朝晖/南星桥）：肝胆胰外科强<br>• <strong>省中医院</strong>（湖滨/丁桥）：中医综合调理</p></div><div class=\"guide-block\"><h4>📅 挂号渠道</h4><p>• <strong>浙里办 APP</strong>：最常用，省内统一<br>• <strong>12580</strong>：移动用户电话预约<br>• <strong>医院官方公众号</strong>：关注后可挂号<br>• <strong>支付宝</strong>：医疗 → 挂号</p></div><div class=\"guide-block\"><h4>⚠️ 注意事项</h4><p>• 退号至少提前 1 天，否则记爽约<br>• 爽约 3 次/年将被限制预约 90 天<br>• 急诊不预约，直接 120 或前往</p><p style=\"margin-top:6px;\"><a href=\"https://zyygh.com/\" target=\"_blank\" rel=\"noopener\">预约挂号平台 →</a></p></div>", color: "#14b8a6" },
          { name: "儿童疫苗", desc: "疫苗预约/接种", url: "https://wsjkw.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "新冠疫苗", desc: "加强针预约", url: "https://wsjkw.hangzhou.gov.cn/", color: "#f97316" },
          { name: "HPV疫苗", desc: "九价/四价预约", url: "https://wsjkw.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "流感疫苗", desc: "季节性流感疫苗", url: "https://wsjkw.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "带状疱疹疫苗", desc: "中老年人疫苗", url: "https://wsjkw.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "药店查询", desc: "医保定点药店", url: "https://wsjkw.hangzhou.gov.cn/", color: "#eab308" },
          { name: "母婴室", desc: "公共场所母婴室", url: "https://wsjkw.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "重名查询", desc: "姓名查重", url: "http://police.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "快递查询", desc: "全网物流追踪", url: "https://www.kuaidi100.com/", color: "#10b981" },
          { name: "家政服务", desc: "保洁/搬家/维修", url: "https://www.51jz.cn/", color: "#f59e0b" },
          { name: "开锁服务", desc: "备案开锁单位", url: "http://police.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "二手交易", desc: "闲置物品转让", url: "https://www.huishoubao.com.cn/", color: "#06b6d4" },
          { name: "福利彩票", desc: "双色球/大乐透", url: "https://www.cwl.gov.cn/", color: "#ec4899" },
          { name: "体育彩票", desc: "竞彩/排列三", url: "https://www.lottery.gov.cn/", color: "#14b8a6" },
          { name: "电影排片", desc: "影院/场次/选座", url: "https://www.mtime.com/", color: "#84cc16" },
          { name: "垃圾分类", desc: "分类查询/投放点", url: "https://www.hzscjzx.com/", color: "#f97316" },
          { name: "公厕查询", desc: "公厕位置导航", url: "https://www.hzscjzx.com/", color: "#a855f7" },
          { name: "急救电话", desc: "120/999急救", url: "tel:120", color: "#0ea5e9" },
          { name: "心理咨询", desc: "心理援助热线", url: "https://zk.zjzs.net/", color: "#22c55e" },
          { name: "法律援助", desc: "12348法律热线", url: "tel:12348", color: "#eab308" },
          { name: "消费者投诉", desc: "12315投诉举报", url: "tel:12315", color: "#3b82f6" },
          { name: "价格举报", desc: "12358价格热线", url: "tel:12358", color: "#ef4444" }
        ]
      },
      {
        id: "edu", name: "教育办事", icon: "📚",
        items: [
          { name: "开学攻略", desc: "中小学开学时间/准备", url: "https://edu.hangzhou.gov.cn/" },
          { name: "幼儿园入园", desc: "报名时间/材料/流程", url: "https://edu.hangzhou.gov.cn/" },
          { name: "小学入学", desc: "报名/学区划分", url: "https://edu.hangzhou.gov.cn/" },
          { name: "小升初", desc: "升学政策/流程", url: "https://edu.hangzhou.gov.cn/" },
          { name: "杭州中考", desc: "报名/考试/录取", url: "https://edu.hangzhou.gov.cn/" },
          { name: "浙江高考", desc: "报名/志愿/录取", url: "https://www.zjzs.net/" },
          { name: "浙江考研", desc: "报名/考试/成绩", url: "https://www.zjzs.net/" },
          { name: "浙江专升本", desc: "报名/考试/录取", url: "https://www.zjzs.net/" },
          { name: "学考成绩", desc: "学业水平考试查询", url: "https://www.zjzs.net/" },
          { name: "查学区划分", desc: "最新学区划分查询", url: "https://edu.hangzhou.gov.cn/" },
          { name: "学校名单", desc: "幼儿园至高校名单", url: "https://edu.hangzhou.gov.cn/" },
          { name: "普通话考试", desc: "报名/成绩查询", url: "https://www.cltt.org/" },
          { name: "夜校培训", desc: "课程报名/费用", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "免费培训考证", desc: "技能培训+补贴", url: "https://hrss.hangzhou.gov.cn/" },
          { name: "成人学历", desc: "成人高考/自考", url: "https://www.zjzs.net/" },
          { name: "入学通知书", desc: "录取通知书查询", url: "https://edu.hangzhou.gov.cn/" },
          { name: "分班查询", desc: "新生分班信息", url: "https://edu.hangzhou.gov.cn/" },
          { name: "军训安排", desc: "军训时间/地点", url: "https://edu.hangzhou.gov.cn/" },
          { name: "入学体检", desc: "新生体检项目/医院", url: "https://edu.hangzhou.gov.cn/" },
          { name: "新生报到", desc: "报到流程/须知", url: "https://edu.hangzhou.gov.cn/" },
          { name: "录取名单", desc: "中小学录取结果", url: "https://edu.hangzhou.gov.cn/" }
        ]
      },
      {
        id: "job", name: "找工作", icon: "💼",
        items: [
          { name: "今日招聘", desc: "最新招聘信息（日更）", url: "https://hrss.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "事业单位招聘", desc: "编制内岗位公告", url: "https://hrss.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "国企招聘", desc: "杭州国企岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#10b981" },
          { name: "政府机关", desc: "公务员/编外招聘", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "教师招聘", desc: "学校/培训机构", url: "https://edu.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "医院招聘", desc: "医生/护士/行政", url: "https://wsjkw.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "大厂招聘", desc: "阿里/网易/字节", url: "https://www.lagou.com/hangzhou/", color: "#ec4899" },
          { name: "校园招聘", desc: "秋招/春招信息", url: "https://www.zhaopin.com/", color: "#14b8a6" },
          { name: "实习岗位", desc: "大学生实习", url: "https://www.zhaopin.com/", color: "#84cc16" },
          { name: "兼职信息", desc: "短期/临时工", url: "https://www.zhaopin.com/", color: "#f97316" },
          { name: "低门槛岗位", desc: "不限学历", url: "https://www.zhaopin.com/", color: "#a855f7" },
          { name: "AI/算法岗", desc: "人工智能岗位", url: "https://www.lagou.com/ai/", color: "#0ea5e9" },
          { name: "前端开发", desc: "Web/小程序", url: "https://www.lagou.com/tech/", color: "#22c55e" },
          { name: "后端开发", desc: "Java/Python/Go", url: "https://www.lagou.com/tech/", color: "#eab308" },
          { name: "产品经理", desc: "互联网产品", url: "https://www.lagou.com/hangzhou/", color: "#3b82f6" },
          { name: "设计岗位", desc: "UI/UX/平面", url: "https://www.lagou.com/design/", color: "#ef4444" },
          { name: "运营岗位", desc: "内容/用户/活动", url: "https://www.lagou.com/operation/", color: "#f59e0b" },
          { name: "金融岗位", desc: "银行/证券/基金", url: "https://www.lagou.com/finance/", color: "#10b981" },
          { name: "法务岗位", desc: "律师/法务顾问", url: "https://www.lagou.com/legal/", color: "#8b5cf6" },
          { name: "销售岗位", desc: "BD/客户经理", url: "https://www.zhaopin.com/", color: "#06b6d4" },
          { name: "人事行政", desc: "HR/行政", url: "https://www.zhaopin.com/", color: "#ec4899" },
          { name: "残疾人就业", desc: "专属岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "退役军人", desc: "军转干部安置", url: "https://www.hangzhou.gov.cn/col/col1229836157/index.html", color: "#84cc16" },
          { name: "外籍人才", desc: "外国人就业许可", url: "https://www.hzrc.com/", color: "#f97316" },
          { name: "高层次人才", desc: "博士/博士后", url: "https://www.hzrc.com/", color: "#a855f7" },
          { name: "浙江省考", desc: "省公务员考试", url: "", detail: "<p><strong>浙江省公务员考试</strong></p><p><strong>时间</strong>：通常每年11-12月发布公告，12月或次年1月笔试</p><p><strong>报考条件</strong>：</p><p>• 年龄18-35周岁</p><p>• 大专及以上学历</p><p>• 部分岗位限户籍或应届毕业生</p><p style=\"margin-top:8px;\"><strong>报名入口</strong>：浙江省公务员考试录用网（gwy.zjks.gov.cn）</p><p><strong>考试科目</strong>：《行政职业能力测验》《申论》，部分岗位加试专业科目</p><p style=\"color:var(--text-muted);font-size:13px;\">杭州岗位竞争激烈，建议提前3-6个月备考</p>", color: "#0ea5e9" },
          { name: "国家公务员", desc: "国考报名录用", url: "http://www.scs.gov.cn/", color: "#22c55e" },
          { name: "选调生", desc: "应届生选拔", url: "https://zfcg.czt.zj.gov.cn/", color: "#eab308" },
          { name: "事业单位联考", desc: "综合类/教育类", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "银行校招", desc: "浙江银行招聘", url: "https://www.zjzg.org.cn/", color: "#ef4444" },
          { name: "烟草招聘", desc: "烟草局招聘", url: "", detail: "<p><strong>浙江烟草招聘</strong></p><p>浙江省烟草专卖局（公司）招聘分为两类：</p><p>① <strong>管理类岗位</strong>：要求本科及以上学历，部分岗位限专业</p><p>② <strong>业务类岗位</strong>：要求大专及以上学历</p><p style=\"margin-top:8px;\"><strong>报名入口</strong>：中国烟草人才招聘平台</p><p><strong>考试内容</strong>：行测 + 申论 + 烟草专业知识</p><p style=\"color:var(--text-muted);font-size:13px;\">烟草系统待遇优厚，竞争激烈，每年招聘时间不固定</p>", color: "#f59e0b" },
          { name: "电网招聘", desc: "国家电网", url: "https://zhaopin.sgcc.com.cn/", color: "#10b981" },
          { name: "三大运营商", desc: "移动/电信/联通", url: "https://www.10086.cn/", color: "#8b5cf6" },
          { name: "招聘会排期", desc: "线下招聘会", url: "https://hrss.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "人才市场", desc: "综合性招聘会", url: "https://hrss.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "简历模板", desc: "免费简历下载", url: "https://www.officeplus.cn/", color: "#14b8a6" },
          { name: "求职补贴", desc: "就业困难补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "创业扶持", desc: "创业贷款政策", url: "https://hrss.hangzhou.gov.cn/", color: "#f97316" }
        ]
      },
      {
        id: "housing", name: "住房保障", icon: "🏠",
        items: [
          { name: "公租房申请", desc: "申请条件/流程", url: "https://fgj.hangzhou.gov.cn/", color: "#ef4444", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州公租房是为中低收入住房困难家庭提供的保障性住房，租金远低于市场价（约为市场价 30-60%）。已实现线上申请、线下选房、合同签订全流程。</p><div class=\"guide-block\"><h4>📋 办事指南</h4><p>① <strong>申请资格</strong>：杭州户籍或在杭连续社保满 5 年，人均住房面积低于 15 m²<br>② <strong>家庭收入</strong>：6 万元/年以下（参考，每年调整）<br>③ <strong>线上申请</strong>：浙里办「公租房申请」提交材料<br>④ <strong>选房配租</strong>：通过资格审核后进入轮候，按积分选房</p></div><div class=\"guide-block\"><h4>📑 所需材料</h4><p>• 身份证、户口簿<br>• 婚姻证明<br>• 收入证明（单位或街道开具）<br>• 房产证明（房管部门查询）<br>• 社保缴纳证明</p></div><div class=\"guide-block\"><h4>🏢 办理地点</h4><p>线上：浙里办 APP<br>线下：各区住建局公租房窗口<br>电话：0571-87015858</p></div><div class=\"guide-block\"><h4>🌐 官方入口</h4><a href=\"https://fgj.hangzhou.gov.cn/\" target=\"_blank\" rel=\"noopener\" style=\"display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;\">前往 杭州房管 →</a></div><div class=\"guide-block\"><h4>⏱ 时效 / 费用</h4><p>资格审核：30 个工作日；轮候配租：根据房源情况，主城区通常 6-12 个月；月租金 8-25 元/m²（按面积与位置）。</p></div>" },
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
          { name: "酒店式公寓", desc: "长租公寓", url: "", detail: "<p><strong>杭州长租公寓/酒店式公寓</strong></p><p>杭州主流长租公寓品牌：</p><p>• <strong>自如</strong>：分散式合租/整租，装修统一</p><p>• <strong>蛋壳公寓</strong>：分散式长租</p><p>• <strong>泊寓</strong>（万科）：集中式公寓</p><p>• <strong>冠寓</strong>（龙湖）：集中式公寓</p><p>• <strong>朗诗寓</strong>：集中式公寓</p><p style=\"margin-top:8px;\"><strong>租金参考</strong>：</p><p>• 合租单间：1500-3000元/月</p><p>• 整租一居：3000-6000元/月</p><p style=\"color:var(--text-muted);font-size:13px;\">建议通过正规平台签约，警惕「租金贷」陷阱</p>", color: "#f97316" },
          { name: "法拍房", desc: "司法拍卖", url: "https://hz.fang.com/", color: "#a855f7" },
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
          { name: "西湖景区", desc: "景点/游船/预约", url: "https://westlake.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "断桥残雪", desc: "白娘子许仙借伞定情地", url: "https://westlake.hangzhou.gov.cn/", color: "#3b82f6", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">断桥位于白堤东端，是西湖最著名的景点之一。得名有二：一说是大雪初霁，桥阳面雪融而阴面残雪，远看如断；二说是白娘子与许仙在此相会又离散，故有「断桥不断」之说。冬季雪后是经典观景时刻，春日柳色亦佳。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• 冬季雪景：杭州难得下雪，雪后断桥最为知名<br>• 春日桃柳：白堤两侧桃红柳绿，江南春景典范<br>• 历史人文：白蛇传传说地，承载古典爱情意象</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>地铁 1 号线/3 号线 西湖文化广场站，步行约 800 米<br>公交：断桥站（7 路、27 路、78 路夜等）</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>西湖景区免费开放，无需门票<br>周边景点（如孤山、浙江省博物馆）免费</p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>冬季雪后 1-2 月、春季 3-4 月最佳；清晨 6-8 时人少；周末人流密集建议工作日。</p></div>" },
          { name: "苏堤春晓", desc: "2.8公里长堤·桃红柳绿", url: "https://westlake.hangzhou.gov.cn/", color: "#10b981", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">苏堤是北宋苏轼任杭州知州时主持修筑的湖堤，全长 2.8 公里，纵贯西湖南北。堤上六桥各有特色，两侧桃柳夹岸。南宋时被列为西湖十景之首，题名「苏堤春晓」。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• 春晓桃柳：3-4 月桃花盛开，垂柳吐绿，是江南春景代表<br>• 苏堤六桥：跨虹、东浦、压堤、望山、锁澜、映波<br>• 全景漫步：步行贯通约 1 小时，沿堤可览湖光山色</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>地铁 1 号线 龙翔桥站，步行至湖滨再北上<br>公交：苏堤站（4 路、31 路、假日游线）</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>免费开放，无需预约<br>游船：50-70 元/人，可从花港码头登船</p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>3-4 月最佳；清晨 5-7 时观日出；秋季 10-11 月可赏落叶；周末人流较多。</p></div>" },
          { name: "三潭印月", desc: "小瀛洲·人民币一元背景", url: "https://westlake.hangzhou.gov.cn/", color: "#f59e0b", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">三潭印月是西湖中最大的岛「小瀛洲」，被誉为「西湖第一胜境」。岛南湖面有三座石塔，塔中空，月夜时塔内点烛，洞口糊纸，光印湖面如三月，故名三潭印月。第五套人民币 1 元背面图案即此景。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• 三座石塔：湖中三塔呈等边三角分布，造型独特<br>• 小瀛洲园林：岛上有「湖中有岛，岛中有湖」奇景<br>• 人民币背景：1 元纸币（旧版）背面图案</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>需在西湖各码头乘船登岛<br>主要码头：湖滨、花港、中山公园、杭饭</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>船票+门票 55 元/人（含往返）<br>开放时间：8:00-17:00<br><a href=\"https://westlake.hangzhou.gov.cn/\" target=\"_blank\" rel=\"noopener\">查看官方信息 →</a></p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>中秋月夜最佳（三潭印月）；白天春秋两季气候宜人；建议工作日避高峰。</p></div>" },
          { name: "曲院风荷", desc: "西湖最大公园·荷花胜景", url: "https://westlake.hangzhou.gov.cn/", color: "#8b5cf6", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">曲院风荷是西湖十景之一，因南宋时期此地有官家酿酒作坊「曲院」，荷花盛开时酒香与荷香相融得名。园内荷花品种达百余种，是杭州夏季赏荷首选地。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• 荷花胜景：6-8 月荷花盛开，红白紫粉各色齐全<br>• 滨湖长廊：荷花池边长廊，可避雨赏荷<br>• 桂花林：秋季 9-10 月有桂花，与岳王庙相邻</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>公交：曲院风荷站（15 路、28 路、82 路等）<br>地铁 3 号线 黄龙体育中心站，步行约 1 公里</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>免费开放<br>岳王庙 25 元（联票可购）</p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>夏季 6-8 月清晨赏荷；秋季 10 月桂花；春秋两季休闲漫步；建议早上 6-9 时人少。</p></div>" },
          { name: "柳浪闻莺", desc: "南宋御花园·黄莺啼鸣", url: "https://westlake.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "花港观鱼", desc: "乾隆御题·鱼花共生", url: "https://westlake.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "平湖秋月", desc: "西湖最佳赏月地", url: "https://westlake.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "雷峰夕照", desc: "雷峰塔·夕阳塔影", url: "https://www.leifengta.com/", color: "#84cc16", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">雷峰塔位于西湖南岸夕照山，始建于公元 977 年，原为吴越王钱俶为皇妃黄氏所建。原塔于 1924 年倒塌，2002 年重建为现代八面五层塔，是国内首座铜雕塔。白蛇传传说中镇压白娘子之地，是西湖标志性景观。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• 塔顶观湖：登顶可俯瞰整个西湖全景，对望宝石山保俶塔<br>• 夕阳塔影：日落时分塔影映湖，是经典摄影机位<br>• 地宫遗址：塔下展示原塔地宫出土文物，含鎏金阿育王塔</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>公交：净慈寺站（4 路、31 路、315 路等）<br>地铁：3 号线 黄龙体育中心站步行 1.5 公里</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>40 元/人<br>开放时间：8:00-20:30（夏季）<br><a href=\"https://www.leifengta.com/\" target=\"_blank\" rel=\"noopener\">官网预约 →</a></p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>全年开放，傍晚日落前 1 小时最佳；夏季晴日可看晚霞；秋季 10 月雷峰塔与桂花相映。</p></div>" },
          { name: "双峰插云", desc: "南北高峰远眺", url: "https://westlake.hangzhou.gov.cn/", color: "#f97316" },
          { name: "南屏晚钟", desc: "净慈寺青铜梵钟", url: "https://westlake.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "西湖新十景", desc: "宝石流霞/黄龙吐翠等", url: "https://westlake.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "三评西湖十景", desc: "灵隐禅踪/六和听涛等", url: "https://westlake.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "西湖手划船", desc: "摇橹船预约", url: "https://westlake.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "灵隐寺", desc: "免费预约入园", url: "https://www.lingyinsi.com/", color: "#10b981" },
          { name: "法喜寺", desc: "网红斋饭/白玉兰", url: "https://www.lingyinsi.com/", color: "#3b82f6", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">法喜寺（上天竺寺）位于西湖区天竺路，始建于后晋天福元年（936年），与灵隐寺、中天竺、下天竺并称「天竺三寺」。近年来因网红 5 元斋饭、白玉兰花期与年轻化禅意文创走红，是杭州年轻人打卡礼佛热门地。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• <strong>网红斋饭</strong>：5 元一份，两菜一饭一汤，平日限量<br>• <strong>白玉兰花期</strong>：2 月底-3 月初寺内白玉兰盛开<br>• <strong>御题「法喜寺」</strong>：乾隆御笔匾额<br>• <strong>求姻缘</strong>：寺内观音灵签据说灵验，年轻人最爱的求姻缘地</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>公交：7 路、103 路、324 路「上天竺」站<br>地铁：3 号线 黄龙体育中心站，换乘公交 7 路至「上天竺」<br>提示：天竺路步行可串联下天竺→中天竺→上天竺，约 1.5 公里</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>10 元/人（含香）<br>开放时间：6:30-18:00<br>斋饭供应：11:00-13:00（售完即止，节假日排队较长）</p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>平日清晨人少；2-3 月白玉兰期最佳；周末及节假日人流量大，建议早到。</p></div>" },
          { name: "景点预约", desc: "杭州各景点预约入口", url: "https://wap.lotsmall.cn/vue/list/ticket?m_id=163", color: "#8b5cf6" },
          { name: "西溪湿地", desc: "门票/摇橹船", url: "https://www.xixiwetland.com.cn/", color: "#06b6d4", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">西溪国家湿地公园位于西湖区与余杭区交界，距西湖约 5 公里，是国内首个国家级湿地公园，面积 11.5 平方公里。电影《非诚勿扰》取景地，与西湖、西泠并称「三西」。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• <strong>摇橹船</strong>：手摇木船，100 元/船（6 人），1 小时生态漫游<br>• <strong>深潭口</strong>：《非诚勿扰》取景地，古樟树与河渚街<br>• <strong>秋芦飞雪</strong>：秋季芦苇荡如雪，秋季最美<br>• <strong>河渚街</strong>：传统街巷、湿地博物馆、戏曲表演<br>• <strong>烟水渔庄</strong>：体验西溪传统渔业文化</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>• <strong>周家村入口</strong>（主入口）：公交 193 路、290 路、B 支 7<br>• <strong>地铁</strong>：3 号线 西溪湿地南站步行 800 米<br>• 自驾：周家村、北门、东门均有停车场（10 元/小时）</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>• 公园门票：80 元<br>• <strong>电瓶船套票</strong>：150 元（含门票+船票）<br>• <strong>摇橹船</strong>：100 元/船（6 人，1 小时）<br>• 开放时间：7:00-18:30（夏）/ 7:30-17:30（冬）<br>• 杭州市民卡 40 元/年无限次</p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>• <strong>春</strong>：3-4 月探梅、踏青<br>• <strong>夏</strong>：荷花、夜游湿地<br>• <strong>秋</strong>（最佳）：9-11 月芦苇飞雪，最美季节<br>• <strong>冬</strong>：探梅、静谧游</p></div>" },
          { name: "千岛湖", desc: "景区/游船/住宿", url: "", detail: "<p><strong>千岛湖（新安江水库）</strong></p><p>位于杭州市淳安县，是5A级景区，因湖中有1078座岛屿而得名。</p><p><strong>必玩项目</strong>：</p><p>• <strong>游船</strong>：中心湖区（梅峰岛、渔乐岛）、东南湖区</p><p>• <strong>梅峰岛</strong>：登高观群岛全景</p><p>• <strong>森林氧吧</strong>：漫步原始森林</p><p>• <strong>环岛骑行</strong>：绿道骑行赏湖光</p><p style=\"margin-top:8px;\"><strong>美食</strong>：千岛湖有机鱼头汤</p><p><strong>交通</strong>：杭州西站乘高铁约1小时到千岛湖站</p>", color: "#ec4899" },
          { name: "钱塘江大潮", desc: "观潮时间表/地点", url: "", detail: "<p><strong>钱塘江大潮</strong></p><p>世界三大涌潮之一，最佳观赏期为农历八月十八前后（通常公历9-10月）。</p><p><strong>观潮点推荐</strong>：</p><p>• <strong>海宁盐官</strong>：一线潮，最佳观赏点</p><p>• <strong>老盐仓</strong>：回头潮</p><p>• <strong>萧山美女坝</strong>：美女二回头</p><p>• <strong>下沙七格</strong>：冲天潮</p><p style=\"margin-top:8px;color:#ef4444;\"><strong>⚠️ 观潮安全</strong>：务必在安全区域观潮，切勿翻越堤坝！每年农历八月十八大潮期都有伤亡事故。</p>", color: "#14b8a6" },
          { name: "宋城演艺", desc: "千古情演出", url: "https://www.songcn.com/", color: "#84cc16", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州宋城位于之江路 148 号，北依西湖、南傍钱塘，是一座以南宋文化为主题的大型人造乐园，年接待游客超 1000 万人次。「宋城千古情」演出被誉为「世界三大名秀」之一，是杭州夜游的标志性项目。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• <strong>《宋城千古情》</strong>：大型歌舞，60 分钟，分「良渚之光」「宋宫宴舞」「金戈铁马」「西子传说」「魅力杭州」五幕<br>• <strong>王员外家抛绣球</strong>：互动演艺，趣味强<br>• <strong>鬼屋/聊斋惊魂</strong>：恐怖主题体验馆<br>• <strong>宋城夜景</strong>：夜场灯火璀璨，更有穿越感<br>• <strong>市井街</strong>：还原南宋街市，可穿汉服拍照</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>• 公交：4 路、39 路、202 路、287 路「宋城」站<br>• 地铁：6 号线 之江路站 步行约 1 公里<br>• 自驾：宋城停车场 5 元/小时，节假日建议早到</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>• <strong>贵宾席</strong>：320 元（含千古情）<br>• <strong>豪华席</strong>：480 元（含千古情）<br>• <strong>尊宾席</strong>：580 元<br>• 单买公园票（不含演出）：100 元<br>• 开放时间：10:00-21:30（夜场至最后一场千古情结束）<br>• 千古情演出通常 4 场：14:00、16:00、19:00、20:30（节假日加场）</p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>• 春秋两季天气舒适；夏季注意防晒；冬季人少<br>• 演出建议提前 30 分钟入场选座<br>• 一票难求日期：国庆、春节、五一等长假</p></div>" },
          { name: "杭州乐园", desc: "主题乐园", url: "", detail: "<p><strong>杭州乐园</strong></p><p>位于萧山区风情大道，是长三角地区著名的综合性主题公园。</p><p><strong>主要项目</strong>：</p><p>• 过山车、大摆锤、激流勇进等刺激项目</p><p>• 摩天轮、旋转木马等亲子项目</p><p>• 水公园（夏季开放）</p><p>• 万圣节、春节等主题活动</p><p style=\"margin-top:8px;\"><strong>门票</strong>：成人约190元，网上预订有优惠</p><p><strong>交通</strong>：地铁1号线到湘湖站，换乘公交</p>", color: "#f97316" },
          { name: "杭州动物园", desc: "野生动物园", url: "https://www.hzzoo.com/", color: "#a855f7" },
          { name: "杭州植物园", desc: "四季花展", url: "", detail: "<p><strong>杭州植物园</strong></p><p>位于西湖区桃源岭，占地面积284.64公顷，是集科研、科普、游览于一体的综合性植物园。</p><p><strong>特色展区</strong>：</p><p>• <strong>山水园</strong>：槭树杜鹃园，秋季红叶</p><p>• <strong>百草园</strong>：药用植物</p><p>• <strong>分类区</strong>：裸子植物、被子植物</p><p>• <strong>竹类植物区</strong>：百种竹子</p><p style=\"margin-top:8px;\"><strong>四季花展</strong>：2月梅花、3-4月樱花/郁金香、5月杜鹃、9-10月桂花、11月红叶</p><p><strong>门票</strong>：10元</p>", color: "#0ea5e9" },
          { name: "良渚古城", desc: "世界遗产", url: "https://www.lzsite.cn/", color: "#22c55e", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">良渚古城遗址位于余杭区瓶窑镇、良渚街道一带，距今约 5300-4300 年，是中华五千年文明的实证。2019 年 7 月列入《世界遗产名录》，是中国第 55 处世界遗产。良渚文化以精美玉器闻名，「玉琮王」「玉璧王」为代表性器物，证明长江下游存在过一个早期国家。</p><div class=\"guide-block\"><h4>🎯 主要看点</h4><p>• <strong>古城遗址区</strong>：莫角山宫殿区、反山王陵、城墙遗址<br>• <strong>良渚博物院</strong>：展示玉器、陶器、漆器，玉琮王是镇馆之宝<br>• <strong>老虎岭水坝</strong>：世界最早的大型水利工程，比大禹治水早 1000 年<br>• <strong>反山王陵</strong>：出土玉琮王、玉钺王<br>• <strong>稻作文明</strong>：考古发现 20 万斤碳化稻谷堆积</p></div><div class=\"guide-block\"><h4>🚇 交通</h4><p>• 地铁：2 号线 良渚站，换乘公交 428/781 路<br>• 自驾：市区驾车约 1 小时，遗址公园内停车 10 元<br>• 公园与博物院相距约 3 公里，建议一日游同访</p></div><div class=\"guide-block\"><h4>🎫 门票</h4><p>• <strong>良渚古城遗址公园</strong>：50 元（观光车另购 20 元）<br>• <strong>良渚博物院</strong>：免费（需提前预约）<br>• 开放时间：公园 9:00-17:00（16:00 停止入场）；博物院 9:00-16:30（周一闭馆）</p></div><div class=\"guide-block\"><h4>📅 推荐时间</h4><p>• 春秋：户外遗址区凉爽，植被最美<br>• 夏季：注意防晒、补水，公园较大需乘观光车<br>• 建议行程：上午博物院（室内）+ 下午遗址公园（户外）</p></div>" },
          { name: "京杭大运河", desc: "运河夜游", url: "https://www.canaln.com/", color: "#eab308" },
          { name: "杭州博物馆", desc: "免费预约参观", url: "https://hz-museum.cn/", color: "#3b82f6" },
          { name: "中国茶叶博物馆", desc: "免预约入馆", url: "https://www.teamuseum.cn/", color: "#ef4444" },
          { name: "丝绸博物馆", desc: "免预约", url: "https://www.chinasilkmuseum.com/", color: "#f59e0b" },
          { name: "南宋官窑博物馆", desc: "陶瓷艺术", url: "", detail: "<p><strong>南宋官窑博物馆</strong></p><p>位于南复路，中国第一座陶瓷专题博物馆。</p><p>• 免费开放</p><p>• 周一闭馆</p><p>• 交通：地铁4号线水澄桥站</p>", color: "#10b981" },
          { name: "刀剪剑博物馆", desc: "非遗传承", url: "https://www.hzacm.cn/", color: "#8b5cf6" },
          { name: "演唱会", desc: "近期演出信息", url: "https://www.damai.cn/", color: "#06b6d4" },
          { name: "音乐节", desc: "草莓/迷笛", url: "https://www.damai.cn/", color: "#ec4899" },
          { name: "话剧歌剧", desc: "剧院演出", url: "https://www.damai.cn/", color: "#14b8a6" },
          { name: "西博会", desc: "西湖博览会", detail: "<p><strong>西湖博览会</strong></p><p>创办于1929年，是中国历史最悠久的博览会之一。</p><p><strong>主要内容</strong>：</p><p>• 国际合作论坛</p><p>• 经贸洽谈会</p><p>• 文化展演活动</p><p>• 各类主题展览</p><p style=\"margin-top:8px;\"><strong>举办时间</strong>：通常每年10-11月</p><p style=\"color:var(--text-muted);font-size:13px;\">具体活动安排以当年公告为准</p>", color: "#84cc16" },
          { name: "动漫节", desc: "中国国际动漫节", url: "https://www.cicaf.com/", color: "#f97316" },
          { name: "茶博会", desc: "中国国际茶博会", detail: "<p><strong>中国国际茶博会</strong></p><p>中国唯一以茶为主题的国家级国际性博览会，永久落户杭州。</p><p><strong>主要内容</strong>：</p><p>• 茶叶展销（绿茶、红茶、乌龙茶等）</p><p>• 茶文化展演</p><p>• 茶艺大赛</p><p>• 茶产业论坛</p><p style=\"margin-top:8px;\"><strong>举办时间</strong>：通常每年5月</p><p><strong>举办地点</strong>：杭州国际博览中心</p>", color: "#a855f7" },
          { name: "文博会", desc: "杭州文化创意产业博览会", detail: "<p><strong>杭州文化创意产业博览会</strong></p><p>长三角地区重要的文创产业盛会。</p><p><strong>主要内容</strong>：</p><p>• 文创产品展销</p><p>• 设计艺术展</p><p>• 非遗文化展示</p><p>• 动漫游戏展区</p><p style=\"margin-top:8px;\"><strong>举办时间</strong>：通常每年9-10月</p>", color: "#0ea5e9" },
          { name: "西湖音乐节", desc: "年度音乐盛会", url: "https://www.damai.cn/", color: "#22c55e" },
          { name: "钱塘江文化节", desc: "系列文化活动", detail: "<p><strong>钱塘江文化节</strong></p><p>以钱塘江文化为主题的综合性文化活动。</p><p><strong>主要活动</strong>：</p><p>• 文化论坛</p><p>• 艺术展演</p><p>• 群众文化活动</p><p>• 摄影/书法展览</p><p style=\"margin-top:8px;\"><strong>举办时间</strong>：通常每年9月前后</p>", color: "#eab308" },
          { name: "宋城火把节", desc: "夜游主题活动", url: "https://www.songcn.com/", color: "#ef4444" },
          { name: "西溪花朝节", desc: "春季花展", url: "https://www.xixiwetland.com.cn/", color: "#3b82f6" },
          { name: "西湖桂花节", desc: "秋季赏桂", detail: "<p><strong>西湖桂花节</strong></p><p>杭州是桂花之城，市花为桂花。每年秋季举办桂花节。</p><p><strong>最佳赏桂地点</strong>：</p><p>• <strong>满觉陇</strong>：最著名的赏桂胜地，「满陇桂雨」</p><p>• <strong>杭州植物园</strong>：桂花品种丰富</p><p>• <strong>柳浪闻莺</strong>：西湖边赏桂</p><p>• <strong>九溪</strong>：山林间桂花香</p><p style=\"margin-top:8px;\"><strong>时间</strong>：每年9月下旬至10月中旬</p><p><strong>特色</strong>：桂花茶、桂花糖、桂花酒酿</p>", color: "#f59e0b" },
          { name: "杭州马拉松", desc: "报名/路线", url: "https://hm.zhetiyu.cn/", color: "#84cc16" },
          { name: "浙BA篮球", desc: "城市篮球联赛", url: "http://ty.hangzhou.gov.cn/", color: "#f97316" },
          { name: "足球联赛", desc: "中甲联赛", url: "http://ty.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "电竞比赛", desc: "LGD主场", url: "", detail: "<p><strong>杭州电竞</strong></p><p>杭州是中国电竞重镇，拥有 LGD 等知名战队。</p><p><strong>主要场馆</strong>：</p><p>• <strong>LGD 电竞主场</strong>：下城区电竞数娱小镇</p><p>• <strong>杭州电竞中心</strong>：拱墅区</p><p style=\"margin-top:8px;\"><strong>主要赛事</strong>：</p><p>• LPL（英雄联盟职业联赛）</p><p>• KPL（王者荣耀职业联赛）</p><p>• DOTA2、CS:GO 等国际赛事</p>", color: "#0ea5e9" },
          { name: "赏花地图", desc: "梅花/樱花/荷花", url: "https://westlake.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "水果采摘", desc: "草莓/枇杷/杨梅", detail: "<p><strong>杭州水果采摘指南</strong></p><p><strong>春季</strong>：</p><p>• 草莓（1-5月）：建德、余杭</p><p>• 樱桃（4-5月）：萧山、富阳</p><p>• 枇杷（5-6月）：塘栖（塘栖枇杷闻名全国）</p><p><strong>夏季</strong>：</p><p>• 杨梅（6月）：萧山杜家杨梅、仙居</p><p>• 水蜜桃（7-8月）：奉化、新登</p><p>• 葡萄（7-9月）：富阳、建德</p><p><strong>秋季</strong>：</p><p>• 猕猴桃（9-10月）：江山、泰顺</p><p>• 柿子（10-11月）：各地</p><p style=\"color:var(--text-muted);font-size:13px;\">建议提前电话联系农场确认采摘时间和价格</p>", color: "#eab308" },
          { name: "亲子乐园", desc: "儿童游玩", url: "https://westlake.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "露营基地", desc: "免费/收费营地", url: "https://westlake.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "爬山推荐", desc: "北高峰/贵人峰", url: "https://westlake.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "免费景点", desc: "免费开放日", url: "https://westlake.hangzhou.gov.cn/", color: "#10b981" },
          { name: "古镇古村", desc: "塘栖/河桥/荻浦", url: "https://westlake.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "网红打卡", desc: "拍照圣地", url: "https://westlake.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "杭帮菜", desc: "知味观/楼外楼", url: "https://m.dianping.com/searchlist?cityId=2&keyword=杭帮菜", color: "#ec4899" },
          { name: "龙井问茶", desc: "茶园体验", url: "https://www.lzsite.cn/", color: "#14b8a6" },
          { name: "夜游攻略", desc: "夜景/夜宵", url: "https://westlake.hangzhou.gov.cn/", color: "#84cc16" },
          { name: "杭州概况", desc: "城市简介/历史人文", detail: "<p><strong>杭州概况</strong></p><p>杭州，浙江省省会，副省级城市，长三角中心城市之一。</p><p><strong>基本信息</strong>：</p><p>• 面积：16850平方公里</p><p>• 人口：约1237万</p><p>• 行政区划：10区2县1市</p><p>• 气候：亚热带季风气候，四季分明</p><p style=\"margin-top:8px;\"><strong>城市名片</strong>：</p><p>• 世界文化遗产：西湖、京杭大运河、良渚古城遗址</p><p>• 中国数字经济第一城</p><p>• 电子商务之都（阿里巴巴总部）</p><p>• 最具幸福感城市（连续多年）</p>", color: "#3b82f6" },
          { name: "最佳旅行时间", desc: "四季特色/淡旺季", detail: "<p><strong>杭州最佳旅行时间</strong></p><p><strong>春季（3-5月）</strong>：★★★★★</p><p>樱花、桃花、郁金香盛开，西湖春意盎然，气候宜人。</p><p><strong>夏季（6-8月）</strong>：★★★</p><p>炎热潮湿，梅雨季节多雨，但可赏荷花、夜游西湖。</p><p><strong>秋季（9-11月）</strong>：★★★★★</p><p>桂花飘香，红叶满山，秋高气爽，是观潮最佳季节。</p><p><strong>冬季（12-2月）</strong>：★★★</p><p>湿冷，但可赏断桥残雪（难得一见），是旅游淡季人少。</p><p style=\"margin-top:8px;\"><strong>建议</strong>：3-5月、9-11月为最佳旅游季节</p>", color: "#10b981" },
          { name: "旅游贴士", desc: "注意事项/实用建议", detail: "<p><strong>杭州旅游实用贴士</strong></p><p><strong>交通</strong>：</p><p>• 地铁覆盖主要景点，推荐刷支付宝乘车码</p><p>• 西湖景区建议步行+公交，节假日周边拥堵</p><p><strong>门票</strong>：</p><p>• 西湖免费开放（部分景点收费）</p><p>• 灵隐寺需购飞来峰门票+寺庙门票</p><p>• 雷峰塔、三潭印月需购票</p><p><strong>注意事项</strong>：</p><p>• 节假日提前预约热门景点</p><p>• 夏季注意防晒防暑</p><p>• 西湖边禁止共享单车进入</p><p>• 雨天西湖别有韵味，记得带伞</p>", color: "#f59e0b" },
          { name: "首次游杭", desc: "第一次来杭州必看", detail: "<p><strong>第一次来杭州必看</strong></p><p><strong>经典一日游路线</strong>：</p><p>断桥残雪 → 白堤 → 平湖秋月 → 孤山 → 西泠印社 → 岳王庙 → 苏堤春晓 → 花港观鱼 → 雷峰塔 → 南屏晚钟</p><p style=\"margin-top:8px;\"><strong>必去景点</strong>：</p><p>• 西湖（免费，建议骑行或乘船游湖）</p><p>• 灵隐寺（千年古刹）</p><p>• 河坊街（老字号美食街）</p><p>• 宋城（主题公园，《宋城千古情》演出）</p><p>• 京杭大运河（拱宸桥、桥西历史街区）</p><p style=\"margin-top:8px;\"><strong>必吃美食</strong>：西湖醋鱼、东坡肉、龙井虾仁、片儿川、葱包桧</p>", color: "#8b5cf6" },
          { name: "杭州住宿", desc: "区域选择/酒店推荐", detail: "<p><strong>杭州住宿推荐</strong></p><p><strong>按区域选择</strong>：</p><p>• <strong>湖滨/西湖周边</strong>：地理位置最佳，步行可达西湖，价格较高（500-2000元）</p><p>• <strong>河坊街/吴山</strong>：老城区，近美食街，性价比高（300-800元）</p><p>• <strong>武林广场</strong>：商业中心，交通便利（400-1000元）</p><p>• <strong>钱江新城</strong>：新CBD，江景房，高端酒店多（600-2000元）</p><p>• <strong>西溪湿地</strong>：自然环境好，度假型酒店（500-1500元）</p><p style=\"margin-top:8px;\"><strong>建议</strong>：节假日提前预订，价格涨幅较大；青旅和快捷酒店200-400元</p>", color: "#06b6d4" },
          { name: "雷峰塔", desc: "白娘子传说·登塔览西湖", url: "https://www.leifengta.com/", color: "#ef4444" },
          { name: "河坊街", desc: "清河坊历史街区·小吃老字号", detail: "<p><strong>河坊街</strong></p><p>上城区清河坊历史街区，杭州最知名的步行街。</p><p>• 老字号云集：胡庆余堂、方回春堂、张小泉、万隆</p><p>• 特色小吃：葱包桧、定胜糕、龙须糖</p><p>• 非遗体验：王星记扇子、朱炳仁铜雕</p>", color: "#f59e0b" },
          { name: "南宋御街", desc: "中山中路·古街漫步", detail: "<p><strong>南宋御街（中山中路）</strong></p><p>南宋时期皇帝出行的专用道路，现为历史文化街区。</p><p><strong>特色</strong>：</p><p>• 南宋文化遗址展示</p><p>• 民国建筑与现代商业融合</p><p>• 创意小店、咖啡馆</p><p>• 靠近河坊街，可一并游览</p><p style=\"margin-top:8px;\"><strong>交通</strong>：地铁1号线定安路站</p>", color: "#10b981" },
          { name: "湘湖", desc: "萧山·跨湖桥文化遗址", url: "http://www.chinaxianghu.com/lvyou/", color: "#3b82f6" },
          { name: "径山寺", desc: "日本茶道祖庭·余杭", detail: "<p><strong>径山寺</strong></p><p>位于余杭区径山，始建于唐，是日本茶道的祖庭。</p><p><strong>历史地位</strong>：</p><p>• 南宋时为「江南五山十刹」之首</p><p>• 日本茶道、临济宗的发源地</p><p>• 中日佛教文化交流重镇</p><p style=\"margin-top:8px;\"><strong>特色</strong>：径山茶宴（国家级非遗）、径山茶</p><p><strong>交通</strong>：杭州市区驾车约1.5小时</p>", color: "#8b5cf6" },
          { name: "龙门古镇", desc: "孙权故里·富阳", detail: "<p><strong>龙门古镇</strong></p><p>位于富阳区，是三国东吴大帝孙权的故里。</p><p><strong>特色</strong>：</p><p>• 保存完好的明清古建筑群</p><p>• 孙权后裔聚居地，90%以上姓孙</p><p>• 卵石古街、祠堂、厅堂</p><p style=\"margin-top:8px;\"><strong>门票</strong>：68元</p><p><strong>交通</strong>：杭州东站乘大巴到富阳，再换乘公交</p>", color: "#06b6d4" },
          { name: "塘栖古镇", desc: "京杭运河名镇·余杭", detail: "<p><strong>塘栖古镇</strong></p><p>位于余杭区，京杭大运河杭州段的起点。</p><p><strong>特色</strong>：</p><p>• 广济桥（运河上唯一的七孔石拱桥）</p><p>• 水北历史街区</p><p>• 塘栖枇杷（闻名全国）</p><p>• 法根糕点、细沙羊尾等老字号美食</p><p style=\"margin-top:8px;\"><strong>交通</strong>：地铁1号线到临平，换乘公交</p>", color: "#14b8a6" },
          { name: "瑶琳仙境", desc: "溶洞奇观·桐庐", url: "https://www.2tonglu.com/yaolinxianjing.html", color: "#84cc16" },
          { name: "大慈岩", desc: "悬空寺·建德", detail: "<p><strong>大慈岩</strong></p><p>位于建德市，以悬空寺闻名，被誉为「江南悬空寺」。</p><p><strong>特色</strong>：</p><p>• 寺庙建在悬崖峭壁上</p><p>• 天然立佛（高147米）</p><p>• 索道登山</p><p style=\"margin-top:8px;\"><strong>门票</strong>：85元</p><p><strong>交通</strong>：杭州西站乘大巴到建德，再换乘</p>", color: "#f97316" },
          { name: "天目山", desc: "大树王国·临安", url: "https://www.zjhztms.com/sy", color: "#a855f7" },
          { name: "大明山", desc: "浙西小黄山·临安", detail: "<p><strong>大明山</strong></p><p>位于临安区，被誉为「浙西小黄山」。</p><p><strong>特色</strong>：</p><p>• 奇松、怪石、云海、飞瀑</p><p>• 万米岩洞（矿洞遗址）</p><p>• 高山草甸</p><p>• 冬季滑雪场</p><p style=\"margin-top:8px;\"><strong>门票</strong>：110元+景区交通25元</p><p><strong>交通</strong>：杭州西站乘大巴到昌化，再换乘</p>", color: "#0ea5e9" },
          { name: "西湖骑行", desc: "环湖绿道·公共自行车", detail: "<p><strong>西湖骑行</strong></p><p>环西湖骑行是杭州最受欢迎的休闲活动之一。</p><p><strong>推荐路线</strong>（约15公里，2-3小时）：</p><p>断桥 → 白堤 → 苏堤 → 南山路 → 湖滨路 → 断桥</p><p style=\"margin-top:8px;\"><strong>租车</strong>：</p><p>• 杭州公共自行车（小红车）：1小时内免费</p><p>• 共享单车：哈啰、美团</p><p>• 环湖观光车：40元/人</p><p style=\"color:var(--text-muted);font-size:13px;\">西湖核心景区内禁止骑行，需推行</p>", color: "#22c55e" },
          { name: "西湖群山徒步", desc: "北高峰·龙井·九溪", detail: "<p><strong>西湖群山徒步</strong></p><p>西湖周围群山环抱，是徒步爱好者的天堂。</p><p><strong>经典路线</strong>：</p><p>• <strong>北高峰</strong>：法华寺上山，山顶可俯瞰西湖，约2小时</p><p>• <strong>龙井-九溪</strong>：龙井村→十里琅珰→九溪烟树，约3小时，茶田风光</p><p>• <strong>宝石山</strong>：少年宫上，保俶塔，可看西湖全景，约1小时</p><p>• <strong>玉皇山</strong>：八卦田上，可看钱塘江，约1.5小时</p><p style=\"margin-top:8px;\"><strong>注意</strong>：穿防滑鞋，带足水，雨季注意路滑</p>", color: "#eab308" },
          { name: "西溪摇橹船", desc: "湿地生态游", url: "https://www.xixiwetland.com.cn/", color: "#ec4899" },
          { name: "运河水上巴士", desc: "拱宸桥·武林门", url: "https://www.hzcjtz.com/", color: "#3b82f6" }
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
          { name: "医院挂号", desc: "杭州三级医院目录", action: "hospital" },
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
          { name: "消费券申领", desc: "支付宝/浙里办领券", detail: "<p><strong>杭州消费券申领</strong></p><p>渠道：支付宝搜索「消费券」、浙里办、云闪付</p><p>通常为满减形式，限指定商户使用，发放时间不固定</p>", color: "#ef4444" },
          { name: "政府补贴", desc: "人才/就业/住房补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "发票抽奖", desc: "支付宝/云闪付搜索消费有奖", color: "#10b981" },
          { name: "人才驿站", desc: "来杭求职免费住7天", url: "https://www.hzrc.com/", color: "#3b82f6" },
          { name: "毕业生补贴", desc: "应届生生活补贴申请", url: "https://hrss.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "租房补贴", desc: "新就业大学生租房补贴", url: "https://fgj.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "灵隐寺预约", desc: "免费预约入园", url: "https://www.lingyinsi.com/", color: "#06b6d4" },
          { name: "西湖游船", desc: "手划船/自开船票价", url: "https://westlake.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "公园年卡", desc: "杭州公园年卡办理", url: "https://www.96225.com/", color: "#84cc16" },
          { name: "市民卡优惠", desc: "公共交通/景区优惠", url: "https://www.96225.com/", color: "#f97316" },
          { name: "工会福利", desc: "职工医疗互助/疗休养", url: "https://ghzy.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "银龄人才", desc: "退休专家补贴政策", url: "https://hrss.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "创业扶持", desc: "大学生创业资助申报", url: "https://hrss.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "技能补贴", desc: "职业技能提升补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#eab308" },
          { name: "新能源补贴", desc: "新能源汽车购置补贴", url: "https://fgj.hangzhou.gov.cn/", color: "#06b6d4" },
          { name: "家电以旧换新", desc: "支付宝/浙里办申请补贴", detail: "<p><strong>家电以旧换新补贴</strong></p><p>申请渠道：支付宝、浙里办搜索「以旧换新」</p><p>补贴品类：冰箱、洗衣机、空调、电视、油烟机等</p><p>补贴金额：按新家电价格的15-20%，有上限</p>", color: "#f43f5e" },
          { name: "体育消费券", desc: "健身/游泳/羽毛球", url: "http://ty.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "文化惠民", desc: "剧院/图书馆优惠券", url: "https://wgly.hangzhou.gov.cn/", color: "#14b8a6" },
          { name: "夜校课程", desc: "成人兴趣班优惠报名", url: "https://hrss.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "免费培训", desc: "政府补贴职业技能培训", url: "", detail: "<p><strong>政府补贴职业技能培训</strong></p><p>杭州市政府提供免费/补贴职业技能培训，包括：</p><p>• 家政服务、育婴师、养老护理</p><p>• 电商运营、直播带货</p><p>• 电工、焊工等技能证书</p><p>申请渠道：浙里办搜索「职业培训」、杭州市人社局官网</p>", color: "#f59e0b" }
        ]
      },
      {
        id: "education", name: "教育培训", icon: "🎓",
        items: [
          { name: "幼儿园入园", desc: "报名时间/材料/流程", url: "https://edu.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "小学入学", desc: "小学报名/学区划分", url: "https://edu.hangzhou.gov.cn/", color: "#8b5cf6" },
          { name: "初中入学", desc: "小升初/电脑派位", url: "https://edu.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "杭州中考", desc: "报名/考试/录取查询", url: "https://edu.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "浙江高考", desc: "报名/志愿/录取查询", url: "https://www.zjzs.net/", color: "#10b981" },
          { name: "研究生考试", desc: "报名/考点/成绩查询", url: "https://www.chsi.com.cn/", color: "#f59e0b" },
          { name: "自学考试", desc: "浙江自考报名/成绩", url: "https://www.zjzs.net/", color: "#06b6d4" },
          { name: "教师资格证", desc: "笔试/面试/认定", url: "https://ntce.neea.edu.cn/", color: "#14b8a6" },
          { name: "普通话测试", desc: "报名/成绩查询", url: "https://www.cltt.org/", color: "#84cc16" },
          { name: "学区房查询", desc: "各区小学/初中对口", url: "https://edu.hangzhou.gov.cn/", color: "#f97316" },
          { name: "学校名单", desc: "幼儿园至高校名单", url: "https://edu.hangzhou.gov.cn/", color: "#a855f7" },
          { name: "培训机构", desc: "合规培训机构白名单", url: "https://edu.hangzhou.gov.cn/", color: "#0ea5e9" },
          { name: "免费技能培训", desc: "政府补贴培训项目", url: "https://hrss.hangzhou.gov.cn/", color: "#22c55e" },
          { name: "夜校课程", desc: "成人教育/兴趣班", url: "https://hrss.hangzhou.gov.cn/", color: "#eab308" },
          { name: "学历认证", desc: "学信网验证报告", url: "https://www.chsi.com.cn/", color: "#3b82f6" },
          { name: "海外学历认证", desc: "留学回国学历认证", url: "https://zwfw.cscse.edu.cn/", color: "#8b5cf6" },
          { name: "浙江大学", desc: "985/211·紫金港", url: "https://www.zju.edu.cn/", color: "#0ea5e9" },
          { name: "中国美术学院", desc: "南山/象山校区", url: "https://www.caa.edu.cn/", color: "#22c55e" },
          { name: "浙江音乐学院", desc: "转塘·音乐艺术", url: "https://www.zjcm.edu.cn/", color: "#eab308" },
          { name: "杭州电子科技大学", desc: "IT特色高校", url: "https://www.hdu.edu.cn/", color: "#3b82f6" },
          { name: "浙江工业大学", desc: "屏峰/朝晖校区", url: "https://www.zjut.edu.cn/", color: "#8b5cf6" },
          { name: "杭州师范大学", desc: "仓前校区", url: "https://www.hznu.edu.cn/", color: "#ec4899" },
          { name: "浙江工商大学", desc: "下沙校区", url: "https://www.zjsu.edu.cn/", color: "#f97316" },
          { name: "中国计量大学", desc: "质检特色高校", url: "https://www.cjlu.edu.cn/", color: "#10b981" },
          { name: "浙江理工大学", desc: "下沙校区", url: "https://www.zstu.edu.cn/", color: "#ef4444" },
          { name: "杭州高级中学", desc: "百年名校", detail: "<p><strong>杭州高级中学</strong></p><p>创办于1899年，浙江省一级重点中学，百年名校。</p><p>• 知名校友：鲁迅、朱自清、徐志摩等</p><p>• 校区：贡院校区、钱江校区</p><p>• 高考成绩稳居杭州前列</p>", color: "#a855f7" },
          { name: "学军中学", desc: "杭城名校", detail: "<p><strong>学军中学</strong></p><p>浙江省一级重点中学，杭城名校。</p><p>• 校区：西溪校区、紫金港校区、海创园学校</p><p>• 以竞赛成绩优异著称</p><p>• 清北录取率在浙江省名列前茅</p>", color: "#14b8a6" },
          { name: "文澜阁", desc: "四库全书藏书阁", detail: "<p><strong>文澜阁</strong></p><p>位于孤山，是清代七大藏书阁之一，珍藏《四库全书》。</p><p>• 江南三阁中唯一幸存的藏书阁</p><p>• 现属浙江省博物馆</p><p>• 可免费参观</p>", color: "#84cc16" },
          { name: "万松书院", desc: "梁祝读书处", detail: "<p><strong>万松书院</strong></p><p>位于凤凰山万松岭，始建于明弘治十一年（1498年）。</p><p>• 传说中梁山伯与祝英台同窗共读的地方</p><p>• 明清时期杭州著名书院</p><p>• 现为文化展示和旅游景点</p>", color: "#06b6d4" }
        ]
      },
      {
        id: "zhaopin", name: "人才招聘", icon: "💼",
        items: [
          { name: "事业单位招聘", desc: "编制内岗位/公告", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "国企招聘", desc: "杭州国企岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#ef4444" },
          { name: "公务员省考", desc: "浙江省考公告", url: "", detail: "<p><strong>浙江省公务员考试</strong></p><p><strong>时间</strong>：通常每年11-12月发布公告，12月或次年1月笔试</p><p><strong>报考条件</strong>：18-35周岁，大专及以上学历</p><p style=\"margin-top:8px;\"><strong>报名入口</strong>：浙江省公务员考试录用网（gwy.zjks.gov.cn）</p><p><strong>考试科目</strong>：《行测》《申论》</p><p style=\"color:var(--text-muted);font-size:13px;\">关注「浙江组织工作」「浙江人事考试」公众号获取最新公告</p>", color: "#10b981" },
          { name: "国家公务员", desc: "国考报名/录用", url: "http://www.scs.gov.cn/", color: "#8b5cf6" },
          { name: "杭州名企", desc: "上市公司/头部企业", url: "https://www.lagou.com/hangzhou/", color: "#f59e0b" },
          { name: "校园招聘", desc: "秋招/春招信息", url: "https://www.zhaopin.com/", color: "#06b6d4" },
          { name: "残疾人就业", desc: "残疾人专属岗位", url: "https://hrss.hangzhou.gov.cn/", color: "#ec4899" },
          { name: "退役军人就业", desc: "军转干部安置", url: "https://www.hangzhou.gov.cn/col/col1229836157/index.html", color: "#14b8a6" },
          { name: "灵活就业", desc: "兼职/自由职业", url: "https://www.zhaopin.com/", color: "#84cc16" },
          { name: "AI/互联网", desc: "技术岗位招聘", url: "https://www.lagou.com/hangzhou/", color: "#f97316" },
          { name: "实习岗位", desc: "大学生实习信息", url: "https://www.zhaopin.com/", color: "#a855f7" },
          { name: "外籍人才", desc: "外国人就业许可", url: "https://www.hzrc.com/", color: "#0ea5e9" },
          { name: "博士后工作站", desc: "高层次人才进站", url: "https://www.hzrc.com/", color: "#22c55e" },
          { name: "人才认定", desc: "高层次人才分类认定", url: "https://hrss.hangzhou.gov.cn/", color: "#eab308" },
          { name: "求职补贴", desc: "就业困难补贴", url: "https://hrss.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "招聘会信息", desc: "线下招聘会排期", url: "https://hrss.hangzhou.gov.cn/", color: "#ef4444" }
        ]
      },
      {
        id: "food", name: "杭帮菜谱", icon: "🍜",
        items: [
          { name: "西湖醋鱼", desc: "楼外楼首创名菜", detail: "<p><strong>西湖醋鱼</strong></p><p>杭州传统名菜，楼外楼首创。选用西湖草鱼，饿养去腥，现杀现烹。</p><p><strong>特点</strong>：鱼肉鲜嫩，酸甜可口，带有蟹味</p><p><strong>推荐餐厅</strong>：楼外楼（孤山路）、知味观</p>", color: "#ef4444" },
          { name: "龙井虾仁", desc: "茶香四溢名菜", detail: "<p><strong>龙井虾仁</strong></p><p>以西湖龙井茶和新鲜河虾仁炒制，茶香与虾鲜完美融合。</p><p><strong>特点</strong>：色泽淡雅，虾仁鲜嫩，茶香四溢</p><p><strong>推荐餐厅</strong>：楼外楼、知味观味庄</p>", color: "#10b981" },
          { name: "东坡肉", desc: "苏东坡发明", detail: "<p><strong>东坡肉</strong></p><p>相传为苏东坡所创，用五花肉加黄酒、酱油慢炖而成。</p><p><strong>特点</strong>：色泽红亮，肥而不腻，入口即化</p><p><strong>推荐餐厅</strong>：楼外楼、杭州酒家</p>", color: "#f59e0b" },
          { name: "叫化鸡", desc: "荷叶香鸡", detail: "<p><strong>叫化鸡（荷叶包鸡）</strong></p><p>用荷叶包裹整鸡，外裹黄泥烤制，原汁原味。</p><p><strong>特点</strong>：鸡肉酥烂，荷香浓郁</p><p><strong>推荐餐厅</strong>：楼外楼</p>", color: "#8b5cf6" },
          { name: "宋嫂鱼羹", desc: "西湖名菜", detail: "<p><strong>宋嫂鱼羹</strong></p><p>南宋名菜，以鲈鱼或鳜鱼制作，形似蟹羹。</p><p><strong>特点</strong>：鲜嫩滑润，酸辣开胃</p><p><strong>推荐餐厅</strong>：楼外楼、知味观</p>", color: "#06b6d4" },
          { name: "干炸响铃", desc: "腐皮酥脆名点", detail: "<p><strong>干炸响铃</strong></p><p>用豆腐皮包裹肉馅炸制，酥脆有声。</p><p><strong>特点</strong>：外酥里嫩，鲜香可口</p><p><strong>推荐餐厅</strong>：知味观</p>", color: "#f97316" },
          { name: "西湖莼菜", desc: "滑嫩爽口", detail: "<p><strong>西湖莼菜汤</strong></p><p>西湖特产莼菜，配以火腿丝、鸡丝制成清汤。</p><p><strong>特点</strong>：莼菜滑嫩，汤清味鲜</p><p style=\"color:var(--text-muted);font-size:13px;\">莼菜是水生植物，富含胶质，营养价值高</p>", color: "#14b8a6" },
          { name: "片儿川", desc: "杭州特色面", detail: "<p><strong>片儿川</strong></p><p>杭州特色面食，以雪菜、笋片、肉片为浇头。</p><p><strong>特点</strong>：汤鲜面爽，浇头丰富</p><p><strong>推荐面馆</strong>：奎元馆（解放路）、知味观</p>", color: "#ec4899" },
          { name: "虾爆鳝面", desc: "奎元馆招牌", detail: "<p><strong>虾爆鳝面</strong></p><p>奎元馆招牌面，以虾仁、鳝鱼为浇头。</p><p><strong>特点</strong>：鳝片香脆，虾仁鲜嫩，面条入味</p><p><strong>推荐面馆</strong>：奎元馆（解放路总店）</p>", color: "#3b82f6" },
          { name: "知味观小笼", desc: "鲜肉汤包", detail: "<p><strong>知味观小笼包</strong></p><p>皮薄馅大，汤汁丰富，是杭州小笼包的代表。</p><p><strong>特点</strong>：皮薄如纸，汤汁鲜美</p><p><strong>推荐餐厅</strong>：知味观总店（仁和路）</p>", color: "#84cc16" },
          { name: "吴山酥油饼", desc: "千年历史名点", detail: "<p><strong>吴山酥油饼</strong></p><p>有千年历史的杭州传统名点。</p><p><strong>特点</strong>：层叠酥脆，香甜可口</p><p><strong>推荐</strong>：河坊街、吴山广场周边</p>", color: "#a855f7" },
          { name: "葱包烩", desc: "杭州街头小吃", color: "#0ea5e9" },
          { name: "定胜糕", desc: "岳王庙特色", detail: "<p><strong>定胜糕</strong></p><p>粉色米糕，岳王庙特色，寓意胜利。</p><p><strong>特点</strong>：松软香甜，豆沙馅心</p><p><strong>推荐</strong>：岳王庙周边、河坊街</p>", color: "#ef4444" },
          { name: "猫耳朵", desc: "知味观名点", detail: "<p><strong>猫耳朵</strong></p><p>知味观名点，面疙瘩形似猫耳。</p><p><strong>特点</strong>：筋道爽滑，汤鲜料足</p><p><strong>推荐餐厅</strong>：知味观</p>", color: "#22c55e" },
          { name: "幸福双", desc: "豆沙糯米点心", detail: "<p><strong>幸福双</strong></p><p>豆沙糯米点心，甜而不腻。</p><p><strong>推荐餐厅</strong>：知味观</p>", color: "#eab308" },
          { name: "小鸡酥", desc: "酥皮甜点", detail: "<p><strong>小鸡酥</strong></p><p>酥皮甜点，造型可爱。</p><p><strong>推荐餐厅</strong>：知味观</p>", color: "#f59e0b" },
          { name: "木莲芯", desc: "清凉甜品", detail: "<p><strong>木莲芯（木莲豆腐）</strong></p><p>清凉甜品，用木莲籽制作，类似凉粉。</p><p><strong>特点</strong>：爽滑清凉，消暑佳品</p><p><strong>推荐</strong>：河坊街、夏季街头</p>", color: "#ec4899" },
          { name: "杭州酱鸭", desc: "冬季传统美食", detail: "<p><strong>杭州酱鸭</strong></p><p>冬季传统美食，用酱油、香料腌制风干。</p><p><strong>特点</strong>：咸鲜入味，肉质紧实</p><p><strong>推荐</strong>：万隆酱鸭（老字号）</p>", color: "#8b5cf6" },
          { name: "杭州酒家", desc: "1921年始创·传统杭帮菜", detail: "<p><strong>杭州酒家</strong></p><p>始创于1921年，传统杭帮菜名店。</p><p>• 招牌菜：东坡肉、西湖醋鱼、龙井虾仁</p><p>• 地址：延安路</p><p>• 人均：100-150元</p>", color: "#f97316" },
          { name: "知味观味庄", desc: "杨公堤·新杭帮菜", detail: "<p><strong>知味观味庄</strong></p><p>知味观旗下高端店，位于杨公堤。</p><p>• 新杭帮菜，环境优美（临西湖）</p><p>• 招牌菜：西湖醋鱼、龙井虾仁、叫化鸡</p><p>• 人均：200-300元</p>", color: "#06b6d4" }
        ]
      },
      {
        id: "laozihao", name: "杭州老字号", icon: "🏮",
        items: [
          // ===== 医药类 =====
          { name: "胡庆余堂", desc: "国药号·1874年胡雪岩创·河坊街", url: "https://www.hqyt.com/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">胡庆余堂由晚清红顶商人胡雪岩于 1874 年创办，与北京同仁堂并称「北同仁、南庆余」，是江南药王。被誉为「中国第一药堂」，国家二级博物馆。</p><div class=\"guide-block\"><h4>🏛️ 镇店三宝</h4><p>• <strong>「戒欺」匾</strong>：胡雪岩亲书「戒欺」二字挂于营业厅后堂，告诫店员「药业关系性命，尤为万不可欺」<br>• <strong>大香炉</strong>：进门青石大香炉，旧时煎药用<br>• <strong>百余年老建筑</strong>：清末徽派建筑，雕梁画栋</p></div><div class=\"guide-block\"><h4>💊 招牌产品</h4><p>• <strong>安宫牛黄丸</strong>：急救圣药，千元/丸<br>• <strong>大活络丹</strong>：中风偏瘫<br>• <strong>紫雪丹</strong>：小儿高热<br>• <strong>人参再造丸</strong>：风湿骨痛</p></div><div class=\"guide-block\"><h4>📍 体验</h4><p>• <strong>胡庆余堂中药博物馆</strong>：河坊街大井巷 95 号<br>• <strong>国药号总店</strong>：河坊街<br>• <strong>名医坐诊</strong>：可预约老中医<br>• 免费参观，营业 8:00-17:30</p><p style=\"margin-top:6px;\"><a href=\"https://www.hqyt.com/\" target=\"_blank\" rel=\"noopener\">官网 →</a></p></div>", color: "#ef4444" },
          { name: "方回春堂", desc: "国药号·1649年创·河坊街", url: "https://www.fhcmed.com/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">方回春堂始创于清顺治六年（1649 年），由钱塘名医方清怡创办，比胡庆余堂早 225 年，是杭州现存最古老的国药号之一。2001 年重建于河坊街，重振百年老号。</p><div class=\"guide-block\"><h4>🏮 河坊街总店</h4><p>• <strong>建筑</strong>：江南传统药号样式，四进四合院<br>• <strong>参茸厅</strong>：长白山野山参、高丽参、鹿茸<br>• <strong>膏方厅</strong>：秋冬熬膏方，预约火爆<br>• <strong>名医馆</strong>：国家级/省级名老中医坐诊</p></div><div class=\"guide-block\"><h4>💊 招牌</h4><p>• <strong>阿胶膏</strong>：秋冬滋补爆款<br>• <strong>驴皮膏</strong>：补血<br>• <strong>十全大补膏</strong>：气血双补<br>• <strong>熬膏季</strong>：每年立冬后开启</p></div><div class=\"guide-block\"><h4>📍 体验</h4><p>• <strong>河坊街总店</strong>：上城区河坊街 117 号<br>• 营业 8:00-17:30，节假日不打烊<br>• 名医号需提前 1 周预约<br>• 免费参观、可拍照</p><p style=\"margin-top:6px;\"><a href=\"https://www.fhcmed.com/\" target=\"_blank\" rel=\"noopener\">官网 →</a></p></div>", color: "#dc2626" },
          { name: "朱养心", desc: "药油始祖·1628年创·民康药业", url: "https://www.minkang.com/", color: "#b91c1c" },
          { name: "桐君堂", desc: "中华老字号·桐庐·中医药", url: "https://www.tongjutang.com/", color: "#991b1b" },
          { name: "广升誉", desc: "杭州老字号·上城·医药", url: "", detail: "<p><strong>广升誉</strong></p><p>第四批杭州老字号，上城区中医药品牌。</p><p>• 主营：中药饮片、中成药</p><p>• 地址：上城区</p>", color: "#7f1d1d" },
          { name: "钱爱仁堂", desc: "杭州老字号·余杭·国药馆", url: "", detail: "<p><strong>钱爱仁堂</strong></p><p>余杭老字号国药馆，第四批杭州老字号。</p><p>• 主营：传统中药、参茸</p><p>• 地址：余杭区</p>", color: "#a855f7" },
          // ===== 餐饮食品类 =====
          { name: "知味观", desc: "百年老店·1913年创·东坡路", url: "https://www.zwgfood.com/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">知味观始建于 1913 年，由孙翼斋先生创办，店名取自「知味停车，闻香下马」。是杭州家喻户晓的杭帮菜老字号，本地人从小吃到大，无论是早茶、点心、团圆饭都少不了它。</p><div class=\"guide-block\"><h4>🥟 招牌必点</h4><p>• <strong>知味小笼</strong>：蟹粉/虾仁/鲜肉三种，18-32 元/笼<br>• <strong>猫耳朵</strong>：杭州特色面食，汤鲜<br>• <strong>幸福双</strong>：双拼甜点<br>• <strong>酒酿丸子</strong>：早茶必点<br>• <strong>糯米烧麦</strong>：地道早点</p></div><div class=\"guide-block\"><h4>🏠 三种店型</h4><p>• <strong>总店（湖滨/东坡路）</strong>：正餐杭帮菜，200+ 人均<br>• <strong>味雅轩</strong>：商务宴请，300+ 人均<br>• <strong>知味小吃店</strong>：早茶点心，30-50 人均</p></div><div class=\"guide-block\"><h4>📍 体验</h4><p>• <strong>总店</strong>：上城区仁和路 83 号（近湖滨银泰）<br>• <strong>外卖窗口</strong>：可买现做小笼、糕点带回家<br>• <strong>真空包装</strong>：方便送人，机场/高铁站也有售<br>• 早茶 6:30 开始，正餐 11:00-21:00</p><p style=\"margin-top:6px;\"><a href=\"https://www.zwgfood.com/\" target=\"_blank\" rel=\"noopener\">官网 →</a></p></div>", color: "#8b5cf6" },
          { name: "楼外楼", desc: "杭帮菜泰斗·1848年创·孤山", url: "https://www.louwailou.com.cn/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">楼外楼始创于清道光二十八年（1848 年），坐落于西湖孤山脚下，是杭帮菜的泰斗级名店。鲁迅、郁达夫、蒋介石、周恩来等都曾在此宴客。西湖醋鱼、叫化童鸡等名菜皆出于此。</p><div class=\"guide-block\"><h4>🐟 招牌必尝</h4><p>• <strong>西湖醋鱼</strong>：镇店之宝，用草鱼/鳜鱼，糖醋味，98-198 元<br>• <strong>叫化童鸡</strong>：荷叶裹泥烤制，280 元/只<br>• <strong>东坡肉</strong>：肥而不腻，68 元/盅<br>• <strong>龙井虾仁</strong>：清明前后最鲜，168 元<br>• <strong>宋嫂鱼羹</strong>：南宋名菜，58 元</p></div><div class=\"guide-block\"><h4>🌅 三楼观湖位</h4><p>• 一楼大厅：大众消费，人均 200<br>• 二楼包厢：商务宴请，人均 400+<br>• <strong>三楼观湖位</strong>：直面西湖，需提前 1 周预订，人均 600+</p></div><div class=\"guide-block\"><h4>📍 体验</h4><p>• <strong>孤山总店</strong>：孤山路 30 号（近西泠印社）<br>• 营业 11:00-21:00<br>• 节假日排队 1-2 小时，强烈建议预订<br>• 另有分店：满觉陇、城站等</p><p style=\"margin-top:6px;\"><a href=\"https://www.louwailou.com.cn/\" target=\"_blank\" rel=\"noopener\">官网预订 →</a></p></div>", color: "#ec4899" },
          { name: "奎元馆", desc: "片儿川始祖·1867年创·解放路", url: "", detail: "<p><strong>奎元馆</strong></p><p>始创于1867年，片儿川始祖，江南面王。</p><p>• 招牌面：片儿川、虾爆鳝面</p><p>• 地址：解放路154号</p><p>• 人均：30-60元</p>", color: "#06b6d4" },
          { name: "天香楼", desc: "正宗杭帮菜·1927年创", url: "https://www.tianxianglou.com/", color: "#14b8a6" },
          { name: "山外山", desc: "杭帮菜名店·1903年创·植物园", url: "https://www.shanwaishan.com/", color: "#84cc16" },
          { name: "新丰小吃", desc: "杭州老字号·新丰品牌·小吃连锁", url: "", detail: "<p><strong>新丰小吃</strong></p><p>第四批杭州老字号，杭州人从小吃到大的小吃品牌。</p><p>• 招牌：虾肉小笼、牛肉粉丝、新丰鸭肉</p><p>• 地址：全城连锁</p><p>• 人均：20-40元</p>", color: "#f59e0b" },
          { name: "五味和", desc: "百年糕点·1908年创·传统糕点", url: "", detail: "<p><strong>五味和</strong></p><p>始创于1908年，百年糕点品牌。</p><p>• 招牌产品：桂花糕、绿豆糕、月饼、定胜糕</p><p>• 地址：河坊街</p>", color: "#f97316" },
          { name: "采芝斋", desc: "百年糕点·1928年创·传统糕饼", url: "", detail: "<p><strong>采芝斋</strong></p><p>始创于1928年，杭州传统糕饼老字号。</p><p>• 招牌产品：月饼、粽子糖、椒盐核桃</p><p>• 地址：延安路</p>", color: "#eab308" },
          { name: "九芝斋", desc: "百年糕点·1928年创·糕饼老字号", url: "", detail: "<p><strong>九芝斋</strong></p><p>始创于1928年，与采芝斋齐名的杭州糕饼老字号。</p><p>• 招牌：麻酥糖、椒盐桃片、桂花糕</p><p>• 地址：延安路</p>", color: "#fbbf24" },
          { name: "景阳观", desc: "百年酱菜·1907年创·河坊街", url: "", detail: "<p><strong>景阳观</strong></p><p>始创于1907年，杭州酱菜老字号。</p><p>• 招牌：虾油皇姜芽、虾油黄瓜、酱萝卜</p><p>• 地址：河坊街</p><p>• 特色：杭式酱菜，下饭一绝</p>", color: "#d97706" },
          // ===== 绸扇刀剪工艺类 =====
          { name: "王星记", desc: "丝绸扇·1875年创·扇子博物馆", url: "https://www.wangxingji.com/", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">王星记扇庄始创于清光绪元年（1875 年），由王星斋创办，与杭州张小泉剪刀、都锦生丝绸并称「杭产三绝」。是中国唯一的扇子博物馆所在地，国家非物质文化遗产。</p><div class=\"guide-block\"><h4>🌿 镇店之宝</h4><p>• <strong>黑纸扇</strong>：百年招牌，棕竹扇骨、桑皮纸面、手工泥金，可保藏 30 年不蛀<br>• <strong>白纸扇</strong>：水墨名家手绘，雅致<br>• <strong>檀香扇</strong>：拉花/烫花工艺，香气持久数十年<br>• <strong>绢扇/团扇</strong>：丝绸面料，绣花</p></div><div class=\"guide-block\"><h4>🎨 工艺亮点</h4><p>• <strong>九十九道工序</strong>：从选竹到成扇近 100 道手工<br>• <strong>泥金/泥银</strong>：千年传承的贴金工艺<br>• <strong>名医题字</strong>：吴昌硕、刘海粟等大家曾题字作画</p></div><div class=\"guide-block\"><h4>📍 体验</h4><p>• <strong>王星记扇博物馆</strong>：下城区长板巷 39 号<br>• <strong>河坊街专卖店</strong>：上城区河坊街 108 号<br>• 价格区间：普通 50-200 元，精品 500+ 元，收藏级上千<br>• 推荐伴手礼：檀香扇、黑纸扇</p><p style=\"margin-top:6px;\"><a href=\"https://www.wangxingji.com/\" target=\"_blank\" rel=\"noopener\">官网 →</a></p></div>", color: "#f59e0b" },
          { name: "张小泉", desc: "百年名刀·1663年创·刀剪博物馆", url: "https://www.zhangxiaoquan.cn/", color: "#10b981" },
          { name: "都锦生", desc: "织锦之王·1922年创·茅家埠", url: "", detail: "<p><strong>都锦生</strong></p><p>中国织锦之王，始创于1922年。</p><p>• 主营：丝绸织锦、丝织品</p><p>• 特色产品：西湖风景织锦、丝绸服饰</p><p>• 地址：茅家埠（都锦生织锦博物馆）</p><p>• 门店：河坊街等</p>", color: "#3b82f6" },
          { name: "万事利", desc: "国礼丝绸·1975年创·丝绸品牌", url: "https://www.wensli.com/", color: "#eab308" },
          { name: "喜得宝", desc: "中华老字号·丝绸品牌", url: "https://www.hzxlchina.com/", color: "#0284c7" },
          { name: "孔凤春", desc: "百年化妆品·1862年创·河坊街", url: "https://www.kfengchun.com/", color: "#0ea5e9" },
          { name: "天堂伞", desc: "杭州老字号·天堂伞业", url: "https://www.tian-tang.com/", color: "#0284c7" },
          { name: "龙泉青瓷", desc: "国家级非遗·哥窑弟窑", url: "", detail: "<p><strong>龙泉青瓷</strong></p><p>国家级非物质文化遗产，浙江龙泉特产。</p><p>• 特点：青如玉、明如镜、薄如纸、声如磬</p><p>• 工艺：哥窑（开片）、弟窑（无开片）</p><p>• 杭州可在河坊街、各大商场购买</p>", color: "#22c55e" },
          // ===== 茶酒类 =====
          { name: "狮峰牌", desc: "中华老字号·西湖龙井·浙江省茶叶集团", url: "https://www.zjtea.com/", color: "#16a34a" },
          { name: "贡牌", desc: "西湖龙井·杭州西湖龙井茶叶", url: "http://www.hzxhjl.com/", color: "#15803d" },
          { name: "艺福堂", desc: "杭州老字号·滨江·新式茶", url: "https://www.efuton.com/", color: "#22c55e" },
          { name: "蓝桥风月", desc: "杭州老字号·宋酒·古法酿造", url: "", detail: "<p><strong>蓝桥风月</strong></p><p>第四批杭州老字号，杭州宋酒品牌。</p><p>• 主营：古法酿造黄酒、宋酒</p><p>• 特色：传承宋代酿酒工艺</p>", color: "#a16207" },
          // ===== 文化用品类 =====
          { name: "邵芝岩", desc: "百年毛笔·1865年创·中山路", url: "https://www.shaozhiyan.com/", color: "#a855f7" },
          { name: "西泠印社", desc: "金石篆刻·1904年创·孤山路", url: "https://www.xlysa.com/", color: "#f97316" }
        ]
      },
      {
        id: "celebrity", name: "杭州名人", icon: "👤",
        items: [
          { name: "林徽因", desc: "建筑师的江南情怀", detail: "<p><strong>林徽因（1904-1955）</strong></p><p>中国著名建筑师、作家，人民英雄纪念碑和中华人民共和国国徽深化方案的设计者之一。</p><p>• 与丈夫梁思成共同研究中国古代建筑</p><p>• 文学作品：《你是人间的四月天》</p><p>• 与杭州的渊源：祖籍杭州，祖父林孝恂为杭州人</p>", color: "#ef4444" },
          { name: "胡雪岩", desc: "红顶商人·元宝街", url: "https://credit.hangzhou.gov.cn/", color: "#f59e0b" },
          { name: "白居易", desc: "杭州刺史·西湖诗人", detail: "<p><strong>白居易（772-846）</strong></p><p>唐代诗人，曾任杭州刺史。</p><p>• 在杭州期间疏浚西湖、筑堤（白堤）</p><p>• 诗句「最爱湖东行不足，绿杨阴里白沙堤」</p><p>• 与杭州的渊源：白堤以其命名</p>", color: "#10b981" },
          { name: "苏东坡", desc: "西湖筑堤·文豪", detail: "<p><strong>苏轼（1037-1101）</strong></p><p>北宋文豪，曾任杭州知州（两次）。</p><p>• 疏浚西湖，筑苏堤</p><p>• 发明东坡肉</p><p>• 诗句「欲把西湖比西子，淡妆浓抹总相宜」</p><p>• 与杭州的渊源：苏堤以其命名</p>", color: "#3b82f6" },
          { name: "岳飞", desc: "精忠报国·岳王庙", detail: "<p><strong>岳飞（1103-1142）</strong></p><p>南宋抗金名将，精忠报国。</p><p>• 被秦桧害死于杭州风波亭</p><p>• 岳王庙位于栖霞岭南麓</p><p>• 墓前有秦桧等四人跪像</p>", color: "#8b5cf6" },
          { name: "李清照", desc: "宋词才女", detail: "<p><strong>李清照（1084-约1155）</strong></p><p>宋代婉约词派代表，有「千古第一才女」之称。</p><p>• 晚年漂泊至杭州</p><p>• 词作：《声声慢》《如梦令》《醉花阴》</p>", color: "#ec4899" },
          { name: "陆游", desc: "爱国诗人", detail: "<p><strong>陆游（1125-1210）</strong></p><p>南宋爱国诗人。</p><p>• 曾在杭州任职</p><p>• 诗作近万首</p><p>• 名句「王师北定中原日，家祭无忘告乃翁」</p>", color: "#06b6d4" },
          { name: "于谦", desc: "明代名臣·清河坊", detail: "<p><strong>于谦（1398-1457）</strong></p><p>明代名臣，民族英雄。</p><p>• 北京保卫战击退瓦剌</p><p>• 故居位于清河坊祠堂巷</p><p>• 祠墓位于西湖三台山</p><p>• 名句「粉骨碎身浑不怕，要留清白在人间」</p>", color: "#14b8a6" },
          { name: "郁达夫", desc: "文学巨匠·大学路", detail: "<p><strong>郁达夫（1896-1945）</strong></p><p>现代文学巨匠，创造社发起人之一。</p><p>• 故居位于大学路场官弄</p><p>• 作品：《沉沦》《春风沉醉的晚上》</p>", color: "#84cc16" },
          { name: "章太炎", desc: "国学大师·余杭塘栖", detail: "<p><strong>章太炎（1869-1936）</strong></p><p>国学大师、民主革命家。</p><p>• 故居位于余杭仓前</p><p>• 纪念馆位于西湖南屏山</p>", color: "#f97316" },
          { name: "马一浮", desc: "国学传奇", detail: "<p><strong>马一浮（1883-1967）</strong></p><p>国学大师，现代新儒家代表人物。</p><p>• 被誉为「千年国粹，一代儒宗」</p><p>• 与梁漱溟、熊十力并称「现代新儒家三圣」</p>", color: "#a855f7" },
          { name: "李叔同", desc: "弘一法师·虎跑", detail: "<p><strong>李叔同（1880-1942）</strong></p><p>即弘一法师，中国近代文化名人。</p><p>• 出家前：音乐家、美术家、戏剧家</p><p>• 创办中国第一个话剧团体「春柳社」</p><p>• 出家地：杭州虎跑寺</p><p>• 代表作：《送别》「长亭外，古道边」</p>", color: "#0ea5e9" },
          { name: "史量才", desc: "报业大王", detail: "<p><strong>史量才（1880-1934）</strong></p><p>报业大王，《申报》总经理。</p><p>• 推动《申报》成为中国最有影响力的报纸之一</p><p>• 遇害于沪杭公路</p>", color: "#22c55e" },
          { name: "戴望舒", desc: "雨巷诗人", detail: "<p><strong>戴望舒（1905-1950）</strong></p><p>现代派诗人，「雨巷诗人」。</p><p>• 代表作：《雨巷》</p><p>• 与杭州的渊源：杭州人</p>", color: "#eab308" },
          { name: "黄宾虹", desc: "国画大师·栖霞岭", detail: "<p><strong>黄宾虹（1865-1955）</strong></p><p>国画大师，山水画一代宗师。</p><p>• 晚年定居杭州栖霞岭</p><p>• 山水画「黑、密、厚、重」独特风格</p><p>• 与齐白石并称「南黄北齐」</p>", color: "#ef4444" },
          { name: "潘天寿", desc: "美术教育家·南山路", detail: "<p><strong>潘天寿（1897-1971）</strong></p><p>美术教育家、国画大师。</p><p>• 曾任中国美术学院院长</p><p>• 擅长花鸟、山水</p><p>• 与吴昌硕、齐白石、黄宾虹并称20世纪「中国画四大家」</p>", color: "#3b82f6" }
        ]
      },
      {
        id: "history", name: "历史文化", icon: "🏯",
        items: [
          { name: "南宋皇城", desc: "南宋遗址公园", detail: "<p><strong>南宋皇城遗址</strong></p><p>南宋（1127-1279）定都临安（杭州），皇城位于凤凰山麓。</p><p>• 遗址公园位于上城区凤凰山脚路</p><p>• 南宋定都杭州152年，是当时世界最大城市</p><p>• 马可·波罗称杭州为「世界上最美丽华贵之天城」</p>", color: "#ef4444" },
          { name: "良渚古城", desc: "世界遗产·余杭", url: "https://www.lzmuseum.cn/", color: "#f59e0b" },
          { name: "京杭大运河", desc: "世界遗产·拱宸桥", url: "", detail: "<p><strong>京杭大运河（杭州段）</strong></p><p>世界文化遗产，全长1797公里，杭州是南端起点。</p><p><strong>杭州段主要景点</strong>：</p><p>• <strong>拱宸桥</strong>：运河最南端的标志性桥梁</p><p>• <strong>桥西历史街区</strong>：近代工业遗存</p><p>• <strong>小河直街</strong>：运河民居</p><p>• <strong>香积寺</strong>：运河唯一供奉的寺庙</p>", color: "#10b981" },
          { name: "西湖文化", desc: "世界遗产", url: "https://westlake.hangzhou.gov.cn/", color: "#3b82f6" },
          { name: "钱塘江", desc: "观潮胜地", url: "", detail: "<p><strong>钱塘江</strong></p><p>浙江第一大河，杭州的母亲河。</p><p>• 全长605公里，流经杭州注入东海</p><p>• 钱塘江大潮是世界三大涌潮之一</p><p>• 杭州因位于钱塘江北岸（古称「钱塘」）而得名</p>", color: "#8b5cf6" },
          { name: "吴越文化", desc: "钱王陵园·临安", detail: "<p><strong>吴越文化</strong></p><p>五代十国时期（907-978），钱镠建立吴越国，定都杭州。</p><p>• 钱王陵园位于临安区</p><p>• 吴越国历三代五王，共72年</p><p>• 钱镠「保境安民」，杭州成为江南繁华之地</p>", color: "#ec4899" },
          { name: "龙井茶文化", desc: "茶博馆·龙井路", url: "https://www.teamuseum.cn/", color: "#06b6d4" },
          { name: "丝绸文化", desc: "丝绸博物馆·玉皇山路", url: "https://www.chinasilkmuseum.com/", color: "#14b8a6" },
          { name: "运河文化", desc: "运河博物馆·拱墅", detail: "<p><strong>运河文化</strong></p><p>京杭大运河孕育了杭州独特的运河文化。</p><p>• 运河博物馆（拱宸桥畔）</p><p>• 手工艺活态馆</p><p>• 运河庙会、美食节</p><p>• 运河夜游（水上巴士）</p>", color: "#84cc16" },
          { name: "南宋官窑", desc: "南宋官窑博物馆", detail: "<p><strong>南宋官窑</strong></p><p>南宋时期专为宫廷烧制瓷器的官窑。</p><p>• 修内司官窑（凤凰山）</p><p>• 郊坛下官窑（乌龟山）</p><p>• 青瓷以粉青、月白釉色著称</p><p>• 南宋官窑博物馆（南复路）可参观</p>", color: "#f97316" },
          { name: "藏书文化", desc: "文澜阁·圣因寺遗址", detail: "<p><strong>藏书文化</strong></p><p>杭州素有藏书传统，最著名的是文澜阁。</p><p>• <strong>文澜阁</strong>：清代七大藏书阁之一，藏《四库全书》</p><p>• <strong>嘉业堂</strong>：南浔刘氏藏书楼（近代最大私人藏书楼）</p><p>• <strong>曝书亭</strong>：朱彝尊藏书处</p>", color: "#a855f7" },
          { name: "佛教文化", desc: "灵隐寺·法喜寺", url: "https://www.lingyinsi.com/", color: "#0ea5e9" },
          { name: "道教文化", desc: "抱朴道院·葛岭", detail: "<p><strong>道教文化</strong></p><p>杭州道教历史悠久，最著名的是抱朴道院。</p><p>• <strong>抱朴道院</strong>：位于葛岭，东晋葛洪炼丹处</p><p>• <strong>黄龙洞</strong>：道教圣地</p><p>• <strong>老玉皇宫</strong>：玉皇山</p>", color: "#22c55e" },
          { name: "清真寺文化", desc: "凤凰寺·中山中路", detail: "<p><strong>清真寺文化</strong></p><p>杭州凤凰寺是中国四大古清真寺之一。</p><p>• 凤凰寺位于中山中路</p><p>• 始建于唐代，元代重建</p><p>• 是杭州穆斯林文化的重要载体</p>", color: "#eab308" },
          { name: "金石篆刻", desc: "西泠印社·孤山", detail: "<p><strong>金石篆刻</strong></p><p>西泠印社是中国金石篆刻的重镇。</p><p>• 创立于1904年，社址在孤山</p><p>• 首任社长：吴昌硕</p><p>• 中国印学博物馆（孤山）</p>", color: "#ec4899" },
          { name: "木版水印", desc: "十竹斋·非遗技艺", detail: "<p><strong>木版水印</strong></p><p>中国传统版画技艺，杭州十竹斋是代表。</p><p>• 十竹斋始创于明代</p><p>• 国家级非物质文化遗产</p><p>• 以复刻书画名作为特色</p>", color: "#3b82f6" },
          { name: "白蛇传说", desc: "雷峰塔·断桥", detail: "<p><strong>白蛇传</strong></p><p>中国四大民间传说之一，故事发生在杭州。</p><p>• 断桥相遇</p><p>• 借伞定情</p><p>• 水漫金山</p><p>• 雷峰塔镇蛇</p><p>主要景点：断桥、雷峰塔、金山寺</p>", color: "#ef4444" },
          { name: "梁祝传说", desc: "万松书院·长桥", detail: "<p><strong>梁山伯与祝英台</strong></p><p>中国四大民间传说之一，相传在杭州万松书院同窗共读。</p><p>• 万松书院（凤凰山）</p><p>• 长桥送别（长桥公园）</p><p>• 草桥结拜</p>", color: "#8b5cf6" },
          { name: "苏白二公", desc: "苏东坡·白居易治杭", detail: "<p><strong>苏白二公</strong></p><p>苏东坡、白居易都曾任杭州地方官，为西湖治理做出巨大贡献。</p><p>• 白居易筑白堤</p><p>• 苏东坡筑苏堤</p><p>• 西湖至今保留「白堤」「苏堤」纪念二人</p>", color: "#10b981" },
          { name: "岳飞抗金", desc: "岳王庙·栖霞岭", detail: "<p><strong>岳飞抗金</strong></p><p>岳飞是南宋抗金名将，最终被害于杭州风波亭。</p><p>• 岳王庙（栖霞岭）</p><p>• 岳飞墓前有秦桧、王氏、万俟卨、张俊四人跪像</p><p>• 「青山有幸埋忠骨，白铁无辜铸佞臣」</p>", color: "#f59e0b" },
          { name: "钱王射潮", desc: "钱镠治水·吴越国", detail: "<p><strong>钱王射潮</strong></p><p>相传吴越王钱镠为治理钱塘江水患，曾射潮治水。</p><p>• 钱王祠位于西湖柳浪闻莺</p><p>• 体现了杭州人民与潮水搏斗的精神</p>", color: "#06b6d4" },
          { name: "浙派古琴", desc: "3000年历史·人类非遗", detail: "<p><strong>浙派古琴</strong></p><p>中国古琴艺术的重要流派，有3000年历史，人类非物质文化遗产。</p><p>• 浙派古琴以「清、微、淡、远」为美学追求</p><p>• 著名琴人：郭楚望、毛敏仲</p><p>• 杭州有浙派古琴传承</p>", color: "#8b5cf6" },
          { name: "印象西湖", desc: "张艺谋山水实景演出", url: "http://www.yinxiangxihup.com/", color: "#ec4899" },
          { name: "越剧", desc: "浙江小百花越剧团", detail: "<p><strong>越剧</strong></p><p>中国第二大剧种，发源于浙江嵊县，兴盛于上海，杭州是重要基地。</p><p>• 浙江小百花越剧团（杭州）</p><p>• 以唱为主，声音优美动听</p><p>• 代表作：《梁山伯与祝英台》《红楼梦》《西厢记》</p>", color: "#14b8a6" }
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
          { name: "梦想小镇", desc: "互联网创业·余杭", url: "", detail: "<p><strong>梦想小镇</strong></p><p>位于余杭区仓前，是互联网创业高地。</p><p>• 2014年启动，聚焦互联网创业</p><p>• 入驻创业团队数千家</p><p>• 配套：创业公寓、孵化器、天使投资</p>", color: "#722ed1" },
          { name: "云栖小镇", desc: "云计算产业园", url: "", detail: "<p><strong>云栖小镇</strong></p><p>位于西湖区转塘，是云计算产业园。</p><p>• 阿里云总部所在地</p><p>• 每年举办云栖大会</p><p>• 聚焦云计算、大数据、人工智能</p>", color: "#1677ff" }
        ]
      },
      {
        id: "street", name: "杭州街道", icon: "🛤️",
        items: [
          { name: "河坊街", desc: "老字号地图·上城区", detail: "<p><strong>河坊街</strong></p><p>上城区清河坊历史街区，杭州最知名的步行街。</p><p>• 老字号云集：胡庆余堂、方回春堂、张小泉、万隆</p><p>• 特色小吃：葱包桧、定胜糕、龙须糖</p><p>• 非遗体验：王星记扇子、朱炳仁铜雕</p>", color: "#ef4444" },
          { name: "南山路", desc: "文艺进化史·西湖区", detail: "<p><strong>南山路</strong></p><p>西湖区，沿西湖南岸，文艺气息浓厚。</p><p>• 中国美术学院</p><p>• 咖啡馆、画廊、酒吧</p><p>• 梧桐树掩映，适合漫步</p>", color: "#f59e0b" },
          { name: "延安路", desc: "百年变迁·下城区", detail: "<p><strong>延安路</strong></p><p>杭州南北主干道，商业繁华。</p><p>• 武林广场、银泰百货</p><p>• 杭州酒家、知味观</p><p>• 地铁1号线沿线</p>", color: "#10b981" },
          { name: "湖滨路", desc: "时光胶囊·上城区", detail: "<p><strong>湖滨路</strong></p><p>上城区，紧邻西湖东岸。</p><p>• 湖滨步行街</p><p>• 湖滨银泰in77</p><p>• 西湖音乐喷泉</p>", color: "#3b82f6" },
          { name: "孩儿巷", desc: "市井风华·下城区", detail: "<p><strong>孩儿巷</strong></p><p>下城区，市井生活气息浓厚。</p><p>• 陆游曾居于此</p><p>• 老杭州小吃集中</p>", color: "#8b5cf6" },
          { name: "马塍弄", desc: "市井哲学·西湖区", detail: "<p><strong>马塍路</strong></p><p>西湖区，南宋时为皇家花圃。</p><p>• 如今是市井生活街巷</p><p>• 美食小店众多</p>", color: "#ec4899" },
          { name: "仁和路", desc: "名流记忆·上城区", detail: "<p><strong>仁和路</strong></p><p>上城区，近湖滨商圈。</p><p>• 知味观总店所在地</p><p>• 老杭州记忆</p>", color: "#06b6d4" },
          { name: "惠民路", desc: "平民故事·上城区", detail: "<p><strong>惠民路</strong></p><p>上城区，老杭州市井生活代表。</p><p>• 农贸市场、小吃店</p><p>• 烟火气十足</p>", color: "#14b8a6" },
          { name: "武林广场", desc: "商业帝国·下城区", detail: "<p><strong>武林广场</strong></p><p>下城区，杭州传统商业中心。</p><p>• 银泰百货、杭州大厦</p><p>• 浙江展览馆</p><p>• 地铁1号线、3号线交汇</p>", color: "#84cc16" },
          { name: "庆春路", desc: "繁华演变·江干区", detail: "<p><strong>庆春路</strong></p><p>杭州东西主干道，金融街。</p><p>• 银行、证券机构集中</p><p>• 庆春银泰</p>", color: "#f97316" },
          { name: "文一路", desc: "高校文化带·西湖区", detail: "<p><strong>文一路</strong></p><p>西湖区，高校文化带。</p><p>• 杭州师范大学、浙江工商大学</p><p>• 学生美食街</p>", color: "#a855f7" },
          { name: "莫干山路", desc: "老工业记忆·拱墅区", detail: "<p><strong>莫干山路</strong></p><p>拱墅区，老工业记忆。</p><p>• 杭州发电厂旧址</p><p>• 工业遗存改造</p>", color: "#0ea5e9" },
          { name: "解放路", desc: "交通枢纽记忆", detail: "<p><strong>解放路</strong></p><p>杭州东西主干道，交通枢纽。</p><p>• 奎元馆（片儿川）</p><p>• 解百商厦</p><p>• 地铁1号线沿线</p>", color: "#22c55e" },
          { name: "钱江路", desc: "江岸新篇·CBD", detail: "<p><strong>钱江路</strong></p><p>江干区（现上城区），钱江新城CBD主干道。</p><p>• 杭州CBD核心</p><p>• 「日月同辉」（洲际酒店、杭州大剧院）</p><p>• 城市阳台</p>", color: "#eab308" },
          { name: "复兴路", desc: "历史回响·上城区", detail: "<p><strong>复兴路</strong></p><p>上城区，历史回响。</p><p>• 南宋皇城遗址附近</p><p>• 老城区改造</p>", color: "#ef4444" }
        ]
      },
      {
        id: "weekend", name: "周末休闲", icon: "🎉",
        items: [
          { name: "亲子一日游", desc: "6条经典路线", detail: "<p><strong>杭州亲子一日游6条路线</strong></p><p>① 西湖线：断桥→白堤→苏堤→花港观鱼</p><p>② 博物馆线：自然博物馆→科技馆→博物馆</p><p>③ 动物园线：杭州动物园→虎跑</p><p>④ 宋城线：宋城主题公园</p><p>⑤ 西溪湿地线：摇橹船→深潭口</p><p>⑥ 良渚线：良渚古城遗址→博物院</p>", color: "#ef4444" },
          { name: "免费景点", desc: "8处免费景点", detail: "<p><strong>杭州8处免费景点</strong></p><p>① 西湖（全开放）</p><p>② 河坊街/南宋御街</p><p>③ 京杭大运河（拱宸桥、桥西）</p><p>④ 中国丝绸博物馆</p><p>⑤ 浙江博物馆（孤山馆）</p><p>⑥ 南山路（中国美院）</p><p>⑦ 龙井村、梅家坞（茶村）</p><p>⑧ 良渚文化村</p>", color: "#f59e0b" },
          { name: "特色市集", desc: "逛吃指南", detail: "<p><strong>杭州特色市集</strong></p><p>• <strong>吴山夜市</strong>：每晚，小吃+小商品</p><p>• <strong>武林夜市</strong>：每晚，小吃+文创</p><p>• <strong>河坊街</strong>：全天，老字号+非遗</p><p>• <strong>周末市集</strong>：各大商场不定期</p>", color: "#10b981" },
          { name: "短途自驾", desc: "半日逃离都市", detail: "<p><strong>杭州周边短途自驾</strong></p><p>• <strong>莫干山</strong>：2小时，避暑胜地</p><p>• <strong>千岛湖</strong>：2.5小时，湖光山色</p><p>• <strong>安吉</strong>：1.5小时，竹海漂流</p><p>• <strong>乌镇</strong>：1.5小时，江南水乡</p><p>• <strong>西塘</strong>：2小时，古镇</p>", color: "#3b82f6" },
          { name: "夜生活", desc: "亲子夜体验", detail: "<p><strong>杭州夜生活</strong></p><p>• <strong>南山路</strong>：酒吧、咖啡馆</p><p>• <strong>武林夜市</strong>：小吃+逛街</p><p>• <strong>西湖音乐喷泉</strong>：每晚</p><p>• <strong>钱江新城灯光秀</strong>：周二/五/六晚</p><p>• <strong>SOS酒吧、Club Queen</strong>：夜店</p>", color: "#8b5cf6" },
          { name: "DIY工坊", desc: "动手体验", detail: "<p><strong>杭州DIY工坊</strong></p><p>• <strong>陶艺</strong>：转塘陶艺街</p><p>• <strong>皮具</strong>：各大商场手工皮具店</p><p>• <strong>烘焙</strong>：连锁烘焙DIY店</p><p>• <strong>银饰</strong>：河坊街银饰DIY</p><p>• <strong>香薰蜡烛</strong>：文艺工作室</p>", color: "#ec4899" },
          { name: "博物馆", desc: "参观指南", detail: "<p><strong>杭州博物馆参观指南</strong></p><p>• <strong>浙江博物馆</strong>（孤山/武林馆）：免费</p><p>• <strong>杭州博物馆</strong>（吴山）：免费</p><p>• <strong>中国丝绸博物馆</strong>：免费</p><p>• <strong>南宋官窑博物馆</strong>：免费</p><p>• <strong>运河博物馆</strong>：免费</p><p style=\"color:var(--text-muted);font-size:13px;\">大部分博物馆周一闭馆，需提前预约</p>", color: "#06b6d4" },
          { name: "咖啡书吧", desc: "亲子推荐", detail: "<p><strong>杭州咖啡书吧推荐</strong></p><p>• <strong>南山路</strong>：文艺咖啡一条街</p><p>• <strong>青芝坞</strong>：文艺小清新</p><p>• <strong>馒头山</strong>：老杭州风情</p><p>• <strong>枫林晚书店</strong>：学术书店+咖啡</p>", color: "#14b8a6" },
          { name: "隐秘拍照点", desc: "20个拍照圣地", detail: "<p><strong>杭州20个拍照圣地</strong></p><p>• 西湖：集贤亭、长桥、郭庄、浴鹄湾</p><p>• 运河：拱宸桥、小河直街、大兜路</p><p>• 老城区：馒头山、青芝坞、白塔公园</p><p>• 现代：钱江新城、天目里、良渚文化村</p><p>• 自然：九溪、云栖竹径、龙井村</p>", color: "#84cc16" },
          { name: "日落观景台", desc: "10处日落", detail: "<p><strong>杭州10处日落观赏地</strong></p><p>① 北高峰（俯瞰西湖+城市）</p><p>② 宝石山（保俶塔夕照）</p><p>③ 雷峰塔（西湖全景）</p><p>④ 六和塔（钱塘江日落）</p><p>⑤ 玉皇山（八卦田+钱塘江）</p><p>⑥ 城市阳台（钱塘江日落）</p><p>⑦ 孤山（西湖北岸）</p><p>⑧ 吴山（城隍阁）</p><p>⑨ 九曜山（花港观鱼后）</p><p>⑩ 千岛湖梅峰岛</p>", color: "#f97316" },
          { name: "免费运动场", desc: "10处运动场所", detail: "<p><strong>杭州10处免费运动场所</strong></p><p>① 西湖边（跑步）</p><p>② 运河绿道（跑步/骑行）</p><p>③ 钱塘江绿道（跑步/骑行）</p><p>④ 各社区健身公园</p><p>⑤ 学校操场（部分开放）</p><p>⑥ 篮球场（社区/公园）</p><p>⑦ 乒乓球台（社区）</p><p>⑧ 游泳馆（部分时段免费）</p><p>⑨ 登山道（群山）</p><p>⑩ 城市阳台（江景跑步）</p>", color: "#a855f7" },
          { name: "凌晨美食", desc: "24小时营业", detail: "<p><strong>杭州24小时美食</strong></p><p>• <strong>面馆</strong>：慧娟面馆、菊英面馆</p><p>• <strong>烧烤</strong>：凌晨街头烧烤摊</p><p>• <strong>便利店</strong>：全家、罗森24小时</p><p>• <strong>快餐</strong>：麦当劳、肯德基24小时店</p><p>• <strong>新丰小吃</strong>：部分门店24小时</p>", color: "#0ea5e9" },
          { name: "西湖一日经典", desc: "断桥→白堤→苏堤→雷峰塔", detail: "<p><strong>西湖一日经典路线</strong></p><p>断桥残雪 → 白堤 → 平湖秋月 → 孤山 → 西泠印社 → 岳王庙 → 苏堤春晓 → 花港观鱼 → 雷峰塔 → 南屏晚钟</p><p style=\"margin-top:8px;\">全程约6-8公里，建议步行+游船结合</p>", color: "#ef4444" },
          { name: "灵隐禅踪", desc: "灵隐寺→飞来峰→法喜寺", detail: "<p><strong>灵隐禅踪路线</strong></p><p>灵隐寺 → 飞来峰 → 法喜寺 → 龙井村</p><p style=\"margin-top:8px;\"><strong>提示</strong>：灵隐寺需购飞来峰门票（45元）+ 寺庙门票（30元）</p>", color: "#8b5cf6" },
          { name: "运河古韵", desc: "拱宸桥→桥西→小河直街", detail: "<p><strong>运河古韵路线</strong></p><p>拱宸桥 → 桥西历史街区 → 运河博物馆 → 小河直街 → 大兜路</p><p style=\"margin-top:8px;\">可乘坐水上巴士游览运河</p>", color: "#10b981" },
          { name: "宋韵穿越", desc: "河坊街→南宋御街→吴山", detail: "<p><strong>宋韵穿越路线</strong></p><p>河坊街 → 南宋御街 → 吴山 → 南宋皇城遗址</p><p style=\"margin-top:8px;\">可着汉服拍照，体验南宋文化</p>", color: "#f59e0b" },
          { name: "茶山漫行", desc: "龙井村→梅家坞→九溪烟树", detail: "<p><strong>茶山漫行路线</strong></p><p>龙井村 → 十里琅珰 → 梅家坞 → 九溪烟树</p><p style=\"margin-top:8px;\">春季采茶季最美，可品茶买茶</p>", color: "#22c55e" },
          { name: "湿地生态", desc: "西溪湿地→摇橹船→深潭口", detail: "<p><strong>西溪湿地路线</strong></p><p>周家村入口 → 摇橹船 → 深潭口 → 河渚街</p><p style=\"margin-top:8px;\"><strong>门票</strong>：80元（含电瓶船）</p>", color: "#06b6d4" },
          { name: "古镇漫游", desc: "塘栖→超山→塘栖古镇", detail: "<p><strong>古镇漫游路线</strong></p><p>塘栖古镇 → 超山 → 塘栖古镇</p><p style=\"margin-top:8px;\">春季超山梅花，塘栖古镇品美食</p>", color: "#a855f7" },
          { name: "富春江畔", desc: "桐君山→严子陵钓台→富春江小三峡", detail: "<p><strong>富春江畔路线</strong></p><p>桐君山 → 严子陵钓台 → 富春江小三峡</p><p style=\"margin-top:8px;\">「天下佳山水，古今推富春」</p>", color: "#3b82f6" },
          { name: "千岛湖度假", desc: "中心湖区→东南湖区→梅峰岛", detail: "<p><strong>千岛湖度假路线</strong></p><p>中心湖区 → 东南湖区 → 梅峰岛</p><p style=\"margin-top:8px;\">建议2天1夜，住湖景房，吃有机鱼头</p>", color: "#14b8a6" },
          { name: "临安山水", desc: "天目山→大明山→浙西大峡谷", detail: "<p><strong>临安山水路线</strong></p><p>天目山 → 大明山 → 浙西大峡谷</p><p style=\"margin-top:8px;\">夏季避暑，秋季红叶</p>", color: "#f97316" },
          { name: "桐庐秘境", desc: "瑶琳仙境→垂云通天河→严子陵钓台", detail: "<p><strong>桐庐秘境路线</strong></p><p>瑶琳仙境 → 垂云通天河 → 严子陵钓台</p><p style=\"margin-top:8px;\">「钱塘江尽到桐庐，水碧山青画不如」</p>", color: "#eab308" }
        ]
      },
      {
        id: "nightmarket", name: "杭州夜市", icon: "🌃",
        items: [
          { name: "武林夜市", desc: "杭州最老牌夜市·拱墅", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">武林夜市位于武林广场西侧，杭州最知名夜市。每天傍晚开市，逛吃+小商品+文创。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>拱墅区武林广场西通道（延安路附近）</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 每日 17:00-23:00（夏令到 24:00）<br>• 雨雪天可能不开</p></div><div class=\"guide-block\"><h4>🛍️ 摊位</h4><p>• 小吃摊：臭豆腐、烤冷面、铁板烧、糖葫芦<br>• 文创摊：手工饰品、手机壳、DIY 手作<br>• 小商品：袜子、首饰、玩具</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 现金 + 手机支付都行<br>• 周末人挤，建议工作日去<br>• 周边可逛杭州大厦、银泰</p></div>", color: "#ef4444" },
          { name: "吴山夜市", desc: "老底子夜市·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">吴山夜市位于惠兴路、仁和路一带，20 多年老夜市。以小商品、服饰、小吃为主。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区惠兴路、仁和路（吴山广场附近）</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 每日 18:00-23:00<br>• 周末更晚</p></div><div class=\"guide-block\"><h4>🛍️ 摊位</h4><p>• 服饰鞋帽（最受欢迎）<br>• 饰品首饰<br>• 手机配件<br>• 小吃：葱包桧、定胜糕</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 杭州最早一批夜市，老底子杭州味<br>• 还价文化浓厚，可大胆还价<br>• 周边河坊街、南宋御街可串联逛</p></div>", color: "#f59e0b" },
          { name: "河坊街夜市", desc: "老字号聚集·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">河坊街是杭州最知名步行街，白天晚上都热闹。夜晚灯光古色古香，老字号、非遗、小吃一应俱全。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区河坊街（吴山广场至中河中路）</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 商铺 9:00-22:00<br>• 夜市摊 18:00-23:00</p></div><div class=\"guide-block\"><h4>🛍️ 重点</h4><p>• <strong>胡庆余堂</strong>：胡雪岩创办的老药铺<br>• <strong>方回春堂</strong>：中医药体验<br>• <strong>张小泉</strong>：剪刀老字号<br>• <strong>王星记</strong>：扇子博物馆<br>• <strong>朱炳仁铜雕</strong>：非遗艺术</p></div><div class=\"guide-block\"><h4>🍽️ 必吃</h4><p>• 葱包桧、定胜糕、龙须糖<br>• 油冬儿、酥油饼<br>• 武大郎烧饼</p></div>", color: "#10b981" },
          { name: "胜利河美食街", desc: "夜宵圣地·拱墅", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">胜利河美食街是杭州知名夜宵一条街，靠近运河。以小龙虾、烧烤、火锅为主。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>拱墅区胜利河畔（衢州路至丽水路）</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 11:00-凌晨 3:00<br>• 夜宵高峰 21:00-1:00</p></div><div class=\"guide-block\"><h4>🍽️ 必吃</h4><p>• <strong>小龙虾</strong>：盱眙小龙虾、辣炒小龙虾<br>• <strong>烧烤</strong>：羊肉串、烤生蚝<br>• <strong>火锅</strong>：海底捞、巴奴<br>• <strong>杭帮菜</strong>：新白鹿、外婆家</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 沿河位置可看运河夜景<br>• 周末晚需排队<br>• 人均 80-150 元</p></div>", color: "#3b82f6" },
          { name: "大兜路历史街区", desc: "运河禅意夜游·拱墅", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">大兜路历史街区位于运河边，是杭州「禅意慢生活」代表。夜晚灯笼亮起，最适合散步。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>拱墅区大兜路（香积寺附近）</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 街区全天开放<br>• 商铺 10:00-22:00</p></div><div class=\"guide-block\"><h4>🛍️ 特色</h4><p>• <strong>香积寺</strong>：夜色中灯光寺庙<br>• <strong>运河步道</strong>：散步夜跑<br>• <strong>文艺餐厅</strong>：素食、茶餐、私房菜<br>• <strong>手作店</strong>：陶艺、皮具</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 适合情侣漫步、家庭散步<br>• 配合拱宸桥、小河直街形成夜游线路<br>• 香积寺晚上有素斋</p></div>", color: "#8b5cf6" },
          { name: "钱江新城灯光秀", desc: "城市阳台夜景·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">钱江新城灯光秀是杭州夜景天花板。每周二、五、六晚 19:30/20:30 两场，免费观赏。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区城市阳台（钱江路市民中心附近）</p></div><div class=\"guide-block\"><h4>⏰ 表演时间</h4><p>• <strong>每周二、五、六</strong>晚上<br>• 19:30 第一场<br>• 20:30 第二场<br>• 每场约 15-20 分钟</p></div><div class=\"guide-block\"><h4>🌃 最佳观赏点</h4><p>• <strong>城市阳台</strong>：最近，最佳视角<br>• <strong>钱塘江对岸</strong>：萧山江畔公园<br>• <strong>钱江三桥</strong>：桥上观（不推荐，交通管制）</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 提前 30 分钟占位<br>• 周末人多，建议地铁 4 号线市民中心站<br>• 配合「日月同辉」（杭州大剧院 + 国际会议中心）拍照</p></div>", color: "#ec4899" }
        ]
      },
      {
        id: "morningtea", name: "杭州早茶", icon: "🍵",
        items: [
          { name: "知味观·湖滨总店", desc: "百年老字号·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">知味观是杭州最知名老字号，1913 年创店。湖滨总店早茶品类全，环境古典。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区仁和路 83 号（近西湖湖滨）</p></div><div class=\"guide-block\"><h4>⏰ 早茶时间</h4><p>• 6:30-10:00<br>• 周末需排队</p></div><div class=\"guide-block\"><h4>🍽️ 必点</h4><p>• <strong>猫耳朵</strong>：杭州名点，形似猫耳<br>• <strong>幸福双</strong>：百年招牌点心<br>• <strong>小笼包</strong>：皮薄馅多汁<br>• <strong>酒酿圆子</strong>：甜点<br>• <strong>片儿川</strong>：杭州面食代表</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 一楼快餐，二楼点菜<br>• 早茶去一楼<br>• 人均 30-50 元</p></div>", color: "#ef4444" },
          { name: "新丰小吃", desc: "性价比之王·全城连锁", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">新丰小吃是杭州本地人最爱早茶连锁，价格便宜分量足。多个分店遍布全城。</p><div class=\"guide-block\"><h4>📍 主要分店</h4><p>• 庆春店、解放店、河坊店、体育场店等<br>• 24 小时店：部分门店</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 5:30-22:00（部分 24h）</p></div><div class=\"guide-block\"><h4>🍽️ 必点</h4><p>• <strong>虾肉小笼</strong>：招牌，8 元/笼<br>• <strong>虾肉烧卖</strong>：杭州一绝<br>• <strong>牛肉粉丝</strong>：汤鲜料足<br>• <strong>麻球</strong>：外酥内糯<br>• <strong>喉口馒头</strong>：老底子味</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 现金 + 手机支付<br>• 自助点餐取餐<br>• 人均 15-25 元</p></div>", color: "#f59e0b" },
          { name: "奎元馆", desc: "百年面馆·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">奎元馆创办于 1867 年，杭州最老面馆。片儿川发源地，早茶面食首选。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区解放路 154 号（近中山中路）</p></div><div class=\"guide-block\"><h4> 营业时间</h4><p>• 6:00-20:30</p></div><div class=\"guide-block\"><h4>🍽️ 必点</h4><p>• <strong>片儿川</strong>：杭州名面，雪菜+笋+肉片<br>• <strong>虾爆鳝面</strong>：百年招牌<br>• <strong>猪肝面</strong>：传统味<br>• <strong>拌面</strong>：简单美味</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 老字号，环境一般但味道正宗<br>• 早上 6 点开门，可作早茶<br>• 人均 25-40 元</p></div>", color: "#10b981" },
          { name: "慧娟面馆", desc: "24 小时面馆·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">慧娟面馆是杭州知名 24 小时面馆，早茶夜宵都适合。主打拌面 + 浇头。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区建国中路 165 号（近庆春路）</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 24 小时不打烊</p></div><div class=\"guide-block\"><h4>🍽️ 必点</h4><p>• <strong>拌面</strong>：葱油 + 猪油香<br>• <strong>大肠面</strong>：特色浇头<br>• <strong>猪肝面</strong>：新鲜嫩滑<br>• <strong>牛腩面</strong>：肉量大</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 凌晨去人少，服务更快<br>• 加料：咸菜、辣酱<br>• 人均 20-30 元</p></div>", color: "#3b82f6" },
          { name: "永和大王", desc: "稳定早茶连锁·全城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">永和大王是早茶稳定选择，24 小时营业。豆浆油条 + 饭团 + 蛋饼，标准化出品。</p><div class=\"guide-block\"><h4>📍 主要分店</h4><p>• 全城 50+ 门店，覆盖主要商圈</p></div><div class=\"guide-block\"><h4>⏰ 营业时间</h4><p>• 多数 24 小时营业</p></div><div class=\"guide-block\"><h4>🍽️ 必点</h4><p>• <strong>豆浆</strong>：咸/甜可选<br>• <strong>油条</strong>：香脆标配<br>• <strong>饭团</strong>：肉松 + 咸菜<br>• <strong>蛋饼</strong>：薄饼卷蛋<br>• <strong>牛肉面</strong>：早午皆可</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 稳定，价格便宜<br>• 适合赶时间吃早茶<br>• 人均 15-25 元</p></div>", color: "#8b5cf6" }
        ]
      },
      {
        id: "hiking", name: "杭州登山", icon: "⛰️",
        items: [
          { name: "北高峰", desc: "西湖第一高·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">北高峰海拔 314 米，西湖群山最高。山顶有财神庙，俯瞰西湖全景。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>起点</strong>：灵隐寺旁（北门入口）<br>• <strong>终点</strong>：北高峰顶<br>• <strong>长度</strong>：约 2 公里<br>• <strong>爬升</strong>：约 250 米</p></div><div class=\"guide-block\"><h4>⏰ 时间</h4><p>• 上山 1-1.5 小时<br>• 下山 40-60 分钟<br>• 缆车可选（30 元单程）</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>灵隐寺 → 飞来峰 → 北高峰索道站 → 山顶财神庙 → 望远亭 → 原路返回或缆车下山</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 早上 7 点前到灵隐，避开人流<br>• 山顶有商店，可买水补给<br>• 适合亲子、初级登山者</p></div>", color: "#ef4444" },
          { name: "宝石山", desc: "俯瞰西湖·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">宝石山海拔 200 米，山顶有保俶塔。西湖边最近的山，最佳观景点。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>起点</strong>：北山街葛岭站<br>• <strong>终点</strong>：保俶塔 / 蛤蟆峰<br>• <strong>长度</strong>：约 1.5 公里</p></div><div class=\"guide-block\"><h4>⏰ 时间</h4><p>• 上山 30-45 分钟<br>• 下山 20-30 分钟</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>北山街入口 → 保俶塔 → 蛤蟆峰（最佳观湖点）→ 宝石流霞 → 初阳台 → 葛岭朝暾 → 原路返回</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 看日出绝佳地<br>• 山顶视野极佳，西湖全景<br>• 适合清晨或傍晚前往</p></div>", color: "#f59e0b" },
          { name: "十里琅珰", desc: "茶山古道·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">十里琅珰是龙井茶山古道，串联龙井村、梅家坞、云栖。5-10 公里步道。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>经典路线</strong>：龙井村 → 十里琅珰 → 梅家坞<br>• <strong>长度</strong>：约 6 公里<br>• <strong>爬升</strong>：约 300 米</p></div><div class=\"guide-block\"><h4>⏰ 时间</h4><p>• 全程 2-3 小时</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>龙井村 → 龙井寺 → 十里琅珰 → 三岔口 → 梅家坞 → 九溪烟树（延伸）</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 春季采茶最美<br>• 可在梅家坞喝茶吃饭<br>• 路况好，适合家庭徒步</p></div>", color: "#10b981" },
          { name: "玉皇山", desc: "八卦田 + 钱塘江·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">玉皇山海拔 237 米，山顶可看八卦田 + 钱塘江。道教名山，紫来洞探秘。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>起点</strong>：八卦田遗址公园<br>• <strong>终点</strong>：玉皇山顶福星观<br>• <strong>长度</strong>：约 3 公里</p></div><div class=\"guide-block\"><h4>⏰ 时间</h4><p>• 上山 1-1.5 小时</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>八卦田 → 玉皇山入口 → 紫来洞 → 福星观 → 钱塘江观景台 → 原路返回</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 八卦田四季不同色，最佳航拍点<br>• 紫来洞夏天凉快<br>• 看钱塘江日落绝佳</p></div>", color: "#3b82f6" },
          { name: "五云山 / 云栖竹径", desc: "竹海古道·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">五云山海拔 334 米，山顶有千年银杏。云栖竹径是上山起点，竹海清幽。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>起点</strong>：云栖竹径<br>• <strong>终点</strong>：五云山顶真际寺遗址<br>• <strong>长度</strong>：约 4 公里</p></div><div class=\"guide-block\"><h4>⏰ 时间</h4><p>• 全程 2-3 小时</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>云栖竹径 → 竹林步道 → 五云山古道 → 千年银杏 → 真际寺遗址 → 可延伸至梅家坞</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 云栖竹径门票 8 元<br>• 11 月底银杏黄最美<br>• 适合雨后去，竹林清润</p></div>", color: "#8b5cf6" }
        ]
      },
      {
        id: "cycling", name: "杭州骑行", icon: "🚴",
        items: [
          { name: "西湖环湖", desc: "经典环湖·10km", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">西湖环湖骑行是杭州经典骑行路线，全长约 10 公里。沿途断桥、苏堤、雷峰塔、长桥。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>起点</strong>：湖滨步行街（可任意点起）<br>• <strong>长度</strong>：约 10 公里<br>• <strong>时间</strong>：1-2 小时</p></div><div class=\"guide-block\"><h4>🗺️ 经典方向</h4><p>湖滨 → 断桥 → 白堤 → 孤山 → 苏堤北端 → 苏堤 → 花港观鱼 → 雷峰塔 → 南山路 → 湖滨</p></div><div class=\"guide-block\"><h4>🚴 单车</h4><p>• <strong>共享单车</strong>：西湖边有大量哈啰、青桔<br>• <strong>租金</strong>：1.5 元/半小时<br>• <strong>注意</strong>：白堤、苏堤禁骑，需推车</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 早上 7 点前人少<br>• 周末人多，避免前往<br>• 全程平路，适合亲子</p></div>", color: "#ef4444" },
          { name: "运河绿道", desc: "拱宸桥至三堡·15km", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">运河绿道沿京杭大运河两岸，从拱宸桥至三堡船闸，全长约 15 公里。沿途历史街区、公园。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>起点</strong>：拱宸桥<br>• <strong>终点</strong>：三堡船闸（或反过来）<br>• <strong>长度</strong>：约 15 公里<br>• <strong>时间</strong>：1.5-2.5 小时</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>拱宸桥 → 桥西历史街区 → 小河直街 → 大兜路 → 香积寺 → 西岸公园 → 钱江新城 → 三堡船闸</p></div><div class=\"guide-block\"><h4>🚴 单车</h4><p>• 沿途有共享单车<br>• 个人自行车也可</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 适合周末骑行<br>• 沿途多处可补给<br>• 拱宸桥、大兜路适合休息</p></div>", color: "#f59e0b" },
          { name: "钱塘江绿道", desc: "最美滨江跑道·20km", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">钱塘江绿道沿钱塘江南岸或北岸延伸，被称为「最美滨江跑道」。从钱江三桥至钱江新城。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>北岸</strong>：钱江三桥 → 城市阳台 → 钱江新城 → 四桥<br>• <strong>南岸</strong>：钱江三桥 → 滨江公园 → 钱江四桥<br>• <strong>长度</strong>：北岸约 8 公里，南岸约 12 公里</p></div><div class=\"guide-block\"><h4>⏰ 时间</h4><p>• 1.5-3 小时</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>城市阳台（北岸起点）→ 沿江绿道 → 钱江三桥下 → 滨江公园（南岸）→ 钱江四桥</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 看灯光秀最佳（周二/五/六晚）<br>• 钱江新城段最美<br>• 跑步骑行都适合</p></div>", color: "#10b981" },
          { name: "千岛湖环湖", desc: "最美环湖·120km", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">千岛湖环湖骑行道被誉为「最美环湖骑行道」，全长 120 公里。建议 2 天完成。</p><div class=\"guide-block\"><h4>📍 路线</h4><p>• <strong>起点</strong>：千岛湖镇<br>• <strong>长度</strong>：约 120 公里<br>• <strong>时间</strong>：2 天 1 夜</p></div><div class=\"guide-block\"><h4>🗺️ 推荐路径</h4><p>千岛湖镇 → 排岭半岛 → 千岛湖大桥 → 汾口 → 中洲 → 姜家 → 千岛湖镇（环线）</p></div><div class=\"guide-block\"><h4>🚴 单车</h4><p>• 可在镇上租公路车或山地车<br>• 租金 50-150 元/天</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 春秋两季最佳<br>• 沿途有农家乐、民宿<br>• 带足能量补给，部分路段无人烟</p></div>", color: "#3b82f6" }
        ]
      },
      {
        id: "teahouse", name: "杭州茶馆", icon: "🍵",
        items: [
          { name: "湖畔居", desc: "西湖边茶馆·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">湖畔居是西湖边最知名茶馆，临湖而建，可边品茶边赏湖景。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区湖滨路 6 号（近西湖音乐喷泉）</p></div><div class=\"guide-block\"><h4>⏰ 营业</h4><p>9:00-22:00</p></div><div class=\"guide-block\"><h4>🍵 茶品</h4><p>• <strong>西湖龙井</strong>：明前茶 380 元/杯起<br>• <strong>径山茶</strong>：余杭名茶<br>• <strong>九曲红梅</strong>：杭州红茶</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 临湖位需预约<br>• 配茶点：瓜子、绿豆糕<br>• 人均 100-200 元</p></div>", color: "#ef4444" },
          { name: "和茶馆", desc: "文艺茶馆·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">和茶馆是杭州文艺茶馆代表，南山路上，环境雅致。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区南山路（近中国美院）</p></div><div class=\"guide-block\"><h4>⏰ 营业</h4><p>10:00-23:00</p></div><div class=\"guide-block\"><h4>🍵 茶品</h4><p>• 龙井、铁观音、白茶<br>• 茶食手作：茶点、茶餐</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 适合拍照、约会<br>• 配合南山路文艺漫步<br>• 人均 80-150 元</p></div>", color: "#f59e0b" },
          { name: "青藤茶馆", desc: "老字号茶馆·上城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">青藤茶馆是杭州老字号茶馆，环境古典雅致，适合慢慢品茶。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区南山路（近河坊街）</p></div><div class=\"guide-block\"><h4>⏰ 营业</h4><p>9:00-22:00</p></div><div class=\"guide-block\"><h4>🍵 茶品</h4><p>• 龙井、碧螺春、铁观音<br>• 自助茶食：瓜子、糕点、水果</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 自助模式，68 元起<br>• 可坐一下午<br>• 适合朋友小聚</p></div>", color: "#10b981" },
          { name: "梅家坞茶楼", desc: "茶村体验·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">梅家坞是龙井茶原产地，村里有数十家茶楼。直接在茶农家品茶，最地道。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区梅家坞村（龙井村南）</p></div><div class=\"guide-block\"><h4>⏰ 营业</h4><p>8:00-20:00</p></div><div class=\"guide-block\"><h4>🍵 茶品</h4><p>• <strong>梅家坞龙井</strong>：村里自产<br>• <strong>明前茶</strong>：3 月底-4 月中旬<br>• <strong>雨前茶</strong>：4 月中-谷雨</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 春季采茶季最佳<br>• 可参观茶园、买茶<br>• 人均 50-200 元（看茶等级）</p></div>", color: "#3b82f6" },
          { name: "龙井村茶室", desc: "龙井茶发源地·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">龙井村是西湖龙井茶发源地，村内有茶室、茶博物馆。可参观茶园 + 品茶 + 用餐。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区龙井村（近龙井寺）</p></div><div class=\"guide-block\"><h4>⏰ 营业</h4><p>8:00-19:00</p></div><div class=\"guide-block\"><h4>🍵 茶品</h4><p>• <strong>狮峰龙井</strong>：龙井村核心产区<br>• <strong>梅家坞龙井</strong>：相邻产区<br>• <strong>云栖龙井</strong>：另一名产区</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 参观龙井寺 + 茶博物馆<br>• 春季可看采茶<br>• 可买茶：建议找口碑茶农</p></div>", color: "#8b5cf6" }
        ]
      },
      {
        id: "picking", name: "杭州采摘", icon: "🍒",
        items: [
          { name: "塘栖枇杷", desc: "5 月枇杷·临平", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">塘栖枇杷是杭州名果，5 月成熟。塘栖镇有多处采摘园，软条白沙、红沙品种。</p><div class=\"guide-block\"><h4>📅 季节</h4><p>• 5 月上旬-6 月上旬<br>• 5 月中下旬最佳</p></div><div class=\"guide-block\"><h4>📍 采摘园</h4><p>• <strong>塘栖枇杷特色园区</strong>：塘栖镇<br>• <strong>超山周边</strong>：枇杷 + 超山梅花<br>• <strong>丁山湖</strong>：果农+水乡</p></div><div class=\"guide-block\"><h4>🍇 品种</h4><p>• <strong>软条白沙</strong>：果肉白嫩，最优质<br>• <strong>红沙</strong>：果肉橙红，甜酸<br>• <strong>草种</strong>：野生种</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票约 30-50 元（带走另算）<br>• 可配合塘栖古镇游<br>• 5 月旺季需预约</p></div>", color: "#ef4444" },
          { name: "余杭杨梅", desc: "6 月杨梅·余杭", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">余杭是杭州杨梅主产地，6 月成熟。塘栖、余杭瓶窑等地有大量杨梅园。</p><div class=\"guide-block\"><h4>📅 季节</h4><p>• 6 月上旬-6 月下旬<br>• 夏至前后最佳</p></div><div class=\"guide-block\"><h4>📍 采摘园</h4><p>• <strong>瓶窑镇</strong>：余杭杨梅主产地<br>• <strong>径山</strong>：径山杨梅<br>• <strong>塘栖</strong>：枇杷+杨梅</p></div><div class=\"guide-block\"><h4>🍇 品种</h4><p>• <strong>荸荠种</strong>：果形小，甜度高<br>• <strong>晚稻</strong>：果大，6 月底<br>• <strong>东魁</strong>：果最大，6 月中下旬</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 30-50 元<br>• 带走 15-25 元/斤<br>• 杨梅季短，错过等明年</p></div>", color: "#f59e0b" },
          { name: "建德草莓", desc: "12-5 月草莓·建德", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">建德是杭州草莓主产地，全国闻名。12 月至次年 5 月均可采摘，春节最甜。</p><div class=\"guide-block\"><h4>📅 季节</h4><p>• 12 月-5 月<br>• 春节前后最佳</p></div><div class=\"guide-block\"><h4>📍 采摘园</h4><p>• <strong>杨村桥镇</strong>：建德草莓之乡<br>• <strong>下涯镇</strong>：规模化草莓园<br>• <strong>新安江街道</strong>：近城区</p></div><div class=\"guide-block\"><h4>🍇 品种</h4><p>• <strong>红颊</strong>：果大，甜度高<br>• <strong>章姬</strong>：果形长，口感佳<br>• <strong>妙香七号</strong>：新品种</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 30-50 元<br>• 带走 20-35 元/斤<br>• 草莓季长，可多次去</p></div>", color: "#10b981" },
          { name: "桐庐蓝莓", desc: "6-7 月蓝莓·桐庐", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">桐庐是杭州蓝莓主产地，6-7 月成熟。蓝溪、横村等地有多个蓝莓园。</p><div class=\"guide-block\"><h4>📅 季节</h4><p>• 6 月中旬-7 月下旬</p></div><div class=\"guide-block\"><h4>📍 采摘园</h4><p>• <strong>蓝溪</strong>：桐庐蓝莓之乡<br>• <strong>横村镇</strong>：规模化蓝莓园<br>• <strong>瑶琳镇</strong>：配合瑶琳仙境游</p></div><div class=\"guide-block\"><h4>🍇 品种</h4><p>• <strong>蓝丰</strong>：果大，6 月中旬<br>• <strong>蓝金</strong>：甜度高，6 月底<br>• <strong>钱德拉</strong>：早熟品种</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 50-80 元<br>• 带走 30-50 元/斤<br>• 蓝莓含花青素高，抗氧化</p></div>", color: "#3b82f6" },
          { name: "临安山核桃 + 笋", desc: "9 月山核桃·临安", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">临安是杭州山核桃之乡，9 月白露后成熟。春季还可挖笋，是农事体验好去处。</p><div class=\"guide-block\"><h4>📅 季节</h4><p>• <strong>山核桃</strong>：9 月白露后<br>• <strong>春笋</strong>：3-4 月<br>• <strong>冬笋</strong>：12-2 月</p></div><div class=\"guide-block\"><h4>📍 采摘园</h4><p>• <strong>岛石镇</strong>：山核桃核心产区<br>• <strong>清凉峰镇</strong>：山核桃 + 自然保护区<br>• <strong>太湖源镇</strong>：笋竹之乡</p></div><div class=\"guide-block\"><h4>🌰 山核桃品种</h4><p>• <strong>薄壳</strong>：好剥，最受欢迎<br>• <strong>厚壳</strong>：传统品种<br>• <strong>手剥</strong>：加工后即食</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 山核桃带走 80-150 元/斤<br>• 可配合天目山、大明山游<br>• 春节前买山核桃送礼最划算</p></div>", color: "#8b5cf6" }
        ]
      },
      {
        id: "ancienttown", name: "杭州古镇", icon: "🏯",
        items: [
          { name: "塘栖古镇", desc: "京杭运河古镇·临平", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">塘栖是杭州唯一真正意义的古镇，京杭大运河穿镇而过，北宋已成商埠。乾隆六下江南必经之地。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>临平区塘栖镇（距市中心约 20 公里）</p></div><div class=\"guide-block\"><h4>🏛️ 必看</h4><p>• <strong>广济桥</strong>：京杭运河上唯一 7 孔石拱桥<br>• <strong>乾隆行宫</strong>：乾隆南巡驻跸地<br>• <strong>水北街</strong>：明清古街<br>• <strong>塘栖枇杷馆</strong>：5 月枇杷季必去</p></div><div class=\"guide-block\"><h4>🍽️ 必吃</h4><p>• <strong>塘栖枇杷</strong>：5 月当季水果<br>• <strong>细沙羊尾</strong>：豆沙甜点<br>• <strong>桔红糕</strong>：传统茶点<br>• <strong>板鸭</strong>：古镇特产</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费，全天开放<br>• 半日游最佳<br>• 5 月配合枇杷采摘</p></div>", color: "#ef4444" },
          { name: "龙门古镇", desc: "孙权故里·富阳", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">龙门古镇是孙权故里，三国孙氏后裔聚居 1000+ 年。保存完好的明清建筑群，被称为「活着的古镇」。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>富阳区龙门镇（距杭州市区约 50 公里）</p></div><div class=\"guide-block\"><h4>🏛️ 必看</h4><p>• <strong>孙氏宗祠</strong>：江南最大宗祠之一<br>• <strong>龙门溪</strong>：穿镇溪流<br>• <strong>老街</strong>：鹅卵石路，200+ 幢明清民居<br>• <strong>砚池</strong>：古镇风水池</p></div><div class=\"guide-block\"><h4>🍽️ 必吃</h4><p>• <strong>龙门面筋</strong>：孙权家宴传承<br>• <strong>龙门麦塌饼</strong>：薄饼卷菜<br>• <strong>孙权家酒</strong>：米酒<br>• <strong>龙门牛肉</strong>：本地黄牛</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 80 元（含讲解）<br>• 全程 3-4 小时<br>• 春秋两季最美</p></div>", color: "#f59e0b" },
          { name: "深澳村", desc: "申屠千年古村·桐庐", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">深澳村是桐庐千年古村，申屠氏家族聚居 1000+ 年。保存有 40+ 幢明清民国古建筑，被称为「江南古民居博物馆」。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>桐庐县江南镇深澳村（距桐庐县城约 20 公里）</p></div><div class=\"guide-block\"><h4>🏛️ 必看</h4><p>• <strong>申屠氏宗祠</strong>：明代建筑<br>• <strong>怀素堂</strong>：清代名医故居<br>• <strong>恭思堂</strong>：徽派建筑代表<br>• <strong>暗渠系统</strong>：南宋地下水系，至今仍在使用</p></div><div class=\"guide-block\"><h4>🍽️ 必吃</h4><p>• <strong>酒酿馒头</strong>：传统发酵<br>• <strong>索面</strong>：手工挂面<br>• <strong>山粉饺</strong>：芋饺<br>• <strong>米粿</strong>：桐庐特色</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，开放村落<br>• 半日游最佳<br>• 文艺小众，游客少</p></div>", color: "#10b981" },
          { name: "新叶古村", desc: "爸爸去哪儿拍摄地·建德", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">新叶古村是《爸爸去哪儿》第三季拍摄地，800 年历史，叶氏家族聚居。保存有 200+ 幢明清古民居，被称为「中国明清建筑露天博物馆」。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>建德市大慈岩镇新叶村（距建德市区约 30 公里）</p></div><div class=\"guide-block\"><h4>🏛️ 必看</h4><p>• <strong>抟云塔</strong>：明代风水塔<br>• <strong>有序堂</strong>：宗祠核心<br>• <strong>文昌阁</strong>：读书人聚集地<br>• <strong>南塘</strong>：村口风水池，拍照圣地</p></div><div class=\"guide-block\"><h4>🍽️ 必吃</h4><p>• <strong>新叶豆腐包</strong>：建德名小吃<br>• <strong>肉圆</strong>：芋头肉圆<br>• <strong>三都麻糍</strong>：糯米点心<br>• <strong>建德烧饼</strong>：老底子味</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 68 元<br>• 全程 2-3 小时<br>• 可配合大慈岩 + 新安江一日游</p></div>", color: "#3b82f6" },
          { name: "严州古城", desc: "千年州府·建德梅城", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">严州古城（梅城）是浙西千年州府，三国置县，唐宋为州治。朱元璋曾驻此，谢灵运、陆游曾任严州太守。城墙完整，因「城堞形似梅花」得名梅城。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>建德市梅城镇（距建德市区约 30 公里）</p></div><div class=\"guide-block\"><h4>🏛️ 必看</h4><p>• <strong>澄清门</strong>：古城门，明代<br>• <strong>古城墙</strong>：3 公里明代城墙<br>• <strong>六合井</strong>：南宋古井<br>• <strong>府后街</strong>：古州府后街<br>• <strong>青柯院</strong>：明清民居</p></div><div class=\"guide-block\"><h4>🍽️ 必吃</h4><p>• <strong>严州干菜鸭</strong>：徽菜传承<br>• <strong>梅城烧饼</strong>：百年老店<br>• <strong>玉米馃</strong>：玉米面饼<br>• <strong>豆腐包</strong>：建德一绝<br>• <strong>三都麻糍</strong>：传统点心</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费，全天开放<br>• 配合新安江 + 大慈岩 1 日游<br>• 修复中，部分区域仍可逛</p></div>", color: "#8b5cf6" }
        ]
      },
      {
        id: "flower", name: "杭州赏花", icon: "🌸",
        items: [
          { name: "太子湾郁金香", desc: "3-4 月·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">太子湾公园是杭州春季赏花天花板，3 月底-4 月初郁金香 + 樱花 + 玉兰同开，免费，人山人海。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 郁金香：3 月下旬-4 月中旬<br>• 樱花：3 月中下旬<br>• 玉兰：3 月初-中旬</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区南山路 5-1 号（近苏堤、雷峰塔）</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约（旺季）<br>• 早 8 点前到避人流<br>• 周末人多到限流<br>• 樱花最佳拍照点：大风车、小桥</p></div>", color: "#ec4899" },
          { name: "西湖荷花", desc: "6-8 月·曲院风荷", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">曲院风荷是西湖十景之一，6 月荷花盛开，上百品种。断桥、孤山、郭庄也是赏荷名点。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 始花：6 月初<br>• 盛花：6 月中-7 月底<br>• 残花：8 月</p></div><div class=\"guide-block\"><h4>📍 推荐点</h4><p>• <strong>曲院风荷</strong>：品种最多，门票免费<br>• <strong>断桥荷区</strong>：经典西湖荷景<br>• <strong>郭庄</strong>：古典园林 + 荷花<br>• <strong>孤山后荷区</strong>：人少</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 早上 7-9 点花开最盛<br>• 雨后荷花更娇艳<br>• 配合夜游西湖</p></div>", color: "#3b82f6" },
          { name: "满觉陇桂花", desc: "9-10 月·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">满觉陇是杭州秋季赏桂圣地，「满陇桂雨」是新西湖十景之一。全村种植 7000+ 株桂花，空气里都是甜香。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 始花：9 月初<br>• 盛花：9 月中-10 月中<br>• 晚花：10 月底</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区满觉陇村（近石屋洞、烟霞洞）</p></div><div class=\"guide-block\"><h4>🍽️ 必尝</h4><p>• <strong>桂花糖</strong>：传统甜点<br>• <strong>桂花酒</strong>：糯米酒<br>• <strong>桂花栗子羹</strong>：秋季限定<br>• <strong>桂花茶</strong>：村中茶农家</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费开放<br>• 9 月底-10 月初最香<br>• 农家乐喝茶吃饭</p></div>", color: "#f59e0b" },
          { name: "超山梅花", desc: "2-3 月·临平", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">超山是江南三大探梅胜地（另两个：苏州邓尉、无锡梅园），2-3 月梅花盛开，唐梅、宋梅为镇山之宝。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 始花：1 月底<br>• 盛花：2 月中-3 月初<br>• 残花：3 月中</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>临平区超山镇（距市中心约 25 公里）</p></div><div class=\"guide-block\"><h4>🌸 品种</h4><p>• <strong>唐梅</strong>：1000 年古梅<br>• <strong>宋梅</strong>：800 年古梅<br>• <strong>骨里红</strong>：珍稀品种<br>• <strong>绿萼梅</strong>：香气浓郁</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 60 元<br>• 全程 2-3 小时<br>• 配合塘栖古镇一日游</p></div>", color: "#ef4444" },
          { name: "白塔樱花", desc: "3 月·上城区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">白塔公园是杭州「早樱」代表，3 月初樱花盛开。公园是南宋地宫遗址 + 绿皮火车怀旧，赏花 + 拍照一举两得。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 始花：2 月底<br>• 盛花：3 月初-中旬</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区老复兴街（近钱江新城）</p></div><div class=\"guide-block\"><h4>🌸 特色</h4><p>• <strong>早樱</strong>：杭州最早开放<br>• <strong>绿皮火车</strong>：怀旧拍照<br>• <strong>白塔</strong>：南宋地宫遗址<br>• <strong>铁路遗址</strong>：闸口火车站</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费开放<br>• 早樱比太子湾早 1 周<br>• 周末人多</p></div>", color: "#8b5cf6" },
          { name: "西溪湿地芦花", desc: "11-12 月·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">西溪湿地秋冬季的芦花是杭州独特景观，「秋芦飞雪」是西溪十景之一。11 月芦苇荡一片金黄。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 始花：10 月底<br>• 盛花：11 月-12 月初</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区天目山路 518 号</p></div><div class=\"guide-block\"><h4>🌸 赏芦点</h4><p>• <strong>虾龙堰</strong>：最佳观赏点<br>• <strong>深潭口</strong>：摇橹船赏芦<br>• <strong>秋雪庵</strong>：芦花深处</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 80 元（含电瓶船）<br>• 11 月中旬最美<br>• 摇橹船赏芦最诗意</p></div>", color: "#06b6d4" },
          { name: "径山花海", desc: "6-10 月·余杭", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">径山花海是杭州近郊最大花海，6-10 月马鞭草、向日葵、粉黛乱子草依次盛开。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 马鞭草：6-7 月<br>• 向日葵：7-8 月<br>• 粉黛乱子草：9-10 月</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>余杭区径山镇（近径山寺）</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 60 元<br>• 全程 2-3 小时<br>• 配合径山寺 + 茶宴一日游</p></div>", color: "#a855f7" },
          { name: "湘湖向日葵", desc: "7-8 月·萧山", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">湘湖是西湖姊妹湖，7-8 月向日葵花海。比西湖人少，适合拍照。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 7 月初-8 月中</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>萧山区湘湖景区</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费开放<br>• 配合跨湖桥遗址 + 湘湖夜游<br>• 比西湖清静</p></div>", color: "#f97316" },
          { name: "杭州植物园", desc: "全年·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州植物园是杭州「四季赏花」集中地，灵峰探梅、樱花、月季、桂花、茶花，一年四季都有花看。</p><div class=\"guide-block\"><h4>📅 月历</h4><p>• 2-3 月：灵峰梅花<br>• 3-4 月：樱花、玉兰<br>• 4-5 月：月季、杜鹃<br>• 9-10 月：桂花<br>• 11-12 月：菊花展</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区桃源岭 1 号</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 门票 10 元<br>• 灵峰探梅是杭州赏梅代表<br>• 全年可去</p></div>", color: "#22c55e" },
          { name: "杭州花圃", desc: "全年·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州花圃是西湖边的「花卉园林」，以兰花、月季、菊花见长，适合静赏。</p><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区西山路 6 号</p></div><div class=\"guide-block\"><h4>🌸 特色</h4><p>• 兰园：杭州兰花聚集地<br>• 月季园：4-5 月、10 月两次盛花<br>• 菊花展：11 月</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费开放<br>• 适合拍照 + 文艺漫步<br>• 与曲院风荷相邻</p></div>", color: "#0ea5e9" },
          { name: "孤山梅花", desc: "2-3 月·西湖区", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">孤山是西湖赏梅老牌地点，「孤山探梅」自北宋林逋「梅妻鹤子」以来就是雅事。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 2 月初-3 月中</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖孤山（放鹤亭附近）</p></div><div class=\"guide-block\"><h4>🌸 历史</h4><p>• 林逋「梅妻鹤子」居孤山<br>• 「疏影横斜水清浅」即此</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费开放<br>• 与西泠印社、浙江博物馆相邻<br>• 文化深度高</p></div>", color: "#ec4899" },
          { name: "桐庐荻浦花海", desc: "6-10 月·桐庐", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">荻浦花海是杭州近郊网红花海，村野间千亩花海，6-10 月不同品种依次开放。</p><div class=\"guide-block\"><h4>📅 花期</h4><p>• 薰衣草：6-7 月<br>• 向日葵：7-8 月<br>• 波斯菊：9-10 月</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>桐庐县江南镇荻浦村</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 免费开放<br>• 配合深澳古村 + 龙门古镇游<br>• 适合拍照打卡</p></div>", color: "#a855f7" }
        ]
      },
      {
        id: "seasonalfood", name: "节气美食", icon: "🍙",
        items: [
          { name: "立春·春卷", desc: "2 月初·咬春", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">立春是 24 节气之首，杭州有「咬春」传统，吃春卷、春饼。卷上时令蔬菜，迎接春天。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>春卷</strong>：豆沙春卷（甜）、荠菜春卷（咸）<br>• <strong>春饼</strong>：薄饼卷菜<br>• <strong>荠菜</strong>：2-3 月当季野菜<br>• <strong>马兰头</strong>：凉拌杭州名菜</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 知味观：豆沙春卷<br>• 新丰小吃：荠菜春卷<br>• 外婆家：马兰头拌香干</p></div>", color: "#22c55e" },
          { name: "清明·艾饺", desc: "4 月初·寒食", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">清明节杭州有吃艾饺、清明团的习俗，糯米裹豆沙或咸馅，艾草染色，清香扑鼻。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>艾饺</strong>：糯米 + 艾草，豆沙馅<br>• <strong>清明团</strong>：与艾饺类似<br>• <strong>螺蛳</strong>：「清明螺，赛大鹅」清明前最肥<br>• <strong>马兰头</strong>：4 月当季</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 河坊街：老字号艾饺<br>• 知味观：清明团<br>• 楼外楼：酱爆螺蛳</p></div>", color: "#10b981" },
          { name: "立夏·乌米饭", desc: "5 月初·立夏饭", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">立夏杭州有「吃立夏饭」习俗，乌米饭（糯米 + 乌树叶汁）最具特色，象征平安度夏。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>乌米饭</strong>：乌树叶染糯米，甜咸皆可<br>• <strong>立夏狗</strong>：糯米狗形糕<br>• <strong>咸豆粥</strong>：立夏粥<br>• <strong>樱桃</strong>：立夏时令水果</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 知味观：乌米饭<br>• 河坊街：立夏狗<br>• 农贸市场：乌树叶（自制）</p></div>", color: "#ef4444" },
          { name: "芒种·五黄宴", desc: "6 月初·端午", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">端午杭州有「五黄宴」传统：黄鱼、黄鳝、黄瓜、咸蛋黄、雄黄酒，象征驱邪避毒。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>黄鱼</strong>：端午时令海鲜<br>• <strong>黄鳝</strong>：6 月最肥<br>• <strong>黄瓜</strong>：6 月当季<br>• <strong>咸蛋黄</strong>：粽子里<br>• <strong>雄黄酒</strong>：象征驱毒<br>• <strong>粽子</strong>：嘉兴粽 / 杭州粽</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 五芳斋：粽子<br>• 知味观：五黄宴套餐<br>• 楼外楼：黄鳝</p></div>", color: "#f59e0b" },
          { name: "夏至·冷淘", desc: "6 月底·过水面", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">夏至杭州有吃「冷淘」（凉面）习俗，过水面加麻酱、醋，消暑解热。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>冷淘</strong>：凉面，麻酱 + 醋<br>• <strong>莲子羹</strong>：消暑甜汤<br>• <strong>绿豆汤</strong>：解暑标配<br>• <strong>酸梅汤</strong>：老北京味，杭州也喝</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 奎元馆：冷淘面<br>• 知味观：莲子羹<br>• 胡庆余堂：酸梅汤</p></div>", color: "#0ea5e9" },
          { name: "立秋·秋葵", desc: "8 月初·贴秋膘", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">立秋杭州有「贴秋膘」传统，吃肉增重过冬。秋葵、莲藕、茭白开始上市。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>秋葵</strong>：8-9 月当季<br>• <strong>莲藕</strong>：西湖莲藕，脆甜<br>• <strong>茭白</strong>：8-10 月当季<br>• <strong>东坡肉</strong>：贴秋膘代表菜<br>• <strong>叫花鸡</strong>：杭帮名菜</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 楼外楼：东坡肉、叫花鸡<br>• 知味观：莲藕<br>• 外婆家：秋葵</p></div>", color: "#f97316" },
          { name: "白露·桂花", desc: "9 月初·桂雨", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">白露时节杭州桂花盛开，可做桂花糖、桂花酒、桂花栗子羹，香气满城。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>桂花糖</strong>：糖渍桂花<br>• <strong>桂花酒</strong>：糯米酒 + 桂花<br>• <strong>桂花栗子羹</strong>：秋季限定<br>• <strong>桂花茶</strong>：晒干桂花泡茶<br>• <strong>栗子</strong>：9-10 月当季</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 满觉陇：桂花糖、桂花茶<br>• 知味观：桂花栗子羹<br>• 胡庆余堂：桂花酒</p></div>", color: "#eab308" },
          { name: "秋分·大闸蟹", desc: "9 月底·蟹季", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">秋分杭州进入大闸蟹季，秋分雌蟹（团脐）满黄，雄蟹（尖脐）满膏，10-11 月最肥。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>大闸蟹</strong>：9 月底-11 月<br>• <strong>雌蟹</strong>：秋分满黄<br>• <strong>雄蟹</strong>：10 月底满膏<br>• <strong>杭菊</strong>：菊花 + 蟹，秋味代表<br>• <strong>石榴</strong>：9-10 月当季</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 王氏大闸蟹：连锁品牌<br>• 阳澄湖蟹：高端选择<br>• 太湖蟹：性价比<br>• 楼外楼：蟹粉豆腐、蟹粉面</p></div>", color: "#ef4444" },
          { name: "立冬·羊肉", desc: "11 月初·冬补", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">立冬杭州有「冬补」传统，吃羊肉、狗肉、汤圆。仓前羊肉、湖州湖羊是杭州人首选。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>仓前羊肉</strong>：余杭名产<br>• <strong>湖羊</strong>：湖州特产<br>• <strong>汤圆</strong>：冬至前吃<br>• <strong>冬笋</strong>：11 月开始<br>• <strong>冬枣</strong>：11 月当季</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 仓前老街：白切羊肉<br>• 楼外楼：羊肉暖锅<br>• 知味观：汤圆</p></div>", color: "#8b5cf6" },
          { name: "冬至·年糕", desc: "12 月底·冬至夜", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">冬至夜杭州有吃年糕、汤圆的习俗，年糕寓意「年年高」。杭州年糕以慈城年糕、宁波年糕最有名。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>年糕</strong>：冬至必备，炒年糕、汤年糕<br>• <strong>汤圆</strong>：芝麻、豆沙馅<br>• <strong>饺子</strong>：北方传统<br>• <strong>羊肉</strong>：冬至羊肉暖身<br>• <strong>冬至团</strong>：糯米团子</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 知味观：年糕、汤圆<br>• 新丰小吃：炒年糕<br>• 楼外楼：羊肉暖锅</p></div>", color: "#3b82f6" },
          { name: "小寒·腊八粥", desc: "1 月初·腊八", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">小寒后腊八节（农历十二月初八），杭州寺庙有施腊八粥传统，胡庆余堂、灵隐寺、净慈寺免费派送。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>腊八粥</strong>：8 种食材，象征丰收<br>• <strong>腊八蒜</strong>：醋泡蒜<br>• <strong>腊肉</strong>：冬至后腌制<br>• <strong>腊鱼</strong>：江南冬味</p></div><div class=\"guide-block\"><h4>📍 免费派粥</h4><p>• 灵隐寺：腊八早 6:00<br>• 净慈寺：早 7:00<br>• 胡庆余堂：早 8:00<br>• 各社区寺院</p></div>", color: "#06b6d4" },
          { name: "大寒·年货", desc: "1 月底·年味", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">大寒过后是杭州年货季：酱鸭、酱肉、火腿、山核桃、龙井茶，年味浓。</p><div class=\"guide-block\"><h4>🍽️ 时令</h4><p>• <strong>酱鸭</strong>：杭州年货代表<br>• <strong>酱肉</strong>：冬至后晾制<br>• <strong>火腿</strong>：金华火腿<br>• <strong>山核桃</strong>：临安产<br>• <strong>龙井茶</strong>：明前新茶预告</p></div><div class=\"guide-block\"><h4>📍 推荐</h4><p>• 万隆火腿：河坊街老字号<br>• 采芝斋：传统糕点<br>• 胡庆余堂：养生年货<br>• 临安：山核桃</p></div>", color: "#a855f7" }
        ]
      },
      {
        id: "hangzhoufood", name: "杭帮名菜", icon: "🍲",
        items: [
          { name: "西湖醋鱼", desc: "杭帮菜首席·楼外楼", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">西湖醋鱼是杭帮菜首席代表，南宋流传至今。用西湖草鱼，清水饿养 2 天去腥，糖醋勾芡，鲜嫩酸甜。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>南宋宋嫂为病中兄长做鱼，糖醋调味，后传入宫中。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 草鱼饿养 2 天吐泥<br>• 入沸水煮 3-4 分钟<br>• 糖醋勾芡浇汁<br>• 不放油，只用糖醋</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>楼外楼</strong>：孤山总店，160 年老店，最正宗<br>• <strong>杭州酒家</strong>：延安路，性价比<br>• <strong>知味观</strong>：湖滨总店，连锁稳定</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 人均 80-200 元<br>• 楼外楼孤山总店观湖位需预约<br>• 春秋两季鱼最肥</p></div>", color: "#ef4444" },
          { name: "东坡肉", desc: "苏东坡传承·楼外楼", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">东坡肉是苏东坡在杭州任太守时创制，肥瘦相间，慢火炖 2 小时，肥而不腻，色泽红亮。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>苏东坡疏浚西湖，民工送肉，他指点家人慢火少水炖煮，流传后世。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 五花肉切块<br>• 砂锅慢炖 2 小时<br>• 绍酒 + 酱油 + 冰糖<br>• 不放水，酒代水</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>楼外楼</strong>：东坡肉发源地<br>• <strong>杭州酒家</strong>：传统做法<br>• <strong>外婆家</strong>：连锁性价比</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 配米饭最佳<br>• 一个人吃不完，建议 2-4 人份<br>• 人均 40-80 元</p></div>", color: "#f59e0b" },
          { name: "叫花鸡", desc: "荷叶 + 泥巴·楼外楼", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">叫花鸡是杭州传统名菜，嫩鸡 + 荷叶 + 黄泥，炭火慢烤 2 小时，撕泥启食，香气扑鼻。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>乞丐偷鸡，裹泥烤制，被乾隆私访闻香止步，赐名「富贵鸡」，仍称叫花鸡。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 嫩鸡腌制 1 小时<br>• 腹塞香菇、笋丁、火腿<br>• 荷叶包裹<br>• 黄泥封裹<br>• 炭火烤 2 小时</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>楼外楼</strong>：最正宗，160 年传承<br>• <strong>杭州酒家</strong>：传统做法<br>• <strong>山外山</strong>：分店较多</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 撕泥启食是仪式感<br>• 人均 80-150 元<br>• 需 30 分钟提前预约</p></div>", color: "#10b981" },
          { name: "龙井虾仁", desc: "明前龙井 + 河虾·楼外楼", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">龙井虾仁是春季限定杭帮菜，明前龙井新茶 + 鲜活河虾仁，茶香 + 虾鲜，清雅至极。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>苏东坡与琴僧品茶论道，创意将龙井茶入菜，流传至今。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 河虾剥仁，腌制<br>• 油温 4 成滑炒<br>• 明前龙井茶叶同炒<br>• 不加多余调料</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>楼外楼</strong>：明前龙井 + 西湖河虾<br>• <strong>杭州酒家</strong>：性价比<br>• <strong>龙井村茶楼</strong>：茶农做</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 3 月底-4 月底最佳（明前茶季）<br>• 人均 80-150 元<br>• 配龙井茶</p></div>", color: "#22c55e" },
          { name: "片儿川", desc: "雪菜 + 笋 + 肉·奎元馆", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">片儿川是杭州名面，雪菜 + 笋片 + 肉片浇头，鲜美清爽。奎元馆是发源地，1867 年创店。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>奎元馆老掌柜为赶考举人做面，浇头雪菜笋片肉片，举人中举后回店题字。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 碱水面，略硬<br>• 雪菜切碎，笋切薄片<br>• 肉片腌制<br>• 高汤煮面，浇头同煮</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>奎元馆</strong>：解放路总店，1867 年<br>• <strong>慧娟面馆</strong>：本地人最爱<br>• <strong>状元馆</strong>：连锁</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 人均 25-40 元<br>• 春笋季 3-4 月最鲜<br>• 早茶好选择</p></div>", color: "#3b82f6" },
          { name: "宋嫂鱼羹", desc: "南宋名菜·楼外楼", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">宋嫂鱼羹是南宋名菜，宋五嫂在西湖做鱼羹，宋孝宗品尝后赞不绝口，流传千年。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>南宋淳熙六年，宋孝宗游西湖，品尝宋五嫂鱼羹，赐金钱 100 文，自此闻名。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 鳜鱼蒸熟去骨<br>• 笋丝、香菇丝、火腿丝<br>• 醋 + 酱油调味<br>• 勾芡成羹</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>楼外楼</strong>：传承千年<br>• <strong>杭州酒家</strong>：传统做法<br>• <strong>知味观</strong>：连锁</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 人均 40-80 元<br>• 酸甜鲜香，开胃<br>• 配米饭或单独喝</p></div>", color: "#8b5cf6" },
          { name: "蜜汁火方", desc: "金华火腿 + 莲子·楼外楼", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">蜜汁火方是杭帮菜宴席名菜，金华火腿上方 + 莲子 + 冰糖，蒸 4 小时，咸甜交融，肥而不腻。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>源于南宋宫廷菜，后传入民间，是杭帮宴席压轴菜。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 金华火腿上方蒸 1 小时去咸<br>• 莲子煮软<br>• 冰糖 + 绍酒 + 蜜<br>• 上笼蒸 4 小时</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>楼外楼</strong>：最正宗<br>• <strong>杭州酒家</strong>：宴席菜<br>• <strong>知味观</strong>：湖滨总店</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 人均 80-150 元<br>• 宴席菜，建议 4+ 人<br>• 需 4 小时提前预约</p></div>", color: "#ec4899" },
          { name: "干炸响铃", desc: "豆腐皮 + 肉茸·杭州酒家", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">干炸响铃是杭帮菜特色小吃，薄如蝉翼的豆腐皮裹肉茸，油炸至金黄，咬下去「咔嚓」响。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>因咬下去发出清脆响声而得名响铃。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 杭州豆腐皮（薄）<br>• 肉茸 + 葱姜末调味<br>• 卷成小筒<br>• 油炸至金黄</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>杭州酒家</strong>：传统做法<br>• <strong>楼外楼</strong>：宴席前菜<br>• <strong>知味观</strong>：连锁</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 人均 25-40 元<br>• 蘸甜面酱或番茄酱<br>• 现炸最好吃</p></div>", color: "#0ea5e9" },
          { name: "油焖春笋", desc: "3-4 月时令·临安天目笋", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">油焖春笋是春季时令杭帮菜，临安天目山春笋 + 油焖 + 冰糖，鲜嫩脆甜。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>「尝鲜无不道春笋」，杭州春季必尝。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 春笋切块<br>• 油煸至微黄<br>• 酱油 + 冰糖 + 绍酒<br>• 收汁出锅</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>楼外楼</strong>：临安天目笋<br>• <strong>杭州酒家</strong>：性价比<br>• <strong>外婆家</strong>：连锁</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 3-4 月春笋季最佳<br>• 配米饭<br>• 人均 25-50 元</p></div>", color: "#14b8a6" },
          { name: "虾爆鳝面", desc: "奎元馆百年招牌", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">虾爆鳝面是奎元馆百年招牌面，鲜活河虾 + 黄鳝 + 碱水面，三爆三炒，鲜美至极。</p><div class=\"guide-block\"><h4>📖 典故</h4><p>奎元馆 1867 年创制，从一碗面做到百年老字号。</p></div><div class=\"guide-block\"><h4>🍳 做法</h4><p>• 河虾剥仁，黄鳝切段<br>• 油锅爆炒鳝段，出锅<br>• 虾仁同炒<br>• 高汤煮面，浇头同煮</p></div><div class=\"guide-block\"><h4>📍 必吃店</h4><p>• <strong>奎元馆</strong>：解放路总店<br>• <strong>慧娟面馆</strong>：性价比<br>• <strong>状元馆</strong>：连锁</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• 人均 35-60 元<br>• 早茶好选择<br>• 6-9 月黄鳝最肥</p></div>", color: "#a855f7" }
        ]
      },
      {
        id: "museumguide", name: "博物馆深度", icon: "🏛️",
        items: [
          { name: "浙江省博物馆·镇馆之宝", desc: "之江馆 + 孤山馆·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">浙江省博物馆是浙江省最大综合性博物馆，有之江新馆 + 孤山馆区。镇馆之宝三层楼都看不完。</p><div class=\"guide-block\"><h4>🏛️ 镇馆之宝</h4><p>• <strong>良渚文化玉琮</strong>：5000 年文明实证<br>• <strong>战国越王州句剑</strong>：吴越国宝<br>• <strong>五代吴越国鎏金阿育王塔</strong>：雷峰塔地宫出土<br>• <strong>北宋彩塑泥人</strong>：北宋风俗<br>• <strong>元赵孟頫《吴兴赋》</strong>：书法名作</p></div><div class=\"guide-block\"><h4>📍 馆区</h4><p>• <strong>之江馆</strong>：新馆，2023 年开，规模最大<br>• <strong>孤山馆</strong>：西湖边老馆，江南园林式</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 之江馆全程 4-6 小时<br>• 孤山馆 2 小时<br>• 周一闭馆</p></div>", color: "#ef4444" },
          { name: "良渚博物院·世界遗产", desc: "5000 年文明·余杭", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">良渚博物院是世界遗产良渚古城遗址的展示窗口，由建筑大师戴卫·奇普菲尔德设计。展示 5000 年中华文明实证。</p><div class=\"guide-block\"><h4>🏛️ 镇馆之宝</h4><p>• <strong>玉琮王</strong>：良渚最大玉琮<br>• <strong>玉钺</strong>：王权象征<br>• <strong>玉璧</strong>：礼器<br>• <strong>神徽</strong>：良渚人图腾</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>余杭区良渚街道美丽洲路 1 号</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 周一闭馆<br>• 全程 2-3 小时<br>• 配合良渚古城遗址公园一日游</p></div>", color: "#f59e0b" },
          { name: "中国丝绸博物馆·世界级", desc: "玉皇山路·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">中国丝绸博物馆是世界最大的丝绸专题博物馆，从蚕桑到织造，从古到今，从中国到世界，一馆看完。</p><div class=\"guide-block\"><h4>🏛️ 镇馆之宝</h4><p>• <strong>汉代丝织品</strong>：2000 年前的丝绸<br>• <strong>唐代绫罗</strong>：大唐盛世<br>• <strong>南宋缂丝</strong>：国宝级<br>• <strong>清代龙袍</strong>：皇室丝绸<br>• <strong>现代时装</strong>：当代设计</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区玉皇山路 73-1 号</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 2-3 小时<br>• 配合丝绸小镇 + 杭州陶瓷品艺术馆<br>• 周一闭馆</p></div>", color: "#10b981" },
          { name: "中国茶叶博物馆·双龙馆区", desc: "龙井 + 双峰·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">中国茶叶博物馆是世界唯一茶叶专题国家博物馆，分龙井馆 + 双峰馆。从茶树到茶具，从中国到世界，茶文化一站式。</p><div class=\"guide-block\"><h4>🏛️ 镇馆之宝</h4><p>• <strong>唐代茶具</strong>：陆羽《茶经》实物<br>• <strong>宋代茶具</strong>：点茶文化<br>• <strong>明清紫砂</strong>：宜兴名家<br>• <strong>各国茶器</strong>：世界茶文化</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>• <strong>龙井馆</strong>：龙井路 311 号<br>• <strong>双峰馆</strong>：双峰村龙井路 88 号</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 2 小时<br>• 配合龙井村品茶<br>• 周一闭馆</p></div>", color: "#3b82f6" },
          { name: "南宋官窑博物馆·陶瓷专题", desc: "南复路·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">南宋官窑博物馆是中国第一座陶瓷专题博物馆，建于南宋官窑遗址上，展示南宋皇室御用瓷器。</p><div class=\"guide-block\"><h4>🏛️ 镇馆之宝</h4><p>• <strong>南宋官窑瓷片</strong>：御用碎片<br>• <strong>修复瓷器</strong>：完整复原<br>• <strong>窑炉遗址</strong>：原址保护<br>• <strong>作坊遗址</strong>：完整工序</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区南复路 60 号</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 1-2 小时<br>• 地铁 4 号线水澄桥站<br>• 周一闭馆</p></div>", color: "#8b5cf6" },
          { name: "杭州博物馆·吴山总馆", desc: "吴山广场·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">杭州博物馆是杭州市属综合性博物馆，展示杭州 8000 年文明史 + 2229 年建城史。吴山总馆 + 宋代分馆。</p><div class=\"guide-block\"><h4>🏛️ 镇馆之宝</h4><p>• <strong>战国水晶杯</strong>：禁止出境文物<br>• <strong>五代吴越国金银舍利塔</strong>：雷峰塔出土<br>• <strong>南宋临安城复原模型</strong>：古都风貌<br>• <strong>明清杭州书画</strong>：江南文脉</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>上城区粮道山 18 号（吴山广场旁）</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 2 小时<br>• 配合河坊街、吴山一日游<br>• 周一闭馆</p></div>", color: "#ec4899" },
          { name: "京杭大运河博物馆·运河文化", desc: "拱宸桥·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">中国京杭大运河博物馆位于拱宸桥畔，全面展示运河 2500 年历史 + 杭州段文化。</p><div class=\"guide-block\"><h4>🏛️ 重点</h4><p>• <strong>运河沙盘</strong>：全景模型<br>• <strong>漕运文物</strong>：船工用品<br>• <strong>运河民俗</strong>：船工生活<br>• <strong>拱宸桥历史</strong>：桥的千年</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>拱墅区金华路 34 号（拱宸桥旁）</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 1-2 小时<br>• 配合拱宸桥 + 桥西历史街区游<br>• 周一闭馆</p></div>", color: "#06b6d4" },
          { name: "中国动漫博物馆·国漫之光", desc: "白马湖·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">中国动漫博物馆是中国第一座国家级动漫博物馆，位于白马湖，展示中国动漫百年史。</p><div class=\"guide-block\"><h4>🏛️ 重点</h4><p>• <strong>中国动漫百年</strong>：从万氏兄弟到现在<br>• <strong>水墨动画</strong>：上海美影厂<br>• <strong>日本动漫</strong>：手冢治虫、宫崎骏<br>• <strong>当代国漫</strong>：哪吒、姜子牙</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>滨江区白马湖路 375 号</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 2 小时<br>• 亲子首选<br>• 周一闭馆</p></div>", color: "#14b8a6" },
          { name: "浙江自然博物馆·恐龙化石", desc: "西湖文化广场·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">浙江自然博物馆是浙江省最大自然类博物馆，恐龙化石、动物标本、地球科学，亲子必去。</p><div class=\"guide-block\"><h4>🏛️ 重点</h4><p>• <strong>恐龙化石</strong>：浙江吉兰泰龙、礼贤龙<br>• <strong>动物标本</strong>：全球动物<br>• <strong>地球科学</strong>：矿物、地质<br>• <strong>浙江自然</strong>：本省生态</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>下城区西湖文化广场 6 号</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 2-3 小时<br>• 亲子首选<br>• 配合西湖文化广场（科技馆、博物馆）<br>• 周一闭馆</p></div>", color: "#f97316" },
          { name: "中国湿地博物馆·西溪湿地", desc: "西溪·免费", detail: "<p style=\"color:var(--text-secondary);line-height:1.8;\">中国湿地博物馆位于西溪湿地内，展示湿地生态 + 西溪文化。</p><div class=\"guide-block\"><h4>🏛️ 重点</h4><p>• <strong>湿地生态</strong>：全球湿地<br>• <strong>西溪文化</strong>：杭州湿地<br>• <strong>鸟类标本</strong>：湿地生物<br>• <strong>湿地保护</strong>：环保教育</p></div><div class=\"guide-block\"><h4>📍 位置</h4><p>西湖区天目山路 518 号（西溪湿地内）</p></div><div class=\"guide-block\"><h4>💡 攻略</h4><p>• <strong>免费</strong>，需预约<br>• 全程 1-2 小时<br>• 配合西溪湿地游<br>• 周一闭馆</p></div>", color: "#a855f7" }
        ]
      },
      {
        id: "museum", name: "博物馆", icon: "🏛️",
        items: [
          { name: "浙江省博物馆", desc: "之江馆区", url: "https://www.zjmuseum.com.cn/", color: "#ef4444" },
          { name: "浙江美术馆", desc: "南山路", url: "https://www.zjam.org.cn/", color: "#f59e0b" },
          { name: "杭州博物馆", desc: "吴山广场", url: "https://hz-museum.cn/", color: "#10b981" },
          { name: "中国丝绸博物馆", desc: "玉皇山路", url: "https://www.chinasilkmuseum.com/", color: "#3b82f6" },
          { name: "中国茶叶博物馆", desc: "龙井路", url: "https://www.teamuseum.cn/", color: "#8b5cf6" },
          { name: "良渚博物院", desc: "世界遗产", url: "https://www.lzmuseum.cn/", color: "#ec4899" },
          { name: "运河博物馆", desc: "拱宸桥", url: "", detail: "<p><strong>中国京杭大运河博物馆</strong></p><p>位于拱宸桥畔，全面展示运河历史文化。</p><p>• 免费开放</p><p>• 周一闭馆</p><p>• 交通：地铁5号线大运河站</p>", color: "#06b6d4" },
          { name: "南宋官窑博物馆", desc: "南复路", detail: "<p><strong>南宋官窑博物馆</strong></p><p>位于南复路，中国第一座陶瓷专题博物馆。</p><p>• 免费开放</p><p>• 周一闭馆</p><p>• 交通：地铁4号线水澄桥站</p>", color: "#14b8a6" },
          { name: "刀剪剑博物馆", desc: "小河路", url: "https://www.hzacm.cn/", color: "#84cc16" },
          { name: "伞博物馆", desc: "小河路", detail: "<p><strong>中国伞博物馆</strong></p><p>位于小河路，展示中国伞文化。</p><p>• 免费开放</p><p>• 周一闭馆</p><p>• 与扇博物馆、刀剪剑博物馆相邻</p>", color: "#f97316" },
          { name: "扇博物馆", desc: "小河路", detail: "<p><strong>中国扇博物馆</strong></p><p>位于小河路，展示中国扇文化。</p><p>• 免费开放</p><p>• 周一闭馆</p><p>• 可体验制扇工艺</p>", color: "#a855f7" },
          { name: "西泠印社", desc: "孤山路", url: "", color: "#0ea5e9" },
          { name: "跨湖桥遗址博物馆", desc: "萧山·独木舟", detail: "<p><strong>跨湖桥遗址博物馆</strong></p><p>位于萧山，展示8000年前跨湖桥文化。</p><p>• 镇馆之宝：世界最早的独木舟</p><p>• 免费开放</p>", color: "#22c55e" },
          { name: "中国湿地博物馆", desc: "西溪湿地", detail: "<p><strong>中国湿地博物馆</strong></p><p>位于西溪湿地，国内首个湿地主题博物馆。</p><p>• 免费开放</p><p>• 周一闭馆</p>", color: "#06b6d4" },
          { name: "中国财税博物馆", desc: "吴山广场", detail: "<p><strong>中国财税博物馆</strong></p><p>位于吴山广场，展示中国财税历史。</p><p>• 免费开放</p><p>• 周一闭馆</p>", color: "#eab308" },
          { name: "中国动漫博物馆", desc: "滨江·白马湖", detail: "<p><strong>中国动漫博物馆</strong></p><p>位于滨江白马湖，国内最大的动漫主题博物馆。</p><p>• 免费开放，需预约</p><p>• 周一闭馆</p><p>• 互动体验丰富，适合亲子</p>", color: "#ec4899" },
          { name: "中国印学博物馆", desc: "孤山·西泠印社旁", detail: "<p><strong>中国印学博物馆</strong></p><p>位于孤山，西泠印社旁。</p><p>• 展示中国印章、篆刻艺术</p><p>• 免费开放</p>", color: "#8b5cf6" },
          { name: "浙江自然博物院", desc: "西湖文化广场", url: "https://www.zmnh.com/", color: "#10b981" },
          { name: "胡庆余堂中药博物馆", desc: "河坊街·国药文化", detail: "<p><strong>胡庆余堂中药博物馆</strong></p><p>位于河坊街，在胡庆余堂国药号内。</p><p>• 展示中药文化、制药工艺</p><p>• 门票：10元</p><p>• 可参观老药铺</p>", color: "#ef4444" },
          { name: "都锦生织锦博物馆", desc: "茅家埠·织锦艺术", detail: "<p><strong>都锦生织锦博物馆</strong></p><p>位于茅家埠，展示织锦艺术。</p><p>• 免费开放</p><p>• 可参观织锦工艺、购买丝绸制品</p>", color: "#f59e0b" }
        ]
      },
      {
        id: "coffee", name: "咖啡生活", icon: "☕",
        items: [
          { name: "西湖边咖啡馆", desc: "湖滨/断桥周边", detail: "<p><strong>西湖边咖啡馆</strong></p><p>• 湖滨银泰in77周边</p><p>• 断桥附近</p><p>• 南山路沿线</p><p>• 北山街（葛岭一带）</p><p style=\"color:var(--text-muted);font-size:13px;\">边喝咖啡边赏西湖，惬意十足</p>", color: "#ef4444" },
          { name: "南山路文艺", desc: "复古文艺咖啡馆", detail: "<p><strong>南山路文艺咖啡馆</strong></p><p>南山路是杭州文艺咖啡馆聚集地，紧邻中国美院。</p><p>• 复古文艺风格</p><p>• 常有艺术展览</p><p>• 梧桐树掩映</p>", color: "#f59e0b" },
          { name: "网红咖啡馆", desc: "探店指南", detail: "<p><strong>杭州网红咖啡馆</strong></p><p>• <strong>Peet's Coffee</strong>：精品咖啡</p><p>• <strong>%Arabica</strong>：日式极简</p><p>• <strong>Manner Coffee</strong>：高性价比</p><p>• <strong>Seesaw Coffee</strong>：创意咖啡</p><p>• <strong>铁手咖啡</strong>：本土品牌</p>", color: "#10b981" },
          { name: "社区咖啡馆", desc: "日常时光", detail: "<p><strong>社区咖啡馆</strong></p><p>杭州各社区都有不少精品独立咖啡馆，适合日常发呆。</p><p>• 青芝坞、馒头山、文三路等区域</p><p>• 人均30-50元</p>", color: "#3b82f6" },
          { name: "咖啡豆文化", desc: "烘焙体验", detail: "<p><strong>咖啡豆文化</strong></p><p>杭州有不少精品咖啡烘焙店，可体验咖啡豆烘焙。</p><p>• 单品手冲咖啡</p><p>• 意式浓缩</p><p>• 冷萃咖啡</p>", color: "#8b5cf6" },
          { name: "青芝坞", desc: "文艺小清新", detail: "<p><strong>青芝坞</strong></p><p>位于浙大玉泉校区旁，文艺小清新聚集地。</p><p>• 咖啡馆、民宿、餐厅</p><p>• 学生气息浓厚</p><p>• 价格亲民</p>", color: "#ec4899" },
          { name: "馒头山", desc: "老杭州风情", detail: "<p><strong>馒头山</strong></p><p>位于凤凰山脚下，老杭州风情。</p><p>• 老社区改造</p><p>• 咖啡馆、文创工作室</p><p>• 市井与文艺交融</p>", color: "#06b6d4" },
          { name: "滨江江景", desc: "钱塘江畔咖啡", detail: "<p><strong>滨江江景咖啡馆</strong></p><p>钱塘江南岸滨江，江景咖啡馆众多。</p><p>• 滨江星光大道周边</p><p>• 闻涛路沿线</p><p>• 可看钱塘江大桥、日落</p>", color: "#14b8a6" },
          { name: "未来科技城", desc: "互联网人聚集地", detail: "<p><strong>未来科技城咖啡馆</strong></p><p>余杭未来科技城，互联网人聚集地。</p><p>• 阿里巴巴、梦想小镇周边</p><p>• 互联网人常去的咖啡馆</p><p>• 创业氛围浓厚</p>", color: "#84cc16" },
          { name: "玉皇山路", desc: "幽静书吧", detail: "<p><strong>玉皇山路咖啡馆</strong></p><p>玉皇山脚下，幽静书吧集中。</p><p>• 远离喧嚣</p><p>• 适合看书、办公</p><p>• 自然环境好</p>", color: "#f97316" }
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
    // 同步切换搜一搜推广物料图（JS 主题切换不响应 prefers-color-scheme）
    var promoImg = $('.search-promo-img');
    if (promoImg) {
      promoImg.src = theme === 'dark'
        ? 'images/promo/search-box-green.jpg'
        : 'images/promo/search-box-white.jpg';
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('ihz-theme', state.theme);
    applyTheme(state.theme);
  }

  // ===== 渲染 =====
  function renderHotServices() {
    var grid = $('#hotGrid');
    if (!grid) return; // quick-nav 使用 inline onclick，无 #hotGrid 容器，直接跳过
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
      // 有URL的用<a>标签，浏览器原生处理跳转，不会被弹窗拦截
      if (item.url) {
        var safeUrl = item.url.indexOf('http://') === 0 ? 'https://' + item.url.substring(7) : item.url;
        return '<a class="sitem" href="' + safeUrl + '" rel="noopener noreferrer">' +
          '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
          '<div class="sinfo">' +
          '<div class="sname">' + item.name + '</div>' +
          '<div class="sdesc">' + item.desc + '</div>' +
          '</div>' +
          '<div class="sarrow">›</div>' +
          '</a>';
      }
      // 无URL的用<div>，交给handleClick处理action或detail弹窗
      return '<div class="sitem" data-action="' + (item.action || '') + '" data-url="">' +
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
      var item = r.item;
      var catBadge = ' <span class="scat">[' + r.cat + ']</span>';
      // 有URL的用<a>标签，浏览器原生处理跳转，不会被弹窗拦截
      if (item.url) {
        var safeUrl = item.url.indexOf('http://') === 0 ? 'https://' + item.url.substring(7) : item.url;
        return '<a class="sitem" href="' + safeUrl + '" rel="noopener noreferrer">' +
          '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
          '<div class="sinfo">' +
          '<div class="sname">' + item.name + catBadge + '</div>' +
          '<div class="sdesc">' + item.desc + '</div>' +
          '</div>' +
          '<div class="sarrow">›</div>' +
          '</a>';
      }
      // 无URL的用<div>，交给handleClick处理action或detail弹窗
      return '<div class="sitem" data-action="' + (item.action || '') + '" data-url="">' +
        '<div class="sicon">' + getServiceIcon(item.name) + '</div>' +
        '<div class="sinfo">' +
        '<div class="sname">' + item.name + catBadge + '</div>' +
        '<div class="sdesc">' + item.desc + '</div>' +
        '</div>' +
        '<div class="sarrow">›</div>' +
        '</div>';
    }).join('');
  }

  // ===== 事件绑定 =====
  function bindOn(sel, evt, handler) {
    var el = $(sel);
    if (el) el.addEventListener(evt, handler);
  }

  function bindEvents() {
    // quick-nav 使用 inline onclick，无需绑定 #hotGrid（避免 null 错误中断后续绑定）
    bindOn('#tabs', 'click', function (e) {
      var tab = e.target.closest('.tab');
      if (!tab) return;
      state.activeTab = tab.dataset.tab;
      state.searchQuery = '';
      var searchInput = $('#searchInput');
      if (searchInput) searchInput.value = '';
      $$('.tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderServices(state.activeTab);
    });

    bindOn('#serviceGrid', 'click', function (e) {
      var item = e.target.closest('.sitem');
      if (!item) return;
      // <a>标签由浏览器原生处理跳转，不拦截
      if (item.tagName === 'A') return;
      handleClick(item);
    });

    bindOn('#searchInput', 'input', function (e) {
      globalSearch(e.target.value);
    });

    bindOn('#hotKeywords', 'click', function (e) {
      var tag = e.target.closest('.hk-tag');
      if (!tag) return;
      var kw = tag.dataset.kw;
      var searchInput = $('#searchInput');
      if (searchInput) searchInput.value = kw;
      globalSearch(kw);
    });

    bindOn('#themeBtn', 'click', toggleTheme);

    // 频道入口点击：跳转到频道专题页 channel.html#xxx
    $$('.channel-item').forEach(function (item) {
      item.addEventListener('click', function () {
        var channel = this.dataset.channel;
        var matchedCat = DATA.categories.find(function (c) { return c.id === channel; });
        if (matchedCat) {
          // 跳转到频道专题页
          location.href = 'channel.html#' + channel;
        } else {
          showToast('「' + (this.querySelector('.ch-name') ? this.querySelector('.ch-name').textContent : channel) + '」专题页开发中');
        }
      });
    });

    bindOn('#modalClose', 'click', closeModal);
    bindOn('#modalOverlay', 'click', function (e) {
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

    // 资讯 Banner 轮播
    initNewsBanner();
  }

  // ===== 资讯 Banner 轮播 =====
  function initNewsBanner() {
    var banner = $('#newsBanner');
    if (!banner) return;
    var items = banner.querySelectorAll('.news-item');
    if (items.length <= 1) return;
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % items.length;
      items.forEach(function (el, i) {
        el.style.display = i === idx ? 'flex' : 'none';
      });
    }, 4000);
  }

  function openUrl(url) {
    // 公众号/微信内嵌浏览器场景：当前页跳转，用户按"<"返回键回 iHangzhou
    // http 自动升级 https（微信强制https，否则打不开）
    if (url && url.indexOf('http://') === 0) {
      url = 'https://' + url.substring(7);
    }
    window.location.href = url;
  }

  function handleClick(el) {
    var action = el.dataset.action;
    var url = el.dataset.url;
    if (action) { handleAction(action); }
    else if (url) { openUrl(url); }
    else {
      // 无外链也无action，显示服务详情（服务卡片结构）
      var nameEl = el.querySelector('.sname');
      var descEl = el.querySelector('.sdesc');
      if (nameEl) {
        var name = nameEl.textContent.replace(/\s*\[.*?\]\s*$/, '').trim();
        var desc = descEl ? descEl.textContent : '';
        var item = null;
        var catName = '';
        // 在DATA中查找对应服务以获取detail
        DATA.categories.forEach(function(c){
          c.items.forEach(function(it){
            if(it.name === name) { item = it; catName = c.name; }
          });
        });
        var body = '<div style="padding:16px;line-height:1.8;font-size:14px;">';
        // 1. 简介/详情
        if (item && item.detail) {
          body += item.detail;
        } else {
          body += '<p style="color:var(--text-secondary);">' + desc + '</p>';
        }
        body += '</div>';
        // 2. 官方办理入口（通用）—— 当前页跳转，按返回键回 iHangzhou
        body += '<div style="margin-top:16px;padding:12px;background:var(--bg);border-radius:10px;">' +
          '<div style="font-size:13px;font-weight:600;margin-bottom:10px;color:var(--text);">🏛️ 官方办理入口</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
          '<a href="https://www.zjzwfw.gov.cn/" rel="noopener" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">浙里办<br><span style="font-size:11px;color:var(--text-muted);">Web</span></a>' +
          '<a href="https://app.gjzwfw.gov.cn/zhejiang-app/" rel="noopener" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">支付宝<br><span style="font-size:11px;color:var(--text-muted);">小程序</span></a>' +
          '<a href="tel:12345" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">12345<br><span style="font-size:11px;color:var(--text-muted);">市长热线</span></a>' +
          '<a href="https://www.hangzhou.gov.cn/" rel="noopener" style="padding:10px;background:var(--surface);border-radius:8px;text-align:center;text-decoration:none;color:inherit;font-size:13px;">杭州政务<br><span style="font-size:11px;color:var(--text-muted);">官网</span></a>' +
          '</div></div>';
        // 3. 相关推荐
        if (item && catName) {
          var related = [];
          DATA.categories.forEach(function(c){
            if (c.name === catName) {
              c.items.forEach(function(it){
                if (it.name !== name && related.length < 4) related.push(it);
              });
            }
          });
          if (related.length) {
            body += '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:10px;">' +
              '<div style="font-size:13px;font-weight:600;margin-bottom:10px;color:var(--text);">🔗 相关推荐</div>';
            related.forEach(function(r){
              var rSafe = r.url && r.url.indexOf('http://') === 0 ? 'https://' + r.url.substring(7) : r.url;
              body += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);">' +
                '<span style="font-size:13px;">' + r.name + '</span>' +
                (r.url ? '<a href="' + rSafe + '" rel="noopener" style="color:var(--primary);font-size:12px;text-decoration:none;">前往 →</a>' : '<span style="font-size:12px;color:var(--text-muted);">详情</span>') +
                '</div>';
            });
            body += '</div>';
          }
        }
        openModal('📌 ' + name, body);
      }
    }
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
	case 'hospital': showHospital(); break;
	case 'metro': showMetro(); break;
      default: showToast('功能开发中');
    }
  }

  function showXianxing() {
    openModal('🚗 杭州限行查询', buildXianxingModal());
  }

  // 共享 getter：限行数据（同步）
  function getXianxingData() {
    var now = new Date();
    var dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var today = dayNames[now.getDay()];
    var todayRule = DATA.xianxingRule.rules.find(function (r) { return r.day === today; });
    return {
      dateStr: now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日 ' + today,
      tail: todayRule ? todayRule.tail : '不限行',
      isWeekend: now.getDay() === 0 || now.getDay() === 6,
      area: DATA.xianxingRule.area,
      rules: DATA.xianxingRule.rules,
      today: today
    };
  }

  // 用于 index.html 直接调用的限行弹窗
  function buildXianxingModal() {
    var d = getXianxingData();
    return '<div class="xx-today" style="background:' + (d.isWeekend ? 'linear-gradient(135deg,#27ae60,#1e8449)' : '') + '">' +
      '<div class="xx-date">' + d.dateStr + '</div>' +
      '<div class="xx-tail">' + d.tail + '</div>' +
      '<div class="xx-label">' + (d.isWeekend ? '周末不限行' : '今日限行尾号') + '</div>' +
      '</div>' +
      '<table class="xx-table"><thead><tr><th>星期</th><th>限行尾号</th></tr></thead><tbody>' +
      d.rules.map(function (r) {
        return '<tr class="' + (r.day === d.today ? 'today' : '') + '"><td>' + r.day + '</td><td>' + r.tail + '</td></tr>';
      }).join('') +
      '</tbody></table>' +
      '<div class="xx-note"><strong>⏰ 时间：</strong>工作日 7:00-9:00、16:30-18:30<br>' +
      '<strong>📍 区域：</strong>' + d.area + '<br>' +
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

  // wttr.in 英文天气描述→中文映射表
  var WEATHER_ZH = {
    'Sunny': '☀️ 晴', 'Clear': '☀️ 晴', 'Clear ': '☀️ 晴',
    'Partly Cloudy': '⛅ 多云', 'Partly Cloudy ': '⛅ 多云',
    'Cloudy': '☁️ 多云', 'Cloudy ': '☁️ 多云',
    'Overcast': '☁️ 阴', 'Overcast ': '☁️ 阴',
    'Mist': '🌫️ 薄雾', 'Mist ': '🌫️ 薄雾',
    'Fog': '🌫️ 雾', 'Fog ': '🌫️ 雾', 'Foggy': '🌫️ 雾',
    'Light drizzle': '🌦️ 小毛雨', 'Light drizzle ': '🌦️ 小毛雨',
    'Patchy light rain': '🌦️ 局部小雨', 'Patchy light rain ': '🌦️ 局部小雨',
    'Patchy rain nearby': '🌦️ 局部小雨', 'Patchy rain nearby ': '🌦️ 局部小雨',
    'Light rain': '🌦️ 小雨', 'Light rain ': '🌦️ 小雨',
    'Light rain shower': '🌦️ 阵雨', 'Light rain shower ': '🌦️ 阵雨',
    'Moderate rain': '🌧️ 中雨', 'Moderate rain ': '🌧️ 中雨',
    'Moderate rain at times': '🌧️ 间歇中雨', 'Moderate rain at times ': '🌧️ 间歇中雨',
    'Heavy rain': '🌧️ 大雨', 'Heavy rain ': '🌧️ 大雨',
    'Heavy rain at times': '🌧️ 间歇大雨', 'Heavy rain at times ': '🌧️ 间歇大雨',
    'Torrential rain shower': '⛈️ 暴雨', 'Torrential rain shower ': '⛈️ 暴雨',
    'Patchy light snow': '🌨️ 局部小雪', 'Patchy light snow ': '🌨️ 局部小雪',
    'Patchy snow nearby': '🌨️ 局部小雪', 'Patchy snow nearby ': '🌨️ 局部小雪',
    'Light snow': '🌨️ 小雪', 'Light snow ': '🌨️ 小雪',
    'Light snow showers': '🌨️ 阵雪', 'Light snow showers ': '🌨️ 阵雪',
    'Moderate snow': '❄️ 中雪', 'Moderate snow ': '❄️ 中雪',
    'Heavy snow': '❄️ 大雪', 'Heavy snow ': '❄️ 大雪',
    'Blizzard': '🌨️ 暴风雪', 'Blizzard ': '🌨️ 暴风雪',
    'Patchy freezing rain nearby': '🌨️ 局部冻雨',
    'Thundery outbreaks nearby': '⛈️ 局部雷阵雨', 'Thundery outbreaks nearby ': '⛈️ 局部雷阵雨',
    'Thunder': '⛈️ 雷阵雨', 'Thunder ': '⛈️ 雷阵雨',
    'Thunderstorm': '⛈️ 雷暴',
    'Hail': '🌨️ 冰雹', 'Hail ': '🌨️ 冰雹',
    'Smoke': '🌫️ 烟雾', 'Smoke ': '🌫️ 烟雾', 'Smoky haze': '🌫️ 烟霾', 'Smoky haze ': '🌫️ 烟霾',
    'Haze': '🌫️ 霾', 'Haze ': '🌫️ 霾',
    'Sandstorm': '🌪️ 沙尘暴', 'Sandstorm ': '🌪️ 沙尘暴',
    'Duststorm': '🌪️ 扬沙', 'Duststorm ': '🌪️ 扬沙'
  };
  function weatherZh(desc) {
    if (!desc) return '—';
    var d = desc.trim();
    if (/[\u4e00-\u9fa5]/.test(d)) return d; // 已含中文
    return WEATHER_ZH[d] || (d.replace(/^Patchy\s+/i, '局部').replace(/^Light\s+/i, '小').replace(/^Moderate\s+/i, '中').replace(/^Heavy\s+/i, '大'));
  }

  function showWeather() {
    openModal('🌤️ 杭州天气',
      '<div id="weatherBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">⛅</div><p style="color:var(--text-muted);margin-top:8px;">正在获取天气...</p></div></div>' +
      '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
      '<strong>生活提示：</strong><br>杭州属亚热带季风气候，四季分明<br>梅雨季节（6月中-7月上）多雨潮湿<br>最佳旅游：3-5月、9-11月</div>'
    );
    getWeatherData().then(function (d) {
      if (!d) {
        $('#weatherBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">天气获取失败，请稍后重试</div>';
        return;
      }
      var html = '<div style="text-align:center;padding:12px 0 16px;">' +
        '<div style="font-size:48px;font-weight:800;color:var(--primary);">' + d.temp + '°C</div>' +
        '<div style="font-size:16px;margin:6px 0;">' + d.desc + '</div>' +
        '<div style="font-size:13px;color:var(--text-muted);">体感' + d.feels + '°C · 湿度' + d.humidity + '% · 风速' + d.wind + 'km/h</div>' +
        '</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:8px;">';
      d.forecast.forEach(function (f) {
        html += '<div style="text-align:center;padding:10px 4px;background:var(--bg);border-radius:8px;">' +
          '<div style="font-size:12px;color:var(--text-muted);">' + f.label + '</div>' +
          '<div style="font-size:16px;margin:4px 0;">' + (f.desc || '—') + '</div>' +
          '<div style="font-size:12px;">' + f.min + '°~' + f.max + '</div></div>';
      });
      html += '</div><p class="modal-tip">数据来源：wttr.in · 更新：' + (d.updated || '实时') + '</p>';
      $('#weatherBox').innerHTML = html;
    });
  }

  // 共享 getter：天气数据（异步 Promise，失败 resolve null）
  function getWeatherData() {
    return new Promise(function (resolve) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://wttr.in/Hangzhou?format=j1&lang=zh', true);
        xhr.timeout = 8000;
        xhr.onload = function () {
          if (xhr.status === 200) {
            try {
              var data = JSON.parse(xhr.responseText);
              var cur = data.current_condition[0];
              var forecast = [];
              for (var i = 0; i < 3 && i < data.weather.length; i++) {
                var d = data.weather[i];
                forecast.push({
                  label: i === 0 ? '今天' : i === 1 ? '明天' : '后天',
                  min: d.mintempC, max: d.maxtempC,
                  desc: d.hourly[4] ? weatherZh(d.hourly[4].weatherDesc[0].value) : ''
                });
              }
              resolve({
                temp: cur.temp_C,
                desc: weatherZh(cur.weatherDesc[0].value),
                feels: cur.FeelsLikeC,
                humidity: cur.humidity,
                wind: cur.windspeedKmph,
                updated: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
                forecast: forecast
              });
            } catch (e) { resolve(null); }
          } else { resolve(null); }
        };
        xhr.onerror = function () { resolve(null); };
        xhr.ontimeout = function () { resolve(null); };
        xhr.send();
      } catch (e) { resolve(null); }
    });
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

  // ===== 工资计算器（打工人必备） =====
  function showSalaryCalc() {
    openModal('💰 工资计算器',
      '<div class="calc-form">' +
      '<div class="fg"><label>税前月薪（元）</label><input type="number" id="salaryInput" value="15000" min="0"></div>' +
      '<div class="fg"><label>公积金缴存比例</label><select id="gjjRate"><option value="0.12">12%（最高）</option><option value="0.10">10%</option><option value="0.08" selected>8%（最低）</option></select></div>' +
      '<div class="fg"><label>社保个人比例</label><select id="sbRate"><option value="0.105">10.5%（标准）</option><option value="0.115">11.5%</option></select></div>' +
      '<button class="btn btn-primary" onclick="window._calcSalary()">计算</button>' +
      '<div id="salaryResult"></div></div>' +
      '<div style="margin-top:12px;padding:12px;background:var(--bg-alt);border-radius:8px;font-size:12px;color:var(--text-secondary);">' +
      '<strong>💡 说明：</strong>杭州社保基数范围：3957-22584元<br>' +
      '公积金基数范围：2280-34470元<br>' +
      '个税起征点：5000元/月</div>'
    );
    window._calcSalary = function() {
      var salary = parseFloat($('#salaryInput').value) || 0;
      var gjjRate = parseFloat($('#gjjRate').value);
      var sbRate = parseFloat($('#sbRate').value);
      
      if (salary <= 0) { showToast('请输入正确工资'); return; }
      
      // 社保计算（简化版）
      var sbBase = Math.min(Math.max(salary, 3957), 22584);
      var sbPersonal = sbBase * sbRate;
      
      // 公积金计算
      var gjjBase = Math.min(Math.max(salary, 2280), 34470);
      var gjjPersonal = gjjBase * gjjRate;
      
      // 个税计算
      var taxable = salary - 5000 - sbPersonal - gjjPersonal;
      var tax = 0;
      if (taxable > 0) {
        if (taxable <= 3000) tax = taxable * 0.03;
        else if (taxable <= 12000) tax = taxable * 0.10 - 210;
        else if (taxable <= 25000) tax = taxable * 0.20 - 1410;
        else if (taxable <= 35000) tax = taxable * 0.25 - 2660;
        else if (taxable <= 55000) tax = taxable * 0.30 - 4410;
        else if (taxable <= 80000) tax = taxable * 0.35 - 7160;
        else tax = taxable * 0.45 - 15160;
      }
      
      var netSalary = salary - sbPersonal - gjjPersonal - tax;
      
      $('#salaryResult').innerHTML = 
        '<div class="calc-result" style="background:linear-gradient(135deg,#10b981,#059669);">' +
        '<div class="cr-amount">¥' + netSalary.toFixed(2) + '</div>' +
        '<div class="cr-label">税后月薪</div></div>' +
        '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;">' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);">' +
        '<span>税前工资</span><span style="font-weight:600;">¥' + salary.toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>养老保险 (8%)</span><span>-¥' + (sbBase * 0.08).toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>医疗保险 (2%)</span><span>-¥' + (sbBase * 0.02).toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>失业保险 (0.5%)</span><span>-¥' + (sbBase * 0.005).toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#10b981;">' +
        '<span>公积金 (' + (gjjRate*100) + '%)</span><span>-¥' + gjjPersonal.toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);color:#ef4444;">' +
        '<span>个税</span><span>-¥' + tax.toFixed(2) + '</span></div>' +
        '<div style="display:flex;justify-content:space-between;padding:8px 0;color:#10b981;font-weight:700;">' +
        '<span>税后到手</span><span>¥' + netSalary.toFixed(2) + '</span></div></div>' +
        '<div style="margin-top:12px;padding:12px;background:var(--accent);border-radius:8px;color:#fff;font-size:13px;">' +
        '<strong>📊 年收入估算：</strong><br>' +
        '税后年薪约 ¥' + (netSalary * 12).toFixed(0) + '（不含年终奖）<br>' +
        '公积金年缴 ¥' + (gjjPersonal * 12).toFixed(0) + '（可提取！）</div>';
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
    var prices = getYoujiaData();
    var html = '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">' +
      Object.keys(prices).filter(function(k){return k!=='updated';}).map(function (k) {
        return '<div style="text-align:center;padding:16px;background:var(--bg);border-radius:10px;border:1px solid var(--border);">' +
          '<div style="font-size:13px;color:var(--text-muted);">' + k + '</div>' +
          '<div style="font-size:24px;font-weight:800;color:var(--accent);margin:4px 0;">¥' + prices[k] + '</div>' +
          '<div style="font-size:11px;color:var(--text-muted);">元/升</div></div>';
      }).join('') +
      '</div><p class="modal-tip">' + prices.updated + ' · 浙江省成品油参考价，以加油站实际标价为准</p>' +
      '<div style="margin-top:10px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
      '<strong>💡 省钱：</strong>油价每10个工作日调整一次，调价前加油更划算；民营油站通常便宜0.3-0.8元/升</div>';
    openModal('⛽ 浙江油价', html);
  }

  // 共享 getter：油价数据（同步静态参考价）
  function getYoujiaData() {
    return { '92号': '7.54', '95号': '8.03', '98号': '8.82', '0号柴油': '7.23', updated: '参考价' };
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

  // ===== 金价查询 =====
  function showGold() {
    openModal('💰 实时金价',
      '<div id="goldBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">💰</div><p style="color:var(--text-muted);">正在获取金价...</p></div></div>'
    );
    getGoldData().then(function (result) {
      if (!result) {
        $('#goldBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">金价获取失败，请稍后重试</div>';
        return;
      }
      var g = result.gold;
      var html = '<div style="padding:16px 0;">' +
        '<div style="text-align:center;padding:16px;background:var(--bg);border-radius:12px;margin-bottom:12px;">' +
        '<div style="font-size:12px;color:var(--text-muted);">国际金价（XAU）</div>' +
        '<div style="font-size:32px;font-weight:800;color:var(--accent);margin:6px 0;">$' + g.usdPerOz + '/oz</div>' +
        '<div style="font-size:14px;color:var(--text-secondary);">≈ ¥' + g.cnyPerOz + '/盎司</div></div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">' +
        '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
        '<div style="font-size:12px;color:var(--text-muted);">人民币/克</div>' +
        '<div style="font-size:22px;font-weight:700;color:var(--primary);margin:4px 0;">¥' + g.cnyPerGram + '</div></div>' +
        '<div style="padding:16px;background:var(--bg);border-radius:10px;text-align:center;">' +
        '<div style="font-size:12px;color:var(--text-muted);">人民币/盎司</div>' +
        '<div style="font-size:22px;font-weight:700;color:var(--primary);margin:4px 0;">¥' + g.cnyPerOz + '</div></div>' +
        '</div>' +
        '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
        '<strong>💡 说明：</strong>1金衡盎司=31.1035克；金价实时波动，以金店/银行实际挂牌价为准</div>' +
        '<p class="modal-tip">更新时间：' + (result.updated || new Date().toUTCString()) + '</p></div>';
      $('#goldBox').innerHTML = html;
    });
  }

  // 共享 getter：金价数据（异步 Promise，失败 resolve null）
  function getGoldData() {
    return fetch('/api/gold')
      .then(function (r) { return r.json(); })
      .then(function (data) { return (data && data.gold) ? data : null; })
      .catch(function () { return null; });
  }

  // ===== 杭州医院目录查询 =====
  function showHospital() {
    openModal('🏥 杭州医院目录',
      '<div id="hospitalBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">🏥</div><p style="color:var(--text-muted);">正在加载医院目录...</p></div></div>'
    );
    fetch('/api/hospital')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || !data.hospitals) throw new Error('no data');
        var regUrl = data.regPlatform || 'https://zyygh.com/';
        var html = '<div style="padding:8px 0 12px;">' +
          '<a href="' + regUrl + '" target="_blank" rel="noopener" style="display:block;padding:14px;background:linear-gradient(135deg,var(--primary),#0284c7);color:#fff;border-radius:12px;text-align:center;text-decoration:none;font-weight:600;font-size:14px;margin-bottom:12px;">🏥 浙江预约挂号平台 →</a>';
        data.hospitals.forEach(function (h) {
          html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;border-left:4px solid var(--primary);">' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">' +
              '<div style="flex:1;">' +
                '<div style="font-weight:700;font-size:14px;color:var(--text);">' + h.name + '</div>' +
                '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">' + h.alias + ' · ' + h.level + ' · ' + h.area + '</div>' +
              '</div>' +
              '<span style="padding:2px 8px;background:var(--bg-alt);border-radius:6px;font-size:11px;color:var(--primary);white-space:nowrap;">' + (h.key ? h.key[0] : '') + '</span>' +
            '</div>' +
            '<div style="font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.6;">' +
              '<strong>📍 地址：</strong>' + h.address + '<br>' +
              '<strong>☎️ 电话：</strong><a href="tel:' + h.phone + '" style="color:inherit;text-decoration:none;">' + h.phone + '</a>' +
            '</div>' +
            '<a href="' + (h.regUrl || regUrl) + '" target="_blank" rel="noopener" style="display:inline-block;margin-top:8px;padding:6px 12px;background:var(--bg-alt);color:var(--primary);border-radius:6px;text-decoration:none;font-size:12px;font-weight:600;">预约挂号 →</a>' +
          '</div>';
        });
        html += '<p class="modal-tip">数据更新：' + (data.updated || '近期') + ' · 共 ' + data.hospitals.length + ' 家</p></div>';
        $('#hospitalBox').innerHTML = html;
      })
      .catch(function () {
        $('#hospitalBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">医院目录加载失败，<a href="https://zyygh.com/" target="_blank" rel="noopener" style="color:var(--primary);">点此直接访问挂号平台</a></div>';
      });
  }

  // ===== 杭州小客车摇号/竞价结果查询 =====
  function showYaohao() {
    openModal('🚗 杭州小客车摇号',
      '<div id="yaohaoBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">🚗</div><p style="color:var(--text-muted);">正在获取最新公告...</p></div></div>'
    );
    fetch('/api/yaohao')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.notices) {
          var html = '<div style="padding:12px 0;">';
          html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">' +
            '<a href="' + (data.officialSite || 'https://hzxkctk.cn/') + '" rel="noopener" style="padding:14px;background:var(--bg);border-radius:10px;text-align:center;text-decoration:none;color:inherit;">' +
            '<div style="font-size:24px;">🏛️</div><div style="font-size:14px;font-weight:600;margin-top:4px;">官方网站</div></a>' +
            '<a href="' + (data.applySite || 'https://apply.hzxkctk.cn/') + '" rel="noopener" style="padding:14px;background:var(--bg);border-radius:10px;text-align:center;text-decoration:none;color:inherit;">' +
            '<div style="font-size:24px;">📝</div><div style="font-size:14px;font-weight:600;margin-top:4px;">申请/查询</div></a>' +
            '</div>';
          html += '<div style="font-size:14px;font-weight:600;margin-bottom:8px;">📢 最新公告</div>';
          data.notices.forEach(function (n) {
            var nSafe = n.url && n.url.indexOf('http://') === 0 ? 'https://' + n.url.substring(7) : n.url;
            html += '<a href="' + nSafe + '" rel="noopener" style="display:block;padding:12px;background:var(--bg);border-radius:8px;margin-bottom:6px;text-decoration:none;color:inherit;">' +
              '<div style="font-size:14px;font-weight:500;">' + n.title + '</div>' +
              '<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">点击查看详情 →</div></a>';
          });
          html += '<div style="margin-top:12px;padding:12px;background:var(--bg);border-radius:8px;font-size:13px;color:var(--text-secondary);">' +
            '<strong>💡 提醒：</strong>每月25日公开摇号，每月26日组织竞价；指标配置每月1次</div>' +
            '<p class="modal-tip">数据来源：hzxkctk.cn</p></div>';
          $('#yaohaoBox').innerHTML = html;
        } else { throw new Error('no data'); }
      })
      .catch(function () {
        $('#yaohaoBox').innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);">数据获取失败，<a href="https://hzxkctk.cn/" rel="noopener" style="color:var(--primary);">点此直接访问官网</a></div>';
      });
  }

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
          '<span style="font-size:24px;font-weight:700;color:var(--primary);">3.0%</span></div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">2026年8月20日</div></div>' +
          '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;">' +
          '<span style="font-weight:600;">5年期以上LPR</span>' +
          '<span style="font-size:24px;font-weight:700;color:var(--primary);">3.5%</span></div>' +
          '<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">2026年8月20日</div></div>' +
          '<p class="modal-tip">数据来源：中国人民银行，仅供参考</p></div>';
      });
  }

  // ===== 农历转换（1900-2100）=====
  var LUNAR_INFO = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
    0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
    0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
    0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
    0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
    0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
    0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
    0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
    0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
    0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
    0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
    0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
    0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
    0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
    0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
    0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
    0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
    0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
    0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
    0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
    0x0d520];
  function lunarYearDays(y) {
    var sum = 348;
    for (var i = 0x8000; i > 0x8; i >>= 1) sum += (LUNAR_INFO[y - 1900] & i) ? 1 : 0;
    return sum + leapDays(y);
  }
  function leapMonth(y) { return LUNAR_INFO[y - 1900] & 0xf; }
  function leapDays(y) {
    if (leapMonth(y)) return (LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29;
    return 0;
  }
  function monthDays(y, m) { return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29; }
  function getLunar(date) {
    var offset = Math.floor((date - new Date(1900, 0, 31)) / 86400000);
    var y, temp = 0;
    for (y = 1900; y < 2101 && offset > 0; y++) { temp = lunarYearDays(y); offset -= temp; }
    if (offset < 0) { offset += temp; y--; }
    var leap = leapMonth(y), isLeap = false;
    var m;
    for (m = 1; m < 13 && offset > 0; m++) {
      if (leap > 0 && m === leap + 1 && !isLeap) { --m; isLeap = true; temp = leapDays(y); }
      else { temp = monthDays(y, m); }
      if (isLeap && m === leap + 1) isLeap = false;
      offset -= temp;
    }
    if (offset === 0 && leap > 0 && m === leap + 1) {
      if (isLeap) isLeap = false; else { isLeap = true; --m; }
    }
    if (offset < 0) { offset += temp; --m; }
    return { year: y, month: m, day: offset + 1, isLeap: isLeap };
  }

  // ===== 钱塘江观潮点（下游→上游，offset为相对盐官的分钟延迟）=====
  var TIDE_POINTS = [
    { name: '海宁盐官', desc: '一线潮·最佳观赏点', offset: 0 },
    { name: '老盐仓', desc: '回头潮', offset: 6 },
    { name: '萧山美女坝', desc: '美女二回头', offset: 20 },
    { name: '下沙七格', desc: '冲天潮', offset: 30 },
    { name: '三堡船闸', desc: '', offset: 38 },
    { name: '钱江新城城市阳台', desc: '', offset: 42 },
    { name: '九溪', desc: '', offset: 52 },
    { name: '珊瑚沙', desc: '', offset: 56 },
    { name: '闻堰', desc: '', offset: 62 },
    { name: '袁浦', desc: '', offset: 70 }
  ];

  // 根据农历日计算盐官站两次高潮时间（分钟），并返回大潮等级
  function calcTideTimes(lunarDay) {
    // 民间算法：农历初一盐官约12:00高潮，每天推迟约48分钟
    var t1 = (720 + (lunarDay - 1) * 48) % 1440;
    var t2 = (t1 + 744) % 1440; // 间隔12h24m
    // 区分日潮(6:00-18:00)和夜潮
    var dayTide, nightTide;
    if (t1 >= 360 && t1 < 1080) { dayTide = t1; nightTide = t2; }
    else { dayTide = t2; nightTide = t1; }
    // 大潮等级：距朔(初一)望(十五)越近潮越大
    var distToShuo = Math.min(lunarDay - 1, 30 - lunarDay + 1);
    var distToWang = Math.abs(lunarDay - 15);
    var dist = Math.min(distToShuo, distToWang);
    var level;
    if (dist <= 3) level = { label: '大潮', color: '#ef4444' };
    else if (dist <= 6) level = { label: '中潮', color: '#f59e0b' };
    else level = { label: '小潮', color: '#10b981' };
    return { day: dayTide, night: nightTide, level: level };
  }
  function fmtTime(min) {
    var h = Math.floor(min / 60), m = min % 60;
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  // ===== 钱塘江潮汐查询 =====
  function showTide(dateStr) {
    var date = dateStr ? new Date(dateStr + 'T00:00:00') : new Date();
    var lunar = getLunar(date);
    var tide = calcTideTimes(lunar.day);
    var lunarMonths = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
    var lunarDays = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
    var lunarStr = '农历' + lunarMonths[lunar.month - 1] + '月' + lunarDays[lunar.day - 1];

    var html = '<div style="padding:12px 0;">';
    html += '<div style="text-align:center;margin-bottom:12px;">' +
      '<div style="font-size:18px;font-weight:700;">' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日</div>' +
      '<div style="font-size:13px;color:var(--text-muted);margin-top:2px;">' + lunarStr +
      ' · <span style="color:' + tide.level.color + ';font-weight:600;">' + tide.level.label + '</span></div></div>';
    html += '<div style="margin-bottom:12px;"><input type="date" id="tideDate" value="' + date.toISOString().split('T')[0] + '" style="width:100%;padding:8px;border:1px solid var(--border);border-radius:8px;background:var(--bg);color:var(--text);" onchange="window.showTide(this.value)"></div>';

    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;font-size:12px;color:var(--text-muted);padding:0 8px;margin-bottom:4px;">' +
      '<div>观潮点</div><div style="text-align:center;">日潮</div><div style="text-align:center;">夜潮</div></div>';
    TIDE_POINTS.forEach(function(p) {
      var m = (tide.day + p.offset) % 1440;
      var e = (tide.night + p.offset) % 1440;
      html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;align-items:center;padding:10px 8px;background:var(--bg);border-radius:8px;margin-bottom:6px;">' +
        '<div><div style="font-weight:600;font-size:13px;">' + p.name + '</div>' +
        (p.desc ? '<div style="font-size:11px;color:var(--text-muted);">' + p.desc + '</div>' : '') + '</div>' +
        '<div style="text-align:center;font-weight:700;color:var(--primary);">' + fmtTime(m) + '</div>' +
        '<div style="text-align:center;font-weight:700;color:#8b5cf6;">' + fmtTime(e) + '</div></div>';
    });

    html += '<div style="padding:12px;background:var(--accent);border-radius:10px;color:#fff;margin-top:12px;font-size:13px;">' +
      '<strong>⚠️ 安全提醒</strong><br>观潮请在安全区域，切勿下堤。潮水凶猛，生命第一。</div>';
    html += '<p class="modal-tip">时间基于农历推算，受天气、风力、江道变化影响，仅供参考，请以现场实际情况为准</p></div>';

    if ($('#tideBox')) {
      $('#tideBox').innerHTML = html;
    } else {
      openModal('🌊 钱塘江潮汐预报', '<div id="tideBox">' + html + '</div>');
    }
  }

  // ===== 实时汇率 =====
  function showForex() {
    openModal('💱 实时汇率',
      '<div id="forexBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">💱</div><p style="color:var(--text-muted);">正在获取汇率...</p></div></div>'
    );
    // 优先调用本地 Vercel Serverless API，失败回退到公开 API，再失败用静态数据
    fetch('/api/forex')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.list && data.list.length) {
          var html = '<div style="padding:16px 0;">' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
          data.list.forEach(function(c) {
            var val = c.unit ? (c.rate * c.unit).toFixed(2) : (1 / c.rate).toFixed(4);
            var label = c.unit ? (c.unit + c.symbol + '=') : ('1' + c.symbol + '=');
            html += '<div style="padding:14px 10px;background:var(--bg);border-radius:10px;text-align:center;">' +
              '<div style="font-size:12px;color:var(--text-muted);">' + c.name + ' ' + c.code + '</div>' +
              '<div style="font-size:18px;font-weight:700;color:var(--primary);margin-top:4px;">' + label + val + '¥</div></div>';
          });
          html += '</div><p class="modal-tip">更新时间：' + (data.updated || new Date().toUTCString()) + '</p></div>';
          $('#forexBox').innerHTML = html;
        } else {
          throw new Error('no data');
        }
      })
      .catch(function() {
        // 备用静态数据（2026年9月参考）
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
    openModal('🚇 杭州地铁时刻表',
      '<div id="metroBox"><div style="text-align:center;padding:24px;"><div style="font-size:40px;">🚇</div><p style="color:var(--text-muted);">正在加载地铁时刻表...</p></div></div>'
    );
    // 备用静态数据（fetch 失败时回退）
    var fallbackLines = [
      {name: '1号线', color: '#EF8031', stations: '湘湖-萧山国际机场', first: '06:04', last: '22:50'},
      {name: '2号线', color: '#F00D0D', stations: '朝阳-良渚', first: '06:02', last: '22:48'},
      {name: '3号线', color: '#FFB81C', stations: '吴山前村-星桥', first: '06:03', last: '22:30'},
      {name: '4号线', color: '#008C42', stations: '浦沿-池华街', first: '06:05', last: '22:55'},
      {name: '5号线', color: '#BF7D00', stations: '金星-姑娘桥', first: '06:00', last: '22:30'},
      {name: '6号线', color: '#BF83EC', stations: '桂花西路-双浦', first: '06:08', last: '22:42'},
      {name: '7号线', color: '#1DAAE2', stations: '吴山广场-江东二路', first: '06:12', last: '22:56'},
      {name: '8号线', color: '#8E54ED', stations: '文海南路-南阳', first: '06:08', last: '22:32'},
      {name: '9号线', color: '#D07D1E', stations: '观音塘-龙安', first: '06:04', last: '22:32'},
      {name: '10号线', color: '#00B2A9', stations: '黄龙体育中心-逸盛路', first: '06:05', last: '22:35'},
      {name: '16号线', color: '#FF6B6B', stations: '九州街-临安广场', first: '06:10', last: '22:33'},
      {name: '19号线', color: '#6F73D2', stations: '苕溪-永盛路', first: '06:00', last: '23:15'}
    ];
    var renderMetro = function (lines, fare, source) {
      var html = '<div style="padding:12px 0;">';
      if (fare) {
        html += '<div style="padding:12px;background:linear-gradient(135deg,var(--primary),#0284c7);color:#fff;border-radius:10px;margin-bottom:12px;">' +
          '<div style="font-size:13px;opacity:0.9;">🚇 杭州地铁票价</div>' +
          '<div style="font-size:18px;font-weight:700;margin-top:4px;">起步 ' + fare.base + ' 元 · 最高 ' + fare.max + ' 元</div>' +
          '<div style="font-size:11px;opacity:0.85;margin-top:4px;line-height:1.5;">' + fare.rule + '</div></div>';
      }
      lines.forEach(function (line) {
        html += '<div style="padding:12px;background:var(--bg);border-radius:10px;margin-bottom:8px;border-left:4px solid ' + line.color + ';">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">' +
          '<span style="font-weight:700;font-size:14px;">' + line.name + '</span>' +
          '<span style="font-size:11px;color:var(--text-muted);flex:1;text-align:right;">' + line.stations + '</span></div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;font-size:12px;">' +
          '<div><span style="color:var(--text-muted);">首班</span> <span style="font-weight:600;">' + line.first + '</span></div>' +
          '<div><span style="color:var(--text-muted);">末班</span> <span style="font-weight:600;">' + line.last + '</span></div></div>' +
          (line.transfer ? '<div style="margin-top:6px;font-size:11px;color:var(--text-muted);">换乘：' + (line.transfer.join ? line.transfer.join(' / ') : line.transfer) + '</div>' : '') +
          '</div>';
      });
      html += '<p class="modal-tip">数据来源：' + (source || 'hzmetro.com') + '，以地铁公司公告为准</p></div>';
      $('#metroBox').innerHTML = html;
    };
    fetch('/api/metro')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.lines) renderMetro(data.lines, data.fare, data.source);
        else renderMetro(fallbackLines, null, '本地回退数据');
      })
      .catch(function () {
        renderMetro(fallbackLines, null, '本地回退数据');
      });
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

  // ===== 今日杭州实时信息流卡片 =====
  function renderTodayHangzhou() {
    var box = $('#todayHangzhou');
    if (!box) return;
    // 渲染骨架
    box.innerHTML =
      '<div class="th-card" id="thXianxing" onclick="openModal(\'🚗 今日限行\', buildXianxingModal())">' +
        '<div class="th-icon">🚗</div><div class="th-title">今日限行</div>' +
        '<div class="th-value">—</div><div class="th-sub">加载中</div></div>' +
      '<div class="th-card" id="thWeather" onclick="showWeather()">' +
        '<div class="th-icon">⛅</div><div class="th-title">今日天气</div>' +
        '<div class="th-value">—</div><div class="th-sub">加载中</div></div>' +
      '<div class="th-card" id="thYoujia" onclick="showYoujia()">' +
        '<div class="th-icon">⛽</div><div class="th-title">今日油价</div>' +
        '<div class="th-value">—</div><div class="th-sub">92/95/98</div></div>' +
      '<div class="th-card" id="thGold" onclick="showGold()">' +
        '<div class="th-icon">💰</div><div class="th-title">今日金价</div>' +
        '<div class="th-value">—</div><div class="th-sub">元/克</div></div>';

    // 1. 限行（同步）
    var xx = getXianxingData();
    var thX = $('#thXianxing');
    if (thX) {
      thX.querySelector('.th-value').textContent = xx.tail;
      thX.querySelector('.th-sub').textContent = xx.isWeekend ? '周末不限行' : '非浙A全限';
    }

    // 2. 油价（同步）
    var yj = getYoujiaData();
    var thY = $('#thYoujia');
    if (thY) {
      thY.querySelector('.th-value').textContent = '¥' + yj['92号'];
      thY.querySelector('.th-sub').textContent = '92号油 · 元/升';
    }

    // 3. 天气（异步）
    getWeatherData().then(function (w) {
      var thW = $('#thWeather');
      if (!thW) return;
      if (!w) {
        thW.querySelector('.th-value').textContent = '—';
        thW.querySelector('.th-sub').textContent = '获取失败';
        return;
      }
      thW.querySelector('.th-value').textContent = w.temp + '°';
      thW.querySelector('.th-sub').textContent = w.desc + ' 明' + w.forecast[1].min + '~' + w.forecast[1].max + '°';
    });

    // 4. 金价（异步）
    getGoldData().then(function (result) {
      var thG = $('#thGold');
      if (!thG) return;
      if (!result || !result.gold) {
        thG.querySelector('.th-value').textContent = '—';
        thG.querySelector('.th-sub').textContent = '获取失败';
        return;
      }
      thG.querySelector('.th-value').textContent = '¥' + result.gold.cnyPerGram;
      thG.querySelector('.th-sub').textContent = '黄金人民币/克';
    });
  }

  // ===== 资讯流：拉取 /api/news 渲染到首页 banner =====
  function renderNewsBanner() {
    var box = $('#newsBanner');
    if (!box) return;
    box.innerHTML = '<div class="news-item"><div class="news-tag">加载中</div><div class="news-title">正在获取杭州资讯...</div></div>';
    fetch('/api/news')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        // 兼容旧版 items / 新版 headlines
        var items = (data && (data.headlines || data.items)) || [];
        if (!items.length) throw new Error('no data');
        box.innerHTML = items.map(function (n) {
          var tagClass = n.tag === '政策' ? '' : (n.tag === '便民' ? 'news-tag-new' : 'news-tag');
          var escapedTitle = (n.title || '').replace(/'/g, "\\'");
          return '<div class="news-item" onclick="openUrl(\'' + n.url + '\')" style="cursor:pointer">' +
            '<div class="news-tag ' + tagClass + '">' + (n.tag || '资讯') + '</div>' +
            '<div class="news-title">' + n.title + '</div>' +
            '</div>';
        }).join('');

        // 新版：插入「明日预告」横条作为回访钩子
        if (data.tomorrow) {
          var existingHint = document.getElementById('tomorrowHint');
          if (existingHint) existingHint.remove();
          var hint = document.createElement('div');
          hint.id = 'tomorrowHint';
          hint.className = 'tomorrow-hint';
          var xxBadge = data.tomorrow.xianxing.type === 'weekend' ? '🎉 不限行' : ('限行 ' + data.tomorrow.xianxing.tail);
          hint.innerHTML =
            '<div class="th-label">明日 ' + data.tomorrow.week + '</div>' +
            '<div class="th-badge ' + (data.tomorrow.xianxing.type === 'weekend' ? 'is-free' : '') + '">' + xxBadge + '</div>' +
            '<div class="th-action">' + data.tomorrow.hint + '</div>';
          box.parentNode.insertBefore(hint, box.nextSibling);
        }

        // 时令提醒
        if (data.today && data.today.seasonalTip) {
          var existingSeasonal = document.getElementById('seasonalTip');
          if (existingSeasonal) existingSeasonal.remove();
          var seasonal = document.createElement('div');
          seasonal.id = 'seasonalTip';
          seasonal.className = 'seasonal-tip';
          seasonal.innerHTML = data.today.seasonalTip;
          box.parentNode.insertBefore(seasonal, box.nextSibling);
        }

        // 轮播：每 5s 滚动一条
        if (!box._timer) {
          var idx = 0;
          var newsItems = box.querySelectorAll('.news-item');
          if (newsItems.length > 1) {
            box._timer = setInterval(function () {
              newsItems.forEach(function (el) { el.style.display = 'none'; });
              idx = (idx + 1) % newsItems.length;
              newsItems[idx].style.display = 'flex';
            }, 5000);
          }
        }
      })
      .catch(function () {
        box.innerHTML = '<div class="news-item" onclick="openUrl(\'https://www.hangzhou.gov.cn/\')">' +
          '<div class="news-tag">热门</div>' +
          '<div class="news-title">点击访问杭州市政府官网 →</div></div>';
      });
  }

  // ===== 初始化 =====
  function init() {
      applyTheme(state.theme);
      renderTodayHangzhou();
      renderNewsBanner();
      renderHotServices();
      renderHotKeywords();
      renderTabs();
      renderServices('banshi');
    bindEvents();
    aiLoadHistory();
    bindAIEvents();
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

  // ============================================
  // AI 杭州助手
  // ============================================
  var aiState = {
    open: false,
    sending: false,
    history: [],          // [{role, content}]
    abortCtrl: null
  };

  // 恢复历史（localStorage）
  function aiLoadHistory() {
    try {
      var saved = localStorage.getItem('ihz_ai_history');
      if (saved) aiState.history = JSON.parse(saved).slice(-16) || [];
    } catch (e) { aiState.history = []; }
  }
  function aiSaveHistory() {
    try {
      localStorage.setItem('ihz_ai_history', JSON.stringify(aiState.history.slice(-16)));
    } catch (e) {}
  }

  // 转义 HTML，防 XSS
  function aiEscape(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 简易 Markdown 渲染（**粗体**、\n、`code`、- 列表）
  function aiRender(s) {
    var html = aiEscape(s);
    // 代码块
    html = html.replace(/```([\s\S]*?)```/g, function (_, c) {
      return '<pre><code>' + c.replace(/^\n/, '') + '</code></pre>';
    });
    // 行内代码
    html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    // 粗体
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // 标题
    html = html.replace(/^### (.+)$/gm, '<p style="font-weight:600;margin-top:6px;">$1</p>');
    // 无序列表
    html = html.replace(/(^|\n)([-•][\s\S]*?)(?=\n[-•]|\n\n|$)/g, function (m, pre, list) {
      var items = list.split(/\n[-•]/).map(function (t) {
        return '<li>' + t.replace(/^[-•]\s*/, '').trim() + '</li>';
      }).join('');
      return pre + '<ul style="margin:4px 0 8px 18px;">' + items + '</ul>';
    });
    // 段落
    html = html.split(/\n{2,}/).map(function (p) {
      p = p.trim();
      if (!p) return '';
      if (/^<(ul|pre|p)/.test(p)) return p;
      return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
    }).join('');
    return html;
  }

  // 渲染消息列表
  function aiRenderMessages() {
    var box = $('#aiMessages');
    if (!box) return;
    var html = '';
    if (aiState.history.length === 0) {
      html =
        '<div class="ai-msg assistant">' +
          '<div class="ai-msg-avatar">🏔️</div>' +
          '<div class="ai-msg-bubble">' +
            '<p>你好！我是 <strong>iHangzhou 杭州助手</strong> 🏔️</p>' +
            '<p>问我任何杭州生活问题，比如：</p>' +
            '<p>• 社保怎么查 / 公积金怎么提<br>• 今天限行吗 / 地铁末班车几点<br>• 西湖一日游 / 灵隐寺怎么去<br>• 杭州医保门诊怎么报销</p>' +
            '<p style="margin-top:6px;color:var(--text-muted);font-size:12px;">由通义千问驱动，回答仅供参考。</p>' +
          '</div>' +
        '</div>';
    } else {
      aiState.history.forEach(function (msg) {
        var isUser = msg.role === 'user';
        html +=
          '<div class="ai-msg ' + (isUser ? 'user' : 'assistant') + '">' +
            '<div class="ai-msg-avatar">' + (isUser ? '🧑' : '🏔️') + '</div>' +
            '<div class="ai-msg-bubble">' + (isUser ? aiEscape(msg.content).replace(/\n/g, '<br>') : aiRender(msg.content)) + '</div>' +
          '</div>';
      });
    }
    box.innerHTML = html;
    // 滚到底
    box.scrollTop = box.scrollHeight;
  }

  // 追加一条「正在思考」占位
  function aiAppendThinking() {
    var box = $('#aiMessages');
    if (!box) return;
    var div = document.createElement('div');
    div.className = 'ai-msg assistant thinking-placeholder';
    div.id = 'aiThinking';
    div.innerHTML =
      '<div class="ai-msg-avatar">🏔️</div>' +
      '<div class="ai-msg-bubble"><span class="ai-typing"><span></span><span></span><span></span></span></div>';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }
  function aiRemoveThinking() {
    var t = $('#aiThinking');
    if (t) t.remove();
  }

  // 流式追加助手消息
  function aiAppendStream() {
    var box = $('#aiMessages');
    if (!box) return null;
    var div = document.createElement('div');
    div.className = 'ai-msg assistant streaming';
    div.innerHTML =
      '<div class="ai-msg-avatar">🏔️</div>' +
      '<div class="ai-msg-bubble" id="aiStreamBubble"></div>';
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div.querySelector('.ai-msg-bubble');
  }

  // 切换浮窗
  function toggleAIChat() {
    var chat = $('#aiChat');
    var fab = $('#aiFab');
    if (!chat) return;
    aiState.open = !aiState.open;
    if (aiState.open) {
      chat.classList.add('active');
      if (fab) fab.classList.add('hidden');
      aiRenderMessages();
      // 自动 focus 输入框（移动端可能弹键盘，延后）
      setTimeout(function () {
        var inp = $('#aiInput');
        if (inp) inp.focus();
      }, 250);
    } else {
      chat.classList.remove('active');
      if (fab) fab.classList.remove('hidden');
    }
  }
  function closeAIChat() {
    aiState.open = false;
    var chat = $('#aiChat');
    var fab = $('#aiFab');
    if (chat) chat.classList.remove('active');
    if (fab) fab.classList.remove('hidden');
  }
  function clearAIChat() {
    if (!confirm('清空对话历史？')) return;
    aiState.history = [];
    aiSaveHistory();
    aiRenderMessages();
  }

  // 发送消息（流式）
  async function sendAIMessage(text) {
    text = (text || '').trim();
    if (!text || aiState.sending) return;
    var input = $('#aiInput');
    if (input) input.value = '';
    aiAutoGrow();  // 重置高度

    // 加入用户消息
    aiState.history.push({ role: 'user', content: text });
    aiSaveHistory();
    aiRenderMessages();
    aiAppendThinking();

    aiState.sending = true;
    var sendBtn = $('#aiSendBtn');
    if (sendBtn) sendBtn.disabled = true;
    var status = $('#aiStatus');
    if (status) { status.classList.add('thinking'); status.textContent = '思考中…'; }

    var fullReply = '';
    var bubble = null;

    try {
      var res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: aiState.history.slice(0, -1)  // 不含当前刚发的这条
        })
      });

      if (!res.ok) {
        var errData = {};
        try { errData = await res.json(); } catch (e) {}
        throw new Error(errData.reply || ('HTTP ' + res.status));
      }

      // 处理 SSE 流
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';

      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });

        var lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (!line || !line.startsWith('data:')) continue;
          var dataStr = line.slice(5).trim();
          if (dataStr === '[DONE]') continue;
          try {
            var obj = JSON.parse(dataStr);
            if (obj.content) {
              if (!bubble) {
                aiRemoveThinking();
                bubble = aiAppendStream();
              }
              fullReply += obj.content;
              bubble.innerHTML = aiRender(fullReply);
              var box = $('#aiMessages');
              if (box) box.scrollTop = box.scrollHeight;
            } else if (obj.reply) {
              // 服务端降级为整段回复
              if (!bubble) {
                aiRemoveThinking();
                bubble = aiAppendStream();
              }
              fullReply = obj.reply;
              bubble.innerHTML = aiRender(fullReply);
            } else if (obj.error) {
              throw new Error(obj.reply || obj.error);
            }
          } catch (e) {
            // 解析分片错误，忽略
          }
        }
      }
      if (!fullReply) {
        throw new Error('回复为空，请重试');
      }
      aiState.history.push({ role: 'assistant', content: fullReply });
      aiSaveHistory();
    } catch (err) {
      aiRemoveThinking();
      var box = $('#aiMessages');
      if (box) {
        var errDiv = document.createElement('div');
        errDiv.className = 'ai-msg assistant error';
        errDiv.innerHTML =
          '<div class="ai-msg-avatar">⚠️</div>' +
          '<div class="ai-msg-bubble">' + aiEscape(err.message || '出错了') + '</div>';
        box.appendChild(errDiv);
        box.scrollTop = box.scrollHeight;
      }
    } finally {
      aiState.sending = false;
      if (sendBtn) sendBtn.disabled = false;
      if (status) { status.classList.remove('thinking'); status.textContent = '在线 · 杭州万事通'; }
      var thinkEl = $('#aiThinking');
      if (thinkEl) thinkEl.remove();
    }
  }

  // 输入框自动增高
  function aiAutoGrow() {
    var inp = $('#aiInput');
    if (!inp) return;
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight, 100) + 'px';
  }

  // 绑定 AI 助手事件
  function bindAIEvents() {
    var sendBtn = $('#aiSendBtn');
    var input = $('#aiInput');
    var closeBtn = $('#aiCloseBtn');
    var clearBtn = $('#aiClearBtn');
    var quick = $('#aiQuickAsk');

    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        sendAIMessage(input ? input.value : '');
      });
    }
    if (input) {
      input.addEventListener('input', aiAutoGrow);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
          e.preventDefault();
          sendAIMessage(input.value);
        }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeAIChat);
    if (clearBtn) clearBtn.addEventListener('click', clearAIChat);
    if (quick) {
      quick.addEventListener('click', function (e) {
        var btn = e.target.closest('.ai-quick-btn');
        if (!btn) return;
        var q = btn.getAttribute('data-q');
        if (q) sendAIMessage(q);
      });
    }
  }

  // 暴露全局函数供 index.html / channel.html 调用
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.buildXianxingModal = buildXianxingModal;
  window.showLPR = showLPR;
  window.showTide = showTide;
  window.showForex = showForex;
  window.showMetro = showMetro;
  window.showWeather = showWeather;
  window.showSalaryCalc = showSalaryCalc;
  window.getServiceIcon = getServiceIcon;
  window._getData = function () { return DATA; };
  window._handleAction = handleAction;
  window.openUrl = openUrl;
  window.showGold = showGold;
  window.showYaohao = showYaohao;
  window.showYoujia = showYoujia;
  window.showSbCalc = showSbCalc;
  window.showHospital = showHospital;
  window.showTaxCalc = showTaxCalc;
  window.showCalendar = showCalendar;
  window.showLoanCalc = showLoanCalc;
  window.showCountdown = showCountdown;
  window.showBmi = showBmi;
  window.showPostcode = showPostcode;
  window.showIdCheck = showIdCheck;
  window.showDistrict = showDistrict;
  window.showPlateCheck = showPlateCheck;
  window.toggleAIChat = toggleAIChat;
  window.closeAIChat = closeAIChat;
  window.clearAIChat = clearAIChat;
  window.sendAIMessage = sendAIMessage;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
