"use client"

import type React from "react"
import { type Session, getBatch, getSubject, getFaculty } from "@/lib/mock-data"

type Props = {
  sessions: Session[]
  selectedBatchId?: string
}

export function TimetablePalette({ sessions, selectedBatchId }: Props) {
  const onDragStart = (e: React.DragEvent, sess: Session) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ type: "new", session: sess }))
    e.dataTransfer.effectAllowed = "copy"
  }

  // Filter sessions based on selected batch if provided
  const filteredSessions = selectedBatchId 
    ? sessions.filter(s => s.batchId === selectedBatchId)
    : sessions

  if (selectedBatchId && filteredSessions.length === 0) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Unscheduled Sessions</h3>
        <div className="text-sm text-muted-foreground p-4 text-center border-2 border-dashed rounded-md">
          All sessions for this batch are scheduled
        </div>
      </div>
    )
  }

  if (!selectedBatchId) {
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Unscheduled Sessions</h3>
        <div className="text-sm text-muted-foreground p-4 text-center border-2 border-dashed rounded-md">
          Select a batch to view sessions
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Unscheduled Sessions ({filteredSessions.length})
      </h3>
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {filteredSessions.map((s) => {
          const b = getBatch(s.batchId)
          const subj = getSubject(s.subjectId)
          const f = getFaculty(s.facultyId)
          return (
            <div
              key={s.id}
              draggable
              onDragStart={(e) => onDragStart(e, s)}
              className="rounded-md border bg-white p-3 text-sm shadow-sm hover:bg-blue-50 cursor-grab active:cursor-grabbing transition-colors"
              aria-label={`Drag ${subj?.name} for ${b?.name}`}
            >
              <div className="font-medium text-blue-700">{subj?.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {b?.name} • {f?.name}
              </div>
              <div className="text-xs text-green-600 mt-1">
                {subj?.classesPerWeek} classes/week {subj?.isLab ? '• Lab' : ''}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}