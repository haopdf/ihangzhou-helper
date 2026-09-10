// 杭州地铁时刻表 API (Vercel Serverless)
// 静态数据：1-19号线首末班车时间 + 换乘站 + 票价规则
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=604800, stale-while-revalidate=1209600'); // 1周缓存
  res.status(200).json({
    updated: '2026-09-10',
    source: '杭州地铁官方网站 hzmetro.com',
    officialSite: 'https://www.hzmetro.com/',
    fare: {
      base: 2,
      max: 14,
      rule: '0-4公里2元，4-12公里每4公里加1元，12-24公里每6公里加1元，24公里以上每8公里加1元',
      transfer: '同一站点90分钟内换乘可累计计价'
    },
    lines: [
      { name: '1号线', color: '#EF8031', stations: '湘湖-萧山国际机场', first: '06:04', last: '22:50', length: '61km', transfer: ['2/3/4/5/6/9/10/19号线'] },
      { name: '2号线', color: '#F00D0D', stations: '朝阳-良渚', first: '06:02', last: '22:48', length: '43km', transfer: ['1/3/4/5/6/9/10号线'] },
      { name: '3号线', color: '#FFB81C', stations: '吴山前村-星桥', first: '06:03', last: '22:30', length: '57km', transfer: ['1/2/4/5/6/10/19号线'] },
      { name: '4号线', color: '#008C42', stations: '浦沿-池华街', first: '06:05', last: '22:55', length: '44km', transfer: ['1/2/3/5/6/9/10号线'] },
      { name: '5号线', color: '#BF7D00', stations: '金星-姑娘桥', first: '06:00', last: '22:30', length: '56km', transfer: ['1/2/3/4/6/7/9/19号线'] },
      { name: '6号线', color: '#BF83EC', stations: '桂花西路-双浦', first: '06:08', last: '22:42', length: '39km', transfer: ['1/2/4/5/7/9号线'] },
      { name: '7号线', color: '#1DAAE2', stations: '吴山广场-江东二路', first: '06:12', last: '22:56', length: '47km', transfer: ['5/8号线'] },
      { name: '8号线', color: '#8E54ED', stations: '文海南路-南阳', first: '06:08', last: '22:32', length: '21km', transfer: ['1/7号线'] },
      { name: '9号线', color: '#D07D1E', stations: '观音塘-龙安', first: '06:04', last: '22:32', length: '30km', transfer: ['1/2/4/5/6号线'] },
      { name: '10号线', color: '#00B2A9', stations: '黄龙体育中心-逸盛路', first: '06:05', last: '22:35', length: '16km', transfer: ['2/3/4/5/19号线'] },
      { name: '16号线', color: '#FF6B6B', stations: '九州街-临安广场', first: '06:10', last: '22:33', length: '34km', transfer: ['5号线'] },
      { name: '19号线', color: '#6F73D2', stations: '苕溪-永盛路', first: '06:00', last: '23:15', length: '59km', transfer: ['1/3/5/10号线'] }
    ]
  });
};
