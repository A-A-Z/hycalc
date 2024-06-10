import { useMemo, useCallback } from 'react'
import clsx from 'clsx'
import {
  format,
  startOfWeek,
  addDays,
  isFirstDayOfMonth,
  isOffMonth,
  isThisWeek,
  DATE_FORMATS
} from 'lib/date'
import { useActiveWeekdays } from '../hooks/useActiveWeekdays'
import { Day } from './Day'
import '../assets/week.css'

import type { WeekRef, WeekRefFnc, DayRefFnc } from '../types'

interface WeekProps {
  weekIndex: number
  date: Date
  activeMonth: number
  weekdayRefs: WeekRef
  handleKeyDown: WeekRefFnc
}

export const Week = ({
  weekIndex,
  date,
  activeMonth,
  weekdayRefs,
  handleKeyDown
}: WeekProps): JSX.Element => {
  const isCurrentWeek = isThisWeek(date)
  const { isCustomMode, isActiveWeekday } = useActiveWeekdays()

  const daysOfTheWeek = useMemo(() => {
    const start = startOfWeek(date)

    // Generate all days of the week from the start
    const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))

    return days.filter(weekday => isCustomMode || isActiveWeekday(weekday))
  }, [date, isCustomMode])

  const handleDayKeyDown: DayRefFnc = useCallback((dayIndex, key) => {
    handleKeyDown(weekIndex, dayIndex, key)
  }, [handleKeyDown])

  return (
    <div className={clsx('week', isCurrentWeek && 'week--current')} role="row">
      {daysOfTheWeek
        .map((weekday, dayIndex) => <Day
          ref={weekdayRefs[dayIndex]}
          key={format(weekday, DATE_FORMATS.dateKey)}
          dayIndex={dayIndex}
          isFirstItem={isFirstDayOfMonth(weekday)}
          date={weekday}
          isOffMonth={isOffMonth(activeMonth, weekday)}
          isDisabled={!isActiveWeekday(weekday)}
          handKeyDown={handleDayKeyDown}
        />)
      }
    </div>
  )
}
