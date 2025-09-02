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
  capacity?: number
  hasProjector?: boolean
  isLab?: boolean
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

// Expanded Faculty Data
export const mockFaculties: Faculty[] = [
  {
    id: "f1",
    name: "Dr. Anjali Rao",
    department: "CSE",
    canTeachSubjectIds: ["s1", "s2", "s15"],
    avgMonthlyLeaves: 1,
    maxDailyLoad: 4,
  },
  {
    id: "f2",
    name: "Prof. R. Mehta",
    department: "CSE",
    canTeachSubjectIds: ["s3", "s4", "s16"],
    avgMonthlyLeaves: 2,
    maxDailyLoad: 3,
  },
  {
    id: "f3",
    name: "Dr. Kavita Iyer",
    department: "ECE",
    canTeachSubjectIds: ["s5", "s6", "s7"],
    avgMonthlyLeaves: 1,
    maxDailyLoad: 4,
  },
  {
    id: "f4",
    name: "Prof. Suresh Kumar",
    department: "CSE",
    canTeachSubjectIds: ["s8", "s9", "s17"],
    avgMonthlyLeaves: 1.5,
    maxDailyLoad: 4,
  },
  {
    id: "f5",
    name: "Dr. Priya Sharma",
    department: "IT",
    canTeachSubjectIds: ["s10", "s11", "s18"],
    avgMonthlyLeaves: 2,
    maxDailyLoad: 3,
  },
  {
    id: "f6",
    name: "Prof. Amit Singh",
    department: "ECE",
    canTeachSubjectIds: ["s12", "s13", "s19"],
    avgMonthlyLeaves: 1,
    maxDailyLoad: 4,
  },
  {
    id: "f7",
    name: "Dr. Neha Gupta",
    department: "IT",
    canTeachSubjectIds: ["s14", "s20", "s21"],
    avgMonthlyLeaves: 1.5,
    maxDailyLoad: 4,
  },
  {
    id: "f8",
    name: "Prof. Rajesh Patel",
    department: "CSE",
    canTeachSubjectIds: ["s22", "s23"],
    avgMonthlyLeaves: 2,
    maxDailyLoad: 3,
  },
  {
    id: "f9",
    name: "Dr. Meera Joshi",
    department: "ECE",
    canTeachSubjectIds: ["s24", "s25"],
    avgMonthlyLeaves: 1,
    maxDailyLoad: 4,
  },
  {
    id: "f10",
    name: "Prof. Vikram Reddy",
    department: "IT",
    canTeachSubjectIds: ["s26", "s27"],
    avgMonthlyLeaves: 1.5,
    maxDailyLoad: 3,
  },
]

// Expanded Subject Data
export const mockSubjects: Subject[] = [
  // CSE Subjects
  { id: "s1", code: "CS301", name: "Algorithms", classesPerWeek: 3, facultyId: "f1" },
  { id: "s2", code: "CS305", name: "Operating Systems", classesPerWeek: 3, facultyId: "f1" },
  { id: "s3", code: "CS309", name: "Databases", classesPerWeek: 2, facultyId: "f2" },
  { id: "s4", code: "CS401", name: "Distributed Systems", classesPerWeek: 2, facultyId: "f2" },
  { id: "s8", code: "CS302", name: "Software Engineering", classesPerWeek: 3, facultyId: "f4" },
  { id: "s9", code: "CS306", name: "Computer Networks", classesPerWeek: 2, facultyId: "f4" },
  { id: "s15", code: "CS303", name: "Data Structures Lab", classesPerWeek: 2, facultyId: "f1", isLab: true },
  { id: "s16", code: "CS310", name: "Database Lab", classesPerWeek: 2, facultyId: "f2", isLab: true },
  { id: "s17", code: "CS307", name: "Networks Lab", classesPerWeek: 2, facultyId: "f4", isLab: true },
  { id: "s22", code: "CS501", name: "Machine Learning", classesPerWeek: 3, facultyId: "f8" },
  { id: "s23", code: "CS502", name: "Artificial Intelligence", classesPerWeek: 2, facultyId: "f8" },

  // ECE Subjects
  { id: "s5", code: "EC210", name: "Signals & Systems", classesPerWeek: 3, facultyId: "f3" },
  { id: "s6", code: "EC301", name: "Digital Communications", classesPerWeek: 3, facultyId: "f3" },
  { id: "s7", code: "EC302", name: "Microprocessors", classesPerWeek: 2, facultyId: "f3" },
  { id: "s12", code: "EC401", name: "VLSI Design", classesPerWeek: 3, facultyId: "f6" },
  { id: "s13", code: "EC402", name: "Embedded Systems", classesPerWeek: 2, facultyId: "f6" },
  { id: "s19", code: "EC303", name: "Digital Lab", classesPerWeek: 2, facultyId: "f6", isLab: true },
  { id: "s24", code: "EC501", name: "Wireless Communications", classesPerWeek: 3, facultyId: "f9" },
  { id: "s25", code: "EC502", name: "Antenna Theory", classesPerWeek: 2, facultyId: "f9" },

  // IT Subjects
  { id: "s10", code: "IT301", name: "Web Technologies", classesPerWeek: 3, facultyId: "f5" },
  { id: "s11", code: "IT302", name: "Information Security", classesPerWeek: 2, facultyId: "f5" },
  { id: "s14", code: "IT401", name: "Cloud Computing", classesPerWeek: 3, facultyId: "f7" },
  { id: "s18", code: "IT303", name: "Web Lab", classesPerWeek: 2, facultyId: "f5", isLab: true },
  { id: "s20", code: "IT402", name: "Mobile App Development", classesPerWeek: 2, facultyId: "f7" },
  { id: "s21", code: "IT403", name: "Data Analytics", classesPerWeek: 3, facultyId: "f7" },
  { id: "s26", code: "IT501", name: "IoT Systems", classesPerWeek: 3, facultyId: "f10" },
  { id: "s27", code: "IT502", name: "Blockchain Technology", classesPerWeek: 2, facultyId: "f10" },
]

// Expanded Batch Data
export const mockBatches: Batch[] = [
  // CSE Batches
  { id: "b1", name: "CSE-3A", semester: 5, size: 60, subjectIds: ["s1", "s2", "s3", "s15"] },
  { id: "b2", name: "CSE-3B", semester: 5, size: 58, subjectIds: ["s1", "s2", "s4", "s16"] },
  { id: "b3", name: "CSE-4A", semester: 7, size: 55, subjectIds: ["s8", "s9", "s17"] },
  { id: "b4", name: "CSE-5A", semester: 9, size: 52, subjectIds: ["s22", "s23"] },

  // ECE Batches
  { id: "b5", name: "ECE-2A", semester: 3, size: 55, subjectIds: ["s5", "s6"] },
  { id: "b6", name: "ECE-3A", semester: 5, size: 53, subjectIds: ["s7", "s12", "s19"] },
  { id: "b7", name: "ECE-4A", semester: 7, size: 48, subjectIds: ["s13", "s24"] },
  { id: "b8", name: "ECE-5A", semester: 9, size: 45, subjectIds: ["s25"] },

  // IT Batches
  { id: "b9", name: "IT-3A", semester: 5, size: 50, subjectIds: ["s10", "s11", "s18"] },
  { id: "b10", name: "IT-4A", semester: 7, size: 47, subjectIds: ["s14", "s20", "s21"] },
  { id: "b11", name: "IT-5A", semester: 9, size: 44, subjectIds: ["s26", "s27"] },
]

// Expanded Classroom Data
export const mockClassrooms: Classroom[] = [
  // Building A - Regular Classrooms
  { id: "r1", building: "A", roomNo: "101", capacity: 70, hasProjector: true },
  { id: "r2", building: "A", roomNo: "102", capacity: 65, hasProjector: true },
  { id: "r3", building: "A", roomNo: "103", capacity: 60, hasProjector: false },
  { id: "r4", building: "A", roomNo: "201", capacity: 75, hasProjector: true },
  { id: "r5", building: "A", roomNo: "202", capacity: 70, hasProjector: true },
  
  // Building B - Lab Rooms
  { id: "r6", building: "B", roomNo: "101", capacity: 30, hasProjector: true, isLab: true },
  { id: "r7", building: "B", roomNo: "102", capacity: 35, hasProjector: true, isLab: true },
  { id: "r8", building: "B", roomNo: "201", capacity: 30, hasProjector: false, isLab: true },
  { id: "r9", building: "B", roomNo: "202", capacity: 40, hasProjector: true, isLab: true },

  // Building C - Large Lecture Halls
  { id: "r10", building: "C", roomNo: "301", capacity: 120, hasProjector: true },
  { id: "r11", building: "C", roomNo: "302", capacity: 100, hasProjector: true },
  
  // Building D - Mixed Use
  { id: "r12", building: "D", roomNo: "101", capacity: 65, hasProjector: true },
  { id: "r13", building: "D", roomNo: "201", capacity: 55, hasProjector: false },
  { id: "r14", building: "D", roomNo: "301", capacity: 45, hasProjector: true, isLab: true },
  { id: "r15", building: "D", roomNo: "302", capacity: 50, hasProjector: true, isLab: true },
]

// Generate all sessions based on batches and their subjects
export const mockSessions: Session[] = (() => {
  const sessions: Session[] = []
  
  mockBatches.forEach(batch => {
    batch.subjectIds.forEach(subjectId => {
      const subject = mockSubjects.find(s => s.id === subjectId)
      if (subject) {
        // Create sessions based on classes per week
        for (let i = 1; i <= subject.classesPerWeek; i++) {
          sessions.push({
            id: `${batch.id}-${subjectId}-${i}`,
            batchId: batch.id,
            subjectId: subjectId,
            facultyId: subject.facultyId,
          })
        }
      }
    })
  })
  
  return sessions
})()

// Fixed/Reserved special slots (e.g., weekly meeting)
export const fixedSpecialSlots: Record<SlotKey, Session> = {
  // Wed (index 2) at 11:00 (index 2) - Faculty Meeting
  "2-2": {
    id: "reserved-1",
    batchId: "reserved",
    subjectId: "reserved",
    facultyId: "reserved",
    room: "Faculty Meeting",
  },
  // Fri (index 4) at 15:00 (index 5) - Department Meeting
  "4-5": {
    id: "reserved-2",
    batchId: "reserved",
    subjectId: "reserved", 
    facultyId: "reserved",
    room: "Department Meeting",
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

// Additional utility functions for the expanded data
export function getSessionsByFaculty(facultyId: ID): Session[] {
  return mockSessions.filter(session => session.facultyId === facultyId)
}

export function getSessionsByBatch(batchId: ID): Session[] {
  return mockSessions.filter(session => session.batchId === batchId)
}

export function getLabSessions(): Session[] {
  return mockSessions.filter(session => {
    const subject = getSubject(session.subjectId)
    return subject?.isLab === true
  })
}

export function getAvailableRoomsForBatch(batch: Batch): Classroom[] {
  return mockClassrooms.filter(room => 
    !room.capacity || room.capacity >= batch.size
  )
}

// Summary statistics
export const MOCK_DATA_SUMMARY = {
  totalFaculties: mockFaculties.length,
  totalSubjects: mockSubjects.length,
  totalBatches: mockBatches.length,
  totalClassrooms: mockClassrooms.length,
  totalSessions: mockSessions.length,
  labSubjects: mockSubjects.filter(s => s.isLab).length,
  labRooms: mockClassrooms.filter(r => r.isLab).length,
  departments: [...new Set(mockFaculties.map(f => f.department))],
  buildings: [...new Set(mockClassrooms.map(r => r.building))],
}