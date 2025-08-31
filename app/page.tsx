import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-8">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-3xl font-semibold text-balance">Smart Classroom & Timetable Scheduler</h1>
        <p className="text-muted-foreground">
          Explore the Admin dashboard to manage data and create timetables, or view the Faculty dashboard to see
          assigned classes.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/admin">Go to Admin</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/faculty">Go to Faculty</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
