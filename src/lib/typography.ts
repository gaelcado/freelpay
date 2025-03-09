/**
 * Typography Scale for SaaS Dashboard
 * 
 * This file defines a comprehensive typescale optimized for dashboard interfaces.
 * It follows a modular scale with a ratio of 1.2 (minor third) for a balanced, professional look.
 */

export const typescale = {
  // Display typography (for hero sections, major headings)
  display: {
    xl: "text-5xl font-semibold tracking-tight leading-tight", // 48px
    lg: "text-4xl font-semibold tracking-tight leading-tight", // 36px
    md: "text-3xl font-semibold tracking-tight leading-tight", // 30px
    sm: "text-2xl font-semibold tracking-tight leading-tight", // 24px
  },
  
  // Heading typography (for section headers)
  heading: {
    xl: "text-3xl font-medium tracking-tight leading-tight", // 30px
    lg: "text-2xl font-medium tracking-tight leading-tight", // 24px
    md: "text-xl font-medium tracking-tight leading-normal",  // 20px
    sm: "text-lg font-medium tracking-tight leading-normal",  // 18px
    xs: "text-base font-medium tracking-tight leading-normal", // 16px
  },
  
  // Body typography (for main content)
  body: {
    lg: "text-lg leading-7",  // 18px
    md: "text-base leading-6", // 16px
    sm: "text-sm leading-5",  // 14px
    xs: "text-xs leading-4",  // 12px
  },
  
  // Label typography (for form labels, captions)
  label: {
    lg: "text-base font-medium leading-normal", // 16px
    md: "text-sm font-medium leading-normal",  // 14px
    sm: "text-xs font-medium leading-normal",  // 12px
  },
  
  // Monospace typography (for code, technical data)
  mono: {
    md: "font-mono text-base leading-normal",
    sm: "font-mono text-sm leading-normal",
    xs: "font-mono text-xs leading-normal",
  },
  
  // Special typography variants
  special: {
    stat: "text-2xl font-bold tracking-tight leading-tight", // For dashboard stats
    cardTitle: "text-sm font-medium leading-normal", // For card titles
    badge: "text-xs font-medium leading-normal", // For badges
    button: "text-sm font-medium leading-normal", // For buttons
    nav: "text-sm font-medium leading-normal", // For navigation items
  }
};

/**
 * Helper function to combine typography classes with additional classes
 */
export function typography(scale: keyof typeof typescale, size: string, className?: string) {
  const baseClasses = typescale[scale][size as keyof typeof typescale[typeof scale]];
  return className ? `${baseClasses} ${className}` : baseClasses;
}

/**
 * Responsive typography variants
 * These provide different typography styles at different breakpoints
 */
export const responsiveTypography = {
  // Responsive headings that scale down on mobile
  responsiveHeading: {
    xl: "text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight",
    lg: "text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight",
    md: "text-lg md:text-xl lg:text-2xl font-semibold tracking-tight leading-normal",
    sm: "text-base md:text-lg lg:text-xl font-semibold tracking-tight leading-normal",
  },
  
  // Responsive body text
  responsiveBody: {
    lg: "text-base md:text-lg leading-7",
    md: "text-sm md:text-base leading-6",
    sm: "text-xs md:text-sm leading-5",
  }
};

/**
 * Text truncation utilities
 */
export const truncate = {
  // Single line truncation with ellipsis
  singleLine: "truncate",
  
  // Multi-line truncation (2 lines)
  twoLines: "line-clamp-2",
  
  // Multi-line truncation (3 lines)
  threeLines: "line-clamp-3",
};

/**
 * Text alignment utilities
 */
export const textAlign = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

/**
 * Text transformation utilities
 */
export const textTransform = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  normalCase: "normal-case",
};

/**
 * Font weight utilities
 */
export const fontWeight = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}; 