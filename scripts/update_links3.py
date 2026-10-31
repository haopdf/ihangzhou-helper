#!/usr/bin/env python3
"""第三批：按 URL 编码精确匹配所有剩余 articles.html 链接"""
import re

with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

count_before = content.count('articles.html')
print(f'Before: {count_before} articles.html links')

# Map by exact URL-encoded query string -> replacement URL
url_replacements = {
    # 周边游
    '%E5%BB%BA%E5%BE%B7': 'zhoubian.html?id=jiande',
    '%E8%8E%AB%E5%B9%B2%E5%B1%B1': 'zhoubian.html?id=mogan',
    '%E6%B4%AA%E6%B9%96': 'zhoubian.html?id=honghu',
    '%E6%BA%AA%E5%8F%A3': 'zhoubian.html?id=xikou',
    '%E5%A4%A9%E7%9B%AE%E5%B1%B1': 'zhoubian.html?id=tianmu',
    '%E5%85%AC%E5%9B%AD': 'zhoubian.html?id=mogan',
    # 茶馆
    '%E7%82%B9%E8%8C%B6': 'chaguan.html?id=chaguan-zongguan',
    '%E5%BE%84%E5%B1%B1%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E6%96%B0%E5%BC%8F%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E8%80%81%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E8%8C%B6%E7%A9%BA%E9%97%B4': 'chaguan.html?id=chaguan-zongguan',
    '%E9%9D%92%E8%8C%B6%E7%A9%BA%E9%97%B4': 'chaguan.html?id=chaguan-zongguan',
    '%E8%92%B8%E6%B1%81': 'chaguan.html?id=chaguan-zongguan',
    '%E9%A6%99%E7%81%B6': 'chaguan.html?id=chaguan-zongguan',
    # 老字号
    '%E7%8E%8B%E6%B6%A6%E5%85%B4': 'laozihao.html?id=wang-runxing',
    '%E8%83%A1%E5%BA%86%E4%BD%99%E5%A0%82': 'laozihao.html?id=zhuo-ji-lao-zhao',
    '%E6%9C%8B%E5%8F%A3%E7%A2%91': 'laozihao.html?id=laozihao-zongguan',
    '%E7%9F%B3%E5%BF%83%E5%AE%A0': 'laozihao.html?id=laozihao-zongguan',
    '%E5%B8%82%E5%AE%9D%E5%BA%93': 'laozihao.html?id=laozihao-zongguan',
    # 博物馆
    '%E5%8D%9A%E7%89%A9%E9%A6%86': 'museum.html?id=zhemo',
    '%E7%94%B5%E5%BD%B1%E5%8D%9A%E7%89%A9%E9%A6%86': 'museum.html?id=zhemo',
    # 历史人文
    '%E5%9F%8E%E5%A2%99': 'history.html?id=hang-zhou-arc',
    '%E8%A5%BF%E6%B9%96%E6%96%87%E5%8C%96': 'history.html?id=xihu-wenhua',
    '%E5%A4%A7%E8%BF%90%E6%B2%B3': 'history.html?id=dayun-he',
    # 名人
    '%E8%8B%8F%E8%BD%BC': 'celebrity.html?id=sushi',
    '%E7%A7%8B%E7%91%BE': 'celebrity.html?id=yulin-torng',
    '%E7%AB%A0%E5%A4%AA%E7%82%8E': 'celebrity.html?id=gen-shi',
    '%E6%9E%97%E5%BE%BD%E5%9B%A0': 'celebrity.html?id=linhe-jing',
    '%E9%83%81%E8%BE%BE%E5%A4%AB': 'celebrity.html?id=linhe-jing',
    '%E6%88%B4%E6%9C%9B%E8%88%92': 'celebrity.html?id=hong-xue-yan',
    '%E5%AE%97%E5%BA%86%E5%90%8E': 'celebrity.html?id=feng-meng-zhen',
    '%E6%9D%AD%E5%B7%9E%E5%90%8D%E4%BA%BA': 'celebrity.html?id=sushi',
    # 古建
    '%E5%8F%A4%E5%A1%94': 'gujian.html?id=liu-he-six-go',
    '%E7%89%8C%E5%9D%8A': 'gujian.html?id=liang-zhu-civil',
    '%E4%B9%A6%E9%99%A2': 'gujian.html?id=sixi-yin-cheng',
    '%E7%89%8C%E6%A5%BC': 'gujian.html?id=jinjiang-hotel',
    # 图书馆
    '%E5%9F%8E%E5%B8%82%E4%B9%A6%E6%88%BF': 'tushuguan.html?id=xihu-shuguan',
    '%E5%9B%BE%E4%B9%A6%E9%A6%86': 'tushuguan.html?id=zhejiang-tushuguan',
    '%E9%98%85%E8%AF%BB': 'tushuguan.html?id=shufang-hangzhou',
    '%E4%B9%A6%E5%BA%97': 'tushuguan.html?id=zhejiang-tushuguan',
    '%E7%81%AB%E8%BD%A6%E7%AB%99%E4%B9%A6%E5%BA%97': 'tushuguan.html?id=zhejiang-tushuguan',
    # 办事-社保
    '%E5%8C%BB%E4%BF%9D%E6%8A%A5%E9%94%80': 'banshi.html?id=shebao-yibao',
    '%E5%A4%B1%E4%B8%9A%E9%87%91': 'banshi.html?id=shebao-shiye',
    '%E7%81%B5%E6%B4%BB%E5%B0%B1%E4%B8%9A': 'banshi.html?id=shebao-linghuo',
    '%E5%B7%A5%E4%BC%A4%E8%AE%A4%E5%AE%9A': 'banshi.html?id=shebao-gongshang',
    '%E7%94%9F%E8%82%B2%E4%BF%9D%E9%99%A9': 'banshi.html?id=shebao-shengyu',
    '%E5%85%BB%E8%80%81%E4%BF%9D%E9%99%A9': 'banshi.html?id=shebao-yanglao',
    '%E7%A4%BE%E4%BF%9D%E7%BC%B4%E8%B4%B9': 'banshi.html?id=shebao',
    '%E7%A4%BE%E4%BF%9D%E5%85%AC%E7%A7%AF%E9%87%91': 'banshi.html?id=shebao-gongji',
    # 办事-公积金
    '%E8%B4%AD%E6%88%BF%E6%8F%90%E5%8F%96': 'banshi.html?id=gjj-goufang',
    '%E8%BF%98%E8%B4%B7%E6%8F%90%E5%8F%96': 'banshi.html?id=gjj-huandai',
    '%E8%B4%B7%E6%AC%BE%E6%B5%8B%E7%AE%97': 'banshi.html?id=gjj-daikuan',
    '%E7%BC%B4%E5%AD%98%E8%AF%81%E6%98%8E': 'banshi.html?id=gij-cunzheng',
    '%E8%BD%AC%E7%A7%BB%E6%8E%A5%E7%BB%AD': 'banshi.html?id=gjj-zhuanyi',
    '%E9%80%80%E4%BC%91%E6%8F%90%E5%8F%96': 'banshi.html?id=gjj-tuixiu',
    '%E5%85%AC%E7%A7%AF%E9%87%91': 'banshi.html?id=gjj-goufang',
    '%E5%85%AC%E7%A7%AF%E9%87%91%E8%B4%B7%E6%AC%BE': 'banshi.html?id=gjj-daikuan',
    # 办事-落户
    '%E5%AD%A6%E5%8E%86%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-xueli',
    '%E5%B0%B1%E4%B8%9A%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-jiuye',
    '%E8%BA%AB%E4%BB%BD%E8%AF%81': 'banshi.html?id=luohu-shenfenzheng',
    '%E6%8A%95%E9%9D%A0%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-toukao',
    '%E8%B4%AD%E6%88%BF%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-goufang-luohu',
    '%E5%B1%85%E4%BD%8F%E8%AF%81': 'banshi.html?id=luohu-juzhuzheng',
    '%E7%94%9F%E8%82%B2%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-shengyu-luohu',
    '%E5%85%A5%E5%AD%A6%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-ruxue-luohu',
    '%E6%8A%80%E6%9C%AF%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-jishu',
    '%E8%90%BD%E6%88%B7': 'banshi.html?id=luohu-xueli',
    # 办事-交通
    '%E7%81%AB%E8%BD%A6%E7%A5%A8': 'banshi.html?id=jiaotong-huoche',
    '%E6%9C%BA%E7%A5%A8': 'banshi.html?id=jiaotong-jipiao',
    '%E5%81%9C%E8%BD%A6%E7%BC%B4%E8%B4%B9': 'banshi.html?id=jiaotong-tingche',
    '%E6%89%93%E8%BD%A6%E7%A7%9F%E8%BD%A6': 'banshi.html?id=jiaotong-dache',
    '%E8%BF%9D%E7%AB%A0%E5%A4%84%E7%90%86': 'banshi.html?id=jiaotong-weizhang',
    '%E5%9C%B0%E9%93%81': 'banshi.html?id=jiaotong-ditie',
    '%E5%BF%AB%E9%80%92%E6%9F%A5%E8%AF%A2': 'banshi.html?id=jiaotong-kuaidi',
    '%E6%B5%85%E5%8F%BA%E4%BF%AE%E8%BD%A6': 'banshi.html?id=jiaotong-xiuche',
    '%E5%85%AC%E4%BA%A4%E8%BD%A6': 'banshi.html?id=jiaotong-gongjiao',
    '%E7%A7%9F%E8%BD%A6%E5%85%85%E7%94%B5': 'banshi.html?id=jiaotong-zuche',
    # 区县
    '%E6%8B%B1%E5%A2%85%E5%8C%BA': 'district.html?id=gongshu',
    '%E8%A5%BF%E6%B9%96%E5%8C%BA': 'district.html?id=xihu',
    '%E6%BB%A8%E6%B1%9F%E5%8C%BA': 'district.html?id=binjiang',
    '%E8%90%A7%E5%B1%B1%E5%8C%BA': 'district.html?id=xiaoshan',
    '%E4%BD%99%E6%9D%AD%E5%8C%BA': 'district.html?id=yuhang',
    '%E4%B8%B4%E5%B9%B3%E5%8C%BA': 'district.html?id=linping',
    '%E9%92%B1%E5%A1%98%E5%8C%BA': 'district.html?id=qiantang',
    '%E5%AF%8C%E9%98%B3': 'district.html?id=fuyang',
    '%E5%88%87%E5%B1%B1%E5%8C%BA': 'district?id=qieshan',
    # 车辆
    '%E8%BD%A6%E8%BE%86%E5%B9%B4%E6%A3%80': 'banshi.html?id=cheliang-nianjian',
    '%E8%BF%9D%E7%AB%A0%E6%9F%A5%E8%AF%A2': 'banshi.html?id=cheliang-weizhang',
    '%E9%A9%BE%E9%A9%B8%E8%AF%81': 'banshi.html?id=cheliang-jiashi',
    '%E5%81%9C%E8%BD%A6%E4%BD%8D': 'banshi.html?id=cheliang-tingche',
    '%E5%8A%A0%E6%B2%B9%E5%85%85%E7%94%B5': 'banshi.html?id=cheliang-jiayou',
    '%E9%81%93%E8%B7%AF%E6%96%BD%E5%B7%A5': 'banshi.html?id=cheliang-shigong',
    '%E9%AB%98%E9%80%9F%E6%94%B6%E8%B4%B9': 'banshi.html?id=cheliang-gaosu',
    '%E5%81%9C%E8%BD%A6': 'banshi.html?id=cheliang-tingche',
    '%E9%A7%95%E8%80%83': 'banshi.html?id=cheliang-kaoshi',
    '%E8%BD%A6%E8%BE%86%E4%BF%9D%E9%99%A9': 'banshi.html?id=cheliang-baoxian',
    '%E4%BD%93%E6%A3%80%E8%AF%81': 'banshi.html?id=cheliang-tijian',
    # 电话
    '%E6%8A%A5%E8%AD%A6%20110': 'banshi.html?id=dianhua-baojing',
    '%E6%80%A5%E6%95%91%20120': 'banshi.html?id=dianhua-jiuzhu',
    '%E7%81%AB%E8%AD%A6%20119': 'banshi.html?id=dianhua-huojing',
    '%E6%B0%B4%E7%94%B5%E7%87%83%E6%B0%94': 'banshi.html?id=dianhua-shuidian',
    '%E5%8D%AB%E7%94%9F%E7%83%AD%E7%BA%BF': 'banshi.html?id=dianhua-weisheng',
    '%E5%85%AC%E4%B9%90%E4%BA%AD': 'banshi.html?id=dianhua-gongjiao',
    '%E9%82%AE%E6%94%BF%E5%AE%A2%E6%9C%8D': 'banshi.html?id=dianhua-youzheng',
    '%E7%89%B9%E8%AE%8A%E9%80%9A%E9%81%93': 'banshi.html?id=dianhua-tezhong',
    '%E7%81%AD%E7%81%AB%E5%91%BC%E5%8F%AB': 'banshi.html?id=dianhua-huojing',
    '%E4%BA%A4%E9%80%9A%E7%81%BE%E5%AE%B3': 'banshi.html?id=diaohua-jiaotong',
    # 招聘-国企
    '%E5%B8%82%E5%B1%9E%E5%9B%BD%E4%BC%81': 'zhaopin.html?id=guoqi-shi',
    '%E5%8C%BA%E5%8E%BF%E5%9F%8E%E6%8A%95': 'zhaopin.html?id=guoqi-quxian',
    '%E5%88%B6%E9%80%A0%E4%B8%9A%E5%9B%BD%E4%BC%81': 'zhaopin.html?id=guoqi-zhizao',
    '%E8%83%BD%E6%BA%90%E7%94%B5%E5%8A%9B': 'zhaopin.html?id=guoqi-nengyuan',
    '%E8%BD%A8%E9%81%93%E4%BA%A4%E9%80%9A': 'zhaopin.html?id=guoqi-guidao',
    '%E5%8C%BB%E7%96%97%E5%8D%AB%E7%94%9F': 'zhaopin.html?id=guoqi-yiliao',
    '%E6%A0%A1%E6%8B%9B%E9%80%9A%E9%81%93': 'zhaopin.html?id=guoqi-xiaozhao',
    # 招聘-事业单位
    '%E5%8C%BB%E6%8A%A4%E6%8B%9B%E8%81%98': 'zhaopin.html?id=shiye-hushi',
    '%E7%A7%91%E7%A0%94%E5%B2%97%E4%BD%8D': 'zhaopin.html?id=shiye-keyan',
    '%E9%AB%98%E6%A0%A1%E6%95%99%E8%BE%85': 'zhaopin.html?id=shiye-gaoxiao',
    '%E6%96%87%E5%8C%96%E5%9C%BA%E9%A6%86': 'zhaopin.html?id=shiye-wenhua',
    '%E5%9B%AD%E6%9E%97%E7%8E%AF%E5%8D%AB': 'zhaopin.html?id=shiye-yuanlin',
    '%E6%8A%A5%E5%90%8D%E6%B5%81%E7%A8%8B': 'zhaopin.html?id=shiye-baoming',
    '%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B2': 'zhaopin.html?id=shiye-kaoshi',
    '%E6%95%99%E5%B8%88': 'zhaopin.html?id=shiye-jiaoshi',
    '%E5%8C%BB%E9%99%A2': 'zhaopin.html?id=shiue-yiyuan',
    # 招聘-名企
    '%E7%BD%91%E6%98%93': 'zhaopin.html?id=mingqi-wangyi',
    '%E5%AD%A6%E5%8E%86%E6%8A%A5%E5%90%8D': 'zhaopin.html?id=mingqi-wangyi',
    '%E7%94%B5%E5%95%86%E4%BA%92%E8%81%94': 'zhaopin.html?id=mingqi-wangyi',
    '%E9%87%91%E8%9E%8D%E8%A1%8C%E4%B8%9A': 'zhaopin.html?id=mingqi-wangyi',
    '%E4%BF%84%E8%AE%AF': 'zhaopin.html?id=mingqi-wangyi',
    '%E9%87%91%E6%B2%99%E6%B9%BE': 'zhaopin.html?id=mingqi-wangyi',
    '%E9%93%82%E8%AF%AD': 'zhaopin.html?id=mingqi-wangyi',
    '%E5%88%9B%E4%B8%9A%E5%85%AC%E5%8F%B8': 'zhaopin.html?id=mingqi-wangyi',
    '%E6%A0%A1%E5%9B%AD%E6%8B%9B%E8%81%98': 'zhaopin.html?id=guoqi-xiaozhao',
    '%E7%86%9F%E7%BB%83%E7%94%9F': 'zhaopin.html?id=zhiye-shixi',
    '%E5%85%8D%E8%B4%B9%E5%88%86%E4%BA%AB': 'zhaopin.html?id=zhiye-shixi',
    '%E5%BE%81%E9%9B%85%E5%90%8D%E4%BA%BA': 'zhaopin.html?id=zhiye-shixi',
    '%E5%BE%81%E9%9B%85%E5%90%8D%E4%BA%BA%E5%A3%AB': 'zhaopin.html?id=zhiye-shixi',
    '%E9%98%B3%E5%85%89%E8%81%98%E8%AF%95': 'zhaopin.html?id=zhiye-shixi',
    '%E9%9D%92%E5%9F%BA%E5%B7%A5': 'zhaopin.html?id=zhiye-shixi',
    '%E6%96%87%E8%81%8C%E6%8A%A5%E5%90%8D': 'zhaopin.html?id=zhiye-shixi',
    '%E6%8A%80%E8%83%BD%E6%A1%A3%E6%A1%88': 'zhaopin.html?id=zhiye-shixi',
    '%E6%96%B0%E9%97%BB%E5%87%BA%E7%89%88': 'zhaopin.html?id=zhiye-shixi',
    '%E5%9F%BA%E9%87%91%E4%BC%9A': 'zhaopin.html?id=zhiye-shixi',
    # 通用兜底
    '%E5%8A%B3%E5%8A%A8': 'zhaopin.html?id=laodong-weiquan',
    '%E8%81%98%E8%AF%95%E6%8A%80%E5%B7%A7': 'zhaopin.html?id=laodong-weiquan',
    '%E7%94%B5%E5%BD%B1%E9%99%A2': 'zhoumo.html?id=zhoumo-zongguan',
    '%E6%96%87%E5%8C%96%E5%89%A7%E5%9C%BA': 'zhoumo.html?id=zhoumo-zongguan',
}

# Apply replacements by URL pattern
for url_key, replacement in url_replacements.items():
    target = f"'articles.html?q={url_key}'"
    if target in content:
        content = content.replace(target, f"'{replacement}'")

count_after = content.count('articles.html')
print(f'After batch 3: {count_after} articles.html links remaining (was {count_before})')

# Second pass broad pattern matches (for any remaining encoded URLs)
# Replace any remaining 'articles.html?q=XXXX' with appropriate fallback pages
remaining_pattern = re.compile(r"'articles\.html\?q=([^']+)'")
def broad_replace(m):
    encoded = m.group(1)
    # Try to classify by keyword
    if any(k in encoded for k in ['%E5%8C%BB%E4%BF%9D', '%E7%A4%BE%E4%BF%9D', '%E5%A4%B1%E4%B8%9A', '%E5%B7%A5%E4%BC%A4', '%E7%94%9F%E8%82%B2', '%E5%85%BB%E8%80%81', '%E7%81%B5%E6%B4%BB']):
        return "'banshi.html?id=shebao'"
    if any(k in encoded for k in ['%E5%85%AC%E7%A7%AF%E9%87%91', '%E8%B4%AD%E6%88%BF%E6%8F%90', '%E8%BF%98%E8%B4%B7', '%E8%B4%B7%E6%AC%BE', '%E7%BC%B4%E5%AD%98', '%E8%BD%AC%E7%A7%BB', '%E9%80%80%E4%BC%91']):
        return "'banshi.html?id=gjj-goufang'"
    if any(k in encoded for k in ['%E8%90%BD%E6%88%B7', '%E8%BA%AB%E4%BB%BD%E8%AF%81', '%E5%B1%85%E4%BD%8F%E8%AF%81', '%E6%8A%95%E9%9D%A0']):
        return "'banshi.html?id=luohu-xueli'"
    if any(k in encoded for k in ['%E7%81%AB%E8%BD%A6', '%E6%9C%BA%E7%A5%A8', '%E5%81%9C%E8%BD%A6', '%E6%89%93%E8%BD%A6', '%E5%9C%B0%E9%93%81', '%E8%BF%9D%E7%AB%A1', '%E5%BF%AB%E9%80%92', '%E5%85%AC%E4%BA%A4', '%E7%A7%9F%E8%BD%A6']):
        return "'banshi.html?id=jiaotong-huoche'"
    if any(k in encoded for k in ['%E8%BD%A6%E8%BE%86', '%E8%BF%9D%E7%AB%A1', '%E9%A9%BE%E9%A9%B8', '%E5%8A%A0%E6%B2%B9', '%E9%81%93%E8%B7%AF', '%E9%AB%98%E9%80%9F']):
        return "'banshi.html?id=cheliang-nianjian'"
    if any(k in encoded for k in ['%E6%8B%B1%E5%A2%85', '%E8%A5%BF%E6%B9%96', '%E6%BB%A8%E6%B1%9F', '%E8%90%A7%E5%B1%B1', '%E4%BD%99%E6%9D%AD', '%E4%B8%B4%E5%B9%B3', '%E9%92%B1%E5%A1%98', '%E5%AF%8C%E9%98%B3']):
        return "'district.html?id=xihu'"
    if any(k in encoded for k in ['%E5%8D%9A%E7%89%A9%E9%A6%86', '%E5%8D%9A%E7%89%A9', '%E7%94%B5%E5%BD%B1%E5%8D%9A']):
        return "'museum.html?id=zhemo'"
    if any(k in encoded for k in ['%E5%9B%BE%E4%B9%A6%E9%A6%86', '%E9%98%85%E8%AF%BB', '%E4%B9%A6%E5%BA%97', '%E5%9F%8E%E5%B8%82%E4%B9%A6']):
        return "'tushuguan.html?id=zhejiang-tushuguan'"
    if any(k in encoded for k in ['%E8%8C%B6%E9%A6%86', '%E7%82%B9%E8%8C%B6', '%E8%80%81%E8%8C%B6', '%E8%92%B8%E6%B1%81', '%E9%A6%99%E7%81%B6', '%E8%8C%B6%E6%96%87%E5%8C%96']):
        return "'chaguan.html?id=chaguan-zongguan'"
    if any(k in encoded for k in ['%E8%8B%8F%E8%BD%BC', '%E7%A7%8B%E7%91%BE', '%E7%AB%A0%E5%A4%AA', '%E6%9E%97%E5%BE%BD', '%E9%83%81%E8%BE%BE', '%E6%88%B4%E6%9C%9B', '%E5%AE%97%E5%BA%86']):
        return "'celebrity.html?id=sushi'"
    if any(k in encoded for k in ['%E7%8E%8B%E6%B6%A6%E5%85%B4', '%E8%83%A1%E5%BA%86%E4%BD%99', '%E6%A5%BC%E5%A4%96', '%E7%9F%B3%E5%BF%83', '%E5%B8%82%E5%AE%9D']):
        return "'laozihao.html?id=louwailou'"
    if any(k in encoded for k in ['%E8%8E%AB%E5%B9%B2%E5%B1%B1', '%E5%BB%BA%E5%BE%B7', '%E6%B4%AA%E6%B9%96', '%E6%BA%AA%E5%8F%A3', '%E5%A4%A9%E7%9B%AE']):
        return "'zhoubian.html?id=mogan'"
    if any(k in encoded for k in ['%E5%8F%A4%E5%A1%94', '%E7%89%8C%E5%9D%8A', '%E4%B9%A6%E9%99%A2', '%E7%89%8C%E6%A5%BC']):
        return "'gujian.html?id=liu-he-six-go'"
    if any(k in encoded for k in ['%E5%90%8D%E4%BC%81', '%E7%BD%91%E6%98%93', '%E7%94%B5%E5%95%86', '%E9%87%91%E8%9E%8D', '%E5%88%9B%E4%B8%9A']):
        return "'zhaopin.html?id=mingqi-wangyi'"
    if any(k in encoded for k in ['%E5%9B%BD%E4%BC%81', '%E5%B8%82%E5%B1%9E%E5%9B%BD', '%E5%8C%BA%E5%8E%BF%E5%9F%8E', '%E5%88%B6%E9%80%A0%E4%B8%9A']):
        return "'zhaopin.html?id=guoqi-shi'"
    if any(k in encoded for k in ['%E4%BA%8B%E4%B8%9A%E5%8D%95%E4%BD%8D', '%E5%8C%BB%E6%8A%A4%E6%8B%9B', '%E7%A7%91%E7%A0%94%E5%B2%97', '%E9%AB%98%E6%A0%A1%E6%95%99']):
        return "'zhaopin.html?id=shiye-jiaoshi'"
    # If nothing matches, keep as-is
    return m.group(0)

content = remaining_pattern.sub(broad_replace, content)

count_final = content.count('articles.html')
print(f'After broad pass: {count_final} articles.html links remaining (was {count_after})')

# Report any remaining
if count_final > 0:
    remaining = re.findall(r"'articles\.html\?q=[^']+'", content)
    print(f'\nRemaining {count_final} links:')
    for r in remaining:
        print(f'  {r}')

with open('js/cat-data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('\nFile saved.')
