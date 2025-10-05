import { describe, test, expect } from 'vitest'
// import { render, fireEvent } from '@testing-library/react'
import { getCappedTotals } from './getCappedTotals'

import type { ImportResult } from '../types'

describe('getCappedTotals()', () => {

  test('will handle empty results', () => {
    const groups: ImportResult = {
      new: 0,
      match: 0,
      conflict: 0
    }
    expect(getCappedTotals(groups, 100)).toStrictEqual(groups)
  })

  test('will handle all results being under total', () => {
    const groups: ImportResult = {
      new: 20,
      match: 20,
      conflict: 20
    }
    expect(getCappedTotals(groups, 100)).toStrictEqual(groups)
  })

  test('will handle one result being over the cap', () => {
    const groups: ImportResult = {
      new: 500,
      match: 0,
      conflict: 0
    }
    const result: ImportResult = {
      new: 100,
      match: 0,
      conflict: 0
    }
    expect(getCappedTotals(groups, 100)).toStrictEqual(result)
  })

  test('will handle one over and two under cap', () => {
    const groups: ImportResult = {
      new: 500,
      match: 20,
      conflict: 20
    }
    const result: ImportResult = {
      new: 60,
      match: 20,
      conflict: 20
    }
    expect(getCappedTotals(groups, 100)).toStrictEqual(result)
  })

  test('will handle two over and one under cap', () => {
    const groups: ImportResult = {
      new: 200,
      match: 200,
      conflict: 20
    }
    const result: ImportResult = {
      new: 40,
      match: 40,
      conflict: 20
    }
    expect(getCappedTotals(groups, 100)).toStrictEqual(result)
  })

  test('will handle all over cap', () => {
    const groups: ImportResult = {
      new: 200,
      match: 200,
      conflict: 200
    }
    const result: ImportResult = {
      new: 34,
      match: 33,
      conflict: 33
    }
    expect(getCappedTotals(groups, 100)).toStrictEqual(result)
  })
})
