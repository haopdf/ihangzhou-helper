// 金价查询 API (Vercel Serverless)
// 数据源：gold-api.com 免费无需密钥
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  try {
    const r = await fetch('https://api.gold-api.com/price/XAU');
    if (!r.ok) throw new Error('gold-api failed');
    const data = await r.json();
    // 取人民币汇率
    let cnyRate = 7.2;
    try {
      const fx = await fetch('https://open.er-api.com/v6/latest/USD');
      if (fx.ok) {
        const fd = await fx.json();
        if (fd.rates && fd.rates.CNY) cnyRate = fd.rates.CNY;
      }
    } catch (e) {}
    const usdPerOz = data.price;
    const cnyPerOz = usdPerOz * cnyRate;
    const cnyPerGram = cnyPerOz / 31.1035; // 1盎司=31.1035克
    res.status(200).json({
      updated: data.updatedAt,
      gold: {
        usdPerOz: usdPerOz.toFixed(2),
        cnyPerOz: cnyPerOz.toFixed(2),
        cnyPerGram: cnyPerGram.toFixed(2)
      }
    });
  } catch (e) {
    // 备用静态数据
    res.status(200).json({
      updated: new Date().toUTCString(),
      gold: {
        usdPerOz: '4395.40',
        cnyPerOz: '31647.10',
        cnyPerGram: '1017.50'
      },
      note: '备用数据，仅供参考'
    });
  }
};
