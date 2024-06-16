import { useMemo, useRef, useCallback, createRef } from 'react'

import { format, startOfWeek, endOfMonth, addWeeks, DATE_FORMATS } from 'lib/date'
import { useConfig } from 'features/config'
import { useGridStatus } from 'features/status'

import { Week } from './Week'
import { Headings } from './Headings'
import { handleGridNav } from '../utils/handleGridNav'
import '../assets/calendar.css'

import type { WeekRef, DayRef, WeekRefFnc } from '../types'

interface CalendarProps {
  id: string
  year: number
  month: number
}

export const Calendar = ({ id, year, month }: CalendarProps): JSX.Element => {
  const dayRefs = useRef<WeekRef[]>([])
  const { status: { isCustomMode } } = useGridStatus()
  const firstOfTheMonth = new Date(year, (month - 1), 1)

  const { config: { weekdays } } = useConfig()
  const columnCount = isCustomMode ? 7 : weekdays.length

  const weeks = useMemo(() => {
    const lastDayOfMonth = endOfMonth(firstOfTheMonth)
    let currentWeekStart = startOfWeek(firstOfTheMonth)
    const weeks = []

    while (currentWeekStart <= lastDayOfMonth) {
      weeks.push(currentWeekStart)
      currentWeekStart = addWeeks(currentWeekStart, 1)
      const weekdayRefs = Array.from({ length: 7 }, (): DayRef => createRef<HTMLButtonElement>())
      dayRefs.current.push(weekdayRefs)
    }

    return weeks
  }, [firstOfTheMonth])

  // create callback function for grid keyboard nav
  const handleKeyDown: WeekRefFnc = useCallback((rowIndex, columnIndex, key) => {
    handleGridNav(dayRefs, rowIndex, columnIndex, key)
  }, [dayRefs])

  if (columnCount === 0) {
    return (
      <div className="calendar-note">
        <p>Yes, very cleaver.</p>
        <p>You made all the days go away.</p>
      </div>
    )
  }

  return (
    <div className="calendar" aria-labelledby={id} role="grid" aria-colcount={columnCount}>
      <Headings />
      {weeks.map((week, weekIndex) => {
        return (
          <Week
            key={`week-${format(week, DATE_FORMATS.dateKey)}`}
            weekIndex={weekIndex}
            date={week}
            activeMonth={month}
            activeYear={year}
            weekdayRefs={dayRefs.current[weekIndex]}
            handleKeyDown={handleKeyDown}
          />
        )
      })}
    </div>
  )
}
