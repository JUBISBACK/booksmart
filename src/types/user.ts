export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  books: Book[]
  reviews: Review[]
  chatMessages: ChatMessage[]
  discussions: Discussion[]
  createdAt: string
}
