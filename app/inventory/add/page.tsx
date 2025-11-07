import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AddItemForm } from "@/components/inventory/add-item-form"
import { AddItemHeader } from "@/components/inventory/add-item-header"

export default async function AddItemPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
      <AddItemHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <AddItemForm />
        </div>
      </main>
    </div>
  )
}
