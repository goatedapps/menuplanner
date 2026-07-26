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

  const lastChoice = loadLastChoice();
  if (lastChoice) {
    const scopeInput = document.getElementById(`mp-scope-${lastChoice.scope}`);
    if (scopeInput) scopeInput.checked = true;
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
  // (#mp-autogen-options) apply to both, so that block stays visible either way.
  const modeOnly = document.getElementById("mp-mode-only");
  const fortuneSection = document.getElementById("mp-fortune-section");
  const startBtn = document.getElementById("mp-start-btn");
  function updateScopeVisibility() {
    const scope = document.querySelector('input[name="mp-scope"]:checked').value;
    const isFortune = scope === "fortune";
    modeOnly.style.display = isFortune ? "none" : "block";
    fortuneSection.hidden = !isFortune;
    startBtn.style.display = isFortune ? "none" : "";
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
