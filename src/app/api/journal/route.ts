import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const journals = await db.readingJournal.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        book: true,
      },
    })

    return NextResponse.json(journals)
  } catch (error) {
    console.error("Error fetching journals:", error)
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
      bookId,
      title,
      content,
      mood,
      progress,
      tags,
    } = body

    const journal = await db.readingJournal.create({
      data: {
        userId: session.user.id,
        bookId,
        title,
        content,
        mood,
        progress: parseInt(progress),
        tags: tags.split(",").map(tag => tag.trim()),
      },
    })

    return NextResponse.json(journal)
  } catch (error) {
    console.error("Error creating journal entry:", error)
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
    const { id, ...updateData } = body

    const journal = await db.readingJournal.update({
      where: {
        id,
        userId: session.user.id,
      },
      data: {
        ...updateData,
        tags: updateData.tags?.split(",").map(tag => tag.trim()),
      },
    })

    return NextResponse.json(journal)
  } catch (error) {
    console.error("Error updating journal entry:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return new NextResponse("ID is required", { status: 400 })
    }

    await db.readingJournal.delete({
      where: {
        id,
        userId: session.user.id,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Error deleting journal entry:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
