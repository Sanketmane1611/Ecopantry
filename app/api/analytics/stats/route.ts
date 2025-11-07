import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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

    const stats = {
      totalItems: totalItems || 0,
      expiringItems: expiringItems || 0,
      wasteReduction: Math.round(wasteReduction * 10) / 10,
      moneySaved: Math.round(moneySaved * 100) / 100,
      co2Saved: Math.round(co2Saved * 10) / 10,
      consumedItems,
      wastedItems,
    }

    return NextResponse.json({ data: stats })
  } catch (error) {
    console.error("Error fetching analytics stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
