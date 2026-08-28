# Melbourne cEDH League

Static landing page for Melbourne's competitive Commander (cEDH) tournament
scene. Plain HTML/CSS/JS, no build step, no backend — designed to be served
directly by GitHub Pages.

## Editing content

Everything editable lives in `content/*.yaml`. Edit a file, commit, push —
the page re-renders from it on load (no build/regeneration step required).

- **`content/description.yaml`** — the "The League" (About) section. A list
  of `{ title, body }` blocks, rendered in order. Add or remove blocks freely.
- **`content/contact.yaml`** — the "Contact" section: `{ heading, body,
  email }`. `email` renders as a `mailto:` link. **`email` ships as a
  placeholder (`hello@melbournecedh.example`) — swap it for the real
  contact address.**
- **`content/sessions.yaml`** — the "Sessions" list (standing weekly slots,
  not one-off events). Each entry is `{ time, title, description, location,
  address, discord_url, cta_label }`. `location` is `{ name, url }` (the
  venue's own site) and `address` is `{ text, url }` (the street address and
  a Google Maps pin link) — both optional, and independent of each other.
  Add more entries as more standing sessions exist; each renders as its own
  row with its own Discord button. **The shipped entry is a placeholder
  venue — swap in the league's real location.**
- **`content/more-info.yaml`** — the `info.html` page: `primer` (a list of
  `{ title, body }` format-explainer blocks), `faq` (a list of
  `{ question, answer }` pairs, rendered as an accordion), and `doc`
  (`{ label, url, note }`) for the "open the rules doc" button, linking to
  the league's Google Doc.

YAML is parsed in the browser with a vendored copy of
[js-yaml](https://github.com/nodeca/js-yaml) (`vendor/js-yaml.min.js`) — no
CDN dependency, works offline, nothing to install.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages** and set the source to **Deploy from
   a branch**, branch `main` (or whichever default branch), folder `/ (root)`.
3. That's it — no Actions workflow needed. Pushing to that branch updates
   the live site directly, including content edits.

`.nojekyll` is present so GitHub Pages serves the files as-is instead of
running them through Jekyll.

## Design notes

The palette (`navy #003366`, `red #cc0033`, `white`) is sampled directly
from `logo.png`, an MLB-style crest for the club. The whole page borrows
its structural language from a sports league: a rounded, keylined "patch"
frame (the signature element — used for the header lockup, hero mark, and
the More Info doc callout) and a navy/white/red diagonal band as the
section divider, echoing the logo's own diagonal split. `logo.png` lives
at the repo root and is referenced directly by both pages — it's the
client's own artwork, not a placeholder.

The header nav separates in-page anchors from the cross-page "More Info"
link with a thin divider and a ↗ glyph, since it's the one nav item that
actually leaves the page rather than scrolling to a section.

Fonts: [Big Shoulders Display](https://fonts.google.com/specimen/Big+Shoulders+Display)
for nameplate-style headings, [Barlow](https://fonts.google.com/specimen/Barlow)
for body copy, [Barlow Semi Condensed](https://fonts.google.com/specimen/Barlow+Semi+Condensed)
for stat-label/utility text (nav, dates, handles) — loaded from Google Fonts.

## Pages

- `index.html` — The League (about), Contact, Sessions (standing weekly slots).
- `info.html` — Format Primer, FAQ, and the rules-doc button.
