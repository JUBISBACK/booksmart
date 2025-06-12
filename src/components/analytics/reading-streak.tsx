import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export default async function ReadingStreak() {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  // Get reading statistics for the last 30 days
  const stats = await db.readingStatistic.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    orderBy: { date: "desc" },
  })

  // Calculate streak
  const today = new Date()
  const streak = stats.reduce((count, stat, index) => {
    const date = new Date(stat.date)
    if (index === 0 && date.getDate() === today.getDate()) {
      return 1
    }
    if (
      index > 0 &&
      new Date(stats[index - 1].date).getTime() - date.getTime() === 86400000
    ) {
      return count + 1
    }
    return count
  }, 0)

  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <div>
          <h3 className="text-2xl font-bold">Reading Streak</h3>
          <p className="text-sm text-muted-foreground">
            Keep reading every day to maintain your streak!
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Badge variant="destructive" className="w-16 text-center">
          {streak} days
        </Badge>
        <div className="flex-1">
          <div className="h-2 bg-muted rounded-full">
            <div
              className="h-2 bg-yellow-500 rounded-full transition-all duration-300"
              style={{ width: `${(streak / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
