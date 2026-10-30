// 将 data/cms.json 的 wechatKeywords 同步到 Vercel Blob（wechat-keywords.json）
// 线上 wechat.js 在有 BLOB_READ_WRITE_TOKEN 时优先读 Blob，否则回退 cms.json。
// 用法：
//   node scripts/sync-keywords.mjs            # 合并推送（cms 与 Blob 按 keyword 取并集，cms 冲突优先）
// 需环境变量 BLOB_READ_WRITE_TOKEN（Vercel 已配则本地用 `token=xxx node ...`）
import { readFileSync, writeFileSync } from 'node:fs';
import { put, get } from '@vercel/blob';

const BLOB_KEY = 'wechat-keywords.json';

function loadLocal() {
  const cms = JSON.parse(readFileSync(new URL('../data/cms.json', import.meta.url), 'utf-8'));
  return Array.isArray(cms.wechatKeywords) ? cms.wechatKeywords : [];
}

// 按 keyword 合并：local 优先覆盖同 keyword 的 blob 条目，其余 blob 条目保留
function merge(local, remote) {
  const map = new Map();
  for (const k of remote) if (k.keyword) map.set(k.keyword, k);
  for (const k of local) if (k.keyword) map.set(k.keyword, k);
  return [...map.values()];
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const local = loadLocal();
  if (!token) {
    console.log(`[skip] 未检测到 BLOB_READ_WRITE_TOKEN，跳过 Blob 推送。`);
    console.log(`[info] 当前 ${local.length} 条关键字已写入 data/cms.json（线上若无 Blob 覆盖则直接生效）。`);
    console.log(`[info] 若 Vercel 已启用 Blob 覆盖，请在本地执行：`);
    console.log(`       BLOB_READ_WRITE_TOKEN=<你的token> node scripts/sync-keywords.mjs`);
    return;
  }
  let remote = [];
  try {
    const res = await get(BLOB_KEY, { access: 'private', useCache: false });
    if (res) {
      const buf = Buffer.from(await res.arrayBuffer());
      remote = JSON.parse(buf.toString('utf-8'));
    }
  } catch (e) {
    console.log(`[warn] 读取线上 Blob 失败（视为空）：${e.message}`);
  }
  const merged = merge(local, remote);
  await put(BLOB_KEY, JSON.stringify(merged), {
    contentType: 'application/json', access: 'private', allowOverwrite: true,
  });
  console.log(`[ok] 已推送 ${merged.length} 条关键字到 Blob(${BLOB_KEY})（合并前 remote=${remote.length} / local=${local.length}）。`);
}

main().catch((e) => { console.error('[error]', e.message); process.exit(1); });
