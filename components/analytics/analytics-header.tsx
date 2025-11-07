"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function AnalyticsHeader() {
  const [timeRange, setTimeRange] = useState("30d")

  const handleExport = () => {
    const csvData = [
      ["Metric", "Value", "Change"],
      ["Money Saved", "$0", "+12.5%"],
      ["Waste Reduced", "0.0%", "+8.2%"],
      ["CO₂ Saved", "0.0 kg", "+15.3%"],
      ["Target Progress", "0%", "On track"],
      ["", "", ""],
      ["Environmental Impact", "", ""],
      ["CO₂ Saved", "45.2 kg", ""],
      ["Water Saved", "1250 L", ""],
      ["Land Saved", "8.5 m²", ""],
      ["Energy Saved", "125 kWh", ""],
      ["", "", ""],
      ["Category Breakdown", "", ""],
      ["Vegetables", "30%", ""],
      ["Fruits", "25%", ""],
      ["Dairy", "20%", ""],
      ["Meat", "15%", ""],
      ["Grains", "10%", ""],
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `ecopantry-analytics-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 dark:text-green-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">Analytics Dashboard</h1>
              <p className="text-green-600 dark:text-green-400">Track your waste reduction and environmental impact</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 border-green-200 dark:border-green-700">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-700 bg-transparent"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
