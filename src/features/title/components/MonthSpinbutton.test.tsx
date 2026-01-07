import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StatusContext } from 'features/status'
import { MonthSpinbutton } from './MonthSpinbutton'

import type { StatusContextValues } from 'features/status/types'

const navigateMock = vi.fn()

vi.mock('features/date', () => ({
  useDateNavigate: () => navigateMock
}))

describe('<MonthSpinbutton />', () => {
  const baseStatusValue: StatusContextValues = {
    gridId: 'grid',
    month: 0,
    year: 2023,
    firstOfTheMonth: new Date(2023, 0, 1),
    isReadOnly: false,
    isCustomMode: false,
    isPlanMode: false,
    dateCheck: '',
    toggleCustomMode: vi.fn(),
    togglePlanMode: vi.fn()
  }

  beforeEach(() => {
    navigateMock.mockReset()
  })

  const renderMonthSpinbutton = (
    statusOverrides: Partial<StatusContextValues> = {}
  ) => render(
    <StatusContext.Provider value={{ ...baseStatusValue, ...statusOverrides }}>
      <MonthSpinbutton />
    </StatusContext.Provider>
  )

  test('navigates on button clicks', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderMonthSpinbutton()

    await user.click(getByRole('button', { name: 'Prevous month' }))
    await user.click(getByRole('button', { name: 'Next month' }))

    expect(navigateMock).toHaveBeenNthCalledWith(1, 1)
    expect(navigateMock).toHaveBeenNthCalledWith(2, -1)
  })

  test('handles arrow key navigation', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderMonthSpinbutton()
    const group = getByRole('group', {
      name: /use up and down arrow keys to select month/i
    })

    group.focus()
    await user.keyboard('{ArrowUp}{ArrowDown}')

    expect(navigateMock).toHaveBeenNthCalledWith(1, 1)
    expect(navigateMock).toHaveBeenNthCalledWith(2, -1)
  })

  test('disables navigation when read-only', async () => {
    const user = userEvent.setup()
    const { getByRole } = renderMonthSpinbutton({ isReadOnly: true })
    const group = getByRole('group', {
      name: /use up and down arrow keys to select month/i
    })

    expect(group).toHaveAttribute('tabindex', '-1')
    expect(getByRole('button', { name: 'Prevous month' })).toBeDisabled()
    expect(getByRole('button', { name: 'Next month' })).toBeDisabled()

    await user.click(getByRole('button', { name: 'Prevous month' }))
    fireEvent.keyDown(group, { key: 'ArrowUp' })

    expect(navigateMock).not.toHaveBeenCalled()
  })
})
