import { notFound } from "next/navigation"
import { BookCard } from "@/components/books/book-card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { format } from "date-fns"

interface BookDetailProps {
  params: {
    id: string
  }
}

export default async function BookDetailPage({ params }: BookDetailProps) {
  const session = await auth()
  if (!session?.user?.id) {
    notFound()
  }

  const book = await db.book.findUnique({
    where: { id: params.id, userId: session.user.id },
    include: {
      reviews: {
        include: {
          user: true
        }
      }
    }
  })

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <BookCard book={book} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Reading Progress</h2>
            <div className="space-y-2">
              <Progress value={book.progress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pages">Pages Read Today</Label>
              <Input
                id="pages"
                type="number"
                defaultValue="0"
                className="w-full"
              />
              <Button>Update Progress</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Reading History</h2>
            {book.readingStatistics?.map((stat) => (
              <Card key={stat.date} className="p-4">
                <div className="flex justify-between">
                  <span>{format(new Date(stat.date), 'MMM d, yyyy')}</span>
                  <span>{stat.pagesRead} pages</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span>Mood:</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    stat.mood === 'happy' ? 'bg-green-100 text-green-800' :
                    stat.mood === 'neutral' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {stat.mood}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="space-y-4">
            {book.reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{review.user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(review.createdAt), 'MMM d, yyyy')}
                    </p>
                    <p className="mt-2">{review.content}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
