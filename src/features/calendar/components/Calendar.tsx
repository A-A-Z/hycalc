import { useMemo, useRef, useCallback, createRef, use } from 'react'

import { format, startOfWeek, endOfMonth, addWeeks, DATE_FORMATS } from 'lib/date'
import { ConfigContext } from 'features/config'
import { useGridStatus } from 'features/status'

import { Week } from './Week'
import { Headings } from './Headings'
import { handleGridNav } from '../utils/handleGridNav'
import '../assets/calendar.css'

import type { FC } from 'react'
import type { WeekRef, DayRef, WeekRefFnc } from '../types'

export const Calendar: FC = () => {
  const dayRefs = useRef<WeekRef[]>([])
  const {
    gridId,
    year,
    month,
    firstOfTheMonth,
    isCustomMode
  } = useGridStatus()
  const { config: { weekdays } } = use(ConfigContext)
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
    <div
      className="calendar"
      aria-labelledby={gridId}
      role="grid"
      aria-colcount={columnCount}
    >
      <Headings />
      {weeks.map((week, weekIndex) => {
        return (
          <Week
            key={`week-${format(week, DATE_FORMATS.dateKey)}-${month}`}
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
