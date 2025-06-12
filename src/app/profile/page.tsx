import { ProfileHeader } from "@/components/profile/header"
import { ProfileStats } from "@/components/profile/stats"
import { ProfileBooks } from "@/components/profile/books"

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <ProfileHeader />
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <ProfileStats />
        </div>
        <div className="md:col-span-2">
          <ProfileBooks />
        </div>
      </div>
    </div>
  )
}
