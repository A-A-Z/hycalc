import { useState, useId, use } from 'react'
import clsx from 'clsx'
import { format, isToday, isPast, DATE_FORMATS } from 'lib/date'

import { useDateRecords } from 'features/records'
import { StatusContext } from 'features/status'
import { DayLabel } from './DayLabel'
import { DayPlan } from './DayPlan'
import { Status } from './Status'
import {
  statusIndexNormalMap,
  statusIndexNormalForward,
  statusIndexNormalBack,
  statusIndexPlanForward,
  statusIndexPlanBack
} from '../constants'
import '../assets/day.css'

import type { FC, Ref, ReactNode, KeyboardEventHandler, MouseEventHandler } from 'react'
import type { DayRefFnc } from '../types'

interface DayWrapperProps {
  isOffMonth: boolean
  isDayToday: boolean
  dayIndex: number
  children: ReactNode
}

const DayWrapper: FC<DayWrapperProps> = ({ isOffMonth, isDayToday, dayIndex, children }) => (
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
  handKeyDown: DayRefFnc,
  ref?: Ref<HTMLButtonElement>
}

export const Day: FC<DayProps> = ({
  dayIndex,
  date,
  isTabbed,
  isOffMonth,
  isDisabled,
  handKeyDown,
  ref
}) => {
  const dayOfTheMonth = parseInt(format(date, DATE_FORMATS.recordDayOfMonth))
  const [isClicked, setIsClicked] = useState(false)
  const { setDateRecord, dateStatus, dateStatusNormal, isLoaded } = useDateRecords(dayOfTheMonth)
  const { isReadOnly, isPlanMode } = use(StatusContext)
  const dateId = useId()
  const statusId = dateId + '-status'
  const planId = date + '-plan'
  const isDayToday = isToday(date)

  const handleChangeStatus: MouseEventHandler<HTMLButtonElement> = e => {
    setIsClicked(true)

    // if alt or ctrl key pressed: clear the status on day
    if (e.altKey || e.ctrlKey) {
      e.preventDefault()
      setDateRecord(dayOfTheMonth, 'none')
      return
    }

    // toggle forward on click/enter/space or toggle back if holder shift key
    setDateRecord(dayOfTheMonth, e.shiftKey ? statusIndexNormalBack[dateStatus] : statusIndexNormalForward[dateStatus])
  }

  const handleChangePlan: MouseEventHandler<HTMLButtonElement> = e => {
    setIsClicked(true)

    setDateRecord(dayOfTheMonth, e.shiftKey ? statusIndexPlanBack[dateStatus] : statusIndexPlanForward[dateStatus])
  }

  const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = e => {
    handKeyDown(dayIndex, e.key)
  }

  /******* Day format: off-month *******/
  if (isOffMonth || !isLoaded || (isPlanMode && isPast(date) && !isToday(date))) {
    return (
      <DayWrapper isOffMonth={true} isDayToday={isDayToday} dayIndex={dayIndex}>
        <span className={clsx('day__item', 'day__item--off', isDisabled && 'day__item--disabled')} >
          <DayLabel id={dateId} date={date} />
        </span>
      </DayWrapper>
    )
  }

  /*******  Day format: read-only *******/
  if (isReadOnly || isPlanMode && statusIndexNormalMap[dateStatus] !== 'none') {
    return (
      <DayWrapper isOffMonth={true} isDayToday={isDayToday} dayIndex={dayIndex}>
        <div className={clsx('day__item', 'day__item--read-only', isDisabled && 'day__item--disabled')}>
          <DayLabel id={dateId} date={date} />
          <Status id={statusId} dateId={dateId} dateStatus={dateStatus} isReadOnly />
        </div>
      </DayWrapper>
    )
  }

  /*******  Day format: plan mode *******/
  if (isPlanMode) {
    return (
      <DayWrapper isOffMonth={true} isDayToday={isDayToday} dayIndex={dayIndex}>
        <button
          ref={ref}
          type="button"
          className={clsx(
            'day__item',
            'day__item--btn',
            isClicked && 'day__item--active',
            isReadOnly && 'day__item--read-only'
          )}
          onClick={handleChangePlan}
          onKeyDown={onKeyDown}
          tabIndex={isTabbed ? 0 : -1}
          aria-controls={planId}
        >
          <DayPlan id={planId} dateStatus={dateStatus} />
          <DayLabel id={dateId} date={date} />
          <Status id={statusId} dateId={dateId} dateStatus="none" isReadOnly />
        </button>
      </DayWrapper>
    )
  }

  /*******  Day format: normal *******/
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
        onClick={handleChangeStatus}
        onKeyDown={onKeyDown}
        tabIndex={isTabbed ? 0 : -1}
        aria-controls={statusId}
      >
        {(dateStatusNormal === 'none' && (!isPast(date) || isToday(date))) && <DayPlan id={planId} dateStatus={dateStatus} />}
        <DayLabel id={dateId} date={date} />
        <Status id={statusId} dateId={dateId} dateStatus={dateStatus} />
      </button>
    </DayWrapper>
  )
}

