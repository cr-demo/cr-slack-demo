# Cakes & Cocktails

A lightweight, collaborative recipe book for the CodeRabbit + Slack booth demo.

## Open it
Download and extract this folder. Double-click **index.html** in a current Chrome, Safari, Firefox, or Edge browser. That's it: no install, server, build, account, network request, or internet connection needed. Keep the files together.

The illustrations are local inline SVG; typography uses system fonts. There are no photos, tracking pixels, analytics, CDN scripts, or external assets. Favorites are stored only in that browser; if storage is blocked, they work for the current page session.

## What works
- Six starter recipes: three cakes, two alcoholic cocktails, and one alcohol-free drink.
- Search titles, descriptions, ingredients, and tags.
- Category and saved-recipe filters.
- Recipe dialogs with ingredients, instructions, yield, and contributor credit.
- Local saved favorites, keyboard-accessible dialogs, mobile layouts, and reduced-motion support.
- “Add your flavor” explains the Slack contribution flow and offers a prompt to copy. This is guidance, not a fake Slack integration.

## Put it in your demo repo
1. Copy this folder's contents to a new GitHub repo; commit and push.
2. Connect that repo to CodeRabbit and the booth Slack code channel using your normal CodeRabbit setup.
3. Keep **AGENTS.md** in the repo root. Tell CodeRabbit to follow it when adding recipes.
4. Clone the repo onto the booth laptop and open its index.html.
5. After an authorized merge, run `git pull --ff-only` in the clean booth checkout, then refresh the page. If a stale file remains, use a hard refresh.

This deliverable does not install the Slack app, configure credentials, implement Drive to completion, or configure message-pattern automations. Those remain features of your connected agent setup.

## Recipe contributions
**Read AGENTS.md first.** It defines the exact editing procedure and schema. `docs/recipe-template.json` is a complete rum Old Fashioned example. That recipe is deliberately absent from the starter collection so visitors can add it live.

Recipe requests normally change only `recipes.js`. No registration, build, or renderer changes are required. Use contributor names only when explicitly provided. The UI always reads committed recipe data, never localStorage recipes.

Optional development checks (Node.js; not required to open the app):

```sh
node tools/validate-recipes.cjs
node --check app.js
node --check recipes.js
```

The validator checks data structure, not culinary correctness or dietary accuracy; review those in the PR. Before merging concurrent PRs touching recipes.js, resolve conflicts and rerun it.

## Files
- index.html — page structure
- styles.css — responsive design
- recipes.js — authoritative recipe data
- app.js — rendering, built-in SVG art, search, favorites, and dialogs
- AGENTS.md — instructions for CodeRabbit and other coding agents
- docs/recipe-template.json — copyable schema example
- docs/demo-canvas.md — pinned Slack walkthrough and presenter notes
- tools/validate-recipes.cjs — optional data integrity check

## Offline and performance
The app uses only four runtime files. Artwork is vector markup within app.js; there are no image downloads. The page does not poll, sync, or call APIs. Conference Wi-Fi is needed for Slack and Git, not for displaying or exploring the cookbook. No real-user performance measurements are claimed.
