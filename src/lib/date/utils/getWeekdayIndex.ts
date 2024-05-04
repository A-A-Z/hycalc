import { format } from 'lib/date'

// returns a 0-6 index number of the weekday or a -1 if an error
export const getWeekdayIndex = (date: Date): number => {
  const index = parseInt(format(date, 'e'))
  return isNaN(index) ? -1 : index - 1 
}
