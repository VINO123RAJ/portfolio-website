export const colors = {
  primary: '#0a0a0f',
  secondary: '#0f0f14',
  tertiary: '#14141a',
  background: '#050507',
  surface: '#0a0a0f',
  surfaceAlt: '#14141a',
  border: '#22222a',
  borderAlt: '#2a2a34',
  text: '#e8e8ec',
  textSecondary: '#a8a8b8',
  textTertiary: '#7a7a8a',
  accent: '#6366f1',
  accentGlow: '#6366f120',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
} as const

export const gradients = {
  hero: 'linear-gradient(135deg, #0f0f14 0%, #050507 100%)',
  surface: 'linear-gradient(135deg, #0a0a0f 0%, #14141a 100%)',
  accent: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  text: 'linear-gradient(90deg, #e8e8ec 0%, #a8a8b8 100%)',
  border: 'linear-gradient(90deg, #22222a, #2a2a34, #22222a)',
  glow: 'radial-gradient(circle at center, #6366f130 0%, transparent 70%)',
} as const

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4.5rem',
  '4xl': '6rem',
  '5xl': '9rem',
  '6xl': '12rem',
} as const

export const fontSize = {
  xs: { size: '0.75rem', lineHeight: '1rem' },
  sm: { size: '0.875rem', lineHeight: '1.25rem' },
  base: { size: '1rem', lineHeight: '1.5rem' },
  lg: { size: '1.125rem', lineHeight: '1.75rem' },
  xl: { size: '1.25rem', lineHeight: '1.75rem' },
  '2xl': { size: '1.5rem', lineHeight: '2rem' },
  '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
  '4xl': { size: '2.25rem', lineHeight: '2.5rem', letterSpacing: '-0.02em' },
  '5xl': { size: '3rem', lineHeight: '1.1', letterSpacing: '-0.03em' },
  '6xl': { size: '3.75rem', lineHeight: '1.1', letterSpacing: '-0.04em' },
  '7xl': { size: '4.5rem', lineHeight: '1', letterSpacing: '-0.05em' },
  '8xl': { size: '6rem', lineHeight: '1', letterSpacing: '-0.06em' },
  '9xl': { size: '8rem', lineHeight: '0.85', letterSpacing: '-0.07em' },
} as const

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
} as const

export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  default: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const

export const transition = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '400ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  elastic: '500ms cubic-bezier(0.25, 0.1, 0.25, 1)',
} as const

export const breakpoints = {
  sm: '475px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0/0.05), 0 1px 4px 0 rgb(0 0 0/0.1)',
  default: '0 1px 3px 0 rgb(0 0 0/0.1), 0 1px 2px -1px rgb(0 0 0/0.1)',
  md: '0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0/0.1), 0 4px 6px -4px rgb(0 0 0/0.1)',
  xl: '0 20px 10px -10px rgb(0 0 0/0.1)',
  glow: '0 0 30px 0 rgb(99 102 241 / 0.15)',
  'glow-lg': '0 0 60px 0 rgb(99 102 241 / 0.2), 0 0 100px 0 rgb(139 92 246 / 0.15)',
} as const

export const aspectRatios = {
  '16-9': 16 / 9,
  '4-3': 4 / 3,
  '1-1': 1,
  '3-2': 3 / 2,
  '2-3': 2 / 3,
} as const

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  loader: 2000,
} as const
