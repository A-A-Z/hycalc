import type { RefObject, ReactNode, Ref } from 'react'

export type DayRef = RefObject<HTMLButtonElement | null>
export type WeekRef = DayRef[]

export type WeekRefFnc = (weekIndex: number, dayIndex: number, key: string) => void
export type DayRefFnc = (dayIndex: number, key: string) => void

export interface WeekProps {
  weekIndex: number
  date: Date
  activeMonth: number
  activeYear: number
  weekdayRefs: WeekRef
  handleKeyDown: WeekRefFnc
}

export interface DayWrapperProps {
  isOffMonth: boolean
  isDayToday: boolean
  dayIndex: number
  children: ReactNode
}

export interface DayProps {
  dayIndex: number
  date: Date
  isTabbed: boolean
  isOffMonth: boolean
  isDisabled: boolean
  handKeyDown: DayRefFnc,
  ref?: Ref<HTMLButtonElement>
}
