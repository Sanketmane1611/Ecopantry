"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { TrendingDown } from "lucide-react"

const wasteData = [
  { month: "Jan", consumed: 45, wasted: 15, wasteRate: 25 },
  { month: "Feb", consumed: 52, wasted: 12, wasteRate: 19 },
  { month: "Mar", consumed: 48, wasted: 8, wasteRate: 14 },
  { month: "Apr", consumed: 61, wasted: 7, wasteRate: 10 },
  { month: "May", consumed: 55, wasted: 5, wasteRate: 8 },
  { month: "Jun", consumed: 67, wasted: 4, wasteRate: 6 },
]

export function WasteReductionChart() {
  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <TrendingDown className="h-5 w-5 text-green-600" />
          Waste Reduction Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            consumed: {
              label: "Items Consumed",
              color: "#10b981",
            },
            wasted: {
              label: "Items Wasted",
              color: "#ef4444",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={wasteData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-green-800" />
              <XAxis dataKey="month" className="text-green-600 dark:text-green-400" />
              <YAxis className="text-green-600 dark:text-green-400" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="consumed"
                stroke="var(--color-consumed)"
                strokeWidth={3}
                dot={{ fill: "var(--color-consumed)", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="wasted"
                stroke="var(--color-wasted)"
                strokeWidth={3}
                dot={{ fill: "var(--color-wasted)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-green-700 dark:text-green-300">Items Consumed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-green-700 dark:text-green-300">Items Wasted</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-green-600 dark:text-green-400">
          <p>Great progress! You've reduced food waste by 76% over the last 6 months.</p>
        </div>
      </CardContent>
    </Card>
  )
}
