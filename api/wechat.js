// Vercel Serverless Function - 微信公众号回调接口（增强版）
// 功能：URL 验证 / 消息回调 / 智能关键词匹配 / 图文回复 / 菜单同步
// 依赖：@vercel/blob（读取关键词数据，独立存储，快 100 倍）
const { get, put } = require('@vercel/blob');
// 配置：环境变量 WECHAT_TOKEN（签名验证）、WX_APPID/WX_SECRET（菜单同步可选）

const crypto = require('crypto');

const WECHAT_TOKEN = process.env.WECHAT_TOKEN || 'ihangzhou2024';
const DEFAULT_WELCOME = {
  type: 'text',
  title: '欢迎关注 iHangzhou · 杭州生活助手 🏔️',
  desc: '杭州人的数字生活工具箱\n回复数字获取服务：1限行 2天气 3地铁 4公积金 5社保\n回复「帮助」查看全部指令',
  picUrl: 'https://www.ihangzhou.net/images/og-cover.jpg',
  url: 'https://www.ihangzhou.net/'
};
const HELP_COMMANDS = ['帮助', '?', '？', 'help', 'h', 'H', '指令', '菜单'];
const DEFAULT_KEYWORDS = require('../data/cms.json').wechatKeywords || [];

// ========== 关键词数据缓存（10 秒内复用，减少 Blob 调用） ==========
let KW_CACHE = { data: null, expires: 0 };

// 只读取关键词数据（独立 Blob，约 5KB，不再读全量 600KB CMS 数据）
async function loadKeywords() {
  const now = Date.now();
  if (KW_CACHE.data && KW_CACHE.expires > now) return KW_CACHE.data;
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      const result = await get('wechat-keywords.json', { access: 'private', useCache: false });
      if (result) {
        const reader = result.stream.getReader();
        var chunks = [];
        var done = false;
        while (!done) {
          var r = await reader.read();
          done = r.done;
          if (r.value) chunks.push(r.value);
        }
        var text = Buffer.concat(chunks).toString('utf-8');
        var data = JSON.parse(text);
        KW_CACHE = { data: data, expires: now + 10000 };
        return data;
      }
    }
  } catch (e) { console.error('loadKeywords error:', e.message); }
  // 兜底：使用本地 cms.json 中的关键词
  KW_CACHE = { data: DEFAULT_KEYWORDS, expires: now + 2000 };
  return DEFAULT_KEYWORDS;
}

// 需要全量 CMS 数据时（菜单同步等），才读 cms-data.json
let CMS_CACHE = { data: null, expires: 0 };
async function loadCMS() {
  const now = Date.now();
  if (CMS_CACHE.data && CMS_CACHE.expires > now) return CMS_CACHE.data;
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (token) {
      const result = await get('cms-data.json', { access: 'private', useCache: false });
      if (result) {
        const reader = result.stream.getReader();
        var chunks = [];
        var done = false;
        while (!done) {
          var r = await reader.read();
          done = r.done;
          if (r.value) chunks.push(r.value);
        }
        var text = Buffer.concat(chunks).toString('utf-8');
        var data = JSON.parse(text);
        CMS_CACHE = { data: data, expires: now + 10000 };
        return data;
      }
    }
  } catch (e) { console.error('loadCMS error:', e.message); }
  const fallback = require('../data/cms.json');
  CMS_CACHE = { data: fallback, expires: now + 1000 };
  return fallback;
}

// ========== 签名验证 ==========
function verifySignature(signature, timestamp, nonce) {
  if (!signature || !timestamp || !nonce) return false;
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1 = crypto.createHash('sha1').update(str).digest('hex');
  return sha1 === signature;
}

// ========== XML 解析（微信公众号消息是 XML 格式） ==========
// 注意：用 [^<]* 替代 .*? 避免匹配嵌套标签
function parseXML(xml) {
  const result = {};
  if (!xml) return result;
  const regex = /<(\w+)>(?:<!\[CDATA\[)?([^<]*?)(?:\]\]>)?<\/\1>/g;
  let m;
  while ((m = regex.exec(xml)) !== null) {
    result[m[1]] = m[2];
  }
  return result;
}

// ========== 生成文本回复 XML ==========
function genTextReply(toUser, fromUser, content) {
  const ts = Math.floor(Date.now() / 1000);
  return `<xml><ToUserName><![CDATA[${toUser}]]></ToUserName><FromUserName><![CDATA[${fromUser}]]></FromUserName><CreateTime>${ts}</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]></Content></xml>`;
}

// ========== 生成图文回复 XML（单条 news） ==========
function genNewsReply(toUser, fromUser, article) {
  const ts = Math.floor(Date.now() / 1000);
  const title = article.title || 'iHangzhou';
  const desc = (article.desc || '').replace(/\n/g, ' ');
  const picUrl = article.picUrl || 'https://www.ihangzhou.net/images/og-cover.jpg';
  const url = article.url || 'https://www.ihangzhou.net/';
  return `<xml><ToUserName><![CDATA[${toUser}]]></ToUserName><FromUserName><![CDATA[${fromUser}]]></FromUserName><CreateTime>${ts}</CreateTime><MsgType><![CDATA[news]]></MsgType><ArticleCount>1</ArticleCount><Articles><item><Title><![CDATA[${title}]]></Title><Description><![CDATA[${desc}]]></Description><PicUrl><![CDATA[${picUrl}]]></PicUrl><Url><![CDATA[${url}]]></Url></item></Articles></xml>`;
}

// 根据关键词配置生成对应类型的回复
function genReply(toUser, fromUser, kwConfig) {
  if (!kwConfig) return null;
  if (kwConfig.type === 'news') {
    return genNewsReply(toUser, fromUser, kwConfig);
  }
  // 资料分享类型：自动格式化网盘链接+提取码
  if (kwConfig.type === 'share') {
    var lines = [];
    lines.push('📂 ' + (kwConfig.title || kwConfig.keyword || '资料分享'));
    if (kwConfig.desc) lines.push(kwConfig.desc);
    lines.push('');
    // 网盘类型标签
    var driveLabels = { baidu: '百度网盘', aliyun: '阿里云盘', quark: '夸克网盘', 115: '115网盘', other: '网盘' };
    var driveLabel = driveLabels[kwConfig.drive] || '网盘';
    lines.push('🔗 ' + driveLabel + '：' + (kwConfig.url || ''));
    // 提取码
    if (kwConfig.code) {
      lines.push('🔑 提取码：' + kwConfig.code);
      // 百度网盘可以直接拼接 pwd 参数
      if (kwConfig.drive === 'baidu' && kwConfig.url) {
        lines.push('');
        lines.push('或直接访问：' + kwConfig.url + '?pwd=' + kwConfig.code);
      }
    }
    lines.push('');
    lines.push('⚠️ 链接若失效请回复反馈');
    return genTextReply(toUser, fromUser, lines.join('\n'));
  }
  return genTextReply(toUser, fromUser, kwConfig.reply || kwConfig.desc || '');
}

// ========== 关键词智能匹配 ==========
// 匹配优先级：1.精确匹配  2.同义词匹配  3.包含匹配
function matchKeyword(userText, keywords) {
  if (!userText) return null;
  const text = userText.trim().toLowerCase();
  // 1. 精确匹配（关键词本身）
  for (const kw of keywords) {
    if (kw.keyword && kw.keyword.toLowerCase() === text) return kw;
  }
  // 2. 同义词精确匹配
  for (const kw of keywords) {
    if (kw.aliases && Array.isArray(kw.aliases)) {
      for (const alias of kw.aliases) {
        if (alias.toLowerCase() === text) return kw;
      }
    }
  }
  // 3. 包含匹配（用户输入包含关键词或同义词）
  for (const kw of keywords) {
    const candidates = [kw.keyword, ...(kw.aliases || [])].filter(Boolean);
    for (const c of candidates) {
      if (c && text.includes(c.toLowerCase())) return kw;
    }
  }
  return null;
}

// ========== 帮助指令：列出所有可用关键词 ==========
function genHelpReply(toUser, fromUser, keywords) {
  const lines = ['📖 iHangzhou 可用指令：', ''];
  keywords.forEach(function(kw, i) {
    const aliases = kw.aliases && kw.aliases.length ? '（' + kw.aliases.slice(0, 2).join('/') + '）' : '';
    lines.push((i + 1) + '. ' + kw.keyword + aliases);
  });
  lines.push('', '💡 提示：直接输入关键词即可获取服务', '🌐 完整功能：https://www.ihangzhou.net/');
  return genTextReply(toUser, fromUser, lines.join('\n'));
}

// ========== 微信 Access Token（用于菜单同步） ==========
const TOKEN_CACHE = { token: '', expires: 0 };
async function getAccessToken() {
  const now = Date.now();
  if (TOKEN_CACHE.token && TOKEN_CACHE.expires > now + 60000) return TOKEN_CACHE.token;
  const appid = process.env.WX_APPID;
  const secret = process.env.WX_SECRET;
  if (!appid || !secret) throw new Error('WX_APPID/WX_SECRET 未配置');
  const r = await fetch(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`);
  const data = await r.json();
  if (data.errcode) throw new Error('access_token 错误: ' + data.errmsg);
  TOKEN_CACHE.token = data.access_token;
  TOKEN_CACHE.expires = now + data.expires_in * 1000;
  return data.access_token;
}

// ========== 同步菜单 ==========
async function syncMenu(menuConfig) {
  const token = await getAccessToken();
  const r = await fetch(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menuConfig)
  });
  const data = await r.json();
  if (data.errcode) throw new Error('菜单同步失败: ' + data.errmsg + ' (' + data.errcode + ')');
  return data;
}

// ========== 消息处理主逻辑 ==========
async function handleMessage(msg, keywords) {
  const toUser = msg.FromUserName;
  const fromUser = msg.ToUserName;
  const welcome = DEFAULT_WELCOME;

  // 关注事件
  if (msg.MsgType === 'event' && msg.Event === 'subscribe') {
    if (welcome.type === 'news') {
      return genNewsReply(toUser, fromUser, welcome);
    }
    return genTextReply(toUser, fromUser, welcome.desc || welcome.title || '欢迎关注');
  }

  // CLICK 事件（菜单点击）
  if (msg.MsgType === 'event' && msg.Event === 'click') {
    if (msg.EventKey === 'menu_checkin') {
      return genTextReply(toUser, fromUser, '📅 每日签到\n\n请访问 https://www.ihangzhou.net/ 进行签到');
    }
    // 其他 click 事件按关键词匹配 EventKey
    const kw = matchKeyword(msg.EventKey, keywords);
    return kw ? genReply(toUser, fromUser, kw) : genTextReply(toUser, fromUser, '收到指令：' + msg.EventKey);
  }

  // 文字消息
  if (msg.MsgType === 'text') {
    const text = (msg.Content || '').trim();

    // 帮助指令
    if (HELP_COMMANDS.indexOf(text.toLowerCase()) >= 0) {
      return genHelpReply(toUser, fromUser, keywords);
    }

    // 关键词匹配
    const kw = matchKeyword(text, keywords);
    if (kw) return genReply(toUser, fromUser, kw);

    // 未匹配：转接微信AI回复
    return '<xml>' +
      '<ToUserName><![CDATA[' + toUser + ']]></ToUserName>' +
      '<FromUserName><![CDATA[' + fromUser + ']]></FromUserName>' +
      '<CreateTime>' + Math.floor(Date.now() / 1000) + '</CreateTime>' +
      '<MsgType><![CDATA[transfer_biz_ai_ivr]]></MsgType>' +
      '</xml>';
  }

  // 其他消息类型：也转接AI
  return '<xml>' +
    '<ToUserName><![CDATA[' + toUser + ']]></ToUserName>' +
    '<FromUserName><![CDATA[' + fromUser + ']]></FromUserName>' +
    '<CreateTime>' + Math.floor(Date.now() / 1000) + '</CreateTime>' +
    '<MsgType><![CDATA[transfer_biz_ai_ivr]]></MsgType>' +
    '</xml>';
}

// ========== Vercel Serverless Function 入口 ==========
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 管理后台调用：同步菜单
  if (req.method === 'POST' && req.query && req.query.action === 'syncMenu') {
    const authHeader = req.headers.authorization;
    const isAdmin = authHeader === 'Bearer ' + (process.env.CMS_ADMIN_PASSWORD || 'ihangzhou2024');
    if (!isAdmin) return res.status(401).json({ success: false, error: '需要认证' });
    try {
      const cms = await loadCMS();
      const menuConfig = cms.wechatMenu;
      if (!menuConfig || !menuConfig.button) return res.status(400).json({ success: false, error: 'cms.json 未配置 wechatMenu' });
      const result = await syncMenu(menuConfig);
      return res.status(200).json({ success: true, data: result });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  // GET 请求 - 微信服务器验证 URL
  if (req.method === 'GET') {
    const { signature, timestamp, nonce, echostr } = req.query || {};
    if (verifySignature(signature, timestamp, nonce)) {
      return res.status(200).send(echostr || 'ok');
    }
    return res.status(200).send('iHangzhou WeChat API');
  }

  // POST 请求 - 微信推送用户消息
  if (req.method === 'POST') {
    try {
      let xml = '';
      if (typeof req.body === 'string') xml = req.body;
      else if (Buffer.isBuffer(req.body)) xml = req.body.toString('utf-8');
      else if (req.body && typeof req.body === 'object') xml = req.body.toString ? req.body.toString() : String(req.body);

      // Vercel @vercel/node 默认不解析 XML body，需要从请求流读取
      if (!xml || xml.length < 10) {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
        }
        if (chunks.length > 0) {
          xml = Buffer.concat(chunks).toString('utf-8');
        }
      }

      if (!xml || xml.length < 10) {
        console.log('WeChat POST: empty or too short body, xml=' + JSON.stringify(xml).substring(0, 200));
        return res.status(200).send('success');
      }

      const msg = parseXML(xml);
      if (!msg.MsgType) {
        return res.status(200).send('success');
      }

      const keywords = await loadKeywords();
      // 调试日志
      if (msg.MsgType === 'text') {
        console.log('WeChat text:', msg.Content, '| keywords count:', keywords.length, '| match:', matchKeyword(msg.Content, keywords) ? 'YES' : 'NO');
      }
      const reply = await handleMessage(msg, keywords);
      console.log('Reply type:', reply ? reply.substring(0, 80) : 'null');
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      return res.status(200).send(reply);
    } catch (e) {
      console.error('WeChat handler error:', e);
      return res.status(200).send('success');
    }
  }

  return res.status(405).send('Method Not Allowed');
};

// 导出内部函数用于测试（不影响运行时）
module.exports._test = { handleMessage, matchKeyword, parseXML, genReply, genHelpReply, genNewsReply, genTextReply };
