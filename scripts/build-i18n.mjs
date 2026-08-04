/**
 * Prerenders the landing page into per-language static pages (/ko/, /ja/, …).
 *
 * index.html stays the single source of truth: this script loads it in a real
 * browser, runs the SAME applyLanguage() the live page uses, localizes the
 * <head> (title/meta/OG/JSON-LD/canonical) from the page's own i18n dicts,
 * injects the hreflang alternates, and serializes the DOM to <lang>/index.html.
 *
 * Run from the repo root after any content change:
 *   PLAYWRIGHT_BROWSERS_PATH=0 node scripts/build-i18n.mjs
 *
 * Playwright is resolved from the Paint.Cross app repo's node_modules — this
 * repo intentionally has no install step.
 */
import { createRequire } from 'module';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const require2 = createRequire('/Users/joon/Documents/Repos/Tools/Paint.Cross/package.json');
const { chromium } = require2('@playwright/test');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://paintcross.github.io';
const LANGS = ['ko', 'zh', 'es', 'ar', 'hi', 'ja', 'fr', 'de', 'pt'];
const ALL = ['en', ...LANGS];
const PORT = 8437;

const MIME = { '.html': 'text/html', '.png': 'image/png', '.webp': 'image/webp', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  res.end(fs.readFileSync(file));
});
await new Promise((r) => server.listen(PORT, r));

const langUrl = (lang) => (lang === 'en' ? `${SITE}/` : `${SITE}/${lang}/`);
const hreflangBlock = () =>
  ALL.map((l) => `<link rel="alternate" hreflang="${l}" href="${langUrl(l)}" />`).join('\n  ')
  + `\n  <link rel="alternate" hreflang="x-default" href="${SITE}/" />`;

const browser = await chromium.launch();
const page = await browser.newPage();
// Keep builds deterministic and inside the API rate limit: the release badge
// falls back to its hardcoded values; the live page refreshes them at runtime.
await page.route('**/api.github.com/**', (route) => route.abort());

for (const lang of LANGS) {
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300);
  const html = await page.evaluate(([lang, hreflangs, pageUrl]) => {
    applyLanguage(lang);
    const dict = Object.assign({}, I18N.en, I18N[lang] || {});
    const q = (sel) => document.head.querySelector(sel);

    // Localized head
    if (dict.pageTitle) document.title = dict.pageTitle;
    if (dict.metaDescription) q('meta[name="description"]').setAttribute('content', dict.metaDescription);
    if (dict.pageTitle) {
      q('meta[property="og:title"]').setAttribute('content', dict.pageTitle);
      q('meta[name="twitter:title"]').setAttribute('content', dict.pageTitle);
    }
    if (dict.ogDescription) {
      q('meta[property="og:description"]').setAttribute('content', dict.ogDescription);
      q('meta[name="twitter:description"]').setAttribute('content', dict.ogDescription);
    }
    q('link[rel="canonical"]').setAttribute('href', pageUrl);
    q('meta[property="og:url"]').setAttribute('content', pageUrl);
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (ld && dict.jsonldDescription) {
      const data = JSON.parse(ld.textContent);
      data.description = dict.jsonldDescription;
      data.url = pageUrl;
      ld.textContent = JSON.stringify(data, null, 2);
    }

    // hreflang alternates (replace any previous set)
    document.head.querySelectorAll('link[hreflang]').forEach((el) => el.remove());
    q('link[rel="canonical"]').insertAdjacentHTML('afterend', '\n  ' + hreflangs);

    // Build-machine locale must not leak into the output
    document.querySelectorAll('.lang-suggest').forEach((el) => el.remove());

    return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
  }, [lang, hreflangBlock(), langUrl(lang)]);

  const dir = path.join(ROOT, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Wrote ${lang}/index.html (${(html.length / 1024).toFixed(0)} KB)`);
}

await browser.close();
server.close();
console.log('Done. Remember: the root index.html carries its own static hreflang block.');
