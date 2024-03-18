import { useState, useId, forwardRef } from 'react'
import { FaBuilding, FaHouse } from 'react-icons/fa6'
import clsx from 'clsx'
import { format, isToday, isThisMonth, dayOfMonthSplit, DATE_FORMATS } from 'lib/date'

import { useDateRecords } from 'features/records'
import '../assets/day.css'
import '../assets/status.css'

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
  const dayOfTheMonth = parseInt(format(date, DATE_FORMATS.recordDayOfMonth))
  const [isClicked, setIsClicked] = useState(false)
  const { setDateRecord, dateStatus } = useDateRecords(dayOfTheMonth)

  const onClick = () => {
    setDateRecord(dayOfTheMonth, statusIndex[dateStatus])
    setIsClicked(true)
  }

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
    handKeyDown(dayIndex, e.key)
  }

  const statusOptions: DateRecordStatus[] = [
    'none', 'remote', 'onsite'
  ]

  const statusId = useId()
  
  const isDayToday = isToday(date)
  const isDayThisMonth = isThisMonth(date)
  // day is tabIndexed if is today or if an off month then is first item
  const isTabbed = isDayToday || (!isDayThisMonth && isFirstItem)

  const icons: Record<DateRecordStatus, JSX.Element> = {
    none: <span />,
    remote: <FaHouse aria-hidden={true} />,
    onsite: <FaBuilding aria-hidden={true} />
  }

  return (
    <li className={clsx('day', isOffMonth && 'day--off-month', isDayToday && 'date--today')} role="gridcell">
      {isOffMonth
        ? (
          /* On month format */
          <button
            ref={ref}
            type="button"
            className={clsx('day__item', 'day__item--btn', isClicked && 'day__item--active')}
            onClick={onClick}
            onKeyDown={onKeyDown}
            tabIndex={isTabbed ? 0 : -1}
            aria-controls={statusId}
          >
            <time dateTime={format(date, DATE_FORMATS.dateTimeAttr)}>
              {dayOfMonthSplit(date).map((part: string) => <span key={part}>{part}</span>)}
            </time>
            <ul id={statusId} role="listbox" className="status" aria-live="polite">
              {statusOptions.map(status => (
                <li
                  key={status}
                  className={`status__option status__option--${status}`}
                  role="option"
                  aria-selected={status === dateStatus}
                  tabIndex={-1}
                >
                    {icons[status]}{STATUS_LABEL[status]}
                </li>
              ))}
            </ul>
          </button>
        ) : (
          /* Off month format */
          <span className="day__item day__item--off" >
            <time dateTime={format(date, DATE_FORMATS.dateTimeAttr)}>
              {dayOfMonthSplit(date).map((part: string) => <span key={part}>{part}</span>)}
            </time>
          </span>
        )}
    </li>
  )
})

Day.displayName = 'Day'

export { Day }

