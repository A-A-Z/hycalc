import { use } from 'react'
import { ConfigContext } from '../context/ConfigContext'

import type { ConfigContextValues } from '../types'

export const useConfig = (): ConfigContextValues => {
  const context = use(ConfigContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
