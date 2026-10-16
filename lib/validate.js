/**
 * 入参校验工具
 */

export function requireFields(obj, fields) {
  const missing = fields.filter(f => !obj[f] || String(obj[f]).trim() === '');
  return missing.length ? { ok: false, missing } : { ok: true };
}

export function clampStr(str, max) {
  if (!str) return '';
  return String(str).trim().slice(0, max);
}

/** 生成 URL-safe slug（id） */
export function slugify(title, fallback) {
  if (!title) return fallback || ('a' + Date.now().toString(36));
  const s = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .slice(0, 80);
  return s || fallback || ('a' + Date.now().toString(36));
}

export function parseJSON(str) {
  try { return JSON.parse(str); } catch { return null; }
}
