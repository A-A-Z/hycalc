import { useMemo, useCallback, useState, useEffect, use } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { StatusContext } from 'features/status'
import { isCurrentPlanEntry } from '../utils/isCurrentPlanEntry'
import { DateRecordsContext } from './DateRecordsContext'

import type { FC } from 'react'
import type {
  DateRecordType,
  DateRecords,
  DateRecordStatus,
  DateRecordsContextProps,
  DateRecordsProviderProps,
  DateRecordJson
} from '../types'

export const DateRecordsProvider: FC<DateRecordsProviderProps> = ({ children }) => {
  const BLANK_VALUE = '{}'
  const { year, month } = use(StatusContext)

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
    const newRecords = JSON.parse(records) as DateRecords

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

  const replaceRecords = useCallback((data: DateRecordJson[]) => {
    // Delete all old data (scary!)
    localStorage.clear()

    // set current month as blank (in case of flush)
    setRecords('{}')

    // Add each month into local storge
    data.forEach(([key, value]) => {
      localStorage.setItem(key, value)
      if (key === recordKey) {
        // if new record is also the current month then update state
        setRecords(value)
      }
    })
  }, [recordKey])

  // get the ratio (not using plan data in total)
  const ratio = useMemo(() => {
    const recordsParsed = JSON.parse(records) as DateRecords

    // get total number of enties, not counting plan enties
    const totalDays = Object.values(recordsParsed).filter(entry => (entry !== 'p-remote' && entry !== 'p-onsite')).length

    // get total number of onsite enties (not plan onsite enties)
    const daysOnSite = Object.values(recordsParsed).filter(entry => entry === 'onsite').length

    // return the percentage of enties that are onsite
    return Math.round((daysOnSite / totalDays) * 100 || 0)
  }, [records])

  // get the estRatio (include plan data in total)
  const estRatio = useMemo(() => {
    const recordsParsed = JSON.parse(records) as DateRecords

    // get total number of enties, including current plan enties
    const totalDays = Object.entries(recordsParsed).filter(record => {
      const [, entry] = record
      // normal entries always count
      if (entry === 'onsite' || entry === 'remote') return true
      // plan enties only count if in the future
      return isCurrentPlanEntry(record, month, year)
    }).length

    // get total number of onsite enties (not plan onsite enties)
    const daysOnSite = Object.entries(recordsParsed).filter(record => {
      const [, entry] = record
      if (entry === 'onsite') return true
      if (entry !== 'p-onsite') return false
      return isCurrentPlanEntry(record, month, year)
    }).length

    // retturn the percentage of enties that are onsite or current planned onsite
    return Math.round((daysOnSite / totalDays) * 100 || 0)
  }, [records, month, year])

  const hasPlans = useMemo(() => {
    const recordsParsed = JSON.parse(records) as DateRecords
    // plans only count if in the future
    return Object.entries(recordsParsed).some(entry => isCurrentPlanEntry(entry, month, year))
  }, [records, month, year])

  // hook returned values
  const value: DateRecordsContextProps = useMemo(() => ({
    records: JSON.parse(records),
    ratio,
    estRatio,
    hasPlans,
    isLoaded,
    setDateRecord,
    replaceRecords
  }), [records, isLoaded, ratio, estRatio, hasPlans, setDateRecord, replaceRecords])

  return <DateRecordsContext value={value}>{children}</DateRecordsContext>
}
