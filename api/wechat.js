// Vercel Serverless Function - 微信公众号回调接口（使用 Express）
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const WECHAT_TOKEN = process.env.WECHAT_TOKEN || 'ihangzhou2024';

// 创建 Express 应用
const app = express();

// 解析所有请求体为文本（支持 XML）
app.use(bodyParser.text({ type: '*/*', limit: '1mb' }));

// SHA1 签名验证
function verifySignature(signature, timestamp, nonce) {
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1 = crypto.createHash('sha1').update(str).digest('hex');
  return sha1 === signature;
}

// 从 cms.json 读取微信配置
function getWechatKeywords() {
  try {
    const p = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8')).wechatKeywords || [];
    }
  } catch (e) { console.error('Load keywords error:', e); }
  return [];
}

function getWechatWelcome() {
  try {
    const p = path.join(process.cwd(), 'data', 'cms.json');
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8')).wechatWelcome || null;
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

  // 关注事件
  if (MsgType === 'event' && Event === 'subscribe') {
    const welcome = getWechatWelcome();
    if (welcome) return welcome.title + '\n\n' + welcome.desc + (welcome.url ? '\n\n' + welcome.url : '');
    return '欢迎关注 iHangzhou · 杭州生活助手 🏔️\n\n回复关键词获取服务。';
  }

  // 文字消息 - 动态匹配关键词
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

// URL 验证（微信后台配置时）
app.get('/api/wechat', (req, res) => {
  const { signature, timestamp, nonce, echostr } = req.query;
  if (signature && timestamp && nonce && echostr) {
    if (verifySignature(signature, timestamp, nonce)) {
      res.type('text/plain').send(echostr);
      return;
    }
  }
  res.type('text/plain').send('iHangzhou WeChat API');
});

// 接收用户消息
app.post('/api/wechat', (req, res) => {
  try {
    const xml = req.body || '';
    if (!xml || xml.length < 5) {
      res.send('success');
      return;
    }

    const msg = parseXML(xml);
    if (!msg.MsgType) {
      res.send('success');
      return;
    }

    const reply = handleMessage(msg);
    const replyXML = generateReplyXML(msg.FromUserName, msg.ToUserName, reply);
    res.type('application/xml').send(replyXML);
  } catch (e) {
    console.error('WeChat POST error:', e);
    res.send('success');
  }
});

// 导出给 Vercel
module.exports = app;
module.exports.default = app;
