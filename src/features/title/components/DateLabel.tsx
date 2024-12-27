import clsx from 'clsx'
import { format, addMonths, DATE_FORMATS } from 'lib/date'
import { useGridStatus } from 'features/status'

import type { ChangeDirection } from 'global/types'

export const DateLabel = (): JSX.Element => {
  const {
    gridId,
    firstOfTheMonth,
    direcction,
  } = useGridStatus()
  const DirectionMap: Record<ChangeDirection, number> = {
    back: 1,
    forward: -1,
    none: 0
  }
  const thisMonth = format(firstOfTheMonth, DATE_FORMATS.calendarTitleMonth)
  const lastMonth = format(addMonths(firstOfTheMonth, DirectionMap[direcction]), DATE_FORMATS.calendarTitleMonth)
  return (
    <h2 id={gridId}>
      <time dateTime={format(firstOfTheMonth, DATE_FORMATS.dateTimeAttrMonth)}>
        <span className={clsx('title__label', 'title__label--month', `title__label--${direcction}`)}>
          <span className="title__label-offset" key={`month-${thisMonth}`}>
            <span>{thisMonth}</span>
            <span aria-hidden="true">{lastMonth}</span>
          </span>
        </span>
        <span className={clsx('title__label', 'title__label--year', `title__label--${direcction}`)}>
          {format(firstOfTheMonth, DATE_FORMATS.calendarTitleYear)}
        </span>
      </time>
    </h2>
  )
}