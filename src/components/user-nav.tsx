import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export function UserNav() {
  return (
    <div className="flex items-center space-x-1">
      <Link href="/profile" className="hidden items-center rounded-md px-3 py-1.5 text-sm font-medium hover:bg-primary/10 sm:flex">
        My Profile
      </Link>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
