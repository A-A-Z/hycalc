import type { DateRecordEntry } from 'features/records'

export interface ImportResultsProps {
  data: DateRecordEntry[]
}

export interface ImportResult {
  new: number
  match: number
  conflict: number
  total: number
}
export type MergeOption = 'merge' | 'overwrite' | 'keep' | 'flush'
