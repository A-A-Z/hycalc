import type { StatusContextValues } from './types'

export const StatusesInit: StatusContextValues = {
  gridId: 'grid-id',
  month: 1,
  year: 1970,
  firstOfTheMonth: new Date(1970, 0, 1),
  isReadOnly: false,
  isCustomMode: false,
  isPlanMode: false,
  dateCheck: '',
  toggleCustomMode: () => null,
  togglePlanMode: () => null
}
