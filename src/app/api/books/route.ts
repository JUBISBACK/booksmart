import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const books = await db.book.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
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
    const { title, author, pages, description } = body

    const book = await db.book.create({
      data: {
        title,
        author,
        pages,
        description,
        userId: session.user.id,
      },
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error("Error creating book:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
