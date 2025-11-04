import { describe, test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ToolImport } from './ToolImport'

describe('<ToolImport />', () => {
  test('render', () => {
    const { debug, getByRole } = render(<ToolImport index={0} handleKeyDown={vi.fn()} />)
    expect(getByRole(''))
    debug() // TODO
  })
})
