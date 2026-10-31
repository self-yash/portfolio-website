/**
 * Spec: "Page-Reveal" Navigation Transition
 *
 * Implements the full-screen page-transition animation with:
 * - Cubic-bezier easing: cubic-bezier(0.504, 0.144, 0.15, 0.91)
 * - Scrim fade-in: 0.322s, starts at t = 0s
 * - Main slide/scale/crop: 1.0s, starts at t = 0.093s (total duration 1.093s)
 * - Per-frame shaping formulas:
 *     yEase = 1 - (1 - Math.min(1, e / 0.68)) ** 3
 *     scaleBlend = e * 0.15 + e ** 3 * 0.85
 *     insetPercent = 9 * (1 - e)
 *     translateYPercent = 100 * (1 - yEase)
 *     scale = 0.965 + scaleBlend * 0.035
 *     clipPath = inset(insetPercent%)
 */

export type PageRoute = 'home' | 'about' | 'projects' | 'stack';

export const ROUTE_PATHS: Record<PageRoute, string> = {
  home: '/',
  about: '/about',
  projects: '/projects',
  stack: '/stack',
};

export function getRouteFromPath(pathname: string): PageRoute {
  const clean = pathname.toLowerCase().replace(/\/$/, '') || '/';
  if (clean === '/about' || clean.endsWith('/about')) return 'about';
  if (clean === '/projects' || clean.endsWith('/projects')) return 'projects';
  if (clean === '/stack' || clean.endsWith('/stack')) return 'stack';
  return 'home';
}

/**
 * High-precision cubic-bezier solver for 1D animation easing.
 * Solves x(u) = t using Newton-Raphson with bisection fallback, then returns y(u).
 */
export function createCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  function sampleCurveX(t: number) {
    return ((ax * t + bx) * t + cx) * t;
  }

  function sampleCurveY(t: number) {
    return ((ay * t + by) * t + cy) * t;
  }

  function sampleCurveDerivativeX(t: number) {
    return (3 * ax * t + 2 * bx) * t + cx;
  }

  function solveCurveX(x: number) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    // Newton-Raphson iteration
    let t = x;
    for (let i = 0; i < 8; i++) {
      const xEst = sampleCurveX(t) - x;
      if (Math.abs(xEst) < 1e-6) return t;
      const dX = sampleCurveDerivativeX(t);
      if (Math.abs(dX) < 1e-6) break;
      t -= xEst / dX;
      t = Math.max(0, Math.min(1, t));
    }

    // Bisection fallback
    let t0 = 0;
    let t1 = 1;
    t = x;
    while (t0 < t1) {
      const xEst = sampleCurveX(t);
      if (Math.abs(xEst - x) < 1e-6) return t;
      if (x > xEst) t0 = t;
      else t1 = t;
      t = (t1 + t0) * 0.5;
    }
    return t;
  }

  return function (x: number): number {
    return sampleCurveY(solveCurveX(x));
  };
}

// Exact specification curve: cubic-bezier(0.504, 0.144, 0.15, 0.91)
export const pageRevealEase = createCubicBezier(0.504, 0.144, 0.15, 0.91);

export interface PageRevealOptions {
  incomingEl: HTMLElement;
  scrimEl: HTMLElement;
  outgoingEl?: HTMLElement | null;
  onComplete: () => void;
}

/**
 * Runs the Page-Reveal transition driven by requestAnimationFrame.
 * Accurately samples easing and per-frame shaping formulas.
 * Returns an abort/cancel function.
 */
export function runPageRevealTransition({
  incomingEl,
  scrimEl,
  outgoingEl,
  onComplete,
}: PageRevealOptions): () => void {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    incomingEl.style.transform = 'none';
    incomingEl.style.clipPath = 'none';
    incomingEl.style.willChange = '';
    incomingEl.style.pointerEvents = 'auto';
    scrimEl.style.opacity = '0';
    scrimEl.style.visibility = 'hidden';
    if (outgoingEl) {
      outgoingEl.style.pointerEvents = 'none';
    }
    onComplete();
    return () => {};
  }

  // Freeze outgoing page in place
  if (outgoingEl) {
    outgoingEl.style.pointerEvents = 'none';
  }

  // Set initial state of incoming page before animation starts:
  // transform: translateY(100%) scale(0.965); clip-path: inset(9% 9% 9% 9%);
  incomingEl.style.willChange = 'transform, clip-path';
  incomingEl.style.pointerEvents = 'none';
  incomingEl.style.visibility = 'visible';
  incomingEl.style.transform = 'translate3d(0, 100%, 0) scale(0.965)';
  incomingEl.style.clipPath = 'inset(9% 9% 9% 9%)';
  incomingEl.scrollTop = 0;

  // Set scrim initial state
  scrimEl.style.opacity = '0';
  scrimEl.style.visibility = 'visible';
  scrimEl.style.pointerEvents = 'none';

  let startTime: number | null = null;
  let rafId: number;
  let isCancelled = false;

  const SCRIM_DURATION = 0.322; // 0.322s
  const MAIN_OFFSET = 0.093;   // 0.093s
  const MAIN_DURATION = 1.0;    // 1.0s
  const TOTAL_DURATION = MAIN_OFFSET + MAIN_DURATION; // 1.093s

  function tick(now: number) {
    if (isCancelled) return;
    if (startTime === null) startTime = now;

    const elapsed = Math.max(0, (now - startTime) / 1000); // elapsed time in seconds

    // 1. Scrim fade-in: duration 0.322s, eased with pageRevealEase, starts at 0
    const scrimRaw = Math.max(0, Math.min(1, elapsed / SCRIM_DURATION));
    const scrimEased = pageRevealEase(scrimRaw);
    scrimEl.style.opacity = String(scrimEased);

    // 2. Main slide/scale/crop: duration 1.0s, eased with pageRevealEase, starts at offset 0.093s
    const mainRaw = Math.max(0, Math.min(1, (elapsed - MAIN_OFFSET) / MAIN_DURATION));
    const e = pageRevealEase(mainRaw);

    // Per-frame shaping formulas as strictly specified
    const yEase = 1 - Math.pow(1 - Math.min(1, e / 0.68), 3);
    const scaleBlend = e * 0.15 + Math.pow(e, 3) * 0.85;
    const insetPercent = 9 * (1 - e);

    const translateYPercent = 100 * (1 - yEase);
    const scale = 0.965 + scaleBlend * 0.035;

    incomingEl.style.transform = `translate3d(0, ${translateYPercent.toFixed(4)}%, 0) scale(${scale.toFixed(5)})`;
    incomingEl.style.clipPath = `inset(${insetPercent.toFixed(4)}%)`;

    if (elapsed >= TOTAL_DURATION) {
      // Final state on animation end
      incomingEl.style.transform = 'none';
      incomingEl.style.clipPath = 'none';
      incomingEl.style.willChange = '';
      incomingEl.style.overflowY = 'auto';
      incomingEl.style.pointerEvents = 'auto';

      // Set scrim: opacity 0 instant
      scrimEl.style.opacity = '0';
      scrimEl.style.visibility = 'hidden';

      onComplete();
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  return () => {
    isCancelled = true;
    cancelAnimationFrame(rafId);
  };
}
