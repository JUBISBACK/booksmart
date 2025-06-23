'use client'

import { Button } from "@/components/ui/button"
import { Bell, Search, Settings } from "lucide-react"

export function ChatHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Chat</h2>
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
