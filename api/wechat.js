// Vercel Serverless Function - 微信公众号回调接口
// 支持：URL验证、消息接收与回复（动态读取 cms.json 配置）

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const WECHAT_TOKEN = process.env.WECHAT_TOKEN || 'ihangzhou2024';

function verifySignature(signature, timestamp, nonce) {
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1 = crypto.createHash('sha1').update(str).digest('hex');
  return sha1 === signature;
}

function parseXML(xml) {
  const result = {};
  const regex = /<(?:!\[CDATA\[)?(\w+)(?:\]\]?)>([^<]*?)<\/\1>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

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

// 从 cms.json 读取微信关键词（实时读取，后台改完即用）
function getWechatKeywords() {
  try {
    const cmsPath = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(cmsPath)) {
      const cms = JSON.parse(fs.readFileSync(cmsPath, 'utf8'));
      return cms.wechatKeywords || [];
    }
  } catch (e) { console.error('Load keywords error:', e); }
  return [];
}

function getWechatWelcome() {
  try {
    const cmsPath = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(cmsPath)) {
      const cms = JSON.parse(fs.readFileSync(cmsPath, 'utf8'));
      return cms.wechatWelcome || null;
    }
  } catch (e) { return null; }
}

// 消息处理
function handleMessage(msg) {
  const { MsgType, Content, Event, EventKey } = msg;

  // 关注事件 - 使用后台配置的欢迎语
  if (MsgType === 'event' && Event === 'subscribe') {
    const welcome = getWechatWelcome();
    if (welcome) {
      let reply = welcome.title + '\n\n' + welcome.desc;
      if (welcome.url) reply += '\n\n' + welcome.url;
      return reply;
    }
    return '欢迎关注 iHangzhou · 杭州生活助手 🏔️\n\n回复关键词获取服务，或访问：https://www.ihangzhou.net/';
  }

  // 菜单点击
  if (MsgType === 'event' && Event === 'CLICK') {
    const menus = {
      MENU_HOME: '🏠 主页：https://www.ihangzhou.net/',
      MENU_XIANXING: '🚗 今日限行\nhttps://www.ihangzhou.net/#xianxing',
      MENU_TOOLS: '🛠️ 实用工具\nhttps://www.ihangzhou.net/#tools',
      MENU_CONTACT: '💬 联系我们'
    };
    return menus[EventKey] || `您点击了菜单：${EventKey}`;
  }

  // 文字消息 - 动态匹配后台配置的关键词
  if (MsgType === 'text') {
    const key = Content.trim();
    const keywords = getWechatKeywords();

    // 遍历后台配置的关键词，匹配则返回对应回复
    for (const kw of keywords) {
      if (kw.keyword && key.includes(kw.keyword)) {
        return kw.reply;
      }
    }

    // 默认回复
    const welcome = getWechatWelcome();
    if (welcome) {
      return welcome.title + '\n\n' + welcome.desc + '\n\n或访问：' + (welcome.url || 'https://www.ihangzhou.net/');
    }
    return '您好！感谢关注 iHangzhou 🏔️\n\n回复关键词获取服务，或访问：https://www.ihangzhou.net/';
  }

  return '暂不支持此类型消息，请回复文字。';
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // GET - URL 验证
  if (req.method === 'GET') {
    const { signature, timestamp, nonce, echostr } = req.query;
    if (signature && timestamp && nonce && echostr) {
      if (verifySignature(signature, timestamp, nonce)) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(echostr);
        return;
      }
    }
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

  res.statusCode = 405;
  res.end('Method Not Allowed');
};
