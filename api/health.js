import { hasDB } from '../lib/db.js';

/**
 * GET /api/health
 * Health check: reports whether DB env is connected.
 */
export default async function handler(req, res) {
  const resp = {
    ok: true,
    mode: hasDB ? 'supabase' : 'json-fallback',
    ts: new Date().toISOString(),
    domain: 'www.ihangzhou.net',
    endpoints: [
      'GET  /api/health',
      'GET  /api/articles                 (列表)',
      'GET  /api/articles?slug=xxx        (读全文)',
      'POST /api/articles  (Auth)         action=check|reserve|发布',
      'DELETE /api/articles?slug=xxx (Auth)',
      'POST /api/wechat?action=upsertKeyword|deleteKeyword|setKeywords|listKeywords (Auth)',
      'GET  /p/<slug>                     (SEO 阅读页)',
    ]
  };

  return res.status(200).json(resp);
}
