import type { DateRecordEntryFlat, DateRecordType, DateRecordJson } from '../types'

  export const flattenRecords = (data: DateRecordJson[]): DateRecordEntryFlat => {
  return data
    .filter(([ entry ]) => /[0-9]{4}-[0-9]{1,2}/.test(entry))
    .reduce((acc1: DateRecordEntryFlat, record) => {
      const [month, daysJson] = record
      const days = JSON.parse(daysJson)
      const bar = Object.entries(days)
        .reduce((acc2: DateRecordEntryFlat, [index, value]) => {
          acc2[`${month}-${index}`] = value as DateRecordType
          return acc2
        }, {})

      return { ...acc1, ...bar }
    }, {})
}
