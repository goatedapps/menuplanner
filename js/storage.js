// localStorage persistence for the current plan, last-used scope/mode
// choice, and the named "Saved Menu Plans" list.
const MP_PLAN_KEY = "menuPlanner.currentPlan";
const MP_LAST_CHOICE_KEY = "menuPlanner.lastChoice";
const MP_PLAN_VERSION = 2;
const MP_SAVED_PLANS_KEY = "menuPlanner.savedPlans";
const MP_MAX_SAVED_PLANS = 10;

function loadPlan() {
  const raw = localStorage.getItem(MP_PLAN_KEY);
  if (!raw) return null;
  try {
    const plan = JSON.parse(raw);
    if (!plan || plan.version !== MP_PLAN_VERSION || !plan.slots) return null;
    return plan;
  } catch (e) {
    return null;
  }
}

function savePlan(plan) {
  localStorage.setItem(MP_PLAN_KEY, JSON.stringify(plan));
}

function clearPlan() {
  localStorage.removeItem(MP_PLAN_KEY);
}

function loadLastChoice() {
  const raw = localStorage.getItem(MP_LAST_CHOICE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function saveLastChoice(choice) {
  localStorage.setItem(MP_LAST_CHOICE_KEY, JSON.stringify(choice));
}

// Distinct from the single auto-saved "current plan" above — a named,
// user-curated list the user explicitly chooses to keep, via planner.html's
// "Save Meal" button. Returns [] on missing/corrupt data (same graceful
// convention as loadPlan()) rather than throwing.
function loadSavedPlans() {
  const raw = localStorage.getItem(MP_SAVED_PLANS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveSavedPlansList(list) {
  localStorage.setItem(MP_SAVED_PLANS_KEY, JSON.stringify(list));
}

// Returns { ok: true, entry } or { ok: false, reason } — capped at
// MP_MAX_SAVED_PLANS so saving never silently evicts an older plan; the
// user has to free up a slot themselves via removeSavedPlan() first.
function addSavedPlan(name, plan) {
  const list = loadSavedPlans();
  if (list.length >= MP_MAX_SAVED_PLANS) {
    return { ok: false, reason: `You already have ${MP_MAX_SAVED_PLANS} saved meal plans — delete one first.` };
  }
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    savedAt: new Date().toISOString(),
    plan
  };
  list.push(entry);
  saveSavedPlansList(list);
  return { ok: true, entry };
}

function removeSavedPlan(id) {
  const list = loadSavedPlans().filter(entry => entry.id !== id);
  saveSavedPlansList(list);
}
