import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "glass" | "outline" | "primary" | "secondary" | "success" | "warning" | "danger"
    elevation?: "flat" | "low" | "medium" | "high"
  }
>(({ className, variant = "default", elevation = "medium", ...props }, ref) => {
  const variantClasses = {
    default: "bg-card text-card-foreground",
    glass: "bg-background/100 dark:bg-background/80 backdrop-blur-lg border border-white/20 dark:border-white/10",
    outline: "border bg-transparent",
    primary: "bg-primary/10 border-primary/30 text-primary-foreground",
    secondary: "bg-secondary/10 border-secondary/30 text-secondary-foreground",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
    danger: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300"
  }

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
        "rounded-lg border",
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
    default: "p-6 pb-4",
    compact: "p-4 pb-3",
    loose: "p-8 pb-5"
  }

  return (
    <div
      ref={ref}
      className={cn(
        spacingClasses[spacing], 
        withSeparator && "border-b pb-4", 
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
    sm: "text-sm font-medium",
    md: "text-lg font-semibold",
    lg: "text-xl font-semibold"
  }

  return (
    <h3
      ref={ref}
      className={cn(
        sizeClasses[size],
        "leading-none tracking-tight mb-1",
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
    spacing?: "default" | "compact" | "loose"
  }
>(({ className, spacing = "default", ...props }, ref) => {
  const spacingClasses = {
    default: "p-6 pt-0",
    compact: "p-4 pt-0",
    loose: "p-8 pt-0"
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
    default: "p-6 pt-4",
    compact: "p-4 pt-3",
    loose: "p-8 pt-5"
  }

  return (
    <div
      ref={ref}
      className={cn(
        spacingClasses[spacing], 
        withSeparator && "border-t pt-4", 
        "flex items-center", 
        className
      )}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
