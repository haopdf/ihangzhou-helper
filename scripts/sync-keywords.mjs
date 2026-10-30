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
  const storeId = process.env.BLOB_STORE_ID;
  const local = loadLocal();
  if (!token) {
    console.log(`[skip] 未检测到 BLOB_READ_WRITE_TOKEN，跳过 Blob 推送。`);
    console.log(`[info] 当前 ${local.length} 条关键字已写入 data/cms.json（线上若无 Blob 覆盖则直接生效）。`);
    console.log(`[info] 若 Vercel 已启用 Blob 覆盖，请在本地执行：`);
    console.log(`       BLOB_READ_WRITE_TOKEN=<你的token> node scripts/sync-keywords.mjs`);
    return;
  }
  // 显式传入 token/storeId，强制走 readWrite 鉴权，跳过 SDK 的 OIDC 自动检测
  // （项目开启了 OIDC 时，SDK 默认走 OIDC 分支，本地非 Vercel 环境会报
  //  "OIDC is enabled ... but not for the 'development' environment"）
  const authOpts = { token, storeId, access: 'private', useCache: false };
  // 避免残留的 VERCEL_OIDC_TOKEN 干扰鉴权分支
  delete process.env.VERCEL_OIDC_TOKEN;

  let remote = [];
  try {
    const res = await get(BLOB_KEY, authOpts);
    if (res && res.stream) {
      const reader = res.stream.getReader();
      const chunks = [];
      let done = false;
      while (!done) {
        const r = await reader.read();
        done = r.done;
        if (r.value) chunks.push(r.value);
      }
      remote = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
    }
  } catch (e) {
    console.log(`[warn] 读取线上 Blob 失败（视为空）：${e.message}`);
  }
  const merged = merge(local, remote);
  await put(BLOB_KEY, JSON.stringify(merged), {
    ...authOpts, contentType: 'application/json', allowOverwrite: true,
  });
  console.log(`[ok] 已推送 ${merged.length} 条关键字到 Blob(${BLOB_KEY})（合并前 remote=${remote.length} / local=${local.length}）。`);
}

main().catch((e) => { console.error('[error]', e.message); process.exit(1); });
