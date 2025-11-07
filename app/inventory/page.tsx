import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { InventoryHeader } from "@/components/inventory/inventory-header"
import { InventoryFilters } from "@/components/inventory/inventory-filters"
import { InventoryGrid } from "@/components/inventory/inventory-grid"

export default async function InventoryPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
      <InventoryHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          <InventoryFilters />
          <InventoryGrid />
        </div>
      </main>
    </div>
  )
}
