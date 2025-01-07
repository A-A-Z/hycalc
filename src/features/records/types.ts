import type { ReactNode } from 'react'

export type DateRecordNormalType = 'remote' | 'onsite'

export type DateRecordPlanType = 'p-remote' | 'p-onsite'

export type DateRecordNoneType = 'none'

export type DateRecordType = DateRecordNormalType | DateRecordPlanType

export type DateRecordStatus = DateRecordType | DateRecordNoneType

export type DateRecordNormalStatus = DateRecordNormalType | DateRecordNoneType

export type DateRecordPlanStatus = DateRecordPlanType | DateRecordNoneType

export type DateRecords = Record<number, DateRecordType>

export type DateRecordEntry = [string, DateRecordType]

export interface DateRecordsContextProps {
  records: DateRecords
  setDateRecord: (dayOfTheMonth: number, status: DateRecordStatus) => void
  ratio: number
  estRatio: number
  hasPlans: boolean
  isLoaded: boolean
}

export interface UseDateRecordsReturn extends DateRecordsContextProps {
  dateStatus: DateRecordStatus
  dateStatusNormal: DateRecordNormalStatus
}

export interface DateRecordsProviderProps {
  children: ReactNode
}
