import { forwardRef } from 'react'

import type { ToolProps } from '../types'

interface ToolTemplateProps extends ToolProps {
  label: string
  onClick: () => void
  isPressed?: boolean
}

export const Tool = forwardRef<HTMLButtonElement, ToolTemplateProps>(({
  index,
  label,
  onClick,
  isPressed
}, ref): JSX.Element => {
  return (
    <button
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      className="toolbar__btn"
      type="button"
      onClick={onClick}
      aria-pressed={isPressed}
    >
      {label}
    </button>
  )
})
