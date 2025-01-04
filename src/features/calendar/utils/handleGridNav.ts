import type { MutableRefObject } from 'react'
import type { WeekRef } from '../types'

// handle keyDown nav events for grid
export const handleGridNav = (
  cellRefs: MutableRefObject<WeekRef[]>,
  rowIndex: number,
  columnIndex: number,
  key: string
): void => {
  let newRowIndex = rowIndex
  let newColumnIndex = columnIndex

  switch(key) {
    case 'ArrowUp':
      // up one row
      newRowIndex--
      break

    case 'ArrowRight':
      // right one column
      newColumnIndex++
      break

    case 'ArrowDown':
      // down one row
      newRowIndex++
      break

    case 'ArrowLeft':
      // left one column
      newColumnIndex--
      break

    case 'End':
      // to the end of the row
      newColumnIndex = cellRefs.current[rowIndex].findLastIndex(
        ref => ref?.current !== undefined && ref?.current !== null
      )
      break

    case 'Home':
      // to the start of the row
      newColumnIndex = cellRefs.current[rowIndex].findIndex(
        ref => ref?.current !== undefined && ref?.current !== null
      )
      break

    case 'PageDown':
      // to the bottom item in column
      newRowIndex = cellRefs.current.findLastIndex(
        ref => ref !== null && ref[columnIndex]?.current !== undefined && ref[columnIndex]?.current !== null
      )
      break

    case 'PageUp':
      // to the up item in column
      newRowIndex = cellRefs.current.findIndex(
        ref => ref !== null && ref[columnIndex]?.current !== undefined && ref[columnIndex]?.current !== null
      )
      break
  }

  // if new pos is invalid then return
  if (cellRefs.current?.[newRowIndex]?.[newColumnIndex] === undefined) {
    return
  }

  // focus on new pos
  cellRefs.current[newRowIndex][newColumnIndex].current?.focus()
}
