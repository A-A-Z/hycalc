import { useCallback } from 'react'
import { getWeekdayIndex } from 'lib/date'
import { useGridStatus } from 'features/status'
import { useConfig } from 'features/config'

type IsActiveWeekdayFn = (day: Date) => boolean 

export const useActiveWeekdays = (): IsActiveWeekdayFn => {
  const { status: { isCustomMode } } = useGridStatus()
  const { config: { weekdays } } = useConfig()

  const isActiveWeekday: IsActiveWeekdayFn = useCallback(day => {
    const weekdayNumber = getWeekdayIndex(day)

    return isCustomMode
      ? true
      : weekdays.some(day => day === weekdayNumber)

  }, [isCustomMode, weekdays])

  return isActiveWeekday
}
