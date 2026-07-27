// Shared read-only item detail modal (own #mp-detail-overlay, separate from
// picker.js's #mp-picker-overlay so the two can be open at once — picker.js
// uses this to let the user check a dish's tags/image/recipe before adding
// it, library.js uses it for plain browsing). Call openItemDetail(item) to
// just view, or openItemDetail(item, { onAdd }) to also show an "Add to
// this meal" button that calls onAdd(item.id) — used by picker.js only.

function ensureDetailDom() {
  if (document.getElementById("mp-detail-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "mp-detail-overlay";
  overlay.className = "mp-modal-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="mp-modal" role="dialog" aria-modal="true" aria-labelledby="mp-detail-title">
      <div class="mp-modal-header">
        <h2 id="mp-detail-title"></h2>
        <button type="button" class="mp-modal-close" aria-label="Close">&times;</button>
      </div>
      <div id="mp-detail-body"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector(".mp-modal-close").addEventListener("click", () => { overlay.hidden = true; });
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.hidden = true;
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !overlay.hidden) overlay.hidden = true;
  });
}

function openItemDetail(item, { onAdd } = {}) {
  ensureDetailDom();
  const overlay = document.getElementById("mp-detail-overlay");
  document.getElementById("mp-detail-title").textContent = item.name;

  let html = `<div class="mp-detail-tags">${item.tags.join(", ")}</div>`;
  if (onAdd) {
    html += `<button type="button" class="mp-btn mp-btn-primary mp-detail-add-btn" id="mp-detail-add-btn">Add to this meal</button>`;
  }
  html += `<img class="mp-detail-image" id="mp-detail-image-el" alt="${item.name}">`;

  if (item.recipe) {
    html += `<div class="mp-detail-recipe">`;
    if (item.recipe.ingredients && item.recipe.ingredients.length) {
      html += `<h3>Ingredients</h3><ul>${item.recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>`;
    }
    if (item.recipe.steps && item.recipe.steps.length) {
      html += `<h3>Steps</h3><ol>${item.recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>`;
    }
    html += `</div>`;
  } else {
    html += `<p class="mp-empty-note">No recipe available.</p>`;
  }

  html += `<button type="button" class="mp-btn mp-detail-print-btn" id="mp-detail-print-btn">🖨️ Print Recipe Card</button>`;

  document.getElementById("mp-detail-body").innerHTML = html;

  if (onAdd) {
    document.getElementById("mp-detail-add-btn").addEventListener("click", () => onAdd(item.id));
  }

  document.getElementById("mp-detail-print-btn").addEventListener("click", () => printRecipeCard(item));

  const img = document.getElementById("mp-detail-image-el");
  img.onerror = () => {
    const placeholder = document.createElement("div");
    placeholder.className = "mp-detail-placeholder";
    placeholder.textContent = "🍽️";
    img.replaceWith(placeholder);
  };
  img.src = getItemImagePath(item);

  overlay.hidden = false;
}

function escapeHtmlForDetail(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Opens a standalone, self-contained recipe-card document in a new tab and
// triggers window.print() on it — deliberately not a @media print block on
// the current page, since this modal is shared across library.html,
// planner.html, and picker.js's modal-on-top-of-a-modal, and scoping "hide
// everything except this card" print CSS across three different page
// layouts (plus whatever else happens to be open, like the picker beneath
// it) would be fragile. Same pattern as planner.js's Word export: build one
// self-contained HTML string rather than reuse/hide parts of the live DOM.
function printRecipeCard(item) {
  const win = window.open("", "_blank");
  if (!win) {
    alert("Please allow pop-ups for this site to print a recipe card.");
    return;
  }
  win.document.open();
  win.document.write(buildRecipeCardHtml(item));
  win.document.close();
}

// item.name can be user-typed (a picker "quick add" dish, see planner.js's
// addCustomDishToSlot()) so it's escaped like any other prompt-derived text
// before landing in innerHTML/document.write; recipe ingredients/steps are
// always hand-authored in data.js, never user input, but are escaped too
// for consistency. The image's load/error is what triggers the actual
// print() call (not a fixed timeout), since the image may not be cached yet
// and printing before it loads would leave a blank spot on the card.
function buildRecipeCardHtml(item) {
  const name = escapeHtmlForDetail(item.name);
  let body = `<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:22px;margin:0 0 12px;">${name}</h1>`;
  body += `<div id="mp-print-image-wrap" style="margin-bottom:16px;">
    <img id="mp-print-image" src="${getItemImagePath(item)}" alt="" style="display:block;max-width:100%;max-height:320px;object-fit:cover;border-radius:8px;">
  </div>`;

  if (item.recipe) {
    if (item.recipe.ingredients && item.recipe.ingredients.length) {
      body += `<h2 style="font-size:16px;margin:16px 0 6px;">Ingredients</h2><ul style="margin:0;padding-left:20px;">${item.recipe.ingredients.map(i => `<li>${escapeHtmlForDetail(i)}</li>`).join("")}</ul>`;
    }
    if (item.recipe.steps && item.recipe.steps.length) {
      body += `<h2 style="font-size:16px;margin:16px 0 6px;">Steps</h2><ol style="margin:0;padding-left:20px;">${item.recipe.steps.map(s => `<li>${escapeHtmlForDetail(s)}</li>`).join("")}</ol>`;
    }
  } else {
    body += `<p style="font-style:italic;color:#666;">No recipe available.</p>`;
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${name}</title></head>
<body style="font-family:-apple-system,'Segoe UI',Arial,sans-serif;color:#222;max-width:650px;margin:24px auto;padding:0 16px;">
${body}
<script>
  var img = document.getElementById("mp-print-image");
  function go() { window.focus(); window.print(); }
  img.addEventListener("load", go);
  img.addEventListener("error", function () {
    document.getElementById("mp-print-image-wrap").innerHTML =
      '<div style="width:100%;height:200px;display:flex;align-items:center;justify-content:center;font-size:48px;background:#eee;border-radius:8px;">\u{1F37D}\u{FE0F}</div>';
    go();
  });
</script>
</body></html>`;
}
