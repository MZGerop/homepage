# TFT Field Guide — Set 18


## Guided opening homepage — v4.0 (7 November 2026)

The first screen is now a **guided first-three-round coach**, not a catalogue. It sits above the existing next-move dashboard and reuses the same local storage and Set 18 data.

- **Round-by-round:** one-click shortcuts for 2-1, 2-2 and 2-3 (plus the early Stage 3 rounds), a Next round button, and practical priorities for each round. Detailed shop odds and manual level controls remain available under a disclosure.
- **Pick your actual starter:** click a champion portrait after the first augment; the guide logs it as a 1★ unit without pretending that one extra copy is a 2★ upgrade. You can select additional champions through the complete gallery.
- **What to look for:** context-ranked route cards such as Veigar / Ornn, Blossom, Riftbeast, Fae, Elderwood and Primal. Each shows target champion portraits, a short reason, and **I found X** / **I made X 2★** actions. You may explore one direction, but the board remains flexible and the recommendations adjust to your recorded finds and chosen Augments.
- **Which augment:** at the top of the guided flow, see a *conditional* shortlist of useful Augments. Click **Compare my 3 real offers** to enter the specific Augments shown in-game; the page ranks only those actual offers in context and allows **Take** to record your choice. It never pretends you were offered an Augment.
- **Emblems are opportunistic:** the optional **I found an emblem** gallery has 20 Set 18 emblems (including four non-craftable ones). It never adds an emblem to the regular shopping watchlist and **does not invent a Riftbeast Emblem**. Once an emblem is logged, the page offers potential holders, cross-trait ideas and **Try this combo** → a follow-up list of units to look for. You can change ideas or remove the emblem; multiple copies are tracked.
- **Everything else still works:** item/component, champion, Augment, Artifact and Radiant pickers, full compositions, holder transitions, tier lists, tooltips, local save, notes and journal.

The recommendations are **curated heuristics**, not real-time game data or live win probabilities. The user must enter their own shop finds, offers, and emblems. Emblem suggestions are possibilities: check the current trait count, actual item slots and the in-game tooltip before committing.

Emblem references: [Set 18 recipes and holders (Mobalytics)](https://mobalytics.gg/tft/guides/set-18-emblems), [Set 18 emblem list (HexComps)](https://hexcomps.com/items/), [TFT 18.6 notes (Riot)](https://teamfighttactics.leagueoflegends.com/en-us/news/game-updates/teamfight-tactics-patch-18-6/).


A self-contained, dependency-free Teamfight Tactics guide built around **what to look for next**. Record the champions, components, items, and Augments you actually find and the next suggestions update automatically.

## Open

Open `index.html` in a modern browser or visit [GitHub Pages](https://mzgerop.github.io/homepage/) (if enabled). The app works without a server. Champion and item portraits are loaded from external sources and require internet access; text labels remain if they fail.

## New main workflow — What should I look for next? (v3.0)

The site is now a **live decision loop**, rather than a catalogue-first reference page. The homepage answers one actionable question: **What should I look for next?**

1. **Set your current stage, round and level** at the top. The guide uses the existing shop cost-tier probabilities, never a fabricated probability for one particular champion.
2. **Look at the three or four highlighted next targets**. They include obtainable champions, an item to build, a missing component, and the best offered Augment where appropriate. Each target has an image, a short explanation and a button such as **I found it**.
3. **Log what you actually find**, either from the recommendation card or by opening **＋ Add a find** and selecting the appropriate icon gallery: Champions, Components, Items, Artifacts, Radiants, or Augments. Champions can be set to ★, ★★, or ★★★; item counts support duplicates. If you craft a recommended item from two components, the **I crafted it** action consumes those two components in the planner and records the completed item.
4. **Recommendations recalculate immediately.** The homepage changes its shop targets, useful item recipes, and likely composition directions from your actual selections. The compact **What you already found** strip allows decrementing/removing a find without returning to the picker. When using the expanded picker, a sticky **See what to look for next** button returns to the updated plan.
5. **Then work toward** shows two plausible eventual builds, not a forced fixed comp. The complete composition guide opens on demand.

An Augment choice comes from **the three offers you enter**, not a fictional offer list; choosing it clears the obsolete three-offer selection for the next augment round.

The previous v2 controls and all stored data are still supported. Standard/right-click decrement, selection, star upgrades, Augment comparison, contextual icon explanations, the item/Artifact/Radiant tier lists, item-holder handoffs, full comp library, economy, notes, and match journal remain available under expandable **Log a find**, **Deep dive**, and **Full library** sections.

**Limits:** this is a curated heuristic using your inputs, not a live match tracker or win-rate forecast. It cannot see your actual shop, opponents, HP, gold, trait contesting, or real augment choices unless you record them. A target is something to consider when it appears, not a promise that the shop will offer it.

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

## Augment tiers, three-offer comparison and icon explanations (v2.0)

The Opening Planner includes a curated **Patch 18.6 Augment tier list (63 entries)**, sourced from [PivotTFT's Set 18 rankings](https://www.pivottft.com/augments/) as of 7 November 2026. The source has more than 249 ranked Augments; the guide shows a selected subset, **not** the complete game catalogue.

### Choosing between three Augments

- Under **Augments**, switch between **My Augments** (the three you already selected) and **Compare 3 offers** (the three offered in-game now).
- Choose up to three offer icons. A contextual recommendation compares **general patch tier**, your selected champions and items, your possible composition, **stage and level**, plus trait/strategy synergy.
- A situational S-tier trait Augment is penalized when you have none of its required trait units. The reason and warnings appear in short prose under the icon.
- **Mark as chosen** records your decision without deleting the other options. Existing saves migrate with a new `opening.augmentOffers` array. Clear opening resets both picked Augments and offered choices.
- Filter the Augment catalogue by **Silver / Gold / Prismatic**, category, name, or S / A / B / C tier.
- Entries no longer verified as live in Patch 18.6 are marked **Unranked / legacy** rather than assigned a fabricated tier. These remain readable if previously saved.

**Scores are heuristic fit comparisons, not win probabilities**, measured placements, or a game-data feed. They cannot know your opponents, current HP, streak, exact shop pool, or augment offers unless you enter them.

### Visual explanation system

- All item, component, Artifact, Radiant and Augment tiles, champion portraits, champion tier panels, champion-item recipes, shop targets, synergy combos, and item tier icons receive **short contextual explanations** when hovered or keyboard-focused.
- Explanations summarize what an item does, its two-component recipe where applicable, good holders, champion role and recommended items, or why an Augment is valuable.
- A **ⓘ Explain icons** toggle makes icons tap-to-explain instead of tap-to-select, which is more usable on touchscreens and for people who prefer visual reading. Switch it off to return to ordinary controls.
- Normal left-click +1 / right-click −1, champion star progression, and selected item quantities remain intact outside Explain mode.
- Missing Augment artwork falls back to a generic tier-colored icon rather than a broken image, and original item/Artifact icon fallbacks remain.

## Radiant item selection (v1.9)

- Added a dedicated **gold-bordered Radiant items** icon picker beside completed items and Artifacts, covering **36 regular Radiant upgrades** in Set 18. The separate single-use Radiant potions and Lucky Item Chest are intentionally excluded from this equipment picker.
- **Left click** adds one Radiant item; **right click** subtracts one. Counts cannot go negative, multiple copies are allowed, and a visible **−** button remains for touch. The same left/right controls work in the item/Artifact/**Radiant** tier list.
- Radiants have their own `opening.radiants` inventory field, stored in the existing local browser storage object. Existing selections migrate safely, and Clear opening resets Radiants too.
- A Radiant is **not a component recipe and not interchangeable with a normal copy in the inventory**. If a composition or champion would use the normal item, its Radiant counterpart receives an appropriate recommendation boost.
- Champion-specific cards show useful Radiant versions, with selected Radiants marked in green. Early/midgame item holders, shop targets and endgame fit rankings also recognize Radiants.
- The combo matcher accepts a Radiant upgrade as fulfilling the corresponding normal-item part, while displaying the upgraded icon in matched combinations.
- Radiant icon filenames are explicitly mapped for **30 entries**, using preserved historical CommunityDragon Riot imagery; newer items without confirmed Radiant artwork use the existing standard icon with a prominent golden Radiant marker, rather than broken-image placeholders.
- Radiant **S/A/B/C** tiers are based on a [Set 18 reference](https://tftguide.org/en/items/radiants) from a previous patch and should be treated as contextual, not live 18.6 win-rate rankings. Their source is linked in the page.

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

### Artifact images (fixed in v1.8.1)

The previous v1.8 icon links were incorrect: a speculative Mobalytics URL returned no images on the live site. Replaced it with **30 explicit paths verified from CommunityDragon's Riot image directory**:

- Primary: `raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/maps/tft/icons/items/hexcore/`.
- For Hullcrusher and Lich Bane: verified icons in CommunityDragon's `game/assets/maps/particles/tft/item_icons/ornn_items/`.
- **28 separately verified TFTPlus icon URLs** serve as automatic backup if an image cannot be loaded.
- Known non-obvious Riot filenames are explicitly mapped: Flickerblades = `tft_item_artifact_navoriflickerplade.png`, Statikk Shiv = `tft_item_artifact_stattikshiv.png`, and Manazane = `tft4_item_ornnmuramana.png`.
- The shared `artifactImgTag()` function is used in the Artifact picker, tier board, champion recommendations, holder suggestions, and synergy cards. All views use the same corrected paths.
- If both hosts are unavailable, visible text initials remain rather than a broken-image icon.

The URLs and filenames are verified from the provider's directory and a sample of directly opened images. A full browser/network test of all 30 images on the deployed GitHub Pages site is still recommended.


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
