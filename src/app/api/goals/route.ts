import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { Prisma } from '@prisma/client'

interface CreateGoalBody {
  title: string
  description: string
  targetPages: string
  startDate: string
  endDate: string
}

interface CreateGoalResponse extends Prisma.ReadingGoalGetPayload<{}> {}

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

    const body = await request.json() as CreateGoalBody
    const {
      title,
      description,
      targetPages,
      startDate,
      endDate,
    } = body

    // Validate input
    if (!title || !targetPages || !startDate || !endDate) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const parsedTargetPages = parseInt(targetPages)
    if (isNaN(parsedTargetPages) || parsedTargetPages <= 0) {
      return new NextResponse("Invalid target pages", { status: 400 })
    }

    const parsedStartDate = new Date(startDate)
    const parsedEndDate = new Date(endDate)
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return new NextResponse("Invalid date format", { status: 400 })
    }

    if (parsedEndDate <= parsedStartDate) {
      return new NextResponse("End date must be after start date", { status: 400 })
    }

    const goal = await db.readingGoal.create({
      data: {
        userId: session.user.id,
        title,
        description,
        targetPages: parsedTargetPages,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      },
      select: {
        id: true,
        title: true,
        description: true,
        targetPages: true,
        startDate: true,
        endDate: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json(goal)
  } catch (error) {
    console.error("Error creating goal:", error)
    if (error instanceof Error && error.message.includes('P2002')) {
      return new NextResponse("Goal with this title already exists", { status: 400 })
    }
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
        pagesRead: {
          increment: pagesRead,
        },
        mood,
      },
      create: {
        goalId: id,
        date: todayDate,
        pagesRead,
        mood,
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
