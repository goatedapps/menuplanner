# Menu Planner

A static menu-planning webapp — no build step, no backend, no dependencies. Plan a single meal, a full day, or a full week by autogenerating from tags or building it by hand, picking from a searchable, tagged library of menu items.

## Use it

Open `index.html` in a browser (or visit the GitHub Pages site once deployed).

1. **Plan**: choose what you're planning (Meal / Day / Week) and how (Autogenerate / Manual).
   - Autogenerate lets you optionally include/exclude tags first (click a tag once to include, again to exclude, a third time to clear), then fills every slot for you.
   - Manual starts every slot empty.
   - Either way, every slot has a "Change"/"Choose" button to search the library and (re)assign it at any time.
2. **Library**: browse all menu items, search by name, filter by tag, and click an item to see its full tags, image (if any), and recipe (if any).

Your current plan is saved automatically in your browser (`localStorage`) as you edit it — reload the page and it's still there. "Start Over" clears it.

## Add your own menu items

Edit `js/data.js` — it's a plain array (`MP_ITEMS`). Each item needs an `id` (unique), a `name`, and a `tags` array. `image` (a path into `/images`) and `recipe` (`{ ingredients: [...], steps: [...] }`) are both optional — omit them entirely if you don't have one.
