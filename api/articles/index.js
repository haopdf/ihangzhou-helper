import { hasDB, query } from '../../../lib/db.js';

/**
 * GET /api/articles?q=xxx&cat=xxx&page=1&limit=20&status=published
 */
export default async function handler(req) {
  const url = new URL(req.url);
  const q      = url.searchParams.get('q')      || '';
  const cat    = url.searchParams.get('cat')    || '';
  const page   = Math.max(1, parseInt(url.searchParams.get('page')  || '1'));
  const limit  = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') || '20')));
  const status = url.searchParams.get('status') || 'published';
  const offset = (page - 1) * limit;

  // --- Supabase mode ---
  if (hasDB) {
    const match = { status };
    if (cat) match.cat = cat;

    let dbQuery = 'id,slug,title,summary,cat,word_count,status,source,created_at,updated_at';
    let opt = { select: dbQuery, eq: match, order: { col: 'created_at', asc: false }, limit, offset };

    // If search query provided, use fulltext
    if (q) {
      // Use ilike for simple contains; for production switch to full-text index
      opt.ilike = { title: q };
      // Could do: .textSearch('title_summary_tsv', q, { config: 'chinese' })
    }

    const rows = await query('articles', opt);

    return new Response(JSON.stringify({
      ok: true,
      data: rows,
      page, limit,
      total: rows.length, // In production: SELECT count(*) first
      mode: 'supabase'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // --- JSON fallback mode ---
  try {
    const fs = await import('fs');
    const p = new URL('../../../articles/index.json', import.meta.url);
    const raw = fs.readFileSync(p, 'utf8');
    let rows = JSON.parse(raw);

    if (status) rows = rows.filter(a => (a.status || 'published') === status);
    if (cat)   rows = rows.filter(a => a.cat === cat);
    if (q) {
      const lq = q.toLowerCase();
      rows = rows.filter(a =>
        (a.title   || '').toLowerCase().includes(lq) ||
        (a.summary || '').toLowerCase().includes(lq) ||
        (a.cat     || '').toLowerCase().includes(lq)
      );
    }

    const total = rows.length;
    const paged = rows.slice(offset, offset + limit);

    return new Response(JSON.stringify({
      ok: true,
      data: paged,
      page, limit, total,
      mode: 'json-fallback'
    }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({
      ok: false, error: 'load failed: ' + e.message
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
