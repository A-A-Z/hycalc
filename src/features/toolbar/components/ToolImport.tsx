import { useRef, useCallback, useState } from 'react'
import { FileButton } from 'features/button'
import { Modal } from 'features/modal'
import { ImportResults, ResultsError } from 'features/import-results'
import { useFileReader } from 'features/file-reader'
import { isDataValid } from 'features/records'

import type { FC } from 'react'
import type { DateRecordEntry } from 'features/records'
import type { ToolProps } from '../types'

export const ToolImport: FC<ToolProps> = ({ index, handleKeyDown, ref, ...props }) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [data, setData] = useState<DateRecordEntry[] | null>(null)

  const onFileLoad = useCallback((data: string) => {
    try {
      const json = JSON.parse(data)
      // set parsed data (or null if not valid)
      setData(isDataValid(json) ? json : null)
    } catch (error) {
      // failed to parse JSON show error
      setData(null)
    }

    // show the current modal
    modalRef.current?.showModal()
  }, [])

  const { isLoading, onChange } = useFileReader({ onFileLoad })

  const handleModalClose = useCallback(() => {
    modalRef.current?.close()
  }, [])

  return (
    <>
      <FileButton
        ref={ref}
        isLoading={isLoading}
        tabIndex={index === 0 ? 0 : -1}
        onKeyDown={({ key }) => { handleKeyDown(key, index) }}
        onChange={onChange}
        {...props}
      >Import</FileButton>
      <Modal ref={modalRef} title="Uploaded data" onClose={handleModalClose}>
        {data !== null
          ? <ImportResults data={data} />
          : <ResultsError />
        }
      </Modal>
    </>
  )
}
