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
});

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
        slots: {}
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

function buildSlotCell(slotDef, { showLabel = true } = {}) {
  const dishIds = mpCurrentPlan.slots[slotDef.key] || [];
  const dishes = dishIds.map(id => getItemById(MP_ITEMS, id)).filter(Boolean);

  const card = document.createElement("div");
  card.className = "mp-slot-card";

  if (showLabel) {
    const label = document.createElement("div");
    label.className = "mp-slot-label";
    label.textContent = slotDef.label;
    card.appendChild(label);
  }

  if (dishes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "mp-slot-name mp-slot-empty";
    empty.textContent = "Choose an item…";
    card.appendChild(empty);
  } else {
    dishes.forEach(dish => card.appendChild(buildSlotDishRow(slotDef.key, dish)));
  }

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.className = "mp-slot-add-btn";
  addBtn.textContent = "+ Add dish";
  addBtn.addEventListener("click", () => {
    openPicker({
      slotKey: slotDef.key,
      existingIds: dishIds,
      onSelect: newItemId => addDishToSlot(slotDef.key, newItemId),
      onClearAll: () => clearSlotArray(slotDef.key)
    });
  });
  card.appendChild(addBtn);

  return card;
}

function buildSlotDishRow(slotKey, dish) {
  const row = document.createElement("div");
  row.className = "mp-slot-dish-row";

  const thumb = document.createElement("div");
  thumb.className = "mp-slot-thumb";
  row.appendChild(thumb);
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
  row.appendChild(info);

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.className = "mp-slot-dish-remove";
  removeBtn.setAttribute("aria-label", `Remove ${dish.name}`);
  removeBtn.textContent = "×";
  removeBtn.addEventListener("click", () => removeDishFromSlot(slotKey, dish.id));
  row.appendChild(removeBtn);

  return row;
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
  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}

function clearSlotArray(slotKey) {
  mpCurrentPlan.slots[slotKey] = [];
  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}

function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function dishNamesHtml(slotKey) {
  const ids = mpCurrentPlan.slots[slotKey] || [];
  const names = ids.map(id => getItemById(MP_ITEMS, id)).filter(Boolean).map(d => d.name);
  return names.length ? names.map(escapeHtml).join("<br>") : "&mdash;";
}

// Builds a self-contained, image-free HTML document of the current plan for
// export/printing — deliberately separate from the live DOM (which has
// interactive add/remove buttons) rather than reusing renderPlannerGrid's output.
function buildPlanExportHtml() {
  const labels = { meal: "Your Meal", day: "Your Day", week: "Your Week" };
  const title = labels[mpCurrentPlan.scope] || "Your Plan";

  let body = `<h1>${escapeHtml(title)}</h1>`;
  body += `<table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;width:100%;">`;
  if (mpCurrentPlan.scope === "week") {
    body += "<tr><th>Day</th><th>Lunch</th><th>Dinner</th></tr>";
    getWeekdayRows().forEach(row => {
      body += `<tr><td><strong>${row.label}</strong></td><td>${dishNamesHtml(row.lunchKey)}</td><td>${dishNamesHtml(row.dinnerKey)}</td></tr>`;
    });
  } else {
    getSlotsForScope(mpCurrentPlan.scope).forEach(slotDef => {
      body += `<tr><td><strong>${escapeHtml(slotDef.label)}</strong></td><td>${dishNamesHtml(slotDef.key)}</td></tr>`;
    });
  }
  body += "</table>";

  return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body>${body}</body></html>`;
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
