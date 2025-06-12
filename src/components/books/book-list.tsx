import { BookCard } from "./book-card"
import { Book } from "@/types/book"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

interface BookListProps {
  books?: Book[]
}

export function BookList({ books }: BookListProps) {
  const { data: userBooks } = useQuery({
    queryKey: ["books"],
    queryFn: () => api.books.list(),
  })

  const booksToShow = books || userBooks || []

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {booksToShow.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
