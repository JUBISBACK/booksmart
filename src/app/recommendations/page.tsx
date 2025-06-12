import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { BookCard } from "@/components/books/book-card"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export default async function RecommendationsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  // Get user's reading history for recommendations
  const readingHistory = await db.book.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  // Get existing recommendations
  const recommendations = await db.bookRecommendation.findMany({
    where: { userId: session.user.id },
    orderBy: { score: "desc" },
    take: 10,
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recommended Books</h1>
        <Button onClick={() => generateRecommendations(readingHistory)}>
          Refresh Recommendations
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-4">
            <div className="space-y-4">
              <BookCard
                book={{
                  title: rec.title,
                  author: rec.author,
                  coverUrl: rec.coverUrl,
                }}
              />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Genre:</span> {rec.genre}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Score:</span> {rec.score.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Why:</span> {rec.reason}
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => addBookToLibrary(rec)}
              >
                Add to Library
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

async function generateRecommendations(readingHistory: any[]) {
  // TODO: Implement AI recommendation generation
  // This would call an AI endpoint with reading history
  // and return new recommendations
}

async function addBookToLibrary(recommendation: any) {
  // TODO: Implement adding book to user's library
}
