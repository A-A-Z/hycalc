import type { DateRecordEntry } from 'features/records'

export interface ImportResultsProps {
  data: DateRecordEntry[]
}

export type ResultType = 'new' | 'match' | 'conflict'
export type ResultTypeWithTotal = ResultType | 'total'

export type ImportResult = Record<ResultType, number>

export type MergeOption = 'merge' | 'overwrite' | 'keep' | 'flush'

export interface ResultGroupProps {
  groupType: ResultType
  count: number
  isCapped: boolean
}

export interface ResultCellProp {
  groupType: ResultType
  isLastCap: boolean
}
