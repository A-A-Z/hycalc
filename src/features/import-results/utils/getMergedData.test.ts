import { describe, test, expect } from 'vitest'
import { getMergedData } from './getMergedData'

import type { DateRecordJson } from 'features/records'

describe.skip('getMergedData()', () => {
  const blank: DateRecordJson[] = []

  test('handles blank data', () => {   
    expect(getMergedData(blank, blank, 'merge')).toStrictEqual(blank)
  })

  test('handles flush', () => {
    const currentData: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite"}' ]
    ]
    const importData: DateRecordJson[] = [
      [ '2025-5', '{"1":"onsite","2":"remote","3":"onsite"}' ],
      [ '2025-6', '{"1":"remote","2":"onsite","3":"remote"}' ]
    ]
    expect(getMergedData(currentData, importData, 'flush')).toStrictEqual(importData)
  })

  test('handles merge', () => {
    const currentData: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite"}' ]
    ]
    const importData: DateRecordJson[] = [
      [ '2025-6', '{"4":"onsite"}' ],
      [ '2025-7', '{"1":"onsite","2":"remote","3":"onsite"}' ],
      [ '2025-8', '{"1":"remote","2":"onsite","3":"remote"}' ]
    ]
    const result: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite","4":"onsite"}' ],
      [ '2025-7', '{"1":"onsite","2":"remote","3":"onsite"}' ],
      [ '2025-8', '{"1":"remote","2":"onsite","3":"remote"}' ]
    ]
    expect(getMergedData(currentData, importData, 'merge')).toStrictEqual(result)
  })

  test('handles keep', () => {
    const currentData: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite"}' ]
    ]
    const importData: DateRecordJson[] = [
      [ '2025-6', '{"1":"remote","2":"onsite","3":"remote","4":"onsite"}' ],
      [ '2025-7', '{"1":"remote","2":"onsite","3":"remote","4":"remote"}' ]
    ]
    const result: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite","4":"onsite"}' ],
      [ '2025-7', '{"1":"remote","2":"onsite","3":"remote","4":"remote"}' ]
    ]
    expect(getMergedData(currentData, importData, 'keep')).toStrictEqual(result)
  })

  test('handles overwrite', () => {
    const currentData: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite"},"4":"onsite"' ]
    ]
    const importData: DateRecordJson[] = [
      [ '2025-6', '{"1":"remote","2":"onsite","3":"remote","5":"onsite"}' ],
      [ '2025-7', '{"1":"remote","2":"onsite","3":"remote"}' ]
    ]
    const result: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"remote","2":"onsite","3":"remote","4":"onsite","5":"onsite"}' ],
      [ '2025-7', '{"1":"remote","2":"onsite","3":"remote"}' ]
    ]
    expect(getMergedData(currentData, importData, 'overwrite')).toStrictEqual(result)
  })
})
