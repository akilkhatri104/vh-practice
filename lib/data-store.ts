"use client"

export type ID = string

export type Batch = {
  id: ID
  name: string // e.g., "CSE 3A"
  year: number
  section?: string
}

export type Subject = {
  id: ID
  code: string
  name: string
  weeklyHours: number // how many sessions per week to schedule
}

export type Faculty = {
  id: ID
  name: string
  subjectIds: ID[] // subjects they can teach
}

export type Classroom = {
  id: ID
  building: string // e.g., "A"
  roomNo: string // e.g., "101"
}

export type Assignment = {
  id: ID
  day: number // 0..4
  period: number // 0..5
  batchId: ID
  subjectId: ID
  facultyId: ID
  roomId: ID
}

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
export const PERIODS = ["9:00", "10:00", "11:00", "12:00", "2:00", "3:00"]

// Mock Data
const initialBatches: Batch[] = [
  { id: "b1", name: "CSE 3A", year: 3, section: "A" },
  { id: "b2", name: "CSE 3B", year: 3, section: "B" },
]
const initialSubjects: Subject[] = [
  { id: "s1", code: "MAT301", name: "Discrete Math", weeklyHours: 2 },
  { id: "s2", code: "CSE321", name: "Operating Systems", weeklyHours: 3 },
  { id: "s3", code: "CSE341", name: "Database Systems", weeklyHours: 3 },
]
const initialFaculties: Faculty[] = [
  { id: "f1", name: "Dr. Rao", subjectIds: ["s1", "s2"] },
  { id: "f2", name: "Prof. Kim", subjectIds: ["s2", "s3"] },
  { id: "f3", name: "Dr. Singh", subjectIds: ["s1", "s3"] },
]
const initialRooms: Classroom[] = [
  { id: "r1", building: "A", roomNo: "101" },
  { id: "r2", building: "A", roomNo: "102" },
  { id: "r3", building: "D", roomNo: "201" },
]

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`
}

type Listener = () => void

// Store with simple pub/sub so Faculty page updates when Admin schedules
class SchedulerStore {
  batches: Batch[] = [...initialBatches]
  subjects: Subject[] = [...initialSubjects]
  faculties: Faculty[] = [...initialFaculties]
  rooms: Classroom[] = [...initialRooms]
  assignments: Assignment[] = []
  private listeners = new Set<Listener>()

  subscribe(fn: Listener) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
  notify() {
    for (const l of this.listeners) l()
  }

  // CRUD helpers
  addBatch(input: Omit<Batch, "id">) {
    this.batches.push({ id: uid("b"), ...input })
    this.notify()
  }
  addSubject(input: Omit<Subject, "id">) {
    this.subjects.push({ id: uid("s"), ...input })
    this.notify()
  }
  addFaculty(input: Omit<Faculty, "id">) {
    this.faculties.push({ id: uid("f"), ...input })
    this.notify()
  }
  addRoom(input: Omit<Classroom, "id">) {
    this.rooms.push({ id: uid("r"), ...input })
    this.notify()
  }

  clearBatchAssignments(batchId: ID) {
    this.assignments = this.assignments.filter((a) => a.batchId !== batchId)
    this.notify()
  }

  // Conflict checks
  hasBatchConflict(day: number, period: number, batchId: ID) {
    return this.assignments.some((a) => a.day === day && a.period === period && a.batchId === batchId)
  }
  hasFacultyConflict(day: number, period: number, facultyId: ID) {
    return this.assignments.some((a) => a.day === day && a.period === period && a.facultyId === facultyId)
  }
  hasRoomConflict(day: number, period: number, roomId: ID) {
    return this.assignments.some((a) => a.day === day && a.period === period && a.roomId === roomId)
  }

  canPlace(day: number, period: number, batchId: ID, facultyId: ID, roomId: ID) {
    if (this.hasBatchConflict(day, period, batchId)) return false
    if (this.hasFacultyConflict(day, period, facultyId)) return false
    if (this.hasRoomConflict(day, period, roomId)) return false
    return true
  }

  upsertAssignment(
    day: number,
    period: number,
    batchId: ID,
    subjectId: ID,
    facultyId: ID,
    roomId: ID,
  ): { ok: true } | { ok: false; reason: string } {
    // Prevent conflicts across batch/faculty/room
    if (!this.canPlace(day, period, batchId, facultyId, roomId)) {
      return { ok: false, reason: "Conflict: batch/faculty/room already scheduled in this slot." }
    }
    // Remove existing assignment for batch at this slot (if any)
    this.assignments = this.assignments.filter((a) => !(a.day === day && a.period === period && a.batchId === batchId))
    this.assignments.push({
      id: uid("a"),
      day,
      period,
      batchId,
      subjectId,
      facultyId,
      roomId,
    })
    this.notify()
    return { ok: true }
  }

  clearCell(day: number, period: number, batchId: ID) {
    const before = this.assignments.length
    this.assignments = this.assignments.filter((a) => !(a.day === day && a.period === period && a.batchId === batchId))
    if (this.assignments.length !== before) this.notify()
  }
}

export const schedulerStore = new SchedulerStore()

// Selectors
export function getSubjectById(id: ID) {
  return schedulerStore.subjects.find((s) => s.id === id)
}
export function getFacultyById(id: ID) {
  return schedulerStore.faculties.find((f) => f.id === id)
}
export function getBatchById(id: ID) {
  return schedulerStore.batches.find((b) => b.id === id)
}
export function getRoomById(id: ID) {
  return schedulerStore.rooms.find((r) => r.id === id)
}
