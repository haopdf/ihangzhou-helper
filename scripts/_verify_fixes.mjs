// 截图验证脚本：打开各关键页面，确认布局/宽度无异常
import { chromium } from 'playwright';

const BASE = 'http://localhost:8765';
const pages = [
  { url: '/cat.html?c=news&s=%E6%B6%88%E8%B4%B9%E8%A1%A5%E8%B4%B4&t=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0', label: 'cat-third-butie-jiadian' },
  { url: '/cat.html?c=zhaopin&s=%E5%9B%BD%E4%BC%81%E6%8B%9B%E8%81%98&t=%E5%A4%AE%E4%BC%81%E5%9C%A8%E6%9D%AD', label: 'cat-third-zhaopin-yangqi' },
  { url: '/banshi.html', label: 'banshi' },
  { url: '/night-market.html?id=yeshi', label: 'night-market-yeshi' },
  { url: '/life.html?q=%E5%AE%B6%E7%94%B5%E6%8D%A2%E6%96%B0', label: 'life-q-jiadian' },
  { url: '/traffic.html?id=jiaotong-huoche', label: 'traffic-id-huoche' },
  { url: '/celebrity.html', label: 'celebrity' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const results = [];
for (const p of pages) {
  const page = await ctx.newPage();
  try {
    await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
    // 检查内容宽度：找第一个 p-body 元素，确认 padding>0
    const bodyPad = await page.evaluate(() => {
      const el = document.querySelector('.p-body, .cat-body, .bf-modules, .p-cards');
      if (!el) return null;
      const cs = getComputedStyle(el);
      return { paddingLeft: cs.paddingLeft, paddingRight: cs.paddingRight, width: el.scrollWidth };
    }).catch(() => null);
    await page.screenshot({ path: `scripts/_verify_${p.label}.png`, fullPage: false });
    results.push({ url: p.url, bodyPad, ok: true });
  } catch (e) {
    results.push({ url: p.url, error: e.message, ok: false });
  } finally {
    await page.close();
  }
}
console.log(JSON.stringify(results, null, 2));
await browser.close();
