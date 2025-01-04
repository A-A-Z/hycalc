import { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { useGridStatus } from 'features/status'

import type { FC, ReactNode } from 'react'
import type { DateRecords, DateRecordType, DateRecordStatus } from '../types'

interface DateRecordsContextProps {
  records: DateRecords
  setDateRecord: (dayOfTheMonth: number, status: DateRecordStatus) => void
  ratio: number
  isLoaded: boolean
}

interface useDateRecordsReturn extends DateRecordsContextProps {
  dateStatus: DateRecordStatus
}

const DateRecordsContext = createContext<DateRecordsContextProps>({
  records: {},
  setDateRecord: () => null,
  ratio: 0,
  isLoaded: false
})

export const useDateRecords = (dayOfTheMonth: number): useDateRecordsReturn => {
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

const BLANK_VALUE = '{}'

export const DateRecordsProvider: FC<DateRecordsProviderProps> = ({ children }) => {
  const { year, month } = useGridStatus()
  // create states
  const [records, setRecords] =  useState<string>(BLANK_VALUE)
  const [isLoaded, setIsLoaded] = useState(false)

  // setup localstorage tools
  const recordKey = `${year}-${month}`

  /********************* Handle Loading **********************/

  useEffect(() => {  
    // load saved key
    const recordsJson = localStorage.getItem(recordKey)

    // update state with records (or blank if not found)
    setRecords(recordsJson ?? BLANK_VALUE)
    setIsLoaded(true)
  }, [recordKey])

  /********************* Handle Saving **********************/

  const save = useCallback((json: string) => {
    // update localstore based on record key
    localStorage.setItem(recordKey, json)
  }, [recordKey])

  // debounce the save callback so it only saves after changes are finished
  const saveDebounced = useDebounceCallback(save, 1500)

  useEffect(() => {
    // on records change call the debounced save function (if loaded)
    if (isLoaded) {
      saveDebounced(records)
    }
  }, [records, isLoaded, saveDebounced])

  /********************* Handle retruned values for hook **********************/

  // callback function for updating records
  const setDateRecord = useCallback((dayOfTheMonth: number, status: DateRecordStatus) => {
    // turn records in to object so we can make changes to it
    const newRecords = JSON.parse(records)

    if (status === 'none' && newRecords[dayOfTheMonth] !== undefined) {
      // records is set to 'none' or invalid date: delete record
      delete newRecords[dayOfTheMonth]
    } else {
      // otherwise update record
      newRecords[dayOfTheMonth] = status as DateRecordType
    }

    // a string is better for tracking state then a parsed object
    setRecords(JSON.stringify(newRecords))
  }, [setRecords, records])

  // get the ratio
  const ratio = useMemo(() => {
    const recordsParsed = JSON.parse(records)
    const totalDays = Object.entries(recordsParsed).length
    const daysOnSite = Object.values(recordsParsed).filter((entry) => entry === 'onsite').length
    return Math.round((daysOnSite / totalDays) * 100 || 0)
  }, [records])

  // hook returned values
  const value: DateRecordsContextProps = useMemo(() => ({
    records: JSON.parse(records),
    ratio,
    isLoaded,
    setDateRecord
  }), [records, isLoaded, ratio, setDateRecord])

  return <DateRecordsContext.Provider value={value}>{children}</DateRecordsContext.Provider>
}