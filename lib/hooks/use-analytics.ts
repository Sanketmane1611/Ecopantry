"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface AnalyticsStats {
  totalItems: number
  expiringItems: number
  wasteReduction: number
  moneySaved: number
  co2Saved: number
  consumedItems: number
  wastedItems: number
}

export function useAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats>({
    totalItems: 0,
    expiringItems: 0,
    wasteReduction: 0,
    moneySaved: 0,
    co2Saved: 0,
    consumedItems: 0,
    wastedItems: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    const supabase = createClient()

    try {
      setLoading(true)

      // Get total items
      const { count: totalItems } = await supabase.from("food_items").select("*", { count: "exact", head: true })

      // Get expiring items (within 3 days)
      const threeDaysFromNow = new Date()
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

      const { count: expiringItems } = await supabase
        .from("food_items")
        .select("*", { count: "exact", head: true })
        .lte("expiry_date", threeDaysFromNow.toISOString().split("T")[0])

      // Get consumption stats
      const { data: consumptionLogs } = await supabase.from("consumption_logs").select("*")

      const consumedItems = consumptionLogs?.filter((log) => !log.is_waste).length || 0
      const wastedItems = consumptionLogs?.filter((log) => log.is_waste).length || 0
      const totalConsumed = consumedItems + wastedItems

      const wasteReduction = totalConsumed > 0 ? (consumedItems / totalConsumed) * 100 : 0
      const moneySaved = consumedItems * 2.5 // $2.50 per item saved
      const co2Saved = consumedItems * 0.5 // 0.5 kg CO2 per item

      setStats({
        totalItems: totalItems || 0,
        expiringItems: expiringItems || 0,
        wasteReduction: Math.round(wasteReduction * 10) / 10,
        moneySaved: Math.round(moneySaved * 100) / 100,
        co2Saved: Math.round(co2Saved * 10) / 10,
        consumedItems,
        wastedItems,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
