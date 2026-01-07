import { describe, test, expect, vi, afterEach, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { LiveStatus } from './LiveStatus'

describe('<LiveStatus />', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2031-06-15T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('render status text', () => {
    const { getByRole } = render(
      <LiveStatus value={50} estValue={0} isEstVisible={false} />
    )
    expect(getByRole('status')).toHaveTextContent('June 2031, 50 percent on site.')
    expect(getByRole('status')).not.toHaveTextContent('Estimated 25 percent on site.')
  })

  test('render status text with estimated', () => {
    const { getByRole } = render(
      <LiveStatus value={50} estValue={25} isEstVisible={true} />
    )
    expect(getByRole('status')).toHaveTextContent('June 2031, 50 percent on site.')
    expect(getByRole('status')).toHaveTextContent('Estimated 25 percent on site.')
  })
})
