"use client"

import { mockBatches } from "@/lib/mock-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  selectedBatchId?: string
  onBatchSelect: (batchId: string) => void
}

export function BatchSelector({ selectedBatchId, onBatchSelect }: Props) {
  return (
    <Select value={selectedBatchId} onValueChange={onBatchSelect}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a batch" />
      </SelectTrigger>
      <SelectContent>
        {mockBatches.map((batch) => (
          <SelectItem key={batch.id} value={batch.id}>
            {batch.name} (Sem {batch.semester})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}