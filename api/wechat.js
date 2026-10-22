// iHangzhou 微信公众号回调接口 — 稳定版（无外部依赖）
const crypto = require('crypto');

// ========== 配置 ==========
const WECHAT_TOKEN = process.env.WECHAT_TOKEN || 'ihangzhou2024';

const DEFAULT_KEYWORDS = [
  { keyword: '限行', type: 'text', reply: '🚗 杭州限行查询\n\n查询限行规则请回复"限行+日期"或点击：https://www.ihangzhou.net/news-xianxing.html' },
  { keyword: '天气', type: 'text', reply: '🌤️ 杭州天气\n\n点击查询实时天气与预报：https://www.ihangzhou.net/news-tianqi.html' },
  { keyword: '地铁', type: 'text', reply: '🚇 杭州地铁\n\n地铁线路、时刻、票价查询：https://www.ihangzhou.net/traffic.html' },
  { keyword: '公积金', type: 'text', reply: '🏠 公积金查询\n\n提取/贷款/余额查询指南：https://www.ihangzhou.net/banshi-gjj.html' },
  { keyword: '社保', type: 'text', reply: '🏥 社保查询\n\n社保卡/缴费/报销查询：https://www.ihangzhou.net/banshi-shebao.html' },
  { keyword: '西湖', type: 'text', reply: '🏞️ 西湖景区\n\n西湖十景、免费景点汇总：https://www.ihangzhou.net/travel-xihu.html' },
  { keyword: '灵隐寺', type: 'text', reply: '⛩️ 灵隐寺\n\n门票/交通/玩法攻略：https://www.ihangzhou.net/place.html?id=lingyin' },
  { keyword: '法喜寺', type: 'text', reply: '🌸 法喜寺\n\n门票/斋饭/拍照攻略：https://www.ihangzhou.net/place.html?id=faxi' },
  { keyword: '西溪湿地', type: 'text', reply: '🛶 西溪湿地\n\n门票/摇橹船/攻略：https://www.ihangzhou.net/place.html?id=xixi' },
  { keyword: '美食', type: 'text', reply: '🍜 杭州美食\n\n东坡肉/西湖醋鱼/美食地图：https://www.ihangzhou.net/food.html' },
];

// ========== 工具函数 ==========
function verifySignature(signature, timestamp, nonce) {
  if (!signature || !timestamp || !nonce) return false;
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1 = crypto.createHash('sha1').update(str).digest('hex');
  return sha1 === signature;
}

function parseXML(xml) {
  const result = {};
  if (!xml) return result;
  const regex = /<(\w+)>(?:<!\[CDATA\[)?([^<]*?)(?:\]\]>)?<\/\1>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) result[m[1]] = m[2];
  return result;
}

function esc(s) { return (s || '').replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c])); }

function genTextReply(toUser, fromUser, content) {
  const ts = Math.floor(Date.now() / 1000);
  return '<xml>' +
    '<ToUserName><![CDATA[' + toUser + ']]></ToUserName>' +
    '<FromUserName><![CDATA[' + fromUser + ']]></FromUserName>' +
    '<CreateTime>' + ts + '</CreateTime>' +
    '<MsgType><![CDATA[text]]></MsgType>' +
    '<Content><![CDATA[' + (content || '') + ']]></Content>' +
    '</xml>';
}

function genNewsReply(toUser, fromUser, article) {
  const ts = Math.floor(Date.now() / 1000);
  const title = esc(article.title || 'iHangzhou');
  const desc = esc((article.desc || '').replace(/\n/g, ' '));
  const picUrl = esc(article.picUrl || 'https://www.ihangzhou.net/images/logo-mark-192.png');
  const url = esc(article.url || 'https://www.ihangzhou.net/');
  return '<xml>' +
    '<ToUserName><![CDATA[' + toUser + ']]></ToUserName>' +
    '<FromUserName><![CDATA[' + fromUser + ']]></FromUserName>' +
    '<CreateTime>' + ts + '</CreateTime>' +
    '<MsgType><![CDATA[news]]></MsgType>' +
    '<ArticleCount>1</ArticleCount>' +
    '<Articles><item>' +
    '<Title><![CDATA[' + title + ']]></Title>' +
    '<Description><![CDATA[' + desc + ']]></Description>' +
    '<PicUrl><![CDATA[' + picUrl + ']]></PicUrl>' +
    '<Url><![CDATA[' + url + ']]></Url>' +
    '</item></Articles>' +
    '</xml>';
}

function genReply(toUser, fromUser, kwConfig) {
  if (!kwConfig) return null;
  if (kwConfig.type === 'news') return genNewsReply(toUser, fromUser, kwConfig);
  if (kwConfig.type === 'share') {
    const lines = ['📂 ' + (kwConfig.title || kwConfig.keyword || '资料分享')];
    if (kwConfig.desc) lines.push(kwConfig.desc);
    lines.push('');
    const dl = { baidu:'百度网盘', aliyun:'阿里云盘', quark:'夸克网盘', 115:'115网盘', other:'网盘' };
    const driveLabel = dl[kwConfig.drive] || '网盘';
    lines.push('🔗 ' + driveLabel + '：' + (kwConfig.url || ''));
    if (kwConfig.code) {
      lines.push('🔑 提取码：' + kwConfig.code);
      if (kwConfig.drive === 'baidu' && kwConfig.url) lines.push('或直接访问：' + kwConfig.url + '?pwd=' + kwConfig.code);
    }
    return genTextReply(toUser, fromUser, lines.join('\n'));
  }
  return genTextReply(toUser, fromUser, kwConfig.reply || kwConfig.desc || '');
}

// ========== 匹配逻辑 ==========
function matchKeyword(userText, keywords) {
  if (!userText) return null;
  const text = userText.trim().toLowerCase();
  for (const kw of keywords) if (kw.keyword && kw.keyword.toLowerCase() === text) return kw;
  for (const kw of keywords) if (kw.aliases && Array.isArray(kw.aliases)) for (const a of kw.aliases) if (a.toLowerCase() === text) return kw;
  for (const kw of keywords) {
    const cands = [kw.keyword, ...(kw.aliases || [])].filter(Boolean);
    for (const c of cands) if (c && text.includes(c.toLowerCase())) return kw;
  }
  return null;
}

// ========== 主入口 ==========
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  // GET：URL 验证
  if (req.method === 'GET') {
    const { signature, timestamp, nonce, echostr } = req.query || {};
    if (verifySignature(signature, timestamp, nonce)) return res.status(200).send(echostr || 'ok');
    return res.status(200).send('iHangzhou WeChat API');
  }

  // POST：消息处理
  if (req.method === 'POST') {
    try {
      let xml = '';
      if (typeof req.body === 'string') xml = req.body;
      else if (Buffer.isBuffer(req.body)) xml = req.body.toString('utf-8');
      else if (req.body && typeof req.body === 'object') xml = req.body.toString ? req.body.toString() : String(req.body);

      if (!xml || xml.length < 10) {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
        }
        if (chunks.length) xml = Buffer.concat(chunks).toString('utf-8');
      }

      if (!xml || xml.length < 10) {
        console.log('⚠️ wechat: empty body');
        return res.status(200).send('success');
      }

      const msg = parseXML(xml);
      if (!msg.MsgType) return res.status(200).send('success');

      const keywords = DEFAULT_KEYWORDS;
      const toUser = msg.FromUserName;
      const fromUser = msg.ToUserName;

      // 关注事件
      if (msg.MsgType === 'event' && (msg.Event === 'subscribe' || msg.Event === 'unsubscribe')) {
        return res.status(200).setHeader('Content-Type', 'application/xml; charset=utf-8')
          .send(genTextReply(toUser, fromUser, '🎉 欢迎关注 iHangzhou 杭州生活助手！\n\n回复关键词如：限行、天气、地铁、公积金、社保、西湖、灵隐寺、美食 等获取信息。'));
      }

      // 菜单点击
      if (msg.MsgType === 'event' && msg.Event === 'click') {
        const kw = matchKeyword(msg.EventKey, keywords);
        if (kw) return res.status(200).setHeader('Content-Type', 'application/xml; charset=utf-8').send(genReply(toUser, fromUser, kw));
        return res.status(200).setHeader('Content-Type', 'application/xml; charset=utf-8').send(genTextReply(toUser, fromUser, '收到指令：' + msg.EventKey));
      }

      // 文字消息
      if (msg.MsgType === 'text') {
        const text = (msg.Content || '').trim();
        const kw = matchKeyword(text, keywords);
        if (kw) {
          console.log(`✅ match: "${text}" → "${kw.keyword}"`);
          return res.status(200).setHeader('Content-Type', 'application/xml; charset=utf-8').send(genReply(toUser, fromUser, kw));
        }
        // 未匹配：返回帮助提示
        const help = '📖 请尝试以下关键词：\n\n' +
          '· 限行 · 天气 · 地铁\n' +
          '· 公积金 · 社保\n' +
          '· 西湖 · 灵隐寺 · 法喜寺 · 西溪湿地\n' +
          '· 美食 · 博物馆 · 民宿\n' +
          '· 周末 · 赏花 · 古镇\n\n' +
          '🌐 全站搜索：https://www.ihangzhou.net/';
        return res.status(200).setHeader('Content-Type', 'application/xml; charset=utf-8').send(genTextReply(toUser, fromUser, help));
      }

      // 其他消息类型
      return res.status(200).send('success');
    } catch (e) {
      console.error('❌ wechat handler error:', e.message);
      return res.status(200).send('success');
    }
  }

  return res.status(405).send('Method Not Allowed');
};

module.exports._test = { matchKeyword, parseXML, genReply, genTextReply, genNewsReply };
