# Melbourne cEDH League

Static landing page for Melbourne's competitive Commander (cEDH) tournament
scene. Plain HTML/CSS/JS, no build step, no backend — designed to be served
directly by GitHub Pages.

## Editing content

Everything editable lives in `content/*.yaml`. Edit a file, commit, push —
the page re-renders from it on load (no build/regeneration step required).

- **`content/description.yaml`** — the "About" section. A list of
  `{ title, body }` blocks, rendered in order. Add or remove blocks freely.
- **`content/organisers.yaml`** — the organiser/host list. A list of
  `{ name, discord_handle, discord_url }`. To get a stable `discord_url` for
  someone, enable Developer Mode in Discord, right-click their name, "Copy
  User ID", and use `https://discord.com/users/<id>`.
- **`content/events.yaml`** — the event list. Currently one entry with a
  deep link into the event's Discord channel
  (`{ title, description, discord_url, cta_label }`). Add more entries as
  more events show up; each renders as its own card with its own button.

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

The palette and type treatment are inspired by `aesthetic-vibe.jpg` (a gig
poster) — neon violet/magenta/acid-green on near-black, with a
screen-print "misregistration" effect on headings (offset colour layers
behind the main text) standing in for the poster's grainy, off-register
riso-print look. That reference image is someone else's artwork and isn't
used as a site asset, only as design inspiration.

Fonts: [Bungee / Bungee Shade](https://fonts.google.com/specimen/Bungee)
for display type, [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
for body copy, [Space Mono](https://fonts.google.com/specimen/Space+Mono)
for labels — loaded from Google Fonts.
