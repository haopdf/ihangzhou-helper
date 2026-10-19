// 微信公众号 JSAPI 签名服务 (Vercel Serverless)
// 用于 H5 跳转小程序（wx-open-launch-weapp）和分享接口
// 需配置环境变量：
//   WX_APPID  - 公众号 AppID
//   WX_SECRET - 公众号 AppSecret
//   WX_TOKEN  - 公众号 Token（如使用服务器配置）

const ACCESS_TOKEN_CACHE = { token: '', expires: 0 };
const TICKET_CACHE = { ticket: '', expires: 0 };

async function getAccessToken() {
  const now = Date.now();
  if (ACCESS_TOKEN_CACHE.token && ACCESS_TOKEN_CACHE.expires > now + 60000) {
    return ACCESS_TOKEN_CACHE.token;
  }
  const appid = process.env.WX_APPID;
  const secret = process.env.WX_SECRET;
  if (!appid || !secret) throw new Error('WX_APPID/WX_SECRET 未配置');
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
  const r = await fetch(url);
  const data = await r.json();
  if (data.errcode) throw new Error('access_token 错误: ' + data.errmsg);
  ACCESS_TOKEN_CACHE.token = data.access_token;
  ACCESS_TOKEN_CACHE.expires = now + data.expires_in * 1000;
  return data.access_token;
}

async function getJsApiTicket() {
  const now = Date.now();
  if (TICKET_CACHE.ticket && TICKET_CACHE.expires > now + 60000) {
    return TICKET_CACHE.ticket;
  }
  const token = await getAccessToken();
  const r = await fetch(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=${token}`);
  const data = await r.json();
  if (data.errcode) throw new Error('jsapi_ticket 错误: ' + data.errmsg);
  TICKET_CACHE.ticket = data.ticket;
  TICKET_CACHE.expires = now + data.expires_in * 1000;
  return data.ticket;
}

// 生成随机字符串
function randomStr(len) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// 简易 sha1（Node 内置 crypto）
const crypto = require('crypto');
function sha1(s) {
  return crypto.createHash('sha1').update(s, 'utf8').digest('hex');
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const url = req.query && req.query.url;
  if (!url) return res.status(400).json({ error: 'missing url param' });

  const appid = process.env.WX_APPID;
  const secret = process.env.WX_SECRET;
  if (!appid || !secret) {
    return res.status(500).json({
      error: 'WX_APPID/WX_SECRET 未配置',
      hint: '在 Vercel Environment Variables 配置 WX_APPID 和 WX_SECRET'
    });
  }

  try {
    const ticket = await getJsApiTicket();
    const noncestr = randomStr(16);
    const timestamp = Math.floor(Date.now() / 1000);
    const str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
    const signature = sha1(str);

    res.status(200).json({
      appid,
      timestamp,
      noncestr,
      signature,
      // 同时返回小程序 AppId（用于 wx-open-launch-weapp）
      // 携程小程序 AppId 由前端配置，这里返回公众号 AppId 用于 jsapi
      mpAppId: 'wx0e6ed4f51db9d078'
    });
  } catch (err) {
    console.error('jsapi error:', err);
    res.status(500).json({ error: err.message || 'internal' });
  }
};
