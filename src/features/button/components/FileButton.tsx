import { useId, useRef } from 'react'
import clsx from 'clsx'

import { Button } from './Button'
import '../assets/file.css'

import type { FC, Ref, KeyboardEventHandler, KeyboardEvent } from 'react'
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
  const inputRef = useRef<HTMLInputElement>(null);

  const onLabelKeyDown: KeyboardEventHandler<HTMLLabelElement> = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      // file should open on enter/space
      inputRef.current?.click()
    }

    if (onKeyDown !== undefined) {
      // still handle arrow events
      onKeyDown(event as unknown as KeyboardEvent<HTMLInputElement>)
    }
  }
  return (
    <span>
      {isLoading
        ? <Button disabled aria-busy={true}>Loading</Button>
        : <>
          <label
            role="button"
            ref={ref as Ref<HTMLLabelElement>}
            htmlFor={inputId}
            className={clsx('btn', className)}
            onKeyDown={onLabelKeyDown}
            tabIndex={tabIndex}
          >{children}</label>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept=".json"
            className="file__input"
            multiple={false}
            {...props}
          />
        </>
      }
    </span>
  )
}
