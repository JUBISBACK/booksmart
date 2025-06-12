import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export function Loading({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
