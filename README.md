# Melbourne cEDH League

Static landing page for Melbourne's competitive Commander (cEDH) tournament
scene. Plain HTML/CSS/JS, no build step, no backend — designed to be served
directly by GitHub Pages.

## Editing content

Everything editable lives in `content/*.yaml`. Edit a file, commit, push —
the page re-renders from it on load (no build/regeneration step required).

- **`content/description.yaml`** — the "The League" (About) section. A list
  of `{ title, body }` blocks, rendered in order. Add or remove blocks freely.
- **`content/organisers.yaml`** — the "Front Office" (organiser/host) list. A
  list of `{ name, role, discord_handle, discord_url }` — `role` is optional.
  To get a stable `discord_url` for someone, enable Developer Mode in
  Discord, right-click their name, "Copy User ID", and use
  `https://discord.com/users/<id>`.
- **`content/events.yaml`** — the "Schedule" (event list). Each entry is
  `{ title, date, venue, description, discord_url, cta_label }` — `date` and
  `venue` are optional. Add more entries as more events show up; each
  renders as its own row with its own Discord button.
- **`content/more-info.yaml`** — the `info.html` page: `primer` (a list of
  `{ title, body }` format-explainer blocks), `faq` (a list of
  `{ question, answer }` pairs, rendered as an accordion), and `doc`
  (`{ label, url, note }`) for the "open the rules doc" button. **`doc.url`
  ships as a placeholder — swap it for the real Google Doc link.**

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
frame (the signature element — used for the header lockup, hero mark,
roster monograms, and the More Info doc callout) and a navy/white/red
diagonal band as the section divider, echoing the logo's own diagonal
split. `logo.png` lives at the repo root and is referenced directly by both
pages — it's the client's own artwork, not a placeholder.

Fonts: [Big Shoulders Display](https://fonts.google.com/specimen/Big+Shoulders+Display)
for nameplate-style headings, [Barlow](https://fonts.google.com/specimen/Barlow)
for body copy, [Barlow Semi Condensed](https://fonts.google.com/specimen/Barlow+Semi+Condensed)
for stat-label/utility text (nav, dates, handles) — loaded from Google Fonts.

## Pages

- `index.html` — The League (about), Front Office (organisers), Schedule (events).
- `info.html` — Format Primer, FAQ, and the rules-doc button.
