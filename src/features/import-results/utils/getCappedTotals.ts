import { RESULT_TYPES } from '../constants'
import type { ResultType } from '../types'
// type ResultType = 'foo' | 'bar' | 'baz'

// const RESULT_TYPES: ResultType[] = ['foo', 'bar', 'baz']

// export const getCappedTotals = (groups: Record<ResultType, number>,, maxTotal: number): Record<ResultType, number> => {
  
export const getCappedTotals = (
    groups: Record<ResultType, number>,
    maxTotal: number
  ): Record<ResultType, number> => {
    const target = Math.max(0, Math.floor(maxTotal))
    const rawTotal = RESULT_TYPES.reduce((sum, g) => sum + groups[g], 0)
  
    // If already under or equal, return as-is
    if (rawTotal <= target) return { ...groups }
  
    // Start with a 33% cap
    const baseCap = Math.floor(target / RESULT_TYPES.length)
    const result: Record<ResultType, number> = { new: 0, match: 0, conflict: 0 }
  
    let assigned = 0
    for (const g of RESULT_TYPES) {
      result[g] = Math.min(groups[g], baseCap)
      assigned += result[g]
    }
  
    // Distribute leftover until total == target
    let leftover = target - assigned
    while (leftover > 0) {
      let progressed = false
  
      for (const g of RESULT_TYPES) {
        if (leftover === 0) break
        if (result[g] < groups[g]) {
          result[g]++
          leftover--
          progressed = true
        }
      }
      
      // Safety stop
      if (!progressed) break
    }
  
    return result
  }
  