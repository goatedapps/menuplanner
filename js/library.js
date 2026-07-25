// Controller for library.html: search/filter the item list and show a
// read-only detail view (image/recipe or graceful fallbacks) per item.

let mpLibraryTagFilters = [];

// Broad browsing categories for the library grid — distinct from
// MP_SUBTYPE_GROUPS/getDishGroup() in data.js (which is a rule-engine
// concept). Every item lands in exactly one category, decided by this
// priority order (first match wins): one-dish meal, soup, poultry, other
// meat, seafood, vegetarian-or-almost, others. "Vegetarian (or almost)"
// deliberately catches vegetable/mushroom/tofu/egg dishes even when they
// aren't strictly meat-free (e.g. a little chicken stock or oyster sauce) —
// the household doesn't track strict vegetarian purity, so subType/tags are
// used as a practical proxy rather than a literal vegetarian-tag check.
const MP_LIBRARY_CATEGORIES = [
  { key: "one-dish", label: "One-Dish Meals" },
  { key: "soup", label: "Soups" },
  { key: "poultry", label: "Poultry" },
  { key: "other-meat", label: "Other Meat (Beef/Pork)" },
  { key: "seafood", label: "Seafood" },
  { key: "vegetarian", label: "Vegetarian (or almost)" },
  { key: "others", label: "Others" }
];

function getLibraryCategory(item) {
  if (item.dishType === "one-dish") return "one-dish";
  if (getDishGroup(item.subType) === "soup") return "soup";
  if (item.subType === "chicken" || item.subType === "duck") return "poultry";
  if (item.subType === "beef" || item.subType === "pork") return "other-meat";
  if (item.tags.includes("seafood")) return "seafood";
  if (
    getDishGroup(item.subType) === "vegetable" ||
    item.subType === "tofu" ||
    item.subType === "egg" ||
    item.tags.includes("vegetarian") ||
    item.tags.includes("vegan")
  ) {
    return "vegetarian";
  }
  return "others";
}

document.addEventListener("DOMContentLoaded", () => {
  renderLibraryTags();
  renderLibraryGrid();
  document.getElementById("mp-library-search").addEventListener("input", renderLibraryGrid);
});

function renderLibraryTags() {
  const container = document.getElementById("mp-library-tags");
  container.innerHTML = "";
  getAllTags(MP_ITEMS).forEach(tag => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "mp-chip";
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      const idx = mpLibraryTagFilters.indexOf(tag);
      if (idx >= 0) {
        mpLibraryTagFilters.splice(idx, 1);
        chip.classList.remove("mp-chip-active");
      } else {
        mpLibraryTagFilters.push(tag);
        chip.classList.add("mp-chip-active");
      }
      renderLibraryGrid();
    });
    container.appendChild(chip);
  });
}

function renderLibraryGrid() {
  const searchText = document.getElementById("mp-library-search").value;
  const results = filterItems(MP_ITEMS, { searchText, tagFilters: mpLibraryTagFilters });

  const container = document.getElementById("mp-library-results");
  container.innerHTML = "";

  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "mp-empty-note";
    empty.textContent = "No items match your search/filters.";
    container.appendChild(empty);
    return;
  }

  MP_LIBRARY_CATEGORIES.forEach(category => {
    const categoryItems = results.filter(item => getLibraryCategory(item) === category.key);
    if (categoryItems.length === 0) return;

    const section = document.createElement("details");
    section.className = "mp-library-category";
    section.open = true;

    const heading = document.createElement("summary");
    heading.className = "mp-library-category-heading";
    heading.textContent = `${category.label} (${categoryItems.length})`;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "mp-library-grid";
    categoryItems.forEach(item => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "mp-item-card";
      card.innerHTML = `
        <div class="mp-item-thumb"></div>
        <div class="mp-item-name">${item.name}</div>
        <div class="mp-item-tags">${item.tags.join(", ")}</div>
      `;
      renderItemThumb(card.querySelector(".mp-item-thumb"), item);
      card.addEventListener("click", () => openItemDetail(item));
      grid.appendChild(card);
    });
    section.appendChild(grid);
    container.appendChild(section);
  });
}

function ensureDetailDom() {
  if (document.getElementById("mp-detail-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "mp-detail-overlay";
  overlay.className = "mp-modal-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="mp-modal" role="dialog" aria-modal="true" aria-labelledby="mp-detail-title">
      <div class="mp-modal-header">
        <h2 id="mp-detail-title"></h2>
        <button type="button" class="mp-modal-close" aria-label="Close">&times;</button>
      </div>
      <div id="mp-detail-body"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector(".mp-modal-close").addEventListener("click", () => { overlay.hidden = true; });
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.hidden = true;
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") overlay.hidden = true;
  });
}

function openItemDetail(item) {
  ensureDetailDom();
  const overlay = document.getElementById("mp-detail-overlay");
  document.getElementById("mp-detail-title").textContent = item.name;

  let html = `<div class="mp-detail-tags">${item.tags.join(", ")}</div>`;
  html += `<img class="mp-detail-image" id="mp-detail-image-el" alt="${item.name}">`;

  if (item.recipe) {
    html += `<div class="mp-detail-recipe">`;
    if (item.recipe.ingredients && item.recipe.ingredients.length) {
      html += `<h3>Ingredients</h3><ul>${item.recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>`;
    }
    if (item.recipe.steps && item.recipe.steps.length) {
      html += `<h3>Steps</h3><ol>${item.recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
    }
    html += `</div>`;
  } else {
    html += `<p class="mp-empty-note">No recipe available.</p>`;
  }

  document.getElementById("mp-detail-body").innerHTML = html;

  const img = document.getElementById("mp-detail-image-el");
  img.onerror = () => {
    const placeholder = document.createElement("div");
    placeholder.className = "mp-detail-placeholder";
    placeholder.textContent = "🍽️";
    img.replaceWith(placeholder);
  };
  img.src = getItemImagePath(item);

  overlay.hidden = false;
}
