// Controller for library.html: search/filter the item list and show a
// read-only detail view (image/recipe or graceful fallbacks) per item.

let mpLibraryTagFilters = [];

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

  const grid = document.getElementById("mp-library-grid");
  grid.innerHTML = "";

  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "mp-empty-note";
    empty.textContent = "No items match your search/filters.";
    grid.appendChild(empty);
    return;
  }

  results.forEach(item => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "mp-item-card";
    card.innerHTML = `
      <div class="mp-item-thumb">${item.image ? `<img src="${item.image}" alt="">` : "🍽️"}</div>
      <div class="mp-item-name">${item.name}</div>
      <div class="mp-item-tags">${item.tags.join(", ")}</div>
    `;
    card.addEventListener("click", () => openItemDetail(item));
    grid.appendChild(card);
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
  html += item.image
    ? `<img class="mp-detail-image" src="${item.image}" alt="${item.name}">`
    : `<div class="mp-detail-placeholder">🍽️</div>`;

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
  overlay.hidden = false;
}
