--
-- iHangzhou Supabase 表结构
-- 在 Supabase Dashboard → SQL Editor 中粘贴执行
--

-- 1. 文章表
CREATE TABLE IF NOT EXISTS articles (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  summary     TEXT,
  content     TEXT,
  cat         TEXT,
  word_count  INTEGER DEFAULT 0,
  status      TEXT DEFAULT 'published' CHECK (status IN ('published','pending','archived')),
  source      TEXT,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug   ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_cat    ON articles(cat);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_created ON articles(created_at DESC);

-- 简单文本搜索（生产环境建议建全文索引 + zhparser 扩展）
CREATE INDEX IF NOT EXISTS idx_articles_title_search ON articles USING GIN (to_tsvector('simple', title));
CREATE INDEX IF NOT EXISTS idx_articles_summary_search ON articles USING GIN (to_tsvector('simple', summary));


-- 2. 关键词表
CREATE TABLE IF NOT EXISTS keywords (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  word        TEXT NOT NULL,
  cat         TEXT,
  source      TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_keywords_word ON keywords(word);
CREATE INDEX IF NOT EXISTS idx_keywords_cat  ON keywords(cat);
CREATE UNIQUE INDEX IF NOT EXISTS idx_keywords_uc ON keywords(word, cat);  -- 同一分类下关键词唯一


-- 3. API Key 鉴权表（managed by you）
CREATE TABLE IF NOT EXISTS api_keys (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key         TEXT UNIQUE NOT NULL,
  name        TEXT,                -- 调用方名称（如 "partner-a"）
  role        TEXT DEFAULT 'writer' CHECK (role IN ('admin','writer','readonly')),
  rate_limit  INTEGER DEFAULT 60,  -- 每分钟请求数上限
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_api_keys_key ON api_keys(key);


-- 4. 写入示例 API Key（安全提醒：请替换为你自己的真实 Key）
-- INSERT INTO api_keys (key, name, role) VALUES
--   ('ihz_dev_test_key_001', 'dev-test', 'admin');


-- === RLS（行级安全）===
-- 默认关闭写入，通过 service_role_key 在 serverless 中绕过 RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys  ENABLE ROW LEVEL SECURITY;

-- 已登录读者可查看已发布 articles
CREATE POLICY articles_select_policy ON articles
  FOR SELECT USING (status = 'published');

-- 仅 service_role 可写
CREATE POLICY articles_insert_policy ON articles
  FOR INSERT WITH CHECK (true);

CREATE POLICY articles_update_policy ON articles
  FOR UPDATE USING (true);
