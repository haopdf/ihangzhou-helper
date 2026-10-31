#!/usr/bin/env python3
"""
为 coffee.html 和 scenic.html 创建完整独立页面：
1. 创建数据文件
2. 重写 HTML 页面
"""
import os, subprocess

# ============================================================
# 1. 创建 coffee-data.js
# ============================================================
coffee_data = """/* 咖啡频道数据 | 挂载 window.COFFEE_DATA */
window.COFFEE_DATA = {
  'hu-pan': {
    name: '西湖边咖啡',
    subtitle: '湖景第一排 · 城央水岸',
    category: '� 景观',
    history: '西湖东岸和西岸集中了大量精品咖啡馆。断桥边、湖滨路、北山街一带可以一边品咖啡一边欣赏西湖美景。这些咖啡馆以城央景观为主打，是游客和本地人休闲的首选。',
    features: ['断桥一线湖景','湖滨沿街','景观第一排','游客打卡'],
    area: '西湖湖滨-断桥-北山街',
    tips: '周末人流较大，建议工作日上午前往',
    shops: [
      {n:'湖滨银泰周边',a:'武林广场近',t:'连锁精品咖啡聚集'},
      {n:'北山街咖啡馆群',a:'北山街沿线',t:'西湖景观第一排'},
      {n:'断桥附近',a:'白堤入口',t:'经典打卡点'}
    ]
  },
  'xiezilou': {
    name: '写字楼咖啡',
    subtitle: 'CBD 商务 · 快捷品质',
    category: '🏢 商务',
    history: '杭州各写字楼大堂和附属空间精品咖啡密度高。武林广场、钱江新城、未来科技城等 CBD 区域，连锁精品与独立咖啡馆竞争激烈。工作日午间是高峰期。',
    features: ['CBD 大堂','快捷商务','连锁精品','午间高峰'],
    area: '武林-钱江新城-未来科技城',
    tips: '周末写字楼区域人流少，体验更佳',
    shops: [
      {n:'武林广场 CBD',a:'武林广场周边',t:'商务咖啡密集'},
      {n:'钱江新城',a:'市民中心周边',t:'高端写字楼配套'},
      {n:'未来科技城',a:'文一西路',t:'科技公司配套'}
    ]
  },
  'qinzhaizi': {
    name: '青芝坞咖啡',
    subtitle: '浙大校园旁 · 文艺慢生活',
    category: '� 校园',
    history: '青芝坞位于浙大玉泉校区与玉泉植物园之间，是杭州最有文艺气息的街区之一。小巷里藏着咖啡馆、独立书店、小酒馆，是浙大师生和文艺青年的后花园。',
    features: ['浙大旁边','文艺街区','独立书店','慢生活'],
    area: '玉泉·植物园旁',
    tips: '春秋天最佳，趁下午阳光',
    shops: [
      {n:'青芝坞主街',a:'玉古路',t:'小店集中'},
      {n:'植物园咖啡',a:'玉泉植物园附近',t:'庭院景观'},
      {n:'浙大旁咖啡馆',a:'求是村',t:'学生氛围'}
    ]
  },
  'siyanku': {
    name: '四眼井咖啡',
    subtitle: '虎跑路老宅 · 露台山景',
    category: '�️ 山景',
    history: '四眼井位于虎跑路、满觉陇一带，因旧时水井而得名。这里集中了大量由老宅改造的咖啡馆和民宿，露台可眺望满陇桂雨和茶园风光。秋赏桂、春赏樱。',
    features: ['老宅改造','露台山景','满陇桂雨','文艺民宿'],
    area: '虎跑路-满觉陇',
    tips: '秋季桂花季最美',
    shops: [
      {n:'四眼井主街',a:'虎跑路',t:'老宅咖啡聚集'},
      {n:'满觉陇路',a:'满觉陇',t:'山景露台'},
      {n:'虎跑公园旁',a:'虎跑路',t:'幽静闲适'}
    ]
  },
  'manjue-cafe': {
    name: '满觉陇咖啡',
    subtitle: '桂花树下 · 山居慢生活',
    category: '🌸 山居',
    history: '满觉陇被称为"满陇桂雨"，是杭州秋天最美的一条路。沿途咖啡馆将桂花融入甜品和特调，品咖啡的同时赏桂闻香。春有龙井茶，秋有桂花香，四季皆宜。',
    features: ['桂花龙井','满陇桂雨','山居慢生活','四季皆美'],
    area: '满觉陇路',
    tips: '桂花季节人流大',
    shops: [
      {n:'满觉陇咖啡群',a:'满觉陇路',t:'沿街密集'},
      {n:'民宿咖啡',a:'满觉陇小巷',t:'庭院私密'},
      {n:'山顶平台',a:'满觉陇高处',t:'全景视野'}
    ]
  },
  'tianmuli': {
    name: '天目里咖啡',
    subtitle: '万科打造的文艺咖啡街区',
    category: '�️ 新地标',
    history: '天目里位于西湖区，是万科打造的综合性文艺空间。�屋书店、\% Arabica 等国内外知名品牌入驻，已成为杭州新的文艺打卡地。',
    features: ['�屋书店','国际品牌','文艺空间','新潮地标'],
    area: '天目山路',
    tips: '周末人流量大',
    shops: [
      {n:'天目里主街区',a:'天目山路',t:'品牌林立'},
      {n:'茑屋书店咖啡',a:'天目里内',t:'书香咖啡'},
      {n:'办公空间咖啡',a:'天目里',t:'设计感强'}
    ]
  },
  'dongxin': {
    name: '东信和创园咖啡',
    subtitle: '旧厂房改造 · 工业风设计',
    category: '🏭 工业风',
    history: '东信和创园是东信集团旧厂房改造的文创园区。工业风建筑和 loft 风格的咖啡馆吸引了大量摄影师和文艺青年。近年来已成为杭州独立咖啡的新地标。',
    features: ['旧厂房改造','工业风','文创园区','拍照圣地'],
    area: '留和路',
    tips: '适合拍照打卡',
    shops: [
      {n:'园区主路',a:'留和路',t:'独立咖啡馆'},
      {n:' loft 咖啡',a:'旧厂房改造',t:'工业风设计'},
      {n:'设计师空间',a:'和创园',t:'复合业态'}
    ]
  }
};
"""

with open('js/coffee-data.js', 'w', encoding='utf-8') as f:
    f.write(coffee_data)
print("  创建 js/coffee-data.js")

# ============================================================
# 2. 创建 scenic-data.js
# ============================================================
scenic_data = """/* 景点频道数据 | 挂载 window.SCENIC_DATA */
window.SCENIC_DATA = {
  'hu-pan-jing': {
    name: '湖滨景区',
    subtitle: '西湖东岸 · 城市中心',
    category: '� 经典',
    history: '湖滨景区是西湖的东大门，城市与湖面在此交汇。湖滨步行街、音乐喷泉、断桥残雪步步是景。这里是游客最密集的观景区域，也是杭州城市客厅。',
    features: ['音乐喷泉','断桥入口','步行街','城湖交汇'],
    area: '西湖东岸',
    tips: '傍晚看音乐喷泉最佳',
    shops: [
      {n:'湖滨步行街',a:'湖滨路',t:'餐饮购物'},
      {n:'音乐喷泉观看点',a:'湖滨三公园',t:'每晚两场'}
    ]
  },
  'ling-yin': {
    name: '灵隐景区',
    subtitle: '千年古刹 · 飞来峰',
    category: '🏛️ 经典',
    history: '灵隐寺始建于东晋，距今1700年历史。飞来峰石刻是国内石窟艺术的重要遗存。每年香客和游客络绎不绝，是杭州最核心的佛教文化旅游区。',
    features: ['千年古刹','飞来峰','石窟艺术','佛教文化'],
    area: '灵隐路',
    tips: '建议早上去避开人流',
    shops: [
      {n:'飞来峰门票',a:'75元（含灵隐寺）',t:'景区入口'},
      {n:'灵隐寺',a:'飞来峰景区内',t:'千年道场'},
      {n:'永福寺',a:'灵隐路上方',t:'更幽静'}
    ]
  },
  'xi-hu-shi-jing': {
    name: '西湖十景',
    subtitle: '历代名家 · 四季经典',
    category: '🏅 经典',
    history: '西湖十景形成于南宋，包括苏堤春晓、曲院风荷、平湖秋月、断桥残雪、柳浪闻莺、花港观峰、雷峰夕照、双峰插云、南屏晚钟、三潭印月。每一景背后都有历史典故。',
    features: ['南宋形成','四季有景','诗意杭州','文化名片'],
    area: '环西湖',
    tips: '每季有一景最美',
    shops: [
      {n:'苏堤春晓',d:'春季最佳'},
      {n:'曲院风荷',d:'夏季赏荷'},
      {n:'平湖秋月',d:'秋夜赏月'},
      {n:'断桥残雪',d:'冬季雪景'}
    ]
  },
  'gushan': {
    name: '孤山景区',
    subtitle: '西湖中最大岛屿 · 文化荟萃',
    category: '🏝️ 文化',
    history: '孤山是西湖中最大的岛屿，面积20公顷。西泠印社、浙江省博物馆(孤山馆)、林和靖墓、放鹤亭均在此处。文人墨客推崇备至，是杭州文化密度最高的景区。',
    features: ['西泠印社','文人胜迹','文化绿洲','湖心岛'],
    area: '西湖孤山',
    tips: '免费开放',
    shops: [
      {n:'西泠印社',a:'孤山南麓',t:'天下第一名社'},
      {n:'浙江省博物馆孤山馆',a:'孤山路',t:'免费'},
      {n:'放鹤亭',d:'孤山顶'}
    ]
  },
  'long-wu': {
    name: '龙井问茶',
    subtitle: '乾隆御茶 · 八棵御茶树',
    category: '🍃 茶文化',
    history: '龙井村是西湖龙井核心产区。乾隆皇帝曾四访龙井，封十八棵御茶树。村中茶室可品尝正宗龙井，观赏茶园风光。清明前后采茶时节最美。',
    features: ['十八棵御茶','龙井村','茶文化','乾隆故事'],
    area: '龙井路',
    tips: '明前茶最贵',
    shops: [
      {n:'十八棵御茶树',a:'龙井村',t:'乾隆御封'},
      {n:'龙井村茶室',a:'龙井路',t:'品茶观光'},
      {n:'御茶园',a:'狮峰山',t:'核心产区'}
    ]
  },
  'he-fang': {
    name: '河坊街历史街区',
    subtitle: '南宋市井 · 老城烟火',
    category: '🏯 历史',
    history: '河坊街是杭州历史上最著名的商业街，吴越国和南宋时期的市井繁华延续至今。胡庆余堂、王星记、张小泉等老字号聚集于此。大井巷的传统药铺、鼓楼的城门遗址诉说着千年故事。',
    features: ['老字号聚集','南宋市井','烟火气','传统建筑'],
    area: '河坊街-大井巷',
    tips: '晚上更热闹',
    shops: [
      {n:'胡庆余堂',a:'大井巷',t:'江南药王'},
      {n:'河坊街步行街',a:'河坊街',t:'老字号一条街'},
      {n:'鼓楼',a:'河坊街西端',t:'南宋城门遗址'}
    ]
  },
  'si-ti': {
    name: '苏堤春晓',
    subtitle: '苏轼修建 · 十景之首',
    category: '� 西湖十景',
    history: '苏堤全长2.8公里，北宋苏轼任杭州知州时疏浚西湖所筑。春季拂晓漫步堤上，烟柳笼纱，莺啼阵阵，"苏堤春晓"列为西湖十景之首。',
    features: ['2.8公里长堤','苏轼修建','春晓最美','烟柳'],
    area: '西湖南北纵贯',
    tips: '春季早晨最迷人',
    shops: [
      {n:'映波桥',d:'苏堤南端第一个桥'},
      {n:'望山桥',d:'西湖观景位'},
      {n:'压堤桥',d:'苏堤中段'}
    ]
  },
  'qu-yuan-he-feng': {
    name: '曲院风荷',
    subtitle: '南宋酒坊 · 夏日赏荷',
    category: '🌸 西湖十景',
    history: '曲院风荷位于西湖北岸，南宋时为官家酿酒作坊，荷塘环绕。夏季赏荷的最佳地点，荷叶田田，荷花映日。月色下的荷塘更是别有韵味。',
    features: ['夏季赏荷','南宋酒坊','荷塘月色','荷花节'],
    area: '西湖北岸',
    tips: '夏季傍晚最佳',
    shops: [
      {n:'曲院荷塘',a:'西湖北岸',t:'主要赏荷点'},
      {n:'风荷曲桥',a:'曲院内',t:'荷塘小桥'}
    ]
  },
  'nan-ping-wan-zhong': {
    name: '南屏晚钟',
    subtitle: '净慈寺 · 西湖南岸黄昏',
    category: '🔔 西湖十景',
    history: '南屏晚钟指南屏山净慈寺傍晚的钟声。每日黄昏，净慈寺钟声回荡在西湖水面，与雷峰塔夕照相映成趣。诗人杜牧有"南朝四百八十寺，多少楼台烟雨中"之叹。',
    features: ['净慈寺钟声','黄昏回荡','文化意象','诗意杭州'],
    area: '西湖南岸',
    tips: '日暮时分听钟最佳',
    shops: [
      {n:'净慈寺',a:'南屏山',t:'千年古刹'},
      {n:'南屏山步道',a:'净慈寺下方',t:'湖景观赏'}
    ]
  },
  'san-tan-yin-yue': {
    name: '三潭印月',
    subtitle: '湖心三塔 · 月夜奇观',
    category: '🌙 西湖十景',
    history: '三潭印月是西湖中最大岛屿。苏轼疏浚西湖时在湖中建三座石塔为界标。月夜燃烛于塔内，烛光、月光、湖光交相辉映，形成三十三个月亮的奇观。一元纸币背面图案即此处。',
    features: ['三个石塔','一元纸币景观','月夜最佳','园林岛'],
    area: '西湖中央',
    tips: '需乘船上岛',
    shops: [
      {n:'三潭印月门票',a:'55元含船票',t:'西湖游船'},
      {n:'我心相印亭',a:'岛上',t:'赏月观湖'},
      {n:'九曲桥',a:'岛上园路',t:'园林水趣'}
    ]
  }
};
"""

with open('js/scenic-data.js', 'w', encoding='utf-8') as f:
    f.write(scenic_data)
print("  创建 js/scenic-data.js")

# ============================================================
# 3. 重写 coffee.html 为独立页面
# ============================================================
coffee_html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="杭州咖啡地图：西湖边、青芝坞、四眼井、馒头山、天目里、东信和创园，精选咖啡店铺推荐">
  <meta name="keywords" content="杭州咖啡,西湖边咖啡,青芝坞,馒头山,天目里,ihangzhou">
  <meta name="theme-color" content="#6f4e37">
  <title>咖啡馆指南 · iHangzhou 杭州生活助手</title>
  <link rel="stylesheet" href="css/style.css?v=20260921h">
  <script src="js/layout.js"></script>
  <style>
    .ds-cr{padding:8px 12px;border-radius:8px;font-size:12px;font-weight:600;color:#5d4037;display:inline-block;margin-bottom:8px;background:#f5f0eb}
    .ds-hero{font-size:28px;font-weight:700;color:#3e2723;margin:2px 0 4px}
    .ds-subtitle{font-size:15px;color:#6d4c41;margin-bottom:12px}
    .ds-sec{background:#fff;border-radius:14px;padding:16px;margin:12px 16px;box-shadow:0 2px 8px rgba(111,78,55,.06)}
    .ds-sec h3{font-size:15px;font-weight:600;color:#3e2723;margin:0 0 8px;display:flex;align-items:center;gap:6px}
    .ds-ftag{display:inline-block;padding:3px 8px;background:#efebe9;border-radius:8px;font-size:11px;color:#5d4037;margin:3px 4px 0 0}
    .ds-shp{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f5f5f5}
    .ds-shp:last-child{border-bottom:none}
    .ds-shico{width:36px;height:36px;background:#f5f0eb;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
    .ds-shn{font-size:14px;font-weight:600;color:#3e2723}
    .ds-sha{font-size:12px;color:#888;margin-top:2px}
    .ds-sht{font-size:11px;color:#a1887f;margin-top:2px}
    .ds-tip{background:#fff8e1;border-left:4px solid #ffa726;padding:10px 14px;font-size:13px;color:#f57f17;margin:0 16px 8px;border-radius:0 8px 8px 0}
    .ds-err{text-align:center;padding:40px 20px;color:#999}
    .ds-back{display:block;text-align:center;padding:12px;background:#6f4e37;color:#fff;border-radius:24px;font-size:14px;text-decoration:none;margin:16px;max-width:180px;margin-inline:auto}
  </style>
</head>
<body>
  <script>
    window.IHZ_PAGE = { title: "咖啡馆指南", icon: "☕", channelId: "coffee" };
    window.IZ_SKIP_APP_INIT = true;
    window.IZ_SKIP_APP_THEME = true;
  </script>

  <div class="page active" id="pageChannel">
    <div class="channel-header" id="channelHeader"></div>
    <div class="channel-desc" id="channelDesc"></div>

    <!-- 咖啡详情渲染容器 -->
    <div id="coffeeContent" style="padding:16px;"></div>

    <!-- 返回 -->
    <div style="text-align:center;padding:24px 16px 48px">
      <a href="index.html" class="ds-back">← 返回首页</a>
    </div>
  </div>

  <script src="js/coffee-data.js"></script>
  <script>
    function renderCoffee(id){
      var c = document.getElementById('coffeeContent');
      if (!c) return;
      var data = window.COFFEE_DATA ? window.COFFEE_DATA[id] : null;
      var keys = window.COFFEE_DATA ? Object.keys(window.COFFEE_DATA) : [];
      if (!data) {
        c.innerHTML = '<div class="ds-err">没有找到相关咖啡信息<br><br><a href="coffee.html" style="color:#6f4e37">← 回到咖啡首页</a></div>';
        return;
      }
      var h = '';
      h += '<span class="ds-cr">' + (data.category || '☕ 咖啡') + '</span>';
      h += '<div class="ds-hero">' + data.name + '</div>';
      h += '<div class="ds-subtitle">' + (data.subtitle || '') + '</div>';
      if (data.history) {
        h += '<div class="ds-sec"><h3>� 区域特色</h3><div style="font-size:14px;color:#444;line-height:1.7">' + data.history + '</div>';
        if (data.features && data.features.length) {
          h += '<div style="margin-top:8px">';
          data.features.forEach(function(f){ h += '<span class="ds-ftag">' + f + '</span>'; });
          h += '</div>';
        }
        h += '</div>';
      }
      if (data.area) {
        h += '<div class="ds-sec"><h3>📍 所在区域</h3><div style="font-size:14px;color:#444">' + data.area + '</div></div>';
      }
      if (data.tips) {
        h += '<div class="ds-tip">💡 小贴士：' + data.tips + '</div>';
      }
      if (data.shops && data.shops.length) {
        h += '<div class="ds-sec"><h3>� 推荐去处</h3>';
        data.shops.forEach(function(s) {
          h += '<div class="ds-shp"><div class="ds-shico">�</div><div>';
          h += '<div class="ds-shn">' + s.n + '</div>';
          if (s.a) h += '<div class="ds-sha">📍 ' + s.a + '</div>';
          if (s.t) h += '<div class="ds-sht">' + s.t + '</div>';
          h += '</div></div>';
        });
        h += '</div>';
      }
      var nb = keys.filter(function(k){ return k !== id; }).slice(0, 4);
      if (nb.length) {
        h += '<div class="ds-sec"><h3>� 更多区域</h3><div style="display:flex;flex-wrap:wrap;gap:8px">';
        nb.forEach(function(k) {
          var v = window.COFFEE_DATA[k];
          h += '<a href="coffee.html?id=' + k + '" style="flex:1;min-width:45%;text-align:center;padding:14px 8px;background:#fff;border:1px solid #6f4e3720;border-radius:10px;text-decoration:none;font-size:13px;color:#3e2723;font-weight:600">' + v.name + '</a>';
        });
        h += '</div></div>';
      }
      h += '<a href="cat.html?c=food&s=%E5%92%96%E5%95%A1" style="display:block;text-align:center;padding:14px;background:#6f4e37;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;margin:12px 16px">← 美食频道</a>';
      c.innerHTML = h;
    }
    (function(){
      var id = (location.search.split('id=')[1] || '').split('&')[0];
      renderCoffee(decodeURIComponent(id));
    })();
  </script>
  <script>if(window.IZ&&IZ.layout){document.addEventListener('DOMContentLoaded',IZ.layout.init)}</script>
</body>
</html>
"""

with open('coffee.html', 'w', encoding='utf-8') as f:
    f.write(coffee_html)
print("  重写 coffee.html (独立页面)")

# ============================================================
# 4. 重写 scenic.html 为独立页面
# ============================================================
scenic_html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <meta name="description" content="杭州景区指南：西湖十景、灵隐寺、孤山、河坊街、龙井问茶、三潭印月">
  <meta name="keywords" content="杭州景点,西湖十景,灵隐寺,孤山,三潭印月">
  <meta name="theme-color" content="#1565c0">
  <title>景区指南 · iHangzhou 杭州生活助手</title>
  <link rel="stylesheet" href="css/style.css?v=20260921h">
  <script src="js/layout.js"></script>
  <style>
    .sc-hero{font-size:28px;font-weight:700;color:#0d47a1;margin:2px 0 4px}
    .sc-sub{font-size:15px;color:#1565c0;margin-bottom:12px}
    .sc-cr{padding:8px 12px;border-radius:8px;font-size:12px;font-weight:600;display:inline-block;margin-bottom:8px;background:#e3f2fd;color:#0d47a1}
    .sc-sec{background:#fff;border-radius:14px;padding:16px;margin:12px 16px;box-shadow:0 2px 8px rgba(21,101,192,.06)}
    .sc-sec h3{font-size:15px;font-weight:600;color:#0d47a1;margin:0 0 8px;display:flex;align-items:center;gap:6px}
    .sc-ftag{display:inline-block;padding:3px 8px;background:#e3f2fd;border-radius:8px;font-size:11px;color:#1565c0;margin:3px 4px 0 0}
    .sc-shp{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid #f5f5f5}
    .sc-shp:last-child{border-bottom:none}
    .sc-shico{width:36px;height:36px;background:#e3f2fd;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
    .sc-shn{font-size:14px;font-weight:600;color:#0d47a1}
    .sc-sha{font-size:12px;color:#888;margin-top:2px}
    .sc-tip{background:#fff8e1;border-left:4px solid #ffa726;padding:10px 14px;font-size:13px;color:#f57f17;margin:0 16px 8px;border-radius:0 8px 8px 0}
    .sc-back{display:block;text-align:center;padding:12px;background:#1565c0;color:#fff;border-radius:24px;font-size:14px;text-decoration:none;max-width:180px;margin:16px auto}
  </style>
</head>
<body>
  <script>
    window.IHZ_PAGE = { title: "景区指南", icon: "🏛️", channelId: "scenic" };
    window.IZ_SKIP_APP_INIT = true;
    window.IZ_SKIP_APP_THEME = true;
  </script>

  <div class="page active" id="pageChannel">
    <div class="channel-header" id="channelHeader"></div>
    <div class="channel-desc" id="channelDesc"></div>
    <div id="scenicContent" style="padding:16px;"></div>
    <div style="text-align:center;padding:24px 16px 48px">
      <a href="index.html" class="sc-back">← 返回首页</a>
    </div>
  </div>

  <script src="js/scenic-data.js"></script>
  <script>
    function renderScenic(id){
      var c = document.getElementById('scenicContent');
      if (!c) return;
      var data = window.SCENIC_DATA ? window.SCENIC_DATA[id] : null;
      var keys = window.SCENIC_DATA ? Object.keys(window.SCENIC_DATA) : [];
      if (!data) {
        c.innerHTML = '<div class="sc-sec" style="text-align:center;color:#999">没有找到相关景区信息<br><br><a href="scenic.html" style="color:#1565c0">← 返回景区首页</a></div>';
        return;
      }
      var h = '';
      h += '<span class="sc-cr">' + (data.category || '🏛️ 景区') + '</span>';
      h += '<div class="sc-hero">' + data.name + '</div>';
      h += '<div class="sc-sub">' + (data.subtitle || '') + '</div>';
      if (data.history) {
        h += '<div class="sc-sec"><h3>📖 景区介绍</h3><div style="font-size:14px;color:#444;line-height:1.7">' + data.history + '</div>';
        if (data.features && data.features.length) {
          h += '<div style="margin-top:8px">';
          data.features.forEach(function(f){ h += '<span class="sc-ftag">' + f + '</span>'; });
          h += '</div>';
        }
        h += '</div>';
      }
      if (data.area) {
        h += '<div class="sc-sec"><h3>📍 地理位置</h3><div style="font-size:14px;color:#444">' + data.area + '</div></div>';
      }
      if (data.tips) {
        h += '<div class="sc-tip">💡 小贴士：' + data.tips + '</div>';
      }
      if (data.shops && data.shops.length) {
        h += '<div class="sc-sec"><h3>� 游玩推荐</h3>';
        data.shops.forEach(function(s) {
          h += '<div class="sc-shp"><div class="sc-shico">�</div><div>';
          h += '<div class="sc-shn">' + s.n + '</div>';
          if (s.a) h += '<div class="sc-sha">📍 ' + s.a + '</div>';
          if (s.d) h += '<div class="sc-sha" style="color:#888;font-size:12px;margin-top:2px">' + s.d + '</div>';
          h += '</div></div>';
        });
        h += '</div>';
      }
      var nb = keys.filter(function(k){ return k !== id; }).slice(0, 4);
      if (nb.length) {
        h += '<div class="sc-sec"><h3>🏛️ 更多景区</h3><div style="display:flex;flex-wrap:wrap;gap:8px">';
        nb.forEach(function(k) {
          var v = window.SCENIC_DATA[k];
          h += '<a href="scenic.html?id=' + k + '" style="flex:1;min-width:45%;text-align:center;padding:14px 8px;background:#fff;border:1px solid #1565c020;border-radius:10px;text-decoration:none;font-size:13px;color:#0d47a1;font-weight:600">' + v.name + '</a>';
        });
        h += '</div></div>';
      }
      h += '<a href="cat.html?c=travel" style="display:block;text-align:center;padding:14px;background:#1565c0;color:#fff;border-radius:24px;text-decoration:none;font-size:14px;font-weight:600;margin:12px 16px">← 旅游频道</a>';
      c.innerHTML = h;
    }
    (function(){
      var id = (location.search.split('id=')[1] || '').split('&')[0];
      renderScenic(decodeURIComponent(id));
    })();
  </script>
  <script>if(window.IZ&&IZ.layout){document.addEventListener('DOMContentLoaded',IZ.layout.init)}</script>
</body>
</html>
"""

with open('scenic.html', 'w', encoding='utf-8') as f:
    f.write(scenic_html)
print("  重写 scenic.html (独立页面)")

# ============================================================
# 验证
# ============================================================
print("\n最终验证:")
for df in ['js/coffee-data.js','js/scenic-data.js','js/dessert-data.js','js/tea-data.js','js/laozihao-data.js','js/lingren-data.js','js/lishi-data.js']:
    if os.path.exists(df):
        r = subprocess.run(['node','-c',df], capture_output=True, text=True)
        ok = r.returncode == 0
        print(f"  {'✅' if ok else '❌'} {df}")
