import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Page } from './Page'

describe('<Page />', () => {
  const TestContent = () => <div data-testid="content">Test me</div>

  test('will render', () => {
    const { getByRole, getByTestId } = render(<Page><TestContent /></Page>)
    expect(getByRole('banner')).toBeInTheDocument()
    expect(getByRole('main')).toBeInTheDocument()
    expect(getByTestId('content')).toBeInTheDocument()
  })
})
