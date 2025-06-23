'use client'

import { useState } from "react"
import { format } from "date-fns"
import { Input } from "./input"

interface CalendarProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  className?: string
}

export function Calendar({ value, onChange, className }: CalendarProps) {
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className={className}>
      <Input
        type="date"
        value={value ? format(value, "yyyy-MM-dd") : ""}
        onChange={(e) => {
          if (e.target.value) {
            onChange(new Date(e.target.value))
          } else {
            onChange(undefined)
          }
        }}
        className="w-full"
      />
    </div>
  )
}
