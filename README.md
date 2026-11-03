# TFT Field Guide — Set 18

A one-file, dependency-free Teamfight Tactics cheat sheet for champion selection, team compositions, items, leveling, and late-game decisions.

## Open

Double-click `index.html` in any modern browser. The text, filters, checklists, favorites, and match journal work without a server. Portraits are hotlinked from HexComps, so they require an internet connection; built-in text initials are shown when the images cannot load.

## Contents

- Twelve endgame directions (AD, AP, Fast 9, and reroll), with team cores, traits, items, pivots, and links to detailed guides
- 65-champion shop roster, cost and practical tier filters
- 35 craftable items and a two-component recipe lookup
- Leveling curve, XP costs, interest rules, roll-versus-level decision helper
- Endgame checklist, favorites, personal notes, and match journal
- JSON import/export so you can carry your notes between browsers

## How to extend

Open `index.html` in an editor and edit the data objects near the start of the `<script>` tag:

- `COMP_LIST`: add, remove, and update compositions
- `ROSTER_BY_COST`, `SPLUS`, `STIER`, `ATIER`, `CTIER`, `ROLES`: champion roster, tiers, and roles
- `ITEMS`, `COMPONENTS`: item recipes and effects
- `TIMELINE`, `CHECKS`: leveling advice and checklists

Search, filters, cards and recipes are all generated from these collections. Save, refresh the browser, and you're done.

## Versioning and sources

This is a **static** snapshot, not a live meta tracker. Reference patch: Set 18, 18.5 / 18.5c, November 2, 2026. Source links are displayed in the page; confirm rankings after each patch.

Unofficial fan-made reference. Not affiliated with Riot Games.