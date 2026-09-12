// Vercel Serverless Function - 微信公众号回调接口
// 支持：URL验证、消息接收与回复

const crypto = require('crypto');

// 从环境变量读取配置
const WECHAT_TOKEN = process.env.WECHAT_TOKEN || 'ihangzhou2024';

// SHA1 签名验证
function verifySignature(signature, timestamp, nonce) {
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1 = crypto.createHash('sha1').update(str).digest('hex');
  return sha1 === signature;
}

// 解析 XML
function parseXML(xml) {
  const result = {};
  const regex = /<(?:!\[CDATA\[)?(\w+)(?:\]\]?)>([^<]*?)<\/\1>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

// 生成回复 XML
function generateReplyXML(toUser, fromUser, content) {
  const timestamp = Math.floor(Date.now() / 1000);
  return `<xml>
  <ToUserName><![CDATA[${toUser}]]></ToUserName>
  <FromUserName><![CDATA[${fromUser}]]></FromUserName>
  <CreateTime>${timestamp}</CreateTime>
  <MsgType><![CDATA[text]]></MsgType>
  <Content><![CDATA[${content}]]></Content>
</xml>`;
}

// 消息处理
function handleMessage(msg) {
  const { MsgType, Content, Event, EventKey } = msg;

  // 关注事件
  if (MsgType === 'event' && Event === 'subscribe') {
    return '欢迎关注 iHangzhou · 杭州生活助手 🏔️\n\n回复数字获取服务：\n1 - 今日限行\n2 - 杭州天气\n3 - 地铁线路\n4 - 公积金\n5 - 社保查询\n\n或访问：https://www.ihangzhou.net/';
  }

  // 菜单点击事件
  if (MsgType === 'event' && Event === 'CLICK') {
    const menus = {
      MENU_HOME: '🏠 主页：https://www.ihangzhou.net/',
      MENU_XIANXING: '🚗 今日限行\nhttps://www.ihangzhou.net/#xianxing',
      MENU_TOOLS: '🛠️ 实用工具\nhttps://www.ihangzhou.net/#tools',
      MENU_CONTACT: '💬 联系我们\n📧 biz@ihangzhou.net'
    };
    return menus[EventKey] || `您点击了菜单：${EventKey}`;
  }

  // 文字消息
  if (MsgType === 'text') {
    const key = Content.trim();
    const replies = {
      '1': '🚗 今日杭州尾号限行\n\nhttps://www.ihangzhou.net/#xianxing',
      '限行': '🚗 今日杭州尾号限行\n\nhttps://www.ihangzhou.net/#xianxing',
      '2': '🌤️ 杭州天气\n\nhttps://www.ihangzhou.net/#weather',
      '天气': '🌤️ 杭州天气\n\nhttps://www.ihangzhou.net/#weather',
      '3': '🚇 杭州地铁线路\n\n1号线~19号线全图：https://www.hzmetro.com/',
      '地铁': '🚇 杭州地铁线路\n\n1号线~19号线全图：https://www.hzmetro.com/',
      '4': '🏠 杭州公积金\n\n查询入口：https://gjj.hangzhou.gov.cn/',
      '公积金': '🏠 杭州公积金\n\n查询入口：https://gjj.hangzhou.gov.cn/',
      '5': '🏥 杭州社保\n\n查询入口：https://www.zjzwfw.gov.cn/',
      '社保': '🏥 杭州社保\n\n查询入口：https://www.zjzwfw.gov.cn/'
    };
    if (replies[key]) return replies[key];
    return `您好！感谢关注 iHangzhou 🏔️\n\n回复数字获取服务：\n1 - 今日限行\n2 - 杭州天气\n3 - 地铁线路\n4 - 公积金\n5 - 社保查询\n\n或访问：https://www.ihangzhou.net/`;
  }

  return '暂不支持此类型消息，请回复文字或数字。\n\n回复「1」限行 |「2」天气 |「3」地铁 |「4」公积金 |「5」社保';
}

module.exports = async (req, res) => {
  // 设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS 预检
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // GET - URL 验证（微信配置时自动调用）
  if (req.method === 'GET') {
    const { signature, timestamp, nonce, echostr } = req.query;

    // 微信会传 signature, timestamp, nonce, echostr 四个参数
    // 验证通过必须返回 echostr 的值，返回 200
    if (signature && timestamp && nonce && echostr) {
      if (verifySignature(signature, timestamp, nonce)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(echostr);
        return;
      }
    }

    // 即使验证失败或无参数，也返回 200（但是返回空或提示）
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('iHangzhou WeChat API');
    return;
  }

  // POST - 接收用户消息
  if (req.method === 'POST') {
    try {
      const xml = req.body;
      const msg = parseXML(typeof xml === 'string' ? xml : xml.toString());

      if (!msg.MsgType) {
        res.statusCode = 200;
        res.end('success');
        return;
      }

      const reply = handleMessage(msg);
      const replyXML = generateReplyXML(msg.FromUserName, msg.ToUserName, reply);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.end(replyXML);
      return;
    } catch (e) {
      console.error('WeChat message error:', e);
      res.statusCode = 200;
      res.end('success');
      return;
    }
  }

  // 其他方法
  res.statusCode = 405;
  res.end('Method Not Allowed');
};
