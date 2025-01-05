import type { ReactNode } from 'react'

export type DateRecordType = 'remote' | 'onsite'

export type DateRecordStatus = DateRecordType | 'none'

export type DateRecords = Record<number, DateRecordType>

export interface DateRecordsContextProps {
  records: DateRecords
  setDateRecord: (dayOfTheMonth: number, status: DateRecordStatus) => void
  ratio: number
  isLoaded: boolean
}

export interface UseDateRecordsReturn extends DateRecordsContextProps {
  dateStatus: DateRecordStatus
}

export interface DateRecordsProviderProps {
  children: ReactNode
}
