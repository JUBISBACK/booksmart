import { Toaster } from "@/components/ui/toaster"

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  return (
    <Toaster />
    {children}
  )
}
