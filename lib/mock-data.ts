export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri"
export const DAYS: Day[] = ["Mon", "Tue", "Wed", "Thu", "Fri"]
export const PERIODS = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00"] // 6 periods/day

export type ID = string

export type Batch = {
  id: ID
  name: string
  semester: number
  size: number
  subjectIds: ID[]
}

export type Subject = {
  id: ID
  code: string
  name: string
  classesPerWeek: number
  facultyId: ID
  isLab?: boolean
}

export type Faculty = {
  id: ID
  name: string
  department: string
  canTeachSubjectIds: ID[]
  avgMonthlyLeaves?: number
  maxDailyLoad?: number
}

export type Classroom = {
  id: ID
  building: string
  roomNo: string
}

export type Session = {
  id: ID
  batchId: ID
  subjectId: ID
  facultyId: ID
  // For reserved/demo entries we kept text 'room' as-is.
  room?: string
  // New: tie to a classroom when scheduled
  roomId?: ID
}

export type SlotKey = string
export type Schedule = Record<SlotKey, Session | undefined>

export const MAX_CLASSES_PER_DAY_PER_BATCH = 4

export const mockFaculties: Faculty[] = [
  {
    id: "f1",
    name: "Dr. Anjali Rao",
    department: "CSE",
    canTeachSubjectIds: ["s1", "s2"],
    avgMonthlyLeaves: 1,
    maxDailyLoad: 4,
  },
  {
    id: "f2",
    name: "Prof. R. Mehta",
    department: "CSE",
    canTeachSubjectIds: ["s3", "s4"],
    avgMonthlyLeaves: 2,
    maxDailyLoad: 3,
  },
  {
    id: "f3",
    name: "Dr. Kavita Iyer",
    department: "ECE",
    canTeachSubjectIds: ["s5"],
    avgMonthlyLeaves: 1,
    maxDailyLoad: 4,
  },
]

export const mockSubjects: Subject[] = [
  { id: "s1", code: "CS301", name: "Algorithms", classesPerWeek: 3, facultyId: "f1" },
  { id: "s2", code: "CS305", name: "Operating Systems", classesPerWeek: 3, facultyId: "f1" },
  { id: "s3", code: "CS309", name: "Databases", classesPerWeek: 2, facultyId: "f2" },
  { id: "s4", code: "CS401", name: "Distributed Systems", classesPerWeek: 2, facultyId: "f2" },
  { id: "s5", code: "EC210", name: "Signals & Systems", classesPerWeek: 3, facultyId: "f3" },
]

export const mockBatches: Batch[] = [
  { id: "b1", name: "CSE-3A", semester: 5, size: 60, subjectIds: ["s1", "s2", "s3"] },
  { id: "b2", name: "CSE-3B", semester: 5, size: 58, subjectIds: ["s1", "s2", "s4"] },
  { id: "b3", name: "ECE-2A", semester: 3, size: 55, subjectIds: ["s5"] },
]

export const mockClassrooms: Classroom[] = [
  { id: "r1", building: "A", roomNo: "101" },
  { id: "r2", building: "A", roomNo: "102" },
  { id: "r3", building: "D", roomNo: "201" },
]

// Fixed/Reserved special slots (e.g., weekly meeting)
export const fixedSpecialSlots: Record<SlotKey, Session> = {
  // Wed (index 2) at 11:00 (index 2)
  "2-2": {
    id: "reserved-1",
    batchId: "reserved",
    subjectId: "reserved",
    facultyId: "reserved",
    room: "Faculty Meeting",
  },
}

export const slotKey = (dayIndex: number, periodIndex: number): SlotKey => `${dayIndex}-${periodIndex}`

export const parseSlotKey = (key: SlotKey) => {
  const [d, p] = key.split("-").map(Number)
  return { dayIndex: d, periodIndex: p }
}

export const makeEmptySchedule = (): Schedule => {
  const schedule: Schedule = {}
  for (let d = 0; d < DAYS.length; d++) {
    for (let p = 0; p < PERIODS.length; p++) {
      schedule[slotKey(d, p)] = undefined
    }
  }
  for (const k of Object.keys(fixedSpecialSlots)) schedule[k] = fixedSpecialSlots[k]
  return schedule
}

export const getSubject = (id: ID) => mockSubjects.find((s) => s.id === id)
export const getBatch = (id: ID) => mockBatches.find((b) => b.id === id)
export const getFaculty = (id: ID) => mockFaculties.find((f) => f.id === id)
export const getRoom = (id: ID) => mockClassrooms.find((r) => r.id === id)

export function sessionsForBatch(batch: Batch): Session[] {
  const list: Session[] = []
  batch.subjectIds.forEach((sid) => {
    const subj = getSubject(sid)
    if (!subj) return
    for (let i = 0; i < subj.classesPerWeek; i++) {
      list.push({
        id: `${batch.id}-${sid}-${i + 1}`,
        batchId: batch.id,
        subjectId: sid,
        facultyId: subj.facultyId,
      })
    }
  })
  return list
}

export function allSessions(): Session[] {
  return mockBatches.flatMap(sessionsForBatch)
}
