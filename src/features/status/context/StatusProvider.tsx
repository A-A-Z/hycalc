import { useMemo, useState, useCallback } from 'react'
import { useDateFromParams } from 'features/date'
import { StatusContext } from './StatusContext'
import { StatusesInit } from '../constaints'

import type { FC } from 'react'
import type {
  StatusContextValues,
  StatusProviderProps,
  ToggleStatusFn
} from '../types'

export const StatusProvider: FC<StatusProviderProps> = ({ gridId, children }) => {
  const [isReadOnly, setIsReadOnly] = useState(StatusesInit.isReadOnly)
  const [isCustomMode, setIsCustomMode] = useState(StatusesInit.isCustomMode)
  const [isPlanMode, setIsPlanMode] = useState(StatusesInit.isPlanMode)

  // get current year and month
  const [, year, month] = useDateFromParams()

  // get the first day of the current month/year
  const firstOfTheMonth = useMemo(() => new Date(year, (month - 1), 1), [month, year])

  const toggleCustomMode: ToggleStatusFn = useCallback(isOn => {
    // turn off other modes
    setIsPlanMode(false)

    const value = isOn ?? !isCustomMode
    setIsCustomMode(value)
    setIsReadOnly(value)
  }, [isCustomMode])

  const togglePlanMode: ToggleStatusFn = useCallback(isOn => {
    // turn off other modes
    setIsCustomMode(false)
    setIsReadOnly(false)

    if (isOn === undefined) {
      // if isOn is undifined then toggle value
      setIsPlanMode(value => !value)
      return
    }
  
    setIsPlanMode(isOn)
  }, [])

  const value: StatusContextValues = useMemo(() => ({
    gridId,
    year,
    month,
    firstOfTheMonth,
    isReadOnly,
    isCustomMode,
    isPlanMode,
    toggleCustomMode,
    togglePlanMode
  }), [
    gridId,
    year,
    month,
    firstOfTheMonth,
    isReadOnly,
    isCustomMode,
    isPlanMode,
    toggleCustomMode,
    togglePlanMode
  ])

  return <StatusContext value={value}>{children}</StatusContext>
}
