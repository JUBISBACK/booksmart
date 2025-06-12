import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookList } from "../books/book-list"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

export function ProfileBooks() {
  const { data: books } = useQuery({
    queryKey: ["profileBooks"],
    queryFn: () => api.profile.getBooks(),
  })

  const readingBooks = books?.filter(book => book.status === 'reading') || []
  const completedBooks = books?.filter(book => book.status === 'completed') || []
  const toReadBooks = books?.filter(book => book.status === 'to-read') || []

  return (
    <Tabs defaultValue="reading" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="reading">Reading</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="to-read">To Read</TabsTrigger>
      </TabsList>
      <TabsContent value="reading">
        <BookList books={readingBooks} />
      </TabsContent>
      <TabsContent value="completed">
        <BookList books={completedBooks} />
      </TabsContent>
      <TabsContent value="to-read">
        <BookList books={toReadBooks} />
      </TabsContent>
    </Tabs>
  )
}
