import { useContext } from 'react'

import { DateRecordsContext } from '../context/RecordsContext'

import type { UseDateRecordsReturn } from '../types'

export const useDateRecords = (dayOfTheMonth: number): UseDateRecordsReturn => {
  const context = useContext(DateRecordsContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  const dateStatus = context.records[dayOfTheMonth] ?? 'none'
  const dateStatusNormal = (dateStatus === 'onsite' || dateStatus === 'remote') ? dateStatus : 'none'

  return { ...context, dateStatus, dateStatusNormal }
}
