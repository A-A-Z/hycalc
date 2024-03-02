import { useMemo } from 'react'
import clsx from 'clsx'
import { format, isSameDay } from 'date-fns'

import { useDateRecords } from 'features/records'
import '../assets/day.css'

import type { DateRecordStatus } from 'features/records'

const statusIndex: Record<DateRecordStatus, DateRecordStatus> = {
  none: 'remote',
  remote: 'onsite',
  onsite: 'none'
}

interface DayProps {
  date: Date
  isOffMonth: boolean
}

export const Day = ({ date, isOffMonth }: DayProps): JSX.Element => {
  const dayOfTheMonth = parseInt(format(date, 'd'))
  const { setDateRecord, dateStatus } = useDateRecords(dayOfTheMonth)

  const isToday = useMemo(() => isSameDay(new Date, date), [date])
  const onClick = () => { setDateRecord(dayOfTheMonth, statusIndex[dateStatus]) }

  return (
    <li className={clsx('day', isOffMonth && 'day--off-month', isToday && 'date--today')}>
      {isOffMonth
        ? (
          <button type="button" className="day__item day__item--btn" onClick={onClick}>
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
            <span>{dateStatus}</span>
          </button>
        ) : (
          <span className="day__item day__item--off" >
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
          </span>
        )}
    </li>
  )
}
