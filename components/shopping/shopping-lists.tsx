"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AddShoppingItemModal } from "./add-shopping-item-modal"

interface ShoppingListItem {
  id: string
  item_name: string
  quantity: number
  unit: string
  category?: string
  is_purchased: boolean
}

interface ShoppingList {
  id: string
  name: string
  is_active: boolean
  created_at: string
  shopping_list_items: ShoppingListItem[]
}

export function ShoppingLists() {
  const [lists, setLists] = useState<ShoppingList[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [selectedListId, setSelectedListId] = useState<string | null>(null)

  useEffect(() => {
    const fetchLists = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase
          .from("shopping_lists")
          .select(`
            *,
            shopping_list_items (*)
          `)
          .order("created_at", { ascending: false })

        if (error) throw error
        setLists(data || [])
      } catch (error) {
        console.error("Error fetching shopping lists:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLists()
  }, [])

  const toggleItemPurchased = async (listId: string, itemId: string, isPurchased: boolean) => {
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("shopping_list_items")
        .update({ is_purchased: !isPurchased })
        .eq("id", itemId)

      if (error) throw error

      setLists((prev) =>
        prev.map((list) =>
          list.id === listId
            ? {
                ...list,
                shopping_list_items: list.shopping_list_items.map((item) =>
                  item.id === itemId ? { ...item, is_purchased: !isPurchased } : item,
                ),
              }
            : list,
        ),
      )
    } catch (error) {
      console.error("Error updating item:", error)
    }
  }

  const handleAddItem = (listId: string) => {
    setSelectedListId(listId)
    setShowAddItemModal(true)
  }

  const handleItemAdded = () => {
    setShowAddItemModal(false)
    setSelectedListId(null)
    const fetchLists = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase
          .from("shopping_lists")
          .select(`
            *,
            shopping_list_items (*)
          `)
          .order("created_at", { ascending: false })

        if (error) throw error
        setLists(data || [])
      } catch (error) {
        console.error("Error fetching shopping lists:", error)
      }
    }

    fetchLists()
  }

  if (loading) {
    return (
      <div className="grid gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-green-200 dark:bg-green-800 rounded w-1/3"></div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-4 bg-green-100 dark:bg-green-900 rounded"></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (lists.length === 0) {
    return (
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="p-12 text-center">
          <ShoppingCart className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">No shopping lists yet</h3>
          <p className="text-green-600 dark:text-green-400 mb-6">Create your first shopping list to get started.</p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Shopping List
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-6">
        {lists.map((list) => {
          const totalItems = list.shopping_list_items.length
          const purchasedItems = list.shopping_list_items.filter((item) => item.is_purchased).length
          const progress = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0

          return (
            <Card key={list.id} className="border-green-200 dark:border-green-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-green-800 dark:text-green-200">{list.name}</CardTitle>
                    {list.is_active && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 dark:text-green-400">
                      {purchasedItems}/{totalItems} items
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAddItem(list.id)}>Add Item</DropdownMenuItem>
                        <DropdownMenuItem>Edit List</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete List</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {totalItems > 0 && (
                  <div className="w-full bg-green-100 dark:bg-green-900 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {list.shopping_list_items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-green-600 dark:text-green-400">No items in this list yet.</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                      onClick={() => handleAddItem(list.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {list.shopping_list_items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          item.is_purchased
                            ? "bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-800"
                            : "bg-white dark:bg-green-950/50 border-green-100 dark:border-green-900"
                        }`}
                      >
                        <Checkbox
                          checked={item.is_purchased}
                          onCheckedChange={() => toggleItemPurchased(list.id, item.id, item.is_purchased)}
                        />
                        <div className="flex-1">
                          <span
                            className={`font-medium ${
                              item.is_purchased
                                ? "line-through text-green-500 dark:text-green-400"
                                : "text-green-800 dark:text-green-200"
                            }`}
                          >
                            {item.item_name}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                            {item.category && (
                              <>
                                <span>•</span>
                                <span>{item.category}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {showAddItemModal && selectedListId && (
        <AddShoppingItemModal
          listId={selectedListId}
          onClose={() => setShowAddItemModal(false)}
          onItemAdded={handleItemAdded}
        />
      )}
    </>
  )
}
