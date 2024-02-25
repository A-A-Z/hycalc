import { useMemo } from 'react'
import clsx from 'clsx'
import { format, isSameDay } from 'date-fns'
import '../assets/day.css'

interface DayProps {
  date: Date
  isOffMonth: boolean
}

export const Day = ({ date, isOffMonth }: DayProps): JSX.Element => {
  const isToday = useMemo(() => isSameDay(new Date, date), [date])
  return (
    <li className={clsx('day', isOffMonth && 'day--off-month', isToday && 'date--today')}>
      {isOffMonth
        ? (
          <button type="button" className="day__btn">
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
          </button>
        ) : (
          <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
        )}
    </li>
  )
}
