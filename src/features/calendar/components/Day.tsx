import { useMemo, useState } from 'react'
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

const STATUS_LABEL: Record<DateRecordStatus, string>  = {
  none: 'None',
  onsite: 'On Site',
  remote: 'Remote'
}

export const Day = ({ date, isOffMonth }: DayProps): JSX.Element => {
  const dayOfTheMonth = parseInt(format(date, 'd'))
  const [isClicked, setIsClicked] = useState(false)
  const { setDateRecord, dateStatus } = useDateRecords(dayOfTheMonth)

  const isToday = useMemo(() => isSameDay(new Date, date), [date])
  const onClick = () => {
    setDateRecord(dayOfTheMonth, statusIndex[dateStatus])
    setIsClicked(true)
  }

  return (
    <li className={clsx('day', isOffMonth && 'day--off-month', isToday && 'date--today')}>
      {isOffMonth
        ? (
          <button type="button" className={clsx('day__item', 'day__item--btn', isClicked && 'day__item--active')} onClick={onClick}>
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
            <span className={`day__status day__status--${dateStatus}`}>{STATUS_LABEL[dateStatus]}</span>
          </button>
        ) : (
          <span className="day__item day__item--off" >
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
          </span>
        )}
    </li>
  )
}
