import { useMemo } from 'react'
import { format, startOfWeek, addDays } from 'date-fns'

import { Day } from './Day'

interface WeekProps {
  date: Date
  activeMonth: number
}

export const Week = ({ date, activeMonth }: WeekProps): JSX.Element => {
  const daysOfTheWeek = useMemo(() => {
    const start = startOfWeek(date)

    // Generate all days of the week from the start
    const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))

    return days
  }, [date])

  return (
    <>
      {daysOfTheWeek.map(weekday => <Day key={format(weekday, 'yyyy-MM-dd')} date={weekday} isOffMonth={activeMonth.toString() === format(weekday, 'M')} />)}
    </>
  )
}
