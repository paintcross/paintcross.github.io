# Landing Page Redesign — Design Spec
**Date:** 2026-03-30
**Status:** Approved
**Goal:** Strengthen "simple, easy, cross-platform" messaging and improve overall look and feel.

---

## 1. Design Direction

**Option C — Platform Cards Hero** was selected.

Core principle: the hero section itself communicates cross-platform availability at a glance, with OS auto-detection driving a smart CTA. Every visual element reinforces three values: **simple**, **lightweight**, **native**.

---

## 2. Hero Section

### Headline
- **Before:** `Paint for / Every Platform`
- **After:** `One App. / Every Platform.` (gradient on "Every Platform.")
- Rationale: shorter, more confident, product-first framing.

### Eyebrow Badge
- Replace the removed hero-badge with a new static pill: `• Simple · Lightweight · Native`
- Style: existing `.hero-badge` CSS (blue tint, pill shape)

### Subtitle Copy
- **Before:** "A fast, lightweight image editor that runs natively on macOS, Windows, and Linux. Layers, selection tools, text formatting — everything you need, nothing you don't."
- **After:** "A fast, native image editor — no Electron, no JVM, no bloat. Just download and start creating."
- Rationale: leads with differentiators (no Electron, native), ends with ease ("just download").

### Platform Cards
Three cards displayed in a horizontal row directly in the hero. All icons are neutral flat SVGs styled with `stroke="var(--text)"` for dark/light mode compatibility — no emoji.

| Card | Icon source | viewBox | Name | Sub-label |
|------|-------------|---------|------|-----------|
| macOS | Generic monitor SVG, no Apple logo | `0 0 32 32` | macOS | Intel + Apple Silicon |
| Windows | Generic app-window SVG, no Windows logo | `0 0 32 32` | Windows | x64 Installer |
| Linux | Generic terminal SVG, no Tux or brand mark | `0 0 32 32` | Linux | deb · rpm · AppImage |

Use neutral SVG icons only. Do not use Apple, Windows, or Tux/Linux brand logos in platform cards unless a separate written license or verified attribution path is added.

- The card matching `detectOS()` gets `active` styling: blue border + `YOUR OS` ribbon badge.
- Cards are purely visual (not clickable links) — the CTA button handles the download.

### CTA Button
- **Before:** `Download`
- **After:** `Download for macOS` / `Download for Windows` / `Download for Linux` (OS-detected)
- Falls back to `Download` if OS not detected.
- Href points to `#download` (scroll) as before.

### Trust Signals
Three short items below the CTA button:
- `✓ Free forever`
- `✓ No account needed`
- `✓ Native binary`

### Removed
- `hero-version` paragraph (`Free · v0.1.0`) — replaced by trust signals above.

---

## 3. App Preview Section

### Window Chrome
The `.preview-chrome` CSS class exists but the HTML `div` was missing. Restore it:
```html
<div class="preview-chrome">
  <div class="chrome-dot r"></div>
  <div class="chrome-dot y"></div>
  <div class="chrome-dot g"></div>
  <span class="chrome-title">Paint.Cross — Untitled.paintx</span>
</div>
```
Add `.chrome-title` style: `font-size: 11px; color: var(--muted); margin: 0 auto;`

### Caption
Add a short line below the preview frame:
```
Native window — no browser shell, no Electron overhead
```
Style: `text-align: center; font-size: 13px; color: var(--muted); margin-top: 16px;`

---

## 4. Features Section

### Hover Glow Effect
Add a radial gradient pseudo-element to `.feature-card` that fades in on hover:
```css
.feature-card::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 80% at 50% 100%, rgba(91,141,239,.1), transparent);
  opacity: 0; transition: opacity .3s; pointer-events: none;
}
.feature-card:hover::before { opacity: 1; }
```
`position: relative` already on `.feature-card` — add `overflow: hidden`.

### Stats Bar Integration
Move the `.stats-bar` from a standalone `<div>` into the features `<section>`, placed after the features grid. Wrap in a container with `border-radius: 12px; border: 1px solid var(--border); overflow: hidden; margin-top: 40px;` to make it feel part of the section rather than a page divider.

Remove the outer `border-top` / `border-bottom` from `.stats-bar` since the container handles borders.

---

## 5. Download Section

### Version Badge Position
The `dl-version-badge` pill (added in a previous commit) stays below `section-sub`. No structural change needed — only confirm it is centered correctly.

### OS Highlight Ribbon
The `highlightPlatform()` JS function adds `.primary` class to the detected card, triggering the "Recommended" ribbon. Change the ribbon text from `Recommended` to a dynamic label:

```js
// In highlightPlatform():
if (card) {
  card.classList.add('primary');
  card.dataset.ribbon = labels[os]; // 'macOS' / 'Windows' / 'Linux'
}
```

Update the CSS `::before` content to use the data attribute:
```css
.dl-card.primary::before {
  content: attr(data-ribbon);
  /* existing positioning styles */
}
```

### Section Heading
- **Before:** "Available on every desktop"
- **After:** "Available on every desktop" *(unchanged — still accurate and clean)*

---

## 6. JavaScript Fixes

### Remove dead references
Two elements referenced in JS no longer exist in HTML:
1. `document.getElementById('version-badge')` — removed in a prior commit. Remove this line from `loadRelease()`.
2. `document.getElementById('hero-ver')` — inside the `hero-version` paragraph being removed. Remove this line from `loadRelease()` as well.

### Hero CTA label update
`highlightPlatform()` currently updates `hero-download` href but not the button label. Update it to also set the label:
```js
var heroDlLabel = document.getElementById('hero-dl-label');
if (heroDlLabel) heroDlLabel.textContent = labels[os];
```
This makes the hero CTA read "Download for macOS" etc. on page load.

---

## 7. Out of Scope

- No new sections added (no testimonials, no changelog, no pricing)
- Feature card content unchanged
- Footer unchanged
- No external dependencies added
- No change to scroll behavior or navigation structure

---

## 8. File Impact

Single file: `index.html` — all CSS and JS are inline.

Changes touch:
- CSS: `.hero-badge` (eyebrow), `.feature-card::before` (glow), `.preview-chrome` (chrome title), `.stats-bar` (integration), `.dl-card.primary::before` (ribbon)
- HTML: hero section rewrite, preview-chrome div restore, stats-bar relocation, dl-card ribbon attribute
- JS: `loadRelease()` dead reference removal, `highlightPlatform()` hero label update
