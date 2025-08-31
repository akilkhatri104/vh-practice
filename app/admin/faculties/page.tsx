"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Faculty } from "@/lib/mock-data"
import { mockFaculties } from "@/lib/mock-data"
import { Label } from "@/components/ui/label"

export default function FacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>(mockFaculties)
  const [form, setForm] = useState({ name: "", department: "CSE" })

  const addFaculty = () => {
    if (!form.name.trim()) return
    const id = `f${Math.random().toString(36).slice(2, 7)}`
    setFaculties((prev) => [
      ...prev,
      {
        id,
        name: form.name,
        department: form.department,
        canTeachSubjectIds: [],
        avgMonthlyLeaves: 1,
        maxDailyLoad: 4,
      },
    ])
    setForm({ name: "", department: "CSE" })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Faculty</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="facultyName">Faculty Name</Label>
          <Input
            placeholder="Name e.g., Dr. Sharma"
            value={form.name}
            id="facultyName"
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Label htmlFor="department">Department</Label>
          <Input
            placeholder="Department e.g., CSE"
            value={form.department}
            id="department"
            onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
          />
          <Button onClick={addFaculty} className="bg-blue-600 hover:bg-blue-700">
            Add Faculty
          </Button>
          <p className="text-xs text-muted-foreground">Mock-only; no persistence.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Faculties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {faculties.map((f) => (
            <div key={f.id} className="flex items-center justify-between rounded border bg-white p-2">
              <div>
                <div className="font-medium">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.department}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
