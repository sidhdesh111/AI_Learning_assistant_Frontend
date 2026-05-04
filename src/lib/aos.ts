import AOS from "aos";

let initialized = false;

export function ensureAOSInitialized(): void {
  if (initialized) return;
  AOS.init({
    duration: 750,
    easing: "ease-out-cubic",
    once: true,
    offset: 64,
    anchorPlacement: "top-bottom",
  });
  initialized = true;
}

/** Recalculate positions (call after SPA navigation or layout changes). */
export function refreshAOS(): void {
  ensureAOSInitialized();
  AOS.refresh();
}
