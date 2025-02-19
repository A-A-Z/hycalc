import { useMemo, useState, useCallback } from 'react'
import { getYearAndMonth } from 'lib/date'
import { StatusContext } from './StatusContext'
import { StatusesInit } from '../constaints'

import type { FC } from 'react'
import type { ChangeDirection } from 'global/types'
import type {
  StatusContextValues,
  StatusProviderProps,
  ToggleStatusFn
} from '../types'

export const StatusProvider: FC<StatusProviderProps> = ({ gridId, dateCheck, children }) => {
  const [monthOffset, setMonthOffset] = useState(StatusesInit.monthOffset)
  const [isReadOnly, setIsReadOnly] = useState(StatusesInit.isReadOnly)
  const [isCustomMode, setIsCustomMode] = useState(StatusesInit.isCustomMode)
  const [isPlanMode, setIsPlanMode] = useState(StatusesInit.isPlanMode)
  const [direcction, setDirection] = useState<ChangeDirection>('none')

  // get current year and month
  const { year, month } = getYearAndMonth(monthOffset)

  // get the first day of the current month/year
  const firstOfTheMonth = useMemo(() => new Date(year, (month - 1), 1), [year, month])

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

  const navMonthBack = useCallback(() => {
    setMonthOffset(oldValue => oldValue + 1)
    setDirection('back')
  }, [])

  const navMonthForward = useCallback(() => {
    setMonthOffset(oldValue => oldValue - 1)
    setDirection('forward')
  }, [])

  const value: StatusContextValues = useMemo(() => ({
    gridId,
    year,
    month,
    monthOffset,
    firstOfTheMonth,
    direcction,
    isReadOnly,
    isCustomMode,
    isPlanMode,
    dateCheck,
    setMonthOffset,
    navMonthBack,
    navMonthForward,
    toggleCustomMode,
    togglePlanMode
  }), [
    gridId,
    dateCheck,
    year,
    month,
    monthOffset,
    firstOfTheMonth,
    direcction,
    isReadOnly,
    isCustomMode,
    isPlanMode,
    toggleCustomMode,
    togglePlanMode,
    navMonthBack,
    navMonthForward,
    setMonthOffset
  ])

  return <StatusContext value={value}>{children}</StatusContext>
}
