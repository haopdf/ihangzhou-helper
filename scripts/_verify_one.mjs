import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.goto('http://localhost:8765/banshi.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(1000);
const r = await p.evaluate(() => {
  const out = {};
  // 找几个关键元素
  const ch = document.querySelector('.ch-hero');
  out.chHeroPad = ch ? getComputedStyle(ch).padding : null;
  out.chHeroChildren = ch ? [...ch.children].map(c => c.className + '|' + c.style.cssText.slice(0, 80)) : [];
  const first = ch ? ch.querySelector('h1,h2,div') : null;
  out.firstChildPad = first ? getComputedStyle(first).padding : null;
  const content = document.querySelector('.content');
  out.contentPad = content ? getComputedStyle(content).padding : null;
  const card = document.querySelector('.service-grid .sitem');
  out.cardLeft = card ? Math.round(card.getBoundingClientRect().left) : null;
  const allDivs = document.querySelectorAll('.content *');
  let i = 0;
  for (const d of allDivs) {
    if (i < 5) { out['child' + i] = d.tagName + '.' + d.className.slice(0, 30) + ' pad=' + getComputedStyle(d).padding.slice(0, 20); i++; }
  }
  return out;
});
console.log(JSON.stringify(r, null, 2));
await browser.close();
