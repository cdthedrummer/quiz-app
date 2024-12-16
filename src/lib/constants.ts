// Quiz settings
export const QUIZ_SETTINGS = {
  MIN_QUESTIONS: 5,
  MAX_QUESTIONS: 20,
  CHECKPOINT_INTERVAL: 5,
  ANIMATION_DURATION: 300,
  AUTO_ADVANCE_DELAY: 1000
} as const;

// Animation settings
export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500
  },
  EASING: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  }
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280
} as const;

// Feature flags
export const FEATURES = {
  ANIMATIONS_ENABLED: true,
  CHECKPOINTS_ENABLED: true,
  TOOLTIPS_ENABLED: true,
  SOUND_ENABLED: false // Future feature
} as const;
