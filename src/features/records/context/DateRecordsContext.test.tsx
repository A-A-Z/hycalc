import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { use, createContext } from 'react'
// import { mockLocalStorage } from 'global/test-utils/mockLocalStorage'
import { DateRecordsContext } from './DateRecordsContext'
import { DateRecordsProvider } from './DateRecordsProvider'

import type { DateRecordsProviderProps } from '../types'

vi.mock('features/status', () => ({
  StatusContext: createContext({
    year: 2012,
    month: 11
  }),
}))

describe('DateRecordsContext', () => {
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
  const clearSpy = vi.spyOn(Storage.prototype, 'clear')

  const wrapper = ({ children }: DateRecordsProviderProps) =>
      <DateRecordsProvider>{children}</DateRecordsProvider>

  beforeEach(() => {
    vi.useFakeTimers()
    localStorage.clear()
    getItemSpy.mockClear()
    setItemSpy.mockClear()
    clearSpy.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('setDateRecord', () => {
    test('can update records', () => {
      const { result } = renderHook(() => use(DateRecordsContext), { wrapper })

      // state starts blank
      expect(result.current.records).toStrictEqual({})
      expect(result.current.ratio).toBe(0)
      expect(result.current.estRatio).toBe(0)

      act(() => {
        // add onsite record
        result.current.setDateRecord(8, 'onsite')
      })
      
      // state shows one onsite record with 100% ratio
      expect(result.current.records).toStrictEqual({ 8: 'onsite' })
      expect(result.current.ratio).toBe(100)
      expect(result.current.estRatio).toBe(100)

      act(() => {
        // add remote record
        result.current.setDateRecord(9, 'remote')
      })

      // state shows one onsite and one remote record with 50% ratio
      const finalValue = { 8: 'onsite', 9: 'remote' }
      expect(result.current.records).toStrictEqual(finalValue)
      expect(result.current.ratio).toBe(50)
      expect(result.current.estRatio).toBe(50)

      // timeout bounce to save
      vi.runAllTimers()
      expect(setItemSpy).toHaveBeenCalledWith('2012-11', JSON.stringify(finalValue))
    })
  })

  describe('replaceRecords', () => {
    test('will clear clear values with blank', () => {
      const { result } = renderHook(() => use(DateRecordsContext), { wrapper })

      act(() => {
        // add onsite record
        result.current.setDateRecord(8, 'onsite')
      })

      // starting value
      expect(result.current.records).toStrictEqual({ 8: 'onsite' })
      expect(result.current.ratio).toBe(100)
      expect(result.current.estRatio).toBe(100)

      act(() => {
        // replace data with blank value
        result.current.replaceRecords([])
      })

      // records now blank
      expect(result.current.records).toStrictEqual({})
      expect(result.current.ratio).toBe(0)
      expect(result.current.estRatio).toBe(0)
    })

    test('Replace current data with new values', () => {
      const { result } = renderHook(() => use(DateRecordsContext), { wrapper })

      act(() => {
        // add onsite record
        result.current.setDateRecord(8, 'onsite')
      })

      // starting value
      expect(result.current.records).toStrictEqual({ 8: 'onsite' })
      expect(result.current.ratio).toBe(100)
      expect(result.current.estRatio).toBe(100)

      act(() => {
        // replace data with new data
        result.current.replaceRecords([['2012-11', '{"3": "onsite", "4": "remote"}']])
      })

      // results updated with new values
      expect(result.current.records).toStrictEqual({ 3: 'onsite', 4: 'remote' })
      expect(result.current.ratio).toBe(50)
      expect(result.current.estRatio).toBe(50)
    })
  })
})
