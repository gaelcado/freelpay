import React from "react";
import { cn } from "@/lib/utils";
import { 
  typescale, 
  responsiveTypography, 
  truncate, 
  textAlign, 
  textTransform, 
  fontWeight 
} from "@/lib/typography";

// Define more specific types for our scales
type TypescaleKey = keyof typeof typescale;
type ResponsiveTypographyKey = keyof typeof responsiveTypography;

// Define size types for each scale
type DisplaySize = keyof typeof typescale.display;
type HeadingSize = keyof typeof typescale.heading;
type BodySize = keyof typeof typescale.body;
type LabelSize = keyof typeof typescale.label;
type MonoSize = keyof typeof typescale.mono;
type SpecialVariant = keyof typeof typescale.special;
type ResponsiveHeadingSize = keyof typeof responsiveTypography.responsiveHeading;
type ResponsiveBodySize = keyof typeof responsiveTypography.responsiveBody;

// Define spacing options for margin control
type SpacingOption = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

type TypographyProps = {
  variant: 
    | "display-xl" | "display-lg" | "display-md" | "display-sm"
    | "heading-xl" | "heading-lg" | "heading-md" | "heading-sm" | "heading-xs"
    | "body-lg" | "body-md" | "body-sm" | "body-xs"
    | "label-lg" | "label-md" | "label-sm"
    | "mono-md" | "mono-sm" | "mono-xs"
    | "stat" | "cardTitle" | "badge" | "button" | "nav"
    | "responsive-heading-xl" | "responsive-heading-lg" | "responsive-heading-md" | "responsive-heading-sm"
    | "responsive-body-lg" | "responsive-body-md" | "responsive-body-sm";
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  truncate?: keyof typeof truncate;
  align?: keyof typeof textAlign;
  transform?: keyof typeof textTransform;
  weight?: keyof typeof fontWeight;
  mt?: SpacingOption; // margin-top
  mb?: SpacingOption; // margin-bottom
  mx?: SpacingOption; // margin-x
  my?: SpacingOption; // margin-y
  color?: "default" | "muted" | "primary" | "success" | "warning" | "danger";
} & React.HTMLAttributes<HTMLElement>;

// Add specific props for label elements
type LabelElementProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Typography({
  variant,
  as: Component = "div",
  className,
  children,
  truncate: truncateStyle,
  align,
  transform,
  weight,
  mt,
  mb,
  mx,
  my,
  color = "default",
  ...props
}: TypographyProps) {
  // Parse the variant to get the scale and size
  let typographyClasses: string = "";

  try {
    if (variant.startsWith("responsive-")) {
      // Handle responsive variants
      const parts = variant.split("-");
      if (parts.length >= 3) {
        const type = parts[1];
        const size = parts[2];
        
        if (type === "heading" && isResponsiveHeadingSize(size)) {
          typographyClasses = responsiveTypography.responsiveHeading[size];
        } else if (type === "body" && isResponsiveBodySize(size)) {
          typographyClasses = responsiveTypography.responsiveBody[size];
        } else {
          console.warn(`Responsive typography variant "${variant}" not found, falling back to default`);
          typographyClasses = "text-base"; // Fallback to a safe default
        }
      }
    } else if (variant.includes("-")) {
      // Handle regular variants
      const [scaleStr, sizeStr] = variant.split("-");
      
      if (scaleStr === "display" && isDisplaySize(sizeStr)) {
        typographyClasses = typescale.display[sizeStr];
      } else if (scaleStr === "heading" && isHeadingSize(sizeStr)) {
        typographyClasses = typescale.heading[sizeStr];
      } else if (scaleStr === "body" && isBodySize(sizeStr)) {
        typographyClasses = typescale.body[sizeStr];
      } else if (scaleStr === "label" && isLabelSize(sizeStr)) {
        typographyClasses = typescale.label[sizeStr];
      } else if (scaleStr === "mono" && isMonoSize(sizeStr)) {
        typographyClasses = typescale.mono[sizeStr];
      } else {
        console.warn(`Typography variant "${variant}" not found, falling back to default`);
        typographyClasses = "text-base"; // Fallback to a safe default
      }
    } else {
      // Handle special variants
      if (isSpecialVariant(variant)) {
        typographyClasses = typescale.special[variant];
      } else {
        console.warn(`Special typography variant "${variant}" not found, falling back to default`);
        typographyClasses = "text-base"; // Fallback to a safe default
      }
    }
  } catch (error) {
    console.error(`Error parsing typography variant "${variant}":`, error);
    typographyClasses = "text-base"; // Fallback to a safe default
  }

  // Color classes
  const colorClasses = {
    default: "",
    muted: "text-muted-foreground",
    primary: "text-primary",
    success: "text-emerald-600 dark:text-emerald-400",
    warning: "text-amber-600 dark:text-amber-400",
    danger: "text-red-600 dark:text-red-400"
  };

  // Margin classes
  const marginClasses = [
    mt !== undefined && `mt-${mt}`,
    mb !== undefined && `mb-${mb}`,
    mx !== undefined && `mx-${mx}`,
    my !== undefined && `my-${my}`,
  ].filter(Boolean);

  // Add additional text styling utilities
  const textClasses = cn(
    typographyClasses,
    truncateStyle && truncate[truncateStyle],
    align && textAlign[align],
    transform && textTransform[transform],
    weight && fontWeight[weight],
    color && colorClasses[color],
    ...marginClasses,
    className
  );

  return (
    <Component className={textClasses} {...props}>
      {children}
    </Component>
  );
}

// Type guard functions
function isDisplaySize(size: string): size is DisplaySize {
  return size === "xl" || size === "lg" || size === "md" || size === "sm";
}

function isHeadingSize(size: string): size is HeadingSize {
  return size === "xl" || size === "lg" || size === "md" || size === "sm" || size === "xs";
}

function isBodySize(size: string): size is BodySize {
  return size === "lg" || size === "md" || size === "sm" || size === "xs";
}

function isLabelSize(size: string): size is LabelSize {
  return size === "lg" || size === "md" || size === "sm";
}

function isMonoSize(size: string): size is MonoSize {
  return size === "md" || size === "sm" || size === "xs";
}

function isSpecialVariant(variant: string): variant is SpecialVariant {
  return (
    variant === "stat" || 
    variant === "cardTitle" || 
    variant === "badge" || 
    variant === "button" || 
    variant === "nav"
  );
}

function isResponsiveHeadingSize(size: string): size is ResponsiveHeadingSize {
  return size === "xl" || size === "lg" || size === "md" || size === "sm";
}

function isResponsiveBodySize(size: string): size is ResponsiveBodySize {
  return size === "lg" || size === "md" || size === "sm";
}

// Convenience components
export function DisplayXL(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="display-xl" as="h1" {...props} />;
}

export function DisplayLG(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="display-lg" as="h1" {...props} />;
}

export function DisplayMD(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="display-md" as="h2" {...props} />;
}

export function DisplaySM(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="display-sm" as="h2" {...props} />;
}

export function HeadingXL(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-xl" as="h2" {...props} />;
}

export function HeadingLG(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-lg" as="h3" {...props} />;
}

export function HeadingMD(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-md" as="h4" {...props} />;
}

export function HeadingSM(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-sm" as="h5" {...props} />;
}

export function HeadingXS(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="heading-xs" as="h6" {...props} />;
}

export function BodyLG(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="body-lg" as="p" {...props} />;
}

export function BodyMD(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="body-md" as="p" {...props} />;
}

export function BodySM(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="body-sm" as="p" {...props} />;
}

export function BodyXS(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="body-xs" as="p" {...props} />;
}

// Responsive typography components
export function ResponsiveHeadingXL(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="responsive-heading-xl" as="h1" {...props} />;
}

export function ResponsiveHeadingLG(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="responsive-heading-lg" as="h2" {...props} />;
}

export function ResponsiveHeadingMD(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="responsive-heading-md" as="h3" {...props} />;
}

export function ResponsiveHeadingSM(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="responsive-heading-sm" as="h4" {...props} />;
}

export function ResponsiveBodyLG(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="responsive-body-lg" as="p" {...props} />;
}

export function ResponsiveBodyMD(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="responsive-body-md" as="p" {...props} />;
}

export function ResponsiveBodySM(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="responsive-body-sm" as="p" {...props} />;
}

// Label component with proper typing for label-specific attributes
type LabelProps = Omit<TypographyProps, "variant" | "as"> & 
  LabelElementProps & 
  { size?: "lg" | "md" | "sm" };

export function Label({ size = "md", ...rest }: LabelProps) {
  const variant = `label-${size}` as const;
  return (
    <Typography 
      variant={variant} 
      as="label" 
      {...rest} 
    />
  );
}

// Special typography components
export function Stat(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="stat" as="div" {...props} />;
}

export function CardTitle(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="cardTitle" as="h3" {...props} />;
}

export function Badge(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="badge" as="span" {...props} />;
}

export function ButtonText(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="button" as="span" {...props} />;
}

export function NavText(props: Omit<TypographyProps, "variant">) {
  return <Typography variant="nav" as="span" {...props} />;
}

// Truncated text component with improved line clamping
export function TruncatedText({ 
  lines = 1, 
  variant = "body-md",
  ...props 
}: Omit<TypographyProps, "truncate" | "variant"> & { 
  lines?: 1 | 2 | 3;
  variant?: TypographyProps["variant"];
}) {
  const truncateClass = lines === 1 
    ? "truncate" 
    : lines === 2 
      ? "line-clamp-2" 
      : "line-clamp-3";
  
  return (
    <Typography 
      variant={variant}
      className={cn("overflow-hidden", props.className)}
      {...props}
      truncate={lines === 1 ? "singleLine" : lines === 2 ? "twoLines" : "threeLines"}
    />
  );
} 