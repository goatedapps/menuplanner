// Shared "assign an item to a slot" modal. Used by manual mode and by
// overriding a slot after autogeneration — one component, one code path.
// Call openPicker({ slotKey, currentItemId, onSelect }).

let mpPickerState = null;

function ensurePickerDom() {
  if (document.getElementById("mp-picker-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "mp-picker-overlay";
  overlay.className = "mp-modal-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="mp-modal" role="dialog" aria-modal="true" aria-labelledby="mp-picker-title">
      <div class="mp-modal-header">
        <h2 id="mp-picker-title">Choose an item</h2>
        <button type="button" class="mp-modal-close" aria-label="Close">&times;</button>
      </div>
      <input type="text" class="mp-picker-search" placeholder="Search by name...">
      <div class="mp-picker-tags"></div>
      <div class="mp-picker-results"></div>
      <button type="button" class="mp-picker-clear">Clear this slot</button>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".mp-modal-close").addEventListener("click", closePicker);
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closePicker();
  });
  overlay.querySelector(".mp-picker-search").addEventListener("input", renderPickerResults);
  overlay.querySelector(".mp-picker-clear").addEventListener("click", () => {
    if (mpPickerState && mpPickerState.onSelect) mpPickerState.onSelect(null);
    closePicker();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mpPickerState) closePicker();
  });
}

function openPicker({ slotKey, currentItemId, onSelect }) {
  ensurePickerDom();
  mpPickerState = { slotKey, currentItemId, onSelect, tagFilters: [] };

  const overlay = document.getElementById("mp-picker-overlay");
  overlay.querySelector(".mp-picker-search").value = "";
  renderPickerTags();
  renderPickerResults();
  overlay.hidden = false;
}

function closePicker() {
  const overlay = document.getElementById("mp-picker-overlay");
  if (overlay) overlay.hidden = true;
  mpPickerState = null;
}

function renderPickerTags() {
  const container = document.querySelector("#mp-picker-overlay .mp-picker-tags");
  container.innerHTML = "";
  getAllTags(MP_ITEMS).forEach(tag => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "mp-chip";
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      const idx = mpPickerState.tagFilters.indexOf(tag);
      if (idx >= 0) {
        mpPickerState.tagFilters.splice(idx, 1);
        chip.classList.remove("mp-chip-active");
      } else {
        mpPickerState.tagFilters.push(tag);
        chip.classList.add("mp-chip-active");
      }
      renderPickerResults();
    });
    container.appendChild(chip);
  });
}

function renderPickerResults() {
  if (!mpPickerState) return;
  const overlay = document.getElementById("mp-picker-overlay");
  const searchText = overlay.querySelector(".mp-picker-search").value;
  const results = filterItems(MP_ITEMS, { searchText, tagFilters: mpPickerState.tagFilters });

  const list = overlay.querySelector(".mp-picker-results");
  list.innerHTML = "";
  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "mp-picker-empty";
    empty.textContent = "No items match.";
    list.appendChild(empty);
    return;
  }

  results.forEach(item => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "mp-picker-row";
    if (item.id === mpPickerState.currentItemId) row.classList.add("mp-picker-row-current");
    row.innerHTML = `
      <span class="mp-picker-row-thumb">${item.image ? `<img src="${item.image}" alt="">` : "🍽️"}</span>
      <span class="mp-picker-row-name">${item.name}</span>
      <span class="mp-picker-row-tags">${item.tags.join(", ")}</span>
    `;
    row.addEventListener("click", () => {
      mpPickerState.onSelect(item.id);
      closePicker();
    });
    list.appendChild(row);
  });
}
