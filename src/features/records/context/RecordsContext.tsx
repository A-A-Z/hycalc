import { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

import type { FC, ReactNode } from 'react'
import type { DateRecords, DateRecordType, DateRecordStatus } from '../types'

interface DateRecordsContextProps {
  records: DateRecords,
  setDateRecord: (dayOfTheMonth: number, status: DateRecordStatus) => void
  ratio: number
}

const DateRecordsContext = createContext<DateRecordsContextProps>({
  records: {},
  setDateRecord: () => null,
  ratio: 0
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
  year: number
  month: number
  children: ReactNode
}

export const DateRecordsProvider: FC<DateRecordsProviderProps> = ({ year, month, children }) => {
  const [records, setRecords] =  useState<DateRecords>({})

  const recordsString = useMemo(() => JSON.stringify(records), [records])

  const setDateRecord = useCallback((dayOfTheMonth: number, status: DateRecordStatus) => {
    const newRecords = { ...records }

    if (status === 'none' && newRecords[dayOfTheMonth] !== undefined) {
      delete newRecords[dayOfTheMonth]
    } else {
      newRecords[dayOfTheMonth] = status as DateRecordType
    }

    setRecords(newRecords)
  }, [setRecords, records])

  const save = useCallback((json: string) => {
    localStorage.setItem(`${year}-${month}`, json)
    console.log(`Records saved for: ${year}-${month}`)
  }, [])
  const saveDebounced = useDebounceCallback(save, 1500)

  useEffect(() => {
    saveDebounced(recordsString)
  }, [recordsString])

  const ratio = useMemo(() => {
    const totalDays = Object.entries(records).length
    const daysOnSite = Object.values(records).filter((entry) => entry === 'onsite').length
    return Math.round((daysOnSite / totalDays) * 100 || 0)
  }, [records])

  const value = useMemo(() => ({
    records,
    setDateRecord,
    ratio
  }), [records, setDateRecord, ratio])
  return <DateRecordsContext.Provider value={value}>{children}</DateRecordsContext.Provider>
}
