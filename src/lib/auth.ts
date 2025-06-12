import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/nextauth/route"
import { User } from "@/types/user"

export const auth = () => getServerSession(authOptions)

export const useAuth = () => {
  const session = auth()
  const user = session?.user as User

  return {
    user,
    isAuthenticated: !!user,
    isLoading: !user,
  }
}
