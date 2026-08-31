export const breakpoints = {
  compact: 768,
  wide: 1200,
} as const;

export const media = {
  compact: `@media (max-width: ${breakpoints.compact - 1}px)`,
  belowWide: `@media (max-width: ${breakpoints.wide - 1}px)`,
  standard: `@media (min-width: ${breakpoints.compact}px) and (max-width: ${breakpoints.wide - 1}px)`,
  wide: `@media (min-width: ${breakpoints.wide}px)`,
} as const;

export const pageGutter = {
  compact: '20px',
  standard: '32px',
  wide: '48px',
} as const;
