import { createContext, useContext, useMemo } from 'react'

import type { FC, ReactNode } from 'react'
import type { Config } from '../types'

interface ConfigContext {
  config: Config
  setConfig: <K extends keyof Config>(key: K, value: Config[K]) => void
}

interface ConfigProviderProps {
  children: ReactNode
}

const configInit: Config = {
  weekdays: [0,1,2,3,4,5,6],
  theme: 'dark'
}

const ConfigContext = createContext<ConfigContext>({
  config: configInit,
  setConfig: () => null
})

export const useConfig = (): ConfigContext => {
  const context = useContext(ConfigContext)

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const value: ConfigContext = useMemo(() => ({
    config: configInit,
    setConfig: () => null
  }), [])
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}
