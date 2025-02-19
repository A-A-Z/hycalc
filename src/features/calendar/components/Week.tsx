import { useMemo, useCallback } from 'react'
import clsx from 'clsx'
import {
  format,
  startOfWeek,
  addDays,
  isOffMonth,
  isThisWeek,
  isSameDay,
  DATE_FORMATS
} from 'lib/date'
import { useActiveWeekdays } from '../hooks/useActiveWeekdays'
import { useTabbedDate } from '../hooks/useTabbedDate'
import { Day } from './Day'
import '../assets/week.css'

import type { FC } from 'react'
import type { WeekRef, WeekRefFnc, DayRefFnc } from '../types'

interface WeekProps {
  weekIndex: number
  date: Date
  activeMonth: number
  activeYear: number
  weekdayRefs: WeekRef
  handleKeyDown: WeekRefFnc
}

export const Week: FC<WeekProps> = ({
  weekIndex,
  date,
  activeMonth,
  activeYear,
  weekdayRefs,
  handleKeyDown
}) => {
  const isCurrentWeek = isThisWeek(date)
  const { isCustomMode, isActiveWeekday } = useActiveWeekdays()
  const tabbedDay = useTabbedDate(activeMonth, activeYear)

  const daysOfTheWeek = useMemo(() => {
    const start = startOfWeek(date)

    // Generate all days of the week from the start
    const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))

    return days.filter(weekday => isCustomMode || isActiveWeekday(weekday))
  }, [date, isCustomMode, isActiveWeekday])

  const handleDayKeyDown: DayRefFnc = useCallback((dayIndex, key) => {
    handleKeyDown(weekIndex, dayIndex, key)
  }, [handleKeyDown, weekIndex])

  // Check if at least one day is on-month
  const hasOnMonthDays = useMemo(() =>
    daysOfTheWeek.some(day => !isOffMonth(activeMonth, day)),
  [daysOfTheWeek, activeMonth])

  if (!hasOnMonthDays) {
    // if there are no on-month days then don't render this week
    return null
  }

  return (
    <div
      className={clsx('week', isCurrentWeek && 'week--current')}
      role="row"
    >
      {daysOfTheWeek
        .map((weekday, dayIndex) => <Day
          key={`day-${format(weekday, DATE_FORMATS.dateKey)}`}
          ref={weekdayRefs[dayIndex]}
          dayIndex={dayIndex}
          date={weekday}
          isTabbed={isSameDay(weekday, tabbedDay)}
          isOffMonth={isOffMonth(activeMonth, weekday)}
          isDisabled={!isActiveWeekday(weekday)}
          handKeyDown={handleDayKeyDown}
        />)
      }
    </div>
  )
}
