import { isPast } from 'lib/date'

import type { DateRecordEntry } from '../types'

export const isCurrentPlanEntry = (record: DateRecordEntry, month: number, year: number): boolean => {
  const [day, entry] = record

  // must be a plan entry
  if (entry !== 'p-onsite' && entry !== 'p-remote') return false

  // must be in the future
  const entryDate = new Date(year, (month - 1), parseInt(day))
  return !isPast(entryDate)
}
