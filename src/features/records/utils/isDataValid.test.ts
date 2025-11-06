import { describe, test, expect } from 'vitest'
import { isDataValid } from './isDataValid'

import { DateRecordJson } from '../types'

describe('isDataValid()', () => {
  test('will handle valid data', () => {
    const data: DateRecordJson[] = [
      [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
      [ '2025-6', '{"1":"onsite","2":"onsite","3":"onsite"}' ]
    ]
    expect(isDataValid(data)).toStrictEqual(true)
  })

  test('will handle valid but empty data', () => {
    const data: DateRecordJson[] = [
      [ '2025-5', '{}' ]
    ]
    expect(isDataValid(data)).toStrictEqual(true)
  })

  test('will handle null data', () => {
    expect(isDataValid(null)).toStrictEqual(false)
  })

  test('will handle not array', () => {
    expect(isDataValid({})).toStrictEqual(false)
  })

  test('will handle empty array', () => {
    expect(isDataValid([])).toStrictEqual(false)
  })

  test('will handle entry no array', () => {
    expect(isDataValid([{"foo": "bar"}])).toStrictEqual(false)
  })

  test('will handle invalid year-month', () => {
    const data: DateRecordJson[] = [
      [ 'nope', '{"1":"onsite","2":"onsite","3":"onsite"}' ]
    ]
    expect(isDataValid(data)).toStrictEqual(false)
  })

  test('will handle invalid value', () => {
    const data: DateRecordJson[] = [
      [ '2025-5', 'nope' ]
    ]
    expect(isDataValid(data)).toStrictEqual(false)
  })
})
