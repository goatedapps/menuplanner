// Returns the ordered list of {key, label} slot descriptors for a given scope.
// Every scope uses the same "day{N}-{meal}" key scheme so the rest of the app
// never needs to branch three ways on scope.
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
    for (let day = 1; day <= 7; day++) {
      slots.push({ key: `day${day}-lunch`, label: `Day ${day} · Lunch` });
      slots.push({ key: `day${day}-dinner`, label: `Day ${day} · Dinner` });
    }
    return slots;
  }
  return [];
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

// Fills every slot for the scope, filtering by tags and avoiding repeats within
// a sliding window (shrinks automatically when the candidate pool is small).
// Returns { slots, warning } — slots is null and warning is set if nothing matches.
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
    const eligible = candidates.filter(c => !recentWindow.includes(c.id));
    const pool = eligible.length > 0 ? eligible : candidates;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    slots[slotDef.key] = pick.id;
    recentWindow.push(pick.id);
    if (recentWindow.length > windowSize) recentWindow.shift();
  });

  return { slots, warning: null };
}
