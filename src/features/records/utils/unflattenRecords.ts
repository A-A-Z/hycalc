import type { DateRecordEntryFlat, DateRecordJson } from '../types'

export const unflattenRecords = (data: DateRecordEntryFlat): DateRecordJson[] => {
  // TODO: make this function
  console.log({ data })
  const foo = Object.entries(data).reduce<Record<string, Record<string, string>>>((acc, [date, state]) => {
    // const grouped = new Map<string, Map<number, DateRecordType>>()

    // format dates
    const dates = date.match(/([0-9]{4}-[0-9]{1,2})-([0-9]{1,2})/)
    if (dates === null) return acc
    const [, yearMonth, day] = dates

    // check if new year-month
    if (acc[yearMonth] === undefined) {
      acc[yearMonth] = {}
    }

    // add new day to year-month
    acc[yearMonth] = { ...acc[yearMonth], [day]: state }

    return acc
  }, {})

  const bar = Object.entries(foo).map(([index, enties]) => {
    // console.log({ baz })
    return [index, JSON.stringify(enties)] as DateRecordJson
  })
  console.log({ foo, bar })
  return bar
}
