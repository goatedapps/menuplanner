// Add the user's Word menus here after their dish lists are supplied.
// Each entry is { id, name, description, plan }, where plan uses the same
// version/scope/slots/customDishes/notes schema as the normal weekly editor.
// Never replace the user's stored plans with these reusable templates.
const MP_WEEKLY_MENUS = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mp-blank-week").addEventListener("click", () => {
    sessionStorage.setItem("menuPlanner.pendingChoice", JSON.stringify({ scope: "week", mode: "manual" }));
    navigateWithButtonSound("planner.html");
  });
  renderWeeklyMenuShelf();
});

function renderWeeklyMenuShelf() {
  const templates = document.getElementById("mp-weekly-templates");
  templates.replaceChildren();
  if (!MP_WEEKLY_MENUS.length) {
    const empty = document.createElement("div"); empty.className = "mp-template-empty";
    empty.innerHTML = '<p>No Word menus added yet.</p>';
    templates.appendChild(empty);
  }
  MP_WEEKLY_MENUS.forEach(template => {
    const card = document.createElement("article"); card.className = "mp-template-card";
    const name = document.createElement("h3"); name.textContent = template.name;
    const description = document.createElement("p"); description.textContent = template.description || "A reusable Monday–Friday menu.";
    const open = document.createElement("button"); open.className = "mp-btn mp-btn-primary"; open.textContent = "Open and edit";
    open.addEventListener("click", () => {
      const plan = JSON.parse(JSON.stringify(template.plan));
      if (plan.scope !== "week" || plan.version !== MP_PLAN_VERSION) { mpNotify("This menu needs to be updated before it can be opened."); return; }
      delete plan.sourceSavedPlanId;
      plan.name = template.name; plan.createdAt = new Date().toISOString();
      sessionStorage.removeItem("menuPlanner.pendingChoice"); savePlan(plan);
      navigateWithButtonSound("planner.html");
    });
    card.append(name, description, open); templates.appendChild(card);
  });
  const saved = document.getElementById("mp-weekly-saved"); saved.replaceChildren();
  const entries = loadSavedPlans().filter(entry => entry.plan?.scope === "week");
  if (!entries.length) { const empty = document.createElement("p"); empty.className = "mp-empty-note"; empty.textContent = "No saved weekly plans yet. Save one from the weekly editor and it will appear here."; saved.appendChild(empty); }
  entries.slice().reverse().forEach(entry => {
    const row = document.createElement("div"); row.className = "mp-saved-plan-row";
    const button = document.createElement("button"); button.className = "mp-saved-plan-load";
    const title = document.createElement("span"); title.className = "mp-saved-plan-name"; title.textContent = entry.name;
    const meta = document.createElement("span"); meta.className = "mp-saved-plan-meta"; meta.textContent = "Open in the weekly editor";
    button.append(title, meta); button.addEventListener("click", () => { if (openSavedPlan(entry.id)) navigateWithButtonSound("planner.html"); else mpNotify("This saved plan cannot be opened."); });
    row.appendChild(button); saved.appendChild(row);
  });
}
