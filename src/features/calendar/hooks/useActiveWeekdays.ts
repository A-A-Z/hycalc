import { useCallback, use } from 'react'
import { getWeekdayIndex } from 'lib/date'
import { StatusContext } from 'features/status'
import { ConfigContext } from 'features/config'

type IsActiveWeekdayFn = (day: Date) => boolean

interface useActiveWeekdaysValues {
  isCustomMode: boolean
  isActiveWeekday: IsActiveWeekdayFn
}

export const useActiveWeekdays = (): useActiveWeekdaysValues => {
  const { isCustomMode } = use(StatusContext)
  const { config: { weekdays } } = use(ConfigContext)

  const isActiveWeekday: IsActiveWeekdayFn = useCallback(day => {
    const weekdayNumber = getWeekdayIndex(day)
    return weekdays.some(day => day === weekdayNumber)
  }, [weekdays])

  return {
    isCustomMode,
    isActiveWeekday
  }
}
