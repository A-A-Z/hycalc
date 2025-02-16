import { createContext } from 'react'
import { configInit } from '../constaints'

import type { ConfigContextValues } from '../types'

export const ConfigContext = createContext<ConfigContextValues>({
  config: configInit,
  setConfig: () => null
})
