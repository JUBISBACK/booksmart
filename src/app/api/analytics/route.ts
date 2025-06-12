import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get total books and pages
    const [totalBooks, totalPages] = await Promise.all([
      db.book.count({ where: { userId: session.user.id } }),
      db.book.aggregate({
        where: { userId: session.user.id },
        _sum: { pages: true },
      }),
    ])

    // Get reading statistics
    const stats = await db.readingStatistic.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "desc" },
      take: 30,
    })

    // Get favorite genres
    const books = await db.book.findMany({
      where: { userId: session.user.id },
    })

    // Calculate average pages per day
    const pagesRead = stats.reduce((sum, stat) => sum + stat.pagesRead, 0)
    const days = stats.length
    const avgPagesPerDay = days > 0 ? Math.round(pagesRead / days) : 0

    // Get reading streak
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

    return NextResponse.json({
      totalBooks,
      totalPages: totalPages._sum.pages || 0,
      avgPagesPerDay,
      readingStreak: streak,
      moodHistory: stats.map(stat => ({
        date: stat.date,
        mood: stat.mood,
      })),
      favoriteGenres: books
        .map(book => book.genre)
        .filter((genre, index, self) => self.indexOf(genre) === index)
        .slice(0, 3),
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
