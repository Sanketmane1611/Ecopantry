"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts"
import { Leaf } from "lucide-react"

const impactData = [
  { category: "CO₂ Saved", value: 45.2, unit: "kg", color: "#10b981" },
  { category: "Water Saved", value: 1250, unit: "L", color: "#3b82f6" },
  { category: "Land Saved", value: 8.5, unit: "m²", color: "#f59e0b" },
  { category: "Energy Saved", value: 125, unit: "kWh", color: "#8b5cf6" },
]

export function EnvironmentalImpact() {
  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <Leaf className="h-5 w-5 text-green-600" />
          Environmental Impact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Impact Value",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-green-200 dark:stroke-green-800" />
              <XAxis dataKey="category" className="text-green-600 dark:text-green-400" tick={{ fontSize: 12 }} />
              <YAxis className="text-green-600 dark:text-green-400" />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => [`${value} ${props.payload?.unit}`, "Amount Saved"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {impactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {impactData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-green-700 dark:text-green-300">{item.category}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-green-600 dark:text-green-400">
          <p>Your sustainable choices are making a real environmental difference!</p>
        </div>
      </CardContent>
    </Card>
  )
}
