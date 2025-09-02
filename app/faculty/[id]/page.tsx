import { TimetableGrid } from "@/components/timetable-grid"
import { getFaculty, mockSessions } from "@/lib/mock-data"

export default function FacultyTimetablePage({ params }: { params: { id: string } }) {
  const faculty = getFaculty(params.id)
  const facultySessions = mockSessions.filter(s => s.facultyId === params.id)
  
  const schedule = Object.fromEntries(
    facultySessions.map((s, i) => [`${i % 5}-${Math.floor(i / 5)}`, s])
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timetable for {faculty?.name}</h1>
      <TimetableGrid schedule={schedule} readOnly />
    </div>
  )
}
