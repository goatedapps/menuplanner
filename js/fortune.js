// "Meal of Fortune" wheel on index.html. Lands on a real, rule-abiding meal
// built via generator.js's own fillNormalMeal() — so a one-dish anchor still
// gets its usual vegetable pairing, etc. — not a new generation path of its
// own. Reuses index.js's live tag-filter state via the getIncludeTags/
// getExcludeTags accessors passed into initFortuneWheel() rather than
// duplicating a second chip UI.
//
// The wheel's visible segments are purely decorative (generic "A"/"B"/...
// labels, built once and never rebuilt) and deliberately NOT tied to the
// actual candidate dish picked each spin — with real dish names it could
// only ever show a handful of candidates and would be unreadable at this
// segment count anyway. Which segment the pointer lands on is just a random
// animation target; the real winning meal (picked independently) is
// revealed below the wheel once it stops.

const MP_FORTUNE_SEGMENTS = 16;
const MP_FORTUNE_LETTERS = "ABCDEFGHIJKLMNOP";
const MP_FORTUNE_COLORS = ["var(--fortune-a)", "var(--fortune-b)", "var(--fortune-c)", "var(--fortune-d)"];
// Wedge label placement uses container units so hidden/resized wheels stay aligned.

let mpFortuneSpinning = false;
let mpFortuneGetIncludeTags = () => [];
let mpFortuneGetExcludeTags = () => [];

function initFortuneWheel({ getIncludeTags, getExcludeTags }) {
  mpFortuneGetIncludeTags = getIncludeTags;
  mpFortuneGetExcludeTags = getExcludeTags;
  renderFortuneWheelStatic();
  document.getElementById("mp-fortune-spin-btn").addEventListener("click", () => {
    spinFortuneWheel(mpFortuneGetIncludeTags(), mpFortuneGetExcludeTags());
  });
}

// Built once (not per spin): a fixed conic-gradient background plus one
// letter label per segment. Labels are absolutely-positioned spans layered
// on top, each rotated to its segment's mid-angle — rotate(0) naturally
// points "up" via translateY(-radius), matching conic-gradient's own
// 0deg-at-top convention, so no extra angle offset is needed.
function renderFortuneWheelStatic() {
  const wheel = document.getElementById("mp-fortune-wheel");
  wheel.innerHTML = "";

  // offsetWidth reads the wheel's actual rendered size (forces a sync
  // layout, which is fine here — called once, not per frame) so labels
  // land correctly whether the wheel is 380px or a smaller mobile size.

  const segmentAngle = 360 / MP_FORTUNE_SEGMENTS;
  const stops = [];
  for (let i = 0; i < MP_FORTUNE_SEGMENTS; i++) {
    const color = MP_FORTUNE_COLORS[i % MP_FORTUNE_COLORS.length];
    stops.push(`${color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`);
  }
  wheel.style.background = `conic-gradient(${stops.join(", ")})`;

  for (let i = 0; i < MP_FORTUNE_SEGMENTS; i++) {
    const label = document.createElement("span");
    label.className = "mp-fortune-wedge-label";
    label.textContent = MP_FORTUNE_LETTERS[i] || "?";
    const midAngle = i * segmentAngle + segmentAngle / 2;
    label.style.transform = `translate(-50%, -50%) rotate(${midAngle}deg) translateY(-38cqw)`;
    wheel.appendChild(label);
  }
}

function spinFortuneWheel(includeTags, excludeTags) {
  if (mpFortuneSpinning) return;

  const warningEl = document.getElementById("mp-fortune-warning");
  warningEl.innerHTML = "";
  document.getElementById("mp-fortune-result").hidden = true;

  const candidates = getGeneratorCandidates(MP_ITEMS, includeTags, excludeTags);
  if (candidates.length === 0) {
    warningEl.innerHTML = '<div class="mp-warning">No menu items match those tag filters. Try loosening them.</div>';
    return;
  }
  const mealType = Math.random() < 0.5 ? "lunch" : "dinner";
  const windowSize = Math.max(0, Math.min(candidates.length - 1, 4));
  const winningDishIds = fillNormalMeal(candidates, mealType, [], windowSize);
  if (winningDishIds.length === 0) {
    warningEl.innerHTML = '<div class="mp-warning">No menu items match those tag filters. Try loosening them.</div>';
    return;
  }

  // The landing segment is just an animation target, unrelated to which
  // meal actually won (see file header) — any of the 16 segments will do.
  const wedgeIndex = Math.floor(Math.random() * MP_FORTUNE_SEGMENTS);
  const segmentAngle = 360 / MP_FORTUNE_SEGMENTS;
  const wedgeCenter = wedgeIndex * segmentAngle + segmentAngle / 2;
  const fullSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full turns
  const finalRotation = fullSpins * 360 + (360 - wedgeCenter);

  const wheel = document.getElementById("mp-fortune-wheel");
  const spinBtn = document.getElementById("mp-fortune-spin-btn");
  mpFortuneSpinning = true;
  spinBtn.disabled = true;

  function finishSpin() {
    mpFortuneSpinning = false;
    spinBtn.disabled = false;
    revealFortuneWinner(winningDishIds, includeTags, excludeTags);
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishSpin();
  } else if (window.gsap) {
    gsap.fromTo(wheel, { rotation: 0 }, { rotation: finalRotation, duration: 3.8, ease: "power4.out", onComplete: finishSpin });
  } else {
    wheel.style.transition = "none";
    wheel.style.transform = "rotate(0deg)";
    void wheel.offsetHeight;
    wheel.style.transition = "transform 3.8s cubic-bezier(0.17, 0.67, 0.14, 0.99)";
    wheel.style.transform = `rotate(${finalRotation}deg)`;
    const fallback = setTimeout(finishSpin, 4000);
    wheel.addEventListener("transitionend", () => { clearTimeout(fallback); if (mpFortuneSpinning) finishSpin(); }, { once: true });
  }
}

function revealFortuneWinner(dishIds, includeTags, excludeTags) {
  const dishes = dishIds.map(id => getItemById(MP_ITEMS, id)).filter(Boolean);
  const resultEl = document.getElementById("mp-fortune-result");
  resultEl.innerHTML = "";
  resultEl.hidden = false;

  const heading = document.createElement("h3");
  heading.textContent = "Your meal:";
  resultEl.appendChild(heading);

  const list = document.createElement("div");
  list.className = "mp-fortune-result-dishes";
  dishes.forEach(dish => {
    const row = document.createElement("div");
    row.className = "mp-fortune-result-dish";
    row.innerHTML = `
      <div class="mp-item-thumb"></div>
      <div class="mp-item-name">${dish.name}</div>
      <div class="mp-item-tags">${dish.tags.join(", ")}</div>
    `;
    renderItemThumb(row.querySelector(".mp-item-thumb"), dish);
    list.appendChild(row);
  });
  resultEl.appendChild(list);

  const actions = document.createElement("div");
  actions.className = "mp-fortune-result-actions";

  const useBtn = document.createElement("button");
  useBtn.type = "button";
  useBtn.className = "mp-btn-stamp";
  useBtn.textContent = "Use This Meal!";
  useBtn.addEventListener("click", () => {
    saveLastChoice({ scope: "meal", mode: "autogenerate" });
    // Deliberately no saveLastChoice() here — a spontaneous fortune pick
    // shouldn't override the user's normal remembered scope/mode default.
    sessionStorage.setItem("menuPlanner.pendingChoice", JSON.stringify({
      scope: "meal",
      mode: "fortune",
      dishIds,
      includeTags,
      excludeTags
    }));
    navigateWithButtonSound("planner.html");
  });
  actions.appendChild(useBtn);

  // No "Spin Again" button here — the wheel's own hub button already
  // re-spins on click (spinFortuneWheel() resets/re-animates from scratch
  // regardless of current rotation), so a second control would be redundant.

  resultEl.appendChild(actions);
}
