/**
 * API Key 鉴权中间件
 *   - 在 Supabase public.api_keys 表里维护有效的 key
 *   - 调用方: Authorization: Bearer <api_key>
 *   - 返回 { ok, user } 或 { ok:false, error }
 */
import { admin } from './db.js';

export async function authenticate(req) {
  const header = req.headers.get('Authorization') || '';
  const match = header.match(/^Bearer\s+(\S+)$/i);
  if (!match) return { ok: false, error: 'missing bearer token' };

  const key = match[1];

  try {
    const { data, error } = await admin()
      .from('api_keys')
      .select('id,name,role,rate_limit')
      .eq('key', key)
      .eq('is_active', true)
      .single();

    if (error || !data) return { ok: false, error: 'invalid key' };
    return { ok: true, user: data };
  } catch (e) {
    return { ok: false, error: 'auth failed: ' + e.message };
  }
}

/** 简易 IP 限流（内存级，Vercel 每次冷启动单独计数） */
const _hits = new Map();
export function rateLimit(ip, limit = 60) {
  const now = Math.floor(Date.now() / 60000);
  const k = `${ip}:${now}`;
  const n = (_hits.get(k) || 0) + 1;
  _hits.set(k, n);
  return n <= limit;
}
