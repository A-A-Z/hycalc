import type { StatusContextValues } from './types'

export const StatusesInit: StatusContextValues = {
  gridId: 'grid-id',
  month: 1,
  year: 1970,
  monthOffset: 0,
  firstOfTheMonth: new Date(1970, 0, 1),
  direcction: 'none',
  isReadOnly: false,
  isCustomMode: false,
  isPlanMode: false,
  dateCheck: '',
  setMonthOffset: () => {},
  navMonthBack: () => {},
  navMonthForward: () => {},
  toggleCustomMode: () => null,
  togglePlanMode: () => null
}
