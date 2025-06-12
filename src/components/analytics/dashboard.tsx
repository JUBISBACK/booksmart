import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

interface AnalyticsData {
  totalBooks: number
  totalPages: number
  avgPagesPerDay: number
  favoriteGenres: string[]
  moodHistory: {
    date: string
    mood: string
  }[]
}

export function AnalyticsDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["analytics"],
    queryFn: () => api.analytics.getStats(),
  })

  const { data: readingHistory } = useQuery({
    queryKey: ["readingHistory"],
    queryFn: () => api.analytics.getReadingHistory(),
  })

  const chartData = readingHistory?.map((entry) => ({
    date: entry.date,
    pages: entry.pages,
  })) || []

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Stats Cards */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold">Total Books</h3>
        <p className="text-3xl font-bold mt-2">{stats?.totalBooks || 0}</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Total Pages</h3>
        <p className="text-3xl font-bold mt-2">{stats?.totalPages || 0}</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold">Avg Pages/Day</h3>
        <p className="text-3xl font-bold mt-2">{stats?.avgPagesPerDay || 0}</p>
      </Card>

      {/* Charts */}
      <Card className="col-span-2 p-6">
        <h3 className="text-xl font-semibold mb-4">Reading Progress</h3>
        <div className="h-[300px]">
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pages" fill="#8884d8" />
          </BarChart>
        </div>
      </Card>

      <Card className="col-span-2 p-6">
        <h3 className="text-xl font-semibold mb-4">Favorite Genres</h3>
        <div className="flex flex-wrap gap-2">
          {stats?.favoriteGenres?.map((genre, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-primary/10 rounded-full text-sm"
            >
              {genre}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
