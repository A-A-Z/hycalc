import { describe, test, expect } from 'vitest'
import { getMergedData } from './getMergedData'

import type { DateRecordJson } from 'features/records'

describe('getMergedData()', () => {
  const blank: DateRecordJson[] = []

  describe('flush', () => {
    test('handles blank data', () => {   
      expect(getMergedData(blank, blank, 'flush')).toStrictEqual(blank)
    })

    test('imported data into blank current', () => {
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"1":"onsite","2":"remote","3":"onsite"}' ],
        [ '2025-6', '{"1":"remote","2":"onsite","3":"remote"}' ]
      ]
      expect(getMergedData(blank, importData, 'flush')).toStrictEqual(importData)
    })

    test('imported data replaces all old entries', () => {
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

    test('keep current config data', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote","3":"remote"}' ],
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ]
      ]
      const importData: DateRecordJson[] = [
        [ '2025-6', '{"1":"remote","2":"onsite","3":"remote"}' ]
      ]
      const result: DateRecordJson[] = [
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ],
        [ '2025-6', '{"1":"remote","2":"onsite","3":"remote"}' ]
      ]
      expect(getMergedData(currentData, importData, 'flush')).toStrictEqual(result)
    })
  })

  describe('merge', () => {
    test('handles blank data', () => {   
      expect(getMergedData(blank, blank, 'merge')).toStrictEqual(blank)
    })

    test('merge enties from same month', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"remote"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote"}' ],
      ]
      expect(getMergedData(currentData, importData, 'merge')).toStrictEqual(result)
    })

    test('merge enties from differenmt month', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-6', '{"1":"remote"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
        [ '2025-6', '{"1":"remote"}' ],
      ]
      expect(getMergedData(currentData, importData, 'merge')).toStrictEqual(result)
    })

    test('keep current config data', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ]
      ]
      const importData: DateRecordJson[] = [
        [ '2025-6', '{"1":"remote"}' ],
      ]
      const result: DateRecordJson[] = [
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ],
        [ '2025-5', '{"1":"remote"}' ],
        [ '2025-6', '{"1":"remote"}' ],
      ]
      expect(getMergedData(currentData, importData, 'merge')).toStrictEqual(result)
    })
  })

  describe('keep', () => {
    test('handles blank data', () => {   
      expect(getMergedData(blank, blank, 'keep')).toStrictEqual(blank)
    })

    test('merge enties from same month', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"remote"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote"}' ],
      ]
      expect(getMergedData(currentData, importData, 'keep')).toStrictEqual(result)
    })

    test('merge enties from differenmt month', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-6', '{"1":"remote"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
        [ '2025-6', '{"1":"remote"}' ],
      ]
      expect(getMergedData(currentData, importData, 'keep')).toStrictEqual(result)
    })

    test('if confict on same month keep current value', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"onsite","3":"onsite"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote","3":"onsite"}' ],
      ]
      expect(getMergedData(currentData, importData, 'keep')).toStrictEqual(result)
    })

    test('merge and keep', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote","4":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"onsite","3":"onsite","5":"onsite"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote","3":"onsite","4":"remote","5":"onsite"}' ],
      ]
      expect(getMergedData(currentData, importData, 'keep')).toStrictEqual(result)
    })

    test('keep current config data', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote","4":"remote"}' ],
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"onsite","3":"onsite","5":"onsite"}' ],
      ]
      const result: DateRecordJson[] = [
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ],
        [ '2025-5', '{"1":"remote","2":"remote","3":"onsite","4":"remote","5":"onsite"}' ],
      ]
      expect(getMergedData(currentData, importData, 'merge')).toStrictEqual(result)
    })
  })

  describe('overwrite', () => {
    test('handles blank data', () => {   
      expect(getMergedData(blank, blank, 'overwrite')).toStrictEqual(blank)
    })

    test('merge enties from same month', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"remote"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote"}' ],
      ]
      expect(getMergedData(currentData, importData, 'overwrite')).toStrictEqual(result)
    })

    test('merge enties from differenmt month', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-6', '{"1":"remote"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote"}' ],
        [ '2025-6', '{"1":"remote"}' ],
      ]
      expect(getMergedData(currentData, importData, 'overwrite')).toStrictEqual(result)
    })

    test('if confict on same month overwrite current value', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"onsite","3":"onsite"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"onsite","3":"onsite"}' ],
      ]
      expect(getMergedData(currentData, importData, 'overwrite')).toStrictEqual(result)
    })

    test('merge and overwrite', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote","4":"remote"}' ],
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"onsite","3":"onsite","5":"onsite"}' ],
      ]
      const result: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"onsite","3":"onsite","4":"remote","5":"onsite"}' ],
      ]
      expect(getMergedData(currentData, importData, 'overwrite')).toStrictEqual(result)
    })

    test('keep current config data', () => {
      const currentData: DateRecordJson[] = [
        [ '2025-5', '{"1":"remote","2":"remote","4":"remote"}' ],
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ]
      ]
      const importData: DateRecordJson[] = [
        [ '2025-5', '{"2":"onsite","3":"onsite","5":"onsite"}' ],
      ]
      const result: DateRecordJson[] = [
        [ 'config', '{"weekdays":[0,1,2,3,4],"theme":"dark"}' ],
        [ '2025-5', '{"1":"remote","2":"onsite","3":"onsite","4":"remote","5":"onsite"}' ],
      ]
      expect(getMergedData(currentData, importData, 'overwrite')).toStrictEqual(result)
    })
  })
})
