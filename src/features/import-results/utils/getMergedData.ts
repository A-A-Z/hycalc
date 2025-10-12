import { flattenRecords, unflattenRecords } from 'features/records'

import type { DateRecordJson } from 'features/records'
import type { MergeOption } from '../types'

export const getMergedData = (
  currentData: DateRecordJson[],
  importData: DateRecordJson[],
  mergedOption: MergeOption
): DateRecordJson[] => {
  console.log('getMergedData', { currentData })
  // TODO: include config
  // ['config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}']
  if (mergedOption === 'flush') return importData

  const currentDataFlat = flattenRecords(currentData)
  const importDataFlat = flattenRecords(importData)

  const mergedFlat = Object.entries(importDataFlat).reduce((acc, [date, state]) => {
    // keep/merge
    if (mergedOption !== 'overwrite' && acc[date] === undefined) {
      acc[date] = state
    }

    // overwrite
    if (mergedOption === 'overwrite') {
      acc[date] = state
    }
    return acc
  }, currentDataFlat)

  return unflattenRecords(mergedFlat)
}
