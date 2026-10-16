import { hasDB } from '../../lib/db.js';

/**
 * GET /api/health
 * Health check: reports whether DB env is connected.
 */
export default async function handler() {
  const resp = {
    ok: true,
    mode: hasDB ? 'supabase' : 'json-fallback',
    ts: new Date().toISOString(),
    domain: 'www.ihangzhou.net',
    endpoints: [
      'GET  /api/health',
      'GET  /api/articles?q=keyword&cat=xxx&page=1',
      'POST /api/articles/create  (Auth)',
      'GET  /api/articles/:slug',
      'GET  /api/keywords?cat=xxx&q=xxx',
      'POST /api/keywords/add    (Auth)',
    ]
  };

  return new Response(JSON.stringify(resp),
    { status: 200, headers: { 'Content-Type': 'application/json' } });
}
