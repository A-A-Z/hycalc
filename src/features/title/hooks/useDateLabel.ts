import { useRef, useEffect } from 'react'
import { format, isBefore, isAfter, DATE_FORMATS } from 'lib/date'
import { useDateFromParams } from 'features/date'

import type { UseDateLabelReturn, ChangeDirection } from '../types'

export const useDateLabel = (): UseDateLabelReturn => {
  const [activeDate] = useDateFromParams()
  const lastDate = useRef(activeDate)

  useEffect(() => {
    lastDate.current = activeDate
  }, [activeDate])

  const thisMonth = format(activeDate, DATE_FORMATS.calendarTitleMonth)
  const lastMonth = format(lastDate.current, DATE_FORMATS.calendarTitleMonth)

  let direction: ChangeDirection = 'none'
  if (isBefore(activeDate, lastDate.current)) {
    direction = 'back'
  }
  if (isAfter(activeDate, lastDate.current)) {
    direction = 'forward'
  }

  return {
    thisMonth,
    lastMonth,
    datetime: format(activeDate, DATE_FORMATS.dateTimeAttrMonth),
    yearLabel: format(activeDate, DATE_FORMATS.calendarTitleYear),
    direction
  }
}
