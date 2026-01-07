import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useDateNavigate } from './useDateNavigate'
import { useDateFromParams } from './useDateFromParams'

const navigateMock = vi.fn()

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router')
  return {
    ...actual,
    useNavigate: () => navigateMock
  }
})

vi.mock('./useDateFromParams', () => ({
  useDateFromParams: vi.fn()
}))

const mockUseDateFromParams = vi.mocked(useDateFromParams)

describe('useDateNavigate()', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // set current date to June 15, 2031
    vi.setSystemTime(new Date('2031-06-15T00:00:00.000Z'))
    navigateMock.mockReset()
    mockUseDateFromParams.mockReset()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('navigates to index when new date is in the current month', () => {
    mockUseDateFromParams.mockReturnValue([new Date(2031, 5, 1), 2031, 6])

    const { result } = renderHook(() => useDateNavigate())
    result.current(0)

    expect(navigateMock).toHaveBeenCalledWith('/')
  })

  test('navigates to formatted month when new date is not the current month', () => {
    mockUseDateFromParams.mockReturnValue([new Date(2031, 5, 15), 2031, 6])

    const { result } = renderHook(() => useDateNavigate())
    result.current(1)

    expect(navigateMock).toHaveBeenCalledWith('/2031/may')
  })
})
