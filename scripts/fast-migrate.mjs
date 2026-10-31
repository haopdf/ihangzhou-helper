#!/usr/bin/env node
/**
 * 快速批量迁移 — 无延迟，每批 200 条，冲突时退到逐条
 * node scripts/fast-migrate.mjs
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const url = 'https://fdohmmphwiyyptwslntc.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkb2htbXBod2l5eXB0d3NsbnRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MjEzNjA3MiwiZXhwIjoyMTA3NzEyMDcyfQ.UVSzq4WddOyEXUROc7ZBGcDBLQgLcJ5eGg4eHJ8iuCw';

const db = createClient(url, key);

// ── 文章 ──
console.log('-- migrate articles --');
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'articles', 'index.json'), 'utf8'));
console.log(`total: ${raw.length}`);

const BATCH = 200;
let totalOk = 0, totalSkip = 0, totalErr = 0;

for (let i = 0; i < raw.length; i += BATCH) {
  const batch = raw.slice(i, i + BATCH);
  const rows = batch.map(a => ({
    slug:       a.slug || a.id?.toString() || ('m' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7)),
    title:      a.title || '(untitled)',
    summary:    a.summary || a.content?.slice(0, 200) || '',
    content:    a.content || a.summary || '',
    cat:        a.cat || 'general',
    word_count: a.word_count || (a.content || '').length,
    status:     'published',
    source:     'legacy-migration',
  }));

  const { error } = await db.from('articles').insert(rows);
  if (error?.code === '23505') {
    // conflict: fallback row-by-row
    for (const row of rows) {
      const { error: e2 } = await db.from('articles').insert(row);
      if (e2?.code === '23505') totalSkip++;
      else if (e2) { totalErr++; }
      else totalOk++;
    }
  } else if (error) {
    totalErr += rows.length;
    console.error('batch err:', error.message);
  } else {
    totalOk += rows.length;
  }

  if ((i / BATCH) % 5 === 0) process.stdout.write(`  ${Math.min(i + BATCH, raw.length)}/${raw.length}\n`);
}

console.log(`\nresults: ${totalOk} inserted / ${totalSkip} skipped(dup) / ${totalErr} errors`);
console.log('-- done --');
