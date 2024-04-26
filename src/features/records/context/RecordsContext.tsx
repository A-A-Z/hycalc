import { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { log } from '../utils/log'

import type { FC, ReactNode } from 'react'
import type { DateRecords, DateRecordType, DateRecordStatus } from '../types'

interface DateRecordsContextProps {
  records: DateRecords,
  setDateRecord: (dayOfTheMonth: number, status: DateRecordStatus) => void
  ratio: number
}

interface UseDateRecordsReturn extends DateRecordsContextProps {
  dateStatus: DateRecordStatus
}

const DateRecordsContext = createContext<DateRecordsContextProps>({
  records: {},
  setDateRecord: () => null,
  ratio: 0
})

export const useDateRecords = (dayOfTheMonth: number): UseDateRecordsReturn => {
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
  const [isLoaded, setIsLoaded] = useState(false)
  const recordSetName = `${year}-${month}`

  // convert Records in to JSON string
  const recordsString = useMemo(() => JSON.stringify(records), [records])

  // Callback function for updating the date records
  const setDateRecord = useCallback((dayOfTheMonth: number, status: DateRecordStatus) => {
    const newRecords = { ...records }

    if (status === 'none' && newRecords[dayOfTheMonth] !== undefined) {
      delete newRecords[dayOfTheMonth]
    } else {
      newRecords[dayOfTheMonth] = status as DateRecordType
    }

    setRecords(newRecords)
  }, [setRecords, records])

  // Callback function to save records to local store
  const save = useCallback((json: string) => {
    localStorage.setItem(`${recordSetName}`, json)
    log(['Records saved for:', recordSetName])
  }, [])

  // use this debounced version for auto save
  const saveDebounced = useDebounceCallback(save, 1500)

  // Load records from load storage
  useEffect(() => {
    if (isLoaded) {
      return
    }

    // clear out old values
    Object.keys(localStorage)
      .filter(key => key !== recordSetName)
      .forEach(key => {
        log(['Deleting old records for:', key])
        localStorage.removeItem(key)
      })

    log(['Looking for records for:', recordSetName])
    const recordsJson = localStorage.getItem(recordSetName)

    if (recordsJson !== null) {
      const newRecords = JSON.parse(recordsJson)
      const recordsCount = Object.values(newRecords).length
      setRecords(newRecords)
      log([`Records loaded for ${recordSetName}:`, recordsCount.toString()])
    } else {
      log(['No records found'])
    }

    setIsLoaded(true)
  }, [])

  // called debounaced save on record change
  useEffect(() => {
    if (isLoaded) {
      saveDebounced(recordsString)
    }
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

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return <DateRecordsContext.Provider value={value}>{children}</DateRecordsContext.Provider>
}
