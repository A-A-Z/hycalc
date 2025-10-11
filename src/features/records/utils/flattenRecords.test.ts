import { describe, test, expect } from 'vitest'
import { flattenRecords } from './flattenRecords'

import { DateRecordJson, DateRecordEntryFlat } from '../types'

describe('flattenRecords()', () => {
  test('will handle empty results', () => {
    expect(flattenRecords([])).toStrictEqual({})
  })

  test('will format JSON data', () => {
    const jsonData: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite"}' ]
    ]
    const expected: DateRecordEntryFlat = {
      '2025-5-1': 'remote',
      '2025-5-2': 'remote',
      '2025-5-3': 'remote',
      '2025-6-1': 'onsite',
      '2025-6-2': 'onsite',
      '2025-6-3': 'onsite'
    }
    expect(flattenRecords(jsonData)).toStrictEqual(expected)
  })

  test('will skip non-date records', () => {
    const jsonData: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ 'foo', '{"bar":1}' ]
    ]
    const expected: DateRecordEntryFlat = {
      '2025-5-1': 'remote',
      '2025-5-2': 'remote',
      '2025-5-3': 'remote'
    }
    expect(flattenRecords(jsonData)).toStrictEqual(expected)
  })

  test('will handle bad JSON data', () => {
    const jsonData: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsi' ]
    ]
    const expected: DateRecordEntryFlat = {
      '2025-5-1': 'remote',
      '2025-5-2': 'remote',
      '2025-5-3': 'remote',
    }
    expect(flattenRecords(jsonData)).toStrictEqual(expected)
  })
})
