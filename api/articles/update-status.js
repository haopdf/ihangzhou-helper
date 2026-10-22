import { hasDB, update, query } from '../../../lib/db.js';
import { authenticate } from '../../../lib/auth.js';

/**
 * POST /api/articles/update-status
 * Body: { slug, status: 'published' | 'pending' | 'archived' }
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

  // 仅 admin 可审核
  if (auth.user.role !== 'admin') {
    return new Response(JSON.stringify({ ok: false, error: 'forbidden: admin role required' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  if (!body.slug || !body.status) {
    return new Response(JSON.stringify({ ok: false, error: 'missing slug or status' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const validStatuses = ['published', 'pending', 'archived'];
  if (!validStatuses.includes(body.status)) {
    return new Response(JSON.stringify({ ok: false, error: 'invalid status: ' + body.status }),
      { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // --- Supabase mode ---
  if (hasDB) {
    try {
      const rows = await update('articles', { slug: body.slug }, { status: body.status, updated_at: new Date().toISOString() });
      if (!rows.length) {
        return new Response(JSON.stringify({ ok: false, error: 'article not found: ' + body.slug }),
          { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
      return new Response(JSON.stringify({ ok: true, data: rows[0] }),
        { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ ok: false, error: 'update failed: ' + (e.message || '') }),
        { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  // --- JSON fallback mode (local dev) ---
  try {
    const fs = await import('fs');
    const path = new URL('../../../articles/index.json', import.meta.url);
    const rows = JSON.parse(fs.readFileSync(path, 'utf8'));
    const idx = rows.findIndex(r => r.slug === body.slug);
    if (idx === -1) {
      return new Response(JSON.stringify({ ok: false, error: 'article not found: ' + body.slug }),
        { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    rows[idx].status = body.status;
    rows[idx].updated_at = new Date().toISOString();
    fs.writeFileSync(path, JSON.stringify(rows, null, 2), 'utf8');
    return new Response(JSON.stringify({ ok: true, data: rows[idx] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: 'write failed: ' + e.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
