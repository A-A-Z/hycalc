import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from './Button'

describe('<Button />', () => {
  const content = 'Test button'

  test('will render', () => {
    const { getByRole } = render(<Button>{content}</Button>)
    expect(getByRole('button', { name: content })).toBeInTheDocument()
  })

  test('will render with size', () => {
    const { getByRole } = render(<Button size="large">{content}</Button>)
    expect(getByRole('button', { name: content })).toHaveClass('btn--large')
  })

  test('will render with highlight', () => {
    const { getByRole } = render(<Button highlight="onsite">{content}</Button>)
    expect(getByRole('button', { name: content })).toHaveClass('btn--hightligh-onsite')
  })
})
