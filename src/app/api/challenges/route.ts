import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get all active challenges
    const activeChallenges = await db.challenge.findMany({
      where: {
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
      include: {
        participants: {
          where: { userId: session.user.id },
        },
      },
    })

    // Get user's challenges
    const userChallenges = await db.challengeParticipant.findMany({
      where: { userId: session.user.id },
      include: {
        challenge: true,
      },
      orderBy: { joinedAt: "desc" },
    })

    return NextResponse.json({
      activeChallenges,
      userChallenges,
    })
  } catch (error) {
    console.error("Error fetching challenges:", error)
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
    const { challengeId } = body

    // Check if challenge exists and is active
    const challenge = await db.challenge.findUnique({
      where: { id: challengeId },
      include: {
        participants: {
          where: { userId: session.user.id },
        },
      },
    })

    if (!challenge) {
      return new NextResponse("Challenge not found", { status: 404 })
    }

    if (
      new Date(challenge.startDate) > new Date() ||
      new Date(challenge.endDate) < new Date()
    ) {
      return new NextResponse("Challenge is not active", { status: 400 })
    }

    if (challenge.participants.length > 0) {
      return new NextResponse("Already participating", { status: 400 })
    }

    // Create challenge participation
    const participation = await db.challengeParticipant.create({
      data: {
        userId: session.user.id,
        challengeId,
        status: "active",
      },
    })

    return NextResponse.json(participation)
  } catch (error) {
    console.error("Error joining challenge:", error)
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
    const { challengeId, progress } = body

    // Update challenge progress
    const participation = await db.challengeParticipant.update({
      where: {
        userId_challengeId: {
          userId: session.user.id,
          challengeId,
        },
      },
      data: {
        progress,
        status: progress >= body.target ? "completed" : "active",
      },
    })

    return NextResponse.json(participation)
  } catch (error) {
    console.error("Error updating challenge progress:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
