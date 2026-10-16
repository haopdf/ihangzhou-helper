import { hasDB, query } from '../../../lib/db.js';

/**
 * GET /api/keywords?cat=xxx&q=xxx
 */
export default async function handler(req) {
  const url  = new URL(req.url);
  const cat  = url.searchParams.get('cat') || '';
  const q    = url.searchParams.get('q')   || '';

  if (hasDB) {
    const match = {};
    if (cat) match.cat = cat;
    if (q)   match.word = q;
    const ilike = q ? { word: q } : undefined;
    const rows  = await query('keywords', {
      select: 'id,word,cat,source,created_at',
      eq: Object.keys(match).length ? match : undefined,
      ilike,
      order: { col: 'created_at', asc: false },
      limit: 500
    });
    return new Response(JSON.stringify({ ok: true, data: rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // JSON fallback — load keywords from data/
  try {
    const fs = await import('fs');
    const p = new URL('../../../data/keywords.json', import.meta.url);
    let rows = [];
    try { rows = JSON.parse(fs.readFileSync(p, 'utf8')); } catch {}
    if (cat) rows = rows.filter(k => k.cat === cat);
    if (q)   rows = rows.filter(k => (k.word || '').includes(q));
    return new Response(JSON.stringify({ ok: true, data: rows }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
