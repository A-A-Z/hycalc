import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { FileButton } from './FileButton'

describe('<ToggleButton />', () => {
  const content = 'Test button'

  test('will render', () => {
    const { getByLabelText } = render(<FileButton>{content}</FileButton>)
    expect(getByLabelText(content)).toBeInTheDocument()
  })

  test('will render in loading state', () => {
    const { getByRole } = render(<FileButton isLoading>{content}</FileButton>)
    expect(getByRole('button', { busy: true })).toBeInTheDocument()
  })
})
