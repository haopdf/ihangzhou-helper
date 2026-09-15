#!/usr/bin/env node
/**
 * GitHub Actions 专用：通过部署在 Vercel 的 /api/wechat-cron 中转拉取公众号草稿选题
 *
 * 为什么走中转：GitHub Actions 出口 IP 动态变化，无法加入公众号 IP 白名单；
 * 而 Vercel 服务器 IP 固定且已在白名单中。本脚本只负责取结果并落盘提交。
 *
 * 环境变量（配置在 GitHub Secrets）：
 *   CRON_SECRET  - 与 Vercel 环境变量 CRON_SECRET 一致，用于鉴权
 *   SITE_URL     - 站点地址，默认 https://www.ihangzhou.net
 *
 * 输出：articles/topics.json（选题列表，仅标题+摘要，不含全文）
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = (process.env.SITE_URL || 'https://www.ihangzhou.net').replace(/\/$/, '');
const CRON_SECRET = process.env.CRON_SECRET;
const OUT_FILE = path.join(__dirname, '..', 'articles', 'topics.json');

async function main() {
  if (!CRON_SECRET) {
    console.error('缺少 CRON_SECRET（请在 GitHub Secrets 中配置，与 Vercel 的 CRON_SECRET 一致）');
    process.exit(1);
  }

  const url = `${SITE_URL}/api/wechat-cron`;
  console.log(`请求 ${url} ...`);

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${CRON_SECRET}` }
  });

  const text = await res.text();
  if (!res.ok) {
    console.error(`请求失败 HTTP ${res.status}: ${text.substring(0, 500)}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error('响应不是 JSON:', text.substring(0, 300));
    process.exit(1);
  }

  if (!data.success) {
    console.error('同步失败:', data.error || JSON.stringify(data).substring(0, 300));
    process.exit(1);
  }

  const topics = data.topics || [];
  console.log(`拉取成功：草稿总数 ${data.totalDrafts}，本次新选题 ${data.newTopics}`);

  // 合并已有文件中的 done（已处理）标记
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  } catch (e) { /* 首次运行 */ }

  const doneMap = {};
  existing.forEach(t => { if (t.done) doneMap[t.mediaId] = true; });
  topics.forEach(t => { t.done = !!doneMap[t.mediaId]; });

  // 按更新时间倒序
  topics.sort((a, b) => (b.updateTime || 0) - (a.updateTime || 0));

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify(topics, null, 2), 'utf8');
  console.log(`已写入 ${OUT_FILE}（共 ${topics.length} 条选题）`);
}

main().catch(e => {
  console.error('异常:', e.message);
  process.exit(1);
});
