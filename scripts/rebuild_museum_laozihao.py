#!/usr/bin/env python3
"""
重写 museum.html 和 laozihao.html 为独立页面
"""
import os

# ============================================================
# museum.html - 独立页面
# ============================================================
museum_html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="杭州博物馆地图，省博物馆、丝绸博物馆、茶叶博物馆、浙江美术馆">
  <meta name="keywords" content="杭州博物馆,浙江省博物馆,丝绸博物馆,茶叶博物馆">
  <meta name="theme-color" content="#8a6fd6">
  <title>博物馆指南 - iHangzhou</title>
  <link rel="stylesheet" href="css/style.css?v=20260921h">
  <script src="js/layout.js"></script>
  <style>
    .mu-h{font-size:28px;font-weight:700;margin:2px 0 4px}
    .mu-s{font-size:15px;color:#666;margin-bottom:12px}
    .mu-cr{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;display:inline-block;background:#f3e5f5;color:#6a1b9a;margin-bottom:8px}
    .mu-sec{background:#fff;border-radius:14px;padding:16px;margin:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
    .mu-sec h3{font-size:15px;font-weight:600;margin:0 0 8px;display:flex;align-items:center;gap:6px}
    .mu-fg{display:inline-block;padding:3px 8px;background:#f3e5f5;border-radius:8px;font-size:11px;color:#6a1b9a;margin:3px 4px 0 0}
    .mu-bk{display:block;text-align:center;padding:12px;background:#8a6fd6;color:#fff;border-radius:24px;font-size:14px;text-decoration:none;max-width:180px;margin:16px auto}
  </style>
</head>
<body>
  <script>
    window.IHZ_PAGE = { title: "博物馆指南", icon: "�️", channelId: "museum" };
    window.IZ_SKIP_APP_INIT = true;
    window.IZ_SKIP_APP_THEME = true;
  </script>
  <div class="page active" id="pageChannel">
    <div id="detailContent" style="padding:16px;"></div>
    <div style="text-align:center;padding:24px 16px 48px">
      <a href="index.html" class="mu-bk">← 返回首页</a>
    </div>
  </div>
  <script src="js/museum-data.js"></script>
  <script>
    function renderMuseum(id){
      var c=document.getElementById('detailContent');
      if(!c)return;
      var data=window.MUSEUM_DATA?window.MUSEUM_DATA[id]:null;
      var keys=window.MUSEUM_DATA?Object.keys(window.MUSEUM_DATA):[];
      if(!data){
        c.innerHTML='<div style="text-align:center;padding:40px 20px;color:#999">没有找到相关信息<br><br><a href="museum.html" style="color:#8a6fd6">← 返回博物馆首页</a></div>';
        return;
      }
      var nameStr = data.name;
      var h='';
      h+='<span class="mu-cr">�️ 博物馆</span>';
      h+='<div class="mu-h">'+nameStr+'</div>';
      h+='<div class="mu-s">'+(data.subtitle||'')+'</div>';
      if(data.open_time) h+='<div style="background:#f3e5f5;border-radius:10px;padding:10px 14px;margin:8px 16px;font-size:13px;color:#6a1b9a">� 开放时间：'+data.open_time+'</div>';
      if(data.history){
        h+='<div class="mu-sec"><h3>🏛️ 博物馆介绍</h3><div style="font-size:14px;color:#444;line-height:1.8">'+data.history+'</div></div>';
      }
      if(data.features&&data.features.length){
        h+='<div class="mu-sec"><h3>✨ 特色看点</h3><div style="display:flex;flex-wrap:wrap;gap:6px">';
        for(var i=0;i<data.features.length;i++){h+='<span class="mu-fg">'+data.features[i]+'</span>'}
        h+='</div></div>';
      }
      if(data.shops&&data.shops.length){
        h+='<div class="mu-sec"><h3>📍 场馆信息</h3>';
        for(var i=0;i<data.shops.length;i++){
          var s=data.shops[i];
          h+='<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f5f5f5">';
          h+='<div><div style="font-size:14px;font-weight:600">'+s.n+'</div>';
          if(s.a) h+='<div style="font-size:12px;color:#888;margin-top:2px">📍 '+s.a+'</div>';
          if(s.d) h+='<div style="font-size:12px;color:#888;margin-top:2px">'+s.d+'</div>';
          h+='</div></div>';
        }
        h+='</div>';
      }
      h+='<a href="cat.html?c=culture" style="display:block;text-align:center;padding:14px;background:#8a6fd6;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;margin:12px 16px">← 文博频道</a>';
      c.innerHTML=h;
    }
    (function(){
      var id=(location.search.split('id=')[1]||'').split('&')[0];
      if(window.MUSEUM_DATA&&Object.keys(window.MUSEUM_DATA).length>0&&id){
        renderMuseum(decodeURIComponent(id));
      }
    })();
  </script>
  <script>if(window.IZ&&IZ.layout){document.addEventListener('DOMContentLoaded',IZ.layout.init)}</script>
</body>
</html>"""

with open('museum.html', 'w', encoding='utf-8') as f:
    f.write(museum_html)
print("  重写 museum.html")

# ============================================================
# laozihao.html - 独立页面
# ============================================================
laozihao_html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="杭州老字号：奎元馆、楼外楼、知味观、胡庆余堂">
  <meta name="keywords" content="杭州老字号,奎元馆,楼外楼,知味观,胡庆余堂">
  <meta name="theme-color" content="#b71c1c">
  <title>老字号 - iHangzhou</title>
  <link rel="stylesheet" href="css/style.css?v=20260921h">
  <script src="js/layout.js"></script>
  <style>
    .lz-h{font-size:28px;font-weight:700;color:#b71c1c;margin:2px 0 4px}
    .lz-s{font-size:15px;color:#666;margin-bottom:12px}
    .lz-cr{padding:6px 12px;border-radius:8px;font-size:12px;font-weight:600;display:inline-block;background:#ffebee;color:#b71c1c;margin-bottom:8px}
    .lz-sec{background:#fff;border-radius:14px;padding:16px;margin:12px 16px;box-shadow:0 2px 8px rgba(0,0,0,.06)}
    .lz-sec h3{font-size:15px;font-weight:600;margin:0 0 8px;display:flex;align-items:center;gap:6px}
    .lz-fg{display:inline-block;padding:3px 8px;background:#ffebee;border-radius:8px;font-size:11px;color:#b71c1c;margin:3px 4px 0 0}
    .lz-bk{display:block;text-align:center;padding:12px;background:#b71c1c;color:#fff;border-radius:24px;font-size:14px;text-decoration:none;max-width:180px;margin:16px auto}
  </style>
</head>
<body>
  <script>
    window.IHZ_PAGE = { title: "老字号", icon: "🏮", channelId: "laozihao" };
    window.IZ_SKIP_APP_INIT = true;
    window.IZ_SKIP_APP_THEME = true;
  </script>
  <div class="page active" id="pageChannel">
    <div id="detailContent" style="padding:16px;"></div>
    <div style="text-align:center;padding:24px 16px 48px">
      <a href="index.html" class="lz-bk">← 返回首页</a>
    </div>
  </div>
  <script src="js/laozihao-data.js"></script>
  <script>
    function renderLaozhao(id){
      var c=document.getElementById('detailContent');
      if(!c)return;
      var data=window.LAOZHAO_DATA?window.LAOZHAO_DATA[id]:null;
      var keys=window.LAOZHAO_DATA?Object.keys(window.LAOZHAO_DATA):[];
      if(!data){
        c.innerHTML='<div style="text-align:center;padding:40px 20px;color:#999">没有找到相关信息<br><br><a href="laozihao.html" style="color:#b71c1c">← 返回老字号首页</a></div>';
        return;
      }
      var nameStr=data.name;
      var subStr=data.subtitle||'';
      var h='';
      if(data.badge) h+='<span class="lz-cr">'+data.badge+'</span>';
      h+='<div class="lz-h">'+nameStr+'</div>';
      h+='<div class="lz-s">'+subStr+'</div>';
      if(data.period) h+='<div style="background:#fff8e1;border-radius:10px;padding:10px 14px;margin:8px 16px;font-size:13px;color:#f57f17">📅 创立时间：'+data.period+'</div>';
      if(data.history){
        h+='<div class="lz-sec"><h3>� 品牌故事</h3><div style="font-size:14px;color:#444;line-height:1.8">'+data.history+'</div></div>';
      }
      if(data.features&&data.features.length){
        h+='<div class="lz-sec"><h3>✨ 特色亮点</h3><div style="display:flex;flex-wrap:wrap;gap:6px">';
        for(var i=0;i<data.features.length;i++){h+='<span class="lz-fg">'+data.features[i]+'</span>'}
        h+='</div></div>';
      }
      if(data.shops&&data.shops.length){
        h+='<div class="lz-sec"><h3>📍 门店信息</h3>';
        for(var i=0;i<data.shops.length;i++){
          var s=data.shops[i];
          h+='<div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f5f5f5">';
          h+='<div><div style="font-size:14px;font-weight:600">'+s.n+'</div>';
          if(s.a) h+='<div style="font-size:12px;color:#888;margin-top:2px">📍 '+s.a+'</div>';
          h+='</div></div>';
        }
        h+='</div>';
      }
      if(data.spots&&data.spots.length){
        h+='<div class="lz-sec"><h3>📍 主要看点</h3>';
        for(var i=0;i<data.spots.length;i++){
          var s=data.spots[i];
          h+='<div style="padding:8px 0;border-bottom:1px solid #f5f5f5"><div style="font-size:14px;font-weight:600">'+s.n+'</div>';
          if(s.d) h+='<div style="font-size:12px;color:#888;margin-top:2px">'+s.d+'</div>';
          h+='</div>';
        }
        h+='</div>';
      }
      var nb=keys.filter(function(k){return k!==id}).slice(0,4);
      if(nb.length){
        h+='<div class="lz-sec"><h3>🏮 更多老字号</h3><div style="display:flex;flex-wrap:wrap;gap:8px">';
        for(var i=0;i<nb.length;i++){
          var k=nb[i];
          var v=window.LAOZHAO_DATA[k];
          h+='<a href="laozihao.html?id='+k+'" style="flex:1;min-width:45%;text-align:center;padding:14px 8px;background:#fff;border:1px solid #b71c1c20;border-radius:10px;text-decoration:none;font-size:13px;color:#b71c1c;font-weight:600">'+v.name+'</a>';
        }
        h+='</div></div>';
      }
      h+='<a href="cat.html?c=food" style="display:block;text-align:center;padding:14px;background:#b71c1c;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;margin:12px 16px">← 美食频道</a>';
      c.innerHTML=h;
    }
    (function(){
      var id=(location.search.split('id=')[1]||'').split('&')[0];
      if(window.LAOZHAO_DATA&&Object.keys(window.LAOZHAO_DATA).length>0&&id){
        renderLaozhao(decodeURIComponent(id));
      }
    })();
  </script>
  <script>if(window.IZ&&IZ.layout){document.addEventListener('DOMContentLoaded',IZ.layout.init)}</script>
</body>
</html>"""

with open('laozihao.html', 'w', encoding='utf-8') as f:
    f.write(laozihao_html)
print("  重写 laozihao.html")

print("\n✅ 页面重写完成")
