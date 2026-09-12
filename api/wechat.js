// Vercel Serverless Function - 微信公众号回调接口
// 支持：URL验证、消息接收与回复、自定义菜单

const crypto = require('crypto');

// 从环境变量读取配置（Vercel Dashboard 设置）
const WECHAT_TOKEN = process.env.WECHAT_TOKEN || 'ihangzhou2024';
const WECHAT_ENCODING_AES_KEY = process.env.WECHAT_ENCODING_AES_KEY || '';
const WECHAT_APPID = process.env.WECHAT_APPID || '';
const WECHAT_APPSECRET = process.env.WECHAT_APPSECRET || '';

// 工具函数：SHA1 签名验证
function verifySignature(signature, timestamp, nonce) {
  const arr = [WECHAT_TOKEN, timestamp, nonce].sort();
  const str = arr.join('');
  const sha1 = crypto.createHash('sha1').update(str).digest('hex');
  return sha1 === signature;
}

// 解析 XML（简单实现）
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
function generateReplyXML(toUser, fromUser, content, msgType = 'text') {
  const timestamp = Math.floor(Date.now() / 1000);
  if (msgType === 'news') {
    // 图文消息（多条）
    const items = content.map(item => `
    <item>
      <Title><![CDATA[${item.title}]]></Title>
      <Description><![CDATA[${item.desc || ''}]]></Description>
      <PicUrl><![CDATA[${item.picurl || ''}]]></PicUrl>
      <Url><![CDATA[${item.url}]]></Url>
    </item>`).join('');
    return `<xml>
  <ToUserName><![CDATA[${toUser}]]></ToUserName>
  <FromUserName><![CDATA[${fromUser}]]></FromUserName>
  <CreateTime>${timestamp}</CreateTime>
  <MsgType><![CDATA[news]]></MsgType>
  <ArticleCount>${content.length}</ArticleCount>
  <Articles>${items}</Articles>
</xml>`;
  }
  return `<xml>
  <ToUserName><![CDATA[${toUser}]]></ToUserName>
  <FromUserName><![CDATA[${fromUser}]]></FromUserName>
  <CreateTime>${timestamp}</CreateTime>
  <MsgType><![CDATA[text]]></MsgType>
  <Content><![CDATA[${content}]]></Content>
</xml>`;
}

// 获取 access_token（群发/自定义菜单需要）
async function getAccessToken() {
  if (!WECHAT_APPID || !WECHAT_APPSECRET) return null;
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WECHAT_APPID}&secret=${WECHAT_APPSECRET}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.access_token || null;
}

// 消息处理逻辑
function handleMessage(msg) {
  const { MsgType, Content, Event, EventKey } = msg;

  // 关注事件
  if (MsgType === 'event' && (Event === 'subscribe' || Event === 'unsubscribe')) {
    return {
      type: 'news',
      content: [{
        title: '欢迎关注 iHangzhou · 杭州生活助手 🏔️',
        desc: '杭州人的数字生活工具箱。办事/出行/民生/特色服务一站导航，每日推送限行、油价、政策解读。',
        picurl: 'https://www.ihangzhou.net/images/welcome.jpg',
        url: 'https://www.ihangzhou.net/'
      }]
    };
  }

  // 菜单点击事件
  if (MsgType === 'event' && Event === 'CLICK') {
    switch (EventKey) {
      case 'MENU_HOME':
        return { type: 'text', content: '🏠 主页已打开\nhttps://www.ihangzhou.net/' };
      case 'MENU_XIANXING':
        return { type: 'news', content: [{
          title: '🚗 今日杭州尾号限行',
          desc: '点击查看详情，获取今日限行尾号、限行时间、限行范围',
          picurl: 'https://www.ihangzhou.net/images/xianxing.jpg',
          url: 'https://www.ihangzhou.net/#xianxing'
        }]};
      case 'MENU_TOOLS':
        return { type: 'text', content: '🛠️ 实用工具\n\n1. 今日限行查询\n2. 杭州天气\n3. 地铁时刻表\n4. 公积金计算器\n5. 房贷计算器\n\n👉 点击进入：https://www.ihangzhou.net/#tools' };
      case 'MENU_CONTACT':
        return { type: 'text', content: '💬 联系我们\n\n📧 邮箱：biz@ihangzhou.net\n📱 微信公众号：iHangzhou\n\n如有问题或合作，请直接留言回复。' };
      default:
        return { type: 'text', content: `您点击了菜单：${EventKey}` };
    }
  }

  // 文字消息
  if (MsgType === 'text') {
    const key = Content.trim();
    // 关键词回复
    if (key === '1' || key === '限行') {
      return { type: 'news', content: [{
        title: '🚗 今日杭州尾号限行',
        desc: '点击查看今日限行详情',
        picurl: 'https://www.ihangzhou.net/images/xianxing.jpg',
        url: 'https://www.ihangzhou.net/#xianxing'
      }]};
    }
    if (key === '2' || key === '天气') {
      return { type: 'text', content: `🌤️ 杭州今日天气\n\n⏰ 数据更新时间：${new Date().toLocaleTimeString('zh-CN')}\n\n👉 查看详情：https://www.ihangzhou.net/#weather` };
    }
    if (key === '3' || key === '地铁') {
      return { type: 'text', content: '🚇 杭州地铁\n\n1号线、2号线、3号线、4号线、5号线、6号线、7号线、8号线、9号线、10号线、16号线、19号线\n\n👉 线路图/时刻表：https://www.ihangzhou.net/' };
    }
    if (key === '4' || key === '公积金') {
      return { type: 'text', content: '🏠 杭州公积金\n\n查询余额、明细、提取记录 👉 https://gjj.hangzhou.gov.cn/\n\n点击直接跳转：https://www.ihangzhou.net/' };
    }
    if (key === '5' || key === '社保') {
      return { type: 'text', content: '🏥 杭州社保\n\n查询缴费、余额、医保报销 👉 https://www.zjzwfw.gov.cn/\n\n点击直接跳转：https://www.ihangzhou.net/' };
    }
    // 默认回复
    return { type: 'text', content: `您好！感谢关注 iHangzhou 🏔️\n\n回复数字获取服务：\n1 - 今日限行\n2 - 杭州天气\n3 - 地铁线路\n4 - 公积金\n5 - 社保查询\n\n或访问我们的网站：\nhttps://www.ihangzhou.net/` };
  }

  // 其他类型消息
  return { type: 'text', content: '暂不支持此类型消息，请回复文字或数字。\n\n回复「1」限行 |「2」天气 |「3」地铁 |「4」公积金 |「5」社保' };
}

// 创建菜单
async function createMenu() {
  const token = await getAccessToken();
  if (!token) return { success: false, error: '未配置 AppID/AppSecret' };

  const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`;
  const body = {
    button: [
      { type: 'view', name: '🏠 首页', url: 'https://www.ihangzhou.net/' },
      { type: 'view', name: '🛠️ 工具', url: 'https://www.ihangzhou.net/#tools' },
      { name: '更多', sub_button: [
        { type: 'click', name: '🚗 限行', key: 'MENU_XIANXING' },
        { type: 'click', name: '💰 公积金', key: 'MENU_TOOLS' },
        { type: 'click', name: '💬 联系', key: 'MENU_CONTACT' }
      ]}
    ]
  };
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return res.json();
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // GET - URL 验证（微信配置时自动调用）
  if (req.method === 'GET') {
    const { signature, timestamp, nonce, echostr } = req.query;

    if (!signature || !timestamp || !nonce || !echostr) {
      return res.status(200).send('iHangzhou WeChat API - 参数缺失');
    }

    if (verifySignature(signature, timestamp, nonce)) {
      return res.status(200).send(echostr);  // 验证通过，返回 echostr
    }

    return res.status(200).send('签名验证失败');
  }

  // POST - 接收用户消息
  if (req.method === 'POST') {
    try {
      const xml = req.body;
      const msg = parseXML(typeof xml === 'string' ? xml : xml.toString());

      if (!msg.MsgType) {
        return res.status(200).send('success');
      }

      const reply = handleMessage(msg);
      const replyXML = generateReplyXML(msg.FromUserName, msg.ToUserName, reply.content, reply.type);
      return res.status(200).send(replyXML);
    } catch (e) {
      console.error('WeChat message error:', e);
      return res.status(200).send('success');
    }
  }

  res.status(400).send('Invalid request');
};
