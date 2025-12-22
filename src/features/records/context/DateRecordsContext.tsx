import { createContext } from 'react'
import type { DateRecordsContextProps } from '../types'

export const DateRecordsContext = createContext<DateRecordsContextProps>({
  records: {},
  setDateRecord: () => null,
  replaceRecords: () => null,
  ratio: 0,
  estRatio: 0,
  hasPlans: false,
  isLoaded: false
})
