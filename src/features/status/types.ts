import type { ReactNode, Dispatch, SetStateAction } from 'react'
import type { ChangeDirection } from 'global/types'

export type ToggleStatusFn = (isOn?: boolean) => void

export interface StatusContextValues {
  gridId: string
  month: number
  year: number
  firstOfTheMonth: Date
  monthOffset: number
  direcction: ChangeDirection
  isReadOnly: boolean
  isCustomMode: boolean
  isPlanMode: boolean
  dateCheck: string,
  setMonthOffset: Dispatch<SetStateAction<number>>
  navMonthBack: () => void
  navMonthForward: () => void
  toggleCustomMode: ToggleStatusFn
  togglePlanMode: ToggleStatusFn
}

export interface StatusProviderProps {
  gridId: string
  dateCheck: string
  children: ReactNode
}
