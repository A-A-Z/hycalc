import type { MutableRefObject } from 'react'
import type { WeekRef } from '../types'

// handle keyDown nav events for grid
export const handleGridNav = (cellRefs: MutableRefObject<WeekRef[]>, rowIndex: number, columnIndex: number, key: string): void => {
  let newrowIndex = rowIndex
  let newcolumnIndex = columnIndex

  switch(key) {
    case 'ArrowUp':
      // up one row
      newrowIndex--
      break

    case 'ArrowRight':
      // right one column
      newcolumnIndex++
      break

    case 'ArrowDown':
      // down one row
      newrowIndex++
      break

    case 'ArrowLeft':
      // left one column
      newcolumnIndex--
      break

    case 'End':
      // to the end of the row
      newcolumnIndex = cellRefs.current[rowIndex].findLastIndex(({ current }) => current !== null)
      break

    case 'Home':
      // to the start of the row
      newcolumnIndex = cellRefs.current[rowIndex].findIndex(({ current }) => current !== null)
      break

    case 'PageDown':
      // to the bottom item in column
      newrowIndex = cellRefs.current.findLastIndex(ref => ref !== null && ref[columnIndex].current !== null)
      break

    case 'PageUp':
      // to the up item in column
      newrowIndex = cellRefs.current.findIndex(ref => ref !== null && ref[columnIndex].current !== null)
      break
  }

  // if new pos is invalid then return
  if (cellRefs.current?.[newrowIndex]?.[newcolumnIndex] === undefined) {
    return
  }

  // focus on new pos
  cellRefs.current[newrowIndex][newcolumnIndex].current?.focus()
}
