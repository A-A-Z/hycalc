import { useId, useCallback, useRef } from 'react'
import clsx from 'clsx'

import { Modal } from 'features/modal'
import { Button } from './Button'
import { useFileReader } from '../hooks/useFileReader'
import '../assets/file.css'

import type { FC, Ref } from 'react'
import type { ButtonFileProps } from '../types'

export const FileButton: FC<ButtonFileProps> = ({ children, id, className, ref, ...props }) => {
  const randId = useId()
  const inputId = id ?? randId
  const modalId = inputId + '-modal'
  const modalRef = useRef<HTMLDivElement>(null)

  const onFileLoad = useCallback((data: string) => {
    console.log('loaded', data, modalRef.current)
    modalRef.current?.showPopover()
  }, [])

  const { isLoading, onChange } = useFileReader({ onFileLoad })

  return (
    <span>
      {isLoading
        ? <Button disabled aria-busy={true}>Loading</Button>
        : <>
          <label
            ref={ref as Ref<HTMLLabelElement>}
            htmlFor={inputId}
            className={clsx('btn', className)}
            tabIndex={0}
            {...props}
          >{children}</label>
          <input
            id={inputId}
            type="file"
            accept=".json"
            className="file__input"
            onChange={onChange}
            multiple={false}
          />
        </>
      }
      <Modal ref={modalRef} id={modalId}>Test</Modal>
    </span>
  )
}
