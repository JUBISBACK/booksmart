import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const goals = await db.readingGoal.findMany({
      where: { userId: session.user.id },
      orderBy: { startDate: "desc" },
      include: {
        progress: {
          orderBy: { date: "desc" },
          take: 1,
        },
      },
    })

    return NextResponse.json(goals)
  } catch (error) {
    console.error("Error fetching goals:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      targetPages,
      startDate,
      endDate,
    } = body

    const goal = await db.readingGoal.create({
      data: {
        title,
        description,
        targetPages,
        startDate,
        endDate,
        userId: session.user.id,
      },
    })

    return NextResponse.json(goal)
  } catch (error) {
    console.error("Error creating goal:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { id, pagesRead, mood } = body

    const goal = await db.readingGoal.findUnique({
      where: { id },
      include: {
        progress: {
          where: {
            date: new Date().toISOString().split('T')[0],
          },
        },
      },
    })

    if (!goal) {
      return new NextResponse("Goal not found", { status: 404 })
    }

    // Calculate progress
    const totalPagesRead = goal.progress.reduce(
      (sum, progress) => sum + progress.pagesRead,
      0
    ) + pagesRead

    const progress = Math.min(
      Math.round((totalPagesRead / goal.targetPages) * 100),
      100
    )

    // Create or update progress
    const today = new Date()
    const todayDate = today.toISOString().split('T')[0]

    const goalProgress = await db.readingGoalProgress.upsert({
      where: {
        goalId_date: {
          goalId: id,
          date: todayDate,
        },
      },
      update: {
        pagesRead,
        mood,
      },
      create: {
        goalId: id,
        date: todayDate,
        pagesRead,
        mood,
      },
    })

    // Update goal progress
    await db.readingGoal.update({
      where: { id },
      data: { progress },
    })

    return NextResponse.json({
      goalProgress,
      progress,
    })
  } catch (error) {
    console.error("Error updating goal progress:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
