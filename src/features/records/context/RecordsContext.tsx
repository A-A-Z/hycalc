import { createContext, useContext, useMemo, useCallback, useState } from 'react'

import type { FC, ReactNode } from 'react'
import type { DateRecords, DateRecordType, DateRecordStatus } from '../types'

interface DateRecordsContextProps {
  records: DateRecords,
  setDateRecord: (dayOfTheMonth: number, status: DateRecordStatus) => void
}

const DateRecordsContext = createContext<DateRecordsContextProps>({
  records: {},
  setDateRecord: () => null
})

export const useDateRecords = (dayOfTheMonth: number) => {
  const context = useContext(DateRecordsContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const dateStatus = context.records[dayOfTheMonth] ?? 'none'

  return { ...context, dateStatus }
}

interface DateRecordsProviderProps {
  children: ReactNode
}

export const DateRecordsProvider: FC<DateRecordsProviderProps> = ({ children }) => {
  const [records, setRecords] =  useState<DateRecords>({})

  const setDateRecord = useCallback((dayOfTheMonth: number, status: DateRecordStatus) => {
    const newRecords = { ...records }

    if (status === 'none' && newRecords[dayOfTheMonth] !== undefined) {
      delete newRecords[dayOfTheMonth]
    } else {
      newRecords[dayOfTheMonth] = status as DateRecordType
    }

    setRecords(newRecords)
  }, [setRecords, records])

  const value = useMemo(() => ({
    records,
    setDateRecord
  }), [records, setDateRecord])
  return <DateRecordsContext.Provider value={value}>{children}</DateRecordsContext.Provider>
}
