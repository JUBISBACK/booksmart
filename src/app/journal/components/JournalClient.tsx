'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { format } from "date-fns"
import { BookOpen, Tag, Calendar, Smile, Meh } from "lucide-react"

interface JournalClientProps {
  journals: {
    id: string
    title: string
    content: string
    date: string
    mood: string
    tags: string[]
  }[]
  userId: string
  moodIcons: Record<Mood, string>
}

type Mood = 'happy' | 'neutral' | 'thoughtful' | 'confused' | 'smile';

export default function JournalClient({ journals, userId, moodIcons }: JournalClientProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [tags, setTags] = useState("")
  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4">
        {/* Journals list */}
        {journals.map((journal) => (
          <Card key={journal.id} className="p-4">
            <h3 className="font-semibold">{journal.title}</h3>
            <p>{journal.content}</p>
            <div className="mt-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(journal.date), "MMM d, yyyy")}</span>
              {journal.mood && (
                <>
                  <span className="text-xl">{moodIcons[journal.mood as Mood]}</span>
                  <span className="ml-2">{journal.mood}</span>
                </>
              )}
            </div>
          </Card>
        ))}

        {/* Create new journal */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Create New Journal Entry</h3>
          <form className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <Label>Mood</Label>
              <div className="flex gap-2">
                {Object.entries(moodIcons).map(([mood, emoji]) => (
                  <button
                    key={mood}
                    onClick={() => setMood(mood as Mood)}
                    className={`p-2 rounded-full hover:bg-gray-100 ${
                      mood === mood && "bg-gray-200"
                    }`}
                  >
                    <span className="text-xl">{emoji}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Tags</Label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={date?.toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </div>
            <Button type="submit">Create Entry</Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
