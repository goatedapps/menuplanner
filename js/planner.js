// Controller for planner.html: builds/resumes the current plan, renders the
// slot grid for whatever scope it is, and wires slot editing via picker.js.

let mpCurrentPlan = null;

document.addEventListener("DOMContentLoaded", () => {
  const { plan, warning } = initPlan();
  mpCurrentPlan = plan;

  if (!mpCurrentPlan) {
    window.location.href = "index.html";
    return;
  }

  // Plans saved before per-dish/per-meal notes (or includeTags/excludeTags,
  // used by the "Regenerate" button) existed won't have these fields yet.
  if (!mpCurrentPlan.notes) mpCurrentPlan.notes = {};
  if (!mpCurrentPlan.mealNotes) mpCurrentPlan.mealNotes = {};
  if (!mpCurrentPlan.includeTags) mpCurrentPlan.includeTags = [];
  if (!mpCurrentPlan.excludeTags) mpCurrentPlan.excludeTags = [];

  if (warning) {
    document.getElementById("mp-planner-warning").innerHTML = `<div class="mp-warning">${warning}</div>`;
  }

  updatePlannerTitle();
  renderPlannerGrid();

  document.getElementById("mp-start-over-btn").addEventListener("click", () => {
    clearPlan();
    window.location.href = "index.html";
  });
  document.getElementById("mp-print-btn").addEventListener("click", () => window.print());
  document.getElementById("mp-export-btn").addEventListener("click", exportPlanToWord);
  document.getElementById("mp-save-plan-btn").addEventListener("click", handleSavePlanClick);
});

// Prompts for a name (native prompt(), matching admin.js's existing use of
// confirm() for lightweight interactions rather than a new custom modal) and
// stores the current plan into the separate "Saved Menu Plans" list (see
// storage.js) — distinct from the single auto-saved current plan. Rejects
// rather than evicting the oldest saved plan once the cap is hit, consistent
// with the app's non-destructive conventions elsewhere.
function handleSavePlanClick() {
  const labels = { meal: "Single Meal", day: "Full Day", week: "Full Week" };
  const defaultName = `${labels[mpCurrentPlan.scope] || "Plan"} - ${new Date().toLocaleDateString()}`;
  const name = prompt("Name this meal plan:", defaultName);
  if (name === null) return;
  const trimmed = name.trim();
  if (!trimmed) return;
  const result = addSavedPlan(trimmed, mpCurrentPlan);
  if (!result.ok) {
    alert(result.reason);
    return;
  }
  alert(`Saved "${trimmed}"! You'll find it under "Saved Menu Plans" on the home page.`);
}

// Returns { plan, warning }. Builds a fresh plan from a pending index.html
// handoff if present, otherwise resumes whatever is already saved.
function initPlan() {
  const pendingRaw = sessionStorage.getItem("menuPlanner.pendingChoice");
  if (pendingRaw) {
    sessionStorage.removeItem("menuPlanner.pendingChoice");
    let pending = null;
    try {
      pending = JSON.parse(pendingRaw);
    } catch (e) {
      pending = null;
    }

    if (pending) {
      const plan = {
        version: MP_PLAN_VERSION,
        scope: pending.scope,
        mode: pending.mode,
        createdAt: new Date().toISOString(),
        slots: {},
        notes: {},
        mealNotes: {},
        includeTags: pending.includeTags || [],
        excludeTags: pending.excludeTags || []
      };
      const slotDefs = getSlotsForScope(pending.scope);
      slotDefs.forEach(s => { plan.slots[s.key] = []; });

      let warning = null;
      if (pending.mode === "autogenerate") {
        const result = generatePlanSlots(MP_ITEMS, pending.scope, pending.includeTags || [], pending.excludeTags || []);
        if (result.slots) {
          plan.slots = result.slots;
        } else {
          warning = result.warning;
        }
      } else if (pending.mode === "fortune") {
        // The meal was already chosen by the wheel on index.html (js/fortune.js)
        // — scope is always "meal" here, which always uses this one slot key.
        plan.slots["day1-lunch"] = pending.dishIds || [];
      }
      savePlan(plan);
      return { plan, warning };
    }
  }

  return { plan: loadPlan(), warning: null };
}

function updatePlannerTitle() {
  const labels = { meal: "Your Meal", day: "Your Day", week: "Your Week" };
  document.getElementById("mp-planner-title").textContent = labels[mpCurrentPlan.scope] || "Your Plan";
}

function renderPlannerGrid() {
  const container = document.querySelector(".mp-container");
  if (container) container.classList.toggle("mp-container-wide", mpCurrentPlan.scope === "week");
  const grid = document.getElementById("mp-planner-grid");
  grid.innerHTML = "";
  if (mpCurrentPlan.scope === "week") {
    grid.appendChild(buildWeekTable());
  } else {
    getSlotsForScope(mpCurrentPlan.scope).forEach(slotDef => {
      grid.appendChild(buildSlotCell(slotDef));
    });
  }
}

// Deliberate, narrow exception to "nothing branches on scope" (see
// CLAUDE.md): week scope is a genuine weekday × mealtype 2D structure now,
// so it gets a real table instead of the flat card grid used by meal/day.
// Each cell still reuses the exact same buildSlotCell() as the flat grid.
function buildWeekTable() {
  const wrap = document.createElement("div");
  wrap.className = "mp-week-table-wrap";

  const table = document.createElement("table");
  table.className = "mp-week-table";
  table.innerHTML = "<thead><tr><th></th><th>Lunch</th><th>Dinner</th></tr></thead>";

  const slotDefsByKey = {};
  getSlotsForScope("week").forEach(s => { slotDefsByKey[s.key] = s; });

  const tbody = document.createElement("tbody");
  getWeekdayRows().forEach(row => {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.className = "mp-week-row-label";
    th.textContent = row.label;
    tr.appendChild(th);

    [row.lunchKey, row.dinnerKey].forEach(key => {
      const td = document.createElement("td");
      td.className = "mp-week-cell";
      td.appendChild(buildSlotCell(slotDefsByKey[key], { showLabel: false }));
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  wrap.appendChild(table);
  return wrap;
}

// Rubber-stamp badge for the three week-scope slots whose meaning is fixed
// by the household rules in generator.js (meatless Monday, fixed Tuesday
// Yong Tau Foo, Wednesday's 5-part structure) — deliberately not used for
// any other slot, so the stamp stays informative rather than decorative.
function getDayStamp(scope, slotKey) {
  if (scope !== "week") return null;
  if (slotKey === "mon-dinner") return { cls: "mp-day-stamp-meatless", text: "Meatless" };
  if (slotKey === "tue-dinner") return { cls: "mp-day-stamp-ytf", text: "Fixed · YTF" };
  if (slotKey === "wed-dinner") return { cls: "mp-day-stamp-wed", text: "3-Part" };
  return null;
}

// Cosmetic-only: within a meal, carbohydrate dishes display first. A stable
// sort, so it doesn't reorder anything else — and it never touches the
// underlying plan.slots[key] array (add/remove/existingIds logic all stay
// insertion-order, this only affects how a meal's dishes are listed).
function sortDishesCarbFirst(dishes) {
  return [...dishes].sort((a, b) => (a.isCarbohydrate ? 0 : 1) - (b.isCarbohydrate ? 0 : 1));
}

function buildSlotCell(slotDef, { showLabel = true } = {}) {
  const dishIds = mpCurrentPlan.slots[slotDef.key] || [];
  const dishes = dishIds.map(id => getItemById(MP_ITEMS, id)).filter(Boolean);

  const card = document.createElement("div");
  card.className = "mp-slot-card";

  // Drop target for dragging a dish in from another slot (see the
  // draggable wrapper built in buildSlotDishRow). Dropping just appends —
  // there's no cap check here, matching addDishToSlot()/the picker, which
  // don't enforce MP_MEAL_MAX_DISHES on manual adds either.
  card.addEventListener("dragover", e => {
    e.preventDefault();
    card.classList.add("mp-slot-drop-target");
  });
  card.addEventListener("dragleave", () => {
    card.classList.remove("mp-slot-drop-target");
  });
  card.addEventListener("drop", e => {
    e.preventDefault();
    card.classList.remove("mp-slot-drop-target");
    let payload;
    try {
      payload = JSON.parse(e.dataTransfer.getData("text/plain"));
    } catch (err) {
      return;
    }
    if (payload && payload.slotKey && payload.dishId) {
      moveDishToSlot(payload.slotKey, slotDef.key, payload.dishId);
    }
  });

  const stamp = getDayStamp(mpCurrentPlan.scope, slotDef.key);
  if (stamp) {
    const stampEl = document.createElement("div");
    stampEl.className = `mp-day-stamp ${stamp.cls}`;
    stampEl.textContent = stamp.text;
    card.appendChild(stampEl);
  }

  if (showLabel) {
    const label = document.createElement("div");
    label.className = "mp-slot-label";
    label.textContent = slotDef.label;
    card.appendChild(label);
  }

  const mealNoteInput = document.createElement("input");
  mealNoteInput.type = "text";
  mealNoteInput.className = "mp-slot-meal-note-input";
  mealNoteInput.placeholder = "Note for this meal (e.g. who's eating)…";
  mealNoteInput.value = getMealNote(slotDef.key);
  mealNoteInput.addEventListener("input", () => setMealNote(slotDef.key, mealNoteInput.value));
  card.appendChild(mealNoteInput);

  if (dishes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "mp-slot-name mp-slot-empty";
    empty.textContent = "Choose an item…";
    card.appendChild(empty);
  } else {
    sortDishesCarbFirst(dishes).forEach(dish => card.appendChild(buildSlotDishRow(slotDef.key, dish)));
  }

  const actions = document.createElement("div");
  actions.className = "mp-slot-actions";

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "mp-slot-add-btn";
  addBtn.textContent = "+ Add dish";
  addBtn.addEventListener("click", () => {
    openPicker({
      slotKey: slotDef.key,
      existingIds: dishIds,
      onSelect: newItemId => addDishToSlot(slotDef.key, newItemId)
    });
  });
  actions.appendChild(addBtn);

  const regenerateBtn = document.createElement("button");
  regenerateBtn.type = "button";
  regenerateBtn.className = "mp-slot-add-btn mp-slot-regenerate-btn";
  regenerateBtn.textContent = "↻ Regenerate";
  regenerateBtn.addEventListener("click", () => regenerateMealSlot(slotDef.key));
  actions.appendChild(regenerateBtn);

  if (dishes.length > 0) {
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "mp-slot-clear-btn";
    clearBtn.textContent = "Clear";
    clearBtn.addEventListener("click", () => clearSlotArray(slotDef.key));
    actions.appendChild(clearBtn);
  }

  card.appendChild(actions);

  return card;
}

// The note input has to live outside the clickable "view details" button —
// a button can't contain a nested <input> — so the row (thumb+name+tags
// button, plus remove) and the note line are two stacked pieces inside one
// wrapper block, rather than a single row like before.
function buildSlotDishRow(slotKey, dish) {
  const wrapper = document.createElement("div");
  wrapper.className = "mp-slot-dish-block";

  // Draggable at the wrapper level (not the view button) so a plain click
  // on the button still opens details — HTML5 drag only kicks in once the
  // mouse actually moves while pressed, so this doesn't fight with clicking.
  wrapper.draggable = true;
  wrapper.addEventListener("dragstart", e => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify({ slotKey, dishId: dish.id }));
  });

  const row = document.createElement("div");
  row.className = "mp-slot-dish-row";

  const viewBtn = document.createElement("button");
  viewBtn.type = "button";
  viewBtn.className = "mp-slot-dish-view";
  viewBtn.setAttribute("aria-label", `View details for ${dish.name}`);
  viewBtn.addEventListener("click", () => openItemDetail(dish));

  const thumb = document.createElement("div");
  thumb.className = "mp-slot-thumb";
  viewBtn.appendChild(thumb);
  renderItemThumb(thumb, dish);

  const info = document.createElement("div");
  info.className = "mp-slot-dish-info";
  const name = document.createElement("div");
  name.className = "mp-slot-name";
  name.textContent = dish.name;
  info.appendChild(name);
  const tags = document.createElement("div");
  tags.className = "mp-slot-tags";
  tags.textContent = dish.tags.join(", ");
  info.appendChild(tags);
  viewBtn.appendChild(info);

  row.appendChild(viewBtn);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "mp-slot-dish-remove";
  removeBtn.setAttribute("aria-label", `Remove ${dish.name}`);
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => removeDishFromSlot(slotKey, dish.id));
  row.appendChild(removeBtn);

  wrapper.appendChild(row);

  const noteInput = document.createElement("input");
  noteInput.type = "text";
  noteInput.className = "mp-slot-note-input";
  noteInput.placeholder = "Add a note…";
  noteInput.value = getDishNote(slotKey, dish.id);
  noteInput.addEventListener("input", () => setDishNote(slotKey, dish.id, noteInput.value));
  wrapper.appendChild(noteInput);

  return wrapper;
}

function addDishToSlot(slotKey, itemId) {
  const current = mpCurrentPlan.slots[slotKey] || [];
  if (!current.includes(itemId)) {
    mpCurrentPlan.slots[slotKey] = [...current, itemId];
  }
  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}

function removeDishFromSlot(slotKey, itemId) {
  const current = mpCurrentPlan.slots[slotKey] || [];
  mpCurrentPlan.slots[slotKey] = current.filter(id => id !== itemId);
  if (mpCurrentPlan.notes[slotKey]) delete mpCurrentPlan.notes[slotKey][itemId];
  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}

function clearSlotArray(slotKey) {
  mpCurrentPlan.slots[slotKey] = [];
  delete mpCurrentPlan.notes[slotKey];
  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}

// Drag-and-drop between slots (e.g. Tue lunch -> Wed lunch). Carries the
// dish's per-dish note along to its new slot rather than dropping it —
// unlike removeDishFromSlot(), which deletes notes outright because there
// the dish is actually leaving the plan, not just moving within it.
function moveDishToSlot(fromSlotKey, toSlotKey, dishId) {
  if (fromSlotKey === toSlotKey) return;
  const fromIds = mpCurrentPlan.slots[fromSlotKey] || [];
  if (!fromIds.includes(dishId)) return;
  mpCurrentPlan.slots[fromSlotKey] = fromIds.filter(id => id !== dishId);

  const toIds = mpCurrentPlan.slots[toSlotKey] || [];
  if (!toIds.includes(dishId)) {
    mpCurrentPlan.slots[toSlotKey] = [...toIds, dishId];
  }

  const note = mpCurrentPlan.notes[fromSlotKey] && mpCurrentPlan.notes[fromSlotKey][dishId];
  if (mpCurrentPlan.notes[fromSlotKey]) delete mpCurrentPlan.notes[fromSlotKey][dishId];
  if (note) {
    if (!mpCurrentPlan.notes[toSlotKey]) mpCurrentPlan.notes[toSlotKey] = {};
    mpCurrentPlan.notes[toSlotKey][dishId] = note;
  }

  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}

// Re-runs the generator for just this one slot (day-specific fixed rules —
// Tuesday dinner, Wednesday dinner, meatless Monday — still apply, same as
// a full autogenerate pass), replacing whatever's currently in it. Per-dish
// notes for the replaced dishes don't carry over (they were about specific
// dishes that are now gone); the whole-meal note is untouched, since it's
// about the meal itself (e.g. who's eating), not which dishes fill it.
function regenerateMealSlot(slotKey) {
  const newDishIds = regenerateSlot(MP_ITEMS, mpCurrentPlan.scope, slotKey, mpCurrentPlan.includeTags, mpCurrentPlan.excludeTags);
  mpCurrentPlan.slots[slotKey] = newDishIds;
  delete mpCurrentPlan.notes[slotKey];
  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}

function getDishNote(slotKey, itemId) {
  return (mpCurrentPlan.notes[slotKey] && mpCurrentPlan.notes[slotKey][itemId]) || "";
}

// Saves directly without a full renderPlannerGrid() repaint — the input
// already reflects what the user typed, and repainting on every keystroke
// would rebuild the DOM out from under the focused field.
function setDishNote(slotKey, itemId, note) {
  if (!mpCurrentPlan.notes[slotKey]) mpCurrentPlan.notes[slotKey] = {};
  if (note.trim() === "") {
    delete mpCurrentPlan.notes[slotKey][itemId];
  } else {
    mpCurrentPlan.notes[slotKey][itemId] = note;
  }
  savePlan(mpCurrentPlan);
}

// A single free-text note for the whole meal (e.g. "Only ABC is eating"),
// independent of any one dish — plan.mealNotes[slotKey], separate from the
// per-dish plan.notes above. Deliberately not cleared by clearSlotArray():
// who's-eating-style context isn't tied to which dishes end up in the meal.
function getMealNote(slotKey) {
  return mpCurrentPlan.mealNotes[slotKey] || "";
}

function setMealNote(slotKey, note) {
  if (note.trim() === "") {
    delete mpCurrentPlan.mealNotes[slotKey];
  } else {
    mpCurrentPlan.mealNotes[slotKey] = note;
  }
  savePlan(mpCurrentPlan);
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Bulleted list of name + user-added note (no tags) — used by the Word
// export. Print (window.print() on the live DOM) gets its own equivalent
// treatment via .mp-slot-tags/.mp-slot-note-input rules in the @media print
// block rather than reusing this, since print renders the interactive DOM.
function dishNamesHtml(slotKey) {
  const dishes = (mpCurrentPlan.slots[slotKey] || []).map(id => getItemById(MP_ITEMS, id)).filter(Boolean);
  if (!dishes.length) return "&mdash;";
  const items = sortDishesCarbFirst(dishes)
    .map(dish => {
      const note = getDishNote(slotKey, dish.id);
      return `<li>${escapeHtml(dish.name)}${note ? ` <em>(${escapeHtml(note)})</em>` : ""}</li>`;
    })
    .join("");
  return `<ul style="margin:0;padding-left:4px;">${items}</ul>`;
}

// The whole-meal note (see getMealNote()), rendered above the dish list in
// the Word export. Empty string (not "&mdash;") when there's no note, since
// it's optional context rather than a required field like the dish list.
function mealNoteHtml(slotKey) {
  const note = getMealNote(slotKey);
  return note ? `<div style="font-style:italic;margin-bottom:4px;">${escapeHtml(note)}</div>` : "";
}

// Builds a self-contained, image-free HTML document of the current plan for
// export/printing — deliberately separate from the live DOM (which has
// interactive add/remove buttons) rather than reusing renderPlannerGrid's
// output. No title/heading in the document body (deliberately removed —
// the filename already identifies it), and black-on-white only throughout
// so it stays plain when opened/printed from Word.
function buildPlanExportHtml() {
  const borderBase = "border:1px solid #000;vertical-align:top;text-align:left;";
  // Header row: white on black, centered — the one deliberate departure
  // from "black text on white" (still strictly black/white, no color).
  const headBase = `${borderBase}padding:8px;background:#000;color:#fff;font-weight:bold;text-align:center;vertical-align:middle;`;
  const labelBase = `${borderBase}padding:8px;font-weight:bold;white-space:nowrap;`;
  // Less left padding than other cells so each day's bullet list sits
  // closer to the cell's left edge rather than lining up with the label column.
  const cellBase = `${borderBase}padding:8px 8px 8px 4px;`;

  // table-layout:fixed is required for the width values below to actually
  // hold — without it, Word (and browsers) auto-size columns by content, so
  // a day with a longer Lunch list would visibly widen that column relative
  // to Dinner despite the colgroup widths. Width is set redundantly on both
  // <colgroup> and every cell, since Word's HTML-to-.doc conversion doesn't
  // always honor <col> alone.
  let body = `<table style="border-collapse:collapse;width:100%;table-layout:fixed;font-family:Calibri,Arial,sans-serif;font-size:16px;">`;
  if (mpCurrentPlan.scope === "week") {
    const dayW = "width:14%;";
    const mealW = "width:43%;";
    body += `<colgroup><col style="${dayW}"><col style="${mealW}"><col style="${mealW}"></colgroup>`;
    body += `<tr><th style="${headBase}${dayW}">Day</th><th style="${headBase}${mealW}">Lunch</th><th style="${headBase}${mealW}">Dinner</th></tr>`;
    getWeekdayRows().forEach(row => {
      body += `<tr><td style="${labelBase}${dayW}">${escapeHtml(row.label)}</td><td style="${cellBase}${mealW}">${mealNoteHtml(row.lunchKey)}${dishNamesHtml(row.lunchKey)}</td><td style="${cellBase}${mealW}">${mealNoteHtml(row.dinnerKey)}${dishNamesHtml(row.dinnerKey)}</td></tr>`;
    });
  } else {
    getSlotsForScope(mpCurrentPlan.scope).forEach(slotDef => {
      body += `<tr><td style="${labelBase}">${escapeHtml(slotDef.label)}</td><td style="${cellBase}">${mealNoteHtml(slotDef.key)}${dishNamesHtml(slotDef.key)}</td></tr>`;
    });
  }
  body += "</table>";

  return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><title>Menu Plan</title></head><body>${body}</body></html>`;
}

// Exports the current plan as a Word-openable .doc file (no external library —
// Word natively opens HTML saved with a .doc extension/MIME type). Text only,
// no images, per the plan's requirements.
function exportPlanToWord() {
  const html = buildPlanExportHtml();
  const blob = new Blob(["﻿", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `menu-plan-${mpCurrentPlan.scope}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
