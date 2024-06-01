import { format, dayOfMonthSplit, DATE_FORMATS } from 'lib/date'

interface DaylabelProps {
  id: string
  date: Date
}

export const DayLabel = ({ id, date }: DaylabelProps): JSX.Element => (
  <time
    id={id}
    dateTime={format(date, DATE_FORMATS.dateTimeAttr)}
  >
    {dayOfMonthSplit(date).map((part: string) => <span key={part}>{part}</span>)}
  </time>
)
