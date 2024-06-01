import { format } from 'date-fns'

export const isOffMonth = (activeMonth: number, day: Date): boolean => (
  activeMonth.toString() !== format(day, 'M')
)
