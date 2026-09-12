// Vercel Serverless Function - 微信公众号回调接口（使用原生 HTTP 服务器）
const http = require('http');
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
      return JSON.parse(fs.readFileSync(p, 'utf8')).wechatKeywords || [];
    }
  } catch (e) {}
  return [];
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
  const { MsgType, Content, Event } = msg;

  if (MsgType === 'event' && Event === 'subscribe') {
    return '欢迎关注 iHangzhou · 杭州生活助手 🏔️\n\n回复关键词获取服务，或访问：https://www.ihangzhou.net/';
  }

  if (MsgType === 'text') {
    const key = Content ? Content.trim() : '';
    const keywords = getWechatKeywords();
    for (const kw of keywords) {
      if (kw.keyword && key.includes(kw.keyword)) {
        return kw.reply;
      }
    }
    return '您好！感谢关注 iHangzhou 🏔️\n\n回复数字获取服务：\n1 - 今日限行\n2 - 杭州天气\n3 - 地铁线路\n4 - 公积金\n5 - 社保查询';
  }

  return '暂不支持此类型消息，请回复文字。';
}

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET - URL 验证
  if (req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const signature = url.searchParams.get('signature');
    const timestamp = url.searchParams.get('timestamp');
    const nonce = url.searchParams.get('nonce');
    const echostr = url.searchParams.get('echostr');

    if (signature && timestamp && nonce && echostr) {
      if (verifySignature(signature, timestamp, nonce)) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(echostr);
        return;
      }
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('iHangzhou WeChat API');
    return;
  }

  // POST - 接收消息
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        if (!body || body.length < 10) {
          res.writeHead(200);
          res.end('success');
          return;
        }

        const msg = parseXML(body);
        if (!msg.MsgType) {
          res.writeHead(200);
          res.end('success');
          return;
        }

        const reply = handleMessage(msg);
        const replyXML = generateReplyXML(msg.FromUserName, msg.ToUserName, reply);
        res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
        res.end(replyXML);
      } catch (e) {
        console.error('WeChat POST error:', e);
        res.writeHead(200);
        res.end('success');
      }
    });
    return;
  }

  res.writeHead(405);
  res.end('Method Not Allowed');
});

module.exports = server;
