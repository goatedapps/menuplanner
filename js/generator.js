// "week" scope has real calendar-day identity (Mon-Fri) so the day-specific
// rules (meatless Monday, fixed Tuesday dinner, Wednesday dinner structure)
// can hook off literal slot keys. "meal"/"day" scopes stay calendar-agnostic.
const MP_WEEKDAY_KEYS = ["mon", "tue", "wed", "thu", "fri"];
const MP_WEEKDAY_LABELS = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" };
const MP_FIXED_TUESDAY_DINNER_ID = "yong-tau-foo-bee-tai-mak";
const MP_MEAL_MAX_DISHES = 4;
const MP_SEAFOOD_WEIGHT = 2; // relative pick weight favoring seafood at dinner / non-seafood at lunch
const MP_QUICK_LUNCH_PROBABILITY = 0.8; // rule i (soft): fraction of lunch slots restricted to "quick"-tagged candidates

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

function isMeatlessItem(item) {
  return item.tags.includes("meatless");
}

// Narrows `pool` to items carrying `tag`, but only if that leaves at least
// one candidate — otherwise returns `pool` unchanged. The shared shape of
// every "soft" tag preference in this file (meatless Monday, quick lunch,
// and the match-with-rice/match-with-noodles pairing below): lean toward
// the tag, never block generation over it.
function preferTaggedPool(pool, tag) {
  const matching = pool.filter(item => item.tags.includes(tag));
  return matching.length > 0 ? matching : pool;
}

// A "plain" rice/porridge base — the component-type dish a full rice-based
// meal (rule b) can be built around, as opposed to a one-dish rice/porridge
// meal (fried rice, chicken porridge) that's already complete on its own.
function hasPlainRiceOrPorridgeBase(dishes) {
  return dishes.some(item => item.dishType === "component" && (item.subType === "rice-plain" || item.subType === "porridge"));
}

// Rule b: a meal counts as "rice-based" if it's a one-dish rice/porridge
// meal, or a plain rice/porridge base paired with at least one vegetable and
// one protein in the same meal — not just any isRiceBased dish anywhere in it.
function isRiceBasedMeal(dishIds, items) {
  const dishes = dishIds.map(id => getItemById(items, id)).filter(Boolean);
  if (dishes.some(item => item.dishType === "one-dish" && item.isRiceBased)) return true;
  if (!hasPlainRiceOrPorridgeBase(dishes)) return false;
  const hasVegetable = dishes.some(item => getDishGroup(item.subType) === "vegetable");
  const hasProtein = dishes.some(item => getDishGroup(item.subType) === "protein");
  return hasVegetable && hasProtein;
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
// into a one-dish+vegetable pairing (preferring a match-with-noodles
// vegetable if the anchor is itself noodles-tagged); otherwise builds a
// component-style meal, excluding already-used sub-types at pick time
// (rule h), preferring match-with-rice companions once a plain rice/porridge
// base is in the meal, and back-filling a carbohydrate if nothing else
// qualifies (rule g). Best-effort throughout — never fails; if a rule can't
// be satisfied (e.g. no vegetable dish in the filtered pool) the meal is
// simply left as close as it can get.
function fillNormalMeal(pool, mealType, recentIds, windowSize) {
  if (pool.length === 0) return [];

  const weightedPool = weightBySeafoodPreference(pool, mealType);
  const first = pickWithRecency(weightedPool, recentIds, windowSize);
  if (!first) return [];

  if (first.dishType === "one-dish") {
    let vegCandidates = pool.filter(item =>
      item.id !== first.id && item.subType !== first.subType && getDishGroup(item.subType) === "vegetable"
    );
    if (first.tags.includes("noodles")) {
      vegCandidates = preferTaggedPool(vegCandidates, "match-with-noodles");
    }
    const veg = pickWithRecency(vegCandidates, recentIds, windowSize);
    return veg ? [first.id, veg.id] : [first.id];
  }

  const dishes = [first];
  const usedSubTypes = new Set([first.subType]);
  const targetCount = 2 + Math.round(Math.random()); // 2 or 3 components
  while (dishes.length < targetCount) {
    let eligible = pool.filter(item =>
      item.dishType !== "one-dish" && !usedSubTypes.has(item.subType) && !dishes.some(d => d.id === item.id)
    );
    if (hasPlainRiceOrPorridgeBase(dishes)) {
      eligible = preferTaggedPool(eligible, "match-with-rice");
    }
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
    let candidates = weightedPool.filter(item =>
      matcher(item) && !used.has(item.subType) && !dishes.some(d => d.id === item.id)
    );
    // Once the rice-plain base has been picked (it's always the first
    // takeFromGroup call below), the remaining parts prefer match-with-rice.
    if (hasPlainRiceOrPorridgeBase(dishes)) {
      candidates = preferTaggedPool(candidates, "match-with-rice");
    }
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

// Picks the dishes for exactly one slot — day-specific fixed rules (Tuesday
// dinner, Wednesday dinner, meatless Monday) still apply since they're keyed
// off scope+slotKey, not off anything relating to the other slots. Shared by
// generatePlanSlots() (building a whole plan) and regenerateSlot() (redoing
// just one slot from planner.html's "Regenerate" button).
function generateSlotDishIds(items, scope, slotKey, candidates, recentWindow, windowSize) {
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
      const meatlessPool = candidates.filter(isMeatlessItem);
      if (meatlessPool.length > 0) pool = meatlessPool;
    } else if (mealType === "lunch" && Math.random() < MP_QUICK_LUNCH_PROBABILITY) {
      const quickPool = candidates.filter(item => item.tags.includes("quick"));
      if (quickPool.length > 0) pool = quickPool;
    }
    dishIds = fillNormalMeal(pool, mealType, recentWindow, windowSize);
  }

  return dishIds;
}

// Regenerates a single slot in isolation (no cross-slot recency window,
// unlike a full generatePlanSlots() pass) — used by planner.html's
// "Regenerate" button on a slot card. Returns [] if the tag-filtered pool is
// empty outright.
function regenerateSlot(items, scope, slotKey, includeTags, excludeTags) {
  const candidates = getGeneratorCandidates(items, includeTags, excludeTags);
  if (candidates.length === 0) return [];
  const windowSize = Math.max(0, Math.min(candidates.length - 1, 4));
  return generateSlotDishIds(items, scope, slotKey, candidates, [], windowSize);
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
    const dishIds = generateSlotDishIds(items, scope, slotDef.key, candidates, recentWindow, windowSize);
    slots[slotDef.key] = dishIds;
    dishIds.forEach(id => {
      recentWindow.push(id);
      if (recentWindow.length > windowSize) recentWindow.shift();
    });
  });

  // Rule b: every day needs at least one rice-based MEAL — not just any
  // isRiceBased dish scattered across the day. A meal qualifies if it's
  // either a one-dish rice/porridge meal (fried rice, chicken porridge), or
  // a plain rice/porridge component dish combined with a vegetable and a
  // protein in that same meal. Best-effort backfill only — never touches a
  // fixed (Tue/Wed) or one-dish-anchored meal, since that would break rules
  // c/d/f, and tries to add whichever of the three pieces (rice/porridge
  // base, vegetable, protein) a swappable meal is missing without any
  // guarantee all three end up findable.
  getDayGroupsForScope(scope).forEach(group => {
    const dayHasRiceBasedMeal = group.slotKeys.some(key => isRiceBasedMeal(slots[key] || [], items));
    if (dayHasRiceBasedMeal) return;

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

    const mealDishes = () => slots[swappableKey].map(id => getItemById(items, id)).filter(Boolean);

    function tryAdd(matcher) {
      if (slots[swappableKey].length >= MP_MEAL_MAX_DISHES) return;
      const currentDishes = mealDishes();
      const usedSubTypes = new Set(currentDishes.map(d => d.subType));
      let pool = candidates.filter(matcher);
      if (hasPlainRiceOrPorridgeBase(currentDishes)) {
        pool = preferTaggedPool(pool, "match-with-rice");
      }
      const eligible = pool.filter(item => !usedSubTypes.has(item.subType));
      const pick = pickRandom(eligible.length ? eligible : pool);
      if (pick) slots[swappableKey] = [...slots[swappableKey], pick.id];
    }

    if (!hasPlainRiceOrPorridgeBase(mealDishes())) {
      tryAdd(item => item.dishType === "component" && (item.subType === "rice-plain" || item.subType === "porridge"));
    }
    if (!mealDishes().some(d => getDishGroup(d.subType) === "vegetable")) {
      tryAdd(item => getDishGroup(item.subType) === "vegetable");
    }
    if (!mealDishes().some(d => getDishGroup(d.subType) === "protein")) {
      tryAdd(item => getDishGroup(item.subType) === "protein");
    }
  });

  return { slots, warning: null };
}
