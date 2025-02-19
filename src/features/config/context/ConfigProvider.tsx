import { useMemo, useState, useCallback } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { ConfigContext } from '../context/ConfigContext'
import { configInit } from '../constaints'

import type { FC } from 'react'
import type {
  Config,
  ConfigContextValues,
  ConfigProviderProps,
  SetConfigFn
} from '../types'

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
  }, [configState, setConfigState, setStoredValue])

  // build value to return in context
  const value: ConfigContextValues = useMemo(() => ({
    config: configState,
    setConfig
  }), [configState, setConfig])

  return <ConfigContext value={value}>{children}</ConfigContext>
}
