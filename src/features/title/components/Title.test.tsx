import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Title } from './Title'
import * as recordsHook from 'features/records'

vi.mock('features/records', () => ({
  useDateRecords: vi.fn()
}))

describe('<Title />', () => {
  beforeEach(() => {
    vi.spyOn(recordsHook, 'useDateRecords').mockReturnValue({
      ratio: 50,
      dateStatus: 'none',
      records: {},
      setDateRecord: vi.fn()
    })
    document.title = ''
  })

  test('render title', () => {
    const { getByRole } = render(<Title gridId="grid-id" year={2024} month={3} />)
    const heading = getByRole('heading')
    expect(heading).toHaveAttribute('id', 'grid-id')
    expect(heading).toHaveAccessibleName('March 2024')
  })

  test('update document title', () => {
    render(<Title gridId="grid-id" year={2024} month={3} />)
    expect(document.title).toBe('Mar 50% - HyCalc')
  })
})