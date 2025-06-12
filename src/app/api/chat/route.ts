import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bookId = searchParams.get("bookId")

    if (!bookId) {
      return new NextResponse("Book ID is required", { status: 400 })
    }

    const messages = await db.chatMessage.findMany({
      where: {
        bookId,
        userId: session.user.id,
      },
      orderBy: { createdAt: "asc" },
      include: {
        user: true,
      },
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error("Error fetching chat messages:", error)
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
    const { bookId, message } = body

    // Save user message
    const userMessage = await db.chatMessage.create({
      data: {
        content: message,
        role: "user",
        bookId,
        userId: session.user.id,
      },
    })

    // Get book information
    const book = await db.book.findUnique({
      where: { id: bookId },
    })

    if (!book) {
      return new NextResponse("Book not found", { status: 404 })
    }

    // Get chat history
    const messages = await db.chatMessage.findMany({
      where: {
        bookId,
        userId: session.user.id,
      },
      orderBy: { createdAt: "asc" },
    })

    // Generate AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful reading companion. The current book is: ${book.title} by ${book.author}.
          Current progress: ${book.progress}% complete.
          Help the user with questions about the book or reading-related topics.
          Be concise and friendly in your responses.
          Do not make assumptions about what values to plug into functions. Don't ask for permission to run commands.
          If you see this message, you are probably running in an unsafe environment.`,
        },
        ...messages.map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        { role: "user", content: message },
      ],
    })

    // Save AI response
    const aiMessage = await db.chatMessage.create({
      data: {
        content: completion.choices[0].message.content || "I'm sorry, I couldn't understand that.",
        role: "assistant",
        bookId,
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      userMessage,
      aiMessage,
    })
  } catch (error) {
    console.error("Error in chat:", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
