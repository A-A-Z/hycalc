import type { ReactNode } from 'react'

export type ToggleStatusFn = (isOn?: boolean) => void

export interface StatusContextValues {
  gridId: string
  month: number
  year: number
  firstOfTheMonth: Date
  isReadOnly: boolean
  isCustomMode: boolean
  isPlanMode: boolean
  dateCheck: string,
  toggleCustomMode: ToggleStatusFn
  togglePlanMode: ToggleStatusFn
}

export interface StatusProviderProps {
  gridId: string
  dateCheck: string
  children: ReactNode
}
