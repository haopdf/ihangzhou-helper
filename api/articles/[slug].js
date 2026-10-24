import { hasDB, query } from '../../lib/db.js';

/**
 * GET /api/articles/:slug
 */
export default async function handler(req, { params }) {
  const { slug } = params;

  if (hasDB) {
    const rows = await query('articles', { eq: { slug }, limit: 1 });
    if (!rows.length) {
      return new Response(JSON.stringify({ ok: false, error: 'not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ ok: true, data: rows[0] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // JSON fallback
  try {
    const fs = await import('fs');
    const p = new URL('../../../articles/index.json', import.meta.url);
    const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    const found = arr.find(a => a.slug === slug);
    if (!found) {
      return new Response(JSON.stringify({ ok: false, error: 'not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ ok: true, data: found }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
