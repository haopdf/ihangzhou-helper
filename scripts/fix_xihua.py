#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
ROOT='/Users/asind/PycharmProjects/ihangzhou-helper'

path=os.path.join(ROOT,'js/intangible-data.js')
with open(path,'r') as f: c=f.read()

if "'xihua-san'" not in c:
    alias="  'xihua-san': {\n    name: '西湖绸伞',\n    subtitle: '杭州传统手工艺',\n    history: '西湖绸伞是杭州传统手工艺的代表，以竹为骨、以绸为面，轻巧美观，是杭州文化名片。',\n    features: ['绸伞','手工艺','杭州特色','非遗'],\n    shops: [{n:'杭州工艺美术博物馆',a:'小河路',t:'免费'}]\n  },\n"
    c=c.replace("  'xihu-san'",alias+"  'xihu-san'")
    with open(path,'w') as f:f.write(c)
    print("  intangible: +xihua-san")
else:
    print("  intangible: xihua-san already exists")

print("Done")
