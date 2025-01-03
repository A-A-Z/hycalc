import { createContext, useMemo, useState, useCallback } from 'react'
import { getYearAndMonth } from 'lib/date'

import type { FC } from 'react'
import type { ChangeDirection } from 'global/types'
import type { GridStatusContextValues, GridStatusProviderProps } from '../types'

const gridStatusesInit: GridStatusContextValues = {
  gridId: 'grid-id',
  month: 1,
  year: 1970,
  monthOffset: 0,
  firstOfTheMonth: new Date(1970, 0, 1),
  direcction: 'none',
  isReadOnly: false,
  isCustomMode: false,
  dateCheck: '',
  setMonthOffset: () => {},
  navMonthBack: () => {},
  navMonthForward: () => {},
  toggleCustomMode: () => null
}

export const GridStatusContext = createContext<GridStatusContextValues>(gridStatusesInit)

export const GridStatusProvider: FC<GridStatusProviderProps> = ({ gridId, dateCheck, children }) => {
  const [monthOffset, setMonthOffset] = useState(gridStatusesInit.monthOffset)
  const [isReadOnly, setIsReadOnly] = useState(gridStatusesInit.isReadOnly)
  const [isCustomMode, setIsCustomMode] = useState(gridStatusesInit.isCustomMode)
  const [direcction, setDirection] = useState<ChangeDirection>('none')

  // get current year and month
  const { year, month } = getYearAndMonth(monthOffset)

  // get the first day of the current month/year
  const firstOfTheMonth = useMemo(() => new Date(year, (month - 1), 1), [year, month])

  const toggleCustomMode = useCallback((isOn: boolean): void => {
    setIsCustomMode(isOn)
    setIsReadOnly(isOn)
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
    dateCheck,
    setMonthOffset,
    navMonthBack,
    navMonthForward,
    toggleCustomMode
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
    toggleCustomMode,
    navMonthBack,
    navMonthForward,
    setMonthOffset
  ])

  return <GridStatusContext.Provider value={value}>{children}</GridStatusContext.Provider>
}
