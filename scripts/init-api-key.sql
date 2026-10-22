-- ============================================================
-- iHangzhou Helper — 初始化 API Key
-- 在 Supabase Dashboard → SQL Editor 中执行本文件
-- 执行后请保存输出的 API Key（只显示一次！）
-- ============================================================

-- 1. 确保 api_keys 表存在（如已建可跳过）
CREATE TABLE IF NOT EXISTS api_keys (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key         VARCHAR(100) UNIQUE NOT NULL,
  name        VARCHAR(100) NOT NULL DEFAULT '',
  role        VARCHAR(20) NOT NULL DEFAULT 'writer'
              CHECK (role IN ('writer', 'admin')),
  rate_limit  INT NOT NULL DEFAULT 60,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. 创建初始 API Key（writer 角色，每分 120 次调用）
--    Key = ihz_ + 48位随机 hex
DO $$
DECLARE
  new_key TEXT;
BEGIN
  new_key := 'ihz_' || encode(gen_random_bytes(24), 'hex');

  INSERT INTO api_keys (key, name, role, rate_limit)
  VALUES (new_key, 'initial-publisher', 'writer', 120);

  RAISE NOTICE '===== API KEY CREATED =====';
  RAISE NOTICE 'Key:    %', new_key;
  RAISE NOTICE 'Role:   writer';
  RAISE NOTICE 'Rate:   120/min';
  RAISE NOTICE '===========================';
END;
$$;

-- 3. 验证 key 已写入
SELECT key, name, role, rate_limit, created_at
FROM api_keys
WHERE name = 'initial-publisher';

/*
 * 使用说明：
 *
 * 执行后从 NOTICE 输出中复制 API Key，然后在调用方设置：
 *
 *   Authorization: Bearer <上面输出的key>
 *
 * 如需增加 admin 角色（可审核发布）：
 *
 *   INSERT INTO api_keys (key, name, role, rate_limit)
 *   VALUES ('ihz_your_admin_key_here', 'admin', 'admin', 120);
 */
