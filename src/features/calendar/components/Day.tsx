import { useMemo, useState, forwardRef } from 'react'
import clsx from 'clsx'
import { format, isSameDay } from 'date-fns'

import { useDateRecords } from 'features/records'
import '../assets/day.css'

import type { KeyboardEventHandler } from 'react'
import type { DateRecordStatus } from 'features/records'
import type { DayRefFnc } from '../types'

const statusIndex: Record<DateRecordStatus, DateRecordStatus> = {
  none: 'remote',
  remote: 'onsite',
  onsite: 'none'
}

interface DayProps {
  dayIndex: number
  isFirstItem: boolean
  date: Date
  isOffMonth: boolean
  handKeyDown: DayRefFnc
}

const STATUS_LABEL: Record<DateRecordStatus, string>  = {
  none: 'None',
  onsite: 'On Site',
  remote: 'Remote'
}

// export const Day =  ({ date, isOffMonth }: DayProps): JSX.Element => {
const Day = forwardRef<HTMLButtonElement, DayProps>(({
  dayIndex,
  isFirstItem,
  date,
  isOffMonth,
  handKeyDown
}, ref) => {
  const dayOfTheMonth = parseInt(format(date, 'd'))
  const [isClicked, setIsClicked] = useState(false)
  const { setDateRecord, dateStatus } = useDateRecords(dayOfTheMonth)

  const isToday = useMemo(() => isSameDay(new Date, date), [date])
  const onClick = () => {
    setDateRecord(dayOfTheMonth, statusIndex[dateStatus])
    setIsClicked(true)
  }

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
    // const { key } = e
    handKeyDown(dayIndex, e.key)

    // switch(key) {
    //   case 'ArrowUp':
    //     console.log('up')
    //     break

    //   case 'ArrowRight':
    //     console.log('right')
    //     break

    //   case 'ArrowDown':
    //     console.log('down')
    //     break

    //   case 'ArrowLeft':
    //     console.log('left')
    //     break  
    // }
  }

  const statusOptions: DateRecordStatus[] = [
    'none', 'remote', 'onsite'
  ]

  return (
    <li className={clsx('day', isOffMonth && 'day--off-month', isToday && 'date--today')}>
      {isOffMonth
        ? (
          <button
            ref={ref}
            type="button"
            className={clsx('day__item', 'day__item--btn', isClicked && 'day__item--active')}
            onClick={onClick}
            onKeyDown={onKeyDown}
            tabIndex={isFirstItem ? 0 : -1}
          >
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
            <ul role="listbox">
              {statusOptions.map(status => (
                <li key={status} role="option" aria-selected={status === dateStatus}>{STATUS_LABEL[status]}</li>)
              )}
            </ul>
            <span className={`day__status day__status--${dateStatus}`}>{STATUS_LABEL[dateStatus]}</span>
          </button>
        ) : (
          <span className="day__item day__item--off" >
            <time dateTime={format(date, 'yyyy-MM-dd')}>{format(date, 'dd')}</time>
          </span>
        )}
    </li>
  )
})

Day.displayName = 'Day'

export { Day }

