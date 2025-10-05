import { useRef, useCallback, useState } from 'react'
import { FileButton } from 'features/button'
import { Modal } from 'features/modal'
import { ImportResults, ResultsError } from 'features/import-results'
import { useFileReader } from 'features/file-reader'

import type { FC } from 'react'
import type { DateRecordEntry } from 'features/records'
import type { ToolProps } from '../types'

export const ToolImport: FC<ToolProps> = ({ index, handleKeyDown, ref, ...props }) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [data, setData] = useState<DateRecordEntry[] | null>(null)

  const onFileLoad = useCallback((data: string) => {
    try {
      const json = JSON.parse(data)
      // TODO: validate json data
      console.log(json)
      setData(json)
    } catch (error) {
      // TODO: How to hanlde errors?
      console.log('ERROR HERE')
      console.error(error)
      setData(null)
    }

    modalRef.current?.showModal()
  }, [])

  const { isLoading, onChange } = useFileReader({ onFileLoad })

  const handleModalClose = useCallback(() => {
    console.log('close')
    modalRef.current?.close()
  }, [])

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
      <Modal ref={modalRef} title="Uploaded data" onClose={handleModalClose}>
        {data !== null
          ? <ImportResults data={data} />
          : <ResultsError />
        }
      </Modal>
    </>
  )
}
