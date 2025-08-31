import {
  type Batch,
  type Faculty,
  type Subject,
  type Classroom,
  type Schedule,
  DAYS,
  PERIODS,
  slotKey,
  MAX_CLASSES_PER_DAY_PER_BATCH,
  fixedSpecialSlots,
} from "@/lib/mock-data"

type Input = {
  batches: Batch[]
  subjects: Subject[]
  faculties: Faculty[]
  rooms: Classroom[]
}

function isReserved(k: string) {
  return Boolean(fixedSpecialSlots[k])
}

export function autoGenerateSchedule({ batches, subjects, rooms }: Input): Schedule {
  const schedule: Schedule = {}
  for (let d = 0; d < DAYS.length; d++) {
    for (let p = 0; p < PERIODS.length; p++) {
      schedule[slotKey(d, p)] = undefined
    }
  }
  for (const k of Object.keys(fixedSpecialSlots)) schedule[k] = fixedSpecialSlots[k]

  const batchDailyCount: Record<string, Record<number, number>> = {}
  batches.forEach((b) => (batchDailyCount[b.id] = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 }))

  type Task = { batchId: string; subjectId: string; facultyId: string; remaining: number }
  const tasks: Task[] = []
  for (const b of batches) {
    for (const sid of b.subjectIds) {
      const subj = subjects.find((s) => s.id === sid)
      if (!subj) continue
      tasks.push({
        batchId: b.id,
        subjectId: sid,
        facultyId: subj.facultyId,
        remaining: subj.classesPerWeek,
      })
    }
  }

  let placed = true
  while (placed) {
    placed = false
    for (const t of tasks) {
      if (t.remaining <= 0) continue
      outer: for (let d = 0; d < DAYS.length; d++) {
        if (batchDailyCount[t.batchId][d] >= MAX_CLASSES_PER_DAY_PER_BATCH) continue
        for (let p = 0; p < PERIODS.length; p++) {
          const k = slotKey(d, p)
          if (isReserved(k) || schedule[k]) continue
          // Assign a room (simple round-robin). Since schedule[k] holds a single session,
          // room double-booking and faculty double-booking are naturally avoided.
          const room = rooms.length ? rooms[(d + p) % rooms.length] : undefined
          schedule[k] = {
            id: `${t.batchId}-${t.subjectId}-auto-${t.remaining}`,
            batchId: t.batchId,
            subjectId: t.subjectId,
            facultyId: t.facultyId,
            roomId: room?.id,
          }
          batchDailyCount[t.batchId][d] += 1
          t.remaining -= 1
          placed = true
          break outer
        }
      }
    }
  }
  return schedule
}
