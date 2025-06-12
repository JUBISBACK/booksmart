export interface Book {
  id: string
  title: string
  author: string
  description?: string
  pages: number
  status: 'reading' | 'completed' | 'to-read'
  progress: number
  rating?: number
  userId: string
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  content: string
  rating: number
  bookId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  bookId: string
  userId: string
  createdAt: string
}

export interface Discussion {
  id: string
  title: string
  content: string
  bookId: string
  userId: string
  replies: number
  createdAt: string
  updatedAt: string
}

export interface BookClub {
  id: string
  name: string
  description: string
  memberCount: number
  createdAt: string
}

export interface Analytics {
  totalBooks: number
  totalPages: number
  avgPagesPerDay: number
  favoriteGenres: string[]
  moodHistory: {
    date: string
    mood: string
  }[]
}
