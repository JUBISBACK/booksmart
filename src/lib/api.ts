import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
})

export const booksApi = {
  list: () => api.get('/books'),
  create: (data: any) => api.post('/books', data),
  update: (id: string, data: any) => api.patch(`/books/${id}`, data),
  delete: (id: string) => api.delete(`/books/${id}`),
}

export const chatApi = {
  getMessages: (bookId: string) => api.get(`/chat/${bookId}`),
  sendMessage: (data: any) => api.post('/chat', data),
}

export const analyticsApi = {
  getStats: () => api.get('/analytics'),
  getReadingHistory: () => api.get('/analytics/history'),
}

export const bookClubsApi = {
  list: () => api.get('/book-clubs'),
  create: (data: any) => api.post('/book-clubs', data),
}

export const discussionsApi = {
  list: () => api.get('/discussions'),
  create: (data: any) => api.post('/discussions', data),
}

export const profileApi = {
  getStats: () => api.get('/profile/stats'),
  getBooks: () => api.get('/profile/books'),
}

export const api = {
  books: booksApi,
  chat: chatApi,
  analytics: analyticsApi,
  bookClubs: bookClubsApi,
  discussions: discussionsApi,
  profile: profileApi,
}
