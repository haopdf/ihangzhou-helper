// 汇率实时查询 API (Vercel Serverless Function)
// 数据源：open.er-api.com 免费无需密钥
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  const base = 'CNY';
  try {
    const r = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    if (!r.ok) throw new Error('上游接口失败');
    const data = await r.json();
    const rates = data.rates || {};
    const out = {
      updated: data.time_last_update_utc || new Date().toUTCString(),
      base: 'CNY',
      list: [
        { code: 'USD', name: '美元', symbol: '$', rate: rates.USD },
        { code: 'EUR', name: '欧元', symbol: '€', rate: rates.EUR },
        { code: 'GBP', name: '英镑', symbol: '£', rate: rates.GBP },
        { code: 'JPY', name: '日元', symbol: '￥', rate: rates.JPY, unit: 100 },
        { code: 'HKD', name: '港币', symbol: 'HK$', rate: rates.HKD },
        { code: 'KRW', name: '韩元', symbol: '₩', rate: rates.KRW, unit: 100 },
        { code: 'SGD', name: '新加坡元', symbol: 'S$', rate: rates.SGD },
        { code: 'AUD', name: '澳元', symbol: 'A$', rate: rates.AUD },
        { code: 'CAD', name: '加元', symbol: 'C$', rate: rates.CAD },
        { code: 'THB', name: '泰铢', symbol: '฿', rate: rates.THB }
      ].filter(x => x.rate)
    };
    res.status(200).json(out);
  } catch (e) {
    res.status(200).json({
      updated: new Date().toUTCString(),
      base: 'CNY',
      list: [
        { code: 'USD', name: '美元', symbol: '$', rate: 0.138, note: '备用' },
        { code: 'EUR', name: '欧元', symbol: '€', rate: 0.127, note: '备用' },
        { code: 'GBP', name: '英镑', symbol: '£', rate: 0.109, note: '备用' },
        { code: 'JPY', name: '日元', symbol: '￥', rate: 20.83, unit: 100, note: '备用' },
        { code: 'HKD', name: '港币', symbol: 'HK$', rate: 1.07, note: '备用' }
      ]
    });
  }
};
