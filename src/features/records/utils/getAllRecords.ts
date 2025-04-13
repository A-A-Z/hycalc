import type { DateRecords } from '../types'

export const getAllRecords = (): DateRecords[] => {
  return Object.entries(localStorage)
    .filter(([, value]) => value !== '{}')
}
