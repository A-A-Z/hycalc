import type { Option } from 'features/radio-field'
import type { ResultType, ResultTypeWithTotal, MergeOption } from './types'

export const RESULT_TYPES: ResultType[]  = ['new', 'match', 'conflict'] as const

export const RESULT_TYPE_LABELS: Record<ResultTypeWithTotal, string> = {
  new: 'New entries',
  match: 'Matches',
  conflict: 'Conflicts',
  total: 'Total'
}

export const MERGE_OPTION_LABELS: Record<MergeOption, string> = {
  merge: 'Merge data',
  overwrite: 'Merge data, overwrite old enties',
  keep: 'Merge data, keep old enties',
  flush: 'Delete all old data, add new enties'
}

export const MERGE_OPTIONS: Array<Option<MergeOption>> = [
  { id: 'm1', label: MERGE_OPTION_LABELS.merge, value: 'merge' },
  { id: 'm2', label: MERGE_OPTION_LABELS.overwrite, value: 'overwrite' },
  { id: 'm3', label: MERGE_OPTION_LABELS.keep, value: 'keep' },
  { id: 'm4', label: MERGE_OPTION_LABELS.flush, value: 'flush' }
]
