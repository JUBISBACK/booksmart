import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Your Intelligent Reading Companion
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Track your reading progress, discuss books with AI, and connect with fellow readers
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/books">
            <Button size="lg">Start Tracking Books</Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" size="lg">AI Chat</Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid gap-x-8 gap-y-20 lg:grid-cols-3">
        {/* Book Tracking Feature */}
        <article className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-x-4">
            <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-inset ring-primary/20">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Book Tracking
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Track your reading progress, organize your books, and set reading goals
              </p>
            </div>
          </div>
          <div className="order-first flex items-center gap-x-4 text-xs">
            <Link href="/books">
              <Button variant="outline" size="sm">Get Started</Button>
            </Link>
          </div>
        </article>

        {/* AI Chat Feature */}
        <article className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-x-4">
            <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-inset ring-primary/20">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                AI Chat
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Get personalized reading recommendations and discuss books with our AI assistant
              </p>
            </div>
          </div>
          <div className="order-first flex items-center gap-x-4 text-xs">
            <Link href="/chat">
              <Button variant="outline" size="sm">Try Chat</Button>
            </Link>
          </div>
        </article>

        {/* Community Feature */}
        <article className="flex flex-col items-start justify-between">
          <div className="flex items-center gap-x-4">
            <div className="rounded-lg bg-primary/10 p-3 ring-1 ring-inset ring-primary/20">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                Community
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Join book clubs, share reviews, and connect with other readers
              </p>
            </div>
          </div>
          <div className="order-first flex items-center gap-x-4 text-xs">
            <Link href="/community">
              <Button variant="outline" size="sm">Join Community</Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
