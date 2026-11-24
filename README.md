# Menu Planner

A static menu-planning webapp with a Supper Club theme - no build step or backend. GSAP is bundled locally, so animations, recipes, and planning work without runtime downloads. Plan a single meal, a full day, or a full week from a searchable recipe library.

## Use it

Open `index.html` in a browser (or visit the GitHub Pages site once deployed).

1. **Plan**: choose what you're planning (Meal / Day / Week) and how (Autogenerate / Manual).
   - Autogenerate lets you optionally include/exclude tags first (click a tag once to include, again to exclude, a third time to clear). For Single meal, Meal of Fortune spins to pick your meal; Full day and Full week fill the plan directly.
   - Manual starts every slot empty.
   - Every meal keeps Add dish, Regenerate, and Clear controls, plus dish/meal notes and drag-and-drop ordering.
2. **Recipe library**: search and filter dishes, open a recipe, print its recipe card, or add it to your current plan. Weekly plans offer separate day and Lunch/Dinner choices; duplicate dishes in a meal are prevented.
3. **Weekly menus**: reopen saved weekly plans in the regular editor. The Word-menu template shelf is ready for the user's supplied menus; reusable templates belong in `MP_WEEKLY_MENUS` in `js/weekly-menus.js`. It intentionally starts empty and does not import unknown Word layouts automatically.

**Save plan** creates a named snapshot. Opening it allows **Save changes** or **Save a copy**. **Export Menu** downloads a genuine, text-only `.docx` using `js/word-export.js`: notes, custom dishes, and manual order stay inside one file, with no companion asset directory. **Print Menu** still uses the printer-friendly on-screen plan.

Run the regression checks with `node --test tests/core.test.cjs`.

Your current plan is saved automatically in your browser (`localStorage`) as you edit it — reload the page and it's still there. "Start Over" clears it.

## Add your own menu items

Edit `js/data.js` — it's a plain array (`MP_ITEMS`). Each item needs an `id` (unique), a `name`, and a `tags` array. `image` (a path into `/images`) and `recipe` (`{ ingredients: [...], steps: [...] }`) are both optional — omit them entirely if you don't have one.
