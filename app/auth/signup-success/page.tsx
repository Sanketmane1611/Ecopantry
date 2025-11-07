import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="p-2 bg-green-600 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">EcoPantry</h1>
          </div>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-800 dark:text-green-200">Check Your Email</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                We've sent you a confirmation link
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-green-700 dark:text-green-300 mb-6">
                Please check your email and click the confirmation link to activate your EcoPantry account. Once
                confirmed, you'll be able to start managing your smart pantry!
              </p>
              <Link
                href="/auth/login"
                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline underline-offset-4"
              >
                Return to Sign In
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
