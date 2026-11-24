// Loaded in <head> before CSS to restore the palette before the first paint.
// Theme preferences are independent of the user's current and saved menus.
const MP_THEME_KEY = "menuPlanner.theme";
const MP_THEMES = Object.freeze([
  { id: "supper-club", name: "Supper Club" },
  { id: "porcelain-blue", name: "Porcelain Blue" },
  { id: "blue-hour", name: "Blue Hour" },
  { id: "rosewater", name: "Rosewater" }
]);

function mpApplyTheme(id, { persist = true } = {}) {
  if (!MP_THEMES.some(theme => theme.id === id)) return false;
  document.documentElement.dataset.theme = id;
  const select = document.getElementById("mp-theme-select");
  if (select) select.value = id;
  if (persist) {
    try { localStorage.setItem(MP_THEME_KEY, id); } catch { /* Still apply it in this page. */ }
  }
  return true;
}

function mpRestoreTheme() {
  let stored;
  try { stored = localStorage.getItem(MP_THEME_KEY); } catch { /* Storage may be unavailable. */ }
  mpApplyTheme(MP_THEMES.some(theme => theme.id === stored) ? stored : "supper-club", { persist: false });
}

mpRestoreTheme();

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header.mp-header");
  if (!header || document.getElementById("mp-theme-select")) return;
  const label = document.createElement("label");
  label.className = "mp-theme-picker";
  const caption = document.createElement("span");
  caption.className = "mp-theme-caption"; caption.textContent = "Theme";
  const swatch = document.createElement("span");
  swatch.className = "mp-theme-swatch"; swatch.setAttribute("aria-hidden", "true");
  const select = document.createElement("select");
  select.id = "mp-theme-select"; select.setAttribute("aria-label", "Colour theme");
  MP_THEMES.forEach(theme => {
    const option = document.createElement("option"); option.value = theme.id; option.textContent = theme.name;
    select.appendChild(option);
  });
  select.value = document.documentElement.dataset.theme;
  select.addEventListener("change", () => {
    mpApplyTheme(select.value);
    if (typeof playDiuup === "function") playDiuup();
  });
  label.append(caption, swatch, select); header.appendChild(label);
});

// Keep other open pages on the same palette when the preference changes.
window.addEventListener("storage", event => {
  if (event.key === MP_THEME_KEY || event.key === null) mpRestoreTheme();
});
