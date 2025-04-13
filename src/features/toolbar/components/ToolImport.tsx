import { useRef, useCallback, useState } from 'react'
import { FileButton } from 'features/button'
import { Modal } from 'features/modal'
import { ImportResults } from 'features/import-results'
import { useFileReader } from 'features/file-reader'

import type { FC } from 'react'
import type { DateRecords } from 'features/records'
import type { ToolProps } from '../types'

export const ToolImport: FC<ToolProps> = ({ index, handleKeyDown, ref, ...props }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<DateRecords[] | null>(null)

  const onFileLoad = useCallback((data: string) => {
    console.log('loaded', data, modalRef.current)

    try {
      const json = JSON.parse(data)
      // TODO: validate json data
      console.log(json)
      setData(json)
    } catch (error) {
      // TODO: How to hanlde errors?
      console.error(error)
    }

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
      <Modal ref={modalRef} title="Uploaded data">
        {data !== null
          ? <ImportResults data={data} />
          : <span>No data</span>
        }
      </Modal>
    </>
  )
}
