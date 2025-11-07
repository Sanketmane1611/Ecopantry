import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ShoppingHeader } from "@/components/shopping/shopping-header"
import { ShoppingLists } from "@/components/shopping/shopping-lists"

export default async function ShoppingPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
      <ShoppingHeader />

      <main className="container mx-auto px-6 py-8">
        <ShoppingLists />
      </main>
    </div>
  )
}
