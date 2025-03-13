"use client";

import * as React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";
import { BodySM, BodyXS } from "@/components/ui/typography";
interface RevenueChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: {
    month: string;
    current: number;
    previous: number;
  }[];
  showLegend?: boolean;
  height?: number | string;
}
type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    value: number;
    name?: string;
    color?: string;
  }[];
  label?: string;
};
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 dark:bg-background/90 backdrop-blur-sm border border-border/30 p-2.5 rounded-lg shadow-sm">
        <BodySM className="font-medium mb-0.5">{label}</BodySM>
        <div className="space-y-0.5">
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: entry.color,
                }}
              />

              <BodyXS>
                {entry.name}:{" "}
                <span className="font-medium">
                  {entry.value.toLocaleString()} €
                </span>
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
      return `${value / 1000}k`;
    }
    return `${value}`;
  };

  // Custom tick component for X-axis to handle margin better
  const CustomXAxisTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="var(--muted-foreground)"
          fontSize={10}
          opacity={0.8}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  // Custom tick component for Y-axis to handle margin better
  const CustomYAxisTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dx={-5}
          textAnchor="end"
          fill="var(--muted-foreground)"
          fontSize={10}
          opacity={0.8}
        >
          {formatYAxis(payload.value)}
        </text>
      </g>
    );
  };
  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="current" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.15} />

              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="previous" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.1} />

              <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="5 5"
            stroke="var(--border)"
            opacity={0.1}
            horizontal={true}
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={<CustomXAxisTick />}
            dy={5}
            padding={{
              left: 20,
              right: 20,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={<CustomYAxisTick />}
            width={25}
            domain={["auto", "auto"]}
            padding={{
              top: 10,
              bottom: 10,
            }}
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
            activeDot={{
              r: 5,
              strokeWidth: 0,
            }}
          />

          <Area
            type="monotone"
            dataKey="previous"
            stroke="var(--chart-2)"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#previous)"
            name="Mois Précédent"
            activeDot={{
              r: 4,
              strokeWidth: 0,
            }}
          />

          {showLegend && (
            <Legend
              verticalAlign="top"
              height={30}
              content={(props) => (
                <div className="flex justify-center items-center gap-4 mt-1">
                  {props.payload?.map((entry, index) => (
                    <div
                      key={`legend-${index}`}
                      className="flex items-center gap-1.5"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: entry.color,
                        }}
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
  );
}
