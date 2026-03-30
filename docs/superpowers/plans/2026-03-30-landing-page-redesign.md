# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `index.html` to lead with platform cards in the hero, strengthen "simple / lightweight / native" messaging, fix JS bugs, and improve visual polish throughout.

**Architecture:** All changes are to a single self-contained file (`index.html`) with inline CSS and JS. Tasks are ordered so each produces a visually stable checkpoint: CSS first, then HTML, then JS. No build step, no dependencies to install.

**Tech Stack:** Vanilla HTML/CSS/JS, no framework. Browser verification via `open index.html`.

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `index.html` | Modify | CSS block: new hero styles, glow, chrome title, ribbon fix |
| `index.html` | Modify | HTML: hero rewrite, chrome div, stats relocation |
| `index.html` | Modify | JS: dead-reference removal, `highlightPlatform()` updates |

---

## Task 1: CSS — Hero New Components

Add platform card, trust signal, and eyebrow styles to the `<style>` block. No HTML changes yet — this task is CSS only so later HTML tasks render correctly on first load.

**Files:**
- Modify: `index.html` (CSS block, after `.hero-version` rule ~line 108)

- [ ] **Step 1: Add new CSS rules**

Find the line `/* APP PREVIEW */` in the `<style>` block. Insert the following block immediately before it:

```css
/* HERO — platform cards */
.platform-row {
  display: flex; align-items: stretch; gap: 12px;
  justify-content: center; flex-wrap: wrap;
  margin-bottom: 28px;
}
.plat-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 16px 20px;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  min-width: 110px; text-align: center;
  transition: border-color .2s; position: relative; overflow: hidden;
}
.plat-card.active {
  border-color: var(--accent);
  background: linear-gradient(180deg, rgba(91,141,239,.06) 0%, var(--card) 100%);
}
.plat-card.active::after {
  content: 'YOUR OS';
  position: absolute; top: 8px; right: -20px;
  background: var(--accent); color: #fff;
  font-size: 7px; font-weight: 800; letter-spacing: .5px;
  padding: 2px 28px; transform: rotate(45deg);
}
.plat-card svg { width: 28px; height: 28px; flex-shrink: 0; }
.plat-name { font-size: 13px; font-weight: 700; }
.plat-sub  { font-size: 10px; color: var(--muted); }

/* HERO — trust signals */
.hero-trust {
  display: flex; align-items: center; gap: 20px;
  flex-wrap: wrap; justify-content: center;
  margin-top: 14px; font-size: 12px; color: var(--muted);
}
.hero-trust span { display: flex; align-items: center; gap: 4px; }
.hero-trust .trust-check { color: var(--success); font-size: 11px; }
```

- [ ] **Step 2: Verify CSS is valid**

Open `index.html` in browser: `open index.html`

Expected: page loads without layout breakage. No new elements visible yet — CSS is just ready.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: add platform card and trust signal CSS for hero redesign"
```

---

## Task 2: HTML — Hero Section Rewrite

Replace the entire `<section class="hero">…</section>` block with the new layout: eyebrow badge, new headline, new subtitle, platform cards, CTA, trust signals. Remove the old `hero-version` paragraph.

**Files:**
- Modify: `index.html` (hero section, ~lines 259–275)

- [ ] **Step 1: Replace the hero section**

Find and replace the entire `<!-- HERO -->` block:

**Remove (old):**
```html
<!-- HERO -->
<section class="hero">
  <h1>Paint for<br><span class="gradient-text">Every Platform</span></h1>
  <p class="hero-sub">
    A fast, lightweight image editor that runs natively on macOS, Windows, and Linux.
    Layers, selection tools, text formatting — everything you need, nothing you don't.
  </p>
  <div class="hero-actions">
    <a class="btn-primary" id="hero-download" href="#download">
      <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
      </svg>
      <span id="hero-dl-label">Download</span>
    </a>
  </div>
  <p class="hero-version">Free &middot; <span id="hero-ver">v0.1.0</span></p>
</section>
```

**Insert (new):**
```html
<!-- HERO -->
<section class="hero">
  <div class="hero-badge" style="margin-bottom:28px">
    <span class="dot"></span>
    Simple &middot; Lightweight &middot; Native
  </div>
  <h1>One App.<br><span class="gradient-text">Every Platform.</span></h1>
  <p class="hero-sub">
    A fast, native image editor — no Electron, no JVM, no bloat.<br>
    Just download and start creating.
  </p>
  <div class="platform-row">
    <div class="plat-card" id="plat-mac">
      <svg viewBox="0 0 32 32" fill="var(--text)">
        <path d="M22.3 17.6c0-3.1 2.5-4.6 2.6-4.7-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-4.9 3-2.1 3.6-.5 9 1.5 12 1 1.4 2.1 3 3.6 3 1.4-.1 2-.9 3.7-.9 1.7 0 2.2.9 3.7.9 1.6 0 2.6-1.5 3.6-2.9 1.1-1.6 1.6-3.2 1.6-3.3-.1-.1-3-1.2-3-4.8zm-2.8-8.8c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.6 3.6-1.7z"/>
      </svg>
      <div class="plat-name">macOS</div>
      <div class="plat-sub">Intel + Apple Silicon</div>
    </div>
    <div class="plat-card" id="plat-win">
      <svg viewBox="0 0 32 32" fill="var(--text)">
        <path d="M4 7.3L14.1 5.8V15H4V7.3zM15.1 5.6L28 3.5V15H15.1V5.6zM4 16H14.1V25.2L4 23.7V16zM15.1 16H28V28.5L15.1 26.4V16z"/>
      </svg>
      <div class="plat-name">Windows</div>
      <div class="plat-sub">x64 Installer</div>
    </div>
    <div class="plat-card" id="plat-linux">
      <svg viewBox="0 0 24 24" fill="var(--text)">
        <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z"/>
      </svg>
      <div class="plat-name">Linux</div>
      <div class="plat-sub">deb &middot; rpm &middot; AppImage</div>
    </div>
  </div>
  <div class="hero-actions">
    <a class="btn-primary" id="hero-download" href="#download">
      <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
      </svg>
      <span id="hero-dl-label">Download</span>
    </a>
  </div>
  <div class="hero-trust">
    <span><span class="trust-check">✓</span> Free forever</span>
    <span><span class="trust-check">✓</span> No account needed</span>
    <span><span class="trust-check">✓</span> Native binary</span>
  </div>
</section>
```

- [ ] **Step 2: Verify hero renders correctly**

Open `index.html` in browser: `open index.html`

Check:
- Headline reads "One App. / Every Platform." with gradient on second line
- Eyebrow pill shows "Simple · Lightweight · Native"
- Three platform cards visible with SVG icons (not emoji)
- "Download" button present
- Trust signals ("Free forever", "No account needed", "Native binary") visible below button

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rewrite hero section with platform cards and new messaging"
```

---

## Task 3: App Preview — Restore Window Chrome

The `.preview-chrome` CSS class already exists. Restore the missing HTML `div` and add a `.chrome-title` style + caption below the frame.

**Files:**
- Modify: `index.html` (CSS block + preview-wrap HTML, ~lines 111–132)

- [ ] **Step 1: Add `.chrome-title` CSS**

Find `.chrome-dot.g { background: #28c840; }` in the CSS block. Add immediately after:

```css
.chrome-title { font-size: 11px; color: var(--muted); margin: 0 auto; }
.preview-caption { text-align: center; font-size: 13px; color: var(--muted); margin-top: 16px; }
```

- [ ] **Step 2: Restore chrome div and add caption in HTML**

Find the `<!-- APP PREVIEW -->` block. Replace:

```html
<!-- APP PREVIEW -->
<div class="preview-wrap">
  <div class="preview-frame">
    <img class="preview-screenshot" src="app-screenshot.png" alt="Paint.Cross 실행 화면" />
  </div>
</div>
```

With:

```html
<!-- APP PREVIEW -->
<div class="preview-wrap">
  <div class="preview-frame">
    <div class="preview-chrome">
      <div class="chrome-dot r"></div>
      <div class="chrome-dot y"></div>
      <div class="chrome-dot g"></div>
      <span class="chrome-title">Paint.Cross — Untitled.paintx</span>
    </div>
    <img class="preview-screenshot" src="app-screenshot.png" alt="Paint.Cross 실행 화면" />
  </div>
  <p class="preview-caption">Native window — no browser shell, no Electron overhead</p>
</div>
```

- [ ] **Step 3: Verify chrome renders correctly**

Open `index.html` in browser.

Check:
- Red/yellow/green traffic light dots appear at top-left of app screenshot frame
- "Paint.Cross — Untitled.paintx" title visible in the chrome bar, centered
- Caption "Native window — no browser shell, no Electron overhead" appears below the frame

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "fix: restore app preview window chrome and add native caption"
```

---

## Task 4: Feature Card Glow + Stats Bar Integration

Add hover glow to feature cards and move the standalone stats bar into the features section.

**Files:**
- Modify: `index.html` (CSS block + HTML structure)

- [ ] **Step 1: Add `overflow: hidden` to `.feature-card` and glow pseudo-element**

Find `.feature-card { background: var(--card);` in the CSS block. Add `overflow: hidden;` to the existing rule:

```css
.feature-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 28px;
  transition: border-color .2s, transform .2s;
  overflow: hidden;
}
```

Then add the pseudo-element rules immediately after `.feature-card:hover { ... }`:

```css
.feature-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 80% at 50% 100%, rgba(91,141,239,.1), transparent);
  opacity: 0; transition: opacity .3s; pointer-events: none;
}
.feature-card:hover::before { opacity: 1; }
```

- [ ] **Step 2: Update `.stats-bar` CSS to remove outer borders**

Find `.stats-bar {` in the CSS block. Remove `border-top` and `border-bottom` from the rule:

```css
.stats-bar {
  display: flex; justify-content: center; gap: 60px;
  padding: 60px 24px;
}
```

- [ ] **Step 3: Move stats bar HTML into features section**

Find and remove the standalone `<!-- STATS -->` block:

```html
<!-- STATS -->
<div class="stats-bar">
  <div class="stat">
    <div class="stat-num gradient-text">3</div>
    <div class="stat-label">Platforms</div>
  </div>
  <div class="stat">
    <div class="stat-num gradient-text">13+</div>
    <div class="stat-label">Tools</div>
  </div>
  <div class="stat">
    <div class="stat-num gradient-text">50</div>
    <div class="stat-label">Undo Steps</div>
  </div>
  <div class="stat">
    <div class="stat-num gradient-text">Free</div>
    <div class="stat-label">Always</div>
  </div>
</div>
```

Then find the closing `</div>` of `.features-grid` inside `#features`. Add the stats immediately after it, wrapped in a styled container:

```html
  </div><!-- end .features-grid -->
  <div style="border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-top:40px">
    <div class="stats-bar">
      <div class="stat">
        <div class="stat-num gradient-text">3</div>
        <div class="stat-label">Platforms</div>
      </div>
      <div class="stat">
        <div class="stat-num gradient-text">13+</div>
        <div class="stat-label">Tools</div>
      </div>
      <div class="stat">
        <div class="stat-num gradient-text">50</div>
        <div class="stat-label">Undo Steps</div>
      </div>
      <div class="stat">
        <div class="stat-num gradient-text">Free</div>
        <div class="stat-label">Always</div>
      </div>
    </div>
  </div>
```

- [ ] **Step 4: Verify feature section**

Open `index.html` in browser.

Check:
- Hover over a feature card → blue glow rises from the bottom
- Stats bar appears inside the features section (no longer a full-width horizontal rule between sections)
- Stats bar has a rounded border matching the card style

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add feature card hover glow and integrate stats into features section"
```

---

## Task 5: CSS — Dynamic Download Ribbon

Change the "Recommended" hardcoded ribbon text to use `attr(data-ribbon)` so JS can set it per detected OS.

**Files:**
- Modify: `index.html` (CSS block only)

- [ ] **Step 1: Update `.dl-card.primary::before` content**

Find:

```css
.dl-card.primary::before {
  content: 'Recommended'; position: absolute; top: 14px; right: -22px;
```

Replace `content: 'Recommended'` with `content: attr(data-ribbon)`:

```css
.dl-card.primary::before {
  content: attr(data-ribbon); position: absolute; top: 14px; right: -22px;
```

- [ ] **Step 2: Verify ribbon still renders (fallback)**

Open `index.html`. The ribbon will be empty until JS runs — that's expected. This task is CSS only; JS is wired in Task 6.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: use attr(data-ribbon) for dynamic OS ribbon on download cards"
```

---

## Task 6: JS — Fix Dead References and Wire Platform Detection

Fix two broken `getElementById` calls in `loadRelease()`, and update `highlightPlatform()` to: set platform card active state, set ribbon text, and update the hero CTA label.

**Files:**
- Modify: `index.html` (JS block at bottom of file)

- [ ] **Step 1: Remove dead element references from `loadRelease()`**

Find the two dead lines inside `loadRelease()`:

```js
document.getElementById('version-badge').textContent = ver;
document.getElementById('hero-ver').textContent = ver;
```

Remove both. The only version update that remains should be:

```js
document.getElementById('dl-version-badge').textContent = ver;
```

- [ ] **Step 2: Rewrite `highlightPlatform()`**

Find the entire `function highlightPlatform(os) { ... }` block and replace it with:

```js
function highlightPlatform(os) {
  var cards   = { mac: 'dl-mac',    win: 'dl-win',    linux: 'dl-linux'    };
  var btns    = { mac: 'dl-mac-btn', win: 'dl-win-btn', linux: 'dl-linux-btn' };
  var plats   = { mac: 'plat-mac',  win: 'plat-win',  linux: 'plat-linux'  };
  var labels  = { mac: 'Download for macOS', win: 'Download for Windows', linux: 'Download for Linux' };
  var ribbons = { mac: 'macOS',     win: 'Windows',   linux: 'Linux'       };
  if (!os || !cards[os]) return;

  // Download section — highlight detected OS card
  var dlCard = document.getElementById(cards[os]);
  var dlBtn  = document.getElementById(btns[os]);
  if (dlCard) { dlCard.classList.add('primary'); dlCard.dataset.ribbon = ribbons[os]; }
  if (dlBtn)  dlBtn.classList.remove('outline');

  // Hero — highlight platform card
  var platCard = document.getElementById(plats[os]);
  if (platCard) platCard.classList.add('active');

  // Hero — update CTA label
  var heroDlLabel = document.getElementById('hero-dl-label');
  if (heroDlLabel) heroDlLabel.textContent = labels[os];
}
```

- [ ] **Step 3: Verify JS in browser console**

Open `index.html` in browser. Open DevTools console (F12 / Cmd+Option+I).

Run:
```js
// Should return 'mac', 'win', or 'linux' based on your OS
detectOS()
```

Then check visually:
- Hero: the platform card matching your OS has a blue border + "YOUR OS" ribbon
- Hero CTA button reads "Download for macOS" (or Windows/Linux)
- Download section: your OS card has blue border + OS name ribbon (e.g. "macOS")

Run in console to confirm no TypeError:
```js
// Should complete without errors
loadRelease()
```

Expected: no red errors in console (may show network error if offline — that's fine).

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "fix: remove dead JS element refs, wire platform detection to hero cards and CTA label"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Spec §2 Headline → Task 2
- [x] Spec §2 Eyebrow Badge → Task 2
- [x] Spec §2 Subtitle Copy → Task 2
- [x] Spec §2 Platform Cards (SVG icons, active state) → Task 1 + Task 2 + Task 6
- [x] Spec §2 CTA OS-detected label → Task 6
- [x] Spec §2 Trust Signals → Task 1 + Task 2
- [x] Spec §2 Remove hero-version → Task 2
- [x] Spec §3 Window Chrome → Task 3
- [x] Spec §3 Caption → Task 3
- [x] Spec §4 Hover Glow → Task 4
- [x] Spec §4 Stats Integration → Task 4
- [x] Spec §5 Dynamic Ribbon → Task 5 + Task 6
- [x] Spec §6 Dead reference removal → Task 6
- [x] Spec §6 Hero CTA label update → Task 6

**Placeholder scan:** No TBD, TODO, or "similar to above" — all steps include full code.

**Type consistency:** `plat-mac` / `plat-win` / `plat-linux` IDs defined in Task 2 HTML and referenced in Task 6 JS. `hero-dl-label` ID present in Task 2 HTML and read in Task 6 JS. `dl-version-badge` ID pre-exists in the file (added in a prior commit) — Task 6 keeps it intact.
