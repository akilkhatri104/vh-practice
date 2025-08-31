"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockSubjects, mockFaculties, type Subject } from "@/lib/mock-data"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects)
  const [form, setForm] = useState({ code: "", name: "", classesPerWeek: 2, facultyId:  "" })

  const addSubject = () => {
    if (!form.code.trim() || !form.name.trim() || !form.facultyId) return
    const id = `s${Math.random().toString(36).slice(2, 7)}`
    setSubjects((prev) => [
      ...prev,
      { id, code: form.code, name: form.name, classesPerWeek: form.classesPerWeek, facultyId: form.facultyId },
    ])
    setForm({ code: "", name: "", classesPerWeek: 2, facultyId: mockFaculties[0]?.id || "" })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Subject</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="subjectCode">Subject Code</Label>
          <Input
            placeholder="Code e.g., CS350"
            value={form.code}
            id="subjectCode"
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
          />
          <Label htmlFor="subjectName">Subject Name</Label>
          <Input
            placeholder="Name e.g., Machine Learning"
            value={form.name}
            id="subjectName"
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Label htmlFor="classPerWeek">Classes per Week</Label>
          <Input
            type="number"
            id="classPerWeek"
            placeholder="Classes per week"
            value={form.classesPerWeek}
            onChange={(e) => setForm((f) => ({ ...f, classesPerWeek: Number(e.target.value) }))}
          />
          
          <Select value={form.facultyId} onValueChange={(val) => setForm((f) => ({ ...f, facultyId: val }))}>
            <SelectTrigger>
              <SelectValue placeholder="Assign Faculty" />
            </SelectTrigger>
            <SelectContent>
              {mockFaculties.map((f) => (
                <SelectItem value={f.id} key={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={addSubject} className="bg-blue-600 hover:bg-blue-700">
            Add Subject
          </Button>
          <p className="text-xs text-muted-foreground">Mock-only; no persistence.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Subjects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {subjects.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded border bg-white p-2">
              <div>
                <div className="font-medium">
                  {s.code} — {s.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {s.classesPerWeek} classes/week • Faculty: {mockFaculties.find((f) => f.id === s.facultyId)?.name}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
