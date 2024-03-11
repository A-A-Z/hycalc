import { useMemo, useState, useId, forwardRef } from 'react'
import clsx from 'clsx'
import { format, isSameDay, DATE_FORMATS } from 'lib/date'

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

  const isToday = useMemo(() => isSameDay(new Date, date), [date])
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

  return (
    <li className={clsx('day', isOffMonth && 'day--off-month', isToday && 'date--today')} role="gridcell">
      {isOffMonth
        ? (
          /* On month format */
          <button
            ref={ref}
            type="button"
            className={clsx('day__item', 'day__item--btn', isClicked && 'day__item--active')}
            onClick={onClick}
            onKeyDown={onKeyDown}
            tabIndex={isFirstItem ? 0 : -1}
            aria-controls={statusId}
          >
            <time dateTime={format(date, DATE_FORMATS.dateTimeAttr)}>{format(date, DATE_FORMATS.dayCellLabel)}</time>
            <ul id={statusId} role="listbox" className="status" aria-live="polite">
              {statusOptions.map(status => (
                <li
                  key={status}
                  className={`status__option status__option--${status}`}
                  role="option"
                  aria-selected={status === dateStatus}
                  tabIndex={-1}>{STATUS_LABEL[status]}
                </li>
              ))}
            </ul>
            {/* <span className={`day__status day__status--${dateStatus}`}>{STATUS_LABEL[dateStatus]}</span> */}
          </button>
        ) : (
          /* Off month format */
          <span className="day__item day__item--off" >
            <time dateTime={format(date, DATE_FORMATS.dateTimeAttr)}>{format(date, DATE_FORMATS.dayCellLabelOffMonth)}</time>
          </span>
        )}
    </li>
  )
})

Day.displayName = 'Day'

export { Day }

