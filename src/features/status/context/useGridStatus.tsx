import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { getYearAndMonth } from 'lib/date'

import type { FC, ReactNode, Dispatch, SetStateAction } from 'react'
import type { ChangeDirection } from 'global/types'

interface GridStatusContextValues {
  gridId: string
  month: number
  year: number
  firstOfTheMonth: Date
  monthOffset: number
  direcction: ChangeDirection
  isReadOnly: boolean
  isCustomMode: boolean
  setMonthOffset: Dispatch<SetStateAction<number>>
  navMonthBack: () => void
  navMonthForward: () => void
  toggleCustomMode: (isOn: boolean) => void
}

interface GridStatusProviderProps {
  gridId: string
  counter: number
  children: ReactNode
}

const gridStatusesInit: GridStatusContextValues = {
  gridId: 'grid-id',
  month: 1,
  year: 1970,
  monthOffset: 0,
  firstOfTheMonth: new Date(1970, 0, 1),
  direcction: 'none',
  isReadOnly: false,
  isCustomMode: false,
  setMonthOffset: () => {},
  navMonthBack: () => {},
  navMonthForward: () => {},
  toggleCustomMode: () => null
}

const GridStatusContext = createContext<GridStatusContextValues>(gridStatusesInit)

export const useGridStatus = (): GridStatusContextValues => {
  const context = useContext(GridStatusContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export const GridStatusProvider: FC<GridStatusProviderProps> = ({ gridId, counter, children }) => {
  const [monthOffset, setMonthOffset] = useState(gridStatusesInit.monthOffset)
  const [isReadOnly, setIsReadOnly] = useState(gridStatusesInit.isReadOnly)
  const [isCustomMode, setIsCustomMode] = useState(gridStatusesInit.isCustomMode)
  const [direcction, setDirection] = useState<ChangeDirection>('none')

  // get current year and month
  const { year, month } = getYearAndMonth(monthOffset)

  // get the first day of the current month/year
  const firstOfTheMonth = new Date(year, (month - 1), 1)

  const toggleCustomMode = useCallback((isOn: boolean): void => {
    setIsCustomMode(isOn)
    setIsReadOnly(!isReadOnly ? isOn : isReadOnly)
  }, [setIsCustomMode])

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
    setMonthOffset,
    navMonthBack,
    navMonthForward,
    toggleCustomMode
  }), [
    gridId,
    counter,
    year,
    month,
    monthOffset,
    firstOfTheMonth,
    direcction,
    isReadOnly,
    isCustomMode,
    toggleCustomMode,
    setMonthOffset
  ])

  return <GridStatusContext.Provider value={value}>{children}</GridStatusContext.Provider>
}
