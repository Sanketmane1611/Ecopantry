"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface FoodItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  expiry_date: string
  location: string
}

export function ExpiringItems() {
  const [expiringItems, setExpiringItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExpiringItems = async () => {
      const supabase = createClient()

      try {
        const sevenDaysFromNow = new Date()
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

        const { data, error } = await supabase
          .from("food_items")
          .select("*")
          .lte("expiry_date", sevenDaysFromNow.toISOString().split("T")[0])
          .order("expiry_date", { ascending: true })
          .limit(5)

        if (error) throw error
        setExpiringItems(data || [])
      } catch (error) {
        console.error("Error fetching expiring items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchExpiringItems()
  }, [])

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getExpiryBadgeVariant = (days: number) => {
    if (days < 0) return "destructive"
    if (days <= 1) return "destructive"
    if (days <= 3) return "secondary"
    return "outline"
  }

  const getExpiryText = (days: number) => {
    if (days < 0) return `Expired ${Math.abs(days)} days ago`
    if (days === 0) return "Expires today"
    if (days === 1) return "Expires tomorrow"
    return `Expires in ${days} days`
  }

  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Items Expiring Soon
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-green-100 dark:bg-green-900 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : expiringItems.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-green-600 dark:text-green-400">No items expiring soon!</p>
            <p className="text-sm text-green-500 dark:text-green-500">Great job managing your pantry.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {expiringItems.map((item) => {
              const daysUntilExpiry = getDaysUntilExpiry(item.expiry_date)
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/50 rounded-lg border border-green-100 dark:border-green-800"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-green-800 dark:text-green-200">{item.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-green-600 dark:text-green-400">
                      <span className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        {item.quantity} {item.unit}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <Badge variant={getExpiryBadgeVariant(daysUntilExpiry)}>{getExpiryText(daysUntilExpiry)}</Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
