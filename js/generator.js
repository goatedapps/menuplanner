// "week" scope has real calendar-day identity (Mon-Fri) so the day-specific
// rules (meatless Monday, fixed Tuesday dinner, Wednesday dinner structure)
// can hook off literal slot keys. "meal"/"day" scopes stay calendar-agnostic.
const MP_WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri"];
const MP_WEEKDAY_LABELS = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" };
const MP_FIXED_TUESDAY_DINNER_ID = "yong-tau-foo-bee-tai-mak";
const MP_MEAL_MAX_DISHES = 4;
const MP_SEAFOOD_WEIGHT = 2; // relative pick weight favoring seafood at dinner / non-seafood at lunch

// Returns the ordered list of {key, label} slot descriptors for a given scope.
// "meal" and "day" keep the generic "day{N}-{meal}" key scheme; "week" is a
// deliberate exception (see CLAUDE.md) since it now has real weekday identity.
function getSlotsForScope(scope) {
  if (scope === "meal") {
    return [{ key: "day1-lunch", label: "Meal" }];
  }
  if (scope === "day") {
    return [
      { key: "day1-lunch", label: "Lunch" },
      { key: "day1-dinner", label: "Dinner" }
    ];
  }
  if (scope === "week") {
    const slots = [];
    MP_WEEKDAY_KEYS.forEach(day => {
      slots.push({ key: `${day}-lunch`, label: `${MP_WEEKDAY_LABELS[day]} · Lunch` });
      slots.push({ key: `${day}-dinner`, label: `${MP_WEEKDAY_LABELS[day]} · Dinner` });
    });
    return slots;
  }
  return [];
}

// The single definition of "what counts as one calendar day" per scope, used
// by the rice-based-per-day rule (b). "meal" scope has no day context, so it
// returns [] and callers treat that as a no-op.
function getDayGroupsForScope(scope) {
  if (scope === "week") {
    return MP_WEEKDAY_KEYS.map(day => ({ dayKey: day, slotKeys: [`${day}-lunch`, `${day}-dinner`] }));
  }
  if (scope === "day") {
    return [{ dayKey: "day1", slotKeys: ["day1-lunch", "day1-dinner"] }];
  }
  return [];
}

// Ordered weekday rows for the week-scope table view.
function getWeekdayRows() {
  return MP_WEEKDAY_KEYS.map(day => ({
    dayKey: day,
    label: MP_WEEKDAY_LABELS[day],
    lunchKey: `${day}-lunch`,
    dinnerKey: `${day}-dinner`
  }));
}

function getMealTypeFromSlotKey(slotKey) {
  return slotKey.endsWith("-dinner") ? "dinner" : "lunch";
}

function isVegetarianItem(item) {
  return item.tags.includes("vegetarian") || item.tags.includes("vegan");
}

// includeTags: item must have at least one (OR) if includeTags is non-empty.
// excludeTags: item must have none of these.
function getGeneratorCandidates(items, includeTags, excludeTags) {
  return items.filter(item => {
    const matchesInclude = includeTags.length === 0 || includeTags.some(tag => item.tags.includes(tag));
    const matchesExclude = !excludeTags.some(tag => item.tags.includes(tag));
    return matchesInclude && matchesExclude;
  });
}

// Rule e (soft): duplicates seafood items to up-weight them at dinner and
// down-weight them at lunch, without ever excluding them outright.
function weightBySeafoodPreference(pool, mealType) {
  const weighted = [];
  pool.forEach(item => {
    const isSeafood = item.tags.includes("seafood");
    const weight = mealType === "dinner" ? (isSeafood ? MP_SEAFOOD_WEIGHT : 1) : (isSeafood ? 1 : MP_SEAFOOD_WEIGHT);
    for (let i = 0; i < weight; i++) weighted.push(item);
  });
  return weighted;
}

function pickRandom(pool) {
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}

// Picks honoring the sliding recency window; falls back to the full pool
// rather than failing when the window empties it out (same self-shrinking
// behavior as before, just applied per-dish instead of per-slot now).
function pickWithRecency(pool, recentIds, windowSize) {
  const eligible = pool.filter(item => !recentIds.includes(item.id));
  return pickRandom(eligible.length > 0 ? eligible : pool);
}

// Builds one "normal" (non-fixed) meal: rule c short-circuits a one-dish pick
// into a one-dish+vegetable pairing; otherwise builds a component-style meal,
// excluding already-used sub-types at pick time (rule h) and back-filling a
// carbohydrate if nothing else qualifies (rule g). Best-effort throughout —
// never fails; if a rule can't be satisfied (e.g. no vegetable dish in the
// filtered pool) the meal is simply left as close as it can get.
function fillNormalMeal(pool, mealType, recentIds, windowSize) {
  if (pool.length === 0) return [];

  const weightedPool = weightBySeafoodPreference(pool, mealType);
  const first = pickWithRecency(weightedPool, recentIds, windowSize);
  if (!first) return [];

  if (first.dishType === "one-dish") {
    const vegCandidates = pool.filter(item =>
      item.id !== first.id && item.subType !== first.subType && getDishGroup(item.subType) === "vegetable"
    );
    const veg = pickWithRecency(vegCandidates, recentIds, windowSize);
    return veg ? [first.id, veg.id] : [first.id];
  }

  const dishes = [first];
  const usedSubTypes = new Set([first.subType]);
  const targetCount = 2 + Math.round(Math.random()); // 2 or 3 components
  while (dishes.length < targetCount) {
    const eligible = pool.filter(item =>
      item.dishType !== "one-dish" && !usedSubTypes.has(item.subType) && !dishes.some(d => d.id === item.id)
    );
    const next = pickWithRecency(eligible, recentIds, windowSize);
    if (!next) break;
    dishes.push(next);
    usedSubTypes.add(next.subType);
  }

  if (!dishes.some(d => d.isCarbohydrate)) {
    const carbCandidates = pool.filter(item =>
      item.isCarbohydrate && !usedSubTypes.has(item.subType) && !dishes.some(d => d.id === item.id)
    );
    const carb = pickWithRecency(carbCandidates, recentIds, windowSize);
    if (carb) {
      if (dishes.length >= MP_MEAL_MAX_DISHES) dishes.pop();
      dishes.push(carb);
      usedSubTypes.add(carb.subType);
    }
  }

  // Defensive rule-h pass — should be unreachable given pick-time exclusion above.
  const seenSubTypes = new Set();
  const deduped = dishes.filter(d => {
    if (seenSubTypes.has(d.subType)) return false;
    seenSubTypes.add(d.subType);
    return true;
  });

  return deduped.map(d => d.id);
}

// Rule f: Tuesday dinner is always this exact dish. Returns null (signaling
// "fall back to normal fill") if it's ever missing from the menu.
function buildFixedTuesdayDinner(items) {
  const fixed = getItemById(items, MP_FIXED_TUESDAY_DINNER_ID);
  return fixed ? [fixed.id] : null;
}

// Rule d: Wednesday dinner's fixed structure — plain rice, a vegetable, a
// meat-or-fish dish, a soup, and one more (any) dish. Each part is simply
// omitted rather than blocking generation if the filtered pool has no
// eligible candidate.
function buildWednesdayDinner(pool, recentIds, windowSize) {
  const weightedPool = weightBySeafoodPreference(pool, "dinner");
  const used = new Set();
  const dishes = [];

  function takeFromGroup(matcher) {
    const candidates = weightedPool.filter(item =>
      matcher(item) && !used.has(item.subType) && !dishes.some(d => d.id === item.id)
    );
    const pick = pickWithRecency(candidates, recentIds, windowSize);
    if (pick) {
      dishes.push(pick);
      used.add(pick.subType);
    }
  }

  takeFromGroup(item => item.subType === "rice-plain");
  takeFromGroup(item => getDishGroup(item.subType) === "vegetable");
  takeFromGroup(item => getDishGroup(item.subType) === "protein");
  takeFromGroup(item => getDishGroup(item.subType) === "soup");
  takeFromGroup(() => true);

  return dishes.map(d => d.id);
}

// Fills every slot for the scope, filtering by tags, applying rules a-h as
// best-effort heuristics (never retries/backtracks/fails — see CLAUDE.md),
// and avoiding dish-level repeats within a sliding window that shrinks
// automatically when the candidate pool is small.
// Returns { slots, warning } — slots is null and warning is set only when the
// tag-filtered pool is empty outright; otherwise slots is always populated,
// leaning toward the rules where the candidate pool makes it easy.
function generatePlanSlots(items, scope, includeTags, excludeTags) {
  const candidates = getGeneratorCandidates(items, includeTags, excludeTags);
  if (candidates.length === 0) {
    return { slots: null, warning: "No menu items match those tag filters. Try loosening them." };
  }

  const slotDefs = getSlotsForScope(scope);
  const windowSize = Math.max(0, Math.min(candidates.length - 1, 4));
  const recentWindow = [];
  const slots = {};

  slotDefs.forEach(slotDef => {
    const slotKey = slotDef.key;
    const mealType = getMealTypeFromSlotKey(slotKey);
    let dishIds = null;

    if (scope === "week" && slotKey === "tue-dinner") {
      dishIds = buildFixedTuesdayDinner(items);
    } else if (scope === "week" && slotKey === "wed-dinner") {
      dishIds = buildWednesdayDinner(candidates, recentWindow, windowSize);
    }

    if (dishIds === null) {
      let pool = candidates;
      if (scope === "week" && slotKey === "mon-dinner") {
        const vegetarianPool = candidates.filter(isVegetarianItem);
        if (vegetarianPool.length > 0) pool = vegetarianPool;
      }
      dishIds = fillNormalMeal(pool, mealType, recentWindow, windowSize);
    }

    slots[slotKey] = dishIds;
    dishIds.forEach(id => {
      recentWindow.push(id);
      if (recentWindow.length > windowSize) recentWindow.shift();
    });
  });

  // Rule b: every day needs at least one rice-based dish across its meals.
  // Best-effort backfill only — never touches a fixed (Tue/Wed) or
  // one-dish-anchored meal, since that would break rules c/d/f.
  getDayGroupsForScope(scope).forEach(group => {
    const dayDishIds = group.slotKeys.flatMap(key => slots[key] || []);
    const hasRice = dayDishIds.some(id => {
      const item = getItemById(items, id);
      return item && item.isRiceBased;
    });
    if (hasRice) return;

    const riceCandidates = candidates.filter(item => item.isRiceBased);
    if (riceCandidates.length === 0) return;

    const swappableKey = group.slotKeys.find(key => {
      if (scope === "week" && (key === "tue-dinner" || key === "wed-dinner")) return false;
      const ids = slots[key] || [];
      if (ids.length === 0 || ids.length >= MP_MEAL_MAX_DISHES) return false;
      return !ids.some(id => {
        const it = getItemById(items, id);
        return it && it.dishType === "one-dish";
      });
    });
    if (!swappableKey) return;

    const usedSubTypes = new Set(slots[swappableKey].map(id => getItemById(items, id).subType));
    const eligibleRice = riceCandidates.filter(item => !usedSubTypes.has(item.subType));
    const rice = pickRandom(eligibleRice.length ? eligibleRice : riceCandidates);
    slots[swappableKey] = [...slots[swappableKey], rice.id];
  });

  return { slots, warning: null };
}
