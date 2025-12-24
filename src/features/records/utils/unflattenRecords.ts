import type { DateRecordEntryFlat, DateRecordJson } from '../types'

export const unflattenRecords = (data: DateRecordEntryFlat): DateRecordJson[] => {
  const entiesObj = Object.entries(data).reduce<Record<string, Record<string, string>>>((acc, [date, state]) => {
    // format dates
    const dates = date.match(/([0-9]{4}-[0-9]{1,2})-([0-9]{1,2})/)
    if (dates === null) return acc
    const [, yearMonth, day] = dates

    // check if new year-month
    if (acc[yearMonth] === undefined) {
      acc[yearMonth] = {}
    }

    // add new day to year-month
    acc[yearMonth][day] = state

    return acc
  }, {})

  // convert to an array of JSON data
  return Object.entries(entiesObj)
    .toSorted(([a], [b]) => {
      const [ya, ma] = a.split('-').map(Number);
      const [yb, mb] = b.split('-').map(Number);
      return ya - yb || ma - mb;
    })
    .map(([index, enties]) => ([index, JSON.stringify(enties)] as DateRecordJson)
  )
}
