import { use } from 'react'
import { format, DATE_FORMATS } from 'lib/date'
import { DateRecordsContext } from 'features/records'
import { StatusContext } from 'features/status'
import { MonthSpinbutton } from './MonthSpinbutton'
import { DateLabel } from './DateLabel'
import { Ratio } from './Ratio'
import { LiveStatus } from './LiveStatus'
import '../assets/title.css'

import type { FC } from 'react'

export const Title: FC = () => {
  // Get ratio (day of the week param is not important)
  const { ratio, estRatio, hasPlans } = use(DateRecordsContext)
  const { firstOfTheMonth, isPlanMode } = use(StatusContext)
  const documentTitle = `${format(firstOfTheMonth, DATE_FORMATS.documentTitle)} ${ratio}% - HyCalc`
  const isEstVisible = hasPlans || isPlanMode

  return (
    <div className="title">
      <title>{documentTitle}</title>
      <div className="title__left">
        <MonthSpinbutton />
        <DateLabel />
      </div>
      <Ratio value={ratio} estValue={estRatio} isEstVisible={isEstVisible} />
      <LiveStatus value={ratio} estValue={estRatio} isEstVisible={isEstVisible}  />
    </div>
  )
}
