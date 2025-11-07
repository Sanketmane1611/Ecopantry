"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingDown, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface InventoryStats {
  totalItems: number
  expiringItems: number
  wasteReduction: number
  moneySaved: number
}

export function InventoryOverview() {
  const [stats, setStats] = useState<InventoryStats>({
    totalItems: 0,
    expiringItems: 0,
    wasteReduction: 0,
    moneySaved: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      try {
        // Get total items
        const { count: totalItems } = await supabase.from("food_items").select("*", { count: "exact", head: true })

        // Get expiring items (within 3 days)
        const threeDaysFromNow = new Date()
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

        const { count: expiringItems } = await supabase
          .from("food_items")
          .select("*", { count: "exact", head: true })
          .lte("expiry_date", threeDaysFromNow.toISOString().split("T")[0])

        // Get waste reduction stats (mock data for now)
        const { count: consumedItems } = await supabase
          .from("consumption_logs")
          .select("*", { count: "exact", head: true })
          .eq("is_waste", false)

        setStats({
          totalItems: totalItems || 0,
          expiringItems: expiringItems || 0,
          wasteReduction: consumedItems || 0,
          moneySaved: (consumedItems || 0) * 2.5, // Estimate $2.50 per item saved
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Items",
      value: stats.totalItems,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Expiring Soon",
      value: stats.expiringItems,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
    {
      title: "Items Saved",
      value: stats.wasteReduction,
      icon: TrendingDown,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Money Saved",
      value: `$${stats.moneySaved.toFixed(0)}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-900",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800 dark:text-green-200">{loading ? "..." : stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
