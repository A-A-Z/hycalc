import { useMemo, useRef, useCallback, createRef } from 'react'
import { format, startOfWeek, endOfMonth, addWeeks } from 'date-fns'
import { setDefaultOptions } from 'date-fns/setDefaultOptions'
import { enAU } from 'date-fns/locale'

import { Week } from './Week'
import { Headings } from './Headings'
import '../assets/calendar.css'

import type { weekRef, dayRef, WeekRefFnc } from '../types'

interface CalendarProps {
  id: string
  year: number
  month: number
}

export const Calendar = ({ id, year, month }: CalendarProps): JSX.Element => {
  const dayRefs = useRef<weekRef[]>([])
  setDefaultOptions({ locale: enAU, weekStartsOn: 1 }) // TODO: move
  const firstOfTheMonth = new Date(year, (month - 1), 1)

  const weeks = useMemo(() => {
    const lastDayOfMonth = endOfMonth(firstOfTheMonth)
    let currentWeekStart = startOfWeek(firstOfTheMonth)
    const weeks = []

    while (currentWeekStart <= lastDayOfMonth) {
      weeks.push(currentWeekStart)
      currentWeekStart = addWeeks(currentWeekStart, 1)
      const weekdayRefs = Array.from({ length: 7 }, (): dayRef => createRef<HTMLButtonElement>())
      dayRefs.current.push(weekdayRefs)
    }

    return weeks
  }, [firstOfTheMonth])

  const handleKeyDown: WeekRefFnc = useCallback((weekIndex, dayIndex, key) => {
    // console.log('keydown', dayRefs.current[weekIndex][dayIndex], key)
    let newWeekIndex = weekIndex
    let newDatIndex = dayIndex

    switch(key) {
      case 'ArrowUp':
        newWeekIndex--
        break

      case 'ArrowRight':
        newDatIndex++
        break

      case 'ArrowDown':
        newWeekIndex++
        break

      case 'ArrowLeft':
        newDatIndex--
        break  
    }

    if (dayRefs.current?.[newWeekIndex]?.[newDatIndex] === undefined) {
      return
    }

    // console.log('new ref', dayRefs.current[newWeekIndex][newDatIndex])
    dayRefs.current[newWeekIndex][newDatIndex].current?.focus()
  }, [dayRefs])

  return (
    <>
      <ol className="calendar" aria-labelledby={id} role="grid">
        <Headings />
        {weeks.map((week, weekIndex) => {
          return (
            <Week
              key={`week-${format(week, 'yyyy-MM-dd')}`}
              weekIndex={weekIndex}
              date={week}
              activeMonth={month}
              weekdayRefs={dayRefs.current[weekIndex]}
              handleKeyDown={handleKeyDown}
            />
          )
        })}
      </ol>
    </>
  )
}
// ref([week][day])