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
      slotDefs.forEach(s => { plan.slots[s.key] = null; });

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
  const grid = document.getElementById("mp-planner-grid");
  grid.innerHTML = "";
  getSlotsForScope(mpCurrentPlan.scope).forEach(slotDef => {
    grid.appendChild(buildSlotCard(slotDef));
  });
}

function buildSlotCard(slotDef) {
  const itemId = mpCurrentPlan.slots[slotDef.key];
  const item = itemId ? getItemById(MP_ITEMS, itemId) : null;

  const card = document.createElement("div");
  card.className = "mp-slot-card";

  const label = document.createElement("div");
  label.className = "mp-slot-label";
  label.textContent = slotDef.label;
  card.appendChild(label);

  const thumb = document.createElement("div");
  thumb.className = "mp-slot-thumb";
  thumb.innerHTML = item && item.image ? `<img src="${item.image}" alt="">` : "🍽️";
  card.appendChild(thumb);

  const name = document.createElement("div");
  name.className = item ? "mp-slot-name" : "mp-slot-name mp-slot-empty";
  name.textContent = item ? item.name : "Choose an item…";
  card.appendChild(name);

  if (item) {
    const tags = document.createElement("div");
    tags.className = "mp-slot-tags";
    tags.textContent = item.tags.join(", ");
    card.appendChild(tags);
  }

  const changeBtn = document.createElement("button");
  changeBtn.type = "button";
  changeBtn.className = "mp-btn";
  changeBtn.textContent = item ? "Change" : "Choose";
  changeBtn.addEventListener("click", () => {
    openPicker({
      slotKey: slotDef.key,
      currentItemId: itemId,
      onSelect: newItemId => assignSlot(slotDef.key, newItemId)
    });
  });
  card.appendChild(changeBtn);

  return card;
}

function assignSlot(slotKey, itemId) {
  mpCurrentPlan.slots[slotKey] = itemId;
  savePlan(mpCurrentPlan);
  renderPlannerGrid();
}
