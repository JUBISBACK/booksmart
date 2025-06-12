import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { format } from "date-fns"
import { Trophy, Users, BookOpen, Calendar } from "lucide-react"
import { useState } from "react"

export default async function ChallengesPage() {
  const session = await auth()
  if (!session?.user?.id) {
    return null
  }

  // Get active challenges
  const activeChallenges = await db.challenge.findMany({
    where: {
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
    include: {
      participants: {
        where: { userId: session.user.id },
      },
    },
  })

  // Get user's challenges
  const userChallenges = await db.challengeParticipant.findMany({
    where: { userId: session.user.id },
    include: {
      challenge: true,
    },
    orderBy: { joinedAt: "desc" },
  })

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reading Challenges</h1>
        <Button onClick={() => joinRandomChallenge()}>Join Random Challenge</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeChallenges.map((challenge) => (
          <Card key={challenge.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <h2 className="text-xl font-semibold">{challenge.title}</h2>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {challenge.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {challenge.participants.length} participants
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(challenge.startDate), 'MMM d')} - {format(new Date(challenge.endDate), 'MMM d')}
                  </span>
                </div>
              </div>

              {challenge.participants.some(p => p.userId === session.user.id) ? (
                <ChallengeProgress challenge={challenge} />
              ) : (
                <Button
                  onClick={() => joinChallenge(challenge.id)}
                  className="w-full"
                >
                  Join Challenge
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">My Challenges</h2>
        <div className="space-y-4">
          {userChallenges.map((participation) => (
            <ChallengeProgress
              key={participation.challengeId}
              challenge={participation.challenge}
              participation={participation}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ChallengeProgress({
  challenge,
  participation,
}: {
  challenge: any
  participation?: any
}) {
  const progress = participation?.progress || 0
  const target = challenge.target
  const isCompleted = progress >= target

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{challenge.title}</h3>
          {isCompleted ? (
            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
              Completed
            </span>
          ) : (
            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
              In Progress
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Progress
              value={(progress / target) * 100}
              className="h-2"
            />
          </div>
          <span className="text-sm font-medium">
            {progress}/{target}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {challenge.type === 'pages' && (
              <BookOpen className="h-4 w-4" />
            )}
            {challenge.type === 'books' && (
              <Users className="h-4 w-4" />
            )}
            Target: {challenge.target}
          </span>
        </div>
      </div>
    </Card>
  )
}

async function joinChallenge(challengeId: string) {
  // TODO: Implement challenge joining logic
}

async function joinRandomChallenge() {
  // TODO: Implement random challenge joining logic
}
