"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, X } from "lucide-react"

type Msg = { role: "user" | "assistant"; content: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I’m your Pantry Copilot. Ask me anything ✨" },
  ])
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  async function send() {
    const text = input.trim()
    if (!text) return
    setInput("")
    setMessages(m => [...m, { role: "user", content: text }])
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          history: [...messages.slice(-12), { role: "user", content: text }],
        }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: "assistant", content: data.reply }])
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Oops—something went wrong. Try again." }])
    } finally {
      setLoading(false)
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-5 right-5 z-50 rounded-full bg-green-600 text-white p-4 shadow-lg hover:bg-green-700 focus:outline-none"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-96 max-w-[95vw] rounded-2xl border bg-white shadow-2xl dark:bg-zinc-900 dark:border-zinc-800">
          <div className="px-4 py-3 border-b font-semibold text-green-700 dark:text-green-300 dark:border-zinc-800">
            EcoPantry Copilot
          </div>

          <div ref={scrollRef} className="max-h-[50vh] overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm leading-relaxed ${m.role === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block rounded-xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-zinc-500">Thinking…</div>}
          </div>

          <div className="p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-900 dark:border-zinc-700"
              placeholder="Ask about expiring items, recipes, shopping list…"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
