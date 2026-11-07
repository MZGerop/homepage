# TFT Field Guide — Set 18

A self-contained, dependency-free Teamfight Tactics guide with an interactive **Opening Planner** to decide what to play from the items, champions, and Augments you actually find.

## Open

Open `index.html` in a modern browser or visit [GitHub Pages](https://mzgerop.github.io/homepage/) (if enabled). The app works without a server. Champion and item portraits are loaded from external sources and require internet access; text labels remain if they fail.

## Opening Planner — icon-based controls (v1.3)

The planner is visual-first for fast use while playing, with **no dropdowns for selecting items, champions, or Augments**:

- **Completed items and Artifacts:** click the icon once per copy. Artifacts have a separate visual picker and cannot be crafted. Its badge shows the quantity; press **−** on a selected tile to remove one. Use the AD / AP / Tank / Utility icon gallery filters or optional search.
- **Components:** eight recognizable component icons. Click repeatedly to add duplicates; the badge shows the current count. Loose components affect craftable-item suggestions.
- **Champions:** click a champion portrait to select it at 1★, then tap **★, ★★, or ★★★** underneath to set the star level. Selected champions are also visible in a compact row. Filter by cost (1–5g), use the Early 1–3g view, or search.
- **Augments:** click the actual Augment artwork to select or deselect it (maximum 3). Filter by Trait / Economy / Team / Item. Hover or focus for a short description. The current stage is also chosen using buttons.
- Four example openings (AD, AP, Embiggen/Fae, Rammus/Azir) and a Clear opening control remain available.

The five suggested compositions update immediately. Explanations show matching items, craftable recipes, upgraded champions, useful Augments, and missing units. Your existing opening, favorites, notes, and match journal continue using the same browser storage key.

**Fit scores are not live win probabilities.** They're an explainable heuristic, and the planner cannot detect contested units, current opponent boards, or actual Augment win rates.

## Mouse shortcuts for the visual planner (v1.5)

The item, component, champion, and Augment icons support quick **left/right mouse clicks**:

| Tile | Left click | Right click |
| --- | --- | --- |
| Completed item | Add one copy | Remove one copy |
| Loose component | Add one copy | Remove one copy |
| Champion portrait | Increase the star level: none → 1★ → 2★ → 3★ (max) | Decrease stars: 3★ → 2★ → 1★ → removed |
| Augment artwork | Select or deselect | Deselect if chosen |

The browser's context menu is suppressed **only for these interactive planner controls**. All changes update the recommendations and are saved locally.

For touchscreen, keyboard, or accessibility use, visible **−** controls and direct 1★ / 2★ / 3★ buttons remain. The selected champion row has **×** to remove a champion entirely.

## Round-aware planner, tier lists, and strong combos (v1.8)

The visual Opening Planner retains its existing icons and saved selections, with three new decision aids:

### Round and level selector

- Choose **Stage 2–6**, the **round within that stage (1–7)**, and **your current player level (3–10)** using buttons at the top. Switching the stage suggests a typical level; selecting a level manually overrides it.
- View **shop cost-tier percentages** (chance per slot to roll a 1/2/3/4/5-cost champion) with a brief roll-versus-level recommendation.
- A **six-champion shortlist** prioritizes units whose cost is realistically obtainable now, with extra weight for the items/Artifacts and star-upgraded champions you already have. It doesn't claim a probability for any specific champion, and cannot see contested shops.
- The complete endgame build rankings still show long-term destinations, but expensive Level 9 boards receive a small early-game score penalty.

Source for Set 18 shop odds: [TFTClimb shop odds](https://www.tftclimb.com/cheatsheet/tft-shop-odds). Some third-party reference tables differ on Level 7 odds; verify against the current client if precision is critical.

### Item and Artifact tiers

- View **35 standard items** and **30 Artifacts** grouped into **S / A / B / C** with actual item artwork, as a **Patch 18.6 snapshot**.
- Filter by item type, tier, or **Mine / craftable**, which highlights the items you own or can make.
- You can click an item directly in this tier list to add a copy to your planner, using the existing picker storage.
- The same tier letters appear on icon tiles so you can judge your choices without opening another page.
- Tiers are general guidance, not universal best-in-slot. A B-tier Artifact may be the correct choice for a specific champion.

Source: [PivotTFT items, 18.6](https://www.pivottft.com/items/).

### High-synergy combinations

- **14 curated interactions** connect a specific champion with normal items and/or Artifacts. Examples: Kayle + Flickerblades + Guinsoo, Master Yi + Wit's End + Edge of Night, Veigar + Dawncore + Jeweled Gauntlet, Rammus + Gargoyle + Lightshield Crest.
- A rare **Aegis of Dawn + Aegis of Dusk** pairing is included because the two Artifacts explicitly accelerate each other's effects.
- Combo cards show portraits and item artwork, mark owned or craftable pieces, show **how many pieces of the combination you have**, and link to a related endgame build.
- Choose **Matches my opening** to focus on actionable combinations rather than every available interaction.
- A combo is a situational play suggestion, not a promised win, exploit, or a live win-rate ranking.

Source for Artifact effects and holders: [Mobalytics Set 18 Artifacts](https://mobalytics.gg/tft/items/artifacts) and [Artifact Guide](https://mobalytics.gg/tft/guides/set-18-artifact-guide).

### Artifact images

Artifact icons now use the **actual Set 18 image filenames** from Mobalytics' item image library rather than generating guessed HexComps filenames. All 30 images have explicit slug mappings, including special cases like `flickerblade`, `wits-end1` and `luden's-tempest1`. The browser retains visible initials if an external host is unavailable.

## Artifact support (v1.7)

The Opening Planner now has a separate **Artifact** visual picker below Augments, with all **30 Set 18 Artifacts** and searchable AD / AP / Tank / Utility filters. These are special Armory/Anvil items and **cannot be crafted from components**.

- **Left-click** an Artifact icon to add one copy; **right-click** to remove one copy. Quantity badges and a touch-friendly minus button work like standard items.
- A **Who should hold my Artifacts?** recommendation section shows matching early (1–2-cost), midgame (3-cost), and late-game (4–5-cost) holders. Star-upgraded champions you already own receive extra preference.
- The **What items should I build for my champions?** cards also display each champion's top-three curated Artifact options and highlight Artifacts already in your inventory.
- Artifacts influence the endgame composition fit scores when a carry/frontline unit in a recommended comp is a suitable holder. A short reason explains the specific Artifact-to-champion match.
- All 65 shop-roster champions have curated Artifact candidates, based on the Set 18 Artifact guide updated November 4, 2026. See [Mobalytics Set 18 Artifact Guide](https://mobalytics.gg/tft/guides/set-18-artifact-guide) and [HexComps Artifact Catalogue](https://hexcomps.com/team-builder/).
- Existing local selections and JSON import/export are preserved. Reset clears Artifacts together with your other selections.

**Limitations:** These are useful holder pairings, not guaranteed best-in-slot or live win probabilities. Some champions have alternative AP/AD builds that need different Artifacts. Artifact images use externally hosted sources and fall back to text initials if a source is unavailable.

## Champion-first item recommendations (v1.6)

Select one or more champion portraits in the **Opening Planner**. A new **What items should I build for my champions?** section automatically displays visual item suggestions for each selected unit, even when you have no items.

- Recommended completed items with icons and their **two component recipes** as small icons
- Inventory-aware badges: **Have ×N**, **Can craft**, or **Need parts** (hover the item row for the missing components)
- Already-owned and craftable items are shown first, so you can choose realistic items during Stage 2–4
- A champion portrait, cost, ★/★★/★★★, short role description, possible item handoff, and link to a relevant endgame build
- **25 champion-specific item-holder profiles**, **16 general early-champion role profiles**, and comp-based suggestions for later champions
- No new dropdowns: this section updates from the existing visual picker using left/right click

The recommendation library is curated and heuristic, **not live best-in-slot**. General role-based suggestions are labeled. Crafting availability is checked against the loose components you entered, but the planner does not spend components or reserve an item for one champion. Multiple champions may show the same candidate item.

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

Current reference patch: **Set 18, Patch 18.6 (November 7, 2026)**. This is a manually curated snapshot, not a live meta feed. Source links are in the page; confirm tiers and numbers after patch updates. Item and Augment recommendations are contextual, not universal best-in-slot.

Unofficial fan-made reference. Not affiliated with Riot Games.
