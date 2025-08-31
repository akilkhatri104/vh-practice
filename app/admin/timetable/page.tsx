"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  allSessions,
  makeEmptySchedule,
  type Schedule,
  type SlotKey,
  mockBatches,
  mockSubjects,
  mockFaculties,
  mockClassrooms,
} from "@/lib/mock-data"
import { TimetablePalette } from "@/components/timetable-palette"
import { TimetableGrid } from "@/components/timetable-grid"
import { autoGenerateSchedule } from "@/components/auto-generate"

export default function TimetableCreatorPage() {
  const initialUnscheduled = useMemo(() => allSessions(), [])
  const [unscheduled, setUnscheduled] = useState(initialUnscheduled)
  const [schedule, setSchedule] = useState<Schedule>(makeEmptySchedule())

  const pickRoomId = () => {
    return mockClassrooms[0]?.id // simple default; could be improved to pick by availability
  }

  const placeFromPalette = (slot: SlotKey, payload: { type: "new" | "move"; session: any; from?: SlotKey }) => {
    const current = schedule[slot]
    if (current && !current.id.startsWith("reserved")) return
    const sess = payload.session
    if (payload.type === "new") {
      const withRoom = { ...sess, roomId: pickRoomId() }
      setUnscheduled((prev) => prev.filter((s) => s.id !== sess.id))
      setSchedule((prev) => ({ ...prev, [slot]: withRoom }))
    } else if (payload.type === "move" && payload.from) {
      const from = payload.from
      const fromSess = schedule[from]
      if (!fromSess) return
      const next = { ...schedule }
      next[from] = undefined
      next[slot] = fromSess
      setSchedule(next)
    }
  }

  const clearSlot = (slot: SlotKey) => {
    const sess = schedule[slot]
    if (!sess || sess.id.startsWith("reserved")) return
    setUnscheduled((prev) => [sess, ...prev])
    setSchedule((prev) => ({ ...prev, [slot]: undefined }))
  }

  const autoFill = () => {
    const auto = autoGenerateSchedule({
      batches: mockBatches,
      subjects: mockSubjects,
      faculties: mockFaculties,
      rooms: mockClassrooms,
    })
    const placedIds = Object.values(auto)
      .filter(Boolean)
      .map((s) => s!.id)
    setUnscheduled((prev) => prev.filter((s) => !placedIds.includes(s.id)))
    setSchedule(auto)
  }

  const reset = () => {
    setUnscheduled(initialUnscheduled)
    setSchedule(makeEmptySchedule())
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button onClick={autoFill} className="bg-green-600 hover:bg-green-700">
              Auto-Generate
            </Button>
            <Button onClick={reset} variant="secondary">
              Reset
            </Button>
            <p className="text-xs text-muted-foreground">
              Drag sessions from the palette to the grid. Move between cells or clear to return to palette.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sessions Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <TimetablePalette sessions={unscheduled} />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Timetable</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardContent>
            <TimetableGrid schedule={schedule} onPlace={placeFromPalette} onClear={clearSlot} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
