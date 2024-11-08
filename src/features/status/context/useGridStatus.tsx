import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { getYearAndMonth } from 'lib/date'

import type { FC, ReactNode, Dispatch, SetStateAction } from 'react'

interface GridStatusContextValues {
  month: number
  year: number
  monthOffset: number
  isReadOnly: boolean
  isCustomMode: boolean
  setMonthOffset: Dispatch<SetStateAction<number>>
  toggleCustomMode: (isOn: boolean) => void
}

interface GridStatusProviderProps {
  counter: number
  children: ReactNode
}

const gridStatusesInit: GridStatusContextValues = {
  month: 1,
  year: 1970,
  monthOffset: 0,
  isReadOnly: false,
  isCustomMode: false,
  setMonthOffset: () => {},
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

export const GridStatusProvider: FC<GridStatusProviderProps> = ({ counter, children }) => {
  const [monthOffset, setMonthOffset] = useState(gridStatusesInit.monthOffset)
  const [isReadOnly, setIsReadOnly] = useState(gridStatusesInit.isReadOnly)
  const [isCustomMode, setIsCustomMode] = useState(gridStatusesInit.isCustomMode)

  const toggleCustomMode = useCallback((isOn: boolean): void => {
    setIsCustomMode(isOn)
    setIsReadOnly(!isReadOnly ? isOn : isReadOnly)
  }, [setIsCustomMode])

  // get current year and month
  const { year, month } = getYearAndMonth(monthOffset)

  const value: GridStatusContextValues = useMemo(() => ({
    year,
    month,
    monthOffset,
    isReadOnly,
    isCustomMode,
    setMonthOffset,
    toggleCustomMode
  }), [
    counter,
    year,
    month,
    monthOffset,
    isReadOnly,
    isCustomMode,
    toggleCustomMode,
    setMonthOffset
  ])

  return <GridStatusContext.Provider value={value}>{children}</GridStatusContext.Provider>
}
