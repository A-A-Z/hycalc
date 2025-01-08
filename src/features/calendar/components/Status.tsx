import clsx from 'clsx'
import { StatusIcon } from './StatusIcon'
import {
  statusOptions,
  statusLabel,
  statusIndexNormalMap
} from '../constants'
import '../assets/status.css'

import type { FC } from 'react'
import type { DateRecordStatus } from 'features/records'

interface StatusProps {
  id: string
  dateId: string
  dateStatus: DateRecordStatus
  isReadOnly?: boolean
}

export const Status: FC<StatusProps> = ({
  id,
  dateId,
  dateStatus,
  isReadOnly = false
}) => {
  const dateSatusNormal = statusIndexNormalMap[dateStatus]

  if (isReadOnly) {
    return (
      <div className="status">
        <div className={clsx(
            'status__option',
            'status__option--read-only',
            `status__option--${dateSatusNormal}`
        )}>
          <StatusIcon status={dateStatus} />
          <span>{statusLabel[dateSatusNormal]}</span>
        </div>
      </div>
    )
  }

  return (
    <ul
      id={id}
      role="listbox" 
      className="status"
      aria-labelledby={dateId}
      aria-live="polite"
    >
      {statusOptions.map(status => (
        <li
          key={status}
          className={clsx(
            'status__option',
            `status__option--${status}`
        )}
          role="option"
          aria-selected={status === dateSatusNormal}
          tabIndex={-1}
        >
            <StatusIcon status={status} />
            <span>{statusLabel[status]}</span>
        </li>
      ))}
    </ul>
  )
}
