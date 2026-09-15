// ============================================
// 同步关键词到 Vercel Blob
//
// 使用方式：
//   cd ~/PycharmProjects/ihangzhou-helper
//   BLOB_READ_WRITE_TOKEN=你的token node scripts/sync-keywords-to-blob.js
//
// 作用：
//   - 读取 data/cms.json 里的 wechatKeywords
//   - 同步到 Vercel Blob 的 wechat-keywords.json
//   - api/wechat.js 优先从 Blob 读取，所以必须同步
// ============================================

const fs = require('fs');
const path = require('path');
const { put } = require('@vercel/blob');

const ROOT = path.resolve(__dirname, '..');
const CMS_JSON = path.join(ROOT, 'data', 'cms.json');
const KW_BLOB_KEY = 'wechat-keywords.json';

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error('[sync] 错误：未设置 BLOB_READ_WRITE_TOKEN 环境变量');
    console.error('[sync] 使用方式：BLOB_READ_WRITE_TOKEN=你的token node scripts/sync-keywords-to-blob.js');
    process.exit(1);
  }

  console.log('[sync] 读取 data/cms.json ...');
  if (!fs.existsSync(CMS_JSON)) {
    console.error('[sync] 错误：找不到 data/cms.json');
    process.exit(1);
  }

  const cms = JSON.parse(fs.readFileSync(CMS_JSON, 'utf8'));
  const keywords = cms.wechatKeywords || [];
  console.log('[sync] 关键词数量：' + keywords.length);
  console.log('[sync] 关键词列表：');
  keywords.forEach((kw, i) => {
    console.log('  ' + (i + 1) + '. ' + kw.keyword + ' (' + kw.type + ') - ' + (kw.aliases || []).join(', '));
  });

  console.log('\n[sync] 同步到 Vercel Blob ...');
  try {
    const blob = await put(KW_BLOB_KEY, JSON.stringify(keywords, null, 2), {
      contentType: 'application/json',
      access: 'private',
      allowOverwrite: true
    });
    console.log('[sync] 同步成功！');
    console.log('[sync] Blob URL: ' + blob.url);
    console.log('[sync] 完成 ✓');
  } catch (e) {
    console.error('[sync] 同步失败：' + e.message);
    process.exit(1);
  }
}

main();
