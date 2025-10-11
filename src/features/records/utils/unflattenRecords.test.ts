import { describe, test, expect } from 'vitest'
import { unflattenRecords } from './unflattenRecords'

import { DateRecordJson, DateRecordEntryFlat } from '../types'

describe('unflattenRecords()', () => {
  test('will handle empty results', () => {
    expect(unflattenRecords({})).toStrictEqual([])
  })

  test('will do the thing', () => {
    const flatData: DateRecordEntryFlat = {
      '2025-5-1': 'remote',
      '2025-5-2': 'remote',
      '2025-6-1': 'onsite',
      '2025-6-2': 'onsite'
    }
    const expected: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite"}' ]
    ] 
    expect(unflattenRecords(flatData)).toStrictEqual(expected)
  })
})
