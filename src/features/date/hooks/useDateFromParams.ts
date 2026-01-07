import { useParams } from 'react-router'
import { parseMonth } from '../utils/parseMonth'
import { parseYear } from '../utils/parseYear'

import type { CalendarViewParams } from '../types'

export const useDateFromParams = (): [Date, number, number] => {
  const {
    month,
    year
  } = useParams<CalendarViewParams>()
  const yearClean = parseYear(year)
  const monthClean = parseMonth(month)
  const dateObj = new Date(yearClean, monthClean - 1, 1)
  return [dateObj, yearClean, monthClean]
}
