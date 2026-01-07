import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { Ratio } from './Ratio'

describe('<Ratio />', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Clear all mocks and timers after each test
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  test('updates currentValue gradually towards the target value', () => {
    const { rerender, getByTestId } = render(<Ratio value={10} estValue={25} isEstVisible={true} />);
    rerender(<Ratio value={30} estValue={25} isEstVisible={true}  />)

    expect(getByTestId('counter')).toHaveTextContent('10')

    for (let i = 0; i < 20; i++) {
      act(() => {
        vi.runAllTimers()
      })
      expect(getByTestId('counter')).toHaveTextContent(`${10 + i + 1}`)
    }
  })
})
