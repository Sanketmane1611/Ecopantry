"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ProfileHeader() {
  return (
    <header className="border-b border-green-200 dark:border-green-800 bg-white/80 dark:bg-green-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 dark:text-green-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">Profile Settings</h1>
            <p className="text-green-600 dark:text-green-400">Manage your account and preferences</p>
          </div>
        </div>
      </div>
    </header>
  )
}
