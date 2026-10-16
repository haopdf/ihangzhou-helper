/**
 * 接口模板 — 复制此文件快速新建 API
 */
import { hasDB } from '../../lib/db.js';
import { authenticate } from '../../lib/auth.js';

export default async function handler(req) {
  // 是否需要鉴权？去掉下面两行即为公开接口
  // const auth = await authenticate(req);
  // if (!auth.ok) {
  //   return new Response(JSON.stringify({ ok: false, error: auth.error }),
  //     { status: 401, headers: { 'Content-Type': 'application/json' } });
  // }

  const url = new URL(req.url);
  const slug = url.pathname.split('/').pop();

  // implement ...

  return new Response(JSON.stringify({
    ok: true,
    data: null,
    ts: new Date().toISOString()
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
