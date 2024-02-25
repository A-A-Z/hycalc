import { useMemo } from 'react'
import { format, startOfWeek, endOfMonth, addWeeks } from 'date-fns'
import { setDefaultOptions } from 'date-fns/setDefaultOptions'
import { enAU } from 'date-fns/locale'

import { Week } from './Week'
import '../assets/calendar.css'

interface CalendarProps {
  year: number
  month: number
}

export const Calendar = ({ year, month }: CalendarProps): JSX.Element => {
  setDefaultOptions({ locale: enAU, weekStartsOn: 1 }) // TODO: move
  const firstOfTheMonth = new Date(year, (month - 1), 1)

  const weeks = useMemo(() => {
    const lastDayOfMonth = endOfMonth(firstOfTheMonth)
    let currentWeekStart = startOfWeek(firstOfTheMonth)
    const weeks = []

    while (currentWeekStart <= lastDayOfMonth) {
      weeks.push(currentWeekStart)
      currentWeekStart = addWeeks(currentWeekStart, 1)
    }

    return weeks
  }, [firstOfTheMonth])

  return (
    <div className="calendar" role="grid">
      {weeks.map(week => <Week key={`week-${format(week, 'yyyy-MM-dd')}`} date={week} activeMonth={month} />)}
    </div>
  )
}