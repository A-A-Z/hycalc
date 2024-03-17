import { useEffect } from 'react'
import { format, DATE_FORMATS } from 'lib/date'
import { useDateRecords } from 'features/records'
import { Ratio } from './Ratio'
import '../assets/title.css'

interface TitleProps {
  gridId: string
  year: number
  month: number
}

export const Title = ({ gridId, year, month }: TitleProps): JSX.Element => {
  const { ratio } = useDateRecords(1)
  const firstOfTheMonth = new Date(year, (month - 1), 1)

  useEffect(() => {
    document.title = `${format(firstOfTheMonth, DATE_FORMATS.documentTitle)} ${ratio}% - HyCalc`
  }, [month, ratio])

  return (
    <div className="title">
      <h2 id={gridId}>
        <time dateTime={format(firstOfTheMonth, DATE_FORMATS.dateTimeAttrMonth)}>
          <span className="title__month">{format(firstOfTheMonth, DATE_FORMATS.calendarTitleMonth)}</span>
          <span className="title__year">{format(firstOfTheMonth, DATE_FORMATS.calendarTitleYear)}</span>
        </time>
      </h2>
      <Ratio value={ratio} />
    </div>
  )
}
