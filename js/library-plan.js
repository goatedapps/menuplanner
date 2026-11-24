// Add a library dish to the auto-saved current plan without leaving its recipe.
function showRecipePlanTarget(item) {
  let container = document.getElementById("mp-detail-plan-target");
  if (!container) {
    container = document.createElement("div"); container.id = "mp-detail-plan-target";
    document.getElementById("mp-detail-add-btn").after(container);
  }
  const plan = loadPlan();
  if (!plan) {
    container.innerHTML = '<p>Create or open a plan first, then return here to add this dish.</p><a class="mp-btn" href="index.html">Plan a meal</a>';
    return;
  }
  const weekly = plan.scope === "week";
  const description = plan.name || ({ week: "your current week", day: "your current day", meal: "your current meal" })[plan.scope];
  container.innerHTML = `<form class="mp-plan-destination"><p>Add this dish to ${escapeHtmlForDetail(description)}.</p>${weekly ? '<label>Day<select id="mp-target-day" required></select></label>' : ""}<label>Meal<select id="mp-target-meal" required></select></label><button type="submit" class="mp-btn mp-btn-primary">Add dish</button><p id="mp-plan-add-status" role="status"></p></form>`;
  const mealSelect = container.querySelector("#mp-target-meal"), daySelect = container.querySelector("#mp-target-day");
  if (weekly) {
    getWeekdayRows().forEach(day => { const option = document.createElement("option"); option.value = day.dayKey; option.textContent = day.label; daySelect.appendChild(option); });
    ["lunch", "dinner"].forEach(meal => { const option = document.createElement("option"); option.value = meal; option.textContent = meal === "lunch" ? "Lunch" : "Dinner"; mealSelect.appendChild(option); });
  } else {
    getSlotsForScope(plan.scope).forEach(slot => { const option = document.createElement("option"); option.value = slot.key; option.textContent = slot.label; mealSelect.appendChild(option); });
  }
  container.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    const status = container.querySelector("#mp-plan-add-status"), current = loadPlan();
    if (!current || current.scope !== plan.scope || current.createdAt !== plan.createdAt) { status.textContent = "The current plan has changed. Click Add to current plan again to choose a meal."; return; }
    const key = weekly ? `${daySelect.value}-${mealSelect.value}` : mealSelect.value;
    if (!getSlotsForScope(current.scope).some(slot => slot.key === key)) return;
    const ids = current.slots[key] || [];
    if (ids.includes(item.id)) { status.textContent = "This dish is already in that meal."; return; }
    current.slots[key] = [...ids, item.id];
    try {
      savePlan(current);
      status.textContent = "Added to your plan. ";
      const link = document.createElement("a"); link.href = "planner.html"; link.textContent = "Open current plan"; status.appendChild(link);
      mpNotify("Dish added to your current plan.");
    } catch { status.textContent = "Your browser could not save this change. Free some browser storage and try again."; }
  });
  (daySelect || mealSelect).focus();
}
