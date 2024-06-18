import { forwardRef, useCallback } from 'react'
import { useGridStatus } from 'features/status'
import { ToggleButton } from 'features/button'

import type { ToolProps } from '../types'

export const ToolCustom = forwardRef<HTMLButtonElement, ToolProps>(({ index }, ref): JSX.Element => {
  const { status: { isCustomMode } , toggleCustomMode } = useGridStatus()

  const onClick = useCallback(() => {
    toggleCustomMode(!isCustomMode)
  }, [isCustomMode, toggleCustomMode])

  return (
    <ToggleButton
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onClick={onClick}
      isActive={isCustomMode}
    >
      Custom
    </ToggleButton>
  )
})
