import type { DateRecordEntryFlat, DateRecordType, DateRecordJson } from '../types'

export const flattenRecords = (data: DateRecordJson[]): DateRecordEntryFlat => data
  .reduce<DateRecordEntryFlat>((acc, record) => {
    const [yearMonth, daysJson] = record

    // valid date records only
    if (!/[0-9]{4}-[0-9]{1,2}/.test(yearMonth)) return acc

    try {
      // parse day JSON data into object
      const days = JSON.parse(daysJson)

      // flatten the data into a yyyy-m-d format
      for (const [index, value] of Object.entries(days)) {
        acc[`${yearMonth}-${index}`] = value as DateRecordType
      }
    } catch {
      // ignore malformed JSON
    }

    return acc
  }, {})
