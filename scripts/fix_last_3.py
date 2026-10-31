#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
ROOT='/Users/asind/PycharmProjects/ihangzhou-helper'

# 1. breakfast-data: add pianerchuan alias
path=os.path.join(ROOT,'js/breakfast-data.js')
with open(path,'r') as f: c=f.read()
# Find pianer-chuan block start, add pianerchuan before it
alias="  'pianerchuan': {\n    name: '片儿川',\n    subtitle: '杭州特色早餐面',\n    history: '片儿川是杭州人最爱的早餐面食，以笋片、肉片、雪菜为料，鲜滑可口。',\n    features: ['笋片','雪菜','面条'],\n    shops: [{n:'奎元馆',a:'解放路',t:'老字号'}]\n  },\n"
if "'pianerchuan'" not in c:
    c=c.replace("  'pianer-chuan'",alias+"  'pianer-chuan'")
    with open(path,'w') as f:f.write(c)
    print("  breakfast: +pianerchuan")
else:
    print("  breakfast: pianerchuan already exists")

# 2. intangible-data: fix xihu-san (was xihu a-san) and add hang-zhou-jianzhi
path=os.path.join(ROOT,'js/intangible-data.js')
with open(path,'r') as f: c=f.read()
if "'xihu-san'" not in c:
    # Fix wrong key
    c=c.replace("'xihua-san'","'xihu-san'")
    print("  intangible: fixed xihua-san -> xihu-san")
if "'hang-zhou-jianzhi'" not in c:
    last=c.rstrip().rfind('};')
    alias="  'hang-zhou-jianzhi': {\n    name: '杭州剪纸',\n    subtitle: '浙江省级非遗',\n    history: '杭州剪纸是浙江省级非物质文化遗产，技法细腻，题材广泛。',\n    features: ['剪纸','非遗','民俗'],\n    shops: [{n:'杭州非遗馆',a:'拱墅区',t:'展示'}]\n  },\n"
    c=c[:last]+',\n'+alias+'\n};'
    # Remove extra comma
    print("  intangible: +hang-zhou-jianzhi")
    with open(path,'w') as f:f.write(c)
else:
    print("  intangible: hang-zhou-jianzhi already exists")

print("Done")
