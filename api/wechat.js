// Vercel Edge Function - 微信公众号回调接口
// Edge Runtime 使用标准 Web API，可以读取任意 Content-Type 的 body
export const config = {
  runtime: 'edge',
  regions: ['iad1'],
};

const WECHAT_TOKEN = 'ihangzhou2024';

// 默认关键词
const KEYWORDS = [
  { keyword: '1', reply: '🚗 今日杭州尾号限行\n\nhttps://www.ihangzhou.net/#xianxing' },
  { keyword: '2', reply: '🌤️ 杭州天气\n\nhttps://www.ihangzhou.net/#weather' },
  { keyword: '3', reply: '🚇 杭州地铁线路\n\nhttps://www.hzmetro.com/' },
  { keyword: '4', reply: '🏠 杭州公积金\n\nhttps://gjj.hangzhou.gov.cn/' },
  { keyword: '5', reply: '🏥 杭州社保\n\nhttps://www.zjzwfw.gov.cn/' },
  { keyword: '限行', reply: '🚗 今日杭州尾号限行\n\nhttps://www.ihangzhou.net/#xianxing' },
  { keyword: '天气', reply: '🌤️ 杭州天气\n\nhttps://www.ihangzhou.net/#weather' },
  { keyword: '地铁', reply: '🚇 杭州地铁线路\n\nhttps://www.hzmetro.com/' },
  { keyword: '公积金', reply: '🏠 杭州公积金\n\nhttps://gjj.hangzhou.gov.cn/' },
  { keyword: '社保', reply: '🏥 杭州社保\n\nhttps://www.zjzwfw.gov.cn/' },
];

const WELCOME_TITLE = '欢迎关注 iHangzhou · 杭州生活助手 🏔️';
const WELCOME_DESC = '回复数字获取服务：\n1 - 今日限行\n2 - 杭州天气\n3 - 地铁线路\n4 - 公积金\n5 - 社保查询';
const WELCOME_URL = 'https://www.ihangzhou.net/';

async function verifySignature(signature, timestamp, nonce) {
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const hashBuffer = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('') === signature;
}

function parseXML(xml) {
  const result = {};
  const regex = /<(\w+)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/\1>/gs;
  let m;
  while ((m = regex.exec(xml)) !== null) result[m[1]] = m[2];
  return result;
}

function genReply(to, from, content) {
  return `<xml><ToUserName><![CDATA[${to}]]></ToUserName><FromUserName><![CDATA[${from}]]></FromUserName><CreateTime>${Math.floor(Date.now()/1000)}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`;
}

function handle(msg) {
  if (msg.MsgType === 'event' && msg.Event === 'subscribe') return WELCOME_TITLE + '\n\n' + WELCOME_DESC + '\n\n' + WELCOME_URL;
  if (msg.MsgType === 'text') {
    const key = (msg.Content || '').trim();
    for (const kw of KEYWORDS) if (kw.keyword && key.includes(kw.keyword)) return kw.reply;
    return WELCOME_TITLE + '\n\n' + WELCOME_DESC;
  }
  return '请回复文字。';
}

export default async function(req) {
  if (req.method === 'GET') {
    const u = new URL(req.url);
    const sig = u.searchParams.get('signature'), ts = u.searchParams.get('timestamp'), nonce = u.searchParams.get('nonce'), echo = u.searchParams.get('echostr');
    if (sig && ts && nonce && echo && await verifySignature(sig, ts, nonce)) return new Response(echo, {status:200});
    return new Response('iHangzhou WeChat API', {status:200});
  }
  if (req.method === 'POST') {
    const xml = await req.text();
    const msg = parseXML(xml);
    if (!msg.MsgType) return new Response('success', {status:200});
    return new Response(genReply(msg.FromUserName, msg.ToUserName, handle(msg)), {
      status: 200, headers: {'Content-Type': 'application/xml; charset=utf-8'}
    });
  }
  return new Response('Method Not Allowed', {status: 405});
}
