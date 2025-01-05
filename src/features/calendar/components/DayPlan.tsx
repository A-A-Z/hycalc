import clsx from 'clsx'
import { StatusIcon } from './StatusIcon'
import { statusIndexPlanMap } from '../constants'

import type { FC } from 'react'
import type { DateRecordStatus } from 'features/records'


interface DayPlanProps {
  dateStatus: DateRecordStatus
}

// TODO: screen reader
export const DayPlan: FC<DayPlanProps> = ({ dateStatus }) => {
  return (
    <ul className={clsx('plan', `plan--${statusIndexPlanMap[dateStatus]}`)}>
      <li className="plan__status plan__status--remote"><StatusIcon status="remote" /></li>
      <li className="plan__status plan__status--onsite"><StatusIcon status="onsite" /></li>
    </ul>
  )
}
