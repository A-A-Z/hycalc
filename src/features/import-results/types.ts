import type { DateRecordJson } from 'features/records'

export interface ImportResultsProps {
  data: DateRecordJson[]
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

export interface MergeConfirmProps {
  selectedMergeOption: MergeOption
  onConfirm: () => void
  onBack: () => void
}
