import { format, dayOfMonthSplit, DATE_FORMATS } from 'lib/date'

import type { FC } from 'react'

interface DaylabelProps {
  id: string
  date: Date
}

export const DayLabel: FC<DaylabelProps> = ({ id, date }) => (
  <time
    id={id}
    dateTime={format(date, DATE_FORMATS.dateTimeAttr)}
  >
    {dayOfMonthSplit(date).map((part: string) => <span key={part}>{part}</span>)}
  </time>
)
