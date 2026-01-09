import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { MainWrapper } from './MainWrapper'
import { Page } from 'features/page'
import { ConfigProvider } from 'features/config'
import { DateRecordsProvider } from 'features/records'
import { StatusProvider } from 'features/status'
import { isSameDay } from 'lib/date'

import type { ReactNode } from 'react'

const navigateMock = vi.fn()

vi.mock('react-router', () => ({
  useNavigate: () => navigateMock
}))

vi.mock('features/page', () => ({
  Page: vi.fn(({ children }: { children: ReactNode }) => (
    <div data-testid="page">{children}</div>
  ))
}))

vi.mock('features/config', () => ({
  ConfigProvider: vi.fn(({ children }: { children: ReactNode }) => <>{children}</>)
}))

vi.mock('features/records', () => ({
  DateRecordsProvider: vi.fn(({ children }: { children: ReactNode }) => <>{children}</>)
}))

vi.mock('features/status', () => ({
  StatusProvider: vi.fn(({ children }: { children: ReactNode }) => <>{children}</>)
}))

vi.mock('lib/date', () => ({
  isSameDay: vi.fn()
}))

const mockPage = vi.mocked(Page)
const mockConfigProvider = vi.mocked(ConfigProvider)
const mockDateRecordsProvider = vi.mocked(DateRecordsProvider)
const mockStatusProvider = vi.mocked(StatusProvider)
const mockIsSameDay = vi.mocked(isSameDay)

describe('<MainWrapper />', () => {
  beforeEach(() => {
    navigateMock.mockReset()
    mockPage.mockClear()
    mockConfigProvider.mockClear()
    mockDateRecordsProvider.mockClear()
    mockStatusProvider.mockClear()
    mockIsSameDay.mockReset()
  })

  test('renders children within providers', () => {
    const { getByText, getByTestId } = render(
      <MainWrapper>
        <span>Child content</span>
      </MainWrapper>
    )

    expect(getByTestId('page')).toBeInTheDocument()
    expect(getByText('Child content')).toBeInTheDocument()
    expect(mockStatusProvider).toHaveBeenCalledTimes(1)
    expect(mockConfigProvider).toHaveBeenCalledTimes(1)
    expect(mockDateRecordsProvider).toHaveBeenCalledTimes(1)
    expect(mockPage).toHaveBeenCalledTimes(1)
  })

  test('navigates to today when entering on a new date', () => {
    mockIsSameDay.mockReturnValue(false)
    const { getByTestId } = render(
      <MainWrapper>
        <span>Child content</span>
      </MainWrapper>
    )

    const wrapper = getByTestId('page').parentElement
    fireEvent.mouseEnter(wrapper as HTMLElement)

    expect(navigateMock).toHaveBeenCalledWith('/')
  })

  test('does not navigate when entering on the same date', () => {
    mockIsSameDay.mockReturnValue(true)
    const { getByTestId } = render(
      <MainWrapper>
        <span>Child content</span>
      </MainWrapper>
    )

    const wrapper = getByTestId('page').parentElement
    fireEvent.mouseEnter(wrapper as HTMLElement)

    expect(navigateMock).not.toHaveBeenCalled()
  })
})
