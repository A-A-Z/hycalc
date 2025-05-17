import type { ResultType, ResultTypeWithTotal } from './types'

export const RESULT_TYPES: ResultType[]  = ['new', 'match', 'conflict']

export const RESULT_TYPE_LABELS: Record<ResultTypeWithTotal, string> = {
  new: 'New entries',
  match: 'Matches',
  conflict: 'Conflicts',
  total: 'Total'
}
