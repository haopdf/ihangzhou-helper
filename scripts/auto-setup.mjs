#!/usr/bin/env node
/**
 * 全自动建表 - 纯 pg 直连 Supabase Postgres (port 5432, object-mode SSL)
 * node scripts/auto-setup.mjs
 */
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host:     'aws-0-ap-northeast-1.pooler.supabase.com',
  port:     5432,
  user:     'postgres.fdohmmphwiyyptwslntc',
  password: 'EhrpuJVzUEY3WwBb',
  database: 'postgres',
  ssl:      { rejectUnauthorized: false },
});

const DDL = [
  `CREATE TABLE IF NOT EXISTS articles (
     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     slug TEXT UNIQUE NOT NULL,
     title TEXT NOT NULL,
     summary TEXT, content TEXT, cat TEXT,
     word_count INTEGER DEFAULT 0,
     status TEXT DEFAULT 'published' CHECK (status IN ('published','pending','archived')),
     source TEXT,
     created_at TIMESTAMPTZ DEFAULT now(),
     updated_at TIMESTAMPTZ DEFAULT now())`,
  `CREATE INDEX IF NOT EXISTS idx_articles_slug    ON articles(slug)`,
  `CREATE INDEX IF NOT EXISTS idx_articles_cat     ON articles(cat)`,
  `CREATE INDEX IF NOT EXISTS idx_articles_status  ON articles(status)`,
  `CREATE INDEX IF NOT EXISTS idx_articles_created ON articles(created_at DESC)`,

  `CREATE TABLE IF NOT EXISTS keywords (
     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     word TEXT NOT NULL, cat TEXT, source TEXT,
     created_at TIMESTAMPTZ DEFAULT now())`,
  `CREATE INDEX IF NOT EXISTS idx_keywords_word ON keywords(word)`,
  `CREATE INDEX IF NOT EXISTS idx_keywords_cat  ON keywords(cat)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_keywords_uc ON keywords(word, cat)`,

  `CREATE TABLE IF NOT EXISTS api_keys (
     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     key TEXT UNIQUE NOT NULL, name TEXT,
     role TEXT DEFAULT 'writer' CHECK (role IN ('admin','writer','readonly')),
     rate_limit INTEGER DEFAULT 60, is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMPTZ DEFAULT now())`,
  `CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key)`,

  `ALTER TABLE IF EXISTS articles ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE IF EXISTS keywords ENABLE ROW LEVEL SECURITY`,
  `ALTER TABLE IF EXISTS api_keys  ENABLE ROW LEVEL SECURITY`,

  `DO $$ BEGIN
     CREATE POLICY articles_select_policy ON articles FOR SELECT USING (status='published');
   EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
     CREATE POLICY articles_insert_policy ON articles FOR INSERT WITH CHECK (true);
   EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
  `DO $$ BEGIN
     CREATE POLICY articles_update_policy ON articles FOR UPDATE USING (true);
   EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
];

console.log('-- auto-setup: creating tables --');
let ok = 0, skip = 0;
for (const sql of DDL) {
  try {
    await pool.query(sql);
    ok++;
    process.stdout.write('.');
  } catch (e) {
    if (e.code === '42P07' || /already exists/.test(e.message)) { skip++; process.stdout.write('s'); }
    else {
      console.log(`\n[warn] ${e.message?.slice(0,100)}`);
      process.stdout.write('x');
    }
  }
}
console.log(`\nDone: ${ok} created, ${skip} skipped`);
await pool.end();
