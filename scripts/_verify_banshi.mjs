import { chromium } from 'playwright';
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await c.newPage();
await p.goto('http://localhost:8765/banshi.html', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const out = {};
  const h = document.querySelector('.ch-hero');
  if (h) {
    const h1 = h.querySelector('h1');
    if (h1) out.heroH1 = Math.round(h1.getBoundingClientRect().left);
  }
  // 检查 .content 是否在 desktop 居中
  const content = document.querySelector('#pageChannel > .content');
  if (content) {
    const rc = content.getBoundingClientRect();
    out.contentX = Math.round(rc.left);
    out.contentW = Math.round(rc.width);
    out.contentMaxW = getComputedStyle(content).maxWidth;
  }
  // 检查 bf-modules
  const bf = document.querySelector('#bfModules');
  if (bf) {
    const rbf = bf.getBoundingClientRect();
    out.bfX = Math.round(rbf.left);
    out.bfW = Math.round(rbf.width);
    out.bfPad = getComputedStyle(bf).padding;
  }
  // service-grid
  const sg = document.querySelector('#serviceGrid');
  if (sg) {
    const rsg = sg.getBoundingClientRect();
    out.sgX = Math.round(rsg.left);
    out.sgFirstA = sg.querySelector('a') ? Math.round(sg.querySelector('a').getBoundingClientRect().left) : null;
  }
  return out;
});
console.log(JSON.stringify(r, null, 2));
await b.close();
