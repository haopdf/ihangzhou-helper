#!/usr/bin/env python3
"""
第四批：处理剩余约110个 articles.html 链接
策略：
  - 有独立数据文件的频道（tea/chaguan/zhoubian/gujian/tushuguan/xiangxiang/zhoumo）-> id=xxx
  - 频道页（history/museum/celebrity/laozihao/internet/zhaopin）-> 直接指向频道页
  - 办事类（banshi）-> 指向 banshi.html?id=xxx
  - 生活类 -> 指向 life.html（新建）
"""
import re

with open('js/cat-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

count_before = content.count('articles.html')
print(f'Before: {count_before} articles.html links')

# 1. 精确 URL-encoded 映射 -> 独立详情页 (?id= 形式)
detail_replacements = {
    # 茶馆
    '%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E7%82%B9%E8%8C%B6': 'chaguan.html?id=chaguan-zongguan',
    '%E5%BE%84%E5%B1%B1%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E6%96%B0%E5%BC%8F%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E8%80%81%E8%8C%B6%E9%A6%86': 'chaguan.html?id=chaguan-zongguan',
    '%E8%8C%B6%E7%A9%BA%E9%97%B4': 'chaguan.html?id=chaguan-zongguan',
    '%E9%9D%92%E8%8C%B6%E7%A9%BA%E9%97%B4': 'chaguan.html?id=chaguan-zongguan',
    '%E8%92%B8%E6%B1%81': 'chaguan.html?id=chaguan-zongguan',
    '%E9%A6%99%E7%81%B6': 'chaguan.html?id=chaguan-zongguan',
    # 老字号
    '%E7%8E%8B%E6%B6%A6%E5%85%B4': 'laozihao.html?id=wang-runxing',
    '%E8%83%A1%E5%BA%86%E4%BD%99%E5%A0%82': 'laozihao.html?id=zhuo-ji-lao-zhao',
    '%E6%A5%BC%E5%A4%96%E6%A5%BC': 'laozihao.html?id=louwailou',
    '%E7%9F%B3%E5%BF%83%E5%AE%A0': 'laozihao.html?id=laozihao-zongguan',
    '%E5%B8%82%E5%AE%9D%E5%BA%93': 'laozihao.html?id=laozihao-zongguan',
    '%E6%9C%8B%E5%8F%A3%E7%A2%91': 'laozihao.html?id=laozihao-zongguan',
    # 周边游
    '%E5%8D%83%E5%B2%9B%E6%B9%96': 'zhoubian.html?id=qiandaohu',
    '%E8%8E%AB%E5%B9%B2%E5%B1%B1': 'zhoubian.html?id=mogan',
    '%E5%BB%BA%E5%BE%B7': 'zhoubian.html?id=jiande',
    '%E6%B4%AA%E6%B9%96': 'zhoubian.html?id=honghu',
    '%E6%BA%AA%E5%8F%A3': 'zhoubian.html?id=xikou',
    '%E5%A4%A9%E7%9B%AE%E5%B1%B1': 'zhoubian.html?id=tianmu',
    '%E5%85%AC%E5%9B%AD': 'zhoubian.html?id=mogan',
    '%E4%B9%8C%E9%95%87': 'zhoubian.html?id=wuzhen',
    '%E5%AE%89%E5%90%89': 'zhoubian.html?id=anji',
    '%E6%A1%90%E5%BA%90': 'zhoubian.html?id=tonglu',
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
    # 茶馆 (chaguan section)
    '%E8%8C%B6%E6%96%87%E5%8C%96': 'tea.html?id=longjing-wenhua',
    # 周末休闲
    '%E5%91%A8%E6%9C%AB': 'zhoumo.html?id=zhoumo-zongguan',
    '%E7%94%B5%E5%BD%B1%E9%99%A2': 'zhoumo.html?id=zhoumo-zongguan',
    '%E6%96%87%E5%8C%96%E5%89%A7%E5%9C%BA': 'zhoumo.html?id=zhoumo-zongguan',
    '%E5%9B%BD%E5%BA%86': 'zhoumo.html?id=zhoumo-zongguan',
    '%E7%81%AF%E5%85%89%E7%A7%80': 'zhoumo.html?id=zhoumo-zongguan',
    '%E9%9F%B3%E4%B9%90%E8%8A%82': 'zhoumo.html?id=zhoumo-zongguan',
    '%E7%81%AF%E4%BC%9A': 'zhoumo.html?id=zhoumo-zongguan',
    '%E8%B5%8F%E8%8A%B1': 'zhoumo.html?id=zhoumo-zongguan',
    '%E6%A2%A8%E9%9B%A8': 'zhoumo.html?id=zhoumo-zongguan',
    '%E6%B4%BB%E5%8A%A8': 'zhoumo.html?id=zhoumo-zongguan',
}

# 2. 频道级链接（直接指向频道首页）-> 对于频道页里再次出现的项目
channel_replacements = {
    # 历史频道项目
    '%E8%BF%90%E6%B2%B3': 'history.html',
    '%E5%9F%8E%E5%A2%99': 'history.html',
    '%E8%A5%BF%E6%B9%96%E6%96%87%E5%8C%96': 'history.html',
    '%E5%A4%A7%E8%BF%90%E6%B2%B3': 'history.html',
    # 博物馆频道项目
    '%E5%8D%9A%E7%89%A9%E9%A6%86': 'museum.html',
    '%E7%94%B5%E5%BD%B1%E5%8D%9A%E7%89%A9%E9%A6%86': 'museum.html',
    # 名人类
    '%E8%8B%8F%E8%BD%BC': 'celebrity.html',
    '%E7%A7%8B%E7%91%BE': 'celebrity.html',
    '%E7%AB%A0%E5%A4%AA%E7%82%8E': 'celebrity.html',
    '%E6%9E%97%E5%BE%BD%E5%9B%A0': 'celebrity.html',
    '%E9%83%81%E8%BE%BE%E5%A4%AB': 'celebrity.html',
    '%E6%88%B4%E6%9C%9B%E8%88%92': 'celebrity.html',
    '%E5%AE%97%E5%BA%86%E5%90%8E': 'celebrity.html',
    '%E6%9D%AD%E5%B7%9E%E5%90%8D%E4%BA%BA': 'celebrity.html',
    # 互联网
    '%E6%B5%B7%E5%BA%B7%E5%A8%81%E8%A7%86': 'internet.html',
    '%E8%9A%82%E8%9A%81%E9%9B%86%E5%9B%A2': 'internet.html',
    '%E5%AD%97%E8%8A%82%E8%B7%B3%E5%8A%A8': 'internet.html',
    'AI%20%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD': 'internet.html',
    '%E6%99%BA%E8%83%BD%E9%A9%BE%E9%A9%B6': 'internet.html',
    '%E6%B8%B8%E6%88%8F%E7%94%B5%E7%AB%9E': 'internet.html',
    'AI%20%E5%85%AD%E5%B0%8F%E9%BE%99': 'internet.html',
    '%E6%99%BA%E8%83%BD%E7%BD%91%E8%81%94%E8%BD%A6': 'internet.html',
    '%E4%BA%91%E8%AE%A1%E7%AE%97%E5%A4%A7%E6%95%B0%E6%8D%AE': 'internet.html',
    '%E6%95%B0%E5%AD%97%E8%B4%A7%E5%B8%81': 'internet.html',
    # 招聘
    '%E7%AE%80%E5%8E%86': 'zhaopin.html',
    '%E9%9D%A2%E8%AF%95': 'zhaopin.html',
    '%E8%96%AA%E8%B5%84': 'zhaopin.html',
    '%E8%81%8C%E4%B8%9A%E8%A7%84%E5%88%92': 'zhaopin.html',
    '%E8%BD%AC%E8%A1%8C': 'zhaopin.html',
    '%E6%9A%91%E6%9C%9F%E5%AE%9E%E4%B9%A0': 'zhaopin.html',
    '%E8%BD%AC%E6%AD%A3%E6%9C%BA%E4%BC%9A': 'zhaopin.html',
    '%E6%A0%A1%E5%9B%AD%E5%A4%A7%E4%BD%BF': 'zhaopin.html',
    '%E8%AE%BE%E8%AE%A1%E6%8E%A5%E5%8D%95': 'zhaopin.html',
    '%E6%96%87%E6%A1%88%E5%86%99%E4%BD%9C': 'zhaopin.html',
    '%E8%A7%86%E9%A2%91%E5%89%AA%E8%BE%91': 'zhaopin.html',
    '%E4%B8%BB%E6%8C%81%E7%A4%BC%E4%BB%AA': 'zhaopin.html',
    '%E5%81%9A%E9%92%B1%E5%89%AF%E4%B8%9A': 'zhaopin.html',
    'B%20%E7%B1%BB%E4%BA%BA%E6%89%8D': 'zhaopin.html',
    'C%20%E7%B1%BB%E4%BA%BA%E6%89%8D': 'zhaopin.html',
    'D%20%E7%B1%BB%E4%BA%BA%E6%89%8D': 'zhaopin.html',
    'E%20%E7%B1%BB%E4%BA%BA%E6%89%8D': 'zhaopin.html',
    '%E4%BA%91%E6%A0%96%E5%B0%8F%E9%95%87': 'zhaopin.html',
    '%E6%96%B0%E6%9D%AD%E5%B7%9E%E4%BA%BA': 'zhaopin.html',
    '%E6%A0%A1%E5%9B%AD%E6%8B%9B%E8%81%98': 'zhaopin.html',
    '%E5%AD%A6%E5%8E%86%E6%8A%A5%E5%90%8D': 'zhaopin.html',
    '%E7%94%B5%E5%95%86%E4%BA%92%E8%81%94': 'zhaopin.html',
    '%E9%87%91%E8%9E%8D%E8%A1%8C%E4%B8%9A': 'zhaopin.html',
    '%E4%BF%84%E8%AE%AF': 'zhaopin.html',
    '%E9%87%91%E6%B2%99%E6%B9%BE': 'zhaopin.html',
    '%E9%93%82%E8%AF%AD': 'zhaopin.html',
    '%E5%88%9B%E4%B8%9A%E5%85%AC%E5%8F%B8': 'zhaopin.html',
    '%E5%BE%81%E9%9B%85%E5%90%8D%E4%BA%BA': 'zhaopin.html',
    '%E5%BE%81%E9%9B%85%E5%90%8D%E4%BA%BA%E5%A3%AB': 'zhaopin.html',
    '%E9%98%B3%E5%85%89%E8%81%98%E8%AF%95': 'zhaopin.html',
    '%E9%9D%92%E5%9F%BA%E5%B7%A5': 'zhaopin.html',
    '%E6%96%87%E8%81%8C%E6%8A%A5%E5%90%8D': 'zhaopin.html',
    '%E6%8A%80%E8%83%BD%E6%A1%A3%E6%A1%88': 'zhaopin.html',
    '%E6%96%B0%E9%97%BB%E5%87%BA%E7%89%88': 'zhaopin.html',
    '%E5%9F%BA%E9%87%91%E4%BC%9A': 'zhaopin.html',
    '%E5%B8%82%E5%B1%9E%E5%9B%BD%E4%BC%81': 'zhaopin.html',
    '%E5%8C%BA%E5%8E%BF%E5%9F%8E%E6%8A%95': 'zhaopin.html',
    '%E5%88%B6%E9%80%A0%E4%B8%9A%E5%9B%BD%E4%BC%81': 'zhaopin.html',
    '%E8%83%BD%E6%BA%90%E7%94%B5%E5%8A%9B': 'zhaopin.html',
    '%E8%BD%A8%E9%81%93%E4%BA%A4%E9%80%9A': 'zhaopin.html',
    '%E5%8C%BB%E7%96%97%E5%8D%AB%E7%94%9F': 'zhaopin.html',
    '%E6%A0%A1%E6%8B%9B%E9%80%9A%E9%81%93': 'zhaopin.html',
    '%E5%8C%BB%E6%8A%A4%E6%8B%9B%E8%81%98': 'zhaopin.html',
    '%E7%A7%91%E7%A0%94%E5%B2%97%E4%BD%8D': 'zhaopin.html',
    '%E9%AB%98%E6%A0%A1%E6%95%99%E8%BE%85': 'zhaopin.html',
    '%E6%96%87%E5%8C%96%E5%9C%BA%E9%A6%86': 'zhaopin.html',
    '%E5%9B%AD%E6%9E%97%E7%8E%AF%E5%8D%AB': 'zhaopin.html',
    '%E6%8A%A5%E5%90%8D%E6%B5%81%E7%A8%8B': 'zhaopin.html',
    '%E8%80%83%E8%AF%95%E5%A4%A7%E7%BA%B2': 'zhaopin.html',
    '%E6%95%99%E5%B8%88': 'zhaopin.html',
    '%E5%8C%BB%E9%99%A2': 'zhaopin.html',
    '%E5%8A%B3%E5%8A%A8': 'zhaopin.html',
    # 办事
    '%E9%A9%BE%E9%A9%B6%E8%AF%81': 'banshi.html',
    '%E8%B4%AD%E6%88%BF%E8%A1%A5%E8%B4%B4': 'banshi.html',
    '%E7%94%9F%E6%B4%BB%E8%A1%A5%E8%B4%B4': 'banshi.html',
    '%E5%8C%BB%E7%96%97%E5%BE%85%E9%81%87': 'banshi.html',
    '%E8%B4%AD%E6%88%BF': 'banshi.html',
    '%E9%99%90%E8%A1%8C': 'traffic.html',
    '%E6%B2%B9%E4%BB%B7': 'traffic.html',
    '%E6%B2%B9%E8%80%97': 'traffic.html',
    '%E5%85%85%E7%94%B5': 'traffic.html',
    '%E6%97%A5%E5%B8%B8': 'traffic.html',
    # 区县
    '%E6%8B%B1%E5%A2%85%E5%8C%BA': 'district.html',
    '%E8%A5%BF%E6%B9%96%E5%8C%BA': 'district.html',
    '%E6%BB%A8%E6%B1%9F%E5%8C%BA': 'district.html',
    '%E8%90%A7%E5%B1%B1%E5%8C%BA': 'district.html',
    '%E4%BD%99%E6%9D%AD%E5%8C%BA': 'district.html',
    '%E4%B8%B4%E5%B9%B3%E5%8C%BA': 'district.html',
    '%E9%92%B1%E5%A1%98%E5%8C%BA': 'district.html',
    '%E5%AF%8C%E9%98%B3': 'district.html',
    # 办事-车辆
    '%E8%BD%A6%E8%BE%86%E5%B9%B4%E6%A3%80': 'banshi.html',
    '%E8%BF%9D%E7%AB%A1%E6%9F%A5%E8%AF%A2': 'banshi.html',
    '%E5%81%9C%E8%BD%A6%E4%BD%8D': 'banshi.html',
    '%E5%8A%A0%E6%B2%B9%E5%85%85%E7%94%B5': 'banshi.html',
    '%E9%81%93%E8%B7%AF%E6%96%BD%E5%B7%A5': 'banshi.html',
    '%E9%AB%98%E9%80%9F%E6%94%B6%E8%B4%B9': 'banshi.html',
    '%E5%81%9C%E8%BD%A6': 'banshi.html',
    '%E9%A7%95%E8%80%83': 'banshi.html',
    '%E8%BD%A6%E8%BE%86%E4%BF%9D%E9%99%A9': 'banshi.html',
    '%E4%BD%93%E6%A3%80%E8%AF%81': 'banshi.html',
    # 办事-社保
    '%E5%8C%BB%E4%BF%9D%E6%8A%A5%E9%94%80': 'banshi.html',
    '%E5%A4%B1%E4%B8%9A%E9%87%91': 'banshi.html',
    '%E7%81%B5%E6%B4%BB%E5%B0%B1%E4%B8%9A': 'banshi.html',
    '%E5%B7%A5%E4%BC%A4%E8%AE%A4%E5%AE%9A': 'banshi.html',
    '%E7%94%9F%E8%82%B2%E4%BF%9D%E9%99%A9': 'banshi.html',
    '%E5%85%BB%E8%80%81%E4%BF%9D%E9%99%A9': 'banshi.html',
    '%E7%A4%BE%E4%BF%9D%E7%BC%B4%E8%B4%B9': 'banshi.html',
    '%E7%A4%BE%E4%BF%9D%E5%85%AC%E7%A7%AF%E9%87%91': 'banshi.html',
    # 办事-公积金
    '%E8%B4%AD%E6%88%BF%E6%8F%90%E5%8F%96': 'banshi.html',
    '%E8%BF%98%E8%B4%B7%E6%8F%90%E5%8F%96': 'banshi.html',
    '%E8%B4%B7%E6%AC%BE%E6%B5%8B%E7%AE%97': 'banshi.html',
    '%E7%BC%B4%E5%AD%98%E8%AF%81%E6%98%8E': 'banshi.html',
    '%E8%BD%AC%E7%A7%BB%E6%8E%A5%E7%BB%AD': 'banshi.html',
    '%E9%80%80%E4%BC%91%E6%8F%90%E5%8F%96': 'banshi.html',
    '%E5%85%AC%E7%A7%AF%E9%87%91': 'banshi.html',
    '%E5%85%AC%E7%A7%AF%E9%87%91%E8%B4%B7%E6%AC%BE': 'banshi.html',
    # 办事-落户
    '%E5%AD%A6%E5%8E%86%E8%90%BD%E6%88%B7': 'banshi.html',
    '%E5%B0%B1%E4%B8%9A%E8%90%BD%E6%88%B7': 'banshi.html',
    '%E8%BA%AB%E4%BB%BD%E8%AF%81': 'banshi.html',
    '%E6%8A%95%E9%9D%A0%E8%90%BD%E6%88%B7': 'banshi.html',
    '%E8%B4%AD%E6%88%BF%E8%90%BD%E6%88%B7': 'banshi.html',
    '%E5%B1%85%E4%BD%8F%E8%AF%81': 'banshi.html',
    '%E7%94%9F%E8%82%B2%E8%90%BD%E6%88%B7': 'banshi.html',
    '%E5%85%A5%E5%AD%A6%E8%90%BD%E6%88%B7': 'banshi.html',
    '%E6%8A%80%E6%9C%AF%E8%90%BD%E6%88%B7': 'banshi.html',
    '%E8%90%BD%E6%88%B7': 'banshi.html',
    # 办事-交通
    '%E7%81%AB%E8%BD%A6%E7%A5%A8': 'banshi.html',
    '%E6%9C%BA%E7%A5%A8': 'banshi.html',
    '%E5%81%9C%E8%BD%A6%E7%BC%B4%E8%B4%B9': 'banshi.html',
    '%E6%89%93%E8%BD%A6%E7%A7%9F%E8%BD%A6': 'banshi.html',
    '%E8%BF%9D%E7%AB%A1%E5%A4%84%E7%90%86': 'banshi.html',
    '%E5%9C%B0%E9%93%81': 'banshi.html',
    '%E5%BF%AB%E9%80%92%E6%9F%A5%E8%AF%A2': 'banshi.html',
    '%E6%B5%85%E5%8F%A3%E4%BF%AE%E8%BD%A6': 'banshi.html',
    '%E5%85%AC%E4%BA%A4%E8%BD%A6': 'banshi.html',
    '%E7%A7%9F%E8%BD%A6%E5%85%85%E7%94%B5': 'banshi.html',
    # 电话
    '%E6%8A%A5%E8%AD%A6%20110': 'banshi.html',
    '%E6%80%A5%E6%95%91%20120': 'banshi.html',
    '%E7%81%AB%E8%AD%A6%20119': 'banshi.html',
    '%E6%B0%B4%E7%94%B5%E7%87%83%E6%B0%94': 'banshi.html',
    '%E5%8D%AB%E7%94%9F%E7%83%AD%E7%BA%BF': 'banshi.html',
    '%E5%85%AC%E4%B9%90%E4%BA%AD': 'banshi.html',
    '%E9%82%AE%E6%94%BF%E5%AE%A2%E6%9C%8D': 'banshi.html',
    '%E7%89%B9%E8%AE%8A%E9%80%9A%E9%81%93': 'banshi.html',
    '%E7%81%AD%E7%81%AB%E5%91%BC%E5%8F%AB': 'banshi.html',
    '%E4%BA%A4%E9%80%9A%E7%81%BE%E5%AE%B3': 'banshi.html',
    '%E6%B6%88%E8%B4%B9%E5%88%B8': 'life.html',
    '%E8%96%85%E7%BE%8A%E6%AF%9B': 'life.html',
    '%E4%BB%A5%E6%97%A7%E6%8D%A2%E6%96%B0': 'life.html',
    '%E6%B1%BD%E8%BD%A6': 'life.html',
    '%E5%AE%B6%E8%A3%85': 'life.html',
    '%E5%8F%91%E7%A5%A8': 'life.html',
    '%E6%97%85%E6%B8%B8': 'around.html',
    # 美食/生活
    '%E7%BE%8E%E9%A3%9F': 'food.html',
    '%E9%BE%99%E4%BA%95': 'tea.html',
    '%E8%97%95%E7%B2%89': 'food.html',
    '%E5%A1%BE%E6%97%8C': 'food.html',
    '%E7%BA%A2%E7%BB%A3': 'food.html',
    '%E7%89%B9%E4%BA%A7': 'food.html',
    '%E6%9D%AD%E5%B7%9E%E7%89%B9%E4%BA%A7': 'food.html',
    '%E5%A4%9C%E5%B8%82': 'food.html',
    '%E9%85%92%E5%BA%97': 'around.html',
    '%E7%9B%B8%E4%BA%B2': 'life.html',
    '%E5%81%A5%E8%BA%AB': 'life.html',
    # 商圈
    '%E6%AB%A6%E6%9E%97%E5%95%86%E5%9C%88': 'life.html',
    '%E9%92%B1%E6%B1%9F%E6%96%B0%E5%9F%8E': 'life.html',
    '%E4%B8%8B%E6%B2%99%E5%95%86%E5%9C%88': 'life.html',
    '%E6%B2%B3%E5%9D%8A%E8%A1%97': 'street.html',
    # 房产/租房
    '%E6%88%BF%E4%BA%A7': 'life.html',
    '%E7%A7%9F%E6%88%BF': 'life.html',
    '%E7%94%9F%E6%B4%BB%E6%88%90%E6%9C%AC': 'life.html',
    '%E6%94%BF%E7%AD%96': 'life.html',
    '%E6%95%99%E8%82%B2': 'life.html',
    '%E8%A1%8C%E4%B8%9A': 'life.html',
    '%E7%A8%8E%E8%B4%B9': 'life.html',
    '%E5%BE%AE%E4%BF%A1%E6%94%AF%E4%BB%98%E5%AE%9D': 'life.html',
}

# Apply detail replacements (?id= pages)
for url_key, replacement in detail_replacements.items():
    target = f"'articles.html?q={url_key}'"
    if target in content:
        content = content.replace(target, f"'{replacement}'")

# Apply channel replacements (bare channel page)
for url_key, replacement in channel_replacements.items():
    target = f"'articles.html?q={url_key}'"
    if target in content:
        content = content.replace(target, f"'{replacement}'")

count_after = content.count('articles.html')
print(f'After replacements: {count_after} articles.html links remaining (was {count_before})')

# Report remaining
remaining = re.findall(r"'articles\.html\?q=([^']+)'", content)
if remaining:
    print(f'\nRemaining {len(remaining)} links:')
    for r in sorted(set(remaining)):
        print(f'  {r}')

with open('js/cat-data.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('\nFile saved.')
