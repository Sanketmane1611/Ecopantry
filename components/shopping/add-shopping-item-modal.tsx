"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

interface AddShoppingItemModalProps {
  listId: string
  onClose: () => void
  onItemAdded: () => void
}

export function AddShoppingItemModal({ listId, onClose, onItemAdded }: AddShoppingItemModalProps) {
  const [formData, setFormData] = useState({
    item_name: "",
    quantity: 1,
    unit: "pieces",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Submitting shopping item:", formData)

    try {
      const supabase = createClient()

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        console.log("[v0] User authentication error:", userError)
        setError("You must be logged in to add items")
        return
      }

      console.log("[v0] Current user:", user.id)

      const { data, error: insertError } = await supabase
        .from("shopping_list_items")
        .insert({
          shopping_list_id: listId,
          item_name: formData.item_name,
          quantity: formData.quantity,
          unit: formData.unit,
          category: formData.category || null,
          is_purchased: false,
        })
        .select()

      if (insertError) {
        console.log("[v0] Insert error:", insertError)
        throw insertError
      }

      console.log("[v0] Item added successfully:", data)
      onItemAdded()
    } catch (error: any) {
      console.error("[v0] Error adding shopping item:", error)
      setError(error.message || "Failed to add item")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-800 dark:text-green-200">Add Shopping Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item_name" className="text-green-700 dark:text-green-300">
              Item Name *
            </Label>
            <Input
              id="item_name"
              value={formData.item_name}
              onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
              placeholder="e.g., Milk, Bread, Apples"
              required
              className="border-green-200 focus:border-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-green-700 dark:text-green-300">
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 1 })}
                className="border-green-200 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit" className="text-green-700 dark:text-green-300">
                Unit
              </Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pieces">Pieces</SelectItem>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="g">Grams</SelectItem>
                  <SelectItem value="lbs">Pounds</SelectItem>
                  <SelectItem value="oz">Ounces</SelectItem>
                  <SelectItem value="liters">Liters</SelectItem>
                  <SelectItem value="ml">ML</SelectItem>
                  <SelectItem value="cups">Cups</SelectItem>
                  <SelectItem value="bottles">Bottles</SelectItem>
                  <SelectItem value="cans">Cans</SelectItem>
                  <SelectItem value="boxes">Boxes</SelectItem>
                  <SelectItem value="bags">Bags</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-green-700 dark:text-green-300">
              Category (Optional)
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="border-green-200 focus:border-green-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
                <SelectItem value="frozen">Frozen</SelectItem>
                <SelectItem value="pantry">Pantry</SelectItem>
                <SelectItem value="household">Household</SelectItem>
                <SelectItem value="personal_care">Personal Care</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">{error}</div>}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !formData.item_name.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Item"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
