import clsx from 'clsx'
import { StatusIcon } from './StatusIcon'
import { statusIndexPlanMap } from '../constants'

import type { FC } from 'react'
import type { DateRecordStatus } from 'features/records'


interface DayPlanProps {
  id: string
  dateStatus: DateRecordStatus
}

export const DayPlan: FC<DayPlanProps> = ({ id, dateStatus }) => {
  return (
    <ul
      id={id}
      role="listbox"
      className={clsx('plan', `plan--${statusIndexPlanMap[dateStatus]}`)}
      aria-label={`Planned status`}
      aria-live="polite"
    >
      <li
        className="plan__status plan__status--remote"
        role="option"
        aria-selected={dateStatus === 'p-remote'}
      >
        <StatusIcon status="remote" />
        <span className="visually-hidden">Remote</span>
      </li>
      <li
        className="plan__status plan__status--onsite"
        role="option"
        aria-selected={dateStatus === 'p-onsite'}
      >
        <StatusIcon status="onsite" />
        <span className="visually-hidden">On site</span>
      </li>
    </ul>
  )
}
