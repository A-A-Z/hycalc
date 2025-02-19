import type { ReactNode } from 'react'

export interface Config {
  weekdays: number[]
  theme: 'light' | 'dark'
}

export type SetConfigFn = <K extends keyof Config>(key: K, value: Config[K]) => void

export interface ConfigContextValues {
  config: Config
  setConfig: SetConfigFn
}

export interface ConfigProviderProps {
  children: ReactNode
}
