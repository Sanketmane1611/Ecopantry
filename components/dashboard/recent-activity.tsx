"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Minus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface ActivityItem {
  id: string
  item_name: string
  quantity_consumed: number
  consumption_date: string
  is_waste: boolean
  waste_reason?: string
  created_at: string
}

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecentActivity = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase
          .from("consumption_logs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(5)

        if (error) throw error
        setActivities(data || [])
      } catch (error) {
        console.error("Error fetching recent activity:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentActivity()
  }, [])

  const getActivityIcon = (isWaste: boolean) => {
    return isWaste ? Trash2 : Minus
  }

  const getActivityColor = (isWaste: boolean) => {
    return isWaste ? "text-red-500" : "text-green-500"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-green-100 dark:bg-green-900 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <p className="text-green-600 dark:text-green-400">No recent activity</p>
            <p className="text-sm text-green-500 dark:text-green-500">Start tracking your food consumption!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.is_waste)
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/50 rounded-lg border border-green-100 dark:border-green-800"
                >
                  <div className={`p-2 rounded-full bg-white dark:bg-green-800 ${getActivityColor(activity.is_waste)}`}>
                    <ActivityIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-green-800 dark:text-green-200">{activity.item_name}</span>
                      <Badge variant={activity.is_waste ? "destructive" : "secondary"}>
                        {activity.is_waste ? "Wasted" : "Consumed"}
                      </Badge>
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">
                      {activity.quantity_consumed} items • {formatDate(activity.created_at)}
                      {activity.is_waste && activity.waste_reason && (
                        <span className="ml-2 text-red-600 dark:text-red-400">• {activity.waste_reason}</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
