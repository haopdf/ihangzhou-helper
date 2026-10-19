/**
 * POST /api/setup/db
 * 一键建表（调用 Supabase exec_sql RPC，纯 SDK 操作，无需 pg 直连）
 *
 * 前提：在 Supabase Dashboard → SQL Editor 执行一次：
 *   CREATE OR REPLACE FUNCTION exec_sql(sql text)
 *   RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
 *   BEGIN EXECUTE sql; END;
 *   $$;
 *
 * curl -X POST https://www.ihangzhou.net/api/setup/db \
 *   -H "Authorization: Bearer <ADMIN_SECRET>"
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.IHZ_PUBLIC_SUPABASE_URL
  || process.env.SUPABASE_URL;
const serviceKey = process.env.IHZ_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  || process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
  const adminSecret = process.env.ADMIN_SECRET || 'ihz-admin-setup-2026';
  const auth = req.headers.authorization || '';
  if (`Bearer ${adminSecret}` !== auth) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!url || !serviceKey) {
    return res.status(500).json({ error: 'Supabase env not configured' });
  }

  const db = createClient(url, serviceKey);

  const DDL = [
    `CREATE TABLE IF NOT EXISTS articles (
      id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      slug        TEXT UNIQUE NOT NULL,
      title       TEXT NOT NULL,
      summary     TEXT,
      content     TEXT,
      cat         TEXT,
      word_count  INTEGER DEFAULT 0,
      status      TEXT DEFAULT 'published' CHECK (status IN ('published','pending','archived')),
      source      TEXT,
      created_at  TIMESTAMPTZ DEFAULT now(),
      updated_at  TIMESTAMPTZ DEFAULT now()
    )`,
    `CREATE INDEX IF NOT EXISTS idx_articles_slug    ON articles(slug)`,
    `CREATE INDEX IF NOT EXISTS idx_articles_cat     ON articles(cat)`,
    `CREATE INDEX IF NOT EXISTS idx_articles_status  ON articles(status)`,
    `CREATE INDEX IF NOT EXISTS idx_articles_created ON articles(created_at DESC)`,

    `CREATE TABLE IF NOT EXISTS keywords (
      id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      word        TEXT NOT NULL,
      cat         TEXT,
      source      TEXT,
      created_at  TIMESTAMPTZ DEFAULT now()
    )`,
    `CREATE INDEX IF NOT EXISTS idx_keywords_word ON keywords(word)`,
    `CREATE INDEX IF NOT EXISTS idx_keywords_cat  ON keywords(cat)`,
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_keywords_uc ON keywords(word, cat)`,

    `CREATE TABLE IF NOT EXISTS api_keys (
      id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      key         TEXT UNIQUE NOT NULL,
      name        TEXT,
      role        TEXT DEFAULT 'writer' CHECK (role IN ('admin','writer','readonly')),
      rate_limit  INTEGER DEFAULT 60,
      is_active   BOOLEAN DEFAULT true,
      created_at  TIMESTAMPTZ DEFAULT now()
    )`,
    `CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key)`,

    `ALTER TABLE articles ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE keywords ENABLE ROW LEVEL SECURITY`,
    `ALTER TABLE api_keys  ENABLE ROW LEVEL SECURITY`,
  ];

  const POLICIES = [
    `DO $$ BEGIN
       CREATE POLICY articles_select_policy ON articles FOR SELECT USING (status = 'published');
     EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    `DO $$ BEGIN
       CREATE POLICY articles_insert_policy ON articles FOR INSERT WITH CHECK (true);
     EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    `DO $$ BEGIN
       CREATE POLICY articles_update_policy ON articles FOR UPDATE USING (true);
     EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  ];

  try {
    // 先创建 exec_sql 函数（如果不存在）
    await db.rpc('exec_sql', {
      sql: `CREATE OR REPLACE FUNCTION exec_sql(sql text)
            RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
            BEGIN EXECUTE sql; END; $$`
    }).then(({ error }) => {
      // 42883 = function not found the first time → we need a bootstrap
      if (error && error.code !== '42883') throw error;
    });

    // 如果 exec_sql 还不存在（首次），提示用户去 SQL Editor 执行 bootstrap
    const testExec = await db.rpc('exec_sql', { sql: 'SELECT 1' });
    if (testExec.error) {
      return res.status(400).json({
        error: '需要先执行引导 SQL',
        bootstrap: `CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN EXECUTE sql; END; $$`,
        hint: '去 Supabase Dashboard → SQL Editor 粘贴上面这条执行，然后重新调用此接口'
      });
    }

    // 逐条执行 DDL
    for (const ddl of DDL) {
      const { error } = await db.rpc('exec_sql', { sql: ddl });
      if (error) throw error;
    }

    // 逐条执行策略
    for (const pol of POLICIES) {
      const { error } = await db.rpc('exec_sql', { sql: pol });
      if (error) throw error;
    }

    return res.status(200).json({
      ok: true,
      message: '建表完成（articles / keywords / api_keys + RLS）'
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
