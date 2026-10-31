#!/usr/bin/env python3
"""Add life category to cat-data.js and create life.html"""
import re

# 1. Create life-data.js
life_data = '''/* 杭州生活数据 */
window.LIFE_DATA = {
  'xiaofei': { name: '消费优惠', subtitle: '消费券·薅羊毛·以旧换新', badge: '[优惠]', tips: '杭州定期发消费券（文旅、商超、餐饮），支付宝/云闪付可领。以旧换新补贴覆盖家电、汽车。', links: [
    {n:'杭州消费券领取', d:'文旅/商超/餐饮券，支付宝搜索「杭州消费券」', u:'https://www.alipay.com/'},
    {n:'以旧换新补贴', d:'家电/汽车置换，最高补 15%', u:'https://www.mof.gov.cn/'},
    {n:'数字人民币', d:'央行数字货币杭州试点', u:'https://www.boc.cn/'}
  ]},
  'zufang': { name: '租房攻略', subtitle: '各区租金·合同·权益', badge: '[租房]', tips: '杭州租房热门区域：余杭未来科技城、滨江、拱墅。签约前拍摄全屋视频留证。', links: [
    {n:'杭州各区租金', d:'链家租金地图查询', u:'https://hz.lianjia.com/zufang/'},
    {n:'公积金租房提取', d:'每月最高提 1500 元', u:'https://gjj.hangzhou.gov.cn/'},
    {n:'人才驿站', d:'应届生免费住 7 天', u:'https://hrss.hangzhou.gov.cn/'}
  ]},
  'fangchan': { name: '房产楼市', subtitle: '买房·卖房·过户', badge: '[房产]', tips: '杭州新房限购需落户或社保。普通住宅满 2 年免增值税。', links: [
    {n:'新房楼盘', d:'在售楼盘与摇号', u:'https://hz.lianjia.com/loupan/'},
    {n:'二手房', d:'房源与价格', u:'https://hz.lianjia.com/'},
    {n:'房贷计算器', d:'月供与利息', u:'https://www.bankcomm.com/'}
  ]},
  'shangquan': { name: '商圈购物', subtitle: '武林·钱江新城·下沙', badge: '[商圈]', tips: '武林商圈最老牌，钱江新城最现代，下沙大学城人气旺。', links: [
    {n:'武林商圈', d:'杭州大厦/银泰/国大城市广场', u:''},
    {n:'钱江新城', d:'万象城/来福士/高德置地', u:''},
    {n:'下沙商圈', d:'龙湖天街/宝龙广场', u:''}
  ]},
  'shenghuo': { name: '生活缴费', subtitle: '水电气暖·物业费', badge: '[缴费]', tips: '支付宝/微信可缴水电气暖，浙里办可查历史账单。', links: [
    {n:'电费缴纳', d:'国家电网杭州', u:'https://www.95598.cn/'},
    {n:'水费缴纳', d:'杭州水务', u:'https://www.hzwgc.com/'},
    {n:'燃气费', d:'杭州燃气', u:'https://www.hzgc.com/'}
  ]},
  'jiazhuang': { name: '家装建材', subtitle: '装修·家具·家电', badge: '[家装]', tips: '杭州装修旺季在春秋两季，糊涂/土巴兔可对比报价。', links: [
    {n:'装修报价', d:'土巴兔/齐家网对比', u:'https://www.to8to.com/'},
    {n:'宜家家居', d:'杭宜家居(萧山)', u:'https://www.ikea.cn/'},
    {n:'国美/苏宁', d:'家电以旧换新', u:'https://www.gome.com.cn/'}
  ]},
  'xiangqin': { name: '相亲交友', subtitle: '相亲角·交友活动', badge: '[相亲]', tips: '万松书院相亲角每逢周末热闹非常，线上可找本地社团。', links: [
    {n:'万松书院相亲角', d:'每周六上午，父母替子女把关', u:''},
    {n:'本地交友群', d:'豆瓣杭州同城/贴吧', u:'https://www.douban.com/group/hangzhou/'},
    {n:'官方红娘', d:'杭州市妇联公益相亲', u:''}
  ]},
  'jianshen': { name: '运动健身', subtitle: '场馆·户外·赛事', badge: '[健身]', tips: '杭州健身卡通用率高的品牌：乐刻、超级猩猩。', links: [
    {n:'乐刻运动', d:'99 元/月，杭州全城通用', u:'https://www.leo.co/'},
    {n:'杭州马拉松', d:'每年 11 月报名', u:'https://www.hzim.org/'},
    {n:'公共体育场馆', d:'阿里体育/滨江亚运场馆', u:''}
  ]}
};
'''

with open('js/life-data.js', 'w', encoding='utf-8') as f:
    f.write(life_data)
print('Created js/life-data.js')

# 2. Create life.html
life_html = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="杭州生活指南：消费优惠、租房、房产、商圈、生活缴费、家装、相亲交友、运动健身一站直达。">
  <meta name="theme-color" content="#0ea5e9">
  <meta property="og:title" content="杭州生活 · iHangzhou">
  <meta property="og:description" content="杭州生活指南：消费优惠、租房房产、商圈购物、缴费、家装、相亲、健身一站直达">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="iHangzhou 杭州生活助手">
  <title>杭州生活 · iHangzhou</title>
  <link rel="stylesheet" href="css/style.css?v=20260921h">
  <script src="js/layout.js"></script>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏔️</text></svg>">
  <style>
    .lf-hero{position:relative;width:100%;height:180px;overflow:hidden;background:linear-gradient(135deg,#0ea5e9,#0284c7)}
    .lf-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 30%,rgba(0,0,0,.5))}
    .lf-hero .lf-tb{position:absolute;bottom:0;left:0;right:0;padding:16px;z-index:2;color:#fff}
    .lf-hero .lf-name{font-size:22px;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,.5)}
    .lf-hero .lf-sub{font-size:13px;opacity:.92;margin-top:4px;text-shadow:0 1px 4px rgba(0,0,0,.5)}
    .lf-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:16px}
    .lf-card{display:flex;flex-direction:column;padding:14px;background:var(--bg-card);border-radius:12px;border:1px solid var(--border-light);text-decoration:none;color:var(--text)}
    .lf-card:active{opacity:.7}
    .lf-card .lf-ic{font-size:28px;margin-bottom:8px}
    .lf-card .lf-nm{font-size:14px;font-weight:700;margin-bottom:4px}
    .lf-card .lf-ds{font-size:11px;color:var(--text-secondary);line-height:1.4}
    .lf-tips{margin:0 16px 12px;padding:12px;background:#f0f9ff;border-radius:10px;border-left:3px solid #0ea5e9;font-size:13px;color:var(--text-secondary);line-height:1.6}
    .lf-links{padding:12px 16px}
    .lf-links h3{font-size:15px;font-weight:700;margin:0 0 10px;padding-left:8px;border-left:3px solid #0ea5e9}
    .lf-link{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border-light)}
    .lf-link:last-child{border-bottom:none}
    .lf-link .lf-ln{font-size:13px;font-weight:500}
    .lf-link .lf-ld{font-size:11px;color:var(--text-muted);margin-top:2px}
    .lf-link a{font-size:12px;color:var(--primary);text-decoration:none;white-space:nowrap;padding-left:8px}
    @media(min-width:768px){.lf-grid{grid-template-columns:repeat(3,1fr)}}
  </style>
</head>
<body>
  <script>window.IHZ_PAGE={title:'杭州生活',icon:'🏠'};window.IZ_SKIP_APP_INIT=true;window.IZ_SKIP_APP_THEME=true;</script>
  <div id="lfContainer"><div style="text-align:center;padding:60px 20px">加载中...</div></div>
  <script src="js/life-data.js"></script>
  <script>
    (function(){
      var id=(location.search.split('id=')[1]||'').split('&')[0];
      var data=window.LIFE_DATA?window.LIFE_DATA[id]:null;
      var c=document.getElementById('lfContainer');
      if(data){
        document.title=data.name+' · 杭州生活 · iHangzhou';
        var h='<div class="lf-hero"><div class="lf-tb"><div class="lf-name">'+data.name+'</div><div class="lf-sub">'+data.subtitle+'</div></div></div>';
        h+='<div class="lf-grid">';
        var keys=Object.keys(window.LIFE_DATA);
        keys.forEach(function(k){var v=window.LIFE_DATA[k];h+='<a class="lf-card" href="life.html?id='+k+'"><span class="lf-ic">'+v.badge.replace(/[\\[\\]]/g,'')+'</span><span class="lf-nm">'+v.name+'</span><span class="lf-ds">'+v.subtitle+'</span></a>'});
        h+='</div>';
        h+='<div class="lf-tips">� '+data.tips+'</div>';
        if(data.links&&data.links.length){h+='<div class="lf-links"><h3>🔗 相关链接</h3>';data.links.forEach(function(l){h+='<div class="lf-link"><div><div class="lf-ln">'+l.n+'</div><div class="lf-ld">'+l.d+'</div></div>'+(l.u?'<a href="'+l.u+'" rel="noopener noreferrer" target="_blank">前往 →</a>':'')+'</div>'});h+='</div>';}
        c.innerHTML=h;
      } else {
        var keys=window.LIFE_DATA?Object.keys(window.LIFE_DATA):[];
        var h='<div class="lf-hero"><div class="lf-tb"><div class="lf-name">杭州生活</div><div class="lf-sub">实用生活信息一站直达</div></div></div>';
        h+='<div class="lf-grid">';
        keys.forEach(function(k){var v=window.LIFE_DATA[k];h+='<a class="lf-card" href="life.html?id='+k+'"><span class="lf-ic">'+v.badge.replace(/[\\[\\]]/g,'')+'</span><div><div class="lf-nm">'+v.name+'</div><div class="lf-ds">'+v.subtitle+'</div></div></a>'});
        h+='</div>';
        c.innerHTML=h;
      }
    })();
  </script>
  <script>if(window.IZ&&IZ.layout){document.addEventListener('DOMContentLoaded',IZ.layout.init)}</script>
</body>
</html>
'''

with open('life.html', 'w', encoding='utf-8') as f:
    f.write(life_html)
print('Created life.html')

# 3. Add life category to cat-data.js
with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    cat_data = f.read()

# Insert before the closing ];
life_category = ''', {
    k: 'life', n: '杭州生活', ic: '🏠', c: '#0ea5e9', home: 'life.html',
    d: '消费·租房·房产·商圈·缴费 生活一站通',
    i: '杭州生活实用信息：消费券、租房、房产、商圈购物、生活缴费、家装、相亲交友、运动健身。',
    kw: ['生活', '消费', '租房', '房产', '商圈'],
    subs: [
      {
        k: 'xiaofei', n: '消费优惠', ic: '💰', d: '消费券·�羊毛·以旧换新', i: '杭州定期发放消费券覆盖文旅商超餐饮，以旧换新补贴家电汽车。',
        th: [['�', '消费券', 'life.html?id=xiaofei'], ['�️', '薅羊毛', 'life.html?id=xiaofei'], ['🔄', '以旧换新', 'life.html?id=xiaofei'], ['💴', '数字人民币', 'life.html?id=xiaofei'], ['�', '支付宝', 'life.html?id=xiaofei'], ['�️', '优惠券', 'life.html?id=xiaofei'], ['�', '福利活动', 'life.html?id=xiaofei'], ['💳', '信用卡活动', 'life.html?id=xiaofei']],
        ft: [['�', '杭州消费券领取', '文旅/商超/支付宝搜索「杭州消费券」', 'life.html?id=xiaofei'], ['�', '以旧换新补贴', '家电/汽车置换最高补 15%', 'life.html?id=xiaofei']],
        kw: ['消费券', '优惠', '以旧换新', '数字人民币']
      },
      {
        k: 'zufang', n: '租房攻略', ic: '🏠', d: '租金·合同·权益', i: '各区租金对比、租房合同注意事项、租房公积金提取。',
        th: [['�️', '各区租金', 'life.html?id=zufang'], ['�', '租房合同', 'life.html?id=zufang'], ['💰', '公积金提取', 'life.html?id=zufang'], ['�', '合租', 'life.html?id=zufang'], ['�', '人才公寓', 'life.html?id=zufang'], ['�', '租房避坑', 'life.html?id=zufang'], ['📊', '租金走势', 'life.html?id=zufang'], ['🔒', '权益保障', 'life.html?id=zufang']],
        ft: [['🏠', '杭州各区租金对比', '链家租金地图实时查询', 'life.html?id=zufang'], ['💰', '公积金租房提取', '每月最高 1500 元', 'life.html?id=zufang']],
        kw: ['租房', '租金', '合同', '公积金']
      },
      {
        k: 'fangchan', n: '房产楼市', ic: '🏙️', d: '买房·卖房·过户', i: '新房摇号、二手房交易、房贷计算、税费明细。',
        th: [['🏗️', '新房', 'life.html?id=fangchan'], ['�️', '二手房', 'life.html?id=fangchan'], ['�', '房贷计算', 'life.html?id=fangchan'], ['�', '税费', 'life.html?id=fangchan'], ['🔑', '过户', 'life.html?id=fangchan'], ['📈', '房价走势', 'life.html?id=fangchan'], ['�️', '满二唯一', 'life.html?id=fangchan'], ['�️', '限购政策', 'life.html?id=fangchan']],
        ft: [['🏙️', '杭州新房楼盘', '在售与摇号查询', 'life.html?id=fangchan'], ['📊', '房贷计算器', '月供与利息试算', 'life.html?id=fangchan']],
        kw: ['房产', '买房', '房贷', '房价']
      },
      {
        k: 'shangquan', n: '商圈购物', ic: '🛒', d: '武林·钱江新城·下沙', i: '杭州主要商圈导览、购物优惠、停车信息。',
        th: [['🏛️', '武林商圈', 'life.html?id=shangquan'], ['�️', '钱江新城', 'life.html?id=shangquan'], ['�', '下沙商圈', 'life.html?id=shangquan'], ['�', '购物中心', 'life.html?id=shangquan'], ['�️', '美食街区', 'life.html?id=shangquan'], ['�️', '停车信息', 'life.html?id=shangquan'], ['🎬', '电影院', 'life.html?id=shangquan'], ['�', '娱乐休闲', 'life.html?id=shangquan']],
        ft: [['🛒', '武林商圈', '杭州大厦/银泰/国大', 'life.html?id=shangquan'], ['�️', '钱江新城', '万象城/来福士/高德置地', 'life.html?id=shangquan']],
        kw: ['商圈', '购物', '武林', '钱江']
      },
      {
        k: 'jiazhuang', n: '家装建材', ic: '🔨', d: '装修·家具·家电', i: '装修报价、家具家电购买、以旧换新。',
        th: [['🔨', '装修', 'life.html?id=jiazhuang'], ['🛋️', '家具', 'life.html?id=jiazhuang'], ['�', '家电', 'life.html?id=jiazhuang'], ['�', '灯具', 'life.html?id=jiazhuang'], ['�', '建材市场', 'life.html?id=jiazhuang'], ['�', '设计公司', 'life.html?id=jiazhuang'], ['💰', '装修贷款', 'life.html?id=jiazhuang'], ['�', '装修日记', 'life.html?id=jiazhuang']],
        ft: [['🔨', '装修报价', '土巴兔/齐家网对比', 'life.html?id=jiazhuang'], ['🛋️', '宜家家居', '杭宜家居(萧山)', 'life.html?id=jiazhuang']],
        kw: ['装修', '家装', '家具', '家电']
      },
      {
        k: 'shenghuo', n: '生活缴费', ic: '💡', d: '水电气暖', i: '水电气暖物业费缴纳，浙里办可查历史账单。',
        th: [['�', '电费', 'life.html?id=shenghuo'], ['�', '水费', 'life.html?id=shenghuo'], ['🔥', '燃气', 'life.html?id=shenghuo'], ['�️', '供暖', 'life.html?id=shenghuo'], ['🏠', '物业费', 'life.html?id=shenghuo'], ['📱', '手机充值', 'life.html?id=shenghuo'], ['�', '加油充电', 'life.html?id=shenghuo'], ['📊', '账单查询', 'life.html?id=shenghuo']],
        ft: [['�', '电费缴纳', '国家电网杭州客服', 'life.html?id=shenghuo'], ['�', '水费缴纳', '杭州水务在线缴费', 'life.html?id=shenghuo']],
        kw: ['缴费', '电费', '水费', '燃气']
      },
      {
        k: 'xiangqin', n: '相亲交友', ic: '�', d: '万松书院·本地圈子', i: '万松书院相亲角、本地豆瓣群、官方公益相亲活动。',
        th: [['�', '万松书院', 'life.html?id=xiangqin'], ['👥', '本地圈子', 'life.html?id=xiangqin'], ['�', '相亲技巧', 'life.html?id=xiangqin'], ['🎯', '匹配活动', 'life.html?id=xiangqin'], ['�', '形象改造', 'life.html?id=xiangqin'], ['💌', '情书指南', 'life.html?id=xiangqin'], ['�', '同城活动', 'life.html?id=xiangqin'], ['📞', '红娘热线', 'life.html?id=xiangqin']],
        ft: [['�', '万松书院相亲角', '每周六上午父母把关', 'life.html?id=xiangqin'], ['�', '同城活动', '豆瓣同城/贴吧聚会', 'life.html?id=xiangqin']],
        kw: ['相亲', '交友', '万松书院']
      },
      {
        k: 'jianshen', n: '运动健身', ic: '💪', d: '场馆·户外·赛事', i: '健身卡、户外运动、杭州马拉松、亚运场馆预约。',
        th: [['💪', '健身房', 'life.html?id=jianshen'], ['🏃', '杭州马拉松', 'life.html?id=jianshen'], ['🏸', '球类场馆', 'life.html?id=jianshen'], ['�', '游泳', 'life.html?id=jianshen'], ['🚴', '户外运动', 'life.html?id=jianshen'], ['🏟️', '亚运场馆', 'life.html?id=jianshen'], ['�', '武术', 'life.html?id=jianshen'], ['🧘', '瑜伽', 'life.html?id=jianshen']],
        ft: [['💪', '乐刻运动', '99 元/月全城通用', 'life.html?id=jianshen'], ['�', '杭州马拉松', '每年 11 月报名', 'life.html?id=jianshen']],
        kw: ['健身', '运动', '马拉松', '场馆']
      }
    ]
  }
'''

# Find the closing ]; and insert before it
insert_pos = cat_data.rfind('];')
if insert_pos > 0:
    cat_data = cat_data[:insert_pos] + life_category + cat_data[insert_pos:]
    with open('js/cat-data.js', 'w', encoding='utf-8') as f:
        f.write(cat_data)
    print('Added life category to cat-data.js')
else:
    print('ERROR: Could not find insertion point')
