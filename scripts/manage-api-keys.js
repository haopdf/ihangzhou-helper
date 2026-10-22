#!/usr/bin/env node
/**
 * API Key 管理工具
 * 
 * 用法:
 *   node scripts/manage-api-keys.js list            — 列出所有 key
 *   node scripts/manage-api-keys.js add <name> <role> [rate_limit]  — 新增 key
 *   node scripts/manage-api-keys.js revoke <key>   — 停用 key
 *   node scripts/manage-api-keys.js delete <key>    — 删除 key
 * 
 * 在 Supabase 中执行时设置环境变量:
 *   IHZ_PUBLIC_SUPABASE_URL=...
 *   IHZ_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=...
 */

const { hasDB, admin } = require('../lib/db.js');

// 适配 serverless ESM → CJS
async function main() {
  const [, , cmd, ...args] = process.argv;

  if (!hasDB) {
    console.error('错误: 缺少 Supabase 环境变量。请设置 IHZ_PUBLIC_SUPABASE_URL 和 IHZ_PUBLIC_SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const db = admin();

  switch (cmd) {
    case 'list': {
      const { data, error } = await db.from('api_keys').select('*').order('created_at', { ascending: false });
      if (error) { console.error('查询失败:', error.message); process.exit(1); }
      console.table(data);
      break;
    }

    case 'add': {
      const [name, role = 'writer', rateLimit = '60'] = args;
      if (!name) { console.error('用法: node manage-api-keys.js add <name> <role> [rate_limit]'); process.exit(1); }
      const key = 'ihz_' + require('crypto').randomBytes(24).toString('hex');
      const { data, error } = await db.from('api_keys').insert({
        key, name, role, rate_limit: parseInt(rateLimit),
      }).select().single();
      if (error) { console.error('创建失败:', error.message); process.exit(1); }
      console.log('✅ 创建成功！请保存此 key（只显示一次）：');
      console.log(JSON.stringify(data, null, 2));
      break;
    }

    case 'revoke': {
      const [key] = args;
      if (!key) { console.error('用法: node manage-api-keys.js revoke <key>'); process.exit(1); }
      const { data, error } = await db.from('api_keys').update({ is_active: false }).eq('key', key).select().single();
      if (error) { console.error('操作失败:', error.message); process.exit(1); }
      console.log('✅ 已停用:', key);
      break;
    }

    case 'delete': {
      const [key] = args;
      if (!key) { console.error('用法: node manage-api-keys.js delete <key>'); process.exit(1); }
      const { error } = await db.from('api_keys').delete().eq('key', key);
      if (error) { console.error('删除失败:', error.message); process.exit(1); }
      console.log('✅ 已删除:', key);
      break;
    }

    default:
      console.log('API Key 管理脚本');
      console.log('命令: list | add <name> <role> [rate_limit] | revoke <key> | delete <key>');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
