import { useRef, useCallback } from 'react'
import { FileButton } from 'features/button'
import { Modal } from 'features/modal'
import { useFileReader } from 'features/file-reader'

import type { FC } from 'react'
import type { ToolProps } from '../types'

export const ToolImport: FC<ToolProps> = ({ index, handleKeyDown, ref, ...props }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const onFileLoad = useCallback((data: string) => {
    console.log('loaded', data, modalRef.current)
    modalRef.current?.showPopover()
  }, [])

  const { isLoading, onChange } = useFileReader({ onFileLoad })

  return (
    <>
      <FileButton
        ref={ref}
        isLoading={isLoading}
        tabIndex={index === 0 ? 0 : -1} // TODO
        onKeyDown={e => { handleKeyDown(e.key, index) }} // TODO
        onChange={onChange}
        {...props}
      >Import</FileButton>
      <Modal ref={modalRef}>Test</Modal>
    </>
  )
}
