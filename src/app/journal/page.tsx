import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { format } from "date-fns"
import { useState } from "react"
import { BookOpen, Tag, Calendar, MoodHappy, MoodNeutral, MoodThoughtful, MoodConfused, MoodSmile } from "lucide-react"

export default async function JournalPage() {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  // Get user's journals
  const journals = await db.readingJournal.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      book: true,
    },
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reading Journal</h1>
        <Button onClick={() => setShowNewJournal(true)}>New Entry</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journals.map((journal) => (
          <Card key={journal.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{journal.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {journal.book.title} by {journal.book.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {format(new Date(journal.createdAt), 'MMM d, yyyy')}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-2">
                  {journal.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MoodIcon mood={journal.mood} />
                <span className="text-sm text-muted-foreground">
                  {journal.mood}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Progress: {journal.progress}%
                </p>
                <p className="text-sm text-muted-foreground">
                  {journal.content}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <NewJournalDialog />
    </div>
  )
}

function MoodIcon({ mood }: { mood: string }) {
  const icons = {
    happy: MoodHappy,
    neutral: MoodNeutral,
    thoughtful: MoodThoughtful,
    confused: MoodConfused,
    inspired: MoodSmile,
  }

  const Icon = icons[mood as keyof typeof icons] || MoodNeutral
  return <Icon className="h-4 w-4 text-muted-foreground" />
}

function NewJournalDialog() {
  const [showNewJournal, setShowNewJournal] = useState(false)
  const [bookId, setBookId] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("neutral")
  const [progress, setProgress] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement journal creation
    setShowNewJournal(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">New Journal Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="bookId">Book</Label>
            <Input
              id="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mood">Mood</Label>
              <select
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="happy">Happy</option>
                <option value="neutral">Neutral</option>
                <option value="thoughtful">Thoughtful</option>
                <option value="confused">Confused</option>
                <option value="inspired">Inspired</option>
              </select>
            </div>

            <div>
              <Label htmlFor="progress">Progress</Label>
              <Input
                id="progress"
                type="number"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Separate tags with commas"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowNewJournal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Entry</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
