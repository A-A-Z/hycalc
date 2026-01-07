import { format, dayOfMonthSplit, DATE_FORMATS } from 'lib/date'

import type { FC } from 'react'

interface DaylabelProps {
  id: string
  date: Date
}

export const DayLabel: FC<DaylabelProps> = ({ id, date }) => {
  const dateTime = format(date, DATE_FORMATS.dateTimeAttr)
  const dateLabel = format(date, DATE_FORMATS.dayCellLabelSR)
  const daySplit = dayOfMonthSplit(date)
  return (
    <time
      id={id}
      dateTime={dateTime}
      aria-label={dateLabel}
    >
      {daySplit.map(part => <span key={part}>{part}</span>)}
    </time>
  )
}
