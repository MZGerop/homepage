# TFT Field Guide — Set 18

A self-contained, dependency-free Teamfight Tactics guide with an interactive **Opening Planner** to decide what to play from the items, champions, and Augments you actually find.

## Open

Open `index.html` in a modern browser or visit [GitHub Pages](https://mzgerop.github.io/homepage/) (if enabled). The app works without a server. Champion and item portraits are loaded from external sources and require internet access; text labels remain if they fail.

## Opening Planner — the new starting point

1. Add your **completed items** (multiple copies supported) and **loose components**.
2. Add your most important **champions**, choosing 1★ / 2★ / 3★.
3. Choose up to three **Augments** and your current stage.
4. Review the **five suggested compositions**, their fit reasons, craftable items, missing core units, and reroll/level advice.
5. Select **Open complete build** to navigate to that composition.

Four sample openings are included (AD, AP, Embiggen/Fae, and Rammus/Azir). A curated 13-Augment library includes Embiggen, Beast Within, economy Augments, and reroll Augments. This is not yet the complete Set 18 Augment catalog.

**Fit points are a heuristic, not a predicted win rate.** The algorithm scores exact item matches, potential component recipes, champion overlap/upgrades, and explicitly mapped Augment synergies. It cannot see contested units, your actual lobby, positioning, or live augment statistics. Avoid forcing an otherwise weak comp just because it tops the suggestions.

## Other sections

- 16 endgame directions spanning AD, AP, trait-flex, Fast 9 and reroll routes
- Champion roster with cost and practical tier filters
- 35 completed items, component lookup, and role-based item guidance
- Leveling/economy, roll-versus-level decisions and a win checklist
- Favorites, personal notes, match history, and JSON import/export

Personal selections and notes are stored locally in your browser. Export your data before clearing browser storage or changing devices.

## Updating content

Edit the data collections in `index.html`:

- `COMP_LIST`: composition boards, core units, item priorities, level, and traits
- `ROSTER_BY_COST`, `SPLUS`, `STIER`, `ATIER`, `CTIER`, `ROLES`: champion reference
- `ITEMS`, `COMPONENTS`: item recipes
- `AUGMENT_HINTS`: curated Augment names, descriptions and explicit scoring boosts
- `relevance(comp)`: explainable Opening Planner ranking
- `TIMELINE`, `CHECKS`: economy and checklist

The Opening Planner lives in a second inline `<script>` near the end of the file. No build process or backend is necessary.

## Versioning and limitations

Current reference patch: **Set 18, Patch 18.6 (November 2026)**. This is a manually curated snapshot, not a live meta feed. Source links are in the page; confirm tiers and numbers after patch updates. Item and Augment recommendations are contextual, not universal best-in-slot.

Unofficial fan-made reference. Not affiliated with Riot Games.
