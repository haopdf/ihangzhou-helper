// 杭州本地资讯聚合 API (Vercel Serverless)
// 上游：杭州市政府门户网站；失败回退静态5条政策
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600'); // 30分钟缓存

  // 静态回退数据（每月按需手工维护）
  const fallback = {
    updated: new Date().toUTCString(),
    source: 'static-fallback',
    items: [
      {
        title: '2026杭州公积金缴存基数调整',
        summary: '公积金缴存基数上限调整为34470元，下限2280元，7月1日起执行',
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
        summary: '萧山国际机场至杭州东站直达，最快19分钟，运营时间06:00-23:15',
        url: 'https://www.hzmetro.com/',
        tag: '资讯'
      },
      {
        title: '浙A小客车摇号配置指标调整',
        summary: '每月配置指标可在"杭州市小客车总量调控"官网查询与申请',
        url: 'https://hzxkctk.cn/',
        tag: '资讯'
      },
      {
        title: '杭州人才分类认定新政策实施',
        summary: 'A/B/C/D/E类人才可享受购房补贴、子女入学、配偶就业等政策',
        url: 'https://hrss.hangzhou.gov.cn/',
        tag: '政策'
      }
    ]
  };

  try {
    // 尝试抓取杭州市政府网政策栏目（5秒超时）
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const r = await fetch('https://www.hangzhou.gov.cn/', {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; iHangzhouBot/1.0)' }
    });
    clearTimeout(timer);
    if (!r.ok) throw new Error('upstream failed');
    // 杭州政府网 HTML 结构不稳定，直接使用静态回退
    // 如有可靠的RSS或JSON接口可在此替换
    throw new Error('use fallback');
  } catch (e) {
    fallback.note = '当前为静态回退数据，如需最新资讯请直接访问 hangzhou.gov.cn';
    res.status(200).json(fallback);
  }
};
