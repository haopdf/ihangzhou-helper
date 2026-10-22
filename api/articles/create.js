import { hasDB, insert } from '../../../lib/db.js';
import { authenticate } from '../../../lib/auth.js';
import { requireFields, clampStr, slugify } from '../../../lib/validate.js';

/**
 * POST /api/articles/create
 * Body: { title, summary?, content, cat?, source?, slug? }
 */
export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  const auth = await authenticate(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ ok: false, error: auth.error }),
      { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const chk = requireFields(body, ['title']);
  if (!chk.ok) {
    return new Response(JSON.stringify({ ok: false, error: 'missing fields: ' + chk.missing.join(',') }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const title   = clampStr(body.title, 200);
  const summary = clampStr(body.summary || (body.content || '').replace(/[#*_~`>-]/g, '').slice(0, 200), 500);
  const content = clampStr(body.content || '', 50000);
  const cat     = clampStr(body.cat || '未分类', 100);
  const source  = clampStr(body.source || '', 100);
  const slug    = body.slug ? clampStr(body.slug, 80) : slugify(title);

  // --- Supabase mode ---
  if (hasDB) {
    try {
      const row = await insert('articles', {
        slug, title, summary, content, cat, source,
        word_count: content.length,
        status: 'pending',
      });
      return new Response(JSON.stringify({ ok: true, data: row }),
        { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      const msg = e.message || '';
      if (msg.includes('unique') || msg.includes('23505')) {
        return new Response(JSON.stringify({ ok: false, error: 'slug already exists: ' + slug }),
          { status: 409, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({ ok: false, error: 'insert failed: ' + msg }),
        { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  // --- JSON fallback mode (local dev) ---
  try {
    const fs = await import('fs');
    const path = new URL('../../../articles/index.json', import.meta.url);
    let rows = [];
    try {
      rows = JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch { rows = []; }

    if (rows.find(r => r.slug === slug)) {
      return new Response(JSON.stringify({ ok: false, error: 'slug already exists: ' + slug }),
        { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    const row = {
      slug, title, summary, content, cat,
      words: content.length, status: 'pending', source,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    rows.unshift(row);
    fs.writeFileSync(path, JSON.stringify(rows, null, 2), 'utf8');

    return new Response(JSON.stringify({ ok: true, data: row }),
      { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'write failed: ' + e.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
