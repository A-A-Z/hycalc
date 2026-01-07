import { format, DATE_FORMATS } from 'lib/date'
import { useDateFromParams } from 'features/date'

import type { FC } from 'react'
import type { LiveStatusProps } from '../types'

export const LiveStatus: FC<LiveStatusProps> = ({ value, estValue, isEstVisible }) => {
  const [date] = useDateFromParams()
  const dateLabel = format(date, DATE_FORMATS.monthLabelSR)
  return (
    <div
      role="status"
      className="visually-hidden"
      aria-live="polite"
    >
      {`${dateLabel}, ${value} percent on site.`}
      {isEstVisible && `Estimated ${estValue} percent on site.`}
    </div>
  )
}