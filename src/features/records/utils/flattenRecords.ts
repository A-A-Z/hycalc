import type { DateRecordEntry, DateRecordEntryFlat, DateRecordType } from '../types'

// type Entry = Record<string, string>

export const flattenRecords = (data: DateRecordEntry[]): DateRecordEntryFlat => {
  return data
    .filter(([ entry ]) => /[0-9]{4}-[0-9]{1,2}/.test(entry))
    .reduce((acc1: DateRecordEntryFlat, record) => {
      const [month, daysJson] = record
      // console.log({ month })
      const days = JSON.parse(daysJson)
      const bar = Object.entries(days)
        // .filter((entry) => {
        //   console.log({ entry })
        //   return true
        // })
        .reduce((acc2: DateRecordEntryFlat, [index, value]) => {
          acc2[`${month}-${index}`] = value as DateRecordType
          return acc2
        }, {})

      return { ...acc1, ...bar }
    }, {})
  // console.log('flatten', JSON.parse(data[2][1]))
  // console.log('flatten', foo)
}
