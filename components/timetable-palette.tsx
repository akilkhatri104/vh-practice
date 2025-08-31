"use client"

import type React from "react"

import { type Session, getBatch, getSubject, getFaculty } from "@/lib/mock-data"

type Props = {
  sessions: Session[]
}

export function TimetablePalette({ sessions }: Props) {
  const onDragStart = (e: React.DragEvent, sess: Session) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ type: "new", session: sess }))
    e.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Unscheduled</h3>
      <div className="grid grid-cols-1 gap-2">
        {sessions.map((s) => {
          const b = getBatch(s.batchId)
          const subj = getSubject(s.subjectId)
          const f = getFaculty(s.facultyId)
          return (
            <div
              key={s.id}
              draggable
              onDragStart={(e) => onDragStart(e, s)}
              className="rounded-md border bg-white p-2 text-sm shadow-sm hover:bg-blue-50 cursor-grab active:cursor-grabbing"
              aria-label={`Drag ${subj?.name} for ${b?.name}`}
            >
              <div className="font-medium text-blue-700">{subj?.name}</div>
              <div className="text-xs text-muted-foreground">
                {b?.name} • {f?.name}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
