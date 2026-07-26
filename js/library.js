// Controller for library.html: search/filter the item list and show a
// read-only detail view via openItemDetail() (js/detail.js — shared with
// picker.js, which adds an "Add to this meal" action to the same modal).
// MP_LIBRARY_CATEGORIES/getLibraryCategory()/groupByLibraryCategory() live in
// data.js since picker.js's "add a dish" modal groups results the same way.

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

  const container = document.getElementById("mp-library-results");
  container.innerHTML = "";

  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "mp-empty-note";
    empty.textContent = "No items match your search/filters.";
    container.appendChild(empty);
    return;
  }

  groupByLibraryCategory(results).forEach(({ category, items: categoryItems }) => {
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
