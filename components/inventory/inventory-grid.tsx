"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Calendar, MapPin, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  notes?: string
  created_at: string
}

export function InventoryGrid() {
  const [items, setItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.from("food_items").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setItems(data || [])
      } catch (error) {
        console.error("Error fetching items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      fruits: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      vegetables: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      dairy: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      meat: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      grains: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      snacks: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      beverages: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    }
    return colors[category.toLowerCase()] || colors.other
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-green-200 dark:bg-green-800 rounded w-3/4"></div>
                <div className="h-3 bg-green-100 dark:bg-green-900 rounded w-1/2"></div>
                <div className="h-3 bg-green-100 dark:bg-green-900 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-12 text-center">
          <Package className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">No items in your pantry</h3>
          <p className="text-green-600 dark:text-green-400 mb-6">
            Start by adding your first food item to track your inventory.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Add Your First Item</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => {
        const daysUntilExpiry = getDaysUntilExpiry(item.expiry_date)
        return (
          <Card key={item.id} className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">{item.name}</h3>
                  <Badge className={`text-xs ${getCategoryColor(item.category)}`}>{item.category}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Consume</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <Package className="h-4 w-4" />
                  <span>
                    {item.quantity} {item.unit}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.expiry_date).toLocaleDateString()}</span>
                  </div>
                  <Badge variant={getExpiryBadgeVariant(daysUntilExpiry)} className="text-xs">
                    {daysUntilExpiry < 0 ? "Expired" : daysUntilExpiry === 0 ? "Today" : `${daysUntilExpiry}d`}
                  </Badge>
                </div>

                {item.notes && (
                  <p className="text-xs text-green-500 dark:text-green-500 bg-green-50 dark:bg-green-900/50 p-2 rounded">
                    {item.notes}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
