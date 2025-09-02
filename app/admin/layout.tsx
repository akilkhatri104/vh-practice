import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="min-h-dvh flex bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <header className="mb-6 flex">
          <div className="mr-2">
            <SidebarTrigger />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-balance">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage batches, subjects, faculties and timetables.</p>
          </div>
        </header>
        {children}
      </main>
    </SidebarProvider>
  )
}
