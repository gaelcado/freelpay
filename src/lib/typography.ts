/**
 * Typography Scale for SaaS Dashboard
 * 
 * This file defines a comprehensive typescale optimized for dashboard interfaces.
 * It follows a modular scale with a ratio of 1.2 (minor third) for a balanced, professional look.
 */

export const typescale = {
  // Display typography (for hero sections, major headings)
  display: {
    xl: "text-5xl font-semibold tracking-tight leading-[1.05] text-foreground/95", // 48px
    lg: "text-4xl font-semibold tracking-tight leading-[1.1] text-foreground/95", // 36px
    md: "text-3xl font-semibold tracking-tight leading-[1.15] text-foreground/95", // 30px
    sm: "text-2xl font-semibold tracking-tight leading-[1.2] text-foreground/95", // 24px
  },
  
  // Heading typography (for section headers)
  heading: {
    xl: "text-3xl font-medium tracking-tight leading-[1.15] text-foreground/90", // 30px
    lg: "text-2xl font-medium tracking-tight leading-[1.2] text-foreground/90", // 24px
    md: "text-xl font-medium tracking-tight leading-[1.25] text-foreground/90",  // 20px
    sm: "text-lg font-medium tracking-tight leading-[1.3] text-foreground/90",   // 18px
    xs: "text-base font-medium tracking-tight leading-[1.35] text-foreground/90", // 16px
  },
  
  // Body typography (for main content)
  body: {
    lg: "text-lg leading-[1.6] tracking-normal text-foreground/85",  // 18px
    md: "text-base leading-[1.55] tracking-normal text-foreground/85", // 16px
    sm: "text-sm leading-[1.5] tracking-normal text-foreground/85",  // 14px
    xs: "text-xs leading-[1.45] tracking-normal text-foreground/85",  // 12px
  },
  
  // Label typography (for form labels, captions)
  label: {
    lg: "text-base font-medium leading-[1.4] tracking-tight text-foreground/90", // 16px
    md: "text-sm font-medium leading-[1.4] tracking-tight text-foreground/90",  // 14px
    sm: "text-xs font-medium leading-[1.4] tracking-tight text-foreground/90",  // 12px
  },
  
  // Monospace typography (for code, technical data)
  mono: {
    md: "font-mono text-sm leading-[1.5] tracking-tight text-foreground/90",
    sm: "font-mono text-xs leading-[1.5] tracking-tight text-foreground/90",
    xs: "font-mono text-[10px] leading-[1.4] tracking-tight text-foreground/90",
  },
  
  // Special typography variants
  special: {
    stat: "text-2xl font-bold tracking-tight leading-[1.15] text-foreground/95", // For dashboard stats
    cardTitle: "text-sm font-semibold leading-[1.35] tracking-tight text-foreground/90", // For card titles
    badge: "text-xs font-medium leading-[1.35] tracking-tight text-foreground/90", // For badges
    button: "text-sm font-medium leading-[1.35] tracking-tight text-foreground/90", // For buttons
    nav: "text-sm font-medium leading-[1.35] tracking-tight text-foreground/90", // For navigation items
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
    xl: "text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight text-foreground/95",
    lg: "text-lg md:text-xl lg:text-2xl font-semibold tracking-tight leading-tight text-foreground/95",
    md: "text-base md:text-lg lg:text-xl font-semibold tracking-tight leading-normal text-foreground/95",
    sm: "text-sm md:text-base lg:text-lg font-semibold tracking-tight leading-normal text-foreground/95",
  },
  
  // Responsive body text
  responsiveBody: {
    lg: "text-sm md:text-base leading-6 text-foreground/85",
    md: "text-xs md:text-sm leading-5 text-foreground/85",
    sm: "text-[10px] md:text-xs leading-4 text-foreground/85",
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