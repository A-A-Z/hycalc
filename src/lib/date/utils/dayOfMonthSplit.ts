import { format } from 'date-fns'
import { DATE_FORMATS } from '../const'

export const dayOfMonthSplit = (date: Date): [string, string] => {
  const dayOfMonth = format(date, DATE_FORMATS.dayCellLabel)
  const match = dayOfMonth.match(/([0-9]{1,2})([a-z]{1,2})/)
  if (match === null || match.length !== 3) {
    return ['0', 'xx']
  }
  return [match[1], match[2]]
}
