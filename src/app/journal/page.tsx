import { Card } from "@/components/ui/card"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { format } from "date-fns"
import JournalClient from "./components/JournalClient"

type Mood = 'happy' | 'neutral' | 'thoughtful' | 'confused' | 'smile';

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
      book: true
    }
  })

  // Format journals for client component
  const formattedJournals = journals.map(journal => ({
    id: journal.id,
    title: journal.title,
    content: journal.content,
    date: journal.createdAt.toISOString(),
    mood: journal.mood,
    tags: journal.tags
  }))

  // Mood icons
  const moodIcons: Record<Mood, string> = {
    happy: '😊',
    neutral: '😐',
    thoughtful: '🤔',
    confused: '😕',
    smile: '😊'
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4">
        <Card>
          <JournalClient journals={formattedJournals} userId={session.user.id} moodIcons={moodIcons} />
        </Card>
      </div>
    </div>
  )
}
