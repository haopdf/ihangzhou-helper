// ============================================
// 一次性迁移脚本：从 js/app.js 提取 DATA 写入 data/cms.json
//
// 使用方式：
//   cd d:\py-project\ihangzhou-helper
//   node scripts/migrate-to-cms.js
//
// 作用：
//   - 解析 js/app.js 里的 `var DATA_FALLBACK = {...};` 块
//   - 提取 hotKeywords / hotServices / categories / phonebook / channels
//   - 合并到现有 data/cms.json（保留 version 自增、备份旧数据到 _backup）
//   - 让 CMS 后台立即拥有与前端一致的全量数据
// ============================================

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APP_JS = path.join(ROOT, 'js', 'app.js');
const CMS_JSON = path.join(ROOT, 'data', 'cms.json');

// 括号计数法提取对象字面量（兼容字符串内的 { }、单行注释）
function extractDataObject(content) {
  // 兼容旧名 DATA 和新名 DATA_FALLBACK
  const startMatch = content.match(/var\s+DATA(?:_FALLBACK)?\s*=\s*\{/);
  if (!startMatch) {
    throw new Error('未找到 var DATA = { 或 var DATA_FALLBACK = { 块');
  }
  const start = startMatch.index + startMatch[0].length - 1; // 指向 {

  let depth = 0;
  let inString = false, stringChar = '', escape = false;
  for (let i = start; i < content.length; i++) {
    const ch = content[i];
    if (escape) { escape = false; continue; }
    if (inString) {
      if (ch === '\\') { escape = true; continue; }
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue; }
    // 跳过单行注释
    if (ch === '/' && content[i + 1] === '/') {
      while (i < content.length && content[i] !== '\n') i++;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        const dataStr = content.slice(start, i + 1);
        try {
          // eslint-disable-next-line no-new-func
          return new Function('return ' + dataStr)();
        } catch (e) {
          throw new Error('解析 DATA 对象失败: ' + e.message);
        }
      }
    }
  }
  throw new Error('未找到 DATA 对象的闭合 }');
}

function main() {
  console.log('[migrate] 读取 js/app.js ...');
  if (!fs.existsSync(APP_JS)) {
    console.error('[migrate] 错误：找不到 js/app.js，路径：' + APP_JS);
    process.exit(1);
  }
  const appContent = fs.readFileSync(APP_JS, 'utf8');
  const extracted = extractDataObject(appContent);
  if (!extracted || !extracted.categories) {
    console.error('[migrate] 错误：提取到的 DATA 对象没有 categories 字段');
    process.exit(1);
  }

  const totalItems = extracted.categories.reduce((s, c) => s + (c.items ? c.items.length : 0), 0);
  console.log('[migrate] 提取成功：');
  console.log('  - 分类数：' + extracted.categories.length);
  console.log('  - 条目数：' + totalItems);
  console.log('  - 热门服务：' + (extracted.hotServices ? extracted.hotServices.length : 0));
  console.log('  - 关键词：' + (extracted.hotKeywords ? extracted.hotKeywords.length : 0));
  console.log('  - 常用电话：' + (extracted.phonebook ? extracted.phonebook.length : 0));

  // 读取现有 cms.json（若有）
  let cms = { version: 0, lastModified: new Date().toISOString(), hotKeywords: [], hotServices: [], categories: [], channels: [] };
  if (fs.existsSync(CMS_JSON)) {
    try {
      cms = JSON.parse(fs.readFileSync(CMS_JSON, 'utf8'));
      console.log('[migrate] 已加载现有 cms.json (v' + (cms.version || 0) + ')');
    } catch (e) {
      console.warn('[migrate] 现有 cms.json 解析失败，将使用空模板');
    }
  }

  // 备份旧数据
  cms._backup = { time: new Date().toISOString(), snapshot: JSON.parse(JSON.stringify(cms)) };

  // 覆盖关键字段
  cms.hotKeywords = extracted.hotKeywords || cms.hotKeywords;
  cms.hotServices = extracted.hotServices || cms.hotServices;
  cms.categories = extracted.categories || cms.categories;
  cms.channels = extracted.channels || cms.channels;
  if (extracted.phonebook) cms.phonebook = extracted.phonebook;

  // 版本自增
  cms.version = (cms.version || 0) + 1;
  cms.lastModified = new Date().toISOString();

  // 确保目录存在
  const cmsDir = path.dirname(CMS_JSON);
  if (!fs.existsSync(cmsDir)) fs.mkdirSync(cmsDir, { recursive: true });

  fs.writeFileSync(CMS_JSON, JSON.stringify(cms, null, 2), 'utf8');
  console.log('[migrate] 写入完成：' + CMS_JSON);
  console.log('[migrate] 新版本 v' + cms.version + '，备份已存入 _backup 字段');
  console.log('[migrate] 完成 ✓');
}

main();
