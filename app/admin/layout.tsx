import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-balance">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage batches, subjects, faculties and timetables.</p>
        </header>
        {children}
      </main>
    </div>
  )
}
