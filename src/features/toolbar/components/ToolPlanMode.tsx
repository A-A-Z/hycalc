import { forwardRef } from 'react'
import { useGridStatus } from 'features/status'
import { ToggleButton } from 'features/button'

import type { ToolProps } from '../types'

export const ToolPlanMode = forwardRef<HTMLButtonElement, ToolProps>(({ index, handleKeyDown }, ref): JSX.Element => {
  const { isPlanMode, togglePlanMode } = useGridStatus()

  return (
    <ToggleButton
      ref={ref}
      tabIndex={index === 0 ? 0 : -1}
      onClick={() => { togglePlanMode() }}
      onKeyDown={e => { handleKeyDown(e.key, index) }}
      isActive={isPlanMode}
    >
      Plan mode
    </ToggleButton>
  )
})
