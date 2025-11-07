// app/api/chat/route.ts
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { createClient } from "@/lib/supabase/server"

export const runtime = "nodejs" // keep SDK happy

type Msg = { role: "user" | "assistant" | "system"; content: string }

export async function POST(req: Request) {
  const { history = [] }: { history: Msg[] } = await req.json()

  // Base persona
  let context = "You are EcoPantry Copilot. Be concise and helpful."

  // Optional: personalize with expiring items for logged-in user
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()

  if (auth?.user) {
    const today = new Date()
    const in7 = new Date(Date.now() + 7 * 86400000)
    const todayStr = today.toISOString().split("T")[0]
    const in7Str = in7.toISOString().split("T")[0]

    const { data: expiring } = await supabase
      .from("food_items")
      .select("name, quantity, unit, expiry_date")
      .gte("expiry_date", todayStr)
      .lte("expiry_date", in7Str)
      .order("expiry_date", { ascending: true })
      .limit(10)

    if (expiring?.length) {
      const bullets = expiring
        .map(i => `• ${i.name} — ${i.quantity} ${i.unit ?? ""} (exp: ${i.expiry_date})`)
        .join("\n")
      context += `\n\nItems expiring within 7 days:\n${bullets}\n\nWhen asked for meal ideas, prioritize these.`
    }
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      { role: "system", content: context },
      ...history.map(m => ({ role: m.role, content: m.content })),
    ],
  })

  const reply = completion.choices[0].message?.content ?? "Sorry, I’m not sure."
  return NextResponse.json({ reply })
}
