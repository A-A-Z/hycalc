import type { ReactNode, Dispatch, SetStateAction } from 'react'
import type { ChangeDirection } from 'global/types'

export interface GridStatusContextValues {
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
  toggleCustomMode: (isOn: boolean) => void
  togglePlanMode: (isOn: boolean) => void
}

export interface GridStatusProviderProps {
  gridId: string
  dateCheck: string
  children: ReactNode
}
