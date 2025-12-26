import { describe, test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ConfigContext } from 'features/config'
import { StatusContext } from 'features/status'
import { Page } from './Page'
import type { Config, ConfigContextValues } from 'features/config/types'
import type { StatusContextValues } from 'features/status/types'

describe('<Page />', () => {
  const TestContent = () => <div data-testid="content">Test me</div>
  const baseStatusValue: StatusContextValues = {
    gridId: 'grid',
    month: 0,
    year: 2023,
    firstOfTheMonth: new Date(2023, 0, 1),
    monthOffset: 0,
    direcction: 'none',
    isReadOnly: false,
    isCustomMode: false,
    isPlanMode: false,
    dateCheck: '',
    setMonthOffset: vi.fn() as StatusContextValues['setMonthOffset'],
    navMonthBack: vi.fn(),
    navMonthForward: vi.fn(),
    toggleCustomMode: vi.fn(),
    togglePlanMode: vi.fn()
  }
  const baseConfigValue: ConfigContextValues = {
    config: {
      weekdays: [0, 1, 2, 3, 4],
      theme: 'dark'
    },
    setConfig: vi.fn() as ConfigContextValues['setConfig']
  }

  interface RenderPageOptions {
    statusOverrides?: Partial<StatusContextValues>
    configOverrides?: Partial<Config>
  }

  const renderPage = ({
    statusOverrides = {},
    configOverrides = {}
  }: RenderPageOptions = {}) => render(
    <StatusContext.Provider value={{ ...baseStatusValue, ...statusOverrides }}>
      <ConfigContext.Provider value={{
        ...baseConfigValue,
        config: { ...baseConfigValue.config, ...configOverrides }
      }}>
        <Page><TestContent /></Page>
      </ConfigContext.Provider>
    </StatusContext.Provider>
  )

  test('will render', () => {
    const { getByRole, getByTestId } = renderPage()
    expect(getByRole('banner')).toBeInTheDocument()
    expect(getByRole('main')).toBeInTheDocument()
    expect(getByTestId('content')).toBeInTheDocument()
    expect(getByRole('banner').parentElement).toHaveStyle('--column-count: 5')
  })

  test('uses fixed column count when custom mode enabled', () => {
    const { getByRole } = renderPage({
      statusOverrides: { isCustomMode: true },
      configOverrides: { weekdays: [0, 1, 2] },
    })

    expect(getByRole('banner').parentElement).toHaveStyle('--column-count: 7')
  })
})
