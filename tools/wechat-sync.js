#!/usr/bin/env node
/**
 * iHangzhou 公众号选题参考工具
 *
 * 功能：从公众号草稿箱拉取文章标题列表，作为选题参考
 *       用户根据选题手动编写精简版内容，通过 article-generator.js 生成文章
 *
 * 用法：
 *   node tools/wechat-sync.js                    # 交互模式，列出草稿选题
 *   node tools/wechat-sync.js --list             # 仅列出草稿选题
 *   node tools/wechat-sync.js --pick <编号>       # 选择某个选题，自动调用 article-generator.js
 *
 * 环境变量（在 .env.local 中配置）：
 *   WX_APPID=你的公众号AppID
 *   WX_SECRET=你的公众号AppSecret
 */

const http = require('https');
const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', 'articles');
const INDEX_JSON = path.join(ARTICLES_DIR, 'index.json');
const ENV_FILE = path.join(__dirname, '..', '.env.local');

// 读取环境变量
function loadEnv() {
  const env = {};
  try {
    const raw = fs.readFileSync(ENV_FILE, 'utf8');
    raw.split('\n').forEach(line => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) env[m[1].trim()] = m[2].trim();
    });
  } catch (e) {}
  // 也读取 process.env
  Object.keys(process.env).forEach(k => { if (k.startsWith('WX_')) env[k] = process.env[k]; });
  return env;
}

// HTTP GET 请求
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('JSON parse error: ' + data.substring(0, 200))); }
      });
    }).on('error', reject);
  });
}

// HTTP POST 请求
function httpsPost(url, body) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('JSON parse error: ' + data.substring(0, 200))); }
      });
    });
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

// 获取 access_token
async function getAccessToken(env) {
  const appid = env.WX_APPID;
  const secret = env.WX_SECRET;
  if (!appid || !secret) {
    throw new Error('缺少 WX_APPID 或 WX_SECRET\n请在 .env.local 中配置：\n  WX_APPID=你的AppID\n  WX_SECRET=你的AppSecret');
  }
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
  const res = await httpsGet(url);
  if (res.errcode) {
    throw new Error(`获取 access_token 失败: ${res.errcode} ${res.errmsg}\n常见原因：IP白名单未配置、AppID/Secret错误`);
  }
  return res.access_token;
}

// 获取草稿列表（仅标题与摘要，不含正文）
async function getDraftList(token, offset, count) {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/batchget?access_token=${token}`;
  const res = await httpsPost(url, { offset: offset || 0, count: count || 20, no_content: 1 });
  if (res.errcode) throw new Error(`获取草稿列表失败: ${res.errcode} ${res.errmsg}`);
  return res;
}

// 简易 Markdown → HTML 转换（与 article-generator.js 保持一致）
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

// 读取 index.json 获取分类列表
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

// 生成文章 HTML（与 article-generator.js 中的完全一致）
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

// 格式化时间戳为可读日期
function formatTime(ts) {
  if (!ts) return '未知';
  const d = new Date(ts * 1000);
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// 从草稿列表项中提取选题信息
function extractTopic(item) {
  const newsItem = item.content && item.content.news_item && item.content.news_item[0];
  return {
    mediaId: item.media_id,
    title: newsItem ? newsItem.title : '（无标题）',
    digest: newsItem ? (newsItem.digest || '') : '',
    updateTime: item.update_time
  };
}

// 打印选题列表
function printTopics(drafts) {
  console.log(`共 ${drafts.total_count} 篇草稿，当前显示 ${drafts.item_count} 篇：\n`);
  if (!drafts.item || !drafts.item.length) {
    console.log('（草稿箱为空）');
    return;
  }
  drafts.item.forEach((d, i) => {
    const t = extractTopic(d);
    console.log(`选题 ${i + 1}: ${t.title}`);
    if (t.digest) console.log(`  摘要: ${t.digest}`);
    console.log(`  发布时间: ${formatTime(t.updateTime)}`);
    console.log('');
  });
}

// 选择选题并生成文章（不搬运原文，由用户编写精简版内容）
async function pickTopic(token, drafts, pickIdx) {
  if (!drafts.item || !drafts.item.length) {
    console.log('草稿箱为空，无法选择选题');
    return null;
  }
  if (pickIdx < 0 || pickIdx >= drafts.item.length) {
    console.log(`编号超出范围，请输入 1 ~ ${drafts.item.length}`);
    return null;
  }

  const topic = extractTopic(drafts.item[pickIdx]);
  console.log('\n----------------------------------------');
  console.log(`已选择选题: ${topic.title}`);
  console.log(`原文摘要: ${topic.digest || '（无）'}`);
  console.log('----------------------------------------\n');

  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = q => new Promise(r => rl.question(q, r));

  try {
    const list = loadIndex();
    const cats = getCategories(list);
    console.log('可用分类：');
    cats.forEach((c, i) => console.log(`  ${i + 1}. ${c}`));

    const catIdx = await ask('\n选择分类编号（或输入新分类名，默认 13-运动健身系列）: ');
    let cat;
    if (!catIdx.trim()) {
      cat = '13-运动健身系列';
    } else if (/^\d+$/.test(catIdx)) {
      cat = cats[parseInt(catIdx) - 1] || '13-运动健身系列';
    } else {
      cat = catIdx.trim();
    }

    const catPrefix = cat.replace(/^\d+-/, '');
    const num = getMaxNum(list, catPrefix) + 1;
    console.log(`分类 "${cat}" 新文章编号: ${num}`);

    // 标题默认使用草稿标题，用户可修改
    const titleInput = await ask(`\n文章标题（回车使用选题标题）: `);
    const title = (titleInput.trim() || topic.title).replace(/[<>:"/\\|?*\x00-\x1f]/g, '');

    const keywords = await ask('关键词（逗号分隔，可留空）: ');

    console.log('\n请粘贴或编写精简版内容（Markdown 或纯文本，可直接从公众号文章中提取核心要点）');
    console.log('提示：不要直接搬运原文，请提炼为精简版或特别版内容');
    console.log('输入完毕后按 Ctrl+D 或输入空行三次结束：\n');

    let content = '';
    let emptyLines = 0;
    await new Promise(resolve => {
      process.stdin.on('data', chunk => {
        const text = chunk.toString();
        if (text.trim() === '') {
          emptyLines++;
          if (emptyLines >= 3) { resolve(); return; }
        } else {
          emptyLines = 0;
        }
        content += text;
      });
      process.stdin.on('end', resolve);
    });

    rl.close();

    if (!content.trim()) {
      console.log('\n内容为空，已取消生成');
      return null;
    }

    const contentHtml = mdToHtml(content.trim());
    const slug = `${catPrefix}-${String(num).padStart(2, '0')}-${title}`;

    // 检查是否已存在
    const existing = list.find(a => a.title === title);
    if (existing) {
      console.log(`\n⚠️ 标题已存在: ${existing.slug}.html，已覆盖写入`);
    }

    const html = generateArticleHTML({
      title,
      cat,
      num,
      content: contentHtml,
      keywords: keywords.trim(),
      slug
    });

    const filePath = path.join(ARTICLES_DIR, slug + '.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`\n✅ 文章已生成: articles/${slug}.html`);

    // 更新 index.json（如果已存在则替换）
    const idx = list.findIndex(a => a.title === title);
    const record = {
      slug,
      title,
      cat,
      summary: extractSummary(contentHtml, 100),
      words: countWords(contentHtml)
    };
    if (idx >= 0) {
      list[idx] = record;
    } else {
      list.push(record);
    }
    saveIndex(list);
    console.log(`✅ 已注册到 index.json（总计 ${list.length} 篇）`);
    console.log(`\n预览: http://localhost:8080/articles/${slug}.html`);

    return { title, slug };
  } finally {
    rl.close();
  }
}

// 主函数
async function main() {
  const args = process.argv.slice(2);
  const env = loadEnv();

  console.log('\n=== iHangzhou 公众号选题参考工具 ===\n');

  // 检查配置
  if (!env.WX_APPID || !env.WX_SECRET) {
    console.log('❌ 缺少公众号配置');
    console.log('\n请在 .env.local 文件中配置：');
    console.log('  WX_APPID=你的公众号AppID');
    console.log('  WX_SECRET=你的公众号AppSecret');
    console.log('\n获取方式：');
    console.log('  1. 登录 mp.weixin.qq.com');
    console.log('  2. 设置 → 开发 → 基本配置 → 公众号开发信息');
    console.log('  3. 复制 AppID 和 AppSecret');
    console.log('  4. 确认服务器IP已在白名单中');
    console.log('\n注意：仅已认证服务号支持草稿箱API');
    return;
  }

  try {
    console.log('获取 access_token...');
    const token = await getAccessToken(env);
    console.log('✅ access_token 获取成功\n');

    console.log('拉取草稿选题列表...');
    const drafts = await getDraftList(token, 0, 20);

    if (args.includes('--list')) {
      // 仅列出选题
      printTopics(drafts);
    } else if (args.includes('--pick')) {
      // 直接选择编号
      const idx = args.indexOf('--pick');
      const pickNum = parseInt(args[idx + 1]);
      if (!pickNum) {
        console.log('请指定选题编号，例如: node tools/wechat-sync.js --pick 2');
        printTopics(drafts);
        return;
      }
      await pickTopic(token, drafts, pickNum - 1);
    } else {
      // 交互模式：列出选题后让用户选择
      printTopics(drafts);
      if (!drafts.item || !drafts.item.length) return;

      const readline = require('readline');
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      const ask = q => new Promise(r => rl.question(q, r));

      const choice = await ask('请输入要选择的选题编号（回车退出）: ');
      rl.close();

      const pickIdx = parseInt(choice.trim()) - 1;
      if (isNaN(pickIdx) || pickIdx < 0 || pickIdx >= drafts.item.length) {
        console.log('已退出');
        return;
      }
      await pickTopic(token, drafts, pickIdx);
    }
  } catch (e) {
    console.error('❌ ' + e.message);
    if (e.message.includes('40164') || e.message.includes('IP')) {
      console.log('\n💡 提示：请将本机IP加入公众号后台「基本配置」-「IP白名单」');
    }
  }
}

main();
