import { useCallback } from 'react'
import { getWeekdayIndex } from 'lib/date'
import { useGridStatus } from 'features/status'
import { useConfig } from 'features/config'

type IsActiveWeekdayFn = (day: Date) => boolean

interface useActiveWeekdaysValues {
  isCustomMode: boolean
  isActiveWeekday: IsActiveWeekdayFn
}

export const useActiveWeekdays = (): useActiveWeekdaysValues => {
  const { isCustomMode } = useGridStatus()
  const { config: { weekdays } } = useConfig()

  const isActiveWeekday: IsActiveWeekdayFn = useCallback(day => {
    const weekdayNumber = getWeekdayIndex(day)
    return weekdays.some(day => day === weekdayNumber)
  }, [isCustomMode, weekdays])

  return {
    isCustomMode,
    isActiveWeekday
  }
}
