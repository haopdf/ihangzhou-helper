#!/usr/bin/env node
/**
 * iHangzhou 文章生成器
 * 用法：
 *   node tools/article-generator.js                          # 交互模式
 *   node tools/article-generator.js --title "标题" --cat "分类" --content content.md
 *   node tools/article-generator.js --list                   # 列出所有分类
 *   node tools/article-generator.js --keywords "骑行,杭州骑行"  # 指定关键词
 *
 * 功能：
 *   1. 读取 Markdown/纯文本 内容（支持公众号编辑器复制粘贴的富文本）
 *   2. 自动转换为平台 HTML 文章格式
 *   3. 自动注册到 articles/index.json
 *   4. 自动提取字数
 *   5. 自动生成 SEO meta 标签
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'articles');
const INDEX_JSON = path.join(ARTICLES_DIR, 'index.json');

// 读取 index.json 获取分类列表和最大编号
function loadIndex() {
  const raw = fs.readFileSync(INDEX_JSON, 'utf8');
  return JSON.parse(raw);
}

function saveIndex(data) {
  fs.writeFileSync(INDEX_JSON, JSON.stringify(data, null, 2), 'utf8');
}

// 获取分类列表
function getCategories(list) {
  const cats = {};
  list.forEach(a => {
    if (a.cat) cats[a.cat] = (cats[a.cat] || 0) + 1;
  });
  return Object.keys(cats).sort();
}

// 获取某分类下的最大编号
function getMaxNum(list, catPrefix) {
  let max = 0;
  list.forEach(a => {
    if (a.slug && a.slug.includes(catPrefix)) {
      const m = a.slug.match(/-(\d+)-/);
      if (m) max = Math.max(max, parseInt(m[1]));
    }
  });
  return max;
}

// 简易 Markdown → HTML 转换
function mdToHtml(md) {
  let html = md;
  // 处理表格
  html = html.replace(/^(\|.+\|)\n(\|[-:| ]+\|)\n((?:\|.+\|\n?)+)/gm, function(match, header, sep, body) {
    const headers = header.split('|').map(h => h.trim()).filter(Boolean);
    const rows = body.trim().split('\n').map(r => r.split('|').map(c => c.trim()).filter(Boolean));
    let table = '<table class="art-table"><thead><tr>';
    headers.forEach(h => table += '<th>' + h + '</th>');
    table += '</tr></thead><tbody>';
    rows.forEach(r => {
      table += '<tr>';
      for (let i = 0; i < headers.length; i++) {
        table += '<td>' + (r[i] || '') + '</td>';
      }
      table += '</tr>';
    });
    table += '</tbody></table>';
    return table;
  });
  // 标题
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h2>$1</h2>');
  // 引用
  html = html.replace(/^> (.+)$/gm, '<p>$1</p>');
  html = html.replace(/^(?!<[hbt])(.+)$/gm, function(line) {
    if (line.startsWith('<')) return line;
    if (line.trim() === '') return '';
    return '<p>' + line + '</p>';
  });
  // 粗体
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // 斜体
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // 分隔线
  html = html.replace(/^---$/gm, '<hr>');
  // 清理多余空行
  html = html.replace(/\n{3,}/g, '\n\n');
  return html;
}

// 从文本提取摘要
function extractSummary(html, maxLen) {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return text.substring(0, maxLen || 100) + (text.length > maxLen ? '...' : '');
}

// 统计字数
function countWords(html) {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  return text.length;
}

// 生成文章 HTML
function generateArticleHTML(opts) {
  const { title, cat, num, content, keywords, slug } = opts;
  const canonical = `https://www.ihangzhou.net/articles/${slug}.html`;
  const description = extractSummary(content, 150);
  const words = countWords(content);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>${title} · iHangzhou 杭州生活助手</title>
  <meta name="description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="keywords" content="杭州,${cat},${title},iHangzhou,杭州生活,杭州文化${keywords ? ',' + keywords : ''}">
  <meta name="theme-color" content="#0ea5e9">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="iHangzhou 杭州生活助手">
  <link rel="canonical" href="${canonical}">
  <link rel="stylesheet" href="../css/style.css?v=20260915e">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏔️</text></svg>">
  <style>
    .article-body { max-width: 720px; margin: 0 auto; padding: 16px; }
    .article-breadcrumb { font-size: 12px; color: var(--text-muted); padding: 10px 16px; background: var(--bg-alt); }
    .article-breadcrumb span { margin: 0 2px; }
    .article-breadcrumb a { color: var(--primary); }
    .article-header { padding: 20px 16px 16px; text-align: center; max-width: 720px; margin: 0 auto; }
    .article-header h1 { font-size: 22px; font-weight: 700; line-height: 1.4; color: var(--text); margin: 0 0 8px; }
    .article-meta { font-size: 12px; color: var(--text-muted); }
    .article-meta span { margin: 0 6px; }
    .article-content { font-size: 15px; line-height: 1.9; color: var(--text-secondary); padding: 8px 0 24px; }
    .article-content h2 { font-size: 18px; font-weight: 700; color: var(--text); margin: 28px 0 12px; padding-left: 10px; border-left: 4px solid var(--primary); }
    .article-content h3 { font-size: 16px; font-weight: 600; color: var(--text); margin: 20px 0 10px; }
    .article-content p { margin: 0 0 14px; }
    .article-content strong { color: var(--text); font-weight: 600; }
    .article-content em { color: var(--primary); font-style: normal; font-weight: 500; }
    .article-content blockquote { border-left: 4px solid var(--primary); background: var(--bg-alt); margin: 14px 0; padding: 10px 14px; border-radius: 0 8px 8px 0; font-style: italic; color: var(--text-secondary); }
    .article-content blockquote p { margin: 0; }
    .article-content hr { border: none; border-top: 1px dashed var(--border-light); margin: 24px 0; }
    .article-content ul { padding-left: 20px; margin: 10px 0 14px; }
    .article-content li { margin-bottom: 6px; }
    .article-content a { color: var(--primary); text-decoration: underline; text-underline-offset: 2px; }
    .article-content pre { background: var(--bg-alt); padding: 12px; border-radius: 8px; overflow-x: auto; margin: 12px 0; }
    .article-content code { background: var(--bg-alt); padding: 2px 6px; border-radius: 4px; font-size: 13px; color: var(--primary-dark); }
    .article-content pre code { background: none; padding: 0; color: var(--text); }
    .article-footer { max-width: 720px; margin: 0 auto; padding: 16px; border-top: 1px solid var(--border-light); }
    .article-footer a { display: block; text-align: center; padding: 12px; background: var(--primary); color: #fff; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; }
    [data-theme="dark"] .article-content code { background: var(--bg-hover); color: var(--primary-light); }
  </style>
</head>
<body>
  <header class="topbar">
    <a href="../index.html" class="topbar-back" style="color:#fff;text-decoration:none;font-size:20px;padding:4px 8px;">‹</a>
    <div class="topbar-city"><span>iHangzhou</span></div>
    <div class="topbar-search" style="flex:1;"></div>
    <button class="theme-btn" id="themeBtn" title="切换主题">🌙</button>
  </header>

  <div class="article-breadcrumb">
    <a href="../index.html">首页</a> ›
    <a href="../articles.html">文章</a> ›
    <span>${cat}</span>
  </div>

  <div class="article-header">
    <h1>${title}</h1>
    <div class="article-meta">
      <span>📂 ${cat}</span>
      <span>📖 杭州故事</span>
    </div>
  </div>

  <div class="article-body">
    <article class="article-content">
${content}
    </article><script src="../js/article-table-fix.js?v=20260915a"></script><script src="../js/article-toc.js?v=20260915e"></script>
  </div>

  <div class="article-footer">
    <a href="../articles.html">📚 查看更多杭州故事</a>
  </div>

  <script>
    (function(){ try{ var t=localStorage.getItem('ihz-theme')||'light'; document.documentElement.setAttribute('data-theme',t); var b=document.getElementById('themeBtn'); if(b) b.textContent=t==='dark'?'☀️':'🌙'; }catch(e){} })();
    document.getElementById('themeBtn')?.addEventListener('click',function(){ var cur=document.documentElement.getAttribute('data-theme')||'light'; var next=cur==='dark'?'light':'dark'; document.documentElement.setAttribute('data-theme',next); localStorage.setItem('ihz-theme',next); this.textContent=next==='dark'?'☀️':'🌙'; });
  </script>
</body>
</html>`;
}

// 交互模式
function interactive() {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = q => new Promise(r => rl.question(q, r));

  (async () => {
    const list = loadIndex();
    const cats = getCategories(list);
    console.log('\n=== iHangzhou 文章生成器 ===\n');
    console.log('可用分类：');
    cats.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));

    const catIdx = await ask('\n选择分类编号（或输入新分类名）: ');
    let cat;
    if (/^\d+$/.test(catIdx)) {
      cat = cats[parseInt(catIdx) - 1] || cats[0];
    } else {
      cat = catIdx.trim();
    }

    // 提取分类前缀（去掉编号前缀如 "13-"）
    const catPrefix = cat.replace(/^\d+-/, '');
    const maxNum = getMaxNum(list, catPrefix);
    const num = maxNum + 1;
    console.log(`分类 "${cat}" 当前最大编号: ${maxNum}，新文章编号: ${num}`);

    const title = await ask('文章标题: ');
    if (!title.trim()) { console.log('标题不能为空'); rl.close(); return; }

    const keywords = await ask('关键词（逗号分隔，如：骑行,西湖,周末）: ');

    console.log('\n请粘贴文章内容（Markdown 或纯文本），输入完毕后按 Ctrl+D 或输入空行三次：');
    let content = '';
    let emptyLines = 0;
    await new Promise(resolve => {
      process.stdin.on('data', chunk => {
        const text = chunk.toString();
        if (text.trim() === '') { emptyLines++; if (emptyLines >= 3) { resolve(); return; } }
        else { emptyLines = 0; }
        content += text;
      });
      process.stdin.on('end', resolve);
    });

    rl.close();

    if (!content.trim()) { console.log('内容不能为空'); return; }

    // 转换内容
    const contentHtml = mdToHtml(content.trim());
    const slugBase = `${catPrefix}-${String(num).padStart(2, '0')}-${title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '')}`;
    const slug = slugBase;

    const html = generateArticleHTML({
      title: title.trim(),
      cat,
      num,
      content: contentHtml,
      keywords: keywords.trim(),
      slug
    });

    const filePath = path.join(ARTICLES_DIR, slug + '.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`\n✅ 文章已生成: articles/${slug}.html`);

    // 更新 index.json
    list.push({
      slug,
      title: title.trim(),
      cat,
      summary: extractSummary(contentHtml, 100),
      words: countWords(contentHtml)
    });
    saveIndex(list);
    console.log(`✅ 已注册到 index.json（总计 ${list.length} 篇）`);
    console.log(`\n预览: http://localhost:8080/articles/${slug}.html`);
  })();
}

// 命令行模式
function cliMode(args) {
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--title') opts.title = args[++i];
    if (args[i] === '--cat') opts.cat = args[++i];
    if (args[i] === '--content') opts.contentFile = args[++i];
    if (args[i] === '--keywords') opts.keywords = args[++i];
    if (args[i] === '--list') { listCategories(); return; }
  }

  if (!opts.title || !opts.cat) {
    interactive();
    return;
  }

  const list = loadIndex();
  const catPrefix = opts.cat.replace(/^\d+-/, '');
  const num = getMaxNum(list, catPrefix) + 1;
  const slug = `${catPrefix}-${String(num).padStart(2, '0')}-${opts.title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '')}`;

  let content;
  if (opts.contentFile) {
    content = fs.readFileSync(opts.contentFile, 'utf8');
  } else {
    content = fs.readFileSync('/dev/stdin', 'utf8');
  }
  const contentHtml = mdToHtml(content.trim());

  const html = generateArticleHTML({
    title: opts.title,
    cat: opts.cat,
    num,
    content: contentHtml,
    keywords: opts.keywords || '',
    slug
  });

  const filePath = path.join(ARTICLES_DIR, slug + '.html');
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`文章已生成: articles/${slug}.html`);

  list.push({
    slug,
    title: opts.title,
    cat: opts.cat,
    summary: extractSummary(contentHtml, 100),
    words: countWords(contentHtml)
  });
  saveIndex(list);
  console.log(`已注册到 index.json（总计 ${list.length} 篇）`);
}

function listCategories() {
  const list = loadIndex();
  const cats = getCategories(list);
  console.log('\n可用分类：');
  cats.forEach(c => console.log(`  ${c}`));
}

// 入口
const args = process.argv.slice(2);
if (args.length === 0) {
  interactive();
} else {
  cliMode(args);
}
