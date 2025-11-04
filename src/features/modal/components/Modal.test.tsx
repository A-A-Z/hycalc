import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Modal } from './Modal'

describe('<Modal />', () => {
  const title = 'Test modal'
  const contentText = 'This is just a test'
  const content = <span data-testid="content">{contentText}</span>

  test('render basic modal', () => {
    const { getByRole, getByTestId } = render(<Modal title={title} isOpen>{content}</Modal>)
    expect(getByRole('dialog')).toHaveAccessibleName(title)
    expect(getByTestId('content')).toHaveTextContent(contentText)
  })
})
