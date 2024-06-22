import { useEffect, useCallback } from 'react'
import { format, DATE_FORMATS } from 'lib/date'
import { useDateRecords } from 'features/records'
import { useGridStatus } from 'features/status'
import { Ratio } from './Ratio'
import '../assets/title.css'

import type { Dispatch, SetStateAction } from 'react'

interface TitleProps {
  gridId: string
  year: number
  month: number
  setMonthOffset: Dispatch<SetStateAction<number>>
}

export const Title = ({ gridId, year, month, setMonthOffset }: TitleProps): JSX.Element => {
  // Get ratio (day of the week param is not important)
  const { ratio } = useDateRecords(1)
  const { status: { isReadOnly } } = useGridStatus()
  const firstOfTheMonth = new Date(year, (month - 1), 1)

  const navMonthBack = useCallback(() => {
    setMonthOffset(oldValue => oldValue + 1)
  }, [setMonthOffset])

  const navMonthForward = useCallback(() => {
    setMonthOffset(oldValue => oldValue - 1)
  }, [setMonthOffset])

  useEffect(() => {
    // Update document title with current maonth and ratio
    document.title = `${format(firstOfTheMonth, DATE_FORMATS.documentTitle)} ${ratio}% - HyCalc`
  }, [month, ratio])

  return (
    <div className="title">
      <h2 id={gridId}>
        <button onClick={navMonthBack} disabled={isReadOnly}>--</button>
        <button onClick={navMonthForward} disabled={isReadOnly}>++</button>
        <time dateTime={format(firstOfTheMonth, DATE_FORMATS.dateTimeAttrMonth)}>
          <span className="title__month">{format(firstOfTheMonth, DATE_FORMATS.calendarTitleMonth)}</span>
          <span className="title__year">{format(firstOfTheMonth, DATE_FORMATS.calendarTitleYear)}</span>
        </time>
      </h2>
      <Ratio value={ratio} />
    </div>
  )
}
