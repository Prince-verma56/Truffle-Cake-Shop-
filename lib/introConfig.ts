// ─── Cinematic Intro Configuration ───────────────────────────────────────────
// Set enableCinematicIntro to false during rapid development to skip the intro.
// Always set to true before client demos and production.

export const introConfig = {
  enableCinematicIntro: true,

  // Path to the Layer 2 bakery truck video (relative to /public)
  videoSrc: "/Videos/Bg Videos/Layer 2 Video.mp4",

  // Warm cream — must match the website's primary background
  creamColor: "#FFF8EF",

  // Paper panel count for Layer 1 reveal
  panelCount: 6,

  // Maximum time (ms) to wait for video canplay before skipping Layer 2
  videoReadinessTimeout: 8000,

  // Duration of the cream fade overlay (ms)
  fadeDuration: 500,
} as const;
