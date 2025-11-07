"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Scan, ShoppingCart, BarChart3 } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Add Item",
      description: "Manually add food items",
      icon: Plus,
      href: "/inventory/add",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Scan Barcode",
      description: "Quick add with barcode",
      icon: Scan,
      href: "/inventory/scan",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Shopping List",
      description: "Manage your lists",
      icon: ShoppingCart,
      href: "/shopping",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: BarChart3,
      href: "/analytics",
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ]

  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="text-green-800 dark:text-green-200">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className={`w-full h-auto p-4 flex flex-col items-center gap-2 border-green-200 hover:border-green-300 dark:border-green-700 text-green-700 hover:text-green-800 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/50`}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">{action.description}</div>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
