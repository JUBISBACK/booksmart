import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

interface ProfileStats {
  totalBooks: number
  totalPages: number
  avgPagesPerDay: number
  readingStreak: number
}

export function ProfileStats() {
  const { data: stats } = useQuery({
    queryKey: ["profileStats"],
    queryFn: () => api.profile.getStats(),
  })

  return (
    <div className="grid gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Books</p>
            <p className="text-2xl font-bold">{stats?.totalBooks || 0}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Pages</p>
            <p className="text-2xl font-bold">{stats?.totalPages || 0}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg Pages/Day</p>
            <p className="text-2xl font-bold">{stats?.avgPagesPerDay || 0}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Reading Streak</p>
            <p className="text-2xl font-bold">{stats?.readingStreak || 0} days</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
