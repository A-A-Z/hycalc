import type { DateRecordEntry } from '../types'

export const getAllRecords = (): DateRecordEntry[] => {
  return Object.entries(localStorage)
    .filter(([, value]) => value !== '{}')
}
