/**
 * banshi.html 便民服务分区：每个 pill 对应的详情与链接
 *  - url: 有则直接跳转（<a> 标签渲染，target=_blank）
 *  - detail: 无 url 但有 detail → 点击唤出 renderItemModal
 *  - 两者均无 → 弹 toast 「功能开发中」
 *
 * 渲染由 banshi.html 内联脚本根据 data-key 查找 BF_MODULE_DATA 完成。
 */
window.BF_MODULE_DATA = {
  // ====== 政务办事 ======
  '社保查询': {
    icon: '🏥', color: '#3b82f6',
    desc: '缴费/余额/明细',
    detail: '<p style="color:var(--text-secondary);line-height:1.8;">杭州社保查询包括养老/医疗/失业/工伤/生育五险缴费记录与个人账户余额。线上查询已对接浙里办与电子社保卡，无需到社保大厅。</p><div class="guide-block"><h4>📋 办事指南</h4><p>① 登录「浙里办」APP 或支付宝小程序「社保查询」<br>② 人脸识别后查看缴费明细与余额<br>③ 在支付宝/微信搜索「电子社保卡」申领，与实体卡同等效力</p></div><div class="guide-block"><h4>📑 所需材料</h4><p>• 身份证原件<br>• 杭州社保卡（如已制卡）</p></div><div class="guide-block"><h4>🏢 办理地点</h4><p>杭州市各区社保经办机构（市本级：市民中心）<br>咨询电话：0571-12333</p></div><div class="guide-block"><h4>🌐 官方入口</h4><a href="https://search.zj.gov.cn/search?q=%E7%A4%BE%E4%BF%9D%E6%9F%A5%E8%AF%A2" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">前往 浙里办 社保查询 →</a></div>'
  },
  '人才认定': {
    url: 'https://search.zj.gov.cn/search?q=%E6%B5%99%E6%B1%9F%E7%9C%81%E4%BA%BA%E6%89%8D%E8%AE%A4%E5%AE%9A',
    icon: '�', color: '#8b5cf6', desc: '杭州人才分类认定'
  },
  '居住证': {
    url: 'https://search.zj.gov.cn/search?q=%E6%B5%99%E6%B1%9F%E5%B1%85%E4%BD%8F%E8%AF%81',
    icon: '�', color: '#3b82f6', desc: '浙江省居住证办理'
  },
  '保障房': {
    url: 'https://search.zj.gov.cn/search?q=%E6%9C%AC%E5%9C%B0%E4%BF%9D%E9%9A%9C%E6%88%BF',
    icon: '🏠', color: '#06b6d4', desc: '公租房/保障性租赁住房'
  },
  '公积金': {
    url: 'https://search.zj.gov.cn/search?q=%E5%85%AC%E7%A7%AF%E9%87%91',
    icon: '🏠', color: '#f59e0b', desc: '杭州公积金查询与提取'
  },
  '落户': {
    icon: '�', color: '#10b981', desc: '杭州落户政策与办理',
    detail: '<p style="color:var(--text-secondary);line-height:1.8;">杭州落户主要有学历落户、职称落户、积分落户、投靠落户四种方式。2024年起杭州放宽学历落户门槛，大专即可落户。</p><div class="guide-block"><h4>📋 落户方式</h4><p>① <strong>学历落户</strong>：大专（35周岁以下）/ 本科（45周岁以下）+ 1个月社保<br>② <strong>职称落户</strong>：中级职称 + 1个月社保<br>③ <strong>积分落户</strong>：每年11月申请，次年3月公布<br>④ <strong>投靠落户</strong>：夫妻投靠 / 老年投靠 / 未成年子女投靠</p></div><div class="guide-block"><h4>� 官方入口</h4><a href="https://search.zj.gov.cn/search?q=%E6%9C%AC%E5%9C%B0%E8%90%BD%E6%88%B7" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">前往 浙里办 办理 →</a></div>'
  },
  '出入境': {
    url: 'https://search.zj.gov.cn/search?q=%E5%87%BA%E5%85%A5%E5%A2%83',
    icon: '🛂', color: '#06b6d4', desc: '护照/港澳通行证办理'
  },
  '身份证': {
    url: 'https://search.zj.gov.cn/search?q=%E8%BA%AB%E4%BB%BD%E8%AF%81',
    icon: '🪪', color: '#3b82f6', desc: '身份证申领/换领/补领'
  },
  '今日限行': {
    action: 'xianxing', icon: '�', color: '#ef4444', desc: '杭州错峰限行查询'
  },
  '社保': {
    icon: '🏥', color: '#3b82f6', desc: '社保查询 - 缴费/余额/明细',
    detail: '<p style="color:var(--text-secondary);line-height:1.8;">杭州社保查询包括养老/医疗/失业/工伤/生育五险缴费记录与个人账户余额。线上查询已对接浙里办与电子社保卡，无需到社保大厅。</p><div class="guide-block"><h4>📋 办事指南</h4><p>① 登录「浙里办」APP 或支付宝小程序「社保查询」<br>② 人脸识别后查看缴费明细与余额<br>③ 在支付宝/微信搜索「电子社保卡」申领，与实体卡同等效力</p></div><div class="guide-block"><h4>📑 所需材料</h4><p>• 身份证原件<br>• 杭州社保卡（如已制卡）</p></div><div class="guide-block"><h4>🏢 办理地点</h4><p>杭州市各区社保经办机构（市本级：市民中心）<br>咨询电话：0571-12333</p></div><div class="guide-block"><h4>🌐 官方入口</h4><a href="https://search.zj.gov.cn/search?q=%E7%A4%BE%E4%BF%9D%E6%9F%A5%E8%AF%A2" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">前往 浙里办 社保查询 →</a></div>'
  },
  '社保查询': {
    icon: '🏥', color: '#3b82f6',
    desc: '缴费/余额/明细',
    detail: '<p style="color:var(--text-secondary);line-height:1.8;">杭州社保查询包括养老/医疗/失业/工伤/生育五险缴费记录与个人账户余额。线上查询已对接浙里办与电子社保卡，无需到社保大厅。</p><div class="guide-block"><h4>� 办事指南</h4><p>① 登录「浙里办」APP 或支付宝小程序「社保查询」<br>② 人脸识别后查看缴费明细与余额<br>③ 在支付宝/微信搜索「电子社保卡」申领，与实体卡同等效力</p></div><div class="guide-block"><h4>📑 所需材料</h4><p>• 身份证原件<br>• 杭州社保卡（如已制卡）</p></div><div class="guide-block"><h4>� 办理地点</h4><p>杭州市各区社保经办机构（市本级：市民中心）<br>咨询电话：0571-12333</p></div><div class="guide-block"><h4>🌐 官方入口</h4><a href="https://search.zj.gov.cn/search?q=%E7%A4%BE%E4%BF%9D%E6%9F%A5%E8%AF%A2" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">前往 浙里办 社保查询 →</a></div>'
  },
  '2026浙江省考': {
    action: 'gongkao', icon: '�', color: '#ef4444', desc: '2026浙江省公务员考试'
  },
  '2026国考': {
    action: 'gongkao', icon: '�', color: '#dc2626', desc: '2026国家公务员考试'
  },
  '钱塘江大潮查询': {
    action: 'tide', icon: '🌊', color: '#06b6d4', desc: '钱塘江潮汐实时预报'
  },
  '钱塘江大潮': {
    action: 'tide', icon: '🌊', color: '#06b6d4', desc: '钱塘江潮汐实时预报'
  },
  '消费券': {
    url: 'https://search.zj.gov.cn/search?q=%E6%B8%85%E5%8D%88',
    icon: '�', color: '#ef4444', desc: '杭州消费券领取'
  },
  '开学攻略': {
    icon: '�', color: '#f59e0b', desc: '杭州开学季全攻略',
    detail: '<p style="color:var(--text-secondary);line-height:1.8;">杭州开学攻略涵盖幼儿园入园、小学报名、小升初、中考、高考等全阶段入学政策与时间节点，以及高校开学注意事项。</p><div class="guide-block"><h4>📅 2025年杭州入学月历（幼升小+小升初）</h4><p>• <strong>3-4月</strong>：各区教育局发布义务教育阶段招生政策<br>• <strong>5-6月</strong>：网上报名 + 现场确认<br>• <strong>7月</strong>：公办小学录取 + 民办摇号<br>• <strong>8月</strong>：录取通知 + 新生报到</p></div><div class="guide-block"><h4>� 获取最新信息</h4><a href="https://search.zj.gov.cn/search?q=%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%AD%A6" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">查看杭州入学资讯 →</a></div>'
  },
  '灵隐寺免票': {
    url: 'https://www.lingyinsi.com/',
    icon: '�️', color: '#06b6d4', desc: '灵隐寺飞来峰预约'
  },

  // ====== 找工作指南 ======
  '今日日更招聘': {
    url: 'https://search.zj.gov.cn/search?q=%E6%9C%AC%E5%9C%B0%E6%8B%9B%E8%81%98',
    icon: '�', color: '#3b82f6', desc: '杭州每日招聘信息'
  },
  '浙江省考': {
    action: 'gongkao', icon: '📊', color: '#ef4444', desc: '2026浙江省公务员考试'
  },
  '国考攻略': {
    action: 'gongkao', icon: '�', color: '#dc2626', desc: '2026国家公务员考试'
  },
  '大厂招聘': {
    url: 'https://search.zj.gov.cn/search?q=%E6%9C%AC%E5%9C%B0%E4%BA%92%E8%81%94%E7%BD%91%E6%8B%9B%E8%81%98',
    icon: '�', color: '#10b981', desc: '杭州大厂（阿里/网易等）'
  },
  '事业单位': {
    url: 'https://search.zj.gov.cn/search?q=%E4%BA%8B%E4%B8%9A%E5%8D%95%E4%BD%8D%E6%8B%9B%E8%81%98',
    icon: '🏢', color: '#f59e0b', desc: '浙江事业单位招聘'
  },
  '2027校招': {
    url: 'https://search.zj.gov.cn/search?q=%E6%A0%A1%E6%8B%9B2027',
    icon: '🎓', color: '#8b5cf6', desc: '2027届校园招聘'
  },
  '国企招聘': {
    url: 'https://search.zj.gov.cn/search?q=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98',
    icon: '🏛️', color: '#06b6d4', desc: '杭州国企社招/校招'
  },
  '在线简历生成': {
    url: 'https://search.zj.gov.cn/search?q=%E5%9C%A8%E7%BA%BF%E7%AE%80%E5%8E%86%E7%94%9F%E6%88%90',
    icon: '📝', color: '#3b82f6', desc: 'AI简历助手'
  },
  '免费简历模板': {
    url: 'https://search.zj.gov.cn/search?q=%E5%85%8D%E8%B4%B9%E7%AE%80%E5%8E%86%E6%A8%A1%E6%9D%BF',
    icon: '�', color: '#92400e', desc: '简历Word模板下载'
  },
  '杭州免费住': {
    url: 'https://www.hzrc.com/',
    icon: '�️', color: '#10b981', desc: '人才驿站免费住7天'
  },

  // ====== 民生服务 ======
  '找工作入口': {
    url: 'zhaopin.html',
    icon: '💼', color: '#3b82f6', desc: '杭州本地求职招聘'
  },
  '发票抽奖': {
    url: 'https://search.zj.gov.cn/search?q=%E5%8F%91%E7%A5%A8%E6%8A%BD%E5%A5%96',
    icon: '🎁', color: '#f59e0b', desc: '发票抽奖赢现金'
  },
  '免费培训+考证': {
    url: 'https://search.zj.gov.cn/search?q=%E8%87%91%E8%9A%8A%E5%9F%B9%E8%AE%AD%E8%A1%A5%E8%B4%B4',
    icon: '📚', color: '#10b981', desc: '技能提升补贴培训'
  },
  '公园年卡': {
    url: 'https://www.96225.com/',
    icon: '🎪', color: '#10b981', desc: '杭州公园年卡办理'
  },
  '钱塘江大潮': {
    action: 'tide', icon: '🌊', color: '#06b6d4', desc: '钱塘江潮汐实时预报'
  },

  // ====== 旅游指南 ======
  '浙BA篮球联赛': {
    url: 'https://search.zj.gov.cn/search?q=BA%E5%9F%8E%E5%B8%82%E8%81%94%E8%B5%9B',
    icon: '🏀', color: '#ef4444', desc: '浙BA城市篮球联赛'
  },
  '演唱会时间表': {
    url: 'https://search.zj.gov.cn/search=%E6%BC%94%E5%94%B1%E4%BC%9A',
    icon: '🎵', color: '#8b5cf6', desc: '杭州演唱会演出表'
  },
  '体育赛事': {
    url: 'https://search.zj.gov.cn/search?q=%E4%BD%93%E8%82%B2%E8%B5%9B%E4%BA%8B',
    icon: '�', color: '#10b981', desc: '杭州体育赛事报名'
  },
  '杭州一日游': {
    url: 'articles.html?q=%E4%B8%80%E6%97%A5%E6%B8%B8',
    icon: '�', color: '#f59e0b', desc: '杭州一日游经典路线'
  },
  '杭州马拉松': {
    url: 'https://search.zj.gov.cn/search?q=%E9%A9%AC%E6%8B%89%E6%9D%BE',
    icon: '🏃', color: '#ef4444', desc: '杭州马拉松报名'
  },
  '元宵攻略': {
    url: 'https://search.zj.gov.cn/search?q=%E5%85%83%E5%AE%B5%E7%AF%80',
    icon: '🏮', color: '#ef4444', desc: '杭州元宵赏灯攻略'
  },
  '赏花攻略': {
    url: 'https://search.zj.gov.cn/search?q=%E8%B5%8F%E8%8A%B1',
    icon: '🌸', color: '#ec4899', desc: '杭州赏花好去处'
  },
  '七夕攻略': {
    url: 'https://search.zj.gov.cn/search?q=%E4%B8%83%E5%A4%95',
    icon: '�', color: '#ec4899', desc: '杭州七夕约会攻略'
  },
  '杭州美食推荐': {
    url: 'food.html',
    icon: '�', color: '#f97316', desc: '杭帮菜+网红餐厅'
  },

  // ====== 交通出行 ======
  '2026春运': {
    url: 'https://search.zj.gov.cn/search?q=%E6%98%A5%E8%BF%902026',
    icon: '�', color: '#ef4444', desc: '2026春运购票指南'
  },
  '外地车免限行': {
    url: 'https://search.zj.gov.cn/search?q=%E5%A4%96%E5%9C%B0%E8%BD%A6%E5%85%8D%E9%99%90',
    icon: '�', color: '#f59e0b', desc: '杭州公車车免限行申请'
  },
  '打车+顺风车': {
    url: 'https://search.zj.gov.cn/search?q=%E7%9A%84%E5%8F%B8',
    icon: '🚕', color: '#10b981', desc: '杭州出租车/网约车'
  },
  '火车/高铁购票': {
    url: 'https://search.zj.gov.cn/search?q=%E7%AB%99%E7%AB%8B',
    icon: '🚄', color: '#06b6d4', desc: '杭州东站/城站/南站'
  },
  '杭州地铁线路': {
    action: 'metro', icon: '�', color: '#06b6d4', desc: '杭州地铁线路图'
  },
  '浙江ETC办理': {
    url: 'https://search.zj.gov.cn/search?q=ETC%E5%8A%9E%E7%90%86',
    icon: '�', color: '#3b82f6', desc: 'ETC线上办理入口'
  },

  // ====== 车辆服务 ======
  '浙A摇号申请': {
    url: 'https://search.zj.gov.cn/search?q=%E6%B5%99A%E6%8B%9B%E5%8F%B7',
    icon: '�', color: '#ef4444', desc: '浙A车牌竞价/摇号'
  },
  '网约车': {
    url: 'https://search.zj.gov.cn/search?q=%E7%BD%91%E7%BA%A6%E8%BD%A6',
    icon: '🚕', color: '#f59e0b', desc: '网约车司机/车辆证'
  },
  '车辆年检': {
    url: 'https://search.zj.gov.cn/search?q=%E8%BD%A6%E8%BE%86%E5%B9%B4%E6%A3%80',
    icon: '🔍', color: '#3b82f6', desc: '机动车年检查询与预约'
  },
  '违章查询': {
    url: 'https://search.zj.gov.cn/search?q=%E8%BF%9D%E7%AB%A0%E6%9F%A5%E8%AF%A2',
    icon: '�', color: '#ef4444', desc: '交通违法查询/处理'
  },
  '浙M号牌': {
    url: 'https://search.zj.gov.cn/search?q=%E6%B5%99M%E5%8F%B7%E7%89%8C',
    icon: '�️', color: '#8b5cf6', desc: '浙M新能源/摩托车牌'
  },
  '停车包月': {
    url: 'https://search.zj.gov.cn/search?q=%E5%81%9C%E8%BD%A6%E5%8C%85%E6%9C%88',
    icon: '�️', color: '#06b6d4', desc: '道路停车包月申请'
  },
  '驾照学分': {
    url: 'https://search.zj.gov.cn/search?q=%E9%A9%BE%E9%A9%B6%E8%AF%81%E5%AD%A6%E5%88%86',
    icon: '�', color: '#f59e0b', desc: '学法减分/审验教育'
  },
  '驾驶证业务': {
    url: 'https://search.zj.gov.cn/search?q=%E9%A9%BE%E7%85%A7%E4%B8%9A%E5%8A%A1',
    icon: '🪪', color: '#10b981', desc: '期满换证/转入/注销'
  },

  // ====== 教育办事 ======
  '浙江专升本': {
    url: 'https://search.zj.gov.cn/search?q=%E4%B8%93%E5%8D%87%E6%9C%AC',
    icon: '�', color: '#8b5cf6', desc: '浙江专升本考试政策'
  },
  '2026考研': {
    url: 'https://search.zj.gov.cn/search?q=%E8%80%83%E7%A0%942026',
    icon: '📚', color: '#06b6d4', desc: '2026全国硕士研究生考试'
  },
  '2026高考攻略': {
    url: 'https://search.zj.gov.cn/search?q=%E9%AB%98%E8%80%83%E6%94%BB%E7%95%A5',
    icon: '�', color: '#ef4444', desc: '浙江省2026高考指南'
  },
  '杭州中考': {
    url: 'https://search.zj.gov.cn/search?q=%E6%9C%AC%E5%9C%B0%E4%B8%AD%E8%80%83',
    icon: '📝', color: '#f59e0b', desc: '杭州中考政策与志愿填报'
  },
  '幼儿园入园': {
    url: 'https://search.zj.gov.cn/search?q=%E5%B9%BC%E5%84%BF%E5%9B%AD%E5%85%A5%E5%9B%AD',
    icon: '🌈', color: '#ec4899', desc: '杭州幼儿园入园攻略'
  },
  '小升初攻略': {
    url: 'https://search.zj.gov.cn/search?q=%E5%B0%8F%E5%8D%87%E5%88%9D',
    icon: '📚', color: '#10b981', desc: '杭州小升初公办/民办政策'
  },
  '查学区划分': {
    icon: '�️', color: '#3b82f6', desc: '杭州中小学学区划分查询',
    detail: '<p style="color:var(--text-secondary);line-height:1.8;">杭州各区教育局每年3-4月公布义务教育阶段公办学校学区范围。热门学区实行「六年一学位」政策。</p><div class="guide-block"><h4>📅 查询时间</h4><p>• <strong>3-4月</strong>：各区教育局发布当年公办小学/初中学区划分<br>• <strong>5月</strong>：随入学报名办法一并公布具体招生日程</p></div><div class="guide-block"><h4>� 热点学区（2025年预警）</h4><p>• 西湖区：文一街 / 文三教育集团 / 学军小学<br>• 上城区：天长小学 / 胜利小学 / 凤凰小学<br>• 拱墅区：卖鱼桥小学 / 拱墅附校</p></div><div class="guide-block"><h4>🌐 官方查询入口</h4><a href="https://search.zj.gov.cn/search?q=%E5%AD%A6%E5%8C%BA%E5%88%92%E5%88%86" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">前往 浙里办 查学区 →</a></div>'
  }
};

// ====== 自定义 handleAction 扩展 ======
// banshi 页面注册几个 DATA.actions 之外的操作
window.BF_ACTION_HANDLER = {
  'gongkao': function () {
    if (window.openModal) {
      window.openModal('� 公考信息', '<div style="padding:12px 0;"><p style="color:var(--text-secondary);line-height:1.8;">公务员考试备考指南。</p><div class="guide-block"><h4>📌 时间节点</h4><p>• <strong>10月</strong>：国考公告发布 / 报名（www.scs.gov.cn）<br>• <strong>11月底</strong>：国考笔试<br>• <strong>12月-1月</strong>：浙江省考公告发布<br>• <strong>12月-3月</strong>：多省联考</p></div><div class="guide-block"><h4>� 官方入口</h4><a href="https://search.zj.gov.cn/search?q=%E5%85%AC%E5%8A%A1%E5%91%98%E8%80%83%E8%AF%95" target="_blank" rel="noopener" style="display:inline-block;padding:10px 16px;background:var(--primary);color:#fff;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">查看更多公考资讯 →</a></div></div>');
    }
  }
};
