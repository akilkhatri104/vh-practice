import type React from "react"
import { FacultySidebar } from "@/components/faculty-sidebar"

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex bg-gray-50">
      <FacultySidebar />
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Faculty Dashboard</h1>
          <p className="text-sm text-muted-foreground">View your timetable and upcoming classes.</p>
        </header>
        {children}
      </main>
    </div>
  )
}
