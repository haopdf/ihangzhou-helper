const { chromium } = require('playwright');
const fs = require('fs');
const src = fs.readFileSync('js/cat-data.js', 'utf8');
const data = eval(src.match(/window\.CAT_DATA\s*=\s*(\[[\s\S]*\]);?\s*$/)[1]);

(async () => {
  const browser = await chromium.launch();
  const results = [];
  const test = async (url, label, check) => {
    const p = await browser.newPage();
    const errs = [];
    p.on('pageerror', e => errs.push(e.message.slice(0, 110)));
    try {
      await p.goto('http://localhost:8899/' + url, { waitUntil: 'networkidle', timeout: 15000 });
      await p.waitForTimeout(1200);
      const info = await p.evaluate(() => {
        const clone = document.body.cloneNode(true);
        clone.querySelectorAll('.app-header, footer').forEach(el => el.remove());
        return {
          text: clone.textContent.replace(/\s+/g, '').length,
          h1: ((document.querySelector('h1') || {}).textContent || '').trim(),
          crumb: ((document.querySelector('#catCrumb') || {}).textContent || '').replace(/\s+/g, ' ').trim()
        };
      });
      const ok = check ? check(info) : info.text > 150;
      results.push({ url, label, ok, ...info, errs });
    } catch (e) {
      results.push({ url, label, ok: false, errs: [e.message.slice(0, 90)], text: 0 });
    }
    await p.close();
  };

  // 1. 7 频道聚合页
  for (const ch of data.filter(c => c.k !== 'my')) {
    await test('cat.html?c=' + ch.k, '聚合页 ' + ch.k, i => i.text > 200);
  }
  // 2. 每频道第一个二级页
  for (const ch of data.filter(c => c.k !== 'my')) {
    const s = ch.subs[0];
    await test('cat.html?c=' + ch.k + '&s=' + encodeURIComponent(s.n), '二级 ' + ch.k + '/' + s.n, i => i.text > 150);
  }
  // 3. 每频道第一个二级的第一个三级（转述）
  for (const ch of data.filter(c => c.k !== 'my')) {
    const s = ch.subs.find(x => x.th && x.th.length);
    if (!s || !s.th.length) continue;
    const t = s.th[0];
    await test('cat.html?c=' + ch.k + '&s=' + encodeURIComponent(s.n) + '&t=' + encodeURIComponent(t[1]), '三级 ' + ch.k + '/' + s.n + '/' + t[1], i => i.text > 150);
  }
  // 4. -data.js 详情页（food 各二级代表）
  const dataPages = {
    breakfast: '拌面', chaguan: '湖畔', coffee: '西湖', dessert: '定胜', gujian: '六和',
    guzhen: '乌镇', hangbang: '西湖醋鱼', intangible: '杭绣', laozihao: '知味观',
    'night-market': '河坊', route: '一日', story: '老地名', tea: '狮峰', temple: '灵隐',
    tushuguan: '杭图', zhoubian: '千岛湖', zhoumo: '径山'
  };
  for (const [page, kw] of Object.entries(dataPages)) {
    await test(page + '.html', '列表 ' + page, i => i.text > 100);
  }
  // 5. 其他动态页
  await test('articles.html', '文章列表');
  await test('articles.html?q=' + encodeURIComponent('西湖'), '文章搜索');
  await test('place.html', '景区列表', i => i.text > 100);
  await test('district.html', '区县导航', i => i.text > 100);
  await test('tide.html', '潮汐页', i => i.text > 100);
  await test('travel.html', '旅游频道', i => i.text > 100);
  await test('weekend.html', '周末页', i => i.text > 100);
  await test('channel.html', '频道总览', i => i.text > 100);

  await browser.close();
  const pass = results.filter(r => r.ok && !r.errs.length);
  const fail = results.filter(r => !r.ok || r.errs.length);
  console.log('===== 路由深度体检：' + pass.length + ' 通过 / ' + fail.length + ' 失败（共 ' + results.length + '）=====');
  fail.forEach(r => {
    console.log('\n✗ [' + r.label + '] ' + r.url);
    console.log('   正文:', r.text, '字 | H1:', r.h1 || '(无)', '| 面包屑:', r.crumb || '(无)');
    r.errs.forEach(e => console.log('   JS:', e));
  });
  fs.writeFileSync('scripts/_audit_routes.json', JSON.stringify(results, null, 1));
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('FAIL', e); process.exit(1); });
