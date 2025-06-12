import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">BookSmart</span>
        </Link>

        <div className="mx-6 flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/books">Books</Link>
            <Link href="/chat">AI Chat</Link>
            <Link href="/analytics">Analytics</Link>
            <Link href="/community">Community</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </div>
    </header>
  )
}
