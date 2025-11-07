"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Calendar } from "lucide-react"

const trendsData = [
  { month: "Jan", savings: 45 },
  { month: "Feb", savings: 52 },
  { month: "Mar", savings: 48 },
  { month: "Apr", savings: 61 },
  { month: "May", savings: 55 },
  { month: "Jun", savings: 67 },
]

export function MonthlyTrends() {
  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <Calendar className="h-5 w-5 text-green-600" />
          Monthly Savings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            savings: {
              label: "Savings ($)",
              color: "hsl(var(--chart-5))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-green-800" />
              <XAxis dataKey="month" className="text-green-600 dark:text-green-400" />
              <YAxis className="text-green-600 dark:text-green-400" />
              <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`$${value}`, "Savings"]} />
              <Line
                type="monotone"
                dataKey="savings"
                stroke="var(--color-savings)"
                strokeWidth={3}
                dot={{ fill: "var(--color-savings)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 text-sm text-green-600 dark:text-green-400">
          <p>Average monthly savings: $55.50</p>
        </div>
      </CardContent>
    </Card>
  )
}
