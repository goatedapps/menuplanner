// Controller for admin.html — a local-only menu-editing tool, deliberately
// not linked from index.html/planner.html/library.html's nav. Nothing here
// ever touches the deployed js/data.js: edits live only in this browser's
// localStorage until you click "Generate data.js" and manually replace the
// real file yourself. See CLAUDE.md for the reasoning behind this design.

const MP_ADMIN_DRAFT_KEY = "menuPlanner.adminDraft";

let mpAdminItems = [];
let mpAdminGroups = {};
let mpAdminEditingId = null; // null while the form is creating a new item
let mpAdminFormSelectedTags = []; // tags currently selected for the open form
let mpAdminExtraTagVocab = []; // tags added via "Add Tag" this session but not yet saved on any item
let mpAdminListFilters = { searchText: "", tagFilters: [], dishType: "", group: "" };

document.addEventListener("DOMContentLoaded", () => {
  loadDraftOrReset();
  refreshAdminUI();

  document.getElementById("mp-admin-add-btn").addEventListener("click", () => openItemForm(null));
  document.getElementById("mp-admin-generate-btn").addEventListener("click", downloadGeneratedDataJs);
  document.getElementById("mp-admin-discard-btn").addEventListener("click", () => {
    if (confirm("Discard all draft edits and reload from the current data.js?")) {
      localStorage.removeItem(MP_ADMIN_DRAFT_KEY);
      mpAdminExtraTagVocab = [];
      loadDraftOrReset();
      refreshAdminUI();
    }
  });

  document.getElementById("mp-admin-search").addEventListener("input", e => {
    mpAdminListFilters.searchText = e.target.value;
    renderAdminList();
  });
  document.getElementById("mp-admin-filter-dishtype").addEventListener("change", e => {
    mpAdminListFilters.dishType = e.target.value;
    renderAdminList();
  });
  document.getElementById("mp-admin-filter-group").addEventListener("change", e => {
    mpAdminListFilters.group = e.target.value;
    renderAdminList();
  });

  document.getElementById("mp-admin-form-close").addEventListener("click", closeItemForm);
  document.getElementById("mp-admin-form-cancel").addEventListener("click", closeItemForm);
  document.getElementById("mp-admin-form-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("mp-admin-form-overlay")) closeItemForm();
  });
  document.getElementById("mp-admin-form").addEventListener("submit", handleFormSubmit);
  document.getElementById("mp-admin-form-delete").addEventListener("click", handleDelete);
  document.getElementById("mp-admin-new-tag-btn").addEventListener("click", handleAddNewTag);
});

function refreshAdminUI() {
  renderAdminFilterTags();
  renderAdminList();
}

// Always resumes a saved draft if one exists; otherwise seeds the working
// copy fresh from the data.js that's currently loaded on the page.
function loadDraftOrReset() {
  const raw = localStorage.getItem(MP_ADMIN_DRAFT_KEY);
  if (raw) {
    try {
      const draft = JSON.parse(raw);
      if (draft && draft.items) {
        mpAdminItems = draft.items;
        mpAdminGroups = draft.groups || {};
        return;
      }
    } catch (e) {
      // fall through to reset from data.js
    }
  }
  mpAdminItems = MP_ITEMS.map(item => ({ ...item, tags: [...item.tags] }));
  mpAdminGroups = { ...MP_SUBTYPE_GROUPS };
  saveDraft();
}

function saveDraft() {
  localStorage.setItem(MP_ADMIN_DRAFT_KEY, JSON.stringify({ items: mpAdminItems, groups: mpAdminGroups }));
}

// Broad categorization + search over what can otherwise be a very long list:
// reuses filterItems() from data.js for name/tag matching (same behavior as
// library.js/picker.js), then narrows further by dish type and food group.
function renderAdminList() {
  const grid = document.getElementById("mp-admin-list");
  grid.innerHTML = "";

  let results = filterItems(mpAdminItems, {
    searchText: mpAdminListFilters.searchText,
    tagFilters: mpAdminListFilters.tagFilters
  });
  if (mpAdminListFilters.dishType) {
    results = results.filter(item => item.dishType === mpAdminListFilters.dishType);
  }
  if (mpAdminListFilters.group) {
    results = results.filter(item => (mpAdminGroups[item.subType] || "other") === mpAdminListFilters.group);
  }

  document.getElementById("mp-admin-count").textContent =
    `Showing ${results.length} of ${mpAdminItems.length} item${mpAdminItems.length === 1 ? "" : "s"}`;

  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "mp-empty-note";
    empty.textContent = mpAdminItems.length === 0
      ? 'No items yet — click "+ Add New Item" to create one.'
      : "No items match your search/filters.";
    grid.appendChild(empty);
    return;
  }

  results.forEach(item => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "mp-item-card";
    card.innerHTML = `
      <div class="mp-item-thumb"></div>
      <div class="mp-item-name">${item.name}</div>
      <div class="mp-item-tags">${item.tags.join(", ")}</div>
    `;
    renderItemThumb(card.querySelector(".mp-item-thumb"), item);
    card.addEventListener("click", () => openItemForm(item.id));
    grid.appendChild(card);
  });
}

function renderAdminFilterTags() {
  const container = document.getElementById("mp-admin-filter-tags");
  container.innerHTML = "";
  getTagVocabulary().forEach(tag => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = mpAdminListFilters.tagFilters.includes(tag) ? "mp-chip mp-chip-active" : "mp-chip";
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      const idx = mpAdminListFilters.tagFilters.indexOf(tag);
      if (idx >= 0) mpAdminListFilters.tagFilters.splice(idx, 1);
      else mpAdminListFilters.tagFilters.push(tag);
      renderAdminFilterTags();
      renderAdminList();
    });
    container.appendChild(chip);
  });
}

function getTagVocabulary() {
  const tags = new Set(mpAdminItems.flatMap(i => i.tags));
  mpAdminExtraTagVocab.forEach(t => tags.add(t));
  return Array.from(tags).sort();
}

function openItemForm(id) {
  mpAdminEditingId = id;
  const item = id ? mpAdminItems.find(i => i.id === id) : null;
  mpAdminFormSelectedTags = item ? [...item.tags] : [];

  document.getElementById("mp-admin-form-title").textContent = item ? "Edit Item" : "Add New Item";
  document.getElementById("mp-admin-field-name").value = item ? item.name : "";
  document.getElementById("mp-admin-field-dishtype").value = item ? item.dishType : "one-dish";
  document.getElementById("mp-admin-field-subtype").value = item ? item.subType : "";
  document.getElementById("mp-admin-field-group").value = item && mpAdminGroups[item.subType] ? mpAdminGroups[item.subType] : "other";
  document.getElementById("mp-admin-field-rice").checked = item ? !!item.isRiceBased : false;
  document.getElementById("mp-admin-field-carb").checked = item ? !!item.isCarbohydrate : false;
  document.getElementById("mp-admin-field-ingredients").value = item && item.recipe && item.recipe.ingredients ? item.recipe.ingredients.join("\n") : "";
  document.getElementById("mp-admin-field-steps").value = item && item.recipe && item.recipe.steps ? item.recipe.steps.join("\n") : "";
  document.getElementById("mp-admin-form-delete").hidden = !item;
  document.getElementById("mp-admin-new-tag-input").value = "";

  populateSubtypeDatalist();
  populateFormTagChips();

  document.getElementById("mp-admin-form-overlay").hidden = false;
}

function closeItemForm() {
  document.getElementById("mp-admin-form-overlay").hidden = true;
  mpAdminEditingId = null;
  mpAdminFormSelectedTags = [];
}

function populateSubtypeDatalist() {
  const subtypes = Array.from(new Set(mpAdminItems.map(i => i.subType).filter(Boolean))).sort();
  document.getElementById("mp-admin-subtype-list").innerHTML = subtypes.map(s => `<option value="${s}">`).join("");
}

// Tags are click-to-toggle chips (selected = mp-chip-active) rather than a
// text field — populateFormTagChips() re-renders after every toggle so the
// highlighted state always reflects mpAdminFormSelectedTags.
function populateFormTagChips() {
  const container = document.getElementById("mp-admin-tag-chips");
  container.innerHTML = "";
  getTagVocabulary().forEach(tag => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = mpAdminFormSelectedTags.includes(tag) ? "mp-chip mp-chip-active" : "mp-chip";
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      const idx = mpAdminFormSelectedTags.indexOf(tag);
      if (idx >= 0) mpAdminFormSelectedTags.splice(idx, 1);
      else mpAdminFormSelectedTags.push(tag);
      populateFormTagChips();
    });
    container.appendChild(chip);
  });
}

function handleAddNewTag() {
  const input = document.getElementById("mp-admin-new-tag-input");
  const tag = input.value.trim().toLowerCase().replace(/\s+/g, "-");
  if (!tag) return;
  if (!mpAdminExtraTagVocab.includes(tag) && !mpAdminItems.some(i => i.tags.includes(tag))) {
    mpAdminExtraTagVocab.push(tag);
  }
  if (!mpAdminFormSelectedTags.includes(tag)) mpAdminFormSelectedTags.push(tag);
  input.value = "";
  populateFormTagChips();
}

function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("mp-admin-field-name").value.trim();
  if (!name) return;

  const dishType = document.getElementById("mp-admin-field-dishtype").value;
  const subType = document.getElementById("mp-admin-field-subtype").value.trim();
  const group = document.getElementById("mp-admin-field-group").value;
  const isRiceBased = document.getElementById("mp-admin-field-rice").checked;
  const isCarbohydrate = document.getElementById("mp-admin-field-carb").checked;
  const ingredients = document.getElementById("mp-admin-field-ingredients").value.split("\n").map(s => s.trim()).filter(Boolean);
  const steps = document.getElementById("mp-admin-field-steps").value.split("\n").map(s => s.trim()).filter(Boolean);

  const item = {
    id: mpAdminEditingId || uniqueSlug(name),
    name,
    tags: [...mpAdminFormSelectedTags],
    dishType,
    subType,
    isRiceBased,
    isCarbohydrate
  };
  if (ingredients.length || steps.length) {
    item.recipe = {};
    if (ingredients.length) item.recipe.ingredients = ingredients;
    if (steps.length) item.recipe.steps = steps;
  }

  if (mpAdminEditingId) {
    const idx = mpAdminItems.findIndex(i => i.id === mpAdminEditingId);
    mpAdminItems[idx] = item;
  } else {
    mpAdminItems.push(item);
  }

  if (subType) mpAdminGroups[subType] = group;
  mpAdminExtraTagVocab = [];

  saveDraft();
  refreshAdminUI();
  closeItemForm();
}

function handleDelete() {
  if (!mpAdminEditingId) return;
  if (!confirm("Delete this item from your draft?")) return;
  mpAdminItems = mpAdminItems.filter(i => i.id !== mpAdminEditingId);
  saveDraft();
  refreshAdminUI();
  closeItemForm();
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function uniqueSlug(name) {
  const base = slugify(name) || "item";
  let id = base;
  let n = 2;
  while (mpAdminItems.some(i => i.id === id)) {
    id = `${base}-${n}`;
    n++;
  }
  return id;
}

// Generates a complete, drop-in replacement for js/data.js from the current
// draft. Uses JSON.stringify for the data literals — quoted-key JSON is
// valid JS object/array syntax, so no hand-rolled serializer is needed.
function downloadGeneratedDataJs() {
  const content = `// Master list of menu items. Hand-edited — add/remove items here directly,
// or regenerate this file via admin.html (a local-only editing tool, not
// linked from the public site). id must stay unique.
const MP_ITEMS = ${JSON.stringify(mpAdminItems, null, 2)};

// Coarse food-group lookup, derived from subType rather than stored per item —
// used by rules that need "a vegetable"/"a protein"/"a soup"/"a carb", not the
// exact sub-type identity (that's what subType itself is for).
const MP_SUBTYPE_GROUPS = ${JSON.stringify(mpAdminGroups, null, 2)};

function getDishGroup(subType) {
  return MP_SUBTYPE_GROUPS[subType] || "other";
}

// Returns the sorted list of distinct tags across all items.
function getAllTags(items) {
  const tagSet = new Set();
  items.forEach(item => item.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

function getItemById(items, id) {
  return items.find(item => item.id === id) || null;
}

// AND semantics across tagFilters; searchText matches name substring (case-insensitive).
function filterItems(items, { searchText = "", tagFilters = [] } = {}) {
  const needle = searchText.trim().toLowerCase();
  return items.filter(item => {
    const matchesSearch = !needle || item.name.toLowerCase().includes(needle);
    const matchesTags = tagFilters.every(tag => item.tags.includes(tag));
    return matchesSearch && matchesTags;
  });
}
`;

  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "data.js";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
