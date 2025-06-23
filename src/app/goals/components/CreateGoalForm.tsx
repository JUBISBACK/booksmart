'use client'

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"

interface CreateGoalFormProps {
  userId: string
}

export default function CreateGoalForm({ userId }: CreateGoalFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [targetPages, setTargetPages] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

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
          targetPages,
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create goal')
      }

      setTitle("")
      setDescription("")
      setTargetPages("")
      setStartDate(undefined)
      setEndDate(undefined)
    } catch (error) {
      console.error('Error creating goal:', error)
      alert('Failed to create goal. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Label>Target Pages</Label>
        <Input
          type="number"
          value={targetPages}
          onChange={(e) => setTargetPages(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Start Date</Label>
        <Calendar
          value={startDate}
          onChange={setStartDate}
          required
        />
      </div>
      <div>
        <Label>End Date</Label>
        <Calendar
          value={endDate}
          onChange={setEndDate}
          required
        />
      </div>
      <Button type="submit">Create Goal</Button>
    </form>
  )
}
