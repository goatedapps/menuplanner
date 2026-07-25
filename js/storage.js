// localStorage persistence for the current plan and last-used scope/mode choice.
const MP_PLAN_KEY = "menuPlanner.currentPlan";
const MP_LAST_CHOICE_KEY = "menuPlanner.lastChoice";
const MP_PLAN_VERSION = 2;

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
