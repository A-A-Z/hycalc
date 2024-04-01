import { memo } from 'react'
import { format, startOfWeek, addDays, DATE_FORMATS } from 'lib/date'
import '../assets/weekdayHeading.css'

const HeadingsSrc = (): JSX.Element => {
  const start = startOfWeek(new Date)
  const days = Array.from({ length: 7 }).map((_, index) => addDays(start, index))
  return (
    <div className="week week--header" role="row">
      {days.map((headerDate, colIndex) => (
        <div
          key={format(headerDate, DATE_FORMATS.weekdayAbbr)}
          className="weekday-heading"
          role="columnheader"
          aria-colindex={colIndex + 1}
        >
          <abbr title={format(headerDate, DATE_FORMATS.weekdayFull)}>{format(headerDate, DATE_FORMATS.weekdayAbbr)}</abbr>
        </div>)
      )}
    </div>
  )
}

export const Headings = memo(HeadingsSrc) 
