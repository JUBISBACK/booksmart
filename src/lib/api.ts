import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
})

export const booksApi = {
  list: () => axiosInstance.get('/books'),
  create: (data: any) => axiosInstance.post('/books', data),
  update: (id: string, data: any) => axiosInstance.patch(`/books/${id}`, data),
  delete: (id: string) => axiosInstance.delete(`/books/${id}`),
}

export const chatApi = {
  getMessages: (bookId: string) => axiosInstance.get(`/chat/${bookId}`),
  sendMessage: (data: any) => axiosInstance.post('/chat', data),
}

export const analyticsApi = {
  getStats: () => axiosInstance.get('/analytics'),
  getReadingHistory: () => axiosInstance.get('/analytics/history'),
}

export const bookClubsApi = {
  list: () => axiosInstance.get('/book-clubs'),
  create: (data: any) => axiosInstance.post('/book-clubs', data),
}

export const discussionsApi = {
  list: () => axiosInstance.get('/discussions'),
  create: (data: any) => axiosInstance.post('/discussions', data),
}

export const profileApi = {
  getStats: () => axiosInstance.get('/profile/stats'),
  getBooks: () => axiosInstance.get('/profile/books'),
}

export const api = {
  books: booksApi,
  chat: chatApi,
  analytics: analyticsApi,
  bookClubs: bookClubsApi,
  discussions: discussionsApi,
  profile: profileApi,
}
