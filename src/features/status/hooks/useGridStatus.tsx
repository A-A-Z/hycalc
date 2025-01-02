import { useContext } from 'react'
import { GridStatusContext } from '../context/GridStatusProvider'

import type { GridStatusContextValues } from '../types'

export const useGridStatus = (): GridStatusContextValues => {
  const context = useContext(GridStatusContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
