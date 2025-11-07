"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Leaf, Target } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface SavingsData {
  totalSaved: number
  wasteReduced: number
  co2Saved: number
  targetProgress: number
}

export function SavingsOverview() {
  const [data, setData] = useState<SavingsData>({
    totalSaved: 0,
    wasteReduced: 0,
    co2Saved: 0,
    targetProgress: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavingsData = async () => {
      const supabase = createClient()

      try {
        // Get consumption logs for calculations
        const { data: logs, error } = await supabase.from("consumption_logs").select("*")

        if (error) throw error

        const consumedItems = logs?.filter((log) => !log.is_waste).length || 0
        const wastedItems = logs?.filter((log) => log.is_waste).length || 0
        const totalItems = consumedItems + wastedItems

        // Calculate metrics (mock calculations for demo)
        const totalSaved = consumedItems * 2.5 // $2.50 per item saved
        const wasteReduced = totalItems > 0 ? (consumedItems / totalItems) * 100 : 0
        const co2Saved = consumedItems * 0.5 // 0.5 kg CO2 per item
        const targetProgress = Math.min(wasteReduced, 100)

        setData({
          totalSaved,
          wasteReduced,
          co2Saved,
          targetProgress,
        })
      } catch (error) {
        console.error("Error fetching savings data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavingsData()
  }, [])

  const cards = [
    {
      title: "Money Saved",
      value: `$${data.totalSaved.toFixed(0)}`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Waste Reduced",
      value: `${data.wasteReduced.toFixed(1)}%`,
      change: "+8.2%",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "CO₂ Saved",
      value: `${data.co2Saved.toFixed(1)} kg`,
      change: "+15.3%",
      icon: Leaf,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900",
    },
    {
      title: "Target Progress",
      value: `${data.targetProgress.toFixed(0)}%`,
      change: "On track",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">{card.title}</CardTitle>
            <div className={`p-2 rounded-lg ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-1">
              {loading ? "..." : card.value}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">{card.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
