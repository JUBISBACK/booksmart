import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookList } from "@/components/books/book-list"
import { AddBookDialog } from "@/components/books/add-book-dialog"

export default function BooksPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Books</h1>
        <AddBookDialog />
      </div>
      
      <div className="grid gap-6">
        <BookList />
      </div>
    </div>
  )
}
