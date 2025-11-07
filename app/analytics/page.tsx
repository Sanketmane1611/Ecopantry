import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { WasteReductionChart } from "@/components/analytics/waste-reduction-chart"
import { SavingsOverview } from "@/components/analytics/savings-overview"
import { EnvironmentalImpact } from "@/components/analytics/environmental-impact"
import { ConsumptionPatterns } from "@/components/analytics/consumption-patterns"
import { CategoryBreakdown } from "@/components/analytics/category-breakdown"
import { MonthlyTrends } from "@/components/analytics/monthly-trends"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
      <AnalyticsHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Overview Cards */}
          <SavingsOverview />

          {/* Main Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <WasteReductionChart />
            <EnvironmentalImpact />
          </div>

          {/* Secondary Charts */}
          <div className="grid lg:grid-cols-3 gap-8">
            <ConsumptionPatterns />
            <CategoryBreakdown />
            <MonthlyTrends />
          </div>
        </div>
      </main>
    </div>
  )
}
