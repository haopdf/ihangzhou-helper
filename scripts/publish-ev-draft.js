#!/usr/bin/env node
/**
 * 发布电车文章到公众号草稿箱
 * 用法：node scripts/publish-ev-draft.js [封面图路径]
 */

const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

const APPID = process.env.WX_APPID || 'wx4d763a475a1af88b';
const SECRET = process.env.WX_SECRET || '3e832834b3ca19b0eacb2d671dd63c9e';
const CONTENT_FILE = path.join(__dirname, 'ev-article-content.html');
const DEFAULT_COVER = path.join(__dirname, 'ev-cover-cropped.png');
const COVER_PATH = process.argv[2] || DEFAULT_COVER;

const TITLE = '我开了3年电车，终于敢说真话：电车到底是真香，还是被割了韭菜？';
const DIGEST = '绿牌不限行、充电免费、电费比油费省……可这三年的坑，没人提前告诉你。';
const AUTHOR = 'iHangzhou';

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('parse: ' + data.slice(0, 300))); }
      });
    }).on('error', reject);
  });
}

function postJSON(url, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('parse: ' + data.slice(0, 300))); }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

async function getAccessToken() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`;
  const res = await get(url);
  if (res.errcode) throw new Error(`token error ${res.errcode}: ${res.errmsg}`);
  return res.access_token;
}

function uploadMaterial(token, filepath) {
  return new Promise((resolve, reject) => {
    const boundary = '----iHZ' + crypto.randomBytes(8).toString('hex');
    const file = fs.readFileSync(filepath);
    const filename = path.basename(filepath);
    const head = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="media"; filename="${filename}"\r\nContent-Type: image/png\r\n\r\n`);
    const tail = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([head, file, tail]);
    const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${token}&type=image`;
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error('parse: ' + data.slice(0, 300))); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('1. 获取 access_token...');
  const token = await getAccessToken();
  console.log('✅ token 获取成功\n');

  console.log('2. 上传封面图作为永久素材...');
  const mat = await uploadMaterial(token, COVER_PATH);
  if (mat.errcode) throw new Error(`素材上传失败 ${mat.errcode}: ${mat.errmsg}`);
  const thumbMediaId = mat.media_id;
  console.log(`✅ 封面素材 media_id: ${thumbMediaId}\n`);

  console.log('3. 读取正文 HTML...');
  const content = fs.readFileSync(CONTENT_FILE, 'utf8');
  console.log(`   正文约 ${content.length} 字符\n`);

  console.log('4. 调用 draft/add 推送草稿...');
  const payload = {
    articles: [{
      title: TITLE,
      author: AUTHOR,
      digest: DIGEST,
      content: content,
      content_source_url: '',
      thumb_media_id: thumbMediaId,
      need_open_comment: 1,
      only_fans_can_comment: 0,
      pic_crop_235_1: '0_0_1_1',
      pic_crop_1_1: '0_0_1_1'
    }]
  };
  const res = await postJSON(`https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${token}`, payload);
  if (res.errcode) throw new Error(`draft/add 失败 ${res.errcode}: ${res.errmsg}`);
  console.log('✅ 草稿发布成功');
  console.log(`   media_id: ${res.media_id}`);
}

main().catch(e => {
  console.error('\n❌ ' + e.message);
  process.exit(1);
});
