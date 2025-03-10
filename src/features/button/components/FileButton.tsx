import { useId } from 'react'
import clsx from 'clsx'
import '../assets/file.css'

import type { FC, Ref } from 'react'
import type { ButtonFileProps } from '../types'

export const FileButton: FC<ButtonFileProps> = ({ children, id, className, ref, ...props }) => {
  const randId = useId()
  const inputId = id ?? randId
  return (
    <span>
      <label
        ref={ref as Ref<HTMLLabelElement>}
        htmlFor={inputId}
        className={clsx('btn', className)}
        tabIndex={0}
        {...props}
      >{children}</label>
      <input id={inputId} type="file" className="file__input" />
    </span>
  )
}
