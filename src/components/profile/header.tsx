import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

export function ProfileHeader() {
  const { user } = useAuth()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.image} />
          <AvatarFallback>
            {user?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user?.name || "Your Profile"}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <Button>Edit Profile</Button>
    </div>
  )
}
