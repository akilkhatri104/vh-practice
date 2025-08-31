"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockBatches, mockSubjects, mockFaculties } from "@/lib/mock-data"

export default function AdminOverviewPage() {
  const stats = [
    { label: "Batches", value: mockBatches.length },
    { label: "Subjects", value: mockSubjects.length },
    { label: "Faculties", value: mockFaculties.length },
  ]
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{s.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold text-blue-700">{s.value}</div>
          </CardContent>
        </Card>
      ))}
      <Card className="sm:col-span-3">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Use the sidebar to manage Batches, Subjects, Faculties, and create a Timetable manually or via Auto-Generate.
        </CardContent>
      </Card>
    </div>
  )
}
