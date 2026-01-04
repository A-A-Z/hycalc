import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { parseYear } from './parseYear'

describe('parseYear()', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // set current year to 2031
    vi.setSystemTime(new Date('2031-06-15T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('will parse a valid year from string to number', () => {
    const result = parseYear('2023')
    expect(result).toBe(2023)
  })

  test('will handle undefined', () => {
    const result = parseYear(undefined)
    expect(result).toBe(2031)
  })

  test('will handle blank value', () => {
    const result = parseYear('')
    expect(result).toBe(2031)
  })

  test('will handle invalid years', () => {
    const result = parseYear('fail')
    expect(result).toBe(2031)
  })

  test('will handle non-integer value', () => {
    const result = parseYear('1231.4')
    expect(result).toBe(2031)
  })

  test('will handle year to far in the past', () => {
    const result = parseYear('1766')
    expect(result).toBe(2031)
  })

  test('will handle year to far in the future', () => {
    const result = parseYear('40000')
    expect(result).toBe(2031)
  })
})
