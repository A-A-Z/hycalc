import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import type { FC, ReactNode } from 'react'
import type { Config } from '../types'

type SetConfigFn = <K extends keyof Config>(key: K, value: Config[K]) => void

interface ConfigContext {
  config: Config
  setConfig: SetConfigFn
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
  // set up hook for working with local storage
  const [storedValue, setStoredValue] = useLocalStorage('config', configInit, {
    serializer: (value: Config) => JSON.stringify(value),
    deserializer: value => JSON.parse(value)
  })

  // setup state
  const [configState, setConfigState] = useState<Config>(storedValue)

  // function to update config in state and local storage
  const setConfig: SetConfigFn = useCallback((key, value) => {
    if (configState[key] === undefined) {
      return
    }

    const newValue = { ...configState, [key]: value }

    setStoredValue(newValue)
    setConfigState(newValue)
  }, [configState, setConfigState])

  // build value to return in context
  const value: ConfigContext = useMemo(() => ({
    config: configState,
    setConfig
  }), [configState, setConfig])

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}
