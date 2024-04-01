import { useMemo, useCallback } from 'react'
import clsx from 'clsx'
import { format, startOfWeek, addDays, isFirstDayOfMonth, isOffMonth, isThisWeek, DATE_FORMATS } from 'lib/date'

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

  const daysOfTheWeek = useMemo(() => {
    const start = startOfWeek(date)

    // Generate all days of the week from the start
    const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))

    return days
  }, [date])

  const handleDayKeyDown: DayRefFnc = useCallback((dayIndex, key) => {
    handleKeyDown(weekIndex, dayIndex, key)
  }, [])

  return (
    <div className={clsx('week', isCurrentWeek && 'week--current')} role="row">
      {daysOfTheWeek.map((weekday, dayIndex) => <Day
        ref={weekdayRefs[dayIndex]}
        key={format(weekday, DATE_FORMATS.dateKey)}
        dayIndex={dayIndex}
        isFirstItem={isFirstDayOfMonth(weekday)}
        date={weekday}
        isOffMonth={isOffMonth(activeMonth, weekday)}
        handKeyDown={handleDayKeyDown}
      />)}
    </div>
  )
}
