import { hasDB, query } from '../../lib/db.js';

/**
 * GET /api/articles/:slug
 */
export default async function handler(req, res) {
  // Node runtime（Express 风格）：从 URL 路径末段取 slug
  const slug = decodeURIComponent(req.url.split('?')[0].replace(/\/+$/, '').split('/').pop());

  if (hasDB) {
    const rows = await query('articles', { eq: { slug }, limit: 1 });
    if (!rows.length) {
      return res.status(404).json({ ok: false, error: 'not found' });
    }
    return res.status(200).json({ ok: true, data: rows[0] });
  }

  // JSON fallback
  try {
    const fs = await import('fs');
    const p = new URL('../../articles/index.json', import.meta.url);
    const arr = JSON.parse(fs.readFileSync(p, 'utf8'));
    const found = arr.find(a => a.slug === slug);
    if (!found) {
      return res.status(404).json({ ok: false, error: 'not found' });
    }
    return res.status(200).json({ ok: true, data: found });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}
