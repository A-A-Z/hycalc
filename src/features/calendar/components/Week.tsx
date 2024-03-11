import { useMemo, useCallback } from 'react'
import { format, startOfWeek, addDays, isFirstDayOfMonth, isOffMonth, DATE_FORMATS } from 'lib/date'

import { Day } from './Day'

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
    <>
      {daysOfTheWeek.map((weekday, dayIndex) => <Day
        ref={weekdayRefs[dayIndex]}
        key={format(weekday, DATE_FORMATS.dateKey)}
        dayIndex={dayIndex}
        isFirstItem={isFirstDayOfMonth(weekday)}
        date={weekday}
        isOffMonth={isOffMonth(activeMonth, weekday)}
        handKeyDown={handleDayKeyDown}
      />)}
    </>
  )
}
