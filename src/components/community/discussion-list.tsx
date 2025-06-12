import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"

interface Discussion {
  id: string
  title: string
  content: string
  bookTitle: string
  author: string
  replies: number
  createdAt: string
}

export function DiscussionList() {
  const { data: discussions } = useQuery({
    queryKey: ["discussions"],
    queryFn: () => api.discussions.list(),
  })

  return (
    <div className="space-y-4">
      {discussions?.map((discussion) => (
        <Card key={discussion.id} className="p-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{discussion.title}</h3>
              <span className="text-sm text-muted-foreground">
                {new Date(discussion.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-muted-foreground">{discussion.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {discussion.bookTitle} by {discussion.author}
                </span>
                <span className="text-sm text-muted-foreground">
                  {discussion.replies} replies
                </span>
              </div>
              <Button variant="outline" size="sm">
                Reply
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
