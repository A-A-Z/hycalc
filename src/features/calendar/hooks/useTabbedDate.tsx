import { useMemo } from 'react'
import {
  format,
  isOffMonth,
  getDay,
  addDays
} from 'lib/date'
import { useConfig } from 'features/config'

const getFirstVisibleDayOfMonth = (date: Date, weekdays: number[]): Date => {
  let firstDay = date

  while (!weekdays.includes(getDay(firstDay) - 1)) {
    firstDay = addDays(firstDay, 1)
  }

  return firstDay;
}

export const useTabbedDate = (month: number, year: number): Date => {
  const { config: { weekdays } } = useConfig()

  const value = useMemo(() => {
    const today = new Date()
    const todaysWeekdayNo = parseInt(format(today, 'i')) - 1
    const activeDate = new Date(year, month - 1, 1)

    // just in case we make sure there are in fact active weekedays
    if (weekdays.length === 0) {
      return today
    }

    if (!isOffMonth(month, today) && weekdays.includes(todaysWeekdayNo)) {
      // if active month is this month and if today is a visible weekday
      // then return today's date
      return today
    }

    // otherwise retrn the first visible day of the month
    return getFirstVisibleDayOfMonth(activeDate, weekdays)
  }, [month, year, weekdays])

  return value
}
