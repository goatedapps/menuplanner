// Shared "add a dish to a slot" modal. Used by manual mode and by
// overriding a slot after autogeneration — one component, one code path.
// Adds one dish per invocation (click a row → onSelect(id) → close); call it
// again to add another dish to the same slot. Deliberately does only this —
// clearing a whole slot is a planner.js concern (the "Clear" button on each
// slot card), not something bundled into the picker.
// Call openPicker({ slotKey, existingIds, onSelect, onQuickAdd }). onQuickAdd
// backs the "not in the list?" row at the bottom — a name-only dish the
// caller creates as a plan-scoped entry rather than a real MP_ITEMS item
// (see planner.js's addCustomDishToSlot()); picker.js itself just collects
// the typed name and hands it off, same separation as onSelect(id).

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
        <h2 id="mp-picker-title">Add a dish</h2>
        <button type="button" class="mp-modal-close" aria-label="Close">&times;</button>
      </div>
      <input type="text" class="mp-picker-search" placeholder="Search by name...">
      <div class="mp-picker-tags"></div>
      <div class="mp-picker-results"></div>
      <div class="mp-picker-quickadd">
        <input type="text" class="mp-picker-quickadd-input" placeholder="Not in the list? Type a dish name…">
        <button type="button" class="mp-btn mp-btn-primary mp-picker-quickadd-btn">Add</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelector(".mp-modal-close").addEventListener("click", closePicker);
  overlay.addEventListener("click", e => {
    if (e.target === overlay) closePicker();
  });
  overlay.querySelector(".mp-picker-search").addEventListener("input", renderPickerResults);
  overlay.querySelector(".mp-picker-quickadd-btn").addEventListener("click", submitPickerQuickAdd);
  overlay.querySelector(".mp-picker-quickadd-input").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitPickerQuickAdd();
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape" || !mpPickerState) return;
    // If the detail view (js/detail.js) is open on top of the picker, let
    // its own Escape handler close that first rather than closing both at once.
    const detailOverlay = document.getElementById("mp-detail-overlay");
    if (detailOverlay && !detailOverlay.hidden) return;
    closePicker();
  });
}

function openPicker({ slotKey, existingIds = [], onSelect, onQuickAdd }) {
  ensurePickerDom();
  mpPickerState = { slotKey, existingIds, onSelect, onQuickAdd, tagFilters: [], openCategories: {} };

  const overlay = document.getElementById("mp-picker-overlay");
  overlay.querySelector(".mp-picker-search").value = "";
  overlay.querySelector(".mp-picker-quickadd-input").value = "";
  renderPickerTags();
  renderPickerResults();
  overlay.hidden = false;
}

function closePicker() {
  const overlay = document.getElementById("mp-picker-overlay");
  if (overlay) overlay.hidden = true;
  mpPickerState = null;
}

// Blank input is a silent no-op (matching e.g. planner.js's own
// handleSavePlanClick, which skips an empty trimmed name rather than
// alerting) — closes and adds only once there's an actual name to add.
function submitPickerQuickAdd() {
  if (!mpPickerState || !mpPickerState.onQuickAdd) return;
  const overlay = document.getElementById("mp-picker-overlay");
  const input = overlay.querySelector(".mp-picker-quickadd-input");
  const name = input.value.trim();
  if (!name) return;
  mpPickerState.onQuickAdd(name);
  closePicker();
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

// Groups results the same way library.js's grid does (groupByLibraryCategory
// in data.js), rendered as collapsible <details> sections — all collapsed
// when the picker first opens. Each category's open/closed state is tracked
// in mpPickerState.openCategories and persists across re-renders (typing a
// search, clicking a tag) since results are rebuilt from scratch each time —
// without this, every re-render would reset back to the DOM default and
// undo whatever the user had manually expanded/collapsed.
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

  groupByLibraryCategory(results).forEach(({ category, items: categoryItems }) => {
    const section = document.createElement("details");
    section.className = "mp-library-category mp-picker-category";
    section.open = Boolean(mpPickerState.openCategories[category.key]);
    section.addEventListener("toggle", () => {
      mpPickerState.openCategories[category.key] = section.open;
    });

    const heading = document.createElement("summary");
    heading.className = "mp-library-category-heading";
    heading.textContent = `${category.label} (${categoryItems.length})`;
    section.appendChild(heading);

    const rows = document.createElement("div");
    rows.className = "mp-picker-category-rows";
    categoryItems.forEach(item => {
      const row = document.createElement("div");
      row.className = "mp-picker-row";
      if (mpPickerState.existingIds.includes(item.id)) row.classList.add("mp-picker-row-added");
      row.innerHTML = `
        <button type="button" class="mp-picker-row-main">
          <span class="mp-picker-row-thumb"></span>
          <span class="mp-picker-row-text">
            <span class="mp-picker-row-name">${item.name}</span>
            <span class="mp-picker-row-tags">${item.tags.join(", ")}</span>
          </span>
        </button>
        <button type="button" class="mp-picker-row-info" aria-label="View details for ${item.name}">i</button>
      `;
      renderItemThumb(row.querySelector(".mp-picker-row-thumb"), item);
      row.querySelector(".mp-picker-row-main").addEventListener("click", () => {
        mpPickerState.onSelect(item.id);
        closePicker();
      });
      row.querySelector(".mp-picker-row-info").addEventListener("click", () => {
        openItemDetail(item, {
          onAdd: id => {
            document.getElementById("mp-detail-overlay").hidden = true;
            mpPickerState.onSelect(id);
            closePicker();
          }
        });
      });
      rows.appendChild(row);
    });
    section.appendChild(rows);
    list.appendChild(section);
  });
}
