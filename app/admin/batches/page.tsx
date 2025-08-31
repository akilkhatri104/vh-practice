"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Batch } from "@/lib/mock-data"
import { mockBatches } from "@/lib/mock-data"
import { Label } from "@/components/ui/label"

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>(mockBatches)
  const [form, setForm] = useState({ name: "", semester: 1, size: 60 })

  const addBatch = () => {
    if (!form.name.trim()) return
    const id = `b${Math.random().toString(36).slice(2, 7)}`
    setBatches((prev) => [...prev, { id, name: form.name, semester: form.semester, size: form.size, subjectIds: [] }])
    setForm({ name: "", semester: 1, size: 60 })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Create Batch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="batchName" >Batch Name</Label>
          <Input
            placeholder="Batch name e.g., CSE-3C"
            value={form.name}
            id="batchName"
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Label htmlFor="sem">Semester</Label>
          <Input
            type="number"
            id="sem"
            placeholder="Semester"
            value={form.semester}
            onChange={(e) => setForm((f) => ({ ...f, semester: Number(e.target.value) }))}
          />
          <Label htmlFor="students">Students</Label>
          <Input
            type="number"
            id="students"
            placeholder="Size"
            value={form.size}
            onChange={(e) => setForm((f) => ({ ...f, size: Number(e.target.value) }))}
          />
          <Button onClick={addBatch} className="bg-blue-600 hover:bg-blue-700">
            Add Batch
          </Button>
          <p className="text-xs text-muted-foreground">Mock-only; no persistence.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Batches</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {batches.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded border bg-white p-2">
              <div>
                <div className="font-medium">{b.name}</div>
                <div className="text-xs text-muted-foreground">
                  Sem {b.semester} • {b.size} students
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
