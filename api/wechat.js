// Vercel Serverless Function - 微信公众号回调接口
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

function getWechatKeywords() {
  try {
    const p = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(p)) {
      const cms = JSON.parse(fs.readFileSync(p, 'utf8'));
      return cms.wechatKeywords || [];
    }
  } catch (e) {}
  return [];
}

function getWechatWelcome() {
  try {
    const p = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(p)) {
      const cms = JSON.parse(fs.readFileSync(p, 'utf8'));
      return cms.wechatWelcome || null;
    }
  } catch (e) {}
  return null;
}

function parseXML(xml) {
  const result = {};
  const regex = /<(\w+)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/\1>/gs;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

function generateReplyXML(toUser, fromUser, content) {
  const timestamp = Math.floor(Date.now() / 1000);
  return `<xml><ToUserName><![CDATA[${toUser}]]></ToUserName><FromUserName><![CDATA[${fromUser}]]></FromUserName><CreateTime>${timestamp}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`;
}

function handleMessage(msg) {
  const { MsgType, Content, Event, EventKey } = msg;

  if (MsgType === 'event' && Event === 'subscribe') {
    const welcome = getWechatWelcome();
    if (welcome) return welcome.title + '\n\n' + welcome.desc + (welcome.url ? '\n\n' + welcome.url : '');
    return '欢迎关注 iHangzhou · 杭州生活助手 🏔️\n\n回复关键词获取服务，或访问：https://www.ihangzhou.net/';
  }

  if (MsgType === 'text') {
    const key = Content.trim();
    const keywords = getWechatKeywords();
    for (const kw of keywords) {
      if (kw.keyword && key.includes(kw.keyword)) {
        return kw.reply;
      }
    }
    const welcome = getWechatWelcome();
    if (welcome) return welcome.title + '\n\n' + welcome.desc;
    return '您好！感谢关注 iHangzhou 🏔️\n\n回复关键词获取服务。';
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

  if (req.method === 'POST') {
    // 直接返回 debug 信息，看看 Vercel 给了我们什么
    const debug = {
      method: req.method,
      headers: req.headers,
      bodyType: typeof req.body,
      bodyIsBuffer: Buffer.isBuffer(req.body),
      bodyLength: req.body ? req.body.length : 0,
      bodyContent: req.body ? (typeof req.body === 'string' ? req.body.substring(0, 500) : JSON.stringify(req.body).substring(0, 500)) : 'null',
      rawBodyExists: !!req.rawBody,
      rawBodyLength: req.rawBody ? req.rawBody.length : 0
    };
    
    // 也尝试从 req 读取
    let rawBody = '';
    if (req.rawBody) {
      rawBody = req.rawBody.toString();
    } else if (req.body) {
      rawBody = typeof req.body === 'string' ? req.body : req.body.toString();
    }
    
    debug.rawBodyFromReq = rawBody.substring(0, 500);
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(debug, null, 2));
    return;
  }

  res.statusCode = 405;
  res.end('Method Not Allowed');
};
