import { useId, useCallback } from 'react'
import clsx from 'clsx'
import { useFileReader } from '../hooks/useFileReader'
import '../assets/file.css'

import type { FC, Ref } from 'react'
import type { ButtonFileProps } from '../types'

export const FileButton: FC<ButtonFileProps> = ({ children, id, className, ref, ...props }) => {
  const randId = useId()
  const inputId = id ?? randId

  const onFileLoad = useCallback((data: string) => {
    console.log('loaded', data)
  }, [])

  const { onChange, isLoading } = useFileReader({ onFileLoad })
  console.log('loading', isLoading)

  return (
    <span>
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
    </span>
  )
}
