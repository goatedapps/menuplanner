// Shared button feedback, including buttons added later in modals or grids.
// A local asset also works when the app is opened directly via file://.
const mpButtonSound = new Audio(new URL("../Diuup.mp3", document.currentScript.src).href);
mpButtonSound.preload = "auto";
let mpButtonSoundStartedAt = -Infinity;

function playDiuup() {
  try {
    // Restart on rapid presses instead of layering increasingly loud copies.
    mpButtonSound.currentTime = 0;
    mpButtonSoundStartedAt = performance.now();
    const playback = mpButtonSound.play();
    if (playback) playback.catch(() => {});
  } catch {
    // Audio restrictions or unavailable hardware must not block an action.
  }
}

function navigateWithButtonSound(url) {
  // Let the press be heard before a page change destroys its audio element.
  // Automatic redirects (with no recent button press) still happen immediately.
  const duration = Number.isFinite(mpButtonSound.duration) ? mpButtonSound.duration * 1000 : 200;
  const delay = Math.max(0, Math.min(duration, 250) - (performance.now() - mpButtonSoundStartedAt));
  window.setTimeout(() => { window.location.href = url; }, delay);
}

(() => {
  // Capture runs before a button's handler can remove it or stop propagation.
  // Native click also covers keyboard activation without duplicate key sounds.
  document.addEventListener("click", event => {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    const button = event.target.closest(
      'button, input[type="button"], input[type="submit"], input[type="reset"], [role="button"], a.mp-btn, summary'
    );
    if (!button || button.matches(':disabled, [aria-disabled="true"]')) return;
    playDiuup();
    if (button.matches("a.mp-btn[href]") && !event.ctrlKey && !event.metaKey &&
        !event.shiftKey && !event.altKey && !button.hasAttribute("download") &&
        (!button.target || button.target === "_self")) {
      event.preventDefault();
      navigateWithButtonSound(button.href);
    }
  }, true);

  // The scope/mode choices are styled radio buttons. Using change avoids
  // playing twice when a label forwards its click to the associated input.
  document.addEventListener("change", event => {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    if (event.target.matches('input[type="radio"], input[type="checkbox"]') &&
        !event.target.matches(":disabled")) playDiuup();
  }, true);
})();
