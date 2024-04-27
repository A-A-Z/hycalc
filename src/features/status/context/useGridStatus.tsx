import { createContext, useContext, useMemo, useState, useCallback } from 'react'

import type { FC, ReactNode } from 'react'

interface GridStatuses {
  isReadOnly: boolean
  isCustomMode: boolean
}

interface GridStatusContextValues {
  status: GridStatuses
  toggleCustomMode: (isOn: boolean) => void
}

interface GridStatusProviderProps {
  children: ReactNode
}

const gridStatusesInit: GridStatuses = {
  isReadOnly: false,
  isCustomMode: false
}

const GridStatusContext = createContext<GridStatusContextValues>({
  status: gridStatusesInit,
  toggleCustomMode: () => null
})

export const useGridStatus = (): GridStatusContextValues => {
  const context = useContext(GridStatusContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export const GridStatusProvider: FC<GridStatusProviderProps> = ({ children }) => {
  const [isReadOnly, setIsReadOnly] = useState(gridStatusesInit.isReadOnly)
  const [isCustomMode, setIsCustomMode] = useState(gridStatusesInit.isCustomMode)

  const toggleCustomMode = useCallback((isOn: boolean): void => {
    setIsCustomMode(isOn)
    setIsReadOnly(!isReadOnly ? isOn : isReadOnly)
  }, [setIsCustomMode])

  const value: GridStatusContextValues = useMemo(() => ({
    status: {
      isReadOnly,
      isCustomMode
    },
    toggleCustomMode
  }), [isReadOnly, isCustomMode, toggleCustomMode])

  return <GridStatusContext.Provider value={value}>{children}</GridStatusContext.Provider>
}
