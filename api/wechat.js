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

// 从 cms.json 读取关键词
function getWechatKeywords() {
  try {
    const p = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(p)) {
      const cms = JSON.parse(fs.readFileSync(p, 'utf8'));
      return cms.wechatKeywords || [];
    }
  } catch (e) { console.error('Load keywords error:', e); }
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

// 解析 XML
function parseXML(xml) {
  const result = {};
  const regex = /<(\w+)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/\1>/gs;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    result[match[1]] = match[2];
  }
  return result;
}

// 生成回复 XML
function generateReplyXML(toUser, fromUser, content) {
  const timestamp = Math.floor(Date.now() / 1000);
  return `<xml><ToUserName><![CDATA[${toUser}]]></ToUserName><FromUserName><![CDATA[${fromUser}]]></FromUserName><CreateTime>${timestamp}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`;
}

// 消息处理
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
      let rawBody = '';
      
      // Debug: 看看 Vercel 给我们什么
      console.log('Content-Type:', req.headers['content-type']);
      console.log('req.body type:', typeof req.body, req.body ? (typeof req.body === 'string' ? req.body.substring(0, 100) : 'non-string') : 'undefined');
      
      if (req.body) {
        rawBody = typeof req.body === 'string' ? req.body : (req.body.toString ? req.body.toString() : String(req.body));
      }
      
      if (!rawBody || rawBody.length < 5) {
        // 尝试手动读取
        rawBody = await new Promise((resolve, reject) => {
          let data = '';
          req.on('data', chunk => { data += chunk; });
          req.on('end', () => resolve(data));
          req.on('error', reject);
          setTimeout(() => resolve(data), 2000); // 最多等2秒
        });
      }
      
      console.log('rawBody length:', rawBody.length, 'content:', rawBody.substring(0, 200));
      
      if (!rawBody || rawBody.length < 5) {
        res.statusCode = 200;
        res.end('success');
        return;
      }

      const msg = parseXML(rawBody);
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
      console.error('WeChat POST error:', e);
      res.statusCode = 200;
      res.end('success');
      return;
    }
  }

  res.statusCode = 405;
  res.end('Method Not Allowed');
};
