#!/usr/bin/env python3
"""
扫描 articles/ 下所有 HTML 文件，重新生成 articles/index.json
提取：title, description, 字数, 分类（根据文件名推断）
"""
import os
import re
import json
import html
from pathlib import Path

ARTICLES_DIR = Path(__file__).resolve().parent.parent / "articles"
OUTPUT_FILE = ARTICLES_DIR / "index.json"

# 文件名前缀 -> 分类映射（顺序靠前优先匹配）
CATEGORY_MAP = [
    # series 编号系列
    (r"^series-01-", "01-美食系列"),
    (r"^series-02-", "02-记忆系列"),
    (r"^series-03-", "03-人物系列"),
    (r"^series-04-", "04-街道系列"),
    (r"^series-05-", "05-亲子时光系列"),
    (r"^series-06-", "06-历史文化系列"),
    (r"^series-07-", "07-民俗文化系列"),
    (r"^series-08-", "08-现代杭州系列"),
    (r"^series-09-", "09-体育健康系列"),
    (r"^series-10-", "10-房产楼市系列"),
    (r"^series-11-", "11-旅游攻略系列"),
    (r"^series-12-", "12-热点时事系列"),
    (r"^series-13-", "13-运动健身系列"),
    (r"^series-14-", "14-生活指南系列"),
    (r"^series-15-", "15-博物馆系列"),
    (r"^series-16-", "16-社交生活系列"),
    (r"^series-17-", "17-学习提升系列"),
    (r"^series-18-", "18-周末休闲系列"),
    (r"^series-19-", "19-杭州特色系列"),
    (r"^series-20-", "20-亲子育儿系列"),
    (r"^series-21-", "21-驾考停车系列"),
    (r"^series-22-", "22-法律维权系列"),
    (r"^series-23-", "23-现代发展系列"),
    (r"^series-24-", "24-运河文化系列"),
    (r"^series-2[5-9]|^series-3\d|^series-4\d|^series-50", "25-多元文化系列"),
    # 其他命名模式
    (r"^人物系列-", "03-人物系列"),
    (r"^办事系列-", "14-办事指南系列"),
    (r"^医疗系列-", "09-医疗健康系列"),
    (r"^亲子时光-", "05-亲子时光系列"),
    (r"^亲子美食-", "05-亲子美食系列"),
    (r"^历史类-", "06-历史文化系列"),
    (r"^城area?记忆-", "02-记忆系列"),
    (r"^城市记忆-", "02-记忆系列"),
    (r"^生活指南-", "14-生活指南系列"),
    (r"^杭州建筑艺术-", "15-建筑艺术系列"),
    (r"^房产楼市-", "10-房产楼市系列"),
    (r"^非遗传承-", "07-民俗文化系列"),
    (r"^校园文化-", "17-校园文化系列"),
    (r"^新杭州人-", "23-现代杭州系列"),
    (r"^西湖文化-", "06-西湖文化系列"),
    (r"^西溪湿地-", "06-杭州自然系列"),
    (r"^杭州[方言话]-", "07-方言文化系列"),
    (r"^杭州文化-", "06-文化系列"),
    (r"^杭州特色-", "19-杭州特色系列"),
    (r"^杭州饮食文化-", "01-美食系列"),
    (r"^杭州节庆-", "07-节庆文化系列"),
    (r"^民俗文化与?杭州-", "07-民俗文化系列"),
    (r"^杭州的手工业", "07-手工业文化系列"),
    (r"^杭州的?(古代|传统)", "06-历史文化系列"),
    (r"^丝绸之路-", "06-历史文化系列"),
    (r"^steam教育|steam.?教育|stem教育", "17-教育系列"),
    (r"^三潭印月", "06-西湖文化系列"),
    (r"^南宋", "06-南宋文化系列"),
    (r"^偏安一隅", "06-南宋文化系列"),
    (r"^余华|刘禹锡|关汉卿|刘过|刘鹗|陆游|苏轼|白居易|苏东坡|岳飞|李清照|徐志摩|李叔同|鲁迅|金庸", "06-文学系列"),
    (r"^别人家的孩子", "20-亲子教育系列"),
    (r"^系列-?\d+", "06-文化系列"),
    (r"^杭州[的之]", "06-杭州文化系列"),
    (r"^优化版", "06-杭州新十景系列"),
    (r"^西湖", "06-西湖文化系列"),
    (r"^钱塘|运河|京杭", "24-运河文化系列"),
    (r"^culinary|food|美食|饮食|味道|小吃|菜肴|菜品", "01-美食系列"),
    (r"^cultural|heritage|文化|历史|传统", "06-历史文化系列"),
    (r"^travel|旅游|旅行|景点|游玩|攻略", "11-旅游攻略系列"),
    (r"^museum|博物馆|美术馆|艺术", "15-博物馆系列"),
    (r"^education|教育|学校|入园|入学|升学", "17-教育系列"),
    (r"^medical|医[疗院]|健康|养生|养老", "09-医疗健康系列"),
    (r"^property|房产|楼市|买房|装修", "10-房产楼市系列"),
    (r"^family|亲子|育儿|儿童|孩子|宝宝|家长", "05-亲子育儿系列"),
    (r"^nature|自然|山水|风景|园林|绿化", "06-杭州自然系列"),
    (r"^people|人物|名人|历史人物", "03-人物系列"),
    (r"^festival|节庆|节日|节气|习俗|民俗", "07-民俗文化系列"),
    (r"^life|生活|日常|指南|攻略|办事|攻略", "14-生活指南系列"),
    (r"^street|街道|路|巷|桥|弄堂", "04-街道系列"),
    (r"^modern|现代|发展|科技|创新|互联网", "08-现代杭州系列"),
    (r"^memory|记忆|怀旧|老[照片东西馆店铺]|消逝|消失", "02-记忆系列"),
    (r"^book|阅读|读书|书店|图书馆", "17-阅读文化系列"),
    (r"^coffee|咖啡|茶馆|喝茶|茶饮", "29-咖啡生活系列"),
    (r"^hotel|酒店|民宿|住宿|旅馆", "30-酒店民宿系列"),
    (r"^shopping|购物|商场|商圈|店铺|逛街", "16-购物生活系列"),
    (r"^music|音乐|歌曲|乐器|戏曲|戏剧|曲艺", "07-音乐戏曲系列"),
    (r"^movie|电影|影院|话剧|演出", "07-影视文化系列"),
    (r"^sport|运动|健身|体育|跑步|骑行", "13-运动健身系列"),
    (r"^pet|宠物|猫|狗|养宠", "14-养宠系列"),
    (r"^social|社交|交友|相亲|婚恋|友情", "16-社交生活系列"),
    (r"^weekend|周末|休闲|娱乐|玩乐", "18-周末休闲系列"),
    (r"^season|春天|夏天|秋天|冬天|四季|节气", "27-四季风情系列"),
    (r"^art|艺术|绘画|书法|雕塑|文创", "07-艺术文化系列"),
    (r"^food|吃|食|菜|餐|厨|味", "01-美食系列"),
    (r"^legal|法律|维权|合同|纠纷|权益", "22-法律维权系列"),
    (r"^traffic|交通|出行|驾车|停车|驾考|道路", "21-交通出行系列"),
    (r"^env|环保|生态|绿色|节能|可持续", "25-环保生态系列"),
    (r"^news|热点|时事|政策|政府|政务", "12-热点时事系列"),
    # 城市管理/治理系列
    (r"^城市[治理建设类]", "08-现代杭州系列"),
    # 居住系列
    (r"^居住系列-", "14-生活指南系列"),
    # 新十景/新新十景
    (r"^新十景-\d+", "06-杭州新十景系列"),
    (r"^新新十景-", "06-杭州新十景系列"),
    # 文学类/文學類
    (r"^文学[类類]", "06-文学系列"),
    (r"^文學類?", "06-文学系列"),
    (r"^藝学類-", "06-文学系列"),
    # 民国名人与杭州
    (r"^民国名人与杭州-", "03-人物系列"),
    # 职场系列
    (r"^职场系列-", "14-生活指南系列"),
    # 非遗类
    (r"^非遗类-", "07-民俗文化系列"),
    (r"^非物质文化遗产-", "07-民俗文化系列"),
    (r"^非遗[系类]-", "07-民俗文化系列"),
    (r"^非遗系列-", "07-民俗文化系列"),
    # 水系文化/江河文明/河流文明/湖泊文明
    (r"^水系文化-|江河文明-|河流文明-|湖泊文明-", "24-运河文化系列"),
    # 索引页/列表页
    (r"^\d+篇文章列表$|完成情况梳理|系列总览$|更多爆款主题策划|新内容系列策划|进度跟踪|旧-杭州教育资源概览草稿", "99-索引页"),
    # 清河坊
    (r"^清河坊", "02-记忆系列"),
    # 灵隐寺
    (r"^灵隐寺", "11-旅游攻略系列"),
    # 梅家坞
    (r"^梅家坞", "01-美食系列"),
    # 第X篇 格式
    (r"^第\d+篇-", "11-旅游攻略系列"),
    # 新杭州人系列
    (r"^新杭州人", "08-现代杭州系列"),
    # 数字经济
    (r"^数字经济", "08-现代杭州系列"),
    # 单个著名人物（文学/历史）
    (r"^(欧阳修|秦桧|温庭筠|纳兰性德|老舍|茅盾|郁达夫|钱谦益|阮籍|陆嵩|诸葛亮|辛弃疾|归有光|文天祥|戴望舒|施蛰存|范成大|章太炎|刘禹锡)-", "06-文学系列"),
    # 断桥残雪/平湖秋月/花港观鱼/柳浪闻莺 等西湖景点（未被新十景系列匹配的）
    (r"^(断桥残雪|平湖秋月|花港观鱼|柳浪闻莺|曲院风荷|苏堤春晓|三潭印月|雷峰塔|南屏晚钟)", "06-西湖文化系列"),
    # 城帶/城area记忆（简繁体兼容）
    (r"^城(area|帶|带).{1,2}忆?-", "02-记忆系列"),
    (r"^城(area|帶|带).{1,2}憶-", "02-记忆系列"),
    (r"^城[帶area]记忆-", "02-记忆系列"),
    (r"^城[帶area]記憶-", "02-记忆系列"),
    # 大运河
    (r"^大运河", "24-运河文化系列"),
    # 更多零散未分类
    (r"^丝绸店里的传承故事|古籍修复师的日常|老戏台下的新生力量", "07-民俗文化系列"),
    (r"^古代杭州官道", "06-历史文化系列"),
    (r"^城市变迁专题文章列表", "99-索引页"),
    (r"^学区房\d+万", "10-房产楼市系列"),
    (r"^居家健身app推荐", "13-运动健身系列"),
    (r"^市场里的阿婆的早晨|遛鸟人的早市时光", "02-记忆系列"),
    (r"^杭帮菜经典西湖醋鱼|楼外楼里的掌勺人", "01-美食系列"),
    (r"^西溪湿地生态守护者", "06-杭州自然系列"),
    (r"^龙井茶园-千年传统", "01-美食系列"),
    (r"^待补充-张九龄|欧阳修的游记文学|陆嵩的作品与杭州西湖隐逸传统|章太炎国学与传统文化", "06-文学系列"),
    (r"^藝学類-", "06-文学系列"),
    (r"^花艺师的四季情", "06-杭州文化系列"),
    # 外篇系列
    (r"^外篇-", "11-旅游攻略系列"),
    # 学术类
    (r"^学术类-", "06-学术文化系列"),
    # 学习系列
    (r"^学习-", "17-学习提升系列"),
    # 人名开头 (未被前面规则覆盖的)
    (r"^[叶李王张刘陈杨赵黄周吴徐孙朱马胡郭何高林郑谢罗梁宋唐许韩冯邓曹彭曾肖田董袁潘于蒋蔡余杜程苏魏吕丁任沈姚卢]", "03-人物系列"),
    # 娃哈哈/宗庆后/企业
    (r"^娃哈哈|宗庆后|鲁冠球|马云|李书福|丁磊", "26-杭州企业家系列"),
    (r"^.*博物馆.*", "15-博物馆系列"),
    # 城市发展系列
    (r"^城市发展类?-", "08-现代杭州系列"),
    # 编号开头的简单文件（可能是索引页）
    (r"^\d{1,2}$", "99-索引页"),
    (r"^\d{1,2}-25\d{2}$", "99-索引页"),
    (r"^\d{1,2}-浙江省", "15-博物馆系列"),
    (r"^\d{1,2}-中国.*博物馆", "15-博物馆系列"),
    (r"^\d{1,2}-.*博物馆", "15-博物馆系列"),
    (r"^\d{1,2}-.*(?:龙井|茶|丝绸|茶叶|美术|纪念馆)", "15-博物馆系列"),
    # 杭州的地图变迁
    (r"^\d-杭州的地图", "06-杭州历史地理系列"),
    # 其他
    (r"^2027杭州入学", "17-教育系列"),
    (r"^ihz公众号", "99-索引页"),
    (r"^literary-history", "06-文学系列"),
    (r"^series-people-series", "03-人物系列"),
    (r"^丝绸之路", "06-历史文化系列"),
    (r"^剩余.*说明", "99-索引页"),
    # 中文数字开头的
    (r"^[一二三四五六七八九十百]", "06-杭州文化系列"),
    # 英文/拼音前缀
    (r"^[a-zA-Z]-", "06-杭州文化系列"),
]

# 需要排除的非文章文件
EXCLUDE_FILES = {
    "index.json", "index.html", "keywords.json", "keywords.json.bak_zjs",
    "topics.json", "plan.html", "plan-2479.html", "plan-2487.html",
    "summary.html", "todo.html", "readme.html", "readme-2603.html",
    "start-guide.html", "completion-report.html", "automation-usage-guide.html",
    "certificate-automation.html", "horizon-certificate-automation-solution.html",
    "series-補充.html", "series-batch-17-30.html",
}

def guess_category(filename):
    """根据文件名推断分类"""
    name = filename.stem  # 不含扩展名
    for pattern, cat in CATEGORY_MAP:
        if re.match(pattern, name):
            return cat
    # 尝试从标题前缀推断
    if name.startswith("杭州") or name.startswith("西湖"):
        return "06-杭州文化系列"
    return "未分类"

def extract_title(content):
    """从 HTML 中提取标题"""
    # 优先从 <title> 提取
    m = re.search(r"<title>(.+?)</title>", content)
    if m:
        t = m.group(1).strip()
        # 去掉 " · iHangzhou 杭州生活助手" 后缀
        t = re.sub(r"\s*·\s*iHangzhou.*$", "", t)
        # 去掉开头的分类前缀如 "food-series-01-"
        t = re.sub(r"^[a-z]+-series-\d+-", "", t)
        return t
    # 备选：从 <h1> 提取
    m = re.search(r"<h1>(.+?)</h1>", content)
    if m:
        return re.sub(r"<[^>]+>", "", m.group(1)).strip()
    return None

def extract_description(content):
    """从 HTML 中提取 meta description"""
    m = re.search(r'<meta\s+name="description"\s+content="(.+?)"', content)
    if m:
        d = m.group(1)
        # 解码 HTML 实体
        d = html.undecode(d) if hasattr(html, 'undecode') else d.replace("&quot;", '"').replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
        d = d.replace("&quot;", '"').replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
        return d.strip()
    return ""

def count_words(content):
    """粗略统计中文字数（不含标签）"""
    # 去掉 script, style
    content = re.sub(r"<script[^>]*>[\s\S]*?</script>", "", content)
    content = re.sub(r"<style[^>]*>[\s\S]*?</style>", "", content)
    # 去掉所有标签
    text = re.sub(r"<[^>]+>", "", content)
    # 去掉空白
    text = re.sub(r"\s+", "", text)
    return len(text)

def truncate_summary(s, max_len=120):
    """截断摘要"""
    if not s:
        return ""
    # 去掉开头引号
    s = s.strip().lstrip('"').lstrip('“')
    if len(s) > max_len:
        return s[:max_len] + "..."
    return s

def main():
    articles = []
    skipped = []
    
    # 获取所有 HTML 文件
    html_files = sorted(ARTICLES_DIR.glob("*.html"))
    
    for f in html_files:
        if f.name in EXCLUDE_FILES:
            skipped.append(f.name)
            continue
        
        try:
            content = f.read_text(encoding="utf-8")
        except Exception as e:
            skipped.append(f.name)
            continue
        
        title = extract_title(content)
        if not title:
            skipped.append(f.name)
            continue
        
        desc = extract_description(content)
        words = count_words(content)
        cat = guess_category(f)
        
        articles.append({
            "slug": f.stem,
            "title": title,
            "cat": cat,
            "summary": truncate_summary(desc) or title,
            "words": words,
        })
    
    # 按文件名排序，确保稳定输出
    articles.sort(key=lambda a: a["slug"])
    
    # 写入 JSON
    OUTPUT_FILE.write_text(
        json.dumps(articles, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    
    # 统计
    print(f"✅ 已生成 index.json，共 {len(articles)} 篇文章")
    print(f"⏭️  跳过 {len(skipped)} 个非文章文件")
    
    # 分类统计
    cats = {}
    for a in articles:
        c = a["cat"].split(" / ")[0]
        cats[c] = cats.get(c, 0) + 1
    print(f"\n📂 分类分布（共 {len(cats)} 个分类）：")
    for c, n in sorted(cats.items(), key=lambda x: -x[1])[:20]:
        print(f"   {c}: {n} 篇")

if __name__ == "__main__":
    main()
