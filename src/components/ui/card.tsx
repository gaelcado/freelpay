import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "outline" | "primary" | "secondary" | "success" | "warning" | "danger"
    elevation?: "flat" | "low" | "medium" | "high"
  }
>(({ className, variant = "default", elevation = "medium", ...props }, ref) => {
  // Classes de base pour les variantes standard
  const variantClasses = {
    default: "bg-card text-card-foreground",
    outline: "border bg-transparent",
    primary: "bg-primary/10 border-primary/30 text-primary-foreground",
    secondary: "bg-secondary/10 border-secondary/30 text-secondary-foreground",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
    danger: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"
  }

  // Classes d'élévation (ombres)
  const elevationClasses = {
    flat: "shadow-none",
    low: "shadow-sm",
    medium: "shadow-md",
    high: "shadow-lg"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border overflow-hidden",
        variantClasses[variant],
        elevationClasses[elevation],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "default" | "compact" | "loose"
    withSeparator?: boolean
  }
>(({ className, spacing = "default", withSeparator = false, ...props }, ref) => {
  const spacingClasses = {
    default: "px-6 py-4",
    compact: "p-3 pb-2.5",
    loose: "p-6 pb-5"
  }

  return (
    <div
      ref={ref}
      className={cn(
        spacingClasses[spacing], 
        withSeparator && "border-b border-border/40", 
        className
      )}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    size?: "sm" | "md" | "lg"
  }
>(({ className, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "text-sm font-semibold",
    md: "text-lg font-semibold",
    lg: "text-xl font-semibold"
  }

  return (
    <h3
      ref={ref}
      className={cn(
        sizeClasses[size],
        "leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "default" | "compact" | "loose" | "none"
  }
>(({ className, spacing = "default", ...props }, ref) => {
  const spacingClasses = {
    default: "px-6 py-4",
    compact: "p-3 pb-2.5",
    loose: "p-6 pb-5",
    none: "p-0"
  }

  return (
    <div ref={ref} className={cn(spacingClasses[spacing], className)} {...props} />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "default" | "compact" | "loose"
    withSeparator?: boolean
  }
>(({ className, spacing = "default", withSeparator = false, ...props }, ref) => {
  const spacingClasses = {
    default: "px-6 py-4",
    compact: "p-3 pt-2.5",
    loose: "p-6 pt-5"
  }

  return (
    <div
      ref={ref}
      className={cn(
        spacingClasses[spacing], 
        withSeparator && "border-t border-border/40", 
        "flex items-center", 
        className
      )}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
