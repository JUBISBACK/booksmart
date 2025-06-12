import { Book } from "@/types/book"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{book.status}</span>
          {book.rating && (
            <span className="text-sm text-muted-foreground">
              {"★".repeat(book.rating)}
            </span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`/books/${book.id}`)}
        >
          View
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">{book.title}</h3>
        <p className="text-muted-foreground">{book.author}</p>
      </div>
      <div className="mt-4">
        <Progress value={book.progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {book.progress}% Complete
        </p>
      </div>
    </div>
  )
}
