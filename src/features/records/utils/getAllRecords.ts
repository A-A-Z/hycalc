import type { DateRecordJson } from '../types'

export const getAllRecords = (): DateRecordJson[] => {
  return Object.entries(localStorage)
    .filter(([, value]) => value !== '{}')
}
