import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { pagesRead, mood } = body

    const book = await db.book.findUnique({
      where: { id: params.id, userId: session.user.id }
    })

    if (!book) {
      return new NextResponse("Book not found", { status: 404 })
    }

    // Calculate new progress
    const totalPagesRead = (book.pagesRead || 0) + pagesRead
    const newProgress = Math.min(Math.round((totalPagesRead / book.pages) * 100), 100)

    // Create or update reading statistic
    const today = new Date()
    const todayDate = today.toISOString().split('T')[0]

    const existingStat = await db.readingStatistic.findFirst({
      where: {
        userId: session.user.id,
        date: todayDate,
      },
    })

    const readingStat = existingStat
      ? await db.readingStatistic.update({
          where: { id: existingStat.id },
          data: {
            pagesRead: existingStat.pagesRead + pagesRead,
            mood,
          },
        })
      : await db.readingStatistic.create({
          data: {
            userId: session.user.id,
            date: todayDate,
            pagesRead: pagesRead,
            mood,
            bookId: params.id,
          },
        })

    // Update book progress
    const updatedBook = await db.book.update({
      where: { id: params.id },
      data: {
        pagesRead: totalPagesRead,
        progress: newProgress,
      },
      include: {
        readingStatistics: {
          orderBy: { date: "desc" },
          take: 7,
        },
      },
    })

    return NextResponse.json({
      book: updatedBook,
      readingStat,
    })
  } catch (error) {
    console.error("Error updating book progress:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
