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

/** 客户端真实 IP（Vercel 边缘网络） */
export function getClientIp(req) {
  const xff = req.headers?.['x-forwarded-for'] || req.headers?.get?.('x-forwarded-for');
  if (xff) return String(xff).split(',')[0].trim();
  return req.headers?.['x-real-ip'] || 'unknown';
}

/**
 * 管理端密码：统一从环境变量读取，不再允许各 API 文件内置弱默认值。
 * 未配置时返回空串，所有写操作鉴权一律失败。
 */
export function getAdminPassword() {
  return process.env.CMS_ADMIN_PASSWORD || '';
}

/** 校验管理端 Bearer 密码 */
export function checkAdminAuth(req) {
  const h = (req.headers && (req.headers.authorization || req.headers.Authorization)) || '';
  const [type, token] = h.split(' ');
  return type === 'Bearer' && !!getAdminPassword() && token === getAdminPassword();
}

/** 微信公众号服务器配置 Token（签名验证用；未配置时回调校验不通过） */
export function getWechatToken() {
  return process.env.WECHAT_TOKEN || '';
}
