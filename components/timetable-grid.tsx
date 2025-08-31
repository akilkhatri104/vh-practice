"use client"

import type React from "react"

import { DAYS, PERIODS, type Schedule, type SlotKey, getBatch, getSubject, getFaculty, getRoom } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

type Props = {
  schedule: Schedule
  onPlace?: (slot: SlotKey, payload: { type: "new" | "move"; session: any; from?: SlotKey }) => void
  onClear?: (slot: SlotKey) => void
  readOnly?: boolean
  highlightFacultyId?: string
}

export function TimetableGrid({ schedule, onPlace, onClear, readOnly, highlightFacultyId }: Props) {
  const allowDrop = (e: React.DragEvent) => {
    if (readOnly) return
    e.preventDefault()
  }

  const onDrop = (e: React.DragEvent, slot: SlotKey) => {
    if (readOnly || !onPlace) return
    e.preventDefault()
    try {
      const payload = JSON.parse(e.dataTransfer.getData("application/json"))
      onPlace(slot, payload)
    } catch {
      // ignore
    }
  }

  const onDragStartCell = (e: React.DragEvent, slot: SlotKey) => {
    const sess = schedule[slot]
    if (!sess || readOnly) return
    e.dataTransfer.setData("application/json", JSON.stringify({ type: "move", session: sess, from: slot }))
    e.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="w-full overflow-auto rounded-md border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-24 p-2 text-left text-xs font-medium text-muted-foreground">Time</th>
            {DAYS.map((d) => (
              <th key={d} className="p-2 text-left text-xs font-medium text-muted-foreground">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERIODS.map((time, pIdx) => (
            <tr key={time} className="border-t">
              <td className="p-2 text-xs font-medium text-muted-foreground">{time}</td>
              {DAYS.map((_, dIdx) => {
                const slot: SlotKey = `${dIdx}-${pIdx}`
                const sess = schedule[slot]
                const isReserved = sess && sess.id.startsWith("reserved")
                const subj = sess ? getSubject(sess.subjectId) : undefined
                const batch = sess ? getBatch(sess.batchId) : undefined
                const faculty = sess ? getFaculty(sess.facultyId) : undefined
                const isHighlight = highlightFacultyId && faculty?.id === highlightFacultyId
                return (
                  <td
                    key={slot}
                    onDragOver={allowDrop}
                    onDrop={(e) => onDrop(e, slot)}
                    className={`min-w-48 align-top p-2 ${isHighlight ? "bg-green-50" : ""}`}
                  >
                    <div
                      draggable={Boolean(sess && !isReserved && !readOnly)}
                      onDragStart={(e) => onDragStartCell(e, slot)}
                      className={`min-h-16 rounded border p-2 ${sess ? (isReserved ? "bg-gray-100 border-dashed" : "bg-blue-50 border-blue-200") : "bg-white border-dashed"}`}
                    >
                      {!sess && !readOnly && <div className="text-xs text-muted-foreground">Drop here</div>}

                      {sess && isReserved && <div className="text-xs text-muted-foreground">Reserved slot</div>}

                      {sess && !isReserved && (
                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-blue-800">{subj?.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {batch?.name} • {faculty?.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {sess.roomId
                              ? (() => {
                                  const r = getRoom(sess.roomId)
                                  return r ? `Room ${r.building}-${r.roomNo}` : "Room —"
                                })()
                              : sess.room
                                ? sess.room
                                : "Room —"}
                          </div>
                          {!readOnly && onClear && (
                            <div className="pt-1">
                              <Button size="sm" variant="secondary" onClick={() => onClear(slot)}>
                                Clear
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
