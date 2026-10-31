import { chromium } from 'playwright';
const browser = await chromium.launch();

// Use fresh page per test to avoid hash-navigation in same context
const tests = [
  ['channel.html#food', 'channel food'],
  ['channel.html#weekend', 'channel weekend'],
  ['intangible.html?id=hanghua', 'intangible hanghua'],
  ['intangible.html?id=hangxiu', 'intangible hangxiu'],
  ['intangible.html?id=zhangxiaoquan', 'intangible zhangxiaoquan'],
  ['museum.html?id=zhemo', 'museum zhemo'],
  ['museum.html?id=sichou', 'museum sichou'],
  ['laozihao.html?id=huqingyutang', 'laozihao huqingyutang'],
  ['laozihao.html?id=wangxingji', 'laozihao wangxingji'],
  ['celebrity.html?id=sushi', 'celebrity sushi'],
  ['celebrity.html?id=su dongpo', 'celebrity su dongpo'],
];

let ok = 0, chk = 0;
for (const [path, label] of tests) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await page.goto(`http://localhost:8765/${path}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
    await page.waitForTimeout(3000);
    const body = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
    const hasContent = body.length > 80;
    const isLoading = body.includes('加载中') && body.length < 150;
    const symbol = isLoading ? 'STUCK' : (hasContent ? 'OK ' : '?? ');
    console.log(`${symbol} ${label.padEnd(28)} body=${body.length}c "${body.slice(0, 70)}"`);
    if (hasContent && !isLoading) ok++; else chk++;
  } catch (e) {
    console.log(`ERR ${label.padEnd(28)} ${e.message.slice(0, 50)}`);
    chk++;
  }
  await page.close();
}

await browser.close();
console.log(`\n${ok} PASS / ${chk} CHECK / ${tests.length} total`);
