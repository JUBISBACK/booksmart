'use client'

import { useState, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  createdAt: string
}

interface ChatProps {
  bookId?: string
}

export function Chat({ bookId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const { data: chatMessages } = useQuery({
    queryKey: ["chat", bookId],
    queryFn: () => api.chat.getMessages(bookId),
    enabled: !!bookId,
    select: (data) => data.data
  })

  const handleSendMessage = async (message: string) => {
    try {
      if (!bookId) return
      const response = await api.chat.sendMessage({
        bookId,
        message,
      })
      setMessages((prev) => [...prev, response.data])
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-card rounded-lg p-4">
      <div className="flex-1 overflow-y-auto space-y-4" ref={chatContainerRef}>
        {chatMessages?.data?.map((message: Message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  )
}
