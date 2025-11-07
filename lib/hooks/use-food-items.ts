"use client"

import { useState, useEffect } from "react"
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

export function useFoodItems() {
  const [items, setItems] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchItems = async () => {
    const supabase = createClient()

    try {
      setLoading(true)
      const { data, error } = await supabase.from("food_items").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (itemData: Omit<FoodItem, "id" | "created_at">) => {
    const supabase = createClient()

    try {
      const { data, error } = await supabase.from("food_items").insert(itemData).select().single()

      if (error) throw error
      setItems((prev) => [data, ...prev])
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to add item")
    }
  }

  const updateItem = async (id: string, updates: Partial<FoodItem>) => {
    const supabase = createClient()

    try {
      const { data, error } = await supabase.from("food_items").update(updates).eq("id", id).select().single()

      if (error) throw error
      setItems((prev) => prev.map((item) => (item.id === id ? data : item)))
      return data
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update item")
    }
  }

  const deleteItem = async (id: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("food_items").delete().eq("id", id)

      if (error) throw error
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete item")
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
    addItem,
    updateItem,
    deleteItem,
  }
}
