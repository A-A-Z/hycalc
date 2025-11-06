import { describe, test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState, useImperativeHandle } from 'react'
import { ModalProvider } from 'features/modal'
import { ToolImport } from './ToolImport'

import type { Ref, ReactNode } from 'react'

interface ModalProps {
  ref?: Ref<HTMLDialogElement>
  id?: string
  title: string
  isOpen?: boolean
  children: ReactNode
  onClose?: () => void
}

// because "showModal" doesn't currently work in testing-library we make this workaround
// Could this be moved?
vi.mock('features/modal', async (importActual) => ({
  ...(await importActual<typeof import('features/modal')>()),
  Modal: (props: ModalProps) => {
    const { ref, title, children } = props
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => {
      return {
        showModal() {
          setIsOpen(true)
        },
        close() {
          setIsOpen(false)
        },
      } as HTMLDialogElement;
    }, [])
    return (
      <dialog open={isOpen}>
        <h2>{title}</h2>
        <ModalProvider {...props} >
          {children}
        </ModalProvider>
      </dialog>
    )
  }
}));

describe('<ToolImport />', () => {
  const fileValid = new File(['[["2025-5","{\\"2\\":\\"remote\\"}"]]'], 'data.json', { type: 'text/plain' })
  const fileWrongFormat = new File(['[Kock knock!]'], 'joke.txt', { type: 'text/plain' })
  const fileBadData = new File(['[["2025-5","{\\"2\\":\\"remo]'], 'bad.json', { type: 'text/plain' })
  const fileNoData = new File(['[{}]'], 'data.json', { type: 'text/plain' })

  test('renders button', () => {
    const { getByLabelText } = render(<ToolImport index={0} handleKeyDown={vi.fn()} />)
    expect(getByLabelText('Import')).toBeInTheDocument()
  })

  test('Uploading file shows Import modal', async () => {
    const { getByLabelText, queryByRole, getByRole } = render(<ToolImport index={0} handleKeyDown={vi.fn()} />)
    // modal closed by default
    expect(queryByRole('dialog')).not.toBeInTheDocument()

    // upload file
    const fileBtn = getByLabelText('Import') as HTMLInputElement
    await userEvent.upload(fileBtn, fileValid);

    // file added to input
    expect(fileBtn.files!.length).toBe(1)

    // shows modal
    expect(getByRole('dialog')).toBeInTheDocument()
    expect(getByRole('heading', { name: 'Imported entries', level: 3 })).toBeInTheDocument()
  })

  test('Handle close', async () => {
    const { getByLabelText, queryByRole, getByRole } = render(<ToolImport index={0} handleKeyDown={vi.fn()} />)
    // modal closed by default
    expect(queryByRole('dialog')).not.toBeInTheDocument()

    // upload file
    const fileBtn = getByLabelText('Import') as HTMLInputElement
    await userEvent.upload(fileBtn, fileValid);

    // shows modal
    expect(getByRole('dialog')).toBeInTheDocument()
    
    const closeBtn = getByRole('button', { name: 'Cancel' })
    await userEvent.click(closeBtn);

    // modal is now closed
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('Handles wrong file type', async () => {
    const { getByLabelText, queryByRole } = render(<ToolImport index={0} handleKeyDown={vi.fn()} />)
    // modal closed by default
    expect(queryByRole('dialog')).not.toBeInTheDocument()

    // try to upload bad file
    const fileBtn = getByLabelText('Import') as HTMLInputElement
    await userEvent.upload(fileBtn, fileWrongFormat);

    // file not added to input
    expect(fileBtn.files!.length).toBe(0)

    // still no modal
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('Handles bad data', async () => {
    const { getByLabelText, queryByRole, getByRole, getByText } = render(<ToolImport index={0} handleKeyDown={vi.fn()} />)
    // modal closed by default
    expect(queryByRole('dialog')).not.toBeInTheDocument()

    // upload file
    const fileBtn = getByLabelText('Import') as HTMLInputElement
    await userEvent.upload(fileBtn, fileBadData);

    // file added to input
    expect(fileBtn.files!.length).toBe(1)

    // shows error modal
    expect(getByRole('dialog')).toBeInTheDocument()
    expect(getByText('There was an error with the selected file.')).toBeInTheDocument()
  })

  test('Handles valid JSON with no data', async () => {
    const { getByLabelText, queryByRole, getByRole, getByText } = render(<ToolImport index={0} handleKeyDown={vi.fn()} />)
    // modal closed by default
    expect(queryByRole('dialog')).not.toBeInTheDocument()

    // upload file
    const fileBtn = getByLabelText('Import') as HTMLInputElement
    await userEvent.upload(fileBtn, fileNoData);

    // file added to input
    expect(fileBtn.files!.length).toBe(1)

    // shows error modal
    expect(getByRole('dialog')).toBeInTheDocument()
    expect(getByText('There was an error with the selected file.')).toBeInTheDocument()
  })

  test('handles keydown', async () => {
    const foo = vi.fn()
    const { getByLabelText } = render(<ToolImport index={3} handleKeyDown={foo} />)
    const fileBtn = getByLabelText('Import')

    // fileBtn.focus()
    await userEvent.type(fileBtn, '{arrowleft}')
    expect(foo).toBeCalledWith('ArrowLeft', 3)
  })
})
