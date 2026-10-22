#!/usr/bin/env node
/**
 * 连接 Supabase Postgres 并执行 SQL 文件建表 + 生成初始 API Key
 * 用法: node scripts/setup-supabase.cjs
 */
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_URL = process.env.DATABASE_URL ||
  'postgres://postgres.fdohmmphwiyyptwslntc:EhrpuJVzUEY3WwBb@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres?sslmode=require';

async function run() {
  const sqlFile = path.join(__dirname, 'supabase-schema.sql');
  const initKeyFile = path.join(__dirname, 'init-api-key.sql');

  if (!fs.existsSync(sqlFile)) {
    console.error('❌ 找不到 SQL 文件:', sqlFile);
    process.exit(1);
  }

  console.log('🔗 连接 Supabase Postgres...');
  // Supabase 的 AWS 证书在 Windows 上经常自签名报.rejectUnauthorized 问题
  // 设置 Node.js 环境变量跳过 SSL 验证（仅本脚本）
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    console.log('✅ 连接成功\n');

    // 1. 建表
    console.log('📦 执行 supabase-schema.sql（建表）...');
    const schemaSQL = fs.readFileSync(sqlFile, 'utf8');
    await client.query(schemaSQL);
    console.log('✅ 表创建完成\n');

    // 2. 检查 api_keys 表是否已有 key
    const { rows: existing } = await client.query('SELECT COUNT(*)::int AS cnt FROM api_keys');
    if (existing[0].cnt > 0) {
      console.log('⚠️ api_keys 表已有 ' + existing[0].cnt + ' 条记录，跳过 key 生成');
      console.log('   查看现有 key: SELECT key, name, role FROM api_keys;');
    } else {
      console.log('🔑 生成初始 API Key...');
      const apiKey = 'ihz_' + crypto.randomBytes(24).toString('hex');
      const { rows } = await client.query(
        `INSERT INTO api_keys (key, name, role, rate_limit) VALUES ($1, 'initial-publisher', 'writer', 120) RETURNING key, name, role, created_at`,
        [apiKey]
      );
      console.log('✅ API Key 已创建');
      console.log('────────────────────────────────────────');
      console.log('Key:    ' + rows[0].key);
      console.log('Name:   ' + rows[0].name);
      console.log('Role:   ' + rows[0].role);
      console.log('Rate:   120/min');
      console.log('────────────────────────────────────────');
      console.log('⚠️ 请保存此 Key，它不会再显示！');
    }

    // 3. 验证表
    const { rows: tables } = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('articles','keywords','api_keys') ORDER BY table_name`
    );
    console.log('\n📋 已创建的表:');
    tables.forEach(t => console.log('  ✓ ' + t.table_name));

    await client.end();
    console.log('\n🎉 全部完成！');
  } catch (e) {
    console.error('❌ 执行失败:', e.message);
    if (e.message.includes('password authentication failed') || e.message.includes('does not exist')) {
      console.error('   请检查 DATABASE_URL 中的用户名、密码和数据库名');
    }
    process.exit(1);
  }
}

run();
