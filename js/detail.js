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

  document.getElementById("mp-detail-body").innerHTML = html;

  if (onAdd) {
    document.getElementById("mp-detail-add-btn").addEventListener("click", () => onAdd(item.id));
  }

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
