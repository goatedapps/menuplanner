// Controller for index.html: scope/mode picker, tag include/exclude chips,
// resume banner, and handoff into planner.html via sessionStorage.

document.addEventListener("DOMContentLoaded", () => {
  const resumeContainer = document.getElementById("mp-resume-banner-container");
  const existingPlan = loadPlan();
  if (existingPlan) {
    const banner = document.createElement("div");
    banner.className = "mp-resume-banner";
    banner.innerHTML = `
      <span>You have a saved <strong>${existingPlan.scope}</strong> plan in progress.</span>
      <a class="mp-btn mp-btn-primary" href="planner.html">Resume last plan</a>
    `;
    resumeContainer.appendChild(banner);
  }

  renderSavedPlans();

  // Deliberately does NOT restore the last scope — "Meal of Fortune" is meant
  // to be the page's default landing tab every time (see its radio's `checked`
  // in index.html), not just on a first-ever visit. Mode still restores, so
  // whichever normal scope the user switches to keeps their usual preference.
  const lastChoice = loadLastChoice();
  if (lastChoice) {
    const modeInputId = lastChoice.mode === "autogenerate" ? "mp-mode-auto" : "mp-mode-manual";
    const modeInput = document.getElementById(modeInputId);
    if (modeInput) modeInput.checked = true;
  }

  const autogenOptions = document.getElementById("mp-autogen-options");
  function updateAutogenVisibility() {
    const mode = document.querySelector('input[name="mp-mode"]:checked').value;
    autogenOptions.style.display = mode === "autogenerate" ? "block" : "none";
  }
  document.querySelectorAll('input[name="mp-mode"]').forEach(input => {
    input.addEventListener("change", updateAutogenVisibility);
  });
  updateAutogenVisibility();

  // Meal of Fortune is a different flow entirely (no mode/Start button — the
  // wheel's own Spin button is the equivalent action), but tag filters
  // (#mp-autogen-options) apply to both, so rather than duplicating that chip
  // UI/state, the same DOM node is reparented between the two flows: normal
  // scopes keep it in section 2, fortune moves it below the wheel (the user
  // wants it there, not above, unlike section 2's placement). Section 2 itself
  // (not just its #mp-mode-only contents) is hidden outright when fortune is
  // active — leaving it visible-but-empty left a blank card-styled box on screen.
  const modeSection = document.getElementById("mp-mode-section");
  const fortuneSection = document.getElementById("mp-fortune-section");
  const fortuneWarning = document.getElementById("mp-fortune-warning");
  const startBtn = document.getElementById("mp-start-btn");
  function updateScopeVisibility() {
    const scope = document.querySelector('input[name="mp-scope"]:checked').value;
    const isFortune = scope === "fortune";
    modeSection.hidden = isFortune;
    fortuneSection.hidden = !isFortune;
    startBtn.style.display = isFortune ? "none" : "";
    if (isFortune) {
      fortuneSection.insertBefore(autogenOptions, fortuneWarning);
    } else {
      modeSection.appendChild(autogenOptions);
    }
  }
  document.querySelectorAll('input[name="mp-scope"]').forEach(input => {
    input.addEventListener("change", updateScopeVisibility);
  });
  updateScopeVisibility();

  // tag -> "include" | "exclude"; absent means neutral.
  const tagStates = {};
  const tagChipsContainer = document.getElementById("mp-tag-chips");
  getAllTags(MP_ITEMS).forEach(tag => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "mp-chip";
    chip.textContent = tag;
    chip.addEventListener("click", () => {
      const current = tagStates[tag];
      if (!current) {
        tagStates[tag] = "include";
        chip.classList.add("mp-chip-include");
      } else if (current === "include") {
        tagStates[tag] = "exclude";
        chip.classList.remove("mp-chip-include");
        chip.classList.add("mp-chip-exclude");
      } else {
        delete tagStates[tag];
        chip.classList.remove("mp-chip-exclude");
      }
    });
    tagChipsContainer.appendChild(chip);
  });

  // Meal of Fortune reads the same live tagStates via these accessors rather
  // than duplicating a second chip UI — one set of filters drives both flows.
  initFortuneWheel({
    getIncludeTags: () => Object.keys(tagStates).filter(t => tagStates[t] === "include"),
    getExcludeTags: () => Object.keys(tagStates).filter(t => tagStates[t] === "exclude")
  });

  document.getElementById("mp-start-btn").addEventListener("click", () => {
    const scope = document.querySelector('input[name="mp-scope"]:checked').value;
    const mode = document.querySelector('input[name="mp-mode"]:checked').value;
    const warningEl = document.getElementById("mp-tag-warning");
    warningEl.innerHTML = "";

    const includeTags = Object.keys(tagStates).filter(t => tagStates[t] === "include");
    const excludeTags = Object.keys(tagStates).filter(t => tagStates[t] === "exclude");

    if (mode === "autogenerate") {
      const candidates = getGeneratorCandidates(MP_ITEMS, includeTags, excludeTags);
      if (candidates.length === 0) {
        warningEl.innerHTML = '<div class="mp-warning">No menu items match those tag filters. Try loosening them.</div>';
        return;
      }
    }

    saveLastChoice({ scope, mode });
    sessionStorage.setItem("menuPlanner.pendingChoice", JSON.stringify({ scope, mode, includeTags, excludeTags }));
    window.location.href = "planner.html";
  });
});

// Renders the collapsed "Saved Menu Plans" section (defaults collapsed,
// unlike library.html's categories — this list is a quick-access shelf, not
// something to browse open by default) into #mp-saved-plans-container.
// Reuses library.js's chalkboard-style collapsible classes for visual
// consistency rather than introducing new ones. Omitted entirely (no empty
// <details>) when there are no saved plans yet.
function escapeHtmlForIndex(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderSavedPlans() {
  const container = document.getElementById("mp-saved-plans-container");
  container.innerHTML = "";
  const savedPlans = loadSavedPlans();
  if (savedPlans.length === 0) return;

  const details = document.createElement("details");
  details.className = "mp-library-category";
  details.id = "mp-saved-plans-details";

  const summary = document.createElement("summary");
  summary.className = "mp-library-category-heading";
  summary.textContent = `Saved Menu Plans (${savedPlans.length})`;
  details.appendChild(summary);

  const list = document.createElement("div");
  list.className = "mp-saved-plans-list";
  const scopeLabels = { meal: "Single Meal", day: "Full Day", week: "Full Week" };
  savedPlans.slice().reverse().forEach(entry => { // most-recently-saved first
    const row = document.createElement("div");
    row.className = "mp-saved-plan-row";

    const loadBtn = document.createElement("button");
    loadBtn.type = "button";
    loadBtn.className = "mp-saved-plan-load";
    const savedDate = new Date(entry.savedAt).toLocaleDateString();
    loadBtn.innerHTML = `
      <span class="mp-saved-plan-name">${escapeHtmlForIndex(entry.name)}</span>
      <span class="mp-saved-plan-meta">${scopeLabels[entry.plan.scope] || entry.plan.scope} &middot; saved ${savedDate}</span>
    `;
    loadBtn.addEventListener("click", () => {
      if (entry.plan.version !== MP_PLAN_VERSION) {
        alert("This saved plan is from an older version of the app and can't be loaded.");
        return;
      }
      savePlan(entry.plan);
      window.location.href = "planner.html";
    });
    row.appendChild(loadBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "mp-saved-plan-delete";
    deleteBtn.setAttribute("aria-label", `Delete ${entry.name}`);
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Delete saved plan "${entry.name}"?`)) {
        removeSavedPlan(entry.id);
        renderSavedPlans();
      }
    });
    row.appendChild(deleteBtn);

    list.appendChild(row);
  });
  details.appendChild(list);
  container.appendChild(details);
}
