import { Chat } from "@/components/chat/chat"
import { ChatHeader } from "@/components/chat/chat-header"
import { BookSelector } from "@/components/chat/book-selector"

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <ChatHeader />
        <div className="flex-1 flex space-x-4">
          <BookSelector />
          <Chat />
        </div>
      </div>
    </div>
  )
}
