#!/usr/bin/env python3
"""
彻底重写 weekend.html 和 district.html 为独立页面
"""
import os

# ============================================================
# weekend.html - 周末活动频道
# ============================================================
weekend_html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="杭州周末活动：露营、赏花、亲子、展览、市集、骑行">
  <meta name="keywords" content="杭州周末,露营,赏花,亲子活动,展览">
  <meta name="theme-color" content="#0d9488">
  <title>周末休闲 · iHangzhou</title>
  <link rel="stylesheet" href="css/style.css?v=20260921h">
  <script src="js/layout.js"></script>
  <style>
    .wm-h{font-size:28px;font-weight:700;margin:2px 0 4px}
    .wm-s{font-size:15px;color:#666;margin-bottom:12px}
    .wm-cr{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;display:inline-block;background:#ccfbf1;color:#0f766e;margin-bottom:8px}
    .wm-sec{background:#fff;border-radius:14px;padding:16px;margin:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
    .wm-sec h3{font-size:15px;font-weight:600;margin:0 0 8px;display:flex;align-items:center;gap:6px}
    .wm-fg{display:inline-block;padding:3px 8px;background:#ccfbf1;border-radius:8px;font-size:11px;color:#0f766e;margin:3px 4px 0 0}
    .wm-bk{display:block;text-align:center;padding:12px;background:#0d9488;color:#fff;border-radius:24px;font-size:14px;text-decoration:none;max-width:180px;margin:16px auto}
  </style>
</head>
<body>
  <script>
    window.IHZ_PAGE = { title: "周末休闲", icon: "🎯", channelId: "weekend" };
    window.IZ_SKIP_APP_INIT = true;
    window.IZ_SKIP_APP_THEME = true;
  </script>
  <div class="page active" id="pageChannel">
    <div id="detailContent" style="padding:16px;"></div>
    <div style="text-align:center;padding:24px 16px 48px">
      <a href="index.html" class="wm-bk">← 返回首页</a>
    </div>
  </div>
  <script src="js/zhoumo-data.js"></script>
  <script>
    function renderWeekend(id){
      var c=document.getElementById('detailContent');
      if(!c)return;
      var data=window.ZHOUMO_DATA?window.ZHOUMO_DATA[id]:null;
      var keys=window.ZHOUMO_DATA?Object.keys(window.ZHOUMO_DATA):[];
      if(!data){
        c.innerHTML='<div style="text-align:center;padding:40px 20px;color:#999">没有找到相关活动信息<br><br><a href="weekend.html" style="color:#0d9488">← 返回周末休闲首页</a></div>';
        return;
      }
      var nameStr=data.name;
      var subStr=data.subtitle||'';
      var h='';
      if(data.badge) h+='<span class="wm-cr">'+data.badge+'</span>';
      h+='<div class="wm-h">'+nameStr+'</div>';
      h+='<div class="wm-s">'+subStr+'</div>';
      if(data.history){
        h+='<div class="wm-sec"><h3>📖 活动介绍</h3><div style="font-size:14px;color:#444;line-height:1.8">'+data.history+'</div></div>';
      }
      if(data.features&&data.features.length){
        h+='<div class="wm-sec"><h3>✨ 亮点</h3><div style="display:flex;flex-wrap:wrap;gap:6px">';
        for(var i=0;i<data.features.length;i++){h+='<span class="wm-fg">'+data.features[i]+'</span>'}
        h+='</div></div>';
      }
      if(data.shops&&data.shops.length){
        h+='<div class="wm-sec"><h3>📍 推荐去处</h3>';
        for(var i=0;i<data.shops.length;i++){
          var s=data.shops[i];
          h+='<div style="padding:8px 0;border-bottom:1px solid #f5f5f5"><div style="font-size:14px;font-weight:600">'+s.n+'</div>';
          if(s.a) h+='<div style="font-size:12px;color:#888;margin-top:2px">📍 '+s.a+'</div>';
          h+='</div>';
        }
        h+='</div>';
      }
      var nb=keys.filter(function(k){return k!==id}).slice(0,4);
      if(nb.length){
        h+='<div class="wm-sec"><h3>🎯 更多周末活动</h3><div style="display:flex;flex-wrap:wrap;gap:8px">';
        for(var i=0;i<nb.length;i++){
          var k=nb[i];
          var v=window.ZHOUMO_DATA[k];
          h+='<a href="weekend.html?id='+k+'" style="flex:1;min-width:45%;text-align:center;padding:14px 8px;background:#fff;border:1px solid #0d948820;border-radius:10px;text-decoration:none;font-size:13px;color:#0f766e;font-weight:600">'+v.name+'</a>';
        }
        h+='</div></div>';
      }
      h+='<a href="cat.html?c=weekend" style="display:block;text-align:center;padding:14px;background:#0d9488;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;margin:12px 16px">← 周末频道</a>';
      c.innerHTML=h;
    }
    (function(){
      var id=(location.search.split('id=')[1]||'').split('&')[0];
      if(window.ZHOUMO_DATA&&Object.keys(window.ZHOUMO_DATA).length>0&&id){
        renderWeekend(decodeURIComponent(id));
      }
    })();
  </script>
  <script>if(window.IZ&&IZ.layout){document.addEventListener('DOMContentLoaded',IZ.layout.init)}</script>
</body>
</html>"""

with open('weekend.html', 'w', encoding='utf-8') as f:
    f.write(weekend_html)
print("  重写 weekend.html")

# ============================================================
# district.html - 杭州区县页面
# ============================================================
district_html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="杭州各区县：西湖、拱墅、滨江、萧山、余杭、临平">
  <meta name="keywords" content="杭州区县,西湖区,拱墅区,滨江区,萧山区,余杭区">
  <meta name="theme-color" content="#4a6cf7">
  <title>杭州区县 · iHangzhou</title>
  <link rel="stylesheet" href="css/style.css?v=20260921h">
  <script src="js/layout.js"></script>
  <style>
    .dt-h{font-size:28px;font-weight:700;margin:2px 0 4px}
    .dt-s{font-size:15px;color:#666;margin-bottom:12px}
    .dt-cr{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;display:inline-block;background:#e8ecfe;color:#4a6cf7;margin-bottom:8px}
    .dt-sec{background:#fff;border-radius:14px;padding:16px;margin:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
    .dt-sec h3{font-size:15px;font-weight:600;margin:0 0 8px}
    .dt-fg{display:inline-block;padding:3px 8px;background:#e8ecfe;border-radius:8px;font-size:11px;color:#4a6cf7;margin:3px 4px 0 0}
    .dt-bk{display:block;text-align:center;padding:12px;background:#4a6cf7;color:#fff;border-radius:24px;font-size:14px;text-decoration:none;max-width:180px;margin:16px auto}
  </style>
</head>
<body>
  <script>
    window.IHZ_PAGE = { title: "杭州区县", icon: "�️", channelId: "district" };
    window.IZ_SKIP_APP_INIT = true;
    window.IZ_SKIP_APP_THEME = true;
  </script>
  <div class="page active" id="pageChannel">
    <div id="districtContent" style="padding:16px;"></div>
    <div style="text-align:center;padding:24px 16px 48px">
      <a href="index.html" class="dt-bk">← 返回首页</a>
    </div>
  </div>
  <script>
    function renderDistrict(id){
      var districts = {
        'xihu': { name:'西湖区', subtitle:'西湖风景区 · 核心区', badge:'�️', features:['西湖景区','灵隐寺','浙大玉泉','黄龙 CBD'], spots:[{n:'西湖风景名胜区',d:'世界文化遗产'},{n:'灵隐寺',d:'千年古刹'},{n:'浙江大学玉泉校区',d:'百年名校'},{n:'黄龙商圈',d:'商业核心'}] },
        'gongshu': { name:'拱墅区', subtitle:'运河文化 · 历史街区', badge:'🏯', features:['大运河','拱宸桥','小河直街','丝绸仓库'], spots:[{n:'拱宸桥',d:'运河南端标志'},{n:'小河直街',d:'运河历史街区'},{n:'大兜路历史街区',d:'运河古街'},{n:'中国刀剪剑博物馆',d:'运河博物馆群'}] },
        'jianggan': { name:'上城区', subtitle:'南宋皇城 · 钱江南岸', badge:'🏛️', features:['南宋皇城遗址','钱江新城','河坊街'], spots:[{n:'南宋皇城遗址',d:'凤凰山'},{n:'钱江新城',d:'城市CBD'},{n:'河坊街',d:'千年古街'}] },
        'binjiang': { name:'滨江区', subtitle:'高新产业 · 杭州硅谷', badge:'�', features:['高新科技','华为阿里','物联网'], spots:[{n:'滨江高新区',d:'高新企业聚集'},{n:'物联网小镇',d:'数字经济示范区'}] },
        'xiaoshan': { name:'萧山区', subtitle:'航空枢纽 · 制造业重地', badge:'✈️', features:['萧山机场','制造业'], spots:[{n:'萧山国际机场',d:'4F级国际机场'},{n:'湘湖景区',d:'西湖孪生湖'}] },
        'yuhang': { name:'余杭区', subtitle:'未来科技 · 良渚文明', badge:'�', features:['未来科技城','良渚古城','阿里总部'], spots:[{n:'杭州未来科技城',d:'数字经济高地'},{n:'良渚古城遗址',d:'世界遗产'},{n:'阿里巴巴西溪园区',d:'阿里巴巴总部'}] },
        'linping': { name:'临平区', subtitle:'汽车产业 · 智能制造', badge:'�', features:['汽车制造','智能制造'], spots:[{n:'临平新城',d:'杭州东北部中心'},{n:'汽车工业园区',d:'制造业基地'}] },
        'fuyang': { name:'富阳区', subtitle:'山水画卷 · 造纸之乡', badge:'�️', features:['富春江','造纸文化'], spots:[{n:'富春江',d:'两岸画卷'},{n:'龙门古镇',d:'三国孙权故里'}] },
        'qiantang': { name:'钱塘区', subtitle:'下沙高教 · 大江东', badge:'�', features:['下沙高教园区','大江东产业集聚区'], spots:[{n:'下沙高教园区',d:'14所高校聚集'},{n:'大江东',d:'先进制造业'}] }
      };
      var c=document.getElementById('districtContent');
      if(!c)return;
      var data=districts[id];
      var keys=Object.keys(districts);
      if(!data){
        c.innerHTML='<div style="text-align:center;padding:40px 20px;color:#999"><h3>杭州区县</h3><p>选择下方区县开始探索</p></div>';
        return;
      }
      var h='';
      h+='<span class="dt-cr">'+data.badge+'</span>';
      h+='<div class="dt-h">'+data.name+'</div>';
      h+='<div class="dt-s">'+data.subtitle+'</div>';
      if(data.features&&data.features.length){
        h+='<div class="dt-sec"><h3>✨ 区域特色</h3><div style="display:flex;flex-wrap:wrap;gap:6px">';
        data.features.forEach(function(f){h+='<span class="dt-fg">'+f+'</span>'});
        h+='</div></div>';
      }
      if(data.spots&&data.spots.length){
        h+='<div class="dt-sec"><h3>📍 主要看点</h3>';
        data.spots.forEach(function(s){
          h+='<div style="padding:8px 0;border-bottom:1px solid #f5f5f5"><div style="font-size:14px;font-weight:600">'+s.n+'</div>';
          h+='<div style="font-size:12px;color:#888;margin-top:2px">'+s.d+'</div></div>';
        });
        h+='</div>';
      }
      var nb=keys.filter(function(k){return k!==id}).slice(0,4);
      if(nb.length){
        h+='<div class="dt-sec"><h3>🗺️ 更多区县</h3><div style="display:flex;flex-wrap:wrap;gap:8px">';
        nb.forEach(function(k){
          var v=districts[k];
          h+='<a href="district.html?id='+k+'" style="flex:1;min-width:45%;text-align:center;padding:14px 8px;background:#fff;border:1px solid #4a6cf720;border-radius:10px;text-decoration:none;font-size:13px;color:#4a6cf7;font-weight:600">'+v.name+'</a>';
        });
        h+='</div></div>';
      }
      c.innerHTML=h;
    }
    (function(){
      var id=(location.search.split('id=')[1]||'').split('&')[0];
      if(id) renderDistrict(decodeURIComponent(id));
    })();
  </script>
  <script>if(window.IZ&&IZ.layout){document.addEventListener('DOMContentLoaded',IZ.layout.init)}</script>
</body>
</html>"""

with open('district.html', 'w', encoding='utf-8') as f:
    f.write(district_html)
print("  重写 district.html")

# ============================================================
# 验证所有 IZ_SKIP_APP_INIT 页面
# ============================================================
print("\n=== 最终验证 ===")
import subprocess
for f in ['weekend.html','district.html','zhoumo.html']:
    r=subprocess.run(['grep','-c','IZ_SKIP_APP_INIT',f], capture_output=True, text=True)
    print(f"  {'✅' if int(r.stdout.strip())>0 else '❌'} {f}")

print("\nDone!")
