import urllib.request, urllib.error, ssl, sys

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# 检查更多链接
urls = [
    ("www.hangzhou.gov.cn", "杭州市政府"),
    ("www.hzqtj.com", "钱塘江大潮"),
    ("www.lingyin.org", "灵隐寺"),
    ("www.96225.com", "市民卡"),
    ("www.kuaidi100.com", "快递查询"),
    ("www.dianping.com/hangzhou", "杭州美食"),
    ("www.damai.cn/hz", "演唱会"),
    ("www.cwl.gov.cn", "福利彩票"),
    ("hangzhou.lianjia.com", "二手房"),
    ("www.51jz.cn", "家政服务"),
    ("theater.mtime.com/China_Zhejiang_Province_Hangzhou", "电影"),
    ("www.zjgwy.gov.cn", "浙江省考"),
    ("tyj.hangzhou.gov.cn", "体育赛事"),
    ("fgj.hangzhou.gov.cn", "房产"),
    ("gjj.hangzhou.gov.cn", "公积金"),
]

for url, name in urls:
    try:
        req = urllib.request.Request(f"https://{url}", headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
        resp = urllib.request.urlopen(req, timeout=5, context=ctx)
        code = resp.getcode()
        print(f"OK {code} {name}: https://{url}")
    except urllib.error.HTTPError as e:
        print(f"ERR {e.code} {name}: https://{url}")
    except Exception as e:
        print(f"DEAD -- {name}: https://{url}")
