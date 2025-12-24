import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ToggleButton } from './ToggleButton'

describe('<ToggleButton />', () => {
  const content = 'Test button'

  test('will render in non-active state', () => {
    const { getByRole } = render(<ToggleButton isActive={false}>{content}</ToggleButton>)
    expect(getByRole('button', { name: content, pressed: false })).toBeInTheDocument()
  })

  test('will render in active state', () => {
    const { getByRole } = render(<ToggleButton isActive={true}>{content}</ToggleButton>)
    expect(getByRole('button', { name: content, pressed: true })).toBeInTheDocument()
  })
})
