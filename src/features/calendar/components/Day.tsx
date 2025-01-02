import { useState, useId, forwardRef } from 'react'
import { FaBuilding, FaHouse } from 'react-icons/fa6'
import clsx from 'clsx'
import { format, isToday, DATE_FORMATS } from 'lib/date'

import { useDateRecords } from 'features/records'
import { useGridStatus } from 'features/status'
import { DayLabel } from './DayLabel'
import '../assets/day.css'
import '../assets/status.css'

import type { ReactNode, KeyboardEventHandler } from 'react'
import type { DateRecordStatus } from 'features/records'
import type { DayRefFnc } from '../types'

const statusIndex: Record<DateRecordStatus, DateRecordStatus> = {
  none: 'remote',
  remote: 'onsite',
  onsite: 'none'
}

const STATUS_LABEL: Record<DateRecordStatus, string>  = {
  none: 'None',
  onsite: 'On Site',
  remote: 'Remote'
}

interface DayWrapperProps {
  isOffMonth: boolean
  isDayToday: boolean
  dayIndex: number
  children: ReactNode
}

const DayWrapper = ({ isOffMonth, isDayToday, dayIndex, children }: DayWrapperProps): JSX.Element => (
  <div
    className={clsx(
      'day',
      isOffMonth && 'day--off-month',
      isDayToday && 'date--today'
    )}
    role="gridcell"
    aria-colindex={dayIndex + 1}
  >{children}</div>
)

interface DayProps {
  dayIndex: number
  date: Date
  isTabbed: boolean
  isOffMonth: boolean
  isDisabled: boolean
  handKeyDown: DayRefFnc
}

const Day = forwardRef<HTMLButtonElement, DayProps>(({
  dayIndex,
  date,
  isTabbed,
  isOffMonth,
  isDisabled,
  handKeyDown
}, ref) => {
  const dayOfTheMonth = parseInt(format(date, DATE_FORMATS.recordDayOfMonth))
  const [isClicked, setIsClicked] = useState(false)
  const { setDateRecord, dateStatus, isLoaded } = useDateRecords(dayOfTheMonth)
  const dateId = useId()
  const statusId = useId()
  const isDayToday = isToday(date)
  const { isReadOnly } = useGridStatus()

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

  const icons: Record<DateRecordStatus, JSX.Element> = {
    none: <span />,
    remote: <FaHouse aria-hidden={true} />,
    onsite: <FaBuilding aria-hidden={true} />
  }

  if (isOffMonth || !isLoaded) {
    return (
      <DayWrapper isOffMonth={true} isDayToday={isDayToday} dayIndex={dayIndex}>
        <span className={clsx('day__item', 'day__item--off', isDisabled && 'day__item--disabled')} >
          <DayLabel id={dateId} date={date} />
        </span>
      </DayWrapper>
    )
  }

  if (isReadOnly) {
    return (
      <DayWrapper isOffMonth={true} isDayToday={isDayToday} dayIndex={dayIndex}>
        <div className={clsx('day__item', 'day__item--read-only', isDisabled && 'day__item--disabled')}>
          <DayLabel id={dateId} date={date} />
          <div className="status">
            <div className={clsx(
                'status__option',
                'status__option--read-only',
                `status__option--${dateStatus}`
            )}>
              {icons[dateStatus]}{STATUS_LABEL[dateStatus]}
            </div>
          </div>
        </div>
      </DayWrapper>
    )
  }

  return (
    <DayWrapper isOffMonth={false} isDayToday={isDayToday} dayIndex={dayIndex}>
      <button
        ref={ref}
        type="button"
        className={clsx(
          'day__item',
          'day__item--btn',
          isClicked && 'day__item--active',
          isReadOnly && 'day__item--read-only'
        )}
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={isTabbed ? 0 : -1}
        aria-controls={statusId}
      >
        <DayLabel id={dateId} date={date} />
        <ul
          id={statusId}
          role="listbox" 
          className="status"
          aria-labelledby={dateId}
          aria-live="polite"
        >
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
    </DayWrapper>
  )
})

Day.displayName = 'Day'

export { Day }

