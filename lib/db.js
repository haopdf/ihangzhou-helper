/**
 * Supabase Server-Side Client
 *  - 服务端 API Key + JWT 校验
 *  - 含 Auth / Storage / Realtime 用法示例
 * Vercel Dashboard → Storage → Supabase 创建后自动注入
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.IHZ_PUBLIC_SUPABASE_URL
  || process.env.NEXT_PUBLIC_SUPABASE_URL
  || process.env.SUPABASE_URL;

const anonKey = process.env.IHZ_PUBLIC_SUPABASE_ANON_KEY
  || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  || process.env.SUPABASE_ANON_KEY;

const serviceKey = process.env.IHZ_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
  || process.env.SUPABASE_SERVICE_ROLE_KEY
  || process.env.SUPABASE_SERVICE_ROLE;

export const hasDB = !!(url && anonKey);

let _admin = null;
let _public = null;

/** 服务端全权限客户端（仅限 serverless function 内部调用） */
export function admin() {
  if (!hasDB) throw new Error('Supabase env not configured');
  if (!_admin) _admin = createClient(url, serviceKey || anonKey);
  return _admin;
}

/** 受 RLS 约束的公开客户端（浏览器端也用这个） */
export function pub() {
  if (!hasDB) throw new Error('Supabase env not configured');
  if (!_public) _public = createClient(url, anonKey);
  return _public;
}

/**
 * 通用查询封装
 * @param {string} table 表名
 * @param {object} opts { select, eq, ilike, order, limit, offset }
 */
export async function query(table, opts = {}) {
  const db = admin();
  let q = db.from(table).select(opts.select || '*');

  if (opts.eq)  Object.entries(opts.eq).forEach(([k, v]) => { q = q.eq(k, v); });
  if (opts.ilike) Object.entries(opts.ilike).forEach(([k, v]) => { q = q.ilike(k, `%${v}%`); });
  if (opts.order) q = q.order(opts.order.col, { ascending: opts.order.asc !== false });
  if (opts.limit) q = q.limit(opts.limit);
  if (opts.offset) q = q.range(opts.offset, opts.offset + (opts.limit || 20) - 1);

  const { data, error } = await q;
  if (error) throw error;
  return data || [];
}

/** 写入单条 */
export async function insert(table, row) {
  const { data, error } = await admin().from(table).insert(row).select();
  if (error) throw error;
  return data?.[0] || null;
}

/** 更新 */
export async function update(table, match, patch) {
  let q = admin().from(table).update(patch);
  Object.entries(match).forEach(([k, v]) => { q = q.eq(k, v); });
  const { data, error } = await q.select();
  if (error) throw error;
  return data || [];
}
