import { TimetableGrid } from "@/components/timetable-grid"
import { getBatch, mockSessions } from "@/lib/mock-data"

export default function BatchTimetablePage({ params }: { params: { id: string } }) {
  const batch = getBatch(params.id)
  const batchSessions = mockSessions.filter(s => s.batchId === params.id)
  
  const schedule = Object.fromEntries(
    batchSessions.map((s, i) => [`${i % 5}-${Math.floor(i / 5)}`, s])
  )

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Timetable for {batch?.name}</h1>
      <TimetableGrid schedule={schedule} readOnly />
    </div>
  )
}
