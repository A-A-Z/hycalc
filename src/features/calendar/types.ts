import type { RefObject } from 'react'

export type dayRef = RefObject<HTMLButtonElement>
export type weekRef = dayRef[]

export type WeekRefFnc = (weekIndex: number, dayIndex: number, key: string) => void
export type DayRefFnc = (dayIndex: number, key: string) => void
