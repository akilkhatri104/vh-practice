"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Classroom } from "@/lib/mock-data"
import { mockClassrooms } from "@/lib/mock-data"
import { Label } from "@/components/ui/label"

export default function ClassroomsPage() {
  const [rooms, setRooms] = useState<Classroom[]>(mockClassrooms)
  const [form, setForm] = useState({ building: "A", roomNo: "" })

  const addRoom = () => {
    if (!form.building.trim() || !form.roomNo.trim()) return
    const id = `r${Math.random().toString(36).slice(2, 7)}`
    setRooms((prev) => [...prev, { id, building: form.building.toUpperCase(), roomNo: form.roomNo }])
    setForm({ building: "A", roomNo: "" })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Classrooms</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Classroom</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="building">Building</Label>
            <Input
              placeholder="Building e.g., A"
              value={form.building}
              id="building"
              onChange={(e) => setForm((f) => ({ ...f, building: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="roomNo">Room No.</Label>
            <Input
              placeholder="Room No e.g., 101"
              value={form.roomNo}
              id="roomNo"
              onChange={(e) => setForm((f) => ({ ...f, roomNo: e.target.value }))}
            />
          </div>
          <div className="flex items-center">
            <Button onClick={addRoom} className="bg-blue-600 hover:bg-blue-700">
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground md:col-span-4">Mock-only; no persistence.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Classrooms</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border rounded-md">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-left text-xs">Building</th>
                <th className="p-2 text-left text-xs">Room No</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2 text-sm">{r.building}</td>
                  <td className="p-2 text-sm">{r.roomNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
