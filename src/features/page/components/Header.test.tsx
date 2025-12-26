import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Header } from './Header'

describe('<Header />', () => {
  test('will render', () => {
    const { getByRole, getByAltText } = render(<Header />)
    expect(getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(getByAltText('HyCalc logo')).toBeInTheDocument()
    expect(getByAltText('GitHub logo')).toBeInTheDocument()
  })
})
