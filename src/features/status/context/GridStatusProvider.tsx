import { createContext, useMemo, useState, useCallback } from 'react'
import { getYearAndMonth } from 'lib/date'

import type { FC } from 'react'
import type { ChangeDirection } from 'global/types'
import type {
  GridStatusContextValues,
  GridStatusProviderProps,
  ToggleStatusFn
} from '../types'

const gridStatusesInit: GridStatusContextValues = {
  gridId: 'grid-id',
  month: 1,
  year: 1970,
  monthOffset: 0,
  firstOfTheMonth: new Date(1970, 0, 1),
  direcction: 'none',
  isReadOnly: false,
  isCustomMode: false,
  isPlanMode: false,
  dateCheck: '',
  setMonthOffset: () => {},
  navMonthBack: () => {},
  navMonthForward: () => {},
  toggleCustomMode: () => null,
  togglePlanMode: () => null
}

export const GridStatusContext = createContext<GridStatusContextValues>(gridStatusesInit)

export const GridStatusProvider: FC<GridStatusProviderProps> = ({ gridId, dateCheck, children }) => {
  const [monthOffset, setMonthOffset] = useState(gridStatusesInit.monthOffset)
  const [isReadOnly, setIsReadOnly] = useState(gridStatusesInit.isReadOnly)
  const [isCustomMode, setIsCustomMode] = useState(gridStatusesInit.isCustomMode)
  const [isPlanMode, setIsPlanMode] = useState(gridStatusesInit.isPlanMode)
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

  const value: GridStatusContextValues = useMemo(() => ({
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

  return <GridStatusContext.Provider value={value}>{children}</GridStatusContext.Provider>
}
