import { useRef, createRef } from 'react'
import { describe, test, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { handleGridNav } from './handleGridNav'

import type { WeekRef } from '../types'

const Grid = () => {
  const dayRefs = useRef<WeekRef[]>([[], [], []])

  const rows = [
    [false, true, true],
    [true, true, true],
    [true, true, false]
  ]

  return (
    <div>
      {
        rows.map((cols, rowIndex) => (
          cols.map((isActive, colIndex) => {
            if (!isActive) {
              return (
                <button
                  key={`row-${rowIndex}-col-${colIndex}`}
                  data-testid={`row-${rowIndex}-col-${colIndex}`}
                />
              )
            }

            dayRefs.current[rowIndex][colIndex] = createRef<HTMLButtonElement>()
            return (
              <button
                key={`row-${rowIndex}-col-${colIndex}`}
                data-testid={`row-${rowIndex}-col-${colIndex}`}
                ref={dayRefs.current[rowIndex][colIndex]}
                onKeyDown={e => handleGridNav(dayRefs, rowIndex, colIndex, e.key)}
              />
            )
          })
        ))
      }
    </div>
  )
}

describe('handleGridNav', () => {
  test('ArrowUp navs on row up', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowUp' })
    expect(getByTestId('row-0-col-1')).toHaveFocus()
  })

  test('ArrowUp stays on cell if first row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-0-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowUp' })
    expect(startCell).toHaveFocus()
  })

  test('ArrowRight navs on row up', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowRight' })
    expect(getByTestId('row-1-col-2')).toHaveFocus()
  })

  test('ArrowRight stays on cell if last col', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-2')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowRight' })
    expect(startCell).toHaveFocus()
  })

  test('ArrowDown navs on row down', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowDown' })
    expect(getByTestId('row-2-col-1')).toHaveFocus()
  })

  test('ArrowDown stays on cell if on last row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-2-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowDown' })
    expect(startCell).toHaveFocus()
  })

  test('ArrowLeft navs on row up', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowLeft' })
    expect(getByTestId('row-1-col-0')).toHaveFocus()
  })

  test('ArrowLeft stays on cell if first col', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-0')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'ArrowLeft' })
    expect(startCell).toHaveFocus()
  })

  test('End navs to last item on row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-0')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'End' })
    expect(getByTestId('row-1-col-2')).toHaveFocus()
  })

  test('End navs to last active cell', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-2-col-0')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'End' })
    expect(getByTestId('row-2-col-1')).toHaveFocus()
  })

  test('Home navs to last item on row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-1-col-2')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'Home' })
    expect(getByTestId('row-1-col-0')).toHaveFocus()
  })

  test('Home navs to first active cell', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-0-col-2')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'Home' })
    expect(getByTestId('row-0-col-1')).toHaveFocus()
  })

  test('PageDown navs to last row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-0-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'PageDown' })
    expect(getByTestId('row-2-col-1')).toHaveFocus()
  })

  test('PageDown navs to last active row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-0-col-2')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'PageDown' })
    expect(getByTestId('row-1-col-2')).toHaveFocus()
  })

  test('PageUp navs to first row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-2-col-1')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'PageUp' })
    expect(getByTestId('row-0-col-1')).toHaveFocus()
  })

  test('PageUp navs to first active row', () => {
    const { getByTestId } = render(<Grid />)
    const startCell = getByTestId('row-2-col-0')
    startCell.focus()
    fireEvent.keyDown(startCell, { key: 'PageUp' })
    expect(getByTestId('row-1-col-0')).toHaveFocus()
  })
})
