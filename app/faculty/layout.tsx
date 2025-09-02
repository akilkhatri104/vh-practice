import type React from "react"
import { FacultySidebar } from "@/components/faculty-sidebar"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="min-h-dvh flex bg-gray-50">
      <FacultySidebar />
      <main className="flex-1 p-6">
        <header className="mb-6 flex">
          <div className="mr-2">
            <SidebarTrigger />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Faculty Dashboard</h1>
            <p className="text-sm text-muted-foreground">View your timetable and upcoming classes.</p>
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}



