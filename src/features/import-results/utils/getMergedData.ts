import { flattenRecords } from 'features/records'

import type { DateRecordJson } from 'features/records'
import type { MergeOption } from '../types'

export const getMergedData = (
  currentData: DateRecordJson[],
  importData: DateRecordJson[],
  mergedOption: MergeOption
): DateRecordJson[] => {
  // console.log({ currentData, importData, mergedOption })
  // TODO: include config
  if (mergedOption === 'flush') return importData

  const currentDataFlat = flattenRecords(currentData)
  const importDataFlat = flattenRecords(importData)

  console.log({ currentDataFlat, importDataFlat })

  const mergedFlat = Object.entries(importDataFlat).reduce((acc, [date, state]) => {
    console.log('reduce', { date, state, acc: acc[date] })
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

  console.log('mergedFlat', mergedFlat)

  return importData
}
