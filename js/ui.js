// Optional motion: the app remains usable without GSAP and with reduced motion.
function mpMotionAllowed() {
  return !!window.gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mpAnimateGrid(container) {
  if (!mpMotionAllowed()) return;
  const cards = [...container.querySelectorAll(".mp-item-card, .mp-slot-card")].slice(0, 12);
  if (cards.length) gsap.fromTo(cards, { opacity: 0.35 }, { opacity: 1, duration: 0.3, stagger: 0.025, clearProps: "opacity" });
}

function mpNotify(message) {
  let toast = document.getElementById("mp-toast");
  if (!toast) {
    toast = document.createElement("div"); toast.id = "mp-toast"; toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  clearTimeout(mpNotify.timer); toast.textContent = message; toast.hidden = false;
  if (mpMotionAllowed()) gsap.fromTo(toast, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25 });
  mpNotify.timer = setTimeout(() => { toast.hidden = true; }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    if (!mpMotionAllowed()) return;
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    const heading = document.querySelector(".mp-page-intro h1");
    const image = document.querySelector(".mp-feature-image:not([hidden])");
    if (heading) timeline.from(heading, { x: -20, opacity: 0, duration: 0.7, clearProps: "all" });
    if (image && image.getBoundingClientRect().height) timeline.from(image, { clipPath: "inset(100% 0 0 0)", duration: 0.9, clearProps: "clipPath" }, 0);
  });
});

function mpRequestPlanName(initialName) {
  return new Promise(resolve => {
    const dialog = document.createElement("dialog"); dialog.className = "mp-modal mp-name-dialog";
    dialog.setAttribute("aria-labelledby", "mp-save-name-title");
    dialog.innerHTML = '<form><h2 id="mp-save-name-title">Save your menu</h2><label for="mp-save-name">Plan name</label><input id="mp-save-name" type="text" required maxlength="120" autocomplete="off"><div class="mp-dialog-actions"><button type="button" class="mp-btn" id="mp-save-cancel">Cancel</button><button type="submit" class="mp-btn mp-btn-primary">Save menu</button></div></form>';
    const input = dialog.querySelector("input"); input.value = initialName;
    dialog.querySelector("form").addEventListener("submit", event => { event.preventDefault(); if (input.value.trim()) dialog.close(input.value.trim()); });
    dialog.querySelector("#mp-save-cancel").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => { const name = dialog.returnValue || null; dialog.remove(); resolve(name); }, { once: true });
    document.body.appendChild(dialog); dialog.showModal(); input.focus(); input.select();
  });
}
