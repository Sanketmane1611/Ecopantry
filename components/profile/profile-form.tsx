"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Save } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  full_name?: string
  household_name?: string
  created_at: string
  updated_at: string
}

interface ProfileFormProps {
  user: SupabaseUser
  profile: Profile | null
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    household_name: profile?.household_name || "",
    email: user.email || "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: formData.email,
          full_name: formData.full_name,
          household_name: formData.household_name,
        })
        .eq("id", user.id)

      if (error) throw error

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const initials = formData.full_name
    ? formData.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                {formData.full_name || "User"}
              </h3>
              <p className="text-green-600 dark:text-green-400">{formData.email}</p>
              {formData.household_name && (
                <p className="text-sm text-green-500 dark:text-green-500">{formData.household_name}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-green-700 dark:text-green-300">
                Full Name
              </Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Enter your full name"
                className="border-green-200 focus:border-green-500 dark:border-green-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="household_name" className="text-green-700 dark:text-green-300">
                Household Name
              </Label>
              <Input
                id="household_name"
                value={formData.household_name}
                onChange={(e) => setFormData({ ...formData, household_name: e.target.value })}
                placeholder="e.g., The Smith Family"
                className="border-green-200 focus:border-green-500 dark:border-green-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-700 dark:text-green-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-green-200 focus:border-green-500 dark:border-green-700"
                disabled
              />
              <p className="text-xs text-green-500 dark:text-green-500">
                Email cannot be changed. Contact support if needed.
              </p>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-600 dark:text-green-400">Profile updated successfully!</p>}

          <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
