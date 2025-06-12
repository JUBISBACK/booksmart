import { Message } from "@/types/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start max-w-[80%]">
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.user?.image} />
          <AvatarFallback>
            {message.user?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">{message.user?.name || "You"}</span>
            <span className="text-sm text-muted-foreground">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <div className={`mt-2 p-3 rounded-lg ${
            isUser ? "bg-primary/10" : "bg-secondary"
          }`}>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
