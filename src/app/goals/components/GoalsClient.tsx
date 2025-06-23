'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"

interface GoalsClientProps {
  goals: any[]
  userId: string
}

export default function GoalsClient({ goals, userId }: GoalsClientProps) {


  return (
    <div className="container mx-auto py-8">
      <div className="space-y-4">
        {/* Goals list */}
        {goals.map((goal) => (
          <Card key={goal.id} className="p-4">
            <h3 className="font-semibold">{goal.title}</h3>
            <p>Pages: {goal.pages}</p>
            <p>Start: {format(new Date(goal.startDate), "MMM d, yyyy")}</p>
            <p>End: {format(new Date(goal.endDate), "MMM d, yyyy")}</p>
          </Card>
        ))}

        {/* Create new goal form */}
        <CreateGoalForm userId={userId} />
      </div>
    </div>
  )
}
