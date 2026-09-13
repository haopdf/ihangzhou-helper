// 测试 wechat.js 核心逻辑（CommonJS 风格，不依赖 fetch 远程数据）
const cms = require('../data/cms.json');
const wechat = require('../api/wechat.js');
const t = wechat._test;

(async function () {
  let pass = 0, fail = 0;
  function assert(name, actual, expected) {
    const ok = actual === expected || (typeof expected === 'string' && actual && actual.indexOf(expected) >= 0);
    console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : '\n  expected: ' + expected + '\n  actual: ' + actual));
    if (ok) pass++; else fail++;
  }

  // 1. 限行 → news 图文回复
  let r = await t.handleMessage({ MsgType: 'text', Content: '限行', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('限行返回 news 类型', r, '<MsgType><![CDATA[news]]></MsgType>');
  assert('限行图文标题正确', r, '今日杭州尾号限行');

  // 2. 数字 1 → text 回复
  r = await t.handleMessage({ MsgType: 'text', Content: '1', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('1 返回 text 类型', r, '<MsgType><![CDATA[text]]></MsgType>');
  assert('1 内容包含限行', r, '今日杭州尾号限行');

  // 3. 同义词匹配：尾号 → news
  r = await t.handleMessage({ MsgType: 'text', Content: '尾号', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('尾号（同义词）返回 news', r, '<MsgType><![CDATA[news]]></MsgType>');

  // 4. 帮助指令
  r = await t.handleMessage({ MsgType: 'text', Content: '帮助', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('帮助返回指令列表', r, 'iHangzhou 可用指令');
  r = await t.handleMessage({ MsgType: 'text', Content: '?', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('? 也触发帮助', r, 'iHangzhou 可用指令');

  // 5. 关注事件 → 欢迎语（news 类型）
  r = await t.handleMessage({ MsgType: 'event', Event: 'subscribe', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('关注返回 news 欢迎语', r, '<MsgType><![CDATA[news]]></MsgType>');
  assert('欢迎语标题', r, '杭州生活助手');

  // 6. 未匹配关键词 → 默认引导
  r = await t.handleMessage({ MsgType: 'text', Content: '不知道什么', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('未匹配返回默认引导', r, '没找到');

  // 7. 菜单 click 事件
  r = await t.handleMessage({ MsgType: 'event', Event: 'click', EventKey: 'menu_checkin', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('菜单签到 click', r, '每日签到');

  // 8. 中文数字同义词：一 → 限行
  r = await t.handleMessage({ MsgType: 'text', Content: '一', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('一（中文数字）匹配限行', r, '今日杭州尾号限行');

  // 9. 灵隐寺 → news
  r = await t.handleMessage({ MsgType: 'text', Content: '飞来峰', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('飞来峰（同义词）匹配灵隐寺 news', r, '<MsgType><![CDATA[news]]></MsgType>');

  // 10. 包含匹配：今天天气怎么样 → 天气
  r = await t.handleMessage({ MsgType: 'text', Content: '今天天气怎么样', FromUserName: 'u1', ToUserName: 'gh' }, cms);
  assert('包含匹配天气', r, '<MsgType><![CDATA[news]]></MsgType>');

  console.log('\n结果：' + pass + ' 通过 / ' + fail + ' 失败');
  process.exit(fail > 0 ? 1 : 0);
})();
