import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

interface BookClub {
  id: string
  name: string
  description: string
  memberCount: number
  createdAt: string
}

export function BookClubList() {
  const { data: clubs } = useQuery({
    queryKey: ["bookClubs"],
    queryFn: () => api.bookClubs.list(),
  })

  return (
    <div className="space-y-4">
      {clubs?.map((club) => (
        <Card key={club.id} className="p-4">
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold">{club.name}</h3>
            <p className="text-muted-foreground">{club.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {club.memberCount} members
              </span>
              <Button variant="outline" size="sm">
                Join Club
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
