import AOS from "aos";

let initialized = false;

export function ensureAOSInitialized(): void {
  if (initialized) return;
  AOS.init({
    once: true,
  });
  initialized = true;
}

/** Recalculate positions (call after SPA navigation or layout changes). */
export function refreshAOS(): void {
  ensureAOSInitialized();
  AOS.refresh();
}
