"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { cn } from "@/lib/utils"
import { BodySM, BodyXS } from "@/components/ui/typography"

// Define the theme colors
const THEMES = {
  blue: {
    light: "hsl(var(--chart-1))",
    dark: "hsl(var(--chart-1))",
  },
  green: {
    light: "hsl(var(--chart-2))",
    dark: "hsl(var(--chart-2))",
  },
  violet: {
    light: "hsl(var(--chart-3))",
    dark: "hsl(var(--chart-3))",
  },
  yellow: {
    light: "hsl(var(--chart-4))",
    dark: "hsl(var(--chart-4))",
  },
  red: {
    light: "hsl(var(--chart-5))",
    dark: "hsl(var(--chart-5))",
  },
}

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const styles = Object.entries(config).map(([key, value]) => {
    const color = value.color
      ? value.color
      : value.theme
      ? Object.entries(value.theme)
          .map(([themeKey, themeValue]) => {
            const theme = THEMES[themeKey as keyof typeof THEMES]
            return theme
              ? `[data-theme="${themeKey}"] & { --${id}-${key}: ${themeValue}; }`
              : ""
          })
          .join("\n")
      : ""

    return `
      [data-chart="${id}"] {
        --${id}-${key}: ${
      value.color ? value.color : `var(--${Object.keys(THEMES)[0]})`
    };
      }
      ${color}
    `
  })

  return <style dangerouslySetInnerHTML={{ __html: styles.join("\n") }} />
}

function ChartTooltip({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
  }) {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background px-3 py-2 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
    >
      {!hideLabel && (
        <div
          className={cn(
            "mb-1 text-xs font-medium text-muted-foreground",
            labelClassName
          )}
        >
          {labelFormatter ? labelFormatter(label, payload) : label}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {payload.map((item: any, index: number) => {
          const payloadKey = nameKey || "name"
          const dataKey = labelKey || "value"
          const payloadConfig = getPayloadConfigFromPayload(
            config,
            item,
            payloadKey
          )
          const formattedValue = formatter
            ? formatter(item[dataKey], item.name, item, index, payload)
            : item[dataKey]
          const colorKey = color || item.dataKey
          const colorValue = payloadConfig?.color
            ? payloadConfig.color
            : `var(--${colorKey})`

          return (
            <div key={index} className="flex items-center gap-1">
              {!hideIndicator && (
                <div
                  className={cn("h-1.5 w-1.5 rounded-full", {
                    "border-2 border-dashed": indicator === "dashed",
                    "h-px w-2": indicator === "line",
                  })}
                  style={{
                    background: colorValue,
                    borderColor: colorValue,
                  }}
                />
              )}
              <span className="text-xs font-medium">
                {item[payloadKey]}: {formattedValue}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChartLegend({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 text-xs",
        className
      )}
    >
      {children}
    </div>
  )
}

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean
    nameKey?: string
  }) {
  const { config } = useChart()

  if (payload) {
    return (
      <>
        {payload.map((item: any, index: number) => {
          const payloadKey = nameKey || "value"
          const payloadConfig = getPayloadConfigFromPayload(
            config,
            item,
            payloadKey
          )
          const colorKey = item.dataKey
          const colorValue = payloadConfig?.color
            ? payloadConfig.color
            : `var(--${colorKey})`

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                className
              )}
            >
              {!hideIcon && (
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: colorValue }}
                />
              )}
              <span>{item[payloadKey]}</span>
            </div>
          )
        })}
      </>
    )
  }

  return null
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (!payload || typeof payload !== "object" || !key) {
    return null
  }

  const payloadKey = key as keyof typeof payload
  const payloadValue = payload[payloadKey]

  if (!payloadValue || typeof payloadValue !== "string") {
    return null
  }

  return config[payloadValue]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
  useChart,
}
