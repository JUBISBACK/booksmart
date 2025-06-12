import { SessionProvider } from "next-auth/react"
import { auth } from "@/lib/auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
