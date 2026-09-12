// Vercel Serverless Function - 微信公众号回调接口（原生无依赖写法）
// 参考：aiwechat-vercel / spark-wechat-vercel 项目
const crypto = require('crypto');

const WECHAT_TOKEN = process.env.WECHAT_TOKEN || 'ihangzhou2024';

// ========== 签名验证 ==========
function verifySignature(signature, timestamp, nonce) {
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1 = crypto.createHash('sha1').update(str).digest('hex');
  return sha1 === signature;
}

// ========== XML 解析（微信公众号消息是 XML 格式） ==========
function parseXML(xml) {
  const result = {};
  if (!xml) return result;
  const regex = /<(\w+)>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/\1>/gs;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    result[m[1]] = m[2];
  }
  return result;
}

// ========== 生成回复 XML ==========
function genReply(to, from, content) {
  const ts = Math.floor(Date.now() / 1000);
  return `<xml><ToUserName><![CDATA[${to}]]></ToUserName><FromUserName><![CDATA[${from}]]></FromUserName><CreateTime>${ts}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`;
}

// ========== 关键词匹配 ==========
// 从环境变量读取关键词配置（JSON格式）
// 格式: [{"keyword":"限行","reply":"今日限行..."}]
function getKeywords() {
  try {
    const env = process.env.WECHAT_KEYWORDS;
    if (env) return JSON.parse(env);
  } catch (e) {}
  return [];
}

function getWelcome() {
  try {
    return process.env.WECHAT_WELCOME || '欢迎关注 iHangzhou · 杭州生活助手\n\n回复关键词获取信息：限行、地铁、天气';
  } catch (e) {
    return '欢迎关注 iHangzhou · 杭州生活助手';
  }
}

// ========== 消息处理 ==========
function handleMessage(msg) {
  // 关注事件
  if (msg.MsgType === 'event' && msg.Event === 'subscribe') {
    return getWelcome();
  }
  
  // 文字消息 - 关键词匹配
  if (msg.MsgType === 'text') {
    const key = (msg.Content || '').trim().toLowerCase();
    const keywords = getKeywords();
    
    for (const kw of keywords) {
      if (kw.keyword && key.includes(kw.keyword.toLowerCase())) {
        return kw.reply;
      }
    }
    
    // 无匹配时返回默认欢迎语
    return getWelcome();
  }
  
  return '请回复文字消息。';
}

// ========== Vercel Serverless Function 入口 ==========
module.exports = async function handler(req, res) {
  // GET 请求 - 微信服务器验证 URL
  if (req.method === 'GET') {
    const { signature, timestamp, nonce, echostr } = req.query || {};
    if (signature && timestamp && nonce && echostr && verifySignature(signature, timestamp, nonce)) {
      res.status(200).send(echostr);
    } else {
      res.status(200).send('iHangzhou WeChat API');
    }
    return;
  }
  
  // POST 请求 - 微信推送用户消息
  if (req.method === 'POST') {
    try {
      // 关键：Vercel 会自动解析 body，XML 内容在 req.body 中
      // 如果 body 是 string，直接用；如果是 Buffer，转 string；如果是对象，说明已被解析
      let xml = '';
      if (typeof req.body === 'string') {
        xml = req.body;
      } else if (Buffer.isBuffer(req.body)) {
        xml = req.body.toString('utf-8');
      } else if (req.body && typeof req.body === 'object') {
        // Vercel 有时会以 string 形式放在 body 中
        xml = req.body.toString ? req.body.toString() : String(req.body);
      }
      
      if (!xml || xml.length < 10) {
        res.status(200).send('success');
        return;
      }
      
      const msg = parseXML(xml);
      if (!msg.MsgType) {
        res.status(200).send('success');
        return;
      }
      
      const reply = handleMessage(msg);
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.status(200).send(genReply(msg.FromUserName, msg.ToUserName, reply));
    } catch (e) {
      console.error('WeChat handler error:', e);
      res.status(200).send('success');
    }
    return;
  }
  
  // 其他方法
  res.status(405).send('Method Not Allowed');
};
