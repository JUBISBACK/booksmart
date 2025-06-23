import { Card } from "@/components/ui/card"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import GoalsClient from "./components/GoalsClient"

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
