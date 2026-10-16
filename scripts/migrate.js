/**
 * 数据迁移：现有 Supabase articles / keywords → DB
 * 使用方法：
 *   1. Vercel Dashboard → Storage → Supabase 创建实例，获取 env
 *   2. 在本项目 .env.local 填入 SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY
 *   3. node scripts/migrate.js
 *
 * 幂等设计：重复运行不会插入重复数据（利用 UNIQUE 约束）
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;

if (!url || !key) {
  console.error('错误：需要环境变量 SUPABASE_URL 和 SUPABASE_SERVICE_ROLE_KEY');
  console.error('请先在 .env.local 中配置，或在 Vercel Dashboard 中创建 Supabase 集成');
  process.exit(1);
}

const db = createClient(url, key);

let migrated = 0;
let skipped  = 0;
let errors  = 0;

async function migrateArticles() {
  console.log('\n── 迁移文章 ──');
  const indexPath = path.join(ROOT, 'articles', 'index.json');

  if (!fs.existsSync(indexPath)) {
    console.log('  articles/index.json 不存在，跳过');
    return;
  }

  const raw = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  console.log(`  共 ${raw.length} 篇文章`);

  for (const a of raw) {
    const slug = a.slug || a.id || ('a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
    const title = a.title || '(无标题)';
    const { data: existing } = await db.from('articles').select('slug').eq('slug', slug).limit(1);

    if (existing?.length) {
      skipped++;
      continue;
    }

    const { error } = await db.from('articles').insert({
      slug,
      title,
      summary: a.summary || a.content?.slice(0, 200) || '',
      content: a.content || a.summary || '',
      cat: a.cat || '未分类',
      word_count: a.word_count || (a.content || '').length,
      status: 'published',
      source: 'legacy-migration',
    });

    if (error) {
      errors++;
      console.error(`  ✗ ${slug}: ${error.message}`);
    } else {
      migrated++;
      if (migrated % 50 === 0) console.log(`  已迁移 ${migrated}...`);
    }
  }

  console.log(`  ✓ 迁移 ${migrated} 篇 / 跳过 ${skipped} 已存在 / 失败 ${errors}`);
}

async function migrateKeywords() {
  console.log('\n── 迁移关键词 ──');
  const kwPath = path.join(ROOT, 'data', 'keywords.json');

  if (!fs.existsSync(kwPath)) {
    console.log('  data/keywords.json 不存在，跳过');
    return;
  }

  const raw = JSON.parse(fs.readFileSync(kwPath, 'utf8'));
  console.log(`  共 ${raw.length} 个关键词`);

  let m = 0, s = 0, e = 0;
  for (const k of raw) {
    const word = k.word || k.name || k.id;
    if (!word) continue;

    const { error } = await db.from('keywords').insert({
      word,
      cat: k.cat || '未分类',
      source: 'legacy-migration',
    });

    if (error?.code === '23505') { s++; continue; }  // unique violation → skip
    if (error) { e++; console.error(`  ✗ ${word}: ${error.message}`); }
    else m++;
  }

  console.log(`  ✓ 迁移 ${m} 个 / 跳过 ${s} 已存在 / 失败 ${e}`);
}

async function main() {
  console.log('── iHangzhou 数据迁移到 Supabase ──');
  console.log(`  目标: ${url}`);

  await migrateArticles();
  await migrateKeywords();

  console.log('\n── 完成 ──');
  console.log(`  总迁移: ${migrated} 篇文章`);
  console.log(`  下一步: 在 Vercel Dashboard 集成 Supabase → git push → API 自动生效`);
}

main().catch(err => {
  console.error('迁移失败:', err);
  process.exit(1);
});
