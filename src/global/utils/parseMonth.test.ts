import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { parseMonth } from './parseMonth'

describe('parseMonth)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // set current year to 6, 2031
    vi.setSystemTime(new Date('2031-06-15T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('will parse a valid year from string to number', () => {
    const result = parseMonth('feb')
    expect(result).toBe(2)
  })

  test('is case insensitive', () => {
    const result = parseMonth('FeB')
    expect(result).toBe(2)
  })

  test('will handle undefined', () => {
    const result = parseMonth(undefined)
    expect(result).toBe(6)
  })

  test('will handle blank vakue', () => {
    const result = parseMonth('')
    expect(result).toBe(6)
  })

  test('will handle invalid months', () => {
    const result = parseMonth('Gob')
    expect(result).toBe(6)
  })
})
