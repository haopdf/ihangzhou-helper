# iHangzhou UI 统一策略（Design System v2）

> 作者：UI Designer｜日期：2026-10-18
> 目标：让 41 个根页面 + 2698 篇文章页「像一个站」，并建机制防止继续漂移。
> 定位：本文件是**设计宪法**，所有页面 / AI 写作 / 新增频道都必须遵守。改样式前先读它。

---

## 0. 现状诊断（基于实测，非印象）

| 指标 | 实测 | 结论 |
|---|---|---|
| 根页面内联 `<style>` | **38 / 41 页** | 散落源头：每页自己写 hero/tab 渐变 |
| 硬编码非中性色值 | **115 个独立色** | 品牌碎成几十个站 |
| 内联重定义 `--primary` | **13 页**（banshi/cat/celebrity/channel/food/gujian/history/internet/museum/street/traffic/xiangxiang/zhoubian） | **核心病根**：品牌 token 被页面本地覆盖成红/蓝/紫/青 |
| 覆盖成的新主色 | `#0ea5e9`×8、`#059669`×2、`#dc2626`(food)、`#7c3aed`、`#4338ca`(museum)、`#0891b2`、`#6b7280` | 一眼看去蓝绿红紫各一套 |
| 圆角值分布 | `10px`×97、`8px`×81、`24px`×19、`14px`×12、`12px`×8、`16px`×2、`20px`×1 | token `--radius:14px` 根本没被用，圆角散架 |
| 头部双源 | index 内联 `<header>`，其余走 `layout.js` + `templates/header.html` | 城市切换等功能只同步一半 |
| 已有的好基础 | `:root` token 完整（含暗色模式）；`css/channel.css` 已被 30 页引用 | **不用重造，补强即可** |

**一句话根因**：`:root` 里有完整的品牌 token，但 38 个页面用内联 `<style>` 自己写颜色、甚至把 `--primary` 重定义成任意色——**token 被架空**，所以越改越乱。

---

## 1. 设计原则（北极星）

1. **单一事实源**：所有视觉来自 `:root` token + `css/*.css` 组件类。**HTML 里零硬编码色、零内联 `<style>`、零重定义 `--primary`**。
2. **一个站**：全站主色只有**松绿 `--primary` #1f7a5a**，点缀只有**鎏金 `--gold`**；频道差异靠 **emoji 图标 + 受控小色板**，不靠换主色。
3. **模板化**：页面只有 4 类原型，新增频道 = 复制原型 + 设 1 个 `--channel-accent` 变量，不手写新 HTML/CSS。
4. **可治理**：用 linter 在提交前拦住回归（内联 style / 硬编码色 / 圆角越界）。

---

## 2. 目标设计系统

### 2.1 Design Tokens（沿用 `:root`，补 3 条）

```
/* 沿用已有：--primary / --primary-dark / --gold / --bg / --text / --border
   / --radius(14) --radius-sm(8) --radius-lg(16) --radius-xl(20)
   / --shadow-* / --transition-* —— 不再新增散色 */

/* 新增（克制，仅用于类目点缀，绝不动主色） */
--hero-grad: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); /* 全站 hero 统一渐变 */
--channel-accent: var(--primary);   /* 类目点缀色，默认=主色；需要区分时从下方白名单取 */
--accent-allowed: #1f7a5a,#c8932b,#0d9488,#7c3aed,#dc2626,#0891b2; /* 仅这 6 色可作 accent，且只用于 tab 下划线/小标签/图标砖 */
```

**硬规则**：`--primary` 在任何页面都 **禁止被重定义**；hero/header/tab 背景只用 `--hero-grad` 或 `--primary`。

### 2.2 组件库（一次定义，全站复用，含状态/响应式/暗色）

| 组件 | 类名 | 要点 |
|---|---|---|
| Hero | `.hero` | 背景 `--hero-grad`；高度 PC 220 / 移动 160；左缘与正文对齐（16px） |
| 顶栏 | `.app-header` | 唯一来源 `templates/header.html`（index 也要改走这里） |
| Tab | `.tab / .tab--active` | active 下划线用 `--channel-accent`；圆角 `--radius-sm` |
| 卡片 | `.card` | 1px `--border` + `--shadow-sm`；hover `--shadow-md`；圆角 `--radius` |
| 标签 | `.tag` | 背景 `--primary-100`、字 `--primary-dark`；圆角 `--radius-sm` |
| 弹层 | `.sheet` | 底部抽屉；遮罩 `--bg` 60% |
| 按钮 | `.btn / .btn--primary` | 主色填充；focus `--focus-ring`；最小高 44px |
| 输入 | `.input` | 圆角 `--radius`；focus 绿边 |

> museum 的 `.mu-*` 已是抽取样板，并入组件库。

### 2.3 页面原型（4 类，取代 41 个手搓页）

1. **Home**（`index`）—— 区块流 + 快捷入口；区块间距统一 `--space-6`(24)，标题层级（H2 主 / 副标小一号）。
2. **Channel-Hub**（food/travel/museum/chaguan…）—— hero + 类目 tab + 服务网格 + 相关频道；全部走 `css/channel.css`。
3. **Detail**（museum 详情 / 文章）—— hero + meta + 正文；正文行宽 ≤ 38em、字号 16/行高 1.8。
4. **Tool**（常用电话 / 计算器）—— 网格 + 卡片。

---

## 3. 治理（防回归，最重要）

- **`scripts/design_lint.py`**（正式脚本，非临时）：扫描 `*.html` 与 `css/`，报错项 =
  ① 含 `<style>`；② 出现硬编码 `#hex`（排除 token 白名单）；③ 内联 `:root{--primary`；④ `border-radius` 不在 `{8,12,14,16,20,24}`。
- **接 CI / pre-commit**：提交前跑 lint，红则不准合。
- **新增频道流程**：复制 `channel.html` 原型 → 改 `window.IHZ_PAGE` → 如需区分设 `--channel-accent`（仅限白名单 6 色）→ 完事，**不新建 CSS 文件、不写内联 style**。
- 本文件（DESIGN.md 角色）是人类 + AI 的唯一视觉参考；AI 改样式前必须先读。

---

## 4. 分阶段执行（不打断线上，每阶段可独立验证）

- **P0 止血**：补 token（§2.1）、写 `scripts/design_lint.py`、本文件定稿。**不动任何页面**。
- **P1 样板**：收口 `css/channel.css`（抽齐组件库）；转换 `index` + 1 个频道（food）作参考；本地 8080/8081 核对。
- **P2 批量**：脚本批量删除 37 页内联 `<style>`、去掉 13 页 `--primary` 覆盖，改引用 `channel.css`/token；逐页 lint 过。
- **P3 统一头**：`index.html` 改走 `layout.js` + `templates/header.html`，删内联头。
- **P4 打磨**：圆角/间距清理到 token；暗色模式全页过；无障碍（对比度 ≥4.5:1、焦点环、点按 ≥44px）。
- **P5 治理**：lint 接 pre-commit/CI；归档 `scripts/` 下 30+ 临时脚本为 1~2 个正式流水线。

---

## 5. 验收标准（完成定义）

- [ ] 全站 `<style>` 内联块 = **0**
- [ ] 全站硬编码 `#hex`（非 token） = **0**
- [ ] `--primary` 全站唯一 = **松绿 #1f7a5a**（无页面重定义）
- [ ] 圆角仅取 `{8,12,14,16,20,24}` 且映射 token
- [ ] 组件库复用率 > 90%（无每页重定义 hero/tab/card）
- [ ] 暗色模式全页面可用、对比度达标
- [ ] `design_lint.py` 接入 pre-commit，新提交零违规

---

### 立即可做的「最小统一」（不动结构，10 分钟见好）
批量把 13 页内联 `--primary` 覆盖删掉 → 全站瞬间统一为松绿。这是性价比最高的一步，建议作为 P1 的起点。

---

## 6. 布局与导航的强制标准（与本文件配套）

颜色/圆角管「长什么样」，但**「列宽多宽、有没有面包屑」**是另一类硬标准，已单独成文：

- **[docs/布局与导航规范.md](布局与导航规范.md)**（2026-10-18 定稿，playwright 实测）
  - 内容列：桌面 ≥1024px `1180px` 居中；移动 `<1024px` 左右 `--gutter:16px`。全站 hero/tabs/卡片同一条中轴线。
  - 面包屑：频道页 2 级「首页 › 栏目」、详情页 3 级「首页 › 栏目 › 当前页」，统一灰底 `.site-breadcrumb`。
  - 含新增页面 Checklist + 踩坑清单（breadcrumb 注入顺序、bleed 出血、版本 bump、grep `-E` 等）。

> 本文件（视觉 token）与布局导航规范是**同一治理目标的两半**：凡是「新页面 / 改样式 / 改布局」，两份都要读，CI/Review 按两份验收。
