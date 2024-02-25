import { createContext, useContext } from 'react'

import type { FC, ReactNode } from 'react'
import type { DateRecords } from '../types'

const DateRecordsContext = createContext<DateRecords>({})

export const useDateRecords = () => {
  const context = useContext(DateRecordsContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface DateRecordsProviderProps {
  children: ReactNode
}

export const DateRecordsProvider: FC<DateRecordsProviderProps> = ({ children }) => {
  return <DateRecordsContext.Provider value={{}}>{children}</DateRecordsContext.Provider>
}
