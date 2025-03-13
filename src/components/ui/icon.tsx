import * as React from "react";
import * as RadixIcons from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
export interface IconProps {
  name: keyof typeof RadixIcons;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  [key: string]: any; // Allow any other props to be passed through
}

/**
 * Icon component that wraps Radix icons with consistent styling
 *
 * @example
 * ```tsx
 * <Icon name="HomeIcon" />
 * <Icon name="GearIcon" size="lg" className="text-primary" />
 * ```
 */
export function Icon({ name, className, size = "md", ...props }: IconProps) {
  const IconComponent = RadixIcons[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Radix icons`);
    return null;
  }
  const sizeMap = {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };
  const sizeClass =
    typeof size === "string" ? sizeMap[size] : `h-${size} w-${size}`;
  return (
    <IconComponent
      className={cn(sizeClass, "stroke-[1.25]", className)}
      {...props}
      data-oid="is3_8.7"
    />
  );
}
