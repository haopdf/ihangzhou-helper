import { hasDB, insert } from '../../lib/db.js';
import { authenticate } from '../../lib/auth.js';
import { requireFields, clampStr } from '../../lib/validate.js';

/**
 * POST /api/keywords/add
 * Body: { word, cat?, source? }
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

  const chk = requireFields(body, ['word']);
  if (!chk.ok) {
    return new Response(JSON.stringify({ ok: false, error: 'missing fields: ' + chk.missing.join(',') }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const word   = clampStr(body.word, 100);
  const cat    = clampStr(body.cat || '通用', 100);
  const source = clampStr(body.source || '', 100);

  // --- Supabase mode ---
  if (hasDB) {
    try {
      const row = await insert('keywords', { word, cat, source });
      return new Response(JSON.stringify({ ok: true, data: row }),
        { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      const msg = e.message || '';
      if (msg.includes('unique') || msg.includes('23505')) {
        return new Response(JSON.stringify({ ok: false, error: 'keyword already exists: ' + word }),
          { status: 409, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({ ok: false, error: 'insert failed: ' + msg }),
        { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  // --- JSON fallback mode (local dev) ---
  try {
    const fs = await import('fs');
    const path = new URL('../../data/keywords.json', import.meta.url);
    let rows = [];
    try {
      rows = JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch { rows = []; }

    if (rows.find(r => r.word === word && (r.cat || '通用') === cat)) {
      return new Response(JSON.stringify({ ok: false, error: 'keyword already exists: ' + word }),
        { status: 409, headers: { 'Content-Type': 'application/json' } });
    }

    const row = {
      id: rows.length + 1, word, cat, source,
      created_at: new Date().toISOString(),
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
