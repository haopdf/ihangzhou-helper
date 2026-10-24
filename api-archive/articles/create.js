import { hasDB, insert, query } from '../../lib/db.js';
import { authenticate } from '../../lib/auth.js';
import { requireFields, clampStr, slugify } from '../../lib/validate.js';

/**
 * POST /api/articles/create
 * Body: { title, content, summary, cat, source }
 * Header: Authorization: Bearer <api_key>
 * Returns: { ok, data: { slug } } or { ok:false, error }
 */
export default async function handler(req) {
  // --- Auth ---
  const auth = await authenticate(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ ok: false, error: auth.error }),
      { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  // --- Method check ---
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  // --- Parse body ---
  let body;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // --- Validate ---
  const check = requireFields(body, ['title', 'content', 'cat']);
  if (!check.ok) {
    return new Response(JSON.stringify({ ok: false, error: 'missing fields', fields: check.missing }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const title   = clampStr(body.title,   200);
  const content = clampStr(body.content, 50000);
  const summary = body.summary ? clampStr(body.summary, 500) : content.slice(0, 200);
  const cat     = clampStr(body.cat,     100);
  const source  = clampStr(body.source || auth.user?.name || 'api', 100);
  const slug    = body.slug ? clampStr(body.slug, 80) : slugify(title);

  // --- Duplicate check ---
  if (hasDB) {
    const existing = await query('articles', { eq: { slug }, limit: 1 });
    if (existing.length) {
      return new Response(JSON.stringify({ ok: false, error: 'slug exists', slug }),
        { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    const row = await insert('articles', {
      slug, title, content, summary, cat, source,
      status: 'pending',              // default pending review
      word_count: content.length
    });

    return new Response(JSON.stringify({ ok: true, data: row }),
      { status: 201, headers: { 'Content-Type': 'application/json' } });
  }

  // --- JSON fallback: write to articles/index.json ---
  const fs = await import('fs');
  const path = new URL('../../../articles/index.json', import.meta.url);
  let arr = [];
  try { arr = JSON.parse(fs.readFileSync(path, 'utf8')); } catch {}

  if (arr.find(a => a.slug === slug)) {
    return new Response(JSON.stringify({ ok: false, error: 'slug exists', slug }),
      { status: 409, headers: { 'Content-Type': 'application/json' } });
  }

  const newArticle = {
    slug, title, summary, cat,
    content,
    source,
    status: 'pending',
    word_count: content.length,
    created_at: new Date().toISOString()
  };

  arr.unshift(newArticle);
  fs.writeFileSync(path, JSON.stringify(arr, null, 2));

  return new Response(JSON.stringify({ ok: true, data: newArticle }),
    { status: 201, headers: { 'Content-Type': 'application/json' } });
}
