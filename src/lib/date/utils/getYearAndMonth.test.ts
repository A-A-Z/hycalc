import { describe, test, expect } from 'vitest'
import { getYearAndMonth } from './getYearAndMonth'

describe('getYearAndMonth', () => {
  test('returns the current year and month for 0 offset', () => {
    const { year, month } = getYearAndMonth(0)
    const expectedYear = new Date().getFullYear()
    const expectedMonth = new Date().getMonth() + 1 // JavaScript's getMonth() is 0-indexed
    expect(year).toBe(expectedYear)
    expect(month).toBe(expectedMonth)
  })

  test('returns the correct year and month for a past month offset', () => {
    // This will test the function with an offset of 3 months. Adjust as needed for your specific test case.
    const offset = 3
    const { year, month } = getYearAndMonth(offset)
    const expectedDate = new Date()
    expectedDate.setMonth(expectedDate.getMonth() - offset)
    const expectedYear = expectedDate.getFullYear()
    const expectedMonth = expectedDate.getMonth() + 1 // Adjusting because JavaScript's getMonth() is 0-indexed
    expect(year).toBe(expectedYear)
    expect(month).toBe(expectedMonth)
  })
})
