import { forwardRef, useCallback } from 'react'
import { useGridStatus } from 'features/status'
import { Tool } from './Tool'

import type { ToolProps } from '../types'

export const ToolCustom = forwardRef<HTMLButtonElement, ToolProps>(({ index }, ref): JSX.Element => {
  const { status: { isCustomMode } , toggleCustomMode } = useGridStatus()

  const onClick = useCallback(() => {
    toggleCustomMode(!isCustomMode)
  }, [isCustomMode, toggleCustomMode])

  return (
    <Tool
      ref={ref} 
      index={index}
      label="Custom"
      onClick={onClick}
      isPressed={isCustomMode}
    />
  )
})
