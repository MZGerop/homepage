# TFT Field Guide — Set 18

A self-contained, dependency-free Teamfight Tactics guide with an interactive **Opening Planner** to decide what to play from the items, champions, and Augments you actually find.

## Open

Open `index.html` in a modern browser or visit [GitHub Pages](https://mzgerop.github.io/homepage/) (if enabled). The app works without a server. Champion and item portraits are loaded from external sources and require internet access; text labels remain if they fail.

## Opening Planner — icon-based controls (v1.3)

The planner is visual-first for fast use while playing, with **no dropdowns for selecting items, champions, or Augments**:

- **Completed items:** click the item's TFT icon once per copy. Its badge shows the quantity; press **−** on a selected tile to remove one. Use the AD / AP / Tank / Utility icon gallery filters or optional search.
- **Components:** eight recognizable component icons. Click repeatedly to add duplicates; the badge shows the current count. Loose components affect craftable-item suggestions.
- **Champions:** click a champion portrait to select it at 1★, then tap **★, ★★, or ★★★** underneath to set the star level. Selected champions are also visible in a compact row. Filter by cost (1–5g), use the Early 1–3g view, or search.
- **Augments:** click the actual Augment artwork to select or deselect it (maximum 3). Filter by Trait / Economy / Team / Item. Hover or focus for a short description. The current stage is also chosen using buttons.
- Four example openings (AD, AP, Embiggen/Fae, Rammus/Azir) and a Clear opening control remain available.

The five suggested compositions update immediately. Explanations show matching items, craftable recipes, upgraded champions, useful Augments, and missing units. Your existing opening, favorites, notes, and match journal continue using the same browser storage key.

**Fit scores are not live win probabilities.** They're an explainable heuristic, and the planner cannot detect contested units, current opponent boards, or actual Augment win rates.

## Item holder and transition guide (v1.4)

The Opening Planner also recommends **individual champions**, not only complete endgame boards. It uses the selected completed items, any craftable items from loose components, and the star level of champions you already have.

- **Early (mostly 1-cost):** Suggested item holders such as Xayah for Guinsoo / Kraken, Varus for Shojin / Last Whisper, Karma or Veigar for AP, and Ornn for tank equipment.
- **Midgame (2–3 cost):** Suggested upgrades such as Yunara, Teemo, Kayle, Azir, Mama Beak, and Rammus.
- Each champion card includes a portrait, cost, role, compatible items, a visual **champion → upgrade → late carry** chain, and a link to a relevant endgame composition.
- Multiple matching items receive more weight, while a champion you already own at 2★ or 3★ gets a significant bonus.
- Shows what you can craft from available components, but does not automatically consume them.
- The system uses 25 curated champion handoffs. These are flexible recommendations, not rankings based on live match data. Don't sell a strong 2★ for an unupgraded replacement.

**Example:** Spear of Shojin + Last Whisper → Varus (early) → Yunara (midgame) → Ezreal (endgame). Guinsoo + Kraken → Xayah → Mama Beak → Draven. Gargoyle + Warmog → Ornn → Rammus → Maokai.

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

The visual Opening Planner lives in a second inline `<script>` near the end of the file. No build process or backend is necessary.

## Versioning and limitations

Current reference patch: **Set 18, Patch 18.6 (November 2026)**. This is a manually curated snapshot, not a live meta feed. Source links are in the page; confirm tiers and numbers after patch updates. Item and Augment recommendations are contextual, not universal best-in-slot.

Unofficial fan-made reference. Not affiliated with Riot Games.
