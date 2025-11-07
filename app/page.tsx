import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, ShoppingCart, BarChart3, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">EcoPantry</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 dark:text-green-300">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-green-800 dark:text-green-200 mb-6 text-balance">
            Smart Food Management & Waste Reduction System
          </h2>
          <p className="text-xl text-green-600 dark:text-green-400 mb-8 text-pretty">
            Transform your kitchen into an eco-friendly powerhouse. Track inventory, reduce waste, and make sustainable
            choices with intelligent insights and analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-300 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-4">
            Everything You Need for Smart Food Management
          </h3>
          <p className="text-green-600 dark:text-green-400 max-w-2xl mx-auto">
            Comprehensive tools to help you manage your pantry, reduce waste, and make sustainable choices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg w-fit">
                <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-green-800 dark:text-green-200">Smart Inventory Tracking</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Keep track of all your pantry items with expiration dates, quantities, and locations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Barcode scanning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Expiration alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Category organization
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg w-fit">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-green-800 dark:text-green-200">Waste Analytics</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Visualize your consumption patterns and track waste reduction progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Interactive dashboards
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Environmental impact
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Cost savings tracking
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg w-fit">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-green-800 dark:text-green-200">Household Management</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Collaborate with family members and manage multiple users seamlessly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Multi-user access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Shared shopping lists
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Role-based permissions
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="bg-green-600 border-green-600 text-white">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Reduce Food Waste?</h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of households already saving money and helping the environment with smarter food
              management.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
                Start Free Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-green-600 rounded">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-green-800 dark:text-green-200 font-semibold">EcoPantry</span>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400">© 2024 EcoPantry. Building a sustainable future.</p>
        </div>
      </footer>
    </div>
  )
}
