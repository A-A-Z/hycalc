import { forwardRef } from 'react'
import { useGridStatus } from 'features/status'
import { ToggleButton } from 'features/button'

import type { ToolProps } from '../types'

export const ToolCustom = forwardRef<HTMLButtonElement, ToolProps>(({ index }, ref): JSX.Element => {
  const { isCustomMode, toggleCustomMode } = useGridStatus()

  return (
    <ToggleButton
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onClick={() => { toggleCustomMode() }}
      isActive={isCustomMode}
    >
      Custom
    </ToggleButton>
  )
})
