"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { mockFaculties, mockBatches, mockSubjects, mockClassrooms, type Schedule } from "@/lib/mock-data"
import { TimetableGrid } from "@/components/timetable-grid"
import { autoGenerateSchedule } from "@/components/auto-generate"

export default function FacultyTimetablePage() {
  const [facultyId, setFacultyId] = useState<string>(mockFaculties[0]?.id || "")
  // Demo: generate schedule locally; in real app, this would be fetched per faculty or filtered server-side
  const schedule: Schedule = autoGenerateSchedule({
    batches: mockBatches,
    subjects: mockSubjects,
    faculties: mockFaculties,
    rooms: mockClassrooms,
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Timetable</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Select Faculty</label>
            <Select value={facultyId} onValueChange={setFacultyId}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose faculty" />
              </SelectTrigger>
              <SelectContent>
                {mockFaculties.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs text-muted-foreground">
              Cells for the selected faculty are highlighted in green.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly View</CardTitle>
        </CardHeader>
        <CardContent>
          <TimetableGrid schedule={schedule} readOnly highlightFacultyId={facultyId} />
        </CardContent>
      </Card>
    </div>
  )
}
