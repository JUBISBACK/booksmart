import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ by BookSmart Team
        </p>
        <p className="text-sm text-muted-foreground">
          Powered by OpenAI
        </p>
      </div>
    </footer>
  )
}
