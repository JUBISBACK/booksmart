import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { useState } from "react"

export default async function GoalsPage() {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  const goals = await db.readingGoal.findMany({
    where: { userId: session.user.id },
    orderBy: { startDate: "desc" },
    include: {
      progress: {
        orderBy: { date: "desc" },
        take: 1,
      },
    },
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Reading Goals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreateGoalForm />
        
        {goals.map((goal) => (
          <Card key={goal.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{goal.title}</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {format(new Date(goal.startDate), 'MMM d')} - {format(new Date(goal.endDate), 'MMM d')}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full">
                    <div
                      className="h-2 bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium">
                  {goal.progress}%
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pages">Pages Read Today</Label>
                <Input
                  id="pages"
                  type="number"
                  defaultValue="0"
                  className="w-full"
                />
                <Button>Update Progress</Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Total Target: {goal.targetPages} pages</p>
                <p>Current Progress: {goal.progress}%</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CreateGoalForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetPages, setTargetPages] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement goal creation API call
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Goal Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="targetPages">Target Pages</Label>
          <Input
            id="targetPages"
            type="number"
            value={targetPages}
            onChange={(e) => setTargetPages(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Calendar
              value={startDate}
              onChange={setStartDate}
              className="w-full"
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Calendar
              value={endDate}
              onChange={setEndDate}
              className="w-full"
            />
          </div>
        </div>

        <Button type="submit">Create Goal</Button>
      </form>
    </Card>
  )
}
