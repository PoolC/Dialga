export const breakpoints = {
  phone: 576,
  compact: 768,
  desktop: 1200,
} as const;

export const media = {
  phone: `@media (max-width: ${breakpoints.phone - 1}px)`,
  compact: `@media (min-width: ${breakpoints.phone}px) and (max-width: ${breakpoints.compact - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.compact}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  mobile: `@media (max-width: ${breakpoints.compact - 1}px)`,
  belowWide: `@media (max-width: ${breakpoints.desktop - 1}px)`,
  standard: `@media (min-width: ${breakpoints.compact}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  wide: `@media (min-width: ${breakpoints.desktop}px)`,
} as const;

export const pageGutter = {
  phone: '0',
  compact: '20px',
  tablet: '32px',
  desktop: '48px',
} as const;
