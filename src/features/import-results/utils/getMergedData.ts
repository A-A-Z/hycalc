import { flattenRecords, unflattenRecords } from 'features/records'

import type { DateRecordJson } from 'features/records'
import type { MergeOption } from '../types'

export const getMergedData = (
  currentData: DateRecordJson[],
  importData: DateRecordJson[],
  mergedOption: MergeOption
): DateRecordJson[] => {
  // break off the config data for later
  const configEntry = currentData.find(([index]) => index === 'config' )

  // if flush then just use the import data
  if (mergedOption === 'flush') {
    return configEntry === undefined ? importData : [configEntry, ...importData]
  }

  // flatten all data
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

  // unflatten and return merged data
  const mergedData = unflattenRecords(mergedFlat)
  return configEntry === undefined ? mergedData : [configEntry, ...mergedData]
}
