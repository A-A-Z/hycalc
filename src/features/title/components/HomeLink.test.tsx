import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { useDateFromParams } from 'features/date'
import { HomeLink } from './HomeLink'

// import type { ReactNode } from 'react'
import type { LinkProps } from 'react-router'

vi.mock('react-router', () => ({
  Link: ({ children, to, ...props }: LinkProps) =>
    <a href={to.toString()} {...props}>{children}</a>
}))

vi.mock('features/date', () => ({
  useDateFromParams: vi.fn()
}))

const mockUseDateFromParams = vi.mocked(useDateFromParams)

describe('<HomeLink />', () => {
  beforeEach(() => {
    // set current date to June 15, 2031
    vi.setSystemTime(new Date('2031-06-15T00:00:00.000Z'))
    mockUseDateFromParams.mockReset()
  })
  
  test('render with forward class if in the past', () => {
    mockUseDateFromParams.mockReturnValue([new Date(2031, 1, 1), 2031, 6])
    const { getByRole } = render(<HomeLink />)
    expect(getByRole('link', { name: 'Return to current month' }))
      .toHaveClass('home-link--forward')
  })

  test('render with back class if in the future', () => {
    mockUseDateFromParams.mockReturnValue([new Date(2031, 9, 1), 2031, 6])
    const { getByRole } = render(<HomeLink />)
    expect(getByRole('link', { name: 'Return to current month' }))
      .toHaveClass('home-link--back')
  })

  test('return null if in the same month', () => {
    mockUseDateFromParams.mockReturnValue([new Date(2031, 5, 21), 2031, 6])
    const { container } = render(<HomeLink />)
    expect(container).toBeEmptyDOMElement()
  })
})
