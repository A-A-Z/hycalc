import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { useDateFromParams } from './useDateFromParams'

const renderWithRoute = (path: string, routePath: string) =>
  renderHook(() => useDateFromParams(), {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={routePath} element={children} />
        </Routes>
      </MemoryRouter>
    )
  })

describe('useDateFromParams()', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // set current date to June 15, 2031
    vi.setSystemTime(new Date('2031-06-15T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('returns date, year, and month from params', () => {
    const { result } = renderWithRoute('/2024/feb', '/:year/:month')
    const [date, year, month] = result.current

    expect(year).toBe(2024)
    expect(month).toBe(2)
    expect(date.getFullYear()).toBe(2024)
    expect(date.getMonth()).toBe(1)
    expect(date.getDate()).toBe(1)
  })

  test('falls back to current date when params are missing', () => {
    const { result } = renderWithRoute('/', '/')
    const [date, year, month] = result.current

    expect(year).toBe(2031)
    expect(month).toBe(6)
    expect(date.getFullYear()).toBe(2031)
    expect(date.getMonth()).toBe(5)
    expect(date.getDate()).toBe(1)
  })

  test('falls back to current date when params are invalid', () => {
    const { result } = renderWithRoute('/fail/Gob', '/:year/:month')
    const [date, year, month] = result.current

    expect(year).toBe(2031)
    expect(month).toBe(6)
    expect(date.getFullYear()).toBe(2031)
    expect(date.getMonth()).toBe(5)
    expect(date.getDate()).toBe(1)
  })
})
