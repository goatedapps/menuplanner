const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function themeRuntime(stored, unavailable = false) {
  const values = new Map([["menuPlanner.currentPlan", "unchanged menu"], ["menuPlanner.savedPlans", "unchanged snapshots"]]);
  if (stored !== undefined) values.set("menuPlanner.theme", stored);
  const events = {}, root = { dataset: {} }, select = { value: "" };
  const context = vm.createContext({
    document: { documentElement: root, getElementById: () => select, addEventListener() {} },
    localStorage: { getItem(key) { if (unavailable) throw Error("unavailable"); return values.get(key) ?? null; }, setItem(key, value) { if (unavailable) throw Error("unavailable"); values.set(key, value); } },
    window: { addEventListener: (name, callback) => { events[name] = callback; } }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/theme.js"), "utf8"), context);
  return { context, values, events, root, select };
}

test("the palette is restored before rendering, with Supper Club as the safe default", () => {
  for (const id of ["supper-club", "porcelain-blue", "blue-hour", "rosewater"]) {
    const { root, select } = themeRuntime(id);
    assert.equal(root.dataset.theme, id); assert.equal(select.value, id);
  }
  for (const invalid of [undefined, "green", "constructor", "<script>", ""]) assert.equal(themeRuntime(invalid).root.dataset.theme, "supper-club");
});

test("switching palettes persists only the preference, preserving all menus", () => {
  const { context, values, root } = themeRuntime();
  assert.equal(vm.runInContext('mpApplyTheme("blue-hour")', context), true);
  assert.equal(root.dataset.theme, "blue-hour"); assert.equal(values.get("menuPlanner.theme"), "blue-hour");
  assert.equal(values.get("menuPlanner.currentPlan"), "unchanged menu");
  assert.equal(values.get("menuPlanner.savedPlans"), "unchanged snapshots");
  assert.equal(vm.runInContext('mpApplyTheme("unknown")', context), false);
  assert.equal(root.dataset.theme, "blue-hour");
});

test("blocked storage still allows switching, and other open pages follow preference changes", () => {
  const blocked = themeRuntime("rosewater", true);
  assert.equal(blocked.root.dataset.theme, "supper-club");
  assert.equal(vm.runInContext('mpApplyTheme("porcelain-blue")', blocked.context), true);
  assert.equal(blocked.root.dataset.theme, "porcelain-blue");
  const other = themeRuntime();
  other.values.set("menuPlanner.theme", "rosewater"); other.events.storage({ key: "menuPlanner.theme" });
  assert.equal(other.root.dataset.theme, "rosewater"); assert.equal(other.select.value, "rosewater");
  other.values.delete("menuPlanner.theme"); other.events.storage({ key: null });
  assert.equal(other.root.dataset.theme, "supper-club");
});

function contrast(a, b) {
  const luminance = hex => {
    const rgb = hex.slice(1).match(/../g).map(c => parseInt(c, 16) / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4);
    return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
  };
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + .05) / (values[1] + .05);
}

test("all four palettes keep text, links, primary buttons, and wheel labels readable", () => {
  const base = fs.readFileSync(path.join(__dirname, "../css/supper-club.css"), "utf8").match(/:root\s*\{([^}]+)\}/)[1];
  const variants = fs.readFileSync(path.join(__dirname, "../css/themes.css"), "utf8");
  const blocks = [["supper-club", base], ...[...variants.matchAll(/:root\[data-theme="([^"]+)"\]\s*\{([^}]+)\}/g)].map(m => [m[1], m[2]])];
  assert.equal(blocks.length, 4);
  for (const [name, css] of blocks) {
    const tokens = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[\da-fA-F]{6})(?![\da-fA-F])/g)].map(m => [m[1], m[2]]));
    for (const [foreground, background] of [["ink", "paper"], ["ink", "surface"], ["muted", "paper"], ["muted", "surface"], ["accent", "paper"], ["paper", "accent"], ["fortune-ink-odd", "fortune-a"], ["fortune-ink-odd", "fortune-c"], ["fortune-ink-even", "fortune-b"], ["fortune-ink-even", "fortune-d"]]) {
      const ratio = contrast(tokens[foreground], tokens[background]);
      assert.ok(ratio >= 4.5, `${name}: ${foreground} on ${background} has contrast ${ratio.toFixed(2)}`);
    }
  }
});

test("every app page restores its preference before loading CSS", () => {
  for (const page of ["index", "library", "planner", "menus", "admin"]) {
    const html = fs.readFileSync(path.join(__dirname, "..", page + ".html"), "utf8");
    assert.equal((html.match(/src="js\/theme.js/g) || []).length, 1);
    assert.ok(html.indexOf('src="js/theme.js') < html.indexOf('href="css/style.css'));
    assert.ok(html.includes('href="css/themes.css'));
  }
});
