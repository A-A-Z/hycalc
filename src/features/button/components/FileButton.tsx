import { useId } from 'react'
import clsx from 'clsx'

import { Button } from './Button'
import '../assets/file.css'

import type { FC, Ref } from 'react'
import type { ButtonFileProps } from '../types'

export const FileButton: FC<ButtonFileProps> = ({
  children,
  id,
  className,
  isLoading = false,
  tabIndex,
  onKeyDown,
  ref,
  ...props
}) => {
  const defaultId = useId()
  const inputId = id ?? defaultId
  return (
    <span>
      {isLoading
        ? <Button disabled aria-busy={true}>Loading</Button>
        : <>
          <label
            htmlFor={inputId}
            className={clsx('btn', className)}
          >
            <span>{children}</span>
            <input
              ref={ref as Ref<HTMLInputElement>}
              id={inputId}
              type="file"
              accept=".json"
              className="visually-hidden"
              onKeyDown={onKeyDown}
              multiple={false}
              tabIndex={tabIndex}
              {...props}
            />
          </label>
        </>
      }
    </span>
  )
}
