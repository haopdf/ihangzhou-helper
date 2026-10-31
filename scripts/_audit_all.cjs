const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const pages = fs.readdirSync('.').filter(f => f.endsWith('.html'));

(async () => {
  const browser = await chromium.launch();
  const report = [];
  for (const p of pages) {
    const page = await browser.newPage();
    const errs = [], failed = [];
    page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message.slice(0, 130)));
    page.on('console', m => {
      if (m.type() !== 'error') return;
      const t = m.text();
      if (/api\/(tools|content|news)|open-meteo|wttr|Hangzhou\?format/.test(m.location().url || '') || /api\/(tools|content|news)|open-meteo/.test(t)) return; // 本地无 api 路由/天气外网
      errs.push('console: ' + t.slice(0, 110));
    });
    page.on('requestfailed', r => {
      const u = r.url();
      if (/\/api\/|open-meteo|Hangzhou\?format/.test(u)) return;
      failed.push(u.replace(/^https?:\/\/[^/]+/, ''));
    });
    page.on('response', r => {
      const u = r.url();
      if (/\/api\/|open-meteo|Hangzhou\?format/.test(u)) return;
      if (r.status() >= 400) failed.push(u.replace(/^https?:\/\/[^/]+/, '') + ' HTTP' + r.status());
    });
    try {
      await page.goto('http://localhost:8899/' + p, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(900);
      const info = await page.evaluate(() => {
        // 去掉 layout 注入的 header/footer 后的正文长度
        const clone = document.body.cloneNode(true);
        clone.querySelectorAll('.app-header, .app-footer, .site-footer, footer').forEach(el => el.remove());
        const text = clone.textContent.replace(/\s+/g, '').length;
        const navs = document.querySelectorAll('.app-header, .topbar').length;
        // 渲染后仍显示"加载中"的容器 = 渲染失败
        const stuck = [...document.querySelectorAll('div')].filter(d => d.children.length <= 2 && /^(加载中|loading)/i.test(d.textContent.trim()) && d.textContent.trim().length < 12).length;
        return { text, navs, stuck, title: document.title.trim() };
      });
      const bad = [];
      if (errs.length) bad.push('JS错误×' + errs.length);
      if (failed.length) bad.push('死请求×' + failed.length);
      if (info.navs > 1) bad.push('双重导航×' + info.navs);
      if (info.text < 100) bad.push('正文空(' + info.text + '字)');
      if (info.stuck > 0) bad.push('卡在加载中×' + info.stuck);
      if (!info.title) bad.push('无标题');
      report.push({ p, ...info, errs, failed, bad });
    } catch (e) {
      report.push({ p, bad: ['加载失败: ' + e.message.slice(0, 90)], errs: [], failed: [], text: -1, navs: -1, stuck: -1, title: '' });
    }
    await page.close();
  }
  await browser.close();
  const clean = report.filter(r => !r.bad.length);
  const dirty = report.filter(r => r.bad.length);
  console.log('===== 体检：' + clean.length + ' 干净 / ' + dirty.length + ' 有问题（共 ' + report.length + ' 页）=====');
  dirty.forEach(r => {
    console.log('\n【' + r.p + '】' + r.bad.join(' | '));
    r.errs.slice(0, 3).forEach(e => console.log('   ', e));
    r.failed.slice(0, 4).forEach(f => console.log('   死请求:', f));
  });
  fs.writeFileSync('scripts/_audit_report.json', JSON.stringify(report, null, 1));
})().catch(e => { console.error('AUDIT FAIL', e); process.exit(1); });
