"use client"

import { useState, useEffect } from "react"
import { BatchSelector } from "@/components/batch-selector"
import { TimetablePalette } from "@/components/timetable-palette"
import { TimetableGrid } from "@/components/timetable-grid"
import {
  makeEmptySchedule,
  sessionsForBatch,
  getBatch,
  type Session,
  type Schedule,
  type SlotKey,
  mockSessions
} from "@/lib/mock-data"
import { Button } from "@/components/ui/button"

export default function AdminTimetablePage() {
  const [selectedBatchId, setSelectedBatchId] = useState<string>("")
  const [schedule, setSchedule] = useState<Schedule>(() => makeEmptySchedule())
  const [batchSessions, setBatchSessions] = useState<Session[]>([])

  // Update sessions when batch selection changes
  useEffect(() => {
    if (selectedBatchId) {
      const batch = getBatch(selectedBatchId)
      if (batch) {
        const sessions = sessionsForBatch(batch)
        setBatchSessions(sessions)
        
        // Reset schedule to empty state when batch changes
        setSchedule(makeEmptySchedule())
      }
    } else {
      setBatchSessions([])
      setSchedule(makeEmptySchedule())
    }
  }, [selectedBatchId])

  // Get unscheduled sessions (sessions not currently placed in the timetable)
  const unscheduledSessions = batchSessions.filter(session =>
    !Object.values(schedule).some(scheduledSession => 
      scheduledSession?.id === session.id
    )
  )

  const handlePlace = (slot: SlotKey, payload: { type: "new" | "move"; session: Session; from?: SlotKey }) => {
    const { type, session, from } = payload
    
    setSchedule(prev => {
      const newSchedule = { ...prev }
      
      // If it's a move operation, clear the original slot
      if (type === "move" && from) {
        newSchedule[from] = undefined
      }
      
      // Place the session in the new slot
      newSchedule[slot] = session
      
      return newSchedule
    })
  }

  const handleClear = (slot: SlotKey) => {
    setSchedule(prev => ({
      ...prev,
      [slot]: undefined
    }))
  }

  const handleAutoSchedule = () => {
    if (!selectedBatchId) return
    
    const newSchedule = makeEmptySchedule()
    const sessionsToSchedule = [...batchSessions]
    
    // Simple auto-scheduling algorithm
    let sessionIndex = 0
    for (let day = 0; day < 5 && sessionIndex < sessionsToSchedule.length; day++) {
      for (let period = 0; period < 6 && sessionIndex < sessionsToSchedule.length; period++) {
        const slot = `${day}-${period}`
        
        // Skip reserved slots
        if (newSchedule[slot]) continue
        
        // Place session
        newSchedule[slot] = sessionsToSchedule[sessionIndex]
        sessionIndex++
      }
    }
    
    setSchedule(newSchedule)
  }

  const handleClearAll = () => {
    setSchedule(makeEmptySchedule())
  }

  const selectedBatch = selectedBatchId ? getBatch(selectedBatchId) : null

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Timetable Management</h1>
          <p className="text-muted-foreground">
            Create and manage class schedules for different batches
          </p>
        </div>
      </div>

      {/* Batch Selection */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Select Batch:</span>
          <BatchSelector
            selectedBatchId={selectedBatchId}
            onBatchSelect={setSelectedBatchId}
          />
        </div>
        
        {selectedBatch && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Semester: {selectedBatch.semester}</span>
            <span>Students: {selectedBatch.size}</span>
            <span>Subjects: {selectedBatch.subjectIds.length}</span>
          </div>
        )}
      </div>

      {selectedBatchId && (
        <>
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button onClick={handleAutoSchedule} variant="default">
              Auto Schedule
            </Button>
            <Button onClick={handleClearAll} variant="outline">
              Clear All
            </Button>
            <div className="ml-auto text-sm text-muted-foreground">
              Scheduled: {batchSessions.length - unscheduledSessions.length}/{batchSessions.length} sessions
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-[280px_1fr] gap-6">
            {/* Palette */}
            <div className="space-y-4">
              <TimetablePalette
                sessions={unscheduledSessions}
                selectedBatchId={selectedBatchId}
              />
              
              {/* Batch Info */}
              {selectedBatch && (
                <div className="p-3 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-900 mb-2">{selectedBatch.name}</h4>
                  <div className="space-y-1 text-xs text-blue-700">
                    <div>Semester: {selectedBatch.semester}</div>
                    <div>Students: {selectedBatch.size}</div>
                    <div>Total Sessions: {batchSessions.length}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Grid */}
            <div className="min-h-0">
              <TimetableGrid
                schedule={schedule}
                onPlace={handlePlace}
                onClear={handleClear}
                readOnly={false}
              />
            </div>
          </div>
        </>
      )}

      {!selectedBatchId && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">
            <div className="text-lg mb-2">No batch selected</div>
            <div>Please select a batch to start creating the timetable</div>
          </div>
        </div>
      )}
    </div>
  )
}