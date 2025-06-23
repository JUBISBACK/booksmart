'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function BookSelector() {
  const [selectedBook, setSelectedBook] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <Label>Search Books</Label>
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <Label>Selected Book</Label>
          <Button variant="outline" className="w-full">
            {selectedBook || "Select a book"}
          </Button>
        </div>
      </div>
    </div>
  )
}
