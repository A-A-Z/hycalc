import type { RefObject } from 'react'

export type DayRef = RefObject<HTMLButtonElement>
export type WeekRef = DayRef[]

export type WeekRefFnc = (weekIndex: number, dayIndex: number, key: string) => void
export type DayRefFnc = (dayIndex: number, key: string) => void
