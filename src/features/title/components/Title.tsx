import { useEffect } from 'react'
import { format, DATE_FORMATS } from 'lib/date'
import { useDateRecords } from 'features/records'
import { useGridStatus } from 'features/status'
import { MonthSpinbutton } from './MonthSpinbutton'
import { DateLabel } from './DateLabel'
import { Ratio } from './Ratio'
import '../assets/title.css'

export const Title = (): JSX.Element => {
  // Get ratio (day of the week param is not important)
  const { ratio, estRatio, hasPlans } = useDateRecords(1)
  const { firstOfTheMonth, isPlanMode } = useGridStatus()

  useEffect(() => {
    // Update document title with current maonth and ratio
    document.title = `${format(firstOfTheMonth, DATE_FORMATS.documentTitle)} ${ratio}% - HyCalc`
  }, [firstOfTheMonth, ratio])

  return (
    <div className="title">
      <div className="title__left">
        <MonthSpinbutton />
        <DateLabel />
      </div>
      <Ratio value={ratio} estValue={estRatio} isEstVisible={hasPlans || isPlanMode} />
    </div>
  )
}
