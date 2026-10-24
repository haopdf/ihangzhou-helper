import { hasDB, insert, query } from '../../lib/db.js';
import { authenticate } from '../../lib/auth.js';
import { requireFields, clampStr } from '../../lib/validate.js';

/**
 * POST /api/keywords/add
 * Body: { word, cat, source }
 */
export default async function handler(req) {
  const auth = await authenticate(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ ok: false, error: auth.error }),
      { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  let body;
  try { body = await req.json(); } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const check = requireFields(body, ['word']);
  if (!check.ok) {
    return new Response(JSON.stringify({ ok: false, error: 'missing fields', fields: check.missing }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const word   = clampStr(body.word, 100);
  const cat    = clampStr(body.cat || '未分类', 100);
  const source = clampStr(body.source || auth.user?.name || 'api', 100);

  if (hasDB) {
    const dup = await query('keywords', { eq: { word, cat }, limit: 1 });
    if (dup.length) {
      return new Response(JSON.stringify({ ok: false, error: 'keyword exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } });
    }
    const row = await insert('keywords', { word, cat, source });
    return new Response(JSON.stringify({ ok: true, data: row }),
      { status: 201, headers: { 'Content-Type': 'application/json' } });
  }

  // JSON fallback
  const fs = await import('fs');
  const p = new URL('../../../data/keywords.json', import.meta.url);
  let rows = [];
  try { rows = JSON.parse(fs.readFileSync(p, 'utf8')); } catch {}
  if (rows.find(k => k.word === word && k.cat === cat)) {
    return new Response(JSON.stringify({ ok: false, error: 'keyword exists' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } });
  }
  const newKw = { id: rows.length + 1, word, cat, source, created_at: new Date().toISOString() };
  rows.push(newKw);
  fs.writeFileSync(p, JSON.stringify(rows, null, 2));

  return new Response(JSON.stringify({ ok: true, data: newKw }),
    { status: 201, headers: { 'Content-Type': 'application/json' } });
}
