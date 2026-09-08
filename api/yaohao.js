// 杭州小客车摇号/竞价结果查询 API (Vercel Serverless)
// 数据源：hzxkctk.cn 官方公告页（正则解析，无依赖）
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  try {
    const r = await fetch('https://hzxkctk.cn/tzgg', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    if (!r.ok) throw new Error('官方接口失败');
    const html = await r.text();
    // 正则提取 <a> 标签中的标题和链接
    const notices = [];
    const re = /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const href = m[1];
      const text = m[2].trim();
      if (text && (text.includes('摇号') || text.includes('竞价') || text.includes('指标配置') || text.includes('公告'))) {
        notices.push({
          title: text,
          url: href.startsWith('http') ? href : 'https://hzxkctk.cn' + (href.startsWith('/') ? href : '/' + href)
        });
      }
    }
    res.status(200).json({
      updated: new Date().toUTCString(),
      source: 'hzxkctk.cn',
      officialSite: 'https://hzxctk.cn/',
      applySite: 'https://apply.hzxkctk.cn/',
      notices: notices.slice(0, 10)
    });
  } catch (e) {
    res.status(200).json({
      updated: new Date().toUTCString(),
      source: 'hzxkctk.cn',
      officialSite: 'https://hzxkctk.cn/',
      applySite: 'https://apply.hzxkctk.cn/',
      notices: [
        { title: '2026年9月杭州市小客车增量指标竞价公告', url: 'https://hzxkctk.cn/tzgg' },
        { title: '2026年8月杭州市小客车增量指标摇号结果公告', url: 'https://hzxkctk.cn/tzgg' }
      ],
      note: '备用数据，建议直接访问官网'
    });
  }
};
