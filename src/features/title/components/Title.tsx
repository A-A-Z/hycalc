import { useEffect } from 'react'
import { format, DATE_FORMATS } from 'lib/date'
import { useDateRecords } from 'features/records'
import { useGridStatus } from 'features/status'
import { MonthNav } from './MonthNav'
import { DateLabel } from './DateLabel'
import { Ratio } from './Ratio'
import '../assets/month-nav.css'
import '../assets/title.css'

export const Title = (): JSX.Element => {
  // Get ratio (day of the week param is not important)
  const { ratio } = useDateRecords(1)
  const { firstOfTheMonth } = useGridStatus()

  useEffect(() => {
    // Update document title with current maonth and ratio
    document.title = `${format(firstOfTheMonth, DATE_FORMATS.documentTitle)} ${ratio}% - HyCalc`
  }, [firstOfTheMonth, ratio])

  return (
    <div className="title">
      <div className="title__left">
        <MonthNav />
        <DateLabel />
      </div>
      <Ratio value={ratio} />
    </div>
  )
}
