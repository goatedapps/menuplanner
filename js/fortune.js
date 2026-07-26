// "Meal of Fortune" wheel on index.html. Spins among a small set of
// candidate MEALS (not single dishes) built via generator.js's own
// fillNormalMeal() — so a landed result is a real, rule-abiding meal (a
// one-dish anchor still gets its usual vegetable pairing, etc.), not a new
// generation path of its own. Reuses index.js's live tag-filter state via
// the getIncludeTags/getExcludeTags accessors passed into initFortuneWheel()
// rather than duplicating a second chip UI.

const MP_FORTUNE_MAX_SEGMENTS = 8;
const MP_FORTUNE_COLORS = ["var(--teal)", "var(--red)", "var(--brass)", "var(--steel)"];
const MP_FORTUNE_LABEL_RADIUS = 100; // px — how far out the wedge labels sit; keep under #mp-fortune-wheel's 130px radius so labels don't clip past the rim

let mpFortuneSpinning = false;
let mpFortuneGetIncludeTags = () => [];
let mpFortuneGetExcludeTags = () => [];

function initFortuneWheel({ getIncludeTags, getExcludeTags }) {
  mpFortuneGetIncludeTags = getIncludeTags;
  mpFortuneGetExcludeTags = getExcludeTags;
  document.getElementById("mp-fortune-spin-btn").addEventListener("click", () => {
    spinFortuneWheel(mpFortuneGetIncludeTags(), mpFortuneGetExcludeTags());
  });
}

// Builds up to MP_FORTUNE_MAX_SEGMENTS candidate meals, one per wheel
// segment, deduping identical results. mealType is randomized per pick
// (rather than fixed) purely for variety spin-to-spin — sometimes leaning
// seafood-favoring dinner-style picks, sometimes lunch-style.
function buildFortuneCandidateMeals(includeTags, excludeTags) {
  const candidates = getGeneratorCandidates(MP_ITEMS, includeTags, excludeTags);
  if (candidates.length === 0) return [];

  const windowSize = Math.max(0, Math.min(candidates.length - 1, 4));
  const meals = [];
  const seenKeys = new Set();
  let guard = 0;
  while (meals.length < MP_FORTUNE_MAX_SEGMENTS && guard < 40) {
    guard++;
    const mealType = Math.random() < 0.5 ? "lunch" : "dinner";
    const dishIds = fillNormalMeal(candidates, mealType, [], windowSize);
    if (dishIds.length === 0) break;
    const key = [...dishIds].sort().join(",");
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    meals.push(dishIds);
  }
  return meals;
}

function spinFortuneWheel(includeTags, excludeTags) {
  if (mpFortuneSpinning) return;

  const warningEl = document.getElementById("mp-fortune-warning");
  warningEl.innerHTML = "";
  document.getElementById("mp-fortune-result").hidden = true;

  const meals = buildFortuneCandidateMeals(includeTags, excludeTags);
  if (meals.length === 0) {
    warningEl.innerHTML = '<div class="mp-warning">No menu items match those tag filters. Try loosening them.</div>';
    return;
  }

  renderFortuneWheelSegments(meals);

  const winnerIndex = Math.floor(Math.random() * meals.length);
  const segmentAngle = 360 / meals.length;
  const winnerCenter = winnerIndex * segmentAngle + segmentAngle / 2;
  const fullSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full turns
  const finalRotation = fullSpins * 360 + (360 - winnerCenter);

  const wheel = document.getElementById("mp-fortune-wheel");
  const spinBtn = document.getElementById("mp-fortune-spin-btn");
  mpFortuneSpinning = true;
  spinBtn.disabled = true;

  // Reset instantly (no transition) before applying the new spin, so every
  // spin animates from a clean 0deg rather than compounding forever.
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  void wheel.offsetHeight; // force reflow so the reset above actually takes effect
  wheel.style.transition = "transform 4.5s cubic-bezier(0.17, 0.67, 0.14, 0.99)";
  wheel.style.transform = `rotate(${finalRotation}deg)`;

  wheel.addEventListener("transitionend", function onEnd() {
    wheel.removeEventListener("transitionend", onEnd);
    mpFortuneSpinning = false;
    spinBtn.disabled = false;
    revealFortuneWinner(meals[winnerIndex], includeTags, excludeTags);
  }, { once: true });
}

// The wheel's background is one conic-gradient (equal pie slices, no
// per-segment clip-path needed); labels are separate absolutely-positioned
// spans layered on top, each rotated to its segment's mid-angle — rotate(0)
// naturally points "up" via translateY(-radius), matching conic-gradient's
// own 0deg-at-top convention, so no extra angle offset is needed.
function renderFortuneWheelSegments(meals) {
  const wheel = document.getElementById("mp-fortune-wheel");
  wheel.innerHTML = "";

  const segmentAngle = 360 / meals.length;
  const stops = meals.map((dishIds, i) => {
    const color = MP_FORTUNE_COLORS[i % MP_FORTUNE_COLORS.length];
    return `${color} ${i * segmentAngle}deg ${(i + 1) * segmentAngle}deg`;
  });
  wheel.style.background = `conic-gradient(${stops.join(", ")})`;

  meals.forEach((dishIds, i) => {
    const anchor = getItemById(MP_ITEMS, dishIds[0]);
    const name = anchor ? anchor.name : "Mystery dish";
    const label = document.createElement("span");
    label.className = "mp-fortune-wedge-label";
    label.textContent = name.length > 16 ? `${name.slice(0, 15)}…` : name;
    const midAngle = i * segmentAngle + segmentAngle / 2;
    label.style.transform = `translate(-50%, -50%) rotate(${midAngle}deg) translateY(-${MP_FORTUNE_LABEL_RADIUS}px)`;
    wheel.appendChild(label);
  });
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
    // Deliberately no saveLastChoice() here — a spontaneous fortune pick
    // shouldn't override the user's normal remembered scope/mode default.
    sessionStorage.setItem("menuPlanner.pendingChoice", JSON.stringify({
      scope: "meal",
      mode: "fortune",
      dishIds,
      includeTags,
      excludeTags
    }));
    window.location.href = "planner.html";
  });
  actions.appendChild(useBtn);

  const againBtn = document.createElement("button");
  againBtn.type = "button";
  againBtn.className = "mp-btn";
  againBtn.textContent = "Spin Again";
  againBtn.addEventListener("click", () => spinFortuneWheel(includeTags, excludeTags));
  actions.appendChild(againBtn);

  resultEl.appendChild(actions);
}
