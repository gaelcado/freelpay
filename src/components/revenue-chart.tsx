"use client"

import * as React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { cn } from "@/lib/utils"
import { BodySM, BodyXS } from "@/components/ui/typography"

interface RevenueChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    month: string
    current: number
    previous: number
  }[]
  showLegend?: boolean
  height?: number | string
}

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 dark:bg-background/90 backdrop-blur-sm border border-border p-3 rounded-lg shadow-lg">
        <BodySM className="font-medium mb-1">{label}</BodySM>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <BodyXS>
                {entry.name}: <span className="font-medium">{entry.value.toLocaleString()} €</span>
              </BodyXS>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueChart({ 
  data, 
  className,
  showLegend = true,
  height = "100%",
  ...props 
}: RevenueChartProps) {
  // Format the data to include Euro symbol
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}k €`;
    }
    return `${value} €`;
  };

  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="current" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="previous" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={{ stroke: "var(--border)" }}
          />
          <YAxis 
            tick={{ fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={{ stroke: "var(--border)" }}
            tickFormatter={formatYAxis}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="current"
            stroke="var(--chart-1)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#current)"
            name="Mois Actuel"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="previous"
            stroke="var(--chart-2)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#previous)"
            name="Mois Précédent"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          {showLegend && (
            <Legend 
              verticalAlign="top" 
              height={36}
              content={(props) => (
                <div className="flex justify-center items-center gap-6 mt-2">
                  {props.payload?.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <BodyXS className="text-muted-foreground">
                        {entry.value}
                      </BodyXS>
                    </div>
                  ))}
                </div>
              )}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}