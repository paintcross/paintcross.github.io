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
      <svg viewBox="0 0 32 32" fill="none" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="7" y="8" width="18" height="13" rx="2.5"/>
        <path d="M12 25h8M14 21v4M18 21v4"/>
      </svg>
      <div class="plat-name">macOS</div>
      <div class="plat-sub">Intel + Apple Silicon</div>
    </div>
    <div class="plat-card" id="plat-win">
      <svg viewBox="0 0 32 32" fill="none" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="6" y="7" width="20" height="18" rx="3"/>
        <path d="M6 12h20M12 18h8"/>
      </svg>
      <div class="plat-name">Windows</div>
      <div class="plat-sub">x64 Installer</div>
    </div>
    <div class="plat-card" id="plat-linux">
      <svg viewBox="0 0 32 32" fill="none" stroke="var(--text)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="6" y="7" width="20" height="18" rx="3"/>
        <path d="M11 13l4 3-4 3M17 20h5"/>
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
