"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Clock } from "lucide-react"

const patternData = [
  { time: "6 AM", consumption: 5 },
  { time: "9 AM", consumption: 15 },
  { time: "12 PM", consumption: 35 },
  { time: "3 PM", consumption: 20 },
  { time: "6 PM", consumption: 45 },
  { time: "9 PM", consumption: 25 },
  { time: "12 AM", consumption: 8 },
]

export function ConsumptionPatterns() {
  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <Clock className="h-5 w-5 text-green-600" />
          Daily Patterns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            consumption: {
              label: "Consumption",
              color: "hsl(var(--chart-4))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={patternData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-green-800" />
              <XAxis dataKey="time" className="text-green-600 dark:text-green-400" tick={{ fontSize: 10 }} />
              <YAxis className="text-green-600 dark:text-green-400" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="var(--color-consumption)"
                fill="var(--color-consumption)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
