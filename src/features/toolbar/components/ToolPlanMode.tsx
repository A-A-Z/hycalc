import { forwardRef } from 'react'
import { useGridStatus } from 'features/status'
import { ToggleButton } from 'features/button'

import type { ToolProps } from '../types'

export const ToolPlanMode = forwardRef<HTMLButtonElement, ToolProps>(({ index }, ref): JSX.Element => {
  const { isPlanMode, togglePlanMode } = useGridStatus()

  return (
    <ToggleButton
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onClick={() => { togglePlanMode() }}
      isActive={isPlanMode}
    >
      Plan mode
    </ToggleButton>
  )
})
