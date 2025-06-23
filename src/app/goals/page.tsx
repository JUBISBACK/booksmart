import { Card } from "@/components/ui/card"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import GoalsClient from "./components/GoalsClient"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

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
        take: 1
      }
    }
  })

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4">
        <Card>
          <GoalsClient goals={goals} userId={session.user.id} />
        </Card>
      </div>
    </div>
  )
}

interface CreateGoalFormProps {
  userId: string
}

function CreateGoalForm({ userId }: CreateGoalFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetPages, setTargetPages] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title,
          description,
          targetPages: parseInt(targetPages),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create goal')
      }

      // Reset form
      setTitle("")
      setDescription("")
      setTargetPages("")
      setStartDate(new Date())
      setEndDate(new Date())
    } catch (error) {
      console.error('Error creating goal:', error)
    }
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
