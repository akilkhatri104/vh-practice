"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const nav = [{ href: "/faculty", label: "My Timetable" }]

export function FacultySidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-60 shrink-0 border-r bg-white">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-balance">Faculty</h2>
        <p className="text-sm text-muted-foreground">Smart Scheduler</p>
      </div>
      <nav className="flex flex-col gap-1 p-2">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm hover:bg-blue-50 hover:text-blue-700",
              pathname === item.href ? "bg-blue-100 text-blue-800 font-medium" : "text-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
